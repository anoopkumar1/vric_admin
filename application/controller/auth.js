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
const   passwordHash  	= require('password-hash'),
path          	= require('path'),
Busboy          = require('busboy'),
helper          = require('../helpers/index'),
mongoHelper     = require('../helpers/mongo_helper');

let authObj         = {};
/**
* This function is using to 
* @param     : 
* @returns   : 
* @developer :
*/
authObj.login = async function(req, res) {

    let obj = {
        code    : "",
        message :'Something went wrong',
        status  : false
    };

    if ( req && req.body && req.body.email && req.body.password ) {

        let checkEmailObj	 = {
            au_email : req.body.email
        },
        checkEmailDetail    = await mongoHelper.getData(checkEmailObj,'admin_users');

        if ( checkEmailDetail && checkEmailDetail.length > 0 ) {

            let userData = checkEmailDetail[0];

            if ( userData.au_password && passwordHash.verify(req.body.password, userData.au_password) ) {

                if ( userData && userData.au_deleted == 1 ) {

                    obj.message = 'Your account has been blocked , Plese contact to Kwacha support';
                    helper.errorHandler(res,obj,500);

                } else if (  userData && userData.au_active == 0 ) {

                    obj.message = 'Your account is not active';
                    helper.errorHandler(res,obj,500);

                } else if ( userData && userData.au_deleted == 0 && userData.au_active == 1 ) {

                    let payload = {
                    iat            : Date.now(),
                    "userId"       : userData.au_uuid,
                    "email"        : userData.au_email,
                    "name"         : userData.au_name,
                    "image"        : userData.au_image,
                    };
                    let token    = jwt.sign(payload,"@&*(29783-d4343daf4dd*&@&^#^&@#");
                    res.cookie('token',token, { expire: 400000 + Date.now() });
                    res.cookie('subscriberEmail',userData.au_email, { expire: 400000 + Date.now() });
                    res.cookie('subscriberName',userData.au_name, { expire: 400000 + Date.now() });

                    let commonData = {
                    "au_name"         : userData.au_    ,
                    "au_email"        : userData.au_email,
                    "token"           : token
                    };

                    obj.payload = commonData;
                    obj.message = 'Login successfully';
                    helper.successHandler(res,obj);

                } else {
                    helper.errorHandler(res,obj,500);
                }

            } else {
                obj.message = 'Email and password do not match. Please try again.';
                helper.errorHandler(res, obj, 500);	
            }

        } else {
            obj.message = 'Your account does not exist.';
            helper.errorHandler(res, obj, 500);
        }

    } else {

        helper.errorHandler(res, {
        code    : "ZT-E1000",
        message : "Please fill manadatory fields."
        }, 500);

    }

}
module.exports = authObj;
