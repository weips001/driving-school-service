'use strict'
const uuid = require('uuid').v4
module.exports = app => {
  const { STRING, VIRTUAL, DATE, UUID } = app.Sequelize
  const Role = app.model.define('role', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
    },
    roleName: {
      type: STRING(100),
      allowNull: false,
      field: 'role_name',
      comment: '角色名称',
      validate: {
        notEmpty: {
          msg: '角色名称不能為空'
        }
      }
    },
    schoolId: {
      type: UUID,
      field: 'school_id',
      comment: '驾校id',
      allowNull: false,
      validate: {
        len: {
          args: [32, 32],
          msg: '无效的驾校id'
        },
        notEmpty: {
          msg: '驾校id不能為空'
        }
      }
    },
    desc: {
      type: STRING(300),
      comment: '角色描述',
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '角色描述不能為空'
        }
      }
    }
  })
  // Role.getRole = async function (roleId, schoolId) {
  //   await app.model.query('', {type: 'SELECT'})

  // }
  return Role
}
