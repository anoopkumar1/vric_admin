
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
 
 const upcomingModel = {};
 
 /** 
 * 
 * This model is using to update image
 * @param     :
 * @returns   :
 * @developer : 
 */
 upcomingModel.uploadImage = async function(userId, file,eventDescription,eventHeading,startDate,endDate) {
   let deferred = q.defer();
   let date = await helper.getUtcTime();
   if ( userId && file  && eventDescription &&eventHeading &&startDate &&endDate) {       
       let selectObjOne      = {
         uce_uuid:v4(Date.now()),
         uce_fk_uc_uuid: userId,
         uce_event_image: file,
         uce_event_heading: eventHeading,
         uce_event_description: eventDescription,
         uce_event_startDate:startDate,
         uce_event_endDate:endDate,
         uce_active: "1",
         uce_deleted: "0", 
         uce_created: date,
         uce_updated: date,
       };
        
       let resultOne       = await mongoHelper.insert(selectObjOne,'upcoming_events'); 
       if ( resultOne ) {
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
upcomingModel.getupcomingList = async function () {
    let deferred = q.defer();
    let obj = {
      uce_deleted: "0",
    };
    let userArray = await mongoHelper.getupcomingListData(
      obj,
      "upcoming_events"
    );
  
    if (userArray && userArray.data && userArray.data.length > 0) {
      for (const result of userArray.data) {
        result.uce_created = helper.dateFormat(result.uce_created, "date");
  
        // let adminObj = {
        //     uce_uuid: result.uce_fk_au_uuid,
        // };
  
        // let adminData = await mongoHelper.getData(adminObj, "admin_users");
  
        // if (adminData && adminData.length > 0) {
        //   result.admin_name = adminData[0].uce_type;
        // }
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
 upcomingModel.deleteupcoming = async function (body) {
  let deferred = q.defer();

  if (body.upcomingId) {
    let selectObj = {
      uce_uuid: body.upcomingId,
    };
    // console.log(selectObj,"selllelellelelelelelelelasllslslslsl")
   
    let updateObj = {
      uce_deleted: "1",
      
      };
      result = await mongoHelper.updateData(
        selectObj,
        "upcoming_events",
        updateObj
      );
// console.log(result,"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
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
* @param     :
* @returns   :
* @developer :
*/
upcomingModel.deleteupcoming = async function (body) {
  let deferred = q.defer();

  if (body.upcomingId) {
    let selectObj = {
      uce_uuid: body.upcomingId,
    };
   
    let updateObj = {
      uce_deleted: "1",
      
      };
      

      result = await mongoHelper.updateData(
        selectObj,
        "upcoming_events",
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
module.exports = upcomingModel;
