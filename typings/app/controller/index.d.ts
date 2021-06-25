// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/controller/admin');
import ExportCommon = require('../../../app/controller/common');
import ExportPlace = require('../../../app/controller/place');
import ExportVip = require('../../../app/controller/vip');

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    common: ExportCommon;
    place: ExportPlace;
    vip: ExportVip;
  }
}
