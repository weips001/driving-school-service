// app/controller/users.js
const Controller = require('egg').Controller

function toInt(str) {
  if (typeof str === 'number') return str
  if (!str) return str
  return parseInt(str, 10) || 0
}

class UserController extends Controller {
  async index() {
    const ctx = this.ctx
    const { Op } = this.app.Sequelize
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      where: {
        name: {
          [Op.substring]: ctx.query.name || ''
        }
      },
      order: [
        ['createdAt', 'DESC']
      ]
    }
    ctx.body = await ctx.service.user.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.model.User.findByPk(toInt(ctx.params.id))
  }

  async create() {
    const ctx = this.ctx
    // const { name, age } = ctx.request.body

    ctx.body = await ctx.service.user.create(ctx.request.body)
  }

  async update() {
    const ctx = this.ctx
    const id = toInt(ctx.params.id)
    const user = await ctx.model.User.findByPk(id)
    if (!user) {
      ctx.status = 404
      return
    }

    const { name, age } = ctx.request.body
    await user.update({ name, age })
    ctx.body = user
  }

  async destroy() {
    const ctx = this.ctx
    const id = toInt(ctx.params.id)
    const user = await ctx.model.User.findByPk(id)
    if (!user) {
      ctx.status = 404
      return
    }

    await user.destroy()
    ctx.status = 200
  }
}

module.exports = UserController
