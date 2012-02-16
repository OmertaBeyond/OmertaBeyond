/*

This file contains helpers and useful functions for use with Project Omerta Beyond

Feel free to use them, but please let us know.

Version: 1.10.0.85

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
	var start, end, c, result;
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
		c = location.search.charAt(I);
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
		} else if (links[i].href == icon) {
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

function sec2time(sec) {
	var hr = Math.floor(sec / 3600);
	var min = (sec - (hr * 3600))/60;
	while (min.length < 2) {min = '0' + min;}
	min = (min)?min+'m':'';
	hr = (hr)?hr+'h ':'';
	return hr + min;
}
function time() {
	return Math.floor(parseInt(new Date().getTime(), 10) / 1000);
}

function timer(s, i, end, rpform) {
	var mins, sec, time;
	if(s>=60) {
		mins = Math.floor(s/60);
		sec = s-(mins*60);
	} else {
		mins = 0;
		sec = s;
	}
	time = (mins>0) ? mins+'m '+sec+'s' : sec+'s';
	$X('//*[@id="timer'+i+'"]').innerHTML = time;
	s = s-1;
	if(s>0) {
		setTimeout(function() { timer(s,i,end, rpform); }, 1000);
	} else {
		$X('//*[@id="timer'+i+'"]').innerHTML = end;
		$X('//*[@id="rpform'+i+'"]').innerHTML = rpform;
	}
}

function in_array (needle, haystack, argStrict) {
    var key = '',
        strict = !! argStrict;
    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }
    return false;
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
				if (confirm("There is a major update available for " + SCRIPT_NAME + "!\nWould you like to upgrade?\n\nInstalled:\t" + OB + "\nAvailable:\t" + obv_avail)) {
					GM_openInTab(ob_url);
				}
			} else if (SCRIPT_VERSION_MAJOR == obv_major) {
				GM_log("[Omerta Beyond Updater] Same major version ... lets check minor version");
				if (SCRIPT_VERSION_MINOR < obv_minor) {
					if (confirm("There is a minor update available for " + SCRIPT_NAME + "!\nWould you like to upgrade?\n\nInstalled:\t" + OB + "\nAvailable:\t" + obv_avail)) {
						GM_openInTab(ob_url);
					}
				} else if (SCRIPT_VERSION_MINOR == obv_minor) {
					GM_log("[Omerta Beyond Updater] Same minor version ... lets check maintenance version");
					if (SCRIPT_VERSION_MAINTENANCE < obv_maintenance) {
						if (confirm("There is a maintenance update available for " + SCRIPT_NAME + "!\nWould you like to upgrade?\n\nInstalled:\t" + OB + "\nAvailable:\t" + obv_avail)) {
							GM_openInTab(ob_url);
						}
					} else if (SCRIPT_VERSION_MAINTENANCE == obv_maintenance) {
						GM_log("[Omerta Beyond Updater] Same maintenance version ... lets check build version");
						if (SCRIPT_VERSION_BUILD < obv_build) {
							if (confirm("There is a revision update available for " + SCRIPT_NAME + "!\nWould you like to upgrade?\n\nInstalled:\t" + OB + "\nAvailable:\t" + obv_avail)) {
								GM_openInTab(ob_url);
							}
						} else if (SCRIPT_VERSION_BUILD >= obv_build && cb) {
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
	for (i = 0, sum = 0; i < this.length; sum += this[i++]);
	return sum;
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


//BMSG BETA
var _Bmsg = { //keep track of our bmsgs
	ids: [],
	amount: 0
};

function Bmsg() {}
Bmsg.prototype = {
	name: 'Bmsg',
	index: 0, //keep track of our messages

	//Handler functions
	db: document.body,
	cEL: function(name) {
		return document.createElement(name);
	},
	cDiv: function(c,h,id) {
		var d = this.cEL('div');
		if (id) {
			d.id = id;
		}
		d.className = c;
		d.innerHTML = h;
		return d;
	},
	cBut: function(h,a) {
		var b = this.cEL('button');
		b.innerHTML = h;
		b.value = a; //just here for debug purpose, cant see eventListeners in code
		b.addEventListener('click', function() {
			a();
		}, true);
		return b;
	},
	getX: function() { //get msg div horizontal position
		return this.db.clientWidth/2 - 175;
	},
	getY: function() { //get msg div vertical position
		return this.db.clientHeight/2 - 50;
	},

	//Debug function
	e: function(e) {
		console.info('Bmsg: ' + e);
		return false;
	},

	//Interface functions
	Bmsg: function(id, type, title, text, names, fns, add) { //setup initial values
		this.id = id;
		_Bmsg.ids.push(id);
		this.num = _Bmsg.amount++;
		this.type = type;
		this.title = title;
		this.text = text;
		this.block = 0; //true will force user to dismiss msg first before he can continue browsing

		if(this.type != 'info') {
			//default Ok button with failsafe function
			this.names = names || ['Ok'];
			this.fns = fns || [function(){
				var t = (getID('bm_shade') != null) ? 'bm_shade' : id;
				getID(t).parentNode.removeChild(getID(t));
			}];
		} else {
			this.names = [];
			this.fns = [];
		}
		if (add) {
			this.add();
		}
	},
	add: function() { //add msg to page
		if (this.id && this.type && this.title && this.text) {
			if (this.db.innerHTML.indexOf('id="'+this.id+'"') == -1) {
				var msg = this.cDiv('bm bm_' + this.type, '', this.id);//create msg div
				msg.appendChild(this.cDiv('bm_title', this.title));//append title div
				var cls = cEL('img');
				cls.src = 'http://dump.omertabeyond.com/dm-813057571126.png';
				cls.setAttribute('style', 'position:absolute; right:5px;cursor:pointer;');
				cls.addEventListener('click', function() {
					var hider = setInterval(function(){
						msg.style.bottom = parseInt(msg.style.bottom) - 10;
						if(parseInt(msg.style.bottom) < ((Math.ceil(l/10)*10+80)*-1)) {
							clearInterval(hider);
							var t = this.parentNode.parentNode.id;
							//var t = (getID('bm_shade') != null) ? 'bm_shade' : id;
							getID(t).parentNode.removeChild(getID(t));
						}
					},20);
				}, false);
				msg.getElementsByTagName('div')[0].appendChild(cls);




				if(this.type == 'tip') { //decide msg position depending on type
					msg.style.left = this.getX() + 'px';
					msg.style.top = this.getY() + 'px'; //hmmmmmmm
				} else if (this.type == 'warn') {
					msg.style.left = this.getX() + 'px';
					msg.style.top = this.getY() + 'px';
				} else { //default for now, options will follow
					msg.style.bottom = '-9999px';
					msg.style.right = '10px';

				}


				var cont = this.cDiv('bm_body', this.text + '');//append content div
				if(this.icon) { //set custom icon
					cont.setAttribute('style','background:url(\''+this.icon+'\') 28px 28px no-repeat !important;');
				}
				if(this.names.length > 0) {
					if (this.names.length == this.fns.length) {
						var buttons = this.cDiv('bm_buttons','');
						for (var i=this.names.length-1; i>=0; i--) {
							if (typeof this.fns[i] == 'function') {
								buttons.appendChild(this.cBut(this.names[i], this.fns[i]));
							} else {
								this.e('[add] - Action ' + (i+1) + ' is not a function! \n\n' + this.fns + '');
								return false;
							}
						}
						cont.appendChild(buttons);
					} else {
						this.e('[add] - The amount of options is not the same as the amount of actions!\n\n' + this.names + ' <-> ' + this.fns);
						return false;
					}
				}
				msg.appendChild(cont);

				if (this.block) { //check if we are blocking => append msg to shade div
					this.db.appendChild(this.cDiv('bm_shade', '', 'bm_shade'));
				}
				if (this.fading) {
					msg.setAttribute('style', msg.getAttribute('style') + 'opacity:.01;');
					this.db.appendChild(msg);
					this.fade(1);
				} else {
					this.db.appendChild(msg);
					var l = msg.clientHeight;


				// it's in there now, leave the tedious if/else's for now and go for manual sliding!
					msg.style.right = '10px';
					msg.style.bottom = '-'+(Math.ceil(l/10)*10+80);


					msg.addEventListener('mouseover', function(e) { console.log(this.setAttribute('mouse','on')); }, false);

					var slider = setInterval(function(){
						msg.style.bottom = parseInt(msg.style.bottom) + 10;
						if(parseInt(msg.style.bottom) > 5) {
							clearInterval(slider);


							function hideNslide() {
								var hider = setInterval(function(){
									msg.style.bottom = parseInt(msg.style.bottom) - 10;
									if(parseInt(msg.style.bottom) < ((Math.ceil(l/10)*10+80)*-1)) {
										clearInterval(hider);
										$Del('//div[@id="' + msg.id + '"]');
									}
								},20);
							}
							// add selfdestruct aswell
							setTimeout(function(){
									if(msg.getAttribute('mouse') != 'on') {
										hideNslide(msg);
									} else {
										msg.addEventListener('mouseout', function(){
											setTimeout(function(){hideNslide(msg);}, 300);
										}, false);
									}
							}, 2500);
						}
					},40);
				}
			} else {
				this.e('[add] - There already seems to be an element with this id!\n\nid: ' + this.id);
				return false;
			}
		} else {
			this.e('[add] - Missing initial message variable(s)!');
			return false;
		}
	},
	slide: function(down) {
		if ($X('//div[@id="' + this.id + '"]')) {
			var el = $X('//div[@id="' + this.id + '"]');
			var top = el.style.top;
			var bottom = el.style.bottom;
			var left = el.style.left;
			var right = el.style.bottom;

			if (i == 1) { //change the effects to apply to shade div
				el = shade;
				style = '';
			}
			if (down) {
				el.setAttribute('style', style + 'opacity: .15;');
				var fade = setInterval(function() {
					el.setAttribute('style', style + 'opacity:' + ((getActual(el, 'opacity')*1)+0.15) + ';');
				}, 25);
				setTimeout(function() {
					clearInterval(fade);
					if(el.id == 'bm_shade') {
						el.setAttribute('style', 'opacity:.85;');
					}
				}, 250);
			} else {
				el.setAttribute('style', 'opacity: .90;'+style);
				var fade = setInterval(function() {
					el.setAttribute('style', style + 'opacity:' + (getActual(el, 'opacity')-0.15) + ';');
				}, 25);
				setTimeout(function() {
					clearInterval(fade);
					if (b != null) { //if a boolean set, save it into the object
						this.bool = b;
					}
					if (el.id == 'bm_shade') {
						$Del('//div[@id="bm_shade"]');
					}
					$Del('//div[@id="' + el.id + '"]'); //remove either the shade div or the msg div
				}, 250);
			}
		} else {
			this.e('[slide] - There is no element with ID: ' + this.id);
		}
	},
	fade: function(appear) {
		if ($X('//div[@id="' + this.id + '"]')) {
			var shade = getID('bm_shade');
			var el = $X('//div[@id="' + this.id + '"]');
			var style = el.getAttribute('style');
			style = style.split(' opacity')[0];
			console.log(style);
			var loop = shade?1:0;
			for (var i=0; i<=loop; i++) {
				if (i == 1) { //change the effects to apply to shade div
					el = shade;
					style = '';
				}
				if (appear) {
					console.log('fade in');
					el.setAttribute('style', style + 'opacity: .15;');
					for (i=1; i<6; i++) {
						setTimeout(function() {
							var opac = ((getActual(el, 'opacity')*1)+0.15);
							opac = ''+(opac>0.95?0.95:opac);
							el.setAttribute('style', style + 'opacity:' + opac + ';');
						}, 25*i);
					}
				} else {
					console.log('fade out');
					el.setAttribute('style', 'opacity: .90;'+style);
					for (i=1; i<6; i++) {
						setTimeout(function() {
							el.setAttribute('style', style + 'opacity:' + (getActual(el, 'opacity')-0.15) + ';');
						}, 25*i);
						if (i == 5) {
							if (b != null) { //if a boolean set, save it into the object
								this.bool = b;
							}
							if (el.id == 'bm_shade') {
								$Del('//div[@id="bm_shade"]');
							}
							$Del('//div[@id="' + el.id + '"]'); //remove either the shade div or the msg div
						}
					}
				}
			}
		} else {
			this.e('[fade] - There is no element with ID: ' + this.id);
		}
	},


	//setting functions
	set: function() { //set multiple parameters for the message
		for (var i = 0; i < arguments.length; i = i + 2) {
			if (arguments[i + 1]) {
				this[arguments[i]] = arguments[i + 1];
			}
		}
	},
	setRef: function(e) { //set a reference element for "tip" messages
		this.ref = e;
	},
	setNames: function(a) { //set button names
		this.names = a;
	},
	setFns: function(a) { //set button functions
		this.fns = a;
	},
	setType: function(t) { //set message type
		this.type = t;
	},
	setBlock: function(b) { //define if message should block the page
		this.block = b;
	},
	setFade: function(b) { //define if message should block the page
		this.fading = b;
	},
	setIcon: function(u) { //define icon url
		this.icon = u;
	},
	close: function(b) { //close the message
		if (getID(this.id) != null && this.db.innerHTML.indexOf('class="bm') != -1) { //make sure there is something to remove
			console.log(999);
			if (this.fading) {
				this.fade(0);
			} else {
				if (b != null) { //if a boolean set, save it into the object
					this.bool = b;
				}
				$Del(this.block ? '//div[@id="bm_shade"]' : '//div[@id="' + this.id + '"]'); //remove either the shade div or the msg div
			}
		} else {
			this.e('[close] - Could not find the given message!\n\n Message id:' + this.id);
			return false;
		}
	}
};
