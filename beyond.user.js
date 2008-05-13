// ==UserScript==
// @name           Omerta Beyond
// @version        1.6.2
// @date           25-04-2008
// @author         vBm ( vbm AT omertabeyond DOT com )
// @author         Igloo ( igloo AT omertabeyond DOT com )
// @author         Dopedog ( dopedog AT omertabeyond DOT com )
// @namespace      omertabeyond.com
// @identifier     http://www.omertabeyond.com/newbeyond.user.js
// @description    Omerta Beyond 1.6.2 (The greatest addon for Omerta available!)
// @include        http://www.omertabeyond.com/*
// @include        http://barafranca.com/*
// @include        http://www.barafranca.com/*
// ==/UserScript==
//
// --------------------------------------------------------------
//   Most parts of this script is under GPL licence except those
// that we have permission to use. All 3rd party code was and will 
// be properly credited.
// --------------------------------------------------------------
//
// This script was made for our own personal use but we decided
// to make it public because of all the support we got. You are
// welcome to use this script for your own use, you may edit the
// source but make sure you tell us what you did so we can maybe
// use it ourselves, and of course give you the credit :)
//
// --------------------------------------------------------------
//
// We would like to thank to all our users and to all who reported
// bugs and gave ideas for future releases.
//
// ---------------------------------------------------------------

var ScriptName = 'Omerta Beyond';
var ScriptVersion = '1.6.2';

GM_registerMenuCommand(ScriptName + ' v' + ScriptVersion, function(){ alert('Your version of ' + ScriptName + ' is ' + ScriptVersion)});


var maxbit = 23; //set the amount of preferences

function decbin(dec,max) {
	var bin = new Array();
	for(i=max; i>=0; i--) {
		if(dec >= Math.pow(2,i)) {
			dec -= Math.pow(2,i);
			bin[i] = true;
		} else {
			bin[i] = false;
		}
	}
	return bin;
}

function GetParam(name) {
	var start=location.search.indexOf("?"+name+"=");
	if (start<0) start=location.search.indexOf("&"+name+"=");
	if (start<0) return '';
	start += name.length+2;
	var end=location.search.indexOf("&",start)-1;
	if (end<0) end=location.search.length;
	var result='';
	for(var i=start;i<=end;i++) {
		var c=location.search.charAt(i);
		result=result+(c=='+'?' ':c);
	}
	return unescape(result);
}

//load integer prefs as a boolean array
var prefs = decbin(GM_getValue('prefs', 0),maxbit);
//load any GET querys
var querys = [
	'menu_faminfo',
	'menu_history',
	'menu_deaths',
	'menu_honoured',
	'menu_randomquote',
	'menu_cocaine',
	'menu_targets',
	'menu_dailyfams',
	'families',
	'colours',
	'jailint',
	'priority',
	'newsamount',
	'custombg',
	'comments',
	'bold',
	'high',
	'low',
	'colour',
	'refresh',
	'marqstyle'
];
//description for custom beyond menu
var descr = [
	"Family Info",
	"User History",
	"Deaths List",
	"Most Honoured",
	"Random Quote",
	"Cocaine Prices",
	"War Targets",
	"Fingon's Daily Famstats"
];
//links for custom beyond menu
var qlinks = [
	'http://www.omertabeyond.com/omerta.php?families',
	'http://www.omertabeyond.com/omerta.php?history',
	'http://www.omertabeyond.com/omerta.php?deaths',
	'http://www.omertabeyond.com/omerta.php?honour',
	'http://www.omertabeyond.com/omerta.php?randomquote',
	'http://www.omertabeyond.com/omerta.php?prices',
	'http://www.omertabeyond.com/targets/omerta.php',
	'http://89.149.221.178/~fingon/latestpicture.php'
];

//--------------------- here goes various helpers and global functions ------------

function xpath(query) { 
 try { return document.evaluate(query, document, null, 6, null); }
 catch(err) { err.number, "Loading failed:\r\n" + err.description }
}

function del(query) {
	var elem = xpath(query).snapshotItem(0);
	try { elem.parentNode.removeChild(elem); }
	catch(err) {}
}

function delall(query){
	var allelem = xpath(query);
	for (var i = 0; i < allelem.snapshotLength; i++ ) {
		var elem = allelem.snapshotItem(i);
		try { elem.parentNode.removeChild(elem); }
		catch(err) { }
	}
}

function getID(id)		{ return document.getElementById(id); }
function getTAG(tag)	{ return document.getElementsByTagName(tag); }
function getELNAME(name){ return document.getElementsByName(name); }
function cEL(name)		{ return document.createElement(name); }

function $X( xpath, root ) {
	var got = $x( xpath, root );
	return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
	switch (got.resultType) {
		case got.STRING_TYPE: 
			return got.stringValue;
		case got.NUMBER_TYPE:
			return got.numberValue;
		case got.BOOLEAN_TYPE:
			return got.booleanValue;
		default:
			while (next = got.iterateNext())
				result.push( next );
			return result;
	}
}

function getAncestorByTagName(el, tn){
	tn = tn.toLowerCase();
	if(el.parentNode) {
		if ( el.parentNode.nodeType == 1
			&& el.parentNode.tagName.toLowerCase() == tn
		) return el.parentNode;
		return getAncestorByTagName( el.parentNode, tn );
	}
	return null
}

var dlp = document.location.pathname;
var dls = document.location.search;
var dlh = document.location.hostname;
var lh = location.href;
var ls = location.search;

