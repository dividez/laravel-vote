//js交互
var url="http://sc.boetech.cn/";
// 书城
function sendScymUrl(str) {
    var data = {"url":url,"path": str};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getScymUrl',returndata);
}
// 书城书籍详情页
function sendBookDetailUrl(str,id) {
    var data = {"url":url,"path": str,"articleid":id};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getBookDetailUrl',returndata);
}
//目录页点击详情
function sendContentChapter(articleid,count,index) {
    var data = {"articleid":articleid,"count": count,"index":index};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getContentChapter',returndata);
}
// 社区模块，话题详情
function sendPageUrl(str1,id,flag) {
    if(flag){
        var data = {"url":url,"path": str1,'topic_id':id,'flag':flag};
    }else{
        var data = {"url":url,"path": str1,'plate_id':id,'flag':flag};
    }
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getPageUrl',returndata);
}
// 图片放大
function sendSelectImgUrl(str1,id,num) {
    var data = {"url":url,"path": str1,'topic_id':id,'num':num,'http':"http://yyimg.boetech.cn/"};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getSelectImgUrl',returndata);
    if(document.all){
        //alert("IE");
        //IE的阻止事件冒泡
        window.event.cancelBubble=true;
    }else{
        //alert("非IE");
        //非IE的阻止事件冒泡
        this.event.stopPropagation();
    }
}
// 发表话题
function sendPublishUrl(str1,type) {
    var data = {"url":url,"path": str1,'type':type};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getPublishUrl',returndata);
}
// 发起投票
function sendTicketUrl(str1,id) {
    var data = {"url":url,"path": str1,'topic_id':id};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getTicketUrl',returndata);
}
// 执行发起投票
function sendVoteInfo(path,data) {
    var base= base64_encode(utf16to8(data));
    var data = {"path": path,'data':base};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getVoteInfo',returndata);
}
// 执行发起投票
function sendVoteItem(path,type) {
    var data = {"path": path,'type':type};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getVoteItem',returndata);
}
// 投票状态
function sendTicketStatus(status,type) {
    var data = {"status": status,'type':type};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getTicketStatus',returndata);
}
// 分享
function sendShareInfo(url,id,content) {
    var data = {"url": url,'id':id,'content':content};
    var str = JSON.stringify(data);
    // var returndata=base64_encode(utf16to8(str));
    str = CryptoJS.enc.Utf8.parse(str);
    var returndata = CryptoJS.enc.Base64.stringify(str);
    sendMsg('getShareInfo',returndata);
}
// 转发 评论
function sendPathInfo(path,content,type) {
    var data = {"path":path,'type':type,'content':content};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getPathInfo',returndata);
}

//打赏
function sendDashangInfo(parm){
    var str = JSON.stringify(parm);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getDashangInfo',returndata);
}

//月票
function sendYuepiaoInfo(parm){
    var str = JSON.stringify(parm);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getYuepiaoInfo',returndata);
}
//签到
function sendQiandaoInfo(parm){

    var str = JSON.stringify(parm);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getQiandaoInfo',returndata);
}
//补签
function sendBuqianInfo(parm){
    var str = JSON.stringify(parm);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getBuqianInfo',returndata);
}
//订阅
function sendDingyueInfo(parm){
    var str = JSON.stringify(parm);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getDingyueInfo',returndata);
}
//打赏加载
function sendDsjiazaiInfo(parm){
    var str = JSON.stringify(parm);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getDsjiazaiInfo',returndata);
}

//月票加载
function sendYpjiazaiInfo(parm){
    var str = JSON.stringify(parm);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getYpjiazaiInfo',returndata);
}

//用户月票加载
function sendUseryuepiaoInfo(parm){
    var str = JSON.stringify(parm);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getUseryuepiaoInfo',returndata);
}
//用户打赏加载
function sendUserdashangInfo(parm){
    var str = JSON.stringify(parm);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getUserdashangInfo',returndata);
}
//充值
function SendRechargeInfo(parm){

    var str = JSON.stringify(parm);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getRechargeInfo',returndata);
}
// 喜欢
function sendLikeInfo(str,id) {
    var data = {"url":url,"path": str,'id':id};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getLikeInfo',returndata);
}
// 头像
function sendUserHomePage(str,guid) {
    var data = {"url":url,"path": str,'guid':guid};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getUserHomePage',returndata);
}

// 动态分页
function sendTopicPageInfo(str,page) {
    var data = {"url":url,"path": str,'page':page};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getTopicPageInfo',returndata);
}
// 评论展开更多分页
function sendMoreComment(str,id,key) {
    var data = {"url":url,"path": str+id,'key':key};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getMoreComment',returndata);
}
// 评论分页
function sendCommentPageInfo(str,page) {
    var data = {"url":url,"path": str,'page':page};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getCommentPageInfo',returndata);
}
// 书籍评论
function sendBookComment(path) {
    var data = {"path":path};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getBookComment',returndata);
}
// 书籍分类分页
function sendSortListPageInfo(str,page) {
    var data = {"url":url,"path": str,'page':page};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getSortListPageInfo',returndata);
}

