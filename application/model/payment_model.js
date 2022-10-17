/**
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
 
 const paymentModel = {};
 /**
  * This function is using to
  * @param     :    
  * @returns   :
  * @developer :
  */
paymentModel.insertPayment = async function (body) {
  let deferred = q.defer();
  if ( body.userType && body.userstartPayment&& body.userendPayment ) { 

    let date = await helper.getUtcTime();
    let insertObj = {
       po_uuid: v4(Date.now()),
       po_type: body.userType,
       po_start_value:body.userstartPayment,
       po_end_value: body.userendPayment, 
       po_active: "1",
       po_deleted: "0",
       po_created:date,
    };

    let results = await mongoHelper.insert(insertObj,"payment_occurrences"); 

    if ( results ) {
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
paymentModel.deletepayment = async function (body) {
  let deferred = q.defer();

  if (body.paymentId) {
    let selectObj = {
      po_uuid:body.paymentId,
    };
    // console.log(selectObj,"ojpaymenttttttttnttttttttttttttttttt")

    let updateObj = {
        po_deleted: "1",
      },
      result = await mongoHelper.updateData(
        selectObj,
        "payment_occurrences",
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
paymentModel.getpaymentList = async function () {
  let deferred = q.defer();
  let obj = {
    po_deleted: "0",
  };
  // console.log(obj,"hgjgjhrfgrtekjgfkr")
  let userArray = await mongoHelper.getpaymentListData(
    obj,
    "payment_occurrences"
  );

  if (userArray && userArray.data && userArray.data.length > 0) {
    for (const result of userArray.data) {
      result.po_created = helper.dateFormat(result.po_created, "date");

      // let adminObj = {
      //   po_uuid: result. po_fk_au_uuid,
      // };

      // let adminData = await mongoHelper.getData(adminObj, "admin_users");

      // if (adminData && adminData.length > 0) {
      //   result.admin_name = adminData[0].po_type;
      // }
    }

    deferred.resolve(userArray.data);
  } else {
    deferred.resolve([]);
  }

  return deferred.promise;
};


 module.exports = paymentModel;