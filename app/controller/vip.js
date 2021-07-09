const CommonController = require('./common')
class VipController extends CommonController {
  /**
   * 可以根据手机号、姓名、卡号来查
   */
  async index() {
    const ctx = this.ctx
    let { limit, offset, searchVal, cardType, restTotal } = this.getPageQuery()
    const { Op } = this.app.Sequelize
    const where = {
      [Op.or]: [
        {
          phone: {
            [Op.startsWith]: searchVal || ''
          }
        },
        {
          name: {
            [Op.substring]: searchVal || ''
          }
        },
        {
          cardId: {
            [Op.startsWith]: searchVal || ''
          }
        }
      ]
    }
    if (cardType != undefined) {
      where.cardType = cardType
    }
    if (restTotal != undefined) {
      where.restTotal = restTotal
    }
    const query = {
      limit,
      offset,
      where: this.wrapplaceId(where),
      order: [['createdAt', 'DESC']]
    }
    ctx.body = await ctx.service.vip.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.service.vip.detail(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    ctx.body = await ctx.service.vip.create(ctx.request.body)
  }

  async update() {
    const ctx = this.ctx
    let value = this.getVipId()
    console.log(value)
    ctx.body = await ctx.service.vip.update(ctx.params.id, ctx.request.body)
  }
  async consume() {
    const ctx = this.ctx
    const consumeNum = ctx.request.body.consumeNum
    ctx.body = await ctx.service.vip.consume(ctx.params.id, consumeNum)
  }
  async destroy() {
    const ctx = this.ctx
    ctx.body = await ctx.service.vip.destroy(ctx.params.id)
  }
}

module.exports = VipController
