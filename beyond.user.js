// ==UserScript==
// @name			Omerta Beyond
// @version			1.9.1
// @date			14-09-2009
// @author			vBm ( vbm AT omertabeyond DOT com )
// @author			Dopedog ( dopedog AT omertabeyond DOT com )
// @license			Creative Commons Attribution-Share Alike 3.0
// @namespace			v3.omertabeyond.com
// @description			Omerta Beyond 1.9.1 (You know it's the only SANE choice)
// @include			http://gm.omertabeyond.com/*.php*
// @include			http://www.omerta3.com/*
// @include			http://omerta3.com/*
// @include			http://www.barafranca.com/*
// @include			http://barafranca.com/*
// @include			http://www.barafranca.nl/*
// @include			http://barafranca.nl/*
// @exclude			http://gamewiki.barafranca.com/*
// @exclude			http://ircwiki.barafranca.com/*
// @require			http://omertabeyond.googlecode.com/svn/scripts/libs.js
// @require			http://omertabeyond.googlecode.com/svn/scripts/lang.js
// @resource	color		http://omertabeyond.googlecode.com/svn/scripts/color.js
// @resource	css		http://omertabeyond.googlecode.com/svn/scripts/beyond.css
// @resource	trash		http://omertabeyond.googlecode.com/svn/img/del.png
// @resource	colorpicker	http://omertabeyond.googlecode.com/svn/img/colorpicker.gif
// @resource	comLogo		http://omertabeyond.googlecode.com/svn/img/logo-com.png
// @resource	nlLogo		http://omertabeyond.googlecode.com/svn/img/logo-nl.png
// @resource	buttonMenu	http://omertabeyond.googlecode.com/svn/img/menu.png
// @resource	buttonKey	http://omertabeyond.googlecode.com/svn/img/key.png
// @resource	buttonReset	http://omertabeyond.googlecode.com/svn/img/reset.png
// @resource	favoriteIco	http://omertabeyond.googlecode.com/svn/img/favicon.png
// @resource	updateIco	http://omertabeyond.googlecode.com/svn/img/updateicon.png
// @resource	brcGear		http://omertabeyond.googlecode.com/svn/img/brcgear.png
// @resource	deleteIcon	http://omertabeyond.googlecode.com/svn/img/deleteicon.png
// @resource	reply		http://omertabeyond.googlecode.com/svn/img/reply.png
// @resource	loading		http://omertabeyond.googlecode.com/svn/img/loading.gif
// ==/UserScript==

//---------------- (Omerta==0)?refresh:go ----------------
if(db.innerHTML.indexOf('clicklimit')!=-1&&dlp!='/menu.php') {
	setTimeout(function() { window.location.reload(); }, 60000);
}
else if(db.innerHTML.indexOf('504 Gateway Time-out')!=-1) {
	setTimeout(function() { window.location.reload(); }, 20000);
}
else if(db.innerHTML.indexOf('502 Bad Gateway')!=-1) {
	setTimeout(function() { window.location.reload(); }, 20000);
}
// need to add msql error as well
else { // freedom!

// get language vars
url = ''+location;
vCom = url.search(/barafranca.com|omerta3.com|v=com/) != -1;
vNl  = url.search(/barafranca.nl|v=nl/) != -1;
lang = vCom ? langs.en : vNl ? langs.nl : langs.en;

ScriptName = 'Omerta Beyond';
ScriptVersion = '1.9.1';
ScriptSubVersion = '98';
SiteLink = 'http://www.omertabeyond.com';
ScriptLink = 'http://gm.omertabeyond.com';
PrefsLink = ScriptLink + lang.prefslink;
FingonUrl = 'http://89.149.221.178/~fingon';
EdoUrl = 'http://www.edo-nieuws.nl/news.php';
gCode = 'http://omertabeyond.googlecode.com/svn';

GM_registerMenuCommand(ScriptName + ' v' + ScriptVersion, function(){ alert('You are using ' + ScriptName + '\nVersion:\t' + ScriptVersion + '\nRevision:\t' + ScriptSubVersion ); });

//this is to 'redownload' latest svn version, change it later to support final version ( uncomment next line )
//GM_registerMenuCommand('Redownload ' + ScriptName, function(){ GM_openInTab(SiteLink +'/releases/v'+ScriptVersion+'.user.js'); });
//GM_registerMenuCommand('Redownload svn of ' + ScriptName, function(){ GM_openInTab(gCode+'/beyond.user.js'); });

var maxbit = lang.maxprefs; //set the amount of preferences
var prefs = prefsArray(getValue('prefs', '0'),maxbit); // compatibility with old prefs built into prefsArray()

//load any GET querys
var querys = [
	'menu_cocaine',
	'menu_dailyfams',
	'families',
	'colours',
	'jailint',
	'priority',
	'FL_prior',
	'Fam_prior',
	'maxHL',
	'buyout',
	'newsamount',
	'custombg',
	'comments',
	'high',
	'low',
	'colour',
	'defpri',
	'defcol'
];
//beyond menu descriptions
var descr = [
	lang.prefsname,
	lang.menuitem[0],
	lang.menuitem[1],
	lang.menuitem[2],
	lang.menuitem[3]
	//lang.menuitem[4] -- obsolete till logger is fixed
	//lang.menuitem[5] -- obsolete till logger is fixed
];
//beyond menu links
var qlinks = [
	PrefsLink,
	SiteLink+'/html/poll/poll.php',
	ScriptLink+'/contact.php',
	ScriptLink+'/faq.php',
	'/prices.php'
	//SiteLink+'/gm/inggraphs.php?v='+lang.version.replace('_',''), -- obsolete till logger is fixed
	//FingonUrl+'/latestpicture.php' -- obsolete till logger is fixed
];
//beyond menu titles
var qtitle = [
	lang.menutitle[0],
	lang.menutitle[1],
	lang.menutitle[2],
	lang.menutitle[3],
	lang.menutitle[4]
	//lang.menutitle[5], -- obsolete till logger is fixed
	//lang.menutitle[6] -- obsolete till logger is fixed
];

//if(lang.version!='_com'){descr.pop();qlinks.pop();qtitle.pop();} //only .com support for famstats -- obsolete till logger is fixed
// ---------------- int->str bninfo compatibility ----------------
txt = getValue('bninfo','');
if(typeof txt == 'number') {
	setValue('bninfo',''+txt); 
	setValue('bncounter',0);
}

//---------------- Preferences Panel ----------------
if(dlp == '/prefs.php'){
	if(ls.indexOf('&prefs=') != -1) { // check for prefs update
		prefList = GetPost('prefs');
		setValue('prefs',prefList);
		prefs = prefsArray(prefList,maxbit);
	}
	for(j=0; j<querys.length; j++) { 
		if(ls.indexOf(querys[j]) != -1) { 
			setValue(querys[j], GetPost(querys[j])); // check for jail hl update
		}
	}

	var prefstr = lang.prefs;

	var string = '<tr height="25" id="prefsrow"><td colspan=4 class="toptd">Omerta Beyond ' + ScriptVersion + '.' + ScriptSubVersion + ' <span style="padding-right:10px;">: Preferences </span> <a href="#" onClick="" name="updater" ><img src="'+GM_getResourceURL("updateIco")+'" border=0 title="Check for update" /></a></td></tr>';

	function addCat(title) {  // pref category
		toggleStr = 'node = this; while(node.nextSibling.innerHTML.search(/<input/)!=-1) { node = node.nextSibling; show = ((node.style.display == \'none\') ? \'\' : \'none\'); node.style.display = show; };'; // js to toggle hiding prefs for category
		string += '<tr height=25 id="cat" class="tr" onClick="javascript:'+toggleStr+'"><td colspan="4" class="td"><b>&rarr <u>';
		string += title;
		string += '</u></b></td></tr>';
	}

	function addPrefItems(list){ // indices of prefs to list... order matters!
		for(i=0;i<list.length;i++){ // loop through given prefs for category
			string+= '<tr height=25 class="tr" style="display:none"><td width=25 class="td">'; // start pref row
			//string+= '<tr height=25 class="tr"><td width=25 class="td">'; // start pref row (non-hidden)
			string+= '<input type="checkbox" id="check' + list[i] + '" name="check_list"></td>'; // checkbox
			string+= '<td class="td"'+ (((i+1)==list.length) ? ' colspan="3"' : '');
			string+= '><span style="cursor:pointer" onclick="javascript:node = this.parentNode.previousSibling.childNodes[0];node.checked = (node.checked ? 0 : 1)">';
			string+= prefstr[list[i++]] + '</span></td>'; // pref name
			if(i==list.length) { 
				string+= '</tr>'; // end pref row
			} 
			else {
				string+= '<td width=25 class="td"><input type="checkbox" id="check' + list[i] + '" name="check_list"></td>'; // checkbox
				string+= '<td class="td">';
				string+= '<span style="cursor:pointer" onclick="javascript:node = this.parentNode.previousSibling.childNodes[0];node.checked = (node.checked ? 0 : 1)">';
				string+= prefstr[list[i]] + '</span></td></tr>';
			}
		}
	}

	// order here matters!
	// place categories in order they need to appear

	string += '<tr height="20" class="tr" align="center"><td colspan=4 class="bigtd"><span class="margintd">Click titles to expand</span></td></tr>';

	addCat(lang.preftitles[0]); // Crimes
	addPrefItems([8,10,24,0]);

	addCat(lang.preftitles[1]); // Smuggling
	addPrefItems([28,32,1,17,21]);

	addCat(lang.preftitles[2]); // Jail
	addPrefItems([3,23]);

	addCat(lang.preftitles[4]); // Obay
	addPrefItems([18]);

	addCat(lang.preftitles[5]); // AF's
	addPrefItems([25,26,27,29]);

	addCat(lang.preftitles[6]); // Status page
	addPrefItems([6,22,12]);

	addCat(lang.preftitles[7]); // Fingons / Edo
	addPrefItems([2/*,20*/]); //20 clean login page

	addCat(lang.preftitles[8]); // misc
	// DM||NL has 2 extra prefs (irc chat, non-fingon clean-up), COM has 1 extra pref (invite links)
	list = (lang.version == '_dm') ? [7,16,20,11,14,13,5,2,34,9,30,35] : (lang.version == '_nl') ? [7,16,20,11,14,13,5,34,9,35,31] : [7,16,11,14,13,5,34,9,35,31];
	addPrefItems(list);

	string += '<tr height="50"><td colspan=4 class="bigtd"><button type="button" name="Check_All" class="checkbutton" onClick="Check(document.myform.check_list)">Check all</button>';
	string += '&nbsp;<button type="button" name="#" class="button" onClick="';

	grabPrefs  = "javascript:var prefslist='';";
	grabPrefs += "for(i=0;i<"+maxbit+";i++){ if(document.getElementById('check'+i)) {";
	grabPrefs += "prefslist += (document.getElementById('check'+i).checked ? 1 : 0);}";
	grabPrefs += "else prefslist += '0'}; window.location = '" + PrefsLink + "&prefs='+prefslist;";

	string += grabPrefs; // grab all current checked values and send to url
	string += '">Update '+lang.prefsname+'</button><br><span class="margintd">The page will be refreshed when you click the update button.</span></td></tr>';

	getID('toptable').innerHTML = string;

	for(i=0;i<maxbit;i++) {
		if(getID('check' + i)) getID('check' + i).checked = prefs[i];
		else prefs[i] = 0;
	}

	var family = getValue('families', '').split(",");
	var colour = getValue('colours', '').split(",");
	var priority = getValue('priority', '').split(",");
	var jailint = getValue('jailint', 6);
	var maxHL = getValue('maxHL',5);
	var hotkeys = getValue('rawkeyprefs','');
	var buyout = getValue('buyout','/');
	var FL_prior = getValue('FL_prior',3);
	var Fam_prior = getValue('Fam_prior',9);
	var defpri = getValue('defpri',5);
	var defcol = getValue('defcol','33FF66');

	var string = '<tr height="25"><td colspan="6" class="toptd">Omerta Beyond : Jail Highlighter Busting List and Options</td></tr>';
	string += '<tr height=25 class="tr"><td class="td">&nbsp;</td><td width="210" class="td"><b>Family or Ingame nick</b></td><td width="75" class="td"><b>Color</b></td><td width="76" class="td">&nbsp;</td><td width="50" class="td"><b>Priority</b></td><td class="td">&nbsp;</td></tr>';
	for(i=0;i<jailint;i++){
		if(family[i] == null) {	family[i] = ""; }
		if(colour[i] == null) { colour[i] = ""; }
		if(priority[i] == null) { priority[i] = ""; }
		string += '<tr height=25 class="tr"><td class="td">&nbsp;</td><td class="td"><img height="20" onmouseover="style.cursor=\'pointer\'" onClick="javascript:getElementById(\'family'+i+'\').value=\'\';getElementById(\'colour'+i+'\').value=\'\';getElementById(\'priority'+i+'\').value=\'\';" src="'+GM_getResourceURL("trash")+'"></img><input id="family' + i + '" value="' + family[i].replace('%20',' ') + '" type="text" name="#" class="inputbig"></td>';
		string += '<td class="td"><input id="colour' + i + '" value="' + colour[i] + '" type="text" name="color'+(i+1)+'" class="inputmiddle"></td>';
		string += '<td class="td"><A HREF="#" onClick="cp2.select(document.colorpickform.color'+(i+1)+',\'pick2\');return false;" NAME="pick2" ID="pick2"><img src="'+GM_getResourceURL("colorpicker")+'" border=0></A></td>';
		string += '<td class="td"><input id="priority' + i + '" value="' + priority[i] + '" type="text" name="#" class="inputsmall"></td><td class="td">&nbsp;</td></tr>';
	}
	string += '<tr height="25" class="tr"><td class="td" colspan="6" align="center">Friend List Priority: <input id="FL_prior" value="' + FL_prior + '" type="text" onBlur="if(this.value > 9 || this.value < 1) this.value = 3;" name="#" class="inputsmall"> || Family Priority: <input id="Fam_prior" value="' + Fam_prior + '" type="text" onBlur="if(this.value > 9 || this.value < 1) this.value = 9;" name="#" class="inputsmall"></td></tr>';
	string += '<tr height="25" class="tr"><td class="td" colspan="6" align="center">Maximum of highlight list on jailpage: <input id="maxHL" value="' + maxHL + '" type="text" onBlur="if(this.value > 5) this.value = 5;" name="#" class="inputsmall"></td></tr>';
	string += '<tr height="25" class="tr"><td class="td" colspan="6" align="center">Buy out Hotkey when in jail: <input id="buyout" value="' + buyout + '" type="text" onBlur="var h = \''+hotkeys+'\'; if(h.indexOf(this.value) != -1) this.value = \'\';" name="#" class="inputsmall"></td></tr>';

	string += '<tr height="25" class="tr"><td class="td" colspan="6" align="center">';
	string += 'Default Priority: <input id="defpri" value="' + defpri + '" type="text" name="defpri" class="inputmiddle">';
	string += ' || ';
	string += 'Default Color: <input id="defcol" value="' + defcol + '" type="text" name="defcol" class="inputmiddle"> ';
	string += '<a href="#" onClick="cp2.select(document.colorpickform.defcol,\'pick2\');return false;" name="pick2" id="pick2"><img src="'+GM_getResourceURL("colorpicker")+'" border=0></a>';
	string += '</td></tr>';

	string += '<tr height="40"><td colspan=6 class="bigtd"><button type="button" class="button" onClick="location.href = \''+PrefsLink+'&jailint=' + (parseInt(jailint)+1) + '\'">Add</button> <button type="button" class="button" onClick="location.href = \''+PrefsLink+'&jailint=' + (parseInt(jailint)-1) + '\'">Remove</button></td></tr>';
	string += '<tr height="20"><td colspan=6 class="bigtd"><button type="button" class="button" name="#" onClick="location.href = \''+PrefsLink+'&maxHL=\' + document.getElementById(\'maxHL\').value + \'&buyout=\' + document.getElementById(\'buyout\').value + \'&FL_prior=\' + document.getElementById(\'FL_prior\').value + \'&Fam_prior=\' + document.getElementById(\'Fam_prior\').value + \'&defpri=\' + document.getElementById(\'defpri\').value + \'&defcol=\' + document.getElementById(\'defcol\').value + \'&families=\'';
	fam_list = col_list = pri_list = ''
	for(i=0;i<jailint;i++) {
		fam_list += " + document.getElementById('family" +i+ "').value.toUpperCase() + ','";
		col_list += " + document.getElementById('colour" +i+ "').value.replace('#', '') + ','";
		pri_list += " + document.getElementById('priority" +i+ "').value + ','";
	}
	string += fam_list + " + '&colours='" + col_list + " + '&priority='" + pri_list
	string += '">Save Settings</button><br><span class="margintd">If someone in jail is higher than one of the settings he/she will be highlighted with the colour of the lowest priortity number</span><br>The default priority number for friends is: <b>3</b> and for family is: <b>9</b><br>The default priority and color are used when automatically adding users to list<br>The lowest and default priority for anyone in jail is <b>10</b></tr>';

	if(prefs[3]) { getID('tablejail').innerHTML = string; }
}

//---------------- Cocaine Prices ----------------
if(dlp == '/marquee.php'){
	document.addEventListener('dblclick', function() { window.location.reload(); }, true);
	if(prefs[1]){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://gm.omertabeyond.com/prices.xml.php?v='+lang.version.replace('_',''),
			headers: {'User-agent': ScriptName + ' ' + ScriptVersion + '.'+ ScriptSubVersion, 'Accept': 'application/xml,text/xml'},
			onload: function(resp){
				var marquee = document.getElementsByTagName('div')[0];
				marquee.innerHTML = "";

				var parser = new DOMParser();
				var dom = parser.parseFromString(resp.responseText, "application/xml");

				function getPrice(drug, city) { return dom.getElementsByTagName(drug)[0].getElementsByTagName(city.replace(' ', ''))[0].textContent; }

				var p = new Array;
				var q = new Array;
				var p_C = [langs.en.cities[6],langs.en.cities[1],langs.en.cities[3],langs.en.cities[5],langs.en.cities[0],langs.en.cities[4],langs.en.cities[7],langs.en.cities[2]]
				var p_id = ["6","1","3","5","nul","4","7","2"];

				for(i=0;i<=7;i++){ p[i]=getPrice('Cocaine',p_C[i]); q[i]=p[i]; }

				var max = p.sort(function(a,b){return b-a})[0];
				var min = p[(p.length-1)];

				i=0; q.forEach(function($n){
					if($n==min) q[i]='<span style="color:#' + getValue('low', '00ff00') + ';">' + $n + '</span>';
					if($n==max) q[i]='<span style="color:#' + getValue('high', 'ff0000') + ';">' + $n + '</span>';
				i++; });
				var time = dom.getElementsByTagName('Time')[0].textContent;

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

				function hoverlink(city, priceStr){
					var link = cEL('a');
					link.href = "#";
					link.style.color = '#ffffff';
					link.style.fontSize = '10px';
					if(city == "Palermo" || city == "Corleone" || city == "Las Vegas" || city == "Detroit") link.addEventListener('mouseover', function(event){ hovermenu(city, event.clientX - 525) }, true);
					else link.addEventListener('mouseover', function(event){ hovermenu(city, event.clientX + 25) }, true);
					link.addEventListener('mouseout', function(event){ hovermenuout() }, true);
					link.innerHTML = priceStr;
					return link;
				}

				function hovermenu(city, x){
					var hoverdiv = getID('hiddenbox');
					hoverdiv.style.display = 'inline';
					hoverdiv.style.left = x + "px";
					hoverdiv.innerHTML = 'Morphine: ' + getPrice("Morphine", city) + ' | ' + 'Heroin: ' + getPrice("Heroin", city) + ' | ' + 'Opium: ' + getPrice("Opium", city) + ' | ' + 'Whiskey: ' + getPrice("Whiskey", city) + ' | ' + 'Amaretto: ' + getPrice("Amaretto", city) + ' | ' + 'Rum: ' + getPrice("Rum", city);
				}

				function flytolink(city, priceStr, priceToFly, cityId){
					var link = cEL('a');
					link.href = "#";
					link.id = city;
					link.style.color = '#ffffff';
					link.style.fontSize = '10px';
					link.addEventListener('click',function(){flyto(city, priceToFly, cityId)},true);

					if(prefs[17]){
						if(city == "Palermo" || city == "Corleone" || city == "Las Vegas" || city == "Detroit"){ link.addEventListener('mouseover', function(event){ hovermenu(city, event.clientX - 525); this.style.textDecoration='underline' }, true);}
						else { link.addEventListener('mouseover', function(event){ hovermenu(city, event.clientX + 25); this.style.textDecoration='underline' }, true);}
						link.addEventListener('mouseout', function(event){ getID('hiddenbox').style.display = 'none'; this.style.textDecoration='none' }, true);
					}
					else {
						link.addEventListener('mouseover', function(){ this.style.textDecoration='underline' }, true);
						link.addEventListener('mouseout', function(){ this.style.textDecoration='none' }, true);
					}
					link.innerHTML = priceStr;
					return link;
				}

				function flyto(city, costs, cityid){
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://' + dlh + '/travel.php',
						onload: function(resp){
							var html = resp.responseText;
							if(html.indexOf('body') == -1 || html.indexOf('oTimer') != -1) {//if you can NOT travel
								var msg = html.slice(html.indexOf('</head>')+13);
								var msg = msg.replace(/<(?:.|\s)*?>/g,'');
								if(!msg) alert(lang.marquee[6] + city + "...Poker?")
								else if(msg.indexOf('clicklimit')!=-1 || msg.search(city)==-1) {
									if(msg.indexOf('oTimer')!=-1) alert(msg.replace('\t','').split('var')[0].replace(/\d/,' $&'));
									else alert(msg.replace('\t','').split('Do')[0]);
								}
								else alert(msg);
							}
							else {//if you CAN travel
								var costs = arr;
								var parts = html.split('<span');//get costs msg
								parts.forEach(function($n){
									if($n.indexOf('"nd();"') != -1 || $n.indexOf('<body') == -1) costs.push($n.slice($n.indexOf('", "')+4,$n.indexOf('")')));
								});

								var msg = costs[(cityid.replace('nul',0))];
								if(msg.indexOf('<br>') == -1) alert(msg);
								else var del = confirm(msg.replace('<br>','\n').replace('<br>','\n') + '\n\n' + lang.marquee[0] + city);

								if(del){//if user wants to travel
									if(resp.responseText.match("<script ") != null){
										GM_xmlhttpRequest({
											method: 'GET',
											url: 'http://' + dlh + '/travel.php?whereto=' + cityid,
											onload: function(resp){
												try {
													if(resp.responseText.match(lang.marquee[4])) { alert(lang.marquee[5]); }
													else {																
														var msg = resp.responseText.match(/\<h4\>(\D+)\<\/h4\>/g)[0].replace(/<[^<]+?>/g,'');
														if(msg == '') msg = lang.marquee[6] + city + "...Poker?";
														else if(msg.indexOf(city) == -1) msg = lang.marquee[6] + city + "...Click Limit?";
														else {
															var where = 0;
															where = parseInt(cityid.replace('nul','0'))+4;
															if(where) setPow('bninfo',2,where); //if a city is stored
														}
														alert(msg);
														top.frames[2].location = top.frames[2].location;
														top.frames[1].location = top.frames[1].location;
														window.location.reload();
													}
												}
												catch(e){ alert(lang.marquee[6] + city + "...");}
											}
										});
									}
									else {
										var msg = resp.responseText.slice((resp.responseText.indexOf('</head>'))+7).replace(/<(?:.|\s)*?>/g,'');
										alert((msg == '') ? (lang.marquee[6] + city + "...Poker?") : msg );
									}
								}
							}
						}
					});
				}

				var span = cEL('span');
				var priceandtime = cEL('span');

				span.appendChild(priceandtime);
				i=0;
				p.forEach(function($n){
					span.style.color = 'white';
					span.appendChild(flytolink(p_C[i], p_C[i]+': '+q[i], 500, p_id[i]));
					var separator = cEL('span');
					separator.innerHTML = ' | ';
					span.appendChild(separator);
					i++;
				});

				var link = cEL('a');
				link.href = "prices.php";
				link.target = 'main';
				link.innerHTML = lang.marquee[2];
				if(getValue('bold', '0') == '1') link.style.fontWeight = 'bold';
				link.style.color = '#ffffff';
				link.style.fontSize = '10px';
				link.addEventListener('mouseover',function(){this.style.textDecoration='underline' }, true);
				link.addEventListener('mouseout',function(){this.style.textDecoration='none' }, true);
				span.appendChild(link);
				priceandtime.innerHTML = lang.marquee[3] + time + ' | ';
				span.style.color = '#ffffff';
				span.style.fontSize = '10px';
				marquee.appendChild(span);

				city = getPow('bninfo',2,-1)
				if(city > 0) {
					city = langs.en.cities[city-4]
					getID(city).setAttribute('style',getID(city).getAttribute('style')+'font-style: italic;');
				}
				window.onload = setTimeout(function() { window.location.reload(); }, 60000);
			}
		});
	}
}

