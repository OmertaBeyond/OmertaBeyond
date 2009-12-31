// -------------------------------------------------------------------------------------
//
// This file contains helpers and useful functions for use with Project Omerta Beyond
//
// Feel free to use them, but please let us know.
//
// -------------------------------------------------------------------------------------

//vers 1.9.2.43

var dl, dlp, dls, dlh, lh, ls, db, i, arr, host, urlsearch;

function decbin(dec,max) { // deprecated function - only used for prefs transition compatibility
	var bin = [];
	for(i=max; i>=0; i--){
		if(dec >= Math.pow(2,i)){
			dec -= Math.pow(2,i);
			bin[i] = true;
		}
		else {
			bin[i] = false;
		}
	}
	return bin;
}

function prefsArray(input, len) {
	// compatibility checking
	fail = input.replace(/[01]/g,'');
	if(fail) {
		in_2 = decbin(input,len);
		input = '';
		for (i=0;i<in_2.length;i++) {
			input += (in_2[i] ? 1 : 0);
		}
		setValue('prefs',input);
	}
	var out = []; // create array for prefs
	for(i=0;i<input.length;i++){
		out[i] = (input.charAt(i)==1 ? 1 : 0);
	}
	if(out.length < len) {
		for(i=out.length;i< len;i++) {
			out[i] = 0;
		}
	}
	return out;
}

function GetPost(name) {
	var str=ls;
	if(str.indexOf('?'+name+'=')>=0) {
		return str.slice(name.length+2,str.indexOf('&'));
	}
	else if(str.indexOf('&'+name+'=')>=0) { 
		str=str.slice(str.indexOf('&'+name+'=')+name.length+2);
		if(str.indexOf('&')>=0) {
			str=str.slice(0,str.indexOf('&'));
		}
		return str;
	}
	else {
		return '';
	}
}

function GetParam(name) {
	var start=location.search.indexOf("?"+name+"=");
	if(start<0){ 
		start=location.search.indexOf("&"+name+"=");
	}
	if(start<0){
		return '';
	}
	start += name.length+2;
	var end=location.search.indexOf("&",start)-1;
	if(end<0){ 
		end=location.search.length;
	}
	var result='';
	for(I=start;I<=end;I++) {
		var c=location.search.charAt(I);
		result=result+(c=='+'?' ':c);
	}
	return unescape(result);
}

function setIcon(icon) {
	var head = window.document.getElementsByTagName("head")[0];
	var links = head.getElementsByTagName("link");
	for (I=0;I<links.length;I++) {
		if (links[I].type=="image/x-icon" && (links[I].rel=="shortcut icon" || links[I].rel=="icon") && links[I].href!=icon) {
			head.removeChild(links[I]);
		}
		else if(links[I].href==icon) {
			return;
		}
	}
	var newIcon = document.createElement("link");
	newIcon.type = "image/x-icon";
	newIcon.rel = "shortcut icon";
	newIcon.href = icon;
	return head.appendChild(newIcon);
}

function $x(xpath, root) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, 0, null), result = [];
	switch(got.resultType) {
		case got.STRING_TYPE: return got.stringValue;
		case got.NUMBER_TYPE: return got.numberValue;
		case got.BOOLEAN_TYPE: return got.booleanValue;
		default: while(next = got.iterateNext()) result.push(next);
		return result;
	}
}

function $X(xpath, root) {
	var got = $x(xpath, root);
	return got instanceof Array ? got[0] : got;
}

function $del(xpath){
	$x(xpath).forEach(
		function($n){
			$n.parentNode.removeChild($n);
		}
	);
}

function $Del(xpath){
	$X(xpath).parentNode.removeChild($X(xpath));
}

function $I(xp, val){
	if(!val) {
		return $X(xp).innerHTML;
	}
	else {
		$X(xp).innerHTML = val;
	}
}

function $i(xp, i, val){
	if(!val) {
		return $x(xp)[i].innerHTML;
	}
	else {
		$x(xp)[i].innerHTML = val;
	}
}

function replaceLast(str,fnd,rpl,glb) {
	if(str.slice(str.length-fnd.length) == fnd) {
		str = str.slice(0,str.lastIndexOf(fnd)) + (rpl?rpl:'');
	}
	if(glb && str.slice(str.length-fnd.length) == fnd) {
		str = replaceLast(str,fnd,rpl,glb);
	}
	return str;
}

function findPos(obj) {
	var curleft = 0;
	var curtop = 0;
	if(obj.offsetParent) {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
		while(obj = obj.offsetParent){
			return [curleft,curtop];
		}
	}
}

