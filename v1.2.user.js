// ==UserScript==
// @name           Omerta Beyond
// @version        1.2.0
// @date           2007-08-08
// @author         vBm
// @author         Igloo
// @identifier     http://www.igbots.com/gm/beyond.user.js
// @description    The greatest addon for Omerta available!
// @include        http://*igbots.com/gm/prefs.html*
// @include        http://www*.barafranca.com/menu.php
// @include        http://www*.barafranca.com/info.php
// @include        http://www*.barafranca.com/marquee.php
// @include        http://www*.barafranca.com/jail.php*
// @include        http://www*.barafranca.com/bank.php
// @include        http://www*.barafranca.com/BeO/webroot/*
// @include        http://70.*.*.*/menu.php
// @include        http://70.*.*.*/info.php
// @include        http://70.*.*.*/marquee.php
// @include        http://70.*.*.*/jail.php*
// @include        http://70.*.*.*/bank.php
// @include        http://70.*.*.*/BeO/webroot/*
// ==/UserScript==
//
// --------------------------------------------------------------
// This script was made for our own personal use but we decided
// to make it public because of all the support we got. You are
// welcome to use this script for your own use, you may edit the
// source for your own use only.
// --------------------------------------------------------------

var maxbit = 7; //set the ammount of preferences

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

var prefs = decbin(GM_getValue('prefs', 0)); //load integer prefs as a boolean array

