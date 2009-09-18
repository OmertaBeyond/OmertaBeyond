// ==UserScript==
// @name           Omerta Beyond
// @version        1.3
// @date           2007-09-14
// @author         vBm ( vbm AT vbmcrew DOT org )
// @author         Igloo ( igloo AT igbots DOT com )
// @identifier     http://www.igbots.com/gm/beyond.user.js
// @description    The greatest addon for Omerta available!
// @include        http://*igbots.com/gm/prefs.html*
// @include        http://www*.barafranca.com/
// @include        http://www*.barafranca.com/menu.php
// @include        http://www*.barafranca.com/info.php
// @include        http://www*.barafranca.com/mid.php
// @include        http://www*.barafranca.com/information.php
// @include        http://www*.barafranca.com/marquee.php
// @include        http://www*.barafranca.com/jail.php*
// @include        http://www*.barafranca.com/pic.php
// @include        http://www*.barafranca.com/BeO/webroot/*
// @include        http://www*.barafranca.com/bank.php
// @include        http://70.*.*.*/menu.php
// @include        http://70.*.*.*/info.php
// @include        http://70.*.*.*/information.php
// @include        http://70.*.*.*/marquee.php
// @include        http://70.*.*.*/jail.php*
// @include        http://70.*.*.*/pic.php
// @include        http://70.*.*.*/mid.php
// @include        http://70.*.*.*/BeO/webroot/*
// @include        http://70.*.*.*/bank.php
// ==/UserScript==
//
// --------------------------------------------------------------
// This script was made for our own personal use but we decided
// to make it public because of all the support we got. You are
// welcome to use this script for your own use, you may edit the
// source for your own use only.
// --------------------------------------------------------------
//

