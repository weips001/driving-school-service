'use strict'
const uuid = require('uuid').v4
module.exports = app => {
  const { STRING, INTEGER, DATE, UUID } = app.Sequelize
  const User = app.model.define('user', {
    // id: String,
    // schoolId: String,
    // name: String,
    // desc: String,
    // callPhone: String,
    // password: String,
    // imgUrl: String,
    // token: String,
    // overdue: {
    //   type: Boolean,
    //   default: false
    // },
    // role: [String],
    // roleName: [String],
    // creator: String,
    // creatorName: String,

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
    phone: {
      type: STRING(11),
      allowNull:false,
      validate: {
        is: {
          args: /^[1][0-9]{10}$/,
          msg: '手机格式不正确'
        }
      }
    },
    code: {
      type: STRING(5),
      defaultValue: '-1'
    }
  })

  return User
}
