/*
	This file contains helpers and useful functions for use with Project Omerta Beyond

	Feel free to use them, but please let us know.

	Version: 1.10.0.23

	$Rev$:  Revision of last commit
	$Author$:  Author of last commit
	$Date$:  Date of last commit
*/

var dl, ds, dlp, dls, dlh, lh, ls, db, i, I, arr, host, urlsearch, hOne;

dl = document.location;
ds = document.search;
db = document.body;
dlp = document.location.pathname;
dls = document.location.search;
ls = document.location.search;
dlh = document.location.hostname;
lh = location.href;
host = location.hostname.toLowerCase();
urlsearch = location.pathname + location.search;
arr = [];

function decbin(dec, max) { //deprecated function - only used for prefs transition compatibility
	var bin = [];
	for (i = max; i >= 0; i--) {
		if (dec >= Math.pow(2, i)) {
			dec -= Math.pow(2, i);
			bin[i] = true;
		} else {
			bin[i] = false;
		}
	}
	return bin;
}

function prefsArray(input, len) {
	var fail, in_2, out;
	//compatibility checking
	fail = input.replace(/[01]/g, '');
	if (fail) {
		in_2 = decbin(input, len);
		input = '';
		for (i = 0; i < in_2.length; i++) {
			input += (in_2[i] ? 1 : 0);
		}
		setValue('prefs', input);
	}
	out = []; //create array for prefs
	for (i = 0; i < input.length; i++) {
		out[i] = (input.charAt(i) == 1 ? 1 : 0);
	}
	if (out.length < len) {
		for (i = out.length; i < len; i++) {
			out[i] = 0;
		}
	}
	return out;
}

function GetPost(name) {
	var str = ls;
	if (str.indexOf('?' + name + '=') >= 0) {
		return str.slice(name.length + 2, str.indexOf('&'));
	} else if (str.indexOf('&' + name + '=') >= 0) {
		str = str.slice(str.indexOf('&' + name + '=') + name.length + 2);
		if (str.indexOf('&') >= 0) {
			str = str.slice(0, str.indexOf('&'));
		}
		return str;
	} else {
		return '';
	}
}

function GetParam(name) {
	var start, end, result;
	start = location.search.indexOf("?" + name + "=");
	if (start < 0) {
		start = location.search.indexOf("&" + name + "=");
	}
	if (start < 0) {
		return '';
	}
	start += name.length + 2;
	end = location.search.indexOf("&", start) - 1;
	if (end < 0) {
		end = location.search.length;
	}
	result = '';
	for (I = start; I <= end; I++) {
		var c = location.search.charAt(I);
		result = result + (c == '+' ? ' ' : c);
	}
	return unescape(result);
}

function setIcon(icon) {
	var head, links, i, newIcon;
	head = window.document.getElementsByTagName('head')[0];
	links = head.getElementsByTagName('link');
	for (i = 0; i < links.length; i++) {
		if (links[i].type == 'image/x-icon' && (links[i].rel == 'shortcut icon' || links[i].rel == 'icon') && links[i].href != icon) {
			head.removeChild(links[i]);
		}
		else if (links[i].href == icon) {
			return;
		}
	}
	newIcon = document.createElement('link');
	newIcon.type = 'image/x-icon';
	newIcon.rel = 'shortcut icon';
	newIcon.href = icon;
	return head.appendChild(newIcon);
}

function $x(xpath, root) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document,
		next;
	var got = doc.evaluate(xpath, root || doc, null, 0, null),
		result = [];
	switch (got.resultType) {
	case got.STRING_TYPE:
		return got.stringValue;
	case got.NUMBER_TYPE:
		return got.numberValue;
	case got.BOOLEAN_TYPE:
		return got.booleanValue;
	default:
		while (next = got.iterateNext()) result.push(next);
		return result;
	}
}

function $X(xpath, root) {
	var got = $x(xpath, root);
	return got instanceof Array ? got[0] : got;
}

