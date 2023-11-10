/*======================================
=========== Responsive Video ===========
========================================*/

(function (global, initializeResponsiveYT) {
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = initializeResponsiveYT();
    } else if (typeof define === "function" && define.amd) {
      define(initializeResponsiveYT);
    } else {
      global.reframe = initializeResponsiveYT();
    }
  })(this, function () {
    "use strict";
    
    return function (targetElements, className) {
      var elementsToMakeResponsive =
        typeof targetElements === "string"
          ? document.querySelectorAll(targetElements)
          : targetElements;
  
      var defaultClassName = className || "js-reframe";
  
      if (!("length" in elementsToMakeResponsive)) {
        elementsToMakeResponsive = [elementsToMakeResponsive];
      }
  
      for (var index = 0; index < elementsToMakeResponsive.length; index += 1) {
        var currentElement = elementsToMakeResponsive[index];
  
        if (
          -1 !== currentElement.className.split(" ").indexOf(defaultClassName) ||
          -1 < currentElement.style.width.indexOf("%")
        ) {
          return;
        }
  
        var originalHeight = currentElement.getAttribute("height") || currentElement.offsetHeight;
        var originalWidth = currentElement.getAttribute("width") || currentElement.offsetWidth;
  
        var aspectRatio =
          (typeof originalHeight === "string" ? parseInt(originalHeight) : originalHeight) /
          (typeof originalWidth === "string" ? parseInt(originalWidth) : originalWidth) * 100;
  
        var wrapperElement = document.createElement("div");
        wrapperElement.className = defaultClassName;
        var wrapperStyle = wrapperElement.style;
        wrapperStyle.position = "relative";
        wrapperStyle.width = "100%";
        wrapperStyle.paddingTop = "".concat(aspectRatio, "%");
  
        currentElement.style.position = "absolute";
        currentElement.style.width = "100%";
        currentElement.style.height = "100%";
        currentElement.style.left = "0";
        currentElement.style.top = "0";
  
        var parentElement = currentElement.parentNode;
        if (parentElement !== null) {
          parentElement.insertBefore(wrapperElement, currentElement);
        }
  
        var siblingElement = currentElement.parentNode;
        if (siblingElement !== null) {
          siblingElement.removeChild(currentElement);
        }
  
        wrapperElement.appendChild(currentElement);
      }
    };
  });
  
// Select and make responsive iframes with YouTube videos
var youtubeIframes = document.querySelectorAll('iframe[src*="youtube.com"]');
reframe(youtubeIframes, 'responsive-iframe');
