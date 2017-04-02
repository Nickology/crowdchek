// Config values
var cck_URL = 'https://4285e6f1.ngrok.io';

var cck_source_id = null;

// Check if there's an OG:URL tag available to use as id
cck_source_id = CCK_getMetaData("og:url");
if (false === cck_source_id) {
	cck_source_id = window.location.href;
}

function CCK_getMetaData(tag) {
	var cck_metas = document.getElementsByTagName('meta'); 
	for (var i=0; i < cck_metas.length; i++) {
		if (cck_metas[i].getAttribute("property") == tag) { 
			return cck_metas[i].getAttribute("content"); 
		}
	}
	return false;
} 

function CCK_buildContextMenu(event) {
	console.log(event);
	var str = getSelectedText();
	if (false === str) {
		console.log("NOT Buildling custom context menu");
		return true;
	}
	
	console.log("Buildling custom context menu");
	console.log("Extracted string: >" + str + "<");
	
	var x = event.clientX;
	var y = event.clientY;
	cck_context_menu.style.top = y + "px";
	cck_context_menu.style.left = x + "px";
	cck_context_menu.style.display = "block";
	event.preventDefault();
	return false;
}

function getSelectedText() {
	var selection = window.getSelection();
	var str = null;
	console.log(selection);
	if (selection) {
		var range = selection.getRangeAt(0);
		if (range.collapsed) {
			return false;
		} else if (selection.type == "Range") {
			while (range.startOffset > 0 && range.toString()[0].match(/\w/)) {
		        range.setStart(range.startContainer, range.startOffset - 1);
		    }
		    while (	range.endOffset < range.endContainer.length-1 &&
		    		range.toString()[range.toString().length - 1].match(/\w/)) {
		        range.setEnd(range.endContainer, range.endOffset + 1);
		    }
		    if (range.toString()[0] == " ") {
			    range.setStart(range.startContainer, range.startOffset + 1);
		    }
		    if (range.toString()[range.toString().length-1] == " ") {
			    range.setEnd(range.endContainer, range.endOffset - 1);
		    }
		    selection.removeAllRanges();
		    selection.addRange(range);
			return range.toString();
		}
	}
	return false;
}

function cck_Activate(obj) {
	switch (obj.getAttribute("id")) {
		case "cck_typo" :
			console.log("Typo option selected");
			var obj = {};
			var selection = getSelectedText();
			console.log("Selection: " + selection);
			obj.source = cck_source_id;
			obj.feedback = "typo";
			obj.content = selection;
			obj.user = cck_getUser();
			// obj.parent_source = null;
			cck_send(obj);
			break;
		case "cck_dispute" :
			console.log("dispute option selected");
			break;
		default:
			console.log("Unknown option selected");
			break;
	}	
}

function cck_getUser() {
	// Returns random user for now
	var users = ["Jay", "Jono", "Kevin", "Nick", "Yusuf"];
	return users[Math.floor(Math.random() * users.length)] + Math.floor(Math.random() * 20);
}

function cck_send(obj) {
	var ajax;
	ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if (this.readyState != 4 || this.status != 200) {
			console.error("[CHEK] Unable to send feedback");
			// TODO: Show error 
			// openNav('error');
		} else if (this.status == 200) {
			openNav('thanks');
		}
	};
	ajax.open("POST", cck_URL + '/chek', true);
	ajax.setRequestHeader("Content-Type", "application/json");
	console.log("Sending: " + JSON.stringify(obj));
	ajax.send(JSON.stringify(obj));
}

console.log("Source ID = " + cck_source_id);

var cck_context_menu = document.createElement("div");
cck_context_menu.setAttribute("class", "cck_context");
cck_context_menu.setAttribute("onmouseleave", "this.style.display='none'");
cck_context_menu.innerHTML = "<div id='cck_typo' class='cck_context_option' onclick='cck_Activate(this);' onmousedown='event.preventDefault();'>Typo</div><div id='cck_dispute' class='cck_context_option' onclick='cck_Activate(this);' onmousedown='event.preventDefault();'>Dispute Fact</div>";
document.getElementsByTagName("body")[0].appendChild(cck_context_menu);

window.oncontextmenu = CCK_buildContextMenu;