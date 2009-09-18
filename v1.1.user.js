// ==UserScript==
// @name          Omerta Beyond
// @version       1.1
// @author        vBm and Igloo
// @description   The greatest addon for Omerta available!
// @include       http://*igbots.com/gm/prefs.html*
// @include       http://www*.barafranca.com/menu.php
// @include       http://www*.barafranca.com/info.php
// @include       http://www*.barafranca.com/marquee.php
// @include       http://www*.barafranca.com/jail.php
// @include       http://70.*.*.*/menu.php
// @include       http://70.*.*.*/info.php
// @include       http://70.*.*.*/marquee.php
// @include       http://70.*.*.*/jail.php
// ==/UserScript==
//
// --------------------------------------------------------------
// This script was made for our own personal use but we decided
// to make it public because of all the support we got. You are
// welcome to use this script for your own use, you may edit the
// source for your own use only.
// --------------------------------------------------------------

var maxbit = 6; //set the ammount of preferences

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


//---------------- Preference Pane ----------------
if(location.href == 'http://igbots.com/gm/prefs.html' + location.search) {

	if(location.search.length > 1) {
		if(GetParam('sister') != '') {
			GM_setValue('sister', GetParam('sister').toUpperCase()); //save sister fam
		} else {
			GM_setValue('prefs', location.search.substring(1,location.search.length)); //save integer prefs
			var prefs = decbin(GM_getValue('prefs', 0)); //load integer prefs as a boolean array
		}
	}

	var sisterinput = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type=text id=\"sister\" value=" + GM_getValue('sister', '') + "> <input type=button value=\"Update Sister Fam\" onclick=\"document.location.href = '?sister=' + document.getElementById('sister').value\">";
	var prefstr = new Array("Clean useless menus", "IgBot submenu on the left", "Cocaine Prices in the marquee", "Fingons News in the info menu", "Calculators Submenu on the left", "Highlight Sister fam in Jail" + sisterinput);
	var string = '';
	
	string = string + '<table>';
	for(i=0; i<maxbit; i++) {
		string += '<tr><td><input type=checkbox id=check' + i + ' name=check' + i + '><\/td><td>' + prefstr[i] + '<\/td><\/tr>';
	}
	string += '<\/table><input type=button value="Update Preferences" onclick=updateprefs()>';
	
	document.getElementById('page').innerHTML = string;
	
	for(i=0; i<maxbit; i++) {
		document.getElementById('check' + i).checked = prefs[i];
	}
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
				
				switch(low) {
					case 'Baltimore': balti = '<font color="#00ff00">' + balti + '</font>'; break;
					case 'Chicago': chi = '<font color="#00ff00">' + chi + '</font>'; break;
					case 'NewYork': ny = '<font color="#00ff00">' + ny + '</font>'; break;
					case 'Philadelphia': philly = '<font color="#00ff00">' + philly + '</font>'; break;
					case 'Detroit': detro = '<font color="#00ff00">' + detro + '</font>'; break;
					case 'LasVegas': lv = '<font color="#00ff00">' + lv + '</font>'; break;
					case 'Corleone': co = '<font color="#00ff00">' + co + '</font>'; break;
					case 'Palermo': pa = '<font color="#00ff00">' + pa + '</font>'; break;
				}
				
				switch(high) {
					case 'Baltimore': balti = '<font color="#ff0000">' + balti + '</font>'; break;
					case 'Chicago': chi = '<font color="#ff0000">' + chi + '</font>'; break;
					case 'NewYork': ny = '<font color="#ff0000">' + ny + '</font>'; break;
					case 'Philadelphia': philly = '<font color="#ff0000">' + philly + '</font>'; break;
					case 'Detroit': detro = '<font color="#ff0000">' + detro + '</font>'; break;
					case 'LasVegas': lv = '<font color="#ff0000">' + lv + '</font>'; break;
					case 'Corleone': co = '<font color="#ff0000">' + co + '</font>'; break;
					case 'Palermo': pa = '<font color="#ff0000">' + pa + '</font>'; break;
				}
				
				var style = document.createElement('style');
				style.type = 'text/css';
				style.innerHTML = "a:hover { color:#fff; }";
				document.getElementsByTagName('head')[0].appendChild(style);
				
				var fonts = document.getElementsByTagName('font');
				var string = 'Cocaine Prices at: ' + time + ' || Chicago:' + ' ' + chi + ' || Baltimore:' + ' ' + balti + ' || New York:' + ' ' + ny + ' || Philadelphia:' + ' ' + philly + ' || Detroit:' + ' ' + detro + ' || Las Vegas:' + ' ' + lv + ' || Corleone:' + ' ' + co + ' || Palermo:' + ' ' + pa + ' ||';
				
				fonts[1].innerHTML = '<a target=main href="http://www.igbots.com/omerta.php?prices" style="font-size:10px;">' + string + '</a>';
				
				window.onload = setTimeout("window.location.reload()", 120000);
			}
		});
	}
}


