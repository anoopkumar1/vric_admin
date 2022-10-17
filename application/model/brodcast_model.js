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
const { async, defer } = require("q");
const q = require("q"),
passwordHash = require("password-hash"),
{ v4 } = require("uuid"),
helper = require("../helpers/index"),
mongoHelper = require("../helpers/mongo_helper");
 
const brodcastModel = {};
 /**
  * This function is using to
  * @param     :
  * @returns   :
  * @developer :
  */

brodcastModel.insertBrodcast = async function (body, userId) {
  let deferred = q.defer();
  
    if (body) {
      let date = await helper.getUtcTime();
      let insertObj = {
        lbc_uuid: v4(Date.now()),
        lbc_fk_uc_uuid: userId,
        lbc_videourl: body.liveVideo,
        lbc_deleted:"0",
        lbc_active: "1",
        lbc_created:date,
      };
 
      let results = await mongoHelper.insert(insertObj, "live_broadcasts");
      if (results) {
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
 * This function is using
 * @param     :
 * @returns   :
 * @developer :
 */
brodcastModel.deletebrodcast = async function (body) {
  let deferred = q.defer();

  if (body.brodcastId) {
    let selectObj = {
      lbc_uuid:body.brodcastId,
    };
  
    let updateObj = {
        lbc_deleted: "1",
      },
      result = await mongoHelper.updateData(
        selectObj,
        "live_broadcasts",
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
brodcastModel.getbrodcastList = async function () {
  let deferred = q.defer();
  let obj = {
    lbc_deleted: "0",
  };
  let userArray = await mongoHelper.getbrodcastListData(
    obj,
    "live_broadcasts"
  );

  if (userArray && userArray.data && userArray.data.length > 0) {
    for (const result of userArray.data) {
      result.lbc_created = helper.dateFormat(result.lbc_created, "date");

    }

    deferred.resolve(userArray.data);
  } else {
    deferred.resolve([]);
  }

  return deferred.promise;
};
module.exports = brodcastModel;