'use strict'

const CommenService = require('./common')

class RoleService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.Role.findAndCountAll(query)
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
    const role = await ctx.model.Role.findByPk(id)
    if (role) {
      return this.success(role, '获取详情成功！')
    }
    return this.error(null, '无当前数据，获取详情失败！')
  }

  async create(schoolId, body) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const { roleName = '', roleCode } = body
    const [role, created] = await ctx.model.Role.findOrCreate({
      where: {
        roleName,
        roleCode,
        schoolId
      },
      defaults: body,
      fields: ['roleName', 'roleCode', 'schoolId', 'desc']
    })
    if (!created) {
      return this.error(null, '角色名称或编码已存在！')
    }
    return this.success(role, '角色创建成功！')
  }
  async update(id, schoolId, body) {
    const { ctx, app } = this
    const { roleName, roleCode } = body
    const role = await ctx.model.Role.findByPk(id)
    if (role) {
      const hasRole = await ctx.model.Role.findOne({
        where: {
          roleName,
          roleCode,
          schoolId
        }
      })
      if (hasRole && hasRole.id !== id) {
        return this.error(null, '角色名称或编码已存在！')
      }
      await role.update(body, {
        fields: ['roleName', 'desc']
      })
      console.log(role.toJSON())
      return this.success(role, '修改成功！')
    }
    return this.error(null, '没有查询到当前数据，无法修改！')
  }
  async destroy() {
    const { ctx } = this
    const role = await ctx.model.Role.findByPk(ctx.params.id)
    if (role) {
      await role.destroy()
      return this.success(null, '删除成功！')
    }
    return this.error(null, '删除失败，没有当前数据！')
  }
}

module.exports = RoleService