//---------------- Preference Pane ----------------
if(lh == 'http://www.omertabeyond.com/beyond/prefs.html' + ls ) {
	var x = xpath("/html/body");
	var x = x.snapshotItem(0).innerHTML;
	function go() {
		var script = document.createElement("script"); //add script to page
		script.setAttribute('type','text/javascript');
		script.setAttribute('src','http://www.omertabeyond.com/gm/color.js');
		document.getElementsByTagName("head")[0].appendChild(script);
		
		var hexs = ["00","33","66","99","CC","FF"];
		var str = 'var colors = ["';
		for(i=0;i<=5;i++){ //set up colors array
			var a = hexs[i];
			for(j=0;j<=5;j++){
				var b = hexs[j];
				for(k=0;k<=5;k++){
					var c = hexs[k];
					if(!(i==5&&j==5&&k==5)) { var str = str + b + a + c + '","'; }
					else { var str = str + b + a + c + '"];'; eval(str); }
				}
			}
		}
		
		string = '';
		string += '<script>cp.writeDiv();</script><div style="visibility: hidden; position: absolute;" id="colorPickerDiv"><table cellspacing="1" cellpadding="0" border="1"><tbody>';
		for(i=0;i<=198;i++) {
			if(Math.round(i/11)==(i/11)) { string += '<tr>'; }
			string += '<td bgcolor="#'+colors[i]+'"><font size="-3"><a style="text-decoration: none;" onmouseover="ColorPicker_highlightColor(\'#'+colors[i]+'\',window.document)" onclick="ColorPicker_pickColor(\'#'+colors[i]+'\',window.popupWindowObjects[1]);return false;" href="#"></a></font></td>'
			if(Math.round((i+1)/11)==((i+1)/11)) { string += '</tr>'; }
		}
		string += '<tr><td bgcolor="#ffffff" id="colorPickerSelectedColor" colspan="9" style="background-color: rgb(0, 0, 102);"></td><td align="center" id="colorPickerSelectedColorValue" colspan="9">FFFFFF</td></tr></tbody></table></td></tr></tbody></table></div>';

		xpath("/html/body").snapshotItem(0).innerHTML = xpath("/html/body").snapshotItem(0).innerHTML + string;
			
		var prefs = decbin(GM_getValue('prefs', 0),maxbit);
		if(ls.length > 1) {
			if(ls.indexOf("=") == -1) {
				GM_setValue('prefs', ls.substring(1)); //save integer prefs
				var prefs = decbin(GM_getValue('prefs', 0),maxbit);
			}
			for(j=0; j<querys.length; j++) if(GetParam(querys[j]) != '') GM_setValue(querys[j], GetParam(querys[j]));
		}
		var prefstr = [
			"Beyond submenu on the left",//0
			"Cocaine Prices in the marquee",//1
			"Fingon's News in the info menu",//2
			"Calculators Submenu on the left",//3
			"Jail Highlighter",//4
			"Remove 'shooting bottle' from crime page",//5
			"Click bank amount to fill in bank form",//6
			"Remove Jailbusting skill",//7
			"Disable Imageshack/Photobucket/XS images on profiles",//8
			"Bullet Form (amount will be the max. you can buy)",//9
			"Cars, crimes, bloodbank and booze/narcs form",//10
			"Change title of the Omerta page to 'Omerta (COM)'",//11
			"Refresh Crimes/Car Nick page after waiting time is over",//12
			"Return to page after wrong image code",//13
			"Remove Capo Money texts",//14
			"Add quicklinks to Statistics page",//15
			"Add fampage/profile nickreader etc",//16
			"Remove Kill Password texts",//17
			"Add Alt+Shift+U Hotkey for buying out on I_am_in_jail page",//18
			"Add detailed wealth/raceform to profiles",//19
			"Enable booze prices popup in marquee",//20
			"Add price per bullet on Obay",//21
			"Add individual delete buttons to message inbox"//22
		];
	
		var string = '';
		string = string + '<table>';
		for(i=0; i<maxbit; i++) {
			string += '<tr><td><input type=checkbox id=check' + i + ' name=check' + i + '><\/td><td>' + prefstr[i] + '<\/td><\/tr>';
		}
		string += '<\/table><input type=button value="Update Preferences" onclick=updateprefs()>';
		string += '<table width=100%><tr><td align=center class=small>Page will need to be refreshed for some options to go into effect</td></tr>';
		string += '<tr><td><hr/><table width="100%" border="0"><tbody><tr><td align="right">'; 
		string += '<input type="button" style="width: 150px; height: 16px;" value="Customize Menu" onclick="javascript:top.menu.location=\'http://www.omertabeyond.com/gm/menuprefs.htm\'"/></td>';
		string += '<td style="text-align: left; margin-left: 3px;">To edit which buttons you want in your menu</td></tr>';
		string += '<tr><td align="right"><input type="button" style="width: 150px; height: 16px;" value="Customize Hotkeys" onclick="javascript:top.menu.location=\'http://www.omertabeyond.com/gm/hotkeyprefs.htm\'"/></td>';
		string += '<td style="text-align: left; margin-left: 3px;">To edit which hotkeys you want to use with Alt+Shift+<i>"letter"</i></td>';
		string += '</tr></tbody></table></td></tr></table>';

		document.getElementById('page').innerHTML = string;
		
		for(i=0; i<maxbit; i++) document.getElementById('check' + i).checked = prefs[i];
	
		var family = GM_getValue('families', '').split(",");
		var colour = GM_getValue('colours', '').split(",");
		var priority = GM_getValue('priority', '').split(",");
		var jailint = GM_getValue('jailint', 6);

		var string = "<table style=\"width:100%;\"><tr><td>Family or Ingame</td><td>Colour</td><td>Priority</td></tr>";
		for(i=0; i<jailint; i++) {
			if(family[i] == null) family[i] = "";
			if(colour[i] == null) colour[i] = "";
			if(priority[i] == null) priority[i] = "";
			string += '<tr><td><input type=text id="family' + i + '" value="' + family[i] + '" size=30><\/td><td><input type=text id="colour' + i + '" value="' + colour[i] + '" size=7 maxlength=6><\/td><td><input type=text id="priority' + i + '" value="' + priority[i] + '" size=2 maxlength=1><\/td><\/tr>';
		}
		string += '</table><table width=100%>';
		string += '<tr><td colspan=3>Colorpicker: <input type="text" size="7" value="" id="color"/><span id="pick" onMouseover="this.style.cursor=\'pointer\'" onclick="cp2.select(document.getElementById(\'color\'),\'pick\');return false;" href="#">&nbsp;<img border="0" src="http://www.barafranca.com/static/images/game/generic/palette.gif"/></span></td></tr>';
		string += '<tr><td colspan=3><input type=button value="Add" onclick="location.href = \'?jailint=' + (parseInt(jailint)+1) + '\'"> <input type=button value="Remove" onclick="location.href = \'?jailint=' + (parseInt(jailint)-1) + '\'"></td></tr>';
		string += '<tr><td colspan=3><input type=submit value="Save" onclick="location.href = \'?families=\'';
		for(i=0; i<jailint; i++) string += " + document.getElementById('family" + i + "').value.toUpperCase() + ','";
		string += " + '&colours='";
		for(i=0; i<jailint; i++) string += " + document.getElementById('colour" + i + "').value.replace('#', '') + ','";
		string += " + '&priority='";
		for(i=0; i<jailint; i++) string += " + document.getElementById('priority" + i + "').value + ','";
		string += '"></td></tr>';
		string += '<tr><td colspan=3 class=small>Note: If someone in jail is more than one of these settings, they will be highlighted with the colour of lowest priority number</td></tr>';
		string += '<tr><td colspan=3 class=small>Note 2: The default priority number of friends list is 3 and family is 9.</td></tr>';
		string += '</table>';
	
		document.getElementById('jailprefs').innerHTML = string;
	
		var string = '<table style="width:100%">';
		if(lh == 'http://www.omertabeyond.com/beyond/prefs.html' + ls ) {
			string += '<tr><td>Number of news articles: <input type=text size=3 maxlength=2 id=newsamount value="' + GM_getValue('newsamount', '5') + '"></td></tr>';
		}
		string += '<tr><td>Number of comments per page: <input type=text size=3 maxlength=2 id=comments value="' + GM_getValue('comments', '10') + '"></td></tr>';
		string += '<tr><td>Custom background URL: <input type=text size=40 id=custombg value="' + GM_getValue('custombg', '') + '"></td></tr>';
		string += '<tr><td><input type=submit value="Save Settings" onclick="document.location.href = \'?custombg=\' + document.getElementById(\'custombg\').value + \'&newsamount=\' + document.getElementById(\'newsamount\').value + \'&comments=\' + document.getElementById(\'comments\').value"></td></tr>';
		string += '<tr><td class=small>Note: Fingon still needs to finnish the comments part of his news. Poke him until he does ;)</td></tr>';
		string += '</table>';
	
		document.getElementById('newsprefs').innerHTML = string;
	
		var str = 'document.location.href = "?bold=" + (document.getElementById("bold").checked ? "1" : "0") + "&colour=" + document.getElementById("colour").value + "&high=" + document.getElementById("high").value + "&low=" + document.getElementById("low").value';
		var string = '<table style="width:100%">';
		string += '<tr><td>Text Colour: <input type=text id=colour size=7 maxlength=6></td></tr>';
		string += '<tr><td>High Colour: <input type=text id=high size=7 maxlength=6></td></tr>';
		string += '<tr><td>Low Colour: <input type=text id=low size=7 maxlength=6></td></tr>';
		string += '<tr><td>Bold: <input type=checkbox id=bold></td></tr><hr>';
		string += "<tr><td><input type='submit' value='Save Settings' onClick='" + str +"'></td></tr>";
		string += '</table>';

		document.getElementById('marqueeprefs').innerHTML = string;
	
		document.getElementById('bold').checked = (GM_getValue('bold', '0') == '1');
		document.getElementById('colour').value = GM_getValue('colour', '');
		document.getElementById('high').value = GM_getValue('high', '');
		document.getElementById('low').value = GM_getValue('low', '');

		var string = '<table style="width:100%">';
		for(j=0; j<querys.length; j++) {
			if(querys[j].indexOf("menu_") != -1) string += '<tr><td><input type=checkbox id="' + querys[j] + '"> ' + descr[j] + '</td></tr>';
		}
		string += '<tr><td><center><input type=submit value="Save Settings" onclick="' + "document.location.href = '?";
		for(j=0; j<querys.length; j++) {
			if(querys[j].indexOf("menu_") != -1) string += querys[j] + "=' + (document.getElementById('" + querys[j] + "').checked ? '1' : '0') + '&' + '";
			else break;
		}
		string += '\'"></center>';
		string += '</td></tr></table>';
	
		document.getElementById('menuprefs').innerHTML = string;

		for(j=0; j<querys.length; j++) {
			if(querys[j].indexOf("menu_") != -1) document.getElementById(querys[j]).checked = (GM_getValue(querys[j], '0') == '1');
			else break;
		}

	}
	if(x.indexOf("404") == -1) { go(); }
}

