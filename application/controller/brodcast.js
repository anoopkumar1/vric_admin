/** 
 * Written By  : Diksha Jaswal <dikshaj.zeroit@gmail.com>, May 2022
 * Description :
 * Modified By :
 */
const { async } = require('q');

const helper = require("../helpers/index"),
fs                         = require('fs'),
path                       = require('path'),
Busboy 			               = require('busboy'),
brodcastModel = require("../model/brodcast_model");
let brodcastObj = {};
/**
* This function is using to
* @param     :
* @returns   :
* @developer :
*/
brodcastObj.insertBrodcast = async function (req, res) {
  let user = helper.getUidByToken(req);
 if (user && user.userId) {
    if (
      req &&
      req.body &&
      req.body.liveVideo
    ) { 
      let result = await brodcastModel.insertBrodcast(req.body, user.userId);
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
     message: "Unauthorized Errordsrgfvsrgvbsbgvdfsr.",
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
brodcastObj.deleteBrodcast = async function (req, res) {
  let user = helper.getUidByToken(req);
  if (user && user.userId) {
    if (req && req.body && req.body.brodcastId) {
    let result = await brodcastModel.deletebrodcast(req.body);
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

brodcastObj.BrodcastListAjax= async function(req, res) {
  let user   = helper.getUidByToken(req);
  if ( user && user.userId ) {
    let result = await brodcastModel.getbrodcastList();
    res.render('brodcastListAjax',{ 
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
module.exports = brodcastObj;