// ==UserScript==
// @name				Omerta Beyond
// @version				1.8
// @date				18-09-2008
// @author				vBm ( vbm AT omertabeyond DOT com )
// @author				Dopedog ( dopedog AT omertabeyond DOT com )
// @namespace				omertabeyond.com
// @description				Omerta Beyond 1.8 (The greatest addon for Omerta available!)
// @include				http://www.omertabeyond.com/*
// @include				http://barafranca.com/*
// @include				http://barafranca.nl/*
// @include				http://dm.barafranca.com/*
// @include				http://deathmatch.barafranca.com/*
// @include				http://www.barafranca.com/*
// @include				http://www.barafranca.nl/*
// @require				http://www.omertabeyond.com/gm/libs.js
// @resource	colorpicker		http://www.omertabeyond.com/gm/colorpicker.gif
// @resource	beyondLogo		http://www.omertabeyond.com/gm/logo.png
// @resource	buttonMenu		http://www.omertabeyond.com/gm/menu.png
// @resource	buttonKey		http://www.omertabeyond.com/gm/key.png
// @resource	buttonReset		http://www.omertabeyond.com/gm/reset.png
// @resource	favoriteIco		http://www.omertabeyond.com/images/favicon.png
// @resource	requesting		http://www.omertabeyond.com/gm/requesting.js
// @resource	requesting_nl		http://www.omertabeyond.com/gm/requesting_nl.js
// @resource	color			http://www.omertabeyond.com/gm/color.js
// @resource	menu			http://www.omertabeyond.com/gm/menu.js
// ==/UserScript==

// -------------------------------------------------------------------------------------
//	Most parts of this script is under GPL licence except those
// that we have permission to use. All 3rd party code was and will
// be properly credited.
//
//	This script was made for our own personal use but we decided
// to make it public because of all the support we got. You are
// welcome to use this script for your own use, you may edit the
// source but make sure you tell us what you did so we can maybe
// use it ourselves, and of course give you the credit :)
//
//	We would like to thank to all our users and to all who reported
// bugs and gave ideas for future releases.
// -------------------------------------------------------------------------------------

// get language vars
var langs = {
	en: {
		version: '_com',
		prefslink: '/gm/prefs.php',
		prefsname: 'Preferences',
		prefs: [
			"Beyond submenu on the left",//0
			"Cocaine Prices in the marquee",//1
			"Fingon's News in the info menu",//2
			"Jail Highlighter",//3
			"Disable 'shooting bottle' on crime page",//4
			"Click bank amount to fill in bank form",//5
			"Remove Jailbusting skill",//6
			"Disable Imageshack/Photobucket/XS images on profiles",//7
			"Enable autoforms (bullets, heist, bloodbank, car, crime and booze/narcs)",//8
			"Change title of the Omerta page to 'Omerta (COM)'",//9
			"Refresh Crimes/Car Nick page after waiting time is over",//10
			"Return to page after wrong image code",//11
			"Remove Capo Money texts (Non Capo users only)",//12
			"Detailed Familypage",//13
			"Remove Kill Password texts",//14
			"Add Alt+Shift+U Hotkey for buying out on I_am_in_jail page",//15
			"Detailed user profiles",//16
			"Enable extra prices popup in marquee",//17
			"Add price per bullet on Obay",//18
			"Add individual delete/reply buttons to message inbox",//19
			"Cleaned up login page with Fingons",//20
			"Add highlights @ prices page",//21
			"Remove Race form bar"//22
		],
		maxprefs: 23,
		marquee: ['Are you sure you want to travel to ','? This will cost you $ ','All Prices','Cocaine prices at: ','You are in jail','You\'re in jail and you can\'t fly at the moment','Error while traveling to '],
		newmenu: 'Detected new menu content! Please update your preferences.\nThis includes the menu AND the hotkey preferences!',
		fucked: ['You fucked up Beyond :O<br>Click the button to reset.','Make sure you DO <br>have a "Preferences" button while setting your buttons'],
		customs: " settings updated! Returning to normal menu..<br><br>Click <a href='javascript:location.href=\"menu.php\"'>here</a> if this stays longer then 5 seconds",
		bullets: ['pocket','buy',4,'bullets'],
		fingon: 5,
		status: ["None"],
		wrongcode: ["The code you", "<br><center><b>Learn to type, analphabetic!</b><br><br><a href=\"javascript:history.back()\">Click here to go back or wait a second</a></center>"],
		crimes: "Do a crime",
		timeUp: [4,6],
		cars: "Nick a car",
		profile: ["Marital status:","SMS Status","Family Buster of"],
		wealth: ["Straydog","Poor","Nouveau Riche","Very rich","Too rich to be true","Richer than God","Rich"],
		driver: ["Rookie","Co-Driver","Driver","Advanced Driver","Master Driver","Chauffeur","Advanced Chauffeur","Master Chauffeur","Racing Driver","Race Supremo","Champion"],
		requesting: GM_getResourceURL("requesting"),
		friends: "Friends:",
		loading: "off / loading..",
		stats: "back to top",
		bank: [3,"You"],
		family: "<td class='title'>Members:</td><td class='title' align='right'><span><sup>(italic is objectowner) - (underlined is capo/top3) - (colored is online > blue: member | orange: capo | red: top3) Nickreader:</sup></span><input type='checkbox' id='switch'></td>",
		smuggling: ["Pocket:","Booze","Narcs","Current Booze/Narcotics Prices","All Prices","Both"],
		obay: "Pack of bullets",
		inbox: ["Notification","(Admin message)","inviting"],
		title: "Omerta (COM)",
	},
	dm: {
		version: '_dm',
		prefslink: '/gm/prefs_dm.php',
		prefsname: 'Preferences',
		prefs: [
			"Beyond submenu on the left",//0
			"Cocaine Prices in the marquee",//1
			"Fingon's News in the info menu",//2
			"Jail Highlighter",//3
			"Disable 'shooting bottle' on crime page",//4
			"Click bank amount to fill in bank form",//5
			"Remove Jailbusting skill",//6
			"Disable Imageshack/Photobucket/XS images on profiles",//7
			"Enable autoforms (bullets, heist, bloodbank, car, crime and booze/narcs)",//8
			"Change title of the Omerta page to 'Omerta (DM)'",//9
			"Refresh Crimes/Car Nick page after waiting time is over",//10
			"Return to page after wrong image code",//11
			"Remove Capo Money texts (Non Capo users only)",//12
			"Detailed Familypage",//13
			"Remove Kill Password texts",//14
			"Add Alt+Shift+U Hotkey for buying out on I_am_in_jail page",//15
			"Detailed user profiles",//16
			"Enable extra prices popup in marquee",//17
			"Add price per bullet on Obay",//18
			"Add individual delete/reply buttons to message inbox",//19
			"Cleaned up login page with Fingons",//20
			"Add highlights @ prices page",//21
			"Remove Race form bar",//22
			"Remove 'IRC Chat' from top bar"//23
		],
		maxprefs: 24,
		marquee: ['Are you sure you want to travel to ','? This will cost you $ ','All Prices','Cocaine prices at: ','You are in jail','You\'re in jail and you can\'t fly at the moment','Error while traveling to '],
		newmenu: 'Detected new menu content! Please update your preferences.\nThis includes the menu AND the hotkey preferences!',
		fucked: ['You fucked up Beyond :O<br>Click the button to reset.','Make sure you DO <br>have a "Preferences" button while setting your buttons'],
		customs: " settings updated! Returning to normal menu..<br><br>Click <a href='javascript:location.href=\"menu.php\"'>here</a> if this stays longer then 5 seconds",
		bullets: ['pocket','buy',4,'bullets'],
		fingon: 2,
		status: ["None"],
		wrongcode: ["The code you", "<br><center><b>Learn to type, analphabetic!</b><br><br><a href=\"javascript:history.back()\">Click here to go back or wait a second</a></center>"],
		crimes: "Do a crime",
		timeUp: [4,6],
		cars: "Nick a car",
		profile: ["Marital status:","SMS Status","Family Buster of"],
		wealth: ["Straydog","Poor","Nouveau Riche","Very rich","Too rich to be true","Richer than God","Rich"],
		driver: ["Rookie","Co-Driver","Driver","Advanced Driver","Master Driver","Chauffeur","Advanced Chauffeur","Master Chauffeur","Racing Driver","Race Supremo","Champion"],
		requesting: GM_getResourceURL("requesting"),
		friends: "Friends:",
		loading: "off / loading..",
		stats: "back to top",
		bank: [3,"You"],
		family: "<td class='title'>Members:</td><td class='title' align='right'><span><sup>(italic is objectowner) - (underlined is capo/top3) - (colored is online > blue: member | orange: capo | red: top3) - Nickreader:</sup></span><input type='checkbox' id='switch'></td>",
		smuggling: ["Pocket:","Booze","Narcs","Current Booze/Narcotics Prices","All Prices","Both"],
		obay: "Pack of bullets",
		inbox: ["Notification","(Admin message)","inviting"],
		title: "Omerta (DM)",
	},
	nl: {
		version: '_nl',
		prefslink: '/gm/prefs_nl.php',
		prefsname: 'Voorkeuren',
		prefs: [
			"Beyond submenu in het menu",//0
			"Coke prijzen in de bovenbalk (Met andere prijzen popup en 'klik om te reizen')",//1
			"Fingon's Nieuws in het info menu",//2
			"Gevangenis Highlighter",//3
			"Maak 'schiet het flesje' op de Misdaden pagina onbruikbaar",//4
			"Klik op bankrekening om dit in te vullen",//5
			"Verwijder Uitbraakervaring",//6
			"Maak Imageshack/Photobucket/XS plaatjes op profielen onbruikbaar",//7
			"Automatisch invullen (kogels, heist, bloodbank, auto, misdaad en smokkelen)",//8
			"Verander de titel van de Omerta pagina naar 'Omerta (NL)'",//9
			"Ververs Misdaden/Steel een auto pagina nadat de wachttijd voorbij is",//10
			"Ga terug automatisch terug nadat je een verkeerde code hebt ingetoetst",//11
			"Verwijder 'Capo opbrengsten' tekst (alleen voor niet Capo's)",//12
			"Gedetaileerde familiepagina",//13
			"Verwijder moord wachtwoord teksten",//14
			"Voeg Alt+Shift+U sneltoets toe voor het uitkopen op de ik-zit-in-de-gevangenis pagina",//15
			"Gedetaileerd gebruikers profielen",//16
			"Voeg 'extra prijzen popup' toe in de bovenbalk",//17
			"Voeg de prijs per kogel toe op Obay",//18
			"Voeg individuele verwijder/antwoord knoppen toe aan de berichten in de inbox",//19
			"Opgeruimde login pagina met Fingons",//20
			"Voeg highlights toe @ prijzen pagina",//21
			"Verwijder Racevorm balk",//22
			"Verwijder 'IRC Chat' uit de bovenbalk"//23
		],
		maxprefs: 24,
		marquee: ['Weet je zeker dat je wil reizen naar ','? Dit kost je $ ','Alle Prijzen','Coke prijzen om: ','Je zit in de gevangenis','Je kan op dit moment niet vliegen','Fout tijdens het reizen naar'],
		newmenu: 'Nieuwe menu indeling gevonden! Selecteer opnieuw je voorkeuren.\nDit houd in de menu EN de hotkey voorkeuren!',
		fucked: ['Je hebt Beyond opgekloot :O<br>Klik op de knop om te resetten','Zorg ervoor dat je wel "Voorkeruen" in je menu hebt als je je voorkeuren selecteerd'],
		customs: " indeling geupdate! <br><br>Click <a href='javascript:location.href=\"menu.php\"'>Wacht of klik hier</a>",
		bullets: ['zak','kunt',5,'kogels'],
		fingon: 3,
		status: ["Geen"],
		wrongcode: ["De code die","<br><center><b>Leer typen, analphabeet!</b><br><br><a href=\"javascript:history.back()\">Klik hier om terug te gaan of wacht een ogenblik</a></center>"],
		crimes: "Doe een misdaad",
		timeUp: [6,8],
		cars: "Steel een auto",
		profile: ["Burgerlijke staat:","SMS Status","Familie uitbreker van"],
		wealth: ["Sloeber","Arm","Modaal","Erg rijk","Te rijk om waar te zijn","Rijker dan God","Rijk"],
		driver: ["Nieuweling","Bijrijder","Bestuurder","Ervaren Bestuurder","Perfecte Bestuurder","Chauffeur","Ervaren Chauffeur","Sublieme Chauffeur","Racer","Coureur","Kampioen"],
		requesting: GM_getResourceURL("requesting_nl"),
		friends: "Vrienden:",
		loading: "uit / ladende..",
		stats: "terug naar top",
		bank: [2,"Je"],
		family: "<td class='title'>Members:</td><td class='title' align='right'><span><sup>(schuin is objectowner) - (onderstreept is capo/top3) - (colored is online > blauw: member | oranje: capo | rood: top3) - Nicklezer:</sup></span><input type='checkbox' id='switch'></td>",
		smuggling: ["Zak: ","Drank","Drugs","Huidige Drank/Drugs Prijzen","Alle Prijzen","Beide"],
		obay: "Pak met kogels",
		inbox: ["Mededeling", "(Admin bericht)", "jou"],
		title: "Omerta (NL)",
	}
}
var url = "_" + location;//set language
lang = url.indexOf('.nl')!=-1 ? langs.nl : (url.indexOf('deathmatch.')!=-1||url.indexOf('dm.')!=-1) ? langs.dm : langs.en;

