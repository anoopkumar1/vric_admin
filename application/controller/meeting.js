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
 meetingModel = require("../model/meeting_model");
 let meetingObj = {};
 /**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
 meetingObj.insertMeeting = async function (req, res) {
   let user = helper.getUidByToken(req);
  if (user && user.userId) {
     if (
       req &&
       req.body &&
       req.body.liveVideo
     ) { 
       let result = await meetingModel.insertMeeting(req.body, user.userId);
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
 meetingObj.deleteMeeting = async function (req, res) {
   let user = helper.getUidByToken(req);
   if (user && user.userId) {
     if (req && req.body && req.body.meetingId) {
     let result = await meetingModel.deletemeeting(req.body);
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
 
 meetingObj.MeetingListAjax= async function(req, res) {
   let user   = helper.getUidByToken(req);
   if ( user && user.userId ) {
     let result = await meetingModel.getmeetingList();
     res.render('meetingListAjax',{ 
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

meetingObj.exportexcelUser = async function (req, res) {

  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
  const path = "admin/application/file"; // Path to download excel
  // Column for data in excel. key must match data key
  worksheet.columns = [
      { header: "S no.", key: "s_no", width: 10 },
      { header: "live Video", key: "mt_name", width: 10 },
      // { header: "Email Id", key: "mt_email", width: 10 },
      // { header: "Created Date", key: "mt_created", width: 10 },

  ];

  let selectObj = {
    mt_active : '1'
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
 module.exports = meetingObj;