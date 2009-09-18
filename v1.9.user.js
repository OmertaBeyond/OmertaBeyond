// ==UserScript==
// @name				Omerta Beyond
// @version				1.9
// @date				25-11-2008
// @author				vBm ( vbm AT omertabeyond DOT com )
// @author				Dopedog ( dopedog AT omertabeyond DOT com )
// @author				Eagle ( eagle AT omertabeyond DOT com )
// @license				GPL
// @namespace				omertabeyond.com
// @description				Omerta Beyond 1.9 (The greatest addon for Omerta available!)
// @include				http://www.omertabeyond.com/*
// @include				http://*barafranca.*/*
// @require				http://www.omertabeyond.com/gm/libs.js
// @require				http://www.omertabeyond.com/gm/lang.js
// @resource	colorpicker		http://www.omertabeyond.com/gm/colorpicker.gif
// @resource	beyondLogo		http://www.omertabeyond.com/gm/logo.png
// @resource	buttonMenu		http://www.omertabeyond.com/gm/menu.png
// @resource	buttonKey		http://www.omertabeyond.com/gm/key.png
// @resource	buttonReset		http://www.omertabeyond.com/gm/reset.png
// @resource	favoriteIco		http://www.omertabeyond.com/images/favicon.png
// @resource	color			http://www.omertabeyond.com/gm/color.js
// @resource	menu			http://www.omertabeyond.com/gm/menu.js
// ==/UserScript==

// get language vars
var url = "_" + location;//set language
if(url.indexOf('barafranca.com') != -1) var lang = langs.en;
if(url.indexOf('barafranca.nl') != -1) var lang = langs.nl;
if(url.indexOf('prefs_nl.php') != -1) var lang = langs.nl;
if(url.indexOf('deathmatch.barafranca') != -1) var lang = langs.dm;
if(url.indexOf('prefs_dm.php') != -1) var lang = langs.dm;
var lang = !lang ? langs.en : lang;

ScriptName = 'Omerta Beyond';
ScriptVersion = '1.9.0';
ScriptSubVersion = '37';
SiteLink = 'http://www.omertabeyond.com';
PrefsLink = SiteLink + lang.prefslink;
FingonUrl = 'http://89.149.221.178/~fingon';

OB_update('OBUpdate', ScriptName, ScriptVersion, SiteLink+'?page=Download', SiteLink+'/version.txt');

GM_registerMenuCommand(ScriptName + ' v' + ScriptVersion, function(){ alert('You are using ' + ScriptName + '\nVersion:\t' + ScriptVersion + '\nRevision:\t' + ScriptSubVersion )});
GM_registerMenuCommand('Update ' + ScriptName, function(){ GM_openInTab("http://www.omertabeyond.com/?page=Download"); });

var maxbit = lang.maxprefs; //set the amount of preferences

var prefs = decbin(getValue('prefs', 0),maxbit);//load integer prefs as a boolean array

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
	'colour'
];
//beyond menu descriptions
var descr = [
	lang.prefsname,
	"OB Poll",
	"B/N Prices",
	"Calculators",
	"Fingon's Daily Famstats"
];
//beyond menu links
var qlinks = [
	PrefsLink,
	SiteLink+'/html/poll/poll.php',
	'/hacking.php',
	SiteLink+'/gm/calc.php',
	FingonUrl+'/latestpicture.php'
];
if(lang.version!='_com'){descr.pop();qlinks.pop();}

