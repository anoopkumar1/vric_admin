/**
 * Copyright (C) Zero IT Solutions - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 */
const { async } = require('q');
const  helper              = require('../helpers/index'),
fs                         = require('fs'),
path                       = require('path'),
Busboy 			        = require('busboy'),
constants   = require('../../../common/config/constants'),
constant   = require('../../../common/config/constants'),   
announcementsModel          = require('../model/announcements_model');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
let announcementsObj = {};

announcementsObj.uploadProfileImage = async function(req, res) {
	let userId   = helper.getUidByToken(req);
	if ( userId.userId ) {
	let conObj = await constant.getConstant(),
	chunks = [], fName, fType, fEncoding,
		busboy =  Busboy({ headers: req.headers });
		var abc    = [];
		var newName = '';
		const buffers   = {};
		const fields    = {};    
		busboy.on('field', async (fieldname, val) => {
		fields[fieldname] = val;
		});   

		busboy.on('file', function(fieldname, file, filename, _encoding, mimetype) {
			buffers[fieldname] = [] 

			var ext = (path.extname(filename.filename).toLowerCase());
			if ( ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' ) {	
				let obj =  {
					status  : true,
					code    : "",
					message : "invalid extension!",
					payload : []
				};
				
			abc.push(obj);
			file.resume();
			} else {
			newName = Date.now() + ext;
			fName       = newName.replace(/ /g,"_");
			fType       = mimetype;
			file.on('data', function(data) {
				chunks.push(data);
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
				let image = announcementsModel.uploadImage( userId.userId,fields.titleName,fName);
					if ( image ) {
						let obj =  {
							payload : newName
						}
						abc.push(obj);
					}
				});
			}
		});
		busboy.on('obj',async function() {
			let titleName = fields.titleName;
			let addressobj     = await announcementsModel.uploadImage("userId",newName,titleName); 
			helper.successHandler( res,{});
		});
		return req.pipe(busboy);	
	} else {
	let obj = {
		status 		: false,
		code        : "UPI-E1001",
		message		: "Unauthorized Error."
	};
	helper.errorHandler(res, obj,401);
	}
}
/**
 * This function is using to
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
announcementsObj.deleteAnnouncements = async function (req, res) {
	let user = helper.getUidByToken(req);

	if (user && user.userId) {
	if (req && req.body && req.body.announcementsId) {
		let result = await announcementsModel.deleteannouncements(req.body);

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



announcementsObj.AnnouncementsListAjax = async function(req, res) {

	let user   = helper.getUidByToken(req);

	if ( user && user.userId ) {

		let result = await announcementsModel.getannouncementsList();
	
		res.render('announcementAjax',{ 
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
	
module.exports = announcementsObj;