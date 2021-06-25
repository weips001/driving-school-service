'use strict'

const CommenService = require('./common')

class PlaceService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.Place.findAndCountAll(query)
    const result = {
      total: count,
      list: rows
    }
    const res = this.success(result)
    return {
      ...res,
      success: true
    }
  }

  async detail(id) {
    const { ctx } = this
    const place = await ctx.model.Place.findByPk(id)
    const res = await place.getVip()
    console.log(res.toJSON())
    if(place) {
      return this.success(place, '获取详情成功')
    }
    return this.error(null, '无当前数据，获取详情失败')
  }

  async create(body) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const {placeName = ''} = body
    const [place, created] = await ctx.model.Place.findOrCreate({
      where: {
        placeName
      },
      defaults: body,
      fields: ['placeName', 'placement', 'name', 'phone', 'overDate', 'desc' ]
    })
    if(!created) {
      return this.error(null, '乐园名称已存在')
    }
    return this.success(place)
  }
  async update(id, body) {
    const { ctx, app } = this
    const place = await ctx.model.Place.findByPk(id)
    if (place) {
      const hasPlace =  await ctx.model.Place.findOne({where: {placeName: body.placeName}})
      if(hasPlace.id !== id) {
        return this.error(null, '乐园名称已存在')
      }
      await place.update(body, {
        fields: ['placeName', 'placement', 'name', 'phone', 'desc']
      })
      console.log(place.toJSON())
      return this.success(place, "修改成功")
    }
    return this.error(null, '没有查询到当前数据，无法修改')
  }
  async destroy() {
   const place =  await ctx.model.Place.findByPk(ctx.params.id)
   if(place) {
    await place.destroy()
    return this.success(null, '删除成功')
   }
   return this.error(null, '删除失败，没有当前数据')
  }
}

module.exports = PlaceService
