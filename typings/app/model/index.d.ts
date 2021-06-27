// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/model/admin');
import ExportAuth = require('../../../app/model/auth');
import ExportRole = require('../../../app/model/role');
import ExportRoleAuth = require('../../../app/model/roleAuth');
import ExportSchool = require('../../../app/model/school');
import ExportUser = require('../../../app/model/user');
import ExportUserRole = require('../../../app/model/userRole');
import ExportVip = require('../../../app/model/vip');
import ExportWeUser = require('../../../app/model/weUser');

declare module 'egg' {
  interface IModel {
    Admin: ReturnType<typeof ExportAdmin>;
    Auth: ReturnType<typeof ExportAuth>;
    Role: ReturnType<typeof ExportRole>;
    RoleAuth: ReturnType<typeof ExportRoleAuth>;
    School: ReturnType<typeof ExportSchool>;
    User: ReturnType<typeof ExportUser>;
    UserRole: ReturnType<typeof ExportUserRole>;
    Vip: ReturnType<typeof ExportVip>;
    WeUser: ReturnType<typeof ExportWeUser>;
  }
}