function $XLast(xpath, root) {
	var got, len;
	got = $x(xpath, root);
	len = (got.length - 1);
	return got instanceof Array ? got[len] : got;
}

function $del(xpath) {
	$x(xpath).forEach(
		function ($n) {
			$n.parentNode.removeChild($n);
		}
	);
}

function $Del(xpath) {
	$X(xpath).parentNode.removeChild($X(xpath));
}

function $Cut(xpath, deep) {
	var node = $X(xpath).cloneNode(deep);
	$Del(xpath);
	return node;
}

function $I(xp, val) {
	if (!val) {
		return $X(xp).innerHTML;
	} else {
		$X(xp).innerHTML = val;
	}
}

function $i(xp, i, val) {
	if (!val) {
		return $x(xp)[i].innerHTML;
	} else {
		$x(xp)[i].innerHTML = val;
	}
}

function replaceLast(str, fnd, rpl, glb) {
	if (str.slice(str.length - fnd.length) == fnd) {
		str = str.slice(0, str.lastIndexOf(fnd)) + (rpl ? rpl : '');
	}
	if (glb && str.slice(str.length - fnd.length) == fnd) {
		str = replaceLast(str, fnd, rpl, glb);
	}
	return str;
}

function findPos(obj) {
	var curleft, curtop;
	curleft = 0;
	curtop = 0;
	if (obj.offsetParent) {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
		while (obj = obj.offsetParent) {
			return [curleft, curtop];
		}
	}
}

function stripHTML(string) {
	var matchTag = /<(?:.|\s)*?>/g;
	return string.replace(matchTag, '');
}

function RGBtoHex(R, G, B) {
	return toHex(R) + toHex(G) + toHex(B);
}

function toHex(N) {
	if (N === null) {
		return '00';
	}
	N = parseInt(N);
	if (N === 0 || isNaN(N)) {
		return '00';
	}
	N = Math.max(0, N);
	N = Math.min(N, 255);
	N = Math.round(N);
	return '0123456789ABCDEF'.charAt((N - N % 16) / 16) + '0123456789ABCDEF'.charAt(N % 16);
}

function getID(id) {
	return document.getElementById(id);
}

function getTXT(xpath) {
	return $X(xpath).textContent;
}

function getTAG(name) {
	return document.getElementsByTagName(name);
}

function getELNAME(name) {
	return document.getElementsByName(name);
}

function getCLNAME(name) {
	return document.getElementsByClassName(name);
}

function cEL(name) {
	return document.createElement(name);
}

function getValue(name, standard) {
	return GM_getValue(name + sets.version, standard);
}

function setValue(name, value) {
	return GM_setValue(name + sets.version, value);
}

function setArr(num) {
	return arr[num] = '<a href="/user.php?nick=' + arr[num].match(/\w+/g)[0] + '"><b>' + arr[num].match(/\w+/g)[0] + '</b></a>';
}

function find(string, Pos) {
	return Pos ? db.search(string) : string.test(db.innerHTML);
}

function getActual(el, attr) {
	return document.defaultView.getComputedStyle(el, '').getPropertyValue(attr);
}

function getActualHex(el, att) {
	var color = getActual(el, att);
	color = color.split(',');
	for (i = -1; ++i <= 2;) {
		color[i] = color[i].replace(/[^0-9]/g, '');
	}
	color = '#' + RGBtoHex(color[0], color[1], color[2]);
	return color;
}

function selectedTab() {
	return $X('//a[contains(@class, "selected")]/@href').nodeValue;
}

function insertAfter(newNode, node) {
	return node.parentNode.insertBefore(newNode, node.nextSibling);
}

function toggle(name) {
	var id = document.getElementById(name);
	if (id.style.display === '') {
		id.style.display = 'block';
	} else if (id.style.display == 'block') {
		id.style.display = '';
	}
}

function clearSettings() {
	if (typeof GM_listValues == 'function' && typeof GM_deleteValue == 'function') {
		var values = GM_listValues();
		for (var i in values) {
			if (typeof GM_deleteValue == 'function') {
				GM_deleteValue(values[i]);
			}
		}
	}
}

