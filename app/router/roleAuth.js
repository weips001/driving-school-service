module.exports = app => {
  const { router, controller } = app
  router.resources('roleAuth', '/api/roleAuth', controller.roleAuth)
}
