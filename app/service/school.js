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
      ]
    })
    if (!created) {
      return this.error(null, '驾校名称已存在！')
    }
    return this.success(school)
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
