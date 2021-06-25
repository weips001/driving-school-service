module.exports = app => {
  const { router, controller } = app
  router.resources('place', '/place', controller.place)
}
