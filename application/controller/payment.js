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
const { async } = require("q");
const helper = require("../helpers/index"),
paymentModel = require("../model/payment_model");
let paymentObj = {};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
paymentObj.insertPayment = async function (req, res) {
  let user = helper.getUidByToken(req);

    if (user && user.userId) {
    if (
        // console.log(req.body,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"),
      req &&
      req.body &&
      req.body.userType&&
      req.body.userstartPayment&&
      req.body.userendPayment
    ) {
    let result = await paymentModel.insertPayment(req.body, user.userId);
    // console.log(result,"resultresultresultresultresultresultresultresultresultresultresult")

    helper.successHandler(res, {});
    } else {
    helper.errorHandler(res, {
    code: "ASL-E1002",
    message: "Please fill manadatory fields.",
    status: false,
    });
    }
    } else {
    helper.errorHandler(res, {
    code: "ASL-E1002",
    message: "Unauthorized Error.",
    status: false,
    });
    }
};

/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
paymentObj.deletePayment = async function (req, res) {
  let user = helper.getUidByToken(req);
  
  if (user && user.userId) {
    if (req && req.body && req.body.paymentId) {
    let result = await paymentModel.deletepayment(req.body);
  
    helper.successHandler(res, {});
    } else {
    helper.errorHandler(res, {
      code: "ASL-E1002",
      message: "Please fill manadatory fields.",
      status: false,
    });
    }
  } else {
    helper.errorHandler(res, {
    code: "ASL-E1002",
    message: "Unauthorized Error.",
    status: false,
    });
  }
};

paymentObj.paymentListAjax= async function(req, res) {
  let user   = helper.getUidByToken(req);
  if ( user && user.userId ) {
    let result = await paymentModel.getpaymentList();
    res.render('paymentListAjax',{ 
      req          : req , 
      data         : result,
    });

  } else {
    helper.errorHandler(res, {
    code 	: 'ASL-E1002',
    message : 'Unauthorized Error.',
    status  : false
    });
  }
}
module.exports = paymentObj;