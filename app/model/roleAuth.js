'use strict'
const uuid = require('uuid').v4
module.exports = app => {
  const { STRING, VIRTUAL, DATE, UUID } = app.Sequelize
  const RoleAuth = app.model.define('role_auth', {
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
    authId: {
      type: UUID,
      field: 'auth_id',
      comment: '权限id',
      allowNull: false,
      validate: {
        len: {
          args: [32, 32],
          msg: '无效的权限id'
        },
        notEmpty: {
          msg: '权限id不能為空'
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
    }
  })
  // RoleAuth.getRole = async function(roleId) {
  //   const role = await this.findByPk(roleId)
  //   const authList = await app.model.Auth.findAll({
  //     where: {
  //       roleId
  //     }
  //   })
  //   if (role) {
  //     return {
  //       ...role,
  //       auth: authList
  //     }
  //   }
  //   return null
  // }
  return RoleAuth
}
