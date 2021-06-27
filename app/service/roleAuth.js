'use strict'

const CommenService = require('./common')

class RoleAuthService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.RoleAuth.findAndCountAll(query)
    const result = {
      total: count,
      list: rows
    }
    const res = this.success(result, '查询成功！')
    return {
      ...res,
      success: true
    }
  }

  async detail(id) {
    const { ctx } = this
    const roleAuth = await ctx.model.RoleAuth.findByPk(id)
    if (roleAuth) {
      return this.success(roleAuth, '获取详情成功！')
    }
    return this.error(null, '无当前数据，获取详情失败！')
  }

  async create(schoolId, body) {
    if (!schoolId) {
      return this.error('当前用户没有绑定驾校，无法操作！')
    }
    const { ctx, app } = this
    const { roleId, authId } = body
    const [roleAuth, created] = await ctx.model.RoleAuth.findOrCreate({
      where: {
        roleId,
        schoolId,
        authId,
      },
      defaults: body,
      fields: ['roleId', 'schoolId', 'authId']
    })
    if (!created) {
      return this.error(null, '当前角色已绑定！')
    }
    return this.success(roleAuth, '角色绑定成功！')
  }
  async update(id, schoolId, body) {
    const { ctx, app } = this
    const { roleId, authId } = body
    const roleAuth = await ctx.model.RoleAuth.findByPk(id)
    if (roleAuth) {
      const hasRoleAuth = await ctx.model.RoleAuth.findOne({
        where: {
          roleId,
          schoolId,
          authId,
        }
      })
      if (hasRoleAuth && hasRoleAuth.id !== id) {
        return this.error(null, '角色已绑定！')
      }
      await roleAuth.update(body, {
        fields: ['roleId', 'authId']
      })
      console.log(roleAuth.toJSON())
      return this.success(roleAuth, '修改成功！')
    }
    return this.error(null, '没有查询到当前数据，无法修改！')
  }
  async destroy() {
    const { ctx } = this
    const roleAuth = await ctx.model.RoleAuth.findByPk(ctx.params.id)
    if (roleAuth) {
      await roleAuth.destroy()
      return this.success(null, '删除成功！')
    }
    return this.error(null, '删除失败，没有当前数据！')
  }
}

module.exports = RoleAuthService
