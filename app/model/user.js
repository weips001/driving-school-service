'use strict'
const uuid = require('uuid').v4
const md5 = require('md5-node')
module.exports = app => {
  const { STRING, BOOLEAN, DATE, UUID } = app.Sequelize
  const User = app.model.define('user', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
    },
    name: {
      type: STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '姓名不能為空'
        }
      }
    },
    schoolId: {
      type: UUID,
      field: 'school_id',
      comment: '驾校id',
      allowNull: true,
      validate: {
        customValidator(value) {
          console.log('in---')
          const whitePhone = ['13271591339', '15395833823']
          if (!value || value == undefined) {
            if (!whitePhone.includes(this.phone)) {
              throw new Error('驾校id不能为空')
            }
          }
        }
      }
    },
    phone: {
      type: STRING(11),
      allowNull: false,
      validate: {
        is: {
          args: /^[1][0-9]{10}$/,
          msg: '手机格式不正确'
        }
      }
    },
    password: {
      type: STRING(50),
      comment: '用户密码',
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '用户密码不能為空'
        }
      },
      defaultValue() {
        return md5('123456')
      },
      set(value) {
        this.setDataValue('password', md5(value))
      }
    },
    // TODO:加上jwt以后需要设置为必填
    token: {
      type: STRING(100),
      comment: 'token'
    },
    status: {
      type: STRING(1),
      comment: '员工状态 0-在职，1-离职',
      validate: {
        isIn: {
          args: [['0'], ['1']],
          msg: '没有当前状态'
        }
      },
      defaultValue: '0'
    },
    desc: {
      type: STRING(300),
      comment: '备注'
    }
  })

  return User
}