var maxbit = 8; //set the ammount of preferences

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
var querys = ['menu_faminfo','menu_history','menu_deaths','menu_honoured','menu_randomquote','menu_cocaine','menu_targets','familys','colours','jailint','priority','newsammount','custombg','comments','bold','high','low','colour','refresh'];
var descr = ["Family Info","User History","Deaths List","Most Honoured","Random Quote","Cocaine Prices","War Targets"]; //description for custom beyond menu
var qlinks = ['http://www.igbots.com/omerta.php?familys','http://www.igbots.com/omerta.php?history','http://www.igbots.com/omerta.php?deaths','http://www.igbots.com/omerta.php?honour','http://www.igbots.com/omerta.php?randomquote','http://www.igbots.com/omerta.php?prices','http://www.igbots.com/targets/omerta.php']; //links for custom beyond menu

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
		
		for(j=0; j<querys.length; j++) if(GetParam(querys[j]) != '') GM_setValue(querys[j], GetParam(querys[j]));
	}

	var prefstr = ["Clean useless menus","Beyond submenu on the left","Cocaine Prices in the marquee","Fingons News in the info menu","Calculators Submenu on the left","Jail Highlighter","Remove 'shooting bottle' from crime page","Click bank ammount to fill in bank form"];
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
if(document.location.pathname == '/marquee.php') {
	if(prefs[2]) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://igbots.com/gm/prices.xml.php',
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'application/xml,text/xml', },
			onload: function(responseDetails) {
				var marquee = document.getElementsByTagName('font')[1];
				marquee.innerHTML = "";
			
				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		
				var entries = dom.getElementsByTagName('cocaine');
				var title;
				var balti = entries[0].getElementsByTagName('Baltimore')[0].textContent;
				var chi = entries[0].getElementsByTagName('Chicago')[0].textContent;
				var ny = entries[0].getElementsByTagName('NewYork')[0].textContent;
				var philly = entries[0].getElementsByTagName('Philadelphia')[0].textContent;
				var detro = entries[0].getElementsByTagName('Detroit')[0].textContent;
				var lv = entries[0].getElementsByTagName('LasVegas')[0].textContent;
				var co = entries[0].getElementsByTagName('Corleone')[0].textContent;
				var pa = entries[0].getElementsByTagName('Palermo')[0].textContent;
				

				var highelem = dom.getElementsByTagName('high');
				if(highelem[0]) var high = highelem[0].textContent
				var lowelem = dom.getElementsByTagName('low');
				if(lowelem[0]) var low = lowelem[0].textContent;
				var timeelem = dom.getElementsByTagName('time');
				if(timeelem[0]) var time = timeelem[0].textContent;
				
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
		a = tr.appendChild(document.createElement("td")).appendChild(document.createElement("a"))
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
		with(table = document.createElement("table")) {
			border = "0";
			cellPadding = "0";
			cellSpacing = "0";
			width = "100%";
		}
		
		var td = table.appendChild(document.createElement("tr")).appendChild(document.createElement("td"));
		with(td.appendChild(document.createElement("a"))) {
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
		with(menu.appendChild(document.createElement("table"))) {
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
		for(j=0; j<querys.length && querys[j].indexOf("menu_") != -1; j++) {
			if(GM_getValue(querys[j], '0') == '1') AddRow("beyond", qlinks[j], descr[j]);
		}
	} 
	else {
		var menu = CreateRow("http://igbots.com/gm/prefs.html", "Preferences", true);
		var game = document.getElementById('game');
		game.parentNode.insertBefore(menu, game);
	}
	if(prefs[4]) { //If Calculator Menu preference is on
	
		var starter = CreateTitle("Calculators", "calc");
		var menu = CreateMenu("calc");
		
		var xfam = document.getElementById('xfam');
		xfam.parentNode.insertBefore(starter, xfam);
		xfam.parentNode.insertBefore(menu, xfam);
		
		AddRow("calc", "http://igbots.com/old/calculators/oc.html", "OC Calculator");
		AddRow("calc", "http://igbots.com/old/calculators/moc.html", "MOC Calculator");
		AddRow("calc", "http://igbots.com/old/calculators/sh.html", "SH Calculator");
		AddRow("calc", "http://igbots.com/old/calculators/bank.html", "Bank Calculator");
		
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

//---------------- Crime page ----------------
if(document.location.pathname + document.location.search == '/BeO/webroot/index.php?module=Crimes') {
	if(prefs[6]) { //If remove shooting bottle is on
		del("//html/body/center/table[@class='thinline']/tbody/tr[3]/td/table/tbody/tr[6]");
	}
}

//---------------- DC+ info bar ----------------
if(document.location.pathname == '/mid.php') {
    var xpath = "//html/body/table/tbody/tr/td[4]/table/tbody/tr[2]/td"; 
    var results = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    results.snapshotItem(0).innerHTML = "<a href=bloodbank.php target=main>" + results.snapshotItem(0).innerHTML + "</a>";
}

//---------------- Status page ----------------
if(document.location.pathname == '/information.php') {
	var xpath = "//html/body/center/table/tbody/tr/td/table/tbody/tr[6]/td[2]";
	var results = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if( /\bYou\b/.test( results.snapshotItem(0).textContent ) ) {	
		capo = results.snapshotItem(0).textContent.replace('You are a capo and','').replace(/\b(.)/, function(a,b){ return b.toUpperCase() });
		results.snapshotItem(0).innerHTML = capo ;
	}
	var xpath2 = "//html/body/center/table/tbody/tr/td/table/tbody/tr[4]/td[2]";
	var res = document.evaluate(xpath2, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	res.snapshotItem(0).innerHTML = "<a href=user.php?nick=" + res.snapshotItem(0).textContent + ">"+ res.snapshotItem(0).textContent +"</a>";
}

//---------------- Omerta Beyond Logo ----------------
	var blogo = 'data:image/png;base64,' +
		'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';

//---------------- Server Choice ----------------
if(document.location.pathname == '/' || document.location.pathname == '/index.php') {
	if(form = document.getElementsByTagName('form')[0]) {
		var tr = document.createElement('tr');
		var ddl = document.createElement('select');
		for(i = 1; i <= 3; i++) {
			with(ddl.appendChild(document.createElement('option'))) {
				innerHTML = 'www' + ((i != 1) ? i : '');
				value = 'www' + ((i != 1) ? i : '');
			}
		}

		with(tr.appendChild(document.createElement('td')).appendChild(document.createElement('font'))) {
			innerHTML = '<b>Server:</b>';
			size = 1;
			color = '#cccccc';
		}
		with(tr.appendChild(document.createElement('td')).appendChild(ddl).style) {			
			width = 90;
			fontFamily = 'Verdana';
			fontSize = '10px';
			backgroundColor = '#303030';
			color = '#cccccc';
			border = '1px solid #FFFFFF';
		}
		ddl.id = 'serverchoice';
		ddl.value = form.action.replace('http://', '').replace('.barafranca.com/game-login.php', '')
		ddl.addEventListener('change', (function(t) { return function() { t.form.action = 'http://' + document.getElementById('serverchoice').value + '.barafranca.com/game-login.php'; }; })(this), false);
		onlinetr = form.getElementsByTagName('tr')[3];
		onlinetr.parentNode.insertBefore(tr, onlinetr);
	}
	
	document.getElementsByTagName('IMG')[0].src = blogo;
}

//---------------- Omerta Beyond Logo replacer ----------------
if(document.location.pathname == '/pic.php') {	
	document.getElementsByTagName('IMG')[0].src = blogo;
}

//---------------- Take all out of bank ----------------
if(document.location.pathname == '/bank.php') {
	if(prefs[7]) { //If All in/out of Bank preference is on
		var table = document.getElementsByTagName("table")[2];
		var td = table.getElementsByTagName("td")[2];
		
		if(td.textContent.substring(0, 3) == 'You') var o = 2; else var o = 9;
		
		var bank = td.textContent.replace('$', '').replace(/\,/g, '');
		td.innerHTML = '<a href="#" onclick="document.getElementsByName(\'amounttpob\')[0].value = \'' + bank +'\'; document.getElementsByTagName(\'input\')[8].checked = true;">' + td.textContent + '</a>';

		var td2 = table.getElementsByTagName("td")[o];
		var pocket = td2.textContent.replace('$', '').replace(/\,/g, '').replace('You\'ve got', '').replace('in your pocket', '');
		td2.innerHTML = '<a href="#" onclick="document.getElementsByName(\'amounttpob\')[0].value = \'' + pocket +'\'; document.getElementsByTagName(\'input\')[7].checked = true;">' + td2.textContent + '</a>';
	}
}