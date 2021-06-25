module.exports = app => {
  const { router, controller } = app
  router.resources('role', '/api/role', controller.role)
}
