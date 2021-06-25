'use strict'
const uuid = require('uuid').v4
const dayjs = require('dayjs')
module.exports = app => {
  const { STRING, INTEGER, DATE, UUID } = app.Sequelize
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
        notNull: {
          msg: '姓名必須填寫'
        },
        notEmpty: {
          msg: '姓名不能為空'
        }
      }
    },
    age: {
      type: INTEGER
    },
    address: STRING(100),
    email: {
      type: STRING(30),
      validate: {
        isEmail: {
          msg: '必須是郵箱格式'
        }
      }
    },
    sex: {
      type: STRING(1),
      validate: {
        isIn: {
          args: [['0', '1']],
          msg: '性別只能是男或者女'
        }
      }
    },
    compId: {
      type: UUID,
      field: 'comp_id',
      allowNull: false
    },
    birthday: {
      type: DATE,
      allowNull: false,
      validate: {
        isBefore: dayjs().format('YYYY-MM-DD')
      }
    },
    deptName: {
      type: STRING(30),
      field: 'dept_name'
    }
  })

  return User
}