//---------------- Cocaine Prices ----------------
if(dlp == '/marquee.php') {
	if(prefs[2]) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://omertabeyond.com/beyond/prices2.xml.php',
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'application/xml,text/xml' },
			onload: function(responseDetails) {
				var marquee = getTAG('font')[1];
				marquee.innerHTML = "";
			
				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
				
				function getPrice(drug, city) {
					return dom.getElementsByTagName(drug)[0].getElementsByTagName(city.replace(' ', ''))[0].textContent;
				}
				
				var title;
				var pb = getPrice('cocaine', 'Baltimore');
				var pc = getPrice('cocaine', 'Chicago');
				var pn = getPrice('cocaine', 'NewYork');
				var pp = getPrice('cocaine', 'Philadelphia');
				var pd = getPrice('cocaine', 'Detroit');
				var pl = getPrice('cocaine', 'LasVegas');
				var pco = getPrice('cocaine', 'Corleone');
				var ppa = getPrice('cocaine', 'Palermo');
				

				var highelem = dom.getElementsByTagName('high');
				if(highelem[0]) var high = highelem[0].textContent
				var lowelem = dom.getElementsByTagName('low');
				if(lowelem[0]) var low = lowelem[0].textContent;
				var timeelem = dom.getElementsByTagName('time');
				if(timeelem[0]) var time = timeelem[0].textContent;
				
				function ColorLow(text) {
					return '<span style="color:#' + GM_getValue('low', '00ff00') + ';">' + text + '</span>';
                }
                function ColorHigh(text) {
					return '<span style="color:#' + GM_getValue('high', 'ff0000') + ';">' + text + '</span>';
                }
        switch(low) {
					case 'Baltimore': pb = ColorLow(pb); break;
					case 'Chicago': pc = ColorLow(pc); break;
					case 'NewYork': pn = ColorLow(pn); break;
					case 'Philadelphia': pp = ColorLow(pp); break;
					case 'Detroit': pd = ColorLow(pd); break;
					case 'LasVegas': pl = ColorLow(pl); break;
					case 'Corleone': pco = ColorLow(pco); break;
					case 'Palermo': ppa = ColorLow(ppa); break;
        }			
				switch(high) {
					case 'Baltimore': pb = ColorHigh(pb); break;
					case 'Chicago': pc = ColorHigh(pc); break;
					case 'NewYork': pn = ColorHigh(pn); break;
					case 'Philadelphia': pp = ColorHigh(pp); break;
					case 'Detroit': pd = ColorHigh(pd); break;
					case 'LasVegas': pl = ColorHigh(pl); break;
					case 'Corleone': pco = ColorHigh(pco); break;
					case 'Palermo': ppa = ColorHigh(ppa); break;
				}
				
				pb = 'Baltimore: ' + pb;
				pc = 'Chicago: ' + pc;
				pn = 'New York: ' + pn;
				pp = 'Philadelphia: ' + pp;
				pd = 'Detroit: ' + pd;
				pl = 'Las Vegas: ' + pl;
				pco = 'Corleone: ' + pco;
				ppa = 'Palermo: ' + ppa;
										
					
				function separatorSpan() {
					var separator = cEL('span');
					separator.innerHTML = ' || ';
					return separator;
				}
								
				var hoverdiv = cEL('div');
				hoverdiv.id = 'hiddenbox';
				hoverdiv.style.display = 'none';
				hoverdiv.style.position = 'absolute';
				hoverdiv.style.backgroundColor = '#000000';
				hoverdiv.style.border = 'solid white 1px';
				hoverdiv.style.fontSize = "9px";
				hoverdiv.style.top = "2px";
				hoverdiv.style.width = "500px";
				hoverdiv.style.textAlign = "center";
				marquee.appendChild(hoverdiv);
					
				function hoverlink(city, priceStr) {
					var link = cEL('a');
					link.href = "#";
					link.style.color = '#' + GM_getValue('colour', 'ffffff');
					link.style.fontSize = '10px';
					if(city == "Palermo" || city == "Corleone" || city == "Las Vegas" || city == "Detroit")
						link.addEventListener('mouseover', function(event) { hovermenu(city, event.clientX - 525) }, true);
					else
						link.addEventListener('mouseover', function(event) { hovermenu(city, event.clientX + 25) }, true);
					link.addEventListener('mouseout', function(event) { hovermenuout() }, true);
					link.innerHTML = priceStr;
					
					return link;
				}
					
				function hovermenu(city, x) {
					var hoverdiv = getID('hiddenbox');
					hoverdiv.style.display = 'inline';
					hoverdiv.style.left = x + "px";
				
					var hoverhtml = city + ' - ';
					hoverhtml += 'Morphine: ' + getPrice("morphine", city) + ' || ';
					hoverhtml += 'Heroin: ' + getPrice("heroin", city) + ' || ';
					hoverhtml += 'Opium: ' + getPrice("opium", city) + ' || ';
					hoverhtml += 'Whiskey: ' + getPrice("whiskey", city) + ' || ';
					hoverhtml += 'Amaretto: ' + getPrice("amaretto", city) + ' || ';
					hoverhtml += 'Rum: ' + getPrice("rum", city);
					
					hoverdiv.innerHTML = hoverhtml;
				}

				function hovermenuout() {
					var hoverdiv = getID('hiddenbox');
					hoverdiv.style.display = 'none';
				}

				function flytolink(city, priceStr, priceToFly, cityId) {
					var link = cEL('a');
					link.href = "#";
					link.id = city;
					link.style.color = '#' + GM_getValue('colour', 'ffffff');
					link.style.fontSize = '10px';
					link.addEventListener('click', function() { flyto(city, priceToFly, cityId) }, true);
						
					if(prefs[20]){
						if(city == "Palermo" || city == "Corleone" || city == "Las Vegas" || city == "Detroit") {
							link.addEventListener('mouseover', function(event) { hovermenu(city, event.clientX - 525); this.style.textDecoration='underline' }, true);
						}
						else {
							link.addEventListener('mouseover', function(event) { hovermenu(city, event.clientX + 25); this.style.textDecoration='underline' }, true);
						}
						link.addEventListener('mouseout', function(event) { hovermenuout(); this.style.textDecoration='none' }, true);
					}
					else {
						link.addEventListener('mouseover', function() { this.style.textDecoration='underline' }, true);
						link.addEventListener('mouseout', function() { this.style.textDecoration='none' }, true);
					}
						
					link.innerHTML = priceStr;
						
					return link;
				}
					
				function flyto(city, costs, cityid) {
					var del = confirm("Do you really want to travel to " + city + "? It will cost you $ " + costs);
					if (del == true) {
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://' + location.hostname + '/travel.php',
							onload: function(responseDetails) {
								if(responseDetails.responseText.match("<script ") != null) {
									
									GM_xmlhttpRequest({
										method: 'GET',
										url: 'http://' + location.hostname + '/travel.php?whereto=' + cityid,
										onload: function(responseDetails) {
											try { alert(responseDetails.responseText.slice((responseDetails.responseText.indexOf('</head>'))+7).replace("<h4>","").replace("/","").replace("		", "").replace("\n", "").replace("\r", "")); } 
											catch(e) { alert("Error while traveling to "+ city + "..."); }
										}
									});
								} else {
									alert(responseDetails.responseText.substr(responseDetails.responseText.indexOf('</head>') + 7).replace("		", "").replace("\n", "").replace("\r", ""));
								}
							}
						});
					}
				}
					
				var span = cEL('span');
					
				var priceandtime = cEL('span');
					
				span.appendChild(priceandtime);
				span.appendChild(flytolink('Chicago', pc, 500, '1'));
				span.appendChild(separatorSpan());
				span.appendChild(flytolink('Baltimore', pb, 500, '6'));
				span.appendChild(separatorSpan());
				span.appendChild(flytolink('New York', pn, 500, '3'));
				span.appendChild(separatorSpan());
				span.appendChild(flytolink('Philadelphia', pp, 500, '5'));
				span.appendChild(separatorSpan());
				span.appendChild(flytolink('Detroit', pd, 500, 'nul'));
				span.appendChild(separatorSpan());
				span.appendChild(flytolink('Las Vegas', pl, 500, '4'));
				span.appendChild(separatorSpan());
				span.appendChild(flytolink('Corleone', pco, 500, '7'));
				span.appendChild(separatorSpan());
				span.appendChild(flytolink('Palermo', ppa, 500, '2'));
				span.appendChild(separatorSpan());
					
				var link = cEL('a');
				link.href = "http://www.omertabeyond.com/omerta.php?prices";
				link.target = 'main';
				link.innerHTML = 'All Prices';
				if(GM_getValue('bold', '0') == '1') link.style.fontWeight = 'bold';
				link.style.color = '#' + GM_getValue('colour', 'ffffff');
				link.style.fontSize = '10px';
				link.addEventListener('mouseover', function() { this.style.textDecoration='underline' }, true);
				link.addEventListener('mouseout', function() { this.style.textDecoration='none' }, true);
				span.appendChild(link);
				priceandtime.innerHTML = 'Cocaine Prices at: ' + time + ' || ';

				if(GM_getValue('bold', '0') == '1') span.style.fontWeight = 'bold';
				span.style.color = '#' + GM_getValue('colour', 'ffffff');
				span.style.fontSize = '10px';
				marquee.appendChild(span);
			
				var refresh = 120 * 1000;
				window.onload = setTimeout("window.location.reload()", refresh);
			}
		});
	}
}

//---------------- Menu and submenus ----------------
if(dlp == '/menu.php') {
 document.body.innerHTML = document.body.innerHTML.replace('allusers.php', 'allusers.php?start=0&order=lastrank&sort=DESC');
}

//---------------- Status page ----------------
if(dlp == '/information.php') {
	if(prefs[7]) { //if remove Jailbusting Skill is on
		del("/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[6]");
	}
	if(prefs[14]) { //if remove Capo Money is on
		var result = document.evaluate("/html/body/center/table/tbody/tr/td/table/tbody/tr[5]/td[2]", document, null, 7, null);
		var capo = result.snapshotItem(0).innerHTML;
		result.snapshotItem(0).innerHTML = capo.slice(0,capo.indexOf(" ("));
	}
  // stalk yourself
	var myNameXpath = "/html/body/center/table/tbody/tr/td/table/tbody/tr[3]/td[2]";
	$X(myNameXpath).innerHTML = "<a href=user.php?nick=" + $X(myNameXpath).textContent.toLowerCase() + ">"+ $X(myNameXpath).textContent +"</a>";
	// get name from testament
	var testamentXpath = "/html/body/center/table/tbody/tr/td/table/tbody/tr[12]/td[2]";
	$X(testamentXpath).innerHTML = "<a href=user.php?nick=" + $X(testamentXpath).textContent.toLowerCase().split("\t")[1] + ">"+ $X(testamentXpath).textContent.split("\t")[1] +"</a>";
  // add link for translation interface
  var tcXPath = "/html/body/center/table/tbody/tr/td/table/tbody/tr[6]/td[2]";
   if( /\bTranslation\b/.test($X(tcXPath).textContent) ) {
       $X(tcXPath).innerHTML = "<a href=http://dev.barafranca.com/translate/ target=_blank>"+ $X(tcXPath).textContent +"</a>";
   }
}

//------------------- Crew stats ------------------
if(dlp == '/crewstats.php') {
	del("/html/body/center/h3");
	del("/html/body/center/table");
	del("/html/body/center/table");
	del("/html/body/center/table");
	del("/html/body/center/br");
	del("/html/body/center/br");
	del("/html/body/center/table[2]");
	del("/html/body/center/br");
	del("/html/body/center/br");
      
	var uptimeXpath = "/html/body/center/table[4]/tbody/tr[5]/td[2]";
	var getUptime = $X(uptimeXpath).textContent;
  
	var t = parseInt(getUptime);
	var days = parseInt(t/86400);
	t = t-(days*86400);
	var hours = parseInt(t/3600);
	t = t-(hours*3600);
	var minutes = parseInt(t/60);
	t = t-(minutes*60);
	var content = "";
	if(days)content+=days+" Days";
	if(hours||days){ if(content)content+=", "; content+=hours+" Hours"; }
	if(content)content+=", "; content+=minutes+" Mins";
	$X(uptimeXpath).textContent = content;
}

//--------------- Bullet form --------------
if(dlp == '/bullets2.php'){
	if(prefs[9]) { //If auto fill form is on
		var x = xpath("/html/body");
		var x = x.snapshotItem(0).innerHTML;
		if (x.search(/table/i) != -1) {
			var xpath = "//html/body/center/table/tbody/tr[3]/td";
		  var results = document.evaluate(xpath, document, null, 7, null);
			var td = results.snapshotItem(0).innerHTML; 
		
			var str = td.slice(td.search("pocket"));
			var sp1 = str.search("buy") + 4;
			var sp2 = str.search("bullets") - 1;
			var str = str.slice(sp1,sp2);
		
			if( str >= 400) { 
          getTAG('input')[0].value = 400;
          getELNAME('ver_sys')[0].focus();
      }
			else { 
          getTAG('input')[0].value = str;
          getTAG('input')[1].focus(); 
      }	
		
			var xpath = "//html/body/center[2]/table/tbody/tr[3]/td";
		  var results = document.evaluate(xpath, document, null, 7, null);
			var td = results.snapshotItem(0).innerHTML; 
		
			var str = td.slice(td.search("pocket"));
			var sp1 = str.search("buy") + 4;
			var sp2 = str.search("bullets") - 1;
			var str = str.slice(sp1,sp2);
			if( str >= 400) { getTAG('input')[4].value = 400; }
			else { getTAG('input')[4].value = str; }

			window.addEventListener("load", function() { 
          getTAG('input')[1].focus();
			 }, true); 
		}
	}
}

//---------------- heist ---------------
if(dlp + dls == '/BeO/webroot/index.php?module=Heist2'){
    getTAG('input')[1].value = '50';
}

//---------------- Fingons News ----------------
if(dlp == '/info.php') {
	if(prefs[2]) { //If Fingon's News menu preference is on
		var menu = getTAG("link")[0].href;
		var url = 'http://89.149.221.178/~fingon/beyond-news.php?num=' + GM_getValue('newsamount', 5) + '&version=5&css='+ menu +'&url=' + location.hostname;
		if(GM_getValue('custombg', '') != '') url += '&pron=' + GM_getValue('custombg');
		location.href = url;
	}
}