ScriptName = 'Omerta Beyond';
ScriptVersion = '1.8.0';
ScriptSubVersion = '9';
SiteLink = 'http://www.omertabeyond.com';
PrefsLink = SiteLink + lang.prefslink;
FingonUrl = 'http://89.149.221.178/~fingon';

GM_registerMenuCommand(ScriptName + ' v' + ScriptVersion, function(){ alert('You are using ' + ScriptName + '\nVersion:\t' + ScriptVersion + '\nRevision:\t' + ScriptSubVersion )});

var maxbit = lang.maxprefs; //set the amount of preferences

var prefs = decbin(getValue('prefs', 0),maxbit);//load integer prefs as a boolean array

//load any GET querys
var querys = [
	'menu_randomquote',
	'menu_cocaine',
	'menu_dailyfams',
	'families',
	'colours',
	'jailint',
	'priority',
	'newsamount',
	'custombg',
	'comments',
	'high',
	'low',
	'colour'
];
//beyond menu descriptions
var descr = [
	lang.prefsname,
	"Random Quote",
	"B/N Prices",
	"Fingon's Daily Famstats"
];
//beyond menu links
var qlinks = [
	PrefsLink,
	SiteLink+'/gm/omerta.php?randomquote',
	'/prices.php',
	FingonUrl+'/latestpicture.php'
];
if(lang.version!='_com'){descr.pop();qlinks.pop();}

var calcName = ["SH","Bank"];

//---------------- Preferences Panel ----------------
if(lh == PrefsLink + ls ) {
	var prefs = decbin(getValue('prefs', 0),maxbit);
	if(ls.length > 1) {
		if(ls.indexOf("=") == -1) {
			setValue('prefs', ls.substring(1)); //save integer prefs
			var prefs = decbin(getValue('prefs', 0),maxbit);
		}
		for(j=0; j<querys.length; j++) {
			if(GetPost(querys[j]) != '') setValue(querys[j], GetPost(querys[j]));
			if(GetParam('jailint') != '') setValue('jailint', GetParam('jailint'));
		}
	}
	var prefstr = lang.prefs;

	var string = '<tr height="25" id="prefsrow"><td colspan=4 class="toptd">Omerta Beyond : Preferences</td></tr>';
	for(i=0;i<maxbit;i=i+2) { 
		if(i!=maxbit-1) string += '<tr height=25 class="tr"><td width=25 class="td"><input type="checkbox" id="check' + i + '" name="check_list"></td><td class="td">' + prefstr[i] + '</td><td width=25 class="td"><input type="checkbox" id="check' + (i+1) + '" name="check_list"></td><td class="td">' + prefstr[(i+1)] + '</td></tr>';
		else string += '<tr height=25 class="tr"><td width=25 class="td"><input type="checkbox" id="check' + i + '" name="check_list"></td><td colspan="3" class="td">' + prefstr[i] + '</td></tr>';
	}
	string += '<tr height="50"><td colspan=4 class="bigtd"><button type="button" name="Check_All" class="checkbutton" onClick="Check(document.myform.check_list)">Check all</button>';
	string += '<button type="button" name"#" class="button" onClick="updateprefs()">Update '+lang.prefsname+'</button><br><span class="margintd">The page will be refreshed when you click the update button.</span></td></tr>';

	getID('toptable').innerHTML = string;

	for(i=0;i<maxbit;i++) getID('check' + i).checked = prefs[i];

	var family = getValue('families', '').split(",");
	var colour = getValue('colours', '').split(",");
	var priority = getValue('priority', '').split(",");
	var jailint = getValue('jailint', 6);

	var string = '<tr height="25"><td colspan=6 class="toptd">Omerta Beyond : Jailhighlighter</td></tr>';
	string += '<tr height=25 class="tr"><td class="td">&nbsp;</td><td width="210" class="td"><b>Family or Ingame nick</b></td><td width="75" class="td"><b>Colour</b></td><td width="76" class="td">&nbsp;</td><td width="50" class="td"><b>Priority</b></td><td class="td">&nbsp;</td></tr>';
	for(i=0;i<jailint;i++) {
		if(family[i] == null) family[i] = "";
		if(colour[i] == null) colour[i] = "";
		if(priority[i] == null) priority[i] = "";
		string += '<tr height=25 class="tr"><td class="td">&nbsp;</td><td class="td"><input id="family' + i + '" value="' + family[i] + '" type="text" name="#" class="inputbig"></td>';
		string += '<td class="td"><input id="colour' + i + '" value="' + colour[i] + '" type="text" name="color'+(i+1)+'" class="inputmiddle"></td>';
		string += '<td class="td"><A HREF="#" onClick="cp2.select(document.colorpickform.color'+(i+1)+',\'pick2\');return false;" NAME="pick2" ID="pick2"><img src="'+GM_getResourceURL("colorpicker")+'" border=0></A></td>';
		string += '<td class="td"><input id="priority' + i + '" value="' + priority[i] + '" type="text" name="#" class="inputsmall"></td><td class="td">&nbsp;</td></tr>';
	}
	string += '<tr height="20"><td colspan=6 class="bigtd"><button type="button" class="button" onClick="location.href = \'?jailint=' + (parseInt(jailint)+1) + '\'">Add</button> <button type="button" class="button" onClick="location.href = \'?jailint=' + (parseInt(jailint)-1) + '\'">Remove</button></td></tr>';
	string += '<tr height="50"><td colspan=6 class="bigtd"><button type="button" class="button" name="#" onClick="location.href = \'?families=\'';
	for(i=0;i<jailint;i++) string += " + document.getElementById('family" +i+ "').value.toUpperCase() + ','";
	string += " + '&colours='";
	for(i=0;i<jailint;i++) string += " + document.getElementById('colour" +i+ "').value.replace('#', '') + ','";
	string += " + '&priority='";
	for(i=0;i<jailint;i++) string += " + document.getElementById('priority" +i+ "').value + ','";
	string += '">Save Settings</button><br><span class="margintd">If someone in jail is higher than one of the settings he/she will be highlighted with the colour of the lowest priortity number</span><br>The default priority number for friends is: <b>3</b> and for family is: <b>9</b></tr>';

	getID('tablejail').innerHTML = string;
}

