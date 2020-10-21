//$Id$
import jQuery from "jquery";

var sdp_url = getSDPURL();
var title_interval = null;
var default_title = document.title;


var newDiv = document.createElement("div"); 
newDiv.style.background = "#333333";
newDiv.style.borderRadius  = "4px"; //No I18N
newDiv.style.bottom = "0";
newDiv.style.color = "white";
newDiv.style.cursor ="pointer";
newDiv.style.padding = "3px !important";
newDiv.style.position = "fixed";
newDiv.style.right = "10px"; //No I18N
newDiv.style.zIndex = "10";
newDiv.style.height = "29px"; //No I18N
newDiv.setAttribute("id","external_sdp_chat");
document.body.appendChild(newDiv);

setTimeout(function() {
	loadSDPChat();
}, Math.random() * 500);

newDiv.onclick = function () {
	var html_content = jQuery("#me_sdp_chat_content_div").html();
	if(html_content !==""){
		jQuery("#external_sdp_chat").css('display','none'); // No I18N
		jQuery("#me_sdp_chat_content_div").css('display',''); // No I18N
	}
	else{
		loadSDPChat();
	}
};

var elem = document.createElement("img");
elem.setAttribute("src", sdp_url+"images/icons/chat-mini.jpg");
document.getElementById("external_sdp_chat").appendChild(elem);

if (typeof jQuery === "undefined") {
    console.log("jQuery is undefined")
	var jsElm = document.createElement("script");
	jsElm.type = "text/javascript";
	jsElm.src = sdp_url+"scripts/jquery.min.js"; //No I18N
	document.body.appendChild(jsElm);
}

