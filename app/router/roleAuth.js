module.exports = app => {
  const { router, controller } = app
  router.post('/api/bindAuth', controller.roleAuth.bindAuth)
  router.resources('roleAuth', '/api/roleAuth', controller.roleAuth)
}