function getPow(name, i, def) {
	var info = getValue(name, '' + def);
	if (name == 'bninfo') {
		var w = 2; //set width of buckets
	} else if (name == 'prefs') {
		var w = 1;
	}
	return (1 * info.substr((i * w), w)); //return int version of bucket
}

function setPow(name, i, value) {
	var info = getValue(name, "0");
	if (name == 'bninfo') {
		var w = 2; //set width of buckets
	} else if (name == 'prefs') {
		var w = 1;
	}
	i = i * w; //set string index
	value += ''; //toString
	while (value.length < w) {
		value = '0' + value; //pad with zeros
	}
	if (i > 0 && (i + w) < info.length) {
		info = info.substring(0, i) + value + info.substring(i + w); //value goes in middle
	} else if (i === 0) {
		info = value + info.substring(w); //value goes at beginning
	} else if ((i + w) >= info.length) {
		info = info.substring(0, i) + value; //value goes at end
	} else {
		return;
	}
	setValue(name, info); //store string
}

function refreshIn(page) {
	var getTimeLeft, getMinLeft, getSecLeft, minToSec, totalSecLeft, totalTime, addExtraSec;
	getTimeLeft = db.innerHTML.split('<br>')[1];
	getMinLeft = getTimeLeft.match(/\d+/g)[0];
	getSecLeft = getTimeLeft.match(/\d+/g)[1];
	minToSec = parseInt((getMinLeft * 60), 10);
	totalSecLeft = parseInt(minToSec, 10) + parseInt(getSecLeft, 10);
	totalTime = totalSecLeft * 1000;
	addExtraSec = parseInt((totalTime + 1000), 10);
	setTimeout(function () {
		document.location.href = page;
	}, addExtraSec);
}

function commafy(num) {
	var str = (num + "").split("."),
		dec = str[1] || "",
		num = str[0].replace(/(\d)(?=(\d{3})+\b)/g, "$1,");
	return (dec) ? num + '.' + dec : num;
}

function rand(min, max) {
	return Math.floor(((max - min) + 1) * Math.random()) + min;
}

function rounding(x) {
	return Math.round(x * 10000) / 100;
}

function round(num, dec) {
	return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}

function toUp(word) {
	return word = word.slice(0, 1).toUpperCase() + word.slice(1);
}

function grabHTML(url, func) {
	var r = 0;
	if (window.XMLHttpRequest) {
		r = new XMLHttpRequest();
	}
	r.onreadystatechange = function () {
		if (r.readyState == 4) {
			if (r.status == 200) {
				func(r.responseText, url);
			}
		}
	};
	r.open('GET', url, true);
	r.send(null);
}

function getTintedColor(color, v) {
	var rgb, r, g, b;
	if (color.length > 6) {
		color = color.substring(1, color.length);
	}
	rgb = parseInt(color, 16);
	r = Math.abs(((rgb >> 16) & 0xFF)+v); if (r>255) r=r-(r-255);
	g = Math.abs(((rgb >> 8) & 0xFF)+v); if (g>255) g=g-(g-255);
	b = Math.abs((rgb & 0xFF)+v); if (b>255) b=b-(b-255);
	r = Number(r < 0 || isNaN(r)) ? 0 : ((r > 255) ? 255 : r).toString(16);
	if (r.length == 1) r = '0' + r;
	g = Number(g < 0 || isNaN(g)) ? 0 : ((g > 255) ? 255 : g).toString(16);
	if (g.length == 1) g = '0' + g;
	b = Number(b < 0 || isNaN(b)) ? 0 : ((b > 255) ? 255 : b).toString(16);
	if (b.length == 1) b = '0' + b;
	return '#' + r + g + b;
}

function hOne() {
	if (document.getElementsByTagName('h1')[0]) {
		return document.getElementsByTagName('h1')[0].innerHTML;
	}
}

