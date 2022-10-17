/**
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
 upcomingModel          = require('../model/upcoming_model');
 const AWS = require('aws-sdk');
 AWS.config.update({ region: 'us-east-1' });
 let upcomingObj = {};
 
 upcomingObj.uploadProfile = async function(req, res) {
	 let userId   = helper.getUidByToken(req);
	 if ( userId ) {
		 let conObj = await constant.getConstant(),
			 chunks = [], fName, fType, fEncoding,
		 busboy =  Busboy({ headers: req.headers });
		 var abc    = [];
		 var newName = '';
		 const fields    = {};
		 const buffers   = {};    
		 busboy.on('field', async (fieldname, val) => {
			 fields[fieldname] = val;
			 });   
		 busboy.on('file', function(fieldname, file, filename, _encoding, mimetype) {
			 buffers[fieldname] = [] 
			 // buffers[fieldname] = [] 
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
					 let image = upcomingModel.uploadImage( "userId",fields.newName,fName);
					 
					 if ( image ) {
						 let obj =  {
							 payload : newName
						 }
						 abc.push(obj);
					 }
				 });
			 }
		 });
		 busboy.on('finish',async function() {
			 let eventHeading = fields.eventHeading;
			 let eventDescription = fields.eventDescription;
			 let startDate = fields.startDate;
			 let endDate = fields.endDate;
 
			 let addressobj     = await upcomingModel.uploadImage("userId",newName,eventDescription,eventHeading,endDate,startDate); 
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
 upcomingObj.upcomingListAjax = async function(req, res) {
 
	 let user   = helper.getUidByToken(req);
 
	 if ( user && user.userId ) {
 
		 let result = await upcomingModel.getupcomingList();
	 
		 res.render('upcomingListAjax',{ 
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
 upcomingObj.deleteUpcoming = async function (req, res) {
	 let user = helper.getUidByToken(req);
 
		 if (user && user.userId) {
			 if (req && req.body && req.body.upcomingId) {
			 let result = await upcomingModel.deleteupcoming(req.body);
 
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
 module.exports = upcomingObj;
  
 
 
 
 
 
 
 