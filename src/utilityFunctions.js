import React, { useState, useEffect } from 'react';

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

export { isEmpty, isIE, isSafari, isChromeBrowser, useWindowSize }