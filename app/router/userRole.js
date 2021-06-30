module.exports = app => {
  const { router, controller } = app
  router.post('/api/bindRole', controller.userRole.bindRole)
  router.resources('userRole', '/api/userRole', controller.userRole)
}