function loadSDPChat()
{
	var chat_content_div = document.createElement("div"); 
	chat_content_div.style.bottom = "0";
	chat_content_div.style.color = "white";
	chat_content_div.style.position = "fixed";
	chat_content_div.style.right = "10px"; //No I18N
	chat_content_div.setAttribute("id","me_sdp_chat_content_div");
	document.body.appendChild(chat_content_div);

	var chat_notFrame = document.createElement("iframe"); //No I18N
        chat_notFrame.id = "sdp_external_chat"; //No I18N
        chat_notFrame.name = "sdp_external_chat"; //No I18N
        chat_notFrame.src = sdp_url+"externalCommFrame.do"; //No I18N
	chat_notFrame.setAttribute("style", "visibility: visible; overflow: hidden;");
	chat_notFrame.setAttribute("width", "115");
	chat_notFrame.setAttribute("height", "33");
	chat_notFrame.setAttribute("frameborder", "0");
	chat_notFrame.setAttribute("scrolling", "no");
	chat_content_div.appendChild(chat_notFrame);
	//document.getElementById("external_sdp_chat").style.display = "none";


	jQuery(window).on('message',processOutputMessage); //No I18N

	
	function processOutputMessage(e) { 
		var data = e.data;
		if(e.originalEvent){
			data = e.originalEvent.data;
		}
		if(typeof data !="object"){
			data = JSON.parse(data);
		}

		if(data.type === 'is_sdp_logged_in'){
			var is_user_loggedin = data.message;
			var showSamlLocalChoice = false;
			if(data.showSamlLocalChoice){
				showSamlLocalChoice = data.showSamlLocalChoice;
			}
			var height = '40px'; //No I18N
			var mesg = "";
			var minimize_mesg = "Minimize";   //No I18N
			if(is_user_loggedin === 'false'){
				mesg = getErrorMesgData('login',"",showSamlLocalChoice,minimize_mesg); //No I18N
				if(showSamlLocalChoice){
					height = '120px'; //No I18N
				}
			}
			else{
				var sdp_user_type = jQuery.parseJSON(data.message).sdp_user.USERTYPE;
				minimize_mesg = jQuery.parseJSON(data.message).sdp_app.minimize_mesg;

				if(sdp_user_type === 'Technician'){
					mesg = getErrorMesgData('login_req',jQuery.parseJSON(data.message).sdp_app.login_requester,showSamlLocalChoice,minimize_mesg); //No I18N
					//jQuery("#external_sdp_chat,#me_sdp_chat_content_div").css('display','none');
				}
				var is_ext_chat_enabled = jQuery.parseJSON(data.message).sdp_app.IS_SDP_EXT_CHAT_ENABLED;
				if(sdp_user_type === 'Requester' && !is_ext_chat_enabled){
					mesg = getErrorMesgData('ext_chat',jQuery.parseJSON(data.message).sdp_app.chat_warning,showSamlLocalChoice,minimize_mesg); //No I18N
				}
				if(sdp_user_type === 'Requester' && is_ext_chat_enabled){
					jQuery("#external_sdp_chat").css('display','none'); // No I18N
				}
			}
			if(mesg !== ""){
				jQuery("#me_sdp_chat_content_div").removeAttr('style').attr('style', 'bottom: 0px;position: fixed;right: 10px;width: auto;min-width:360px;height:auto;line-height: 40px; display:none;box-shadow:0px 1px 8px #777;border-top-left-radius: 5px;border-top-right-radius:5px;overflow: hidden');
				jQuery("#me_sdp_chat_content_div").html(mesg); //No I18N
			}


		}

		if(data.type === 'minimize_iframe'){
			var chatId = data.id;			
			var height = '37px', width = '115px'; //No I18N
			if(chatId != undefined && chatId != ""){
				width = '320px';	 //No I18N
			}
			jQuery("#sdp_external_chat").height(height); //No I18N
			jQuery("#sdp_external_chat").width(width);	//No I18N
		}
		if(data.type === 'maximize_iframe'){
			var chatId = data.id;
			var height = '431px', width = '324px'; //No I18N
			if(chatId != undefined && chatId != ""){
				width = '320px'; //No I18N
				height = '435px'; //No I18N
				jQuery("#me_sdp_chat_content_div").css('right','10px'); //No I18N
			}
			else{
				jQuery("#me_sdp_chat_content_div").css('right','5px'); //No I18N
			}
			jQuery("#sdp_external_chat").height(height); //No I18N
			jQuery("#sdp_external_chat").width(width);	//No I18N
			
		}

		if(data.type === 'change_window_title'){
			var title = data.title;
			changeWindowTitle(title);
		}

		if(data.type === 'stop_toggling'){
			stopTitleToggling();
		}
	}


	function getErrorMesgData(type,mesg,showSamlLocalChoice,title)
	{	
		var hrefTag = "<a style='font-weight:normal;text-decoration:none;color:#1a6ebd;margin-top:20px;margin-bottom:10px;font-size: 13px;font-family: Verdana;display: inline-block'>";
		if(type === 'login' || type === 'login_req'){		
			hrefTag = "<a href='"+sdp_url+"' target='_blank' style='font-weight:normal;text-decoration:none;color:#1a6ebd;margin-top:20px;margin-bottom:10px;font-size: 13px;font-family: Verdana;display: inline-block'>";
			
			if(type === 'login'){
				mesg = mesg + 'Please log in to the application </a>';//No I18N
				if(showSamlLocalChoice){
					mesg = mesg + '<hr><span style="position:absolute;font-size: 13px;font-family: Verdana;color: #999;width: 30px;bottom: 58px;background-color: #ffffff;transform:translateX(-50%);left: 50%"> OR </span>'
					var samlURL = sdp_url+"SamlRequestServlet"; //No I18N
					var samlhrefTag = "<a href='"+samlURL+"' target='_blank' style='font-weight:normal;color:#1a6ebd;text-decoration:none;margin-bottom:20px;margin-top:10px;font-size: 13px;font-family: Verdana;display: inline-block;'> Log in with SAML Single Sign On </a>";
					mesg = mesg + samlhrefTag;
				}
				var return_mesg = "<div style='background-color: #ffffff; position: relative !important;text-align: center;padding: 0px 20px;'>"+mesg+"</div>";
			}
		}
		var return_mesg = "<div style='position:absolute;top:0px;width: 100%;height: 40px;background-color: #F4F4F9;z-index: 99;box-shadow: 0px 2px 1px #ccc;text-align:right;'><a href='javascript:minimizeChatbar();' title='"+title+"' style='margin-right:10px;display:inline-block;font-size: 20px;color: #777;text-decoration:none'>-</span></div><div style='background-color: #ffffff; position: relative !important;text-align: center;padding: 0px 20px;padding-top: 40px;'>" +hrefTag+""+mesg+"</a>";
		return return_mesg;
	}

	function changeWindowTitle(title_mesg)
	{
		if(title_interval== null ){
			title_interval = setInterval(function(){
				var title = (document.title == default_title)? title_mesg : default_title;  //No I18N
				document.title = title;
			},900);

		}
	}

	function stopTitleToggling()
	{
		clearInterval(title_interval);
		title_interval = null;
		document.title = default_title;
	}
}


function getSDPURL()
{
    /*
	var url = "";
	var scripts = document.getElementsByTagName('script');
	var len = scripts.length;
	for(var i =0; i < len; i++) {
		if(scripts[i].src.search("initialize-external-sdpchat.js") > 0 && scripts[i].src.lastIndexOf("/") >= 0) {
			url = scripts[i].src.substring(0, scripts[i].src.lastIndexOf("/scripts/") + 1);
			break;
		}
    } */

    var url = "https://cvhelpdesk.centinela.k12.ca.us:450/";
    
	return url;
}

function minimizeChatbar()
{
	jQuery("#external_sdp_chat").css('display',''); // No I18N
	jQuery("#me_sdp_chat_content_div").css('display','none'); // No I18N
	
}





  


