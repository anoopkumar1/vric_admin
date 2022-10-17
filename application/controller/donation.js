/**
 * Copyright (C) Zero IT Solutions - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential. Dissemination of this information or reproduction 
 * of this material is strictly forbidden unless prior written permission is obtained
 * from Zero IT Solutions.
 
 * 
 * Written By  : Diksha Jaswal <dikshaj.zeroit@gmail.com>, May 2022
 * Description :
 * Modified By :
 */
const helper = require("../helpers/index"),
  mongoHelper = require("../helpers/mongo_helper"),
 donationModel = require("../model/donation_model");

let donationObj = {};
 
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
 donationObj.insertDonation = async function (req, res) {
    let user = helper.getUidByToken(req);
  
    if (user && user.userId) {
      if (
        req &&
        req.body &&
        req.body.userfirstName &&
        req.body.userlastName &&
        req.body.userEmail &&
        req.body.userNumber 
        
      ) {
        let result = await donationModel.insertDonation(req.body, user.userId);
  
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
        donationObj.donationListAjax = async function (req, res) {
          let user = helper.getUidByToken(req);
        
          if (user && user.userId) {
            let result = await donationModel.getdonationListData();
        
            res.render("donationListAjax", {
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
        donationObj.deleteDonation = async function (req, res) {
          let user = helper.getUidByToken(req);
        
          if (user && user.userId) {
            if (req && req.body && req.body.donationId) {
              let result = await donationModel.deletedonation(req.body);
        
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
 * This is using function Export Excel Lists
 * @param
 * @developer
 * @return
 */
// Donation lists controller 
  const excelJS = require("exceljs");
  
  let workbook = new excelJS.Workbook();
  let worksheet = workbook.addWorksheet("Tutorials");
  
  donationObj.exportUser = async function (req, res) {

    const workbook = new excelJS.Workbook(); // Create a new workbook
    const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
    const path = "admin/application/file"; // Path to download excel
    // Column for data in excel. key must match data key
    worksheet.columns = [
        { header: "S no.", key: "s_no", width: 10 },
        { header: "First Name", key: "du_firstname", width: 10 },
        { header: "Last Name", key: "du_lastname", width: 10 },
        { header: "Email Id", key: "du_email", width: 10 },
        { header: "Gender", key: "du_phonenumber", width: 10 },
        { header: "Country", key: "du_country", width: 10 },
       ];

          let selectObj = {
            du_active : '1'
          };
          let User = await mongoHelper.getData(selectObj,'donation_users');
         
          let counter = 1;
          User.forEach((user) => { 
              user.s_no = counter;
              worksheet.addRow(user); // Add data in worksheet
              counter++;``
          });
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














module.exports = donationObj;