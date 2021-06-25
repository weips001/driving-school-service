const CommonController = require('./common')
class PlaceController extends CommonController {
  async index () {
    const ctx = this.ctx
    let {limit, offset, phone} = this.getPageQuery()
    const { Op } = this.app.Sequelize
    const query = {
      limit,
      offset,
      where: {
        phone: {
          [Op.startsWith]: phone || ''
        }
      },
      order: [
        ['createdAt', 'DESC']
      ]
    }
    ctx.body = await ctx.service.place.list(query)
  }

  async show () {
    const ctx = this.ctx
    ctx.body = await ctx.service.place.detail(ctx.params.id)
  }

  async create () {
    const ctx = this.ctx
    ctx.body = await ctx.service.place.create(ctx.request.body)
  }

  async update () {
    const ctx = this.ctx
    let value = this.getPlaceId()
    console.log(value)
    ctx.body = await ctx.service.place.update(ctx.params.id, ctx.request.body)
  }

  async destroy () {
    const ctx = this.ctx
    ctx.body = await ctx.service.place.destroy(ctx.params.id)
  }
}

module.exports = PlaceController
