window.addEventListener("load", function() {
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

    // console.log(getElementsByClassName('buttonLink').item(1))
    // console.log(typeof getElementsByClassName('buttonLink'));

    function Search() {
        var searchInputBox = document.getElementById("search-field");
        var searchInput_value = searchInputBox.value;

        if (searchInput_value == '' || null || undefined) {
            searchResults_blueSection.style.display = "none";
        }
        //var buttonLinks = getElementsByClassName('buttonLink');
        // console.log(getElementsByClassName('buttonLink').item(1));
        //for (var i = 0; i < buttonLinks.length; i++) {
        search_inputValue(document.getElementById('sampleLink'));
        console.log("For loop");
        // }

        function search_inputValue(linkElement) {
            if (linkElement.getAttribute('data-title') == searchInput_value) {
                renderSearchResults(linkElement);
            }
        }

        function renderSearchResults(linkElement) {
            console.log("Render search results");
            var searchResults_buttonRow = document.getElementById("searchResultsButtonRow");
            var searchResults_blueSection = document.getElementById("searchResults-blueSection");
            var link_element = document.createElement("a");
            link_element.href = linkElement.href;

            var button_element = document.createElement("button");

            var image_element = document.createElement("img");

            console.log(linkElement.firstChild.firstChild.src);

            image_element.src = linkElement.firstChild.firstChild.src;


            searchResults_buttonRow.appendChild(link_element).appendChild(button_element).appendChild(image_element);
            searchResults_blueSection.style.display = "block";
        }

    }

    searchInputBox.addEventListener('keypress', Search);
    searchInputBox.addEventListener('keyup', Search);
    searchInputBox.addEventListener('input', Search);
    searchInputBox.addEventListener('change', Search);
    //Search();

    /*Array.prototype.forEach.call(function(element) {
    
                }, this); */

}); //end window.onload() function ) 

console.log("JavaScript file loaded");