function OBUpdate(cb) {
	GM_xmlhttpRequest({
		method: "GET",
		url: UPDATE_URL + "?uid=" + new Date().getTime(),
		onload: function (response) {
			var ob_parser, ob_dom, obv_major, obv_minor, obv_maintenance, obv_build, ob_url, obv_avail;
			ob_parser = new DOMParser();
			ob_dom = ob_parser.parseFromString(response.responseText, "text/xml");
			obv_major = ob_dom.getElementsByTagName("major")[0].textContent;
			obv_minor = ob_dom.getElementsByTagName("minor")[0].textContent;
			obv_maintenance = ob_dom.getElementsByTagName("maintenance")[0].textContent;
			obv_build = ob_dom.getElementsByTagName("build")[0].textContent;
			ob_url = ob_dom.getElementsByTagName("url")[0].textContent;
			obv_avail = obv_major + '.' + obv_minor + '.' + obv_maintenance + '.' + obv_build;

			if (SCRIPT_VERSION_MAJOR < obv_major) {
				if (confirm("There's an major update available for " + SCRIPT_NAME + "!\nWould you like to upgrade?\n\nInstalled:\t\t" + OB + "\nAvailable:\t" + obv_avail)) {
					GM_openInTab(ob_url);
				}
			} else if (SCRIPT_VERSION_MAJOR == obv_major) {
				GM_log("[Omerta Beyond Updater] Same major version ... lets check minor version");
				if (SCRIPT_VERSION_MINOR < obv_minor) {
					if (confirm("There's an minor update available for " + SCRIPT_NAME + "!\nWould you like to upgrade?\n\nInstalled:\t\t" + OB + "\nAvailable:\t" + obv_avail)) {
						GM_openInTab(ob_url);
					}
				} else if (SCRIPT_VERSION_MINOR == obv_minor) {
					GM_log("[Omerta Beyond Updater] Same minor version ... lets check maintenance version");
					if (SCRIPT_VERSION_MAINTENANCE < obv_maintenance) {
						if (confirm("There's an maintenance update available for " + SCRIPT_NAME + "!\nWould you like to upgrade?\n\nInstalled:\t\t" + OB + "\nAvailable:\t" + obv_avail)) {
							GM_openInTab(ob_url);
						}
					} else if (SCRIPT_VERSION_MAINTENANCE == obv_maintenance) {
						GM_log("[Omerta Beyond Updater] Same maintenance version ... lets check build version");
						if (SCRIPT_VERSION_BUILD < obv_build) {
							if (confirm("There's an revision update available for " + SCRIPT_NAME + "!\nWould you like to upgrade?\n\nInstalled:\t\t" + OB + "\nAvailable:\t" + obv_avail)) {
								GM_openInTab(ob_url);
							}
						} else if (SCRIPT_VERSION_BUILD == obv_build) {
							alert(SCRIPT_NAME + " is up to date.\n\nInstalled:\t\t" + OB + "\nAvailable:\t" + obv_avail);
						}
					} else if (SCRIPT_VERSION_MAINTENANCE > obv_maintenance && cb) {
						alert(SCRIPT_NAME + " is up to date.\n\nInstalled:\t\t" + OB + "\nAvailable:\t" + obv_avail);
					}
				} else if (SCRIPT_VERSION_MINOR > obv_minor && cb) {
					alert(SCRIPT_NAME + " is up to date.\n\nInstalled:\t\t" + OB + "\nAvailable:\t" + obv_avail);
				}
			} else if (cb) {
				alert(SCRIPT_NAME + " is up to date.\n\nInstalled:\t\t" + OB + "\nAvailable:\t" + obv_avail);
			}
		}
	});
}

Array.prototype.sum = function () {
	for (i = 0, sum = 0; i < this.length; sum += this[i++]) {
		return sum;
	}
};
Array.prototype.max = function () {
	return Math.max.apply({}, this);
};
Array.prototype.min = function () {
	return Math.min.apply({}, this);
};

Array.prototype.iMax = function () {
	return this.indexOf(Math.max.apply({}, this));
};
Array.prototype.iMin = function () {
	return this.indexOf(Math.min.apply({}, this));
};