//---------------- Jail Highlighter and Jail autoform ----------------
if(dlp == '/jail.php') {
	var x = document.evaluate("/html/body", document, null, 7, null);
	var x = x.snapshotItem(0).innerHTML;
	if (x.search(/table/i) != -1) {
		if(prefs[4]) { //If Jail highlighter preference is on
			var words = GM_getValue('families', '').split(",");
			var bgColors = GM_getValue('colours', '').split(",");
			var priority = GM_getValue('priority', '').split(",");
			var thispri = new Array();
			var flag = 1;
			for(var p = 9; p >= 0; p--) {
				for (var i = 0; i < words.length; i++) {
					if(priority[i] != p) continue;
					var xpath = "//tr[contains(translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'" + words[i] + "')]";
					var results = document.evaluate(xpath, document, null, 7, null);
					for ( var j=results.snapshotLength-1 ; j >=0 ; j-- ) {
						//if the guy is a friend
						if(results.snapshotItem(j).bgColor == 'yellow') {
							if(priority[i] > 3) continue;
							else {
								results.snapshotItem(j).childNodes[9].childNodes[0].checked = true;
								flag = 0;
							}
						}
						else if(bgColors[i].length > 0) {
							results.snapshotItem(j).style.backgroundColor = '#' + bgColors[i];
							results.snapshotItem(j).childNodes[9].childNodes[0].checked = true;
							flag = 0;
						}
					}
				}
			}
		}
		if(flag==1) {
		var radios = $x('//input[@type="radio"]');
		radio = radios[Math.floor(radios.length*Math.random())]; 
		radio.checked = true;
		}
		if(getTAG('input')[0] != null) getTAG('input')[0].focus();
	}
}
// In jail type box focus
if(dlp == '/iminjail.php') {
	if(getTAG('input')[0] != null) { getTAG('input')[0].focus(); }
	var x = document.evaluate("/html/body", document, null, 7, null);
	var x = x.snapshotItem(0).innerHTML;
	if(prefs[18]) { if(x.indexOf("<img") != -1) { xpath("/html/body/table/tbody/tr/td/a").snapshotItem(0).accessKey = 'u'; } } //buy out hotkey
}

//------------------ Msg thingie -----------------
if(dlp == '/messages.php' && (dls == '' || dls.indexOf('action=delete') !=-1)) {
 if(prefs[22]) {
	var xpath = '/html/body/center/form[2]/table[2]/tbody';
	var result = document.evaluate(xpath, document, null, 7, null);
	var trs = result.snapshotItem(0).getElementsByTagName('tr').length;
	for(i=3;i<(trs+1);i=i+2) {
		var xpath = '/html/body/center/form[2]/table[2]/tbody/tr[' + i + ']';
		var result = document.evaluate(xpath, document, null, 7, null);
		var content = result.snapshotItem(0).innerHTML;
		var href = content.slice(content.indexOf('"m'));
		var href = href.slice(0,href.indexOf('">'));
		var id = href.slice(href.indexOf('g=')+2);
		if(i!=3) {
			result = document.evaluate('/html/body/center/form[2]/table[2]/tbody/tr[' + i + ']/td[3]', document, null, 7, null);
			result.snapshotItem(0).innerHTML = result.snapshotItem(0).innerHTML + ' &nbsp;<a href="messages.php?action=delete&delid=' + id + '"><img width="20" height="20" border="0" alt="Delete" src="/static/images/game/messages/del.gif"/></a>';
		}
	}
 }
}

//---------------- Crime page ----------------
if(dlp + dls == '/BeO/webroot/index.php?module=Crimes') {
	var x = document.evaluate("/html/body", document, null, 7, null);
	var x = x.snapshotItem(0).innerHTML;
	if (x.search(/table/i) != -1) {
		if(prefs[5]) { //If remove shooting bottle is on
			del("//tr[3]//tr[6]");
		}
		if(prefs[10]){ //If autoforms are on
			if(getTAG('input')[6] != null) {
				if(prefs[5]){ 
                body = xpath("//html/body").snapshotItem(0).innerHTML;
                if (body.search(/Do a crime/i) != -1) {

                    function gsPATH(path) {
                      var r = document.evaluate(path, document, null, 6, null);
                      var r = r.snapshotItem(0).innerHTML;
                      return r.replace(/%| |/g,'');
                    }

                  var xpath = "//html/body/center/table/tbody/tr[3]/td/table/tbody/tr[";
                  for(i=1;i<=5;i++) { //Get percentages
                          var xpath2 = xpath + i + "]/td[3]"
                          var y = "p" + i;
                      eval(y+"= gsPATH(xpath2)")
                  }

                  var x = Math.max(p1,p2,p3,p4,p5); //Select Highest percantage
                    if (p1 == x) { getTAG('input').checked = true; }
                    if (p2 == x) { getTAG('input')[2].checked = true; }
                    if (p3 == x) { getTAG('input')[3].checked = true; }
                    if (p4 == x) { getTAG('input')[4].checked = true; }
                    if (p5 == x) { getTAG('input')[5].checked = true; }
                    window.addEventListener("load", function() { getTAG('input')[6].focus(); }, true); 
                  }
				} 
				else {
					getTAG('input')[6].checked = true;
					getTAG('input')[7].focus();
				}
			}
		}
	}
	else {
		if(prefs[12]){
			var x = x.slice(x.indexOf(":"));//slice string to just minutes
			var m = x.slice(0,x.indexOf("minutes")); 
			var m = m.slice(2,3);

			var sp1 = x.indexOf("s") + 5; //slice string to just seconds
			var sp2 = x.indexOf("s") + 2;
			var s = x.slice(sp2,sp1);
			var s = s.slice(0,2);
			var s = s.replace(/ /ig,"");

			var ms = (s - 1 + (m * 60)) * 1000; 
			setTimeout("window.location.reload()", ms);
		}
    }
}
var wrongcode = "<br><center><b>Learn to type, analphabetic!</b><br><br><a href=\"javascript:history.back()\">Click here to go back or wait a second</a></center>";
if(dlp + dls == '/BeO/webroot/index.php?module=Crimes&action=docrime' && prefs[13]) {
	var txt = $X('/html/body').innerHTML;
	if (txt.search(/The code/i) != -1) { 
		$X('/html/body').innerHTML = wrongcode;
		setTimeout("history.back()",1000);
	}
}

//----------------- Cars Page --------------------
if(dlp + dls == '/BeO/webroot/index.php?module=Cars') {
	//var x = document.evaluate("/html/body", document, null, 7, null);
	var x = $X('/html/body').innerHTML;
	if (x.search(/table/i) != -1) {
		if(prefs[10]){ //If auto select highest percentage at Car Nick is on
			body = $X('/html/body').innerHTML;
			if (body.search(/Nick a car/i) != -1) {

				function gsPATH(path) {
					var r = document.evaluate(path, document, null, 6, null);
					var r = r.snapshotItem(0).innerHTML;
					return r.replace(/%| |/g,'');
				}

				var xpath = "//html/body/center/table/tbody/tr[3]/td/form/table/tbody/tr[";
				for(i=1;i<=4;i++) { //Get percentages
					var xpath2 = xpath + i + "]/td[3]"
					var y = "p" + i;
					eval(y+"= gsPATH(xpath2)")
				}

				var x = Math.max(p1,p2,p3,p4); //Select Highest percantage
				if (p1 == x) { getTAG('input').checked = true; }
				if (p2 == x) { getTAG('input')[2].checked = true; }
				if (p3 == x) { getTAG('input')[3].checked = true; }
				if (p4 == x) { getTAG('input')[4].checked = true; }
			}
		}
		if(getTAG('input')[5] != null) { getTAG('input')[5].focus(); }
	}
	else {
		if(prefs[12]){ //If autoreload is on
			var x = x.slice(x.indexOf(":")); //slice string to just minutes
			var m = x.slice(0,x.indexOf("minutes")); 
			var m = m.slice(2,3);

			var sp1 = x.indexOf("s") + 5; //slice string to just seconds
			var sp2 = x.indexOf("s") + 2;
			var s = x.slice(sp2,sp1);
			var s = s.slice(0,2);
			var s = s.replace(/ /ig,"");

			var ms = (s - 1 + (m * 60)) * 1000; 
			setTimeout("window.location.reload()", ms);
		}
    }
}
if(dlp + dls == '/BeO/webroot/index.php?module=Cars&action=docar' && prefs[13]) {
	var xpath = "//html/body";
  var results = document.evaluate(xpath, document, null, 7, null);
	var txt = results.snapshotItem(0).innerHTML;
	if (txt.search(/The code/i) != -1) { 
		results.snapshotItem(0).innerHTML = wrongcode;
		setTimeout("history.back()",1000);
	}
}

//---------------- DC+ info bar ----------------
if(dlp == '/mid.php') {
    var healthXpath = '/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td[5]'
    var healthXpathBar = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td[6]/dl/dt'
    var ksXpath = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[3]/td[5]'
    var boXpath = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[4]/td[5]'
    $X(healthXpath).innerHTML = "<a href=bloodbank.php target=main>" + $X(healthXpath).innerHTML + "</a>";
    $X(healthXpathBar).innerHTML = "<a href=bloodbank.php target=main>" + $X(healthXpathBar).innerHTML + "</a>";
    $X(ksXpath).innerHTML = "<a href=range.php target=main>" + $X(ksXpath).innerHTML + "</a>";
    $X(boXpath).innerHTML = "<a href=jail.php target=main>" + $X(boXpath).innerHTML + "</a>";
    
    //refresh every 2 mins
    setTimeout("window.location.reload()", '60000');
}

