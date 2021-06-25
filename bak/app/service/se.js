'use strict'

const CommenService = require('./common')

class UserService extends CommenService {
  async list(query) {
    const { ctx } = this
    // const { Op } = this.app.Sequelize
    // console.log(Op)
    const { count, rows } = await ctx.model.User.findAndCountAll(query)
    const result = {
      total: count,
      list: rows
    }
    return this.success(result)
  }

  async create(body) {
    const { ctx } = this
    const user = await ctx.model.User.create(body)
    console.log('user', user)
    return this.success(user)
  }
}

module.exports = UserService
