/**
* This function is using to
* @param     :
* @returns   :
* @developer :
*/
const helper      = require("../helpers/index"),
iqumahModel = require("../model/iqumah_model");
let iqumahObj = {};

/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
iqumahObj.insertIqumah = async function (req, res) {
  let user = helper.getUidByToken(req);
    if ( user && user.userId ) { 
      console.log(req.body, " req.body req.body req.body req.body req.body");
      if ( req &&  req.body && req.body.FajrTime && req.body.DuhaTime && req.body.DhuhrTime && req.body.AsrTime && req.body.MaghribTime && req.body.IshaTime
      ) {
      let result = await iqumahModel.insertIqumah(req.body, user.userId);
      console.log(result,"resultresultresultresultresultresultresultresultresultresultresult")

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

iqumahObj.iqumahListAjax = async function(req, res) {
  let user   = helper.getUidByToken(req);
    if ( user && user.userId ) {
      let result = await iqumahModel.getIqumahList();

      res.render('iqumahListAjax',{ 
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

iqumahObj.deleteIqumah = async function (req, res) {
    let user = helper.getUidByToken(req);
  
    if (user && user.userId) {
      if (req && req.body && req.body.iqamahId) {
        let result = await iqumahModel.deleteIqumah(req.body);
  
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
module.exports = iqumahObj;