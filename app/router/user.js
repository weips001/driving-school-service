module.exports = app => {
  const { router, controller } = app
  router.get('/user/login', controller.user.login)
  router.get('/user/currentUser', controller.user.getCurrentUser)
  router.resources('user', '/api/user', controller.user)
}
