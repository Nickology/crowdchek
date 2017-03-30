// Overlay menu

/* Open when someone clicks on the span element */
function openNav(screen) {
    document.getElementById("myNav").style.width = "100%";
    if (screen === 'thanks') {
        document.getElementById("thanksmessage").style.display = "initial";
        document.getElementById("moreinfo").style.display = "none";
    } else {
        document.getElementById("moreinfo").style.display = "initial";
        document.getElementById("thanksmessage").style.display = "none";
    }
//    document.getElementById("thanksmessage").style.display = "initial";
    document.getElementById("cck").style.display = "none";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("thanksmessage").style.display = "none";
    document.getElementById("myNav").style.width = "0%";
}

/* Move to the 'thanks' screen after asking for more info */
function nextScreen() {
    document.getElementById("moreinfo").style.display = "none";
    document.getElementById("thanksmessage").style.display = "initial";
}