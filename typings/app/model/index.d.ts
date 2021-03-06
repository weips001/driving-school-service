// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/model/admin');
import ExportAuth = require('../../../app/model/auth');
import ExportPlace = require('../../../app/model/place');
import ExportRole = require('../../../app/model/role');
import ExportRoleAuth = require('../../../app/model/roleAuth');
import ExportUser = require('../../../app/model/user');
import ExportUserRole = require('../../../app/model/userRole');
import ExportVip = require('../../../app/model/vip');
import ExportWeUser = require('../../../app/model/weUser');

declare module 'egg' {
  interface IModel {
    Admin: ReturnType<typeof ExportAdmin>;
    Auth: ReturnType<typeof ExportAuth>;
    Place: ReturnType<typeof ExportPlace>;
    Role: ReturnType<typeof ExportRole>;
    RoleAuth: ReturnType<typeof ExportRoleAuth>;
    User: ReturnType<typeof ExportUser>;
    UserRole: ReturnType<typeof ExportUserRole>;
    Vip: ReturnType<typeof ExportVip>;
    WeUser: ReturnType<typeof ExportWeUser>;
  }
}
