// ==UserScript==
// @name        Hello World
// @namespace   _
// @include     http://siriust.ru/*
// @include     https://siriust.ru/*
// @version     1
// ==/UserScript==

// alert("here")

function addNewStyle(newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        // document.getElementsByTagName('head')[0].appendChild(styleElement);
        document.getElementsByTagName('body')[0].prepend(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}


addNewStyle('html, body {display: block !important;}')
document.documentElement.classList.remove("cookies");

// document.documentElement.style.display = "block"
// document.documentElement.style.visibility = "visible"
// document.body.style.display = "block"
// document.body.style.visibility = "visible"