//---------------- Preferences Panel ----------------
if(lh == PrefsLink + ls){
	var prefs = decbin(getValue('prefs', 0),maxbit);
	if(ls.length > 1){
		if(ls.indexOf("=") == -1){
			setValue('prefs', ls.substring(1)); //save integer prefs
			var prefs = decbin(getValue('prefs', 0),maxbit);
		}
		for(j=0; j<querys.length; j++){
			if(GetPost(querys[j]) != '') setValue(querys[j], GetPost(querys[j]));
			if(GetParam('jailint') != '') setValue('jailint', GetParam('jailint'));
		}
	}
	var prefstr = lang.prefs;

	var string = '<tr height="25" id="prefsrow"><td colspan=4 class="toptd">Omerta Beyond ' + ScriptVersion + '.' + ScriptSubVersion + ' : Preferences</td></tr>';
	for(i=0;i<maxbit;i=i+2){
		if(i!=maxbit-1) string += '<tr height=25 class="tr"><td width=25 class="td"><input type="checkbox" id="check' + i + '" name="check_list"></td><td class="td">' + prefstr[i] + '</td><td width=25 class="td"><input type="checkbox" id="check' + (i+1) + '" name="check_list"></td><td class="td">' + prefstr[(i+1)] + '</td></tr>';
		else string += '<tr height=25 class="tr"><td width=25 class="td"><input type="checkbox" id="check' + i + '" name="check_list"></td><td colspan="3" class="td">' + prefstr[i] + '</td></tr>';
	}
	string += '<tr height="50"><td colspan=4 class="bigtd"><button type="button" name="Check_All" class="checkbutton" onClick="Check(document.myform.check_list)">Check all</button>';
	string += '&nbsp;<button type="button" name="#" class="button" onClick="updateprefs()">Update '+lang.prefsname+'</button><br><span class="margintd">The page will be refreshed when you click the update button.</span></td></tr>';

	getID('toptable').innerHTML = string;

	for(i=0;i<maxbit;i++) getID('check' + i).checked = prefs[i];

	var family = getValue('families', '').split(",");
	var colour = getValue('colours', '').split(",");
	var priority = getValue('priority', '').split(",");
	var jailint = getValue('jailint', 6);
	var maxHL = getValue('maxHL',5);
	var hotkeys = getValue('rawkeyprefs','');
	var buyout = getValue('buyout','/');
	var FL_prior = getValue('FL_prior',3);
	var Fam_prior = getValue('Fam_prior',9);

	var string = '<tr height="25"><td colspan=6 class="toptd">Omerta Beyond : Jailhighlighter</td></tr>';
	string += '<tr height=25 class="tr"><td class="td">&nbsp;</td><td width="210" class="td"><b>Family or Ingame nick</b></td><td width="75" class="td"><b>Colour</b></td><td width="76" class="td">&nbsp;</td><td width="50" class="td"><b>Priority</b></td><td class="td">&nbsp;</td></tr>';
	for(i=0;i<jailint;i++){
		if(family[i] == null) family[i] = "";
		if(colour[i] == null) colour[i] = "";
		if(priority[i] == null) priority[i] = "";
		string += '<tr height=25 class="tr"><td class="td">&nbsp;</td><td class="td"><input id="family' + i + '" value="' + family[i] + '" type="text" name="#" class="inputbig"></td>';
		string += '<td class="td"><input id="colour' + i + '" value="' + colour[i] + '" type="text" name="color'+(i+1)+'" class="inputmiddle"></td>';
		string += '<td class="td"><A HREF="#" onClick="cp2.select(document.colorpickform.color'+(i+1)+',\'pick2\');return false;" NAME="pick2" ID="pick2"><img src="'+GM_getResourceURL("colorpicker")+'" border=0></A></td>';
		string += '<td class="td"><input id="priority' + i + '" value="' + priority[i] + '" type="text" name="#" class="inputsmall"></td><td class="td">&nbsp;</td></tr>';
	}
	string += '<tr height="25" class="tr"><td class="td" colspan="6" align="center">Friend List Priority: <input id="FL_prior" value="' + FL_prior + '" type="text" onBlur="if(this.value > 9 || this.value < 1) this.value = 3;" name="#" class="inputsmall"> || Family Priority: <input id="Fam_prior" value="' + Fam_prior + '" type="text" onBlur="if(this.value > 9 || this.value < 1) this.value = 9;" name="#" class="inputsmall"></td></tr>';
	string += '<tr height="25" class="tr"><td class="td" colspan="6" align="center">Maximum of highlight list on jailpage: <input id="maxHL" value="' + maxHL + '" type="text" onBlur="if(this.value > 5) this.value = 5;" name="#" class="inputsmall"></td></tr>';
	string += '<tr height="25" class="tr"><td class="td" colspan="6" align="center">Buy out Hotkey when in jail: <input id="buyout" value="' + buyout + '" type="text" onBlur="var h = \''+hotkeys+'\'; if(h.indexOf(this.value) != -1) this.value = \'\';" name="#" class="inputsmall"></td></tr>';
	string += '<tr height="40"><td colspan=6 class="bigtd"><button type="button" class="button" onClick="location.href = \'?jailint=' + (parseInt(jailint)+1) + '\'">Add</button> <button type="button" class="button" onClick="location.href = \'?jailint=' + (parseInt(jailint)-1) + '\'">Remove</button></td></tr>';
	string += '<tr height="20"><td colspan=6 class="bigtd"><button type="button" class="button" name="#" onClick="location.href = \'?maxHL=\' + document.getElementById(\'maxHL\').value + \'&buyout=\' + document.getElementById(\'buyout\').value + \'&FL_prior=\' + document.getElementById(\'FL_prior\').value + \'&Fam_prior=\' + document.getElementById(\'Fam_prior\').value + \'&families=\'';
	for(i=0;i<jailint;i++) string += " + document.getElementById('family" +i+ "').value.toUpperCase() + ','";
	string += " + '&colours='";
	for(i=0;i<jailint;i++) string += " + document.getElementById('colour" +i+ "').value.replace('#', '') + ','";
	string += " + '&priority='";
	for(i=0;i<jailint;i++) string += " + document.getElementById('priority" +i+ "').value + ','";
	string += '">Save Settings</button><br><span class="margintd">If someone in jail is higher than one of the settings he/she will be highlighted with the colour of the lowest priortity number</span><br>The default priority number for friends is: <b>3</b> and for family is: <b>9</b><br>The lowest and default priority for anyone in jail is <b>10</b></tr>';

	getID('tablejail').innerHTML = string;
}
//---------------- Cocaine Prices ----------------
if(dlp == '/marquee.php'){
	document.addEventListener('dblclick', function() { window.location.reload(); }, true);
	if(prefs[1]){
		GM_xmlhttpRequest({
			method: 'GET',
			url: SiteLink+'/gm/prices'+lang.version+'.xml.php',
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'application/xml,text/xml'},
			onload: function(resp){
				var marquee = $X('//div');
				marquee.innerHTML = "";

				var parser = new DOMParser();
				var dom = parser.parseFromString(resp.responseText, "application/xml");

				function getPrice(drug, city) dom.getElementsByTagName(drug)[0].getElementsByTagName(city.replace(' ', ''))[0].textContent;

				var p = new Array;
				var q = new Array;
				var p_C = ["Baltimore","Chicago","New York","Philadelphia","Detroit","Las Vegas","Corleone","Palermo"];
				var p_id = ["6","1","3","5","nul","4","7","2"];
				for(i=0;i<=7;i++){ p[i]=getPrice('Cocaine',p_C[i]); q[i]=p[i]; }

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

				function hoverlink(city, priceStr){
					var link = cEL('a');
					link.href = "#";
					link.style.color = '#' + getValue('colour', 'ffffff');
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
					hoverdiv.innerHTML = 'Morphine: ' + getPrice("Morphine", city) + ' || ' + 'Heroin: ' + getPrice("Heroin", city) + ' || ' + 'Opium: ' + getPrice("Opium", city) + ' || ' + 'Whiskey: ' + getPrice("Whiskey", city) + ' || ' + 'Amaretto: ' + getPrice("Amaretto", city) + ' || ' + 'Rum: ' + getPrice("Rum", city);
				}

				function flytolink(city, priceStr, priceToFly, cityId){
					var link = cEL('a');
					link.href = "#";
					link.id = city;
					link.style.color = '#' + getValue('colour', 'ffffff');
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

							if(html.indexOf('body') == -1) {//if you can NOT travel
								var msg = html.slice(html.indexOf('</head>')+9);
								var msg = msg.replace(/<\S[^><]*>/g,'');
								alert((msg == '') ? (lang.marquee[6] + city + "...Poker?") : msg );
							}
							else {//if you CAN travel
								var costs = arr;
								var parts = html.split('<span');//get costs msg
								parts.forEach(function($n){
									if($n.indexOf('"nd();"') != -1) costs.push($n.slice($n.indexOf('", "')+4,$n.indexOf('")')));
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
													if(resp.responseText.match(lang.marquee[4])) alert(lang.marquee[5]);
													else {
														var msg = resp.responseText.slice((resp.responseText.indexOf('</head>'))+7).replace(/<\S[^><]*>/g,'');
														if(msg == '') msg = lang.marquee[6] + city + "...Poker?";
														else {
															var where = 0;
															where = parseInt(cityid.replace('nul','0'))+4;
															if(where) setPow('bninfo',2,where); //if a city is stored
														}
														alert(msg);
														top.frames[2].location = top.frames[2].location;
														window.location.reload();
													}
												}
												catch(e){ alert(lang.marquee[6] + city + "...");}
											}
										});
									}
									else {
										var msg = resp.responseText.slice((resp.responseText.indexOf('</head>'))+7).replace(/<\S[^><]*>/g,'');
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
				i=0; p.forEach(function($n){
					span.appendChild(flytolink(p_C[i], p_C[i]+': '+q[i], 500, p_id[i]));
					var separator = cEL('span');
					separator.innerHTML = ' | ';
					span.appendChild(separator);
				i++; });

				var link = cEL('a');
				link.href = "hacking.php";
				link.target = 'main';
				link.innerHTML = lang.marquee[2];
				if(getValue('bold', '0') == '1') link.style.fontWeight = 'bold';
				link.style.color = '#' + getValue('colour', 'ffffff');
				link.style.fontSize = '10px';
				link.addEventListener('mouseover',function(){this.style.textDecoration='underline' }, true);
				link.addEventListener('mouseout',function(){this.style.textDecoration='none' }, true);
				span.appendChild(link);
				priceandtime.innerHTML = lang.marquee[3] + time + ' | ';
				span.style.color = '#' + getValue('colour', 'ffffff');
				span.style.fontSize = '10px';
				marquee.appendChild(span);

				city = getPow('bninfo',2,-1)
				if(city > 0) {
					switch(city) {
						case 0: city = "NOWHERE"; break;
						case 4: city = "Detroit"; break;
						case 5: city = "Chicago"; break;
						case 6: city = "Palermo"; break;
						case 7: city = "New York"; break;
						case 8: city = "Las Vegas"; break;
						case 9: city = "Philadelphia"; break;
						case 10: city = "Baltimore"; break;
						case 11: city = "Corleone"; break;
					}
					getID(city).setAttribute('style',getID(city).getAttribute('style')+'font-style: italic;');
				}
				window.onload = setTimeout("window.location.reload()", 60000);
			}
		});
	}
}
//---------------- Menu and submenus ----------------
if(dlp == '/menu.php'){
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
//--end adding menus
//--start assembling vars
	if(dls.indexOf('reset') != -1) setValue('submenus','0'); //mode = oh noes!
	var submenus = getValue('submenus',0);

	//get # of submenu's
	var tables = $X('/html/body/table/tbody/tr/td').getElementsByTagName('table').length;
	var subs = tables/2;
	if(db.innerHTML.search('./crewstats.php') != -1) subs--//check for crew submenu

	//get # of buttons in submenu's
	var buttons = new Array();
	for(i=1,j=0;i<=subs;i++,j++){
		var num = parseInt($X('/html/body/table/tbody/tr/td/table['+i+']/tbody/tr[2]/td/div/table/tbody').getElementsByTagName('tr').length);
		buttons[j] = num;
		if(i==subs) buttons[j]--;
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
			if(menuprefs != '' && menuprefs != null && menuprefs != 'undefined'){
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
						for(j=buttons[i-1];j>=1;j--){ //delete button or add hotkey
							var xp_tr = '/html/body/table/tbody/tr/td/table['+i+']/tbody/tr[2]/td/div/table/tbody/tr['+j+']';
							var kpref = keyprefs[i-1].slice(j-1,j);

							if(menuprefs[i-1].slice(j-1,j) == 0) del(xp_tr);
							else if(kpref != '*'){
								var but = $X(xp_tr + '/td/a');
								but.accessKey = kpref;
								but.innerHTML = but.innerHTML + " ("+ kpref.toUpperCase() +")";
								but.addEventListener('focus',function(){this.blur();},false);
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
		if((dls.indexOf('?newmenu=') != -1) || (dls.indexOf('?newkeys=') != -1)){ //mode = updated menu/keys
			$X('html/body').innerHTML = "<font color='red'>" + mode[0] + lang.customs + "</font>" + $X('html/body').innerHTML;
			var newprefs = GetParam(mode[1]);
			setValue(mode[2],newprefs);
			for(i=0;i<=buttons.length-1;i++){
				setValue(mode[3]+(i+1),newprefs.slice(0,buttons[i]));
				var newprefs = newprefs.slice(buttons[i]);
			}
			setValue('submenus',i);
			setTimeout("location.href='menu.php'", 2000);
		}
		var buyout = getValue('buyout','/');
		var script = cEL("script");
		script.setAttribute('type','text/javascript');
		script.innerHTML = 'function checkKey(id){for(i=0;i<=document.getElementsByTagName(\'input\').length-1;i++){var val = document.getElementsByTagName(\'input\')[i].value;if((val == document.getElementById(id).value && \'ip\'+(i+1) != id && document.getElementById(id).value != \'\') || val == \''+buyout+'\'){ alert("You\'re already using that key!"); document.getElementById(id).value = \'\'; i=100; }}}';
		$X("//head").appendChild(script);
		//mode = customize
		if(dls.indexOf('menu') != -1) var upmenu=1;
		if(dls.indexOf('keys') != -1) var upkeys=1;
		if(upmenu || upkeys){
			window.addEventListener("load", function(){
				var raw = upmenu ? getValue('rawmenuprefs','*') : getValue('rawkeyprefs','0');
				for(i=1,q=1;i<=subs;i++){
					for(j=1;j<=buttons[i-1];j++,q++){
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
			for(i=1,q=1;i<=subs;i++) for(j=1;j<=buttons[i-1];j++,q++) inputs=q+1;

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
//---------------- NickReader ----------------
if(prefs[16] && dlp != '/banner.php' && dlp != '/game.php'){ //if nickreader is on
	var nicks = $x('//a[contains(@href, "user.php")]');
	if(nicks.length > 0) {
		var div = cEL('div');//setup NR status div
		div.setAttribute('style','background-color:#3F505F;color:#FFFFFF !important;text-decoration:none;padding:5px;width:150px;border:1px ridge black;opacity: .85;color:black;position:fixed;display:block;');
		div.style.display = 'none';
		div.id = 'NRstatus';
		div.style.left = 2;
		div.style.top = 2;
		div.innerHTML = '<b><center>'+lang.NR.misc[2]+'</center></b>';
		db.appendChild(div);

		var div = cEL('div');//setup ctrl event checker
		div.style.display = 'none';
		div.id = 'ctrl';
		div.innerHTML = 0;
		db.appendChild(div);

		var div = cEL('div');//setup alt event checker
		div.style.display = 'none';
		div.id = 'alt';
		div.innerHTML = 0;
		db.appendChild(div);

		db.setAttribute('onKeydown','if(event.keyCode==18){document.getElementById("alt").innerHTML = 1;document.getElementById("NRstatus").style.display = "block";} if(event.keyCode==17){ if(document.getElementById("ctrl").innerHTML == 0) {document.getElementById("ctrl").innerHTML = 1;document.getElementById("NRstatus").style.display = "block";}else{document.getElementById("ctrl").innerHTML = 0;document.getElementById("NRstatus").style.display = "none";}}');
		db.setAttribute('onKeyup','if(event.keyCode==18){document.getElementById("alt").innerHTML = 0; document.getElementById("NRstatus").style.display = "none";}');

		nicks.forEach(function($n){ //add mouse event checkers
			url = dlh + (dlh.indexOf('/') == -1 ? "/" : '') + $n.getAttribute('href');
			url = url.replace('//user','/user');
			$n.addEventListener('mouseover', getNickInfo, true);
			$n.addEventListener('mouseout', function(){ if(document.getElementById(this.href)) document.getElementById(this.href).style.display = 'none'; }, true);
		});
		window.focus();//focus on frame so 'ctrl' event is noticed
	}
}
// -------- 3-LETTER CODE PROTECTION AND CHARCODE FILTER -----------------
if(dlp == '/jail.php' || dlp == '/iminjail.php' || dlp == '/kill.php' || dlp == '/smuggling.php' || dlp == '/bullets2.php' || dlp == '/BeO/webroot/index.php'){
	function setter(node) {
		node.setAttribute('maxLength','3');
		node.setAttribute('onkeypress','javascript:lettercode=event.charCode;symcode = event.keyCode;return (lettercode>=48 && lettercode<=57 || lettercode>=65 && lettercode<=90 || lettercode>=97 && lettercode<=122 || symcode>=37 && symcode<=40 || symcode==8 || symcode==9 || symcode==13 || symcode==46)? true : false;');
	}

	input = getELNAME('ver'); // jail, iminjail, kill, smuggling
	if(input[0]) setter(input[0]);
	else {
		input = getELNAME("ver_sys"); // bullets
		if(input[0]) setter(input[0]);
		input = getELNAME("ver_bull"); // bullets
		if(input[0]) setter(input[0]);
		else {
			input = $x('//input') // crimes/cars
			if(input[7]) setter(input[7]); // crimes page
			else if(input[5]) setter(input[5]); // cars page
		}
	}
}
//---------------- Status page ----------------
if(dlp == '/information.php'){
	var x, capo, weaponXP, jailBustXp, shootRange, ksPath;
	x = '/html/body/center/table/tbody/tr/td/table/tbody/tr[';
	shootRange = '/html/body/center/table/tbody/tr/td/table[2]/tbody/tr[9]';
	weaponXP = '/html/body/center/table/tbody/tr/td[3]/table[2]/tbody/tr[5]/td[2]';
	jailBustXp = '/html/body/center/table/tbody/tr/td[3]/table[1]/tbody/tr[';
	ksPath = '/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[5]/td[2]/table/tbody/tr/td';

	if(prefs[6]) del(jailBustXp + "6]");//if remove Jailbusting Skill is on
	if(prefs[22]){ 
		if (prefs[6]) del(jailBustXp + "6]"); //if remove both 'Race form bar' and 'Jailbusting Skill' is on
		else del(jailBustXp + "7]");//if remove Race form bar is on
	}
	if(prefs[12]){ //if remove Capo Money is on
		capo = $X(x+'5]/td[2]').textContent.split(' ')[0];
		$X(x+'5]/td[2]').innerHTML = /Capo/.test(capo) ? $X(x+'5]/td[2]').innerHTML : "<a href=/user.php?nick=" + capo + ">"+ capo +"</a>"
	}
	if(prefs[24]) del(shootRange);
	$I(x+'3]/td[2]',"<a href=/user.php?nick=" + getTXT(x+'3]/td[2]') + ">"+ getTXT(x+'3]/td[2]') +"</a>");
	$I(x+'12]/td[2]',"<a href=/user.php?nick=" + getTXT(x+'12]/td[2]').split("\t")[1] + ">"+ getTXT(x+'12]/td[2]').split("\t")[1] +"</a>");
	if(/\bTranslation\b/.test($X(x+'6]/td[2]').textContent)) $I(x+'6]/td[2]',"<a href=http://dev.barafranca.com/translate/ target=_blank>"+ $X(x+'6]/td[2]').textContent +"</a>");
	if(lang.status[0].match($X(weaponXP).textContent)) $I(weaponXP,"<a href=/shop.php><b>"+ $X(weaponXP).textContent +"</b></a>");
}
//---------------- Look it's me! ----------------
if(dlp == '/allusers.php' || urlsearch == '/compress.php?r=usersonline') {
	nick = getValue('nick','');
	if(nick!='') {
		names = $x('//a');
		names.forEach(function($n){
			if($n.textContent == nick || $n.textContent == nick+'+') $n.innerHTML = '<span style="color:green!important;">' + $n.innerHTML + '</span>';
		});
	}
}
//--------------- Bullet form --------------
if(dlp == '/bullets2.php'){//If auto fill form is on
	var x, path, lbf, bf, BFTextXp;
	x = '/html/body/center';
	path = '/table/tbody/tr[3]/td';
	BFTextXp = x+ '[2]/table/tbody/tr/td'

	if(prefs[8] && db.innerHTML.search(/table/i) != -1){
		window.addEventListener("load", function(){ $x('//input')[1].focus(); }, true);
		lbf = $I(x + path).split("<br>")[3].match(/\d+/g)[0];
		$x('//input')[0].value = (lbf >= 400) ? 400 : lbf;
		bf = $I(x + '[2]' + path).split("<br>")[4].replace(',','').match(/\d+/g)[0];
		$x('//input')[4].value = bf;
	}
	arr = $I(BFTextXp).split(' ');
	arr[6] = "<u>" + arr[6] + "</u>";
	arr[3] = "<u>" + setArr(3) + "</u>";
	$I(BFTextXp,arr.join(" "));
}
//---------------- Fingons News ----------------
if(dlp == '/info.php'){
	if(prefs[2]){ //If Fingon's News menu preference is on
		var url = FingonUrl+'/beyond-news.php?num=' + getValue('newsamount', 5) + '&version='+lang.fingon+'&css='+ $X('//link').href +'&url=' + dlh;
		if(getValue('custombg', '') != '') url += '&pron=' + getValue('custombg');
		location.href = url;
	}
}
//---------------- Jail Highlighter and Jail autoform ----------------
if((dlp == '/jail.php') && prefs[3]){
	//assemble prefs
	var words = replaceLast(getValue('families',''),',','',1).split(",");
	var bgColors = replaceLast(getValue('colours',''),',','',1).split(",");
	var prioritys = replaceLast(getValue('priority',''),',','',1).split(",");
	var maxHL = getValue('maxHL',5);
	var FL_prior = getValue('FL_prior',3);
	var Fam_prior = getValue('Fam_prior',9);

	var span = cEL('span');
	span.innerHTML = '<br> &nbsp;In jail: ' + db.innerHTML.slice(db.innerHTML.lastIndexOf(': ')).replace(/[^0-9]/g,'') + '<br><br> &nbsp;[#] = alt+shift hotkey';
	$X('//fieldset').parentNode.insertBefore(span, $X('//fieldset').nextSibling);

	var count = j = 0;
	HL_Nicks = HL_Fams = HL_Reasons = HL_Times = HL_Ids = HL_Buys = HL_Colors = ''; 
	//add priority and bgcolor to html
	var inJail = $x('//tr[@bgcolor]');
	if(inJail.length == 0) return
	inJail.forEach(function($n){
		var nicka = $n.getElementsByTagName('td')[0].innerHTML;
		var nick = nicka.slice(nicka.indexOf('>')+1,nicka.indexOf('</')).toUpperCase();
		var fama = $n.getElementsByTagName('td')[1].innerHTML;
		var fam = fama.slice(fama.indexOf('>')+1,fama.indexOf('</')).toUpperCase();

		$n.setAttribute('priority',10); //set default priority, then check for friends and fam
		if($n.getAttribute('bgcolor') == '#dbdbdb') $n.setAttribute('priority',Fam_prior);
		if($n.getAttribute('bgcolor') == 'yellow') $n.setAttribute('priority',FL_prior);

		for(i=0;i<=words.length-1;i++){ //loop players and see if either nick or fam matches with prefs
			ItemPriority = (prioritys[i]) ? prioritys[i] : 10;
			if(fam == words[i] && parseInt($n.getAttribute('priority')) >= ItemPriority){ //also see if the priority of the fam is higher
				$n.setAttribute('bgcolor',bgColors[i]);
				$n.setAttribute('priority',ItemPriority);
			}
			if(nick == words[i] && parseInt($n.getAttribute('priority')) >= ItemPriority){//also see if the priority of the nick is higher
				$n.setAttribute('bgcolor',bgColors[i]);
				$n.setAttribute('priority',ItemPriority);
			}
		}
		if($n.getAttribute('bgcolor') != '' && count < maxHL){
			HL_Nicks += nicka + ', ';
			HL_Fams += fama + ', ';
			HL_Reasons += $n.childNodes[5].innerHTML + ', ';
			HL_Times += $n.childNodes[7].childNodes[0].innerHTML + ' ' + (($n.childNodes[7].innerHTML.indexOf('>M<') != -1) ? ($n.childNodes[7].childNodes[2].innerHTML.replace(/undefined |undefined/g,'')) : '') + ', ';
			HL_Ids += j + ', ';
			HL_Buys += $n.childNodes[11].innerHTML + ', ';
			HL_Colors += $n.getAttribute('bgcolor') + ', ';
			count++;
		}
		j++;
	});
	HL_Nicks = HL_Nicks.split(', ');
	HL_Fams = HL_Fams.split(', ');
	HL_Reasons = HL_Reasons.split(', ');
	HL_Times = HL_Times.split(', ');
	HL_Ids = HL_Ids.split(', ');
	HL_Buys = HL_Buys.split(', ');
	HL_Colors = HL_Colors.split(', ');

	var prior = 10; //highest priority
	function setSelect(){
		button.checked = true;
		selNick		= playerTds[1].innerHTML;
		selFam		= playerTds[3].innerHTML;
		selReason	= playerTds[5].innerHTML;
		selTime		= playerTds[7].childNodes[0].innerHTML + ' ' + playerTds[7].childNodes[2].innerHTML;
		selBuy		= playerTds[11].innerHTML;
		selColor	= playerRow.getAttribute('bgcolor');
	}
	for(i=inJail.length-1;i>=0;i--){ //loop list
		priority = parseInt(inJail[i].getAttribute('priority'));
		var button = $x('//input[@type="radio"]')[i];
		button.id = i;
		var playerRow = button.parentNode.parentNode;
		var playerTds = playerRow.childNodes;
		if(priority <= prior){ //see if player has higher priority then saved priority
			prior = priority; //changes highest priority
			setSelect(); //set current player with highest priority
		}
		var func = "var changed = document.getElementById("+i+");"+
			"if(changed.checked){"+
				"var daddy = changed.parentNode.parentNode;"+
				"var kids = daddy.childNodes;"+
				"selNick = kids[1].innerHTML;"+
				"selFam = kids[3].innerHTML;"+
				"selReason = kids[5].innerHTML;"+
				"selTime = kids[7].childNodes[0].innerHTML + ' ' + kids[7].childNodes[2].innerHTML;"+
				"selBuy = kids[11].innerHTML;"+
				"selBuy = selBuy.replace(')',') [0]');"+
				"selColor = daddy.getAttribute('bgcolor');"+
				"document.getElementById('nick').innerHTML = selNick;"+
				"document.getElementById('fam').innerHTML = selFam;"+
				"document.getElementById('reason').innerHTML = selReason;"+
				"document.getElementById('time').innerHTML = selTime.replace(/undefined |undefined/g,'');"+
				"document.getElementById('buy').innerHTML = selBuy;"+
				"document.getElementById('show').setAttribute('bgcolor',selColor);"+
				"if(this.id.indexOf('D') == -1) document.getElementById('D'+this.id).checked=true;"+
				"document.getElementById('buy').getElementsByTagName('a')[0].setAttribute('accessKey','0');"+
			"}";
		button.setAttribute('onChange',func); //add changer for 'show selected player'
	}
	if(prior == 10){ //if no highlights set a random
		var i = (Math.ceil(Math.random()*inJail.length)-1);
		if(inJail.length > 4 && (i+3) > inJail.length) i = i-3;
		var button = $x('//input[@type="radio"]')[i];
		var playerRow = button.parentNode.parentNode;
		var playerTds = playerRow.childNodes;
		setSelect(); //set current highest priority
	}
	$X('//input').focus();

	//add selected player on top of table
	var tr,td;
	tr = cEL('tr');
		td = cEL('td');
		td.setAttribute('height',1);
		td.setAttribute('bgcolor','black');
		td.setAttribute('colspan',6);
	tr.appendChild(td);
	$X('//table[@class="thinline"]/tbody').insertBefore(tr,$X('//table[@class="thinline"]/tbody/tr'));
	tr = cEL('tr');
		td = cEL('td');	td.innerHTML = selNick; td.id = 'nick'; tr.appendChild(td);
		td = cEL('td');	td.innerHTML = selFam; td.id = 'fam'; tr.appendChild(td);
		td = cEL('td');	td.innerHTML = selReason; td.id = 'reason'; tr.appendChild(td);
		td = cEL('td');	td.innerHTML = selTime.replace(/undefined |undefined/g,''); td.id = 'time'; tr.appendChild(td); //.replace covers for dissapearing time <span>
		td = cEL('td');	td.innerHTML = ''; tr.appendChild(td);
		td = cEL('td');	td.innerHTML = selBuy; td.id = 'buy'; tr.appendChild(td);
	tr.setAttribute('bgcolor',selColor);
	tr.id = 'show';
	$X('//table[@class="thinline"]/tbody').insertBefore(tr,$X('//table[@class="thinline"]/tbody/tr'));
	var buyout = $I('//td[@id="buy"]',$I('//td[@id="buy"]')+' <a onFocus="document.getElementsByTagName(\'input\')[0].focus()" href="javascript:document.getElementById(\'buy\').getElementsByTagName(\'a\').click()" accessKey="0">[0]</a>');

	if(maxHL==0||prior==10) return //no need to add stuff with max=0 or no HL
	//add footer
	for(i=0,p=arr;i<=1;i++){ p[i]=cEL('p'); (p[i]).innerHTML='&nbsp;'; $X('//form').parentNode.insertBefore(p[i],$X('//form').nextSibling); } //mode space at bottom

	var style = 'body > div#footerwrap{position:fixed;}div#footerwrap{bottom:0;height:106px;left:'+findPos($X('//table[@class="thinline"]'))[0]+'px;position:absolute;width:600;}';
	style += 'div#footer {background:#E6E6E6 none repeat scroll 0 0;color:#000000;height:106px;margin:0 auto;width:600;}';
	style += 'div td{color:#000000;}div td a{color:#000000;}div td a:hover{text-decoration: underline;}';
	GM_addStyle(style);

	var wrap = cEL('div');
	wrap.id = "footerwrap";

	var footer = cEL('div');
	footer.id = "footer";
	footer.align = "center";
	var friends = '<table class="thinline" cellspacing="0" cellpadding="2" width="600" rules="none">';
	friends += '<tr bgcolor="#000000" height="0"><td width="' + $X('//td[@class="tableheader"]').offsetWidth +'"></td><td width="' + $x('//td[@class="tableheader"]')[1].offsetWidth +'"></td><td width="' + $x('//td[@class="tableheader"]')[2].offsetWidth +'"></td><td width="' + $x('//td[@class="tableheader"]')[3].offsetWidth +'"></td><td width="' + $x('//td[@class="tableheader"]')[4].offsetWidth +'"></td><td width="' + $x('//td[@class="tableheader"]')[5].offsetWidth +'"></td></tr>';
	for(i=0;i<=HL_Nicks.length-2;i++){
		friends += '<tr bgcolor="'+HL_Colors[i]+'"><td>'+HL_Nicks[i]+'</td><td>'+HL_Fams[i]+'</td><td>'+HL_Reasons[i]+'</td><td>'+HL_Times[i]+'&nbsp;<a onFocus="document.getElementsByTagName(\'input\')[0].focus()" href="javascript:document.getElementById(\'D'+HL_Ids[i]+'\').click()" accessKey="'+(i+1)+'">['+(i+1)+']</a></td><td><input type="radio" id="D'+HL_Ids[i]+'" onFocus="document.getElementsByTagName(\'input\')[0].focus()" onChange="'+func.replace('0',HL_Ids[i])+'" onClick="document.getElementById('+HL_Ids[i]+').checked=true;" name="bust"/></td><td>'+HL_Buys[i]+'</td></tr>';
	}
	friends += '</table>';
	footer.innerHTML = friends;

	wrap.appendChild(footer);
	$X('//form').parentNode.insertBefore(wrap,$X('//form').nextSibling);
}
//---------------- In jail page --------------
if(dlp == '/iminjail.php' && db.innerHTML.indexOf("<img") != -1) {
	if(prefs[15]) $X("//a").accessKey = getValue('buyout','/'); //add buy out hotkey
	if(prefs[23]) {//if go to jailpage is on
		if($I('/html').indexOf('<body></body>')!=-1||$I('/html').indexOf('<body>')==-1||!db) window.location = 'jail.php'; //check for blank page
		var min = 0;
		if(db.innerHTML.search('counter_jt_minutes') != -1){
			var min = (getID('counter_jt_minutes').getAttribute('style') != 'display: none;') ? getID('counter_jt_minutes_value').innerHTML : 0 ;
		}
		var sec = getID('counter_jt_seconds_value').innerHTML;
		setTimeout("window.location='jail.php'", (((min*60) + parseInt(sec)) * 1000));
	}
}
//---------------- wrongcode --------------
if(urlsearch == '/BeO/webroot/index.php?module=Crimes&action=docrime' || urlsearch == '/BeO/webroot/index.php?module=Cars&action=docar'){
	if(prefs[11]){
		if(db.innerHTML.search(lang.wrongcode[0]) != -1){
			db.innerHTML = lang.wrongcode[1];
			setTimeout("history.back()",1000);
		}
	}
}
//----------------- Crime Page -------------------
if(urlsearch == '/BeO/webroot/index.php?module=Crimes'){
	if(db.innerHTML.search(/table/i) != -1){
		var inputs = $x('//input');
		if(prefs[4]) inputs[6].setAttribute("disabled","true"); //If remove shooting bottle is on
		if(prefs[8]){ //If autoforms are on
			if(prefs[4]){
				inputs[6].setAttribute("disabled","true");
				inputs[5].checked = true;
			}
			else inputs[6].checked = true;
		}
		inputs[7].focus();
	}
	else if(prefs[10]) refreshIn();
}
//----------------- Cars Page --------------------
if(urlsearch == '/BeO/webroot/index.php?module=Cars'){
	var xpath, x, inputs;
	if(db.innerHTML.search(/table/i) != -1){
		if(prefs[8]){ //If auto select highest percentage at Car Nick is on
			if(db.innerHTML.search(lang.cars) != -1){
				for(i=1;i<=4;i++){ //Get percentages
					xpath = "/html/body/center/table/tbody/tr[3]/td/form/table/tbody/tr[" + i + "]/td[3]";
					eval("p" + i + "= gsPATH(xpath)");
				}
				x = Math.max(p1,p2,p3,p4); //Select Highest percantage
				inputs = $x('//input');
				if(p1 == x) inputs[1].checked = 1;
				if(p2 == x) inputs[2].checked = 1;
				if(p3 == x) inputs[3].checked = 1;
				if(p4 == x) inputs[4].checked = 1;
			}
		}
		$x('//input')[5].focus();
	}
	else if(prefs[10]) refreshIn();
}
//---------------- DC+ info bar ----------------
if(dlp == '/mid.php'){
	setTimeout("window.location.reload()", '30000');
	var x, x2, boXpath, healthXp, healthXpBar, rpXp, ksXp, ksXpBar, boXp;
	x = '/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr';
	x2 = '/html/body/div[2]/table/tbody/tr/td/table/tbody/tr';
	boXpath = x+'[4]/td[5]';
	healthXp = x2+'[2]/td[5]';
	healthXpBar = x2+'[2]/td[6]/dl/dt';
	rpXp = x2+'/td[5]';
	ksXp = x2+'[3]/td[5]';
	ksXpBar = x2+'[3]/td[6]/dl/dt';
	boXp = x2+'[4]/td[5]';
	if($X(healthXpBar)) setValue('missingHealth','100' - getTXT(healthXpBar).replace('%',''));

	if($I('//body').search('nowrap') != -1) {
		$I(rpXp,"<a href='/information.php' target='main'><b>R</b>ank progress:</a>");
		$I(healthXp,"<a href='bloodbank.php' target='main'><b>H</b>ealth:</a>");
		$I(healthXpBar,'<a href="bloodbank.php" target="main">'+$I(healthXpBar)+'</a>');
		$I(boXp,"<a href='jail.php' target='main'><b>B</b>usting skill:</a>");
		$I(ksXp,(Math.round(getTXT(ksXpBar).replace('%','')) >= '75') ? "<a href=BeO/webroot/index.php?module=Crimes target=main>" + $I(ksXp) + "</a>" : "<a href=range.php target=main>" + $I(ksXp) + "</a>");
		if(prefs[6]){//remove busting skill bar
			del('/html/body/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td[6]');
			del('/html/body/div[2]/table/tbody/tr/td/table/tbody/tr[4]/td[5]');
		}
	}
}
//---------------- User Profile ---------------------
if(urlsearch == ('/user.php' + dls)){
	if(prefs[7]){ // if Remove ImageShack / PhotoBucket / XS / Max-Save / pic.leech.it links option is on
		var xpath = "//img[contains(@src, 'imageshack.us')] | //img[contains(@src, 'photobucket.com')] | //img[contains(@src, 'xs.to')] | //img[contains(@src, 'max-save.org')] | //img[contains(@src, 'pic.leech.it')]";
		var results = document.evaluate(xpath, document, null, 7, null);
		for (i=0;i<results.snapshotLength;i++){
			var img = results.snapshotItem(i), link = cEL('a'), br = cEL('br');
			link.setAttribute('href',img.getAttribute('src'));
			link.innerHTML = img.getAttribute('src');
			img.parentNode.appendChild(link);
			img.parentNode.appendChild(br);
			link.parentNode.removeChild(img);
		}
	}
	if(db.innerHTML.search('table') != -1){
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

		var kind = [""," ($0 - $50.000)"," ($50.000 - $100.000)"," ($100.000 - $500.000)"," ($1.000.000 - $5.000.000)"," ($5.000.000 - $15.000.000)"," ( > $15.000.000)"," ($500.000 - $1.000.000)"], i=1;
		lang.wealth.forEach(function($n){ if(wlth.search($n) != -1){ $I(xpath,$I(xpath) + kind[i]); i=0; } if(i!=0) i++; });

		//Raceform
		xpath = "/html/body/center/table/tbody/tr["+(tr+1)+"]/td[2]";
		var rf = $I(xpath);

		var q = lang.driver;
		for(i=0;i<=10;i++) if(rf.indexOf(q[i]) == 0) $I(xpath,(i+1) + " - " + $I(xpath));
	}
}
//---------------- Take all out of bank ----------------
if(dlp == '/bank.php' && db.innerHTML.search(/table/i) != -1){
	var table, td, td2, bank, pocket;
	if(prefs[5]){ //If All in/out of Bank preference is on
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
if(dlp == '/garage.php'){
	//add amount of bullets
	head = $X('//h2');
	cars = head.textContent;
	cars = cars.slice(cars.indexOf('-'));
	cars = cars.slice(cars.indexOf('0 ')+1);
	cars = cars.replace(/[^0-9]/g,'');
	if(cars>0) head.innerHTML = head.innerHTML + ' Potential Bullets: ' + cars*12;

	//crusher
	var rows = $x('//tr').length;

	var xpath = "/html/body/form/center/table/tbody/tr[" + rows + "]/td"//add menu
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
			function checkcar(car){
				types = new Array;
				types[0] = ['h','Nash Standard 8','Nash Big Six Town Sedan','Hudson-Essex Super Six','Packard 1100 Sedan','Packard 740 Roadster','Bentley 3.5 Litre Coupe','Lincoln KA','Reo Royale 8 Convertible','Mercedes-Benz 320 Cabriolet','Bugatti Type 35','Duesenberg SJ','Bugatti Type 32 \'Tank\'','Alfa Romeo Spyder','Bugatti 57C Atalante'];
				types[1] = ['oc','Crossley Kegresse Half-Track Truck','Rolls Royce Phantom III','Cadillac V16 Series 452 C Fleetwood Towncar Cabriolet 1933','Alfa Romeo 6C 2500 Sport Touring Berlinetta','Bentley 3 Litre Vanden Plas Tourer','Bugatti Type 50 Coupe Profile','Duesenberg J Rollston Berline','Auburn 851 SC','Ford DeLuxe','Auburn 852 Supercharged'];
				types[2] = ['moc','Duesenberg X Locke','Packard Custom','Dodge Thunderbolt Concept'];
				types[3] = ['tr','Crossley Kegresse Half-Track Truck','Packard Custom','Oshkosh Model A'];
				types.forEach(function(array){ array.forEach(function($n){if($n==car) eval(array[0] + 'car=1;')}) });
			}
			for(i=2;i<rows-2;i++){
				y = "/html/body/form/center/table/tbody/tr["+(i+2)+"]/td[2]/a";//get car
				car = $I(y);
				z = "/html/body/form/center/table/tbody/tr["+(i+2)+"]/td[3]";//get percentage damage
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

					if((tr < max && select==1)||(tr > max && select==0)) $X("/html/body/form/center/table/tbody/tr["+(i+2)+"]/td[6]/input[2]").checked = true;
				}
			}
		}
	}
}
//---------------- Statistics ----------------
if(urlsearch == '/compress.php?r=statistics'){
	var a, b, x, y;
	$X('/html/body/center').innerHTML = "<table class='thinline' width='600' rules='none' cellspacing='0' cellpadding='2'><tbody><tr><td class='tableheader' align='center' colspan='4'><a href='#dfams'><b>Dead Fams</b></a> - <a href='#honour'><b>Honoured</b></a> - <a href='#cdtc'><b>CDTC</b></a> - <a href='#fams'><b>Families</b></a> - <a href='#bf'><b>BF</b></a> - <a href='#book'><b>Bookie</b></a> - <a href='#roul'><b>Roullie</b></a> - <a href='#num'><b>Numbers</b></a> - <a href='#slot'><b>Slots</b></a> - <a href='#bj'><b>BJ</b></a> - <a href='#pb'><b>PB</b></a></td></tr><tr><td height='1' bgcolor='black' colspan='2'/></tr></tbody></table>" + $X('/html/body/center').innerHTML;
	a = "/html/body/center/table[";
	b = "]/tbody/tr/td";
	y = ['dfams','honour','cdtc','fams','bf','book','roul','num','slot','bj','pb'];
	for(i=0;i<=10;i++){
		j=i+5;
		arr[i]=a+j+b;
		$I(arr[i],"<a name='" + y[i] + "'>" + $I(arr[i]) + "</a>&nbsp;&nbsp;&nbsp;<a href='#'>&uarr; <u>"+lang.stats+"</u> &uarr;</a>");
	}
}
//---------------- Family page ----------------
if(dlp == '/family.php'){
	if(prefs[13]){
		window.addEventListener('load',function(){//wait for DOM
		//--Get tops
			var numtop = 1;//get num of tops
			var con = sot = 0;
			var TopsTable = $I("/html/body/center/center/table/tbody");
			if(TopsTable.indexOf("Consiglieri:") != -1){ numtop++; con=1; }
			if(TopsTable.indexOf("Sottocapo:") != -1){ numtop++; sot=1; }

			var TopsXp = "/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[";//get tops
			var FirstTopsXp = TopsXp + "5";
			var topContent ='';

			function appendTop(xp) { topContent += $I(xp+"]/td[2]"); }

			appendTop(TopsXp + "4");
			if(con==1) appendTop(FirstTopsXp);
			if(sot==1 && numtop==2) appendTop(FirstTopsXp);
			if(sot==1 && numtop==3){appendTop(FirstTopsXp);appendTop(TopsXp+"6");}

		//--Add capos list
			var capoListXpath = "/html/body/center/center/table/tbody/tr[6]/td/table/tbody";
			var trs = $X(capoListXpath).getElementsByTagName('tr').length;
			var capos = 0;
			for(i=3;i<=trs;i=i+2){
				var tr = $X("/html/body/center/center/table/tbody/tr[6]/td/table/tbody/tr["+i+"]");
				var tds = tr.getElementsByTagName('td');
				var numtd = (tds.length)-2;
				var rowcapos = 0;
				for(j=0;j<=numtd;j=j+2){ //get capos from collumn
					var q = tr.getElementsByTagName('td')[j].innerHTML;
					var str = "capo" + capos + "=q";
					eval(str); capos++; rowcapos++;
					if(rowcapos == 3) j = numtd+1;
				}
			}
			//setup capo row HTML
			var capoContent = '';
			capos--; //leave out don
			var donXp = '/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[4]/td[2]';
			var don = $I(donXp);
			for(i=0;i<=capos;i++){//assemble capos
				var str = "capo" + i;
				var dude = eval(str)
				if(don!=dude) capoContent = (i!='0') ? capoContent + ", " + dude : capoContent + dude;
			}
			if(capoContent.slice(0,1) == ',') capoContent = capoContent.slice(1); //remove first ','

			//create capo row in topTable
			var pos = 4 + numtop;//count for # of tops
			var capoRow = $X("/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[" + pos + "]");
			if(capos!=0){//more then 1 spot
				var row = cEL('tr');
				var cell_L = row.appendChild(cEL('td'));
				cell_L.textContent = 'Capos:';
				cell_L.id = 'left';
				var cell_R = row.appendChild(cEL('td'));
				cell_R.textContent = "capoContent";
				cell_R.id = 'right';
				capoRow.parentNode.insertBefore(row,capoRow);

				getID('left').setAttribute('class','left');//append style+capo's to cells
				getID('right').setAttribute('class','right');
				getID('right').innerHTML = capoContent;
			}

		//--Smart Fampage
			GM_addStyle('.top{text-decoration:underline;}.obj{font-style: italic;}');//we use style attribute to check for online status, thus add style by class

			//get object owners
			var objectsXpath = '/html/body/center/center/table/tbody/tr[2]/td/table';
			var trs = $X(objectsXpath).getElementsByTagName('tr').length;
			var objectContent = "";
			for(i=4;i<=trs-1;i++){
				var nick = $X(objectsXpath).getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerHTML;
				var objectContent = objectContent + "<a href='user.php?nick=" + nick + "'>" + nick + "</a>";
				$X(objectsXpath).getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerHTML = "<a href='user.php?nick=" + nick + "'>" + nick + "</a>";
			}
			//add colors
			function addHL(){//check position and add proper coloring
				if(onCapo.search(nick) != -1) a[i].innerHTML = '<font color="orange">' + nick + '</font>';
				else if(onTop.search(nick) != -1) a[i].innerHTML = '<font color="red">' + nick + '</font>';
				else if(onObj.search(nick) != -1) a[i].innerHTML = '<font color="blue"><i>' + nick + '<i></font>';
				else if(onMem.search(nick) != -1 && a[i].parentNode.getAttribute('class') == 'right') a[i].innerHTML = '<font color="blue">' + nick + '</font>'; //don't act if it's blue already ;o
			}

			var onCapo = onTop = onObj = onMem = '';//define who's online
			var on = 0;//# online
			var a = $x('//a[contains(@href,"user.php")]');

			for(i=0;i<a.length;i++){//loop player links > check fampos > check status > addHL()
				var nick = a[i].innerHTML;
				if(capoContent.search('='+nick) != -1 || topContent.search('='+nick) != -1) a[i].setAttribute('class','top');
				if(objectContent.search('='+nick) != -1) a[i].setAttribute('class','obj');
				if(a[i].getAttribute("style")){//I got style, I'm online ;o
					if(capoContent.search('='+nick) != -1) onCapo += nick + ',';
					else if(topContent.search('='+nick) != -1) onTop += nick + ',';
					else if(objectContent.search('='+nick) != -1) onObj += nick + ',';
					else onMem += nick + ',';
					on++;//another one online
				}
				addHL();
			}
			var a = $x('//table[@class="thinline"]//a[contains(@href,"user.php")]'); //loop tops again for HL > no status from memberstable yet
			for(i=0;i<a.length;i++)	{ var nick = a[i].innerHTML; addHL(); }

			//adept membertable title with info
			var xp = "/html/body/center/center/table/tbody/tr[" + (capos==0 ? 4 : 5) + "]/td/table/tbody/tr";
			$X(xp+"[2]/td").setAttribute("colspan","2");
			$X(xp+"[3]/td").setAttribute("colspan","2");
			$I(xp,"<td class='title'>Members:</td><td class='title' align='right'><span><sup>(<i>objectowner</i>) - (<u>capo/top3</u>) - (online > <font color='blue'>member</font> | <font color='orange'>capo</font> | <font color='red'>top3</font>)</sup></span></td>");

		//--Add % of peeps online
			var pos = (capos==0 ? 5 : 6) + numtop;//count for # of tops
			var x="/html/body/center/center/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[";
			var xpath = x + pos + "]/td[1]";
			$I(xpath,"Members online:");
			var xpath = x + pos + "]/td[2]";
			var members = $I(xpath);
			var prcnt = Math.round((on / members )*100,1);
			$I(xpath,prcnt + "% (" + on + " / " + $I(xpath) + " )");

		//--# of free space in spots
			$I(x+(pos+2)+']/td[2]', $I( x+(pos+2)+']/td[2]' ) + ' (' + ( parseInt( $I( x+(pos+2)+']/td[2]' ) ) - members ) + ' open )' );
		}, true);
	}
}
//---------------- Kill password remover ----------------
if(prefs[14]){
	var x = db.innerHTML;
	if(dlp == '/kill.php' && x.indexOf("table") != -1 ) del("/html/body/center/table/tbody/tr[5]");
	if(dlp == '/profile.php' && x.indexOf("table") != -1){
		del("/html/body/center/table/tbody/tr[10]");
		del("/html/body/center/table/tbody/tr[9]");
	}
}
//---------------- SMS ------------------
if(dlp == '/smssend.php'){
	if($X('//input').value == '') $X('//input').focus();
	else $X('//textarea').focus();
}
//---------------- Heist AF ----------------
if(prefs[8]){
	if((/\bHeist\b/).test(dls)){
		if(/gun/.test(db.innerHTML) && /carid/.test(db.innerHTML)==false){
			getELNAME('bullets')[0].value = '50';
			getELNAME('gun')[0].value = "real";
			getELNAME('driver')[0].focus();
		}
		if(/action=go/.test(db.innerHTML)) $x('//input')[10].focus();
		if(/carid/.test(db.innerHTML)) $X('//input').focus();
	}
//------------------- Races ---------------------
	if(dlp == '/races.php'){
		if(/do_race/.test(db.innerHTML)) $x('//input')[3].focus();
		if(/racer2/.test(db.innerHTML)) $X('//input[contains(@name, "racer2")]').focus();
		if(/class=\"Normal\"/.test(db.innerHTML)) $x('//a[contains(@href, "decision=1")]')[0].focus();
		if(!/input/.test(db.innerHTML) && !/table/.test(db.innerHTML)) db.innerHTML = db.innerHTML + '<br><a href="/messages.php">><u>Inbox</u><</a>';
	}
//---------------- OC AF ----------------
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
		if(/caridz/.test(db.innerHTML)) $X('//input').focus();
		if(/expexp/.test(db.innerHTML)) $X('//input').focus();
	}
//---------------- MOC AF ---------------
	if((/MegaOC/).test(dls)){
		if(/action=setexplosives/.test(db.innerHTML)){// as EE
			$x('//input[@type="radio"]')[2].checked = true;
			$x('//input')[3].focus();
		}
		if(/action=setcar/.test(db.innerHTML)) $X('//input').focus();//as DR
		if(/action=setbullets/.test(db.innerHTML)){//as WE
			$X('//input').value = 500;
			$x('//input')[1].focus();
		}
		if(/drivers/.test(db.innerHTML)) $X('//input').focus();//as LE
	}
//---------------- Blood AF -------------
	if(dlp == '/information.php'){
		var hlthxpath, typeXpath, bloodTypeTC;
		hlthxpath = '/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[4]/td[2]/a/table/tbody/tr';
		typeXpath = '/html/body/center/table/tbody/tr/td/table/tbody/tr[10]/td[2]';
		setValue('bloodType',getTXT(typeXpath));
		if($X(hlthxpath)) setValue('missingHealth','100' - getTXT(hlthxpath).replace('%',''));
	}
	if(dlp == '/bloodbank.php'){
		if($X('//input')){
			$X('//input').value = getValue('missingHealth');
			var TypeA, TypeB, TypeAB, Type0, Type, x, y, z;

			//setup costs row
			table = $X('//blockquote//table');
			prices = $x('//td[@align="center"]');//4,5,6,7
			tr = '<tr><td> <font size="2"> <b> &nbsp;Total Costs </b></font></td><td align="center"><font size="2" id="A"></font></td><td align="center"><font size="2" id="B"></font></td><td align="center"><font size="2" id="AB"></font></td><td align="center"><font size="2" id="O"></font></td></tr>';
			table.innerHTML = table.innerHTML + tr;

			function getType(num) getTXT('/html/body/table/tbody/tr[2]/td/blockquote/font/table/tbody/tr[3]/td['+num).replace('\$','');
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
			$x('//input')[0].focus();
		}
		if(dls){
			msg = db.textContent;
			msg = msg.split('$');
			num = msg[0].replace(/[^0-9]/g,'');
			price = msg[1].replace(/[^0-9]/g,'');
			db.innerHTML = db.innerHTML + ' Total: $' + num*price + '.';
		}
	}
}
//---------------- Compatibility page ----------------
if(dlp == '/servers.php'){
	var x = $x("/html/body/table/tbody/tr/td/ul/font/li");
	x[0].innerHTML = x[0].innerHTML +" - Compatible";
	x[2].innerHTML = x[2].innerHTML +" - Compatible";
	x[9].innerHTML = x[9].innerHTML +" - Compatible";
}
//---------------- City Maps ----------------
if(dlp == '/citymaps/viewmap.php'){
	p = cEL('p');
	p.setAttribute('style','position:absolute;top:600;');
	p.innerHTML = '<br><br><br><br><br><br>'
	$X('//body').appendChild(p);//more space :D

	divs = $x('//div');//get all divs
	div = $x('//div')[(divs.length-1)];//get last div
	window.addEventListener('mousemove', function(mouse) {//add follow mouse
		var divH = div.scrollHeight;
		var divW = div.scrollWidth;
		var X = mouse.pageX;
		var Y = mouse.pageY;
		var plusX = 20;
		var plusY = 20;
		div.style.left = X + plusX;
		div.style.top = Y + plusY;
	},true);
}

//---------------------- sell ws ----------------
if(dlp == '/obay.php' && dls.indexOf('type=10') != -1 && prefs[8] && db.innerHTML.indexOf('<table') != -1){ 
	if(getValue('wsID') == 'undefined') { $x('//input')[2].value = ''}
	else { $x('//input')[2].value = getValue('wsID'); }
	$x('//input')[3].checked = true;
	$x('//input')[5].focus();
}
//---------------------- OBAY --------------------
if(prefs[18] && dlp == '/obay.php' && db.innerHTML.indexOf('<table') != -1){
	if(dls.indexOf('specific') == -1 ){ //on view object page
		//add price per bullet
		function addPrice(num){
			var bullets = parseInt($X(xpath).getElementsByTagName('td')[(1+num)].innerHTML.replace(/[^0-9.]/g,''));
			var price = parseInt($X(xpath).getElementsByTagName('td')[(2+num)].innerHTML.replace(/[^0-9.]/g,''));
			$X(xpath).getElementsByTagName('td')[(1+num)].innerHTML = $X(xpath).getElementsByTagName('td')[(1+num)].innerHTML + " ($ " + Math.round(price/bullets) + ")";
		}
		if(dls.indexOf('type=11') != -1){
			for(i=5;i<=19;i++){
				var xpath = '/html/body/center/table[3]/tbody/tr['+i+']';
				addPrice(0);
			}
		}
		else{
			for(i=4;i<=19;i++){
				var xpath = '/html/body/center/table[3]/tbody/tr['+i+']';
				if($I(xpath).indexOf(lang.obay) != -1) addPrice(1);
			}
		}
		//check for finished auctions
		var objects = $x('//tr[@class="one"]');
		objects.forEach(function($n){
			if($n.innerHTML.search('minutes_value') == -1) $n.setAttribute('style','text-decoration:line-through');
			else if($n.innerHTML.search('hours_value') == -1){
				min = $n.innerHTML;
				min = min.slice(min.search('e">')+3,min.search('</span>'));
				if(1*(min) < 3) $n.setAttribute('style','text-decoration:line-through');
			}
		});
	}
	else if(db.innerHTML.indexOf(lang.obay) != -1){ //on objects page
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
if(dlp == '/messages.php' && (dls == '' || dls.indexOf('action=delete') !=-1) && prefs[19]){
	var xpath, trs, xpath2, content, href, href2, id, xpath3, xpath4, msgInbox, storageInbox, storageInboxXp, x, readMsgs;
	xpath = '/html/body/center/form[2]/table[2]/tbody';
	trs = $X(xpath).getElementsByTagName('tr').length;
	msgInbox = $X('/html/body/center/b').textContent;
	storageInboxXp = '/html/body/center/form[2]/table/tbody/tr/td';
	storageInbox = $X(storageInboxXp).textContent.match(/\d+/);
	$X(storageInboxXp).innerHTML = "You can store additional <b>"+ (storageInbox - msgInbox) + "</b> messages.<br>";

	$x('//table')[1].setAttribute('width','560');
	getID('tblMsgs').setAttribute('width','560');
	for(i=5;i<=trs;i=i+2){
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
	if(prefs[15]){
		for(i=0;i<=9;i++){//add hotkeys
			var td = $x('//td[@width=150]')[i];
			var a = $x('//td[@width=200]/a')[i];
			var num = (i==9 ? 0 : (i+1));
			td.innerHTML = num + ' - ' + td.innerHTML;
			a.accessKey = num;
		}
	}
	$I('//td[@width="20%"]','# + ' + $I('//td[@width="20%"]'));
}
// ---------------- linkify names -----------------------------
if(dlp == '/messages.php' && dls.indexOf('action=showmsg') !=-1){
	var mainXpath, subjectXpath, msgTxtXpath, msgTxtSplit;
	mainXpath = '/html/body/center/center/table/tbody/tr['
	subjectXPath = mainXpath + '5]/td[2]';
	msgTxtXpath = mainXpath + '7]/td';
	msgTxtSplit = $X(msgTxtXpath).innerHTML.split(' ');
	arr = msgTxtSplit;

	subjectXPath = ($X(subjectXPath).textContent.indexOf('<b>') != -1) ? subjectXPath + '/b' : subjectXPath;

	$X('//img[@alt="Delete"]').parentNode.setAttribute('accessKey','[');//add hotkeys
	if($I('/html').indexOf('alt="Reply"') != -1) $X('//img[@alt="Reply"]').parentNode.setAttribute('accessKey',']');

	//if msg is heist inv.
	if(lang.linkify[0].match($X(subjectXPath).textContent)){
		if(arr[2] == lang.inbox[2]){//check if this is invitation
			setArr(0); setArr(13); $I(msgTxtXpath, arr.join(" "));
		}
		else $I(msgTxtXpath);
	}
	//if msg is oc inv.
	if(lang.linkify[1].match($X(subjectXPath).textContent)){
		if(arr[2] == lang.inbox[2]){//check if this is invitation
			if(arr[7] == lang.inbox[3] || arr[7] == lang.inbox[5]){
				setArr(0); setArr(13); $I(msgTxtXpath, arr.join(" "));
			}
			if(arr[7] == lang.inbox[4]){ setArr(0); setArr(12); $I(msgTxtXpath, arr.join(" ")); }
		}
		else $I(msgTxtXpath);
	}
	
	var mocInv=new RegExp(lang.linkify[2]);
	if(mocInv.test($X(subjectXPath).textContent)){ setArr(0); $I(msgTxtXpath, arr.join(" "));}// moc inv.
	if(lang.linkify[3].match($X(subjectXPath).textContent)){ setArr(5); $I(msgTxtXpath, arr.join(" "));}//target not found
	if(lang.linkify[4].match($X(subjectXPath).textContent)){ setArr(8); $I(msgTxtXpath, arr.join(" "));}//race invite
	if(lang.linkify[5].match($X(subjectXPath).textContent)){ setArr(3); $I(msgTxtXpath, arr.join(" "));}//target found
	if(lang.linkify[6].match($X(subjectXPath).textContent)){ setArr(2); $I(msgTxtXpath, arr.join(" "));}//if msg is Kill success
	
	var condolences=new RegExp(lang.linkify[8]);
	if(condolences.test($X(subjectXPath).textContent)){ setArr(2); $I(msgTxtXpath, arr.join(" "));}//condolences msg
	if(lang.linkify[7].match($X(subjectXPath).textContent)){//if msg is WS
		if(arr[6] == '.') { var wsIDnum = arr[16]; arr[16] = "<a href=/obay.php?action=tosell&type=10><b>" + arr[16] + "</b></a>"; }
		else{ var wsIDnum = arr[15]; arr[15] = "<a href=/obay.php?action=tosell&type=10><b>" + arr[15] + "</b></a>"; }
		setArr(3);
		setArr(5);
		$I(msgTxtXpath, arr.join(" "));
		setValue('wsID', wsIDnum);
	}
}
if(dlp == '/detective.php'){
	for(i=2;i<$x('//tr').length;i++){
		var xpath = '/html/body/form/table/tbody/tr['+i+']/td';
		var arr = $X(xpath).innerHTML.split(' ');
		if(arr[2] == lang.linkify[9])arr[3] = "<a href=user.php?nick=" + arr[3].replace(/(<b>|<\/b>)/g, '') + "><b>" + arr[3] +"</b></a>"; //check if we found the bastard
		else arr[5] = "<a href=user.php?nick=" + arr[5].replace(/(<b>|<\/b>)/g, '') + "><b>" + arr[5] +"</b></a>";
		$I(xpath, arr.join(" "));
	}
}
if(urlsearch == '/gambling/numbersgame.php' + dls){
	var xpath = '/html/body/form/table/tbody/tr/td';
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
	setArr(5);
	$I(xpath, arr.join(" "));
}
//---------------- Title changer ----------------
if((dlp=='/' || dlp=='/index.php' || dlp=='/game.php') && prefs[9] && lh.indexOf('beyond')==-1) document.title = lang.title;
//---------------- Beyond Logo Replacer ----------------------
var logoXpath = "//img[contains(@src, 'logo0.gif')] | //img[contains(@src, 'omertalo.gif')] | //img[contains(@src, 'deathmatch.gif')] | //img[contains(@src, 'omdmlogo.png')]";
$x(logoXpath).forEach(function($n){
	$n.src = GM_getResourceURL("beyondLogo");
	$n.parentNode.innerHTML = '<a href="http://www.omertabeyond.com" target="_blank" onFocus="this.blur()">' + $n.parentNode.innerHTML + '</a>';
});
//---------------- Beyond Favicon Replacer ----------------------
window.addEventListener('load', function(){setIcon(GM_getResourceURL("favoriteIco")); }, true);
//---------------- IRC Chat Remover ----------------------
if(prefs[25] && (lang.version=='_nl' || lang.version=='_dm') && dlp=="/mid.php") del('//div[@class="chat"]');
//---------------- Clean login page ----------------
if((dlp=='/' || dlp=='/index.php' || dlp=='/game-login.php') && lh.indexOf('beyond')==-1 && prefs[20]){
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

	$I("//td[@background='/static/images/frontpage/old/bar.gif']",'<font color="#cccccc" size="1"><b><center><a href="game-register.php">'+lang.login[0]+'</a> - <a href="'+PrefsLink+'" target="_blank">'+lang.prefsname+'</a> - <a href="http://www.omertabeyond.com/" target="_blank">Beyond</a> - <a href="'+lang.login[1]+'" target="_blank">'+lang.login[2]+'</a></center></b></font>');
	var circle = "//table[contains(@background, 'circle.GIF')]";
	$x(circle).forEach(function($n){$n.style.backgroundImage = "none"});

	if(lang.version == '_com'){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://89.149.221.178/~fingon/deaths.php',
			onload: function(resp){
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
				ranks = ['Empty-Suit','Delivery Boy','Picciotto','Shoplifte','Pickpocket','Thief','Associate','Mobster','Soldier','Swindler','Assassin','Local Chief','Chief','Bruglione','Capodecina','Godfather'];
				slice = html.slice(html.indexOf('<tr class=trdeathtop'));
				deaths = slice.slice(slice.indexOf('<script>'),slice.indexOf('</script>')).split('d(');
				for(i=0;i<=9;i++){
					d[i] = deaths[i+1].split(',');
					d[i][3] = ranks[(parseInt(d[i][3])-1)];
				}
				addCell(1);
				node.setAttribute('valign','top');
			}
		});
	}
	if(lang.version == '_nl'){
		function addCell(w){
			td = cEL('td'); //setup new cell and assemble content
			head = w ? 'D o d e n' : 'N i e u w s'; //which one?
			c = '<table><tbody><tr><td'; 
			c += w?' colspan="5"':'';
			c += ' style="width: 125px;" align="center"><font size="2" color="#cccccc"><b>'+head+'</b></font><br><br></td></tr>';
			if(!w) for(i=0;i<=4;i++) c += '</td><td align="left"><font size="1" color="#cccccc"><b><a target="_blank" href="http://www.edo-nieuws.nl/news.php?readmore='+u[i]+'"><b>> '+d[i] + ' ' + ((a[i]).length > 35 ? (a[i].slice(0,35) + ' [...]') : a[i]) +'</b></a></b></font></td></tr>';
			if(w) for(i=0;i<=9;i++) c += '<tr><td><font size="1" color="#cccccc"><b>'+d[i][0]+'</b></font></td><td align="left"><font size="1" color="#cccccc"><b><a href="http://www.barafranca.com/user.php?nick='+d[i][1]+'">'+d[i][1]+'</a></b></font></td><td class="normal" align="left"><font size="1" color="#cccccc"><b>'+d[i][2]+'</b></font></td><td class="normal" align="left"><font size="1" color="#cccccc"><b>'+d[i][3]+'</b></font></td><td class="normal"><font size="1" color="#cccccc"><b>'+d[i][4]+'</b></font></td></tr>';
			c += '<tr><td';
			c += w?' colspan="5"':'';
			c += 'align="center"><input style="border: 0px solid #3f505f; width: 300px; height: 0px; font-family: Verdana; font-size: 10px; background-color: #3f505f; color: rgb(204, 204, 204);" value="" type="button"></td></tr></tbody></table><br>';
			td.innerHTML = c; 
			td.setAttribute('style','border-left:solid #cccccc 0.5px;');
			node.insertBefore(td, $X('//tr[@valign="middle"]/td[@align="center"]').nextSibling);
		}
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.edo-nieuws.nl/news.php',
			onload: function(resp){//news
				html = resp.responseText;
				news = html.split('<a name=\'news_');

				a = new Array; //arcticles
				u = new Array; //urls
				d = new Array; //days
				for(i=0;i<5;i++){
					n = news[(i+1)];
					u[i] = n.slice(0,n.indexOf('\' id'));
					a[i] = n.slice(n.indexOf('/a>')+3,n.indexOf('</b>'));
					n = n.slice(n.indexOf('Geplaatst door'),n.indexOf("<img src='themes/Tweaked-Blue/images/border/news/readmore.gif'>"));
					d[i] = n.slice(n.indexOf('</a>')+8,n.indexOf('-20'));
				}
				node = $X('//tr[@valign="middle"]');
				addCell(0);

				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www.edo-nieuws.nl/lastkills.php',
					onload: function(resp){//deaths
						html = resp.responseText;

						dead = html.slice(html.indexOf('<tr class="forum2">'),html.indexOf('<td class=\'tableborder-right\' width=\'8\'>'));
						d = new Array;
						dead = dead.split('<tr class');
						for(i=0;i<dead.length;i++) dead[i] = dead[i].split('<td>');
						for(i=0;i<=9;i++){
							x = dead[(i+2)];
							d[i] = new Array
							d[i][0] = x[3].slice(10,x[3].indexOf('</')); //time
							d[i][1] = x[2].slice(x[2].indexOf('">')+2,x[2].indexOf('</')); //nick
							d[i][2] = x[4].slice(0,x[4].indexOf('</')); //rank
							d[i][3] = /<a /.test(x[5].slice(0,x[5].indexOf('</'))) ? x[5].slice(0,x[5].indexOf('</')).slice(x[5].indexOf('>')+1) : x[5].slice(0,x[5].indexOf('</')); //fam
							d[i][4] = / - /.test(x[6].slice(0,x[6].indexOf('</'))) ? 'object' : x[6].slice(0,x[6].indexOf('</')) //pos
						}
						node = $X('//tr[@valign="middle"]');
						addCell(1);
						node.setAttribute('valign','top');
					}
				});
			}
		});
	}
	$x('//input')[2].focus();
}
//---------------- 1-Click Voter ----------------
if(dlp == '/vfo.php'){
	lastSTR = getValue('lastvote',0); //get last voting time
	vote = 0; //initialize to DON'T VOTE

	if(!lastSTR) vote = confirm(lang.oneclick[0]);
	else { //not first run
		//initialize last voting time and current time as Date objects
		last = new Date(lastSTR);
		now = new Date();

		//get difference between last voting time and now
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

		if(date<1) { //at least 24 hrs has not passed, don't allow auto-vote
			str = lang.oneclick[1];
			time = (23-hr) + lang.oneclick[2] + (59-min) + lang.oneclick[3] + (59-sec) + lang.oneclick[4];
			alert(str + time);
			vote = 0;
		}
		else { //at least 24 hrs HAS passed, ask if user wants to auto-vote
			str1 = lang.oneclick[5];
			time = date + lang.oneclick[6] + hr + lang.oneclick[2] + min + lang.oneclick[3] + sec + lang.oneclick[4];
			str2 = lang.oneclick[7];
			vote = confirm(str1 + time + str2);
		}
	}
	if(vote){ //give me liberty or give me death!
		$x('//a[contains(@href, "votelot.php")]').forEach(function($n){GM_openInTab($n.href)});;
		//get current time after voting and store as last voting time
		now2 = new Date();
		nowSTR = now2.toUTCString();
		setValue('lastvote',nowSTR);
	}
}
//---------------- Smuggling ----------------
if(prefs[8] && dlp == '/smuggling.php' && db.innerHTML.indexOf('table') != -1){
	var sold = '/html/body/center';//check if you just sold something which causes another <center> tag to appear
	var html = $I('/html/body').replace('<center>','');
	if(html.indexOf('<center>') != -1){ sold = '/html/body/center[2]'; html = html.replace('<center>',''); }
	if(html.indexOf('<center>') != -1) sold = '/html/body/center[3]';

	var inputs = $x('//input');
	inputs[(inputs.length-2)].value = '';
	var attr = (prefs[15]) ? 'accessKey' : 'name';

	var bn_xp = sold+'/form/table/tbody/tr[1]/td';
	var bn_text = $X(bn_xp).innerHTML.split("<br>");

	var booze = parseInt(bn_text[1].replace(/[^0-9.]/g,''));
	var narcs = parseInt(bn_text[2].replace(/[^0-9.]/g,''));

	var carry_b = 0;
	var carry_n = 0;

	var xpb = sold+'/form/table/tbody/tr[2]/td/table/tbody/tr[2]/td/table/tbody/tr[';
	var xpn = sold+'/form/table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]/table/tbody/tr[';

	var b_amount = [0,0,0,0,0,0];
	var n_amount = [0,0,0,0,0,0];
	for(i=0;i<=15;i++){
		if(i<7){
			var x = i + 4;
			var carry_b = carry_b + parseInt($X(xpb+x+']/td[3]').innerHTML);
			b_amount[i] = parseInt($X(xpb+x+']/td[3]').innerHTML)
			$x('//input')[i].value = b_amount[i];
			$I(xpb+x+']/td',"<a "+attr+"='"+(i+1)+"' onFocus='this.blur()' href='javascript:tmp = document.getElementsByTagName(\"input\")[" + i + "].value;for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value =0;}document.getElementsByTagName(\"input\")[" + i + "].value=" + booze + "-tmp;document.getElementsByTagName(\"input\")[18].focus();'>"+(prefs[15]?(i+1):'')+" " + $I(xpb+x+']/td') + "</a>");
		}
		if(i>8){
			var x = i - 5;
			var carry_n = carry_n + parseInt($I(xpn+x+']/td[3]'));
			n_amount[(i-9)] = parseInt($I(xpn+x+']/td[3]'));
			inputs[i].value = parseInt($I(xpn+x+']/td[3]'));
			$I(xpn+x+']/td',"<a onFocus='this.blur()' href='javascript:tmp = document.getElementsByTagName(\"input\")[" + i + "].value;for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value =0;}document.getElementsByTagName(\"input\")[" + i + "].value = " + narcs + "-tmp;document.getElementsByTagName(\"input\")[18].focus();'>" + $I(xpn+x+']/td') + "</a>");
		}
	}
	var b_amounts = '';
	for(i=0;i<=6;i++){
		var b_amounts = b_amounts + b_amount[i];
		if(i!=6) var b_amounts = b_amounts + ",";
	}
	var n_amounts = '';
	for(i=0;i<=6;i++){
		var n_amounts = n_amounts + n_amount[i];
		if(i!=6) var n_amounts = n_amounts + ",";
	}
	var notempty = false;
	if(carry_n != 0){ var notempty = true; }
	var info_xp = sold+'/form/table/tbody/tr/td';
	var part = $I(info_xp).split("<br>");

	var str = '<table border="0"><tr>'
	str += '<td>'+lang.smuggling[0] + part[0].slice(part[0].indexOf("$ "),part[0].indexOf(" i")) + " | </td>";
	str += '<td>'+"Max "+lang.smuggling[1]+": " + part[1].replace(/[^0-9.]/g,'') + " | </td>";
	str += '<td>'+"Max "+lang.smuggling[2]+": " + part[2].replace(/[^0-9.]/g,'') + "</td></tr>";
	str += '</table>';
	if(prefs[15]){
		str += "<hr><a "+attr+"='[' onFocus='this.blur()' href='javascript:for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value=0;}for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=0;}if("+notempty+"){var n_amount = ["+n_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[(i+9)].value=n_amount[i];}}else{document.getElementsByTagName(\"input\")[12].value = "+narcs+";}document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[2]+" ([)</a>";
		str += " - <a "+attr+"=']' onFocus='this.blur()' href='javascript:for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value=0;}var b_amount = ["+b_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=b_amount[i];}document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[1]+" (])</a>";
		str += " - <a "+attr+"='=' onFocus='this.blur()' href='javascript:for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value=0;}var b_amount = ["+b_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=b_amount[i];} document.getElementsByTagName(\"input\")[12].value = "+ ((narcs - carry_n) == 0 ? narcs : narcs - carry_n) +";document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[5]+" (=)</a><br>";
	}
	$X(bn_xp).innerHTML = str;
	if(carry_b==booze) inputs[7].checked = 1;
	if(carry_n==narcs) inputs[16].checked = 1;
	inputs[18].focus();
}
//---------------- BRC INFO GATHER ----------------
if(dlp == '/information.php'){ //Get user info
	var xp, nick, rank, booze, narc, city, cityCode, ride, plane, fam;
	xp = '/html/body/center/table/tbody/tr/td/table/tbody/tr[3]/td[2]';
	nick = getTXT(xp);
	setValue('nick',nick);
	
	//get stored value for family position or default to 'normal member'
	fam = getPow('bninfo',4,100000000);
	setPow('bninfo',4,fam);
	
	//get rank/carrying capacity
	xp = '/html/body/center/table/tbody/tr/td/table/tbody/tr[8]/td[2]';
	rank = getTXT(xp);
	switch(rank) {
		case 'Empty-suit': booze = 1; narc = 0; break;
		case 'Delivery Boy': booze = 2; narc = 0; break;
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
	setPow('bninfo',0,narc);
	setPow('bninfo',1,booze);
	
	//get city info
	xp = '/html/body/center/table/tbody/tr/td/table/tbody/tr[11]/td[2]';
	city = getTXT(xp);
	cityCode = 0;
	switch(city) {
		case 'Detroit': cityCode=4; break;
		case 'Chicago': cityCode=5; break;
		case 'Palermo': cityCode=6; break;
		case 'New York': cityCode=7; break;
		case 'Las Vegas': cityCode=8; break;
		case 'Philadelphia': cityCode=9; break;
		case 'Baltimore': cityCode=10; break;
		case 'Corleone': cityCode=11; break;
	}
	setPow('bninfo',2,cityCode);
	
	//get plane info
	xp = '/html/body/center/table/tbody/tr/td[3]/table[2]/tbody/tr[3]/td[2]';
	ride = getTXT(xp);
	switch(ride) {
		case 'None': plane=0; break;
		case 'Geen': plane=0; break;
		case 'Fokker DR-1': plane=1; break;
		case 'Havilland DH 82A': plane=2; break;
		case 'Fleet 7': plane=3; break;
		case 'Douglas DC-3': plane=4; break;
	}
	setPow('bninfo',3,plane);
}
if(dlp == '/user.php'){ //Get family position
	var nick, query, xp, xp1, text, fam, family, f, info;
	nick = getValue('nick');
	//check if profile is own user's (case sensitive!)
	query = '?nick='+nick;
	if(dls.toUpperCase() == query.toUpperCase()) {
		//xpath for family (assuming sex is not hidden)
		xp1 = '/html/body/center/table/tbody/tr[';
		xp = xp1 + '8]/td';
		text = getTXT(xp);

		//if user has sex hidden (getX missed, need to change xpath, redo getTXT)
		if(text == 'Wealth' || text =='Vermogen:') {
			xp = xp1 + '7]/td';
			text = getTXT(xp);
		}

		fam=1; //initialize default to 'normal member' in case of accident
		//famless = 0; normal = 1; capo = 2; top3 = 3
		switch(text) {
			case '\n			Family:			\n		':				fam=1; break
			case '\n			Familie:			\n		':			fam=1; break
			case '\n			Capo of:			\n		':			fam=2; break
			case '\n			Capo van:			\n		':			fam=2; break
			case '\n			Sottocapo of:			\n		':		fam=3; break
			case '\n			Sottocapo van:			\n		':		fam=3; break
			case '\n			Consiglieri of:			\n		':		fam=3; break
			case '\n			Consiglieri van:			\n		':	fam=3; break
			case '\n			Don of:			\n		':				fam=3; break
			case '\n			Don van:			\n		':			fam=3; break
		}

		//check if famless
		family = getTXT(xp+'[2]');
		if(family=='None	 '||family=='Geen	 ') fam=0;

		//store info
		setPow('bninfo',4,fam);
	}
}
if(dlp == '/travel.php') { //Get city when traveling
	city = 0; //initialize to default for anything else
	text = db.textContent;
	text = text.split(' ')[2];
	citys = ["Detroit","Chicago","Palermo","New","Las","Philadelphia","Baltimore","Corleone"];
	for(i=0;i<citys.length;i++) if(citys[i] == text) city = (i+4);
	if(city) setPow('bninfo',2,city); //if traveled, save new city
}
// ------ THE BRC (use botprices, display on prices & smuggling pages, includes price highlighter inline) --------
if(dlp == '/prices.php' || dlp == '/smuggling.php'||dlp=='/hacking.php'){
	if(dlp=='/hacking.php') db.innerHTML=''; //keeps users from seeing actual hacking page flash
	
	// INFO GATHERER ON FIRST RUN (ADDS 2 CLICKS :X)
	info = getValue('bninfo',-1); //check for saved info
	count = getValue('bncounter',-1); // check if bninfo needs to be re-checked
	if(info < 0 || count < 0) {
		GM_xmlhttpRequest({
			method:"GET",
			url:"http://"+dlh+"/information.php",
			onload:function(response) {
	
				a = response.responseText.split('<tbody')
				if(a[2]){ // fails on clicklimit or other error
					nick = a[2].split('<td>')[2].split('<')[0];
					rank = a[2].split('<td>')[12].split('<')[0];
					city = a[2].split('<td>')[18].split('>')[1].split('<')[0];
					ride = a[5].split('<td>')[2].split('<')[0];
				
					// set nick
					setValue('nick',nick);
					// get family position
					GM_xmlhttpRequest({
						method:"GET",
						url:"http://"+dlh+"/user.php?nick="+nick,
						onload:function(resp) {
							a = resp.responseText.split('<tr');
							fam=1; //initialize default to 'normal member' in case of accident
							if(a[8]){ // fails on clicklimit or other error
								pos = a[8].split('			');
								if(!pos[1]) pos = a[7].split('			'); //if user has sex hidden
								switch(pos[1]) { //famless = 0; normal = 1; capo = 2; top3 = 3
									case 'Family:':				fam=1; break
									case 'Familie:':			fam=1; break
									case 'Capo of:':			fam=2; break
									case 'Capo van:':			fam=2; break
									case 'Sottocapo of:':		fam=3; break
									case 'Sottocapo van:':		fam=3; break
									case 'Consiglieri of:':		fam=3; break
									case 'Consiglieri van:':	fam=3; break
									case 'Don of:':				fam=3; break
									case 'Don van:':			fam=3; break
								}
								// check if famless
								famless = pos[2].split('>')[2].split('	 ')[0];
								if(famless=='None'||famless=='Geen') fam=0;
							}
							setPow('bninfo',4,fam); //store info
						}
					});
					
					booze = narc = cityCode = plane = 0;
					switch(rank) {
					case 'Empty-suit': booze = 1; narc = 0; break;
					case 'Delivery Boy': booze = 2; narc = 0; break;
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
					setPow('bninfo',0,narc);
					setPow('bninfo',1,booze);
					
					switch(city) {
					case 'Detroit': cityCode = 4; break;
					case 'Chicago': cityCode = 5; break;
					case 'Palermo': cityCode = 6; break;
					case 'New York': cityCode = 7; break;
					case 'Las Vegas': cityCode = 8; break;
					case 'Philadelphia': cityCode = 9; break;
					case 'Baltimore': cityCode = 10; break;
					case 'Corleone': cityCode = 11; break;
				}
					setPow('bninfo',2,cityCode);
	
					switch(ride) {
					case 'None': plane=0; break;
					case 'Geen': plane=0; break;
					case 'Fokker DR-1': plane=1; break;
					case 'Havilland DH 82A': plane=2; break;
					case 'Fleet 7': plane=3; break;
					case 'Douglas DC-3': plane=4; break;
				}
					setPow('bninfo',3,plane);
					
					setValue('bncounter',201);
				}
			}
		});
	}
	// END INFO GATHER
	
	// MEAT OF THE BRC
	GM_xmlhttpRequest({
		method:"GET",
		url:"http://"+dlh+"/botprices.php",
		onload:function(response) {
			// grab text from botprices and start dividing
			contraband = response.responseText.split('\n');

			// 2D ARRAY CODES for botprices retrieval (Cocaine is 1 on retrieval, gets moved to 6)
			// Detroit 1, Chicago 2, Palermo 3, New York 4, Las Vegas 5, Philadelphia 6, Baltimore 7, Corleone 8
			// Morphine 1, Marjuana 2, Glue 3, Heroin 4, Opium 5, Cocaine 6, Tobacco 7
			// Wine 8, Beer 9, Rum 10, Cognac 11, Whiskey 12, Amaretto 13, Port 14

			// 2-D price array -> price[contraband][city]
			price = new Array(15);
			for(i=1;i<15;i++) price[i] = contraband[i].split('|');

			// need to adjust coke index to 6, shift others down
			for(i=1;i<9;i++) {
				tmp = price[1][i];
				for(j=1; j<6; j++) price[j][i] = price[j+1][i];
				price[6][i] = tmp;
			}

			// build B/N table from botprices, w/ hl
			if(dlp == '/hacking.php'||dlp=='/prices.php') {
			
				// static HTML stuff for B/N price table
				NarcTitle = '<tr><td class="tableheader" colspan="9">DRUG PRICES</td></tr>';
				NarcHeader = '<tr bgcolor="white"><td> City </td><td> Morphine </td><td> Marjuana </td><td> Glue </td><td> Heroin </td><td> Opium </td><td> Cocaine </td><td> Tobacco </td></tr>';
				BzTitle = '<tr><td class="tableheader" colspan="9">BOOZE PRICES</td></tr>';
				BzHeader = '<tr bgcolor="white"><td> City </td><td> Wine </td><td> Beer </td><td> Rum </td><td> Cognac </td><td> Whiskey </td><td> Amaretto </td><td> Port </td></tr>';
				TblStart = '<center><table cellspacing="0" cellpadding="2" width="500" rules="rows" class="thinline"><tbody align="center">';
				bar = '<tr><td colspan="9" bgcolor="black"></td></tr>';
				TblEnd = '</tbody></table></center>';
				cities = ['','Detroit','Chicago','Palermo','New York','Las Vegas','Philadelphia','Baltimore','Corleone'];

				// change price ints into text with $ and thousands separator
				function toTXT(price) {
					if(price.length < 4) return '$'+price;
					return '$' + price.substr(0,price.length-3) + ',' + price.substr(price.length-3,3);
				}
				
				hl = prefs[21];
				if(hl){ // find max/min for hl
					high = new Array(15);
					low = new Array(15);
					for(i=1;i<15;i++) { // loop through items
						tmph = tmphj = tmplj = 0;
						tmpl = 1000000;
						for(j=1;j<9;j++) { // loop through cities
							if( price[i][j] - tmph > 0 ) {tmph = price[i][j];	tmphj = j;}
							if( price[i][j] - tmpl < 0 ) {tmpl = price[i][j];	tmplj = j;}
						}
						// put city index of highest price	
						high[i] = tmphj;
						low[i] = tmplj;
					}
				}
				NarcInfo = ''; // build narc price rows (w/ hl)
				for(i=1; i<9; i++){
					NarcInfo += '<tr><td>' + cities[i] + '</td>';
					for(j=1;j<8;j++) {
						NarcInfo += '<td' + ( hl && j%2 ? ' bgcolor=#8D8D8D ' : '') + '><span';
						NarcInfo += hl ? (i==high[j] ? ' style="color: #ff0000"' : (i==low[j] ? ' style="color: #00ff00"' : '')) : ''
						NarcInfo +='>'+ (hl && j==6 ? '<b>' :'') + toTXT(price[j][i]) + (hl && j==6 ? '</b>' :'') +'</span></td>'
					}
					NarcInfo +='</tr>';
				}
				BzInfo = ''; // build booze price rows (w/ hl)
				for(i=1; i<9; i++){
					BzInfo += '<tr><td>' + cities[i] + '</td>';
					for(j=8;j<15;j++) {
						BzInfo += '<td' + ( hl && !(j%2) ? ' bgcolor=#8D8D8D ' : '') + '><span'
						BzInfo += hl ? (i==high[j] ? ' style="color: #ff0000"' : (i==low[j] ? ' style="color: #00ff00"' : '')) : ''
						BzInfo +='>' + toTXT(price[j][i]) + '</span></td>'
					}
					BzInfo +='</tr>';
				}
				// put it all together
				NarcTable = TblStart + NarcTitle + bar + NarcHeader + NarcInfo + TblEnd;
				BzTable = TblStart + BzTitle + bar + BzHeader + BzInfo + TblEnd;
				db.innerHTML = NarcTable + '<br><br>' + BzTable;
			}
			
			// INITIALIZE 3-D PRICE ARRAY FOR BRC
			//Price3D[B or N][ItemCode][CityCode]
			Price3D = new Array(13);
			for(i=0;i<13;i++) {
				Price3D[i] = new Array(13);
				for(j=0; j<13; j++) Price3D[i][j] = new Array(13);
			}

			// TRANSLATE 2D price array to 3D Price array
			// NARCS
			for(i=1;i<9;i++) for(j=1;j<8;j++) Price3D[1][j+1][i+3] = price[j][i];
			// BOOZE
			for(i=1;i<9;i++) for(j=8;j<15;j++) Price3D[2][j-6][i+3] = price[j][i];

			// 3D CODES for BRC
			// Narc 1, Booze 2
			// Det 4; Chi 5; Pal 6; NY 7; LV 8; Phi 9; Bal 10; Cor 11
			// Morphine 2; Marijuana 3; Glue 4; Heroin 5; Opium 6; Cocaine 7; Tobacco 8
			// Wine 2; Beer 3; Rum 4; Cognac 5; Whiskey 6; Amaretto 7; Port 8
			// Price3D[B or N][ItemCode][CityCode]

			info = getValue('bninfo',-1); //grab saved info
			if(info < 0) alert(lang.BR[0]);
			
			narc = getPow('bninfo',0,-1);
			booze = getPow('bninfo',1,-1);
			city = getPow('bninfo',2,-1);
			plane = getPow('bninfo',3,-1);
			fam = getPow('bninfo',4,-1);

			function flyCost(c1,c2,p) { //determine travel cost (city1, city2, plane)
				if(c1==c2) return 0; //not going anywhere
				if(c1>c2) return flyCost(c2,c1,p); //traveling C1 -> C2 is the same as C2 -> C1
				switch(p) { //determine cost multipler (based on planeCode)
					case 0: m = 1.2; break	// take the train!
					case 1: m = 1.5; break	// Fokker DR-1 (???)
					case 2: m = 1.8; break	// Havilland DH 82A (???)
					case 3: m = 2.1; break	// Fleet 7 (???)
					case 4: m = 2.4; break	// Douglas DC-3
				}
				travel = 1000000;

				switch(c1) { //determine flight cost
					case 4: switch(c2) {
						case 5: travel = 239*m; break   // DET-CHI (4 ,5 ) -> 239
						case 6: travel = 3850*m; break  // DET-PAL (4 ,6 ) -> 3850
						case 7: travel = 487*m; break   // DET-NY  (4 ,7 ) -> 487
						case 8: travel = 1758*m; break  // DET-LV  (4 ,8 ) -> 1758
						case 9: travel = 454*m; break   // DET-PHI (4 ,9 ) -> 454
						case 10: travel = 409*m; break  // DET-BAL (4 ,10) -> 409
						case 11: travel = 3900*m; break // DET-COR (4 ,11) -> 3900
					}; break
					case 5: switch(c2) {
						case 6: travel = 4300*m; break  // CHI-PAL (5 ,6 ) -> 4300
						case 7: travel = 718*m; break   // CHI-NY  (5 ,7 ) -> 718
						case 8: travel = 1520*m; break  // CHI-LV  (5 ,8 ) -> 1520
						case 9: travel = 678*m; break   // CHI-PHI (5 ,9 ) -> 678
						case 10: travel = 622*m; break  // CHI-BAL (5 ,10) -> 622
						case 11: travel = 4350*m; break // CHI-COR (5 ,11) -> 4350
					}; break
					case 6: switch(c2) {
						case 7: travel = 3700*m; break  // PAL-NY  (6 ,7 ) -> 3700
						case 8: travel = 5500*m; break  // PAL-LV  (6 ,8 ) -> 5500
						case 9: travel = 3900*m; break  // PAL-PHI (6 ,9 ) -> 3900
						case 10: travel = 4000*m; break // PAL-BAL (6 ,10) -> 4000
						case 11: travel = 50*m; break   // PAL-COR (6 ,11) -> 50
					}; break
					case 7: switch(c2) {
						case 8: travel = 2232*m; break  // NY -LV  (7 ,8 ) -> 2232
						case 9: travel = 94*m; break	// NY -PHI (7 ,9 ) -> 94
						case 10: travel = 184*m; break  // NY -BAL (7 ,10) -> 184
						case 11: travel = 3750*m; break // NY -COR (7 ,11) -> 3750
					}; break
					case 8: switch(c2) {
						case 9: travel = 2177*m; break  // LV -PHI (8 ,9 ) -> 2177
						case 10: travel = 2106*m; break // LV -BAL (8 ,10) -> 2106
						case 11: travel = 5500*m; break // LV -COR (8 ,11) -> 5500
					}; break
						case 9: switch(c2) {
						case 10: travel = 90*m; break   // PHI-BAL (9 ,10) -> 90
						case 11: travel = 3950*m; break // PHI-COR (9 ,11) -> 3950
					}; break
						case 10: switch(c2) {
						case 11: travel = 4050*m; break	// BAL-COR (10,11) -> 4050
					}; break
				}

				// train can't travel between continents ($1mil travel cost >> possible profit)
				if(p==0 && travel > 3000) return 1000000;
				return travel
			}
			cut=0.12;
			switch(fam) { //determine cut -> paying percentage (based on famCode)
				case 0: cut = 0; break		// fam=0 -> famless
				case 1: cut = 0.12; break	// fam=1 -> normal member
				case 2: cut = 0.1; break	// fam=2 -> capos
				case 3: cut = 0; break		// fam=3 -> top3
			}

			//setup profit comparator variables
			tmpProfit = cityProfit = maxProfit = tmpbestnarc = tmpbestbooze = bestnarc = bestbooze = bestcity = 0;
			tmpHi = lowNarc = lowBooze = hiNarc = hiBooze = 0;
			tmpLow = 1000000

			//loop through all prices looking for best profit scenario
			for(k=4;k<12;k++) { //k is city
				for(i=1;i<3;i++) { //i is b/n
					for(j=2;j<9;j++) { //j is item
						currentPrice = Price3D[i][j][k];
						profit = (1-cut)*currentPrice-Price3D[i][j][city];
						if(profit > tmpProfit) {
							if(i==1) tmpbestnarc = j;
							if(i==2) tmpbestbooze = j;
							tmpProfit = profit;
						}
						if(k==city){
							if( (currentPrice-tmpHi) > 0){
								if(i==1) hiNarc = j;
								if(i==2) hiBooze = j;
								tmpHi = currentPrice
							}
							if( (currentPrice-tmpLow) < 0){
								if(i==1) lowNarc = j;
								if(i==2) lowBooze = j;
								tmpLow = currentPrice
							}
						}
					}
					if(i==1) m=narc;
					if(i==2) m=booze;
					cityProfit += m*tmpProfit;
					tmpProfit=0;
					tmpHi=0;
					tmpLow=1000000;
				}
				totProfit = cityProfit - flyCost(city,k,plane);
				if(totProfit > maxProfit) {
					maxProfit = totProfit;
					bestcity = k;
					bestnarc=tmpbestnarc;
					bestbooze=tmpbestbooze;
				}
				cityProfit=0;
			}

			
			// TRANSLATE THE NUMBERS
			function transNarc(narc) {
				switch(narc) {
					case 0: return lang.narcs[0];
					case 2: return lang.narcs[1];
					case 3: return lang.narcs[2];
					case 4: return lang.narcs[3];
					case 5: return lang.narcs[4];
					case 6: return lang.narcs[5];
					case 7: return lang.narcs[6];
					case 8: return lang.narcs[7];
				}
			}
			function transBooze(booze) {
				switch(booze) {
					case 0: return lang.booze[0];
					case 2: return lang.booze[1];
					case 3: return lang.booze[2];
					case 4: return lang.booze[3];
					case 5: return lang.booze[4];
					case 6: return lang.booze[5];
					case 7: return lang.booze[6];
					case 8: return lang.booze[7];
				}
			}
			function transNarcElem(narc) {
				switch(narc) {
					case 0: return langs.en.narcs[0];
					case 2: return langs.en.narcs[1];
					case 3: return "marihuana";
					case 4: return langs.en.narcs[3];
					case 5: return langs.en.narcs[4];
					case 6: return langs.en.narcs[5];
					case 7: return langs.en.narcs[6];
					case 8: return langs.en.narcs[7];
				}
			}
			function transBoozeElem(booze) {
				switch(booze) {
					case 0: return langs.en.booze[0];
					case 2: return langs.en.booze[1];
					case 3: return langs.en.booze[2];
					case 4: return langs.en.booze[3];
					case 5: return langs.en.booze[4];
					case 6: return langs.en.booze[5];
					case 7: return langs.en.booze[6];
					case 8: return langs.en.booze[7];
				}
			}
			function transCity(city) {
				switch(city) {
					case 0: return "NOWHERE";
					case 4: return "Detroit";
					case 5: return "Chicago";
					case 6: return "Palermo";
					case 7: return "New York";
					case 8: return "Las Vegas";
					case 9: return "Philadelphia";
					case 10: return "Baltimore";
					case 11: return "Corleone";
				}
			}

			//THE OUTPUT TABLE
			BRCTableStart = '<br/><br/><center><table cellspacing="0" cellpadding="2" width="500" rules="none" class="thinline"><tbody align="center"><tr><td class="tableheader">Best B/N Run!</td></tr><tr><td colspan="3" bgcolor="black" height="1"></td></tr>';
			BRCTableEnd = '</tbody></table></center>';
			// city/carry info
			infoRow = '<tr><td>' + lang.BR[1] + transCity(city) + lang.BR[2] + booze + lang.BR[3] + narc + lang.BR[4] + '</td></tr>';

			// AF links on smuggling
			if(dlp == '/smuggling.php') {
				ak = ak8 = ak9 = ak0 = akc = ''
				if(prefs[15]){ ak = ' accessKey='; ak8 = '8'; ak9 = '9'; ak0 = '0'; akc = '\\';}
				tblStart = '<br/><br/><center><table cellspacing="0" cellpadding="2" width="500" rules="none" class="thinline"><tbody align="center"><tr><td class="tableheader">Auto-Fill Links!</td></tr><tr><td colspan="3" bgcolor="black" height="1"></td></tr>';
				tblEnd = '</tbody></table></center>'
				noFocus = 'onFocus="this.blur()" ';
				startRes = '<tr><td><a ' + noFocus + ak + ak8 + ' href="javascript:';
				startLow = '<tr><td><a ' + noFocus + ak + ak9 + ' href="javascript:';
				startHi = '<tr><td><a ' + noFocus + ak + ak0 + ' href="javascript:';
				startClr = '<tr><td><a ' + noFocus + ak + akc + ' href="javascript:';
				getInput = 'document.getElementsByTagName(' + "'" + 'input' + "'" + ')';
				clrNarc = 'for(i=0;i<7;i++){' + getInput + '[i].value=0};';
				clrBz = 'for(i=9;i<16;i++){' + getInput + '[i].value=0};';
				checkBz = 'if('+inputs[8].checked+"){document.getElementsByName('"
				checkNarc = 'if('+inputs[17].checked+"){document.getElementsByName('"
				setNarc = "')[0].value=" + narc + ';}';
				setBz = "')[0].value=" + booze + ';}';
				checkBestB = checkBz + transBoozeElem(bestbooze).toLowerCase() + setBz;
				checkBestN = checkNarc + transNarcElem(bestnarc).toLowerCase() + setNarc;
				checkLowB = checkBz + transBoozeElem(lowBooze).toLowerCase() + setBz;
				checkLowN = checkNarc + transNarcElem(lowNarc).toLowerCase() + setNarc;
				checkHiB = checkBz + transBoozeElem(hiBooze).toLowerCase() + setBz;
				checkHiN = checkNarc + transNarcElem(hiNarc).toLowerCase() + setNarc;
				focus = getInput + '[18].focus();';
				endRes = '">' + ak8 + ' - Use best-run results</a></td></tr>';
				endLow = '">' + ak9 + ' - Use lowest prices (rp mode)</a></td></tr>';
				endHi = '">' + ak0 + ' - Use highest prices (CD-run mode)</a></td></tr>';
				endClr = '">' + akc + ' - Reset all fields (Clear)</a></td></tr>';
				clickResults = startRes + clrNarc + clrBz + checkBestB + checkBestN + focus + endRes;
				clickLowest = startLow + clrNarc + clrBz + checkLowB + checkLowN + focus + endLow;
				clickHighest = startHi + clrNarc + clrBz + checkHiB + checkHiN + focus + endHi;
				clickClear = startClr + clrNarc + clrBz + focus + endClr;
				LinkTbl = (info>=0 ? tblStart + clickResults + clickLowest + clickHighest + clickClear + tblEnd : '');
			}
			
			if(bestcity){ // display profit results
				bestRow = '<tr><td>' + lang.BR[5] + transNarc(bestnarc) + lang.BR[6] + transBooze(bestbooze) + lang.BR[7] + transCity(bestcity) + '.</td></tr>';
				profitRow = '<tr><td>' + lang.BR[8] + Math.floor(maxProfit) +'.</td></tr>';
				buyStr = transNarc(bestnarc) + ',' + narc + ',' + transBooze(bestbooze) + ',' + booze;
				// make link to smuggling page and display BRC table, if not first-run
				if(info>=0 && (dlp == '/hacking.php'||dlp=='/prices.php') ) {
					clickToBuy = '<tr><td>' + lang.BR[9] + '<a href="smuggling.php?a,' + buyStr + lang.BR[10];
					db.innerHTML = db.innerHTML + BRCTableStart + infoRow + bestRow + profitRow + '<br>' + clickToBuy + BRCTableEnd;
				}
				// smuggling page -> save current fields and display BRC (if not first run) and links table
				if(dlp == '/smuggling.php') {
					inputs = document.getElementsByTagName('input');
					BRC = (info>=0 ? BRCTableStart + infoRow + bestRow + profitRow + BRCTableEnd : '')
					forms = new Array(16);
					for(i=0; i<16; i++) forms[i] = inputs[i].value;
					db.innerHTML = db.innerHTML + BRC + LinkTbl;
					for(i=0; i<16;i++) inputs[i].value = forms[i];
					inputs[18].focus();
				}
			}
			else { // no profit results to show!
				lameRow = '<tr><td><br>' + lang.BR[11] + '</td></tr>';
				BRC = (info>0 ? BRCTableStart + infoRow + lameRow + BRCTableEnd : '');
				//display BRC table (if not first-run) and links on smuggling
				if(dlp == '/prices.php'||dlp=='/hacking.php') db.innerHTML = db.innerHTML + BRC;
				if(dlp == '/smuggling.php') {
					forms = new Array(16);
					inputs = document.getElementsByTagName('input');
					for(i=0; i<16; i++) forms[i] = inputs[i].value;
					db.innerHTML = db.innerHTML + BRC + LinkTbl;
					for(i=0; i<16;i++) inputs[i].value = forms[i];
					inputs[18].focus();
				}
			}
			counter = getValue('bncounter',1)
			setValue('bncounter',--counter)
		} // end callback function
	}); // end xmlhttpRequest
} // end BRC
// --- AF SMUGGLING WITH BRC RESULTS (FROM PRICES.PHP) ----------------
if(dlp == '/smuggling.php' && dls) { //check if B/N calc left info
	info = dls.split(','); //get bestRun info
	narc = info[2];
	booze = info[4];
	//get input elements for bestRun stuff
	narcForm = getELNAME(info[1].toLowerCase());
	boozeForm = getELNAME(info[3].toLowerCase());
	inputs = document.getElementsByTagName('input');
	// check if user is buying, then AF
	if(inputs[8].checked) {
		for(i=0;i<7;i++) inputs[i].value=0;
		boozeForm[0].value = ''+booze;
	}
	if(inputs[17].checked) {
		for(i=9;i<16;i++) inputs[i].value=0;
		narcForm[0].value = ''+narc;
	}
	inputs[18].focus();
}
