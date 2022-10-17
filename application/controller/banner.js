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
const { async } = require('q');
const  helper              = require('../helpers/index'),
fs                         = require('fs'),
path                       = require('path'),
Busboy 			               = require('busboy'), 

constants   = require('../../../common/config/constants'),
constant   = require('../../../common/config/constants'),
bannerModel          = require('../model/banner_model');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
let bannerObj = {};

bannerObj.uploadProfilepicImage = async function(req, res) {
	let userId   = helper.getUidByToken(req);
	if ( userId.userId  ) {

		let conObj = await constant.getConstant(),
			chunks = [], fName, fType, fEncoding,
			busboy = Busboy({ headers: req.headers });           

		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
           let ext = (path.extname(filename.filename).toLowerCase());
            if ( ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' ) {
				
				let obj =  {
					status  : true,
					code    : "",
					message : "invalid extension!",
					payload : []
				};

				chunks.push(obj);
				file.resume();
			
			} else {

				let newName = Date.now() + ext;
				// let newName = Date.now() + '-testaws' + ext;

				fName       = newName.replace(/ /g,"_");
				fType       = mimetype;
                fEncoding   = encoding;
				
				file.on('data', function(data) {
					chunks.push(data);
				});
				
				file.on('end', function() {
					// console.log('File [' + filename + '] Finished');
				});
			}
		});

		busboy.on('finish', async function() {

			let fileObj 	= {
				fileName    : fName,
				chunks      : chunks,
				encoding    : fEncoding,
				contentType : fType,
             	uploadFolder:  conObj.PROFILE_IMAGE_PATH
			};

           let returnObj 	= await helper.uploadFile(fileObj);
			let obj 		= {};
			if ( returnObj ) {				
				let image 	= await bannerModel.uploadImage(userId.userId , fName);
					
				if ( image ) {
					let returnRes 	= '';
				
					if ( returnObj.Location ) {
						returnRes 	= returnObj.Location;
                      
                    	}
					obj.payload 	= returnRes;
                
				}
				chunks.push(obj);
			}
			helper.successHandler(res, obj);
		});

		return req.pipe(busboy);
	
	} else {
		let obj = {
			status 		: false,
			code        : "UPI-E1001",
			message		: "Unauthorized Error."
		};
		helper.errorHandler(res, obj, 401);
	}
  
}

bannerObj.bannerListAjax = async function(req, res) {

	let user   = helper.getUidByToken(req);
  
	if ( user && user.userId ) {
  
		let result = await bannerModel.getbannerList();
	   
		res.render('bannerListAjax',{ 
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
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
bannerObj.deleteBanner = async function (req, res) {
	let user = helper.getUidByToken(req);

		if (user && user.userId) {
			if (req && req.body && req.body.bannerId) {
				let result = await bannerModel.deleteBanner(req.body);

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
module.exports = bannerObj;

