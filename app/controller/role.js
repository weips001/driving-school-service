const CommonController = require('./common')
class RoleController extends CommonController {
  async index() {
    const ctx = this.ctx
    let { limit, offset, roleName } = this.getPageQuery()
    const { Op } = this.app.Sequelize
    const where = {
      roleName: {
        [Op.startsWith]: roleName || ''
      }
    }
    const query = {
      limit,
      offset,
      where: this.wrapSchoolId(where),
      order: [
        ['createdAt', 'DESC'],
        ['roleName', 'ASC']
      ]
    }
    ctx.body = await ctx.service.role.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.service.role.detail(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    let { body } = ctx.request
    const schoolId = this.getSchoolId()
    ctx.body = await ctx.service.role.create(schoolId, body)
  }

  async update() {
    const ctx = this.ctx
    let { body } = ctx.request
    const schoolId = this.getSchoolId()
    ctx.body = await ctx.service.role.update(ctx.params.id, schoolId, body)
  }

  async destroy() {
    const ctx = this.ctx
    ctx.body = await ctx.service.role.destroy(ctx.params.id)
  }
}

module.exports = RoleController