//---------------- User Profile ---------------------
if((dlp + dls) == ('/user.php' + dls)){
	if(prefs[8]) { // if Remove ImageShack / PhotoBucket / XS links option is on
		var xpath = "//img[contains(@src, 'imageshack.us')] | //img[contains(@src, 'photobucket.com')] | //img[contains(@src, 'xs.to')]";
		var results = document.evaluate(xpath, document, null, 7, null);
		for (var i = 0; i < results.snapshotLength; i++) {
			var img = results.snapshotItem(i);
			var link = cEL('a');
			var br = cEL('br');
			link.setAttribute('href',img.getAttribute('src'));
			link.innerHTML = img.getAttribute('src');
			img.parentNode.appendChild(link);
			img.parentNode.appendChild(br);
			link.parentNode.removeChild(img);
		}
	}
	if(prefs[19]) { //if detailed w/r is on
		//Wealth
		var tr = 11;
		var x = document.evaluate("/html/body", document, null, 6, null).snapshotItem(0).innerHTML.search(/Marital status:/i);
		if (x == -1) var tr = tr-1;
		var y = document.evaluate("/html/body", document, null, 6, null).snapshotItem(0).innerHTML.search(/SMS Status/i);
		if (y == -1) var tr = tr-1;
		var z = document.evaluate("/html/body", document, null, 6, null).snapshotItem(0).innerHTML.search(/Family Buster of/i);
		if (z == -1) var tr = tr-1;
		var xpath = "/html/body/center/table/tbody/tr["+tr+"]/td[2]";
		var results = document.evaluate(xpath, document, null, 6, null);
		var wlth = results.snapshotItem(0).innerHTML;

		function setwealth(wealth) { results.snapshotItem(0).innerHTML = results.snapshotItem(0).innerHTML + wealth; }

		if(wlth.search(/straydog/i) != -1) { setwealth(" (0 - 50.000)") }
		else if(wlth.search(/poor/i) != -1) { setwealth(" (50.000 - 100.000)") }
		else if(wlth.search(/nouveau rich/i) != -1) { setwealth(" (100.000 - 500.000)") }
		else if(wlth.search(/very rich/i) != -1) { setwealth(" (1.000.000 - 5.000.000)") }
		else if(wlth.search(/too rich to be true/i) != -1) { setwealth(" (5.000.000 - 15.000.000)") }
		else if(wlth.search(/richer than god/i) != -1) { setwealth(" ( > 15.000.000)"); }
		else if(wlth.search(/rich/i) != -1) { setwealth(" (500.000 - 1.000.000)"); }
	
		//Raceform
		var xpath = "/html/body/center/table/tbody/tr["+(tr+1)+"]/td[2]";
		var rf = $X(xpath).innerHTML;

		var x = ["Rookie","Co-Driver","Driver","Advanced Driver","Master Driver","Chauffeur","Advanced Chauffeur","Master Chauffeur","Racing Driver","Race Supremo","Champion"];
		for(i=0;i<=10;i++) {
			var y = x[i];
			var i = i + 1;
			if(rf.indexOf(y) == 0) { $X(xpath).innerHTML = i + " - " + $X(xpath).innerHTML; }
			var i = i - 1;
		}
	}

	if(prefs[16]){ //if Nickreader is on
		var script = document.createElement("script"); //add script to page
		script.setAttribute('type','text/javascript');
		script.setAttribute('src','http://www.omertabeyond.com/gm/requesting.js');
		document.getElementsByTagName("head")[0].appendChild(script);

		var style = '';
		style += ".pop{position: relative;z-index:0;}";
		style += ".pop:hover{background-color:transparent;z-index:1;text-decoration:none;}";
		style += ".pop span{position:absolute;background-color:#A8A8A8;padding:5px;left:-1000px;width:250px;border:1px dashed gray;visibility:hidden;color:black;text-decoration:none;}";
		style += ".pop:hover span{visibility:visible;top:+45px;left:-20px;text-decoration:none;}";
		style += ".lol:hover {text-decoration:underline;}";
		GM_addStyle(style);

		for(j=1;j<=2;j++) {//both lines
			var xpath = "/html/body/center/table/tbody"; //get friends row
			var results = document.evaluate(xpath, document, null, 6, null);
			var trs = results.snapshotItem(0).getElementsByTagName('tr').length;
			for(i=1;i<=trs;i++) {
				var xpath = "/html/body/center/table/tbody/tr[" + i + "]/td";
				var results = document.evaluate(xpath, document, null, 6, null);
				var trcontent = results.snapshotItem(0).innerHTML;
				if (trcontent.indexOf("Friends") != -1) { tr = i; i = trs; }
			}
	
			var xpath = "/html/body/center/table/tbody/tr[" + tr + "]/td[2]/table/tbody/tr/td[" + j + "]"; //get nicks
			var results = document.evaluate(xpath, document, null, 6, null);
			var num = results.snapshotItem(0).getElementsByTagName('a').length;
			var a = results.snapshotItem(0).getElementsByTagName('a');	
			var num = num*2;
			for(i=0;i<num;i=i+2) {//add popup
				var nick = results.snapshotItem(0).getElementsByTagName('a')[i].innerHTML;
				a[i].setAttribute("class","pop");
				a[i].innerHTML = "<a class='lol'>" + a[i].innerHTML + "</a><span id='" + j + i + "'> loading..</span>";
				var str = "results.snapshotItem(0).getElementsByTagName('a')["+i+"].setAttribute(\"onMouseover\",\"makeHttpRequest('user.php?nick=" + nick + "','" + j + i + "')\")";
				eval(str);
			}
		}
	}
}

//---------------- Take all out of bank ----------------
if(dlp == '/bank.php') {
	if(prefs[6]) { //If All in/out of Bank preference is on
	var table = getTAG("table")[2];
		var td = table.getElementsByTagName("td")[2];
		
		if(td.textContent.substring(0, 3) == 'You') var o = 2; else var o = 9;
		
		var bank = td.textContent.replace(/[^0-9.]/g,'');
		td.innerHTML = '<a href="#" onclick="document.getElementsByName(\'amounttpob\')[0].value = \'' + bank +'\'; document.getElementsByTagName(\'input\')[8].checked = true;">' + td.textContent + '</a>';

		var td2 = table.getElementsByTagName("td")[o];
 		var pocket = td2.textContent.replace(/.*\$| .*/,'').replace(/[^0-9.]/g,'');
		td2.innerHTML = '<a href="#" onclick="document.getElementsByName(\'amounttpob\')[0].value = \'' + pocket +'\'; document.getElementsByTagName(\'input\')[7].checked = true;">' + td2.textContent + '</a>';
	}
}

//---------------- Garage Crusher ----------------
if(dlp == '/garage.php') {
	var rows = getTAG('tr');
	var rows = rows.length;
	
	var xpath = "/html/body/form/center/table/tbody/tr[" + rows + "]/td"//add menu
	var results = document.evaluate(xpath, document, null, 6, null);
	var string = '<td><label><input type="checkbox" checked="1" ';
	results.snapshotItem(0).innerHTML = results.snapshotItem(0).innerHTML + 
	' <br><br><hr><br>' +
	' Select if worth is <select size="1" id="X"><option value="1">under</option><option value="0">above</option></select>: $ <input type="text" value="6000" maxlength="5" size="8" id="max"/>' +
	'<table><tr>' +
	string+'id="heist">Skip Heist cars</label></td>' +
	string+'id="oc">Skip OC cars</label></td>' + 
	'</tr><tr>' +
	string+'id="truck">Skip Trucks</label></td>' +
	string+'id="moc">Skip MOC cars</label></td>' +
	'</tr><tr>' +
	string+'id="nodam">Skip 0% cars</label></td><td>&nbsp;</td>' +
	'</tr></table>' +
	' <input type="button" onclick="javascript:document.location.href = \'?max=\' + document.getElementById(\'max\').value + \'&X=\' + document.getElementById(\'X\').value + \'&truck=\' + (document.getElementById(\'truck\').checked ? \'1\' : \'0\') + \'&oc=\' + (document.getElementById(\'oc\').checked ? \'1\' : \'0\') + \'&moc=\' + (document.getElementById(\'moc\').checked ? \'1\' : \'0\') + \'&heist=\' + (document.getElementById(\'heist\').checked ? \'1\' : \'0\') + \'&nodam=\' + (document.getElementById(\'nodam\').checked ? \'1\' : \'0\');" value="Go" name="action"/>'	;

	if(ls.length > 1) {//select cars
		if(ls.indexOf('heist') != -1 || ls.indexOf('nodam') != -1 || ls.indexOf('max') != -1 || ls.indexOf('oc') != -1) {
			var max = 0;
			var truck = 0;
			var oc = 0;
			var moc = 0;
			var heist = 0;
			var nodam = 0;

			var a = 0;

			function checkcar(car) {
				switch(car) {
					case 'Hudson-Essex Super Six': hcar = 1; break;
					case 'Packard 1100 Sedan': hcar = 1; break;
					case 'Packard 740 Roadster': hcar = 1; break;
					case 'Bentley 3.5 Litre Coup�': hcar = 1; break;
					case 'Lincoln KA': hcar = 1; break;
					case 'Reo Royale 8 Convertible': hcar = 1; break;
					case 'Mercedes-Benz 320 Cabriolet': hcar = 1; break;
					case 'Bugatti Type 35': hcar = 1; break;
					case 'Duesenberg SJ': hcar = 1; break;
					case 'Bugatti Type 32 \'Tank\'': hcar = 1; break;
					case 'Alfa Romeo Spyder': hcar = 1; break;
					case 'Bugatti 57C Atalante': hcar = 1; break;
				}
				switch(car) {
					case 'Crossley Kegresse Half-Track Truck': occar = 1; break;
					case 'Rolls Royce Phantom II': occar = 1; break;
					case 'Cadillac V16 Series 452 C Fleetwood Towncar Cabriolet 193': occar = 1; break;
					case 'Alpha Romeo Sport Touring Berlinetta': occar = 1; break;
					case 'Bentley 3 Litre Vanden Plas Tourer': occar = 1; break;
					case 'Bugatti Type 50 Coupe� Profile�': occar = 1; break;
					case 'Duesenberg J Rollston Berline': occar = 1; break;
					case 'Auburn 851 SC': occar = 1; break;
					case 'Ford DeLuxe': occar = 1; break;
					case 'Auburn 852 Supercharged': var occar = 1; break;
				}
				switch(car) {
					case 'Duesenberg X Locke': moccar = 1; break;
					case 'Packard Custom': moccar = 1; break;
					case 'Dodge Thunderbolt Concept': moccar = 1; break;
				}
				switch(car) {
					case 'Crossley Kegresse Half-Track Truck': trcar = 1; break;
					case 'Packard Custom': trcar = 1; break;
					case 'Oshkosh Model A': trcar = 1; break;
				}
			}

			for(i=2;i<rows-2;i++) {
				var i=i+2;
				var y = "/html/body/form/center/table/tbody/tr[" + i + "]/td[2]/a";//get car
				var ress = document.evaluate(y, document, null, 6, null);
				var car = ress.snapshotItem(0).innerHTML;
			
				var z = "/html/body/form/center/table/tbody/tr[" + i + "]/td[3]";//get percentage damage
				var resss = document.evaluate(z, document, null, 6, null);
				var perc = resss.snapshotItem(0).innerHTML;

				var i=i-1;
			
				var perc = perc.slice(0,perc.indexOf("%"));
				var perc = parseInt(perc);

				var hcar = 0;
				var occar = 0;
				var trcar = 0;
				var moccar = 0;
				checkcar(car);

				var stop = 0; //check if car needs to be skipped
				if(GetParam('heist') == 1 && hcar == 1) var stop = 1;
				if(GetParam('oc') == 1 && occar == 1) var stop = 1;
				if(GetParam('truck') == 1 && trcar == 1) var stop = 1;
				if(GetParam('moc') == 1 && moccar == 1) var stop = 1;
				if(GetParam('nodam') == 1 && perc == 0) var stop = 1;

				if(stop == 0) {
			
					tr = getTAG('tr')[i].innerHTML //get worth
					if(tr.indexOf(")") == -1 ) tr = tr.slice(tr.indexOf("%"));
					else tr = tr.slice(tr.indexOf(")"));
					tr = tr.replace("<td>","");
					tr = tr.slice(tr.indexOf("$")+6);
					tr = tr.replace("<td>","");
					tr = tr.slice(0,tr.indexOf("<")-3);
					tr = tr.replace(",","");
					tr = parseInt(tr);
					tr = tr + 0;

					if(tr < GetParam('max') && GetParam('X') == 1) { 
						var i=i+1;
						var x = "/html/body/form/center/table/tbody/tr[" + i + "]/td[6]/input[2]";
						var res = document.evaluate(x, document, null, 6, null);
						res.snapshotItem(0).checked = true;
						var i=i-1;
					}
					if(tr > GetParam('max') && GetParam('X') == 0) { 
						var i=i+1;
						var x = "/html/body/form/center/table/tbody/tr[" + i + "]/td[6]/input[2]";
						var res = document.evaluate(x, document, null, 6, null);
						res.snapshotItem(0).checked = true;
						var i=i-1;
					}
				}
				i=i-1;
			}
		}
	}
}

