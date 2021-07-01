'use strict'

const CommenService = require('./common')

class SchoolService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.School.findAndCountAll(query)
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
    const school = await ctx.model.School.findByPk(id)
    if (school) {
      return this.success(school, '获取详情成功！')
    }
    return this.error(null, '无当前数据，获取详情失败！')
  }

  async create(body) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const { schoolName = '' } = body
    const t = await ctx.model.transaction()
    try {
      // 1. 创建驾校
      const [school, created] = await ctx.model.School.findOrCreate({
        where: {
          schoolName
        },
        defaults: body,
        fields: [
          'schoolName',
          'schoolLoaction',
          'adminName',
          'adminPhone',
          'perioOfValidity',
          'desc'
        ],
        transaction: t
      })
      if (!created) {
        return this.error(null, '驾校名称已存在！')
      }
      // 2. 创建驾校管理员
      const adminUser = {
        schoolId: school.id,
        name: school.adminName,
        phone: school.adminPhone
      }
      const [user] = await ctx.model.User.findOrCreate({
        where: {
          phone: school.adminPhone
        },
        defaults: adminUser,
        transaction: t
      })
      // 3. 创建管理员角色
      const adminRole = {
        roleName: '管理员',
        desc: '拥有全部权限，不可删除',
        schoolId: school.id,
        roleCode: '-1'
      }
      const [role] = await ctx.model.Role.findOrCreate({
        where: {
          roleName: '管理员',
          schoolId: school.id,
          roleCode: '-1'
        },
        defaults: adminRole,
        transaction: t
      })
      // 4. 查询所有的权限
      let authIds = await ctx.model.Auth.findAll({
        attributes: ['id']
      })
      const roleParams = authIds.map(auth => {
        return {
          roleId: role.id,
          authId: auth.id,
          schoolId: school.id
        }
      })
      // 5. 给角色绑定权限
      await ctx.model.RoleAuth.bulkCreate(roleParams, {
        validate: true,
        transaction: t
      })
      // 6. 给人员绑定角色
      await ctx.model.UserRole.create(
        {
          roleId: role.id,
          schoolId: school.id,
          userId: user.id
        },
        { transaction: t }
      )
      await t.commit()
      return this.success(school, '驾校创建成功')
    } catch (e) {
      console.log(e, e)
      await t.rollback()
      return this.error(e, '驾校创建失败！')
    }
  }
  async update(id, body) {
    const { ctx, app } = this
    const { schoolName } = body
    const school = await ctx.model.School.findByPk(id)
    if (school) {
      const hasSchool = await ctx.model.School.findOne({
        where: { schoolName }
      })
      if (hasSchool && hasSchool.id !== id) {
        return this.error(null, '驾校名称已存在！')
      }
      await school.update(body, {
        fields: [
          'schoolName',
          'schoolLoaction',
          'adminName',
          'adminPhone',
          'desc'
        ]
      })
      console.log(school.toJSON())
      return this.success(school, '修改成功！')
    }
    return this.error(null, '没有查询到当前数据，无法修改！')
  }
  async destroy() {
    const { ctx } = this
    const school = await ctx.model.School.findByPk(ctx.params.id)
    if (school) {
      await school.destroy()
      return this.success(null, '删除成功！')
    }
    return this.error(null, '删除失败，没有当前数据！')
  }
}

module.exports = SchoolService
