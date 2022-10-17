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

let helper = {};

const q       = require("q");
const AWS     = require('aws-sdk');
 const constants    = require('../../../common/config/constants');
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const  dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
/**
 *
 * @param:
 * @returns:
 * @developer :
 */
helper.successHandler = function (res, options) {
  let status = "";
  if (options.status && options.status == false) {
    status = options.status;
  } else {
    status = true;
  }

  let obj = {
    status: status,
    code: (options && options.code) || "",
    message: (options && options.message) || "Operation performed successfully",
    payload: (options && options.payload) || {},
  };
  res.send(obj);
};


/**
 *
 * @param     :
 * @returns   :
 * @developer :
 */
helper.errorHandler = function (res, options, httpStatuCode = 501) {
  let status = "";

  if (options.status == "") {
    status = options.status;
  } else {
    status = true;
  }

  let obj = {
    status: status || false,
    code: (options && options.code) || "",
    message: (options && options.message) || "Something went wrong",
    payload: (options && options.payload) || [],
  };
  res.status(httpStatuCode).json(obj);
};

/**
 *
 * @param     :
 * @returns   :
 * @developer :  Diksha
 */
helper.getUidByToken = function (req) {
  let token = "",
    returnOb = {};
  if (req && req.cookies && req.cookies.token && req.cookies.token != "") {
    token = req.cookies.token;
  }

  if (token && token != "") {
    let decoded = jwt.verify(token, "@&*(29783-d4343daf4dd*&@&^#^&@#");

    if (decoded && decoded.userId) {
      returnOb.userId = decoded.userId;
      returnOb.email = decoded.email;
      returnOb.name = decoded.name;
      returnOb.image = decoded.image;
      returnOb.designation = decoded.designation;
    }
  }

  return returnOb;
};
/**
 * This helper is using to add mints in time
 * @developer   :
 * @modified    :
 */
helper.isEmailValid = async function (email) {
  if (!email) {
    return false;
  }

  if (email.length > 254) {
    return false;
  }

  var valid = emailRegex.test(email);

  if (!valid) {
    return false;
  }

  // Further checking of some things regex can't handle
  var parts = email.split("@");

  if (parts[0].length > 64) {
    return false;
  }
  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  ) {
    return false;
  }

  return true;
};

/**
 * This helper is using to get utc time
 * @param     :
 * @returns   :
 * @developer :
 */
helper.getUtcTime = async function (type) {
  let utcTime = new Date(new Date().toUTCString());
  (dt = utcTime.getDate()),
    (year = utcTime.getFullYear()),
    (month = utcTime.getMonth() + 1),
    (hours = utcTime.getHours()),
    (minutes = utcTime.getMinutes()),
    (second = utcTime.getSeconds());
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  second = second < 10 ? "0" + second : second;
  strTime = hours + ":" + minutes + ":" + second;

  if (dt < 10) {
    dt = "0" + dt;
  }
  month = month < 10 ? "0" + month : month;

  if (type && type != "" && type == "date") {
    returnVal = year + "-" + month + "-" + dt;
    return returnVal;
  } else if (type && type != "" && type == "time") {
    return strTime;
  } else {
    return utcTime;
  }
};


/**
 * This helper is using to get utc date
 * @param     :
 * @returns   :
 * @developer :
 */
helper.dateRange = async function (startDate, endDate, steps = 1) {
  const dateArray = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dateArray.push( helper.simpleDateFormat(new Date(currentDate)));
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }
  return dateArray;
  
}

/**
 * This function is using to change string first letter in capital letter
 * @developer   :
 * @modified    :
 */
helper.capitalizeFirstLetter = function (text) {
  if (text) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
  } else {
    return false;
  }
  return text;
};

/**
 * This helper is using to return date into a format
 * @param     : Date
 * @returns   : Date
 * @developer : Diksha
 */
