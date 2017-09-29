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
        var searchResults_buttonRow = document.getElementById("searchResultsButtonRow");
        var searchResults_blueSection = document.getElementById("searchResults-blueSection");
        var searchInputBox = document.getElementById("search-field");
        var searchInput_value = searchInputBox.value;
        var searchResults = document.getElementsByClassName("search-result");

        if (searchInput_value == ' ' || searchInput_value == null || searchInput_value == undefined) {
            if (searchResults[0] !== undefined || searchResults[0] !== null) {
                function removeElementsByClass(className) {
                    console.log("removeElementsByClass");
                    var classElements = document.getElementsByClassName(className);
                    while (classElements.length > 0) {
                        classElements[0].parentNode.removeChild(classElements[0]);
                    } //end while loop
                    searchResults_blueSection.style.display = "none";
                } //end removeElementsByClass()
            } //end inner if-statement
            //else { searchResults_blueSection.style.display = "none"; }
        } //remove external if-statement

        var buttonLinkElements = document.getElementsByClassName('buttonLink');
        console.log("item(1): " + buttonLinkElements.item(1));
        for (var i = 0; i < buttonLinkElements.length; i++) {
            //search_inputValue(document.getElementById('sampleLink'));
            console.log("Current Button Link ID: ", buttonLinkElements[i].id);
            console.log("For loop");

            if (buttonLinkElements[i] !== null || buttonLinkElements[i] !== undefined) {
                console.log("Pass to search_inputValue()");
                //search_inputValue(document.getElementById(buttonLinkElements[i].id));
                search_inputValue(buttonLinkElements[i]);
            }
        } //end for loop

        function search_inputValue(linkElement) {
            console.log("Inside search_inputValue() \n\n");
            if ((linkElement != null) && (linkElement.getAttribute('data-title').indexOf(search_inputValue))) {
                console.log("search_inputValue() if-statement\n\n");
                renderSearchResults(linkElement);
            }
        }

        function renderSearchResults(linkElement) {
            console.log("renderSearchResults() function " + searchResults[0]);
            console.log("searchResults Type: " + searchResults + "\n\n");

            if (searchResults[0] === undefined) {
                console.log("If-statement Render search results");
                var link_element = document.createElement("a");
                link_element.href = linkElement.href;
                link_element.classList.add("search-result");

                var button_element = document.createElement("button");

                var image_element = document.createElement("img");

                console.log(linkElement.firstChild.firstChild.src);

                image_element.src = linkElement.firstChild.firstChild.src;

                searchResults_buttonRow.appendChild(link_element).appendChild(button_element).appendChild(image_element);
                searchResults_blueSection.style.display = "block";
            } //end if statement
            else if (searchResults !== undefined) {
                var duplicateFlag = false;
                //Check to be sure that there are no duplicate links generated
                var index = 0;
                while (searchResults[i] != undefined && index <= searchResults.length) {
                    console.log("while loop");
                    //If statement to check if the actual link of link element does not already exist
                    if (searchResults[i].href === linkElement.href) {
                        console.log("while loop if");
                        duplicateFlag = true;

                        //break;
                    } //end if-statement
                    if (duplicateFlag != true) {
                        console.log("searchResults[i].href != linkElement.href");
                        console.log("Render search results, more buttons");

                        console.log("Search Result link: " + searchResults[i].href);
                        console.log("LinkElement link: " + linkElement.href);

                        console.log("Search result src: " + searchResults[i].childNodes[0].firstChild.src + "\n\n");
                        console.log("Link Element result src: " + linkElement.childNodes[0].firstChild.src + "\n\n");

                        var link_element = document.createElement("a");
                        link_element.href = linkElement.href;
                        link_element.classList.add("search-result");

                        var button_element = document.createElement("button");

                        var image_element = document.createElement("img");

                        console.log(linkElement.firstChild.firstChild.src);

                        image_element.src = linkElement.firstChild.firstChild.src;

                        searchResults_buttonRow.appendChild(link_element).appendChild(button_element).appendChild(image_element);
                        break;
                    } //end else-statement
                    index++;
                } //end while loop
            } //end else-statement
        } //end renderSearchResults() function
    }

    searchInputBox.addEventListener('keypress', Search);
    searchInputBox.addEventListener('keyup', Search);
    searchInputBox.addEventListener('input', Search);
    searchInputBox.addEventListener('change', Search);
    //Search();

    /*Array.prototype.forEach.call(function(element) {
        
                }, this); */

}); //end window.onload() function 

console.log("JavaScript file loaded");