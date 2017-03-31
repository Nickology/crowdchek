// Overlay submission form

/* Open when someone clicks on the menu item */
function openNav(screen) {
    // placeholder variable for login functionality
    var isLoggedIn = true;
    
    // hide the context menu
//    document.getElementById("cck").style.display = "none";

    // expand the popover
    document.getElementById("myNav").style.width = "100%";
    
    // if the user is logged in, proceed to more info or submission confirmation. Otherwise request login.
    if (isLoggedIn) {
        if (screen === 'thanks') {
            document.getElementById("thanksmessage").style.display = "initial";
            document.getElementById("moreinfo").style.display = "none";
        } else if (screen === 'more') {
            document.getElementById("moreinfo").style.display = "initial";
            document.getElementById("thanksmessage").style.display = "none";
        }
        
    } else if (!isLoggedIn) {
        // ask user to log in
    }
    
    // add small delay before revealing divs to account for slide-in animation
    setTimeout(function(){document.getElementById("overlay-divs").style.opacity = "1"},300);
        
    /* close the nav when escape key pressed */
    window.document.onkeydown = function (e) {
            if (!e) e = event;
            if (e.keyCode == 27) {
                console.log("esc key pressed");
                closeNav();
            }
        }
    }

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("overlay-divs").style.opacity = "0";
    document.getElementById("myNav").style.width = "0%";
}

/* Move to the 'thanks' screen after asking for more info */
function nextScreen() {
    document.getElementById("moreinfo").style.display = "none";
    document.getElementById("thanksmessage").style.display = "initial";
}