function xpath(query) {
  return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function del(query){
   var elem = xpath(query).snapshotItem(0);
   elem.parentNode.removeChild(elem);
}


//---------------- Preference Pane ----------------
if(location.href == 'http://igbots.com/gm/prefs.html' + location.search) {
	if(location.search.length > 1) {
		if(location.search.indexOf("=") == -1) {
			GM_setValue('prefs', location.search.substring(1)); //save integer prefs
			var prefs = decbin(GM_getValue('prefs', 0));
		}
		
		var querys = ['familys','colours','jailint','priority','newsammount','custombg','comments','bold','high','low','colour','refresh'];
		for(j=0; j<querys.length; j++) if(GetParam(querys[j]) != '') GM_setValue(querys[j], GetParam(querys[j]));
	}

	var prefstr = ["Clean useless menus","Beyond/IgBots submenu on the left","Cocaine Prices in the marquee","Fingons News in the info menu","Calculators Submenu on the left","Jail Highlighter","Remove 'shooting bottle' from crime page","Click bank ammount to fill in bank form"];
	var string = '';
	
	string = string + '<table>';
	for(i=0; i<maxbit; i++) {
		string += '<tr><td><input type=checkbox id=check' + i + ' name=check' + i + '><\/td><td>' + prefstr[i] + '<\/td><\/tr>';
	}
	string += '<\/table><input type=button value="Update Preferences" onclick=updateprefs()>';
	
	document.getElementById('page').innerHTML = string;
	
	for(i=0; i<maxbit; i++) document.getElementById('check' + i).checked = prefs[i];
	
	var family = GM_getValue('familys', '').split(",");
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
	string += '<tr><td colspan=3><input type=submit value="Save" onclick="location.href = \'?familys=\'';
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
	string += '<tr><td>Number of news aricles: <input type=text size=3 maxlength=2 id=newsammount value="' + GM_getValue('newsammount', '5') + '"></td></tr>';
	string += '<tr><td>Number of comments per page: <input type=text size=3 maxlength=2 id=comments value="' + GM_getValue('comments', '10') + '"></td></tr>';
	string += '<tr><td>Custom background URL: <input type=text size=40 id=custombg value="' + GM_getValue('custombg', '') + '"></td></tr>';
	string += '<tr><td><input type=submit value="Save Settings" onclick="document.location.href = \'?custombg=\' + document.getElementById(\'custombg\').value + \'&newsammount=\' + document.getElementById(\'newsammount\').value + \'&comments=\' + document.getElementById(\'comments\').value"></td></tr>';
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
	
}


//---------------- Cocaine Prices ----------------
if(document.location.pathname == '/marquee.php') {
	if(prefs[2]) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://igbots.com/gm/prices.xml.php',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/xml,text/xml',
			},
			onload: function(responseDetails) {
				var marquee = document.getElementsByTagName('font')[1];
				marquee.innerHTML = "";
			
				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		
				var entries = dom.getElementsByTagName('cocaine');
				var time = dom.getElementsByTagName('time')[0].textContent
				var title;
				var balti = entries[0].getElementsByTagName('Baltimore')[0].textContent;
				var chi = entries[0].getElementsByTagName('Chicago')[0].textContent;
				var ny = entries[0].getElementsByTagName('NewYork')[0].textContent;
				var philly = entries[0].getElementsByTagName('Philadelphia')[0].textContent;
				var detro = entries[0].getElementsByTagName('Detroit')[0].textContent;
				var lv = entries[0].getElementsByTagName('LasVegas')[0].textContent;
				var co = entries[0].getElementsByTagName('Corleone')[0].textContent;
				var pa = entries[0].getElementsByTagName('Palermo')[0].textContent;
				
				var high = dom.getElementsByTagName('high')[0].textContent;
				var low = dom.getElementsByTagName('low')[0].textContent;
				
				function addFontColorLow(text) {
                     return '<span style="color:#' + GM_getValue('low', '00ff00') + ';">' + text + '</span>';
                }
                function addFontColorHigh(text) {
                     return '<span style="color:#' + GM_getValue('high', 'ff0000') + ';">' + text + '</span>';
                }

                switch(low) {
                     case 'Baltimore': balti = addFontColorLow(balti); break;
                     case 'Chicago': chi = addFontColorLow(chi); break;
                     case 'NewYork': ny = addFontColorLow(ny); break;
                     case 'Philadelphia': philly = addFontColorLow(philly); break;
                     case 'Detroit': detro = addFontColorLow(detro); break;
                     case 'LasVegas': lv = addFontColorLow(lv); break;
                     case 'Corleone': co = addFontColorLow(co); break;
                     case 'Palermo': pa = addFontColorLow(pa); break;
                }
				
				switch(high) {
                     case 'Baltimore': balti = addFontColorHigh(balti); break;
                     case 'Chicago': chi = addFontColorHigh(chi); break;
                     case 'NewYork': ny = addFontColorHigh(ny); break;
                     case 'Philadelphia': philly = addFontColorHigh(philly); break;
                     case 'Detroit': detro = addFontColorHigh(detro); break;
                     case 'LasVegas': lv = addFontColorHigh(lv); break;
                     case 'Corleone': co = addFontColorHigh(co); break;
                     case 'Palermo': pa = addFontColorHigh(pa); break;
				}
				
				var string = 'Cocaine Prices at: ' + time + ' || Chicago:' + ' ' + chi + ' || Baltimore:' + ' ' + balti + ' || New York:' + ' ' + ny + ' || Philadelphia:' + ' ' + philly + ' || Detroit:' + ' ' + detro + ' || Las Vegas:' + ' ' + lv + ' || Corleone:' + ' ' + co + ' || Palermo:' + ' ' + pa + ' ||';
				
				var link = document.createElement('a');
				link.href = "http://www.igbots.com/omerta.php?prices";
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
if(document.location.pathname == '/menu.php') {

	//Declare menu functions
	function CreateRow(link, text, bold) {
		var tr = document.createElement("tr");
		var td = tr.appendChild(document.createElement("td"));
		var a = td.appendChild(document.createElement("a"));
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
		var table = document.createElement("table");
		with(table) {
			border = "0";
			cellPadding = "0";
			cellSpacing = "0";
			width = "100%";
		}
		
		var td = table.appendChild(document.createElement("tr")).appendChild(document.createElement("td"));
		var a = td.appendChild(document.createElement("a"));
		with(a) {
			style.color = "yellow";
			style.fontWeight = "bold";
			id = "x" + linkId;
			href = "javascript:Toggle('" + linkId + "');";
			textContent = linkTitle;
		}
		return table;
	}
	
	function CreateMenu(divId) {
		var menu = document.createElement("div");
		menu.id = divId;
		var table = menu.appendChild(document.createElement("table"));
		with(table) {
			border = "0";
			cellPadding = "0";
			cellSpacing = "0";
			width = "100%";
			id = 'z' + divId;
		}
		return menu;
	}
	
	function AddRow(menuId, link, text, bold) {
		document.getElementById('z' + menuId).appendChild(CreateRow(link, text, bold));
	}
	
	if(prefs[1]) { //If Beyond Menu preference is on
	
		var starter = CreateTitle("Beyond", "beyond");
		var menu = CreateMenu("beyond");
		
		var xsms = document.getElementById('xsms');
		xsms.parentNode.insertBefore(starter, xsms);
		xsms.parentNode.insertBefore(menu, xsms);
		
		AddRow("beyond", "http://igbots.com/gm/prefs.html", "Preferences", true);
		AddRow("beyond", "http://igbots.com/omerta.php?familys", "Family Info");
		AddRow("beyond", "http://igbots.com/omerta.php?history", "User History");
		AddRow("beyond", "http://igbots.com/omerta.php?deaths", "Deaths List");
		AddRow("beyond", "http://igbots.com/omerta.php?honour", "Most Honoured");
		AddRow("beyond", "http://igbots.com/omerta.php?randomquote", "Random Quote");
		
	} else {
		var menu = CreateRow("http://igbots.com/gm/prefs.html", "Preferences", true);
		var game = document.getElementById('game');
		game.parentNode.insertBefore(menu, game);
	}
	
	if(prefs[4]) { //If Calculator Menu preference is on
	
		var starter = CreateTitle("Calculators", "clac");
		var menu = CreateMenu("clac");
		
		var xfam = document.getElementById('xfam');
		xfam.parentNode.insertBefore(starter, xfam);
		xfam.parentNode.insertBefore(menu, xfam);
		
		AddRow("clac", "http://igbots.com/old/calculators/oc.html", "OC Calculator");
		AddRow("clac", "http://igbots.com/old/calculators/moc.html", "MOC Calculator");
		AddRow("clac", "http://igbots.com/old/calculators/sh.html", "SH Calculator");
		AddRow("clac", "http://igbots.com/old/calculators/bank.html", "Bank Calculator");
		
	}
	
	if(prefs[0]) { //If Clean Menu preference is on
		myElements = ['xcrew','xsms', 'sms'];
		for (var i = 0; i < 3; i++) {
			var e = document.getElementById(myElements[i]);
			if (e) {
				e.parentNode.removeChild(e);
			}
		}

		del("//html/body/div[@id='elp']/table/tbody/tr[5]/td/a"); // Omerta Shop
		del("//html/body/div[@id='game']/table/tbody/tr[4]/td/a"); // Arcade
		del("//html/body/div[@id='game']/table/tbody/tr[11]/td/a"); // League of Dishonour
		del("//html/body/div[@id='game']/table/tbody/tr[20]/td/a"); // The Times
		del("//html/body/div[@id='com']/table/tbody/tr[3]/td/a"); // Chat
		del("//html/body/div[@id='com']/table/tbody/tr[4]/td/a"); // Forum
		del("//html/body/div[@id='fam']/table/tbody/tr[2]/td/a"); // Family Forum
		del("//html/body/div[@id='cas']/table/tbody/tr[2]/td/a"); // Slotmachine
		del("//html/body/div[@id='cas']/table/tbody/tr[3]/td/a"); // Numbers game
		del("//html/body/div[@id='cas']/table/tbody/tr[5]/td/a"); // Bookmaker
		del("//html/body/div[@id='cas']/table/tbody/tr[6]/td/a"); // Punto Banco
		del("//html/body/div[@id='gh']/table/tbody/tr[4]/td/a"); // Roulette from Gambling Hall
		del("//html/body/div[@id='oth']/table/tbody/tr[1]/td/a"); // Tell a friend
		del("//html/body/div[@id='oth']/table/tbody/tr[2]/td/a"); // Main
		del("//html/body/div[@id='oth']/table/tbody/tr[7]/td/a"); // Gallery
		del("//html/body/div[@id='oth']/table/tbody/tr[8]/td/a"); // Logout
		del("//html/body/div[@id='oth']/table/tbody/tr[9]/td/hr"); // Horisontal Line
		del("//html/body/div[@id='oth']/table/tbody/tr[9]/td/font"); // Quick lookup:
		del("//html/body/div[@id='oth']/table/tbody/tr[9]/td/br"); // Empty space after quick lookup
	}
}

//---------------- Fingons News ----------------
if(document.location.pathname == '/info.php') {
	if(prefs[3]) { //If Fingon's News menu preference is on
		var link = document.getElementsByTagName("link");
		var menu = link[0].href;
		var url = 'http://89.149.221.178/~fingon/beyond-news.php?num=' + GM_getValue('newsammount', 5) + '&version=1&css='+ menu +'&url=' + location.hostname;
		if(GM_getValue('custombg', '') != '') url += '&pron=' + GM_getValue('custombg');
		location.href = url;
	}
}

//---------------- Jail Highlighter ----------------
if(document.location.pathname == '/jail.php') {
	if(prefs[5]) { //If Jail highlighter preference is on
		var words = GM_getValue('familys', '').split(",");
		var bgColors = GM_getValue('colours', '').split(",");
		var priority = GM_getValue('priority', '').split(",");
		var thispri = new Array();
		for(var p = 9; p >= 0; p--) {
			for (var i = 0; i < words.length; i++) {
				if(priority[i] != p) continue;
				var xpath = "//tr[contains(translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'" + words[i] + "')]";
				var results = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				for ( var j=0 ; j < results.snapshotLength; j++ ) {
					if(priority[i] > 3 && results.snapshotItem(j).bgColor == 'yellow') continue;
					if(bgColors[i].length > 0) results.snapshotItem(j).style.backgroundColor = '#' + bgColors[i];
				}
			}
		}
	}
}

//---------------- Delete Shoot the bottle ----------------
if(document.location.pathname + document.location.search == '/BeO/webroot/index.php?module=Crimes') {
	if(prefs[6]) { //If remove shooting bottle is on
		del("//html/body/center/table[@class='thinline']/tbody/tr[3]/td/table/tbody/tr[6]");
	}
}