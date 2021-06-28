const Service = require('egg').Service

class CommonService extends Service {
  getSchoolId() {
    const ctx = this.ctx
    const schoolId = ctx.header['school-id']
    return schoolId || null
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

  createToken(userId) {
    const expiresIn = 60 * 60
    const app = this.app
    const token = app.jwt.sign(
      {
        userId
      },
      app.config.jwt.secret,
      {
        expiresIn
      }
    )
    return token
  }

  success(data, msg = null) {
    return {
      code: '0',
      data,
      msg
    }
  }

  error(data = null, msg) {
    return {
      code: '1',
      data,
      msg
    }
  }
  noSchool() {
    return this.error(null, '当前用户没有绑定驾校，无法操作！')
  }
}
module.exports = CommonService
