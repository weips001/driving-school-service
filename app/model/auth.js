'use strict'
const uuid = require('uuid').v4
module.exports = app => {
  const { STRING, CHAR, DATE, UUID } = app.Sequelize
  const Auth = app.model.define('auth', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
    },
    authName: {
      type: STRING(100),
      allowNull: false,
      field: 'auth_name',
      comment: '权限名称',
      validate: {
        notEmpty: {
          msg: '权限名称不能為空'
        }
      }
    },
    authCode: {
      type: STRING(20),
      allowNull: false,
      field: 'auth_code',
      comment: '权限编码',
      validate: {
        notEmpty: {
          msg: '权限编码不能為空'
        }
      }
    },
    desc: {
      type: STRING(300),
      allowNull: false,
      comment: '权限描述',
      validate: {
        notEmpty: {
          msg: '权限描述不能为空'
        }
      }
    }
  })
  return Auth
}
