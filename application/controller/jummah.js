/**
 * Copyright (C) Zero IT Solutions - All Rights Reserved
 */
const helper = require("../helpers/index"),
jummahModel = require("../model/jummah_model");
const mongoHelper = require("../helpers/mongo_helper"); 
let jummahObj = {};

/**
* This function is using to
* @param     :
* @returns   :
* @developer :
*/
jummahObj.insertJummah = async function (req, res) {
  let user = helper.getUidByToken(req);

 if (user && user.userId) {
    if (

      req &&
      req.body &&
      req.body.jummahType&&
      req.body.adhanTime &&
      req.body.IqamahTime &&
      req.body.jummahDate &&
      req.body.KhateebName 
    ) {
      let result = await jummahModel.insertJummah(req.body, user.userId);

      helper.successHandler(res, {});
    } else {
      helper.errorHandler(res, {
        code: "ASL-E1002",
        message: "Please fill manadatory fields.",
        status: false,
      });
    }

   
 } else {
  console.log(req.bod,"reqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreq")

   helper.errorHandler(res, {
     code: "ASL-E1002",
     message: "Unauthorized Errordsrgfvsrgvbsbgvdfsr.",
     status: false,
   });
 }
};



/**
 * This is using to
 * @param       :
 * @returns     :
 * @developer   :
 */
jummahObj.editJummah = async function (req, res) {
  let user = helper.getUidByToken(req);

  if (user && user.userId) {
    
    if(req.body && req.body.jummahType && req.body.adhanTime && req.body.IqamahTime && req.body.jummahDate  && req.body.KhateebName ){

      let result = await  jummahModel.editJummah(req.body, user.userId);
      if(result){
        helper.successHandler(res, {
          payload:'update success.'
        });
      }else{
        helper.successHandler(res,{
          code: "ASL-E1002",
          message: "Please fill manadatory fields.",
          status: false,
        });
      }
     
    } else {
      
      helper.successHandler(res,{
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
jummahObj.deleteJummah = async function (req, res) {
  let user = helper.getUidByToken(req);

  if (user && user.userId) {
    if (req && req.body && req.body.jummahId) {
      let result = await jummahModel.deleteJummah(req.body);

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
 * get_jummah_data_by_id
 */
jummahObj.get_jummah_data_by_id= async function (req, res){
  const user = helper.getUidByToken(req);
  const id=req.params.id;
  const selectObj={jd_uuid:id};

if(id && user.userId){
  const data=await mongoHelper.getRow(selectObj, "jummah_details");
  if(data){
  return helper.successHandler(res,{
    payload:data
    });
  }
}

return  helper.errorHandler(res,{
  code: "ASL-E1002",
  message: "Unauthorized Error.",
  status: false,
});

};
  
/**
* This function is using to 
* @param     : 
* @returns   : 
* @developer : 
*/
jummahObj.jummahListAjax = async function(req, res) {
  let user   = helper.getUidByToken(req);
    if ( user && user.userId ) {
      let result = await jummahModel.getJummahList();

      res.render('jummahListAjax',{ 
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

module.exports = jummahObj;