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
mongoHelper = require("../helpers/mongo_helper"),
userModel = require("../model/user_model");

let userObj = {};


/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
userObj.insertUser = async function (req, res) {
    let user = helper.getUidByToken(req);
    if (user && user.userId) {
        console.log(user.userId,"00000000000000000000000000000000000000")
        if (
        req &&
        req.body &&
        req.body.userName &&
        req.body.userEmail 

        ) {
        let result = await userModel.insertUser(req.body);
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
userObj.userListAjax = async function (req, res) {
    let user = helper.getUidByToken(req);
    if (user && user.userId) {
        let result = await userModel.getuserListData();

        res.render("userListAjax", {
        req: req,
        data: result,
        });
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
userObj.deleteUser = async function (req, res) {
    let user = helper.getUidByToken(req);

    if (user && user.userId) {
        if (req && req.body && req.body.userId) {
        let result = await userModel.deleteuser(req.body);

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
 * This is using to
 * @param       :
 * @returns     :
 * @developer   :
 */


/**
* This function is using to get_userData
*/
userObj.get_userData = async function(req, res) {
    let user = helper.getUidByToken(req); 
    if(user  && user.userId){
        helper.successHandler(res, {
        code:'ok',
        message: "success.",
        payload: user,
        status:true,
        });
    } else {
        helper.errorHandler(res, {
        code: "error",
        message: "Please Login.",
        payload:'',
        status: false,
        });
    }   
}
    
/**
 * This is using to
 * @param       :
 * @returns     :
 * @developer   :
 */
userObj.adminLogout = async function (req, res) {
    res.clearCookie('token');
    helper.successHandler(res, {});
    
};

/**
 * This is using function Export Excel Lists
 * @param
 * @developer
 * @return
 */
// Donation lists controller 
const excelJS = require("exceljs");
        
let workbook = new excelJS.Workbook();
let worksheet = workbook.addWorksheet("Tutorials");

userObj.exportexcelUser = async function (req, res) {

  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
  const path = "admin/application/file"; // Path to download excel
  // Column for data in excel. key must match data key
  worksheet.columns = [
      { header: "S no.", key: "s_no", width: 10 },
      { header: "First Name", key: "uc_name", width: 10 },
      { header: "Email Id", key: "uc_email", width: 10 },
      { header: "Created Date", key: "uc_created", width: 10 },

  ];

  let selectObj = {
    uc_active : '1'
  };
  let User = await mongoHelper.getData(selectObj,'users_credential');
 
  let counter = 1;
  User.forEach((user) => { 
      user.s_no = counter;
      worksheet.addRow(user); // Add data in worksheet
      counter++;``
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
  });
  try {
    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });

  } catch (err) {
      res.send({
          status: "error",
          message: "Something went wrong",
      });
  }
};
module.exports = userObj;