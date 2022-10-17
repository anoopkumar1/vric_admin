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
const { async } = require("q");
const helper = require("../helpers/index");
const mongoHelper = require("../helpers/mongo_helper"); 
let homeObj = {};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.index = async function (req, res) {
    res.render("dashboard", {});
};
/* This function is using to
* @param     :
* @returns   :
* @developer :
*/
homeObj.announcement = async function (req, res) {
    res.render("announcement", {});
};

  
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.announcementsListPage = async function (req, res) {
    res.render("announcementList", {});
};

homeObj.adminLogin = async function (req, res){
    let user = helper.getUidByToken(req);
    if(user.userId){
        res.redirect('/admin/dashboard');
    }else{
        res.render("adminLogin",{
        user:user
        });
    }
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.adminLoginfb = async function (req, res) {
    res.render("adminLoginfb", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.insertAnnoucementPage = async function (req, res) {
    res.render("insertAnnouncement", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.insertBannerPage = async function (req, res) {
    res.render("insertBanner", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.insertIqumahPage = async function (req, res) {
    res.render("insertIqumah", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.insertUpcomingPage = async function (req, res) {
    res.render("insertUpcoming", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.insertRamdinPage = async function (req, res) {
    res.render("insertRamdin", {});
};
/**
* This function is using to
* @param     :
* @returns   :
* @developer :
*/  
homeObj.createDonationPage = async function (req, res) {
    res.render("insertDonation", {});
};
/**
* This function is using to
* @param     :
* @returns   :
* @developer :
*/  
homeObj.donationListPage = async function (req, res) {
    res.render("donationList", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.insertJummahPage = async function (req, res) {
    res.render("insertJummah", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.insertBrodcastPage = async function (req, res) {
    res.render("insertBrodcast", {});
};


/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.insertPaymentPage = async function (req, res) {
    res.render("insertPayment", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.JummahListPage = async function (req, res) {
    const selectObj={
        jd_deleted: "0",
    };

    const data=await mongoHelper.getData(selectObj, "jummah_details");

    if(data.length>0){
        return  res.render("jummahList",{
            jummahList:data
        });
    }
    return  res.render("jummahList",{
        jummahList:[]
    });

};

/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.BrodcastListPage = async function (req, res) {
    const selectObj={};
    
    const data=await mongoHelper.getData(selectObj, "live_broadcasts");
    
    if(data.length>0){
        
        return  res.render("brodcastList",{
        brodcastList:data
        });
    }
    return  res.render("brodcastList",{
    brodcastList:[]
    });
    
};


homeObj.brodcastListPage = async function (req, res) {
    res.render("brodcastList", {});
};    
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.insertPrayersPage = async function (req, res) {
    res.render("insertPrayers", {});
};
homeObj.paymentListPage = async function (req, res) {
    res.render("paymentList", {});
};        

/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
 homeObj.insertMeetingPage = async function (req, res) {
    res.render("insertMeeting", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.insertUserPage = async function (req, res) {
    res.render("insertUser", {});
};
homeObj.insertAnnoucementpage = async function (req, res) {
    res.render("insertAnnouncement", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.insertBrodcastPage = async function (req, res) {
    res.render("insertBrodcast", {});
};
   
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.userListPage = async function (req, res) {
    res.render("userList", {});
};

/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
 homeObj.meetingListPage = async function (req, res) {
    res.render("meetingList", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.announcementsListPage = async function (req, res) {
    res.render("announcementList", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.vaultsListPage = async function (req, res) {
    res.render("vaultList", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.agentsListpage = async function (req, res) {
    res.render("agentsList", {});
};

/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.upcomingListpage = async function (req, res) {
    res.render("upcomingList", {});
};

/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.bannerListpage = async function (req, res) {
    res.render("bannerList", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.iqumahListpage = async function (req, res) {
    res.render("iqumahList", {});
};

/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.insertContactPage = async function (req, res) {
    res.render("contactPage", {});
};
/**
 * This function is using to
 * @param     :
 * @returns   :
 * @developer :
 */
homeObj.contactListPage = async function (req, res) {
    res.render("contactList", {});
};

/** 
 * This function is using to
 * @param      :
 * @return     :
 * @developer  :
 */
 homeObj.createMeetingPage = async function (req, res) {
    res.render("insertMeeting", {});
};

/** 
 * This function is using to
 * @param      :
 * @return     :
 * @developer  :
 */
 homeObj.MeetingListPage = async function (req, res) {
    res.render("meetingList", {});
};
module.exports = homeObj;