//---------------- Menu and submenus ----------------
if(dlp == '/menu.php'){
//--add additional submenus
	function appMenu(x){
		innerHTML += '</tbody></table></div></td></tr></tbody>';
		subMenu.innerHTML = innerHTML;
		subMenu.setAttribute('cellspacing','0');
		subMenu.setAttribute('cellpadding','0');

		var table = $X('/html/body/div/table['+x+']');
		table.parentNode.insertBefore(subMenu, table);
	}
	var xp = '/html/body/table/tbody/tr/td/table[3]/tbody/tr[2]/td/div/table/tbody';

	//add beyond menu
	var subMenu = cEL('table');
	var innerHTML = '<tbody><tr><th onclick="Menu.toggle(this);">Beyond</th></tr><tr><td><div class="subnav" style="overflow: hidden;"><table cellspacing="0" cellpadding="0"><tbody>';
	for(i=0;i<qlinks.length;i++) innerHTML += '<tr><td><a target="main" onmousedown="return false;" href="'+ qlinks[i] +'" class="menuLink" title="'+qtitle[i]+'">'+descr[i]+'</a></td></tr>';
	appMenu(2);
//!-end adding menus

//--start assembling variables
	if(dls.indexOf('reset') != -1) setValue('submenus','0'); //mode = oh noes!
	var submenus = getValue('submenus',0);

	//get # of submenu's
	var tables = $X('/html/body//div').getElementsByTagName('table').length;
	var subs = tables/2;
	if(db.innerHTML.search('./crewstats.php') != -1) subs--//check for crew submenu

	//get # of buttons in submenu's
	var buttons = new Array();
	for(i=1,j=0;i<=subs;i++,j++){
		var num = parseInt($X('/html/body//div/table['+(i)+']/tbody/tr'+(i==1?'':'[2]')+'/td/div/table/tbody').getElementsByTagName('tr').length);
		buttons[j] = num;
		if(i==subs) buttons[j]--; //BETA QL thingy
	}
	if(submenus!=0 && subs == submenus){ //don't act if ( nothing is saved in GM || saved # of subs != current # of subs )
		//get menuprefs from GM or set ghostprefs
		var menuprefs = new Array;
		if(getValue('buttonpref1','') != '') for(i=0;i<=subs-1;i++) menuprefs[i] = getValue('buttonpref'+(i+1));
		else if(getValue('keypref1','') != '') for(i=0;i<=subs-1;i++) menuprefs[i] = getValue('keypref'+(i+1)).replace(/[^a-z.]/ig,'1');

		//get keyprefs from GM or set ghostprefs
		var keyprefs = new Array;
		if(getValue('keypref1','') != '') for(i=0;i<=subs-1;i++) keyprefs[i] = getValue('keypref'+(i+1));
		else if(getValue('buttonpref1','') != '') for(i=0;i<=subs-1;i++) keyprefs[i] = getValue('buttonpref'+(i+1)).replace(/[0-9.]/g,'*');

		var mprefs = new Array(); var i=0;//see if submenu can be deleted totaly
		for(i=0;i<=menuprefs.length-1;i++) mprefs[i] = menuprefs[i].indexOf('1')==-1 ? 0 : 1;
	}
	var QL_xp = '//td[@class="container"]';
//!-end assembling variables

//--customs script
	//add action buttons
	var buttonMenu = GM_getResourceURL("buttonMenu");
	var buttonKey = GM_getResourceURL("buttonKey");
	var buttonReset = GM_getResourceURL("buttonReset");
	$X(QL_xp).innerHTML = $X(QL_xp).innerHTML + '<span class="quicklook">Menu: <img onMouseover="style.cursor=\'pointer\'" title="Customize Menu" onClick="location.href=\'menu.php?menu\'" src="'+buttonMenu+'"> <img onMouseover="style.cursor=\'pointer\'" title="Customize Hotkeys" onClick="location.href=\'menu.php?keys\'" src="'+buttonKey+'"> <img onMouseover="style.cursor=\'pointer\'" title="Reset menu" onClick="location.href=\'menu.php?reset\'" src="'+buttonReset+'"></span>';

	//check 'mode' and add corresponding stuff
	if(!dls || dls.indexOf('reset') != -1 || dls.indexOf('buttons') != -1){//mode = normal or user reseted
		if(submenus != 0){
			//check current menu matches with saved prefs
			var uptodate=1;var i=0;
			if(menuprefs != '' && menuprefs != null && menuprefs != 'undefined'){
				if(menuprefs.length!=subs){uptodate=0;}
				if(menuprefs.length!=keyprefs.length){uptodate=0;}
				buttons.forEach(function($n){if($n != menuprefs[i].length)uptodate=0;i++;});
			}
			else uptodate=0;;
			if(uptodate==0){alert(lang.newmenu);setValue('submenus','0');}
			else { //clear to go
				for(i=subs;i>=1;i--){
					if(mprefs[i-1]==0) $Del('/html/body//div/table['+i+']');//remove entire submenu
					else {
						for(j=buttons[i-1];j>=1;j--){ //loop buttons and see what to do with them
							xp_tr = '/html/body//div/table['+i+']/tbody/tr'+(i==1?'':'[2]')+'/td/div/table/tbody/tr['+j+']';
							kpref = keyprefs[i-1].slice(j-1,j);

							if(menuprefs[i-1].slice(j-1,j) == 0) $Del(xp_tr); //delete it!
							else if(kpref != '*'){//look for a hotkey
								but = $X(xp_tr + '/td/a');
								but.accessKey = kpref; //add it too!
								but.innerHTML = but.innerHTML + " ("+ kpref.toUpperCase() +")";
								but.addEventListener('focus',function(){this.blur();},false);
							}
						}
					}
				}
			}
		}
	}
	else { //custom menu interface
		//saving part
		if(dls.indexOf('?newmenu=') != -1) modeArr = ['Menu','newmenu','rawmenuprefs','buttonpref'];
		if(dls.indexOf('?newkeys=') != -1) modeArr = ['Hotkey','newkeys','rawkeyprefs','keypref'];
		if(dls.indexOf('?newmenu=') != -1 || dls.indexOf('?newkeys=') != -1){ //mode = user clicked save
			//update Settings
			newprefs = GetParam(modeArr[1]);
			setValue(modeArr[2],newprefs);
			for(i=0;i<=buttons.length-1;i++){
				setValue(modeArr[3]+(i+1),newprefs.slice(0,buttons[i]));
				newprefs = newprefs.slice(buttons[i]);
			}
			setValue('submenus',i);
			$X('html/body').innerHTML = "<span class='red'>" + modeArr[0] + lang.customs + "</span>" + $X('html/body').innerHTML; //succes msg
			$X('html/body').style.backgroundColor='#3F505F';

			setTimeout(function() { location.href='menu.php'; }, 2000); //refresh to see our results
		}

		//add already used hotkey script
		buyout = getValue('buyout','/'); //this is also a used hotkey
		script = cEL("script");
		script.setAttribute('type','text/javascript');
		script.innerHTML = 'function checkKey(id){for(i=0;i<=document.getElementsByTagName(\'input\').length-1;i++){var val = document.getElementsByTagName(\'input\')[i].value;if((val == document.getElementById(id).value && \'ip\'+(i+1) != id && document.getElementById(id).value != \'\') || val == \''+buyout+'\'){ alert("You\'re already using that key!"); document.getElementById(id).value = \'\'; i=100; }}}';
		$X("//head").appendChild(script);

		//mode = user doing customizing
		upmenu = 0;
		upkeys = 0;
		if(dls.indexOf('menu') != -1) upmenu=1;
		if(dls.indexOf('keys') != -1) upkeys=1;
		if(upmenu || upkeys){//we updating buttons or keys?
			window.addEventListener("load", function(){
				raw = upmenu ? getValue('rawmenuprefs','*') : getValue('rawkeyprefs','0');
				for(i=1,q=1;i<=subs;i++){
					for(j=1;j<=buttons[i-1];j++,q++){
						xp_tr = '/html/body//div/table['+i+']/tbody/tr'+(i==1?'':'[2]')+'/td/div/table/tbody/tr['+j+']';
						xp_a = xp_tr + '/td/a';

						href = $X(xp_a).href;
						content = $X(xp_a).innerHTML;
						prefx = raw.slice(q-1,q);

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
			for(i=1,q=1;i<=subs;i++) for(j=1;j<=buttons[i-1];j++,q++) inputs=q+1;

			//add right save button for the job
			save = upmenu ? 'var query=\'\';for(i=1;i<='+(inputs-1)+';i++){query += document.getElementById(\'ip\'+i).checked;}location.search = \'?newmenu=\'+query.replace(/false/g,0).replace(/true/g,1);' : 'var query=\'\';for(i=1;i<='+(inputs-1)+';i++){query += document.getElementById(\'ip\'+i).value;if(document.getElementById(\'ip\'+i).value==\'\'){query +=\'*\'}}location.search = \'?newkeys=\'+query;';
			$X(QL_xp).innerHTML = '<input type="button" onclick="' + save + '" value="Save!" id="save_button"/>';
		}
		$X(QL_xp).setAttribute("colspan", "2");//addept quick lookup colspan to match customs interface's
	}
	//beautify for fully collapsed menu in dark theme
	$X('//div[@id="menubg"]').style.borderRight = '1px solid #666666';
	$X('//div[@id="menubg"]').style.width = '99.5%';

	//extra city checker
	menuCity = $I('//th[@id="travel_cityname"]');
	for(i=0;i<8;i++) {
		if(menuCity.search(langs.en.cities[i])!=-1) { setPow('bninfo',2,i+4);} 
	}
}

//---------------- Poll & contact page 'tweaks' ----------------
if(document.referrer.indexOf('barafranca.com') != -1) { var nick = GM_getValue('nick_com',''); }
if(document.referrer.indexOf('barafranca.nl') != -1) { var nick = GM_getValue('nick_nl',''); }

if(nick) {
	if(dlp == '/html/poll/poll.php') {
		$X('//input[@class="poll_input"]').value = nick;
		$X('//textarea').focus();
	}
	if(dlp == '/contactform.php') $X('//input[@class="poll_input"]').value = nick;
}
else if(document.referrer.indexOf('gm.omertabeyond.com') != -1) {
	if(dlp == '/contactform.php') $X('//input[@class="poll_input"]').focus();
}

//---------------- 3-letter code protection and charcode filter ----------------
if(dlp == '/jail.php' || dlp == '/iminjail.php' || (dlp == '/kill.php' && dls != '?action=hire') || dlp == '/smuggling.php' || dlp == '/bullets2.php' || (dlp == '/BeO/webroot/index.php' && (dls == '?module=Crimes' || dls == '?module=Cars'))) {
	function CP(node) {
		submit = $X('//input[@type="submit"]');
		if(prefs[0]) {
			submit.style.textDecoration = 'line-through';
			submit.setAttribute('disabled',1);

			node.addEventListener('keypress',function(){ 
				function enable() {
					if(node.value.length==3) { 
						submit.removeAttribute('disabled'); 
						submit.style.textDecoration = 'none'; 
					}
					else {
						submit.setAttribute('disabled',1); 
						submit.style.textDecoration = 'line-through';
					}
				}
				setTimeout(enable,1);
			},true);
		}
		node.setAttribute('maxLength','3');
		node.setAttribute('onkeypress','javascript:lettercode=event.charCode;symcode = event.keyCode;return (lettercode>=48 && lettercode<=57 || lettercode>=65 && lettercode<=90 || lettercode>=97 && lettercode<=122 || symcode>=37 && symcode<=40 || symcode==8 || symcode==9 || symcode==13 || symcode==46 || symcode==116)? true : false;');
	}

	if($X('//img[@id="imgcode"]')){ //check for image code
		input = getELNAME('ver'); //jail, iminjail, kill, smuggling
		if(input[0]) CP(input[0]);
		else {
			input = getELNAME("ver_sys"); // bullets
			if(input[0]) CP(input[0]);
			input = getELNAME("ver_bull"); // bullets
			if(input[0]) CP(input[0]);
			else {
				input = $X('//input[@type="text"]') // crimes/cars
				if(input) CP(input);
			}
		}
	}
}

//---------------- Info Grabber ----------------
//pref bnUpdate and wait for a caller
function bnUpdate(current) { 
	var xpath = current ? '//div[@id="smsdivcontainer"]' : '//div[@id="str2dom"]'; //use current page OR xhr str2dom
	var tables = $x(xpath + '//table[@class="thinline"]');
	var values = tables[0].getElementsByTagName('td');

	var nick = values[3].textContent.split(" ")[0];
	var rank = values[13].textContent;
	var city = values[19].textContent;
	var type = values[17].textContent;
	var health = 100 - $X(xpath = '//td[@bgcolor="green"]').getAttribute('width');
	var ride = tables[3].getElementsByTagName('td')[3].textContent;

	setValue('bloodType',type); //save
	setValue('missingHealth',health);
	setValue('nick',nick);
	
	//define max b/n judging by rank
	var ranks = ['Empty-suit','Delivery Boy','Delivery Boy','Picciotto','Shoplifter','Pickpocket','Thief','Associate','Mobster','Soldier','Swindler','Assassin','Local Chief','Chief','Bruglione','Capodecina','Godfather','First Lady'];
	var maxBooze = [1,2,2,5,7,10,15,20,25,30,35,40,45,50,60,70,70,70];
	var maxNarcs = [0,0,0,1,2, 4, 5, 7, 8,10,11,13,14,16,17,20,20,20];
	for(booze=0,narc=0, i=0;i<=17;i++){ if(ranks[i]==rank) { booze = maxBooze[i]; narc = maxNarcs[i]; break; } }
	setPow('bninfo',0,narc); setPow('bninfo',1,booze); //save

	//parse city to ID
	for(var cityCode=0, i=0;i<8;i++) { if(city == langs.en.cities[i]) { cityCode = i+4; break; } }
	setPow('bninfo',2,cityCode); //save

	//parse plane to ID
	var rides = ['none','geen','Fokker DR-1','Havilland DH 82A','Fleet 7','Douglas DC-3'];
	for(plane=0, i=0;i<=5;i++){ if(rides[i] == ride) { plane = [0,0,1,2,3,4][i]; break; } }
	setPow('bninfo',3,plane); //save
}

var d = new Date(); //check once every hour for new info
if(getValue('nick','')=='' || getValue('bninfo',-1)==-1 || getValue('brcDate',-1) != d.getHours()) {
	GM_xmlhttpRequest({
		method:"GET",
		url:"http://"+dlh+"/information.php", //get info from /information.php
		onload:function(response) {
			var a = response.responseText.split('<tbody');
			if(a[2]) { //fails on clicklimit or other error
				var str2dom = cEL('div'); //we'd like to use DOM here
				str2dom.style.display = 'none';
				str2dom.id = 'str2dom';
				str2dom.innerHTML = response.responseText;
				db.appendChild(str2dom);
				bnUpdate(0); //call update fucntion

				GM_xmlhttpRequest({ //grab family and position from profile
					method:"GET",
					url:"http://"+dlh+"/user.php?nick="+getValue('nick',''),
					onload:function(resp) {
						var dummy = cEL('div'); //we'd like to use DOM here
						dummy.style.display = 'none';
						dummy.id = 'xhr';
						dummy.innerHTML = resp.responseText;
						db.appendChild(dummy);
						
						var role = 1; //default
						var pos = $X('//span[@id="position"]').getAttribute('value');
						var fam = $X('//span[@id="family"]').getAttribute('value');

						if(/None|Geen/.test(fam)) { role = 0; }
						else {
							if(/Capo (of|van):/.test(pos)) { role = 2; }
							if(/(Sottocapo|Consiglieri|Don) (of|van):/.test(pos)) { role = 3; }
						}
						setValue('family',fam);
						setPow('bninfo',4,role); //save
					}
				});

				var d = new Date(); //set check date
				setValue('brcDate',d.getHours());
			}
		}
	});
}

if(dlp == '/travel.php') { //Get city when traveling
	city = 0; //initialize to default for anything else
	text = db.textContent;
	text = text.split(' ')[2];
	citys = ["Detroit","Chicago","Palermo","New","Las","Philadelphia","Baltimore","Corleone"];
	for(i=0;i<citys.length;i++) if(citys[i] == text) city = (i+4);
	if(city) setPow('bninfo',2,city); //if traveled, save new city
}

//---------------- My Account ----------------
if(dls == '?module=Launchpad'){
	function runCode(tab) {
		if(tab=='/information.php') {
			if(prefs[31]) { $del("//img[contains(@src, 'tooltip.png')]"); }

			pad = '//div[@id="smsdivcontainer"]';
			x = pad + '//center/table/tbody/tr/td/table/tbody/tr[';
			famXP = x + '4]/td[2]';
			x2 = pad + '//center/table/tbody/tr/td[3]/table[2]/tbody/tr[';
			planeXP = x2+'3]/td[2]';
			handgunXP = x2+'5]/td[2]';
			tommygunXP = x2+'6]/td[2]';
			bguardsXP = x2+'7]/td[2]';
			jailBustXp = pad + '//center/table/tbody/tr/td[3]/table[1]/tbody/tr[';
			ksPath = pad + '//center/table/tbody/tr/td[3]/table/tbody/tr[5]/td[2]/table/tbody/tr/td';
			if(prefs[6]) { $Del(jailBustXp + '5]'); }//if remove Jailbusting Skill is on
			if(prefs[22]){
				if (prefs[6]) { $Del(jailBustXp + '5]'); }//if remove both 'Race form bar' and 'Jailbusting Skill' is on
				else { $Del(jailBustXp + '6]'); }//if remove Race form bar is on
			}

			if(/user/.test($X(x+'5]/td[2]').innerHTML)){
				capo = $X(x+'5]/td[2]').textContent.split(" ")[0];
				if(prefs[12]){ //if remove Capo Money is on
					if(/Capo/.test(capo)){
						$X(x+'5]/td[2]').innerHTML = $X(x+'5]/td[2]').innerHTML;
					} else {
						$X(x+'5]/td[2]').innerHTML = "<a href=/user.php?nick=" + capo + ">"+ capo +"</a>  <a href=http://stats.omertabeyond.com/history.php?name="+capo+"><b>?</b></a>";
					}
				} else {
					if(/Capo/.test(capo)){
						$X(x+'5]/td[2]').innerHTML = $X(x+'5]/td[2]').innerHTML;
					} else {
						$X(x+'5]/td[2]').innerHTML = "<a href=/user.php?nick=" + capo + ">"+ capo +"</a>  <a href=http://stats.omertabeyond.com/history.php?name="+capo+"><b>?</b></a> ("+ $X(x+'5]/td[2]').innerHTML.split("(")[1]+"";
					}
				}
			}
	
			$I(x+'3]/td[2]',"<a href=/user.php?nick=" + getTXT(x+'3]/td[2]') + ">"+ getTXT(x+'3]/td[2]') +"</a> <a href=http://stats.omertabeyond.com/history.php?name="+getTXT(x+'3]/td[2]')+"><b>?</b></a>");
			$I(x+'12]/td[2]',"<a href=/user.php?nick=" + getTXT(x+'12]/td[2]').split("\t")[1] + ">"+ getTXT(x+'12]/td[2]').split("\t")[1] +"</a> <a href=http://stats.omertabeyond.com/history.php?name="+getTXT(x+'12]/td[2]').split("\t")[1]+"><b>?</b></a>");
			if(/\bTranslation\b/.test($X(x+'6]/td[2]').textContent)) $I(x+'6]/td[2]',"<a href='http://dev.barafranca.com/translate/' target='_blank'>"+ $X(x+'6]/td[2]').textContent +"</a>");
			if($X(famXP) && lang.status[1].match($X(famXP).textContent)) {
				$I(famXP,"<a href='/family_recruitment.php'><b>"+ $X(famXP).textContent +"</b></a>");
			} else {
				$X(famXP).innerHTML += " <b>?</b>";
			}

			$X(bguardsXP).innerHTML = "<a href='/BeO/webroot/index.php?module=Bodyguards&action='>"+$X(bguardsXP).innerHTML+"</a>";
			if($X(planeXP) && lang.status[0].match($X(planeXP).textContent)) $I(planeXP,"<a href='/BeO/webroot/index.php?module=Shop&action=display_section&id=7'><b>"+ $X(planeXP).textContent +"</b></a>");
			if($X(handgunXP) && lang.status[0].match($X(handgunXP).textContent)) $I(handgunXP,"<a href='/BeO/webroot/index.php?module=Shop&action=buy_item&item=3'><b>"+ $X(handgunXP).textContent +"</b></a>");
			if($X(tommygunXP) && lang.status[0].match($X(tommygunXP).textContent)) $I(tommygunXP,"<a href='/BeO/webroot/index.php?module=Shop&action=buy_item&item=4'><b>"+ $X(tommygunXP).textContent +"</b></a>");
			$X('//a[@href="/BeO/webroot/index.php?module=Shop&shoptabs=8"]').href = '/BeO/webroot/index.php?module=Bloodbank&action='; //temp fix untill we fix market
		}
		if(tab=='/profile.php') { for(i=5;i>1;i--) { $Del('//div[@id="smsdivcontainer"]//center/table/tbody/tr[5]'); } }
		nickReader(); //apply nickReader again
	}

	//grab ajax event
	getID('smsdivcontainer').addEventListener('DOMNodeInserted', function (event) { 
		trigger = '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">';
		if(event.target.innerHTML.search(trigger)!=-1) { 
			runCode(selectedTab()); //we found html in the Node => run the code
		}
	}, false );

	//Try and grab info on page load
	var attempt = setInterval(function() { //using setInterval to enable use of setValue which fails in eventListener above
		if($X("//a[contains(@href, '/BeO/webroot/index.php?module=Bloodbank&action=')]")){ //if page contains health bar
			clearInterval(attempt);
			bnUpdate(1); //call update function
		}
	},1000); //no rush on updating bninfo, wait for page to load properly
}
//---------------- Remove tooltips ----------------
if(prefs[31]) { $del("//img[contains(@src, 'tooltip.png')]"); }

//---------------- Strip forum avatars ----------------
if(dlp == '/forums/view-topic.php' && prefs[35]) {
	avatarXP = "//img[contains(@src, 'omertao.png')] | //img[contains(@src, 'userimg')]";
	$x(avatarXP).forEach( function($n){ $n.width=""; $n.src=""; $n.style.border="none"; });	
}

//---------------- Bullet form ----------------
if(dlp == '/bullets2.php' && db.innerHTML.search(/table/i) != -1){//If auto fill form is on AND bullet tables exist
	var x, path, lbf, bf, BFTextXp;
	x = '/html/body//center';
	path = '/table/tbody/tr[3]/td';
	BFTextXp = x+ '[2]/table/tbody/tr/td'
	if(prefs[25]){
		window.addEventListener("load", function(){ $x('//input')[1].focus(); }, true);
		lbf = $I(x + path).split("<br>")[3].match(/\d+/g)[0];
		$x('//input')[0].value = (lbf >= 400) ? 400 : lbf;
		bf = $I(x + '[2]' + path).split("<br>")[4].replace(',','').match(/\d+/g)[0];
		$x('//input')[4].value = bf;
	}
	var v = lang.version=='_com'?0:1;
	arr = $I(BFTextXp).split(' ');
	if(arr[6+v]) { arr[6+v] = "<u>" + arr[6+v] + "</u>"; }
	arr[3+v] = "<u>" + setArr(3+v).replace('</b>','') + "</u>";		
	$I(BFTextXp,arr.join(" "));
}

//---------------- Fingons/Edo News ----------------
if(prefs[2] && dlp == '/info.php' && (lang.version=='_com'||lang.version=='_nl')) {
	function addNews() {
		//sort Omerta's
		oNews = $x('//div[@id="news"]');
		oUrl=[]; oArticles=[]; oDay=[]; oMonth=[];
		for(i=0;i<oNews.length;i++) {
			oUrl.push(oNews[i].getElementsByTagName('a')[0].href);
			oArticles.push(oNews[i].getElementsByTagName('a')[0].innerHTML);
			oDay.push(parseInt(oArticles[i].slice(0,oArticles[i].indexOf('-'))));
			oMonth.push(parseInt(oArticles[i].slice(oArticles[i].indexOf('-')+1,oArticles[i].indexOf('<')).replace(/^0/,'')));
		}

		news=[];
		url = lang.version == '_com' ? 'http://89.149.221.178/~fingon/beyond.php?a=':'http://www.edo-nieuws.nl/news.php?readmore=';
		for(o=0,f=0;(o+f)<=4;1) { //Sort by date
			nextmonth=0;
			if((oDay[o]<fDay[f] && oMonth[o]<=fMonth[f]) || (oMonth[o]>fMonth[f] && fMonth==1)) {
				if(lang.version == '_com') news.push([url+fUrl[f],fArticles[f].replace(/ /,' <i>['+lang.login[2]+']</i><br>')]);
				else news.push([url+fUrl[f],fDay[f]+'-'+fMonth[f]+ ' <i>['+lang.login[2]+']</i><br>' + fArticles[f]]);
				f++;
			} else {
				news.push([oUrl[o],oArticles[o]]);
				o++;
			}
		}
		for(i=0;i<oNews.length;i++) { //add to page
			item = oNews[i].getElementsByTagName('a')[0];
			item.href = news[i][0];
			if(news[i][1].search(lang.login[2])!=-1) item.setAttribute('target','_blank');
			item.innerHTML = news[i][1];
		}

		//Add link to homepage
		oMore = $X('//p[@class="more"]');
		fMore = oMore.cloneNode(1);
		fLink = fMore.getElementsByTagName('a')[0];
		fLink.innerHTML = fLink.innerHTML.replace(/\W/,' ') + lang.login[2];
		fLink.href = (lang.version=='_com')?FingonUrl:EdoUrl;
		fLink.setAttribute('target','_blank');

		oMore.getElementsByTagName('a')[0].innerHTML = oMore.getElementsByTagName('a')[0].innerHTML.replace(/\W/,' Omerta');
		oMore.appendChild(fLink);
	}
	if(lang.version=='_com') {
		GM_xmlhttpRequest({ //news
			method: 'GET',
			url: 'http://89.149.221.178/~fingon/index.php',
			onload: function(resp){
				html = resp.responseText;

				//sort Fingon's
				fUrl=[]; fArticles=[]; fDay=[]; fMonth=[];
				slice = html.slice(html.indexOf('Articles'));
				articles = slice.slice(slice.indexOf('<script>'),slice.indexOf('</script>')).split('a(');
				for(i=0;i<=4&&i<articles.length;i++) {
					fUrl.push(articles[i+2].slice(articles[i+2].indexOf(',')+1,articles[i+2].indexOf(',1,')));
					fArticles.push(articles[i+2].slice(articles[i+2].indexOf('\'')+1,articles[i+2].indexOf('\',')));
					fDay.push(parseInt(fArticles[i].slice(0,fArticles[i].indexOf('-'))));
					fMonth.push(parseInt(fArticles[i].slice(fArticles[i].indexOf('-')+1,fArticles[i].indexOf(' '))));
				}
				addNews();
			}
		});
	}
	if(lang.version=='_nl'){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.edo-nieuws.nl/news.php',
			onload: function(resp){//news
				html = resp.responseText;
				news = html.split('<a name=\'news_');

				fArticles=[]; fUrl=[]; fDay=[]; fMonth=[];
				for(i=0;i<5;i++){
					n = news[(i+1)];
					fUrl.push(n.slice(0,n.indexOf('\' id')));
					fArticles.push(n.slice(n.indexOf('/a>')+3,n.indexOf('</b>')));
					n = n.slice(n.indexOf('Geplaatst door'),n.indexOf("<img src='themes/Tweaked-Blue/images/border/news/readmore.gif'>"));
					n = n.slice(n.indexOf('</a>')+8,n.indexOf('-20'));
					fDay.push(parseInt(n.slice(n.indexOf('>')+1,n.indexOf('-'))));
					fMonth.push(parseInt(n.slice(n.indexOf('-')+1,n.indexOf('-')+3)));
				}
				addNews();
			}
		});
	}
}

//---------------- Jail Highlighter and Jail autoform ----------------
if(prefs[3] && dlp == '/jail.php' && $X('/html/body//form/center')){
	//assemble prefs
	words = replaceLast(getValue('families',''),',','',1).split(",");
	bgColors = replaceLast(getValue('colours',''),',','',1).split(",");
	prioritys = replaceLast(getValue('priority',''),',','',1).split(",");
	maxHL = getValue('maxHL',5);
	FL_prior = getValue('FL_prior',3);
	Fam_prior = getValue('Fam_prior',9);

	span = cEL('span');
	span.innerHTML = '<br> &nbsp;In jail: ' + $X('/html/body//form/center').textContent.slice($X('/html/body//form/center').textContent.lastIndexOf(': ')).replace(/[^0-9]/g,'') + '<br><br> &nbsp;[#] = alt+shift hotkey';
	$X('//fieldset').parentNode.insertBefore(span, $X('//fieldset').nextSibling);

	//grab ingame HL colors
	famRGB = $x('//td[@width="125px"]')[0].style.backgroundColor;
	if(famRGB=='') famHex = '';
	else {
		famRGB = famRGB.replace(/[^0-9,]/g,'');
		famRGB = famRGB.split(',');
		famHex = '#'+RGBtoHex(famRGB[0],famRGB[1],famRGB[2]);
	}

	friendRGB = $x('//td[@width="125px"]')[1].style.backgroundColor;
	if(friendRGB=='') friendHex = '';
	else {
		friendRGB = friendRGB.replace(/[^0-9,]/g,'');
		friendRGB = friendRGB.split(',');
		friendHex = '#'+RGBtoHex(friendRGB[0],friendRGB[1],friendRGB[2]);
	}

	HL_row = new Array(maxHL);
	count = j = 0;
	//add priority and bgcolor to html
	inJail = $x('//tr[@bgcolor]');
	if(inJail.length == 0) return;
	inJail.forEach(function($n){
		nicka = $n.getElementsByTagName('td')[0].innerHTML;
		if(nicka.indexOf('<a ')!=-1) nicka = nicka.slice(nicka.indexOf('<a'),nicka.indexOf('/a>')+3);
		nick = nicka.slice(nicka.indexOf('>')+1,nicka.indexOf('</')).toUpperCase();
		nick = nick.slice(nick.lastIndexOf('>')+1);

		fama = $n.getElementsByTagName('td')[1].innerHTML;
		fam = fama.slice(fama.indexOf('>')+1,fama.indexOf('</')).toUpperCase();
		fam = fam.slice(fam.lastIndexOf('>')+1);

		$n.setAttribute('priority',10); //set default priority, then check for friends and fam
		if($n.getAttribute('bgcolor') != ''){
			if($n.getAttribute('bgcolor').toLowerCase() == famHex.toLowerCase()) $n.setAttribute('priority',Fam_prior);
			if($n.getAttribute('bgcolor').toLowerCase() == friendHex.toLowerCase()) $n.setAttribute('priority',FL_prior);
		}

		for(i=0;i<=words.length-1;i++){ //loop players and see if either nick or fam matches with prefs
			ItemPriority = (prioritys[i]) ? prioritys[i] : 10;
			if((fam == words[i].replace('%20',' ')||fama.toUpperCase() == words[i].replace('%20',' ')) && parseInt($n.getAttribute('priority')) >= ItemPriority){ //also see if the priority of the fam is higher
				$n.setAttribute('bgcolor',bgColors[i]);
				$n.setAttribute('priority',ItemPriority);
			}
			if((nick == words[i].replace('%20',' ')||nicka.toUpperCase() == words[i].replace('%20',' ')) && parseInt($n.getAttribute('priority')) >= ItemPriority){//also see if the priority of the nick is higher
				$n.setAttribute('bgcolor',bgColors[i]);
				$n.setAttribute('priority',ItemPriority);
			}
		}
		if($n.getAttribute('bgcolor') != '' && count < maxHL){
			k = count+1;
			HL_row[count] = $n.cloneNode(1); //clone node for "friends" display and add hotkey
			span = cEL('span');
			span.innerHTML = '<a accesskey="'+k+'" style="color: '+HL_row[count].childNodes[7].firstChild.getAttribute('color')+'!important;" href=' + '"javascript:document.getElementById(' + "'" + j + "'" + ').click();">['+k+']</a>';
			HL_row[count].childNodes[7].insertBefore(span,HL_row[count].childNodes[7].firstChild.nextSibling);
			HL_row[count].childNodes[9].firstChild.setAttribute('onChange','javascript:document.getElementById(' + "'" + j + "'" + ').click();this.checked=false;')
			count++;
		}
		j++;
	});

	prior = 10; //highest priority
	for(i=inJail.length-1;i>=0;i--){ //loop list
		priority = parseInt(inJail[i].getAttribute('priority'));
		button = $x('//input[@type="radio"]')[i];
		button.id = i;
		playerRowTmp = button.parentNode.parentNode;
		if(priority <= prior){ //see if player has higher priority then saved priority
			prior = priority; //changes highest priority
			playerRow = playerRowTmp; //get player node
			button.checked = 1;
		}
		func = "changed = document.getElementById("+i+");"+
			"if(changed.checked){"+
				'newsel=changed.parentNode.parentNode.cloneNode(1);'+
				'oldsel=document.getElementById("show");'+
				'oldsel.parentNode.replaceChild(newsel,oldsel);'+
				'newsel.setAttribute("id","show");'+
				'buy=newsel.lastChild.previousSibling.firstChild;' + //node to add buy-out hotkey
				'buy.setAttribute("accessKey","0");' +
				'buy.firstChild.innerHTML+=" [0]";' +
			"}";
		button.setAttribute('onChange',func); //add changer for 'show selected player'
	}
	if(prior == 10){ //if no highlights set a random
		i = (Math.ceil(Math.random()*inJail.length)-1);
		if(inJail.length > 4 && (i+3) > inJail.length) i = i-3;
		button = $x('//input[@type="radio"]')[i];
		playerRow = button.parentNode.parentNode;
		button.checked = 1;
	}
	$X('//input').focus();

	//add selected player on top of table
	tr = $X('/html/body//form/center/table/tbody/tr[2]').cloneNode(1) //black line
	$X('//table[@class="thinline"]/tbody').insertBefore(tr,$X('//table[@class="thinline"]/tbody/tr'));
	tr = playerRow.cloneNode(1); //clone of selected player row
	tr.id = 'show';
	buy = tr.lastChild.previousSibling.firstChild; //node to add buy-out hotkey
	buy.setAttribute('accessKey','0');
	buy.firstChild.innerHTML += ' [0]';
	$X('//center/table[@class="thinline"]/tbody').insertBefore(tr,$X('//center/table[@class="thinline"]/tbody/tr'));

	if(maxHL==0||prior==10) return //no need to add stuff with max=0 or no HL
	//add footer
	for(i=0,p=arr;i<=4;i++){ p[i]=cEL('p'); (p[i]).innerHTML='&nbsp;'; $X('//form').parentNode.insertBefore(p[i],$X('//form').nextSibling); } //more space at bottom
	//temp fix for external css since we cant run findPos from .css ;x
	GM_addStyle('div#footerwrap{left:'+findPos($X('//table[@class="thinline"]'))[0]+'px;}');

	wrap = cEL('div');
	wrap.id = "footerwrap";
	footer = cEL('div');
	footer.id = "footer";
	footer.align = "center";
	footer.style.position = 'fixed';
	footer.style.border = '0px !important';
	footer.setAttribute('class','otable');

	friends = '<table id="friends" class="thinline" cellspacing="0" cellpadding="2" width="599" rules="none"><tr bgcolor="#000000" height="0">';
	cols = $x('//td[@class="tableheader"]');
	for(i=0;i<6;i++) friends += '<td width="'+ cols[i].offsetWidth +'"></td>';
	friends += '</tr></table>';
	footer.innerHTML = friends;
	wrap.appendChild(footer);

	$X('//form').parentNode.insertBefore(wrap,$X('//form').nextSibling); //add in fixed "friends" table
	for(i=0;i<HL_row.length;i++) if(HL_row[i]) getID('friends').appendChild(HL_row[i]); //add in "friends" rows
}

//---------------- In jail page ----------------
if(dlp == '/iminjail.php' && db.innerHTML.indexOf("<img") != -1) {
	if(prefs[3]) $X("//a").accessKey = getValue('buyout','/'); //add buy out hotkey
	if(prefs[23]) {//if go to jailpage is on
		if($I('/html').indexOf('<body></body>')!=-1||$I('/html').indexOf('<body>')==-1||!db) window.location = 'http://'+dlh+'/jail.php'; //check for blank page
		var min = 0;
		if(db.innerHTML.search('counter__minutes') != -1){
			var min = (getID('counter__minutes').getAttribute('style') != 'display: none;') ? getID('counter__minutes_value').innerHTML : 0 ;
		}
		var sec = getID('counter__seconds_value').innerHTML;
		//setTimeout("window.location='jail.php'", (((min*60) + parseInt(sec) + 2) * 1000));
		setTimeout(function() { window.location='jail.php'; }, (((min*60) + parseInt(sec) + 2) * 1000));
	}
}
if(dlp == '/iminjail.php' && db.innerHTML.indexOf("<img") == -1) {
	if(prefs[23]) {	window.location = 'http://'+dlh+'/jail.php'; }
}
if(dlp+dls == '/iminjail.php?buymeout=yes' && prefs[23]) {
	setTimeout("window.location='http://"+dlh+"/jail.php'", 1000); //possible fuckup if user wasn't in jail
}

//---------------- wrongcode ----------------
if(prefs[11]){
	if(urlsearch == '/BeO/webroot/index.php?module=Crimes&action=docrime' || urlsearch == '/BeO/webroot/index.php?module=Cars&action=docar'){
		if(db.innerHTML.search(lang.wrongcode[0]) != -1){
			db.innerHTML = lang.wrongcode[1];
			setTimeout(history.back(),1000);
		}
	}
}
//----------------- Crime Page ----------------
if(urlsearch == '/BeO/webroot/index.php?module=Crimes'){
	if(db.innerHTML.search(/table/i) != -1) { 
		if(prefs[8]) { $x('//input')[5].checked = 1; }
	}
	else if(prefs[10]) { refreshIn(); }
}
//---------------- Cars Page ----------------
if(urlsearch == '/BeO/webroot/index.php?module=Cars'){
	if(db.innerHTML.search(/table/i)>-1){
		if(prefs[8]) { //if Car Nick AF is enabled
			for(p=[], i=0;i<=3;i++) { p.push($i('//form//td[3]',i).replace(/\D|/g,'')); } //Get percentages 
			$x('//input')[(p.indexOf(p.max()+'')+1)].checked = 1; //select radio by %
		}
		$x('//input')[5].focus(); //focus
	}
	else if(prefs[10]) { refreshIn(); }
}
//---------------- DC+ info bar ----------------
if(dlp == '/mid.php'){
	setTimeout(function() { window.location.reload(); }, 30000);

	var x, x2, boXpath, healthXp, healthXpBar, rpXp, boXp;

	x = '/html/body/div/center/table/tbody/tr/td/div/div[1]/table/tbody/tr';
	x2 = '/html/body/div/center/table/tbody/tr/td/div/div[2]/table/tbody/tr';

	boXpath = x+'[3]/td[5]';
	healthXp = x2+'[2]/td[5]';
	healthXpBar = x2+'[2]/td[6]/dl/dt';
	rpXp = x2+'/td[5]';
	bgXp = x2+'[4]/td[5]';
	boXp = x2+'[3]/td[5]';
	if($X(healthXpBar)) {
		setValue('missingHealth','100' - getTXT(healthXpBar).replace('%',''));
		$I(rpXp,"<a href='/information.php' target='main'><b>R</b>ank progress:</a>");
		$I(healthXp,"<a href='BeO/webroot/index.php?module=Bloodbank&action=' target='main'><b>H</b>ealth:</a>");
		$I(healthXpBar,'<a href="BeO/webroot/index.php?module=Bloodbank&action=" target="main">'+$I(healthXpBar)+'</a>');
		$I(boXp,"<a href='jail.php' target='main'><b>B</b>usting skill:</a>");
		$I(bgXp,"<a href='/BeO/webroot/index.php?module=Bodyguards' target='main'><b>B</b>odyguards:</a>");
		if(prefs[6]){//remove busting skill bar
			$Del('/html/body/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td[6]');
			$Del('/html/body/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td[5]');
		}
	}
}
//---------------- User Profile ----------------
if(urlsearch == ('/user.php' + dls) && dls != '?editmode=true'){
	if(prefs[7]){ // if Remove ImageShack / PhotoBucket / XS / pic.leech.it / tinypic / youtube links option is on
		var xpath = "//img[contains(@src, 'imageshack.us')] | //img[contains(@src, 'photobucket.com')] | //img[contains(@src, 'xs.to')] | //img[contains(@src, 'pic.leech.it')] | //img[contains(@src, 'tinypic.com')]";
		var results = document.evaluate(xpath, document, null, 7, null);
		for (i=0;i<results.snapshotLength;i++){
			var img = results.snapshotItem(i), link = cEL('a'), br = cEL('br');
			link.setAttribute('href',img.getAttribute('src'));
			link.innerHTML = img.getAttribute('src');
			img.parentNode.appendChild(link);
			img.parentNode.appendChild(br);
			link.parentNode.removeChild(img);
		}
		//Youtube
		YT = $x('//param[contains(@value,"youtube.com")]');
		YT.forEach(function($n){
			val = $n.getAttribute('value')
			a = cEL('a');
			a.target = "_blank";
			a.href = 'http://www.youtube.com/watch?v=' + val.slice(val.lastIndexOf('/')+1);
			a.innerHTML = 'http://www.youtube.com/watch?v=' + val.slice(val.lastIndexOf('/')+1);
			$n.parentNode.parentNode.replaceChild(a,$n.parentNode);
		});
	}
	if(db.innerHTML.search('table') != -1){
		
		var status = $X('//span[@id="status"]');
		var alive = (status.innerHTML.indexOf(lang.profile[3])==-1); // alive/dead
	
		//Wealth
		var tr, x, y, z, xpath;
		tr = 11;
		x = db.innerHTML.search(lang.profile[0]);
		y = db.innerHTML.search(lang.profile[1]);
		z = db.innerHTML.search(lang.profile[2]);

		if(x==-1) tr--;
		if(y==-1) tr--;
		if(z==-1) tr--;
		xpath = "/html/body//center/table/tbody/tr["+tr+"]/td[2]";
		var wlth = $I(xpath);

		var kind = ["", " ($0 - $50.000)", " ($50.001 - $100.000)", " ($100.001 - $500.000)", " ($1.000.001 - $5.000.000)", " ($5.000.001 - $15.000.000)", " ( > $15.000.001)", " ($500.001 - $1.000.000)"], i=1;
		lang.wealth.forEach(function($n){ if(wlth.search($n) != -1){ $I(xpath,$I(xpath) + kind[i]); i=0; } if(i!=0) i++; });

		//Raceform
		xpath2 = "/html/body//center/table/tbody/tr["+(tr+1)+"]/td[2]";
		var rf = $X(xpath2).textContent;
		var q = lang.driver;
		for(i=0;i<=10;i++) {
			if(rf.match(q[i]) && (rf.length == q[i].length)) {
				$I(xpath2,(i+1) + " - " + $I(xpath2));	
			}
		}

		nick = $X('/html/body//center/table/tbody/tr[3]/td[2]/a').textContent;
		self = ($X('/html/body//center/table/tbody/tr[3]/td[2]/a').textContent.toUpperCase() == getValue('nick').toUpperCase()); // self/other
		other = $X('/html/body//center/table/tbody/tr/td/i').textContent;
		
		//DEAD or AKILLED ?
		if(!alive){
			if($X('//img').parentNode.nodeName != 'A'){
				var akill = "<span style='color: red; font-weight: bold;'> (Akill) </span>";
				status.innerHTML += akill;
			}
		}
		if(lang.version == "_com") {
				var link = cEL('a');
				link.setAttribute('class','red');
				if(other!=nick) { nick = other; } else { nick = nick; }
				link.href = 'http://stats.omertabeyond.com/history.php?name='+nick;
				link.innerHTML = lang.profile[4];
				$X('//span[@id="status"]').parentNode.appendChild(link);

				GM_xmlhttpRequest({ //Logger stuff
					method: 'GET',
					url: 'http://stats.omertabeyond.com/ob.php?user='+nick,
					headers: {'User-agent': ScriptName + ' ' + ScriptVersion + '.'+ ScriptSubVersion, 'Accept': 'application/xml,text/xml'},
					onload: function(resp){
						var parser = new DOMParser();
						var dom = parser.parseFromString(resp.responseText, "application/xml");

						function get(name) { return dom.getElementsByTagName(name)[0].textContent; }
						function lead0(str) { str+=''; if(str.length==1) { str = '0'+str; } return str; }

						if(get('OBeyond') != 'No info found'){
							var online = /5/.test(status.textContent);
							var line = status.innerHTML; //prep new innerHTML
							line = online?(line.split(' ')[0]+' '+line.split(' ')[1]+' '+line.split(' ')[2]):line;
	
							if(!online) {
								var d = new Date();
								var now = d.getTime();

								var ms = now/1000 - get('seen'); //get offline-time
								var days = ms/60/60/24;
								var hours = (days - Math.floor(days)) * 24;
								var mins = Math.floor((hours - Math.floor(hours)) * 60);
								days = Math.floor(days); hours = Math.floor(hours);
								var since = ' (' + ((days>0)?(days+'D '):'') + hours+'H ' + mins+'M)';

								d.setTime(get('seen')*1000); //get last seen date
								var last = ' '+lead0(d.getDate()) +'/'+ lead0(d.getMonth()+1) +'/'+ lead0(d.getFullYear()) +' '+ lead0(d.getHours()) +':'+ lead0(d.getMinutes()) +':'+ lead0(d.getSeconds());

								status.innerHTML = line +' - '+ last  + since + ' / ' + get('online').replace(' ','') + ' online / ';
							}
							else { status.innerHTML = line +' / '+ get('online') + ' online / '; }
						}
					}
				});
		}		

		if(alive) {//Add interesting stuff here
			if(!self){ // additions useless for self
				//Send HP's
				$X('//span[@id="hp"]').innerHTML = '<a href="honorpoints.php?who='+nick+'" class="red">'+$X('//span[@id="hp"]').innerHTML+'</a>';

				//Invite links
				if(prefs[34]) {
					tbody = $X('//tbody');
					tr = cEL('tr');
					tdl = cEL('td');
					tdr = tdl.cloneNode(1);
					tdl.setAttribute('class','subtableheader');
					tdl.innerHTML = 'Actions:';
					tdr.setAttribute('class','profilerow');

					links = '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tbody><tr>';
					links += '<td align="left" valign="top">';
					links += '<a class="red" href="BeO/webroot/index.php?module=Heist&action=&who='+nick+'">Heist</a><br>'; // heist link
					links += '</td>';
					links += '<td align="left" valign="top">';
					links += '<a class="red" href="BeO/webroot/index.php?module=Spots&action=&driver='+nick+'">Raid</a><br>'; // raid link
					links += '</td>';
					links += '<td align="left" valign="top">';
					links += '<a class="red" href="javascript:if(confirm(\'Are you sure you want to make '+nick+' your Mentor?\')) document.location.href =\'/honorpoints.php?mentor='+nick+'\';">Set Mentor</a><br>'; // mentor link
					links += '</td>';
					links += '<td align="left" valign="top">';
					links += '<a class="red" href="kill.php?search='+nick+'" onClick="">Hire Detectives</a> <br>'; // dets link
					links += '</td>';
					if(parseInt(getPow('bninfo',4,-1))>2){//check for top3 position
						links += '<td align="left" valign="top">';
						links += '<a href="/controlpanel.php?who='+nick+'">Invite to Family</a> <br>'; // family link
						links += '</td>';
					}
					links += '</tr></tbody></table>';

					tdr.innerHTML = links;
					tr.appendChild(tdl);
					tr.appendChild(tdr);
					tbody.insertBefore(tr,tbody.lastChild.previousSibling.previousSibling.previousSibling);
				}

				//Add to Jail HL
				if(prefs[3]) {
					names = getValue('families','')
					add = 1;
					if(names) {
						names = names.split(',')
						length = getValue('jailint',0)
						if(length == 0)	{ setValue('jailint',6); length=6; } // check for missing jailint
						who = nick.toUpperCase();
						for(i=0;i<length;i++) if(names[i]==who) add = 0;
					}
					row = $X('/html/body//center/table/tbody/tr[3]/td[2]'); // name row
					split = row.innerHTML.split(' / '); // split FL link and sex
					str = row.innerHTML + ' / ' + '<a href="' + dlp + '?nick='+nick+'&jh='+add+'"><span class="red">';
					str += ((add == 1) ? 'Add to ' : 'Remove from ');
					str += 'busting list</span></a>';
					row.innerHTML = str;
				}
			}
			else { //Linkify self hp's
				HPxp = $X('/html/body//center/table/tbody/tr[5]/td[2]');
				HPxp.innerHTML = '<a href="/honorpoints.php"><span style="color:red"><i>'+HPxp.innerHTML+'</i></span></a>'
			}
		}
	}
}
//---------------- Add user to jail highlighter by referral ----------------
if(dlp == '/user.php' && dls.indexOf('&jh=')!=-1){
	add = GetPost('jh');
	if(add==1){
		length = getValue('jailint',0)
		names = getValue('families','')
		cols = getValue('colours')
		pris = getValue('priority')
		who = $X('/html/body//center/table/tbody/tr[3]/td[2]/a').textContent;
		nick = who.toUpperCase();
		if(length == 0)	{setValue('jailint',6); length=6;} // check for missing jailint
		if(!names){ // check for missing data
			names = ',,,,,,'
			cols = ',,,,,,'
			pris = ',,,,,,'
		}
		names = names.split(',') // load stored data
		cols = cols.split(',')
		pris = pris.split(',')
		i=-1;
		while(names[++i] && names[i]!=nick); // find first open spot
		if(names[i]!=nick){
			if(i==length) setValue('jailint',++length); // extend jailint if neccesary
			names[i] = nick; // insert new data into arrays
			cols[i] = getValue('defcol','33FF66');
			pris[i] = getValue('defpri',5);
			setValue('families',names.join(',')); // join and save values
			setValue('colours',cols.join(','));
			setValue('priority',pris.join(','));
			alert(who + ' added to jail highlighter using default color and priority');
			link = $X('/html/body/center/table/tbody/tr[3]/td[2]/a[3]');
			link.href = dlp + '?nick='+who+'&jh=0';
			link.innerHTML = '<span class="red">Remove from busting list</span>';
		}
		else alert('Oops! ' + who + ' is already in your busting list!');
	}
	else if(add==0){
		length = getValue('jailint',0)
		if(length == 0)	{setValue('jailint',6); length=6;} // check for missing jailint
		names = getValue('families','').split(',') // load data
		cols = getValue('colours').split(',')
		pris = getValue('priority').split(',')
		who = $X('/html/body//center/table/tbody/tr[3]/td[2]/a').textContent;
		nick = who.toUpperCase();
		i=-1;
		while(names[++i] && names[i]!=nick && i<length); // find user
		names[i] = '' ;// remove user and data
		cols[i] = '';
		pris[i] = '';
		setValue('families',names.join(',')); // join and save values
		setValue('colours',cols.join(','));
		setValue('priority',pris.join(','));
		alert(who + ' was removed from the busting list');
		link = $X('/html/body//center/table/tbody/tr[3]/td[2]/a[3]');
		link.href = dlp + '?nick='+who+'&jh=1';
		link.innerHTML = '<span class="red">Add to busting list</span>';
	}
}
//---------------- Bank ----------------
if(dlp == '/bank.php') {
	// add amt of interest next to %
	money = $x("//table")[2].getElementsByTagName("td")[2].textContent; // check for banked money
	if(!money.split(' ')[1]) { // money in bank
		rx = $x("//table")[2].getElementsByTagName("td")[6].textContent // get recieved amt
		tmp = 1*rx.replace(/\D/g,'') - 1*money.replace(/\D/g,''); // calc interest
		str ='';
		while(tmp > 0) {
			if(str!='') {
				while(str.length % 4 !=3 ) str = '0' + str;
				str = ',' + str;
			}
			dec = (tmp % 1000)+'';
			str = dec + str;
			tmp = Math.floor(tmp/1000);
		}
		intLine = $x("//table")[2].getElementsByTagName("td")[4]
		intLine.innerHTML += ' &rarr ($'+str+')';
	}
	// clickable bank amts
	if(prefs[5] && db.innerHTML.search(/table/i) != -1){
		var table, td, td2, bank, pocket;
		table = $x("//table")[2];
		td = table.getElementsByTagName("td")[2];
		if(td.textContent.substring(0, lang.bank[0]) == lang.bank[1]) var o = 2; else var o = 9;
		td2 = table.getElementsByTagName("td")[o];
		bank = td.textContent.replace(/\D/g,'');
		td.innerHTML = '<a href="#" onclick="document.getElementsByName(\'amounttpob\')[0].value = \'' + bank +'\'; document.getElementsByTagName(\'input\')[8].checked = true; document.getElementsByName(\'amounttpob\')[0].focus();">' + td.textContent + '</a>';
		pocket = td2.textContent.replace(/\D/g,'');
		td2.innerHTML = '<a href="#" onclick="document.getElementsByName(\'amounttpob\')[0].value = \'' + pocket +'\'; document.getElementsByTagName(\'input\')[7].checked = true; document.getElementsByName(\'amounttpob\')[0].focus();">' + td2.textContent + '</a>';
		intTbl = $x("//table")[1].getElementsByTagName("tr")
		for(i=2; i<11; i++) {
			for(j=1;j<3;j++) {
				txt = intTbl[i].childNodes[j].textContent;
				amt = txt.replace(/\D/g,'')*1
				amt = (amt < pocket ? amt : pocket)
				if(i!=10||j!=2) intTbl[i].childNodes[j].innerHTML = '<a href="#" onclick="document.getElementsByName(\'amounttpob\')[0].value = \'' + amt +'\'; document.getElementsByTagName(\'input\')[7].checked = true; document.getElementsByName(\'amounttpob\')[0].focus();">' + txt + '</a>';
			}
		}
	}
	// Calculators
	func1  = 'javascript: var amt=this.value.replace(/\\D/g,\'\'); if(amt){ get = document.getElementById(\''; // put ID here
	func2 = '\'); if(get){ tmp = \'\'+Math.round(amt'; // put factor here
	func3  = '); str =\'\'; while(tmp > 0){ if(str!=\'\'){ while(str.length % 4 !=3 ){ str = \'0\' + str;};';
	func3 += 'str = \',\' + str;};dec = (tmp % 1000)+\'\';str = dec + str;tmp = Math.floor(tmp/1000);};';
	func3 += 'get.textContent = \'$\' + str}; };';
	func_switch  = '* (amt >= 1000000 ? (amt >= 3000000 ? (amt >= 6000000 ? (amt >= 10000000 ? (amt >= 15000000 ? ';
	func_switch += '(amt >= 21000000 ? (amt >= 27000000 ? (amt >= 35000000 ? 1.01 : 1.015) : 1.02) : 1.025 ) : 1.03) : 1.035)';
	func_switch += ' : 1.04) : 1.045) : 1.05 )';
	tbl = '<table class="thinline" width="100% rules="none" align="center">';
	tbl +='<tr><td class="tableheader" colspan="4">Calculators</td></tr>';
	tbl +='<br>';
	tbl +='<tr><td align="right" width="25%">You send:</td>';
	tbl +='<td align="center" width="25%">';
	tbl += '<input type="text" value="" onKeyUp="'+func1+'get'+func2+'*0.9'+func3+'">';
	tbl += '</td><td align="right" width="25%">User gets:</td><td align="center" id="get" width="25%">$0</td></tr>';
	tbl +='<tr><td align="right" width="25%">You want:</td>';
	tbl +='<td align="center" width="25%">';
	tbl += '<input type="text" value="" onKeyUp="'+func1+'give'+func2+'/0.9'+func3+'">';
	tbl += '</td><td align="right" width="25%">User sends:</td><td align="center" id="give" width="25%">$0</td></tr>';
	tbl +='<br>';
	tbl +='<tr><td align="right" width="25%">You put into bank:</td>';
	tbl +='<td align="center" width="25%">';
	tbl += '<input type="text" value="" onKeyUp="'+func1+'int'+func2+func_switch+func3+'">';
	tbl += '</td><td align="right" width="25%">You will recieve:</td><td align="center" id="int" width="25%">$0</td></tr>';
	tbl +='<br>';
	tbl += '</table>';
	$x("//table")[4].parentNode.innerHTML += '<br>'+tbl;
}
//---------------- Garage Crusher ----------------
if(dlp == '/garage.php'){
	function checkcar(car){
		types = new Array;
		types[0] = ['h',8,9,13,15,16,17,18,19,21,22,27,32,34,35,40,43];
		types[1] = ['oc',23,25,26,28,29,30,31,33,39,41,42];
		types[2] = ['moc',45,47,48];
		types[3] = ['tr',23,47,54];
		types.forEach(function(array){ array.forEach(function($n){if($n==car) eval(array[0] + 'car=1;')}) });
	}
	//crusher
	var rows = $x('//tr').length;

	if(prefs[24]) {
		for(i=2;i<rows-2;i++) {
			y = "/html/body//form//center/table/tbody/tr["+(i+2)+"]/td[2]/a";//get car
			car = $X(y).href.match(/\d+/g)[0];
			hcar = occar = moccar = 0;
			checkcar(car);

			z = "/html/body//form//center/table/tbody/tr["+(i+2)+"]";// get the row
			if(hcar==1){ $X(z).setAttribute('class','heistCar'); $X(z).setAttribute('onmouseout','this.className="heistCar";'); }
			if(occar==1){ $X(z).setAttribute('class','ocCar'); $X(z).setAttribute('onmouseout','this.className="ocCar";'); }
			if(moccar==1){ $X(z).setAttribute('class','mocCar'); $X(z).setAttribute('onmouseout','this.className="mocCar";'); }
		}
	}
	//add amount of bullets
	head = $X('//h2');
	cars = head.textContent;
	cars = cars.slice(cars.indexOf('-'));
	cars = cars.slice(cars.indexOf('0 ')+1);
	cars = cars.replace(/[^0-9]/g,'');
	if(cars>0) head.innerHTML = head.innerHTML + ' Potential Bullets: ' + cars*12;

	var xpath = "/html/body//form//center/table/tbody/tr[" + rows + "]/td"//add menu
	var string = '<td><label><input type="checkbox" checked="1" ';
	$I(xpath,$I(xpath) +
	' <br><br><hr><br>' +
	' Select if worth is <select size="1" id="X"><option value="1">under</option><option value="0">above</option></select>: $ <input type="text" value="6000" maxlength="5" size="8" id="max"/>' +
	'<table><tr>'+string+'id="heist">Skip Heist cars</label></td>'+string+'id="oc">Skip OC cars</label></td>'+'</tr><tr>'+string+
	'id="truck">Skip Trucks</label></td>'+string+'id="moc">Skip MOC cars</label></td>'+'</tr><tr>'+string+'id="nodam">Skip 0% cars</label></td><td>&nbsp;</td>'+'</tr></table>'+
	' <input type="button" onclick="javascript:document.location.href = \'garage.php?max=\' + document.getElementById(\'max\').value + \'&select=\' + document.getElementById(\'X\').value + \'&truck=\' + (document.getElementById(\'truck\').checked ? \'1\' : \'0\') + \'&oc=\' + (document.getElementById(\'oc\').checked ? \'1\' : \'0\') + \'&moc=\' + (document.getElementById(\'moc\').checked ? \'1\' : \'0\') + \'&heist=\' + (document.getElementById(\'heist\').checked ? \'1\' : \'0\') + \'&nodam=\' + (document.getElementById(\'nodam\').checked ? \'1\' : \'0\') + ' + (GetPost('page')=='' ? '\'' : '\'&page=' + GetPost('page')) + '\';" value="Go" name="action"/>');

	if(ls.length > 1){//select cars
		if(ls.indexOf('heist') != -1 || ls.indexOf('nodam') != -1 || ls.indexOf('max') != -1 || ls.indexOf('oc') != -1){
			var max=GetPost('max'), truck=GetPost('truck'), oc=GetPost('oc'), moc=GetPost('moc'), heist=GetPost('heist'), nodam=GetPost('nodam'), select=GetPost('select'), a=0, y, car, z, perc, types;
			for(i=2;i<rows-2;i++){
				y = "/html/body//form/center/table/tbody/tr["+(i+2)+"]/td[2]/a";//get car
				car = $X(y).href.match(/\d+/g)[0];
				z = "/html/body//form/center/table/tbody/tr["+(i+2)+"]/td[3]";//get percentage damage
				perc = $I(z);
				perc = parseInt(perc.slice(0,perc.indexOf("%")));

				var hcar=0, occar=0, trcar=0, moccar=0;
				checkcar(car);

				var stop=0; //check if car needs to be skipped
				if((heist==1 && hcar==1)||(oc==1 && occar==1)||(truck==1 && trcar==1)||(moc==1 && moccar==1)||(nodam==1 && perc==0)) stop=1;

				if(stop == 0){
					tr = $i('//tr',(i+1)); //get worth
					tr = (tr.indexOf(")") == -1) ? tr.slice(tr.indexOf("%")) : tr.slice(tr.indexOf(")"));
					tr = tr.replace("<td>","");
					tr = tr.slice(tr.indexOf("$")+6);
					tr = tr.replace("<td>","");
					tr = tr.slice(0,tr.indexOf("<")-3);
					tr = tr.replace(",","");
					tr = parseInt(tr);

					if((tr < max && select==1)||(tr > max && select==0)) $X("/html/body//form/center/table/tbody/tr["+(i+2)+"]/td[6]/input[2]").checked = true;
				}
			}
		}
	}	
}

//---------------- Statistics ----------------
if(urlsearch == '/BeO/webroot/index.php?module=Statistics'){
	//change all users link
	$X("//a[contains(@href, '/allusers.php')]").href = '/allusers.php?start=0&order=lastrank&sort=DESC';

	info = cEL('div');
	info.id = 'info';
	info.style.display = 'none';
	info.innerHTML = getValue('nick','');
	db.appendChild(info);

	function runCode(tab) {
		if(tab=='/compress.php?r=statistics'){
			var a, b, x, y;
			a = "//center/table[";
			b = "]/tbody/tr/td";
			y = ['dfams','honour','cdtc','fams','bf','book','roul','num','slot','bj','pb'];
			ql = lang.stats[1];
			qLinks = "<table class='thinline' width='90%' rules='none' cellspacing='0' cellpadding='2'><tbody><tr><td class='tableheader' align='center'>";
			keys = [1,2,3,4,5,6,7,8,9,0,'-','='];
			for(i=0;i<=10;i++){ 
				qLinks += ((i>0)?' - ':'') + '<a href="#'+y[i]+'" accessKey="' + keys[i] + '"><b>'+ql[i]+'</b></a>';
				$I(a+(i+4)+b,"<a name='" + y[i] + "'>" + $I(a+(i+4)+b) + "</a>&nbsp;&nbsp;&nbsp;<a href='#'>&uarr; <u>"+lang.stats[0]+"</u> &uarr;</a>"); 
			}
			qLinks += '</td></tr><tr><td height="1" bgcolor="black"></tr></tbody></table>' + $X('//center').innerHTML;
			$X('//center').innerHTML = qLinks;
		}
		if(tab == '/allusers.php?start=0&order=lastrank&sort=DESC' || tab == '/compress.php?r=usersonline' || tab == '/compress.php?r=statistics') {		
			nick = $I('//div[@id="info"]').split(" ")[0]; //look it's me
			if(nick!=='') {
				names = $x('//a');
				names.forEach(function($n){	
					if($n.textContent == nick || $n.textContent == nick+'+') {
						$n.innerHTML = '<span class="green">' + $n.innerHTML + '</span>'; 
					}
				});
			}
			nickReader(); //apply nickReader again
		}
	}

	getID('smsdivcontainer').addEventListener('DOMNodeInserted', function (event) { 
		trigger = '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">';
		if(event.target.innerHTML.search(trigger)!=-1) { runCode(selectedTab()); }
	}, false);
}
//---------------- look it's me ----------------
if(dlp == '/allusers.php') {
	nick = getValue('nick','');
	if(nick!=='') {
		names = $x('//a');
		names.forEach(function($n){	
			if($n.textContent == nick || $n.textContent == nick+'+') {
				$n.innerHTML = '<span class="green">' + $n.innerHTML + '</span>'; 
			}
		});
	}
}
//---------------- Family page ----------------
if(prefs[13] && dlp == '/family.php'){
	//get tops
	anchor = $x('//table//tr[1]//table[@height="100%"][1]//a');
	tops = new Array;
	tops.push(anchor[0]);
	if(anchor[1]) tops.push(anchor[1]);
	if(anchor[2]) tops.push(anchor[2]);

	nTop = tops.length; //# tops
	SorC = (nTop == 3) ? 2 : /Consi/.test($X('//table').textContent) //Sotto or Consi

	don = tops[0].textContent;
	sot = (nTop>1&&(nTop==3||SorC==0)) ? tops.pop().textContent : null;
	con = (nTop>1&&(nTop==3||SorC==1)) ? tops.pop().textContent : null;

	//get capos
	aCapos = new Array();
	lineup = $x('//tr[@valign="top"]//td[@class="subtableheader"]')
	for(i=0;i<lineup.length;i++) aCapos.push('#'+lineup[i].textContent+"#");
	sCapos = aCapos.join();

	//add capos list to top table
	if(aCapos.length>1){//no need to add empty list
		target = $X('//table//table//tr['+(nTop+6)+']');
		capoTr = target.cloneNode(1); //no need to make our own
		capoTr.getElementsByTagName('td')[0].innerHTML = 'Capos:';

		capos = '';
		aCapos.forEach(function($n){ n = $n.replace(/#/g,''); capos += '<a href="user.php?nick='+n+'">'+ n +'</a>, '; });
		capos = capos.replace(/, $/,''); //no last comma
		capoTr.getElementsByTagName('td')[1].innerHTML = capos;
		target.parentNode.insertBefore(capoTr,target); //insert list
		
	}
	else nTop--;

	//get objectowners
	aOwners = new Array();
	nObjects = $x('//table[@class="thinline"]')[2].getElementsByTagName('tr').length-4;
	for(i=0;i<nObjects;i++) {
		td = $X('/html/body//center/table/tbody/tr[2]/td/table/tbody/tr['+(i+5)+']/td[3]');
		owner = td.textContent;
		aOwners.push('#'+owner+'#'); //additional ## to prevent subtring recognision
		td.innerHTML = '<a href="user.php?nick='+owner+'">'+owner+'</a>'; //linkify
	}
	sOwners = aOwners.join();

	//get onlines
	aOnline = new Array();
	$x('//a[@style="color: blue;"]').forEach(function($n){aOnline.push('#'+$n.textContent+'#')});
	sOnline = aOnline.join();

	//mark VIP's and online's
	me = getValue('nick','');
	$x('//a[contains(@href,"user.php")]').forEach(function($n){
		n = $n.textContent; //nick
		color = 'blue'; //default online color
		vip = tPos = '';
		if(n==don){ $n.innerHTML = '<u>'+n+'</u><small><sup>[D]</sup></small>'; color = 'red'; tPos='[D]'; }
		if(n==sot){ $n.innerHTML = '<u>'+n+'</u><small><sup>[S]</sup></small>'; color = 'red'; tPos='[S]'; }
		if(n==con){ $n.innerHTML = '<u>'+n+'</u><small><sup>[C]</sup></small>'; color = 'red'; tPos='[C]'; }

		if(sCapos.search('#'+n+'#')!=-1) { $n.innerHTML = '<u>'+n+'</u><small><sup>(c)'+tPos+'</sup></small>'; color = (tPos?'red':'orange'); vip = '(c)'+tPos; }

		if(sOwners.search('#'+n+'#')!=-1) { $n.innerHTML = (vip!=''?'<u>':'')+n+(vip!=''?'</u>':'')+'<small><sup>(O)'+vip+tPos+'</sup></small>'; if(vip=='') color = 'green'; }

		if(sOnline.search('#'+n+'#')!=-1) $n.setAttribute('class',color);
		if(n==me) $n.innerHTML = '>'+$n.innerHTML+'<';

	});
	//add legend to members table
	memTable = $x('//table[@class="thinline"]')[6].getElementsByTagName('tr');
	memTable[0].innerHTML = "<td class='tableheader' style='text-align: left!important;'>&nbsp;Members:</td><td class='tableheader' style='font-weight: normal !important;text-align: right!important;''><span><sup>(<u>capo/top3</u>) - (online > <span class='blue'>member</span> | <span class='green'>objectowner</span> | <span class='orange'>capo</span> | <span class='red'>top3</span>)</sup></span>&nbsp;</td>";
	memTable[1].getElementsByTagName('td')[0].setAttribute('colspan','2'); //you break it, you repair it
	memTable[2].getElementsByTagName('td')[0].setAttribute('colspan','2');

	//add % online
	membersL = $X('//table//table//tr['+(nTop+8)+']/td');
	membersR = $X('//table//table//tr['+(nTop+8)+']/td[2]');
	mem = parseInt(membersR.textContent);
	membersR.innerHTML = Math.round(aOnline.length / mem * 100) + '% ('+aOnline.length + ' / ' + membersR.textContent + ' )';
	membersL.innerHTML = membersL.textContent.replace(':','') + ' Online:';

	//add # space left
	HQ = $X('//table//table//tr['+(nTop+10)+']/td[2]');
	HQ.innerHTML = HQ.textContent + ' (' + (parseInt(HQ.textContent)-mem) + ' open )';

	//calc CD/GF promos
	promo = $x('//table[@class="thinline"]//td[@class="tableitem"]//table//tr');

	
	var chiefP = promo[2].getElementsByTagName('td')[7].textContent.replace(/\D/g,'');
	var brugP = promo[3].textContent.replace(/\D/g,'');
	if(brugP != '0' && chiefP !='0'){
		var percentage = ((brugP-chiefP)/chiefP);
	}
	else {
		var percentage = 0;
	}
	var cdP = (parseInt(brugP*percentage)+parseInt(brugP));
	var gfP = (parseInt(cdP*percentage)+parseInt(cdP));

	promo[3].innerHTML = '<td>Bruglione</td><td>$ '+commafy(brugP)+'</td><td>Capodecina</td><td>$ '+commafy(cdP)+'</td><td>GF / FL</td><td>$ '+commafy(gfP)+'</td><td>&nbsp;</td><td>&nbsp;</td>';

}

//---------------- Manage Users (top3 only) ----------------
if(dlp + dls == '/controlpanel.php' + dls){ //invite from profile
	$X('//input[@name="invite"]').value = GetParam('who');
}
if(dlp == '/cpuser.php' && db.innerHTML.search('type="password"')==-1){
//--Add Capo Money list + calc
	txt = $x('//td[@bgcolor="white"]');//CapoMoney txt
	nick = $x('//td[@class="tableheader"]/b');//Capo's
	nick.splice(0,1);//remove first table (not a capo table)
	table = $X('//table');//select first table

	//setup new table
	newTable = cEL('table');
	newTable.setAttribute('cellspacing','0');
	newTable.setAttribute('cellpadding','3');
	newTable.setAttribute('bordercolor','black');
	newTable.setAttribute('cellspacing','0');
	newTable.setAttribute('border','1');
	newTable.setAttribute('bgcolor','#a8a8a8');
	newTable.setAttribute('width','600');
	newTable.setAttribute('rules','none');
	//clone header from existing table
		headTr = table.getElementsByTagName('tr')[0].cloneNode(1);
		headTr.getElementsByTagName('td')[0].innerHTML = '<b>CapoMoney\'s</b>';
		blackTr = table.getElementsByTagName('tr')[1].cloneNode(1);
	newTable.appendChild(headTr);
	newTable.appendChild(blackTr);
	//add CM list | switch to !DOM :D
		newTr = cEL('tr');
			newTd = cEL('td');
				list = '<table width="100%">'
				list += '<tr><td><b>Capo</b></td><td><b>CapoMoney</b></td><td><b>to CD</b></td><td><b>to GF</b></td></tr>';
				for(i=0;i<nick.length;i++){//loop all capo's
					name = nick[i].textContent.slice(nick[i].textContent.indexOf(' '),nick[i].textContent.lastIndexOf(' (')).replace(/\s/,'');
					list += '<tr><td><a href="http://'+dlh+'/user.php?nick='+name+'">'+name+'</a>';
					list += '</td><td>';
					CM = txt[i].innerHTML.slice(0,txt[i].innerHTML.indexOf('<'));
					CM = CM.replace(/[a-zA-Z]| |\s/g,'');
					list += CM.replace('$','$ ') + '</td><td>';
					CM = CM.replace(/[^0-9]/g,'');
					list += (7500000 - CM)>0 ?  '$ ' + commafy((7500000 - CM)) + '</td><td>' : '<b>X</b></td><td>';//CD
					list += (20000000 - CM)>0 ? '$ ' + commafy((20000000 - CM)) + '<td></tr>' : '<b>X</b></td><tr>';//GF
				}
				list += '</table>';
			newTd.innerHTML = list;
		newTr.appendChild(newTd);
	newTable.appendChild(newTr);

	table.parentNode.insertBefore(newTable,table.nextSibling);//add newTable to page
	table.parentNode.insertBefore(cEL('p'),table.nextSibling);//need more space ;)
}
//Add 'last online time' in readable format on mouseover
if((dlp == '/cpuser.php' || dlp == 'capocp.php') && db.innerHTML.search('type="password"')==-1){ //untested for Capo CP, but should work too
	function R(num) { return num - Math.floor(num); }
	d = new Date;

	trs = $x('//tr[@valign="top"]');
	trs.forEach(function($n){
		if(/:/.test($n.textContent) && /-/.test($n.textContent)){//check for a timer format
			$n.getElementsByTagName('td')[2].addEventListener('mouseover',function(){
				td = $n.getElementsByTagName('td')[2];
				txt = td.textContent.replace(/\t|\n/g,'');

				lastOn = new Date();
				lastOn.setSeconds(txt.slice(txt.lastIndexOf(':')+1));
				lastOn.setMinutes(txt.slice(txt.indexOf(':')+1,txt.lastIndexOf(':')));
				lastOn.setHours(txt.slice(txt.indexOf(' ')+1,txt.indexOf(':')));
				lastOn.setDate(txt.slice(0,txt.indexOf('-')));
				lastOn.setMonth(parseInt(txt.slice(txt.indexOf('-')+1,txt.lastIndexOf('-')))-1);
				lastOn.setFullYear(parseInt(txt.slice(txt.lastIndexOf('-')+1,txt.lastIndexOf(' '))));

				time = (((d-lastOn)/1000/60)+d.getTimezoneOffset())*60
				days = time/60/60/24;
				hours = R(days)*24;
				mins = R(hours)*60;
				secs = R(mins)*60;
				since = Math.floor(days)+'D ' + Math.floor(hours)+'H ' + Math.floor(mins)+'M ' + Math.floor(secs)+'S';

				td.setAttribute('name',td.innerHTML);
				td.style.fontWeight = 'bold';
				td.innerHTML = since;
			},true);
			$n.getElementsByTagName('td')[2].addEventListener('mouseout',function(){
				td = $n.getElementsByTagName('td')[2];
				td.style.fontWeight = 'normal';
				td.innerHTML = td.getAttribute('name');
			},true);
		}
	})
}
//---------------- Kill password remover ----------------
if(prefs[14]){
	var x = db.innerHTML;
	if(dlp == '/kill.php' && x.indexOf("table") != -1 ) $Del("/html/body/center/table/tbody/tr[5]");
	if(/search/.test(dls)) {
		$X('//input[@name="name"]').value = GetParam('search'); 
		$X('//input[@name="name"]').parentNode.lastChild.focus();
	}
}
//---------------- Group Crimes AF ----------------
if(prefs[26]){
	//Heist AF
	if((/\bHeist\b/).test(dls)){
		if(/gun/.test(db.innerHTML) && /carid/.test(db.innerHTML)==false){
			if(getELNAME('bullets')[0]) getELNAME('bullets')[0].value = '50';
			if(getELNAME('gun')[0]) getELNAME('gun')[0].value = "real";
			dr = getELNAME('driver')[0];
			if(dls.indexOf('who') != -1) dr.value = dls.split('&who=')[1]; // referral from profile page
			dr.focus();
		}
		if(/action=go/.test(db.innerHTML)) {
			$x('//input')[10].focus();
		}
		if(/carid/.test(db.innerHTML)) {
			$X('//input').focus();
		}
	}
	//OC AF
	if((/orgcrime/).test(dlp)){
		if($X('//a[contains(@href, "takepart=yes")]')){ $X('//a[contains(@href, "takepart=yes")]').focus(); }
		if(/countsafehouse/.test(db.innerHTML)){ getELNAME('countsafehouse')[0].checked = true; }
		if(/bulletz/.test(db.innerHTML)){
			$x('//input')[1].focus();
			$X('//input').value = '100';
			$x('//option')[1].selected = true;
		}
		if(/exploz/.test(db.innerHTML)){
			$x('//input[@type="radio"]')[1].checked = true;
			$x('//input')[2].focus();
		}
		if(/caridz/.test(db.innerHTML)) {
			$X('//input').focus();
		}
		if(/expexp/.test(db.innerHTML)) {
			$X('//input').focus();
		}
	}
	//MOC AF
	if((/MegaOC/).test(dls)){
		if(/action=setexplosives/.test(db.innerHTML)){// as EE
			$x('//input[@type="radio"]')[2].checked = true;
			$x('//input')[3].focus();
		}
		if(/action=setcar/.test(db.innerHTML)) {
			$X('//input').focus();//as DR
		}
		if(/action=setbullets/.test(db.innerHTML)){//as WE
			$X('//input').value = 500;
			$x('//input')[1].focus();
		}
		if(/drivers/.test(db.innerHTML)) {
			$X('//input').focus();//as LE
		}
	}
	//Spot raid
	if((/Spots/).test(dls)){
		$x('//input[@name="bullets"]').forEach(function($n){ $n.value = 200; });
		if(/driver/.test(dls)) { 
			$x('//input[@name="driver"]').forEach(function($n){ $n.value = GetParam('driver'); });
		}
	}
}
//----------------Race AF ----------------
if(prefs[29]){
	if(dlp == '/races.php'){
		if(/do_race/.test(db.innerHTML)) $x('//input[@type="submit"]')[0].focus(); 
		if(/racer2/.test(db.innerHTML)) $X('//input[contains(@name, "racer2")]').focus();
		if(/class=\"Normal\"/.test(db.innerHTML)) $x('//a[contains(@href, "decision=1")]')[0].focus();
		if(!/input/.test(db.innerHTML) && !/table/.test(db.innerHTML)) {
			if(db.innerHTML.match(lang.race[0])) { 
				db.innerHTML = db.innerHTML;
			} else {
				db.innerHTML = db.innerHTML + '<br><a href="/BeO/webroot/index.php?module=Mail">><u>Inbox</u><</a>';
			}
		}
	}
}
//---------------- Blood AF ----------------
if(prefs[27]){
	if(dls == '?module=Bloodbank&action='){
		if($X('//input')){
			$X('//input').value = getValue('missingHealth');
			var TypeA, TypeB, TypeAB, Type0, Type, x, y, z;

			//setup costs row
			table = $X('/html/body/table/tbody/tr[2]/td/table');

			prices = $x('//td[@align="center"]');//4,5,6,7
			tr = '<tr><td> <font size="2"> <b> &nbsp;Total Costs </b></font></td><td align="center"><font size="2" id="A"></font></td><td align="center"><font size="2" id="B"></font></td><td align="center"><font size="2" id="AB"></font></td><td align="center"><font size="2" id="O"></font></td></tr>';
			table.innerHTML = table.innerHTML + tr;

			function getType(num) getTXT('/html/body/table/tbody/tr[2]/td/table/tbody/tr[3]/td['+num).replace('\$','');
			function setType(num) $x('//option')[num].selected = true;
			function calc(a,b,ab,o) {//see if user can buy bloodtype and then calc total price
				missing = getValue('missingHealth');
				getID('A').innerHTML = a ? '$' + missing * prices[9].textContent.replace('$','') : 'X';
				getID('B').innerHTML = b ? '$' + missing * prices[10].textContent.replace('$','') : 'X';
				getID('AB').innerHTML = ab ? '$' + missing * prices[11].textContent.replace('$','') : 'X';
				getID('O').innerHTML = o ? '$' + missing * prices[12].textContent.replace('$','') : 'X';
			}

			TypeA = getType('2]');
			TypeB = getType('3]');
			TypeAB =getType('4]');
			Type0 = getType('5]');
			Type = getValue('bloodType');

			if(Type == 'B'){
				x = Math.min(TypeB,Type0);
				if(TypeB == x) setType(0);
				if(Type0 == x) setType(1);
				calc(0,1,0,1);
			}
			if(Type == 'A'){
				y = Math.min(TypeA,Type0);
				if(TypeA == y) setType(0);
				if(Type0 == y) setType(1);
				calc(1,0,0,1);
			}
			if(Type == 'AB'){
				z = Math.min(TypeA,TypeB,TypeAB,Type0);
				if(TypeA == z) setType(0);
				if(TypeB == z) setType(1);
				if(TypeAB == z) setType(2);
				if(Type0 == z) setType(3);
				calc(1,1,1,1);
			}
			if(Type == '0') {
				setType(0);
				calc(0,0,0,1);
			}

			$x('//input')[1].focus();
		}
	}
}
//---------------- HP+Mentor AF ----------------
if(dlp == '/honorpoints.php' && dls){
 	inputs = $x('//input');
 	nick = dls.split('=')[1]; // get nick from referrer
 	if(dls == '?who='+nick){
 		inputs[2].value = nick;
 		inputs[3].value = '';
 		inputs[3].focus();
 	}
 	if(dls == '?mentor='+nick ) {
 		inputs[0].value = nick;
 		inputs[1].focus();
 	}
}
//---------------- Dets AF ----------------
if(dlp == '/detective.php' && dls){
	if(dls.search('who')+1) { // AF from profile link
		who = dls.split('?who=')[1];
		input = document.getElementsByTagName('input')[0];
		input.value = who;
		input.focus();
	}
	if(dls.search('action')+1) { // AF for dets/cities
		inputstr = 'javascript:inputs=document.getElementsByTagName('
		loopstr = ');for(i=0;i<8;i++) {inputs[i].value=this.value;} RecalcTotal(inputs[0].form);"'
		optstr = '<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>'
		str  = '<br><tr><td>All Cities:</td>'
		str += '<td><input type="text" value="0" onkeyup="'+inputstr+"'input'"+loopstr+'></td>' // # dets form
		str += '<td><select onchange="'+inputstr+"'select'"+loopstr+'>'+optstr+'</td></tr>' // # hrs form
		$X('/html/body/form/table/tbody').innerHTML += str // add to table
	}
}
//---------------- Compatibility page ----------------
if(dlp == '/servers.php'){
	var x = $x("/html/body/table/tbody/tr/td/ul/font/li");
	x.forEach(function($n){ $n.style.listStyleImage = 'url(\'' + GM_getResourceURL("brcGear") + '\')'; });

	x[0].innerHTML += " - Compatible";
	x[2].innerHTML += " - Compatible";
	x[7].innerHTML += " - Compatible";
	x[11].innerHTML += " - Compatible";
}
//---------------- sell ws ----------------
if(dlp == '/obay.php' && dls.indexOf('type=10') != -1 && db.innerHTML.indexOf('<table') != -1 && $x('//input')[3]){
	if(getValue('wsID') == 'undefined') {
		$x('//input')[2].value = '';
	}
	else {
		$x('//input')[2].value = getValue('wsID');
		$x('//input')[3].checked = true;
		$x('//input')[5].focus();
	}
}
//---------------- OBAY ----------------
if(dlp == '/obay.php' && db.innerHTML.indexOf('<table') != -1){
	if(prefs[18]){//add price per bullet
		function addPrice(num){
				var bullets = parseInt($X(xpath).getElementsByTagName('td')[(1+num)].innerHTML.replace(/[^0-9.]/g,''));
				var price = parseInt($X(xpath).getElementsByTagName('td')[(2+num)].innerHTML.replace(/[^0-9.]/g,''));
				$X(xpath).getElementsByTagName('td')[(1+num)].innerHTML = $X(xpath).getElementsByTagName('td')[(1+num)].innerHTML + " ($ " + Math.round(price/bullets) + ")";
		}
		for(i=4;i<=19;i++){
			if(dls.indexOf('specific') == -1){ //on view object page
				var xpath = '/html/body//center/table[3]/tbody/tr['+i+']';
				if(!$X(xpath) || $I(xpath).indexOf(lang.obay[0]) > 100) break;
				if($I(xpath).indexOf(lang.obay[0]) != -1) addPrice(1);
			}
			if(dls.indexOf('type=11') != -1){
				var xpath = '/html/body//center/table[3]/tbody/tr['+i+']';
				if(!$X(xpath) || $I(xpath).indexOf(lang.obay[1]) > 100) break;
				if($I(xpath).indexOf(lang.obay[1]) != -1) addPrice(0);					
			}
		}
	}
	if(dls.indexOf('specific') == 1){ // add focus and check on every page
		if(prefs[18] && db.innerHTML.indexOf(lang.obay) != -1){ //on objects page
			var xpath = '/html/body//center/table/tbody/tr[3]/td[3]';
			var xpath2 = '/html/body//center/table/tbody/tr[4]/td';
			if(lang.obay.match($I(xpath).split("<br>")[0])) { 
				var price = $I(xpath).split("<br>")[3].replace(/[^0-9.]/g,'');
				var bullets = $I(xpath2).replace(/[^0-9.]/g,'');
				$I(xpath2,$I(xpath2) + "<br><b>$ " + Math.round(price/bullets) + "</b>");
				$x('//input')[1].select();
			}
		}
		$x('//input')[2].checked = true;
		$x('//input')[4].focus();
	}
}
// ---------------- INBOX -----------------------
if(dls.indexOf('action=inbox') !=-1 || dls.indexOf('action=delMsg') !=-1){
	$x('//tr[@class="color1"] | //tr[@class="color2"]').forEach(function($n){
		//add delete icon
		var id = $n.childNodes[3].innerHTML.split("?")[1].match(/\d+/g)[0];
		$n.childNodes[1].setAttribute('width','45');
		$n.childNodes[1].innerHTML += ' <img src="'+GM_getResourceURL("deleteIcon")+'" onMouseover="style.cursor=\'pointer\'" title="Delete" onClick="location.href=\'/BeO/webroot/index.php?module=Mail&action=delMsg&iId=' + id + '&iParty=2\'" width="16" height="16" border="0" />';
		if($n.childNodes[5].innerHTML.indexOf('user.php?nick=')!=-1){
			//add reply icon
			$n.childNodes[1].setAttribute('width','65');
			$n.childNodes[1].innerHTML += ' <img src="'+GM_getResourceURL("reply")+'" onMouseover="style.cursor=\'pointer\'" title="Reply" onClick="location.href=\'/BeO/webroot/index.php?module=Mail&action=sendMsg&iReply=' + id + '\'" width="16" height="16" border="0" />';
		}
	});
}
if(dls.indexOf('iReply=') != -1 ){ $X('//textarea').focus(); }

// ---------------- linkify names ----------------
//---- link names in inbox
if(dls.indexOf('action=showMsg') !=-1){
	
	var msgType = $X('/html/body/center/table/tbody/tr/td[2]/table/tbody/tr/td/b').textContent;
	var msgTxt = '/html/body/center/table/tbody/tr/td[2]/table/tbody/tr[5]/td'
	arr = $X(msgTxt).innerHTML.split(' ');
	
	//if msg is heist inv.
	var heistInv = new RegExp(lang.linkify[0]);
	if(heistInv.test(msgType)){
		if(arr[2] == lang.inbox[2]){//check if this is invitation
			setArr(0); setArr(13); $I(msgTxt, arr.join(" "));
		}
		else $I(msgTxt);
	}
	//if msg is oc inv.
	var ocInv = new RegExp(lang.linkify[1]);
	if(ocInv.test(msgType)){
		if(arr[2] == lang.inbox[2]){//check if this is invitation
			if(arr[7] == lang.inbox[3] || arr[7] == lang.inbox[5]){
				setArr(0); setArr(13); $I(msgTxt, arr.join(" "));
			}
			if(arr[7] == lang.inbox[4]){ setArr(0); setArr(12); $I(msgTxt, arr.join(" ")); }
		}
		else $I(msgTxt);
	}
		
	//if msg is ticket update
	var thisIsTicket = new RegExp(lang.linkify[10]);
	if(thisIsTicket.test(msgType)){
		arr[0] = "<a href='/tickets/index.php?action=view-my-tickets' title='click to open tickets page'><b>" + arr[0];
		arr[1] = arr[1] + "</b></a>";
		$I(msgTxt, arr.join(" "));
	}
	
	//if msg is WS
	var wsMsg = new RegExp(lang.linkify[7]);
	if(wsMsg.test(msgType)){//if msg is WS
		if(arr[6] == '.') { 
			var wsIDnum = arr[16];
			arr[16] = "<a href='/obay.php?action=tosell&type=10' title='click to sell this WS'><b>" + arr[16] + "</b></a>";
		}
		else { 
			var wsIDnum = arr[15];
			arr[15] = "<a href='/obay.php?action=tosell&type=10' title='click to sell this WS'><b>" + arr[15] + "</b></a>";
		}
		setArr(3);
		setArr(5);
		$I(msgTxt, arr.join(" "));
		setValue('wsID', wsIDnum);
	}
	
	//if msg was crush msg
	var crushedMSG = new RegExp(lang.linkify[11]);
	if(crushedMSG.test(msgType)){
		$X(msgTxt).innerHTML = "<a href='/BeO/webroot/index.php?module=Bloodbank&action=' title='click to buy missing blood'><b>" + $X(msgTxt).innerHTML + "</b></a>"; 
	}

	var raidInv = new RegExp(lang.linkify[13]);
	if(raidInv.test(msgType)){ setArr(9); $I(msgTxt, arr.join(" ")); }// raid inv.

	var MarriedMsg = new RegExp(lang.linkify[14]);
	if(MarriedMsg.test(msgType)){ setArr(20); setArr(22); $I(msgTxt, arr.join(" ")); }// married

	var GiftMsg = new RegExp(lang.linkify[15]);
	if(GiftMsg.test(msgType)){ setArr(5); $I(msgTxt, arr.join(" ")); }// gift

	var WeddingInv = new RegExp(lang.linkify[16]);
	if(WeddingInv.test(msgType)){ setArr(33); setArr(35); $I(msgTxt, arr.join(" ")); }// wedding inv.

	var famInv = new RegExp(lang.linkify[12]);
	if(famInv.test(msgType)){ setArr(8); $I(msgTxt, arr.join(" "));}// fam inv.
	
	var mocInv = new RegExp(lang.linkify[2]);
	if(mocInv.test(msgType)){ setArr(0); $I(msgTxt, arr.join(" "));}// moc inv.

	var targetNotFound = new RegExp(lang.linkify[3]);
	if(targetNotFound.test(msgType)){ setArr(5); $I(msgTxt, arr.join(" "));}//target not found

	var raceInv = new RegExp(lang.linkify[4]);
	if(raceInv.test(msgType)){ setArr(8); $I(msgTxt, arr.join(" "));}//race invite

	var targetFound = new RegExp(lang.linkify[5]);
	if(targetFound.test(msgType)){ setArr(3); $I(msgTxt, arr.join(" "));}//target found

	var killMsg = new RegExp(lang.linkify[6]);
	if(killMsg.test(msgType)){ setArr(2); $I(msgTxt, arr.join(" "));}//if msg is Kill success

	var condolences = new RegExp(lang.linkify[8]);
	if(condolences.test(msgType)){ setArr(2); $I(msgTxt, arr.join(" "));}//condolences msg
}

//---------- link names at casino pages -----------
if(urlsearch == '/gambling/numbersgame.php' + dls){
	var xpath = '/html/body//form/table/tbody/tr/td';
	arr = $X(xpath).innerHTML.split(' ');
	setArr(3);
	$I(xpath, arr.join(" "));
}
if(urlsearch == '/gambling/puntobanco.php' + dls){
	var xpath = '/html/body/table/tbody/tr/td/b';
	arr = $X(xpath).innerHTML.split(' ');
	setArr(4);
	$I(xpath, arr.join(" "));
}
if(urlsearch == '/gambling/bookie.php' + dls){
	var xpath = '/html/body/center/table/tbody/tr/td/b';
	arr = $X(xpath).innerHTML.split(' ');
	num = (arr[0]=='Las')?8:5;
	setArr(num);
	$I(xpath, arr.join(" "));
}
if(dls.search('module=Poker') != -1){
	refresh = $X('//span/a[contains(@href, "BeO/webroot/index.php?module=Poker&action=")]');
	refresh.innerHTML = refresh.innerHTML + '(=)';
	refresh.accessKey = '=';
}
//---------------------- AF scratch ---------------
if(dlp == '/scratch.php'){
	$X('//input').focus();
}
if(urlsearch == '/scratch.php?scratch=Scratch!'){
	$x('//input')[1].focus();
}

//---------------- Title changer ----------------
if((dlp=='/' || dlp=='/index.php' || dlp=='/game.php') && lh.indexOf('beyond')==-1) { document.title = lang.title; }

//---------------- Beyond Logo Replacer ----------------
var logoXpath = "//img[contains(@src, 'logo0.gif')] | //img[contains(@src, 'omertalo.gif')] | //img[contains(@src, 'deathmatch.gif')] | //img[contains(@src, 'omdmlogo.png')] | //img[contains(@src, './static/images/game/layout/logo.png')] | //img[contains(@src, 'omerta-game-logo.gif')]";
$x(logoXpath).forEach(function($n){
	$n.src = GM_getResourceURL(lang.version.replace('_','')+'Logo');
	if(dlp != '/servers.php') $n.parentNode.innerHTML = '<a href="http://www.omertabeyond.com" target="_blank" onFocus="this.blur()">' + $n.parentNode.innerHTML + '</a>';
});

//---------------- Beyond Favicon Replacer ----------------
window.addEventListener('load', function(){ setIcon(GM_getResourceURL("favoriteIco")); }, true);

//---------------- 1-Click Voter ----------------
if(dlp == '/vfo.php' && prefs[9]){
	lastSTR = getValue('lastvote',0); //get last voting time
	vote = 0; //initialize to DON'T VOTE

	if(!lastSTR) vote = confirm(lang.oneclick[0]);
	else { //not first run
		//initialize last voting time and current time as Date objects
		last = new Date(lastSTR);
		now = new Date();

		// time since last vote
		date = now.getDate() - last.getDate();
		hr = now.getHours() - last.getHours();
		min = now.getMinutes() - last.getMinutes();
		sec = now.getSeconds() - last.getSeconds();

		//check for negative values
		if(sec<0) { min--; sec+=60;}
		if(min<0) { hr--; min+=60;}
		if(hr<0) { date--; hr+=24;}
		if(date<0) {
			month = last.getMonth();
			month++; //getMonth starts with Jan=0
			if(month==1||month==3||month==5||month==7||month==8||month==10||month==12) date+=31;
			if(month==4||month==6||month==9||month==11) date+=30;
			if(month==2) date+=28;
		}

		msg ='';
		if(now.getUTCDate() != last.getUTCDate()){ // different day, ask for vote [user decision to wait full 24hr]
			msg += lang.oneclick[5] + '\n' + lang.oneclick[8];
			msg += date + lang.oneclick[6] + hr + lang.oneclick[2] + min + lang.oneclick[3] + sec + lang.oneclick[4];
			msg += '\n' + lang.oneclick[7];
			vote = confirm(msg);
		}
		else { // same day, no vote [not encouraging vote abusers]
			hr  = 23-now.getUTCHours(); // time till 0:00 OT
			min = 59-now.getUTCMinutes();
			sec = 59-now.getUTCSeconds();
			msg += lang.oneclick[1];
			msg += hr + lang.oneclick[2] + min + lang.oneclick[3] + sec + lang.oneclick[4] + "\n";
			msg += lang.oneclick[9]
			vote = confirm(msg);
		}
	}
	if(vote){ //give me liberty or give me death!
		$x('//a[contains(@href, "votelot.php")]').forEach(function($n){GM_openInTab($n.href)});
		//get current time after voting and store as last voting time
		now2 = new Date();
		nowSTR = now2.toUTCString();
		setValue('lastvote',nowSTR);
	}
}
//---------------- New BRC ----------------		/**/ => signals for major function call
if(dlp == '/prices.php' || dlp =='/smuggling.php' || dlp =='/travel.php') {
	//variable soup :D
	var pp, sp, tp, bninfo, values, carry_n, carry_b, n_amount, b_amount, boxes, narc, booze, city, plane, fam;
	var smugCity, nCityprofit, bCityprofit, border, table, tr, td, mOver, mOut, bestNarc, bestBooze;
	var allProfits, bestBN, profitNarc, profitBooze, famProfit, travelPrices, travelCost, totalProfit;
	var key, n1, b1, aCell, link, c, center, br1, br2, target, bestRun, inputs, bn_xp, bn_text, cash, xpb, xpn, n, b;
	var nItem, highNarc, bItem, highBooze, lowNarc, lowBooze, sel, div, color, title, H, wrap1, wrap2, wrap3, wrap4, e, icon;
	var a1, a2, a3, a4, best, cd, rp, none, s, info, BN, l, nLines, bLines, pArr, noBRC, row, item, j, k;

	pp = dlp == '/prices.php';
	sp = dlp == '/smuggling.php';
	tp = dlp == '/travel.php';

	bninfo = getValue('bninfo',-1);
	if(bninfo!=''&&bninfo!=-1) { //extra checker for undefined crap
		if(bninfo.search(/[^0-9]/)!=-1) { setValue('bninfo',-1); }
	}

//--Assemble functions
	function fillBRC(n,b) { //actually filling the forms
		values = [0,0,0,0,0,0,0, 0,0,0,0,0,0,0];
		if(n>-1){ //do we even want narcs?
			if(carry_n==0) { values[(7 +parseInt(n))] = narcs; } //nothing in pocket, fill it all
			else { 
				if(n_amount[parseInt(n)] == carry_n && carry_n < narcs) { //user already carrying some => AF the rest
					values[(7+parseInt(n))] = narcs - carry_n;
					inputs[17].checked = 1;//buy
				}
				else { //AF selling other crap
					for(i=0;i<=6;i++) { values[(i+7)] = n_amount[i]; }
					inputs[16].checked = 1;//sell
				}
			}
		}
		if(b>-1){ //do we even want booze?
			if(carry_b==0) { values[(parseInt(b))] = booze; } //nothing in pocket, fill it all
			else { 
				if(b_amount[b] == carry_b && carry_b < booze) { //user already carrying some => AF the rest
					values[b] = booze - carry_b;
					inputs[8].checked = 1;//buy
				}
				else { //AF selling other crap
					if(inputs[16].checked){ //buying narcs? ==> don't AF selling booze (user proolly just bought that before going to jail)
						for(i=0;i<=6;i++) { values[i] = b_amount[i]; }
						inputs[7].checked = 1;//sell
					}
				}
			}
		}
		boxes = $x('//input[@type="text"]');
		for(i=0;i<=13;i++) {
			if(b==-1 && i<7) { values[i] = 0; }
			if(n==-1 && i>6) { values[i] = 0; }
			boxes[i].value = values[i];
		}
		$X('//input[@name="ver"]').focus();
	}

	function appBRC(BN) { //Best Run Calculator
		//get info from 'UnsafeDiv' ;)
		getInfo = $I('//div[@id="info"]');
		getInfo = getInfo.split('*');

		narc  = getInfo[0];
		booze = getInfo[1];
		city  = getInfo[2];
		plane = getInfo[3];
		fam   = getInfo[4];

		if(sp) { //extra city checker
			smugCity = $I('//h3');
			for(i=0;i<8;i++) {
				if(smugCity.search(langs.en.cities[i])!=-1) { city = i+4; setPow('bninfo',2,city);} 
			}
		}

		//calc profits per item per city
		for(nCityprofit=[],bCityprofit=[], i=0;i<=7;i++) { //get profit per single unit of b/n
			for(nCityprofit[i]=[], bCityprofit[i]=[], j=0;j<=6;j++) {//price here - price there
				nCityprofit[i].push(BN[0][j][(i+2)] - BN[0][j][(city-4+2)]); // -4 correction for city ID,
				bCityprofit[i].push(BN[1][j][(i+2)] - BN[1][j][(city-4+2)]); // +2 correction for min/max @ [0]+[1] in BN array
			}
			nCityprofit[i].unshift(nCityprofit[i].max()); //most profit per unit in this city
			bCityprofit[i].unshift(bCityprofit[i].max());
		}
		
	//--create BRC table
		border = '1px solid #000000';

		table = cEL('table'); table.id = 'brc'; table.setAttribute('class','thinline'); table.width = "500";
		tr = cEL('tr');
		td = cEL('td'); td.setAttribute('colspan','5'); td.setAttribute('class','tableheader'); td.innerHTML = lang.BR[0]; tr.appendChild(td);
		table.appendChild(tr);
		tr = cEL('tr');
		td = cEL('td'); td.setAttribute('colspan','5'); td.setAttribute('bgcolor','black'); td.setAttribute('height','1'); tr.appendChild(td);
		table.appendChild(tr);
		tr = cEL('tr'); //header
		td = cEL('td'); td.innerHTML = '&nbsp;'+lang.BR[1]; tr.appendChild(td);
		td = cEL('td'); td.innerHTML = '&nbsp;'+lang.BR[2]; tr.appendChild(td);
		td = cEL('td'); td.innerHTML = '&nbsp;'+lang.BR[3]; tr.appendChild(td);
		td = cEL('td'); td.innerHTML = '&nbsp;'+lang.BR[4]; tr.appendChild(td);
		td = cEL('td'); td.innerHTML = '&nbsp;'; tr.appendChild(td);
		tr.style.borderBottom = border;
		table.appendChild(tr);
		
	//--add city rows with induvidual profits
		for(allProfits=[],bestBN=[], i=0;i<=7;i++){
			tr = cEL('tr');
			if(prefs[21]&&pp) { //add HL effects here too
				tr.id  = '2row'+i;
				mOver  = 'this.style.backgroundColor = \'#888888\';';
				mOver += 'document.getElementById(\'0row'+(i+2)+'\').style.backgroundColor = \'#888888\';';
				mOver += 'document.getElementById(\'1row'+(i+2)+'\').style.backgroundColor = \'#888888\';';
				tr.setAttribute('onMouseover',mOver);

				mOut  = 'this.style.backgroundColor = \'\';';
				mOut += 'document.getElementById(\'0row'+(i+2)+'\').style.backgroundColor = \'\';';
				mOut += 'document.getElementById(\'1row'+(i+2)+'\').style.backgroundColor = \'\';';
				tr.setAttribute('onMouseout',mOut);
			}
			td = cEL('td');
			tr.style.borderBottom = border;
			tr.style.height = '19px';
			td.setAttribute('colspan','5');

		//--Calc profits
			if(i==city-4) { //This is the current city
				td.innerHTML = '<center><i>'+ lang.BR[5] + lang.cities[i] +'</i></center>';
				tr.appendChild(td); allProfits.push(0);bestBN.push([0,0]);
			}
			else if( plane==0 && (( (city==6||city==11) && (i+4)!=6 && (i+4)!=11) || ((city!=6&&city!=11) && ((i+4)==6||(i+4)==11) )) ) { //No plane to travel there
				td.innerHTML = '<center><i>'+ lang.BR[6] + lang.cities[i] +'</i></center>';
				tr.appendChild(td); allProfits.push(0); bestBN.push([0,0]);
			}
			else { //Nothing wrong, clear to go
				bestNarc = nCityprofit[i][0]<0?0:nCityprofit[i].lastIndexOf(nCityprofit[i][0]); //best, if any, narc?
				profitNarc = (bestNarc==0)?0:nCityprofit[i][bestNarc]; //profit per unit
				profitNarc = profitNarc*narc;

				bestBooze = bCityprofit[i][0]<0?0:bCityprofit[i].lastIndexOf(bCityprofit[i][0]); //best, if any, booze?
				profitBooze = (bestBooze==0)?0:bCityprofit[i][bestBooze]; //profit per unit
				profitBooze = profitBooze*booze;

				//count for fam pos
				famProfit = (profitNarc + profitBooze);
				famProfit = famProfit - Math.round(famProfit*[0,0.12,0.1,0][fam]);
				
				//calc travelcost
				travelPrices = [ //travelcosts from A to B
					[    0,  600,10350,1575, 3600,1350, 1050,10800], //det
					[  600,    0,11025,2025, 3000,1725, 1425,11400], //chi
					[10350,11025,    0,9075,14025,9450, 9750, 1875], //pal
					[ 1575, 2025, 9075,   0, 5025, 375,  675, 9375], //ny
					[ 3600, 3000,14025,5025,    0,4650, 4350,14400], //lv
					[ 1350, 1725, 9450, 375, 4650,   0,  300, 9750], //phi
					[ 1050, 1425, 9750, 675, 4350, 300,    0,10050], //bal
					[10800,11400, 1875,9375,14400,9750,10050,    0]  //cor
				];  // det   chi   pal   ny   lv   phi   bal   cor
				travelCost = travelPrices[i][(city-4)];
				if(plane>0) { travelCost /= 2; } //no plane => half travelcost

				//Our total profit in this city
				totalProfit = famProfit - Math.round(travelCost);

				//save all profits in array for later
				allProfits.push(totalProfit);
				
				//What's the result
				if(totalProfit<0) { //no profit :(
					td.innerHTML = '<center><i>'+ lang.BR[7] + lang.cities[i] +'</i></center>'; tr.appendChild(td); 
					bestBN.push([0,0]);//push dummy to complete array
				}
				else { //profit \o/
					bestBN.push([bestNarc,bestBooze]);
					td.innerHTML = '&nbsp;'+lang.cities[i]; td.setAttribute('colspan','1'); tr.appendChild(td);
					bCell = cEL('td'); bCell.style.borderLeft = border; bCell.innerHTML = '&nbsp;'+ lang.booze[bestBooze]; tr.appendChild(bCell);
					nCell = cEL('td'); nCell.style.borderLeft = border; nCell.innerHTML = '&nbsp;'+ lang.narcs[bestNarc]; tr.appendChild(nCell);
					pCell = cEL('td'); pCell.style.borderLeft = border; pCell.innerHTML = '&nbsp;$ '+ commafy(totalProfit); tr.appendChild(pCell);

					if(sp) { //we need JS links @ smuggling and don't want to wast clicks
						key = [0,4,6,1,2,3,5]; //convert b/n - botprices order to smuggling order
						n1 = key[bestNarc-1];
						b1 = key[bestBooze-1];

						aCell = cEL('td'); aCell.style.borderLeft = border; 
						aCell.innerHTML = '&nbsp;';
						if(!link) { link=[]; }
						link = cEL('a');
						link.id = 'go'+i;
						link.setAttribute('style','font-weight:inherit;text-align:center;cursor:pointer;');
						link.innerHTML = 'Go!';
						link.href = '#';
						link.setAttribute('n',n1); //add what they should be AF'ing
						link.setAttribute('b',b1);
						aCell.appendChild(link);
						tr.appendChild(aCell); //add the row		
					}
					else { //we need to GET to smuggling too
						aCell = cEL('td'); aCell.style.borderLeft = border; 
						aCell.innerHTML = '&nbsp;<a style="font-weight:inherit;text-align:center;" href="'+'smuggling.php?n='+(bestNarc-1)+'&b='+(bestBooze-1)+'">Go!</a>';
						tr.appendChild(aCell); //add the row
					}
				}
			}
			table.appendChild(tr);
		}
	
		//add table page
		if(pp) { //Duplicate page style and format
			c = $X('//center[2]');
			center = c.cloneNode(0);
			center.appendChild(table);

			function app(n,r) { return c.parentNode.insertBefore(n,r); }
			br1 = cEL('br'); app(br1,c.nextSibling);
			br2 = cEL('br'); app(br2,c.nextSibling);
			
			app(center,c.nextSibling.nextSibling.nextSibling); //add BRC table to page
		}
		else { //make our own
			target = $X(sp?'//form//table/tbody/tr[2]':'//table//tr[5]');
			tr = cEL('tr');
			td = cEL('td'); td.setAttribute('colspan','2');
			td.appendChild(table);
			tr.appendChild(td);
			if(sp) { target.parentNode.insertBefore(tr,target.nextSibling.nextSibling.nextSibling); }
			else { 
				table.width = target.parentNode.scrollWidth;
				target.parentNode.parentNode.parentNode.appendChild(cEL('br')); 
				target.parentNode.parentNode.parentNode.appendChild(table); 
			}
			
			if(sp) { //link the JS links to our filler function fillBRC()
				for(i=0;i<=7;i++) {
					if(db.innerHTML.indexOf('id="go'+i) != -1) { //check for Go! link
						getID('go'+i).addEventListener('click', function(){ 
							fillBRC(this.getAttribute('n'),this.getAttribute('b'));
						}, true); 
					}
				}
			}
		}
		//finish it up > bold-ify Best Run
		bestRun = allProfits.lastIndexOf(allProfits.max());
		$X('//table[@id="brc"]//tr['+(4+bestRun)+']').style.fontWeight = 'bold';
	//!-Added the table
		
	//--BRC AutoForm
		if(sp) { //AF on Smuggling page
			function AF(sel) {
				//assemble info for AF
				inputs = $x('//input');
				bn_xp = '//form/table/tbody/tr[1]/td';
				
				bn_text = $X(bn_xp).firstChild.firstChild.firstChild.innerHTML;
				bn_text = bn_text.split('|');

				cash = parseInt(bn_text[0].replace(/[^0-9.]/g,''));
				booze = parseInt(bn_text[1].replace(/[^0-9.]/g,''));//max amount user can carry
				narcs = parseInt(bn_text[2].replace(/[^0-9.]/g,''));

				b_amount = [0,0,0,0,0,0]; n_amount = [0,0,0,0,0,0];//what is user carrying

				xpb = '//form/table/tbody/tr[2]/td/table/tbody/tr[';
				xpn = '//form/table/tbody/tr[2]/td[2]/table/tbody/tr[';
				for(i=0;i<=15;i++) { //define how much of this item is being carried
					if(i<7) { b_amount[i] = parseInt($I(xpb+(i+4)+']/td[3]')); }
					if(i>8) { n_amount[(i-9)] = parseInt($I(xpn+(i-5)+']/td[3]')); }
				}
				carry_n = n_amount.sum(); carry_b = b_amount.sum(); //how much is the user carrying already

				//which item do we want?
				key = [0,4,6,1,2,3,5];
				if(sel==0) { //Calc for Best Run
					n = key[(bestBN[bestRun][0]-1)]; //this trick works, even I'm amazed
					b = key[(bestBN[bestRun][1]-1)];
				}
				if(sel==1){ //CD Run
					for(i=0;i<=6;i++){
						nItem = parseInt(BN[0][i][(city-4+2)]);
						highNarc = ((i==0) ? nItem : ((highNarc > nItem) ? highNarc : nItem));
						if(highNarc == nItem) n = i;

						bItem = parseInt(BN[1][i][(city-4+2)]);
						highBooze = ((i==0) ? bItem : ((highBooze > bItem) ? highBooze : bItem));
						if(highBooze == bItem) b = i;
					}
					n = key[n];
					b = key[b];
				}
				if(sel==2){ //RP Run
					for(i=0;i<=6;i++){
						nItem = parseInt(BN[0][i][(city-4+2)]);
						lowNarc = ((i==0) ? nItem : ((lowNarc < nItem) ? lowNarc : nItem));
						if(lowNarc == nItem) n = i;

						bItem = parseInt(BN[1][i][(city-4+2)]);
						lowBooze = ((i==0) ? bItem : ((lowBooze < bItem) ? lowBooze : bItem));
						if(lowBooze == bItem) b = i;
					}
					n = key[n];
					b = key[b];

					//don't fill in if we can't earn RP and AF would want to buy
					if($I('//form//table//tr[2]/td[@align="center"][1]').search(lang.BR[10])==-1 && inputs[8].checked) b = -1;
					if($I('//form//table//tr[2]/td[@align="center"][2]').search(lang.BR[10])==-1 && inputs[17].checked) n = -1;
				}
				if(sel==3) { n = b = -1; } //None
				if(dls!='') { //user manual override using external Go! link
					n = key[(GetParam('n'))]; 
					b = key[(GetParam('b'))]; 
				}

				//we know our n and b => fill it in!
				fillBRC(n,b);
			}
			if((dls=='' && prefs[28]) || dls!='') { AF(getInfo[5])	} //no call for AF && Smuggling AF on? ==> GO! || calls for AF? ==> GO!
		//!-Done AutoForming

		//--Add BRC AF settings Div
			div = cEL('div');
			div.id = 'AF'; 
			div.setAttribute('mode',getInfo[6]);
			div.setAttribute('class','NRinfo');

			//grab color from actual theme
			color = getActual($X('//td[@class="tableheader"]'),'background-color');
			color = color.split(',');
			for(i=0;i<=2;i++) { color[i] = color[i].replace(/[^0-9]/g,''); }
			color = '#'+RGBtoHex(color[0],color[1],color[2]);

			div.setAttribute('style','right:10px;top:10px;width:100px !important;text-align:right; background-color:'+color+'!important;');
			if(getInfo[6]==-1) { div.setAttribute('style','right:-90px;top:-80px;width:100px !important;text-align:right; background-color:'+color+'!important;'); }
			title = cEL('span'); title.innerHTML = '<center><u>'+lang.BR[8]+'</u></center>'; div.appendChild(title);

			H = prefs[32]; //do we want hotkeys?

			//add button for each option
			wrap1 = cEL('span');
			a1 = cEL('a'); a1.innerHTML = (H?'Best: (8)':'Best: '); a1.id = 'a1'; a1.title = 'Fill in the most profitable b/n (Hotkey: 8 )';
			if(H) { a1.setAttribute('accesskey','8'); }
			a1.addEventListener('click', function() { AF(0); },true); wrap1.appendChild(a1);
			best = cEL('input'); best.id = 'brc0'; best.setAttribute('type','radio'); best.name = "brc";
			wrap1.appendChild(best); div.appendChild(wrap1);

			wrap2 = cEL('span'); wrap2.innerHTML = '<br>';
			a2 = cEL('a'); a2.innerHTML = (H?'CD: (9)':'CD: '); a2.id = 'a2'; a2.title = 'Fill in the most expensive b/n (Hotkey: 9 )';
			if(H) { a2.setAttribute('accesskey','9'); }
			a2.addEventListener('click', function() { AF(1); },true); wrap2.appendChild(a2);
			cd = cEL('input'); cd.id = 'brc1'; cd.setAttribute('type','radio'); cd.name = "brc";
			wrap2.appendChild(cd); div.appendChild(wrap2);

			wrap3 = cEL('span'); wrap3.innerHTML = '<br>';
			a3 = cEL('a'); a3.innerHTML = (H?'RP: (0)':'RP: '); a3.id = 'a3'; a3.title = 'Fill in the cheapest b/n (Hotkey: 0 )';
			if(H) { a3.setAttribute('accesskey','0'); }
			a3.addEventListener('click', function() { AF(2); },true); wrap3.appendChild(a3);
			rp = cEL('input'); rp.id = 'brc2'; rp.setAttribute('type','radio'); rp.name = "brc";
			wrap3.appendChild(rp); div.appendChild(wrap3);

			wrap4 = cEL('span'); wrap4.innerHTML = '<br>';
			a4 = cEL('a'); a4.innerHTML = (H?'None: (-)':'None: '); a4.id = 'a4'; a4.title = 'Don\'t fill anything (Hotkey: - )';
			if(H) { a4.setAttribute('accesskey','-'); }
			a4.addEventListener('click', function() { AF(3); },true); wrap4.appendChild(a4);
			none = cEL('input'); none.id = 'brc3'; none.setAttribute('type','radio'); none.name = "brc";
			wrap4.appendChild(none); div.appendChild(wrap4);
	
			//add coolness icon
			icon = cEL('img');
			icon.id = 'brcIcon';
			icon.src = getInfo[7];
			icon.setAttribute('style','position:absolute; bottom:0px; left:0px;cursor:pointer;');

			//add Div to page
			div.appendChild(icon);
			db.appendChild(div);

			//add cool sliding 'n hiding
			getID('brcIcon').addEventListener('click',function(){
				div = document.getElementById('AF');
				s = div.style;
				if(div.getAttribute('mode') == 1) { //mode 1 - visible
					div.setAttribute('mode',0); //mode 0 - moving
					setTimeout(function(){s.right='0';  s.top='0';  },100); //use timers for sliding effect
					setTimeout(function(){s.right='-20';s.top='-20';},200);
					setTimeout(function(){s.right='-45';s.top='-40';},300);
					setTimeout(function(){s.right='-65';s.top='-60';},400);
					setTimeout(function(){s.right='-90';s.top='-80';div.setAttribute('mode',-1);},500);
					setValue('brcDiv',-1); //mode -1 - hidden
				}
				if(div.getAttribute('mode') == -1) { //mode 1 - visible
					div.setAttribute('mode',0); //mode 0 - moving
					setTimeout(function(){s.right='-65';s.top='-60';},100);
					setTimeout(function(){s.right='-45';s.top='-40';},200);
					setTimeout(function(){s.right='-20';s.top='-20';},300);
					setTimeout(function(){s.right='-0'; s.top='-0'; },400);
					setTimeout(function(){s.right='10'; s.top='10';div.setAttribute('mode',1);},500);
					setValue('brcDiv',1);//mode -1 - hidden
				}
			}, true);

	/**/	//add AF() callers
			$X('//input[@id="brc0"]').addEventListener('click', function(){ AF(0); try{setValue('brcAF',0);}catch(e){} },true); //setValue will only work directly
			$X('//input[@id="brc1"]').addEventListener('click', function(){ AF(1); try{setValue('brcAF',1);}catch(e){} },true); //but thats fine :D
			$X('//input[@id="brc2"]').addEventListener('click', function(){ AF(2); try{setValue('brcAF',2);}catch(e){} },true); //hotkeys are 1 time action anyways
			$X('//input[@id="brc3"]').addEventListener('click', function(){ AF(3); try{setValue('brcAF',3);}catch(e){} },true);
			if(H) { //add hotkeys
				$X('//a[@id="a1"]').href = 'javascript:document.getElementById("brc0").click();';
				$X('//a[@id="a2"]').href = 'javascript:document.getElementById("brc1").click();';
				$X('//a[@id="a3"]').href = 'javascript:document.getElementById("brc2").click();';
				$X('//a[@id="a4"]').href = 'javascript:document.getElementById("brc3").click();';
			}
			$X('//input[@id="brc'+getInfo[5]+'"]').setAttribute('checked','1'); //check the selected option at the Div too
		}
	//!-Done with BRC AF
	}
//!-Done assembling functions

//--let's get started
	if(getValue('bninfo',-1)>0) { //do we have info data?
		//create 'unsafeDiv' to transfer data to XHR function
		narc  = getPow('bninfo',0,-1);
		booze = getPow('bninfo',1,-1);
		city  = getPow('bninfo',2,-1);
		plane = getPow('bninfo',3,-1);
		fam   = getPow('bninfo',4,-1);

		info = cEL('div');
		info.id = 'info';
		info.style.display = 'none';
		info.innerHTML = narc+'*'+booze+'*'+city+'*'+plane+'*'+fam+'*'+getValue('brcAF',0)+'*'+getValue('brcDiv',1)+'*'+GM_getResourceURL("brcGear");
		db.appendChild(info);

		//get all prices
		if(pp) { //prices are on the page
			for(BN=[], i=0;i<=1;i++) { //B/N
				for(BN[i]=[], j=0;j<=6;j++) { //type
					for(BN[i][j]=[], k=0;k<=7;k++) {//city
						BN[i][j].push(parseInt($I('//center['+(1+i)+']/table//tr['+(4+k)+']/td['+(2+j)+']').replace(/[^0-9]/g,'')));
					}
					BN[i][j].unshift(BN[i][j].min()); //get min
					BN[i][j].unshift(BN[i][j].max()); //get max
				}
			}
	/**/	appBRC(BN); //send prices to BRC function
		}
		if(sp||tp) { //we need prices from elsewhere
			function parsePrices(html,url) {
				l = html.split(/\n/); //slice them into lines
				nLines = [l[2],l[3],l[4],l[5],l[6],l[1],l[7]]; //cocaine "l[1]" placed back in line to fit properly in later
				bLines = [l[8],l[9],l[10],l[11],l[12],l[13],l[14]];
				
				for(i=0;i<=6;i++) { //slice 'em up 
					nLines[i] = nLines[i].slice(nLines[i].indexOf('|')+1,nLines[i].lastIndexOf('|'));
					nLines[i] = nLines[i].split('|');
					bLines[i] = bLines[i].slice(bLines[i].indexOf('|')+1,bLines[i].lastIndexOf('|'));
					bLines[i] = bLines[i].split('|');
				} pArr = [ nLines, bLines ];

				//order them "B/N > type > city" instead of "B/N > city > type"
				for(BN=[], i=0;i<=1;i++) { //B/N
					for(BN[i]=[], j=0;j<=6;j++) { //type
						for(BN[i][j]=[], k=0;k<=7;k++) {
							BN[i][j].push(parseInt(pArr[i][j][k])); //city
						}
						BN[i][j].unshift(BN[i][j].min()); //get min
						BN[i][j].unshift(BN[i][j].max()); //get max
					}
				}
	/**/		appBRC(BN); //send prices to BRC function
			}

			//get prices and send them to parser
	/**/	grabHTML('http://'+dlh+'/botprices.php',parsePrices);
		}
	}
//!-Done getting started

//--Prices Highlights @ prices page
	if(prefs[21] && pp) {
		noBRC = false; //asume working BRC table
		if(typeof BN == 'undefined') { //see if prices are grabbed already
			noBRC = true; //no BRC mean no need to try and HL 'em
			for(BN=[], i=0;i<=1;i++) { //B/N
				for(BN[i]=[], j=0;j<=6;j++) { //type
					for(BN[i][j]=[], k=0;k<=7;k++) { //city
						BN[i][j].push(parseInt($I('//center['+(1+i)+']/table//tr['+(4+k)+']/td['+(2+j)+']').replace(/[^0-9]/g,'')));
					}
					BN[i][j].unshift(BN[i][j].min()); //get min
					BN[i][j].unshift(BN[i][j].max()); //get max
				}
			}
		}
		for(i=0;i<=1;i++) {
			for(j=0;j<=6;j++) {
				for(k=2;k<=9;k++) {
					if(j==0) { //add mouseover effects
						row = $X('//center['+(1+i)+']/table//tr['+(2+k)+']');
						row.id = i+'row'+k;
						row.style.borderTop = '1px solid #000000';

						mOver = 'this.style.backgroundColor = \'#888888\';';
						mOver += 'document.getElementById(\''+(i?0:1)+'row'+k+'\').style.backgroundColor = \'#888888\';';
						if(!noBRC) { mOver += 'document.getElementById(\'2row'+(k-2)+'\').style.backgroundColor = \'#888888\';'; }
						row.setAttribute('onMouseover', mOver);

						mOut = 'this.style.backgroundColor = \'\';';
						mOut += 'document.getElementById(\''+(i?0:1)+'row'+k+'\').style.backgroundColor = \'\';';
						if(!noBRC) { mOut += 'document.getElementById(\'2row'+(k-2)+'\').style.backgroundColor = \'\';'; }
						row.setAttribute('onMouseout', mOut);
					}
					item = $X('//center['+(1+i)+']/table//tr['+(2+k)+']/td['+(2+j)+']');
					item.style.borderLeft = '1px solid #000000';
					if(!(j%2)) { $X('//center['+(1+i)+']/table//tr['+(2+k)+']/td['+(2+j)+']').style.backgroundColor = '#888888'; } //add colors to rows
					if(BN[i][j][k] == BN[i][j][0]) { item.style.color = '#FF0000'; } //HL max
					if(BN[i][j][k] == BN[i][j][1]) { item.style.color = '#00FF00'; } //HL min
					if(j==5&&i==0) { item.style.fontWeight = 'bold'; } //bold-ify cocaine
					item.style.textAlign = 'center';
					item.style.width = '12%';
				}
			}
		}
	}
}
//---------------- Smuggling ----------------
if(prefs[28] && dlp == '/smuggling.php'){ //mainly add AF links and tweak innerHTML, other functions taken over by BRC
	//get input fields
	inputs = $x('//input');
	bn_xp = '//form/table/tbody/tr[1]/td';
	bn_text = $X(bn_xp).innerHTML.split("<br>");

	cash = parseInt(bn_text[3].replace(/[^0-9.]/g,''));
	booze = parseInt(bn_text[4].match(/\d+/));//max amount user can carry
	narcs = parseInt(bn_text[5].match(/\d+/));

	b_amount = [0,0,0,0,0,0];//what is user carrying
	n_amount = [0,0,0,0,0,0];

	xpb = '//form/table/tbody/tr[2]/td/table/tbody/tr[';
	xpn = '//form/table/tbody/tr[2]/td[2]/table/tbody/tr[';

	for(i=0;i<=15;i++){	//add click to fill stuff and hotkeys
		if(i<7){ //booze
			var x = i+4;
			b_amount[i] = parseInt($I(xpb+x+']/td[3]')); //define how much of this item is being carried
			$I(xpb+x+']/td',"<a " + (prefs[32]?"accesskey='"+(i+1)+"' ":"") + "title='Fill in this booze (Hotkey: "+(i+1)+" )' onFocus='this.blur()' href='javascript:tmp = document.getElementsByTagName(\"input\")[" + i + "].value;for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value =0;}document.getElementsByTagName(\"input\")[" + i + "].value=" + booze + "-tmp;document.getElementsByTagName(\"input\")[18].focus();'>"+(prefs[32]?(i+1):'')+" " + $I(xpb+x+']/td') + "</a>");
		}
		if(i>8){ //narcs
			var x = i-5;
			n_amount[(i-9)] = parseInt($I(xpn+x+']/td[3]')); //define how much of this item is being carried
			$I(xpn+x+']/td',"<a onFocus='this.blur()' title='Fill in this narc' href='javascript:tmp = document.getElementsByTagName(\"input\")[" + i + "].value;for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value =0;}document.getElementsByTagName(\"input\")[" + i + "].value = " + narcs + "-tmp;document.getElementsByTagName(\"input\")[18].focus();'>" + $I(xpn+x+']/td') + "</a>");
		}
	}

	for(b_amounts='',n_amounts='', i=0;i<=6;i++) { //parse to string to add into 'string'-function
		b_amounts += b_amount[i] + (i!=6?',':'');
		n_amounts += n_amount[i] + (i!=6?',':'');
	}
	carry_n = n_amount.sum(); //how much is the user carrying already
	carry_b = b_amount.sum();

	//create more efficient info text
	notempty = (carry_n!=0)?1:0; //toggle for Narcs ([) hotkey
	info_xp = '//form/table/tbody/tr/td';
	part = $I(info_xp).split("<br>");

	str = '<table border="0"><tr>';
	str += '<td>'+lang.smuggling[0] + '$ ' + commafy(cash) + " | </td>";
	str += '<td>'+"Max "+lang.smuggling[1]+": " + booze + " | </td>";
	str += '<td>'+"Max "+lang.smuggling[2]+": " + narcs + "</td></tr>";
	str += '</table>';
	str += '<a href="prices.php" target="main">Current Booze/Narcotics Prices</a>';
	if(prefs[32]){ //add AF Hotkeys
		str += "<hr><a accessKey='[' title='Fill in any narcs you carry, or fill in cocaine by default (Hotkey: [ )' onFocus='this.blur()' href='javascript:for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value=0;}for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=0;}if("+notempty+"){var n_amount = ["+n_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[(i+9)].value=n_amount[i];}}else{document.getElementsByTagName(\"input\")[12].value = "+narcs+";}document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[2]+" ([)</a>";
		str += " - <a accessKey=']' title='Fill in any booze you carry (Hotkey: ] )' onFocus='this.blur()' href='javascript:for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value=0;}var b_amount = ["+b_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=b_amount[i];}document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[1]+" (])</a>";
		str += " - <a accessKey='=' title='Fill in any booze or narcs you carry, or fill in cocaine by default (Hotkey: = )' onFocus='this.blur()' href='javascript:for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value=0;}var b_amount = ["+b_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=b_amount[i];} document.getElementsByTagName(\"input\")[12].value = "+ ((narcs - carry_n) == 0 ? narcs : narcs - carry_n) +";document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[5]+" (=)</a><br>";
	}
	$X(bn_xp).innerHTML = str;
	inputs[18].focus(); //focus captcha

	//AF stuff on Smuggling page
	if(dls != '') { //we found a BRC request!
		key = [0,4,6,1,2,3,5];//convert b/n order to order on smuggling page
		n = key[(GetParam('n'))];
		b = key[(GetParam('b'))];
		fillBRC(n,b); //we know what we want, now fill it in!
	}
}

//---------------- NickReader ----------------
if(prefs[16] && dlp != '/mid.php' && dlp != '/banner.php' && dlp != '/game.php'){ //if nickreader is on
	function parseGrab(html,url) {
		body = html.slice(html.indexOf('</head>')+7);//don't need <head>

		xDiv = cEL('div'); //place html into page to get DOM
		xDiv.setAttribute('id','XHRDiv');
		xDiv.style.display = 'none';
		xDiv.innerHTML = body;
		db.appendChild(xDiv);

		keys = $x('//div[@id="XHRDiv"]//table[@id="user"]//tr//td[1]');
		keys.pop(); keys.pop(); keys.pop();
		keys.shift(); keys.shift();

		vals = $x('//div[@id="XHRDiv"]//table[@id="user"]//tr//td[2]');
		vals.pop(); vals.pop();

		for(i=keys.length-1;i>=0;i--){
			keys[i] = keys[i].innerHTML.replace(/<[^<]+?>|\n|\t|:/ig,'');
			vals[i] = vals[i].innerHTML.replace(/<[^<]+?>| \/ |\n|\t|&.+/ig,'').replace(/^ /,'');
			if(vals[i].indexOf(' online ')!=-1) vals[i] = vals[i].slice(0,vals[i].indexOf(' online ')+7); //limit Status
			if(vals[i].indexOf('(')!=-1) vals[i] = vals[i].slice(0,vals[i].indexOf('(')); //limit Family
		}

		table = "<table width='100%' border='0' id='NRtable'>";
		for(i=0;i<keys.length;i++) table += "<tr><td height='15'><b>"+keys[i]+"</b></td><td>" + vals[i] + '</td></tr>';
		table += "</table>";

		document.getElementById(url).innerHTML = table;
		document.getElementById('XHRDiv').parentNode.removeChild(document.getElementById('XHRDiv'));
	}

	function nickReader(){
		nicks = $x('//a[contains(@href, "user.php")]');
		if(nicks.length > 0) {
			//don't run this part twice
			if(db.innerHTML.search('id="NRstatus"') == -1) {
				//hack to grab color from current theme
				dummy = cEL('div');
				dummy.setAttribute('class','tableheader');
				dummy.style.display = 'none';
				db.appendChild(dummy);

				//grab actual color from dummy
				color = getActual($X('//div[@class="tableheader"]'),'background-color');
				color = color.split(',');
				for(i=0;i<=2;i++) color[i] = color[i].replace(/[^0-9]/g,'');
				color = '#'+RGBtoHex(color[0],color[1],color[2]);

				div = cEL('div');//setup NR status div
				div.id = 'NRstatus';
				div.setAttribute('style','background-color: ' + color + '!important;');
				div.style.display = 'none';
				div.style.left = 2;
				div.style.top = 2;
				div.innerHTML = '<b><center>'+lang.NR.misc[2]+'</center></b>';
				db.appendChild(div);

				div = cEL('div');//setup ctrl event checker
				div.style.display = 'none';
				div.id = 'ctrl';
				div.innerHTML = 0;
				db.appendChild(div);

				div = cEL('div');//setup alt event checker
				div.style.display = 'none';
				div.id = 'alt';
				div.innerHTML = 0;
				db.appendChild(div);

				db.setAttribute('onKeydown','if(event.keyCode==18){document.getElementById("alt").innerHTML = 1;document.getElementById("NRstatus").style.display = "block";} if(event.keyCode==17){ if(document.getElementById("ctrl").innerHTML == 0) {document.getElementById("ctrl").innerHTML = 1;document.getElementById("NRstatus").style.display = "block";}else{document.getElementById("ctrl").innerHTML = 0;document.getElementById("NRstatus").style.display = "none";}}');
				db.setAttribute('onKeyup','if(event.keyCode==18){document.getElementById("alt").innerHTML = 0; document.getElementById("NRstatus").style.display = "none";}');
			}
			nicks.forEach(function($n){ //add mouse event checkers
				if($n.href.search('cpuser')==-1){
					$n.addEventListener('mouseover', function() { checkNRdiv(this.href); }, true);
					$n.addEventListener('mouseout', function(){ if(document.getElementById(this.href)) document.getElementById(this.href).style.display = 'none'; }, true);
				}
			});
			window.focus();//focus on frame so 'ctrl' event is noticed
		}
	}
	//run only on pages without manual trigger
	if(dls != '?module=Launchpad' && urlsearch != '/BeO/webroot/index.php?module=Statistics') window.addEventListener('load',function() { nickReader(); },true);
}

//---------------- add global css style ----------------
GM_addStyle(GM_getResourceText('css'));
};