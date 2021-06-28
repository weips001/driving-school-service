// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/service/admin');
import ExportAuth = require('../../../app/service/auth');
import ExportCommon = require('../../../app/service/common');
import ExportRole = require('../../../app/service/role');
import ExportRoleAuth = require('../../../app/service/roleAuth');
import ExportSchool = require('../../../app/service/school');
import ExportUser = require('../../../app/service/user');
import ExportUserRole = require('../../../app/service/userRole');
import ExportVip = require('../../../app/service/vip');

declare module 'egg' {
  interface IService {
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
