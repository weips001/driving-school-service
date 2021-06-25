module.exports = app => {
  const { router, controller } = app
  router.post('/vip/consume/:id', controller.vip.consume)
  router.resources('vip', '/vip', controller.vip)
}
