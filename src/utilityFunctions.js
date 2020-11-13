import isIe from '@braintree/browser-detection/is-ie';
import isChromeOS from '@braintree/browser-detection/is-chrome-os';
import isChrome from '@braintree/browser-detection/is-chrome';
import isEdge from '@braintree/browser-detection/is-edge';
import isIosSafari from '@braintree/browser-detection/is-ios-safari';

let isEmpty  = (string) => {
    let that = this;
    if (string) {
        that = string;
    }
    return ((!that || /^\s*$/.test(that)) || that.length === 0 || !that.trim);
};

let isBrowserSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
const isBrowserChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

const isSafari = isIosSafari || isBrowserSafari;
const isChromeBrowser = isChrome || isChromeOS || isBrowserChrome;

const isIE = () => {
    const isInternetExplorer = (isIe() || isEdge()) && !isChrome() && !isChromeOS();
    
    return isInternetExplorer;
}; //end isIE()

export { isEmpty, isIE, isSafari, isChromeBrowser }