'use strict'
const uuid = require('uuid').v4
module.exports = app => {
  const { UUID } = app.Sequelize
  const UserRole = app.model.define('user_role', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
    },
    roleId: {
      type: UUID,
      field: 'role_id',
      comment: '角色id',
      allowNull: false,
      validate: {
        len: {
          args: [32, 32],
          msg: '无效的角色id'
        },
        notEmpty: {
          msg: '角色id不能為空'
        }
      }
    },
    userId: {
      type: UUID,
      field: 'user_id',
      comment: '用户id',
      allowNull: false,
      validate: {
        len: {
          args: [32, 32],
          msg: '无效的用户id'
        },
        notEmpty: {
          msg: '用户id不能為空'
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
    }
  })
  return UserRole
}
