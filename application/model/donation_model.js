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

const donationModel = {};
/**
*
* This function is using to
* @param     :
* @returns   :
* @developer :
*/
donationModel.insertDonation= async function (body, userId) {
  let deferred = q.defer();

  if (body.userfirstName  && body.userlastName && body.userEmail&& body.userNumber && body.userAddress1  && body.userAddress2&& body.userCountry) {
    let date = await helper.getUtcTime();
      let insertObj = {
        du_uuid: v4(Date.now()),
        du_fk_au_uuid:userId,
        du_firstname:body.userfirstName,
        du_lastname:body.userlastName,
        du_email: body.userEmail,
        du_phonenumber:body.userNumber,
        du_address1:body.userAddress1,
        du_address2:body.userAddress2,
        du_country:body.userCountry,

        du_state:"",
        du_city:"",
        du_zipcode:"",
        du_comments:"",    
        du_category: "",
        du_active: "1",
        du_deleted: "0",
        du_created: date,
        du_updated: date,
      };
  let results = await mongoHelper.insert(insertObj, "donation_users");

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
donationModel.getdonationListData= async function () {
  let deferred = q.defer();
    let obj = {
      du_deleted: "0",
    };
     
      let userArray = await mongoHelper.getdonationListData(
        obj,
        "donation_users"
      );
    
      if (userArray && userArray.data && userArray.data.length > 0) {
        for (const result of userArray.data) {
          result.du_created = helper.dateFormat(result.du_created, "date");
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
donationModel.deletedonation = async function (body) {
  let deferred = q.defer();
    
    if (body.donationId) {
      let selectObj = {
        du_uuid: body.donationId,
      };
     
        let updateObj = {
            du_deleted: "1",
        },
          result = await mongoHelper.updateData(
            selectObj,
            "donation_users",
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
    
};
module.exports = donationModel;