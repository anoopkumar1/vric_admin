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

const jummahModel = {};
/**
* This function is using to
* @param     :
* @returns   :
* @developer :
*/

jummahModel.insertJummah = async function (body, userId) {
  let deferred = q.defer(); 
   //if (body.KhateebName  && body.IqamahTime && body.adhnanTime && body.jummahType) {
    if (body) {
      let date = await helper.getUtcTime();
      let insertObj = {
        jd_uuid: v4(Date.now()),
        jd_fk_au_uuid: userId,
        jd_type: body.jummahType,
        jd_adhan:body.adhanTime,
        jd_iqumah:body.IqamahTime,
        jd_khateeb: body.KhateebName,
        jd_jummahdate:body.jummahDate,
        jd_active: "1",
        jd_deleted: "0",
        jd_created: date,
        jd_updated: date,
      };
      let results = await mongoHelper.insert(insertObj, "jummah_details");
 
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
* This function is using for get keys list
* @param     :
* @returns   :
* @developer :
*/
jummahModel.getJummahList = async function () {
  let deferred = q.defer();  let obj = {
      jd_deleted: "0",
    };
    let userArray = await mongoHelper.getJummahListData(obj, "jummah_details");
    if (userArray && userArray.data && userArray.data.length > 0) {
      deferred.resolve(userArray.data);
    } else {
      deferred.resolve([]);
    }
  
    return deferred.promise;
  };
  
 
/**
 * This function is using
 * @param     :
 * @returns   :
 * @developer :
 */
jummahModel.deleteJummah = async function (body) {
  let deferred = q.defer();
  if (body.jummahId) {
    let selectObj = {
      jd_uuid: body.jummahId,
    };
    // console.log(selectObj,'0000000000000000000000000000000000')
    let updateObj = {
        jd_deleted: "1",
    },
      result = await mongoHelper.updateData(
        selectObj,
        "jummah_details",
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
 * This function is using
 * @param      :
 * @returns    :
 * @developer  :
 */
jummahModel.editJummah = async function (body) {
  let deferred = q.defer();
    if(body.userId) {

      let selectObj={
        jd_uuid:body.userId
      };
      let updateObj ={
        jd_type: body.jummahType,
        jd_adhan:body.adhanTime,
        jd_iqumah:body.IqamahTime,
        jd_khateeb:body.KhateebName,
        jd_jummahdate:body.jummahDate,
      };
      let result = await mongoHelper.updateData(selectObj,"jummah_details",updateObj);
      if(result){
        deferred.resolve(true);
      }else{
        deferred.resolve(false);
      }

    } else {
      deferred.resolve(false);
    }

  return deferred.promise;
};

module.exports = jummahModel;