//---------------- Cocaine Prices ----------------
if(dlp == '/marquee.php'){
	if(prefs[1]){
		GM_xmlhttpRequest({
			method: 'GET',
			url: SiteLink+'/gm/prices'+lang.version+'.xml.php',
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'application/xml,text/xml' },
			onload: function(resp) {
				var marquee = $X('//div');
				marquee.innerHTML = "";

				var parser = new DOMParser();
				var dom = parser.parseFromString(resp.responseText, "application/xml");

				function getPrice(drug, city){return dom.getElementsByTagName(drug)[0].getElementsByTagName(city.replace(' ', ''))[0].textContent;}

				var p = new Array;
				var q = new Array;
				var p_C = ["Baltimore","Chicago","New York","Philadelphia","Detroit","Las Vegas","Corleone","Palermo"];
				var p_id = ["6","1","3","5","nul","4","7","2"];
				for(i=0;i<=7;i++) { p[i]=getPrice('Cocaine',p_C[i]); q[i]=p[i]; }

				var max = p.sort(function(a,b){return b-a})[0];
				var min = p[(p.length-1)];

				i=0; q.forEach(function($n){
					if($n==min) q[i]='<span style="color:#' + getValue('low', '00ff00') + ';">' + $n + '</span>';
					if($n==max) q[i]='<span style="color:#' + getValue('high', 'ff0000') + ';">' + $n + '</span>';
				i++; });
				var time = dom.getElementsByTagName('Time')[0].textContent;
				var pb, pc, pn, pp, pd, pl, pco, ppa;

				pb='Baltimore: '+q[0];
				pc='Chicago: '+q[1];
				pn='New York: '+q[2];
				pp='Philadelphia: '+q[3];
				pd='Detroit: '+q[4];
				pl='Las Vegas: '+q[5];
				pco='Corleone: '+q[6];
				ppa='Palermo: '+q[7];

				var hoverdiv = cEL('div');
				hoverdiv.id = 'hiddenbox';
				hoverdiv.style.display = 'none';
				hoverdiv.style.position = 'absolute';
				hoverdiv.style.backgroundColor = '#000000';
				hoverdiv.style.border = 'solid white 1px';
				hoverdiv.style.fontSize = "9px";
				hoverdiv.style.top = "2px";
				hoverdiv.style.width = "520px";
				hoverdiv.style.textAlign = "center";
				marquee.appendChild(hoverdiv);

				function hoverlink(city, priceStr) {
					var link = cEL('a');
					link.href = "#";
					link.style.color = '#' + getValue('colour', 'ffffff');
					link.style.fontSize = '10px';
					if(city == "Palermo" || city == "Corleone" || city == "Las Vegas" || city == "Detroit") link.addEventListener('mouseover', function(event) { hovermenu(city, event.clientX - 525) }, true);
					else link.addEventListener('mouseover', function(event) { hovermenu(city, event.clientX + 25) }, true);
					link.addEventListener('mouseout', function(event) { hovermenuout() }, true);
					link.innerHTML = priceStr;
					return link;
				}

				function hovermenu(city, x) {
					var hoverdiv = getID('hiddenbox');
					hoverdiv.style.display = 'inline';
					hoverdiv.style.left = x + "px";
					hoverdiv.innerHTML = 'Morphine: ' + getPrice("Morphine", city) + ' || ' + 'Heroin: ' + getPrice("Heroin", city) + ' || ' +
					'Opium: ' + getPrice("Opium", city) + ' || ' + 'Whiskey: ' + getPrice("Whiskey", city) + ' || ' +
					'Amaretto: ' + getPrice("Amaretto", city) + ' || ' + 'Rum: ' + getPrice("Rum", city);
				}

				function flytolink(city, priceStr, priceToFly, cityId){
					var link = cEL('a');
					link.href = "#";
					link.id = city;
					link.style.color = '#' + getValue('colour', 'ffffff');
					link.style.fontSize = '10px';
					link.addEventListener('click',function(){flyto(city, priceToFly, cityId)},true);

					if(prefs[17]){
						if(city == "Palermo" || city == "Corleone" || city == "Las Vegas" || city == "Detroit") { link.addEventListener('mouseover', function(event) { hovermenu(city, event.clientX - 525); this.style.textDecoration='underline' }, true); }
						else { link.addEventListener('mouseover', function(event) { hovermenu(city, event.clientX + 25); this.style.textDecoration='underline' }, true); }
						link.addEventListener('mouseout', function(event) { getID('hiddenbox').style.display = 'none'; this.style.textDecoration='none' }, true);
					}
					else {
						link.addEventListener('mouseover', function() { this.style.textDecoration='underline' }, true);
						link.addEventListener('mouseout', function() { this.style.textDecoration='none' }, true);
					}
					link.innerHTML = priceStr;
					return link;
				}

				function flyto(city, costs, cityid) {
					var del = confirm(lang.marquee[0] + city + lang.marquee[1] + costs);
					if (del == true) {
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://' + dlh + '/travel.php',
							onload: function(resp) {
								if(resp.responseText.match("<script ") != null) {
									GM_xmlhttpRequest({
										method: 'GET',
										url: 'http://' + dlh + '/travel.php?whereto=' + cityid,
										onload: function(resp) {
											try {
												if(resp.responseText.match(lang.marquee[4])) alert(lang.marquee[5]);
												else alert(resp.responseText.slice((resp.responseText.indexOf('</head>'))+7).replace(/<\S[^><]*>/g,''));
											}
											catch(e){alert(lang.marquee[6] + city + "...");}
										}
									});
								}
								else { alert(resp.responseText.slice((resp.responseText.indexOf('</head>'))+7).replace(/<\S[^><]*>/g,'')); }
							}
						});
					}
				}

				var span = cEL('span');
				var priceandtime = cEL('span');

				span.appendChild(priceandtime);
				i=0; p.forEach(function($n){
					span.appendChild(flytolink(p_C[i], p_C[i]+': '+q[i], 500, p_id[i]));
					var separator = cEL('span');
					separator.innerHTML = ' || ';
					span.appendChild(separator);
				i++; });

				var link = cEL('a');
				link.href = "prices.php";
				link.target = 'main';
				link.innerHTML = lang.marquee[2];
				if(getValue('bold', '0') == '1') link.style.fontWeight = 'bold';
				link.style.color = '#' + getValue('colour', 'ffffff');
				link.style.fontSize = '10px';
				link.addEventListener('mouseover',function(){this.style.textDecoration='underline' }, true);
				link.addEventListener('mouseout',function(){this.style.textDecoration='none' }, true);
				span.appendChild(link);
				priceandtime.innerHTML = lang.marquee[3] + time + ' || ';
				span.style.color = '#' + getValue('colour', 'ffffff');
				span.style.fontSize = '10px';
				marquee.appendChild(span);

				window.onload = setTimeout("window.location.reload()", 120000);
			}
		});
	}
}

//---------------- Menu and submenus ----------------
if(dlp == '/menu.php') {
//change all users link
	db.innerHTML = db.innerHTML.replace('allusers.php', 'allusers.php?start=0&order=lastrank&sort=DESC');
//--add additional submenus
	function appMenu(x){
		innerHTML += '</tbody></table></div></td></tr></tbody>';
		subMenu.innerHTML = innerHTML;
		subMenu.setAttribute('cellspacing','0');
		subMenu.setAttribute('cellpadding','0');

		var table = $X('/html/body/table/tbody/tr/td/table['+x+']');
		table.parentNode.insertBefore(subMenu, table);
	}
	var xp = '/html/body/table/tbody/tr/td/table[3]/tbody/tr[2]/td/div/table/tbody';
	if(prefs[0]){ //add beyond menu
		var subMenu = cEL('table');
		var innerHTML = '<tbody><tr><th onclick="Menu.toggle(this);">Beyond</th></tr><tr><td><div style="overflow: hidden;"><table cellspacing="0" cellpadding="0"><tbody>';
		for(i=0;i<qlinks.length;i++) innerHTML += '<tr><td><a target="main" onmousedown="return false;" href="'+ qlinks[i] +'" class="menuLink">'+descr[i]+'</a></td></tr>';
		appMenu(3);
	}
	else $X(xp).innerHTML = '<tr><td><a target="main" onmousedown="return false;" href="'+PrefsLink+'" class="menuLink">'+lang.prefsname+'</a></td></tr>' + $X(xp).innerHTML;

	var subMenu = cEL('table');//add calcs menu
	var innerHTML = '<tbody><tr><th onclick="Menu.toggle(this);">Calculators</th></tr><tr><td><div style="overflow: hidden;"><table cellspacing="0" cellpadding="0"><tbody>';
	for(i=0;i<calcName.length;i++) {
		innerHTML += '<tr><td><a target="main" onmousedown="return false;" href="'+ SiteLink + '/old/calculators/'+ calcName[i].toLowerCase() + '.html';
		innerHTML += '" class="menuLink">'+calcName[i]+' Calculator</a></td></tr>';
	}
	appMenu(7);
//--end adding menus
//--add personal menubuttons
	if(dls.indexOf('buttons') != -1) {
		if(GetPost('add')==1){
			var ownMenuNames = getValue('ButtonNames','');
			var ownMenuUrls = getValue('ButtonUrls','');
			var ownMenuSubs = getValue('ButtonSubs','');
			var ownMenuPoss = getValue('ButtonPoss','');
			setValue('ButtonNames',ownMenuNames + (ownMenuNames!='' ? ',' : '') + GetPost('name'));
			setValue('ButtonUrls',ownMenuUrls + (ownMenuUrls!='' ? ',' : '') + GetPost('url'));
			setValue('ButtonSubs',ownMenuSubs + (ownMenuSubs!='' ? ',' : '') + GetPost('sub'));
			setValue('ButtonPoss',ownMenuPoss + (ownMenuPoss!='' ? ',' : '') + GetPost('pos'));
		}
		if(GetPost('rem')==1){
			var delButtonName = GetPost('name');
			var ownMenuNames = getValue('ButtonNames','').split(',');
			var ownMenuUrls = getValue('ButtonUrls','').split(',');
			var ownMenuSubs = getValue('ButtonSubs','').split(',');
			var ownMenuPoss = getValue('ButtonPoss','').split(',');
			var done = false
			for(i=0;i<=ownMenuNames.length-1;i++) {
				if(ownMenuNames[i]==delButtonName) {
					ownMenuNames.splice(i,1);
					ownMenuUrls.splice(i,1);
					ownMenuSubs.splice(i,1);
					blankPos = ownMenuPoss.splice(i,1);
					done = true;
				}
				else if(done && ownMenuPoss[i] > blankPos) ownMenuPoss[i] --;
			}
			setValue('ButtonNames',ownMenuNames.toString());
			setValue('ButtonUrls',ownMenuUrls.toString());
			setValue('ButtonSubs',ownMenuSubs.toString());
			setValue('ButtonPoss',ownMenuPoss.toString());
		}
	}

	if(dls.indexOf('keys')==-1 && dls.indexOf('menu')==-1) {//apply add/remove buttons
		var menuHeadXp = '//th', i=1;
		$x(menuHeadXp).forEach(function($n){
			$n.innerHTML = '<span onClick="Menu.toggle(document.getElementById(\'head'+i+'\'))">' + $n.innerHTML + '</span>&nbsp;<span id="add'+i+'" onClick="addButton(this.getAttribute(\'id\'))" title="Add a button"><font size="3" color="#FFFFFF"><b>+</b></font></span> <span id="rem'+i+'" onClick="remButton(this.getAttribute(\'id\'))" title="Remove a button"><font size="3" color="#FFFFFF"><b>-</b></font></span>';
			$n.removeAttribute('onClick','');
			$n.setAttribute('id','head'+i);
			$n.parentNode.parentNode.getElementsByTagName('table')[0].setAttribute('id','menu'+i);
			i++;
		});
	}
	extJS(GM_getResourceURL("menu"));
	function addButton(name,url,sub,pos){
		var sub = sub.replace('menu','');
		var newButton = cEL('td');
		newButton.innerHTML = '<a class="menuLink" target="main" custom="true" onmousedown="return false;" href="'+url+'">'+name+'</a>';
		var newTr = cEL('tr');
		newTr.appendChild(newButton);
		
		if(getID('menu'+sub).getElementsByTagName('tr').length < pos) { 
			var tr = $X('/html/body/table/tbody/tr/td/table['+sub+']/tbody/tr[2]/td/div/table/tbody/tr['+(pos-1)+']');
			tr.parentNode.insertBefore(newTr, tr.nextSibling); 
		}
		else {
			var tr = $X('/html/body/table/tbody/tr/td/table['+sub+']/tbody/tr[2]/td/div/table/tbody/tr['+pos+']');
			tr.parentNode.insertBefore(newTr, tr);
		}
	}

	var ownMenuNames = getValue('ButtonNames','');
	var ownMenuUrls = getValue('ButtonUrls','');
	var ownMenuSubs = getValue('ButtonSubs','');
	var ownMenuPoss = getValue('ButtonPoss','');

	if(ownMenuNames!=''){
		var MenuNames = ownMenuNames.split(',');
		var MenuUrls = ownMenuUrls.split(',');
		var MenuSubs = ownMenuSubs.split(',');
		var MenuPoss = ownMenuPoss.split(',');
		for(i=0;i<MenuNames.length;i++)	{ addButton(MenuNames[i],MenuUrls[i],MenuSubs[i],MenuPoss[i]); }
	}
//--end personal menubuttons
//--start assembling vars
	if(dls.indexOf('reset') != -1) setValue('submenus','0'); //mode = oh noes!
	var submenus = getValue('submenus',0);

	//get # of submenu's
	var tables = $X('/html/body/table/tbody/tr/td').getElementsByTagName('table').length;
	var subs = tables/2;
	if(db.innerHTML.search('Crew</th>') != -1) subs--;//check for crew submenu

	//get # of buttons in submenu's
	var buttons = new Array();
	for(i=1,j=0;i<=subs;i++,j++){
		var num = parseInt($X('/html/body/table/tbody/tr/td/table['+i+']/tbody/tr[2]/td/div/table/tbody').getElementsByTagName('tr').length);
		buttons[j] = num;
		if(i==subs) buttons[j]--;
	}
	if(submenus!=0 && subs == submenus) { //don't act if ( nothing is saved in GM || saved # of subs != current # of subs )
		//get menuprefs from GM or set ghostprefs
		var menuprefs = new Array;
		if(getValue('buttonpref1','') != '') for(i=0;i<=subs-1;i++) menuprefs[i] = getValue('buttonpref'+(i+1));
		else if(getValue('keypref1','') != '') for(i=0;i<=subs-1;i++) menuprefs[i] = getValue('keypref'+(i+1)).replace(/[^a-z.]/ig,'1');

		//get keyprefs from GM or set ghostprefs
		var keyprefs = new Array;
		if(getValue('keypref1','') != '') for(i=0;i<=subs-1;i++) keyprefs[i] = getValue('keypref'+(i+1));
		else if(getValue('buttonpref1','') != '') for(i=0;i<=subs-1;i++) keyprefs[i] = getValue('buttonpref'+(i+1)).replace(/[0-9.]/g,'*');

		var mprefs = new Array(); var i=0;//see if submenu can be deleted totaly
		for(i=0;i<=menuprefs.length-1;i++) mprefs[i] = menuprefs[i].indexOf('1')==-1 ? i==menuprefs.length-1 ? 1 : 0 : 1;
	}
	var QL_xp ='//td[@class="container"]'
//--end assembling vars
//--customs script
	//add buttons
	var buttonMenu = GM_getResourceURL("buttonMenu");
	var buttonKey = GM_getResourceURL("buttonKey");
	var buttonReset = GM_getResourceURL("buttonReset");
	$X(QL_xp).innerHTML = $X(QL_xp).innerHTML + 'Menu: <img onMouseover="style.cursor=\'pointer\'" title="Customize Menu" onClick="location.href=\'menu.php?menu\'" src="'+buttonMenu+'"> <img onMouseover="style.cursor=\'pointer\'" title="Customize Hotkeys" onClick="location.href=\'menu.php?keys\'" src="'+buttonKey+'"> <img onMouseover="style.cursor=\'pointer\'" title="Reset menu" onClick="location.href=\'menu.php?reset\'" src="'+buttonReset+'">';
	//check 'mode' and add corresponding html
	if(!dls || dls.indexOf('reset') != -1 || dls.indexOf('buttons') != -1){//mode=normal or reset
		if(submenus != 0){
			//check current menu matches with saved prefs
			var uptodate=1;var i=0;
			if(menuprefs != '' && menuprefs != null && menuprefs != 'undefined') {
				if(menuprefs.length!=subs){uptodate=0;}
				if(menuprefs.length!=keyprefs.length){uptodate=0;}
				buttons.forEach(function($n){if($n != menuprefs[i].length)uptodate=0;i++;});
			}
			else uptodate=0;;
			if(uptodate==0){alert(lang.newmenu);setValue('submenus','0');}
			else { //clear to go
				for(i=subs;i>=1;i--){
					if(mprefs[i-1]==0) del('/html/body/table/tbody/tr/td/table['+i+']');
					else {
						for(j=buttons[i-1];j>=1;j--) { //delete button or add hotkey
							var xp_tr = '/html/body/table/tbody/tr/td/table['+i+']/tbody/tr[2]/td/div/table/tbody/tr['+j+']';
							var kpref = keyprefs[i-1].slice(j-1,j);

							if(menuprefs[i-1].slice(j-1,j) == 0) del(xp_tr);
							else if(kpref != '*') {
								var but = $X(xp_tr + '/td/a');
								but.accessKey = kpref;
								but.innerHTML = but.innerHTML + " ("+ kpref.toUpperCase() +")"
							}
						}
					}
				}
			}
		}
		//checker
		if(db.innerHTML.indexOf(lang.prefsname) == -1) db.innerHTML = '<br><p style="color:yellow; font-weight:bold; text-align: center;">'+lang.fucked[0]+'</p><p style="color:#DFDFDF; text-align: center;">'+lang.fucked[1]+'</p><br><center><input type="button" onclick="location.href=\'menu.php?reset\'" value="Reset!" style="width: 70px; height: 22px; font-weight: bold;"/></center>';
	}
	else {
		//add style for customs
		var style = '';
		style+='#beyondadd{padding-left:5px;width:20px;background:#808F8F;BORDER-BOTTOM:#707f7f 1px solid;}';
		style+='#beyondadd input{width:20px;}';
		style+='a.menuOmertaBeyond{background-color: #808f8f;border-bottom: 1px solid #707f7f;color: #fff;display: block;font-size: 11px;margin: 0;padding: 5px 5px;text-decoration: none;}';
		style+='a.menuOmertaBeyond:hover{background-color: #606f6f;color: #dddd00;text-decoration: none;}';
		GM_addStyle(style);

		if(dls.indexOf('?newmenu=') != -1) var mode = ['Menu','newmenu','rawmenuprefs','buttonpref'];
		if(dls.indexOf('?newkeys=') != -1) var mode = ['Hotkey','newkeys','rawkeyprefs','keypref'];
		if((dls.indexOf('?newmenu=') != -1) || (dls.indexOf('?newkeys=') != -1)) { //mode = updated menu/keys
			$X('html/body').innerHTML = "<font color='red'>" + mode[0] + lang.customs + "</font>" + $X('html/body').innerHTML;
			var newprefs = GetParam(mode[1]);
			setValue(mode[2],newprefs);
			for(i=0;i<=buttons.length-1;i++) {
				setValue(mode[3]+(i+1),newprefs.slice(0,buttons[i]));
				var newprefs = newprefs.slice(buttons[i]);
			}
			setValue('submenus',i);
			setTimeout("location.href='menu.php'", 2000);
		}
		var script = cEL("script");
		script.setAttribute('type','text/javascript');
		script.innerHTML = 'function checkKey(id){for(i=0;i<=document.getElementsByTagName(\'input\').length-1;i++)if(document.getElementsByTagName(\'input\')[i].value == document.getElementById(id).value && \'ip\'+(i+1) != id){ alert("You\'re already using that key!"); document.getElementById(id).value = \'\'; i=100; }}';
		$X("//head").appendChild(script);
		//mode = customize
		if(dls.indexOf('menu') != -1) var upmenu=1;
		if(dls.indexOf('keys') != -1) var upkeys=1;
		if(upmenu || upkeys) {
			window.addEventListener("load", function() {
				var raw = upmenu ? getValue('rawmenuprefs','*') : getValue('rawkeyprefs','0');
				for(i=1,q=1;i<=subs;i++){
					for(j=1;j<=buttons[i-1];j++,q++) {
						var xp_tr = '/html/body/table/tbody/tr/td/table['+i+']/tbody/tr[2]/td/div/table/tbody/tr['+j+']';
						var xp_a = xp_tr + '/td/a';

						var href = $X(xp_a).href;
						var content = $X(xp_a).innerHTML;
						var prefx = raw.slice(q-1,q)

						if(upmenu){
							$X(xp_tr).innerHTML = '<td id="beyondadd"><input type="checkbox" checked="0" id="ip'+q+'"></td><td><a target="main" onmousedown="return false;" href="'+href+'" class="menuOmertaBeyond">'+content+'</a></td>';
							if(prefx == '0' && submenus != 0) getID('ip'+q).checked = false;
						}
						else {
							$X(xp_tr).innerHTML = '<td id="beyondadd"><input type="text" onChange="checkKey(this.id)" style="text-align: center;" maxlength="1" id="ip'+q+'"/></td><td><a target="main" onmousedown="return false;" href="'+href+'" class="menuOmertaBeyond">'+content+'</a></td>';
							if(raw != '0' && prefx != '*' && submenus != 0) getID('ip'+q).value = prefx;
						}
					}
				}
			}, true);

			//get # of inputs
			for(i=1,q=1;i<=subs;i++){for(j=1;j<=buttons[i-1];j++,q++){inputs=q+1;}}

			//add save button
			var save = upmenu ? 'var query=\'\';for(i=1;i<='+(inputs-1)+';i++){query += document.getElementById(\'ip\'+i).checked;}location.search = \'?newmenu=\'+query.replace(/false/g,0).replace(/true/g,1);' : 'var query=\'\';for(i=1;i<='+(inputs-1)+';i++){query += document.getElementById(\'ip\'+i).value;if(document.getElementById(\'ip\'+i).value==\'\'){query +=\'*\'}}location.search = \'?newkeys=\'+query;';

			var xp1 = '//td[@class="container"]';
			var str = '';
			str += '<input type="button" onclick="'
			str += save;
			str += '" value="Save!" style="width: 70px; height: 22px; font-weight: bold;"/>';
			$X(QL_xp).innerHTML = str;
		}
		$X(QL_xp).setAttribute("colspan", "2");//addept quick lookup colspan to match customs lay-out
	}
}

