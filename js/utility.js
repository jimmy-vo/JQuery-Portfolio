
function truncate(str, limit) {
    var trimmable = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';
        var reg = new RegExp('(?=[' + trimmable + '])');
        var words = str.split(reg);
        var count = 0;
        return words.filter(function(word) {
            count += word.length;
            return count <= limit;
        }).join('') + " ...";
  };


function loadXML(filename) {
  'use strict';

  var xhttp;

  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else { // Only really old browsers like IE6 need this:
    xhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }

  // Note: Setting the third argument to false turns on synchronous
  // fetch mode, which is being phased out (deprecated).
  xhttp.open('GET', filename, false);
  xhttp.send();
  return xhttp.responseXML;
}

function trim(str) 
{
  return str.replace(/^\s+|\s+$/g,"");
}

function ImageExist(url) 
{
    try 
    {
      var http = new XMLHttpRequest();
      http.open('HEAD', url, false);
      http.send();
      return http.status!=404;
    }
    catch (err)
    {
      return false;
    }
}


function createTextElement(tag, string) 
{
  var element = document.createElement(tag);  
  element.innerHTML  = string;
  return element;
}