function stripHTML(string) {
	var matchTag = /<(?:.|\s)*?>/g;
	return string.replace(matchTag, "");
}

function RGBtoHex(R,G,B) {
	return toHex(R)+toHex(G)+toHex(B);
}

function toHex(N) {
	if (N===null) {
		return "00";
	}
	N=parseInt(N); 
	if (N===0 || isNaN(N)) {
		return "00";
	}
	N=Math.max(0,N); 
	N=Math.min(N,255);
	N=Math.round(N);
	return "0123456789ABCDEF".charAt((N-N%16)/16) + "0123456789ABCDEF".charAt(N%16);
}
function getID(id) {
	return document.getElementById(id);
}
function getTXT(xpath) {
	return $X(xpath).textContent;
}
function getTAG(name) {
	return document.getElementsByTagName(tag);
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
function getValue(name,standard) {
	return GM_getValue(name+lang.version,standard);
}
function setValue(name,value) {
	return GM_setValue(name+lang.version,value);
}
function setArr(num) {
	return arr[num] = "<a href=/user.php?nick=" + arr[num].match(/\w+/g)[0] + "><b>" + arr[num].match(/\w+/g)[0] +"</b></a>";
}
function find(string,Pos) {
	return Pos ? db.search(string) : string.test(db.innerHTML);
}
function getActual(el,attr) {
	return document.defaultView.getComputedStyle(el, '').getPropertyValue(attr);
}
function selectedTab() {
	return $X('//a[contains(@class, "selected")]/@href').nodeValue;
}

function toggle(name) {
	var id = document.getElementById(name);
	if(id.style.display == '') {
		id.style.display = 'block';
	}
	else if(id.style.display == 'block') {
		id.style.display = '';
	}
}

function getPow(name,i,def) {
		info = getValue(name,''+def);
		if(name=='bninfo') {
			w=2; // set width of buckets
		}
		if(name=='prefs') {
			w=1;
		}
		return 1*info.substr(i*w,w); // return int version of bucket
}

function setPow(name, i, value) {
	info = getValue(name,"0");
	if(name=='bninfo') {
		w=2;  // set width of buckets
	}
	if(name=='prefs') {
		w=1;
	}
	i = i*w; // set string index
	value+= ''; // toString
	while(value.length < w) {
		value = '0'+value; // pad with zeros
	}
	if( i>0 && (i+w)<info.length ) {
		info = info.substring(0,i) + value + info.substring(i+w); // value goes in middle
	}
	else if(i===0) {
		info = value + info.substring(w); // value goes at beginning
	}
	else if( (i+w)>=info.length ) {
		info = info.substring(0,i) + value; // value goes at end
	}
	else {
		return;
	}
	setValue(name,info); // store string
}

function refreshIn(){
	getTimeLeft = db.innerHTML.split('<br>')[1];
	getMinLeft = getTimeLeft.match(/\d+/g)[0];
	getSecLeft = getTimeLeft.match(/\d+/g)[1];
	minToSec = parseInt(getMinLeft * 60);
	totalSecLeft = parseInt(minToSec) + parseInt(getSecLeft);
	totalTime = totalSecLeft * 1000;
	addExtraSec = parseInt(totalTime + 1000);
	setTimeout(function() { window.location.reload(); }, addExtraSec);
}

function commafy(num) {
	var str = (num+"").split("."),
	dec=str[1]||"",
	num=str[0].replace(/(\d)(?=(\d{3})+\b)/g,"$1,");
	return (dec) ? num+'.'+dec : num;
}

function toUp(word){
	return word = word.slice(0,1).toUpperCase() + word.slice(1);
}

function grabHTML(url,func){
	r=0;if(window.XMLHttpRequest)r=new XMLHttpRequest();
	r.onreadystatechange=function(){if(r.readyState==4)if(r.status==200) func(r.responseText,url);};
	r.open('GET',url,true);r.send(null);
}

Array.prototype.sum = function(){ for(i=0,sum=0;i<this.length;sum+=this[i++]); return sum; }
Array.prototype.max = function(){ return Math.max.apply({},this); }
Array.prototype.min = function(){ return Math.min.apply({},this); }

Array.prototype.iMax = function(){ return this.indexOf(Math.max.apply({},this)); }
Array.prototype.iMin = function(){ return this.indexOf(Math.min.apply({},this)); }

dl = document.location;
ds = document.search;
db = document.body;
dlp = document.location.pathname;
dls = document.location.search;
dlh = document.location.hostname;
lh = location.href;
ls = dls;
host = location.hostname.toLowerCase();
urlsearch = location.pathname + location.search;
arr = [];