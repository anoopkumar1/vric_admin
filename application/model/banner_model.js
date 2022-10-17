/**
 * Copyright (C) Zero IT Solutions - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential. Dissemination of this information or reproduction 
 * of this material is strictly forbidden unless prior written permission is obtained
 * from Zero IT Solutions.
* 
* Written By  : Rohit kumar <rohit.zeroit@gmail.com>, April 2022
* Description :
* Modified By :
*/
const q = require("q"),
  passwordHash = require("password-hash"),
  { v4 } = require("uuid"),
  helper = require("../helpers/index"),
  mongoHelper = require("../helpers/mongo_helper");

const bannerModel = {};

/** 
* 
* This model is using to update image
* @param     :
* @returns   :
* @developer : 
*/
bannerModel.uploadImage = async function (userId, file) {
  let deferred = q.defer();
  if (userId && file) {
    let date = await helper.getUtcTime();

    let selectObjOne = {
      ahb_uuid: v4(Date.now()),
      ahb_fk_uc_uuid: userId,
      ahb_bannerimage: file,
      ahb_active: "1",
      ahb_deleted: "0",
      abh_created: date,
    };
    let resultOne = await mongoHelper.insert(selectObjOne, 'admin_home_banner');
    if (resultOne) {
      deferred.resolve(true);

    } else {
      deferred.resolve(false);

    }

  } else {
    deferred.resolve(false);
  }
  return deferred.promise;

}
/**
* This function is using
* @param     :
* @returns   :
* @developer :
*/
bannerModel.deleteBanner = async function (body) {
  let deferred = q.defer();
  if (body.bannerId) {
    let selectObj = {
      ahb_uuid: body.bannerId,
    };
    let updateObj = {
      ahb_deleted: "1",
    },
      result = await mongoHelper.updateData(
        selectObj,
        "admin_home_banner",
        updateObj
      );

    if (result) {
      deferred.resolve(true);
    } else {
      deferred.resolve(false);
    }
  } else {
    deferred.resolve(false);
  }

  return deferred.promise;
};

/**
* This function is using for get keys list
* @param     :
* @returns   :
* @developer :
*/
bannerModel.getbannerList = async function () {

  let deferred = q.defer();
  let UserObj = {
    ahb_deleted: "0",
  };
  let userArray = await mongoHelper.getbannerListData(
    UserObj,
    "admin_home_banner"
  );

  if (userArray && userArray.data && userArray.data.length > 0) {
    for (const result of userArray.data) {

      result.uce_created = helper.dateFormat(result.uce_created, "date");

      // let adminObj = {
      //     abh_uuid: result.abh_fk_au_uuid,
      // };

      // let adminData = await mongoHelper.getData(adminObj, "admin_users");

      // if (adminData && adminData.length > 0) {
      //   result.admin_name = adminData[0].abh_type;
      // }
    }



    deferred.resolve(userArray.data);
  } else {
    deferred.resolve([]);
  }
  return deferred.promise;
};
module.exports = bannerModel;
