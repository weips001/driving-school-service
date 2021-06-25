// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/model/admin');
import ExportPlace = require('../../../app/model/place');
import ExportUser = require('../../../app/model/user');
import ExportVip = require('../../../app/model/vip');

declare module 'egg' {
  interface IModel {
    Admin: ReturnType<typeof ExportAdmin>;
    Place: ReturnType<typeof ExportPlace>;
    User: ReturnType<typeof ExportUser>;
    Vip: ReturnType<typeof ExportVip>;
  }
}
