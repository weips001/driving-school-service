// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/service/admin');
import ExportCommon = require('../../../app/service/common');
import ExportPlace = require('../../../app/service/place');
import ExportVip = require('../../../app/service/vip');

declare module 'egg' {
  interface IService {
    admin: ExportAdmin;
    common: ExportCommon;
    place: ExportPlace;
    vip: ExportVip;
  }
}
