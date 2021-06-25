module.exports = app => {
  const { router, controller } = app
  router.resources('auth', '/api/auth', controller.auth)
}