//---------------- Statistics ----------------
if(dlp + dls == '/compress.php?r=statistics') {	
	if(prefs[15]) {//if add quicklinks is on
   $X('/html/body/center').innerHTML = "<table class='thinline' width='600' rules='none' cellspacing='0' cellpadding='2'><tbody><tr><td class='tableheader' align='center' colspan='4'><a href='#dfams'><b>Death Fams</b></a> - <a href='#honour'><b>Honoured</b></a> - <a href='#cdtc'><b>CDTC</b></a> - <a href='#fams'><b>Families</b></a> - <a href='#bf'><b>BF</b></a> - <a href='#book'><b>Bookie</b></a> - <a href='#roul'><b>Roullie</b></a> - <a href='#num'><b>Numbers</b></a> - <a href='#slot'><b>Slots</b></a> - <a href='#bj'><b>BJ</b></a> - <a href='#pb'><b>PB</b></a></td></tr><tr></tr><td colspan='3' bgcolor='black' height='1'></td></tr></tbody></table>" + $X('/html/body/center').innerHTML;

		var a = "/html/body/center/table[";
		var b = "]/tbody/tr/td";
		var x = new Array();
		var y = ['dfams','honour','cdtc','fams','bf','book','roul','num','slot','bj','pb'];
		for(i=0;i<=10;i++) {
			j=i+5;
			x[i]=a+j+b;
			$X(x[i]).innerHTML = "<a name='" + y[i] + "'>"  + $X(x[i]).innerHTML + "</a>";
		}
	}
}

//---------------- Append Beyond's changelog to Omerta's ----------------
if(dlp == '/changelog.php') {
		$X('/html/body').innerHTML = "<table class='thinline' width='95%' rules='none' cellspacing='0' cellpadding='2'><tbody><tr><td class='tableheader' align='center' colspan='4'><b>Omerta Beyond's Changelog</b></td></tr><tr></tr><td colspan='3' bgcolor='black' height='1'></td></tr><tr bgcolor='white'><td width='10%'><b>Version</b></td><td width='90%'><b>Change</b></td></tr><tr><td colspan='3' bgcolor='black' height='1'></td></tr></tbody></table><br><br><br>" + $X('/html/body').innerHTML;	
}

//---------------- Append Beyond's credits to Omerta's ----------------
if(dlp == '/credits.php') {
    $X('/html/body').innerHTML = "<b>Omerta Beyond's Credits</b><br><br><b>Developers:</b><br>vBm, Igloo and Dopedog<br><br><b>News:</b><br>Fingon and Sbanks<br><br><b>IRC Quotes:</b><br>Pappa\'s website, pappa-page.com<br><br><b>Hosting:</b><br>DVSoft.org<br><br>For detailed credits see <a href='http://www.omertabeyond.com/'>www.omertabeyond.com</a><br><br><br><br><hr>" + $X('/html/body').innerHTML;	
}

// ----------------- Clean up of index page -----------
if(dlp == '/' || (/\/(index|game(-login|-recover-password))\.php/.test(document.location.pathname))) {
  //remove language bar
  del("/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table");
  //remove fav/share bar
  del("/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/blockquote/table");
}

//---------------- Family page ----------------
if((dlp + dls) == ('/family.php' + dls)){
	if(prefs[16]) {
		var numtop = 1;//get num of tops
		var con = 0;
		var sot = 0;
		//var xpath = "/html/body/center/center/table/tbody";
		var result = $X('/html/body/center/center/table/tbody').innerHTML;
		if(result.indexOf("Consiglieri:") != -1) { var numtop = numtop+1; var con=1; }
		if(result.indexOf("Sottocapo:") != -1) { var numtop = numtop+1; var sot=1; }

		//add capo list
		var xpath = "/html/body/center/center/table/tbody/tr[5]/td/table/tbody";
		var result = document.evaluate(xpath, document, null, 6, null);
		var trs = result.snapshotItem(0).getElementsByTagName('tr');
		var numtr = trs.length;
		var capos = 0;
		for(i=3;i<=numtr;i=i+2) { //get # of capo rows
			var xp = "/html/body/center/center/table/tbody/tr[5]/td/table/tbody/tr["+i+"]";
			var res = document.evaluate(xp, document, null, 6, null);
			var tr = res.snapshotItem(0);
			var tds = tr.getElementsByTagName('td');
			var numtd = tds.length;
			var numtd = numtd-2;
			var rowcapos = 0;
			for(j=0;j<=numtd;j=j+2) { //get capos from collumn
				var q = tr.getElementsByTagName('td')[j].innerHTML;
				var str = "capo" + capos + "=q";
				eval(str);
				var capos = capos + 1;
				var rowcapos = rowcapos +1;
				if(rowcapos == 3) { j = numtd+1;}
			}
		}
		var capocontent = '';
		var capos=capos-1;
		var don = document.evaluate('/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[4]/td[2]', document, null, 6, null);
		var don = don.snapshotItem(0).innerHTML; 
		for(i=0;i<=capos;i++) {//assemble capo's
			var str = "capo" + i;
			if(don!=eval(str)) {//remove don from capo list
				if(i!=0) { capocontent = capocontent + ", ";}
				capocontent = capocontent + eval(str);
			}
		}
		var pos = 4 + numtop;//count for # of tops
		var xpath = "/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[" + pos + "]"; //create capo row in family info
		var result = document.evaluate(xpath, document, null, 6, null);
		var result = result.snapshotItem(0);

		var row = cEL('tr');//create capo row in family info table
		var cell_L = row.appendChild(cEL('td'));
		cell_L.textContent = 'Capo\'s:';
		cell_L.id = 'left';
		var cell_R = row.appendChild(cEL('td'));
		cell_R.textContent = "capocontent";
		cell_R.id = 'right';

		result.parentNode.insertBefore(row,result);

		getID('left').setAttribute('class','left');//append style+capo's to cells
		getID('right').setAttribute('class','right');
		getID('right').innerHTML = capocontent;
	
		//Nick Reader
		var script = document.createElement("script"); //add script to page
		script.setAttribute('type','text/javascript');
		script.setAttribute('src','http://www.omertabeyond.com/gm/requesting.js');
		document.getElementsByTagName("head")[0].appendChild(script);

		var style = '';
		style += '.pop{position: relative;z-index:0;}';
		style += '.pop:hover{background-color:transparent;z-index:1;text-decoration:none;}';
		style += '.pop span{position:absolute;background-color:#A8A8A8;padding:5px;left:-1000px;width:250px;border:1px dashed gray;visibility:hidden;color:black;text-decoration:none;}';
		style += '.pop:hover span{visibility:visible;top:+45px;left:-20px;text-decoration:none;}';
		style += '.mem:hover {text-decoration:underline;cursor:pointer;}';
		style += '.top {text-decoration:underline;cursor:pointer;}';
		style += '.top:hover {text-decoration:underline;cursor:pointer;}';
		GM_addStyle(style);

		var xpath = "/html/body/center/center/table/tbody/tr[4]/td/table/tbody/tr[3]/td"; //get nicks
		var results = document.evaluate(xpath, document, null, 6, null);
		var num = results.snapshotItem(0).getElementsByTagName('a').length;
		var a = results.snapshotItem(0).getElementsByTagName('a');
		var on = 0;//online
		var xp = "/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[";//get tops
		var topcontent = document.evaluate(xp + "4]/td[2]", document, null, 6, null).snapshotItem(0).innerHTML;
		if (con==1) {
			var topcontent = topcontent + document.evaluate(xp + "5]/td[2]", document, null, 6, null).snapshotItem(0).innerHTML;
		}
		if (sot==1 && numtop==2) {
			var topcontent = topcontent + document.evaluate(xp + "5]/td[2]", document, null, 6, null).snapshotItem(0).innerHTML;
		}
		if (sot==1 && numtop==3) {
			var topcontent = topcontent + document.evaluate(xp + "5]/td[2]", document, null, 6, null).snapshotItem(0).innerHTML;
			var topcontent = topcontent + document.evaluate(xp + "6]/td[2]", document, null, 6, null).snapshotItem(0).innerHTML;
		}
		//get object owners
		var pos = numtop + 12;//count for # of tops
		var xp = "/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[" + pos + "]/td[2]";
		var res = document.evaluate(xp, document, null, 6, null);
		var content = res.snapshotItem(0); //.innerHTML; 
		var objectcontent = "";
		if(content.innerHTML.indexOf("(") != -1) {
			objnum = content.getElementsByTagName('br').length;
			content = content.innerHTML;
			for(i=0;i<=objnum;i++){
				objectcontent = objectcontent + "<a href='user.php?nick=" + content.slice(0,content.indexOf(" (")) + "'>" + content.slice(0,content.indexOf(" (")) + "</a>";
				content = content.slice(content.indexOf(">")+1);
			}
		}

		for(i=0;i<num;i++) {//add popups
			var nick = results.snapshotItem(0).getElementsByTagName('a')[i].innerHTML;
			a[i].setAttribute("class","pop"); //check for capo/top/object
			if(capocontent.indexOf(nick) != -1) { a[i].innerHTML = "<label id='b"+i+"' class='top'>" + a[i].innerHTML + "</label><span id='" + i + "'> loading..</span>"; }
			else if(topcontent.indexOf(nick) != -1) { a[i].innerHTML = "<label id='b"+i+"' class='top'>" + a[i].innerHTML + "</label><span id='" + i + "'> loading..</span>"; }
			else if(objectcontent.indexOf(nick) != -1) { a[i].innerHTML = "<label class='mem'><i>" + a[i].innerHTML + "</i></label><span id='" + i + "'> loading..</span>"; }
			else { a[i].innerHTML = "<label class='mem'>" + a[i].innerHTML + "</label><span id='" + i + "'> loading..</span>"; }
			var str = "results.snapshotItem(0).getElementsByTagName('a')["+i+"].setAttribute(\"onMouseover\",\"makeHttpRequest('user.php?nick=" + nick + "','" + i + "')\")";
			eval(str);
			if(a[i].getAttribute("style")) { 
				var on = on +1;//save # peeps online
				if (capocontent.indexOf(nick) != -1) { //give online capo's orange color
					getID("b" + i).setAttribute("style","color: orange;");
				}
				if (topcontent.indexOf(nick) != -1) { //give online tops red color
					getID("b" + i).setAttribute("style","color: red;");
				}
			}
		}
		var xp = "/html/body/center/center/table/tbody/tr[4]/td/table/tbody/tr";
		var xpath = xp+"[2]/td";//addept membertable title
		var result = document.evaluate(xpath, document, null, 6, null);
		result.snapshotItem(0).setAttribute("colspan","2");
		var xpath = xp+"[3]/td";
		var result = document.evaluate(xpath, document, null, 6, null);
		result.snapshotItem(0).setAttribute("colspan","2");

		var xpath = xp;
		var result = document.evaluate(xpath, document, null, 6, null);
		result.snapshotItem(0).innerHTML = "<td class='title'>Members:</td><td class='title' align='right'><span><sup>(italic is objectowner) - (underlined is capo/top3) - (colored is online > blue: member | orange: capo | red: top3)</sup></span></td>";

		//add % of peeps online
		var pos = 9 + numtop;//count for # of tops
		var xpath = "/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[" + pos + "]/td[1]";
		var result = document.evaluate(xpath, document, null, 6, null);
		result.snapshotItem(0).innerHTML = "Members online:"
		var xpath = "/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[" + pos + "]/td[2]";
		var result = document.evaluate(xpath, document, null, 6, null);
		var prcnt = Math.round((on / result.snapshotItem(0).innerHTML )*100,1);
		result.snapshotItem(0).innerHTML = prcnt + "% (" + on + " / " + result.snapshotItem(0).innerHTML + ")";
	}
}

