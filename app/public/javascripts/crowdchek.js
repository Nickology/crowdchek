// set variables to instruct the page whether to ask for more info when an option is chosen
var thanks = "thanks", more = "more";

var cck_source_id = null;

// Check if there's an OG:URL tag available to use as id
cck_source_id = CCK_getMetaData("og:url");
if (false === cck_source_id) {
    // do we need to filter out any tracking codes? --Jono
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
	var selection = window.getSelection();
	var str = null;
	console.log(selection);
	if (selection) {
		if (selection.type == "Range") {
			// One or several objects selected
			// Try to extract string
			str = selection.toString();
			console.log("Buildling custom context menu");
			console.log("Extracted string:" + str);
			
			// Get position of mouse
			var x = event.clientX;
			var y = event.clientY;
			cck_context_menu.style.top = y + "px";
			cck_context_menu.style.left = x + "px";
			cck_context_menu.style.display = "block";
			
			return false;
		}
		console.log("NOT Buildling custom context menu");
		return true;
	}
}

// close the context menu if the user clicks
function CCK_closeContextMenu (event) {
    var display = document.getElementById("cck").style.display;
    if (display && display !== "none") {
        document.getElementById("cck").style.display = "none";        
    }    
}

console.log("Source ID = " + cck_source_id);

window.oncontextmenu = CCK_buildContextMenu;
window.onclick = CCK_closeContextMenu;

var cck_context_menu = document.createElement("div");
cck_context_menu.setAttribute("class", "cck_context");
cck_context_menu.setAttribute("id", "cck");
cck_context_menu.innerHTML = "<div id='popmenu'><div class='menu_head'>Chek</div><div class='cck_context_option' onClick='openNav(more)'>This is inaccurate</div><div class='cck_context_option' onClick='openNav(thanks)'>Spelling / grammar error</div></div>";
document.getElementsByTagName("body")[0].appendChild(cck_context_menu);