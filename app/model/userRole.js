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

  UserRole.getUserRole = async function(schoolId, userId) {
    if (!schoolId) throw new Error('schoolId is empty!')
    if (!userId) throw new Error('userId is empty!')
    const userRoles = await app.model.query(
      'SELECT u.id AS userId, u.phone, u.name, u.token, u.status, u.desc, ur.role_id AS roleId  FROM user u LEFT JOIN user_role ur ON u.id = ur.user_id WHERE u.school_id = :schoolId AND u.id = :userId',
      {
        type: 'SELECT',
        replacements: {
          schoolId,
          userId
        }
      }
    )
    return userRoles
  }

  return UserRole
}
