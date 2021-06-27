const CommonController = require('./common')
class RoleAuthController extends CommonController {
  async index() {
    const ctx = this.ctx
    let { limit, offset } = this.getPageQuery()
    const where = {}
    const query = {
      limit,
      offset,
      where: this.wrapSchoolId(where),
      order: [
        ['createdAt', 'DESC']
      ]
    }
    ctx.body = await ctx.service.roleAuth.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.service.roleAuth.detail(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    let { body } = ctx.request
    const schoolId = this.getSchoolId()
    ctx.body = await ctx.service.roleAuth.create(schoolId, body)
  }

  async update() {
    const ctx = this.ctx
    let { body } = ctx.request
    const schoolId = this.getSchoolId()
    ctx.body = await ctx.service.roleAuth.update(ctx.params.id, schoolId, body)
  }

  async destroy() {
    const ctx = this.ctx
    ctx.body = await ctx.service.roleAuth.destroy(ctx.params.id)
  }
}

module.exports = RoleAuthController
