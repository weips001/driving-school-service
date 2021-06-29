'use strict'

const md5 = require('md5-node')
const CommenService = require('./common')

class UserService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.User.findAndCountAll(query)
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
    const user = await ctx.model.User.findByPk(id)
    const res = await user.getVip()
    console.log(res.toJSON())
    if (user) {
      return this.success(user, '获取详情成功！')
    }
    return this.error(null, '无当前数据，获取详情失败！')
  }

  async create(schoolId, body) {
    if (!schoolId) return this.noSchool()
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const { phone = '' } = body
    console.log(body)
    const [user, created] = await ctx.model.User.findOrCreate({
      where: {
        phone,
        schoolId: schoolId || ''
      },
      defaults: body,
      fields: [
        'name',
        'schoolId',
        'phone',
        'password',
        'token',
        'status',
        'desc'
      ]
    })
    if (!created) {
      return this.error(null, '用户手机号已存在！')
    }
    return this.success(user, '创建成功！')
  }
  async update(id, schoolId, body) {
    if (!schoolId) return this.noSchool()
    const { ctx, app } = this
    const { phone } = body
    const user = await ctx.model.User.findByPk(id)
    if (user) {
      const hasUser = await ctx.model.User.findOne({
        where: {
          phone,
          schoolId
        }
      })
      if (hasUser && hasUser.id !== id) {
        return this.error(null, '用户已存在！')
      }
      await user.update(body, {
        fields: ['name', 'phone', 'status', 'desc']
      })
      console.log(user.toJSON())
      return this.success(user, '修改成功！')
    }
    return this.error(null, '没有查询到当前数据，无法修改！')
  }
  async destroy() {
    const { ctx } = this
    const user = await ctx.model.User.findByPk(ctx.params.id)
    if (user) {
      await user.destroy()
      return this.success(null, '删除成功！')
    }
    return this.error(null, '删除失败，没有当前数据！')
  }

  async getCurrentUser() {
    const { ctx, app } = this
    const userId = (ctx.state.user && ctx.state.user.userId) || null
    const schoolId = this.getSchoolId()
    if (userId) {
      const user = await ctx.model.User.getUser(schoolId, userId)
      // const school = await ctx.model.School.findByPk(schoolId)
      // console.log(JSON.stringify(school, null, 2))
      return user
    }
    return this.error(null, '没有当前用户信息，请联系管理员！')
  }

  async login(body) {
    const { ctx, app } = this
    const { phone, password } = body
    const users = await ctx.model.User.findAll({
      where: {
        phone,
        password: md5(password)
      },
      attributes: {
        exclude: ['password']
      }
    })
    console.log(JSON.stringify(users, null, 2))
    if (users.length) {
      if (users.length === 1) {
        const user = users[0]
        const token = this.createToken(user.id)
        user.token = token
        await user.save()
        await user.reload()
        return this.success(user, null)
      }
      return this.success(users, null)
    }
    return this.error(null, '用户名或密码错误！')
  }
}

module.exports = UserService
