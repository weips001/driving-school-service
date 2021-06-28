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
  /**
   * 根據角色id查找
   *
   * @param {string} schoolId 駕校id
   * @param {string} roleId 角色id
   * @returns 角色和權限信息
   */
  RoleAuth.getAuthFromRole = async function(schoolId, roleId) {
    if (!schoolId) {
      throw new Error('schoolId not is empty')
    }
    if (!roleId) {
      throw new Error('roleId not is empty')
    }
    if (typeof roleId === 'string') {
      roleId = [roleId]
    }
    const userRole = await app.model.query(
      'SELECT r.role_name as roleName, r.desc, r.school_id as schoolId, a.auth_code as authCode, a.auth_name as authName from role r, auth a, role_auth ra WHERE r.school_id = :schoolId AND r.id IN (:roleId) AND r.id = ra.role_id AND a.id = ra.auth_id',
      {
        type: 'SELECT',
        replacements: {
          schoolId,
          roleId
        }
      }
    )
    return userRole
  }
  return RoleAuth
}
