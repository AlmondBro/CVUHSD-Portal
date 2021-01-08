import { useState, useEffect } from 'react';

import he from 'he'; //Import HTML character entity decoder

import isIe from '@braintree/browser-detection/is-ie';
import isChromeOS from '@braintree/browser-detection/is-chrome-os';
import isChrome from '@braintree/browser-detection/is-chrome';
import isEdge from '@braintree/browser-detection/is-edge';
import isIosSafari from '@braintree/browser-detection/is-ios-safari';
import isIosUIWebview  from '@braintree/browser-detection/is-ios-uiwebview';
import isIosWKWebview from '@braintree/browser-detection/is-ios-wkwebview';

import isFirefox from '@braintree/browser-detection/is-firefox';
import isIosFirefox from '@braintree/browser-detection/is-ios-firefox';
import isMobileFirefox from '@braintree/browser-detection/is-mobile-firefox';


let isEmpty  = (string) => {
    let that = this;
    if (string) {
        that = string;
    }
    return ((!that || /^\s*$/.test(that)) || that.length === 0 || !that.trim);
};

let isBrowserSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
const isBrowserChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

const isSafari = isIosSafari() || isIosUIWebview() || isIosWKWebview() || isBrowserSafari;
const isChromeBrowser = isChrome() || isChromeOS() || isBrowserChrome;
const isFirefoxBrowser = isFirefox() || isIosFirefox() || isMobileFirefox();

const isIE = () => {
    const isInternetExplorer = (isIe() || isEdge()) && !isChrome() && !isChromeOS();
    
    return isInternetExplorer;
}; //end isIE()


// Hook to measure the screen width is courtesey of:
// https://usehooks.com/useWindowSize/
const useWindowSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);
      
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
  
    return windowSize;
  }

const removeHTML = (htmlString) => {;
  var strippedHtmlString = htmlString.replace(/<[^>]+>/g, '');
  
  return he.decode(strippedHtmlString); //Use he to decode any special character HTML entities
};

export { isEmpty, isIE, isSafari, isChromeBrowser, isFirefoxBrowser, useWindowSize, removeHTML }