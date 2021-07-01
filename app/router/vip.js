module.exports = app => {
  const { router, controller } = app
  router.post('/vip/consume/:id', controller.vip.consume)
  router.resources('vip', '/vip', controller.vip)
}
// car, carManagement, addCar, editCar,
// dict, studentSource
// fund, fundList, addFundConfig, editFundConfig
// school, School, addSchool, editSchool, regionList, 
// regionAdd, regionEdit, classicList, classicAdd, classicEdit, signUp
// signUpAdd, signUpEdit
// student, studentList, studentListAdd, studentListEdit
// userSetting, user, addUser, editUser, role, addRole, editRole