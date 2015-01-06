function isEnglish() {
    var lan = window.navigator.language.toLowerCase();
    var result = (lan.indexOf("en") != -1) ? true : false;
    return result;
}

function isAndroid () {
    var ua = navigator.userAgent.toLowerCase();
    var result = ua.indexOf("android") > -1;
    return result;
}


if (isEnglish()) {

    // Title
    document.querySelector("title").innerHTML = "CatchChat - The next generation chat app";

    // Slogan
    document.querySelector("#slogan").style.backgroundImage = 'url("./images/slogan_en.png")';
    document.querySelector("#slogan").style.backgroundSize = '280px 53px';

    // Buttons
    document.querySelector("#ios").style.backgroundImage = 'url("./images/btn_ios_en.svg")';
    document.querySelector("#android").style.backgroundImage = 'url("./images/btn_android_en.svg")';
    document.querySelector("#mbtn").style.backgroundImage = 'url("./images/btn_m_en.png")';
    document.querySelector("#mbtn").style.backgroundSize = '210px 40px';
    document.querySelector("#ios").href = "https://itunes.apple.com/app/id890404699";
    document.querySelector("#android").href = "http://catch-static.b0.upaiyun.com/catchchat-official-release.apk";

}


if (isAndroid()) {
    document.querySelector("#mbtn").href = "http://mp.weixin.qq.com/mp/redirect?url=http://catch-static.b0.upaiyun.com/catchchat-official-release.apk#wechat_redirect";
}

// QR code Interation
document.querySelector("#scan").addEventListener('click', function() {
    document.querySelector("#qrcode").style.display = "block";
    document.querySelector("#qrcode").className = "animated show"
});
document.querySelector("#qrcode").addEventListener('click', function() {
    document.querySelector("#qrcode").className = "animated hide"
    setTimeout(function(){document.querySelector("#qrcode").style.display = "none"},500)
});

// WeChat

var wechatData={

   appId:"",
   TLImg:"http://catchchat.me/images/wx_icon.jpg",
   url:"http://catchchat.me/",
   title:"秒视 - 地球上最快的聊天软件",
   desc:"秒视 - 地球上最快的聊天软件",
   fakeid:"",
   callback:function(){}
};

(function(){
   var onBridgeReady=function(){
   WeixinJSBridge.on('menu:share:timeline', function(argv){
      (wechatData.callback)();
      WeixinJSBridge.invoke('shareTimeline',{
         "img_url":wechatData.TLImg,
         "img_width":"120",
         "img_height":"120",
         "link":wechatData.url,
         "desc":wechatData.desc,
         "title":wechatData.title
      }, function(res){});
   });
};
if(document.addEventListener){
   document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
}else if(document.attachEvent){
   document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
   document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
}
})();