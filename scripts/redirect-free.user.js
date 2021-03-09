// ==UserScript==
// @name            Redirect-free
// @author          Bga_
// @description     transform /url? /away? tracking links to real one
// @license         Creative Commons Attribution License
// @include         https://*
// @include         http://*
// @version	        0.1
// @released        2021-03-09
// @updated         2021-03-09
// @compatible      Greasemonkey
// ==/UserScript==

// @_include         *
// @_namespace       http://www.example.url/to/your-web-site/

//# replaces redirect link to original. Simple antitracking
!(function(global) {
  const log = 1 ? GM_log : function() {  }
  
  const parseQueryString = function(s) {
    var $r = {  }
    s.split("&").forEach(function(kAndV) {
      var k = kAndV.split("=")[0]
      var v = kAndV.split("=")[1]
      $r[k] = decodeURIComponent(v)
    })
    return $r
  }
  
  const redirects = [
    [/^(?:https?:\/\/)?(?:www\.)?google\.(?:com|ru|co\.uk)\/url\?([\s\S]*)$/, function(match) { 
      var qso = parseQueryString(match[1])
      return qso["url"] || qso["q"]; 
    }],
    //# { "https://www.youtube.com/redirect?q=https%3A%2F%2Fwww.controllino.biz%2F&redir_token=FjbYZ_bLMLiFByycIw2lQE8QbDd8MTU2Mzg4MDQ4MUAxNTYzNzk0MDgx&event=video_description&v=0fDPBtbsUgc" }
    [/^(?:https?:\/\/)?(?:www\.)?youtube\.(?:com)\/redirect\?([\s\S]*)$/, function(match) { 
      var qso = parseQueryString(match[1])
      return qso["url"] || qso["q"]; 
    }],
    //# { "https://m.vk.com/away.php?to=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DKbQFboIEMcI&post=6666666_66" }
    [/^(?:https?:\/\/)?(?:www\.)?(?:m\.)?vk\.(?:com)\/away.php\?([\s\S]*)$/, function(match) { 
      var qso = parseQueryString(match[1])
      return qso["to"]; 
    }],
    [/^(?:http:\/\/)?forum\.funkysouls\.com\/go\.php\?([^&]*)/, function(match) { 
      return decodeURIComponent(match[1]); 
    }]
  ]

  // alert(1);
  log("hello from redirect-free")
  
  var onAEvent = function(ev) {
    var a = ev.target
    
    if(a.tagName != "A") return;
    
    // log("hello from redirect-free::touchstart")
    
    var href = a.getAttribute('href')
    
    if(href == null) return;
    
    if(href.match(/^http(s?)/) == null) {
      href = "".concat(location.protocol, "//", location.host, href)
    };
    1 && log("url ", href)

    const transform = function(href) {
      var j = -1, r = null; while((r = redirects[++j]) != null) {
        var match = r[0].exec(href)
        
        if(match != null) {  
          log("match ", match)
          href = r[1](match)
        };
      }
      return href
    }
    
    var origHref = href
    var oldHref
    do {
      href = transform(oldHref = href)
    }
    while(oldHref != href);
    
    if(href != origHref) {
      a.setAttribute("href", href)
    };
  }
  
  document.addEventListener('touchstart', onAEvent, true)
  document.addEventListener('mouseenter', onAEvent, true)
  document.addEventListener('mousedown', onAEvent, true)
  document.addEventListener('focus', onAEvent, true)
})(this)
