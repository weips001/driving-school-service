// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/controller/admin');
import ExportAuth = require('../../../app/controller/auth');
import ExportCommon = require('../../../app/controller/common');
import ExportRole = require('../../../app/controller/role');
import ExportRoleAuth = require('../../../app/controller/roleAuth');
import ExportSchool = require('../../../app/controller/school');
import ExportUser = require('../../../app/controller/user');
import ExportUserRole = require('../../../app/controller/userRole');
import ExportVip = require('../../../app/controller/vip');

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    auth: ExportAuth;
    common: ExportCommon;
    role: ExportRole;
    roleAuth: ExportRoleAuth;
    school: ExportSchool;
    user: ExportUser;
    userRole: ExportUserRole;
    vip: ExportVip;
  }
}
