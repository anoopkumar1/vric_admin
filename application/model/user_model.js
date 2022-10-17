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
  
 const userModel = {};
 /**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
 userModel.insertUser = async function (body, userId) {
   let deferred = q.defer();
   if (body.userName && body.userEmail ) {
     let date = await helper.getUtcTime();
     let insertObj = {
       uc_uuid: v4(Date.now()),
       uc_fk_au_uuid: userId,
       uc_name: body.userName,
       uc_email: body.userEmail,
       uc_balance: 3256,
       uc_image: "",
       uc_active: "1",
       uc_deleted: "0",
       uc_created: date,
       uc_updated: date,
     };
     let results = await mongoHelper.insert(insertObj, "users_credential");
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
 userModel.getuserListData = async function () {
   let deferred = q.defer();
   let obj = {
     uc_deleted: "0",
   };
   let userArray = await mongoHelper.getuserListData(
     obj,
     "users_credential"
   );
 
   if (userArray && userArray.data && userArray.data.length > 0) {
     for (const result of userArray.data) {
       result.uc_created = helper.dateFormat(result.uc_created, "date");
 
     //  let adminObj = {
     //    au_uuid: result.uc_fk_au_uuid,
     //  };
 
     //  let adminData = await mongoHelper.getData(adminObj, "admin_users");
 
     //  if (adminData && adminData.length > 0) {
     //    result.admin_name = adminData[0].au_name;
     //  }
     }
 
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
 userModel.deleteuser = async function (body) {
   let deferred = q.defer();
 
   if (body.userId) {
     let selectObj = {
       uc_uuid: body.userId,
     };
     let updateObj = {
         uc_deleted: "1",
       },
       result = await mongoHelper.updateData(
         selectObj,
         "users_credential",
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
  module.exports = userModel;
 