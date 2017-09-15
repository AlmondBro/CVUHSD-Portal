window.onload = function() {
    console.log("Window has finished loading!");

    var searchInputBox = document.getElementById("search-field");
    var searchInput_value = searchInputBox.value;

    var search_modal_load_indicator = document.getElementById("search-modal-load-indicator");

    searchInputBox.addEventListener("keyup", function() {
        search_modal_load_indicator.style.visibility = searchInputBox.value.length ? "visible" : "hidden";
        console.log("Key pressed on input box");
    }, false);


    searchInputBox.addEventListener("blur", function() {
        search_modal_load_indicator.style.visibility = "hidden";
    }, false);

}; //end window.onload() function

console.log("JavaScript file loaded");