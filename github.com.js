// ==UserScript==
// @include        https://github.com/*
// @name some helpers
// @author Bga
// @version 0.1
// @description
// ==/UserScript==

    
document.addEventListener("DOMContentLoaded", function() {
  ;[].forEach.call(document.getElementsByTagName("INCLUDE-FRAGMENT"), function(v) {
    var src = v.getAttribute("src")
    
    if(src != null) {
      fetch(src).then(function(response) {
        if(response.ok) {
          response.text().then((t) => { v.outerHTML = t })
        };
      })
    }
    else {
    
    }
  })
}, false)
