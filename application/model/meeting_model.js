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
  
 const meetingModel = {};
  /**
   * This function is using to
   * @param     :
   * @returns   :
   * @developer :
   */
 
 meetingModel.insertMeeting = async function (body, userId) {
   let deferred = q.defer();
   
     if (body) {
       let date = await helper.getUtcTime();
       let insertObj = {
         mt_uuid: v4(Date.now()),
         mt_fk_uc_uuid: userId,
         mt_videourl: body.liveVideo,
         mt_deleted:"0",
         mt_active: "1",
         mt_created:date,
       };
  
       let results = await mongoHelper.insert(insertObj, "meeting_details");
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
 meetingModel.deletemeeting = async function (body) {
   let deferred = q.defer();
 
   if (body.brodcastId) {
     let selectObj = {
       mt_uuid:body.brodcastId,
     };
   
     let updateObj = {
         mt_deleted: "1",
       },
       result = await mongoHelper.updateData(
         selectObj,
         "meeting_details",
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
 meetingModel.getmeetingList = async function () {
   let deferred = q.defer();
   let obj = {
     mt_deleted: "0",
   };
   let userArray = await mongoHelper.getmeetingListData(
     obj,
     "meeting_details"
   );
 
   if (userArray && userArray.data && userArray.data.length > 0) {
     for (const result of userArray.data) {
       result.mt_created = helper.dateFormat(result.mt_created, "date");
 
     }
 
     deferred.resolve(userArray.data);
   } else {
     deferred.resolve([]);
   }
   return deferred.promise;
 };
 module.exports = meetingModel;