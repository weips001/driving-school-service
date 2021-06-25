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
    schoolId: {
      type: UUID,
      field: 'school_id',
      comment: '驾校id',
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '驾校id不能為空'
        }
      }
    },
    roleId: {
      type: CHAR(36),
      field: 'role_id',
      comment: '角色id',
      allowNull: true
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