//---------------- Kill password remover ----------------
if(prefs[17]) {
	if(dlp == '/kill.php') {
		var x = $X('/html/body').innerHTML;
		if(x.indexOf("table") != -1 ) {
			del("/html/body/center/table/tbody/tr[5]");
		}
	}
	if(dlp == '/profile.php') {
		var x = $X('/html/body').innerHTML;
		if(x.indexOf("table") != -1 ) {
			del("/html/body/center/table/tbody/tr[9]");
			del("/html/body/center/table/tbody/tr[9]");
		}
	}
}

//---------------- blood autoformer -------------
if(prefs[10]) {
      if(dlp == '/information.php') { //grab missing blood amount
        var healthxpath = '/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[4]/td[2]/a/table/tbody/tr'
        var bloodTypeXpath = '/html/body/center/table/tbody/tr/td/table/tbody/tr[10]/td[2]'
        var bloodType = $X(bloodTypeXpath).textContent       
        var Health = '100' - $X(healthxpath).textContent.replace('%','')
        GM_setValue('missingHealth',Health);      
        GM_setValue('bloodType',bloodType);
      }
      if(dlp == '/bloodbank.php'){ //fill the missing blood into box
       getTAG('input')[0].value = GM_getValue('missingHealth');      
      }
}

//---------------- Compatibility crap ----------------
if(dlp == '/servers.php'){
	var getServers = "/html/body/table/tbody/tr/td/ul/font/li";
	$x(getServers)[2].innerHTML = $x(getServers)[2].innerHTML +" - Omerta Beyond Compatible";
}

//---------------- Custom Menu ----------------
if(lh == 'http://www.omertabeyond.com/gm/menuprefs.htm' + ls) {
	var menunames = ["elp","sms","game","com","crime","fam","cas","gh","oth"];
	if(ls.length>1 && ls.indexOf("game") != -1) { //update prefs
		var x = xpath("html/body");
		x.snapshotItem(0).innerHTML = "<font color='red'>Menu settings updated! Returning to normal menu..<br><br>Click <a href='javascript:history.go(-2)'>here</a> if this stays longer then 5 seconds</font>" + x.snapshotItem(0).innerHTML;
		GM_setValue('mpref',GetParam('menu'));
		for(i=0;i<=8;i++) { GM_setValue('buttonpref' + (i+1), GetParam(menunames[i])); }
		setTimeout("history.go(-2)",1500);
	}
	if(GM_getValue('mpref')) { var mpref = GM_getValue('mpref'); }
	if(mpref) { //enter current prefs to page
		var str = "[";
		for(i=1;i<=9;i++) { str += "GM_getValue('buttonpref"+i+"')"; if(i!=9) { str += ","; } }
		str += "]";
		var buttonpref = eval(str);

		//addept family menu to current fampos
		var fm = '<input onChange="uncheckAll(\'fam\',3)" checked="" type="checkbox" id="fam0"><br><input checked="" type="checkbox" id="fam1"><br><input checked="" type="checkbox" id="fam2"><br><input checked="" type="checkbox" id="fam3">';
		for(i=4;i<=buttonpref[5].length;i++){
			fm = fm + '<br><input checked="" type="checkbox" id="fam'+i+'">';
		}
		getID('fammenu1').innerHTML = fm;

		var a = '<b><font color="#FFFF00">Family</font></b>&nbsp;<a onMouseover="this.style.cursor=\'pointer\';" onclick="setPos(\'x\')">x</a><a onMouseover="this.style.cursor=\'pointer\';" onclick="setPos(\'c\')">c</a><a onMouseover="this.style.cursor=\'pointer\';" onclick="setPos(\'s\')">s</a><a onMouseover="this.style.cursor=\'pointer\';" onclick="setPos(\'co\')">c</a><a onMouseover="this.style.cursor=\'pointer\';" onclick="setPos(\'d\')">d</a><a onMouseover="this.style.cursor=\'pointer\';" onclick="setPos(\'cd\')">c</a><br>';
		if(buttonpref[5].length==4) { getID('fammenu2').innerHTML = a+'-Family page<br>-Family Forum<br>-Capo CP<br>-Leave'; }
		if(buttonpref[5].length==5) { getID('fammenu2').innerHTML = a+'-Control Panel<br>-Users/bank<br>-Family page<br>-Family Forum<br>-Leave'; }
		if(buttonpref[5].length>=7) { getID('fammenu2').innerHTML = a+'-Control Panel<br>-Manage users<br>-Control Bank<br>-Family page<br>-Family Forum<br>-Capo CP<br>-Leave'; }
		if(buttonpref[5].length==8) { getID('fammenu2').innerHTML = a+'-Control Panel<br>-Manage users<br>-Control Bank<br>-Family page<br>-Family Forum<br>-CDTC<br>-Capo CP<br>-Leave'; }

		for(k=0;k<=mpref.length-1;k++){
			if(mpref.slice(k,k+1) == "0") { getID(menunames[k]+"0").checked = false; }
			for(i=0;i<=buttonpref[k].length-1;i++) { 
				h=i+1;
				if(buttonpref[k].slice(i,h) == "0") { getID(menunames[k]+h).checked = false }
			}
		}
	}
}

//---------------- Custom Hotkeys ----------------
if(lh == 'http://www.omertabeyond.com/gm/hotkeyprefs.htm' + ls) {
	var menunames = ["elp","sms","game","com","crime","fam","cas","gh","oth"];
	if(ls.length>1 && ls.indexOf("game") != -1) {//update prefs
		var x = xpath("html/body");
		x.snapshotItem(0).innerHTML = "<font color='red'>Hotkey settings updated! Returning to normal menu..<br><br>Click <a href='javascript:history.go(-2)'>here</a> if this stays longer then 5 seconds</font>" + x.snapshotItem(0).innerHTML;
		for(i=0;i<=8;i++) { GM_setValue('keypref' + (i+1), GetParam(menunames[i])); }
		setTimeout("history.go(-2)",1500);
	}
	if(GM_getValue('keypref1')) { 
		var str = "[";
		for(i=1;i<=9;i++) { str += "GM_getValue('keypref"+i+"')"; if(i!=9) { str += ","; } }
		str += "]";
		var buttonpref = eval(str);
	}
	var str = "[";
	for(i=1;i<=9;i++) { str += "GM_getValue('buttonpref"+i+"')"; if(i!=9) { str += ","; } }
	str += "]";
	var buttons = eval(str);

	//addept family menu to current fampos
	var fm = '<br><input type="text" maxlength="1" size="1" style="text-align: center" id="fam1">&nbsp;<br><input type="text" maxlength="1" size="1" style="text-align: center" id="fam2">&nbsp;<br><input type="text" maxlength="1" size="1" style="text-align: center" id="fam3">&nbsp;';
	for(i=4;i<=buttons[5].length;i++){
		fm = fm + '<br><input type="text" maxlength="1" size="1" style="text-align: center" id="fam'+i+'">&nbsp;';
	}
	getID('fammenu1').innerHTML = fm;
	var a = '<b><font color="#FFFF00">Family</font></b>&nbsp;<a onMouseover="this.style.cursor=\'pointer\';" onclick="setPos(\'x\')">x</a><a onMouseover="this.style.cursor=\'pointer\';" onclick="setPos(\'c\')">c</a><a onMouseover="this.style.cursor=\'pointer\';" onclick="setPos(\'s\')">s</a><a onMouseover="this.style.cursor=\'pointer\';" onclick="setPos(\'co\')">c</a><a onMouseover="this.style.cursor=\'pointer\';" onclick="setPos(\'d\')">d</a><a onMouseover="this.style.cursor=\'pointer\';" onclick="setPos(\'cd\')">c</a><br>';
	if(buttons[5].length==4) { getID('fammenu2').innerHTML = a+'-Family page<br>-Family Forum<br>-Capo CP<br>-Leave'; }
	if(buttons[5].length==5) { getID('fammenu2').innerHTML = a+'-Control Panel<br>-Users/bank<br>-Family page<br>-Family Forum<br>-Leave'; }
	if(buttons[5].length==7) { getID('fammenu2').innerHTML = a+'-Control Panel<br>-Manage users<br>-Control Bank<br>-Family page<br>-Family Forum<br>-Capo CP<br>-Leave'; }
	if(buttons[5].length==8) { getID('fammenu2').innerHTML = a+'-Control Panel<br>-Manage users<br>-Control Bank<br>-Family page<br>-Family Forum<br>-CDTC<br>-Capo CP<br>-Leave'; }

	if(buttonpref) { //enter current prefs to page
		for(k=0;k<=8;k++){
			if(k==5 && buttonpref[5].length!=buttons[5].length) { return }
			else {
				for(i=0;i<=buttonpref[k].length-1;i++) { 
					h=i+1;
					if(buttonpref[k].slice(i,h) != "*") { getID(menunames[k]+h).value = buttonpref[k].slice(i,h) }
				}
			}
		}
	}
}

