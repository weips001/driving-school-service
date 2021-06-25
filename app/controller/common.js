const Controller = require('egg').Controller

class CommonController extends Controller {
  getPageQuery() {
    const ctx = this.ctx
    let { pageSize, current, ...other } = ctx.query
    pageSize = ctx.helper.toInt(ctx.query.pageSize) || 20
    current = ctx.helper.toInt(ctx.query.current) || 1
    const offset = (current - 1) * pageSize
    const query = {
      ...other,
      limit: pageSize,
      offset
    }
    return query
  }
  getPlaceId() {
    const ctx = this.ctx
    const placeId = ctx.header['place-id']
    return placeId || null
  }
  wrapWhere(options) {
    const placeId = this.getPlaceId()
    if (placeId) {
      return {
        ...options,
        placeId
      }
    }
    return options
  }
}

module.exports = CommonController