//---------------- Status page ----------------
if(dlp == '/information.php') {
	var x, capo, weaponXP;
	x = '/html/body/center/table/tbody/tr/td/table/tbody/tr[';
	weaponXP = '/html/body/center/table/tbody/tr/td[3]/table[2]/tbody/tr[5]/td[2]';

	if(prefs[6]) del("/html/body/center/table/tbody/tr/td[3]/table[1]/tbody/tr[6]");//if remove Jailbusting Skill is on
	if(prefs[22]) { 
		if (prefs[6]) { del("/html/body/center/table/tbody/tr/td[3]/table[1]/tbody/tr[6]") }//if remove both 'Race form bar' and 'Jailbusting Skill' is on
		else del("/html/body/center/table/tbody/tr/td[3]/table[1]/tbody/tr[7]");//if remove Race form bar is on
	}
	if(prefs[12]) { //if remove Capo Money is on
		capo = $X(x+'5]/td[2]').textContent.split(' ')[0];
		$X(x+'5]/td[2]').innerHTML = /Capo/.test(capo) ? $X(x+'5]/td[2]').innerHTML : "<a href=user.php?nick=" + capo + ">"+ capo +"</a>"
	}
	$X(x+'3]/td[2]').innerHTML = "<a href=user.php?nick=" + getTXT(x+'3]/td[2]') + ">"+ getTXT(x+'3]/td[2]') +"</a>";
	$X(x+'12]/td[2]').innerHTML = "<a href=user.php?nick=" + getTXT(x+'12]/td[2]').split("\t")[1] + ">"+ getTXT(x+'12]/td[2]').split("\t")[1] +"</a>";
	if(/\bTranslation\b/.test($X(x+'6]/td[2]').textContent)) $X(x+'6]/td[2]').innerHTML = "<a href=http://dev.barafranca.com/translate/ target=_blank>"+ $X(x+'6]/td[2]').textContent +"</a>";
	if(lang.status[0].match($X(weaponXP).textContent)) $X(weaponXP).innerHTML = "<a href=shop.php><b>"+ $X(weaponXP).textContent +"</b></a>";
}

//--------------- Bullet form --------------
if(dlp == '/bullets2.php' && prefs[8]){//If auto fill form is on
	var xpath, td, str, sp1, sp2, str, bfxp, bftd, bfstr, bfsp1, bfsp2, bfstr, BFTextXp, BFText;

	if(db.innerHTML.search(/table/i) != -1) {
		xpath = "/html/body/center/table/tbody/tr[3]/td";
		td = $I(xpath);
		str = td.slice(td.search(lang.bullets[0]));
		sp1 = str.search(lang.bullets[1]) + lang.bullets[2];
		sp2 = str.search(lang.bullets[3]) - 1;
		str = str.slice(sp1,sp2);

		$X('//input').value = (str >= 400) ? 400 : str;

		bfxp = "/html/body/center[2]/table/tbody/tr[3]/td";
		bftd = $I(bfxp);
		bfstr = bftd.slice(bftd.search(lang.bullets[0]));
		bfsp1 = bfstr.search(lang.bullets[1]) + lang.bullets[2];
		bfsp2 = bfstr.search(lang.bullets[3]) - 1;
		bfstr = bfstr.slice(bfsp1,bfsp2).replace(/,/g,'');
		$x('//input')[4].value = bfstr;

		window.addEventListener("load", function() { $x('//input')[1].focus(); }, true);
	}
	BFTextXp = '/html/body/center[2]/table/tbody/tr/td'
	BFText = $I(BFTextXp).split(' ');
	$I(BFTextXp,BFText[0] + " " + BFText[1] + " " + BFText[2] + " " +  "<a href=user.php?nick=" + BFText[3].replace('\.','').toLowerCase() + "><b><i>"+ BFText[3] +"</i></b></a>"+ " " + BFText[4] + " " + BFText[5] + " " +  "<i>" + BFText[6] + "</i>" + " " + BFText[7]);
}

