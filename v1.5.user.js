// ==UserScript==
// @name           Omerta Beyond
// @version        1.5
// @date           2008-01-01
// @author         vBm ( vbm AT vbmcrew DOT org )
// @author         Igloo ( igloo AT igbots DOT com )
// @author         Eagle ( eaglesearcher AT gmail DOT com )
// @namespace      http://omertabeyond.com/beyond/
// @identifier     http://omertabeyond.com/beyond/beyond.user.js
// @description    Omerta Beyond 1.5 (The greatest addon for Omerta available!)
// @include        http://omertabeyond.com/beyond/*
// @include        http://www*.barafranca.com/*
// @include        http://barafranca.com/*
// ==/UserScript==
//
// --------------------------------------------------------------
// This script was made for our own personal use but we decided
// to make it public because of all the support we got. You are
// welcome to use this script for your own use, you may edit the
// source but make sure you tell us what you did so we can maybe
// use it ourselves, and of course give you the credit :)
// --------------------------------------------------------------
// We would like to thank to all our users and to all who reported
// bugs and gave ideas for future releases.
// We also want to thank:
//   Our beta test team: Mesmendon, Viva and Dareios
//   Cocaine Prices: The #booze/narcs community and ReBorN
//   News: Fingon and Sbanks
//   IRC Quotes: Pappa's website, pappa-page.com
//   Hosting: DVSoft.org
// ---------------------------------------------------------------

var maxbit = 13; //set the amount of preferences

