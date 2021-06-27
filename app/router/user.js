module.exports = app => {
  const { router, controller } = app
  router.get('/user/login', controller.user.login)
  router.get('/api/user/currentUser', controller.user.getCurrentUser)
  router.resources('user', '/api/user', controller.user)
}