//---------------- Fingons News ----------------
if(dlp == '/info.php') {
	if(prefs[2]) { //If Fingon's News menu preference is on
		var url = FingonUrl+'/beyond-news.php?num=' + getValue('newsamount', 5) + '&version='+lang.fingon+'&css='+ $X('//link').href +'&url=' + dlh;
		if(getValue('custombg', '') != '') url += '&pron=' + getValue('custombg');
		location.href = url;
	}
}

//---------------- Jail Highlighter and Jail autoform ----------------
if(dlp == '/jail.php' && prefs[3]) {//If Jail highlighter preference is on
	var words, bgColors, priority, thispri, flag, xpath, results;
	words = getValue('families', '').split(",");
	bgColors = getValue('colours', '').split(",");
	priority = getValue('priority', '').split(",");
	thispri = new Array();
	flag = 1;
	for(p=9;p>=0;p--) {
		for(i=0;i<words.length;i++) {
			if(priority[i] != p) continue;
			xpath = "//tr[contains(translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'" + words[i] + "')]";
			results = document.evaluate(xpath, document, null, 7, null);
			for(j=results.snapshotLength-1;j>=0;j--) {
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
	if(flag==1){
		var radios = $x('//input[@type="radio"]');
		radio = radios[Math.floor(radios.length*Math.random())];
		radio.checked = true;
	}
	if($X('//input') != null) $x('//input')[0].focus();// set the focus to the input box;
}
if(dlp == '/iminjail.php') {//In jail type box focus
	if($X('//input') != null) $X('//input').focus();
	var x = db.innerHTML;
	if(prefs[15] && x.indexOf("<img") != -1) $X("/html/body/table/tbody/tr/td/a").accessKey = 'u';//buy out hotkey
}

//---------------- wrongcode --------------
if(dlp + dls == '/BeO/webroot/index.php?module=Crimes&action=docrime' || dlp + dls == '/BeO/webroot/index.php?module=Cars&action=docar' || dlp == '/smuggling.php') {
	if(prefs[11]) {
		if(db.innerHTML.search(lang.wrongcode[0]) != -1) {
			db.innerHTML = lang.wrongcode[1];
			setTimeout("history.back()",1000);
		}
	}
}

//----------------- Crime Page -------------------
if(dlp + dls == '/BeO/webroot/index.php?module=Crimes') {
	if (db.innerHTML.search(/table/i) != -1) {
		if(prefs[4]) $x('//input')[6].setAttribute("disabled","true"); //If remove shooting bottle is on
		if(prefs[8]){ //If autoforms are on
			if(prefs[4]) {
				$x('//input')[6].setAttribute("disabled","true");
				$x('//input')[5].checked = true;
			}
			else $x('//input')[6].checked = true;
		}
	}
	else if(prefs[10]) refreshIn();
}

//----------------- Cars Page --------------------
if(dlp + dls == '/BeO/webroot/index.php?module=Cars') {
	var xpath, y, x, body;
	if(db.innerHTML.search(/table/i) != -1) {
		if(prefs[8]){ //If auto select highest percentage at Car Nick is on
			body = db.innerHTML;
			if(body.search(lang.cars) != -1) {
				for(i=1;i<=4;i++) { //Get percentages
					xpath = "/html/body/center/table/tbody/tr[3]/td/form/table/tbody/tr[" + i + "]/td[3]"
					eval("p" +i+ "= gsPATH(xpath)")
				}
				x = Math.max(p1,p2,p3,p4); //Select Highest percantage
				if(p1 == x) $x('//input').checked = true;
				if(p2 == x) $x('//input')[2].checked = true;
				if(p3 == x) $x('//input')[3].checked = true;
				if(p4 == x) $x('//input')[4].checked = true;
			}
		}
		if($x('//input')[5] != null) $x('//input')[5].focus();
	}
	else if(prefs[10]) refreshIn();
}
//---------------- DC+ info bar ----------------
if(dlp == '/mid.php') {
	var x, healthXpath, healthXpathBar, ksXpath, ksXpathBar, boXpath;
	x = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[';
	healthXpath = '/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td[5]';
	healthXpathBar = x+'2]/td[6]/dl/dt';
	ksXpath = x+'3]/td[5]';
	ksXpathBar = x+'3]/td[6]/dl/dt';
	boXpath = x+'4]/td[5]';
	if(!$X(healthXpath) == 0) $I(healthXpath,"<a href=bloodbank.php target=main>" + $I(healthXpath) + "</a>");
	if(!$X(healthXpathBar) == 0) $I(healthXpathBar,"<a href=bloodbank.php target=main>" + $I(healthXpathBar) + "</a>");
	if(!$X(boXpath) == 0) $I(boXpath,"<a href=jail.php target=main>" + $I(boXpath) + "</a>");
	if(!$X(ksXpath) == 0) $I(ksXpath,(Math.round(getTXT(ksXpathBar).replace('%','')) >= '72') ? "<a href=BeO/webroot/index.php?module=Crimes target=main>" + $I(ksXpath) + "</a>" : "<a href=range.php target=main>" + $I(ksXpath) + "</a>");
	setTimeout("window.location.reload()", '60000');
}

//---------------- User Profile ---------------------
if((dlp + dls) == ('/user.php' + dls)){
	if(prefs[7]) { // if Remove ImageShack / PhotoBucket / XS links option is on
		var xpath = "//img[contains(@src, 'imageshack.us')] | //img[contains(@src, 'photobucket.com')] | //img[contains(@src, 'xs.to')]";
		var results = document.evaluate(xpath, document, null, 7, null);
		for (i=0;i<results.snapshotLength;i++) {
			var img = results.snapshotItem(i), link = cEL('a'), br = cEL('br');
			link.setAttribute('href',img.getAttribute('src'));
			link.innerHTML = img.getAttribute('src');
			img.parentNode.appendChild(link);
			img.parentNode.appendChild(br);
			link.parentNode.removeChild(img);
		}
	}
	if(prefs[16] && db.innerHTML.search('table') != -1) { //if detailed w/r is on
		//Wealth
		var tr, x, y, z, xpath;
		tr = 11;
		x = db.innerHTML.search(lang.profile[0]);
		y = db.innerHTML.search(lang.profile[1]);
		z = db.innerHTML.search(lang.profile[2]);

		if(x==-1) tr--;
		if(y==-1) tr--;
		if(z==-1) tr--;
		xpath = "/html/body/center/table/tbody/tr["+tr+"]/td[2]";
		var wlth = $I(xpath);

		var kind = [""," (0 - 50.000)"," (50.000 - 100.000)"," (100.000 - 500.000)"," (1.000.000 - 5.000.000)"," (5.000.000 - 15.000.000)"," ( > 15.000.000)"," (500.000 - 1.000.000)"], i=1;
		lang.wealth.forEach(function($n){ if(wlth.search($n) != -1) { $I(xpath,$I(xpath) + kind[i]); i=0; } if(i!=0) i++; });

		//Raceform
		xpath = "/html/body/center/table/tbody/tr["+(tr+1)+"]/td[2]";
		var rf = $I(xpath);

		var q = lang.driver;
		for(i=0;i<=10;i++) if(rf.indexOf(q[i]) == 0) $I(xpath,(i+1) + " - " + $I(xpath));

		//Nickreader
		extJS(lang.requesting);
		var style = '';
		style += ".pop{position: relative;z-index:0;}";
		style += ".pop:hover{background-color:transparent;z-index:1;text-decoration:none;}";
		style += ".pop span{position:absolute;background-color:#A8A8A8;padding:5px;left:-1000px;width:250px;border:1px dashed gray;visibility:hidden;color:black;text-decoration:none;}";
		style += ".pop:hover span{visibility:visible;top:+45px;left:-20px;text-decoration:none;}";
		style += ".lol:hover {text-decoration:underline;}";
		GM_addStyle(style);

		for(j=1;j<=2;j++) {//both lines
			xpath = "/html/body/center/table/tbody"; //get friends row

			var trs = $X(xpath).getElementsByTagName('tr').length;
			for(i=1;i<=trs;i++) {
				xpath = "/html/body/center/table/tbody/tr[" + i + "]/td";
				var trcontent = $X(xpath).innerHTML;
				if(trcontent.indexOf(lang.friends) != -1){ tr = i; i = trs; }
			}

			xpath = "/html/body/center/table/tbody/tr[" + tr + "]/td[2]/table/tbody/tr/td[" + j + "]"; //get nicks
			var num = $X(xpath).getElementsByTagName('a').length*2;
			var a = $X(xpath).getElementsByTagName('a');
			for(i=0;i<num;i=i+2) {//add popup
				var nick = $X(xpath).getElementsByTagName('a')[i].innerHTML;
				a[i].setAttribute("class","pop");
				a[i].innerHTML = "<a class='lol'>" + a[i].innerHTML + "</a><span id='" + j + i + "'> "+lang.loading+"</span>";
				var str = "$X(xpath).getElementsByTagName('a')["+i+"].setAttribute(\"onMouseover\",\"makeHttpRequest('user.php?nick=" + nick + "','" + j + i + "')\")";
				eval(str);
			}
		}
	}
}

//---------------- Take all out of bank ----------------
if(dlp == '/bank.php') {
	var table, td, td2, bank, pocket;
		if(prefs[5]) { //If All in/out of Bank preference is on
			table = $x("//table")[2];
			td = table.getElementsByTagName("td")[2];

			if(td.textContent.substring(0, lang.bank[0]) == lang.bank[1]) var o = 2; else var o = 9;
			
			td2 = table.getElementsByTagName("td")[o];

			bank = td.textContent.replace(/[^0-9.]/g,'');
			td.innerHTML = '<a href="#" onclick="document.getElementsByName(\'amounttpob\')[0].value = \'' + bank +'\'; document.getElementsByTagName(\'input\')[8].checked = true;">' + td.textContent + '</a>';
			pocket = td2.textContent.replace(/.*\$| .*/,'').replace(/[^0-9.]/g,'');
			td2.innerHTML = '<a href="#" onclick="document.getElementsByName(\'amounttpob\')[0].value = \'' + pocket +'\'; document.getElementsByTagName(\'input\')[7].checked = true;">' + td2.textContent + '</a>';
		}
}

//---------------- Garage Crusher ----------------
if(dlp == '/garage.php') {
	var rows = $x('//tr').length;

	var xpath = "/html/body/form/center/table/tbody/tr[" + rows + "]/td"//add menu
	var string = '<td><label><input type="checkbox" checked="1" ';
	$I(xpath,$I(xpath) +
	' <br><br><hr><br>' +
	' Select if worth is <select size="1" id="X"><option value="1">under</option><option value="0">above</option></select>: $ <input type="text" value="6000" maxlength="5" size="8" id="max"/>' +
	'<table><tr>'+string+'id="heist">Skip Heist cars</label></td>'+string+'id="oc">Skip OC cars</label></td>'+'</tr><tr>'+string+
	'id="truck">Skip Trucks</label></td>'+string+'id="moc">Skip MOC cars</label></td>'+'</tr><tr>'+string+'id="nodam">Skip 0% cars</label></td><td>&nbsp;</td>'+'</tr></table>'+
	' <input type="button" onclick="javascript:document.location.href = \'garage.php?max=\' + document.getElementById(\'max\').value + \'&select=\' + document.getElementById(\'X\').value + \'&truck=\' + (document.getElementById(\'truck\').checked ? \'1\' : \'0\') + \'&oc=\' + (document.getElementById(\'oc\').checked ? \'1\' : \'0\') + \'&moc=\' + (document.getElementById(\'moc\').checked ? \'1\' : \'0\') + \'&heist=\' + (document.getElementById(\'heist\').checked ? \'1\' : \'0\') + \'&nodam=\' + (document.getElementById(\'nodam\').checked ? \'1\' : \'0\') + ' + (GetPost('page')=='' ? '\'' : '\'&page=' + GetPost('page')) + '\';" value="Go" name="action"/>');

	if(ls.length > 1) {//select cars
		if(ls.indexOf('heist') != -1 || ls.indexOf('nodam') != -1 || ls.indexOf('max') != -1 || ls.indexOf('oc') != -1) {
			var max=GetPost('max'), truck=GetPost('truck'), oc=GetPost('oc'), moc=GetPost('moc'), heist=GetPost('heist'), nodam=GetPost('nodam'), select=GetPost('select'), a=0, y, car, z, perc, types;
			function checkcar(car){
				types = new Array;
				types[0] = ['h','Nash Standard 8','Nash Big Six Town Sedan','Hudson-Essex Super Six','Packard 1100 Sedan','Packard 740 Roadster','Bentley 3.5 Litre Coupe','Lincoln KA','Reo Royale 8 Convertible','Mercedes-Benz 320 Cabriolet','Bugatti Type 35','Duesenberg SJ','Bugatti Type 32 \'Tank\'','Alfa Romeo Spyder','Bugatti 57C Atalante'];
				types[1] = ['oc','Crossley Kegresse Half-Track Truck','Rolls Royce Phantom III','Cadillac V16 Series 452 C Fleetwood Towncar Cabriolet 1933','Alfa Romeo 6C 2500 Sport Touring Berlinetta','Bentley 3 Litre Vanden Plas Tourer','Bugatti Type 50 Coupe Profile','Duesenberg J Rollston Berline','Auburn 851 SC','Ford DeLuxe','Auburn 852 Supercharged'];
				types[2] = ['moc','Duesenberg X Locke','Packard Custom','Dodge Thunderbolt Concept'];
				types[3] = ['tr','Crossley Kegresse Half-Track Truck','Packard Custom','Oshkosh Model A'];
				types.forEach(function(array){ array.forEach(function($n){if($n==car) eval(array[0] + 'car=1;')}) });
			}
			for(i=2;i<rows-2;i++) {
				y = "/html/body/form/center/table/tbody/tr["+(i+2)+"]/td[2]/a";//get car
				car = $I(y);
				z = "/html/body/form/center/table/tbody/tr["+(i+2)+"]/td[3]";//get percentage damage
				perc = $I(z);
				perc = parseInt(perc.slice(0,perc.indexOf("%")));

				var hcar=0, occar=0, trcar=0, moccar=0;
				checkcar(car);

				var stop=0; //check if car needs to be skipped
				if((heist==1 && hcar==1)||(oc==1 && occar==1)||(truck==1 && trcar==1)||(moc==1 && moccar==1)||(nodam==1 && perc==0)) stop=1;

				if(stop == 0) {
					tr = $i('//tr',(i+1)); //get worth
					tr = (tr.indexOf(")") == -1) ? tr.slice(tr.indexOf("%")) : tr.slice(tr.indexOf(")"));
					tr = tr.replace("<td>","");
					tr = tr.slice(tr.indexOf("$")+6);
					tr = tr.replace("<td>","");
					tr = tr.slice(0,tr.indexOf("<")-3);
					tr = tr.replace(",","");
					tr = parseInt(tr);
					
					if((tr < max && select==1)||(tr > max && select==0)) $X("/html/body/form/center/table/tbody/tr["+(i+2)+"]/td[6]/input[2]").checked = true;
				}
			}
		}
	}
}

//---------------- Statistics ----------------
if(dlp + dls == '/compress.php?r=statistics') {
		var a, b, x, y;
		$X('/html/body/center').innerHTML = "<table class='thinline' width='600' rules='none' cellspacing='0' cellpadding='2'><tbody><tr><td class='tableheader' align='center' colspan='4'><a href='#dfams'><b>Dead Fams</b></a> - <a href='#honour'><b>Honoured</b></a> - <a href='#cdtc'><b>CDTC</b></a> - <a href='#fams'><b>Families</b></a> - <a href='#bf'><b>BF</b></a> - <a href='#book'><b>Bookie</b></a> - <a href='#roul'><b>Roullie</b></a> - <a href='#num'><b>Numbers</b></a> - <a href='#slot'><b>Slots</b></a> - <a href='#bj'><b>BJ</b></a> - <a href='#pb'><b>PB</b></a></td></tr><tr></tr><td colspan='3' bgcolor='black' height='1'></td></tr></tbody></table>" + $X('/html/body/center').innerHTML;
		a = "/html/body/center/table[";
		b = "]/tbody/tr/td";
		x = new Array();
		y = ['dfams','honour','cdtc','fams','bf','book','roul','num','slot','bj','pb'];
		for(i=0;i<=10;i++) {
			j=i+5;
			x[i]=a+j+b;
			$I(x[i],"<a name='" + y[i] + "'>"  + $I(x[i]) + "</a>&nbsp;&nbsp;&nbsp;<a href='#'>&uarr; <u>"+lang.stats+"</u> &uarr;</a>");
		}
}

//---------------- Family page ----------------
if(dlp == '/family.php'){
	if(prefs[13]) {
		var numtop = 1;//get num of tops
		var con = 0;
		var sot = 0;
		var xpath = "/html/body/center/center/table/tbody";
		var result = $I(xpath);
		if(result.indexOf("Consiglieri:") != -1) { numtop++; con=1; }
		if(result.indexOf("Sottocapo:") != -1) { numtop++; sot=1; }

		var capoListXpath = "/html/body/center/center/table/tbody/tr[6]/td/table/tbody";
		var trs = $X(capoListXpath).getElementsByTagName('tr');
		var numtr = trs.length;
		var capos = 0;
		for(i=3;i<=numtr;i=i+2) {
			var tr = $X("/html/body/center/center/table/tbody/tr[6]/td/table/tbody/tr["+i+"]");
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
				if(rowcapos == 3) j = numtd+1;
			}
		}
		var capocontent = '';
		capos--;
		var donxp = '/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[4]/td[2]';
		var don = $I(donxp);
		for(i=0;i<=capos;i++) {//assemble capos
			var str = "capo" + i;
			var dude = eval(str)
			if(don!=dude) capocontent = (i!='0') ? capocontent + ", " + dude : capocontent + dude;
		}
		if(capocontent.slice(0,1) == ',') capocontent = capocontent.slice(1);

		var pos = 4 + numtop;//count for # of tops

		var capoRowXpath = "/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[" + pos + "]";
		var result = $X(capoRowXpath);

		if(capos!=0){
			var row = cEL('tr');//create capo row in family info table
			var cell_L = row.appendChild(cEL('td'));
			cell_L.textContent = 'Capos:';
			cell_L.id = 'left';
			var cell_R = row.appendChild(cEL('td'));
			cell_R.textContent = "capocontent";
			cell_R.id = 'right';

			result.parentNode.insertBefore(row,result);
			getID('left').setAttribute('class','left');//append style+capo's to cells
			getID('right').setAttribute('class','right');
			getID('right').innerHTML = capocontent;
		}

		//Nick Reader
		extJS(lang.requesting);
		var script = cEL("script");
		script.setAttribute('type','text/javascript');
		script.textContent = "function check(url,id) { if(document.getElementById('switch').checked == true) { makeHttpRequest(url,id); } }";
		$X("//head").appendChild(script);

		var style = '';
		style += '.pop{position: relative;z-index:0;}';
		style += '.pop:hover{background-color:transparent;z-index:1;text-decoration:none;}';
		style += '.pop span{position:absolute;background-color:#A8A8A8;padding:5px;left:-1000px;width:250px;border:1px dashed gray;visibility:hidden;color:black;text-decoration:none;}';
		style += '.pop:hover span{visibility:visible;top:+45px;left:-20px;text-decoration:none;}';
		style += '.mem:hover {text-decoration:underline;cursor:pointer;}';
		style += '.top {text-decoration:underline;cursor:pointer;}';
		style += '.top:hover {text-decoration:underline;cursor:pointer;}';
		GM_addStyle(style);

		var getNicksXpath = "/html/body/center/center/table/tbody/tr[5]/td/table/tbody/tr[3]/td";
		var num = $X(getNicksXpath).getElementsByTagName('a').length;
		var a = $X(getNicksXpath).getElementsByTagName('a');
		var on = 0;//online

		var TopsXp = "/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[";//get tops
		var FirstTopsXp = TopsXp + "5";
		var topcontent ='';

		function appendTop(xp){ topcontent += $I(xp+"]/td[2]"); }

		appendTop(TopsXp + "4");
		if(con==1) appendTop(FirstTopsXp);
		if(sot==1 && numtop==2) appendTop(FirstTopsXp);
		if(sot==1 && numtop==3){appendTop(FirstTopsXp);appendTop(TopsXp+"6");}

		//get object owners
		var objectsXpath = '/html/body/center/center/table/tbody/tr[2]/td/table';
		var trs = $X(objectsXpath).getElementsByTagName('tr').length;
		var objectcontent = "";
		for(i=4;i<=trs-1;i++){
			var nick = $X(objectsXpath).getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerHTML;
			var objectcontent = objectcontent + "<a href='user.php?nick=" + nick + "'>" + nick + "</a>";
			$X(objectsXpath).getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerHTML = "<a href='user.php?nick=" + nick + "'>" + nick + "</a>";
		}

		for(i=0;i<num;i++) {//add popups
			var nick = $X(getNicksXpath).getElementsByTagName('a')[i].innerHTML;
			a[i].setAttribute("class","pop"); //check for capo/top/object
			if(capocontent.indexOf('='+nick+'"') != -1) { a[i].innerHTML = "<label id='b"+i+"' class='top'>" + a[i].innerHTML + "</label><span id='" + i + "'> "+lang.loading+"</span>"; }
			else if(topcontent.indexOf('='+nick+'"') != -1) { a[i].innerHTML = "<label id='b"+i+"' class='top'>" + a[i].innerHTML + "</label><span id='" + i + "'> "+lang.loading+"</span>"; }
			else if(objectcontent.indexOf('='+nick+'"') != -1) { a[i].innerHTML = "<label class='mem'><i>" + a[i].innerHTML + "</i></label><span id='" + i + "'> "+lang.loading+"</span>"; }
			else { a[i].innerHTML = "<label class='mem'>" + a[i].innerHTML + "</label><span id='" + i + "'> "+lang.loading+"</span>"; }
			var str = "$X(getNicksXpath).getElementsByTagName('a')["+i+"].setAttribute(\"onMouseover\",\"check('user.php?nick=" + nick + "','" + i + "')\")";
			eval(str);
			if(a[i].getAttribute("style")) {
				var on = on +1;//save # peeps online
				if(capocontent.indexOf(nick) != -1) getID("b" + i).setAttribute("style","color: orange;");//online capo's orange
				if(topcontent.indexOf(nick) != -1) getID("b" + i).setAttribute("style","color: red;");//online tops red
			}
		}
		//addept membertable title
		var xp = "/html/body/center/center/table/tbody/tr[" + (capos==0 ? 4 : 5) + "]/td/table/tbody/tr";
		$X(xp+"[2]/td").setAttribute("colspan","2");
		$X(xp+"[3]/td").setAttribute("colspan","2");
		$I(xp,lang.family);

		//add % of peeps online
		var pos = (capos==0 ? 5 : 6) + numtop;//count for # of tops
		var x="/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[";
		var xpath = x + pos + "]/td[1]";
		$I(xpath,"Members online:");
		var xpath = x + pos + "]/td[2]";
		var prcnt = Math.round((on / $I(xpath) )*100,1);
		$I(xpath,prcnt + "% (" + on + " / " + $I(xpath) + " )");
	}
}

//---------------- Kill password remover ----------------
if(prefs[14]) {
	var x = db.innerHTML;
	if(dlp == '/kill.php') if(x.indexOf("table") != -1 ) del("/html/body/center/table/tbody/tr[5]");
	if(dlp == '/profile.php' && x.indexOf("table") != -1) {
		del("/html/body/center/table/tbody/tr[9]");
		del("/html/body/center/table/tbody/tr[9]");
	}
}

//---------------- Heist AF ----------------
if(prefs[8]){
	if((/\bHeist\b/).test(dls)) {
		if(/Leader:/.test(db.innerHTML)) {
			getELNAME('bullets')[0].value = '50';
			getELNAME('gun')[0].value = "real";
			getELNAME('driver')[0].focus();
		}
		if(/carid/.test(db.innerHTML)) getELNAME('carid')[0].focus();
	}
}

//---------------- OC AF ----------------
if(prefs[8]){
	if((/orgcrime/).test(dls)) {
		if(/Tommy/.test(db.innerHTML)) {
			getELNAME('bulletz')[0].value = '100';
			getELNAME('guns')[0].value = '2';
			getELNAME('input')[1].focus();
		}
		if(/TNT/.test(db.innerHTML)) {
			getELNAME('exploz')[1].checked = true;
			$x('//input')[2].focus();
		}
		if(/Carid/.test(db.innerHTML)) getELNAME('caridz')[0].focus();
	}
}

//---------------- Blood AF -------------
if(prefs[8]) {
	if(dlp == '/information.php'){
		var hlthxpath, typeXpath, bloodTypeTC;
		hlthxpath = '/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[4]/td[2]/a/table/tbody/tr';
		typeXpath = '/html/body/center/table/tbody/tr/td/table/tbody/tr[10]/td[2]';
		setValue('bloodType',getTXT(typeXpath));
		if($X(hlthxpath)) setValue('missingHealth','100' - getTXT(hlthxpath).replace('%',''));
	}
	if(dlp == '/bloodbank.php'){
		if($X('//input')) {
			$X('//input').value = getValue('missingHealth');
			var TypeA, TypeB, TypeAB, Type0, Type, x, y, z;

			function getType(num) { return getTXT('/html/body/table/tbody/tr[2]/td/blockquote/font/table/tbody/tr[3]/td['+num).replace('\$',''); }
			function setType(blood) { $X('//option').value = blood; $X('//option').textContent = blood; }

			TypeA = getType('2]');
			TypeB = getType('3]');
			TypeAB =getType('4]');
			Type0 = getType('5]');
			Type = getValue('bloodType');

			if(Type == 'B'){
				x = Math.min(TypeB,Type0);
				if(TypeB == x) setType("B");
				if(Type0 == x) setType("0");
			}
			if(Type == 'A'){
				y = Math.min(TypeA,Type0);
				if(TypeA == y) setType('A');
				if(Type0 == y) setType('0');
			}
			if(Type == 'AB'){
				z = Math.min(TypeA,TypeB,TypeAB,Type0);
				if(TypeA == z) setType('A');
				if(TypeB == z) setType('B');
				if(TypeAB == z) setType('AB');
				if(Type0 == z) setType('0');
			}
			if(Type == '0') setType('0');
		}
	}
}

//---------------- Compatibility page ----------------
if(dlp == '/servers.php'){
	var x = $x("/html/body/table/tbody/tr/td/ul/font/li");
	x[0].innerHTML = x[0].innerHTML +" - Compatible";
	x[2].innerHTML = x[2].innerHTML +" - Compatible";
	x[8].innerHTML = x[8].innerHTML +" - Compatible";
	x[10].innerHTML = x[10].innerHTML +" - doesn't exist yet ;-)";
}

//---------------- Smuggling ----------------
if(prefs[8]) {
	if(dlp == '/smuggling.php' && db.innerHTML.indexOf('table') != -1) {
		var bn_xp = '/html/body/center/form/table/tbody/tr[1]/td';
		var bn_text = $X(bn_xp).innerHTML.split("<br>");

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
				var carry_b = carry_b + parseInt($X(xpb+x+']/td[3]').innerHTML);
				b_amount[i] = parseInt($X(xpb+x+']/td[3]').innerHTML)
				$x('//input')[i].value = b_amount[i];
				$I(xpb+x+']/td',"<a href='#' accesskey='"+(i+1)+"' onClick='for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value =0;}document.getElementsByTagName(\"input\")[" + i + "].value = " + booze + ";document.getElementsByTagName(\"input\")[18].focus();'>"+(i+1)+" " + $I(xpb+x+']/td') + "</a>");
			}
			if(i>8) {
				var x = i - 5;
				var carry_n = carry_n + parseInt($I(xpn+x+']/td[3]'));
				n_amount[(i-9)] = parseInt($I(xpn+x+']/td[3]'));
				$x('//input')[i].value = parseInt($I(xpn+x+']/td[3]'));
				$I(xpn+x+']/td',"<a href='#' onClick='for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value =0;}document.getElementsByTagName(\"input\")[" + i + "].value = " + narcs + ";document.getElementsByTagName(\"input\")[18].focus();'>" + $I(xpn+x+']/td') + "</a>");
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
		var part = $I(info_xp).split("<br>");

		var str = ''
		str += lang.smuggling[0] + part[0].slice(part[0].indexOf("$ "),part[0].indexOf(" i")) + "<br>";
		str += "Max "+lang.smuggling[1]+": " + part[1].slice(part[1].indexOf("t ")+1,part[1].indexOf(" e")) + "<br>";
		str += "Max "+lang.smuggling[2]+": " + part[2].slice(part[2].indexOf("t ")+1,part[2].indexOf(" e")) + "<br><br>";
		str += part[3].replace(lang.smuggling[3],lang.smuggling[4]);
		str += "<hr><a href='#' accesskey='[' onClick='for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=0;}if("+notempty+"){var n_amount = ["+n_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[(i+9)].value=n_amount[i];}}else{document.getElementsByTagName(\"input\")[12].value = "+narcs+";}document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[2]+" ([)</a>";
		str += " - <a href='#' accesskey=']' onClick='for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value=0;}var b_amount = ["+b_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=b_amount[i];}document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[1]+" (])</a>";
		str += " - <a href='#' accesskey='=' onClick='var b_amount = ["+b_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=b_amount[i];} document.getElementsByTagName(\"input\")[12].value = "+ ((narcs - carry_n) == 0 ? narcs : narcs - carry_n) +";document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[5]+" (=)</a><br>";
		$X(bn_xp).innerHTML = str;
		if(carry_b==booze) $x('//input')[7].checked = 1;
		if(carry_n==narcs) $x('//input')[16].checked = 1;
		else if($x('//input')[12].value == carry_n && carry_n == 0) $x('//input')[12].value = narcs;
		$x('//input')[18].focus();
	}
}

//---------------------- OBAY --------------------
if(prefs[18] && dlp == '/obay.php' && db.innerHTML.indexOf('<table') != -1){
	if(dls.indexOf('specific') == -1 ) { //on view object page
		function addPrice(num) {
			var bullets = parseInt($X(xpath).getElementsByTagName('td')[(1+num)].innerHTML.replace(/[^0-9.]/g,''));
			var price = parseInt($X(xpath).getElementsByTagName('td')[(2+num)].innerHTML.replace(/[^0-9.]/g,''));
			$X(xpath).getElementsByTagName('td')[(1+num)].innerHTML = $X(xpath).getElementsByTagName('td')[(1+num)].innerHTML + " ($ " + Math.round(price/bullets) + ")";
		}

		if(dls.indexOf('type=11') != -1) {
			for(i=5;i<=19;i++) {
				var xpath = '/html/body/center/table[3]/tbody/tr['+i+']';
				addPrice(0);
			}
		}
		else {
			for(i=4;i<=19;i++) {
				var xpath = '/html/body/center/table[3]/tbody/tr['+i+']';
				if($I(xpath).indexOf(lang.obay) != -1) addPrice(1);
			}
		}
	}
	else if(db.innerHTML.indexOf(lang.obay) != -1) { //on objects page
		var xpath = '/html/body/center/table/tbody/tr[3]/td[3]';
		var price = $I(xpath).split("<br>")[3].replace(/[^0-9.]/g,'');
		var xpath2 = '/html/body/center/table/tbody/tr[4]/td';
		var bullets = $I(xpath2).replace(/[^0-9.]/g,'');
		$I(xpath2,$I(xpath2) + "<br><b>$ " + Math.round(price/bullets) + "</b>");
		$x('//input')[2].checked = true;
		$x('//input')[1].select();
		$x('//input')[1].focus();
	}
}

//---------------- Inbox ---------------------------
if(dlp == '/messages.php' && (dls == '' || dls.indexOf('action=delete') !=-1) && prefs[19]) {
	var xpath, trs, xpath2, content, href, href2, id, xpath3, xpath4, msgInbox, storageInbox, storageInboxXp
	xpath = '/html/body/center/form[2]/table[2]/tbody';
	trs = $X(xpath).getElementsByTagName('tr').length;
	msgInbox = $X('/html/body/center/b').textContent;
	storageInboxXp = '/html/body/center/form[2]/table/tbody/tr/td';
	storageInbox = $X(storageInboxXp).textContent.match(/\d+/);
	$X(storageInboxXp).innerHTML = "You can store additional <b>"+ (storageInbox - msgInbox) + "</b> messages.<br>";

	$x('//table')[1].setAttribute('width','550');
	getID('tblMsgs').setAttribute('width','550');
	for(i=5;i<=trs;i=i+2) {
		xpath2 = '/html/body/center/form[2]/table[2]/tbody/tr[' +i+ ']';
		cntnt = $I(xpath2);
		href = cntnt.slice(cntnt.indexOf('"m'));
		href2 = href.slice(0,href.indexOf('">'));
		id = href2.slice(href2.indexOf('g=')+2);

		xpath3 = xpath2+'/td[2]';//check sender
		var sender = $I(xpath3);
		var replyImg = (sender.search(lang.inbox[0]) != -1 || sender.search(lang.inbox[1]) != -1) ? '' : '&nbsp;<img onMouseover="style.cursor=\'pointer\'" title="Reply" onClick="location.href=\'msg.php?replyid=' + id + '\'" width="20" height="20" border="0" src="/static/images/game/messages/reply.gif">';

		xpath4 = xpath2+'/td[3]';//add image(s)
		$X(xpath4).setAttribute('width','160');
		$I(xpath4,$I(xpath4) + ' &nbsp;<img onMouseover="style.cursor=\'pointer\'" title="Delete" onClick="location.href=\'messages.php?action=delete&delid=' + id + '\'" width="20" height="20" border="0" src="/static/images/game/messages/del.gif"/>' + replyImg);
	}
	for(i=0;i<=9;i++){//add hotkeys
		var td = $x('//td[@width=150]')[i];
		var a = $x('//td[@width=200]/a')[i];
		var num = (i==9 ? 0 : (i+1));
		td.innerHTML = num + ' - ' + td.innerHTML;
		a.accessKey = num;
	}
	$I('//td[@width="20%"]','# + ' + $I('//td[@width="20%"]'));
}
// linkify names in WS's && heists
if(dlp == '/messages.php' && dls.indexOf('action=showmsg') !=-1){
	var mainXpath, subjectXpath, msgTxtXpath, msgTxtSplit;
	mainXpath = '/html/body/center/center/table/tbody/tr['
	subjectXPath = mainXpath + '5]/td[2]/b';
	msgTxtXpath = mainXpath + '7]/td';
	msgTxtSplit = $X(msgTxtXpath).innerHTML.split(' ');
	//if msg is WS
	if(/\bWitness statement\b/.test($X(subjectXPath).textContent)) { 
		$X(msgTxtXpath).innerHTML = msgTxtSplit[0] + ' ' + msgTxtSplit[1] + ' ' + msgTxtSplit[2] + ' ' + "<a href=user.php?nick=" +  msgTxtSplit[3] + "><b>" + msgTxtSplit[3] +"</b></a>" + ' ' + msgTxtSplit[4] + ' ' + "<a href=user.php?nick=" + msgTxtSplit[5].replace('.','') + "><b>" + msgTxtSplit[5] +"</b></a>" + ' ' + msgTxtSplit[6] + ' ' + msgTxtSplit[7] + ' ' + msgTxtSplit[8] + ' ' + msgTxtSplit[9] + ' ' + msgTxtSplit[10] + ' ' + msgTxtSplit[11] + ' ' + msgTxtSplit[12] + ' ' + msgTxtSplit[13] + ' ' + msgTxtSplit[14] + ' ' + msgTxtSplit[15];
	}
	//if msg is heist inv.
	if(/\bRoute 66 heist\b/.test($X(subjectXPath).textContent)) {
		if(msgTxtSplit[2] == lang.inbox[2]) { //check if this is invitation
			$I(msgTxtXpath,"<a href=user.php?nick=" +  msgTxtSplit[0] + "><b>" + msgTxtSplit[0] +"</b></a>" + ' ' + msgTxtSplit[1] + ' ' + msgTxtSplit[2] + ' ' + msgTxtSplit[3] + ' ' + msgTxtSplit[4] + ' ' + msgTxtSplit[5] + ' ' + msgTxtSplit[6] + ' ' + msgTxtSplit[7] + ' ' + msgTxtSplit[8] + ' ' + msgTxtSplit[9] + ' ' + msgTxtSplit[10] + ' ' + msgTxtSplit[11] + ' ' + msgTxtSplit[12] + ' ' + "<a href=user.php?nick=" +  msgTxtSplit[13] + "><b>" + msgTxtSplit[13] +"</b></a>" + ' ' + msgTxtSplit[14] + ' ' + msgTxtSplit[15] + ' ' + msgTxtSplit[16] + ' ' + msgTxtSplit[17] + ' ' + msgTxtSplit[18] + ' ' + msgTxtSplit[19] + ' ' + msgTxtSplit[20]);
		}
		else $I(msgTxtXpath);
	}
}

//---------------- Prices Highlighter ----------------
if(dlp == '/prices.php' && prefs[21]) {
	for(j=2;j<=8;j++){
		for(k=1;k<=2;k++) {
			var xp1='/html/body/center['+k+']/table/tbody/tr[';
			var xp2=']/td['+j+']';
			var p=new Array;
			var q=new Array;
			for(i=0;i<=7;i++) {
				var xp = xp1+(i+4)+xp2;
				p[i]=parseInt($I(xp).replace(/[^0-9.]/g,''));
				q[i]=p[i];
			}
			var max = p.sort(function(a,b){return b-a})[0];
			var min = p[(p.length-1)];

			if(j==7&&k==1){$I(xp1+3+xp2,'<b>' + $I(xp1+3+xp2) + '</b>');}
			var i=4;
			q.forEach(function($n){
				var x=$X(xp1+i+xp2);
				if(!(j%2)) x.setAttribute('style','background-color: #8D8D8D');
				if($n==max) x.innerHTML = '<span style="color: #ff0000">' + x.innerHTML + '</span>';
				if($n==min) x.innerHTML = '<span style="color: #00ff00">' + x.innerHTML + '</span>';
				if(j==7&&k==1) x.innerHTML = '<b>' + x.innerHTML + '</b>';
				i++
			});
		}
	}
}

//---------------- Title changer ----------------
if((dlp=='/' || dlp=='/index.php' || dlp=='/game.php') && prefs[9] && lh.indexOf('beyond')==-1) document.title = lang.title;

//---------------- Update Notifier --------------
var GM_update = function(title, name, version, updateUrl, versionUrl) {
	var today, last, current, answer;
	today = new Date();
	today = today.getDate();
	last = getValue(title);
	this.init = function() {
		if(last !== undefined) if(today - last >= 1 || today - last <= -24) { setValue(title, today); this.check(); }
		else { setValue(title, today); this.check(); }
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
			if(version[0] < current[0]) if(confirm("Update " + name + " to version " + current.join(".") + "?")) GM_openInTab(updateUrl);
			else if(version[1] < current[1]) if(confirm("Update " + name + " to version " + current.join(".") + "?")) GM_openInTab(updateUrl);
			else if(version[2] < current[2]) if(confirm("Update " + name + " to version " + current.join(".") + "?")) GM_openInTab(updateUrl);
			//else alert("I'm very sorry mate :-(\nThere's no new version of " + name + " this time.\nWe're just lazy :x");
			else { };
		}
	}
	this.init();//start
}

GM_update('OBUpdate', ScriptName, ScriptVersion, SiteLink+'/svn/', SiteLink+'/beta.txt');

//---------------- Beyond Logo Replacer ----------------------
var comlogo = GM_getResourceURL("beyondLogo");
var dmlogo = GM_getResourceURL("beyondLogo");
var comlogoxpath = "//img[contains(@src, 'logo0.gif')] | //img[contains(@src, 'omertalo.gif')]";
$x(comlogoxpath).forEach(function(node){node.src = comlogo});
var dmlogoxpath = "//img[contains(@src, 'deathmatch.gif')] | //img[contains(@src, 'omdmlogo.png')]";
$x(dmlogoxpath).forEach(function(node){node.src = dmlogo});

//---------------- Beyond Favicon Replacer ----------------------
var favIcon = GM_getResourceURL("favoriteIco");
window.addEventListener('load', function() { setIcon(favIcon); }, true);

//---------------- IRC Chat Remover ----------------------
if(prefs[23] && (lang.version=='_nl' || lang.version=='_dm')) del('//div[@class="chat"]');

//---------------- Clean login page ----------------
if((dlp=='/' || dlp=='/index.php' || dlp=='/game-login.php') && lh.indexOf('beyond')==-1 && prefs[20]) {
	del('//td[@valign="bottom"]');
	del('//table[@align="right"]');
	del('//td[@width="160"]');
	if(dlp=='/' || dlp=='/index.php') del('//td[@style="text-align: justify;"]');
	else { del('//h1'); del('//td[@width="238"]'); $X('//table[@height="185"]').setAttribute('align','center'); }
	$i('//b',1,'Nick:');
	$i('//b',2,'Pass:');
	del("//a[@href='game-register.php']");
	$X('//a').href = SiteLink;
	$X('//a').target = '_blank';

	$I("//td[@background='/static/images/frontpage/old/bar.gif']",'<font color="#cccccc" size="1"><b><center><a href="game-register.php">Register</a> - <a href="'+PrefsLink+'" target="_blank">'+lang.prefsname+'</a> - <a href="http://www.omertabeyond.com/" target="_blank">Beyond</a> - <a href="http://www.fingon.be" target="_blank">Fingon\'s</a></center></b></font>');
	var circle = "//table[contains(@background, 'circle.GIF')]";
	$x(circle).forEach(function($n){$n.style.backgroundImage = "none"});

	if(lang.version == '_com'){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://89.149.221.178/~fingon/deaths.php',
			onload: function(resp) {
				var html, slice, articles, u, a, td, tdHTML, node, head;
				html = resp.responseText;
				node=$X('//tr[@valign="middle"]');

				function addCell(w){
					td=cEL('td');
					c = '<table><tbody><tr><td'; 
					head = w ? 'D e a t h s' : 'N e w s';
					if(w) c += ' colspan="5"';
					c += 'style="width: 125px;" align="center"><font size="2" color="#cccccc"><b>'+head+'</b></font><br><br></td></tr>';
					if(!w) for(i=0;i<=4;i++) c += '</td><td align="left"><font size="1" color="#cccccc"><b><a target="_blank" href="http://89.149.221.178/~fingon/index.php?a='+u[i]+'&ap=1"><b>> '+a[i]+'</b></a></b></font></td></tr>';
					if(w) for(i=0;i<=9;i++) c += '<tr><td><font size="1" color="#cccccc"><b>'+d[i][2].slice(9,18)+'</b></font></td><td align="left"><font size="1" color="#cccccc"><b><a href="http://www.barafranca.com/user.php?nick='+d[i][0].replace(/\'/g,'')+'">'+d[i][0].replace(/\'/g,'')+'</a></b></font></td><td class="normal" align="left"><font size="1" color="#cccccc"><b>'+d[i][3]+'</b></font></td><td class="normal" align="left"><font size="1" color="#cccccc"><b>'+d[i][4].replace('\'\'','-').replace(/\'/g,'')+'</b></font></td><td class="normal"><font size="1" color="#cccccc"><b>'+d[i][5].replace('\'\'','-').replace(/\'/g,'')+'</b></font></td></tr>';
					c += '<tr><td';
					if(w) c += ' colspan="5"';
					c += 'align="center"><input style="border: 0px solid #3f505f; width: 300px; height: 0px; font-family: Verdana; font-size: 10px; background-color: #3f505f; color: rgb(204, 204, 204);" value="" type="button"></td></tr></tbody></table><br>';
					td.innerHTML=c;
					td.setAttribute('style','border-left:solid #cccccc 0.5px;');
					node.insertBefore(td, $X('//tr[@valign="middle"]/td[@align="center"]').nextSibling);
				}

				//news
				u = new Array, a = new Array;
				slice = html.slice(html.indexOf('Articles'));
				articles = slice.slice(slice.indexOf('<script>'),slice.indexOf('</script>')).split('a(');
				for(i=0;i<=4;i++){
					u[i] = articles[i+2].slice(articles[i+2].indexOf(',')+1,articles[i+2].indexOf(',1'));
					a[i] = articles[i+2].slice(articles[i+2].indexOf('\'')+1,articles[i+2].indexOf('\','));
				}
				addCell(0);

				//deaths
				d = new Array;
				ranks = ['Empty-Suit','Delivery Boy','Picciotto','Shoplifte','Pickpocket','Thief','Associate','Mobster','Soldier','Swindler','Assassin','Local Chief','Chief','Bruglione','Capodecenia','Godfather'];
				slice = html.slice(html.indexOf('<tr class=trdeathtop'));
				deaths = slice.slice(slice.indexOf('<script>'),slice.indexOf('</script>')).split('d(');
				for(i=0;i<=9;i++) {
					d[i] = deaths[i+1].split(',');
					d[i][3] = ranks[(parseInt(d[i][3])-1)];
				}
				addCell(1);

				node.setAttribute('valign','top');
			}
		});
	}
}