function decbin(dec) {
	var bin = new Array();
	for(i=maxbit; i>=0; i--) {
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
var prefs = decbin(GM_getValue('prefs', 0));
//load any GET querys
var querys = ['menu_faminfo','menu_history','menu_deaths','menu_honoured','menu_randomquote','menu_cocaine','menu_targets','menu_dailyfams','families','colours','jailint','priority','newsamount','custombg','comments','bold','high','low','colour','refresh'];
var descr = ["Family Info","User History","Deaths List","Most Honoured","Random Quote","Cocaine Prices","War Targets","Fingon's Daily Famstats"]; //description for custom beyond menu
var qlinks = ['http://omertabeyond.com/omerta.php?families','http://omertabeyond.com/omerta.php?history','http://omertabeyond.com/omerta.php?deaths','http://omertabeyond.com/omerta.php?honour','http://omertabeyond.com/omerta.php?randomquote','http://omertabeyond.com/omerta.php?prices','http://omertabeyond.com/targets/omerta.php','http://89.149.221.178/~fingon/latestpicture.php']; //links for custom beyond menu

function xpath(query) {
  return document.evaluate(query, document, null, 6, null);
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
		   catch(err) {}
     }
}

function getID(id) {
  return document.getElementById(id);
}

function getTAG(tag) {
  return document.getElementsByTagName(tag);
}

function getELNAME(name){
	return document.getElementsByName(name);
}

function cEL(name){
	return document.createElement(name);
}

var dlp = document.location.pathname;
var dls = document.location.search;
var lh = location.href;
var ls = location.search;

//---------------- Preference Pane ----------------
if(lh == 'http://omertabeyond.com/beyond/prefs.html' + ls) {
	if(ls.length > 1) {
		if(ls.indexOf("=") == -1) {
			GM_setValue('prefs', ls.substring(1)); //save integer prefs
			var prefs = decbin(GM_getValue('prefs', 0));
		}
		for(j=0; j<querys.length; j++) if(GetParam(querys[j]) != '') GM_setValue(querys[j], GetParam(querys[j]));
	}

	var prefstr = [
		"Clean useless menus",
		"Beyond submenu on the left",
		"Cocaine Prices in the marquee",
		"Fingon's News in the info menu",
		"Calculators Submenu on the left",
		"Jail Highlighter",
		"Remove 'shooting bottle' from crime page",
		"Click bank amount to fill in bank form",
		"Remove Jailbusting skill",
		"Disable Imageshack/Photobucket/XS images on profiles",
		"Bullet Form (amount will be 400)",
		"Cars, crimes and booze/narcs form",
		"Hotkeys for Crimes, Cars Booze/narcs and Jail (Alt + Shift + C, V, B, N, J)",
	];
	
	var string = '';
	string = string + '<table>';
	for(i=0; i<maxbit; i++) {
		string += '<tr><td><input type=checkbox id=check' + i + ' name=check' + i + '><\/td><td>' + prefstr[i] + '<\/td><\/tr>';
	}
	string += '<\/table><input type=button value="Update Preferences" onclick=updateprefs()>';
	
	string += '<table width=100%><td align=center class=small>Page will need to be refreshed for some options to go into effect</td></table>'

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
	string += '<tr><td colspan=3><input type=button value="Add" onclick="location.href = \'?jailint=' + (parseInt(jailint)+1) + '\'"><input type=button value="Remove" onclick="location.href = \'?jailint=' + (parseInt(jailint)-1) + '\'"></td></tr>';
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
	
	var string = '<table style="width:100%">'
	string += '<tr><td>Number of news articles: <input type=text size=3 maxlength=2 id=newsamount value="' + GM_getValue('newsamount', '5') + '"></td></tr>';
	string += '<tr><td>Number of comments per page: <input type=text size=3 maxlength=2 id=comments value="' + GM_getValue('comments', '10') + '"></td></tr>';
	string += '<tr><td>Custom background URL: <input type=text size=40 id=custombg value="' + GM_getValue('custombg', '') + '"></td></tr>';
	string += '<tr><td><input type=submit value="Save Settings" onclick="document.location.href = \'?custombg=\' + document.getElementById(\'custombg\').value + \'&newsamount=\' + document.getElementById(\'newsamount\').value + \'&comments=\' + document.getElementById(\'comments\').value"></td></tr>';
	string += '<tr><td class=small>Note: Fingon still needs to finnish the comments part of his news. Poke him until he does ;)</td></tr>';
	string += '</table>';
	
	document.getElementById('newsprefs').innerHTML = string;
	
	var string = '<table style="width:100%">';
	string += '<tr><td>Text Colour: <input type=text id=colour size=7 maxlength=6></td></tr>';
	string += '<tr><td>High Colour: <input type=text id=high size=7 maxlength=6></td></tr>';
	string += '<tr><td>Low Colour: <input type=text id=low size=7 maxlength=6></td></tr>';
	string += '<tr><td>Refresh: <input type=number id=refresh size=7> s</td></tr>';
	string += '<tr><td>Bold: <input type=checkbox id=bold></td></tr>';
	string += '<tr><td><input type=submit value="Save Settings" onclick="' + "document.location.href = '?bold=' + (document.getElementById('bold').checked ? '1' : '0') + '&colour=' + document.getElementById('colour').value + '&high=' + document.getElementById('high').value + '&low=' + document.getElementById('low').value + '&refresh=' + document.getElementById('refresh').value" + '"></td></tr>';
	string += '</table>';
	
	document.getElementById('marqueeprefs').innerHTML = string;
	
	document.getElementById('bold').checked = (GM_getValue('bold', '0') == '1');
	document.getElementById('refresh').value = GM_getValue('refresh', '120');
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

//---------------- Cocaine Prices ----------------
if(dlp == '/marquee.php') {
	if(prefs[2]) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://omertabeyond.com/beyond/prices.xml.php',
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'application/xml,text/xml' },
			onload: function(responseDetails) {
				var marquee = getTAG('font')[1];
				marquee.innerHTML = "";
			
				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		
				var entries = dom.getElementsByTagName('cocaine');
				var title;
				var pb = entries[0].getElementsByTagName('Baltimore')[0].textContent;
				var pc = entries[0].getElementsByTagName('Chicago')[0].textContent;
				var pn = entries[0].getElementsByTagName('NewYork')[0].textContent;
				var pp = entries[0].getElementsByTagName('Philadelphia')[0].textContent;
				var pd = entries[0].getElementsByTagName('Detroit')[0].textContent;
				var pl = entries[0].getElementsByTagName('LasVegas')[0].textContent;
				var pco = entries[0].getElementsByTagName('Corleone')[0].textContent;
				var ppa = entries[0].getElementsByTagName('Palermo')[0].textContent;
				

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
				
				var string = 'Cocaine Prices at: ' + time + ' || Chicago:' + ' ' + pc + ' || Baltimore:' + ' ' + pb + ' || New York:' + ' ' + pn + ' || Philadelphia:' + ' ' + pp + ' || Detroit:' + ' ' + pd + ' || Las Vegas:' + ' ' + pl + ' || Corleone:' + ' ' + pco + ' || Palermo:' + ' ' + ppa + ' ||';
				
				var link = cEL('a');
				link.href = "http://omertabeyond.com/omerta.php?prices";
				link.target = 'main';
				link.innerHTML = string;
				if(GM_getValue('bold', '0') == '1') link.style.fontWeight = 'bold';
				link.style.color = '#' + GM_getValue('colour', 'ffffff');
				link.style.fontSize = '10px';
				marquee.appendChild(link);
				
				var refresh = GM_getValue('refresh', 120) * 1000;
				window.onload = setTimeout("window.location.reload()", refresh);
			}
		});
	}
}

