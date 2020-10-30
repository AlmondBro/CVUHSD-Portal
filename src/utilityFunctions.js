const isIe = require("@braintree/browser-detection/is-ie");
const isChromeOS = require("@braintree/browser-detection/is-chrome-os");
const isChrome = require("@braintree/browser-detection/is-chrome");
const isEdge = require("@braintree/browser-detection/is-edge");

let isEmpty  = (string) => {
    let that = this;
    if (string) {
        that = string;
    }
    return ((!that || /^\s*$/.test(that)) || that.length === 0 || !that.trim);
};

const isIE = () => {
    const isInternetExplorer = (isIe() || isEdge()) && !isChrome() && !isChromeOS();
    
    return isInternetExplorer;
}; //end isIE()

export { isEmpty, isIE }