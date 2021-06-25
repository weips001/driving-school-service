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
  getSchoolId() {
    const ctx = this.ctx
    const schoolId = ctx.header['school-id']
    return schoolId || null
  }
  getToken() {
    const authorization = ctx.request.header.authorization
    if (authorization.length > 7) {
      const token = authorization.substr(7, 1000)
      return token
    }
    return null
  }
  wrapSchoolId(options) {
    const schoolId = this.getSchoolId()
    if (schoolId) {
      return {
        ...options,
        schoolId
      }
    }
    return options
  }
}

module.exports = CommonController