helper.dateFormat = function (date, type = "") {
  if (date != "") {
    let newdate = new Date(date),
      year = newdate.getFullYear(),
      month = newdate.getMonth(),
      dt = newdate.getDate(),
      hours = newdate.getHours(),
      minutes = newdate.getMinutes(),
      ampm = hours >= 12 ? " PM" : " AM";
    if (dt < 10) {
      dt = "0" + dt;
    }
    month = monthNames[month];
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let strTime = hours + ":" + minutes + ampm;
    if (type != "") {
      returnDate = dt + " " + month + ", " + year;
    } else {
      returnDate = month + " " + dt + ", " + year + ", " + strTime;
    }
    return returnDate;
  }
};
/**
 * This function is using to return UserId
 * @param     : Token
 * @returns   : 
 * @developer :
 */
 helper.getUUIDByToken  =  function( req, uuid = '' ) {
  let token           = '', 
      uid             = '';
  
  if ( req ) {

    if ( req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer' ) {

      token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {

      token = req.query.token;
    } else {

      token = req.body.token || req.query.token || req.headers['x-access-token'];
    }
      
  }

  if ( token && token != '' && token != 'undefined') {

    jwt.verify(token, '@&*(29783-d4343daf4dd*&@&^#^&@#', function(err, decoded) {

      if ( err ) {
        return false
      } else {
        
        if ( decoded && decoded.userId ) {
          let userUUID = '';
          if ( decoded.orgId ) {
              
              userUUID = decoded.orgId;
              if ( uuid == 'T' ) {
                  uid = decoded.userId;
              } else if ( uuid == 'E' ) {
                  uid = decoded.email;
              } else {
                  uid = decoded.orgId;
              }
          } else {
              
              if ( uuid == 'E' ) {
                  uid = decoded.email;
              } else {
                  uid = decoded.userId;
              }
          }
        }
      }
    });
  }
  return uid;
}
helper.getMonthDate = function (date) {
  if (date != "") {
    let newdate = new Date(date);
        month   = newdate.getMonth();
        month   = monthNames[month];

    return month;
  }
};

helper.getMonthDay = function (date) {
  if (date != "") {
    let newdate = new Date(date);     
    let day = dayNames[newdate.getUTCDay()];  
     return day;
  }
};

helper.currentdate = function (date, type = "") {
  let date_time = new Date();

  let date1 = ("0" + date_time.getDate()).slice(-2);
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let year = date_time.getFullYear();
  let hours = date_time.getHours();
  let minutes = date_time.getMinutes();
  let seconds = date_time.getSeconds();
  let currentdatesss= year + "-" + month + "-" + date1
   return currentdatesss;
};
helper.currentdateasc = function (date, type = "") {
  let date_time = new Date();
  let date1 = ("0" + date_time.getDate()).slice(-2);     
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);  
  let year = date_time.getFullYear();  
  let hours = date_time.getHours();    
  let minutes = date_time.getMinutes();  
  let seconds = date_time.getSeconds();
  let currentdatesss= date1 + "-" + month + "-" + year   
  return currentdatesss;
};
helper.onlydateFormat = function (date, type = "") {
if (date != "") {
  let newdate = new Date(date),
    year = newdate.getFullYear(),
    month = newdate.getMonth()+1,
    dt = newdate.getDate(),
    hours = newdate.getHours(),
    minutes = newdate.getMinutes(),
    ampm = hours >= 12 ? " PM" : " AM";
  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  // month   = monthNames[month];
  returnDate = year + "-" + month + "-" +  dt ;    
  return returnDate;
}
};
helper.curMonth = function (date, type = "") {
let date_time = new Date();
let date1 = ("0" + date_time.getDate()).slice(-2);     
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);  
let year = date_time.getFullYear();  
let hours = date_time.getHours();    
let minutes = date_time.getMinutes();  
let seconds = date_time.getSeconds();
let currentdatesss=  month   
return currentdatesss;
};
helper.curYear= function (date, type = "") {
let date_time = new Date();
let date1 = ("0" + date_time.getDate()).slice(-2);     
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);  
let year = date_time.getFullYear();  
let hours = date_time.getHours();    
let minutes = date_time.getMinutes();  
let seconds = date_time.getSeconds();
let currentdatesss=  year;   
return currentdatesss;
};

helper.Get_date_time=function(string=''){
let dates= new Date();
if(string){
   dates= new Date(string);
}

let DateString = dates.toDateString();
let LocaleTimeString = dates.toLocaleTimeString();
let weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let year = dates.getFullYear();
let monthnum=dates.getMonth()+1;
let month = months[dates.getMonth()];

let month_num =(monthnum>9)?monthnum:'0'+monthnum;
let date =(dates.getDate()>9)?dates.getDate():'0'+dates.getDate();
let hour = dates.getHours();
let min = dates.getMinutes();
let sec = dates.getSeconds();
let d = weekday[dates.getDay()];
let date_month =month+' '+date;
let cnvthours=(hour == 0)?'':hour+':';
let cnvtminutes=(min == 0)?'':min+':';
let cnvtmints=(min == 0)?'00':min;
let cnvtseconds=(sec == 0)?'0':sec;

if(min < 10 && min != '0'){
  cnvtminutes='0'+cnvtminutes;
}

if(min < 10 && min != '0'){
  cnvtmints='0'+cnvtmints;
}

if(cnvtseconds < 10 && cnvtseconds !='0'){
  cnvtseconds='0'+cnvtseconds;
}

let formented =d+' '+date+' '+month+' '+year+', '+cnvthours+cnvtmints;
let time ={month_num:month_num,date_month:date_month,formeted:formented,LocaleTimeString:LocaleTimeString,day:d,date:date,month:month,year:year,hour:hour,min:min,sec:sec,DateString:DateString};

return time;
}