//昵称
function sendClickName(path,nickname){
    // alert(nickname);
    var data = {"url":url,"path": path,'nickname':nickname};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getClickName',returndata);
    if(document.all){
        //alert("IE");
        //IE的阻止事件冒泡
        window.event.cancelBubble=true;
    }else{
        //alert("非IE");
        //非IE的阻止事件冒泡
        this.event.stopPropagation();
    }
}

//个人首页
//type 1 用户自己首页 2 其它用户首页
function sendUserHomeInfo(guid,type){
    //alert("sadasfasfasfdasfdasdf");

    var path = "user/homepage";
    var data = {'url':url,'path':path,'guid':guid,'type':type};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getUserHomeInfo',returndata);
}

function setBrowserLevel(level){
    var data = {'blevel':level};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getBrowserLevel',returndata);
    //alert(level);
}

function sendModifyNick(guid){
    var path = "user/modifynick";
    var data = {'url':url,'path':path,'guid':guid};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getModifyNick',returndata);
    //window.location.href="modifynick?guid="+guid+"&param=1";
    //window.location.href=link;
    //setBrowserLevel(1);
}

function redirectUrl(path,guid,param,sign,time,version){
    var href = path.replace('user/','');
    //alert("href");
    window.location.href=href+"?" +
                        "param=" + param +
                        "&version=" +version +
                        "&signature=" + sign +
                        "&time=" + time +
                        "&guid=" + guid;
}


function sendModifySex(guid){
    var path = "user/modifysex";
    var data = {'url':url,'path':path,'guid':guid};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getModifySex',returndata);
    //window.location.href="modifysex?guid="+guid+"&param=1";
    //setBrowserLevel(1);
}


function sendModifyBirthday(guid){
    var path = "user/modifybirthday";
    var data = {'url':url,'path':path,'guid':guid};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getModifyBirthday',returndata);
    //window.location.href="modifybirthday?guid="+guid+"&param=1";
    //setBrowserLevel(1);
}


function sendModifyAddress(guid){
    var path = "user/modifyaddress";
    var data = {'url':url,'path':path,'guid':guid};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getModifyAddress',returndata);
    //window.location.href="modifyaddress?guid="+guid+"&param=1";
    //setBrowserLevel(1);
}


function sendModifyDesc(guid){
    var path = "user/modifydesc";
    var data = {'url':url,'path':path,'guid':guid};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getModifyDesc',returndata);
    //window.location.href="modifydesc?guid="+guid+"&param=1";
    //setBrowserLevel(1);
}

function sendSubmitNick(nickname){
    var path = "user/nickname";
    var data = {'path':path,'nickname':nickname};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('setNickName',returndata);
}

function sendSubmitAddress(address){
    var path = "user/address";
    var data = {'path':path,'address':address};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('setAddress',returndata);
}

function sendSubmitBirthday(birthday){
    var path = "user/birthday";
    var data = {'path':path,'birthday':birthday};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('setBirthday',returndata);
}

function sendSubmitSex(sex){
    var path = "user/sex";
    var data = {'path':path,'sex':sex};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('setSex',returndata);
}

function sendSubmitDesc(desc){
    var path = "user/description";
    var data = {'path':path,'description':desc};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('setDescription',returndata);
}

function sendUserData(guid){
    var path = "user/userdata";
    var data = {'url':url,'path':path,'guid':guid};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getUserData',returndata);
}

function sendModifyLogo(guid){
    var data = {'guid':guid};
    var str = JSON.stringify(data);
    var returndata=base64_encode(utf16to8(str));
    sendMsg('getModifyLogo',returndata);
}

function sendFollow(from,to,path){
    var data = {'path':path,'from':from,'to':to};
    var str = JSON.stringify(data);
    var returndata = base64_encode(utf16to8(str));
    sendMsg('getFollow',returndata);
}

function sendUnFollow(from,to,path){
    var data = {'path':path,'from':from,'to':to};
    var str = JSON.stringify(data);
    var returndata = base64_encode(utf16to8(str));
    sendMsg('getUnFollow',returndata);
}


