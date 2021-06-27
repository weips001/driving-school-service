module.exports = app => {
  const { router, controller } = app
  router.resources('userRole', '/api/userRole', controller.userRole)
}