//---------------- Menu and submenus ----------------
if(dlp == '/menu.php') {
	//Declare menu functions
	function CreateRow(link, text, bold) {
		var tr = cEL("tr");
		a = tr.appendChild(cEL("td")).appendChild(cEL("a"))
		a.target = "main";
		a.href = link;
		a.textContent = text;
		if(bold) {
			a.style.fontWeight = 'bold';
			a.style.color = 'white';
		}
		return tr;
	}

	function CreateTitle(linkTitle, linkId) {
		with(table = cEL("table")) {
			border = "0";
			cellPadding = "0";
			cellSpacing = "0";
			width = "100%";
		}
		
		var td = table.appendChild(cEL("tr")).appendChild(cEL("td"));
		with(td.appendChild(cEL("a"))) {
			style.color = "yellow";
			style.fontWeight = "bold";
			id = "x" + linkId;
			href = "javascript:Toggle('" + linkId + "');";
			textContent = linkTitle;
		}
		return table;
	}
	
	function CreateMenu(divId) {
		var menu = cEL("div");
		menu.id = divId;
		with(menu.appendChild(cEL("table"))) {
			border = "0";
			cellPadding = "0";
			cellSpacing = "0";
			width = "100%";
			id = 'z' + divId;
		}
		return menu;
	}

	function AddRow(menuId, link, text, bold) {
		getID('z' + menuId).appendChild(CreateRow(link, text, bold));
	}
	if(prefs[1]) { //If Beyond Menu preference is on
	
		var starter = CreateTitle("Beyond", "beyond");
		var menu = CreateMenu("beyond");
		
		var xsms = getID('xsms');
		xsms.parentNode.insertBefore(starter, xsms);
		xsms.parentNode.insertBefore(menu, xsms);
		
		AddRow("beyond", "http://omertabeyond.com/beyond/prefs.html", "Preferences", true);
		for(j=0; j<querys.length && querys[j].indexOf("menu_") != -1; j++) {
			if(GM_getValue(querys[j], '0') == '1') AddRow("beyond", qlinks[j], descr[j]);
		}
	} 
	else {
		var menu = CreateRow("http://omertabeyond.com/beyond/prefs.html", "Preferences", true);
		var game = getID('game');
		game.parentNode.insertBefore(menu, game);
	}
	if(prefs[4]) { //If Calculator Menu preference is on
	
		var starter = CreateTitle("Calculators", "calc");
		var menu = CreateMenu("calc");
		
		var xfam = getID('xfam');
		xfam.parentNode.insertBefore(starter, xfam);
		xfam.parentNode.insertBefore(menu, xfam);
		
		AddRow("calc", "http://omertabeyond.com/old/calculators/oc.html", "OC Calculator");
		AddRow("calc", "http://omertabeyond.com/old/calculators/moc.html", "MOC Calculator");
		AddRow("calc", "http://omertabeyond.com/old/calculators/sh.html", "SH Calculator");
		AddRow("calc", "http://omertabeyond.com/old/calculators/bank.html", "Bank Calculator");
	}
	if(prefs[0]) { //If Clean Menu preference is on

    del("//a[@id='xsms']"); // SMS Caption
    delall("//div[@id='sms']"); // SMS Stuff
		del("//div[@id='game']//tr[4]//a"); // Arcade
		del("//div[@id='game']//tr[11]//a"); // League of Dishonour
		del("//div[@id='game']//tr[20]//a"); // The Times
		del("//div[@id='com']//tr[3]//a"); // Chat
		del("//div[@id='com']//tr[4]//a"); // Forum
		del("//div[@id='cas']//tr[2]//a"); // Slotmachine
		del("//div[@id='cas']//tr[3]//a"); // Numbers game
		del("//div[@id='cas']//tr[5]//a"); // Bookmaker
		del("//div[@id='cas']//tr[6]//a"); // Punto Banco
		del("//div[@id='gh']//tr[4]//a"); // Roulette from Gambling Hall
		del("//div[@id='oth']//tr[1]//a"); // Tell a friend
		del("//div[@id='oth']//tr[2]//a"); // Main
		del("//div[@id='oth']//tr[7]//a"); // Gallery
		del("//div[@id='oth']//tr[8]//a"); // Logout
		del("//div[@id='oth']//tr[9]//hr"); // Horisontal Line
		del("//div[@id='oth']//tr[9]//font"); // Quick lookup:
		del("//div[@id='oth']//tr[9]//br"); // Empty space after quick lookup
		del("//a[@id='xcrew']"); // Crew Caption
	}
	if(prefs[12]) { //If access keys menu preference is on
		xpath("//div[@id='game']/table/tbody/tr[16]/td/a").snapshotItem(0).accessKey = 'j';
		xpath("//div[@id='crime']/table/tbody/tr[3]/td/a").snapshotItem(0).accessKey = 'c';
		xpath("//div[@id='crime']/table/tbody/tr[4]/td/a").snapshotItem(0).accessKey = 'v';
		xpath("//div[@id='crime']/table/tbody/tr[2]/td/a").snapshotItem(0).accessKey = 'b';
		xpath("//div[@id='crime']/table/tbody/tr[1]/td/a").snapshotItem(0).accessKey = 'n';
	}
}

