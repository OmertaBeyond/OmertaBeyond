// ==UserScript==
// @name          Omerta Beyond
// @version       1.0
// @author        vBm and Igloo
// @description   The greatest addon for Omerta available!
// @include       http://*igbots.com/gm/prefs.html*
// @include       http://www*.barafranca.com/*
// ==/UserScript==
//
// --------------------------------------------------------------
// This script was made for our own personal use but we decided
// to make it public because of all the support we got. You are
// welcome to use this script for your own use, you may edit the
// source for your own use only.
// --------------------------------------------------------------

var maxbit = 5; //set the ammount of preferences

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

var prefs = decbin(GM_getValue('prefs', 0)); //load integer prefs as a boolean array


//---------------- Preference Pane ----------------
if(location.href == 'http://igbots.com/gm/prefs.html' + location.search) {

	var prefstr = new Array("Clean useless menus", "IgBot submenu on the left", "Cocaine Prices in the marquee", "Fingons News in the info menu", "Calculators Submenu on the left", "Thanks to bustouts button", "Replace omerta logo", "");
	var string = '';
	
	string = string + '<table>';
	for(i=0; i<maxbit; i++) {
		string += '<tr><td><input type=checkbox id=check' + i + ' name=check' + i + '><\/td><td>' + prefstr[i] + '<\/td><\/tr>';
	}
	string += '<\/table><input type=button value="Update Preferences" onclick=updateprefs()>';
	
	document.getElementById('page').innerHTML = string;
	
	if(location.search.length > 1) {
		GM_setValue('prefs', location.search.substring(1,location.search.length)); //save integer prefs
		var prefs = decbin(GM_getValue('prefs', 0)); //load integer prefs as a boolean array
	}
	
	for(i=0; i<maxbit; i++) {
		document.getElementById('check' + i).checked = prefs[i];
	}
}


//---------------- Cocaine Prices ----------------
if(location.href == 'http://www.barafranca.com/marquee.php' || location.href == 'http://www2.barafranca.com/marquee.php' || location.href == 'http://www3.barafranca.com/marquee.php') {
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
				
				var fonts = document.getElementsByTagName('font');
				var string = 'Cocaine Prices at:' + ' ' + time + ' || Chicago:' + ' ' + chi + ' || Baltimore:' + ' ' + balti + ' || New York:' + ' ' + ny + ' || Philadelphia:' + ' ' + philly + ' || Detroit:' + ' ' + detro + ' || Las Vegas:' + ' ' + lv + ' || Corleone:' + ' ' + co + ' || Palermo:' + ' ' + pa + ' ||';
				
				fonts[1].innerHTML = string;
				fonts[1].size = -2;
			}
		});
	}
}


//---------------- Menu and submenus ----------------
if(location.href == 'http://www.barafranca.com/menu.php' || location.href == 'http://www2.barafranca.com/menu.php' || location.href == 'http://www3.barafranca.com/menu.php') {
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
		function xpath(query) {
			return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		}
	
		function del(query){
			var elem = xpath(query).snapshotItem(0);
			elem.parentNode.removeChild(elem);
		}
	
		del("//html/body/div[1]/table/tbody/tr[5]/td/a"); //Omerta Shop link from Help
		del("//html/body/b[1]/a"); //SMS Options
		del("//html/body/div[2]/table/tbody/tr[1]/td/a"); //Registration link from SMS Options
		del("//html/body/div[2]/table/tbody/tr[2]/td/a"); //SMS Settings link from SMS Options
		del("//html/body/div[2]/table/tbody/tr[3]/td/a"); //Send SMS link from SMS Options
		del("//html/body/div[2]/table/tbody/tr[4]/td/a"); //SMS Credits link from SMS options
		del("//html/body/div[2]/table"); //SMS catorgory
		del("//html/body/div[3]/table/tbody/tr[11]/td/a"); //League of Dishonour link from Game
		del("//html/body/div[@id='game']/table/tbody/tr[4]/td/a"); //Arcade from Game
		del("//html/body/div[3]/table/tbody/tr[20]/td/a"); //The Times link from Game
		del("//html/body/div[4]/table/tbody/tr[3]/td/a"); //Chat link from Communication
		del("//html/body/div[4]/table/tbody/tr[4]/td/a"); //Forum link from Communication
		del("//html/body/div[7]/table/tbody/tr[2]/td/a"); //Slotmachine link from Casino
		del("//html/body/div[7]/table/tbody/tr[3]/td/a"); //Numbers game link from Casino
		del("//html/body/div[7]/table/tbody/tr[5]/td/a"); //Bookmaker link from Casino
		del("//html/body/div[7]/table/tbody/tr[6]/td/a"); //Punto Banco link from Casino
		del("//html/body/table[7]/tbody/tr/td/b/a"); //Gambling Hall
		del("//html/body/div[8]/table/tbody/tr[4]/td/a"); //Roulette link from Gambling Hall
		del("//html/body/div[9]/table/tbody/tr[1]/td/a"); //Tell a friend link from Other
		del("//html/body/div[9]/table/tbody/tr[2]/td/a"); //Main link from Other
		del("//html/body/div[9]/table/tbody/tr[6]/td/a"); //All users link from Other
		del("//html/body/div[9]/table/tbody/tr[7]/td/a"); //Gallery link from Other
		del("//html/body/div[9]/table/tbody/tr[8]/td/a"); //link from
		del("//html/body/table[9]/tbody/tr/td/b/a"); //Crew
		del("//html/body/div[@id='oth']/table/tbody/tr[9]/td/hr"); //horisontal line 
		del("//html/body/div[9]/table/tbody/tr[9]/td/font"); //"Quick lookup:" text above search box
		del("//html/body/div[9]/table/tbody/tr[9]/td/br"); //link from
	}
}

//---------------- Fingons News ----------------
if(location.href == 'http://www.barafranca.com/info.php' || location.href == 'http://www2.barafranca.com/info.php' || location.href == 'http://www3.barafranca.com/info.php') {
	if(prefs[3]) { //If Fingon's News menu preference is on
		var link = document.getElementsByTagName("link");
		var menu = link[0].href;
		menu = menu.replace('http://www.barafranca.com/', '').replace('menu', '').replace('.css', '');
		location.href = 'http://igbots.com/news.php?menu=' + menu;
	}
}