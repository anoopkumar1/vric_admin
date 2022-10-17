/**
 * Copyright (C) Zero IT Solutions - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential. Dissemination of this information or reproduction 
 * of this material is strictly forbidden unless prior written permission is obtained
 * from Zero IT Solutions.
 
* 
* Written By  : Rohit kumar <mailto:rohit.zeroit@gmail.com>, April 2022
* Description :
* Modified By :
*/
const q = require("q"),
  passwordHash = require("password-hash"),
  { v4 } = require("uuid"),
  helper = require("../helpers/index"),
  mongoHelper = require("../helpers/mongo_helper");

const announcementsModel = {};

/** 
* 
* This model is using to update image
* @param     :
* @returns   :
* @developer : 
*/
announcementsModel.uploadImage = async function (userId, titleName, file) {
  let deferred = q.defer();

  // if ( userId && file && titleName) {
  let selectObjOne = {
    ann_uuid: v4(Date.now()),
    ann_fk_uc_uuid: userId,
    ann_image_url: file,
    ann_image_title: titleName,
    ann_active: "1",
    ann_deleted: "0",
  };
  //let resultOne       = await mongoHelper.updateData(selectObjOne,'announcements',updateObjOne);
  let resultOne = await mongoHelper.insert(selectObjOne, 'announcements');
  if (resultOne) {
    deferred.resolve(true);

  } else {
    deferred.resolve(false);

  }

  // } else {
  //     deferred.resolve(false); 
  // }
  return deferred.promise;

}

/**
* This function is using
* @param     :
* @returns   :
* @developer :
*/
announcementsModel.deleteannouncements = async function (body) {
  let deferred = q.defer();

  if (body.announcementsId) {
    let selectObj = {
      ann_uuid: body.announcementsId,
    };

    let updateObj = {
      ann_deleted: "1",
    },
      result = await mongoHelper.updateData(
        selectObj,
        "announcements",
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
announcementsModel.getannouncementsList = async function () {
  let deferred = q.defer();
  let obj = {
    ann_deleted: "0",
  };

  let userArray = await mongoHelper.getannouncementsListData(
    obj,
    "announcements"
  );

  if (userArray && userArray.data && userArray.data.length > 0) {
    for (const result of userArray.data) {
      result.ann_created = helper.dateFormat(result.ann_created, "date");

      // let adminObj = {
      //   ann_uuid: result.ann_fk_au_uuid,
      // };

      // let adminData = await mongoHelper.getData(adminObj, "admin_users");

      // if (adminData && adminData.length > 0) {
      //   result.admin_name = adminData[0].ann_type;
      // }
    }

    deferred.resolve(userArray.data);
  } else {
    deferred.resolve([]);
  }

  return deferred.promise;
};
module.exports = announcementsModel;