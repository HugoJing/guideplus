/**
 * Created by Hugo on 15-01-13.
 */
//setWechatMenu
menu = {
     "button":[
     {  
          "type":"click",
          "name":"获取",
          "key":"getStory"
     }]
 };


// function sendGetReq(url,access_token,openid,lang) {
// 	AV.Cloud.httpRequest({
// 	  url: 'url',
// 	  access_token: 
// 	  success: function(httpResponse) {
// 	    console.log(httpResponse.text);
// 	  },
// 	  error: function(httpResponse) {
// 	    console.error('Request failed with response code ' + httpResponse.status);
// 	  }
// 	});
// };


exports.menu = menu;
// exports.sendGetReq = sendGetReq;