//---------------- Booze/Narcs ----------------
if(prefs[10]) {
	if(dlp == '/smuggling.php' && xpath('/html/body').snapshotItem(0).innerHTML.indexOf('table') != -1) {
		var bn_xp = '/html/body/center/form/table/tbody/tr[1]/td';
		var bn_res = document.evaluate(bn_xp, document, null, 7, null);
		var bn_text = bn_res.snapshotItem(0).innerHTML.split("<br>");

		var booze = parseInt(bn_text[1].replace(/[^0-9.]/g,''));
		var narcs = parseInt(bn_text[2].replace(/[^0-9.]/g,''));
	
		var carry_b = 0;
		var carry_n = 0;
		var xpb = '/html/body/center/form/table/tbody/tr[2]/td/table/tbody/tr[2]/td/table/tbody/tr[';
		var xpn = '/html/body/center/form/table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]/table/tbody/tr[';

		var b_amount = [0,0,0,0,0,0];
		var n_amount = [0,0,0,0,0,0];
		for(i=0;i<=15;i++) { 
			if(i<7) { 
				var x = i + 4;
				var result = document.evaluate(xpb+x+']/td[3]', document, null, 6, null);
				var carry_b = carry_b + parseInt(result.snapshotItem(0).innerHTML);
				b_amount[i] = parseInt(result.snapshotItem(0).innerHTML)
				getTAG('input')[i].value = b_amount[i];
				var result = document.evaluate(xpb+x+']/td', document, null, 6, null);
				result.snapshotItem(0).innerHTML = "<a href='#' accesskey='"+(i+1)+"' onClick='for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value =0;}document.getElementsByTagName(\"input\")[" + i + "].value = " + booze + ";document.getElementsByTagName(\"input\")[18].focus();'>"+(i+1)+" " + result.snapshotItem(0).innerHTML + "</a>";
			}
			if(i>8) { 
				var x = i - 5;
				var result = document.evaluate(xpn+x+']/td[3]', document, null, 6, null);
				var carry_n = carry_n + parseInt(result.snapshotItem(0).innerHTML);
				n_amount[(i-9)] = parseInt(result.snapshotItem(0).innerHTML);
				getTAG('input')[i].value = parseInt(result.snapshotItem(0).innerHTML);
				var result = document.evaluate(xpn+x+']/td', document, null, 6, null);
				result.snapshotItem(0).innerHTML = "<a href='#' onClick='for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value =0;}document.getElementsByTagName(\"input\")[" + i + "].value = " + narcs + ";document.getElementsByTagName(\"input\")[18].focus();'>" + result.snapshotItem(0).innerHTML + "</a>";
			}
		}
		var b_amounts = '';
		for(i=0;i<=6;i++) { 
			var b_amounts = b_amounts + b_amount[i]; 
			if(i!=6) var b_amounts = b_amounts + ",";
		}
		var n_amounts = '';
		for(i=0;i<=6;i++) { 
			var n_amounts = n_amounts + n_amount[i]; 
			if(i!=6) var n_amounts = n_amounts + ",";
		}
		var notempty = false;
		if(carry_n != 0) { var notempty = true; }
		var info_xp = '/html/body/center/form/table/tbody/tr/td';
		var info_res = document.evaluate(info_xp, document, null, 7, null);
		var part = info_res.snapshotItem(0).innerHTML.split("<br>");
		var str = ''
		str += "Pocket: " + part[0].slice(part[0].indexOf("$ "),part[0].indexOf(" i")) + "<br>";
		str += "Max booze: " + part[1].slice(part[1].indexOf("d ")+1,part[1].indexOf(" u")) + "<br>";
		str += "Max narcs: " + part[2].slice(part[2].indexOf("d ")+1,part[2].indexOf(" u")) + "<br><br>";
		str += part[3].replace("Current Booze/Narcotics Prices","All Prices");
		str += "<hr><a href='#' accesskey='[' onClick='for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=0;}if("+notempty+"){var n_amount = ["+n_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[(i+9)].value=n_amount[i];}}else{document.getElementsByTagName(\"input\")[12].value = "+narcs+";}document.getElementsByTagName(\"input\")[18].focus();'>Narcs ([)</a>";
		str += " - <a href='#' accesskey=']' onClick='for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value=0;}var b_amount = ["+b_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=b_amount[i];}document.getElementsByTagName(\"input\")[18].focus();'>Booze (])</a>";
		str += " - <a href='#' accesskey='=' onClick='var b_amount = ["+b_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=b_amount[i];}document.getElementsByTagName(\"input\")[12].value = "+(narcs - carry_n)+";document.getElementsByTagName(\"input\")[18].focus();'>Both (=)</a><br>";
		info_res.snapshotItem(0).innerHTML = str;
		if(carry_b==booze) getTAG('input')[7].checked = 1;
		if(carry_n==narcs) getTAG('input')[16].checked = 1;
		else if(getTAG('input')[12].value == carry_n && carry_n == 0) getTAG('input')[12].value = narcs;
		getTAG('input')[18].focus();
	}
}

//-------------- OBAY thingie ---------------
if(prefs[21] && dlp == '/obay.php' && $X('/html/body').innerHTML.indexOf('<table') != -1)
	if(dls.indexOf('specific') == -1 ) {
		if(dls.indexOf('type=11') != -1) {
			for(i=5;i<=18;i++) {
				var xpath = '/html/body/center/table[3]/tbody/tr['+i+']';
				var result = document.evaluate(xpath, document, null, 7, null);
				var bullets = parseInt(result.snapshotItem(0).getElementsByTagName('td')[1].innerHTML.replace(/[^0-9.]/g,''));
				var price = parseInt(result.snapshotItem(0).getElementsByTagName('td')[2].innerHTML.replace(/[^0-9.]/g,''));
				result.snapshotItem(0).getElementsByTagName('td')[1].innerHTML = result.snapshotItem(0).getElementsByTagName('td')[1].innerHTML + " ($ " + Math.round(price/bullets) + " each)";
			}
		}
		else {
			for(i=4;i<=18;i++) {
				var xpath = '/html/body/center/table[3]/tbody/tr['+i+']';
				var result = document.evaluate(xpath, document, null, 7, null);
				if(result.snapshotItem(0).innerHTML.indexOf("Pack of bullets") != -1) {
					var bullets = parseInt(result.snapshotItem(0).getElementsByTagName('td')[2].innerHTML.replace(/[^0-9.]/g,''));
					var price = parseInt(result.snapshotItem(0).getElementsByTagName('td')[3].innerHTML.replace(/[^0-9.]/g,''));
					result.snapshotItem(0).getElementsByTagName('td')[2].innerHTML = result.snapshotItem(0).getElementsByTagName('td')[2].innerHTML + " ($ " + Math.round(price/bullets) + " each)";
				}
			}
		}
	}
	else if($X('/html/body').innerHTML.indexOf('Pack of bullets') != -1) {
		var xpath = '/html/body/center/table/tbody/tr[3]/td[3]';
		var result = document.evaluate(xpath, document, null, 7, null);
		var price = result.snapshotItem(0).innerHTML.split("<br>")[3].replace(/[^0-9.]/g,'');
		var xpath = '/html/body/center/table/tbody/tr[4]/td';
		var result = document.evaluate(xpath, document, null, 7, null);
		var bullets = result.snapshotItem(0).innerHTML.replace(/[^0-9.]/g,'');
		result.snapshotItem(0).innerHTML = result.snapshotItem(0).innerHTML + "<br><b>$ " + Math.round(price/bullets) + " each</b>";
		getTAG('input')[2].checked = true;
		getTAG('input')[1].select();
		getTAG('input')[1].focus();
}

//---------------- Omerta Beyond Logo ----------------
	comlogo = 'data:image/png;base64,' +
    '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' +
		's/wf5AuhHd77ulQAAAAASUVORK5CYII=';

//---------------- Beyond Logo Replacer ----------------------
var comlogoxpath = "//img[contains(@src, 'logo0.gif')] | //img[contains(@src, 'omertalo.gif')]";
$x(comlogoxpath).forEach(function(node){node.src = comlogo});

//---------------- Title changer ----------------
if((dlp == '/' || dlp == '/index.php' || dlp == '/game.php') && prefs[11] && lh.indexOf('beyond') == -1) document.title = "Omerta (COM)";

//---------------- Update Notifier --------------
var GM_update = function(title, scriptName, version, updateUrl, versionUrl) {
		var title = title;
		var today = new Date();
		    today = today.getDate();
		var last = GM_getValue(title);
		var current;
		var answer;
		var updateUrl = updateUrl;
		var versionUrl = versionUrl;
		this.init = function() {
			if(last !== undefined) {
				if(today - last >= 3 || today - last <= -24) {
					GM_setValue(title, today);
					this.check();
				}
			} else {
				GM_setValue(title, today);
				this.check();
			}				
		}
		this.check = function() {
			GM_xmlhttpRequest({
				method:"GET",
				url:versionUrl,
				onreadystatechange:this.finish
			});
		}
		this.finish = function(o) {
			if(o.readyState == 4) {
				current = o.responseText;
				current = current.split(".");
				version = version.split(".");
				if(version[0] < current[0]) {
					answer = confirm("Update " + scriptName + " to version " + current.join(".") + "?");
					if(answer) {	GM_openInTab(updateUrl); }
				} else if(version[1] < current[1]) {
					answer = confirm("Update " + scriptName + " to version " + current.join(".") + "?");
					if(answer) {	GM_openInTab(updateUrl); }
				} else if(version[2] < current[2]) {
					answer = confirm("Update " + scriptName + " to version " + current.join(".") + "?");
					if(answer) {	GM_openInTab(updateUrl); }
				} else {
					alert("Beyond " + version + " is up to date")
				}
			}
		}
		//start
		this.init();
	}
GM_update('OBUpdate', 'Omerta Beyond', '1.6.1', 'http://www.omertabeyond.com/update.php', 'http://www.omertabeyond.com/version.txt');