//---------------- Menu and submenus ----------------
if(document.location.pathname == '/menu.php') {
	if(prefs[1]) { //If IgBot Menu preference is on
		var table = '<table width="100%" border=0 cellspacing="0" cellpadding="0">';
		table = table + '<tr><td><b><a style="color: yellow; font-weight : bold;" id="xigbots" href=javascript:Toggle(\'igbots\');>IgBots</a></b></td></tr></table>';
		table = table + '<div id="igbots">';
		table = table + '<table width="100%" border="0" cellspacing="0" cellpadding="0" >';
		table = table + '<tr><td><a target=main href="http://igbots.com/gm/prefs.html" style="color: white; font-weight : bold;">Preferences</a></td></tr>';
		table = table + '<tr><td><a target=main href="http://igbots.com/omerta.php?familys">Family Info</a></td></tr>';
		table = table + '<tr><td><a target=main href="http://igbots.com/omerta.php?history">User History</a></td></tr>';
		table = table + '<tr><td><a target=main href="http://igbots.com/omerta.php?deaths">Deaths List</a></td></tr>';
		table = table + '<tr><td><a target=main href="http://igbots.com/omerta.php?honour">Most Honoured</a></td></tr>';
		table = table + '</table>';
		table = table + '</div>';
		
		var xsms, div;
		xsms = document.getElementById('xsms');
		if (xsms) {
			div = document.createElement('div');
			div.innerHTML = table;
			xsms.parentNode.insertBefore(div, xsms);
		}
	} else {
		var table = '<tr><td><a target=main href="http://igbots.com/gm/prefs.html" style="font-weight : bold;">Preferences</a></td></tr>';
		
		var game, div;
		game = document.getElementById('game');
		if (game) {
			div = document.createElement('div');
			div.innerHTML = table;
			game.parentNode.insertBefore(div, game);
		}
	}
	
	if(prefs[4]) { //If Calculator Menu preference is on
		var calctable = '<table width="100%" border=0 cellspacing="0" cellpadding="0">';
		calctable = calctable + '<tr><td><b><a style="color: yellow; font-weight : bold;" id="xcalc" href=javascript:Toggle(\'calc\');>Calculators</a></b></td></tr></table>';
		calctable = calctable + '<div id="calc">';
		calctable = calctable + '<table width="100%" border="0" cellspacing="0" cellpadding="0" >';
		calctable = calctable + '<tr><td><a target=main href="http://igbots.com/old/calculators/oc.html">OC Calculator</a></td></tr>';
		calctable = calctable + '<tr><td><a target=main href="http://igbots.com/old/calculators/moc.html">MOC Calculator</a></td></tr>';
		calctable = calctable + '<tr><td><a target=main href="http://igbots.com/old/calculators/safehouse.html">SH Calculator</a></td></tr>';
		calctable = calctable + '<tr><td><a target=main href="http://igbots.com/old/calculators/bank.html">Bank Calculator</a></td></tr>';
		calctable = calctable + '</table>';
		calctable = calctable + '</div>';
				
		var xfam, div;
		xfam = document.getElementById('xfam');
		if (xfam) {
			div = document.createElement('div');
			div.innerHTML = calctable;
			xfam.parentNode.insertBefore(div, xfam);
		}
	}
	
	if(prefs[0]) { //If Clean Menu preference is on
		myElements = ['xcrew','xsms', 'sms'];
		for (var i = 0; i < 3; i++) {
			var e = document.getElementById(myElements[i]);
			if (e) {
				e.parentNode.removeChild(e);
			}
		}
		function xpath(query) {
			 return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		 }
		function del(query){
			var elem = xpath(query).snapshotItem(0);
			elem.parentNode.removeChild(elem);
		 }
		
		del("//html/body/div[@id='elp']/table/tbody/tr[5]/td/a"); // Omerta Shop
		del("//html/body/div[@id='game']/table/tbody/tr[4]/td/a"); // Arcade
		del("//html/body/div[@id='game']/table/tbody/tr[11]/td/a"); // League of Dishonour
		del("//html/body/div[@id='game']/table/tbody/tr[20]/td/a"); // The Times
		del("//html/body/div[@id='com']/table/tbody/tr[3]/td/a"); // Chat
		del("//html/body/div[@id='com']/table/tbody/tr[4]/td/a"); // Forum
		del("//html/body/div[@id='cas']/table/tbody/tr[2]/td/a"); // Slotmachine
		del("//html/body/div[@id='cas']/table/tbody/tr[3]/td/a"); // Numbers game
		del("//html/body/div[@id='cas']/table/tbody/tr[5]/td/a"); // Numbers game
		del("//html/body/div[@id='cas']/table/tbody/tr[6]/td/a"); // Punto Banco
		del("//html/body/div[@id='gh']/table/tbody/tr[4]/td/a"); // Roulette from Gambling Hall
		del("//html/body/div[@id='oth']/table/tbody/tr[1]/td/a"); // Tell a friend
		del("//html/body/div[@id='oth']/table/tbody/tr[2]/td/a"); // Main
		del("//html/body/div[@id='oth']/table/tbody/tr[7]/td/a"); // Gallery
		del("//html/body/div[@id='oth']/table/tbody/tr[8]/td/a"); // Logout
		del("//html/body/div[@id='oth']/table/tbody/tr[9]/td/hr"); // Horisontal Line
		del("//html/body/div[@id='oth']/table/tbody/tr[9]/td/font"); // Quick lookup:
		del("//html/body/div[@id='oth']/table/tbody/tr[9]/td/br");
	}
}

//---------------- Fingons News ----------------
if(document.location.pathname == '/info.php') {
	if(prefs[3]) { //If Fingon's News menu preference is on
		var link = document.getElementsByTagName("link");
		var menu = link[0].href;
		menu = menu.replace('http://www.barafranca.com/', '').replace('menu', '').replace('.css', '');
		location.href = 'http://igbots.com/news.php?menu=' + menu;
	}
}

//---------------- Jail Highlighter ----------------
if(document.location.pathname == '/jail.php') {
	if(prefs[5]) { //If Jail highlighter preference is on
		var sisterfam = GM_getValue('sister', '');
		var words = new Array(sisterfam);
		var bgColors = new Array("#BFBFBF"); 
		for (var i = 0; i < words.length; i ++ ) {
			var xpath = "//tr[contains(translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'" + words[i] + "')]";   
			var results = document.evaluate(xpath, document, null, XPathResult.UNORDERED_SNAPSHOT_TYPE, null);
			var thisItem
			while (thisItem = results.iterateNext()) {           
				thisItem.style.backgroundColor = bgColors[i];       
			}
		}
	}
}