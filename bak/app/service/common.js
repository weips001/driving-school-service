const Service = require('egg').Service

class CommonService extends Service {
  wrapHeader(data) {
    const compId = this.ctx.header.id
    if (compId) {
      return {
        ...data,
        compId
      }
    }
    return data
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
}
module.exports = CommonService
