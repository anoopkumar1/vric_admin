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
const q           = require("q"),
{ v4 }      = require("uuid"),
helper      = require("../helpers/index"),
mongoHelper = require("../helpers/mongo_helper");
const iqumahModel = {};
/**
* This function is using to
* @param     :
* @returns   :
* @developer :
*/
iqumahModel.insertIqumah = async function (body) {
  let deferred  = q.defer();
    const https   = require('http');
    let dateArray = await helper.dateRange(body.startDate,body.endDate);
    if ( dateArray && dateArray.length > 0 ) {

    var EXTERNAL_URL = 'http://www.islamicfinder.us/index.php/api/prayer_times?country=US&zipcode=75204&show_entire_month=Return%20entire%20month';
    https.get(EXTERNAL_URL, (resp) => {
      let data = '';   
      resp.on('data', (chunk) => {
        data += chunk;
      });    
      resp.on('end', () => {
        const obj   = JSON.parse(data); 
        let objData = obj.results; 

        if ( objData && Object.keys(objData).length > 0 ) {  

          for ( const dates of dateArray ) {

            for ( let [key, value] of Object.entries(objData) ) {

              if ( dates == key ) {
                iqumahModel.insertUpdateData(dates,value,body);
              }

            }

          } 

        }
        deferred.resolve(true);
      }); 

  }).on("error", (err) => {
    console.log("Error: " + err.message);
});
    deferred.resolve(true);
  } else {
    deferred.resolve(false);
  }
}
/**
* This function is using to insert Donation user data
* @param     :
* @returns   :
* @developer : 
*/
iqumahModel.insertUpdateData = async function(dates,value,body) {    
  let deferred = q.defer();
  if ( body && dates && value ) {
    let fajrTime    = helper.addMintInTime(dates,value.Fajr,body.FajrTime);
    let duhaTime    = helper.addMintInTime(dates,value.Duha,body.DuhaTime);
    let dhuhrTime   = helper.addMintInTime(dates,value.Dhuhr,body.DhuhrTime);
    let asrTime     = helper.addMintInTime(dates,value.Asr,body.AsrTime);
    let maghribTime = helper.addMintInTime(dates,value.Maghrib,body.MaghribTime);
    let ishaTime    = helper.addMintInTime(dates,value.Isha,body.IshaTime);
    let selectObj   = {
      pdi_date : dates
    };
    let prayerObj = {
      pdi_uuid:v4(Date.now()),
      pdi_fajr    : fajrTime,
      pdi_duha    : duhaTime,
      pdi_dhuhr   : dhuhrTime,
      pdi_asr     : asrTime,
      pdi_maghrib : maghribTime,
      pdi_isha    : ishaTime,
      pdi_date    : dates,
      pdi_active  : "1",
      pdi_deleted  : "0",
    };
    let getData    =  await mongoHelper.getData(selectObj,"prayers_data_iquamah");
    if ( getData && getData.length > 0 ) {
      mongoHelper.updateData(selectObj,"prayers_data_iquamah",prayerObj);
      deferred.resolve(true);
    } else {
      mongoHelper.insert(prayerObj,'prayers_data_iquamah');
      deferred.resolve(true);
    }

  } else{
    deferred.resolve(false);
  }  
  return deferred.promise;
}

/**
* This function is using for get keys list
* @param     :
* @returns   :
* @developer :
*/
iqumahModel.getIqumahList = async function () {
let deferred = q.defer();  let obj = {
    pdi_deleted: "0",
  };
  let userArray = await mongoHelper.getIqumahListData(obj, "prayers_data_iquamah");
  if (userArray && userArray.data && userArray.data.length > 0) {
    deferred.resolve(userArray.data);
  } else {
    deferred.resolve([]);
  }

  return deferred.promise;
};

/**
 * This function is using
 * @param     :
 * @returns   :
 * @developer :
 */
iqumahModel.deleteIqumah = async function (body) {
  let deferred = q.defer();
    if (body.iqamahId) {
        let selectObj = {
          pdi_uuid: body.iqamahId,
        };
        let updateObj = {
          pdi_deleted: "1",
          },
          result = await mongoHelper.updateData(
            selectObj,
            "prayers_data_iquamah",
            updateObj
          );
      
    if (result) {
      deferred.resolve(true);
    } else {
      deferred.resolve(false);
    }
  } else {
    deferred.resolve(false);
  }
  return deferred.promise;
};
module.exports = iqumahModel;  