// 发送客户端
function sendMsg(getFun,msg){
    if (/android/i.test(navigator.userAgent)) {//安卓
        
        if(getFun=='getSortListPageInfo'){
            JsAndroid.getSortListPageInfo(msg);
        }else if(getFun=='getBookComment'){
            JsAndroid.getBookComment(msg);
        }
        else if(getFun=='getMoreComment'){
            JsAndroid.getMoreComment(msg);
        }
        else if(getFun=='getCommentPageInfo'){
            JsAndroid.getCommentPageInfo(msg);
        }
        else if(getFun=='getTopicPageInfo'){
            JsAndroid.getTopicPageInfo(msg);
        }
        else if(getFun=='getClickName'){
            JsAndroid.getClickName(msg);
        }
        else if(getFun=='getUserHomePage'){
            JsAndroid.getUserHomePage(msg);
        }
        else if(getFun=='getContentChapter'){
            JsAndroid.getContentChapter(msg);
        }
        else if(getFun=='getScymUrl'){
            JsAndroid.getScymUrl(msg);
        }
        else if(getFun=='getBookDetailUrl'){
            JsAndroid.getBookDetailUrl(msg);
        }
        else if(getFun=='getPageUrl'){
            JsAndroid.getPageUrl(msg);
        }
        else if(getFun=='getSelectImgUrl'){
            JsAndroid.getSelectImgUrl(msg);
        }
        else if(getFun=='getPublishUrl'){
            JsAndroid.getPublishUrl(msg);
        }
        else if(getFun=='getTicketUrl'){
            JsAndroid.getTicketUrl(msg);
        }
        else if(getFun=='getVoteInfo'){
            JsAndroid.getVoteInfo(msg);
        }
        else if(getFun=='getVoteItem'){
            JsAndroid.getVoteItem(msg);
        }
        else if(getFun=='getTicketStatus'){
            JsAndroid.getTicketStatus(msg);
        }
        else if(getFun=='getLikeInfo'){
            JsAndroid.getLikeInfo(msg);
        }
        else if(getFun=='getShareInfo'){
            JsAndroid.getShareInfo(msg);
        }
        else if(getFun=='getPathInfo'){
            JsAndroid.getPathInfo(msg);
        }
        else if(getFun=='getDashangInfo'){
            JsAndroid.getDashangInfo(msg);
        }
        else if(getFun=='getYuepiaoInfo'){
            JsAndroid.getYuepiaoInfo(msg);
        }
        else if(getFun=='getQiandaoInfo'){
            JsAndroid.getQiandaoInfo(msg);
        }
        else if(getFun=='getBuqianInfo'){
            JsAndroid.getBuqianInfo(msg);
        }
        else if(getFun=='getDingyueInfo'){
            JsAndroid.getDingyueInfo(msg);
        }
        else if(getFun=='getDsjiazaiInfo'){
            JsAndroid.getDsjiazaiInfo(msg);
        }
        else if(getFun=='getYpjiazaiInfo'){
            JsAndroid.getYpjiazaiInfo(msg);
        }
        else if(getFun=='getUseryuepiaoInfo'){
            JsAndroid.getUseryuepiaoInfo(msg);
        }
        else if(getFun=='getUserdashangInfo'){
            JsAndroid.getUserdashangInfo(msg);
        }
        else if(getFun=='getRechargeInfo'){
            JsAndroid.getRechargeInfo(msg);
        }
        else if(getFun=='getUserHomeInfo'){
            JsAndroid.getUserHomeInfo(msg);
        }
        else if(getFun=='getModifyNick'){
            JsAndroid.getModifyNick(msg);
        }
        else if(getFun=='getModifySex'){
            JsAndroid.getModifySex(msg);
        }
        else if(getFun=='getModifyBirthday'){
            JsAndroid.getModifyBirthday(msg);
        }
        else if(getFun=='getModifyAddress'){
            JsAndroid.getModifyAddress(msg);
        }
        else if(getFun=='getModifyDesc'){
            JsAndroid.getModifyDesc(msg);
        }
        else if(getFun=='getUserData'){
            JsAndroid.getUserData(msg);
        }
        else if(getFun=='getModifyLogo'){
            JsAndroid.getModifyLogo(msg);
        }
        else if(getFun == 'getBrowserLevel'){
            JsAndroid.getBrowserLevel(msg);
        }
        else if(getFun == 'getFollow'){
            JsAndroid.getFollow(msg);
        }
        else if(getFun == 'getUnFollow'){
            JsAndroid.getUnFollow(msg);
        }
        else if(getFun == 'setNickName'){
            JsAndroid.setNickName(msg);
        }
        else if(getFun == 'setAddress'){
            JsAndroid.setAddress(msg);
        }
        else if(getFun == 'setSex'){
            JsAndroid.setSex(msg);
        }
        else if(getFun == 'setBirthday'){
            JsAndroid.setBirthday(msg);
        }
        else if(getFun == 'setDescription'){
            JsAndroid.setDescription(msg);
        }
        else if(getFun == 'setBirthday'){
            JsAndroid.setBirthday(msg);
        }

    }
    // if (/android/i.test(navigator.userAgent)) {//安卓
    //     getFun=eval('(' + getFun + ')');
    //     window[JsAndroid.getFun](msg);
    // }
    else if (/ipad|iphone|mac/i.test(navigator.userAgent)) {//ios

        window.location = "objc://" + getFun+"##" + msg;
    }
}




