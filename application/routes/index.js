const auth = require(basePath + "/admin/application/controller/auth"),
homeObj = require(basePath + "/admin/application/controller/home"),
userObj = require(basePath + "/admin/application/controller/user"),
announcementsObj = require(basePath + "/admin/application/controller/announcements"),
jummahObj = require(basePath + "/admin/application/controller/jummah"),
brodcastObj=require(basePath + "/admin/application/controller/brodcast"),
upcomingObj = require(basePath + "/admin/application/controller/upcoming"),
donationObj = require(basePath + "/admin/application/controller/donation"),
bannerObj = require(basePath + "/admin/application/controller/banner"),
iqumahObj = require(basePath+ "/admin/application/controller/iqumah"),
paymentObj= require(basePath+ "/admin/application/controller/payment"),
meetingObj= require(basePath+ "/admin/application/controller/meeting")


module.exports = function () {
app.get("/admin/login", homeObj.adminLogin);
app.post("/admin/login", auth.login);
app.post("/admin/get-user-data", userObj.get_userData);
/*------------------------------Home--------------------------------*/
app.get("/admin", homeObj.adminLogin);
app.get("/admin/dashboard", homeObj.index);
app.post("/admin-logout", userObj.adminLogout);
//excel
app.get("/admin/downloaduserExcel", userObj.exportexcelUser);
/*------------------------------Admin login------------------------------- -*/
app.get("/admin/login", homeObj.adminLogin);
app.post("/admin/login", auth.login);
app.post("/admin/get-user-data", userObj.get_userData);
/*-----------------------------jummah--------------------------------*/ 
app.post("/admin/insert-payment",paymentObj.insertPayment); 
app.post("/admin/delete-jummah", jummahObj.deleteJummah);
app.post("/admin/edit-jummah", jummahObj.editJummah);
app.get("/admin/create-jummah", homeObj.insertJummahPage);
app.post("/admin/insert-jummah",jummahObj.insertJummah);
app.get("/admin/jummah-list", homeObj.JummahListPage); 
app.get("/admin/get_jummah_data_by_id/:id", jummahObj.get_jummah_data_by_id); 
/*------------------------------Iqumah--------------------------------*/
app.post("/admin/iqumah-list-ajax", iqumahObj.iqumahListAjax);
app.post('/admin/insert-iqumah',iqumahObj.insertIqumah);
app.get("/admin/create-iqumah", homeObj.insertIqumahPage);

/*------------------------------donation_section--------------------------------*/
app.post("/admin/insert-donation", donationObj.insertDonation);
app.post("/admin/donation-list-ajax", donationObj.donationListAjax);
app.post("/admin/delete-donation", donationObj.deleteDonation);
app.get("/admin/donation-list", homeObj.donationListPage);
/*------------------------------iqumah List--------------------------------*/
app.post("/admin/iqumah-list-ajax", iqumahObj.iqumahListAjax);
app.get("/admin/iqumah-list", homeObj.iqumahListpage);  
app.post("/admin/delete-iqumah", iqumahObj.deleteIqumah);
app.post('/admin/insert-iqumah',iqumahObj.insertIqumah);
app.get("/admin/create-iqumah", homeObj.insertIqumahPage);
//excel
app.get("/admin/downloadExcel", donationObj.exportUser);
/*------------------------------Banner--------------------------------*/
app.post('/admin/upload-banner-image',bannerObj.uploadProfilepicImage);
app.get("/admin/create-banner",homeObj.insertBannerPage);
app.post("/admin/banner-list-ajax", bannerObj.bannerListAjax);
app.get("/admin/banner-list", homeObj.bannerListpage);
app.post("/admin/delete-banner", bannerObj.deleteBanner);

/*------------------------------Annoucement--------------------------------*/
app.post('/admin/upload-user-image',  announcementsObj.uploadProfileImage);
app.get("/admin/create-announcements", homeObj.insertAnnoucementPage);
app.post("/admin/announcements-list-ajax", announcementsObj.AnnouncementsListAjax);
app.post("/admin/delete-announcements", announcementsObj.deleteAnnouncements);
app.get("/admin/announcements-list", homeObj.announcementsListPage);
/*------------------------------brodcast video--------------------------------*/
app.post("/admin/insert-video",brodcastObj.insertBrodcast);
app.get("/admin/create-brodcast", homeObj.insertBrodcastPage);
app.post("/admin/brodcast-list-ajax", brodcastObj.BrodcastListAjax);
app.post("/admin/delete-brodcast", brodcastObj.deleteBrodcast);
app.get("/admin/brodcast-list", homeObj.brodcastListPage);

/*------------------------------User------------------------------- -*/
app.get("/admin/create-user", homeObj.insertUserPage);
app.get("/admin/users-list", homeObj.userListPage);
app.post("/admin/insert-user", userObj.insertUser);
app.post("/admin/user-list-ajax", userObj.userListAjax);
app.post("/admin/delete-user", userObj.deleteUser);

/*------------------------------payment--------------------------------*/
app.get("/admin/create-payment",homeObj.insertPaymentPage);
app.post("/admin/payment-list-ajax", paymentObj.paymentListAjax);
app.post("/admin/delete-payment", paymentObj.deletePayment);
app.get("/admin/payment-list", homeObj.paymentListPage);
/*------------------------------upcoming_events--------------------------------*/
app.post('/admin/upload-upcoming-image',  upcomingObj.uploadProfile);
app.get("/admin/create-upcoming", homeObj.insertUpcomingPage);
app.post("/admin/upcoming-list-ajax", upcomingObj.upcomingListAjax);
app.get("/admin/upcoming-list", homeObj.upcomingListpage);
app.post("/admin/delete-upcoming", upcomingObj.deleteUpcoming);

/*------------------------------Members------------------------------- -*/
app.get("/admin/create-meeting", homeObj.createMeetingPage);
app.get("/admin/meeting-list", homeObj.MeetingListPage);
app.post("/admin/jummah-list-ajax", jummahObj.jummahListAjax)
app.post("/admin/iqumah-list-ajax", iqumahObj.iqumahListAjax);

/*------------------------------meeting video--------------------------------*/
app.post("/admin/insert-test",meetingObj.insertMeeting);
app.get("/admin/create-meeting", homeObj.insertMeetingPage);
app.post("/admin/meeting-list-ajax", meetingObj.MeetingListAjax);
app.post("/admin/delete-meeting", meetingObj.deleteMeeting);
app.get("/admin/meeting-list", homeObj.meetingListPage);
// app.get("/admin/downloadExcel", meetingObj.exportMeeting);
};