//---------------- Status page ----------------
if(dlp == '/information.php') {
	if(prefs[8]) { // if remove Jailbusting Skill is on
		del("/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[6]");
	}
	var res = document.evaluate("/html/body/center/table/tbody/tr/td/table/tbody/tr[3]/td[2]", document, null, 7, null);
	res.snapshotItem(0).innerHTML = "<a href=user.php?nick=" + res.snapshotItem(0).textContent + ">"+ res.snapshotItem(0).textContent +"</a>";
	
	var res = document.evaluate("/html/body/center/table/tbody/tr/td/table/tbody/tr[12]/td[2]", document, null, 7, null);
	var text = res.snapshotItem(0).textContent.split("\t");
	res.snapshotItem(0).innerHTML = "<a href=user.php?nick=" + text[1] + ">"+ res.snapshotItem(0).textContent +"</a>";
	
	
	var results = document.evaluate("/html/body/center/table/tbody/tr/td/table/tbody/tr[5]/td[2]", document, null, 7, null);
	if( /\bYou\b/.test( results.snapshotItem(0).textContent ) ) {
		capo = results.snapshotItem(0).textContent.replace('You are a capo and','').replace(/\b(.)/, function(a,b){ return b.toUpperCase() });
		results.snapshotItem(0).innerHTML = capo ;
    }
	var tcres = document.evaluate("/html/body/center/table/tbody/tr/td/table/tbody/tr[6]/td[2]", document, null, 7, null);
	if( /\bTranslation\b/.test(tcres.snapshotItem(0).textContent) ) {
        tcres.snapshotItem(0).innerHTML = "<a href=http://interface.barafranca.com/language-project/index.php target=_blank>"+ tcres.snapshotItem(0).textContent +"</a>";
	}
}

//--------------- Bullet form --------------
if(dlp == '/sysbul.php'){
   	if(prefs[10]) { // if option is on
  if(getTAG('input')[2] != null) {
    getTAG('input')[2].value = '400';
    getTAG('input')[1].focus();
    }
 }
}

//---------------- Fingons News ----------------
if(dlp == '/info.php') {
	if(prefs[3]) { //If Fingon's News menu preference is on
		var menu = getTAG("link")[0].href;
		var url = 'http://89.149.221.178/~fingon/beyond-news.php?num=' + GM_getValue('newsamount', 5) + '&version=4&css='+ menu +'&url=' + location.hostname;
		if(GM_getValue('custombg', '') != '') url += '&pron=' + GM_getValue('custombg');
		location.href = url;
	}
}

