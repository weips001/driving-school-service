const CommonController = require('./common')
class SchoolController extends CommonController {
  async index() {
    const ctx = this.ctx
    let {
      limit,
      offset,
      adminPhone,
      adminName,
      schoolName
    } = this.getPageQuery()
    const { Op } = this.app.Sequelize
    const query = {
      limit,
      offset,
      where: {
        schoolName: {
          [Op.startsWith]: schoolName || ''
        },
        adminPhone: {
          [Op.startsWith]: adminPhone || ''
        },
        adminName: {
          [Op.startsWith]: adminName || ''
        }
      },
      order: [
        ['createdAt', 'DESC'],
        ['schoolName', 'ASC']
      ]
    }
    ctx.body = await ctx.service.school.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.service.school.detail(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    ctx.body = await ctx.service.school.create(ctx.request.body)
  }

  async update() {
    const ctx = this.ctx
    let value = this.getSchoolId()
    console.log(value)
    ctx.body = await ctx.service.school.update(ctx.params.id, ctx.request.body)
  }

  async destroy() {
    const ctx = this.ctx
    ctx.body = await ctx.service.school.destroy(ctx.params.id)
  }
}

module.exports = SchoolController
