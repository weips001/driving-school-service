'use strict'
const uuid = require('uuid').v4
module.exports = app => {
  const { STRING, INTEGER, DATE, UUID } = app.Sequelize
  const Place = app.model.define('place', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
    },
    placeName: {
      type: STRING(100),
      allowNull: false,
      field: 'place_name',
      comment: '乐园名称',
      validate: {
        notEmpty: {
          msg: '乐园名称不能為空'
        }
      }
    },
    placement: {
      type: STRING(120),
      allowNull: false,
      comment: '乐园场地位置',
      validate: {
        notEmpty: {
          msg: '乐园场地位置不能為空'
        }
      }
    },
    name: {
      type: STRING(30),
      allowNull: false,
      comment: '管理员姓名',
      validate: {
        notEmpty: {
          msg: '管理员姓名不能為空'
        }
      }
    },
    phone: {
      type: STRING(11),
      allowNull: false,
      comment: '管理员手机号',
      validate: {
        is: {
          args: /^[1][0-9]{10}$/,
          msg: '手机格式不正确'
        }
      }
    },
    overDate: {
      type: DATE,
      allowNull: false,
      field: 'over_date',
      comment: '过期时间',
      validate: {
        notEmpty: {
          msg: '过期时间不能为空'
        }
      }
    },
    desc: {
      type: STRING(300),
      comment: '乐园描述',
    }
  })
  return Place
}
