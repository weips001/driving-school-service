module.exports = app => {
  const { router, controller } = app
  router.resources('school', '/api/school', controller.school)
}
