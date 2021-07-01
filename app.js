// app.js
class AppBootHook {
  constructor(app) {
    console.log(arguments)
    this.app = app
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
    // 例如：从数据库加载数据到内存缓存
  }

  async didReady() {
    // 应用已经启动完毕
    console.log('ready')
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
    // console.log(typeof this.app.model.sync)
    const authList = [
      {
        authName: '学员管理',
        authCode: 'student'
      },
      {
        authName: '学员列表',
        authCode: 'studentList'
      },
      {
        authName: '新建学员',
        authCode: 'studentListAdd'
      },
      {
        authName: '编辑学员',
        authCode: 'studentListEdit'
      },

      {
        authName: '员工管理',
        authCode: 'userSetting'
      },
      {
        authName: '员工列表',
        authCode: 'user'
      },
      {
        authName: '新建员工',
        authCode: 'addUser'
      },
      {
        authName: '编辑员工',
        authCode: 'editUser'
      },
      {
        authName: '角色列表',
        authCode: 'role'
      },
      {
        authName: '新建角色',
        authCode: 'addRole'
      },
      {
        authName: '编辑角色',
        authCode: 'editRole'
      },

      {
        authName: '驾校管理',
        authCode: 'car'
      },
      {
        authName: '训练场',
        authCode: 'regionList'
      },
      {
        authName: '新增训练场',
        authCode: 'regionAdd'
      },
      {
        authName: '编辑训练场',
        authCode: 'regionEdit'
      },
      {
        authName: '班制管理',
        authCode: 'classicList'
      },
      {
        authName: '新增班制',
        authCode: 'classicAdd'
      },
      {
        authName: '编辑班制',
        authCode: 'classicEdit'
      },
      {
        authName: '报名管理',
        authCode: 'signUp'
      },
      {
        authName: '新增报名点',
        authCode: 'signUpAdd'
      },
      {
        authName: '编辑报名点',
        authCode: 'signUpEdit'
      },

      {
        authName: '车辆管理',
        authCode: 'car'
      },
      {
        authName: '车辆信息',
        authCode: 'carManagement'
      },
      {
        authName: '车辆新增',
        authCode: 'addCar'
      },
      {
        authName: '车辆编辑',
        authCode: 'editCar'
      },

      {
        authName: '财务管理',
        authCode: 'fund'
      },
      {
        authName: '财务款项配置',
        authCode: 'role'
      },
      {
        authName: '款项配置添加',
        authCode: 'addFundConfig'
      },
      {
        authName: '款项配置编辑',
        authCode: 'editFundConfig'
      },

      {
        authName: '系统设置',
        authCode: 'dict'
      },
      {
        authName: '招生来源',
        authCode: 'studentSource'
      },
      {
        authName: '新建招生来源',
        authCode: 'studentSourceAdd'
      }
    ]
    if (process.env.NODE_ENV === 'development') {
      await this.app.model.sync({ force: false, alter: true })
      const superMan1 = {
        name: '韦鹏帅',
        phone: '13271591339',
        desc: '皇上'
      }
      const superMan2 = {
        name: '李三才',
        phone: '15395833823',
        desc: '小李子'
      }
      await this.app.model.Admin.findOrCreate({
        where: {
          phone: superMan1.phone
        },
        defaults: superMan1
      })
      await this.app.model.Admin.findOrCreate({
        where: {
          phone: superMan2.phone
        },
        defaults: superMan2
      })
      await this.app.model.User.findOrCreate({
        where: {
          phone: superMan1.phone
        },
        defaults: superMan1
      })
      await this.app.model.User.findOrCreate({
        where: {
          phone: superMan2.phone
        },
        defaults: superMan2
      })
      for (let i = 0; i < authList.length; i++) {
        const item = authList[i]
        await this.app.model.Auth.findOrCreate({
          where: item,
          defaults: {
            ...item,
            desc: item.authName
          }
        })
      }
    }
  }
}

module.exports = AppBootHook