helper.fridaydateofMonth = function(date, type= ""){
function get_AllDaysIn_month(detes=false){
  const now =new Date();
  const year=now.getFullYear();
  const month=now.getMonth();
  const date = new Date(year, month, 1);
  let fromateDay='Fri';
  const dates = [];

  if(detes){

      const fundt=new Date(detes);
      const expl=fundt.toDateString().split(" ");
      fromateDay =expl[0];

      while (date.getMonth() === month){
      let d=new Date(date);
      const expl= d.toDateString().split(" ");

      if(expl[0] == fromateDay){
      dates.push(d); 
      }

      date.setDate(date.getDate() + 1);
      }

      return dates;

  }else{
      while(date.getMonth() === month){
      dates.push(new Date(date)); 
      date.setDate(date.getDate() + 1);
      }

      return dates;
  }
  
}
let nowsas ='2022-09-02';
//return get_AllDaysIn_month(nowsas);


}  
/**
 * Used to upload file in AWS S3 bucket.
 * @developer   : 
 * @modified    :
 * @params      : 
 */
 helper.  uploadFile = async function(fileObj) {
    
  let defered = q.defer();

  if ( fileObj && Object.keys(fileObj).length > 0 ) {

      let conObj      	= await constants.getConstant(),
          uploadFolder 	= '';

      if ( fileObj.uploadFolder ) {
          uploadFolder 	= fileObj.uploadFolder;
      }        
      const S3        	= new AWS.S3({
          accessKeyId     : conObj.AWS_ACCESS_KEY,
          secretAccessKey : conObj.AWS_SECRET_ACCESS_KEY
          
      });
      const params = {
          Bucket          : conObj.AWS_BUCKET_NAME, // your s3 bucket name
          Key             : uploadFolder + `${fileObj.fileName}`, 
          Body            : Buffer.concat(fileObj.chunks), // concatinating all chunks
          ACL             : 'public-read',
          ContentEncoding : fileObj.encoding, // optional
          ContentType     : fileObj.contentType // required
      };
      // we are sending buffer data to s3.
      S3.upload(params, (err, s3res) => {
          if ( err ) {
             defered.resolve(false);
          } else {
              if ( s3res ) {
                  let resData = s3res;
                
                defered.resolve(resData);
              } else {
                 defered.resolve(false);
              }
          }
      });
  } else {
     defered.resolve(false);
  }
  
   return defered.promise;
}
/**
 * This helper is using to return date into a format
 * @param     : Date
 * @returns   : Date
 * @developer : Diksha
 */
helper.simpleDateFormat = function (date) {
  if (date != "") {
    let newdate = new Date(date),
      year = newdate.getFullYear(),
      month = newdate.getMonth()+1,
      dt = newdate.getDate();
      if ( month < 10) {
        month = "0"+month;
      }
      returnDate = year + "-" + month + "-" + dt;
    
    return returnDate;
  } else {
    return false;
  }
};
/**
 * This helper is using to convert time into simple format
 * @developer   :
 * @modified    :
 */
 helper.getTimeSimpleFormat = function( time ) {

  let date     = new Date("2000-01-01 " + time),
      hours    = date.getHours(),
      minutes  = date.getMinutes(),
      second   = date.getSeconds();
      hours    = hours < 10 ? '0'+hours : hours;  
      minutes  = minutes < 10 ? '0'+minutes : minutes;
      second   = second < 10 ? '0'+second : second;
      strTime  = hours + ':' + minutes + ':' + second;
  return strTime;
}
/**
 * This helper is using to add mints in time
 * @developer   :
 * @modified    :
 */
helper.addMintInTime = function( date,time,mint ) {
  mint       = parseInt(mint);
  let d      = new Date(date+" " + time);
    mint     = d.setMinutes(d.getMinutes()+mint),
    hours    = d.getHours(),
    minutes  = d.getMinutes(),
    second   = d.getSeconds();

  let ampm   = hours >= 12 ? 'PM' : 'AM';
      hours   = hours % 12;
      hours   = hours ? hours : 12; 
      hours   = hours < 10 ? '0'+hours : hours;
      strTime = '',
      minutes = minutes < 10 ? '0'+minutes : minutes;

  strTime = hours + ':' + minutes + ' ' + ampm;

  return strTime;

}
module.exports = helper;