//---------------- Jail Highlighter and Jail autoform ----------------
if(dlp == '/jail.php') {
	if(prefs[5]) { //If Jail highlighter preference is on
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
	if(flag==1) getTAG('input')[2].checked = true;
    // set the focus to the input box;
	if(getTAG('input')[0] != null) getTAG('input')[0].focus();
}

// In jail type box focus
if(dlp == '/iminjail.php') {
 if(getTAG('input')[0] != null) { getTAG('input')[0].focus(); }
}

//---------------- Crime page ----------------
if(dlp + dls == '/BeO/webroot/index.php?module=Crimes') {
	if(prefs[6]) { //If remove shooting bottle is on
		del("//tr[3]//tr[6]");
	}
	if(prefs[11]){ //If autoforms are on
	if(getTAG('input')[6] != null) {
		getTAG('input')[6].checked = true;
		getTAG('input')[7].focus();
    	}
    }
}

//----------------- Cars Page --------------------
if(dlp + dls == '/BeO/webroot/index.php?module=Cars') {
	if(prefs[11]){ //If autoforms are on
    var xpath1 = '/html/body/center/table/tbody/tr[3]/td/form/table/tbody/tr/td[3]'
    var xpath2 = '/html/body/center/table/tbody/tr[3]/td/form/table/tbody/tr[2]/td[3]'
    var xpath3 = '/html/body/center/table/tbody/tr[3]/td/form/table/tbody/tr[3]/td[3]'
    var xpath4 = '/html/body/center/table/tbody/tr[3]/td/form/table/tbody/tr[4]/td[3]'

    function getPercent(xp){
        var results = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if(results.snapshotItem(0) == null) return -10;
        if(results.snapshotItem(0).innerHTML[2] != null){
            return (results.snapshotItem(0).innerHTML[0] + results.snapshotItem(0).innerHTML[1])*1;
        }
        return (results.snapshotItem(0).innerHTML[0])*1;
    }

    var temp1 = getPercent(xpath1);
    var temp2 = getPercent(xpath2);
    var temp3 = getPercent(xpath3);
    var temp4 = getPercent(xpath4);
    
    if(temp1+temp2+temp3+temp4<0) ;
    else if (temp4 >= temp3 && temp4 >= temp2 && temp4 >= temp1) getTAG('input')[4].checked = true;
    else if( temp3 >= temp4 && temp3 >= temp2 && temp3 >= temp1) getTAG('input')[3].checked = true;
    else if( temp2 >= temp4 && temp2 >= temp3 && temp2 >= temp1) getTAG('input')[2].checked = true;
    else if( temp1 >= temp4 && temp1 >= temp3 && temp1 >= temp2) getTAG('input')[1].checked = true;

    if(getTAG('input')[5] != null) { getTAG('input')[5].focus(); }
	}
}


//---------------- B/N Autoform (with rank grabber) ----------------
if(dlp == '/information.php') { //grab rank from status page
	if(prefs[11]){ //If autoforms are on
    var xpath = '/html/body/center/table/tbody/tr/td/table/tbody/tr[8]/td[2]'
    var results = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    GM_setValue('rank',results.snapshotItem(0).innerHTML);
	}
}

if(dlp == '/booze.php' || dlp == '/drugs.php') {
	if(prefs[11]){ //If autoforms are on
 	var rank = GM_getValue('rank');
  
  var booze = 0;
 	var narc = 0;

  switch(rank) {
    case 'Empty-Suit': booze = 1; narc = 0; break;
    case 'Deliveryboy': booze = 2; narc = 0; break;
    case 'Delivery Girl': booze = 2; narc = 0; break;
    case 'Picciotto': booze = 5; narc = 1; break;
    case 'Shoplifter': booze = 7; narc = 2; break;
    case 'Pickpocket': booze = 10; narc = 4; break;
    case 'Thief': booze = 15; narc = 5; break;
    case 'Associate': booze = 20; narc = 7; break;
    case 'Mobster': booze = 25; narc = 8; break;
    case 'Soldier': booze = 30; narc = 10; break;
    case 'Swindler': booze = 35; narc = 11; break;
    case 'Assassin': booze = 40; narc = 13; break;
    case 'Local Chief': booze = 45; narc = 14; break;
    case 'Chief': booze = 50; narc = 16; break;
    case 'Bruglione': booze = 60; narc = 17; break;
    case 'Capodecina': booze = 70; narc = 20; break;
    case 'Godfather': booze = 70; narc = 20; break;
    case 'First Lady': booze = 70; narc = 20; break;
  }  
   	
	var carrying = 0;
	
	function getUnits(xp){
        var results = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if(results.snapshotItem(0).innerHTML[1] != null){
            return (results.snapshotItem(0).innerHTML[0] + results.snapshotItem(0).innerHTML[1])*1;
        }
        return (results.snapshotItem(0).innerHTML[0])*1;
    }

  for(var i=4;i<=10;i++){
    xpath =	'/html/body/center/table/tbody/tr['+i+']/td[3]';
    carrying += getUnits(xpath);
    getTAG('input')[i-4].value=getUnits(xpath);
  }  
  
  if(carrying == 0) {
    getTAG('input')[9].checked = true;
    if(dlp == '/drugs.php') getTAG('input')[3].value = narc;
    if(dlp == '/booze.php') getTAG('input')[6].value = booze;
  }
  else getTAG('input')[8].checked = true;
  getTAG('input')[7].focus();
	}
}

//---------------- DC+ info bar ----------------
if(dlp == '/mid.php') {
    var res = document.evaluate("//td[4]//tr[2]/td", document, null, 7, null);
    if(!res.snapshotLength == 0){
	res.snapshotItem(0).innerHTML = "<a href=bloodbank.php target=main>" + res.snapshotItem(0).innerHTML + "</a>";
	}
}

//---------------- Remove ImageShack / PhotoBucket / XS links ---------------------
if((dlp + dls) == ('/user.php' + dls)){
   	if(prefs[9]) { // if option is on
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
}

//---------------- Take all out of bank ----------------
if(dlp == '/bank.php') {
	if(prefs[7]) { //If All in/out of Bank preference is on
		var table = getTAG("table")[2];
		var td = table.getElementsByTagName("td")[2];
		
		if(td.textContent.substring(0, 3) == 'You') var o = 2; else var o = 9;
		
		var bank = td.textContent.replace('$', '').replace(/\,/g, '');
		td.innerHTML = '<a href="#" onclick="document.getElementsByName(\'amounttpob\')[0].value = \'' + bank +'\'; document.getElementsByTagName(\'input\')[8].checked = true;">' + td.textContent + '</a>';

		var td2 = table.getElementsByTagName("td")[o];
		var pocket = td2.textContent.replace('$', '').replace(/\,/g, '').replace('You\'ve got', '').replace('in your pocket', '');
		td2.innerHTML = '<a href="#" onclick="document.getElementsByName(\'amounttpob\')[0].value = \'' + pocket +'\'; document.getElementsByTagName(\'input\')[7].checked = true;">' + td2.textContent + '</a>';
	}
}

//---------------- Omerta Beyond Logo ----------------
	var blogo = 'data:image/png;base64,' +
    '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' +
		's/wf5AuhHd77ulQAAAAASUVORK5CYII=';

//---------------- Beyond Logo Replacer ----------------------
var logoxpath = "//img[contains(@src, 'logo0.gif')] | //img[contains(@src, 'omertalo.gif')]";
var logores = document.evaluate(logoxpath, document, null, 7, null);
  for (var i = 0; i < logores.snapshotLength; i++) {
    logores.snapshotItem(i).src = blogo;
}

//---------------- Server Choice ----------------
if(dlp == '/' || dlp == '/index.php' || dlp == '/game-register.php' || dlp == '/game-login.php') {
	if(form = getTAG('form')[0]) {
		var tr = cEL('tr');
		var ddl = cEL('select');
		for(i = 1; i <= 3; i++) {
			with(ddl.appendChild(cEL('option'))) {
				innerHTML = 'www' + ((i != 1) ? i : '');
				value = 'www' + ((i != 1) ? i : '');
			}
		}

		with(tr.appendChild(cEL('td')).appendChild(cEL('font'))) {
			innerHTML = '<b>Server:</b>';
			size = 1;
			color = '#cccccc';
		}
		with(tr.appendChild(cEL('td')).appendChild(ddl).style) {			
			width = 90;
			fontFamily = 'Verdana';
			fontSize = '10px';
			backgroundColor = '#303030';
			color = '#cccccc';
			border = '1px solid #FFFFFF';
		}
		ddl.id = 'serverchoice';
		ddl.value = form.action.replace('http://', '').replace('.barafranca.com/game-login.php', '')
		ddl.addEventListener('change', (function(t) { return function() { t.form.action = 'http://' + getID('serverchoice').value + '.barafranca.com/game-login.php'; }; })(this), false);
		onlinetr = form.getElementsByTagName('tr')[3];
		onlinetr.parentNode.insertBefore(tr, onlinetr);
	}
}

//---------------- Title changer ----------------
if(dlp == '/' || dlp == '/index.php') {
		document.title = "Omerta (COM)";
}