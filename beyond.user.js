// ==UserScript==
// @name			Omerta Beyond
// @version			1.10.0.68
// @date			22-01-2012
// @author			OBDev Team <info@omertabeyond.com>
// @author			vBm <vbm@omertabeyond.com>
// @author			Dopedog <dopedog@omertabeyond.com>
// @author			Rix <rix@omertabeyond.com>
// @author			MrWhite <mrwhite@omertabeyond.com>
// @license			GNU General Public License v3
// @namespace			v3.omertabeyond.com
// @homepageURL			http://www.omertabeyond.com/
// @updateURL			https://omertabeyond.googlecode.com/svn/trunk/beyond.meta.js
// @description			Omerta Beyond 1.10 (Still the best 'legal' script! ;))
// @icon			http://omertabeyond.googlecode.com/svn/trunk/images/logo.small.png
// @screenshot			http://omertabeyond.googlecode.com/svn/trunk/images/sshot.png http://omertabeyond.googlecode.com/svn/trunk/images/sshot_tn.png
// @encoding			UTF-8
// @require			http://omertabeyond.googlecode.com/svn/trunk/scripts/libs.js
// @require			http://omertabeyond.googlecode.com/svn/trunk/scripts/settings.js
// @require			http://omertabeyond.googlecode.com/svn/trunk/scripts/langs.js
// @resource			css		http://omertabeyond.googlecode.com/svn/trunk/scripts/beyond.css
// @resource			trash		http://omertabeyond.googlecode.com/svn/trunk/images/del.png
// @resource			colorpicker	http://omertabeyond.googlecode.com/svn/trunk/images/colorpicker.gif
// @resource			comLogo		http://omertabeyond.googlecode.com/svn/trunk/images/logo-com.png
// @resource			dmLogo		http://omertabeyond.googlecode.com/svn/trunk/images/logo-dm.png
// @resource			nlLogo		http://omertabeyond.googlecode.com/svn/trunk/images/logo-nl.png
// @resource			buttonMenu	http://omertabeyond.googlecode.com/svn/trunk/images/menu.png
// @resource			buttonKey	http://omertabeyond.googlecode.com/svn/trunk/images/key.png
// @resource			buttonReset	http://omertabeyond.googlecode.com/svn/trunk/images/reset.png
// @resource			favoriteIco	http://omertabeyond.googlecode.com/svn/trunk/images/favicon.png
// @resource			edoIco		http://omertabeyond.googlecode.com/svn/trunk/images/edo.png
// @resource			updateIco	http://omertabeyond.googlecode.com/svn/trunk/images/updateicon.png
// @resource			brcGear		http://omertabeyond.googlecode.com/svn/trunk/images/brcgear.png
// @resource			deleteIcon	http://omertabeyond.googlecode.com/svn/trunk/images/deleteicon.png
// @resource			reply		http://omertabeyond.googlecode.com/svn/trunk/images/reply.png
// @resource			loading		http://omertabeyond.googlecode.com/svn/trunk/images/loading.png
// @resource			nickreader	http://omertabeyond.googlecode.com/svn/trunk/images/magnifier.png
// @resource			nextIcon	http://omertabeyond.googlecode.com/svn/trunk/images/next.png
// @resource			prevIcon	http://omertabeyond.googlecode.com/svn/trunk/images/prev.png
// @resource			check		http://omertabeyond.googlecode.com/svn/trunk/images/check.png
// @resource			changelog	http://omertabeyond.googlecode.com/svn/trunk/images/changelog.png
// @include			http://gm.omertabeyond.com/*.php*
// @include			http://www.omertabeyond.com/html/poll/poll.php*
// @include			http://www.omerta3.com/*
// @include			http://omerta3.com/*
// @include			http://www.barafranca.com/*
// @include			http://barafranca.com/*
// @include			http://www.barafranca.us/*
// @include			http://barafranca.us/*
// @include			http://dm.barafranca.com/*
// @include			http://deathmatch.barafranca.com/*
// @include			http://www.barafranca.nl/*
// @include			http://barafranca.nl/*
// @include			http://www.barafranca.gen.tr/*
// @include			http://barafranca.gen.tr/*
// @exclude			http://gamewiki.barafranca.com/*
// @exclude			http://ircwiki.barafranca.com/*
// @exclude			http://*barafranca.*/front-mafia-list.php*
// ==/UserScript==

/*
$Rev$:  Revision of last commit
$Author$:  Author of last commit
$Date$:  Date of last commit
*/

//---------------- (Omerta==0)?refresh:go ----------------
 if (db.innerHTML.indexOf('You reached your click limit.') != -1 && dlp != '/menu.php') {
	setTimeout(function () {
		window.location.reload();
	}, 60000);
} else if (hOne == '504 Gateway Time-out') {
	setTimeout(function () {
		window.location.reload();
	}, 20000);
} else if (hOne == '502 Bad Gateway') {
	setTimeout(function () {
		window.location.reload();
	}, 20000);
} else if (hOne == '503 Service Unavailable') {
	setTimeout(function () {
		window.location.reload();
	}, 20000);
} else if (hOne == '500 - Internal Server Error') {
	setTimeout(function () {
		window.location.reload();
	}, 20000);
} else if (db.innerHTML.indexOf('Downtime. We\'ll be back shortly. Hopefully. ') != -1) {
	setTimeout(function () {
		window.location.reload();
	}, 300000);
} else { //freedom!

function whereToRun(hostname) {
	switch (hostname || window.location.hostname) {
		case 'www.omerta3.com':
		case 'omerta3.com':
		case 'www.barafranca.com':
		case 'barafranca.com':
		case 'www.barafranca.us':
		case 'barafranca.us':
			return 'com';
		case 'deathmatch.barafranca.com':
		case 'dm.barafranca.com':
			return 'dm';
		case 'www.barafranca.nl':
		case 'barafranca.nl':
			return 'nl';
		case 'www.barafranca.gen.tr':
		case 'barafranca.gen.tr':
			return 'tr';
		case 'gm.omertabeyond.com':
		case 'www.omertabeyond.com':
			var version = window.location.search.split('=')[1];
			if (version.indexOf('&') === -1) {
				return version;
			} else {
				return version.split('&')[0];
			}
		break;
		default:
			return undefined;
	}
}

var lang, sets, whoami;
var whereToRun = whereToRun();
if (whereToRun == 'com' || whereToRun == undefined) {
	lang = langs.en;
	sets = settings.en;
	whoami = GM_getValue('nick_com', '');
} else if (whereToRun == 'dm') {
	lang = langs.dm;
	sets = settings.dm;
	whoami = GM_getValue('nick_dm', '');
} else if (whereToRun == 'nl') {
	lang = langs.nl;
	sets = settings.nl;
	whoami = GM_getValue('nick_nl', '');
} else if (whereToRun == 'tr') {
	lang = langs.tr;
	sets = settings.tr;
	whoami = GM_getValue('nick_tr', '');
}

var SCRIPT_NAME = 'Omerta Beyond';
var SCRIPT_VERSION = '1.10';
var SCRIPT_VERSION_MAJOR = 1;
var SCRIPT_VERSION_MINOR = 10;
var SCRIPT_VERSION_MAINTENANCE = 0;
var SCRIPT_VERSION_BUILD = 68;
var SCRIPT_SUBVERSION = 68;
var minFFVersion = '4.0';
var SITE_LINK = 'http://www.omertabeyond.com';
var SCRIPT_LINK = 'http://gm.omertabeyond.com';
var UPDATE_URL = SCRIPT_LINK+"/version.xml";
var PrefsLink = SCRIPT_LINK + sets.prefslink;
var PricesLink = SCRIPT_LINK + sets.priceslink;
var ContactLink = SCRIPT_LINK + sets.contactlink;
var PollLink = SITE_LINK + sets.polllink;
var OBnUrl = 'http://news.omertabeyond.com/';
var EdoUrl = 'http://www.edo-nieuws.nl/news.php';
var ff = navigator.userAgent.split('/')[3].split(' ')[0];
var OB_v = SCRIPT_VERSION_MAJOR + '.' + SCRIPT_VERSION_MINOR + '.' + SCRIPT_VERSION_MAINTENANCE;
var OB = OB_v + '.' + SCRIPT_VERSION_BUILD;

GM_registerMenuCommand('[' + SCRIPT_NAME + '] v' + OB, function () {
	alert('You are using ' + SCRIPT_NAME + '.\nVersion:\t\t' + OB_v +'\nRevision:\t\t' + SCRIPT_VERSION_BUILD);
});

GM_registerMenuCommand('[' + SCRIPT_NAME + '] Check for updates.', function () {
	OBUpdate(true);
});

GM_registerMenuCommand('[' + SCRIPT_NAME + '] Reset values to default.', function () {
	clearSettings();
	window.location.href = window.location;
});

var maxbit = lang.maxprefs; //set the amount of preferences
var prefs = prefsArray(getValue('prefs', '0'), maxbit); //compatibility with old prefs built into prefsArray()

//load any GET querys
var querys = [
	'nick',
	'OB',
	'colour'
];

//---------------- Bmsg Example ----------------
var bmsgon = false;
if (bmsgon) {
	function CheckBmsg() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT_LINK+'/index.php?p=bmsg&v='+sets.version.replace('_',''),
			onload: function(xhr) {
				var response = JSON.parse(xhr.responseText);
				var lastbmsg = getValue('lastbmsg', 0);
				var len = response["deaths"].length;
				if (lastbmsg < response["deaths"][0]["ts"]) {
					var extra = (response['deaths'][0]['akill'] == 1)?'(<b>A</b>)':(response['deaths'][0]['bf'] == 1)?'(<b>BF</b>)':'';
					var id = 'msg';
					var type = 'info'; //leave at info for now
					var title = 'Death';
					var d =  new Date(response['deaths'][0]['ts']*1000);
					var time = d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
					var extra = (response['deaths'][0]['akill'] == 1)?'(<b>A</b>)':(response['deaths'][0]['bf'] == 1)?'(<b>BF</b>)':'';
					var fam = (response['deaths'][0]['fam'] == '')?'':'('+response['deaths'][0]['fam']+')';
					var text = '<br />'+time+' '+extra+' <a href="user.php?name='+response['deaths'][0]['name']+'">'+response['deaths'][0]['name']+'</a> '+response['deaths'][0]['rank_text']+' '+fam+'<br />';

					var msg = new Bmsg();
					msg.Bmsg(id, type, title, text);
					msg.setIcon('http://dump.omertabeyond.com/images/104error.png');

					msg.add();
					setValue('lastbmsg', response["deaths"][0]["ts"]);
				} else if (lastbmsg < response["deaths"][len-1]["ts"]) {
					var id = 'msg';
					var type = 'info'; //leave at info for now
					var title = 'Death';
					var text = '<br />';
					for (var i=0;i<response["deaths"].length;i++) {
						var d =  new Date(response['deaths'][i]['ts']*1000);
						var time = d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
						var extra = (response['deaths'][i]['akill'] == 1)?'(<b>A</b>)':(response['deaths'][i]['bf'] == 1)?'(<b>BF</b>)':'';
						var fam = (response['deaths'][i]['fam'] == '')?'(None)':'('+response['deaths'][i]['fam']+')';
						text += time+' '+extra+' <a href="user.php?name='+response['deaths'][i]['name']+'">'+response['deaths'][i]['name']+'</a> '+response['deaths'][i]['rank_text']+' '+fam+'<br />';
					}

					var msg = new Bmsg();
					msg.Bmsg(id, type, title, text);
//					msg.setIcon('http://dump.omertabeyond.com/images/104error.png');

					msg.add();
					setValue('lastbmsg', response["deaths"][0]["ts"]);
				} else {
					var msg = new Bmsg();
					msg.Bmsg('msg', 'info', 'MrWhite is cool', 'no new death');
//					msg.setIcon('http://dump.omertabeyond.com/images/104error.png');

					msg.add();
				}
			}
		});
//		setTimeout(CheckBmsg(), 3000);
	}
}
//---------------- int->str bninfo compatibility ----------------
txt = getValue('bninfo', '');
if (typeof txt == 'number') {
	setValue('bninfo', txt);
	setValue('bncounter', 0);
}

//---------------- Preferences Panel ----------------
if (dlp == '/prefs.php') {
	if (ls.indexOf('&prefs=') != -1) { //check for prefs update
		prefList = GetPost('prefs');
		setValue('prefs', prefList);
		prefs = prefsArray(prefList, maxbit);
	}
	for (j = -1; ++j < querys.length;) {
		if (ls.indexOf(querys[j]) != -1) {
			setValue(querys[j], GetPost(querys[j])); //check for  update
		}
	}

	var prefstr = lang.prefs;
	var prefsTitle = lang.prefsTitle;

	var string = '<tr style="height: 25px;" id="prefsrow"><td colspan="4" class="toptd">Omerta Beyond ' + OB + ' <span style="padding-right:10px;">: '+lang.prefsname+' </span> <img src="'+GM_getResourceURL('updateIco')+'" id="updater" title="'+lang.prefsPage[0]+'" style="cursor:pointer;" alt="'+lang.prefsPage[0]+'" width="16" height="16" /></td></tr>';

	function addCat(title) { //pref category
		toggleStr = 'var node = this; while(node.nextSibling.innerHTML.search(/<input/)!=-1){ var node = node.nextSibling; var show = ((node.style.display == \'none\') ? \'\' : \'none\'); node.style.display = show; };'; //js to toggle hiding prefs for category
		string += '<tr style="height: 25px;cursor:pointer;" class="tr" onclick="javascript:' + toggleStr + '"><td colspan="4" class="td"><b>&nbsp; &rarr; <span style="text-decoration:underline;">';
		string += title;
		string += '</span></b></td></tr>';
	}

	function addPrefItems(list) { //indices of prefs to list... order matters!
		for (i = -1; ++i < list.length;) { //loop through given prefs for category
			string += '<tr style="height: 25px; display:none;" class="tr"><td style="width:25px;" class="td">'; //start pref row
			string += '<input type="checkbox" id="check' + list[i] + '" name="check_list" /></td>'; //checkbox
			string += '<td class="td"' + (((i + 1) == list.length) ? ' colspan="3"' : '');
			string += '><span title="' + prefsTitle[list[i]] + '" style="cursor:pointer" onclick="javascript:node = this.parentNode.previousSibling.childNodes[0];node.checked = (node.checked ? 0 : 1)">';
			string += prefstr[list[i++]] + '</span></td>'; //pref name
			if (i == list.length) {
				string += '</tr>'; //end pref row
			} else {
				string += '<td style="width:25px;" class="td"><input type="checkbox" id="check' + list[i] + '" name="check_list" /></td>'; //checkbox
				string += '<td class="td">';
				string += '<span title="' + prefsTitle[list[i]] + '" style="cursor:pointer" onclick="javascript:node = this.parentNode.previousSibling.childNodes[0];node.checked = (node.checked ? 0 : 1)">';
				string += prefstr[list[i]] + '</span></td></tr>';
			}
		}
	}

	//order here matters!
	//place categories in order they need to appear
	addCat(lang.preftitles[0]); //Crimes/Cars
	addPrefItems([8, 10, 24, 0, 35]);

	addCat(lang.preftitles[1]); //Smuggling
	addPrefItems([28, 4, 1, 17, 21]);

	addCat(lang.preftitles[2]); //Jail
	addPrefItems([3, 23]);

	addCat(lang.preftitles[3]); //AF's
	addPrefItems([7, 26, 27, 29]);

	addCat(lang.preftitles[4]); //Clean up
	addPrefItems([6, 22, 12, 14, 30, 19, 20, 18, 38]);

	addCat(lang.preftitles[6]); //misc
	addPrefItems([16, 11, 13, 5, 15, 9, 31, 33, 34, 36, 2, 37]);

	string += '<tr style="height: 50px;"><td colspan="4" class="bigtd"><button type="button" name="Check_All" class="button" onclick="Check(document.myform.check_list)">'+lang.prefsPage[1]+'</button>';
	string += '&nbsp;<button type="button" name="#" class="button" onclick="';

	var nick = getValue('nick','');

	grabPrefs  = 'javascript:var prefslist=\'\';';
	grabPrefs += 'for(i=0;i<'+maxbit+';i++){ if(document.getElementById(\'check\'+i)){';
	grabPrefs += 'prefslist += (document.getElementById(\'check\'+i).checked ? 1 : 0);}';
	grabPrefs += 'else prefslist += \'0\'}; window.location = \'' + PrefsLink + '&nick='+nick+'&ob='+OB+'&prefs=\'+prefslist;';

	string += grabPrefs;//grab all current checked values and send to url
	string += '">'+lang.prefsPage[2]+' '+lang.prefsname+'</button></td></tr>';

	getID('toptable').innerHTML = string;

	for (i = -1; ++i < maxbit;) {
		if (getID('check' + i)) {
			getID('check' + i).checked = prefs[i];
		} else {
			prefs[i] = 0;
		}
	}

	if (prefs[3]) {//JHL stuff
		function jhl_save(mode) {
			getID('save_'+mode+'_img').setAttribute('src', GM_getResourceURL('loading'));
			getID('save_'+mode+'_img').setAttribute('alt', 'Wait');
			getID('save_'+mode+'_img').style.opacity = '1';
			getID('save_'+mode+'_button').style.textDecoration = 'line-through';
			getID('save_'+mode+'_button').style.cursor = 'default';
			if (mode == 'jhl') {
				var busts = '';
				var a = getELNAME('jhl_nick').length;
				var x;
				for (x = 0; x < a; ++x) {
					if (getELNAME('jhl_nick')[x].value != '') {
						busts += ',';
						busts += getELNAME('jhl_nick')[x].value.substr(0, 1).toUpperCase()+getELNAME('jhl_nick')[x].value.substr(1).toLowerCase();
						busts += '|'+getELNAME('jhl_prio')[x].value;
						busts += '|'+getELNAME('jhl_color')[x].value;
					}
				}
				setValue('bust', busts.substr(1));
			}
			if (mode == 'nojhl') {
				var nobusts = '';
				var a = getELNAME('nojhl_nick').length;
				var x;
				for (x = 0; x < a; ++x) {
					if (getELNAME('nojhl_nick')[x].value != '') {
						nobusts += ','+getELNAME('nojhl_nick')[x].value.substr(0, 1).toUpperCase()+getELNAME('nojhl_nick')[x].value.substr(1).toLowerCase();
					}
				}
				setValue('nobust', nobusts.substr(1));
			}
			if (mode == 'jhlprefs') {
				setValue('defpri', getID('defpri').value);
				setValue('defcol', getID('defcol').value);
				setValue('FL_prior', getID('FL_prior').value);
				setValue('Fam_prior', getID('Fam_prior').value);
				setValue('buyout', getID('buyout').value);
				setValue('maxHL', getID('maxHL').value);
			}
			getID('save_'+mode+'_img').setAttribute('src', GM_getResourceURL('check'));
			getID('save_'+mode+'_img').setAttribute('alt', 'Done');
			getID('save_'+mode+'_button').style.textDecoration = 'none';
			getID('save_'+mode+'_button').style.cursor = 'pointer';
			setTimeout('opacity(\''+mode+'\')', 500);
		}

		var string = '';
		string += '<tr style="height: 25px;"><td colspan="6" class="toptd">Omerta Beyond : Jail Highlighter '+lang.jhl[0]+'</td></tr>';
		string += '<tr style="height: 25px;" class="tr"><td class="td">&nbsp;</td><td style="width:210px;" class="td"><b>'+lang.jhl[1]+'</b></td><td style="width:75px;" class="td"><b>'+lang.jhl[2]+'</b></td><td style="width:76px;" class="td">&nbsp;</td><td style="width:50px;" class="td"><b>'+lang.jhl[3]+'</b></td><td class="td">&nbsp;</td></tr>';

		var busts = getValue('bust', '').split(',');
		var x, info, nick, prio, color;
		var y = 0;
		var a = busts.length;

		function AddBust(y, nick, color, prio) {
			string += '<tr id="jhl_tr_'+y+'" style="height:25px;" class="tr">';
			string += '	<td>&nbsp;</td>';
			string += '	<td>';
			string += '		<img id="jhl_d_'+y+'" class="del_icon" height="16" width="16" style="cursor:pointer;" src="'+GM_getResourceURL('trash')+'" alt="Delete" onclick="if('+y+'==1){getID(\'jhl_a_'+y+'\').value=\'\';getID(\'jhl_b_'+y+'\').value=\'CCCCCC\';getID(\'jhl_b_'+y+'\').style.backgroundColor=\'#CCCCCC\';getID(\'jhl_c_'+y+'\').value=\'\';}else{getID(\'jhl_tr_'+y+'\').parentNode.removeChild(getID(\'jhl_tr_'+y+'\'));}" />';
			string += '		<input id="jhl_a_'+y+'" value="'+nick.replace('%20', ' ').replace('%26', '&')+'" type="text" name="jhl_nick" class="inputbig" onkeyup="AddBust('+y+');" />';
			string += '	</td>';
			string += '	<td><input id="jhl_b_'+y+'" value="'+color+'" type="text" name="jhl_color" class="color {pickerPosition:\'top\',pickerFaceColor:\'transparent\',pickerFace:3,pickerBorder:0,pickerInsetColor:\'black\'}" /></td>';
			string += '	<td><img id="jhl_e_'+y+'" class="picker_icon" src="'+GM_getResourceURL('colorpicker')+'" height="14" width="14" style="cursor:pointer;" onclick="getID(\'jhl_b_'+y+'\').color.showPicker()" alt="Pick color" /></td>';
			string += '	<td><input id="jhl_c_'+y+'" value="'+prio+'" type="text" name="jhl_prio" class="inputsmall" /></td>';
			string += '	<td>&nbsp;</td>';
			string += '</tr>';
		}

		for (x = 0; x < a; ++x) {
			info = busts[x].split('|');
			if (info[0] != '') {
				++y;
				if (info[1] == null) { info[1] = ''; }
				if (info[2] == null || info[2] == '') { info[2] = 'CCCCCC'; }
				AddBust(y, info[0], info[2], info[1]);
			}
		}
		AddBust((y + 1), '', 'CCCCCC', ''); // add empty one for new rows

		// save button for normal busts
		string += '<tr class="tr" style="height: 25px;text-align:center;"><td colspan="6" class="td">';
		string += '<button id="save_jhl_button" type="button" class="button">'+lang.jhl[6]+'</button>';
		string += '<img id="save_jhl_img" height="16" width="16" src="'+GM_getResourceURL('loading')+'" style="margin-left:3px;opacity:0;" alt="" />';
		string += '</td></tr>';
		string += '<tr style="height: 25px;" class="tr"><td class="td">&nbsp;</td><td class="td" colspan="5"><b>'+lang.jhl[7]+'</b></td></tr>';

		var nobusts = getValue('nobust', '').split(',');
		y = 0;
		a = nobusts.length;

		function AddNoBust(y, nick) {
			string += '<tr id="nojhl_tr_'+y+'" style="height: 25px;" class="tr">';
			string += '	<td>&nbsp;</td>';
			string += '	<td colspan="5">';
			string += '		<img id="nojhl_b_'+y+'" class="del_icon" height="16" width="16" style="cursor:pointer;" src="'+GM_getResourceURL('trash')+'" alt="Delete" onclick="if('+y+'==1){getID(\'nojhl_a_'+y+'\').value=\'\';}else{getID(\'nojhl_tr_'+y+'\').parentNode.removeChild(getID(\'nojhl_tr_'+y+'\'));}" />';
			string += '		<input id="nojhl_a_'+y+'" value="'+nick.replace('%20', ' ').replace('%26', '&')+'" type="text" name="nojhl_nick" class="inputbig" onkeyup="AddNoBust('+y+');" />';
			string += '	</td>';
			string += '</tr>';
		}

		for (x = 0; x < a; ++x) {
			if (nobusts[x] != '') {
				++y;
				AddNoBust(y, nobusts[x]);
			}
		}
		AddNoBust((y + 1), ''); // add empty one for new rows

		// save button for no busts
		string += '<tr class="tr" style="height: 25px;text-align:center;"><td colspan="6" class="td">';
		string += '<button id="save_nojhl_button" type="button" class="button">'+lang.jhl[6]+'</button>';
		string += '<img id="save_nojhl_img" height="16" width="16" src="'+GM_getResourceURL('loading')+'" style="margin-left:3px;opacity:0;" alt="" />';
		string += '</td></tr>';
		// general options
		string += '<tr style="height: 25px;" class="tr"><td class="td">&nbsp;</td><td class="td" colspan="2" style="text-align:center;"><b>'+lang.jhl[8]+'</b><td class="td" colspan="2" style="text-align:center;"><b>'+lang.jhl[9]+'</b></td><td class="td">&nbsp;</td></tr>';
		string += '<tr style="height: 25px;" class="tr"><td colspan="2" style="text-align:right;">'+lang.jhl[10]+': <input id="defpri" value="'+getValue('defpri', 2)+'" type="text" class="inputmiddle" onblur="if(this.value>9||this.value<1){this.value='+getValue('defpri', 2)+';}" /></td><td colspan="2" style="text-align:right;">'+lang.jhl[14]+': &nbsp;</td><td colspan="2"><input id="FL_prior" value="'+getValue('FL_prior', 3)+'" type="text" onblur="if(this.value>9||this.value<1){this.value='+getValue('FL_prior', 3)+';}" class="inputsmall" /></td></tr>';
		string += '<tr style="height: 25px;" class="tr"><td colspan="2" style="text-align:right;">'+lang.jhl[11]+': <input id="defcol" value="'+getValue('defcol', '33FF66')+'" type="text" class="color {pickerPosition:\'top\',pickerFaceColor:\'transparent\',pickerFace:3,pickerBorder:0,pickerInsetColor:\'black\'}" /></td><td><img class="picker_icon" src="'+GM_getResourceURL("colorpicker")+'" height="14" width="14" style="cursor:pointer;" onclick="getID(\'defcol\').color.showPicker()" alt="Pick color" /></td><td colspan="1" style="width:100px;text-align:right;">'+lang.jhl[15]+': &nbsp;</td><td colspan="2"><input id="Fam_prior" value="'+getValue('Fam_prior', 9)+'" type="text" onblur="if(this.value>9||this.value<1){this.value='+getValue('Fam_prior', 9)+';}" class="inputsmall" /></td></tr>';
		string += '<tr style="height: 25px;" class="tr"><td colspan="4" style="text-align:right;">'+lang.jhl[12]+': &nbsp;</td><td colspan="2"><input id="maxHL" value="'+getValue('maxHL', 5)+'" type="text" onblur="if(this.value>5){this.value=5;}" class="inputsmall" /></td></tr>';
		string += '<tr style="height: 25px;" class="tr"><td colspan="4" style="text-align:right;">'+lang.jhl[13]+': &nbsp;</td><td colspan="2"><input id="buyout" value="'+getValue('buyout', '/')+'" type="text" onblur="var h=\''+getValue('rawkeyprefs', '')+'\';if(h.indexOf(this.value)!=-1){this.value=\''+getValue('buyout', '/')+'\';}" class="inputsmall" /></td></tr>';
		string += '<tr style="height: 25px;" class="tr"><td colspan="6" class="td" style="text-align:center;">';
		string += '<button id="save_jhlprefs_button" type="button" class="button">'+lang.jhl[6]+'</button>';
		string += '<img id="save_jhlprefs_img" height="16" width="16" src="'+GM_getResourceURL('loading')+'" style="margin-left:3px;opacity:0;" alt="" />';
		string += '</td></tr>';
		string += '<tr style="height: 20px;"><td class="tdcredits" colspan="6" class="bigtd"><div class="credits">'+lang.jhl[16]+'</div></td></tr>';

		getID('tablejail').innerHTML = string;
		getID('save_jhl_button').addEventListener('click', function(){ jhl_save('jhl'); }, true);
		getID('save_nojhl_button').addEventListener('click', function(){ jhl_save('nojhl'); }, true);
		getID('save_jhlprefs_button').addEventListener('click', function(){ jhl_save('jhlprefs'); }, true);
	} else {
		getID('tablejail').style.display = 'none';
	}
	//style coolness
	$x('//table | //td[@class="toptd"] | //button | //input[@type="text"] | //div[@id="credits"]').forEach(function ($n) {
		var $N = $n.nodeName;
		var $s = $n.style;
		if ($N == "TABLE" && $n.parentNode.nodeName != 'TD' && $n.innerHTML.search('<td') != -1) {
			$s.MozBorderRadius = '10px';
			//bottom cells
			var last = $n.getElementsByTagName('td');
			last = last[(last.length - 1)];
			if (last.parentNode.style.height == '2px') { //fix for announcement //table//table
				last = last.parentNode.parentNode.parentNode.parentNode;
			}
			last.style.MozBorderRadiusBottomright = '7.5px';
			last.style.MozBorderRadiusBottomleft = '7.5px';
		}
		if ($N == "TD") {
			$s.MozBorderRadiusTopleft = '7.5px';
			$s.MozBorderRadiusTopright = '7.5px';
		}
		if ($N == "DIV" || $N == "INPUT" || $N == "BUTTON") {
			if ($N == "BUTTON") {
				$n.style.cursor = 'pointer';
			}
		}
	});

	// Check for update
	getID('updater').addEventListener('click', function(){ OBUpdate(true); }, true);
}

//------------------- some needed stuff -------------
if (dlp == '/game.php') { //just once on login
	//annoy the user --- FFv Checker ---
	if (parseInt(ff.split('.')[1], 10) < parseInt(minFFVersion.split('.')[1], 10) || parseInt(ff.split('.')[0], 10) < parseInt(minFFVersion.split('.')[0], 10)) {
		if (parseInt(ff.split('.')[0], 10) <= parseInt(minFFVersion.split('.')[0], 10)) {
			alert(lang.ffv+' '+minFFVersion);
		}
	}
	// Check for update
	if (prefs[37]) {
		var time = new Date().getTime();
		var lastOBUCheck = getValue("lastOBUCheck","0");
		var checkInterval = 3600 * 72 * 1000;
		if (time - lastOBUCheck > checkInterval) {
			setValue("lastOBUCheck", time.toString());
			OBUpdate(false);
		}
	}
	//CheckBmsg();
}
//------------------ Reset trackers on death------------------
if(dls.indexOf('?module=Account&action=omertician') != -1) {
	if($X('//img[contains(@src, "grimreaper.gif")]')) {
		if (confirm('Do you want to reset your trackers?')) {
			setValue('carmoney', 0);
			setValue('cars', 0);
			setValue('crimemoney', 0);
			setValue('crimes', 0);
			setValue('obaybul', 0);
			setValue('btbullets', 0);
			setValue('btmoney', 0);
			setValue('bttoday', 0);
		}
	}
}
//--------------------- Redirect on main ---------------------
if (dlp == '/main.php') {
	window.location = 'http://'+dlh+'/BeO/webroot/index.php?module=Launchpad';
}

//---------------- Remove Third-party Hotkeys ----------------
$x('//*[@accesskey]').forEach(function ($n) {
	$n.removeAttribute('accessKey');
});

//---------------- Cocaine Prices ----------------
if(dlp == '/marquee.php'){
	document.addEventListener('dblclick', function(){ window.location.reload(); }, true);
	if(prefs[1]){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://'+dlh+'/BeO/webroot/index.php?module=API&action=smuggling_prices',
			onload: function(resp){
				var marquee = getTAG('div')[0];
				marquee.innerHTML = '';

				var parser = new DOMParser();
				var dom = parser.parseFromString(resp.responseText, 'application/xml');

				function getPrice(drug, city) {
					return dom.getElementsByTagName(drug)[city].textContent;
				}

				var p = [];
				var q = new Array;
				var p_C = [lang.cities[0], lang.cities[1], lang.cities[2], lang.cities[3], lang.cities[4], lang.cities[5], lang.cities[6], lang.cities[7]];
				var p_id = ['0', '1', '2', '3', '4', '5', '6', '7'];

				for (i=0;i<=7;i++){ p[i]=getPrice('cocaine', i); q[i]=p[i]; }

				var max = p.sort( function(a, b){ return b-a; } )[0];
				var min = p[(p.length-1)];

				i=0;
				q.forEach(function($n){
					if($n==min){
						q[i]='<span style="color:#' + getValue('low', '00ff00') + ';">' + $n + '</span>';
					}
					if($n==max){
						q[i]='<span style="color:#' + getValue('high', 'ff0000') + ';">' + $n + '</span>';
					}
					i++;
				});
				var time = dom.getElementsByTagName('humantime')[0].textContent;
				time = time.split(' ')[0];
				time = time.split(':');
				time = (time[1]<30)?time[0]+':00 OT':time[0]+':30 OT';

				var hoverdiv = cEL('div');
				hoverdiv.id = 'hiddenbox';
				hoverdiv.setAttribute('style', 'display:none; position:absolute; background-color:#000; border:1px solid #FFF; font-size:9px; top:2px; width:520px; text-align:center');
				marquee.appendChild(hoverdiv);

				function hoverlink(city, priceStr) {
					var link = cEL('a');
					link.href = '#';
					link.style.color = '#FFF';
					link.style.fontSize = '10px';
					if (city == 4 || city == 5 || city == 6 || city == 7) {
						link.addEventListener('mouseover', function (event) {
							hovermenu(city, event.clientX - 525);
						}, true);
					} else {
						link.addEventListener('mouseover', function (event) {
							hovermenu(city, event.clientX + 25);
						}, true);
					}
					link.addEventListener('mouseout', function (event) {
						hovermenuout();
					}, true);
					link.innerHTML = priceStr;
					return link;
				}

				function hovermenu(city, x) {
					var hoverdiv = getID('hiddenbox');
					hoverdiv.style.display = 'inline';
					hoverdiv.style.left = x + 'px';
					hoverdiv.innerHTML = 'Morphine: ' + getPrice('morphine', city) + ' | ' + 'Heroin: ' + getPrice('heroin', city) + ' | ' + 'Opium: ' + getPrice('opium', city) + ' | ' + 'Whiskey: ' + getPrice('whiskey', city) + ' | ' + 'Amaretto: ' + getPrice('amaretto', city) + ' | ' + 'Rum: ' + getPrice('rum', city);
				}

				function flytolink(city, priceStr, priceToFly, cityId) {
					var mycity = getPow('bninfo', 2, -1);
					var link
					link = cEL('a');
					link.href = '#';
					link.id = lang.cities[city];
					link.style.color = '#FFF';
					link.style.fontSize = '10px';
					link.addEventListener('click', function () {
						if (mycity-4 == city) {
							alert(lang.marquee[3]);
						} else if (confirm(lang.marquee[0] + lang.cities[city] + '?')) {
							top.frames[2].location='BeO/webroot/index.php?module=Travel&action=FetchInfo&CityId='+((city == 'nul') ? 0 : city)+'&travel=yes';
						}
					}, true);

					if (prefs[17]) {
						if (city == 4 || city == 5 || city == 6 || city == 7) {
							link.addEventListener('mouseover', function (event) {
								hovermenu(city, event.clientX - 525);
								this.style.textDecoration = 'underline';
							}, true);
						} else {
							link.addEventListener('mouseover', function (event) {
								hovermenu(city, event.clientX + 25);
								this.style.textDecoration = 'underline';
							}, true);
						}
						link.addEventListener('mouseout', function (event) {
							getID('hiddenbox').style.display = 'none';
							this.style.textDecoration = 'none';
						}, true);
					} else {
						link.addEventListener('mouseover', function () {
							this.style.textDecoration = 'underline';
						}, true);
						link.addEventListener('mouseout', function () {
							this.style.textDecoration = 'none';
						}, true);
					}
					link.innerHTML = priceStr;
					return link;
				}
				var span, priceandtime, link, city, owncity;
				span = cEL('span');
				priceandtime = cEL('span');
				span.appendChild(priceandtime);

				i=0;
				p.forEach(function($n){
					span.style.color = '#FFF';
					span.appendChild(flytolink(i, p_C[i]+':'+q[i], 500, p_id[i]));
					var separator = cEL('span');
					separator.innerHTML = ' | ';
					span.appendChild(separator);
					i++;
				});

				link = cEL('a');
				link.href = PricesLink;
				link.target = 'main';
				link.innerHTML = lang.marquee[1];
				link.style.color = '#FFF';
				link.style.fontSize = '10px';
				link.addEventListener('mouseover', function(){ this.style.textDecoration='underline' }, true);
				link.addEventListener('mouseout', function(){ this.style.textDecoration='none' }, true);
				span.appendChild(link);
				priceandtime.innerHTML = lang.marquee[2] + time + ' | ';
				span.style.color = '#FFF';
				span.style.fontSize = '10px';
				marquee.appendChild(span);

				city = getPow('bninfo', 2, -1);
				if(city > 0){
					city = lang.cities[city-4];
					owncity = city;
					getID(city).setAttribute('style',getID(city).getAttribute('style')+'font-style:italic');
				}
				window.onload = setTimeout(function(){ window.location.reload(); }, 60000);
			}
		});
	}
}
//---------------- Menu and submenus ----------------
if (dlp == '/menu.php') {
  	db.innerHTML = db.innerHTML.replace(/(| )\[\w\]/ig,'').replace(/accesskey=\"\w\"/,''); //remove third party hotkey leftovers
	var descr = [lang.prefsname].concat(lang.menuitem); //beyond menu descriptions
	var qlinks = [PrefsLink +'&ob='+OB, PollLink, ContactLink, SCRIPT_LINK + '/?p=faq', PricesLink, sets.statslink]; //beyond menu links
	var qtitle = lang.menutitle; //beyond menu titles

	if(sets.version=='_tr'){ // no point in having stats links for .tr being that we don't log that at all
		descr.pop();
		qlinks.pop();
		qtitle.pop();
	}
	//--add additional submenus
	function appMenu(x) {
		innerHTML += '</tbody></table></div></td></tr></tbody>';
		subMenu.innerHTML = innerHTML;
		subMenu.setAttribute('cellspacing', '0');
		subMenu.setAttribute('cellpadding', '0');

		var table = $X('/html/body/div/table['+x+']');
		table.parentNode.insertBefore(subMenu, table);
	}
	function checkKey(id) {
		var buyout = getValue('buyout', '/');
		var val;
		a = ((getTAG('input').length-1) / 2);
		for (i = 0;i <= a;i++) {
			val = getID('ip'+i).value.toUpperCase();
			if ((val == getID(id).value.toUpperCase() && 'ip'+(i+1) != id && getID(id).value.toUpperCase() != '') || val == buyout) {
				alert(lang.cusmenu[2]);
				getID(id).value = '';
				i = 100;
			}
		}
	}

	//add beyond menu
	var subMenu = cEL('table');
	var innerHTML = '<tbody><tr><th onclick="Menu.toggle(this);">Beyond</th></tr><tr><td><div class="subnav" style="overflow:hidden"><table cellspacing="0" cellpadding="0"><tbody>';
	for (i = 0; i < qlinks.length; i++) {
		innerHTML += '<tr><td><a target="main" onmousedown="return false;" href="'+ qlinks[i] +'" class="menuLink" title="'+qtitle[i]+'">'+descr[i]+'</a></td></tr>';
	}
	appMenu(2);

	var totlinks = $x('//a').length;

	//what links to remove?
	var remlinks = getValue('remlinks', '');
	var rem = [];
	remlinks = remlinks.split('*');
	a = remlinks.length;
	for (y = 0; y < a; y++) {
		rem[remlinks[y]] = 1;
	}

	//what hotkeys?
	var hks = getValue('ourhotkeys', '');
	var hotkeys = [];
	var hotk = [];
	hks = hks.split('*');
	a = hks.length;
	for (y = 0; y < a; y++) {
		hotk = hks[y].split('|');
		hotkeys[hotk[0]] = hotk[1];
	}

	//get # of submenu's
	var tables = $X('//div[not(@id="_firebugConsole")]').getElementsByTagName('table').length;
	var subs = tables / 2;
	if (db.innerHTML.search('./crewstats.php') != -1) { //check for crew submenu
		subs--;
	}
	//get # of buttons in submenu's
	var buttons = [];
	for (i = 1, j = 0; i <= subs; i++, j++) {
		var num = parseInt($X('/html/body//div/table[' + (i) + ']/tbody/tr' + (i == 1 ? '' : '[2]') + '/td/div/table/tbody').getElementsByTagName('tr').length, 10);
		buttons[j] = num;
		if (i == subs) { //BETA QL thingy
			buttons[j]--;
		}
	}

	var xp_tr, xp_a, href, a, link, but, content; //pref vars
	if (!dls) { //normal menu
		var removed = 0;
		for (i = subs; i >= 1; i--) {
			removed = 0;
			for (j = buttons[i-1]; j >= 1; j--) {
				xp_tr = '/html/body//div/table['+i+']/tbody/tr'+(i==1?'':'[2]')+'/td/div/table/tbody/tr['+j+']';
				xp_a = xp_tr + '/td/a';
				href = $X(xp_tr + '/td/a').href;
				a = href.split("/");
				link = a[(a.length-1)];
				if (link == '' || link == 'index.php') {
					link = a[(a.length-2)];
				}
				if (rem[link]) {
					$Del(xp_tr);//delete it!
					removed++;
				} else if (hotkeys[link]) {//look for a hotkey
					var but = $X(xp_tr + '/td/a');
					but.accessKey = hotkeys[link];//add it too!
					but.innerHTML = but.innerHTML + ' ('+ hotkeys[link].toUpperCase() +')';
					but.addEventListener('focus', function(){this.blur();}, false);
				}
			}
			if (removed == buttons[i-1] && i < subs) {
				$Del('/html/body//div/table['+i+']');//remove entire submenu
			}
		}
	} else if (dls.indexOf('?menu') != -1) { //changing menu
		for (i = 1, q = 1; i <= subs; i++) {
			for (j = 1; j <= buttons[i-1]; j++, q++) {
				xp_tr = '/html/body//div/table['+i+']/tbody/tr'+(i==1?'':'[2]')+'/td/div/table/tbody/tr['+j+']';
				xp_a = xp_tr + '/td/a';
				href = $X(xp_a).href;
				//making up the link
				a = href.split("/");
				link = a[(a.length-1)];
				if (link == '' || link == 'index.php') {
					link = a[(a.length-2)];
				}
				content = $X(xp_a).innerHTML;
				$X(xp_tr).innerHTML = '<td id="beyondadd"><input type="checkbox" checked="checked" id="cb['+q+']" value="'+link+'" /></td><td><a target="main" onmousedown="return false;" href="'+href+'" class="menuOmertaBeyond">'+content+'</a></td>';
				if (rem[link]) {
					getID('cb['+q+']').checked = false;
				}
			}
		}

		//add save button
		$X('//td[@class="container"]').setAttribute('style', 'padding: 5px; padding-left: 30px !important');
		$X('//td[@class="container"]').innerHTML = '<input type="button" value="Save!" id="save_button" />';

		getID('save_button').addEventListener('click', function() {
			var letsrem = '';
			for (i = 1; i <= totlinks; i++) {
				if (getID('cb['+i+']').checked == false) {
					//assembling string for pages we want gone
					letsrem += getID('cb['+i+']').value + '*';
				}
			}
			letsrem = letsrem.substr(0, (letsrem.length - 1));
			setValue('remlinks', letsrem);

			$X('html/body').innerHTML = '<span class="red">Menu'+lang.cusmenu[1]+'</span>'+$X('html/body').innerHTML;//succes msg
			$X('html/body').style.backgroundColor=getValue('titleBg', '#3F505F');
			setTimeout(function() { location.href='menu.php'; }, 1500);//refresh to see our results
		}, true);
	} else if (dls.indexOf('?keys') != -1) { //changing hotkeys
		for (i = 1, q = 1; i <= subs; i++) {
			for (j = 1; j <= buttons[i-1]; j++, q++) {
				xp_tr = '/html/body//div/table['+i+']/tbody/tr'+(i==1?'':'[2]')+'/td/div/table/tbody/tr['+j+']';
				xp_a = xp_tr + '/td/a';
				href = $X(xp_a).href;
				//making up the link
				a = href.split("/");
				link = a[(a.length-1)];
				if (link == '' || link == 'index.php') {
					link = a[(a.length-2)];
				}
				content = $X(xp_a).innerHTML;
				$X(xp_tr).innerHTML = '<td id="beyondadd"><input type="hidden" id="cb['+q+']" value="'+link+'" /><input type="text" onChange="checkKey(this.id)" style="text-align:center; -moz-border-radius:4px; border-radius:4px; padding-left:3px" maxlength="1" id="ip'+q+'" /></td><td><a target="main" onmousedown="return false;" href="'+href+'" class="menuOmertaBeyond">'+content+'</a></td>';
				if (hotkeys[link]) {
					getID('ip'+q).value = hotkeys[link];
				}
			}
		}

		//add save button
		$X('//td[@class="container"]').setAttribute('style', 'padding: 5px; padding-left: 30px !important');
		$X('//td[@class="container"]').innerHTML = '<input type="button" value="Save!" id="save_button" />';

		getID('save_button').addEventListener('click', function() {
			var shotkeys = '';
			for (i = 1; i <= totlinks; i++) {
				if (getID('ip'+i).value != '') {
					shotkeys += getID('cb['+i+']').value+'|'+getID('ip'+i).value+'*';
				}
			}
			shotkeys = shotkeys.substr(0, (shotkeys.length - 1));
			setValue('ourhotkeys', shotkeys);

			$X('html/body').innerHTML = '<span class="red">Hotkey'+lang.cusmenu[1]+'</span>'+$X('html/body').innerHTML;//succes msg
			$X('html/body').style.backgroundColor=getValue('titleBg', '#3F505F');
			setTimeout(function() { location.href='menu.php'; }, 1500);//refresh to see our results
		}, true);

	}
	if (!dls) {
		//add action buttons (change menu, change hotkeys, reset menu)
		$X('//td[@class="container"]').innerHTML = $X('//td[@class="container"]').innerHTML + '<span class="quicklook">Menu: <img onmouseover="style.cursor=\'pointer\'" title="'+lang.cusmenu[3]+'" onClick="location.href=\'menu.php?menu\'" src="'+GM_getResourceURL('buttonMenu')+'" style="vertical-align:-2px" /> <img onMouseover="style.cursor=\'pointer\'" title="'+lang.cusmenu[4]+'" onClick="location.href=\'menu.php?keys\'" src="'+GM_getResourceURL('buttonKey')+'" style="vertical-align:-2px" /> <img id="reset_button" onMouseover="style.cursor=\'pointer\'" title="'+lang.cusmenu[5]+'" src="'+GM_getResourceURL('buttonReset')+'" style="vertical-align:-2px" /></span>';
		getID('reset_button').addEventListener('click', function() {
			if (confirm(lang.cusmenu[0])) { // are you sure?
				setValue('remlinks', ''); //reset
				setValue('ourhotkeys', '');
			}
			setTimeout(function() { location.href='menu.php'; }, 250);
		}, true);
	}
	$X('//td[@class="container"]').setAttribute('colspan', '2');
	//addept quick lookup colspan to match customs interface's

	//beautify for fully collapsed menu in dark theme
	$X('//div[@id="menubg"]').style.borderRight = '1px solid #666';
	$X('//div[@id="menubg"]').style.width = '99.5%';

	//extra city checker
	menuCity = $I('//th[@id="travel_cityname"]');
	for (i=0;i<8;i++) {
		if (menuCity.search(lang.cities[i])!=-1) {
			setPow('bninfo',2,i+4);
		}
	}

	//Preserve state of menu captions
	$x('//th').forEach(function($n){
		var caps = getValue('menuCaption', '');
		if(caps.search($n.innerHTML)!=-1){
			if($n.innerHTML == 'Beyond'){ //apperently we don't use textNodes which messes up the path :D
				var caption = $n.parentNode.nextSibling.firstChild.firstChild;
			} else {
				var caption = $n.parentNode.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling;
			}
			caption.style.display = 'none';
		}
		$n.addEventListener('click', function(e){
			if(e.target.innerHTML == 'Beyond'){ //apperently we don't use textNodes which messes up the path :D
				var caption = e.target.parentNode.nextSibling.firstChild.firstChild;
			} else {
				var caption = e.target.parentNode.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling;
			}
			setTimeout(function(){ //add delay to allow full motion
				var name = e.target.innerHTML;
				var names = getValue('menuCaption', '');
				if(names.search(name)==-1){
					names += name; //save as collapsed
				} else { //
					names = names.replace(name,''); //remove from collapsed list
				}
				setValue('menuCaption', names);
			}, 1000);
		}, true);
	});
}

//---------------- Contact page 'tweaks' ----------------
if (dlp == '/contact.php' || dlp == '/html/poll/poll.php') {
	if (whoami) {
		$X('//input[@class="poll_input"]').value = whoami;
		if ($X('//select[@class="poll_inputt"]')) {
			$X('//select[@class="poll_inputt"]').focus();
		} else {
			$X('//textarea[@class="poll_textarea"]').focus();
		}
	} else {
		if (dlp == '/contact.php') {
			$X('//input[@class="poll_input"]').focus();
		}
	}
}

//---------------- 3-letter code protection and charcode filter ----------------
if (dlp == '/jail.php' || dlp == '/iminjail.php' || (dlp == '/kill.php' && dls != '?action=hire') || dlp == '/smuggling.php' || dlp == '/bullets2.php' || (dlp == '/BeO/webroot/index.php' && (dls == '?module=Crimes' || dls == '?module=Cars'))) {
	function CP(node) {
		var submit = $X('//input[@type="submit"]');
		if (prefs[0]) {
			submit.style.textDecoration = 'line-through';
			submit.setAttribute('disabled', 1);

			node.addEventListener('keypress', function () {
				function enable() {
					if (node.value.length == 3) {
						submit.removeAttribute('disabled');
						submit.style.textDecoration = 'none';
					} else {
						submit.setAttribute('disabled', 1);
						submit.style.textDecoration = 'line-through';
					}
				}
				setTimeout(enable, 1);
			}, true);

		}

		// add focus on text field again after reloading image
		$X('//img[@id="imgcode"]').addEventListener('click', function () {
			node.focus();
		}, true);

		node.setAttribute('maxLength', '3');
		node.setAttribute('onkeypress', 'javascript:var lettercode=event.charCode;var symcode = event.keyCode;return (lettercode>=48 && lettercode<=57 || lettercode>=65 && lettercode<=90 || lettercode>=97 && lettercode<=122 || symcode>=37 && symcode<=40 || symcode==8 || symcode==9 || symcode==13 || symcode==46 || symcode==116)? true : false;');
	}

	if ($X('//img[@id="imgcode"]')) { //check for image code
		var input = getELNAME('ver'); //jail, iminjail, kill, smuggling
		if (input[0]) {
			CP(input[0]);
		} else {
			var input = getELNAME('ver_sys'); //bullets
			if (input[0]) {
				CP(input[0]);
			}
			var input = getELNAME('ver_bull'); //bullets
			if (input[0]) {
				CP(input[0]);
			} else {
				var input = $X('//input[@type="text"]'); //crimes/cars
				if (input) {
					CP(input);
				}
			}
		}
	}
}

//---------------- Info Grabber ----------------
//pref bnUpdate and wait for a caller
function bnUpdate(current){
	var xpath = current ? '//div[@id="smsdivcontainer"]' : '//div[@id="str2dom"]';//use current page OR xhr str2dom
	var tables = $x(xpath + '//table[@class="thinline"]');
	var values = tables[0].getElementsByTagName('td');

	var nick = values[3].textContent.split(' ')[0];
	var rank = values[13].textContent;
	var city = values[19].textContent;
	var type = values[17].textContent;
	var health = 100 - parseInt($X(xpath = '//td[@bgcolor="green"]').getAttribute('width'));
	var ride = tables[3].getElementsByTagName('td')[3].textContent;

	setValue('bloodType',type);//save
	setValue('nick',nick);

	//define max b/n judging by rank
	var ranks = ['Empty-suit', 'Delivery Boy', 'Delivery Boy', 'Picciotto', 'Shoplifter', 'Pickpocket', 'Thief', 'Associate', 'Mobster', 'Soldier', 'Swindler', 'Assassin', 'Local Chief', 'Chief', 'Bruglione', 'Capodecina', 'Godfather', 'First Lady'];
	var maxBooze = [1, 2, 2, 5, 7, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 70, 70];
	var maxNarcs = [0, 0, 0, 1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 20, 20, 20];
	for(booze=0,narc=0, i=0;i<=17;i++){
		if(ranks[i]==rank){
			booze = maxBooze[i]; narc = maxNarcs[i];
			break;
		}
	}
	setPow('bninfo', 0, narc);//save
	setPow('bninfo', 1, booze);

	//parse city to ID
	for(var cityCode=0, i=0;i<8;i++){
		if(city == lang.cities[i]){
			cityCode = i+4;
			break;
		}
	}
	setPow('bninfo', 2, cityCode);//save

	//parse plane to ID
	var rides = ['none', 'geen', 'Fokker DR-1' ,'Havilland DH 82A' ,'Fleet 7', 'Douglas DC-3'];
	for(plane=0, i=0;i<=5;i++){
		if(rides[i] == ride){
			plane = [0, 0, 1, 2, 3, 4][i];
			break;
		}
	}
	setPow('bninfo', 3, plane);//save
}

if(dlp != '/menu.php' && dlp != '/banner.php' && dlp != '/info.php' && dlp != '/pic.php' && dlp != '/mid.php' && dlp != '/right.php' && dlp != '/main.php') {
	var d = new Date();//check once every hour for new info
	if( getValue('nick', '')=='' || getValue('bninfo', -1)==-1 || getValue('brcDate', -1) != d.getHours()){
		GM_xmlhttpRequest({
			method:'GET',
			url:'/information.php', //get info from /information.php
			onload:function(response){
				var a = response.responseText.split('<tbody');
				if(a[2]){//fails on clicklimit or other error
					var str2dom = cEL('div');//we'd like to use DOM here
					str2dom.style.display = 'none';
					str2dom.id = 'str2dom';
					str2dom.innerHTML = response.responseText;
					db.appendChild(str2dom);
					bnUpdate(0);//call update fucntion

					GM_xmlhttpRequest({//grab family and position from profile
						method:'GET',
						url:'/user.php?nick='+getValue('nick', ''),
						onload:function(resp){
							var dummy = cEL('div');//we'd like to use DOM here
							dummy.style.display = 'none';
							dummy.id = 'xhr';
							dummy.innerHTML = resp.responseText;
							db.appendChild(dummy);
							if($X('//div[@id="xhr"]')) {
								var role = 1;//default is in a family
								var pos = $X('//div[@id="xhr"]//span[@id="position"]').getAttribute('value');
								var fam = $X('//div[@id="xhr"]//span[@id="family"]').getAttribute('value');

								if(/None|Geen/.test(fam)){
									role = 0;
								} else {
									if(/Capo (of|van):/.test(pos)){
										role = 2;
									}
									if(/(Sottocapo|Consiglieri|Don) (of|van):/.test(pos)){
										role = 3;
									}
								}
								setValue('family',fam);
								setPow('bninfo',4,role);//save
							}
							var d = new Date();//set check date
							setValue('brcDate', d.getHours());
						}
					});
				}
			}
		});
	}

	//grab Lex level once a day
	if(getValue('lexDay', -1) != d.getDay()) {
		GM_xmlhttpRequest({
			method:'GET',
			url:'/BeO/webroot/index.php?module=Bodyguards&action=', //get info from BG page
			onload:function(response){
				var str2dom = cEL('div');//we'd like to use DOM here
				str2dom.style.display = 'none';
				str2dom.id = 'str2dom';
				str2dom.innerHTML = response.responseText;
				db.appendChild(str2dom);

				if($X('//div[@id="str2dom"]//h2')) { //see we didn't hit clicklimit or worse
					var found = 0;
					$x('//div[@id="str2dom"]//h2').forEach(function($n) { //loop <h2>
						if ($n.innerHTML.search('Lex')>-1) { //get lex
							setValue('lex', parseInt($n.innerHTML.split(' ').reverse()[1]));
							found = 1;
						}
					});
					if (!found) {
						setValue('lex', 0);
					}
					d = new Date();
					setValue('lexDay', d.getDay());
					setValue('lexHour', d.getHours());
				}
			}
		});
	}
}
if (dls.indexOf('?module=Travel&action=TravelNow') != -1) { //Get city when traveling
	if (db.innerHTML.search('<table') != -1) {
		var city = 0; //initialize to default for anything else
		var text = getTXT('//font');
		text = text.split(' ');
		text = text[(text.length - 1)];
		var citys = ['Detroit', 'Chicago', 'Palermo', 'York', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'];
		for (i = 0; i < citys.length; i++) {
			if (citys[i] == text) {
				city = (i + 4);
			}
		}
		if (city) {
			setPow('bninfo', 2, city); //if traveled, save new city
			setTimeout(function(){ top.frames[0].frames[3].location='/marquee.php'; }, 1000);
		}
	}
}
if (dls.indexOf('?module=Travel&action=FetchInfo') != -1) {
	if(GetParam('travel')){
		$X('//form').submit();
	}
}
//---------------- My Account / Statuspage ----------------
if (dls == '?module=Launchpad') {
	var carTracker, crimeTracker, crimemoney, carmoney, interest, bankleft, pad, x, famXP, x2, x3, planeXP, handgunXP, tommygunXP, bguardsXP, jailBustXP, bustTracker, carnicks, cartxt, crimes, crimetxt, isCapo, capo;
	carTracker = getValue('cars', 0);
	crimeTracker = getValue('crimes', 0);
	crimemoney = getValue('crimemoney', 0);
	carmoney = getValue('carmoney', 0);
	interest = getValue('interest', 0);
	banktleft = getValue('banktleft', 0);
	function runCode(tab) {
		if (tab == '/information.php') {
			pad = '//div[@id="smsdivcontainer"]';
			x = pad + '//center/table/tbody/tr/td/table/tbody/tr[';
			famXP = x + '4]/td[2]';
			x2 = pad + '//center/table/tbody/tr/td[3]/table[2]/tbody/tr[';
			x3 = pad + '//center/table/tbody/tr/td[3]/table[4]/tbody/tr[';
			planeXP = x2+'3]/td[2]';
			handgunXP = x2+'5]/td[2]';
			tommygunXP = x2+'6]/td[2]';
			bguardsXP = x2+'7]/td[2]';
			jailBustXP = pad + '//center/table/tbody/tr/td[3]/table[1]/tbody/tr[';
			bustTracker = $X(pad+'//center/table/tbody/tr/td[3]/table[4]/tbody/tr[3]/td[2]').innerHTML;
			bustTracker = parseInt(bustTracker.replace(/,/g, ''), 10);
			carnicks = x3+'5]/td[2]';
			cartxt = x3+'5]/td[1]';
			crimes = x3+'4]/td[2]';
			crimetxt = x3+'4]/td[1]';

			setTimeout(function() {
				setValue('bustouts', bustTracker);
			}, 0);

			$X('//table[@class="thinline"][3]/tbody/tr[4]/td/a').innerHTML = '<b>'+ $X('//table[@class="thinline"][3]/tbody/tr[4]/td/a').innerHTML +'</b>';
			//cosmetic fix devs forgot

			if (prefs[6]) {//if remove Jailbusting Skill is on
				$Del(jailBustXP + '5]');
			}
			if (prefs[22]) {
				if (prefs[6]) {
					$Del(jailBustXP + '5]');//if remove both 'Race form bar' and 'Jailbusting Skill' is on
				} else {
					$Del(jailBustXP + '6]');//if remove Race form bar is on
				}
			}

			if (/user/.test($X(x+'5]/td[2]').innerHTML)) {
				isCapo = getTXT(x+'5]/td[2]').split(' ')[1];
				if (prefs[12] && /Capo/.test(isCapo)) {//if remove Capo Money is on
					capo = getTXT(x+'5]/td[2]').split(' ')[0];
					$X(x+'5]/td[2]').innerHTML = '<a href="/user.php?nick=' + capo + '">'+ capo +'</a>';
				}
			}

			//linkify player nick
			$X(x+'12]/td[2]').innerHTML = '<a href="/user.php?nick=' + getTXT(x+'12]/td[2]').split('\t')[1] + '">'+ getTXT(x+'12]/td[2]').split('\t')[1] +'</a>';

			if (/\bTranslation\b/.test(getTXT(x+'6]/td[2]'))) {//Translation link
				$I(x+'6]/td[2]', '<a href="http://dev.barafranca.com/translate/" target="_blank">'+getTXT(x+'6]/td[2]')+'</a>');
			}

			if ($X(famXP) && lang.status[1].match(getTXT(famXP))) {//Family status
				$I(famXP, '<a href="/family_recruitment.php"><b>'+getTXT(famXP)+'</b></a>');
			}

			if ($X(famXP) && getTXT(famXP) != lang.status[1]) {//Set family if in one
				setValue('family', getTXT(famXP));
			}

			var inbank = parseInt($X('//table[@class="thinline"][3]/tbody/tr[4]/td[2]/a').innerHTML.replace(/,/g, '').replace(/\s/g, '').replace('$', ''), 10);
			if (inbank > 0 && interest > 0) {
				var tr = cEL('tr');
				var timestamp = Math.round(parseInt(new Date().getTime(), 10) / 1000);
				if (timestamp > banktleft) {
					var when = '<b><font color="red">'+lang.status[9]+'</font></b>';
				} else {
					var left = (banktleft - timestamp);
					var h = Math.floor(left / 3600);
					var m = Math.floor((left % 3600) / 60);
					var s = Math.floor(left % 60);
					var when = lang.status[8]+' '+h+'h '+m+'m '+s+'s';
				}
				tr.innerHTML = '<td><b>'+lang.status[7]+'</b></td><td><a href="/bank.php">$ '+commafy(interest)+' ('+when+')</a></td>';
				$x('//table[@class="thinline"]')[4].appendChild(tr);
			}

			if (prefs[35]) { // crime/car trackers
				var perc = rounding(parseInt(crimeTracker,10)/parseInt($X(crimes).innerHTML.replace(',', '').trim(),10));
				var perc2 = isNaN(perc) ? 0 : perc;
				$X(crimetxt).innerHTML = $X(crimetxt).innerHTML +'<b>/'+lang.status[2]+'</b>';
				$X(crimes).innerHTML = $X(crimes).innerHTML +'/'+commafy(crimeTracker)+'&nbsp;('+perc2+'%)';

				var perc3 = rounding(parseInt(carTracker,10)/parseInt($X(carnicks).innerHTML.replace(',', '').trim(),10));
				var perc4 = isNaN(perc3) ? 0 : perc3;
				$X(cartxt).innerHTML = $X(cartxt).innerHTML +'<b>/'+lang.status[2]+'</b>';
				$X(carnicks).innerHTML = $X(carnicks).innerHTML +'/'+commafy(carTracker)+'&nbsp;('+perc4+'%)';

				var crimetr = cEL('tr');
				var crimeavg = Math.round(parseInt(crimemoney,10)/parseInt(crimeTracker,10));
				var crimeavg = isNaN(crimeavg) ? 0 : crimeavg;
				crimetr.innerHTML = '<td><b>'+lang.status[3]+'</b></td><td>$ '+commafy(crimemoney)+' ($'+commafy(crimeavg)+'/'+lang.status[4]+')</td>';
				$x('//table[@class="thinline"]')[4].appendChild(crimetr);

				var cartr = cEL('tr');
				var caravg = Math.round(parseInt(carmoney,10)/parseInt(carTracker,10));
				var caravg = isNaN(caravg) ? 0 : caravg;
				cartr.innerHTML = '<td><b>'+lang.status[5]+'</b></td><td>$ '+commafy(carmoney)+' ($'+commafy(caravg)+'/'+lang.status[6]+')</td>';
				$x('//table[@class="thinline"]')[4].appendChild(cartr);
			}

			$x('//a[contains(@href,"shoptabs=7")]')[0].setAttribute('href', '/BeO/webroot/index.php?module=Bloodbank&action=');//next bloodbuy
			$x('//a[contains(@href,"shoptabs=7")]')[1].setAttribute('href', '/BeO/webroot/index.php?module=Bloodbank&action=');//timer
			$X(bguardsXP).innerHTML = '<a href="/BeO/webroot/index.php?module=Bodyguards&action=">'+$X(bguardsXP).innerHTML+'</a>';
			if ($X(planeXP) && lang.status[0].match(getTXT(planeXP))) {
				$I(planeXP, '<a href="/BeO/webroot/index.php?module=Shop&shoptabs=4"><b>'+getTXT(planeXP)+'</b></a>');
			}
			if ($X(handgunXP) && lang.status[0].match(getTXT(handgunXP))) {
				$I(handgunXP, '<a href="/BeO/webroot/index.php?module=Shop&shoptabs=1"><b>'+getTXT(handgunXP)+'</b></a>');
			}
			if ($X(tommygunXP) && lang.status[0].match(getTXT(tommygunXP))) {
				$I(tommygunXP, '<a href="/BeO/webroot/index.php?module=Shop&shoptabs=1"><b>'+getTXT(tommygunXP)+'</b></a>');
			}
		}
		if (tab == '/profile.php' && prefs[14]) {//remove kill passwords
			for (i=9;i>1;i--) {
				$Del('//div[@id="smsdivcontainer"]//center/table/tbody/tr[5]');
			}
		}
		nickReader();//apply nickReader again
	}

	//grab ajax event
	getID('smsdivcontainer').addEventListener('DOMNodeInserted', function (event) {
		if (event.target.innerHTML.search('<b>Status</b>') != -1 || event.target.innerHTML.search('<b>Your profile </b>') != -1) {
			runCode(selectedTab());//we found html in the Node => run the code
		}
	}, false );

	//Try and grab info on page load
	var attempt = setInterval(function() {//using setInterval to enable use of setValue which fails in eventListener above
		if($X('//a[contains(@href, "/BeO/webroot/index.php?module=Crimes")]')){//if page contains crime timer
			clearInterval(attempt);
			bnUpdate(1);//call update function


		}
	},1000);//no rush on updating bninfo, wait for page to load properly

	//Grab latest theme colors for our external pages
	setValue('bodyBg', getActualHex($X('//body'), 'background-color'));
	setValue('titleBg' ,getActualHex($X('//a[@class="selected"]'), 'background-color'));
	var dummy = cEL('table'); dummy.id = 'dummyT'; dummy.setAttribute('class', 'thinline'); db.appendChild(dummy);
	setValue('tableBg', getActualHex($X('//table[@id="dummyT"]'), 'background-color'));
	$Del('//table[@id="dummyT"]');
	setValue('fontClr', getActualHex($X('//body'), 'color'));
}

//---------------- Bodyguards -----------------------------------
if ((dls == '?module=Shop') || dls.indexOf('?module=Bodyguards') != -1 && dlp.indexOf('&action=obay_details') == -1){
	var color = getValue('tableBg', '#F0F0F0');
	function grabLex() { //grab Lex level for BRC
		var found = 0;
		$x('//h2').forEach(function($n) { //loop <h2>
			if ($n.innerHTML.search('Lex')>-1) { //get lex
				setValue('lex', parseInt($n.innerHTML.split(' ').reverse()[1]));
				found = 1;
			}
		});
		if (!found) {
			setValue('lex', 0);
		}
		d = new Date();
		setValue('lexDay', d.getDay());
		setValue('lexHour', d.getHours());
	}
	function bgspage() {
		var path = '//div[@class="otable widetable"][1]/center/table';
		var a = $x(path).length; //amount of bg's you own
		var bgsname = [];
		var bgsid = [];
		var bgslvl = [];
		var bgsatt = [];
		var bgsdef = [];
		var bgsspec = [];
		var bgscost = [];
		var totatt = 0;
		var totdef = 0;
		var totcost = 0;
		var totlvls = 0;
		var attplvl, defplvl, statt, stdef, startc, deflvl, attlvl;
		var trdump = '';

		//looping through all bg's and storing values
		for (y = 1; y <= a; y++) {
			var c = 0;
			var bgname = getTXT(path+'['+y+']/tbody/tr/td/h2');
			var bgarr = bgname.match(/(\w+) - ID (\d+)  - Level (\d+) /);
			bgsname[y] = bgarr[1];
			bgsid[y] = bgarr[2];
			bgslvl[y] = parseInt(bgarr[3], 10);
			bgsatt[y] = parseInt(getTXT('//*[@id="jsprogbar_div_attack_'+bgarr[1]+'"]'), 10);
			bgsdef[y] = parseInt(getTXT('//*[@id="jsprogbar_div_defense_'+bgarr[1]+'"]'), 10);
			if ($X('//*[@id="jsprogbar_div_special_'+bgarr[1]+'"]') != null) {
				bgsspec[y] = parseInt(getTXT('//*[@id="jsprogbar_div_special_'+bgarr[1]+'"]'), 10);
			} else { //special doesn't exist for this bg
				bgsspec[y] = 0;
			}
			//calcing total costs of the bg
			//http://gamewiki.barafranca.com/index.php?title=Bodyguards_NL#De_bodyguards
			attplvl = (bgsname[y] == 'Ike')?4:(bgsname[y] == 'Joe')?3:(bgsname[y] == 'Lee')?1:(bgsname[y] == 'Lex')?2:(bgsname[y] == 'Ray')?1:(bgsname[y] == 'Vic')?8:0;
			defplvl = (bgsname[y] == 'Ike')?7:(bgsname[y] == 'Joe')?6:(bgsname[y] == 'Lee')?10:(bgsname[y] == 'Lex')?5:(bgsname[y] == 'Ray')?5:(bgsname[y] == 'Vic')?3:0;
			statt = (bgsname[y] == 'Ike')?10:(bgsname[y] == 'Joe')?0:(bgsname[y] == 'Lee')?0:(bgsname[y] == 'Lex')?0:(bgsname[y] == 'Ray')?0:(bgsname[y] == 'Vic')?20:0;
			stdef = (bgsname[y] == 'Ike')?25:(bgsname[y] == 'Joe')?25:(bgsname[y] == 'Lee')?50:(bgsname[y] == 'Lex')?10:(bgsname[y] == 'Ray')?10:(bgsname[y] == 'Vic')?0:0;
			startc = (bgsname[y] == 'Ike')?50000:(bgsname[y] == 'Joe')?50000:(bgsname[y] == 'Lee')?100000:(bgsname[y] == 'Lex')?1000000:(bgsname[y] == 'Ray')?10000:(bgsname[y] == 'Vic')?250000:0;

			c += startc;
			att = ((bgsatt[y] - statt) / attplvl);
			def = ((bgsdef[y] - stdef) / defplvl);

			if (att > 0) {
				c += 25000;
				if (att > 1) {
					c += 55000;
					if (att > 2) {
						c += 90000;
						if (att > 3) {
							c += 135000;
							if (att > 4) {
								c += 190000;
								if (att > 5) {
									c += 260000;
									if (att > 6) {
										c += 345000;
										if (att > 7) {
											c += 450000;
											if (att > 8) {
												c += 575000;
												if (att > 9) {
													c += 725000;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (def > 0) {
				c += 25000;
				if (def > 1) {
					c += 55000;
					if (def > 2) {
						c += 90000;
						if (def > 3) {
							c += 135000;
							if (def > 4) {
								c += 190000;
								if (def > 5) {
									c += 260000;
									if (def > 6) {
										c += 345000;
										if (def > 7) {
											c += 450000;
											if (def > 8) {
												c += 575000;
												if (def > 9) {
													c += 725000;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (bgsspec[y]> 0) {
				c += 25000;
				if (bgsspec[y]> 1) {
					c += 55000;
					if (bgsspec[y]> 2) {
						c += 90000;
						if (bgsspec[y]> 3) {
							c += 135000;
							if (bgsspec[y]> 4) {
								c += 190000;
								if (bgsspec[y]> 5) {
									c += 260000;
									if (bgsspec[y]> 6) {
										c += 345000;
										if (bgsspec[y]> 7) {
											c += 450000;
											if (bgsspec[y]> 8) {
												c += 575000;
												if (bgsspec[y]> 9) {
													c += 725000;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			bgscost[y] = c;
			totatt += bgsatt[y];
			totdef += bgsdef[y];
			totcost += bgscost[y];
			totlvls += bgslvl[y];
			if (bgsspec[y] > 0) {
				var showspec = bgsspec[y];
			} else {
				var showspec = '&nbsp;' //just leave it blank in that case
			}
			trdump += '<tr style="background-color:'+color+'">';
			trdump += '<td style="text-align:center;">'+bgsname[y]+'</td>';
			trdump += '<td style="text-align:center;"><a href="http://'+dlh+'/obay.php?action=tosell&type=14&id='+bgsid[y]+'">'+bgsid[y]+'</td>';
			trdump += '<td style="text-align:center;">'+bgslvl[y]+'</td>';
			trdump += '<td style="text-align:center;">'+bgsatt[y]+'</td>';
			trdump += '<td style="text-align:center;">'+bgsdef[y]+'</td>';
			trdump += '<td style="text-align:center;">'+showspec+'</td>';
			trdump += '<td style="text-align:center;">$'+commafy(bgscost[y])+'</td>';
			trdump += '</tr>';
		}
		trdump += '<tr><td colspan="7" height="1" bgcolor="black"></td></tr>';
		trdump += '<tr style="background-color:'+color+'">';
		trdump += '<td style="text-align:center;">'+lang.bgov[8]+':</td>';
		trdump += '<td style="text-align:center;">&nbsp;</td>';
		trdump += '<td style="text-align:center;">'+rounding(totlvls / 50)+'% '+lang.bgov[11]+'</td>';
		trdump += '<td style="text-align:center;">'+lang.bgov[9]+': '+totatt+'</td>';
		trdump += '<td style="text-align:center;">'+lang.bgov[10]+': '+totdef+'</td>';
		trdump += '<td style="text-align:center;">&nbsp;</td>';
		trdump += '<td style="text-align:center;">$'+commafy(totcost)+'</td>';
		trdump += '</tr>';

		var div = cEL('div');
		var c = cEL('center');
		var br = cEL('br');
		div.setAttribute('style', 'background-color:'+color+', border:1px solid black; color:#FFF');
		div.id = 'bgov';
		div.innerHTML = '<table class="thinline" style="width:620px"><tr><td class="tableheader">'+lang.bgov[1]+'</td><td class="tableheader">'+lang.bgov[2]+'</td><td class="tableheader">'+lang.bgov[3]+'</td><td class="tableheader">'+lang.bgov[4]+'</td><td class="tableheader">'+lang.bgov[5]+'</td><td class="tableheader">'+lang.bgov[6]+'</td><td class="tableheader">'+lang.bgov[7]+'</td></tr><tr><td colspan="7" height="1" bgcolor="black"></td></tr>'+trdump+'<table>';
		c.appendChild(div);
		c.appendChild(br);
		if ((dls.indexOf('?module=Shop') != -1 && db.innerHTML.search('/static/images/game/bodyguards/lee') != -1) || (dls.indexOf('?module=Bodyguards&action=') != -1 && db.innerHTML.search('smsdivcontainer')>-1) ) {
			$X('//div[@id="smsdivcontainer"]').insertBefore(c, $X('//div[@class="otable widetable"]'));
		}
		if (dls.indexOf('?module=Bodyguards') != -1 || dls.indexOf('?module=Bodyguards&action=') != -1) {
			db.insertBefore(c, $X('//div[@class="otable widetable"]'));
		}
	}
	//eventListeners
	if (dls.indexOf('?module=Shop') != -1 || (dls.indexOf('?module=Bodyguards&action=') != -1 && db.innerHTML.search('smsdivcontainer')>-1) ) { //via Shop
		getID('smsdivcontainer').addEventListener('DOMNodeInserted', function (event) { //wait for DOM
			if (event.target.innerHTML.search('/static/images/game/bodyguards/lee') != -1) { //wait for BG overview node
				getID('smsdivcontainer').addEventListener('load', function() { //add onLoad eventlistener
					if(db.innerHTML.search('onceonly')==-1) { //onLoad bubbles more then once
						var foo = cEL('div'); //create hardcoded fix so we run code only once
						foo.id = 'onceonly';
						getID('smsdivcontainer').appendChild(foo);
						if(prefs[36]){
							bgspage();
						}
						grabLex();
					}
				}, true);
			}
		}, false);
	}
	if (dls.indexOf('?module=Bodyguards') != -1 || dls.indexOf('?module=Bodyguards&action=') != -1) { //via stand-alone
		if(prefs[36]){
			bgspage();
		}
		grabLex();
	}
}
//---------------- External pages theme matching ----------------
if (dlp == '/contact.php' || dlp == '/faq.php' || dlp == '/prices.php' || dlp == '/html/poll/poll.php') {
	$X('//body').setAttribute('style', 'background-color: ' + getValue('bodyBg', '#B0B0B0'));
	$x('//table[@width="90%"]//td | //table[@class="thinline"]//tr[not(@style)]').forEach(function ($n) {
		$n.setAttribute('style', 'background-color: ' + getValue('tableBg', '#F0F0F0'));
	});
	$x('//td[@class="tableheader"] | //td[@bgcolor="#3f505f"]').forEach(function ($n) {
		$n.setAttribute('style', 'background-color: ' + getValue('titleBg', '#3F505F') + '; border:1px solid black; color:#FFF; font-family:Tahoma, Verdana');
	});
}

//---------------- Strip forum avatars ----------------
if (prefs[19]) {
	if (dlp == '/forums/view-topic.php') {
		var avatarXP = '//img[contains(@src, "omertao.png")] | //img[contains(@src, "userimg")]';
		$x(avatarXP).forEach(function ($n) {
			$n.width = '';
			$n.style.border = 'none';
			$n.src = '';
		});
	}
}

//----------------- add focus on pillory --------------
if (urlsearch == '/BeO/webroot/index.php?module=Pillory') {
	if ($X('//a[contains(@href, "?module=Pillory&action=throw&id=")]')) {
		$X('//a[contains(@href, "?module=Pillory&action=throw&id=")]').focus(); //add focus on first available Throw
	}
}

//---------------- Bullet form ----------------
if (dlp == '/bullets2.php' && db.innerHTML.search(/table/i) != -1) { //If auto fill form is on AND bullet tables exist
	var x, path, bf;
	x = '/html/body//center';
	path = '/table/tbody/tr[3]/td';
	if (db.innerHTML.indexOf(lang.bullettracker[6]) == -1 && getELNAME('produce')[0] == null) {
		if (getELNAME('become')[0] == null) { // no owner fix
			bf = $I(x + '[2]' + path).split('<br>')[4].replace(',', '').match(/\d+/g)[0];
			$X('//fieldset//input[@type="text"][@name="amount_bull"]').value = bf;
		}
	}
}
if (prefs[7] && dlp == '/bullets2.php') { //if return back after wrong buy is on
	if (db.innerHTML.search(lang.failedBullets[0]) != -1 || db.innerHTML.search(lang.failedBullets[1]) != -1 || db.innerHTML.search(lang.failedBullets[2]) != -1 || db.innerHTML.search(lang.failedBullets[3]) != -1 || db.innerHTML.search(lang.failedBullets[5]) != -1 || db.innerHTML.search(lang.failedBullets[6]) != -1) {
		var fail = db.textContent;
		setTimeout(function () {
			window.location = 'bullets2.php?fail='+fail;
		}, 0);
	}
}
if(dls.search('fail') != -1){
	var fail = GetParam('fail');
	var span = cEL('span');
	span.innerHTML = '<b>'+fail+'</b><br />';
	db.firstChild.insertBefore(span, $X('//table[@class="thinline"]'));
}

//---------------- OB/Edo News ----------------
if(dlp == '/info.php'){
	if(prefs[2]) {
		function addNews(){
			//sort Omerta's news
			var oNews = $x('//div[@id="news"]');
			var oUrl=[];
			var oArticles=[];
			var oDay=[];
			var oMonth=[];
			for(i=0;i<oNews.length;i++){
				oUrl.push(oNews[i].getElementsByTagName('a')[0].href);
				oArticles.push(oNews[i].getElementsByTagName('a')[0].innerHTML);
				oDay.push(parseInt(oArticles[i].slice(0,oArticles[i].indexOf('-')),10));
				oMonth.push(parseInt(oArticles[i].slice(oArticles[i].indexOf('-')+1,oArticles[i].indexOf('<')).replace(/^0/,''),10));
			}

			var news=[];
			var url = (sets.version == '_com') ? OBnUrl+'beyond/' : 'http://www.edo-nieuws.nl/xje/xje_nieuws.php?id=';//set url prepend
			for(var o=0,f=0;(o+f)<=4;1){//loop dates
				var nextmonth=0;
				if((oDay[o]<fDay[f] && oMonth[o]<=fMonth[f]) || (oDay[o]>fDay[f] && oMonth[o]<fMonth[f] || (oDay[o]>fDay[f] && fMonth[f]== 1))){//check dates
					if(sets.version == '_com'){//ob
						news.push([url+fUrl[f],fArticles[f].replace(/ /,'<br />')]);
					} else {//edo
						news.push([url+fUrl[f],fDay[f]+'-'+(fMonth[f].toString().length==1?'0'+fMonth[f]:fMonth[f])+ ' <br />' + fArticles[f]]);
					}
					f++;//next OBnews item
				} else {
					news.push([oUrl[o],oArticles[o]]);
					o++;//next omerta item
				}
			}
			for(i=0;i<oNews.length;i++){//add to page
				var item = oNews[i].getElementsByTagName('a')[0];
				item.href = news[i][0];
				item.setAttribute('style', 'font-size:11px !important;');//manual override to make sure it keeps font-size
				if(item.href.search('barafranca')==-1) {
					var newsIcon;
					if(sets.version == '_com') {
						newsIcon = GM_getResourceURL('favoriteIco');
					} else {
						newsIcon = GM_getResourceURL('edoIco');
					}
					item.parentNode.parentNode.setAttribute('style', 'background:url(\''+newsIcon+'\') no-repeat 90% 20%;');
					//item.setAttribute('target', 'blank');
				}
				if(news[i][1].search(lang.login[2])!=-1){
					item.setAttribute('target', 'main');
				}
				item.innerHTML = news[i][1];
				oNews[i].style.height = item.offsetHeight;
			}
			//We have better news
			var times = $X('//a[contains(@href,"mag.php")]');
			times.href = sets.version=='_com' ? OBnUrl : EdoUrl;
			times.style.fontSize = '11px';
			times.innerHTML = sets.version=='_com' ? 'OBNews' : 'Edo Nieuws';
		}
		//prep arrays
		var fUrl=[];
		var fArticles=[];
		var fDay=[];
		var fMonth=[];

		if(sets.version=='_com'){//grab news from obnews rss feed
			GM_xmlhttpRequest({
				method: 'GET',
				url: OBnUrl + '/rss.php',
				onload: function(resp){
					var parser = new DOMParser();
					var dom = parser.parseFromString(resp.responseText, 'application/xml');

					item = dom.getElementsByTagName('item');
					for(i=-1; ++i<item.length-1;){//loop news items
						fUrl.push(dom.getElementsByTagName('link')[i+2].textContent.substr(-4).replace(/[^0-9]/g,''));//grab url
						fArticles.push(dom.getElementsByTagName('title')[i+2].textContent);//grab article
						if(/\d?\d-\d?\d/.test(fArticles[i])){//check for a date
							fDay.push(parseInt(/\d?\d-/.exec(fArticles[i])[0],10));//parse date from title
							fMonth.push(parseInt(/-\d?\d/.exec(fArticles[i])[0].replace('-', ''),10));
						} else {//no date, ignore it
							fUrl[i]='';
							fArticles[i]='';
							fDay[i]='';
							fMonth[i]='';
						}
					}
					for(i=item.length-1; --i>=0;){//reverse loop so we maintain array indexes
						if(fArticles[i] == ''){//it's ingore, so remove it from the array
							fArticles.splice(i,1);
							fUrl.splice(i,1);
							fDay.splice(i,1);
							fMonth.splice(i,1);
						}
					}
					addNews();//we got the news, now add it
				}
			});

			// add GC&MR link
			$X('//*[@id="newsmore"]/p').innerHTML = '<a class="menuLink" href="http://news.omertabeyond.com/beyond/gcmr" onmousedown="return false;" style="text-align:left;width:*;padding-right:0px;display:inline-block;" target="main">GC&MR</a>' + $X('//*[@id="newsmore"]/p').innerHTML;
			$X('//*[@id="newsmore"]/p/a[2]').setAttribute('style', 'text-align:right;width:50%;padding-left:0px;display:inline-block;');
		}
		if(sets.version=='_nl'){//get news from Edo mainpage
			GM_xmlhttpRequest({
				method: 'GET',
				url: EdoUrl,
				onload: function(resp){//news
					var html = resp.responseText;
					var news = html.split('<a name=\'news_');

					for(i=0;i<5;i++){
						var	n = news[(i+1)];
						fUrl.push(n.slice(0,n.indexOf('\' id')));
						fArticles.push(n.slice(n.indexOf('/a>')+3,n.indexOf('</b>')));
						n = n.slice(n.indexOf('Geplaatst door'),n.indexOf('<img src="themes/Tweaked-Blue/images/border/news/readmore.gif" />'));
						n = n.slice(n.indexOf('</a>')+8,n.indexOf('-20'));
						fDay.push(parseInt(n.slice(n.indexOf('>')+1,n.indexOf('-')),10));
						fMonth.push(parseInt(n.slice(n.indexOf('-')+1,n.indexOf('-')+3),10));
					}
					addNews();
				}
			});
		}
	}
	if (prefs[38]) { //remove Facebook API from news frame
		$Del('//select[@id="fbdropdown"]');
		$del('//iframe');
	}
}

//---------------- Jail Highlighter and Jail autoform ----------------
if (prefs[3] && dlp == '/jail.php' && $X('/html/body//form/center')) {
	//Assemble prefs
	var names = getValue('bust', '').split(',');
	var a = names.length;
	var x;
	var y = 0;
	var words = [];
	var bgColors = [];
	var prioritys = [];
	for (x = 0; x < a; ++x) {
		if (names[x] != '') {
			words[y] = names[x].split('|')[0].toUpperCase();
			if (names[x].split('|')[1] == null) {
				prioritys[y] = getValue('defprio');
			} else {
				prioritys[y] = parseInt(names[x].split('|')[1], 10);
			}
			if (names[x].split('|')[2] == null) {
				bgColors[y] = '';
			} else {
				bgColors[y] = names[x].split('|')[2];
			}
			++y;
		}
	}
	var names = getValue('nobust', '').split(',');
	var a = names.length;
	var y = 0;
	var nobust = [];
	for (x = 0; x < a; ++x) {
		if (names[x] != '') {
			nobust[y] = names[x].toUpperCase();
		++y;
		}
	}

	var maxHL = getValue('maxHL', 5);
	var bustTrackerinfo = getValue('bustouts', 0);
	var FL_prior = getValue('FL_prior', 3);
	var Fam_prior = getValue('Fam_prior', 9);
	var lowlifes = 0;

	function updateShow(el) { //set the new selected inmate in the show-row
		el.scrollIntoView(false);
		var newShow = el.parentNode.parentNode.cloneNode(1); //clone it
		var oldShow = getID('show');
		var buyout = newShow.lastChild.previousSibling.firstChild;

		oldShow.parentNode.replaceChild(newShow,oldShow); //replace old with new
		newShow.setAttribute('id', 'show');
		newShow.getElementsByTagName('input')[0].style.visibility = 'hidden'; //make show-row radio invisible, as it isn't needed there

		buyout.setAttribute('accessKey', '0');
		buyout.firstChild.innerHTML+=' [0]';
		buyout.parentNode.setAttribute('style', 'width: 100px;'); //set a fixed width to prevent glitching of td widths

		//Force actual radio to be selected, rather then the show-row radio clone
		var shown = $X('//table[@class="thinline"]').getElementsByTagName('input')[0];
		if(shown.checked == true) { //see if show-row radio is checked
			$x('//input[@value="'+shown.value+'"]')[1].checked = true;
		}
		$X('//input').focus();
	}

	//Bust Tracker
	if (db.innerHTML.substr(0, (lang.busttracker[0].length - 0)) == lang.busttracker[0]) {
		setValue('bustouts', (bustTrackerinfo + 1));
	} else {
		if (db.innerHTML.substr(0, (lang.busttracker[1].length - 0)) == lang.busttracker[1]) {
			setValue('bustouts', (bustTrackerinfo + 2));
		}
	}
	var span = cEL('span');
	var count = $X('/html/body//form/center').innerHTML.split('<br>')[1].match(/\d+/g)[0];
	span.innerHTML = '<br />&nbsp;Bust outs: ' + commafy(getValue('bustouts', 0));
	$X('//fieldset').parentNode.insertBefore(span, $X('//fieldset').nextSibling);

	//Grab ingame HL colors
	var famRGB = $x('//td[@width="125px"]')[0].style.backgroundColor;
	if (famRGB == '') {
		famHex = '';
	} else {
		famRGB = famRGB.replace(/[^0-9,]/g, '');
		famRGB = famRGB.split(',');
		famHex = '#'+RGBtoHex(famRGB[0], famRGB[1], famRGB[2]);
	}
	var friendRGB = $x('//td[@width="125px"]')[1].style.backgroundColor;
	if(friendRGB==''){
		friendHex = '';
	} else {
		friendRGB = friendRGB.replace(/[^0-9,]/g, '');
		friendRGB = friendRGB.split(',');
		friendHex = '#'+RGBtoHex(friendRGB[0], friendRGB[1], friendRGB[2]);
	}

	//Run JHL (if there are players in jail)
	count = j = 0;
	var HL_row = new Array(maxHL);
	var inJail = $x('//tr[@bgcolor]');//add priority and bgcolor to html
	if(inJail.length > 0){
		inJail.forEach(function($n){//loop inmates and check if they have a priority listed
			//Step 1 - Grab player and family name
			nicka = $n.getElementsByTagName('td')[0].innerHTML; //nicks (w/ <a>) or John Does (w/o <a>)
			if(nicka.indexOf('<a ')!=-1){
				nicka = nicka.slice(nicka.indexOf('<a'), nicka.indexOf('/a>')+3);
			}
			nick = nicka.slice(nicka.indexOf('>')+1, nicka.indexOf('</')).toUpperCase();
			nick = nick.slice(nick.lastIndexOf('>')+1);

			fama = $n.getElementsByTagName('td')[1].innerHTML; //fams (w/ <a>) or famless (w/o <a>)
			fam = fama.slice(fama.indexOf('>')+1, fama.indexOf('</')).toUpperCase();
			fam = fam.slice(fam.lastIndexOf('>')+1);

			//Step 2 - Set default priority to player
			$n.setAttribute('priority', 10);

			//Step 3 - Check player to be ingame related
			if($n.getAttribute('bgcolor') != ''){ //use grabbed ingame HL colors to determine own family/friends
				if($n.getAttribute('bgcolor').toLowerCase() == famHex.toLowerCase()){
					$n.setAttribute('priority', Fam_prior); //Found fammember, add Family priority
				}
				if($n.getAttribute('bgcolor').toLowerCase() == friendHex.toLowerCase()){
					$n.setAttribute('priority', FL_prior); //Found a friend, add FL priority
				}
			}

			//Step 4 - Check player to be JHL listed
			for(i=0;i<=words.length-1;i++){//loop through JHL list
				ItemPriority = (prioritys[i]) ? prioritys[i] : 10; //check if there is a priority listed for this word, or use default
				if((fam == words[i].replace('%20', ' ').replace('%26', '&')||fama.toUpperCase() == words[i].replace('%20', ' ').replace('%26', '&')) && parseInt($n.getAttribute('priority')) >= ItemPriority){//also see if the priority of the fam is higher
					$n.setAttribute('bgcolor', bgColors[i]);
					$n.setAttribute('priority', ItemPriority);
				}
				if((nick == words[i].replace('%20', ' ')||nicka.toUpperCase() == words[i].replace('%20', ' ')) && parseInt($n.getAttribute('priority')) >= ItemPriority){//also see if the priority of the nick is higher
					$n.setAttribute('bgcolor', bgColors[i]);
					$n.setAttribute('priority', ItemPriority);
				}
			}

			//Step 5 - Check player to be lowlife
			for(i=0;i<=nobust.length-1;i++){//loop through nobusts
				if(nobust[i]!='' && (nick == nobust[i].replace('%20', ' ').replace('%26', '&') || nicka.toUpperCase() == nobust[i].replace('%20', ' ').replace('%26', '&') || fam == nobust[i].replace('%20', ' ').replace('%26', '&') || fama.toUpperCase() == nobust[i].replace('%20', ' ').replace('%26', '&'))){
					$n.setAttribute('bgcolor', '');
					$n.setAttribute('priority', 99);
					$n.getElementsByTagName('input')[0].parentNode.removeChild($n.getElementsByTagName('input')[0]);
					lowlifes++;
				}
			}

			//Step 6 - Check player for final priority result and add it to friends list
			if($n.getAttribute('bgcolor') != '' && count < maxHL){//priority? list full?
				k = count+1;
				HL_row[count] = $n.cloneNode(1);//clone node for "friends" display and add hotkey
				span = cEL('span');
				span.innerHTML = '<a accesskey="'+k+'" style="color:'+HL_row[count].childNodes[7].firstChild.getAttribute('color')+'!important;" href=' + '"javascript:document.getElementById(' + "'" + j + "'" + ').click();">['+k+']</a>';
				HL_row[count].childNodes[7].insertBefore(span,HL_row[count].childNodes[7].firstChild.nextSibling);
				HL_row[count].childNodes[9].firstChild.setAttribute('onChange', 'javascript:document.getElementById(' + '"' + j + '"' + ').click();this.checked=false;');
				count++;
			}
			j++;
		});

		//Loop inmates to see who gets selected
		prior = 10;//highest priority
		for(i=inJail.length-1;i>=0;i--){
			priority = parseInt(inJail[i].getAttribute('priority'));
			button = $x('//input[@type="radio"]')[i];
			button.id = i;
			playerRowTmp = button.parentNode.parentNode;
			if(priority <= prior){//see if player has higher priority then saved priority
				prior = priority;//changes highest priority
				playerRow = playerRowTmp;//get player node
				button.checked = true;
			}
			button.addEventListener('change', function() { updateShow(this); }, true);
		}

		//No priorities? Pick a random player
		if (prior == 10 && inJail.length > lowlifes) {
			//i = (Math.ceil(Math.random()*(inJail.length-lowlifes))-1); //old
			if(inJail.length-lowlifes>1) {
				i = rand(0, (inJail.length-lowlifes)); //new
			} else {
				i = 0;
			}
			if (inJail.length > 4 && (i+3) > inJail.length) {
				i = i-3;
			}
			button = $x('//input[@type="radio"]')[i];
			playerRow = button.parentNode.parentNode;
			button.checked = 1;
			$X('//input').focus();
		}

		//Add selected player on top of table
		tr = $X('/html/body//form/center/table/tbody/tr[2]').cloneNode(1);//black line
		$X('//table[@class="thinline"]/tbody').insertBefore(tr, $X('//table[@class="thinline"]/tbody/tr'));
		tr = playerRow.cloneNode(1);//clone of selected player row
		tr.id = 'show';
		tr.getElementsByTagName('input')[0].style.visibility = 'hidden'; //make show-row radio invisible, as it isn't needed there

		buy = tr.lastChild.previousSibling.firstChild;//node to add buy-out hotkey
		if(buy) { //check if there is someone to bail out
			buy.setAttribute('accessKey', '0');
			buy.firstChild.innerHTML += ' [0]';
			$X('//center/table[@class="thinline"]/tbody').insertBefore(tr, $X('//center/table[@class="thinline"]/tbody/tr'));

			//Force actual radio to be selected, rather then the show-row radio clone
			var shown = $X('//table[@class="thinline"]').getElementsByTagName('input')[0];
			$x('//input[@value="'+shown.value+'"]')[1].checked = true;
		}

		//Add Friends List
		if(maxHL!=0&&prior!=10){//no need to add stuff with max=0 or no HL
			//add footer
			for(i=0,p=arr;i<=5;i++){//more space at bottom to fit everything w/o blocking stuff with the footer
				p[i]=cEL('p');
				(p[i]).innerHTML='&nbsp;';
				$X('//form').parentNode.insertBefore(p[i], $X('//form').nextSibling);
			}
			//temp fix for external css since we cant run findPos from .css ;x
			GM_addStyle('div#footerwrap{left:'+findPos($X('//table[@class="thinline"]'))[0]+'px;}');

			//compiling DOM and stuff
			wrap = cEL('div');
			wrap.id = 'footerwrap';
			wrap.setAttribute('style','height:156px; width:600px;');
			footer = cEL('div');
			footer.id = 'footer';
			footer.align = 'center';
			footer.setAttribute('style', 'position:fixed; bottom:0px; width:600px; border:0px solid #000 !important; background-color:'+getValue('bodyBg', '#B0B0B0')+';');
			footer.setAttribute('class', 'otable');

			friends = '<table id="friends" class="thinline" cellspacing="2" cellpadding="2" width="600" style="border:1px solid #000 !important;" rules="none"><tr bgcolor="#000" height="3">';
			cols = $x('//td[@class="tableheader"]');
			for(i=0;i<6;i++){ //copy widths from above table
				friends += '<td width="'+ cols[i].offsetWidth +'"></td>';
			}
			friends += '</tr></table>';
			footer.innerHTML = friends;
			wrap.appendChild(footer);

			$X('//form').parentNode.insertBefore(wrap, $X('//form').nextSibling);//add in fixed "friends" table
			for(i=0;i<HL_row.length;i++){
				if(HL_row[i]){
					getID('friends').firstChild.appendChild(HL_row[i]);//add in "friends" rows
				}
			}

		//Add arrow key controls
		window.addEventListener('keydown', function(e){
			var key = e.keyCode;
			if(key==39 && inJail.length > 1){ //right, select random
				function pickRandom() {
					var random = Math.ceil(Math.random()*inJail.length);
					button = $x('//input[@type="radio"]')[random];
					if(button.checked == true) { //we have selected this button atm, get another
						pickRandom();
					} else { //got another :D
						button.checked = true;
						updateShow(button);
					}
				}
				pickRandom();
			}
			if(key==38) { //up, select previous
				e.preventDefault(); //no scrolling using arrows
				var inmates = $X('//table[@class="thinline"]').getElementsByTagName('input');
				var shown = inmates[0];
				if(shown.checked == true) { //force real list item to be selected
					$x('//input[@value="'+shown.value+'"]')[1].checked = true;
				}
				for(i=inmates.length-1;i>=1;i--) {
					if(inmates[i].checked == true) { //grab current selected
						var prev = (i==1?inmates.length-1:i-1);
					}
				}
				inmates[prev].checked = true; //set new selected
				updateShow(inmates[prev]);
			}
			if(key==40) { //down, select next
				e.preventDefault(); //no scrolling using arrows
				var inmates = $X('//table[@class="thinline"]').getElementsByTagName('input');
				var shown = inmates[0];
				if(shown.checked == true) { //force real list item to be selected
					$x('//input[@value="'+shown.value+'"]')[1].checked = true;
				}
				for(i=inmates.length-1;i>=1;i--) {
					if(inmates[i].checked == true) { //grab current selected
						var next = (i==inmates.length-1?1:i+1);
					}
				}
				inmates[next].checked = true; //set new selected
				updateShow(inmates[next]);
			}
		}, true);
	}
		//Add amount of ppl in jail since the above made div covers original one AND add busttracker + arrow key instructions
		var span = cEL('span');
		var count = $X('/html/body//form/center').innerHTML.split('<br>')[1].match(/\d+/g)[0];
		span.innerHTML = '<br />&nbsp;In jail: ' + count + '<br />&nbsp;[#] = alt+shift hotkey<br />&nbsp;&uarr; ' + lang.jhl[17] + ' | &darr; ' + lang.jhl[18] + ' | &rarr; ' + lang.jhl[19];
		$X('//fieldset').parentNode.insertBefore(span, $X('//fieldset').nextSibling);
	} else {
		var span = cEL('span'); //add busttracker + arrow key instructions
		var count = $X('/html/body//form/center').innerHTML.split('<br>')[1].match(/\d+/g)[0];
		span.innerHTML = '<br />&nbsp;&uarr; ' + lang.jhl[17] + ' | &darr; ' + lang.jhl[18] + ' | &rarr; ' + lang.jhl[19];
		$X('//fieldset').parentNode.insertBefore(span, $X('//fieldset').nextSibling);
	}
}

//---------------- In jail page ----------------
if (dlp == '/iminjail.php' && db.innerHTML.indexOf(lang.busttracker[2]) != -1) {
	var busttracker = getValue('bustouts', 0);
	setValue('bustouts', (busttracker + 1));
}
if (dlp == '/iminjail.php' && db.innerHTML.indexOf('/static/images/game/generic/criminal.jpg') != -1) {
	if (prefs[3]) { //add buy out hotkey
		$X('//input').id = 'button';
		var click = cEL('a'); //add dummy link to tie accessKey to
		click.href = 'javascript: document.getElementById("button").click();';
		click.style.display = 'none';
		click.accessKey = getValue('buyout', '/');
		$X('//input').parentNode.appendChild(click);
	}
	if (prefs[23]) { //if go to jailpage is on
		if ($I('/html').indexOf('<body></body>') != -1 || $I('/html').indexOf('<body>') == -1 || !db) {
			window.location = 'http://' + dlh + '/jail.php'; //check for blank page
		}
		var min = 0;
		if (db.innerHTML.search('counter__minutes') != -1) {
			var min = (getID('counter__minutes').getAttribute('style') != 'display: none;') ? getID('counter__minutes_value').innerHTML : 0;
		}
		var sec = getID('counter__seconds_value').innerHTML;
		setTimeout(function () {
			window.location = 'jail.php';
		}, (((min * 60) + parseInt(sec) + 2) * 1000));
	}
}
if (dlp == '/iminjail.php' && db.innerHTML.indexOf('<img') == -1 && prefs[23]) {
	window.location = 'http://' + dlh + '/jail.php';
}
if (dlp + dls == '/iminjail.php?buymeout=yes' && prefs[23]) {
	setTimeout(function () {
		window.location = 'http://' + dlh + '/jail.php';
	}, 1000); //possible fuckup if user wasn't in jail
}

//---------------- wrongcode ----------------
if (prefs[11]) {
	if (urlsearch == '/BeO/webroot/index.php?module=Crimes&action=docrime' || urlsearch == '/BeO/webroot/index.php?module=Cars&action=docar') {
		if (db.innerHTML.search(lang.wrongcode[0]) != -1) {
			db.innerHTML = lang.wrongcode[1];
			setTimeout(function () {
				history.back();
			}, 1000);
		}
	}
}

//----------------- Crime Page ----------------
if (urlsearch == '/BeO/webroot/index.php?module=Crimes') {
	if (db.innerHTML.search(/table/i) != -1 && prefs[8]) {
		$x('//input[@type="radio"]')[4].checked = true;
	} else if (getTXT('html/body').search('Your lackeys are working for you ') == -1 && prefs[10]) {
		refreshIn('/BeO/webroot/index.php?module=Crimes');
	}
	if ($X('//input[@type="text"]')) {
		$X('//input[@type="text"]').focus();
	} else if ($X('//input[@type="submit"]')) {
		$X('//input[@type="submit"]').focus();
	}
}
//--------------- crime succesfull ---------------
if (urlsearch == '/BeO/webroot/index.php?module=Crimes&action=docrime') {
	var crimeTracker = getValue('crimes', 0);
	var crimemoney = getValue('crimemoney', 0);
	if (db.textContent.indexOf(lang.crimetracker[0]) != -1) {
		var rex1 = new RegExp(lang.crimetracker[1]);
		var str1 = db.innerHTML.replace(/,/g, '');
		var r1 = str1.match(rex1);
		crimemoney += parseInt(r1[1]);
		setValue('crimemoney', crimemoney);
		++crimeTracker;
		setValue('crimes', crimeTracker);
	}
}
//---------------- Cars Page ----------------
if (urlsearch == '/BeO/webroot/index.php?module=Cars') {
	if (db.innerHTML.search(/table/i) > -1 && prefs[8]) { //if Car Nick AF is enabled
		for (p = [], i = 0; i <= 3; i++) { //Get percentages
			p.push($i('//form//td[3]', i).replace(/\D|/g, ''));
		}
		$x('//input')[(p.indexOf(p.max() + '') + 1)].checked = true; //select radio by %
	} else if (getTXT('html/body').search('Your lackeys are working for you') == -1 && prefs[10]) {
		refreshIn('/BeO/webroot/index.php?module=Cars');
	}
	if ($X('//input[@type="text"]')) {
		$X('//input[@type="text"]').focus();
	} else if ($X('//input[@type="submit"]')) {
		$X('//input[@type="submit"]').focus();
	}
}

//--------------- we got the car ---------------
if (urlsearch == '/BeO/webroot/index.php?module=Cars&action=docar') {
	function setCity(id) {
		setValue('ship', id);
	}
	var worth = db.innerHTML.match(/\[\$(.*)\]/);
	var carTracker = getValue('cars', 0);
	var carmoney = getValue('carmoney', 0);
	var shipcity = getValue('ship', 0);
	if (worth != null) {
		var carid = $x('//input')[1].value;
		var city = getPow('bninfo', 2, -1);
		var fam = getPow('bninfo', 4, -1);
		var carcity = city-4;
		//change position of sell button and add crush button
		$x('//form')[0].parentNode.removeChild($x('//form')[0]);
		var crushform = cEL('form');
		crushform.setAttribute('method', 'post');
		crushform.setAttribute('action', '/garage.php');
		if(fam > 0){
			crushform.innerHTML = '<form id="cars" method="post" action="/garage.php"><input type="hidden" name="cityin" value="6"><input type="hidden" name="carcity" value="'+carcity+'"><input type="hidden" value="'+carid+'" name="carid[0]" /><input type="hidden" name="carsafe[0]" value="0" /><input type="submit" name="crush" value="Crush" onclick="return confirm(\'Do you want to crush this car?\')" /> | <input type="submit" name="sell" value="Sell" onclick="return confirm(\'Do you want to sell this car?\')" /></form>';
		} else {
			crushform.innerHTML = '<form id="cars" method="post" action="/garage.php"><input type="hidden" name="cityin" value="6"><input type="hidden" name="carcity" value="'+carcity+'"><input type="hidden" value="'+carid+'" name="carid[0]" /><input type="hidden" name="carsafe[0]" value="0" /><input type="submit" name="lcrush" value="Local Crush" onclick="return confirm(\'Do you want to crush this car?\')" /> | <input type="submit" name="sell" value="Sell" onclick="return confirm(\'Do you want to sell this car?\')" /></form>';
		}
		$X('//center').insertBefore(crushform, $X('//form')[1]);
		var worth2 = parseInt(worth[1].replace(',', '').trim(), 10); //grab worth
		if (worth2 >= 5000) {
			$x('//input[@type="submit"]')[2].focus();
		} else {
			$X('//input[@type="submit"]').focus();
		}
		$X('//input[@value="'+shipcity+'"]').checked = true;
		++carTracker;
		setValue('cars', carTracker);
		carmoney += parseInt(worth2);
		setValue('carmoney', carmoney);
		var color = getValue('titleBg', '#3F505F');
		var div = cEL('div');
		div.setAttribute('style', 'position:fixed; right:10px; top:10px; width: 115px !important; height:50px !important; text-align:center; background-color:' + color + ' !important;');
		div.innerHTML ='Shipping Auto-focus';
		var sel = cEL('select');
 		var drop = '';
 		var selected = '';
 		for(var i=0;i<8;i++){
			if(i==shipcity){ selected = ' selected="selected"'; } else { selected = ''; }
 			drop += '<option value="'+i+'"'+selected+'>'+lang.cities[i]+'</option>';
 		}
		sel.innerHTML=drop;
		sel.addEventListener('change', function() { setCity(this.value); }, true);
		div.appendChild(sel);
		db.appendChild(div);
	}
}

//---------------- DC+ info bar ----------------
if (dlp == '/mid.php') {
	setTimeout(function () {
		window.location.reload();
	}, 30000);

	var x, x2, boXpath, healthXp, healthXpBar, rpXp, boXp, bgXp;

	x = '/html/body/div/center/table/tbody/tr/td/div/div[1]/table/tbody/tr';
	x2 = '/html/body/div/center/table/tbody/tr/td/div/div[2]/table/tbody/tr';

	boXpath = x + '[3]/td[5]';
	healthXp = x2 + '[2]/td[5]';
	bulletXp = x2 + '[4]/td[1]';
	cashXp = x2 + '[3]/td[1]';
	healthXpBar = x2 + '[2]/td[6]/dl/dt';
	rpXp = x2 + '/td[5]';
	bgXp = x2 + '[4]/td[5]';
	boXp = x2 + '[3]/td[5]';
	if ($X(healthXpBar)) {
		$I(cashXp, '<a href="/bank.php" target="main"><b>C</b>ash:</a>');
		$I(bulletXp, '<a href="/bullets2.php" target="main"><b>B</b>ullets:</a>');
		$I(rpXp, '<a href="BeO/webroot/index.php?module=Launchpad" target="main"><b>R</b>ank progress:</a>');
		$I(healthXp, '<a href="/BeO/webroot/index.php?module=Bloodbank&action=" target="main"><b>H</b>ealth:</a>');
		$I(healthXpBar, '<a href="/BeO/webroot/index.php?module=Bloodbank&action=" target="main">' + $I(healthXpBar) + '</a>');
		$I(boXp, '<a href="jail.php" target="main"><b>B</b>usting skill:</a>');
		$I(bgXp, '<a href="/BeO/webroot/index.php?module=Bodyguards&action=" target="main"><b>B</b>odyguards:</a>');
		if (prefs[6]) { //remove busting skill bar
			$Del('//div[@id="panel"]//table//tr[3]//td[6]');
			$Del('//div[@id="panel"]//table//tr[3]//td[5]');
		}
	} else { // no DC+ so make some dummies to by-pass a lot of errors
		var script = cEL('script');
		script.setAttribute('type', 'text/javascript');
		script.innerHTML = 'var timers = {crime: 0, car: 0, flight: 0, bullet: 0};';
		db.appendChild(script);
	}
}

//---------------- User Profile ----------------
if (urlsearch == ('/user.php' + dls) && dls != '?editmode=true') {
	if (db.innerHTML.search('table') != -1) {
		var tbody = $X('//tbody');
		tbody.lastChild.previousSibling.previousSibling.previousSibling.setAttribute('name', 'forumPosts');
		tbody.lastChild.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.setAttribute('name', 'FL');

		var status = $X('//span[@id="status"]').innerHTML;
		var inFam = $X('//span[@id="family"]').innerHTML;
		var alive = (status.indexOf(lang.profile[3])==-1);//alive/dead
		var unick = $X('//span[@id="username"]').innerHTML;

		//DEAD or AKILLED ?
		if (!alive) {
			var rankings = '<a href="http://www.barafranca.com/BeO/webroot/index.php?module=Rankings&nick='+unick+'">View Rankings</a>';
			if($X('//img').parentNode.nodeName != 'A'){
				var akill = '<span style="color:red; font-weight:bold;"> (Akill) </span>';
				status += akill;
			}
			GM_xmlhttpRequest({
				method: 'GET',
				url: SCRIPT_LINK+'?p=stats&w=deaths&v='+sets.version.replace('_','')+'&ing='+unick,
				onload: function(xhr) {
					var response = JSON.parse(xhr.responseText);
					if (response["DiedAt"] === null) {
						$X('//span[@id="status"]').innerHTML = status + ' | Death date is not known';
					} else {
						$X('//span[@id="status"]').innerHTML = status + ' | '+rankings+' | Died at '+response["Date"]+' OT ('+response["Agod"]+'d '+response["Agoh"]+'h '+response["Agom"]+'m ago)';
					}
				}
			});
		}

		if (status == lang.lastontime[0]) { // show last online time on profile
			GM_xmlhttpRequest({
				method: 'GET',
				url: SCRIPT_LINK+'?p=stats&w=laston&v='+sets.version.replace('_','')+'&ing='+unick,
				onload: function (resp) {
					var response = JSON.parse(resp.responseText);
					if (response["LastOn"] === 0) { // 1970, thus not seen by logger
						$X('//span[@id="status"]').innerHTML = lang.lastontime[0]+' | '+lang.lastontime[3];
					} else {
						$X('//span[@id="status"]').innerHTML = lang.lastontime[0]+' | '+lang.lastontime[1]+' '+response["Date"]+' OT ('+response["Agod"]+'d '+response["Agoh"]+'h '+response["Agom"]+'m ago)';
					}
				}
			});
		} else {
			$X('//span[@id="status"]').innerHTML = status;
		}

		var forumposts = false;
		if (prefs[30]) {
			if (getTXT('//tr[@name="forumPosts"]/td[1]').indexOf('Recent') != -1) {
				$Del('//tr[@name="forumPosts"]');
				forumposts = true;
			}
		}

		if (prefs[19]) {
			if (forumposts == true) {
				var avatarXP = '//*[@name="FL"]//img[contains(@src, "omertao.png")] | //*[@name="FL"]//img[contains(@src, "userimg")]';
			} else {
				var avatarXP = '//*[@name="forumPosts"]//img[contains(@src, "omertao.png")] | //*[@name="forumPosts"]//img[contains(@src, "userimg")]';
			}
			$x(avatarXP).forEach(function($n) {
					$n.setAttribute('id', 'flnames');
					$X('//*[@id="flnames"]').parentNode.removeChild($X('//*[@id="flnames"]').parentNode.children[0]);
				}
			);
		}

		//Wealth
		var tr, x, y, z, xpath;
		tr = 11;
		x = db.innerHTML.search(lang.profile[0]);
		y = db.innerHTML.search(lang.profile[1]);
		z = db.innerHTML.search(lang.profile[2]);

		if (x == -1) { tr--; }
		if (y == -1) { tr--; }
		if (z == -1) { tr--; }
		xpath = '/html/body//center/table/tbody/tr['+tr+']/td[2]';
		var wlth = $I(xpath);

		var kind = ['', ' ($0 - $50.000)', ' ($50.001 - $100.000)', ' ($100.001 - $500.000)', ' ($1.000.001 - $5.000.000)', ' ($5.000.001 - $15.000.000)', ' ( > $15.000.001)', ' ($500.001 - $1.000.000)'], i=1;
		lang.wealth.forEach(function($n){ if(wlth.search($n) != -1){ $I(xpath,$I(xpath) + kind[i]); i=0; } if(i!=0){ i++; }});

		//Raceform
		var xpath2 = '/html/body//center/table/tbody/tr['+(tr+1)+']/td[2]';
		var rf = getTXT(xpath2);
		var q = lang.driver;
		for (i=0;i<=10;i++) {
			if (rf.match(q[i]) && (rf.length == q[i].length)) {
				$I(xpath2,(i+1) + " - " + $I(xpath2));
			}
		}

		var self = (getTXT('/html/body//center/table/tbody/tr[3]/td[2]/a').toUpperCase() == getValue('nick').toUpperCase());//self/other
		var other = getTXT('/html/body//center/table/tbody/tr/td/i');
		var checkHistory = getTXT('//td[@class="tableheader"]/i');
		var color = getValue('titleBg', '#3F505F');
		var Y = ($X('//font[@color="red"]'))?'60px':'34px';
		var chars = unick.length;
		var X = (chars<=12 && chars>10)?'465px':(chars<=10 && chars>8)?'471px':(chars<=8 && chars>6)?'477px':(chars<=6 && chars>4)?'483px':(chars<=4 && chars>2)?'489px':'497px';
		$x('//td[@class="tableheader"]')[0].innerHTML = (prefs[15] && !self && alive)?$x('//*[@class="tableheader"]')[0].innerHTML + ' | <a href="http://stats.omertabeyond.com/history.php?v='+sets.version.replace('_','')+'&name='+checkHistory+'">View History</a> | <a href="" onmouseover="document.getElementById(\'actions\').setAttribute(\'style\', \'-moz-border-radius:4px;position:fixed;width:115px;padding:2px;visibility:visible;right:'+X+';top:'+Y+';background-color:'+color+';color:#FFF !important;text-decoration:none;border:2px double gray;opacity:.90;display:block;text-align:center;\');">Actions</a>':$x('//*[@class="tableheader"]')[0].innerHTML + ' | <a href="http://stats.omertabeyond.com/history.php?v='+sets.version.replace('_','')+'&name='+checkHistory+'">View History</a>';
		var actions = cEL('div');
		actions.id = 'actions';
		actions.setAttribute('style', 'display:none;');
		actions.setAttribute('onmouseout', 'document.getElementById(\'actions\').setAttribute(\'style\', \'display:none;\');');
		actions.innerHTML = '<a href="BeO/webroot/index.php?module=Heist&action=&who='+unick+'" onmouseover="document.getElementById(\'actions\').setAttribute(\'style\', \'-moz-border-radius:4px;position:fixed;width:115px;padding:2px;visibility:visible;right:'+X+';top:'+Y+';background-color:'+color+';color:#FFF !important;text-decoration:none;border:2px double gray;opacity:.90;display:block;text-align:center;\');">Heist</a><br />';
		actions.innerHTML += '<a href="BeO/webroot/index.php?module=Spots&action=&driver='+unick+'" onmouseover="document.getElementById(\'actions\').setAttribute(\'style\', \'-moz-border-radius:4px;position:fixed;width:115px;padding:2px;visibility:visible;right:'+X+';top:'+Y+';background-color:'+color+';color:#FFF !important;text-decoration:none;border:2px double gray;opacity:.90;display:block;text-align:center;\');">Raid</a><br />';
		actions.innerHTML += '<a href="javascript:if(confirm(\'Are you sure you want to make '+unick+' your Mentor?\')) document.location.href =\'/honorpoints.php?view=mentorsetup&mentor='+unick+'\';" onmouseover="document.getElementById(\'actions\').setAttribute(\'style\', \'-moz-border-radius:4px;position:fixed;width:115px;padding:2px;visibility:visible;right:'+X+';top:'+Y+';background-color:'+color+';color:#FFF !important;text-decoration:none;border:2px double gray;opacity:.90;display:block;text-align:center;\');">Set Mentor</a><br />';
		actions.innerHTML += '<a href="kill.php?search='+unick+'" onmouseover="document.getElementById(\'actions\').setAttribute(\'style\', \'-moz-border-radius:4px;position:fixed;width:115px;padding:2px;visibility:visible;right:'+X+';top:'+Y+';background-color:'+color+';color:#FFF !important;text-decoration:none;border:2px double gray;opacity:.90;display:block;text-align:center;\');">Hire Detectives</a><br />';

		if (prefs[3]) {
			var names = getValue('bust', '');
			var jhl_add = 1;
			if (names) {
				names = names.split(',');
				var a = names.length;
				var x, info;
				for (x = 0; x < a; ++x) {
					if (names[x] != '' && names[x].split('|')[0] == unick) {
						jhl_add = 0;
						break;
					}
				}
			}
			var text = (jhl_add == 1)?'Add to ':'Remove from ';
			actions.innerHTML += '<a href="#" id="jhl_link" onmouseover="document.getElementById(\'actions\').setAttribute(\'style\', \'-moz-border-radius:4px;position:fixed;width:115px;padding:2px;visibility:visible;right:'+X+';top:'+Y+';background-color:'+color+';color:#FFF !important;text-decoration:none;border:2px double gray;opacity:.90;display:block;text-align:center;\');">'+text+'busting list</a><br />';
		}
		if (parseInt(getPow('bninfo',4,-1),10) > 2 && inFam == 'None') {//check for top3 position and if person is not in family
			actions.innerHTML += '<a href="/BeO/webroot/index.php?module=Family&who='+unick+'" onmouseover="document.getElementById(\'actions\').setAttribute(\'style\', \'-moz-border-radius:4px;position:fixed;width:115px;padding:2px;visibility:visible;right:'+X+';top:'+Y+';background-color:'+color+';color:#FFF !important;text-decoration:none;border:2px double gray;opacity:.90;display:block;text-align:center;\');">Invite to Family</a>';
		}
		db.appendChild(actions);

		if (prefs[3]) {
			getID('jhl_link').addEventListener('click', function () {
				if (jhl_add == 1) {
					names = getValue('bust', '');
					if (names == '') {
						setValue('bust', unick+'|'+getValue('defpri', 2)+'|'+getValue('defcol', '33FF66'));
					} else {
						setValue('bust', names+','+unick+'|'+getValue('defpri', 2)+'|'+getValue('defcol', '33FF66'));
					}
					alert(unick+' '+lang.jhl[20]);
				} else {
					var a = names.length;
					var x, info;
					var str = '';
					for (x = 0; x < a; ++x) {
						if (names[x] != '' && names[x].split('|')[0] != unick) {
							str += ','+names[x];
						}
					}
					setValue('bust', str.substr(1));
					alert(unick+' '+lang.jhl[23]);
				}
			}, false);
		}

		if (alive) {
			if (!self) { //additions useless for self
				$X('//span[@id="hp"]').innerHTML = '<a href="/honorpoints.php?who='+unick+'" class="red">'+$X('//span[@id="hp"]').innerHTML+'</a>'; //Send HP's
			} else {//Linkify self hp's
				HPxp = $X('/html/body//center/table/tbody/tr[5]/td[2]');
				HPxp.innerHTML = '<a href="/honorpoints.php"><span style="color:red"><i>'+HPxp.innerHTML+'</i></span></a>';
			}
		}
	}
}

//---------------- Bank ----------------
if (dlp == '/bank.php') {
	if (db.innerHTML.search(lang.bank) != -1) {
		db.innerHTML += '<br /><b>'+lang.calc[6]+'</b>';
		setTimeout(function () {
			history.back();
		}, 1000);
	}
	if (db.innerHTML.search('<table') == -1) { //auto reload after transfer
		setTimeout(function () {
			window.location = 'http://' + dlh + '/bank.php';
		}, 1000);
	}

	//add amt of interest next to %
	if($x('//table')[2]) {
		var money = $x('//table')[2].getElementsByTagName('td')[2].textContent; //check for banked money
		if (!money.split(' ')[1]) { //money in bank
			var rx = $x('//table')[2].getElementsByTagName('td')[6].textContent; //get recieved amt
			var tmp = 1 * rx.replace(/\D/g, '') - 1 * money.replace(/\D/g, ''); //calc interest
			var intLine = $x('//table')[2].getElementsByTagName('td')[4];
			intLine.innerHTML += ' &rarr; ($'+commafy(tmp)+')';
			setValue('interest', tmp);

			//interest reminder
			var seconds = 0;
			if ($X('//span[@id="counter__days_value"]') != null) {
				seconds = (seconds + (parseInt(getTXT('//span[@id="counter__days_value"]'), 10) * 86400));
			}
			if ($X('//span[@id="counter__hours_value"]') != null) {
				seconds = (seconds + (parseInt(getTXT('//span[@id="counter__hours_value"]'), 10) * 3600));
			}
			if ($X('//span[@id="counter__minutes_value"]') != null) {
				seconds = (seconds + (parseInt(getTXT('//span[@id="counter__minutes_value"]'), 10) * 60));
			}
			if ($X('//span[@id="counter__seconds_value"]') != null) {
				seconds = (seconds + parseInt(getTXT('//span[@id="counter__seconds_value"]'), 10));
			}

			//when do we get interest?
			setValue('banktleft', (time() + seconds));
		}
	}

	//Calculators
	var func1 = 'javascript: var amt=this.value.replace(/\\D/g,\'\'); if(amt){ get = document.getElementById(\''; //put ID here
	var func2 = '\'); if(get){ tmp = \'\'+Math.round(amt'; //put factor here
	var func3 = '); str =\'\'; while(tmp > 0){ if(str!=\'\'){ while(str.length % 4 !=3 ){ str = \'0\' + str;};';
	func3 += 'str = \',\' + str;};dec = (tmp % 1000)+\'\';str = dec + str;tmp = Math.floor(tmp/1000);};';
	func3 += 'get.textContent = \'$\' + str}; };';
	var func_switch = '* (amt >= 1000000 ? (amt >= 3000000 ? (amt >= 6000000 ? (amt >= 10000000 ? (amt >= 15000000 ? ';
	func_switch += '(amt >= 21000000 ? (amt >= 27000000 ? (amt >= 35000000 ? 1.01 : 1.015) : 1.02) : 1.025 ) : 1.03) : 1.035)';
	func_switch += ' : 1.04) : 1.045) : 1.05 )';

	var tbl = '<tr><td class="tableheader" colspan="4">Calculators</td></tr>';
	tbl += '<tr><td align="left" width="33%">'+lang.calc[0]+'</td>';
	tbl += '<td align="left" width="13%"><input name="amount" type="text" value="" onKeyUp="' + func1 + 'get' + func2 + '*0.9' + func3 + '" size="15" maxlength="11" /></td>';
	tbl += '<td align="left" width="28%">'+lang.calc[1]+'</td><td align="center" id="get">$0</td></tr>';
	tbl += '<tr><td align="left" width="33%">'+lang.calc[2]+'</td>';
	tbl += '<td align="left" width="13%"><input name="amount" type="text" value="" onKeyUp="' + func1 + 'give' + func2 + '/0.9' + func3 + '" size="15" maxlength="11" /></td>';
	tbl += '<td align="left" width="28%">'+lang.calc[3]+'</td><td align="center" id="give">$0</td></tr>';
	tbl += '<tr><td align="left" width="33%">'+lang.calc[4]+'</td>';
	tbl += '<td align="left" width="13%"><input name="amount" type="text" value="" onKeyUp="' + func1 + 'int' + func2 + func_switch + func3 + '" size="15" maxlength="11" /></td>';
	tbl += '<td align="left" width="28%">'+lang.calc[5]+'</td><td align="center" id="int">$0</td></tr>';

	//DOM-ify
	var dummy = cEL('table');
	dummy.setAttribute('class', 'thinline');
	dummy.setAttribute('width', '100%');
	dummy.setAttribute('align', 'center');
	dummy.setAttribute('rules', 'none');
	dummy.innerHTML = tbl;
	if($x('//td[@width="33%"]')[2]) {
		$x('//td[@width="33%"]')[2].appendChild(dummy);
	}

	function blockAlpha(event) {
		if (event.keyCode == 75) {
			$n.value = $n.value + '000';
		} else if (event.keyCode == 77) {
			$n.value = $n.value + '000000';
		}
		return false;
	}

	//add m/k usage in amount boxes
	if (prefs[5]) {
		var inputs = $x('//input[@name="amount"] | //input[@name="amounttpob"]');
		inputs.forEach(function ($n) {
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
		});
	}
}

//---------------- Garage Crusher ----------------
if(dlp == '/garage.php'){
	function checkcar(car){
		types = [];
		types[0] = ['h', 8, 9, 13, 15, 16, 17, 18, 19, 21, 22, 27, 32, 34, 35, 40, 43];
		types[1] = ['oc', 23, 25, 26, 28, 29, 30, 31, 33, 39, 41, 42];
		types[2] = ['moc', 45, 47, 48];
		types[3] = ['tr', 23, 47, 54];
		types.forEach(function(array){ array.forEach(function($n){if($n==car){ eval(array[0] + 'car=1;');} }); });
	}

	function garageCrusher() {
		var rows = $x('//tr').length; //get number of rows
		if(prefs[24]){ //crusher
			//define car arrays
			var titles = { h:'Heist', oc:'OC', moc:'MOC', tr:'Truck' };
			var carValues = { h:'heist', oc:'oc', moc:'moc', tr:'truck' };
			var base = getValue('titleBg', '#3F505F');
			var carColors = { h:getTintedColor(base, 125), oc:getTintedColor(base, 75), moc:getTintedColor(base, 25), tr:getTintedColor(base, 150)};
			var types = [['h', 8, 9, 13, 15, 16, 17, 18, 19, 21, 22, 27, 32, 34, 35, 40, 43], ['oc', 23, 25, 26, 28, 29, 30, 31, 33, 39, 41, 42], ['moc', 45, 47, 48], ['tr', 23, 47, 54]];

			var indexTd = cEL('td'); //add type collumn to header
			indexTd.setAttribute('class', 'tableheader');
			indexTd.innerHTML = lang.garage[17];
			$X('/html/body//form/center/table/tbody/tr').insertBefore(indexTd, $X('/html/body//form/center/table/tbody/tr/td[2]'));

			var totVal = 0;
			for(var i=2;i<rows-2;i++){ //loop rows
				var carid = $X('/html/body//form//center/table/tbody/tr['+(i+2)+']/td').innerHTML;
				var y = '//html/body//form//center/table/tbody/tr['+(i+2)+']/td[2]/a';//get car
				var car = $X(y).href.match(/\d*$/)[0];
				var carType = '';
				var carRow = $X('/html/body//form//center/table/tbody/tr['+(i+2)+']'); //get the specific row
				var carVal = parseInt($X('/html/body//form//center/table/tbody/tr['+(i+2)+']/td[4]').innerHTML.replace(',', '').replace('$', '')); //get value
				carRow.setAttribute('onclick', 'var check = document.getElementsByName(\'carid['+(i-2)+']\')[0]; if(check.checked==true){check.checked=false;}else{check.checked=true;}');
				$X('/html/body//form//center/table/tbody/tr['+(i+2)+']/td[6]/input[2]').setAttribute('onclick', 'if(this.checked==true){this.checked=false;}else{this.checked=true;}');
				totVal += carVal;
				types.forEach(function($n){ //loop car through types
					if($n.indexOf(parseInt(car))>0){ //check if car is in this type array
						carType = titles[$n[0]]; //set car type
						carRow.setAttribute('title', titles[$n[0]]); //set popup title
						carRow.style.backgroundColor = carColors[$n[0]];
						carRow.setAttribute('onmouseover', 'this.style.backgroundColor="#D0D0D0";'); //add mouseover event
						carRow.setAttribute('onmouseout', 'this.style.backgroundColor="' + carColors[$n[0]] + '";'); //add mouseout event
					}
				});
				var typeTd = cEL('td'); //add type collumn to row
				typeTd.innerHTML = carType;
				carRow.insertBefore(typeTd, carRow.childNodes[3]);
			}
			//add amount of bullets
			var head = $X('//h2');
			var cars = head.textContent.match(/\d+/g)[2];
			if(cars>0){
				head.textContent = head.textContent+' | '+lang.garage[0]+' '+cars*12;
			}
			//add amount of money
			var head = $X('//h2');
			if(totVal>0){
				head.textContent = head.textContent+' | '+lang.garage[18]+' $'+commafy(totVal);
			}
		}

		var city = getValue('ship', 0);
		$x('//input[@name="shipcity"]')[city].checked = true;

		var xpath = $X('/html/body//form//center/table');//add menu
		var string = '<td><label><input type="checkbox" checked="1" ';

		var sTable = cEL('table');
		sTable.id = 'selectTable';
		sTable.setAttribute('style', 'border:0px; width:100%;');
		sTable.setAttribute('cellspacing', '0');

		var sTr = cEL('tr');
		sTr.id = 'selectRow';

		var spacer = cEL('td');
		spacer.innerHTML = '<br /><br /><br />';
		spacer.setAttribute('style', 'width:10%; vertical-align:top;');
		sTr.appendChild(spacer);

		var sTd = cEL('td');
		sTd.id = 'selectTd';
        sTd.setAttribute('align', 'center');
		sTd.innerHTML = ' <br /><hr />' +
		' <b>'+lang.garage[1]+'</b> <br /><br /><select size="1" id="X" style="width:100px;"><option value="1">'+lang.garage[2]+'</option><option value="0">'+lang.garage[3]+'</option></select> &nbsp;$<input type="text" value="6000" maxlength="5" size="8" style="width:110px;" id="max" onkeydown="javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + \'000\'; } if(symcode == 77){ this.value = this.value + \'000000\'; }this.value = this.value.replace(/k|m/g,\'\'); return (symcode == 75||symcode == 77)?false:true;" />' +
		' &nbsp; <input type="button" onclick="javascript:document.location.href = \'garage.php?max=\' + document.getElementById(\'max\').value + \'&select=\' + document.getElementById(\'X\').value + \'&truck=\' + (document.getElementById(\'truck\').checked ? \'1\' : \'0\') + \'&ob_oc=\' + (document.getElementById(\'oc\').checked ? \'1\' : \'0\') + \'&ob_moc=\' + (document.getElementById(\'moc\').checked ? \'1\' : \'0\') + \'&ob_heist=\' + (document.getElementById(\'heist\').checked ? \'1\' : \'0\') + \'&nodam=\' + (document.getElementById(\'nodam\').checked ? \'1\' : \'0\') + ' + (GetPost('page')=='' ? '\'' : '\'&page=' + GetPost('page')) + '\';" value="'+lang.garage[4]+'" name="action" />' +
		'<table style="padding-top:10px; position:relative; right:7px;"><tr>'+string+'id="heist">'+lang.garage[5]+'</label></td>'+string+'id="oc">'+lang.garage[6]+'</label></td>'+'</tr><tr>'+string+
		'id="truck" />'+lang.garage[7]+'</label></td>'+string+'id="moc" />'+lang.garage[8]+'</label></td>'+'</tr><tr>'+string+'id="nodam" />'+lang.garage[9]+'</label></td><td>&nbsp;</td>'+'</tr></table>';

		sTr.appendChild(sTd);
		sTable.appendChild(sTr);
		xpath.parentNode.insertBefore(sTable, xpath.nextSibling);

		//add select All in SH button
		var all = $X('//input[@type="button"]');

		var text = cEL('TextNode');
		text.innerHTML = ' | ';
		all.parentNode.insertBefore(text, all.nextSibling);

		//add select all group Button
		var names_td = $x('//a[contains(@href,"carinfo.php")]');
		var names = [];
		names_td.forEach(function($n){ //grab carnames on the current page
			var carName = $n.innerHTML;
			if(names.indexOf(carName)==-1){
				names.push(carName);
			}
		});
		var selectN = cEL('select');
		selectN.id = 'selectN';
		selectN.addEventListener('change', function(e){
			$x('//table[@class="thinline"]//tr[@class="thinline"]').forEach(function($n){
				if(!getID('keep').checked) {
					$n.getElementsByTagName('input')[1].checked = false;
				}
				if($n.getElementsByTagName('a')[0].innerHTML == e.target.value){
					$n.getElementsByTagName('input')[1].checked = true;
				}
			});
		}, true);
		var init = cEL('option');
		init.innerHTML = lang.garage[11];
		selectN.appendChild(init);
		names.forEach(function($n){
			var option = cEL('option');
			option.innerHTML = $n;
			option.setAttribute('value', $n);
			selectN.appendChild(option);
		});

		var cities_td = (prefs[24])?$x('//tr[@class="thinline"]//td[6]'):$x('//tr[@class="thinline"]//td[5]');
		var cities = [];
		cities_td.forEach(function($n){ //grab cities on the current page
			var carCity = $n.innerHTML;
			if(cities.indexOf(carCity)==-1){
				cities.push(carCity);
			}
		});

		var keep = cEL('input');
		keep.setAttribute('type', 'checkbox');
		keep.id = 'keep';
		var keepSpan = cEL('span');
		keepSpan.innerHTML = lang.garage[14];

		var selectC = cEL('select');
		selectC.id = 'selectC';
		selectC.addEventListener('change', function(e){
			$x('//table[@class="thinline"]//tr[@class="thinline"]').forEach(function($n){
				if(!getID('keep').checked) {
					$n.getElementsByTagName('input')[1].checked = false;
				}
				if($n.getElementsByTagName('td')[4].innerHTML == e.target.value){
					$n.getElementsByTagName('input')[1].checked = true;
				}
			});
		}, true);
		var init = cEL('option');
		init.innerHTML = lang.garage[12];
		selectC.appendChild(init);
		cities.forEach(function($n){
			var option = cEL('option');
			option.innerHTML = $n;
			option.setAttribute('value', $n);
			selectC.appendChild(option);
		});
		var citySpan = cEL('span');
		citySpan.style.width = '80px';
		citySpan.innerHTML = lang.garage[13]+'&nbsp;&nbsp;&nbsp;';

		var gTd = cEL('td'); //group select
        gTd.setAttribute('align', 'center');
		gTd.innerHTML = '<br /><hr /><b>'+lang.garage[15]+'</b><br /><br />'+lang.garage[16];
		gTd.appendChild(selectN);
		gTd.appendChild(cEL('br'));
		gTd.appendChild(cEL('br'));
		gTd.appendChild(citySpan);
		gTd.appendChild(selectC);
		gTd.appendChild(cEL('br'));
		gTd.appendChild(cEL('br'));
		gTd.appendChild(keep);
		gTd.appendChild(keepSpan);
		gTd.style.verticalAlign = 'top';
		$X('//tr[@id="selectRow"]').appendChild(gTd);

		spacer = cEL('td');
		spacer.innerHTML = '<br /><br /><br />';
		spacer.setAttribute('style', 'width:10%; vertical-align:top;');
		$X('//tr[@id="selectRow"]').appendChild(spacer);

		//select cars
		if(ls.length > 1){
			if(ls.indexOf('heist') != -1 || ls.indexOf('nodam') != -1 || ls.indexOf('max') != -1 || ls.indexOf('oc') != -1){
				var max=GetPost('max'), truck=GetPost('truck'), oc=GetPost('ob_oc'), moc=GetPost('ob_moc'), heist=GetPost('ob_heist'), nodam=GetPost('nodam'), select=GetPost('select'), a=0, y, car, z, perc, types;
				for(i=2;i<rows-2;i++){
					y = '/html/body//form/center/table/tbody/tr['+(i+2)+']/td[3]/a';//get car
					car = $X(y).href.match(/\d+/g)[0];
					z = '/html/body//form/center/table/tbody/tr['+(i+2)+']/td[4]';//get percentage damage
					perc = $I(z);
					perc = parseInt(perc.slice(0, perc.indexOf('%')));

					var hcar=0, occar=0, trcar=0, moccar=0;
					checkcar(car);

					var stop=0;//check if car needs to be skipped
					if((heist==1 && hcar==1)||(oc==1 && occar==1)||(truck==1 && trcar==1)||(moc==1 && moccar==1)||(nodam==1 && perc==0)){
						stop=1;
					}

					if(stop == 0){
						tr = $i('//tr', (i+1));//get worth
						tr = (tr.indexOf(')') == -1) ? tr.slice(tr.indexOf('%')) : tr.slice(tr.indexOf(')'));
						tr = tr.replace('<td>', '');
						tr = tr.slice(tr.indexOf('$')+6);
						tr = tr.replace('<td>', '');
						tr = tr.slice(0, tr.indexOf('<')-3);
						tr = tr.replace(',', '');
						tr = parseInt(tr);

						if((tr < max && select==1)||(tr > max && select==0)){
							$X('/html/body//form/center/table/tbody/tr['+(i+2)+']/td[7]/input[2]').checked = true;
						}
					}
				}
			}
		}

		wrap = cEL('div');
		wrap.id = 'footerwrap';
		footer = cEL('div');
		footer.id = 'footer';
		footer.align = 'center';
		footer.setAttribute('style', 'position:fixed; bottom:0px; left:10%; width:80%; border:1px solid #000 !important; background-color:'+getValue('bodyBg', '#B0B0B0')+';');
		footer.setAttribute('class', 'otable');
		html = '';
		html += '<table class="thinline" cellspacing=0 cellpadding=2 rules="none" width="100%"><tr>';
		html += $x('//tr')[rows-1].innerHTML;
		html += '</tr></table>';
		footer.innerHTML = html;
		wrap.appendChild(footer);
		$X('//center').parentNode.insertBefore(wrap, $X('//center').nextSibling);

		var sheight = db.scrollHeight
		var cheight = db.clientHeight
		if (sheight <= cheight) {
			getID('footer').style.display = 'none';
		}
		window.addEventListener('scroll', function(){
			var max = ((db.scrollHeight-db.clientHeight) - (getID('footer').offsetHeight*2)); // bottom
			var curr = db.scrollTop;
			if (curr >= max) {
				getID('footer').style.display = 'none';
			} else {
				getID('footer').style.display = 'block';
			}
		}, true);
		var footercity = parseInt(city, 10)+8;
		$x('//input[@name="shipcity"]')[footercity].checked = true;
	}
	setTimeout(function(){ garageCrusher(); }, 1000); //minimal delay in attempt to fix breaking up of html with slow connections
}

//---------------- Statistics ----------------
if (urlsearch == '/BeO/webroot/index.php?module=Statistics') {
	//change all users link
	$X('//a[contains(@href, "/allusers.php")]').href = '/allusers.php?start=0&order=lastrank&sort=DESC&dead=HIDE';

	info = cEL('div');
	info.id = 'info';
	info.style.display = 'none';
	info.innerHTML = getValue('nick', '');
	db.appendChild(info);

	function runCode(tab) {
		if (tab.indexOf('action=global_stats') != -1) {

			var a, b, x, y, ql, qLinks, keys;
			a = '//center/table[';
			b = ']/tbody/tr/td';
			y = ['dfams', 'honour', 'cdtc', 'fams', 'bf', 'roul', 'num', 'slot', 'bj', 'book', 'pb'];
			ql = lang.stats[1];
			qLinks = '<table class="thinline" width="90%" rules="none" cellspacing="0" cellpadding="2"><tbody><tr><td class="tableheader" align="center">';
			keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '='];
			for (i = 0; i <= 10; i++) {
				qLinks += ((i > 0) ? ' - ' : '') + '<a href="#' + y[i] + '" accessKey="' + keys[i] + '"><b>' + ql[i] + '</b></a>';
				$I(a + (i + 4) + b, '<a name="' + y[i] + '">' + $I(a + (i + 4) + b) + '</a>&nbsp;&nbsp;&nbsp;<a href="#">&uarr; <u>' + lang.stats[0] + '</u> &uarr;</a>');
			}
			qLinks += '</td></tr><tr><td height="1" bgcolor="black"></tr></tbody></table>' + $X('//center').innerHTML;
			$X('//center').innerHTML = qLinks;
			nickReader(); //apply nickReader again
		}
		if (tab.indexOf('allusers.php') != -1 || tab.indexOf('action=users_online') != -1 || tab.indexOf('action=global_stats') != -1) {
			var nick = $I('//div[@id="info"]').split(' ')[0]; //look it's me
			if (nick !== '') {
				var names = $x('//a');
				names.forEach(function ($n) {
					if ($n.textContent == nick || $n.textContent == nick + '+') {
						$n.innerHTML = '<span class="green">' + $n.innerHTML + '</span>';
					}
				});
			}
			nickReader(); //apply nickReader again
		}
	}

	getID('smsdivcontainer').addEventListener('DOMNodeInserted', function (event) {
		if (event.target.nodeName == 'CENTER') {
			runCode(selectedTab());
		}
	}, false);
}

//---------------- look it's me ----------------
if (dls.indexOf('users_online') != -1 || dlp.indexOf('allusers.php') != -1 || dls.indexOf('global_stats') != -1) {
	var nick = getValue('nick', '');
	if (nick !== '') {
		var names = $x('//a');
		names.forEach(function ($n) {
			if ($n.textContent == nick || $n.textContent == nick + '+') {
				$n.innerHTML = '<span class="green">' + $n.innerHTML + '</span>';
			}
		});
	}
}
//---------------- Family page ----------------
if (dlp == '/family.php') {
	if ((prefs[3])&&(dls.indexOf('join=yes') == -1)) {
		var ownfam = getValue('family', '')
		var names = getValue('bust', '');
		var jhl_add = 1;
		var who = getTXT('//td[@class="profilerow"]');
		who = who.substr(0, who.indexOf(' ')).replace(/[^a-zA-Z]/g, '');
		if (names) {
			names = names.split(',');
			var a = names.length;
			for (var x = 0; x < a; ++x) {
				if (names[x] != '' && names[x].split('|')[0] == who) {
					jhl_add = 0;
					break;
				}
			}
		}
		var jhl_link = cEL('span'); //not an anchor, will mess up grabbing tops etc..
		jhl_link.setAttribute('id', 'jhl_link');
		jhl_link.setAttribute('class', 'red');
		jhl_link.setAttribute('style', 'cursor:pointer');
		if (jhl_add == 1) {
			//Add to busting list
			jhl_link.innerHTML = lang.jhl[24];
			jhl_link.addEventListener('click', function(){
				names = getValue('bust', '');
				if (names == '') {
					setValue('bust', who+'|'+getValue('defpri', 2)+'|'+getValue('defcol', '33FF66'));
				} else {
					setValue('bust', names+','+who+'|'+getValue('defpri', 2)+'|'+getValue('defcol', '33FF66'));
				}
				alert(who+' '+lang.jhl[20]);
				window.location.reload();
			}, true);
		} else {
			//Remove from busting list
			jhl_link.innerHTML = lang.jhl[21];
			jhl_link.addEventListener('click', function(){
				var a = names.length;
				var str = '';
				for (var x = 0; x < a; ++x) {
					if (names[x] != '' && names[x].split('|')[0] != who) {
						str += ','+names[x];
					}
				}
				setValue('bust', str.substr(1));
				alert(who+' '+lang.jhl[23]);
				window.location.reload();
			}, true);
		}
		if(stripHTML(ownfam) != who) {
			$X('//td[@class="profilerow"]').appendChild(jhl_link);
		}
	}
	if ((prefs[13])&&(dls.indexOf('join=yes') == -1)) {
		//style family info table a bit
		$x('//td[@class="subtableheader"]').forEach(function($n) {
			$n.setAttribute('style', 'padding-left: 4px; text-align: left;');
		});

		//get tops
		var anchor = $x('//table//tr[1]//table[@height="100%"][1]//a');
		tops = [];
		tops.push(anchor[0]);
		if (anchor[1]) {
			tops.push(anchor[1]);
		}
		if (anchor[2]) {
			tops.push(anchor[2]);
		}

		nTop = tops.length;//# tops
		SorC = (nTop == 3) ? 2 : /Consi/.test(getTXT('//table'));//Sotto or Consi

		don = tops[0].textContent;
		sot = (nTop > 1 && (nTop == 3 || SorC == 0)) ? tops.pop().textContent : null;
		con = (nTop > 1 && (nTop == 3 || SorC == 1)) ? tops.pop().textContent : null;

		//get capos
		aCapos = [];
		var lineup = $x('//tr[@valign="top"]//td[@class="subtableheader"]');
		for (i = 0; i < lineup.length; i++) {
			aCapos.push('#'+lineup[i].textContent+'#');
		}
		sCapos = aCapos.join();

		//add capos list to top table
		if (aCapos.length > 0) {//no need to add empty list
			var target = $X('//table//table//tr['+(nTop+6)+']');
			capoTr = target.cloneNode(1);//no need to make our own
			capoTr.getElementsByTagName('td')[0].innerHTML = 'Capos:';

			capos = '';
			aCapos.forEach(function($n){ n = $n.replace(/#/g,''); capos += '<a href="user.php?nick='+n+'">'+ n +'</a>, '; });
			capos = capos.replace(/, $/,'');//no last comma
			capoTr.getElementsByTagName('td')[1].innerHTML = capos;
			target.parentNode.insertBefore(capoTr,target);//insert list
		} else {
			nTop--;
		}

		//get objectowners
		aOwners = [];
		nObjects = $x('//table[@class="thinline"]')[2].getElementsByTagName('tr').length-4;
		for (i = 0; i < nObjects; i++) {
			td = $X('/html/body//center/table/tbody/tr[2]/td/table/tbody/tr['+(i+5)+']/td[3]');
			owner = td.textContent;
			aOwners.push('#'+owner+'#');//additional ## to prevent subtring recognision
			td.innerHTML = '<a href="user.php?nick='+owner+'">'+owner+'</a>';//linkify
		}
		sOwners = aOwners.join();

		//get spotowners
		bOwners = [];
		sObjects = $x('//table[@class="thinline"]')[3].getElementsByTagName('tr').length-5;
		for (i = 0; i < sObjects; i++) {
			std = $X('//center/table/tbody/tr[3]/td/table/tbody/tr['+(i+5)+']/td[2]');
			sowner = std.textContent;
			bOwners.push('#'+sowner+'#');//additional ## to prevent subtring recognision
			std.innerHTML = '<a href="user.php?nick='+sowner+'">'+sowner+'</a>';//linkify
		}
		cOwners = bOwners.join();

		//get onlines
		aOnline = [];
		$x('//a[@style="color: blue"]').forEach(function($n){aOnline.push('#'+$n.textContent+'#');});
		sOnline = aOnline.join();

		//mark VIP's and online's
		me = getValue('nick','');
		$x('//a[contains(@href,"user.php")]').forEach(function($n){
			n = $n.textContent;//nick
			color = 'blue';//default online color
			vip = tPos = '';
			if (n == don) { $n.innerHTML = '<u>'+n+'</u><small><sup>[D]</sup></small>'; color = 'red'; tPos='[D]'; }
			if (n == sot) { $n.innerHTML = '<u>'+n+'</u><small><sup>[S]</sup></small>'; color = 'red'; tPos='[S]'; }
			if (n == con) { $n.innerHTML = '<u>'+n+'</u><small><sup>[C]</sup></small>'; color = 'red'; tPos='[C]'; }

			if (sCapos.search('#'+n+'#') !=- 1) {
				$n.innerHTML = '<u>'+n+'</u><small><sup>(c)'+tPos+'</sup></small>';
				color = (tPos?'red':'orange');
				vip = '(c)'+tPos;
			}
			vip += tPos;
			if (sOwners.search('#'+n+'#') !=- 1) {
				$n.innerHTML = (vip!=''?'<u>':'')+n+(vip!=''?'</u>':'')+'<small><sup>(O)'+vip+'</sup></small>';
				if (vip == '') {
					color = 'green';
				}
			}
			if (cOwners.search('#'+n+'#') !=- 1) {
				$n.innerHTML = (vip!=''?'<u>':'')+n+(vip!=''?'</u>':'')+'<small><sup>(s)'+vip+'</sup></small>';
				if (vip == '') {
					color = 'purple';
				}
			}
			if (sOnline.search('#'+n+'#') !=- 1) {
				$n.setAttribute('class', color);
			}
			if (n == me) {
				$n.innerHTML = '>'+$n.innerHTML+'<';
			}
		});

		//add legend to members table
		var memTable = $x('//table[@class="thinline"]')[6].getElementsByTagName('tr');
		memTable[0].innerHTML = '<td class="tableheader" style="text-align:left !important">&nbsp;'+lang.fampage[0]+'</td><td class="tableheader" style="font-weight:normal !important; text-align:right !important;"><span><sup>(<u>capo/top3</u>) - (online > <span class="blue">'+lang.fampage[1]+'</span> | <span class="green">'+lang.fampage[2]+'</span> | <span class="purple">'+lang.fampage[3]+'</span> | <span class="orange">capo</span> | <span class="red">top3</span>)</sup></span>&nbsp;</td>';

		for (i = 0; ++i < memTable.length;) {//cosmetical fix for colspan
			memTable[i].getElementsByTagName('td')[0].setAttribute('colspan', '2');
		}

		//add % online
		var membersL = $X('//table//table//tr['+(nTop+8)+']/td');
		var membersR = $X('//table//table//tr['+(nTop+8)+']/td[2]');
		var mem = parseInt(membersR.textContent, 10);
		membersR.innerHTML = Math.round(aOnline.length / mem * 100) + '% ('+aOnline.length + ' / ' + membersR.textContent + ' )';
		membersL.innerHTML = membersL.textContent.replace(':', '') + ' Online:';

		//add # space left
		var HQ = $X('//table//table//tr['+(nTop+10)+']/td[2]');
		HQ.innerHTML = HQ.textContent + ' (' + (parseInt(HQ.textContent, 10)-mem) + ' open )';

		//calc CD/GF promos
		var promo = $x('//table[@class="thinline"]//td[@class="tableitem"]//table//tr');

		var chiefP = promo[2].getElementsByTagName('td')[7].textContent.replace(/\D/g, '');
		var brugP = promo[3].textContent.replace(/\D/g, '');
		if (brugP != '0' && chiefP !='0') {
			var percentage = ((brugP-chiefP)/chiefP);
		} else {
			var percentage = 0;
		}
		var cdP = (parseInt((brugP*percentage), 10)+parseInt(brugP, 10));
		var gfP = (parseInt((cdP*percentage), 10)+parseInt(cdP, 10));

		promo[3].innerHTML = '<td>Bruglione</td><td>$ '+commafy(brugP)+'</td><td>Capodecina</td><td>$ '+commafy(cdP)+'</td><td>GF / FL</td><td>$ '+commafy(gfP)+'</td><td>&nbsp;</td><td>&nbsp;</td>';

		// add HR, Deaths and Worth
		var famid = dls.split("=")[1];
		var famIdFromImg = $X('//img[contains(@src, "family_image.php")]').src.match(/\d+/g)[0];
		var famname = $x('//td[@class="profilerow"]')[0].textContent.split(" ")[0].trim().toLowerCase();
		var url = (famid === famIdFromImg) ? 'id='+famid : 'ing='+famname;
		var maintable = $x('//table[@class="thinline"]/tbody')[0];
		var maintable2 = $x('//table/tbody/tr[1]/td')[2];

		GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT_LINK+'?p=stats&w=fampage&v='+sets.version.replace('_', '')+'&'+url,
			onload: function(xhr) {
				if(xhr.responseText.indexOf('Undefined variable:') == -1) {
					var response = JSON.parse(xhr.responseText);
					//highranks
					var hrtr = cEL('tr');
					hrtr.innerHTML = '<td class="subtableheader" style="padding-left: 4px; text-align: left;">Ranks:</td>';
					hrtr.innerHTML += '<td class="profilerow"><table width="100%"><tr><td>Godfather/First Lady:</td><td class="bold">'+response['hr']['gf']+'</td></tr> <tr><td>Capodecina:</td><td class="bold">'+response['hr']['cd']+'</td></tr><tr><td>Bruglione:</td><td class="bold">'+response['hr']['brug']+'</td></tr><tr><td>Chief:</td><td class="bold">'+response['hr']['chief']+'</td></tr><tr><td>Local Chief:</td><td class="bold">'+response['hr']['lc']+'</td></tr><tr><td>Assassin:</td><td class="bold">'+response['hr']['assa']+'</td></tr><tr><td>Swindler:</td><td class="bold">'+response['hr']['swin']+'</td></tr><tr><td colspan="2"><hr /></td></tr><tr><td>Total points:</td><td class="bold">'+response['hr']['pts']+'</td></tr></table></td>';
					maintable.appendChild(hrtr);
					//deaths
					var deathtable = cEL('table');
					deathtable.setAttribute('class', 'thinline');
					deathtable.setAttribute('width', '100%');
					deathtable.setAttribute('cellspacing', '0');
					deathtable.setAttribute('cellpadding', '2');
					deathtable.setAttribute('rules', 'none');
					deathtable.innerHTML = '<tr><td colspan="100%" class="tableheader">'+lang.fampage[6]+'<div style="float:right;margin-right:5px;margin-top:3px;"><a href="http://news.omertabeyond.com/deathslog/'+famid+'" target="_blank"><img src="'+GM_getResourceURL('changelog')+'" title="View full deathslog" /></a></div></td></tr><tr><td colspan="100%" bgcolor="black" height="1"></td></tr><tr><td class="bold" align="left">'+lang.fampage[8]+'</td><td class="bold" align="center">'+lang.fampage[9]+'</td><td class="bold" align="center">'+lang.fampage[10]+'</td><td class="bold" style="text-align:right;">'+lang.fampage[11]+'</td></tr>';
					if(response['deaths']){
						for (i = -1; ++i < response['deaths'].length;) {
							var extra = (response['deaths'][i]['Akill'] == 1)?'(<b>A</b>)':(response['deaths'][i]['BF'] == 1)?'(<b>BF</b>)':'';
							deathtable.innerHTML += '<tr><td>'+extra+' <a href="user.php?name='+response['deaths'][i]['Name']+'">'+response['deaths'][i]['Name']+'</a></td><td align="center"><a href="http://stats.omertabeyond.com/history.php?v='+sets.version.replace('_','')+'&name='+response['deaths'][i]['Name']+'">'+response['deaths'][i]['Rank']+'</a></td><td align="center">'+response['deaths'][i]['Date']+'</td><td style="text-align:right;">'+response['deaths'][i]['Agod']+'d '+response['deaths'][i]['Agoh']+'h '+response['deaths'][i]['Agom']+'m</td></tr>';
						}
					} else {
						deathtable.innerHTML += '<tr><td colspan="4" class="red" align="center">'+lang.fampage[13]+'</td></tr>';
					}
					var br = cEL('br');
					maintable2.appendChild(br);
					maintable2.appendChild(deathtable);
					//family changes
					var changetable = cEL('table');
					changetable.setAttribute('class', 'thinline');
					changetable.setAttribute('width', '100%');
					changetable.setAttribute('cellspacing', '0');
					changetable.setAttribute('cellpadding', '2');
					changetable.setAttribute('rules', 'none');
					changetable.innerHTML = '<tr><td colspan="100%" class=tableheader>'+lang.fampage[7]+'<div style="float:right;margin-right:5px;margin-top:3px;"><a href="http://news.omertabeyond.com/famlog/'+famid+'" target="_blank"><img src="'+GM_getResourceURL('changelog')+'" title="View full changelog" /></a></div></td></tr><tr><td colspan="100%" bgcolor=black height=1></td></tr><tr><td class="bold" align="left" width="28%">'+lang.fampage[10]+'</td><td class="bold" align="left">'+lang.fampage[12]+'</td></tr>';
					if(response['changes']){
						for (i = -1; ++i < response['changes'].length;) {
							changetable.innerHTML += '<tr><td align="left" width="28%" valign="top">'+response['changes'][i]['date']+'</td><td align="left">'+response['changes'][i]['text']+'</td></tr>';
						}
					} else {
						changetable.innerHTML += '<tr><td colspan="2" class="red" align="center">'+lang.fampage[14]+'</td></tr>';
					}
					var br = cEL('br');
					maintable2.appendChild(br);
					maintable2.appendChild(changetable);
					//position and worth
					var posrow = cEL('tr');
					posrow.innerHTML = '<td class="subtableheader" style="padding-left:4px; text-align:left;">'+lang.fampage[4]+':</td>';
					posrow.innerHTML += '<td class="profilerow">#'+response['pos']+' - '+lang.fampage[5]+': '+response['worth']+'</td>';
					$X('//td[@class="subtableheader"]').parentNode.parentNode.insertBefore(posrow, $X('//td[@class="subtableheader"]').parentNode.nextSibling);
				}
			}
		});
	}
	if(dls.indexOf('final=yes') != -1) {
		var famXP = db.textContent.split(' ')[3];
		if(famXP != 'erased') {
			setValue('family', famXP);
		}
	}
}
if(dlp == '/leavecrew.php') {
	if(db.textContent.search('You left the family') != -1) {
		setValue('family', 'None');
	}
}
//---------------- Manage Users (top3 only) ----------------
if (dls.indexOf('module=Family') != -1) {
	if(GetParam('who')){//invite from profile
		$X('//input[@name="invite"]').value = GetParam('who');
		$X('//input[@name="invite"]/parent::*/input[last()]').focus();
	}
	// Add promo calculation for CD/GF/FL.
	var promo = $x('//table[@class="color2"][2]//td//table//tr');
	var brugP = promo[6].textContent.replace(/\D/g, '');
	var perc =(brugP != '0') ? $x('//table[@class="color2"][2]/tbody/tr[9]/td/form/input')[1].value : 0;
	var cdP = ((parseInt((brugP/100),10)*perc)+parseInt(brugP));
	var gfP = ((parseInt((cdP/100),10)*perc)+parseInt(cdP));
	promo[6].innerHTML = '<td>Bruglione</td><td>$ '+commafy(brugP)+'</td><td>Capodecina</td><td>$ '+commafy(cdP)+'</td><br /><td>GF / FL</td><td>$ '+commafy(gfP)+'</td><td>&nbsp;</td><td>&nbsp;</td>';
}
if (dlp == '/cpuser.php' && db.innerHTML.search('type="password"') == -1) {
//--Add Capo Money list + calc
	var txt = $x('//td[@class="tableitem"]');//CapoMoney txt
	var nick = $x('//td[@class="tableheader"]/b');//Capo's
	nick.splice(0, 1);//remove first table (not a capo table)
	var table = $X('//table');//select first table
	var input = $X('//input[@value="Promote"]');//select first input
	var a = '//table[';
	var b = ']//tr/td[@class="tableheader"]/b';

	//setup new table
	var newTable = cEL('table');
	newTable.setAttribute('cellspacing', '0');
	newTable.setAttribute('cellpadding', '3');
	newTable.setAttribute('bordercolor', 'black');
	newTable.setAttribute('cellspacing', '0');
	newTable.setAttribute('border', '1');
	newTable.setAttribute('bgcolor', '#a8a8a8');
	newTable.setAttribute('width', '600');
	newTable.setAttribute('rules', 'none');
	//clone header from existing table
	var headTr = table.getElementsByTagName('tr')[0].cloneNode(1);
	headTr.getElementsByTagName('td')[0].innerHTML = '<b>Capomoney\'s</b>';
	var blackTr = table.getElementsByTagName('tr')[1].cloneNode(1);
	newTable.appendChild(headTr);
	newTable.appendChild(blackTr);
	//add CM list | switch to !DOM :D
		var newTr = cEL('tr');
			var newTd = cEL('td');
				var list = '<table width="100%">';
				list += '<tr><td></td><td><b>Capo</b></td><td><b>CapoMoney</b></td><td><b>to GF</b></td></tr>';
				for(i=0;i<nick.length;i++){//loop all capo's
					var n = i+2;
					var member = $x('count(//table['+n+']//tr[@valign="top"]//td/a)');//members
					var name = nick[i].textContent.slice(nick[i].textContent.indexOf(' '),nick[i].textContent.lastIndexOf(' (')).replace(/\s/,'');
					list += '<tr><td><a href="#'+name+'">&darr;</a></td><td><a href="http://'+dlh+'/user.php?nick='+name+'">'+name+'</a>('+member+')';
					list += '</td><td>';
					var CM = txt[i].innerHTML.slice(0,txt[i].innerHTML.indexOf('<'));
					CM = CM.replace(/[a-zA-Z]| |\s/g, '');
					list += CM.replace('$', '$ ') + '</td><td>';
					CM = CM.replace(/[^0-9]/g,'');
					list += (15000000 - CM)>0 ? '$ ' + commafy((15000000 - CM)) + '</td><td>' : '<b>X</b></td><td>';//GF
					$I(a+(i+2)+b,'<a name="' + name + '">' + $I(a+(i+2)+b) + '</a>&nbsp;<a href="#">&uarr; <u>'+lang.stats[0]+'</u> &uarr;</a>');
				}
				list += '</table>';
			newTd.innerHTML = list;
		newTr.appendChild(newTd);
	newTable.appendChild(newTr);

	table.parentNode.insertBefore(newTable, input.nextSibling);//add newTable to page
	table.parentNode.insertBefore(cEL('p'), input.nextSibling);//need more space ;)
}
if (dlp == '/cpbank.php' && db.innerHTML.search('type="password"') == -1) {
	//Shortcut to send
	var bank = $x('//table[@class="thinline"]//td[@class="tableheader"]/b');
	bank[2].innerHTML += '&nbsp;<a href="#sent">&darr;</a>';
	bank[3].innerHTML += '&nbsp;<a name="sent"><a href="#">&uarr;</a>';
	//Calculators
	var func1  = 'javascript: var amt=this.value.replace(/\\D/g,\'\'); if(amt){ get = document.getElementById(\'';//put ID here
	var func2 = '\'); if(get){ tmp = \'\'+Math.round(amt';//put factor here
	var func3  = '); str =\'\'; while(tmp > 0){ if(str!=\'\'){ while(str.length % 4 !=3 ){ str = \'0\' + str;};';
	func3 += 'str = \',\' + str;};dec = (tmp % 1000)+\'\';str = dec + str;tmp = Math.floor(tmp/1000);};';
	func3 += 'get.textContent = \'$\' + str}; };';
	var func_switch  = '* (amt >= 1000000 ? (amt >= 3000000 ? (amt >= 6000000 ? (amt >= 10000000 ? (amt >= 15000000 ? ';
	func_switch += '(amt >= 21000000 ? (amt >= 27000000 ? (amt >= 35000000 ? 1.01 : 1.015) : 1.02) : 1.025 ) : 1.03) : 1.035)';
	func_switch += ' : 1.04) : 1.045) : 1.05 )';

	var tbl = '<tr><td class="tableheader" colspan="4">Calculators</td></tr>';
	tbl += '<tr><td align="right" width="25%">'+lang.calc[0]+'</td>';
	tbl += '<td align="center" width="25%"><input name="amount" type="text" value="" onKeyUp="'+func1+'get'+func2+'*0.85'+func3+'" /></td>';
	tbl += '<td align="right" width="25%">'+lang.calc[1]+'</td><td align="center" id="get" width="25%">$0</td></tr>';
	tbl += '<tr><td align="right" width="25%">'+lang.calc[2]+'</td>';
	tbl += '<td align="center" width="25l%"><input name="amount" type="text" value="" onKeyUp="'+func1+'give'+func2+'/0.85'+func3+'" /></td>';
	tbl += '<td align="right" width="25%">'+lang.calc[3]+'</td><td align="center" id="give" width="25%">$0</td></tr>';
	var newtable = cEL('table');
	newtable.setAttribute('class', 'thinline');
	newtable.setAttribute('width', '600');
	newtable.setAttribute('align', 'center');
	newtable.setAttribute('rules', 'none');
	newtable.innerHTML = tbl;
	var br = cEL('br');
	$X('//center').firstChild.nextSibling.insertBefore(br, $x('//table[@class="thinline"]')[1]);
	$X('//center').firstChild.nextSibling.insertBefore(newtable, $x('//br')[1]);

	if (prefs[5]) {
		var inputs = $x('//input[@name="amount"] | //input[@name="amounttpob"]');
		inputs.forEach(function($n){
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');

		});
	}
}
//---------------- Group Crimes AF ----------------
if (prefs[26]) {
	//Accept link AF
	if (dls == '?module=GroupCrimes') {
		var a = $x('//a').length;
		for (y = 0; y < a; y++) {
			if ($x('//a')[y].textContent.indexOf(lang.accept) != -1) { // 'Accept'
				$x('//a')[y].focus();
				y = 100;
			}
		}
	}
	//Heist AF
	if ((/\bHeist\b/).test(dls)) {
		if (/gun/.test(db.innerHTML) && /carid/.test(db.innerHTML) == false) {
			if (getELNAME('bullets')[0]) {
				getELNAME('bullets')[0].value = 50;
			}
			if (getELNAME('gun')[0]) {
				getELNAME('gun')[0].value = 'real';
			}
			dr = getELNAME('driver')[0];
			if (dls.indexOf('who') != -1) {
				dr.value = dls.split('&who=')[1]; //referral from profile page
			}
			if (dr) {
				dr.focus();
			}
		}
		if (/action=go/.test(db.innerHTML)) {
			$x('//input')[10].focus();
		}
		if (/action=cancel/.test(db.innerHTML) && /action=go/.test(db.innerHTML) == false  && /action=set_car/.test(db.innerHTML) == false) {
			$X('//a').focus();
		}
		if (/action=set_car/.test(db.innerHTML)) {
			$X('//input').focus();
		}
		if (/result:/.test(db.innerHTML)) {
			$X('//a').focus();
		}
	}
	//OC AF
	if ((/orgcrime/).test(dlp)) {
		if ($X('//a[contains(@href, "takepart=yes")]')) {
			$X('//a[contains(@href, "takepart=yes")]').focus();
		}
		if (/countsafehouse/.test(db.innerHTML)) {
			getELNAME('countsafehouse')[0].checked = true;
		}
		if (/bulletz/.test(db.innerHTML)) {
			$x('//input')[1].focus();
			$X('//input').value = 100;
			$x('//option')[1].selected = true;
		}
		if (/exploz/.test(db.innerHTML)) {
			$x('//input[@type="radio"]')[1].checked = true;
			$x('//input')[2].focus();
		}
		if (/caridz/.test(db.innerHTML)) {
			$X('//input').focus();
		}
		if (/expexp/.test(db.innerHTML)) {
			$X('//input').focus();
		}
		$x('//input')[8].focus();
	}
	//MOC AF
	if ((/MegaOC/).test(dls)) {
		if (/action=setexplosives/.test(db.innerHTML)) { //as EE
			$x('//input[@type="radio"]')[2].checked = true;
			window.addEventListener('load', function () {
				$x('//input')[3].focus();
			}, true);
		}
		if (/action=setcar/.test(db.innerHTML)) { //as DR
			window.addEventListener('load', function () {
				$x('//input')[0].focus();
			}, true);
		}
		if (/action=setbullets/.test(db.innerHTML)) { //as WE
			$X('//input[@type="text"]').value = 500;
			window.addEventListener('load', function () {
				$X('//input[@type="submit"]').focus();
			}, true);
		}
		if (/drivers/.test(db.innerHTML)) { //as LE
			window.addEventListener('load', function () {
				$X('//input[@type="submit"]').focus();
			}, true);
		}
	}
	//Spot raid
	if ((/Spots/).test(dls)) {
		if (/driver/.test(dls)) {
			$x('//input[@name="driver"]').forEach(function ($n) {
				$n.value = GetParam('driver');
			});
		}
		if (/action=accept_raid/.test(db.innerHTML)) {
			if ($X('//a[contains(@href, "action=accept_raid")]')) {
				$X('//a[contains(@href, "action=accept_raid")]').focus();
			}
		}
	}
}
//---------------- Raidpage ----------------
if ((dls == '?module=Spots' || dls == '?module=Spots&action=' || dls.indexOf('driver') != -1) && prefs[34]) {
	if (db.innerHTML.indexOf('/static/images/cities/maps') != -1) {
		var am = $x('//div[contains(@id, "spot_")]').length / 3; // get total amount of spots
		var city = $x('//b')[0].textContent;

		function whatspot(city, type) {
			var cords;
			if (city == 'Detroit') {
				cords = (type == lang.raidpage[13])?'F3':(type == lang.raidpage[14])?'G10':(type == lang.raidpage[15])?'J6':(type == lang.raidpage[16])?'G6':(type == lang.raidpage[17])?'F1':(type == lang.raidpage[18])?'G1':(type == lang.raidpage[19])?'H8':(type == lang.raidpage[20])?'?':(type == lang.raidpage[21])?'E4':(type == lang.raidpage[22])?'I2':(type == lang.raidpage[23])?'G7':(type == lang.raidpage[24])?'H7':(type == lang.raidpage[25])?'F10':(type == lang.raidpage[26])?'H6':'';
			}
			if (city == 'Chicago') {
				cords = (type == lang.raidpage[13])?'D5':(type == lang.raidpage[14])?'J7':(type == lang.raidpage[15])?'H5':(type == lang.raidpage[16])?'F6':(type == lang.raidpage[17])?'L9':(type == lang.raidpage[18])?'M7':(type == lang.raidpage[19])?'F7':(type == lang.raidpage[20])?'?':(type == lang.raidpage[21])?'M10':(type == lang.raidpage[22])?'L7':(type == lang.raidpage[23])?'H6':(type == lang.raidpage[24])?'H8':(type == lang.raidpage[25])?'C4':(type == lang.raidpage[26])?'E5':'';
			}
			if (city == 'Las Vegas') {
				cords = (type == lang.raidpage[15])?'J7':(type == lang.raidpage[22])?'F6':(type == lang.raidpage[23])?'H7':(type == lang.raidpage[24])?'I6':(type == lang.raidpage[25])?'E5':'';
			}
			if (city == 'Corleone') {
				cords = (type == lang.raidpage[17])?'I7':(type == lang.raidpage[22])?'G6':(type == lang.raidpage[24])?'H6':(type == lang.raidpage[25])?'F5':'';
			}
			if (city == 'Palermo') {
				cords = (type == lang.raidpage[13])?'E5':(type == lang.raidpage[15])?'J8':(type == lang.raidpage[17])?'H4':(type == lang.raidpage[21])?'G6':(type == lang.raidpage[22])?'J7':(type == lang.raidpage[23])?'H5':(type == lang.raidpage[24])?'I6':(type == lang.raidpage[25])?'G4':(type == lang.raidpage[26])?'H6':'';
			}
			if (city == 'New York') {
				cords = (type == lang.raidpage[13])?'D4':(type == lang.raidpage[14])?'K6':(type == lang.raidpage[15])?'F8':(type == lang.raidpage[16])?'H5':(type == lang.raidpage[17])?'B6':(type == lang.raidpage[18])?'M9':(type == lang.raidpage[19])?'G8':(type == lang.raidpage[20])?'I8':(type == lang.raidpage[21])?'G4':(type == lang.raidpage[22])?'K5':(type == lang.raidpage[23])?'I5':(type == lang.raidpage[24])?'F6':(type == lang.raidpage[25])?'N7':(type == lang.raidpage[26])?'J6':'';
			}
			if (city == 'Philadelphia') {
				cords = (type == lang.raidpage[13])?'E5':(type == lang.raidpage[15])?'J3':(type == lang.raidpage[16])?'H5':(type == lang.raidpage[17])?'B3':(type == lang.raidpage[19])?'G9':(type == lang.raidpage[20])?'L6':(type == lang.raidpage[22])?'L2':(type == lang.raidpage[23])?'I4':(type == lang.raidpage[26])?'G6':'';
			}
			if (city == 'Baltimore') {
				cords = (type == lang.raidpage[13])?'D6':(type == lang.raidpage[15])?'G2':(type == lang.raidpage[17])?'M3':(type == lang.raidpage[21])?'K7':(type == lang.raidpage[22])?'G10':(type == lang.raidpage[23])?'F5':(type == lang.raidpage[24])?'G6':(type == lang.raidpage[25])?'B10':(type == lang.raidpage[26])?'F6':'';
			}
			return cords;
		}
		var div = cEL('div'); // the main div
		div.setAttribute('style', 'background-color:'+getValue('tableBg', '#F0F0F0')+', border:1px solid black; font-family:Tahoma,Verdana');
		var divdump = '<table class="thinline" style="width:630px" cellpadding="0"><tr class="tableheader"><td>&nbsp;</td><td>'+lang.raidpage[3]+'</td><td>'+lang.raidpage[4]+'</td><td>'+lang.raidpage[5]+'</td><td>'+lang.raidpage[6]+'</td><td>'+lang.raidpage[7]+'</td><td>'+lang.raidpage[11]+'</td></tr><tr><td height="2" bgcolor="black" colspan="7"></td></tr>';

		var user = getValue('nick', '');
		var ownerid = '';
		var ownfam = getValue('family', '');
		for (var y = 0; y < am; y+=1) {
			var id = $x('//*[@id="map"]/div[contains(@id, "spot_")]')[y].id; // = 'spot_*'
			id = parseInt(id.replace('spot_', ''));
			var type = getTXT('//*[@id="spot_default_'+id+'"]/b');
			var cords = whatspot(city, type);
			var owner = getTXT('//*[@id="spot_default_'+id+'"]/table/tbody/tr/td[2]');
			var time = ''
			if ($X('//*[@id="spot_default_'+id+'"]/table/tbody/tr[2]/td[2]') != null) {
				time = $X('//*[@id="spot_default_'+id+'"]/table/tbody/tr[2]/td[2]').innerHTML;
			}
			if (time == lang.raidpage[0]) {
				time = lang.raidpage[1];
			} else {
				time = '';
				if (getID('counter_nextraid_'+id+'_minutes_value') != null) { // make sure there are more than 60 sec left
					var timem = getID('counter_nextraid_'+id+'_minutes_value').innerHTML;
					time = timem+'m ';
				}
				if (getID('counter_nextraid_'+id+'_seconds_value') != null) {
					var times = getID('counter_nextraid_'+id+'_seconds_value').innerHTML;
					time += times+'s';
				} else {
					time = lang.raidpage[1];
				}
			}

			// making bars look good (white -> themetextcolor, adding % sign, some margin stuff)
			var profit = $X('//*[@id="spot_default_'+id+'"]/table/tbody/tr[3]/td[2]').innerHTML;
			var protnum = getID('jsprogbar_div_protection_'+id).innerHTML; // the actual % of protection
			var prot = $X('//*[@id="jsprogbar_protection_'+id+'"]/table/tbody/tr/td').innerHTML;
			prot = prot.replace('<div id="jsprogbar_div_protection_'+id+'" style="font-size: smaller; font-weight: normal; height: 15px; vertical-align: middle; overflow: hidden; text-align: center; position: absolute; width: 100px; color: rgb(255, 255, 255);">'+protnum+'</div>', '<div id="jsprogbar_div_protection_'+id+'" style="text-align:center; position:absolute; width:100px;"><font color="#000">'+protnum+'%</font></div>');
			var rpform = '';
			var rex = new RegExp('\\(([\\w\\s]+)\\)');
			var rpfam = owner.match(rex);
			if (ownfam != lang.status[1]) {
				if (rpfam != null) { // owned by player
					if (rpfam[1] != stripHTML(ownfam) && time == lang.raidpage[1]) { // not own fam
						rpform = '<form name="startraid" method="post" style="display:inline" action="index.php?module=Spots&action=start_raid"><input type="hidden" name="type" value="'+id+'" /><input type="hidden" name="bullets" /><input type="hidden" name="driver" /><input style="-moz-border-radius:5px; border-radius:5px;" type="submit" value="Go!" /></form>';
					}
				} else if (rpfam == null && time == lang.raidpage[1]) {
					rpform = '<form name="startraid" method="post" style="display:inline" action="index.php?module=Spots&action=start_raid"><input type="hidden" name="type" value="'+id+'" /><input type="hidden" name="bullets" /><input type="hidden" name="driver" /><input style="-moz-border-radius:5px; border-radius:5px;" type="submit" value="Go!" /></form>';
				} else {
					rpform = '';
				}
			}
			//parsing everything
			divdump += '<tr style="height: 22px;"><td style="padding-left:5px">'+cords+'</td><td>'+type+'</td><td>'+(owner!=lang.raidpage[12]?('<a href="http://'+dlh+'/user.php?nick='+owner.split(' ')[0]+'">'+owner.split(' ')[0]+'</a> '+ (owner.split(' ')[1]?owner.split(' ')[1]:'')):owner)+'</td><td style="text-align:right; padding-right:10px">'+profit+'</td><td><table cellpadding="0" cellspacing="0" style="border:1px solid #000; margin:0px; padding:0px; width:102px; -moz-border-radius:3px; border-radius:3px;"><tr><td>'+prot+'</td></tr></table></td><td style="text-align:center">'+time+'</td><td style="text-align:center">'+rpform+'</td></tr>';
			if(owner.split(' ')[0] == user) { ownerid = id; }
		}
		divdump += '</table>';
		div.innerHTML = divdump;
		var div2 = cEL('div2'); // Div with forms
		div2.setAttribute('style', 'background-color:'+getValue('tableBg', '#F0F0F0')+', border:1px solid black; color:#FFF');
		if (ownerid != null && $X('//div[@id="spot_extra_'+ownerid+'"]') != null ){
			div2.innerHTML = '<table class="thinline" style="width:630px"><tr><td colspan="2" class="tableheader">'+lang.raidpage[10]+'</td></tr><tr><td colspan="2" height="1" bgcolor="black"></td></tr><tr style="background-color:'+getValue('tableBg', '#F0F0F0')+'"><td>'+$X('//div[@id="spot_extra_'+ownerid+'"]').innerHTML+'</td></tr></table>';
		} else {
			div2.innerHTML = '<table class="thinline" style="width:630px"><tr><td colspan="2" class="tableheader">'+lang.raidpage[10]+'</td></tr><tr><td colspan="2" height="1" bgcolor="black"></td></tr><tr style="background-color:'+getValue('tableBg', '#F0F0F0')+'"><td style="text-align:right">'+lang.raidpage[8]+'</td><td style="padding-left:40px"><input style="-moz-border-radius:5px; border-radius:5px; padding-left:4px" id="raidpagebullets" type="text" name="bullets" size="3" value="200" /></td></tr><tr style="background-color:'+getValue('tableBg', '#F0F0F0')+'"><td style="text-align:right;">'+lang.raidpage[9]+'</td><td style="padding-left:40px"><input style="-moz-border-radius:5px; border-radius:5px; padding-left:4px" id="raidpagedriver" type="text" name="driver" /></td></tr></table>';
		}
		var c = cEL('center');
		db.innerHTML = '';
		c.appendChild(cEL('br'));
		c.appendChild(div2);
		c.appendChild(cEL('br'));
		c.appendChild(div);
		db.appendChild(c);

		$x('//input')[1].focus();

		//regrap all values (for AFing sake)
		for (y = 0; y <= am; y+=1) {
			if (getELNAME('bullets')[y] != null) { getELNAME('bullets')[y].value = getID('raidpagebullets').value; }
		}
		var str = GetParam('driver');
		str = str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();

		for (y = 0; y <= am; y+=1) {
			if (getELNAME('driver')[y] != null) { getELNAME('driver')[y].value = str; }
		}

		getID('raidpagebullets').addEventListener('keyup', function() {
			for (y = 0; y <= am; y+=1) {
				if (getELNAME('bullets')[y] != null) { getELNAME('bullets')[y].value = getID('raidpagebullets').value; }
			}
		}, true);

		getID('raidpagedriver').addEventListener('keyup', function() {
			var str = getID('raidpagedriver').value;
			str = str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
			for (y = 0; y <= am; y+=1) {
				if (getELNAME('driver')[y] != null) { getELNAME('driver')[y].value = str; }
			}
		}, true);
	}
}
//----------------Race AF ----------------
if (prefs[29]) {
	if (dlp == '/races.php') {
		if (/do_race/.test(db.innerHTML)) {
			$x('//input[@type="submit"]')[0].focus();
		}
		if (/racer2/.test(db.innerHTML)) {
			$X('//input[contains(@name, "racer2")]').focus();
		}
		if (/class=\"Normal\"/.test(db.innerHTML)) {
			$x('//a[contains(@href, "decision=1")]')[0].focus();
		}

		if (!/input/.test(db.innerHTML) && !/table/.test(db.innerHTML)) {
			if (db.innerHTML.match(lang.race[0])) {
				db.innerHTML = db.innerHTML;
			} else {
				db.innerHTML = db.innerHTML + '<br /><a href="/BeO/webroot/index.php?module=Mail">><u>Inbox</u><</a>';
			}
		}
	}
}

//---------- m/k usage race -----------
if (dlp == '/races.php') {
	//add m/k usage in amount boxes
	if (prefs[5]) {
		var inputs = $x('//input[@name="amount"]');
		inputs.forEach(function ($n) {
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
		});
	}
}
//---------------- Blood AF ----------------
if (prefs[27] && (dls.indexOf('?module=Bloodbank&action=') != -1 || dls.indexOf('?module=Shop') != -1)) {
	var table, prices, tr, A, B, t, m, type, types, ajaxDiv;
	type = getValue('bloodType');

	function bloodAF(t) {
		//setup costs row
		table = $X('/html/body//table/tbody/tr[2]/td/table');
		prices = $x('//td[@align="center"]'); //4,5,6,7
		tr = '<tr><td><font size="2"><b> &nbsp;Total Costs </b></font></td><td align="center"><font size="2" id="A"></font></td><td align="center"><font size="2" id="B"></font></td><td align="center"><font size="2" id="AB"></font></td><td align="center"><font size="2" id="O"></font></td></tr>';
		table.innerHTML = table.innerHTML + tr;

		function getType(num) {
			return parseInt(getTXT('/html/body//table/tbody/tr[2]/td/table/tbody/tr[3]/td[' + num).replace('$ ', ''), 10);
		}

		function setType(num) {
			return $x('//option')[num].selected = true;
		}

		function calc(a, b, ab, o) { //see if user can buy bloodtype and then calc total price
			$I('//font[@id="A"]', a ? '$ ' + m * prices[9].textContent.replace('$ ', '') : 'X');
			$I('//font[@id="B"]', b ? '$ ' + m * prices[10].textContent.replace('$ ', '') : 'X');
			$I('//font[@id="AB"]', ab ? '$ ' + m * prices[11].textContent.replace('$ ', '') : 'X');
			$I('//font[@id="O"]', o ? '$ ' + m * prices[12].textContent.replace('$ ', '') : 'X');
		}
		if ($X('//input')) {
			m = parseInt($X('//input').value);
			types = [getType('2]'), getType('3]'), getType('4]'), getType('5]')];
			A = [types[0], types[3]];
			B = [types[1], types[3]];

			if (t == 'A') {
				calc(1, 0, 0, 1);
				setType(A.iMin());
			}
			if (t == 'B') {
				calc(0, 1, 0, 1);
				setType(B.iMin());
			}
			if (t == 'AB') {
				calc(1, 1, 1, 1);
				setType(types.iMin());
			}
			if (t == 'O') {
				calc(0, 0, 0, 1);
				setType(0);
			}
			$x('//input')[1].focus();
		} else {
			calc(0, 0, 0, 0);
		}
	}

	if (dls.indexOf('?module=Shop') != -1) { //bloodbank via Shop
		ajaxDiv = cEL('div');
		ajaxDiv.id = 'ajaxDiv';
		ajaxDiv.style.display = 'none';
		ajaxDiv.innerHTML = type;
		db.appendChild(ajaxDiv); //re-route intel via page to by-pass FF security because...
		getID('smsdivcontainer').addEventListener('DOMNodeInserted', function (event) { //EventListener won't allow getValue()!
			if (event.target.innerHTML.search('<td><b>&nbsp;AB</b></td>') != -1) { //trigger
				bloodAF($I('//div[@id="ajaxDiv"]'));
			}
		}, false);
	}
	if (dls.indexOf('?module=Bloodbank') != -1) { //bloodbank via stand-alone
		bloodAF(type);
	}
}

//---------------- HP+Mentor AF ----------------
if (dlp == '/honorpoints.php' && dls) {
	inputs = $x('//input');
	who = dls.split('=')[1];
	mentor = dls.split('=')[2];
	if (dls == '?who=' + who) {
		inputs[0].value = who;
		inputs[1].value = '';
		inputs[1].focus();
	}
	if (dls == '?view=mentorsetup&mentor=' + mentor) {
		$x('//input')[0].value = mentor;
		inputs[1].focus();
	}
}

//---------------- Compatibility page ----------------
if (dlp == '/servers.php') {
	var x = $x('//ul/font/li');
	//x.forEach(function($n){ $n.style.listStyleImage = 'url(\'' + GM_getResourceURL('brcGear') + '\')'; });
	x[0].innerHTML += ' - Compatible';
	x[2].innerHTML += ' - Compatible';
	x[7].innerHTML += ' - Compatible';
	x[9].innerHTML += ' - Compatible';
}

//---------------- sell ws ----------------
if (dlp == '/obay.php' && dls.indexOf('type=10') != -1 && db.innerHTML.indexOf('<table') != -1 && $x('//input')[3]) {
	$x('//input')[2].value = (getValue('wsID') ? getValue('wsID') : '');
	$x('//input')[3].checked = true;
	$x('//input')[5].focus();
}

//---------------- sell bg ----------------
if (dlp == '/obay.php' && dls.indexOf('type=14') != -1 && db.innerHTML.indexOf('<table') != -1 && $x('//input')[3]) {
	$x('//input')[2].value = (GetParam('id') ? GetParam('id') : '');
	$x('//input')[3].checked = true;
	$x('//input')[5].focus();
}

//---------------- OBAY ----------------
if (dlp == '/obay.php' && db.innerHTML.indexOf('<table') != -1) {
	if (dls.indexOf('specific') == -1) { //we are not on item details, so it must be the overview
		$x('//table[3]//tr').forEach(function($n) { //loop ALL objects table row
			var sort_b = dls.indexOf('type=11') != -1?1:0; //are we sorting on bullets?
			var sort = (dls.indexOf('type=all') == -1 && dls != '')?1:0; //are we sorting at all?
			if(['one','two','three'].indexOf($n.getAttribute('class')) > -1) { //this row has an object
				//add price per bullets
				if ($n.innerHTML.indexOf(sets.obay[sort_b]) != -1) { //are there bullets for sale?
					var bullets = parseInt($n.getElementsByTagName('td')[(1 + !sort_b)].innerHTML.replace(/[^0-9.]/g, ''), 10);
					var price = parseInt($n.getElementsByTagName('td')[(2 + !sort_b)].innerHTML.replace(/[^0-9.]/g, ''), 10);
					$n.getElementsByTagName('td')[(1 + !sort_b)].innerHTML = $n.getElementsByTagName('td')[(1 + !sort_b)].innerHTML + ' ($ ' + Math.round(price / bullets) + ')';
				}
				//add fast bid link
				var id = $n.getElementsByTagName('a')[0].href.split('=')[1];
				var bid = $n.getElementsByTagName('td')[(sort?2:3)].innerHTML.replace(/\D/g,'');
				var bettd = cEL('td');
				bettd.setAttribute('style', 'cursor:pointer;');
				bettd.innerHTML = '<form id="form'+id+'" method="post" style="display:none;" action="obay.php"><input type="hidden" value="" name="k"><input type="hidden" value="'+id+'" name="specific" /><input type="hidden" value="" name="bid" id="bid'+id+'" /><input type="hidden" value="0" name="anon" /></form>Bid';
				bettd.addEventListener('click', function() {
					GM_xmlhttpRequest({//grab min bid
						method:'GET',
						url:'/obay.php?specific='+id,
						onload:function(resp){
							var dummy = cEL('div');//we'd like to use DOM here
							dummy.style.display = 'none';
							dummy.id = 'xhr';
							dummy.innerHTML = resp.responseText;
							db.appendChild(dummy);
							if($X('//div[@id="xhr"]')) {
								var minbid = $X('//div[@id="xhr"]//input[2]').getAttribute('value');
								getID('bid'+id).value = minbid;
								getID('form'+id).submit();
							}
						}
					});
				}, true);
				$n.appendChild(bettd);
			} else if($n.getAttribute('class') != 'tableitem') { //this row does not have an object, but needs adjusted colspan
				$n.innerHTML = $n.innerHTML.replace('colspan="'+(sort?5:6)+'"','colspan="'+(sort?6:7)+'"');
			} else { //this row needs another collumn alltogether
				var bet = cEL('td');
				bet.innerHTML = sets.obay[2];
				$n.appendChild(bet);
			}
		});
	}
	if (dls.indexOf('specific') != -1) { //add focus and check on every page
		if (db.innerHTML.indexOf(sets.obay[1]) != -1) {
			if (sets.version == '_dm' || sets.version == '_com') {
				var xpathtr = '';
				var xpath2tr = '[2]';
			} else {
				var xpathtr = '[3]';
				var xpath2tr = '[4]';
			}
			var xpath = '/html/body//center/table/tbody/tr'+xpathtr+'/td[3]';
			var xpath2 = '/html/body//center/table/tbody/tr'+xpath2tr+'/td';

			if (sets.obay[0].match($I(xpath).split('<br>')[0])) {
				var price = $X(xpath).innerHTML.split('<br>')[3].replace(/[^0-9.]/g, '');
				var bullets = $X(xpath2).innerHTML.replace(/[^0-9.]/g, '');
				$I(xpath2, $I(xpath2) + '<br /><b>$' + Math.round(price / bullets) + ' per bullet</b>');
				$x('//input')[1].select();
			}
		}
		$x('//input[@type="radio"]')[2].checked = true;
		$x('//input[@type="submit"]')[1].focus();

		if (prefs[5]) {
			var inputs = $x('//input[@name="bid"]');
			inputs.forEach(function ($n) {
				$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
			});
		}
		if(db.innerHTML.indexOf('Bodyguard') != -1){
			var color = getValue('titleBg', '#3F505F');
			var id = parseInt(GetParam('specific'), 10);
			GM_xmlhttpRequest({//grab bg details
				method:'GET',
				url:'/BeO/webroot/index.php?module=Bodyguards&action=obay_details&auctid='+id,
				onload:function(resp){
					var dummy = cEL('div');//we'd like to use DOM here
					dummy.id = 'xhr';
					dummy.innerHTML = resp.responseText;
					dummy.setAttribute('style', 'position:fixed; right:500px; bottom:5px; width:250px !important; text-align:center; background-color:' + color + ' !important;');
					db.appendChild(dummy);
					$Del('//div[@id="xhr"]//img');
					$Del('//div[@id="xhr"]//div[@class="oheader"]');
				}
			});
		}
	}
}
if (dls.indexOf('action=tosell') != -1) {
	if (prefs[5]) {
		var inputs = $x('//input[@name="minbid"]');
		inputs.forEach(function ($n) {
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
		});
	}
}

//---------------- INBOX -----------------------
if (dls.indexOf('action=inbox') != -1 || dls.indexOf('iParty=2') != -1) {
	var msg = $x('//td[@style="cursor:pointer;cursor:hand"]').length
	var unreadmsg = $x('//tr[@class="color2"]').length
	var id = [];
	for(var i=0;i<msg;i++){ //find first open spot
		id[i] = $x('//a[contains(@href,"showMsg")]')[i].href.split('?')[1].match(/\d+/g);
		setValue('msgids', id.join(',')); //join and save values
	}
	var unreadid = [];
	for(var a=0;a<unreadmsg;a++){ //find first open spot
		unreadid[a] = $x('//tr[@class="color2"]/td[2]/a')[a].href.split('?')[1].match(/\d+/g);
		setValue('unread', unreadid.join(',')); //join and save values
	}

	var br = cEL('br');
	var span = getTAG('span')[0];
	var chkbutton = cEL('input');

	chkbutton.setAttribute('type', 'button');
	chkbutton.setAttribute('value', '  (Un)Select All   ');
	chkbutton.setAttribute('style', 'margin-top:3px;');
	chkbutton.setAttribute('onclick', 'var box = document.getElementsByName(\'selective[]\'); var length = box.length; for(var i=-1; ++i<length;){ if(box[i].checked==1){ box[i].checked=false; } else { box[i].checked=true; } };');

	span.appendChild(br);
	span.appendChild(chkbutton);

	var num = 1;
	$x('//tr[@class="color1"] | //tr[@class="color2"]').forEach(function ($n) {
		var space = document.createTextNode(' ');
		var id = $n.cells[1].innerHTML.split('?')[1].match(/\d+/g)[0];
		var target = $n.cells[0].getElementsByTagName('input')[0] ? $n.cells[0].getElementsByTagName('input')[0] : false;

		//add delete icon
		var delImg = cEL('img');
		delImg.setAttribute('title', 'Delete');
		delImg.setAttribute('src', GM_getResourceURL('deleteIcon'));
		delImg.setAttribute('onClick', 'location.href="/BeO/webroot/index.php?module=Mail&action=delMsg&iId=' + id + '&iParty=2"');
		delImg.setAttribute('style', 'cursor:pointer; padding-right:3px; padding-left:4px; height:16px; width:16px; border:1px');
		$n.cells[0].setAttribute('width', '80');

		if (target) { //before the select box
			delImg.style.paddingLeft = '0px'; //looksee fix :x
			target.parentNode.insertBefore(delImg, target);
		} else {
			$n.cells[0].appendChild(delImg);
		}

		if ($n.cells[2].innerHTML.indexOf('user.php?nick=') != -1) { //add reply icon
			var replyImg = cEL('img');
			replyImg.setAttribute('title', 'Reply');
			replyImg.setAttribute('src', GM_getResourceURL('reply'));
			replyImg.setAttribute('onClick', 'location.href="/BeO/webroot/index.php?module=Mail&action=sendMsg&iReply=' + id + '"');
			replyImg.setAttribute('style', 'cursor:pointer; padding-right:3px; padding-left:3px; height:16px; width:16px; border:1px;');
			$n.cells[0].setAttribute('width', '95');

			$n.cells[0].appendChild(replyImg);
		}
		if (num < 11 && prefs[31]) { //add msg hotkeys
			var link = $n.childNodes[3];
			link.innerHTML = '[' + (num == 10 ? 0 : num) + '] ' + link.innerHTML;
			link.childNodes[1].setAttribute('accesskey', (num == 10 ? 0 : num));
			num++;
		}
	});

	var keys = ['-', '=', '[', ']', ';', '\''];
	var selectors = $x('//td[@align="right"][@colspan="100%"]//a');
	for (i = -1; ++i < selectors.length;) {
		selectors[i].innerHTML = '[<b>' + keys[i] + '</b>] ' + selectors[i].innerHTML;
		selectors[i].setAttribute('accesskey', keys[i]);
	}
}
if (dls.indexOf('action=outbox') != -1 || dls.indexOf('iParty=1') != -1){
	$x('//a[contains(@href,"showSentMsg")]').forEach(function ($n) {
		var id = $n.href.split('?')[1].match(/\d+/g)[0];
		var delImg = "<img onClick='location.href=\"/BeO/webroot/index.php?module=Mail&action=delMsg&iId=" + id + "&iParty=1\"' src='"+GM_getResourceURL('deleteIcon')+"' title='Delete' style='cursor:pointer; padding-right:3px; padding-left:4px; height:16px; width:16px; border:1px' />";
		$n.parentNode.innerHTML = delImg + ' ' + $n.parentNode.innerHTML;
	});
}

if (dls.indexOf('action=showMsg') != -1 || dls.indexOf('action=showSentMsg') != -1) {
	var id = $X('//a[contains(@href,"delMsg")]').href.split('?')[1].match(/\d+/g)[0];
	var ids = getValue('msgids', '');
	ids = ids.split(','); //load stored data
	var len = ids.length;
	for(i = 0;i<len;i++){
		if (ids[i] == id) {
			var nonext = (i==0)?'visibility:hidden; ':'';
			var noprev = (i==len-1)?'visibility:hidden; ':'';
			var next = ids[i-1];
			var prev = ids[i+1];
		}
	}
	var unread = getValue('unread', '').split(',');
	var unreadlen = unread.length;
	for (var x = 0; x < unreadlen; ++x) {
		if (unread[x] != '' && unread[x] == id) { //msg is unread
			var msgTyp = getTXT('/html/body/center/table/tbody/tr/td[2]/table/tbody/tr/td/b');
			var msgText = '/html/body/center/table/tbody/tr/td[2]/table/tbody/tr[5]/td';
			var arr = $X(msgText).innerHTML.split(' ');
			var bulletmsg = new RegExp(lang.inbox[7]);
			if (bulletmsg.test(msgTyp)) { //grab obay bullets from message
				setValue('obaybul', (getValue('obaybul', 0) + parseInt(arr[2], 10)));
			}

			// resave unread msg's, without our msg
			var str = '';
			for (var y = 0; y < unreadlen; ++y) {
				if (unread[y] != '' && unread[y] != id) {
					str += ','+unread[y];
				}
			}
			setValue('unread', str.substr(1));
			x = unreadlen; // not needed to continue because we found our id
		}
	}
	window.addEventListener('keydown', function(e){
		var key = e.keyCode;
		if(key==39){ //right, reply
			window.location = '/BeO/webroot/index.php?module=Mail&action=sendMsg&iReply='+id;
		}
		if(key==38 && id != ids[0]) { //up, select previous
			window.location = '/BeO/webroot/index.php?module=Mail&action=showMsg&iMsgId='+next;
		}
		if(key==40 && id != ids[len-1]) { //down, select next
			window.location = '/BeO/webroot/index.php?module=Mail&action=showMsg&iMsgId='+prev;
		}
		if(key==37) { //down, select next
			window.location = '/BeO/webroot/index.php?module=Mail&action=delMsg&iId='+id+'&iParty=2';
		}
	}, true);

	var titleRow = $X('/html/body/center/table/tbody/tr/td[2]/table/tbody/tr[1]/td');
	titleRow.innerHTML = titleRow.innerHTML+"<div style='float:right;padding-top:2px;'><img onClick='location.href=\"/BeO/webroot/index.php?module=Mail&action=showMsg&iMsgId="+prev+"\"' src='"+GM_getResourceURL('prevIcon')+"' title='Previous' style='"+noprev+"cursor:pointer;' />&nbsp;<img onClick='location.href=\"/BeO/webroot/index.php?module=Mail&action=showMsg&iMsgId="+next+"\"' src='"+GM_getResourceURL('nextIcon')+"' title='Next' style='"+nonext+"cursor:pointer;' /></div>";

	if ($X('//a[contains(@href,"/family.php?join=yes")]')) {
		$X('//a[contains(@href,"/family.php?join=yes")]').removeAttribute('target');
	}
	var linkz = $x('//table[@class="thinline"]/tbody/tr[7]/td/a').reverse();
	if (linkz.length == 1) {
		linkz[0].innerHTML = '<img src="' + GM_getResourceURL('deleteIcon') + '" onMouseover="style.cursor=\'pointer\'" title="Delete ([)" width="16" height="16" border="0" /> ';
		if (prefs[31]) { //add hotkeys to showMsg
			linkz[0].setAttribute('accesskey', '[');
		}
	} else {
		linkz[0].innerHTML = '<img src="' + GM_getResourceURL('reply') + '" onMouseover="style.cursor=\'pointer\'" title="Reply (])" width="16" height="16" border="0" /> ';
		linkz[1].innerHTML = '<img src="' + GM_getResourceURL('deleteIcon') + '" onMouseover="style.cursor=\'pointer\'" title="Delete ([)" width="16" height="16" border="0" /> ';
		if (prefs[31]) { //add hotkeys to showMsg
			linkz[0].setAttribute('accesskey', ']');
			linkz[1].setAttribute('accesskey', '[');
		}
	}
}
if (dls.indexOf('iReply=') != -1) {
	$X('//textarea').focus();
}
if (dls.indexOf('action=sendmessage') != -1) {
	if (db.innerHTML.indexOf('Message sent to') != -1) {
		setTimeout(function () {
			window.location = '/BeO/webroot/index.php?module=Mail&action=inbox';
		}, 1000);
	}
}
//---------------- linkify names ----------------
//---- link names in inbox
if (dls.indexOf('action=showMsg') != -1) {
	var msgType = getTXT('/html/body/center/table/tbody/tr/td[2]/table/tbody/tr/td/b');
	var msgTxt = '/html/body/center/table/tbody/tr/td[2]/table/tbody/tr[5]/td';
	arr = $X(msgTxt).innerHTML.split(' ');

	//if msg is heist inv.
	var heistInv = new RegExp(lang.linkify[0]);
	if (heistInv.test(msgType)) {
		if (arr[2] == lang.inbox[2]) { //check if this is invitation
			setArr(0);
			setArr(13);
			$I(msgTxt, arr.join(' '));
		} else {
			$I(msgTxt);
		}
	}
	//if msg is oc inv.
	var ocInv = new RegExp(lang.linkify[1]);
	if (ocInv.test(msgType)) {
		if (arr[2] == lang.inbox[2]) { //check if this is invitation
			if (arr[7] == lang.inbox[3] || arr[7] == lang.inbox[5]) {
				setArr(0);
				setArr(13);
				$I(msgTxt, arr.join(' '));
			}
			if (arr[7] == lang.inbox[4]) {
				setArr(0);
				setArr(12);
				$I(msgTxt, arr.join(' '));
			}
		} else {
			$I(msgTxt);
		}
	}
	//if msg is ticket update
	var thisIsTicket = new RegExp(lang.linkify[10]);
	if (thisIsTicket.test(msgType)) {
		var first = $X(msgTxt).innerHTML.indexOf('(');
		var last = $X(msgTxt).innerHTML.indexOf(')');
		var between = $X(msgTxt).innerHTML.slice(first, last + 1);
		setArr(arr.length - 2);
		$I(msgTxt, arr.join(' '));
		$X(msgTxt).innerHTML = $X(msgTxt).innerHTML.replace(between, '<a href="/tickets/index.php?action=view-my-tickets" title="'+lang.msg[0]+'" target="_blank"><b>' + between + '</b></a>');
	}
	//if msg is WS
	var wsMsg = new RegExp(lang.linkify[7]);
	if (wsMsg.test(msgType)) { //if msg is WS
		var wsIDnum = arr[arr.length - 1];
		setValue('wsID', wsIDnum);
		arr[arr.length - 1] = '<a href="/obay.php?action=tosell&type=10" title="'+lang.msg[1]+'"><b>' + arr[arr.length - 1] + '</b></a>';
		setArr(3 + (sets.version == '_nl' ? 4 : 0));
		setArr(5 + (sets.version == '_nl' ? 4 : 0));

		$I(msgTxt, arr.join(' '));
	}
	//if msg was crush msg
	var crushedMSG = new RegExp(lang.linkify[11]);
	if (crushedMSG.test(msgType)) {
		$X(msgTxt).innerHTML = '<a href="/BeO/webroot/index.php?module=Bloodbank&action=" title="'+lang.msg[2]+'"><b>' + $X(msgTxt).innerHTML + '</b></a>';
	}

	var raidInv = new RegExp(lang.linkify[13]);
	if (raidInv.test(msgType)) { //raid inv.
		setArr(9);
		$I(msgTxt, arr.join(' '));
	}

	var MarriedMsg = new RegExp(lang.linkify[14]);
	if (MarriedMsg.test(msgType)) { //married
		setArr(20);
		setArr(22);
		$I(msgTxt, arr.join(' '));
	}

	var GiftMsg = new RegExp(lang.linkify[15]);
	if (GiftMsg.test(msgType)) { //gift
		setArr(5);
		$I(msgTxt, arr.join(' '));
	}

	var WitnessMsg = new RegExp(lang.linkify[17]);
	if (WitnessMsg.test(msgType)) { //witness
		setArr(14);
		setArr(16);
		$I(msgTxt, arr.join(' '));
	}

	var famInv = new RegExp(lang.linkify[12]); //fam inv.
	if (famInv.test(msgType)) {
		if (arr.length < 18 + (sets.version == '_nl' ? 1 : 0)) {
			setArr(8);
			$I(msgTxt, arr.join(' '));
		} else {
			setArr(9);
			$I(msgTxt, arr.join(' '));
		}
	}

	var mocInv = new RegExp(lang.linkify[2]);
	if (mocInv.test(msgType)) { //moc inv.
		setArr(0);
		$I(msgTxt, arr.join(' '));
	}

	var targetNotFound = new RegExp(lang.linkify[3]);
	if (targetNotFound.test(msgType)) { //target not found
		setArr((sets.version=='_nl')?4:5);
		$I(msgTxt, arr.join(' '));
	}

	var raceInv = new RegExp(lang.linkify[4]);
	if (raceInv.test(msgType)) { //race invite
		setArr(8);
		arr[arr.length - 15] = '<a href="/races.php"><strong>' + arr[arr.length - 15];
		arr[arr.length - 14] = arr[arr.length - 14] + '</strong></a>';
		$I(msgTxt, arr.join(' '));
	}

	var targetFound = new RegExp(lang.linkify[5]);
	if (targetFound.test(msgType)) { //target found
		setArr(3);
		$I(msgTxt, arr.join(' '));
	}

	var killMsg = new RegExp(lang.linkify[6]);
	if (killMsg.test(msgType)) { //if msg is Kill success
		setArr(2);
		$I(msgTxt, arr.join(' '));
	}

	var condolences = new RegExp(lang.linkify[8]);
	if (condolences.test(msgType)) { //condolences msg
		var nickPos = arr[2];
		var nickFirst = arr.indexOf(nickPos);
		var nickLast = arr.lastIndexOf(nickPos);
		setArr(nickFirst);
		setArr(nickLast);
		$I(msgTxt, arr.join(' '));
	}

	var shot = new RegExp(lang.linkify[18]);
	if (shot.test(msgType)) { //you have been shot msg
		setArr(38);
		setArr(55);
		$I(msgTxt, arr.join(' '));
	}

}

//---------- All poker thingies (except tracker) -----------
if (dls.search('module=Poker') != -1) {
	//allin
	var goall = 0;
	var money = $X('//td[@class="tableitem"]/b').innerHTML.replace(/,/g, '').replace('$', '');
	var allin = cEL('span');
	allin.innerHTML = 'All In';
	allin.setAttribute('style', 'color:#404040;font-family:Verdana,Tahoma;font-size:x-small;background-color:#CFCFCF;border-width:1px;border-style:none solid solid none;padding:3px 15px 0px 15px;cursor:pointer;');
	allin.addEventListener('click', function(){
		$X('//input[@name="raiseby"]').value = money;
		goall = confirm('Are you sure you wanna go All-In with $'+commafy(money)+'?');
		if(goall) {
			$X('//input[@name="raise"]').click();
		}
	}, true);
	if ($X('//input[@name="raiseby"]')) {
		$X('//center/form/table/tbody/tr[5]/td/table/tbody/tr/td[3]').appendChild(allin);
	}
	//refresh
	var refresh = $X('//span/a[contains(@href, "BeO/webroot/index.php?module=Poker")]');
	if (refresh != undefined) {
		refresh.innerHTML = refresh.innerHTML + '(=)';
		var refresh2 = refresh.cloneNode(1);
		refresh.accessKey = '=';
		var span = cEL('span');
		span.setAttribute('style', 'background-color:#8fcbfc;border-width:1px;border-style:none solid solid none');
		span.appendChild(refresh2);
		if (db.textContent.search('Poker') != -1){
			$X('//center').insertBefore(span, $X('//form'));
		} else {
			$X('//center').insertBefore(span, $X('//table[@class="thinline"]'));
		}
	}
	//poker tracker
	if ($X('//input[@name="leave"]') != null) {
		$X('//input[@name="leave"]').addEventListener('click', function() {
			setValue('ptchecked', false);
		}, true);
	}
	//hide full
	if (db.innerHTML.search(lang.pokertracker[11]) != -1) {
		function hideFull(hide) {
			setValue('hidefull', hide);
			hidefull = hide;
			var rows = $x('//tr[@align="center"]').length; //get number of rows
			for (var i=rows+3;i>4;i--) { //loop rows
				var Row = $X('/html/body//center/table[1]/tbody/tr['+i+']'); //get the specific row
				if (Row.innerHTML.indexOf('<font color="#FF0000">X</font>') != -1) {
					if (hide) {
						$X('/html/body//center/table[1]/tbody/tr['+i+']').style.display = 'none';
					} else {
						$X('/html/body//center/table[1]/tbody/tr['+i+']').style.display = 'table-row';
					}
				}
			}
		}
		var span = cEL('span');
		span.innerHTML = '<label for="cb">'+lang.pokertracker[12]+'</label>';
		var input = cEL('input');
		input.setAttribute('type', 'checkbox');
		input.id = 'cb';
		var hidefull = getValue('hidefull', false);
		if (hidefull) {
			input.setAttribute('checked', 'checked');
			hideFull(true);
		}

		span.appendChild(input);
		$X('//td[@class="tableitem"]').appendChild(span);

		input.addEventListener('click', function() {
			if (hidefull) {
				hideFull(false);
			} else {
				hideFull(true);
			}
		}, true);

	}
	//add m/k usage in amount boxes
	if (prefs[5]) {
		var inputs = $x('//input[@name="ante"] | //input[@name="buy_in"] | //input[@name="max_raise"] | //input[@name="raiseby"]');
		inputs.forEach(function ($n) {
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
		});
	}

	// add easy selecting cards for swapping
	if ($X('//input[@name="c0"]') != null) { // user must check cards

		var cards = $x('//tbody/tr[2]/td/img');
		var y = 0;
		for (x in cards) { // loop through cards
			if (y <= 4) {
				if (cards[x].getAttribute('src').indexOf('closed.gif') == -1) { // it's one of our cards
					cards[x].setAttribute('style', 'cursor:pointer');
					$x('//td//tbody/tr[2]/td')[x].setAttribute('style', 'padding-top:7px;padding-bottom:7px;');
					$x('//td//tbody/tr[2]/td')[x].setAttribute('id', 'card_td_'+y);
					cards[x].setAttribute('onclick', 'var cb=document.getElementsByName(\'c'+y+'\')[0];if(cb.checked){cb.checked=false;document.getElementById(\'card_td_'+y+'\').style.backgroundColor=\'green\';}else{cb.checked=true;document.getElementById(\'card_td_'+y+'\').style.backgroundColor=\'#009966\';}');
					++y;
				}
			}
		}

		// Add style switchers on checkboxes
		getELNAME('c0')[0].addEventListener('click', function() {
			if ($X('//input[@name="c0"]').checked) {
				getID('card_td_0').style.backgroundColor='#009966';
			} else {
				getID('card_td_0').style.backgroundColor='green';
			}
		}, true);
		getELNAME('c1')[0].addEventListener('click', function() {
			if ($X('//input[@name="c1"]').checked) {
				getID('card_td_1').style.backgroundColor='#009966';
			} else {
				getID('card_td_1').style.backgroundColor='green';
			}
		}, true);
		getELNAME('c2')[0].addEventListener('click', function() {
			if ($X('//input[@name="c2"]').checked) {
				getID('card_td_2').style.backgroundColor='#009966';
			} else {
				getID('card_td_2').style.backgroundColor='green';
			}
		}, true);
		getELNAME('c3')[0].addEventListener('click', function() {
			if ($X('//input[@name="c3"]').checked) {
				getID('card_td_3').style.backgroundColor='#009966';
			} else {
				getID('card_td_3').style.backgroundColor='green';
			}
		}, true);
		getELNAME('c4')[0].addEventListener('click', function() {
			if ($X('//input[@name="c4"]').checked) {
				getID('card_td_4').style.backgroundColor='#009966';
			} else {
				getID('card_td_4').style.backgroundColor='green';
			}
		}, true);
	}
}

//---------- m/k usage roulette -----------
if (dlp.indexOf('/gambling/roulette.php') != -1) {
	//add m/k usage in amount boxes
	if (prefs[5]) {
		var inputs = $x('//input');
		inputs.forEach(function ($n) {
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
		});
	}
}

//---------- m/k usage pb -----------
if (dlp.indexOf('/gambling/puntobanco.php') != -1) {
	//add m/k usage in amount boxes
	if (prefs[5]) {
		var inputs = $x('//input[@name="bet"]');
		inputs.forEach(function ($n) {
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
		});
	}
}

//---------- m/k usage bookie -----------
if (dlp.indexOf('/gambling/nookie.php') != -1) {
	//add m/k usage in amount boxes
	if (prefs[5]) {
		var inputs = $x('//input[@name="bet"]');
		inputs.forEach(function ($n) {
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
		});
	}
}

//---------- m/k usage ng -----------
if (dlp.indexOf('/gambling/numbersgame.php') != -1) {
	//add m/k usage in amount boxes
	if (prefs[5]) {
		var inputs = $x('//input[@name="bet"]');
		inputs.forEach(function ($n) {
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
		});
	}
}

//---------- m/k usage hitlist -----------
if (dls.search('module=Hitlist') != -1) {
	//add m/k usage in amount boxes
	if (prefs[5]) {
		var inputs = $x('//input[@name="amount"]');
		inputs.forEach(function ($n) {
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
		});
	}
}
//----------- link names at capo log --------------
if (urlsearch == '/capocp.php' + dls) {
	logxp = '/html/body//center/table[2]/tbody//td[2]';
	$x(logxp).forEach(function ($n) {
		if ($n.textContent != '') {
			var len = $n.innerHTML.trim().split(' ').length;
			if (len >= '4') {
				var who = $n.innerHTML.trim().split(' ');
				who[0] = '<a href="/user.php?nick=' + who[0] + '"><b>' + who[0] + '</b></a>';
				$n.innerHTML = who.join(' ');
			}
		}
	});
}

//------------- link names at CP log --------
if (dls.indexOf('module=Family')!=-1) {
	var logs = '//td[1]/table[@class="color2" and position()=1]//td[2]';
	$x(logs).forEach(function ($n) {
		if ($n.textContent != '') {
			var len = $n.innerHTML.trim().split(' ').length - 1;
			var who = $n.innerHTML.trim().split(' ');
			if (who[0].match(/[A-Z]/g)) {
				who[0] = '<a href="/user.php?nick=' + who[0] + '"><b>' + who[0] + '</b></a>';
			}
			if (who[len].match(/[A-Z]/g)) {
				if(who[len] != 'Capo(s)') {
					if(who[len] != 'Object(s)') {
						if(who[len] != 'Unlocked') {
							who[len] = '<a href="/user.php?nick=' + who[len].match(/\w+/g)[0] + '"><b>' + who[len] + '</b></a>';
						}
					}
				}
			}
			$n.innerHTML = who.join(' ');
		}
	});
}

//------------- link names at kill.php (detective) ---------
if (dlp == '/kill.php') {
	if (dls.length == 0 && db.innerHTML.search('action=remove') != -1) { //Link names at Detective table
		var msgs = '//center/table[@class="thinline" and position()=2]//td[1]';
		$x(msgs).forEach(function ($n) {
			var len = $n.innerHTML.trim().split(' ').length;
			if (len >= '4') {
				var arr = $n.innerHTML.split(' ');
				if (arr[2] == lang.linkify[9]) {
					arr[3] = '<a href="user.php?nick=' + arr[3].replace(/(<b>|<\/b>)/g, '') + '">' + arr[3] + '</a>'; //check if we found the bastard
				} else {
					var index = ((sets.version=='_nl')?6:5); //version dependency
					arr[index] = '<a href="user.php?nick=' + arr[index].replace(/(<b>|<\/b>)/g, '') + '">' + arr[index] + '</a>';
				}
				$n.innerHTML = arr.join(' ');
			}
		});
	}
	if (db.innerHTML.indexOf('table') != -1 && dls == '') { //Kill password remover
		if (prefs[14]) {
			$Del('/html/body//center/table/tbody/tr[5]');
		}
		if (/search/.test(dls)) {
			if ($X('//input[@name="name"]')) {
				$X('//input[@name="name"]').value = GetParam('search');
				$X('//input[@name="name"]').parentNode.lastChild.focus();
			}
		}
	}
	if (dls == '?action=hire') {
		var td2 = getTAG('table')[0].rows[10].cells[1];
		var input = getTAG('table')[0].rows[10].cells[1].childNodes[0];

		function changeAmount() {
			var boxes = $x('//input[@type="text"]');
			for (i = 0; i <= 7; i++) {
				boxes[i].value = getID('gAmount').value;
				if (i == 7) {
					var evt = document.createEvent('HTMLEvents');
					evt.initEvent('change', true, true);
					boxes[i].dispatchEvent(evt);
				}
			}
		}

		input.addEventListener('change', function () {
			changeAmount();
		}, true);

		td2.appendChild(input);
		var add1 = cEL('input');
		add1.setAttribute('type', 'button');
		add1.value = '+1';
		add1.addEventListener('click', function () {
			getID('gAmount').value = parseInt(getID('gAmount').value, 10) + 1;
			changeAmount();
		}, true);
		td2.appendChild(add1);
		var add2 = cEL('input');

		add2.setAttribute('type', 'button');
		add2.value = '-1';
		add2.addEventListener('click', function () {
			getID('gAmount').value = ((parseInt(getID('gAmount').value, 10) - 1 >= 0) ? parseInt(getID('gAmount').value, 10) - 1 : 0);
			changeAmount();
		}, true);
		td2.appendChild(add2);
	}
	if ($X('//input[@name="name"]')) {
		$X('//input[@name="name"]').value = GetParam('search');
		$X('//input[@name="name"]/parent::*/input[last()]').focus();
	}
	if ($X('//input[@name="safehouse"]')) {
		var func = 'javascript: var amt=this.value.replace(/\\D/g,\'\'); if(amt){ get = document.getElementById(\'cost\'); if(get){ tmp = \'\'+Math.round(amt*amt*100); str =\'\'; while(tmp > 0){ if(str!=\'\'){ while(str.length % 4 !=3 ){ str = \'0\' + str;}; str = \',\' + str;};dec = (tmp % 1000)+\'\';str = dec + str;tmp = Math.floor(tmp/1000);}; get.textContent = \'$\' + str}; };';
		$X('//input[@name="safehouse"]').setAttribute('onKeyUp',func);
		var shtable = $X('//center/table[4]/tbody/tr[5]/td/form');
		var newp = cEL("p");
		newp.setAttribute('id','cost');
		newp.innerHTML = '$0';
		shtable.appendChild(newp);
	}

	if (prefs[5]) {
		var inputs = $x('//input[@name="bulletsf"]');
		inputs.forEach(function ($n) {
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
		});
	}
}

//------------- link names at fully opened cp log ----------
if (dlp == '/familylog.php') {
	var logs = '//table[@class="color2" and position()=1]//td[2]';
	$x(logs).forEach(function ($n) {
		if ($n.textContent != '') {
			var len = $n.innerHTML.trim().split(' ').length - 1;
			var who = $n.innerHTML.trim().split(' ');
			if (who[0].match(/[A-Z]/g)) {
				who[0] = '<a href="/user.php?nick=' + who[0] + '"><b>' + who[0] + '</b></a>';
			}
			if (who[len].match(/[A-Z]/g)) {
				if(who[len] != 'Capo(s)') {
					if(who[len] != 'Object(s)') {
						if(who[len] != 'Unlocked') {
							who[len] = '<a href="/user.php?nick=' + who[len].match(/\D+/g)[0].replace('.', '') + '"><b>' + who[len] + '</b></a>';
						}
					}
				}
			}
			$n.innerHTML = who.join(' ');
		}
	});
}

//---------------------- MaybeUsefulCrap -----------
var OBMIcon = GM_getResourceURL('favoriteIco');
var OBM =
	<menu icon={OBMIcon} type="context" id="OBMenu">
		<menu label={SCRIPT_NAME+" "+SCRIPT_VERSION}>
			<menuitem icon={OBMIcon} id="obmversion" label={"Version: "+OB}>Version</menuitem>
			<menuitem icon={OBMIcon} id="obmupdate" label={"Check for updates"}>UpdateCheck</menuitem>
		</menu>
	</menu>;

var OBMDiv = cEL('div');
db.appendChild(OBMDiv);
OBMDiv.innerHTML = OBM;
db.setAttribute('contextmenu', 'OBMenu');
document.getElementById('obmversion').addEventListener('click', function(){ alert('You are using ' + SCRIPT_NAME + '.\nVersion:\t\t' + OB_v +'\nRevision:\t\t' + SCRIPT_VERSION_BUILD)}, false);
document.getElementById('obmupdate').addEventListener('click', function(){ OBUpdate(true)}, false);

//---------------------- ScratcherTheCode ---------- // ctrl F on 'scratcher' gave me too many results
if ((dlp == '/scratch.php' || dlp == '/iminjail.php?redirect=/scratch.php') && prefs[33]) {
	var on = getValue('on', 0);
	var unopened = getValue('unopened', 0)
	var monin = getValue('monin', 0);
	var mils = getValue('mils', 0);
	var bullets = getValue('bullets', 0);
	var scratches = getValue('scratches', 0);

	if (db.innerHTML.indexOf(lang.scratcher[0]) != -1) { //grab winning event
		if (db.innerHTML.indexOf(lang.scratcher[1]) != -1) { //bullets
			var rex = new RegExp(lang.scratcher[2]);
			var r = db.innerHTML.match(rex);
			bullets += parseInt(r[1]);
			setValue('bullets', bullets);
		}
		if (db.innerHTML.indexOf(lang.scratcher[3]) != -1) { //money
			var rex = new RegExp(lang.scratcher[4]);
			var str = db.innerHTML.replace(/,/g, '');
			var r = str.match(rex);
			monin += parseInt(r[1]);
			setValue('monin', monin);
			if (parseInt(r[1]) == 1000000) {
				mils += 1;
				setValue('mils', mils);
			}
		}
	}

	if (db.innerHTML.indexOf(lang.scratcher[5]) != -1) { //grab scratching event
		scratches += 1;
		setValue('scratches', scratches);
		if (getELNAME('ver')[0] != null) {//focus on code
			getELNAME('ver')[0].focus();
		} else { //focus on check
			getELNAME('Check')[0].focus();
		}
	} else {
		if (getELNAME('codescratch')[0] != null) {//focus on unclaimed prices
			getTAG('input')[2].focus();
		} else if (getELNAME('scratch')[0] != null) { //focus on scratch
			getELNAME('scratch')[0].focus();
		}
	}

	if (db.innerHTML.indexOf(lang.scratcher[18]) != -1) { //grab 10 is enough event
		db.innerHTML = db.innerHTML + '<br /><a href="http://'+dlh+'/scratch.php">'+lang.scratcher[19]+'</a>';
		getTAG('a')[0].focus();
	}

	var monout = (scratches * 5000);
	if ((monin - monout) < 0) {
		var profit = '-$'+commafy(monout - monin);
	} else {
		var profit = '$'+commafy(monin - monout);
	}
	var ppk = Math.round(((monout - monin) / bullets) * 100000) / 100000;
	if (isNaN(ppk) || bullets == 0) {
		ppk = 0;
	}

	var div = cEL('div'); //build Scratcher Div
	div.id = 'info';
	div.setAttribute('class', 'NRInfo');
	div.setAttribute('style', 'position:fixed; bottom:20px; right:20px; width:250px; color:#FFF !important; background-color:'+getValue('titleBg', '#3F505F'));
	var divdump = '<center><b>'+lang.scratcher[6]+'</b></center><table width="100%"><tr><td bgcolor="gray"></td></tr></table><div id="statsscratcher">'+lang.scratcher[7]+' <font style="float:right"><b>'+commafy(scratches)+'</b></font><br />'+lang.scratcher[8]+' <font style="float:right"><b>$'+commafy(monout)+'</b></font><br />'+lang.scratcher[9]+' <font style="float:right"><b>$'+commafy(monin)+'</b></font><br />'+lang.scratcher[10]+' <font style="float:right"><b>'+profit+'</b></font><br />'+lang.scratcher[11]+' <font style="float:right"><b>'+commafy(mils)+'</b></font><br />'+lang.scratcher[12]+' <font style="float:right"><b>'+commafy(bullets)+'</b></font><br />'+lang.scratcher[13]+' <font style="float:right"><b>$'+commafy(ppk)+'</b></font></div><br />&nbsp;';
	divdump += '</div><div id="resetscratcher" align="right" style="position:absolute; padding:2px; bottom:3px; right:3px; border:2px solid grey; -moz-border-radius:7px; border-radius:7px;" onmouseover="this.style.border=\'2px solid #BBB\'; this.style.cursor=\'pointer\';" onmousedown="this.style.marginLeft=\'2px\';" onmouseout="this.style.border=\'2px solid grey\'; this.style.cursor=\'default\';" >&nbsp;<b>'+lang.scratcher[16]+'</b> <img src="'+GM_getResourceURL('deleteIcon')+'" style="vertical-align:-3px" /></div>';
	div.innerHTML = divdump;
	db.appendChild(div);

	if (on == 1) { //Scratcher Active
		if (db.innerHTML.indexOf('Sorry, but 10 per minute is enough.') != -1) { //LANG? (atm msg is langindependent: always en);
			msec = rand(8000, 13400);
			var t = setTimeout(function () { window.location.replace('http://'+location.hostname+'/scratch.php'); }, msec);
		} else if (db.innerHTML.indexOf('504 Gateway Time-out') != -1 || db.innerHTML.indexOf('502 Bad Gateway') != -1 || db.innerHTML.indexOf('503 Service Unavailable') != -1 || db.innerHTML.indexOf('500 - Internal Server Error') != -1) {
			msec = rand(800, 1600);
			var t = setTimeout(function () { window.location.replace('http://'+location.hostname+'/scratch.php'); }, msec);
		} else if (db.innerHTML.indexOf('<img src=/static/images/game/generic/criminal.jpg') != -1) {
			msec = rand(9800, 15200);
			var t = setTimeout(function () { window.location.replace('http://'+location.hostname+'/scratch.php'); }, msec);
		} else if (db.innerHTML.indexOf('<img src="/static/images/userbadges/donateplus.png">') != -1) {
			msec = rand(11300, 14800);
			var t = setTimeout(function () { window.location.replace('http://'+location.hostname+'/scratch.php'); }, msec);
		} else {
			msec = rand(1800, 2400);
			if (db.innerHTML.indexOf('color="red"') != -1 && getELNAME('codescratch')[0] != null) {
				setValue('unopened', 1);
				var t = setTimeout(function () { getTAG('input')[2].click(); }, msec);
			} else if (getELNAME('goback')[0] != null && unopened == 1) {
				var t = setTimeout(function () { getELNAME('goback')[0].click(); }, msec);
			} else {
				setValue('unopened', 0);
				if (getELNAME('goback')[0] != null && unopened == 0) {
					var t = setTimeout(function () { getELNAME('scratch')[0].click(); }, msec);
				} else if (getELNAME('Check')[0] != null) {
					var t = setTimeout(function () { getELNAME('Check')[0].click(); }, msec);
				} else {
					var t = setTimeout(function () { getELNAME('scratch')[0].click(); }, msec);
				}
			}
		}
	}

	getID('resetscratcher').addEventListener('click', function() {
		getID('resetscratcher').innerHTML = '&nbsp;<b style="line-height:16px">'+lang.scratcher[17]+'<b>&nbsp;';
		getID('statsscratcher').innerHTML = lang.scratcher[7]+' <font style="float:right"><b>0</b></font><br />'+lang.scratcher[8]+' <font style="float:right"><b>$0</b></font><br />'+lang.scratcher[9]+' <font style="float:right"><b>$0</b></font><br />'+lang.scratcher[10]+' <font style="float:right"><b>$0</b></font><br />'+lang.scratcher[11]+' <font style="float:right"><b>0</b></font><br />'+lang.scratcher[12]+' <font style="float:right"><b>0</b></font><br />'+lang.scratcher[13]+' <font style="float:right"><b>$0</b></font>';
		setValue('monin', 0);

		setValue('mils', 0);
		setValue('bullets', 0);
		setValue('scratches', 0);
	}, true);

}

//---------------- Lackeys II ----------------
if (dls == '?module=Lackeys') {
	var path = '//table[@id="overview_log_6"]/tbody/tr', logEntry, r;

	// All text is English for now, so using lang vars is not needed at the moment
	var loadedTab = 1;
	var divX;

	function overview() {
		divX = '//div[@id="overview"]';
	}
	overview(); // this is already loaded by default and in the source, so call it

	function spats() {
		loadedTab = 2;
		divX = '//div[@id="ui-tabs-1"]';
	}
	function noodles() {
		loadedTab = 3;
		divX = '//div[@id="ui-tabs-2"]';
	}
	function orourke() {
		loadedTab = 4;
		divX = '//div[@id="ui-tabs-3"]';
	}
	function freekowtski() {
		loadedTab = 5;
		divX = '//div[@id="ui-tabs-4"]';
	}
	function keaton() {
		loadedTab = 6;
		divX = '//div[@id="ui-tabs-5"]';
	}
	var sluggsHideLaughing = getValue('sluggsHideLaughing', true);
	function sluggs() {
		loadedTab = 7;

		divX = '//div[@id="ui-tabs-6"]';

		// Sluggs log entries
		var x = 1;
		$x(path).forEach(function ($n) {
			logEntry = $x(path+'['+x+']/td')[1].innerHTML;

			// show price per bullet when Sluggs bought
			if (r = logEntry.replace(/,/g, '').match(/Sluggs bought (\d+) bullets for \$(\d+)/)) {
				$x(path+'['+x+']/td')[1].innerHTML = logEntry + ' ($'+Math.round(r[2] / r[1])+'/bullet)';
			}
			++x;
		});

		// Hide useless entries
		$X(divX+'/div/div[2]').innerHTML = $X(divX+'/div/div[2]').innerHTML + '<span><input type="checkbox" id="cb" /><label for="cb">Hide "Sluggs is laughing" entries</label></span>';

		if (sluggsHideLaughing) {
			getID('cb').setAttribute('checked', 'checked');
			hideLaughing(true);
		}

		getID('cb').addEventListener('click', function() {
			if (sluggsHideLaughing) {
				hideLaughing(false);
			} else {
				hideLaughing(true);
			}
		}, true);
	}

	function hideLaughing(hide) {
		setValue('sluggsHideLaughing', hide);
		sluggsHideLaughing = hide;
		x = 1;
		$x(path).forEach(function ($n) {
			if ($x(path+'['+x+']/td')[1].innerHTML.match(/Sluggs is laughing at your measly limit/)) {
				if (hide) {
					$n.style.display = 'none';
				} else {
					$n.style.display = 'table-row';
				}
			}
			++x;
		});
	}

	$X('//ul/li[1]').addEventListener('click', function() { // Overview
		loadedTab = 1;
	}, true);
	$X('//ul/li[2]').addEventListener('click', function() { // Spats - crimes
		if (loadedTab != 2) {
			getID('ui-tabs-1').addEventListener('load', function() {
				if (loadedTab != 2) {
					spats();
				}
			}, true);
		}
	}, true);
	$X('//ul/li[3]').addEventListener('click', function() { // Noodles - cars
		if (loadedTab != 3) {
			getID('ui-tabs-2').addEventListener('load', function() {
				if (loadedTab != 3) {
					noodles();
				}
			}, true);
		}
	}, true);
	$X('//ul/li[4]').addEventListener('click', function() { // O'Rourke - booze
		if (loadedTab != 4) {
			getID('ui-tabs-3').addEventListener('load', function() {
				if (loadedTab != 4) {
					orourke();
				}
			}, true);
		}
	}, true);
	$X('//ul/li[5]').addEventListener('click', function() { // Freekowtski - narcs
		if (loadedTab != 5) {
			getID('ui-tabs-4').addEventListener('load', function() {
				if (loadedTab != 5) {
					freekowtski();
				}
			}, true);
		}
	}, true);
	$X('//ul/li[6]').addEventListener('click', function() { // Keaton - busting
		if (loadedTab != 6) {
			getID('ui-tabs-5').addEventListener('load', function() {
				if (loadedTab != 6) {
					keaton();
				}
			}, true);
		}
	}, true);
	$X('//ul/li[7]').addEventListener('click', function() { // Sluggs - bullets
		if (loadedTab != 7) {
			getID('ui-tabs-6').addEventListener('load', function() {
				if (loadedTab != 7) {
					sluggs();
				}
			}, true);
		}
	}, true);
	if(document.location.hash == '#ui-tabs-6') { // direct call from menu
		window.addEventListener('load', function () {
			setTimeout(function () {
				sluggs();
			}, 500);
		}, true);
	}
}

//---------------- BulletTracker ----------------
if (dlp == '/bullets2.php' && prefs[33]) {
	var d = new Date()
	var btdate = getValue('btdate', 0);
	if(d.getDate()>btdate){ setValue('bttoday', 0); }
	var obaybul = getValue('obaybul', 0);
	var btbullets = getValue('btbullets', 0);
	var bttoday = getValue('bttoday', 0);
	var btmoney = getValue('btmoney', 0);
	if (db.innerHTML.indexOf(lang.bullettracker[0]) != -1) {
		var rex = new RegExp(lang.bullettracker[1]);
		var str = db.innerHTML.replace(/,/g, '');
		var r = str.match(rex);
		btbullets += parseInt(r[1], 10);
		bttoday += parseInt(r[1], 10);
		btmoney += parseInt(r[2], 10);
		setValue('btbullets', btbullets);
		setValue('bttoday', bttoday);
		setValue('btmoney', btmoney);
		setValue('btdate', d.getDate());
	}
	if (btbullets == 0) {
		btdolpbul = 0;
	} else {
		btdolpbul = Math.round((btmoney / btbullets) * 100) / 100;
	}
	var div = cEL('div');
	div.id = 'btracker';
	div.setAttribute('style', 'position:fixed; bottom:20px; left:20px; width:200px; background-color:#455C6F; border:2px solid #000; -moz-border-radius:5px; border-radius:5px; padding:4px');
	div.innerHTML = '<center><b>'+lang.bullettracker[2]+'</b></center><table width="100%"><tr><td bgcolor="black"></td></tr></table><div id="btstats">'+lang.bullettracker[3]+' <font style="float:right"><b>'+commafy(btbullets)+'</b></font><br />'+lang.bullettracker[7]+' <font style="float:right"><b>'+commafy(bttoday)+'</b></font><br />'+lang.bullettracker[4]+' <font style="float:right"><b>$'+commafy(btmoney)+'</b></font><br />'+lang.bullettracker[5]+' <font style="float:right"><b>$'+commafy(btdolpbul)+'</b></font><br />'+lang.bullettracker[8]+' <font style="float:right"><b>'+commafy(obaybul)+'*</b></font><br /><font size="1">'+lang.bullettracker[9]+'</font></div><br />&nbsp;<div id="resetbt" align="right" style="position:absolute; bottom:2px; right:2px; border:2px solid grey; -moz-border-radius:5px; border-radius:5px;" onmouseover="this.style.border=\'2px solid #DDDF00\'; this.style.cursor = \'pointer\';" onmouseout="this.style.border=\'2px solid grey\'; this.style.cursor=\'default\';" >&nbsp;<b>'+lang.scratcher[16]+'</b> <img src="'+GM_getResourceURL('deleteIcon')+'" style="vertical-align:-3px" /></div>';
	db.appendChild(div);

	getID('resetbt').addEventListener('click', function() {
		getID('resetbt').innerHTML = '&nbsp;<b>'+lang.scratcher[17]+'<b>&nbsp;';
		getID('btstats').innerHTML = lang.bullettracker[3]+' <font style="float:right"><b>0</b></font><br />'+lang.bullettracker[7]+' <font style="float:right"><b>0</b></font><br />'+lang.bullettracker[4]+' <font style="float:right"><b>$0</b></font><br />'+lang.bullettracker[5]+' <font style="float:right"><b>$0</b></font>';
		setValue('btbullets', 0);
		setValue('btmoney', 0);
		setValue('bttoday', 0);
		setValue('btdate', 0);
		setValue('obaybul', 0);
	}, true);
}
//---------------- Poker Tracker ----------------
if (dls.indexOf('?module=Poker') != -1 && prefs[33]) {
	var ptgplay = getValue('ptgplay', 0);
	var ptspent = getValue('ptspent', 0);
	var ptgwon = getValue('ptgwon', 0);
	var ptmwon = getValue('ptmwon', 0);
	var ptoldbet = getValue('ptoldbet', 0);
	var ptself = getValue('nick', '');
	var ptchecked = getValue('ptchecked', false);
	var str = db.innerHTML.replace(/,/g, '');
	if (db.innerHTML.indexOf('<img src="/static/images/game/casino/cards') != -1) {//game active
		if (db.innerHTML.indexOf('<font color="green"><b>'+lang.pokertracker[1]) != -1) {// game started
			setValue('ptoldbet', 0);
			ptoldbet = 0;
			ptgplay += 1; //games played +1;
			setValue('ptgplay', ptgplay);
			var rex = new RegExp('<td><li><a href="\\/user\\.php\\?nick=', 'g');
			var amplayers = db.innerHTML.match(rex).length; // get amount of players
			var rex = new RegExp('<td>\\$(\\d+)<\\/td>');
			var pot = str.match(rex);
			ptspent += (parseInt(pot[1], 10) / amplayers);
			setValue('ptspent', ptspent);
		}
		var rex = new RegExp('<a href="\\/user\\.php\\?nick=(\\w+)">', 'g');
		var r = db.innerHTML.match(rex);
		var tot = (r.length - 1) / 2; // total players
		var myownnumfound = 0;
		for (y = 0; y < tot; y += 1) {
			if (r[y] == '<a href="/user.php?nick='+ptself+'">' && myownnumfound == 0) {
				var myownnum = y;
				var myownnumfound = 1;
			} // get # player you are listed from top
		}
		var rex = new RegExp(' \\(\\$(\\d+)\\)', 'g');
		var r = str.match(rex);
		var ptnewbet = r[myownnum].replace(' ($', ''); // get own placed bet on page
		ptnewbet = parseInt(ptnewbet.replace(')', ''), 10);
		if (ptnewbet != ptoldbet) {
			ptspent -= ptoldbet;
			ptspent += ptnewbet;
			setValue('ptspent', ptspent);
			setValue('ptoldbet', ptnewbet); //set it for comparising next time
		}
		if (db.innerHTML.indexOf('name="leave"') != -1) {// game's over
			getELNAME('leave')[0].focus();
			setValue('ptoldbet', 0);
			var rex = new RegExp('<tr align="center"><td>(\\w+)</td><td>(.*)</td><td>\\$(\\d+)</td></tr>');
			var r = str.match(rex);
			if (r[1] == ptself && !ptchecked) { // we won and haven't checked prices yet?
				var pttype = r[2];
				ptgwon += 1;
				ptmwon += parseInt(r[3], 10);
				setValue('ptgwon', ptgwon);
				setValue('ptmwon', ptmwon);
				setValue('ptchecked', true);
			}
		}
	}
	else { // game isn't active
		if (db.innerHTML.indexOf('<font color="green"><b>'+lang.pokertracker[1]) != -1 || db.innerHTML.indexOf('<font color="green"><b>'+lang.pokertracker[10]) != -1) {// user joins game
			setValue('ptoldbet', 0);
			ptgplay += 1; //games played +1;
			setValue('ptgplay', ptgplay);

			// adding the ante
			a = $x('//tr').length - 21; // total tr's with gameinfo
			for (y=5;y<=a;y+=1) {
				if ($x('/html/body/center/table/tbody/tr['+y+']/td[8]')[0].innerHTML.indexOf('<a href="/user.php?nick='+ptself+'">') != -1) {
					var ptMyOwNum = y;
				}
			}
			var ptAnte = $x('/html/body/center/table/tbody/tr['+ptMyOwNum+']/td[3]')[0].innerHTML.replace(/,/g, '');
			ptspent += parseInt(ptAnte.replace('$', ''), 10);
			setValue('ptspent', ptspent);
		}
	}
	var ptprofit = ptmwon - ptspent;
	if (ptspent > 0) {
		if (ptprofit >= 0) ptprofit = '$'+commafy(ptprofit);
		else ptprofit = '-$'+commafy(ptspent - ptmwon);
	}
	else { ptprofit = '$0'; }
	var div = cEL('div');
	div.id = 'ptracker';
	div.setAttribute('style', 'position:fixed; bottom:20px; left:20px; width:220px; background-color:#455C6F; border:2px solid #000; -moz-border-radius:5px; border-radius:5px; padding:4px');
	var ptgWonP = Math.round((ptgwon / ptgplay) * 100);
	var ptgWonPerc = isNaN(ptgWonP) ? 0 : ptgWonP;
	div.innerHTML = '<center><b>'+lang.pokertracker[0]+'</b></center><table width="100%"><tr><td bgcolor="black"></td></tr></table><div id="ptstats">'+lang.pokertracker[4]+' <font style="float:right"><b>'+ptgplay+'</b></font><br />'+lang.pokertracker[5]+' <font style="float:right"><b>'+ptgwon+' ('+ptgWonPerc+'%)</b></font><br />'+lang.pokertracker[6]+' <font style="float:right"><b>$'+commafy(ptspent)+'</b></font><br />'+lang.pokertracker[7]+' <font style="float:right"><b>$'+commafy(ptmwon)+'</b></font><br />'+lang.pokertracker[8]+' <font style="float:right"><b>'+ptprofit+'</b></font></div><br />&nbsp;<div id="resetpt" align="right" style="position:absolute; bottom:2px; right:2px; border:2px solid grey; -moz-border-radius:5px; border-radius:5px;" onmouseover="this.style.border=\'2px solid #DDDF00\'; this.style.cursor = \'pointer\';" onmouseout="this.style.border=\'2px solid grey\'; this.style.cursor=\'default\';" >&nbsp;<b>'+lang.scratcher[16]+'</b> <img src="'+GM_getResourceURL('deleteIcon')+'" style="vertical-align:-3px;" /></div>';
	db.appendChild(div);

	getID('resetpt').addEventListener('click', function() {
		getID('resetpt').innerHTML = '&nbsp;<b>'+lang.scratcher[17]+'<b>&nbsp;';
		getID('ptstats').innerHTML = lang.pokertracker[4]+' <font style="float:right"><b>0</b></font><br />'+lang.pokertracker[5]+' <font style="float:right"><b>0 (0%)</b></font><br />'+lang.pokertracker[6]+' <font style="float:right"><b>$0</b></font><br />'+lang.pokertracker[7]+' <font style="float:right"><b>$0</b></font><br />'+lang.pokertracker[8]+' <font style="float:right"><b>$0</b></font>';
		setValue('ptgplay', 0);
		setValue('ptspent', 0);
		setValue('ptgwon', 0);
		setValue('ptmwon', 0);
	}, true);
}

//---------------- BJ Tracker ----------------
if (dlp.indexOf('/gambling/blackjack.php') != -1 && prefs[33]) {
	var bj = getValue('bj', 0);
	var bjgames = getValue('bjgames', 0);
	var bjgwon = getValue('bjgwon', 0);
	var bjmwon = getValue('bjmwon', 0);
	var bjspent = getValue('bjspent', 0);
	var bjtie = getValue('bjtie', 0);
	var bet = getValue('bjbet', 0);
	var str = db.innerHTML.replace(/,/g, '');
	if (db.innerHTML.indexOf(lang.bjtracker[10]) != -1) {
		var betinput = $x('//input')[1];
		betinput.focus();
		betinput.addEventListener('keyup', function() {
			setValue('bjbet', parseInt(betinput.value, 10));
		}, true);
	}
	if (db.innerHTML.indexOf('<img src="/static/images/game/casino/cards') != -1) {//game active
		if (db.innerHTML.indexOf(lang.bjtracker[6]) != -1) {//insurance set

			bjspent += bet*0.5;
			setValue('bjspent', bjspent);
		}
		if (db.innerHTML.indexOf(lang.bjtracker[1]) != -1) {// game ended
			bjgames += 1; //games played +1;
			setValue('bjgames', bjgames);
			if (db.innerHTML.indexOf(lang.bjtracker[14]) != -1) {// its a split
				bjgames += 1; //games played +1;
				setValue('bjgames', bjgames);
				if (db.innerHTML.indexOf(lang.bjtracker[15]) != -1) {// player 2 won
					bjgwon += 1; //games won +1;
					setValue('bjgwon', bjgwon);
					var rex = new RegExp(lang.bjtracker[18]);
					var betcheck = str.match(rex); // get bet
					if (betcheck[1] == bet) {
						bjspent += bet;
						setValue('bjspent', bjspent);
						bjmwon += bet*2;
						setValue('bjmwon', bjmwon);
					} else {//doubledown
						bjspent += parseInt(betcheck[1], 10);
						setValue('bjspent', bjspent);
						bjmwon += parseInt(betcheck[1], 10)*2;
						setValue('bjmwon', bjmwon);
					}
				}
				if (db.innerHTML.indexOf(lang.bjtracker[16]) != -1) {// player 2 lost
					var rex = new RegExp(lang.bjtracker[19]);
					var betcheck = str.match(rex); // get bet
					if (betcheck[1] == bet) {
						bjspent += bet;
						setValue('bjspent', bjspent);
					} else {//doubledown
						bjspent += parseInt(betcheck[1], 10);
						setValue('bjspent', bjspent);
					}
				}
				if (db.innerHTML.indexOf(lang.bjtracker[17]) != -1) {// player 2 tie
					bjtie += 1; //games tie +1;
					setValue('bjtie', bjtie);
					var rex = new RegExp(lang.bjtracker[20]);
					var betcheck = str.match(rex); // get bet
					if (betcheck[1] == bet) {
						bjspent += bet;
						setValue('bjspent', bjspent);
						bjmwon += bet;
						setValue('bjmwon', bjmwon);
					} else {//doubledown
						bjspent += parseInt(betcheck[1], 10);
						setValue('bjspent', bjspent);
						bjmwon += parseInt(betcheck[1], 10);
						setValue('bjmwon', bjmwon);
					}
				}
			}
		}
		if (db.innerHTML.indexOf(lang.bjtracker[2]) != -1) {// player 1 won
			bjgwon += 1; //games won +1;
			setValue('bjgwon', bjgwon);
			var rex = new RegExp(lang.bjtracker[11]);
			var betcheck = str.match(rex); // get bet
			if (betcheck[1] == bet) {
				bjspent += bet;
				setValue('bjspent', bjspent);
				bjmwon += bet*2;
				setValue('bjmwon', bjmwon);
			} else {//doubledown
				bjspent += parseInt(betcheck[1], 10);
				setValue('bjspent', bjspent);
				bjmwon += parseInt(betcheck[1], 10)*2;
				setValue('bjmwon', bjmwon);
			}
		}
		if (db.innerHTML.indexOf(lang.bjtracker[3]) != -1) {// player 1 lost
			var rex = new RegExp(lang.bjtracker[12]);
			var betcheck = str.match(rex); // get bet
			if (betcheck[1] == bet) {
				bjspent += bet;
				setValue('bjspent', bjspent);
			} else {
				bjspent += parseInt(betcheck[1], 10);
				setValue('bjspent', bjspent);
			}
		}
		if (db.innerHTML.indexOf(lang.bjtracker[4]) != -1) {// player 1 tie
			bjtie += 1; //games tie +1;
			setValue('bjtie', bjtie);
			var rex = new RegExp(lang.bjtracker[13]);
			var betcheck = str.match(rex); // get bet
			if (betcheck[1] == bet) {
				bjspent += bet;
				setValue('bjspent', bjspent);
				bjmwon += bet;
				setValue('bjmwon', bjmwon);
			} else {
				bjspent += parseInt(betcheck[1], 10);
				setValue('bjspent', bjspent);
				bjmwon += parseInt(betcheck[1], 10);
				setValue('bjmwon', bjmwon);
			}
		}
		if (db.innerHTML.indexOf(lang.bjtracker[5]) != -1) {// player 1 bj
			bj += 1; //bj +1;
			setValue('bj', bj);
			bjspent += bet;
			setValue('bjspent', bjspent);
			bjmwon += bet*2.5;
			setValue('bjmwon', bjmwon);
		}
		if (db.innerHTML.indexOf(lang.bjtracker[7]) != -1) {// dealer bj with insurance
			bjspent += bet;
			setValue('bjspent', bjspent);
			bjmwon += bet*1.5;
			setValue('bjmwon', bjmwon);
		}
	}
	var bjprofit = bjmwon - bjspent;
	if (bjspent >= 0) {
		if (bjprofit >= 0) bjprofit = '$'+commafy(bjprofit);
		else bjprofit = '-$'+commafy(bjspent - bjmwon);
	}
	else { bjprofit = '$0'; }
	var div = cEL('div');
	div.id = 'bjtracker';
	div.setAttribute('style', 'position:fixed; bottom:20px; left:20px; width:220px; background-color:#455C6F; border:2px solid #000; -moz-border-radius:5px; border-radius:5px; padding:4px');
	var gamesWon = Math.round((bjgwon / bjgames) * 100);
	var gamesWon2 = isNaN(gamesWon) ? 0 : gamesWon;
	var gamesTie = Math.round((bjtie / bjgames) * 100);
	var gamesTie2 = isNaN(gamesTie) ? 0 : gamesTie;
	var totalBJack = Math.round((bj / bjgames) * 100);
	var totalBJacks = isNaN(totalBJack) ? 0 : totalBJack;
	div.innerHTML = '<center><b>'+lang.bjtracker[0]+'</b></center><table width="100%"><tr><td bgcolor="black"></td></tr></table><div id="bjstats">'+lang.pokertracker[4]+' <font style="float:right"><b>'+bjgames+'</b></font><br />'+lang.pokertracker[5]+' <font style="float:right"><b>'+bjgwon+' ('+gamesWon2+'%)</b></font><br />'+lang.bjtracker[9]+' <font style="float:right"><b>'+bjtie+' ('+gamesTie2+'%)</b></font><br />'+lang.bjtracker[8]+' <font style="float:right"><b>'+bj+' ('+totalBJacks+'%)</b></font><br />'+lang.pokertracker[6]+' <font style="float:right"><b>$'+commafy(bjspent)+'</b></font><br />'+lang.pokertracker[7]+' <font style="float:right"><b>$'+commafy(bjmwon)+'</b></font><br />'+lang.pokertracker[8]+' <font style="float:right"><b>'+bjprofit+'</b></font></div><br />&nbsp;<div id="resetbj" align="right" style="position:absolute; bottom:2px; right:2px; border:2px solid grey; -moz-border-radius:5px; border-radius:5px;" onmouseover="this.style.border=\'2px solid #DDDF00\'; this.style.cursor = \'pointer\';" onmouseout="this.style.border=\'2px solid grey\'; this.style.cursor=\'default\';" >&nbsp;<b>'+lang.scratcher[16]+'</b> <img src="'+GM_getResourceURL('deleteIcon')+'" style="vertical-align:-3px;" /></div>';
	db.appendChild(div);

	getID('resetbj').addEventListener('click', function() {
		getID('resetbj').innerHTML = '&nbsp;<b>'+lang.scratcher[17]+'<b>&nbsp;';
		getID('bjstats').innerHTML = lang.pokertracker[4]+' <font style="float:right"><b>0</b></font><br />'+lang.pokertracker[5]+' <font style="float:right"><b>0 (0%)</b></font><br />'+lang.bjtracker[9]+' <font style="float:right"><b>0 (0%)</b></font><br />'+lang.bjtracker[8]+' <font style="float:right"><b>0 (0%)</b></font><br />'+lang.pokertracker[6]+' <font style="float:right"><b>$0</b></font><br />'+lang.pokertracker[7]+' <font style="float:right"><b>$0</b></font><br />'+lang.pokertracker[8]+' <font style="float:right"><b>$0</b></font>';
		setValue('bjgames', 0);
		setValue('bjspent', 0);
		setValue('bjgwon', 0);
		setValue('bjmwon', 0);
		setValue('bjtie', 0);
		setValue('bj', 0);
		setValue('bjbet', 0);
	}, true);
	if (prefs[5]) {
		var inputs = $x('//input[@name="bet"]');
		inputs.forEach(function ($n) {
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
		});
	}
}

//---------------- SlotsTracker ----------------
if (dlp.indexOf('/gambling/slotmachine.php') != -1 && prefs[33]) {
	var slotjp = getValue('slotjp', 0);
	var slotbar = getValue('slotbar', 0);
	var slotgames = getValue('slotgames', 0);
	var slotgwon = getValue('slotgwon', 0);
	var slotmwon = getValue('slotmwon', 0);
	var slotspent = getValue('slotspent', 0);
	var slotbet = getValue('slotbet', 0);
	var jpmwon = getValue('jpmwon', 0);
	var str = db.innerHTML.replace(/,/g, '');
	var betinput = $x('//input')[1];
	betinput.focus();
	betinput.addEventListener('keyup', function() {
		setValue('slotbet', parseInt(betinput.value, 10));
	}, true);

	if (db.innerHTML.indexOf(lang.slottracker[1]) != -1) {//won
		var slotpic1 = $I('//center/table/tbody/tr[3]/td/table/tbody/tr/td[1]/center').replace(/">/g, '').split('/');
		var slotpic2 = $I('//center/table/tbody/tr[3]/td/table/tbody/tr/td[2]/center').replace(/">/g, '').split('/');
		var slotpic3 = $I('//center/table/tbody/tr[3]/td/table/tbody/tr/td[3]/center').replace(/">/g, '').split('/');
		if (slotpic1[6] == "a.gif" && slotpic2[6] == "a.gif" && slotpic3[6] == "a.gif") {
			var rexjp = new RegExp(lang.slottracker[3]);
			var jpm = str.match(rexjp); // get money
			jpmwon += parseInt(jpm[1], 10); //jp money won;
			setValue('jpmwon', jpmwon);
			slotjp += 1; //jackpot +1;
			setValue('slotjp', slotjp);
		}
		if (slotpic1[6] == "b.gif" && slotpic2[6] == "b.gif" && slotpic3[6] == "b.gif") {
			slotbar += 1; //triple bar +1;
			setValue('slotbar', slotbar);
		}
		var rex = new RegExp(lang.slottracker[3]);
		var smw = str.match(rex); // get money
		slotgames += 1; //games played +1;
		setValue('slotgames', slotgames);
		slotgwon += 1; //games won +1;
		setValue('slotgwon', slotgwon);
		slotmwon += parseInt(smw[1], 10); //money won;
		slotmwon += parseInt(slotbet, 10); //bet back;
		setValue('slotmwon', slotmwon);
		slotspent += parseInt(slotbet, 10);//money spent
		setValue('slotspent', slotspent);
	}
	if (db.innerHTML.indexOf(lang.slottracker[2]) != -1) {//lost
		slotgames += 1; //games played +1;
		setValue('slotgames', slotgames);
		slotspent += parseInt(slotbet, 10);//money spent
		setValue('slotspent', slotspent);
	}

	var slotprofit = slotmwon - slotspent;
	if (slotspent >= 0) {
		if (slotprofit >= 0) slotprofit = '$'+commafy(slotprofit);
		else slotprofit = '-$'+commafy(slotspent - slotmwon);
	}

	var div = cEL('div');
	div.id = 'slotstracker';
	div.setAttribute('style', 'position:fixed; bottom:20px; left:20px; width:220px; background-color:#455C6F; border:2px solid #000; -moz-border-radius:5px; border-radius:5px; padding:4px');
	var sgamesWon = Math.round((slotgwon / slotgames) * 100);
	var sgamesWon2 = isNaN(sgamesWon) ? 0 : sgamesWon;
	div.innerHTML = '<center><b>'+lang.slottracker[0]+'</b></center><table width="100%"><tr><td bgcolor="black"></td></tr></table><div id="slotstats">'+lang.pokertracker[4]+' <font style="float:right"><b>'+slotgames+'</b></font><br />'+lang.pokertracker[5]+' <font style="float:right"><b>'+slotgwon+' ('+sgamesWon2+'%)</b></font><br />'+lang.slottracker[4]+' <font style="float:right"><b>'+slotjp+' ($'+commafy(jpmwon)+')</b></font><br />'+lang.slottracker[5]+' <font style="float:right"><b>'+slotbar+'</b></font><br />'+lang.pokertracker[6]+' <font style="float:right"><b>$'+commafy(slotspent)+'</b></font><br />'+lang.pokertracker[7]+' <font style="float:right"><b>$'+commafy(slotmwon)+'</b></font><br />'+lang.pokertracker[8]+' <font style="float:right"><b>'+slotprofit+'</b></font></div><br />&nbsp;<div id="resetslot" align="right" style="position:absolute; bottom:2px; right:2px; border:2px solid grey; -moz-border-radius:5px; border-radius:5px;" onmouseover="this.style.border=\'2px solid #DDDF00\'; this.style.cursor = \'pointer\';" onmouseout="this.style.border=\'2px solid grey\'; this.style.cursor=\'default\';" >&nbsp;<b>'+lang.scratcher[16]+'</b> <img src="'+GM_getResourceURL('deleteIcon')+'" style="vertical-align:-3px;" /></div>';
	db.appendChild(div);

	getID('resetslot').addEventListener('click', function() {
		getID('resetslot').innerHTML = '&nbsp;<b>'+lang.scratcher[17]+'<b>&nbsp;';
		getID('slotstats').innerHTML = lang.pokertracker[4]+' <font style="float:right"><b>0</b></font><br />'+lang.pokertracker[5]+' <font style="float:right"><b>0 (0%)</b></font><br />'+lang.slottracker[4]+' <font style="float:right"><b>0 ($0)</b></font><br />'+lang.slottracker[5]+' <font style="float:right"><b>0</b></font><br />'+lang.pokertracker[6]+' <font style="float:right"><b>$0</b></font><br />'+lang.pokertracker[7]+' <font style="float:right"><b>$0</b></font><br />'+lang.pokertracker[8]+' <font style="float:right"><b>$0</b></font>';
		setValue('slotgames', 0);
		setValue('slotgwon', 0);
		setValue('slotmwon', 0);
		setValue('slotspent', 0);
		setValue('slotjp', 0);
		setValue('slotbar', 0);
		setValue('jpmwon', 0);
	}, true);
	if (prefs[5]) {
		var inputs = $x('//input[@name="betted"]');
		inputs.forEach(function ($n) {
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
		});
	}
}

//---------------- 1-Click Voter ----------------
if (dlp == '/vfo.php') { //vote for omerta
	$x('/html/body//table/tbody/tr[3]//a[contains(@href, "votelot.php")]').forEach(function ($n) {
		$n.setAttribute('name', 'forticket');
	});

	function voteNow(save) {
		$x('//*[@name="forticket"]').forEach(function ($n) {
			//GM_openInTab($n); // does not work in current GM (0.9.13)
			window.open($n); // use this until bug in GM is fixed
		});
		if (save) {//store last voting time
			setValue('lastvote', time());
		}
	}

	$X('//td[@class="tableheader"]').innerHTML = '<span id="votelink" class="orange" style="cursor:pointer;" title="'+lang.oneclick[10]+'">' + $X('//td[@class="tableheader"]').textContent + '</span>';
	getID('votelink').addEventListener('click', function () {
		voteNow(false);
	}, true);

	if (prefs[9]) {
		lastVote = getValue('lastvote', 0); //get last voting time
		if (lastVote == 0) {
			if (confirm(lang.oneclick[0])) {
				voteNow(true);
			}
		} else { //not first run

			var till = lastVote + 86400 - time(); // time till next vote
			var msg = '';
			if (till <= 0) { // user can vote again so ask
				var ago = time() - lastVote; // time since last vote
				msg += lang.oneclick[5] + '\n' + lang.oneclick[8];
				msg += Math.floor(ago / 86400) + lang.oneclick[6]; // days
				msg += Math.floor((ago % 86400) / 3600) + lang.oneclick[2]; // hours
				msg += Math.floor((ago % 3600) / 60) + lang.oneclick[3]; // minutes
				msg += Math.floor(ago % 60) + lang.oneclick[4]; // seconds
				msg += '\n' + lang.oneclick[7];
			} else { // can't vote yet
				msg += lang.oneclick[1];
				msg += Math.floor(till / 3600) + lang.oneclick[2]; // hours
				msg += Math.floor((till % 3600) / 60) + lang.oneclick[3]; // minutes
				msg += Math.floor(till % 60) + lang.oneclick[4]; // seconds
				msg += '\n' + lang.oneclick[9];
			}
			if (confirm(msg)) {
				voteNow(true);
			}
		}

	}
}

// TSP trigger variable

var editmode = 0;

if (['/prices.php', '/smuggling.php', '/travel.php'].indexOf(dlp) != -1 && editmode == 1) {
/*
	//init
	Grab prefs
	Grab rank/plane/fatigue/city/lex/fampos/b/n
	Grab prices


	//calc
	Profits of Best Current Carry Run
	Profits for Best Run (x-check with CRC)

	//apply
	$$-mode: buy booze only after narcs
	rp-mode: only buy when get RP, AF sell AFTER buy.
	cd-mode: AF buy AND sell
	remember failed attempts

	//UI
	smart link/hotkeys - click-to-switch

*/
	if (dlp == '/smuggling.php') {
		//Grab vital information
		var cash = $I('//td').split('$')[1].split('<')[0].replace(/\D/g, ''); // Header stuff
		var maxB = $X('//span').getAttribute('value');
		var maxN = $X('//span[2]').getAttribute('value');
		var head = $I('//h3');
		var TrpBm = getID('counter_booze_minutes_value')?getID('counter_booze_minutes_value').innerHTML:0; // Timers
		var TrpBs = getID('counter_booze_seconds_value')?getID('counter_booze_seconds_value').innerHTML:0;
		var TrpNm = getID('counter_drugs_minutes_value')?getID('counter_drugs_minutes_value').innerHTML:0;
		var TrpNs = getID('counter_drugs_seconds_value')?getID('counter_drugs_seconds_value').innerHTML:0;
		var names = []; $x('//table[@width="100%"]//table[@width="100%"]//tr//td[1][not(@class)][not(@bgcolor)]').forEach(function($n){if($n.innerHTML.indexOf('input')==-1){names.push($n.innerHTML.replace(/\W/g,''));}});
		var pricesHere = []; $x('//table[@width="100%"]//tr//td[4][not(@class)]').forEach(function($n){pricesHere.push($n.innerHTML.replace(/\W/g,''));});
		var lexPricesHere=0; if($X('//table[@width="100%"]//tr//td[5][not(@class)]')){lexPricesHere=[];$x('//table[@width="100%"]//tr//td[5][not(@class)]').forEach(function($n){lexPricesHere.push($n.innerHTML.replace(/\W/g,''));});}
		var carryHere = []; $x('//table[@width="100%"]//tr//td[3][not(@class)]').forEach(function($n){carryHere.push($n.innerHTML.replace(/\W/g,''));});
		var imgcode = getID('imgcode')?getID('imgcode').src:0;

		//Cleaning up..
		$Del('//table');
		$Del('//h3');

		//Build Tidy Smuggling page
		var form = $X('//form'); // This is our working area
		var header = cEL('div'); // Assemble header
		header.id = 'TS_header';
		header.style.backgroundColor = getValue('tableBg', '#F0F0F0');
		header.innerHTML = '' +
			'<div style="background-color:' + getValue('titleBg', '#F0F0F0')+ ';">' + head + '</div>' +
			'<div id="TS_UI" style="background-color:' + getTintedColor(getValue('titleBg', '#F0F0F0'), 60) + ';">' +
				'<table cellspacing="0" cellpadding="0" style="width:100%;border:0px;">' +
					'<tr>' +
						'<td>' + // action buttons
							'<img src="http://www.omertabeyond.com/pre/Dopedog/drink.png" />' +
							'<img src="http://www.omertabeyond.com/pre/Dopedog/pill.png" />' +
							'<img src="http://www.omertabeyond.com/pre/Dopedog/coins.png" />' +
							'<img src="http://www.omertabeyond.com/pre/Dopedog/cancel.png" />' +
							'<div class="TS_spacer" style="top:-9px;display:inline;"></div>' +
						'</td>' +
						'<td>' + //numbers
							'<span id="TS_cash">$ ' + commafy(cash) + '</span><br>' +
							'<span id="TS_carry">' + maxB + ' / ' + maxN + '</span>'+
						'</td>' +
						'<td style="text-align:right;">' + // BRC buttons
							'<div class="TS_divButton" style="margin-right:10px;">RP</div>' +
							'<div class="TS_divButton">CD</div>' +
							'<div class="TS_divButton">BR</div>' +
							'<div class="TS_spacer" style="top:4px;float:right;">&nbsp;</div>' +
						'</td>' +
					'</tr>' +
				'</table>' +
			'</div>' +
			'<div style="background-color:' + getTintedColor(getValue('titleBg', '#F0F0F0'), 110) + ';">'+
				'<img src="' + GM_getResourceURL('brcGear') + '" />'+ // City prices
			'</div>' + // B/N prices table
			'<img src="http://www.omertabeyond.com/pre/Dopedog/table.png" />'; // BRC settings
		form.appendChild(header);

		var dealer = cEL('div'); // Assemble dealer
		dealer.setAttribute('style', 'margin-top:20px;background-color:' + getValue('tableBg', '#F0F0F0') + ';width:90%; border:1px solid #000; border-radius:5px; vertical-align:bottom;line-height:20px;');
		var html = '' +
			'<div style="background:#ddd;border-radius:5px;">' +
				'<table cellspacing="0" cellpadding="0" border="0" width="100%">' +
					'<tr style="height:23px;background: url(\'/static/images/game/generic/headershine.png\') repeat-x scroll 0 0 ' + getValue('titleBg', '#F0F0F0')+ ';color:#ddd;font-weight:bold;">' + // Dealer header

						'<td style="border-bottom:2px solid #000;padding-left:6px;">' +
							'Booze&nbsp;' +
						'</td>' +
						'<td colspan="4" style="text-align:left;border-bottom:2px solid #000;padding-left:18px;background:url(\'http://www.omertabeyond.com/pre/Dopedog/clock.png\') no-repeat scroll left center;">' +
							'13:02&nbsp;' +
						'</td>' +
						'<td style="border-bottom:2px solid #000;padding-left:6px;">' +
							'Narcotics&nbsp;' +
						'</td>' +
						'<td colspan="4" style="text-align:left;border-bottom:2px solid #000;padding-left:18px;background:url(\'http://www.omertabeyond.com/pre/Dopedog/clock.png\') no-repeat scroll left center;">' +
							'13:02&nbsp;' +
						'</td>' +
					'</tr>';
		for (i=0;i<7;i++) { // Assemble dealer rows
			html += '<tr style="height:25px;background:#fff;">' +
						'<td style="padding-left:6px;width:120px;">' + names[i] + '</td>' +
						'<td>' +
							'<input style="width:41px;height:20px;border-top-left-radius:5px;border-bottom-left-radius:5px;text-align:right;padding-right:3px;color:#000;background:' + getTintedColor(getValue('titleBg', '#F0F0F0'), 110) + ';border:1px solid #000;border-left:1px solid #000;border-right:0px; border-bottom:1px solid #555;" type="text" />' +
							'<div style="cursor:pointer;display:inline-table;width:17px;height:17px;vertical-align:top;background:' + getTintedColor(getValue('titleBg', '#F0F0F0'), 70) + ';border:1px solid #000;border-left:2px solid #333;border-right:2px solid #000;border-bottom:1px solid #000;border-top-right-radius:5px;border-bottom-right-radius:5px;color:#444;text-align:center;padding-top:1px;line-height:14px;">&#8226;</div>' +
						'</td>' +
						'<td style="text-align:right;">' + carryHere[i] + '</td>' +
						'<td style="width:80px;">&nbsp;</td>' +
						'<td style="text-align:right;padding-right:10px;width:55px;">' +
							'<div style="float:left;">$</div>' + commafy(pricesHere[i]) +
						'</td>' +
						'<td style="border-left:1px solid #000; padding-left:5px;width:120px;">' + names[i+7] + '</td>' +
						'<td>' +
							'<input style="width:41px;height:20px;text-align:right;border-top-left-radius:5px;border-bottom-left-radius:5px;padding-right:3px;color:#000;background:' + getTintedColor(getValue('titleBg', '#F0F0F0'), 110) + ';border:1px solid #000;border-left:1px solid #000;border-right:0px; border-bottom:1px solid #555;" type="text" />' +
							'<div style="cursor:pointer;display:inline-table;width:17px;height:17px;vertical-align:top;background:' + getTintedColor(getValue('titleBg', '#F0F0F0'), 70) + ';border:1px solid #000;border-left:2px solid #333;border-right:2px solid #000;border-bottom:1px solid #000;border-top-right-radius:5px;border-bottom-right-radius:5px;color:#444;text-align:center;padding-top:1px;line-height:14px;">&#8226;</div>' +
						'</td>'+
						'<td style="text-align:right;">' + carryHere[i+7] + '</td>' +
						'<td style="width:80px;">&nbsp;</td>' +
						'<td style="text-align:right;padding-right:10px;width:55px;">' +
							'<div style="float:left;">$</div>' + commafy(pricesHere[i+7]) +
						'</td>' +
					'</tr>';
		}
	//	imgcode =1;
		dealer.innerHTML = html + // buy/sell buttons
					'<tr style="height:24px;background:#ddd;">' +
						'<td style="border-top:1px solid #000;">&nbsp;</td>' +
						'<td style="border-top:1px solid #000;padding-top:6px;padding-bottom:6px;">' +
							'<button value="Sell" style="cursor:pointer;height:20px;width:61px;border:1px solid #000;border-left:1px solid #555;border-right:2px solid #000;border-top:1px solid #555; background:' + getTintedColor(getValue('titleBg', '#F0F0F0'), 70) + ';border-radius:5px;">Sell</button>' +
						'</td>' +
						'<td colspan="3" style="border-top:1px solid #000;">&nbsp;</td>' +
						'<td style="border-top:1px solid #000;">&nbsp;</td>' +
						'<td colspan="1" style="border-top:1px solid #000;">' +
							'<button value="Sell" style="cursor:pointer;height:20px;width:61px;border:1px solid #000;border-left:1px solid #555;border-right:2px solid #000;border-top:1px solid #555; background:' + getTintedColor(getValue('titleBg', '#F0F0F0'), 70) + ';border-radius:5px;">Sell</button>' +
						'</td>' +
						'<td colspan="3" style="border-top:1px solid #000;">&nbsp;</td>' +
					'</tr>' +
				'</table>' +
				'<table cellspacing="0" cellpadding="0" style="width:100%;border:0px;border-top:1px solid #000;background-color:' + getTintedColor(getValue('titleBg', '#F0F0F0'), 110) + ';">' + // img code + status box
					'<tr>' +
						'<td style="padding:20px;text-align:center;width:50%;vertical-align:top;">' +
							(imgcode ? '<img style="border:1px solid #000; border-radius:5px;" src="' + imgcode + '" />' : '') +
						'</td>' +
						'<td style="padding:20px;text-align:center;width:50%;vertical-align:top;">' +
							'<div style="display:inline-table;border:1px solid #000;width:300px;height:110px;padding-left:5px;background:#fff;border-radius:5px;line-height:15px;text-align:left;">' +
								'<span>- You are tired<br>- Low Cash<br>- Best Run Mode: Buy B - Buy N</span>' +
							'</div><br>' +
							'<input type="text" ' + (!imgcode?' disabled="true" style="background:#aaa !important;':'style="') + 'margin-top:18px;width:200px;height:23position:relative;top:0px;border-top:1px solid #000;border-left:1px solid #000;border-right:0px solid #000;border-bottom:1px solid #555;border-top-left-radius:5px;border-bottom-left-radius:5px;color:#111;background:url(\'http://www.omertabeyond.com/pre/Dopedog/keyboard.png\') no-repeat scroll 175px 1px #fff;padding:4px;" />' +
							'<input style="height:29px;width:105px;border:3px solid #000;border-left:3px solid #555;border-top:3px solid #555; background:' + getTintedColor(getValue('titleBg', '#F0F0F0'), 70) + ';border-radius:5px;color:#000;cursor:pointer;" type="submit" value="Go for it" />' +
						'</td>' +
					'</tr>' +
				'</table>' +
			'</div>' +
			'<div style="background:' + getTintedColor(getValue('titleBg', '#F0F0F0'), 110) + ';border-bottom-left-radius:5px;border-bottom-right-radius:5px;height:5px;">&nbsp;</div>';
		form.appendChild(dealer);
	}
/*
	setValue('bodyBg', getActualHex($X('//body'), 'background-color'));
	setValue('titleBg' ,getActualHex($X('//a[@class="selected"]'), 'background-color'));
	var dummy = cEL('table'); dummy.id = 'dummyT'; dummy.setAttribute('class', 'thinline'); db.appendChild(dummy);
	setValue('tableBg', getActualHex($X('//table[@id="dummyT"]'), 'background-color'));
	$Del('//table[@id="dummyT"]');
	setValue('fontClr', getActualHex($X('//body'), 'color'));
*/
}


//---------------- Best Run Calculator ----------------
if (editmode==0 && (dlp == '/prices.php' || dlp == '/smuggling.php' || dlp == '/travel.php')) {
	//variable soup :D
	var pp, sp, tp, bninfo, values, carry_n, carry_b, n_amount, b_amount, selling_n, fail_n, boxes, narc, booze, city, plane, fam;
	var smugCity, nCityprofit, bCityprofit, border, table, tr, td, mOver, mOut, bestNarc, bestBooze, d, lex, lexHour, lexDay;
	var allProfits, bestBN, profitNarc, profitBooze, famProfit, travelPrices, travelCost, totalProfit;
	var key, n1, b1, aCell, link, c, center, br1, br2, target, bestRun, inputs, bn_xp, bn_text, cash, xpb, xpn, n, b;
	var nItem, highNarc, bItem, highBooze, lowNarc, lowBooze, sel, div, color, title, H, wrap1, wrap2, wrap3, wrap4, e, icon;
	var a1, a2, a3, a4, best, cd, rp, none, s, info, BN, l, nLines, bLines, pArr, noBRC, row, item, j, k, parser, dom;

	pp = dlp == '/prices.php';
	sp = dlp == '/smuggling.php';
	tp = dlp == '/travel.php';

	bninfo = getValue('bninfo', -1);
	if (bninfo != '' && bninfo != -1) { //extra checker for undefined crap
		if (bninfo.search(/[^0-9]/) != -1) {
			setValue('bninfo', -1);
		}
	}

	//grab Lex
	if ($X('//span[@id="lexhelpsyou"]')) {
		lex = parseInt($I('//span[@id="lexhelpsyou"]').replace(/[^0-9]/g,''), 10);
		setValue('lex', lex);
		d = new Date();
		lexDay = d.getDay();
		lexHour = d.getHours();
		setValue('lexHour', lexHour);
		setValue('lexDay', lexDay);
	} else {
		lex = getValue('lex', 0);
		lexDay = getValue('lexDay', -1);
		lexHour = getValue('lexHour', -1);
	}


	//--Assemble functions

	function fillBRC(n, b, mode) { //actually filling the forms
		//set defaults
		values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		// booze    - narcs    == maximum user can buy
		// carry_b  - carry_n  == total user is carrying
		// b_amount - n_amount == amount per item user is carrying
		// b        - n        == item we want


		if (n > -1) { //do we want narcs?
			if (carry_n == 0) { //nothing in pocket, fill it all
				values[7+n] = narcs;
				inputs[17].checked = 1; //buy
			} else { //something in pocket
				if (n_amount[n] < narcs) { //not full of wanted
					if (n_amount[n] != carry_n) { //there is unwanted stuff
						for (i=0; i<=6; i++) {
							if (i != n || mode == 1) { //only sell what we don't want
								values[i+7] = n_amount[i];
							}
						}
						inputs[16].checked = 1; //sell
					} else { //only carrying wanted narcs
						values[7+n] = narcs - carry_n; //if any, fill missing amount
						inputs[17].checked = 1; //buy
					}
				} else { //full of wanted
					if (mode > 0) { //CD/RP mode, sell all
						values[7+n] = n_amount[n];
						inputs[16].checked = 1; //sell
					}
				}
			}
		} else if(mode != 3) { //sell the leftovers
			for (i=0; i<=6; i++) {
				values[i+7] = n_amount[i];
			}
			inputs[16].checked = 1; //sell
		}

		//check for scenario: failed selling narcs in high
		selling_n = 0;
		for (i=0; i<=6; i++) {
			selling_n += values[i+7];
		}
		fail_n = (carry_b == 0 && carry_n == narcs && mode == 0 && selling_n > 0) ? 1 : 0;

		if (b > -1 && !fail_n) { //do we want booze? Or are we still selling narcs in high?
			if (carry_b == 0) {
				values[b] = booze; //nothing in pocket, fill it all
				inputs[8].checked = 1; //buy
			} else {
				if (b_amount[b] < booze) { //not full of wanted
					if (b_amount[b] != carry_b) { //there is unwanted stuff
						for (i=0; i<=6; i++) {
							if ( (i != b || true) || mode == 1) { //only sell what we don't want or in CD mode
								values[i] = b_amount[i];
							}
						}
						inputs[7].checked = 1; //sell
					} else { //only carrying wanted narcs
						values[b] = booze - carry_b; //if any, fill missing amount
						inputs[8].checked = 1; //buy
					}
				} else { //full of wanted
					if (mode > 0) { //CD/RP mode, sell all
						values[b] = b_amount[b];
						inputs[7].checked = 1; //sell
					}
				}
			}
		} else if(mode != 3) { //sell the leftovers
			for (i=0; i<=6; i++) {
				values[i] = b_amount[i];
			}
			inputs[7].checked = 1; //sell
		}

		//fill in the boxes with the calculated values
		boxes = $x('//input[@type="text"]');
		for (i=0; i<=13; i++) {
			boxes[i].value = values[i];
		}

		//focus
		$X($X('//input[@name="ver"]')?'//input[@name="ver"]':'//input[@type="submit"]').focus();
	}

	function appBRC(BN) { //Best Run Calculator
		//get info from 'UnsafeDiv' ;)
		var getInfo = $I('//div[@id="info"]');
		getInfo = getInfo.split('*');

		narc = getInfo[0];
		booze = getInfo[1];
		city = getInfo[2];
		plane = getInfo[3];
		fam = getInfo[4];
		lex = parseInt(getInfo[8]);
		lexHour = parseInt(getInfo[9]);
		lexDay = parseInt(getInfo[10]);

		if (sp) { //extra city checker
			smugCity = $I('//h3');
			for (i = 0; i < 8; i++) {
				if (smugCity.search(lang.cities[i]) != -1) {
					city = i + 4;
					setPow('bninfo', 2, city);
				}
			}
		}

		//calc profits per item per city
		lex = 1 + 0.01*lex;
		for (nCityprofit = [], bCityprofit = [], i = 0; i <= 7; i++) { //get profit per single unit of b/n
			for (nCityprofit[i] = [], bCityprofit[i] = [], j = 0; j <= 6; j++) { //price there - price here
				nCityprofit[i].push(Math.round(BN[0][j][(i + 2)]*lex) - BN[0][j][(city - 4 + 2)]); //-4 correction for city ID,
				bCityprofit[i].push(Math.round(BN[1][j][(i + 2)]*lex) - BN[1][j][(city - 4 + 2)]); //+2 correction for min/max @ [0]+[1] in BN array
			}
			nCityprofit[i].unshift(nCityprofit[i].max()); //most profit per unit in this city
			bCityprofit[i].unshift(bCityprofit[i].max());
		}

		//--create BRC table
		border = '1px solid #000';

		table = cEL('table');
		table.id = 'brc';
		table.setAttribute('class', 'thinline');
		table.width = '500';
		tr = cEL('tr');
		td = cEL('td');
		td.style.backgroundColor = getValue('titleBg', '#F0F0F0');
		td.setAttribute('colspan', '5');
		td.setAttribute('class', 'tableheader');
		td.innerHTML = lang.BR[0];
		tr.appendChild(td);
		table.appendChild(tr);
		tr = cEL('tr');
		td = cEL('td');
		td.setAttribute('colspan', '5');
		td.setAttribute('bgcolor', '#000');
		td.setAttribute('height', '1');
		tr.appendChild(td);
		table.appendChild(tr);
		tr = cEL('tr'); //header
		td = cEL('td');
		td.innerHTML = '&nbsp;' + lang.BR[1];
		tr.appendChild(td);
		td = cEL('td');
		td.innerHTML = '&nbsp;' + lang.BR[2];
		tr.appendChild(td);
		td = cEL('td');
		td.innerHTML = '&nbsp;' + lang.BR[3];
		tr.appendChild(td);
		td = cEL('td');
		td.innerHTML = '&nbsp;' + lang.BR[4];
		tr.appendChild(td);
		td = cEL('td');
		td.innerHTML = '&nbsp;';
		tr.appendChild(td);
		tr.style.borderBottom = border;
		tr.style.backgroundColor = getValue('tableBg', '#F0F0F0');
		table.appendChild(tr);

		//--add city rows with induvidual profits
		for (allProfits = [], bestBN = [], i = 0; i <= 7; i++) {
			tr = cEL('tr');
			if (prefs[21] && pp) { //add HL effects here too
				tr.id = '2row' + i;
				tr.style.backgroundColor = getValue('tableBg', '#F0F0F0');
				mOver = 'this.style.backgroundColor = \'#888\';';
				mOver += 'document.getElementById(\'0row' + (i + 2) + '\').style.backgroundColor = \'#888\';';
				mOver += 'document.getElementById(\'1row' + (i + 2) + '\').style.backgroundColor = \'#888\';';
				tr.setAttribute('onMouseover', mOver);

				mOut = 'this.style.backgroundColor = \'' + getValue('tableBg', '#F0F0F0') + '\';';
				mOut += 'document.getElementById(\'0row' + (i + 2) + '\').style.backgroundColor = \'' + getValue('tableBg', '#F0F0F0') + '\';';
				mOut += 'document.getElementById(\'1row' + (i + 2) + '\').style.backgroundColor = \'' + getValue('tableBg', '#F0F0F0') + '\';';
				tr.setAttribute('onMouseout', mOut);
			}
			td = cEL('td');
			tr.style.borderBottom = border;
			tr.style.height = '19px';
			td.setAttribute('colspan', '5');

			//--Calc profits
			if (i == city - 4) { //This is the current city
				td.innerHTML = '<center><i>' + lang.BR[5] + lang.cities[i] + '</i></center>';
				tr.appendChild(td);
				allProfits.push(0);
				bestBN.push([0, 0]);
			} else if (plane == 0 && (((city == 6 || city == 11) && (i + 4) != 6 && (i + 4) != 11) || ((city != 6 && city != 11) && ((i + 4) == 6 || (i + 4) == 11)))) { //No plane to travel there
				td.innerHTML = '<center><i>' + lang.BR[6] + lang.cities[i] + '</i></center>';
				tr.appendChild(td);
				allProfits.push(0);
				bestBN.push([0, 0]);
			} else { //Nothing wrong, clear to go
				bestNarc = nCityprofit[i][0] < 0 ? 0 : nCityprofit[i].lastIndexOf(nCityprofit[i][0]); //best, if any, narc?
				profitNarc = (bestNarc == 0) ? 0 : nCityprofit[i][bestNarc]; //profit per unit
				profitNarc = profitNarc * narc;

				bestBooze = bCityprofit[i][0] < 0 ? 0 : bCityprofit[i].lastIndexOf(bCityprofit[i][0]); //best, if any, booze?
				profitBooze = (bestBooze == 0) ? 0 : bCityprofit[i][bestBooze]; //profit per unit
				profitBooze = profitBooze * booze;

				//count for fam pos
				famProfit = (profitNarc + profitBooze);
				famProfit = famProfit - Math.round(famProfit * [0, 0.12, 0.1, 0][fam]);

				//calc travelcost
				travelPrices = [ //travelcosts from A to B
					[    0,   600, 10350, 1575,  3600, 1350,  1050, 10800], //det
					[  600,     0, 11025, 2025,  3000, 1725,  1425, 11400], //chi
					[10350, 11025,     0, 9075, 14025, 9450,  9750,  1875], //pal
					[ 1575,  2025,  9075,    0,  5025,  375,   675,  9375], //ny
					[ 3600,  3000, 14025, 5025,     0, 4650,  4350, 14400], //lv
					[ 1350,  1725,  9450,  375,  4650,    0,   300,  9750], //phi
					[ 1050,  1425,  9750,  675,  4350,  300,     0, 10050], //bal
					[10800, 11400,  1875, 9375, 14400, 9750, 10050,     0]  //cor
				];  //det   chi    pal    ny    lv     phi   bal    cor
				travelCost = travelPrices[i][(city - 4)];
				if (plane == 0) { //no plane => half travelcost
					travelCost /= 2;
				}

				//Our total profit in this city
				totalProfit = famProfit - Math.round(travelCost);

				//save all profits in array for later
				allProfits.push(totalProfit);

				//What's the result
				if (totalProfit < 0) { //no profit :(
					td.innerHTML = '<center><i>' + lang.BR[7] + lang.cities[i] + '</i></center>';
					tr.appendChild(td);
					bestBN.push([0, 0]); //push dummy to complete array
				} else { //profit \o/
					bestBN.push([bestNarc, bestBooze]);
					td.innerHTML = '&nbsp;' + lang.cities[i];
					td.setAttribute('colspan', '1');
					tr.appendChild(td);
					var bCell = cEL('td');
					bCell.style.borderLeft = border;
					bCell.innerHTML = '&nbsp;' + lang.booze[bestBooze];
					tr.appendChild(bCell);
					var nCell = cEL('td');
					nCell.style.borderLeft = border;
					nCell.innerHTML = '&nbsp;' + lang.narcs[bestNarc];
					tr.appendChild(nCell);
					var pCell = cEL('td');
					pCell.style.borderLeft = border;
					pCell.innerHTML = '&nbsp;$ ' + commafy(totalProfit);
					tr.appendChild(pCell);

					if (sp) { //we need JS links @ smuggling and don't want to waste clicks
						key = [0, 4, 6, 1, 2, 3, 5]; //convert b/n - botprices order to smuggling order
						n1 = key[bestNarc - 1];
						b1 = key[bestBooze - 1];

						var aCell = cEL('td');
						aCell.style.borderLeft = border;
						aCell.innerHTML = '&nbsp;';
						if (!link) {
							link = [];
						}
						link = cEL('a');
						link.id = 'go' + i;
						link.setAttribute('style', 'font-weight:inherit; text-align:center; cursor:pointer');
						link.innerHTML = 'Go!';
						link.href = '#';
						link.setAttribute('n', n1); //add what they should be AF'ing
						link.setAttribute('b', b1);
						aCell.appendChild(link);
						tr.appendChild(aCell); //add the row
					} else { //we need to GET to smuggling too
						aCell = cEL('td');
						aCell.style.borderLeft = border;
						if (sets.version == "_com" ) {
							plink = "http://www.barafranca.com";
						} else if (sets.version == "_dm" ) {
							plink = "http://dm.barafranca.com";
						} else {
							plink = "http://www.barafranca.nl";
						}
						aCell.innerHTML = '&nbsp;<a style="font-weight:inherit; text-align:center" href="'+ plink + '/smuggling.php?n=' + (bestNarc - 1) + '&b=' + (bestBooze - 1) + '">Go!</a>';
						tr.appendChild(aCell); //add the row
					}
				}
			}
			table.appendChild(tr);
		}
		if(lex>1) {
			lexRow = cEL('tr');
			lexTd = cEL('td');
			d = new Date();
			lexTd.innerHTML = 'Lex Level: ' + parseInt((lex-1)*100) + ' - Seen ' + ((d.getDay() != lexDay)?'1 Day ago':d.getHours() - lexHour + ' Hours ago');
			lexTd.setAttribute('colspan', '5');
			lexTd.setAttribute('style', 'text-align: right; font-size:10px;');
			lexRow.appendChild(lexTd);
			table.appendChild(lexRow);
		}

		//add table page
		if (pp) { //Duplicate page style and format
			c = $X('//center[2]');
			center = c.cloneNode(0);
			center.appendChild(table);

			function app(n, r) {
				return c.parentNode.insertBefore(n, r);
			}
			br1 = cEL('br');
			app(br1, c.nextSibling);
			br2 = cEL('br');
			app(br2, c.nextSibling);

			app(center, c.nextSibling.nextSibling.nextSibling); //add BRC table to page
		} else { //make our own
			target = $X(sp ? '//form//table/tbody/tr[2]' : '//table//tr[5]');
			tr = cEL('tr');
			td = cEL('td');
			td.setAttribute('colspan', '2');
			td.appendChild(table);
			tr.appendChild(td);
			if (sp) {
				target.parentNode.insertBefore(tr, target.nextSibling.nextSibling.nextSibling);
			} else {
				table.width = target.parentNode.scrollWidth;
				target.parentNode.parentNode.parentNode.appendChild(cEL('br'));
				target.parentNode.parentNode.parentNode.appendChild(table);
			}
			if (sp) { //link the JS links to our filler function fillBRC()
				for (i = 0; i <= 7; i++) {
					if (db.innerHTML.indexOf('id="go' + i) != -1) { //check for Go! link
						getID('go' + i).addEventListener('click', function () {
							fillBRC(parseInt(this.getAttribute('n')), parseInt(this.getAttribute('b')), 0);
						}, true);
					}
				}
			}
		}
		//finish it up > bold-ify Best Run
		bestRun = allProfits.lastIndexOf(allProfits.max());
		$X('//table[@id="brc"]//tr[' + (4 + bestRun) + ']').style.fontWeight = 'bold';
		//!-Added the table
		//--BRC AutoForm
		if (sp) { //AF on Smuggling page

			function AF(sel,Xn,Xb) {
				//assemble info for AF
				inputs = $x('//input');
				bn_xp = '//form/table/tbody/tr[1]/td';

				bn_text = $X(bn_xp).firstChild.firstChild.firstChild.innerHTML;
				bn_text = bn_text.split('|');

				cash = parseInt(bn_text[0].replace(/[^0-9.]/g, ''));
				booze = parseInt(bn_text[1].replace(/[^0-9.]/g, '')); //max amount user can carry
				narcs = parseInt(bn_text[2].replace(/[^0-9.]/g, ''));

				b_amount = [0, 0, 0, 0, 0, 0];
				n_amount = [0, 0, 0, 0, 0, 0]; //what is user carrying
				xpb = '//form/table/tbody/tr[2]/td/table/tbody/tr[';
				xpn = '//form/table/tbody/tr[2]/td[2]/table/tbody/tr[';
				for (i = 0; i <= 15; i++) { //define how much of this item is being carried
					if (i < 7) {
						b_amount[i] = parseInt($I(xpb + (i + 4) + ']/td[3]'));
					}
					if (i > 8) {
						n_amount[(i - 9)] = parseInt($I(xpn + (i - 5) + ']/td[3]'));
					}
				}
				carry_n = n_amount.sum();
				carry_b = b_amount.sum(); //how much is the user carrying already
				//which item do we want?
				key = [0, 4, 6, 1, 2, 3, 5];
				if (sel == 0) { //Calc for Best Run
					n = key[(bestBN[bestRun][0] - 1)]; //this trick works, even I'm amazed
					b = key[(bestBN[bestRun][1] - 1)];
				}
				if (sel == 1) { //CD Run
					for (i = 0; i <= 6; i++) {
						nItem = parseInt(BN[0][i][(city - 4 + 2)]);
						highNarc = ((i == 0) ? nItem : ((highNarc > nItem) ? highNarc : nItem));
						if (highNarc == nItem) {
							n = i;
						}
						bItem = parseInt(BN[1][i][(city - 4 + 2)]);
						highBooze = ((i == 0) ? bItem : ((highBooze > bItem) ? highBooze : bItem));
						if (highBooze == bItem) {
							b = i;
						}
					}
					n = key[n];
					b = key[b];
				}
				if (sel == 2) { //RP Run
					for (i = 0; i <= 6; i++) {
						nItem = parseInt(BN[0][i][(city - 4 + 2)]);
						lowNarc = ((i == 0) ? nItem : ((lowNarc < nItem) ? lowNarc : nItem));
						if (lowNarc == nItem) {
							n = i;
						}
						bItem = parseInt(BN[1][i][(city - 4 + 2)]);
						lowBooze = ((i == 0) ? bItem : ((lowBooze < bItem) ? lowBooze : bItem));
						if (lowBooze == bItem) {
							b = i;
						}
					}

					n = key[n];
					b = key[b];

					//don't fill in if we can't earn RP and AF would want to buy
					if ($I('//form//table//tr[2]/td[@align="center"][1]').search(lang.BR[10]) == -1 && inputs[8].checked) {
						b = -1;
					}
					if ($I('//form//table//tr[2]/td[@align="center"][2]').search(lang.BR[10]) == -1 && inputs[17].checked) {
						n = -1;
					}
				}
				if (sel == 3) { //None
					n = b = -1;
				}
				if (dls != '') { //user manual override using external Go! link
					n = key[(GetParam('n'))];
					b = key[(GetParam('b'))];
				}

				//overrule with hotkeys [ ] =
				if(Xn) { var n = -1; }
				if(Xb) { var b = -1; }

				//still nothing defined, don't fill nothing!
				if(!n) { var n = 0; }
				if(!b) { var b = 0; }

				//we know our n and b => fill it in!
				fillBRC(n, b, sel);
			}
			if ((dls == '' && prefs[28]) || dls != '') { //no call for AF && Smuggling AF on? ==> GO! || calls for AF? ==> GO!
				AF(getInfo[5]);
			}
			//!-Done AutoForming
			//--Add BRC AF settings Div
			div = cEL('div');
			div.id = 'AF';
			div.setAttribute('mode', getInfo[6]);
			div.setAttribute('class', 'NRinfo');

			var color = getValue('titleBg', '#3F505F');
			div.setAttribute('style', 'right:10px; top:10px; width:100px !important; text-align:right; background-color:' + color + ' !important;');
			if (getInfo[6] == -1) {
				div.setAttribute('style', 'right:-90px; top:-80px; width:100px !important; text-align:right; background-color:' + color + ' !important;');
			}
			title = cEL('span');
			title.innerHTML = '<center><u>' + lang.BR[8] + '</u></center>';
			div.appendChild(title);

			H = prefs[4]; //do we want hotkeys?
			//add button for each option
			wrap1 = cEL('span');
			a1 = cEL('a');
			a1.innerHTML = (H ? lang.smuggling[6]+'(8)' : lang.smuggling[6]);
			a1.id = 'a1';
			a1.title = lang.smuggling[7];
			if (H) {
				a1.setAttribute('accesskey', '8');
			}
			wrap1.appendChild(a1);
			best = cEL('input');
			best.id = 'brc0';
			best.setAttribute('type', 'radio');
			best.name = 'brc';
			wrap1.appendChild(best);
			div.appendChild(wrap1);

			wrap2 = cEL('span');
			wrap2.innerHTML = '<br />';
			a2 = cEL('a');
			a2.innerHTML = (H ? lang.smuggling[8]+'(9)' : lang.smuggling[8]);
			a2.id = 'a2';
			a2.title = lang.smuggling[9];
			if (H) {
				a2.setAttribute('accesskey', '9');
			}
			wrap2.appendChild(a2);
			cd = cEL('input');
			cd.id = 'brc1';
			cd.setAttribute('type', 'radio');
			cd.name = 'brc';
			wrap2.appendChild(cd);
			div.appendChild(wrap2);

			wrap3 = cEL('span');
			wrap3.innerHTML = '<br />';
			a3 = cEL('a');
			a3.innerHTML = (H ? lang.smuggling[10]+'(0)' : lang.smuggling[10]);
			a3.id = 'a3';
			a3.title = lang.smuggling[11];
			if (H) {
				a3.setAttribute('accesskey', '0');
			}
			wrap3.appendChild(a3);
			rp = cEL('input');
			rp.id = 'brc2';

			rp.setAttribute('type', 'radio');
			rp.name = 'brc';
			wrap3.appendChild(rp);
			div.appendChild(wrap3);

			wrap4 = cEL('span');
			wrap4.innerHTML = '<br />';
			a4 = cEL('a');
			a4.innerHTML = (H ? lang.smuggling[12]+'(-)' : lang.smuggling[12]);
			a4.id = 'a4';
			a4.title = lang.smuggling[13];
			if (H) {
				a4.setAttribute('accesskey', '-');
			}
			wrap4.appendChild(a4);
			none = cEL('input');
			none.id = 'brc3';
			none.setAttribute('type', 'radio');
			none.name = 'brc';
			wrap4.appendChild(none);
			div.appendChild(wrap4);

			//add coolness icon
			icon = cEL('img');
			icon.id = 'brcIcon';
			icon.src = getInfo[7];
			icon.setAttribute('style', 'position:absolute; bottom:0px; left:0px; cursor:pointer');

			//add Div to page
			div.appendChild(icon);
			db.appendChild(div);

			//add cool sliding 'n hiding
			getID('brcIcon').addEventListener('click', function () {
				div = getID('AF');
				s = div.style;
				if (div.getAttribute('mode') == 1) { //mode 1 - visible
					div.setAttribute('mode', 0); //mode 0 - moving
					setTimeout(function () {
						s.right = '0';
						s.top = '0';
					}, 100); //use timers for sliding effect
					setTimeout(function () {
						s.right = '-20';
						s.top = '-20';
					}, 200);
					setTimeout(function () {
						s.right = '-45';
						s.top = '-40';
					}, 300);
					setTimeout(function () {
						s.right = '-65';
						s.top = '-60';
					}, 400);
					setTimeout(function () {
						s.right = '-90';
						s.top = '-80';
						div.setAttribute('mode', -1);
					}, 500);
					setValue('brcDiv', -1); //mode -1 - hidden
				}
				if (div.getAttribute('mode') == -1) { //mode 1 - visible
					div.setAttribute('mode', 0); //mode 0 - moving
					setTimeout(function () {
						s.right = '-65';
						s.top = '-60';
					}, 100);
					setTimeout(function () {
						s.right = '-45';
						s.top = '-40';
					}, 200);
					setTimeout(function () {
						s.right = '-20';
						s.top = '-20';
					}, 300);
					setTimeout(function () {
						s.right = '-0';
						s.top = '-0';
					}, 400);
					setTimeout(function () {
						s.right = '10';
						s.top = '10';
						div.setAttribute('mode', 1);
					}, 500);
					setValue('brcDiv', 1); //mode -1 - hidden
				}
			}, true);
	//**/ //add AF() callers
			$X('//input[@id="brc0"]').addEventListener('click', function () {
				AF(0);
				try {
					setValue('brcAF', 0);
				} catch (e) {}
			}, true); //setValue will only work directly
			$X('//input[@id="brc1"]').addEventListener('click', function () {
				AF(1);
				try {
					setValue('brcAF', 1);
				} catch (e) {}
			}, true); //but thats fine :D
			$X('//input[@id="brc2"]').addEventListener('click', function () {
				AF(2);
				try {
					setValue('brcAF', 2);
				} catch (e) {}
			}, true); //hotkeys are 1 time action anyways
			$X('//input[@id="brc3"]').addEventListener('click', function () {
				AF(3);
				try {
					setValue('brcAF', 3);
				} catch (e) {}
			}, true);
			if (H) { //add hotkeys
				$X('//a[@id="a1"]').href = 'javascript:document.getElementById("brc0").click();';
				$X('//a[@id="a2"]').href = 'javascript:document.getElementById("brc1").click();';
				$X('//a[@id="a3"]').href = 'javascript:document.getElementById("brc2").click();';
				$X('//a[@id="a4"]').href = 'javascript:document.getElementById("brc3").click();';

				var getInfo = $I('//div[@id="info"]');
				getInfo = getInfo.split('*');
				var mode = getInfo[5];

				bn_xp = '//form/table/tbody/tr[1]/td';
				str = $I(bn_xp);

				str += '<hr /><a accessKey="[" id="do_n" title="'+lang.smuggling[14]+'" onFocus="this.blur()" href="#">' + lang.smuggling[2] + ' ([)</a>';
				str += ' - <a accessKey="]" id="do_b" title="'+lang.smuggling[15]+'" onFocus="this.blur()" href="#">' + lang.smuggling[1] + ' (])</a>';
				str += ' - <a accessKey="=" id="do_sell" title="'+lang.smuggling[16]+'" onFocus="this.blur()" href="#">' + lang.smuggling[5] + ' (=)</a><br />';

				$I(bn_xp, str);

				getID('do_n').addEventListener('click', function(){ AF(getValue('brcAF', 0),0,1); }, true);
				getID('do_b').addEventListener('click', function(){ AF(getValue('brcAF', 0),1,0); }, true);
				getID('do_sell').addEventListener('click', function(){ AF(2,1,1); }, true);
			}
			$X('//input[@id="brc' + getInfo[5] + '"]').setAttribute('checked', '1'); //check the selected option at the Div too
		}
		//!-Done with BRC AF
	}
	//!-Done assembling functions
	//--let's get started
	if (getValue('bninfo', -1) > 0) { //do we have info data?
		if (getValue('brcAF', 0) == 1 && prefs[18]) { //remove blue calculation texts
			if (db.innerHTML.search('<font color="blue">') != -1) {
				$del('//font[@color="blue"]');
			}
		}

		//create 'unsafeDiv' to transfer data to XHR function
		narc = getPow('bninfo', 0, -1);
		booze = getPow('bninfo', 1, -1);
		city = getPow('bninfo', 2, -1);
		plane = getPow('bninfo', 3, -1);
		fam = getPow('bninfo', 4, -1);

		info = cEL('div');
		info.id = 'info';
		info.style.display = 'none';
		info.innerHTML = narc + '*' + booze + '*' + city + '*' + plane + '*' + fam + '*' + getValue('brcAF', 0) + '*' + getValue('brcDiv', 1) + '*' + GM_getResourceURL('brcGear') + '*' + lex + '*' + lexHour + '*' + lexDay;
		db.appendChild(info);

		//get all prices
		if (pp) { //prices are on the page
			for (BN = [], i = 0; i <= 1; i++) { //B/N
				for (BN[i] = [], j = 0; j <= 6; j++) { //type
					for (BN[i][j] = [], k = 0; k <= 7; k++) { //city
						BN[i][j].push(parseInt($I('//center[' + (1 + i) + ']/table//tr[' + (4 + k) + ']/td[' + (2 + j) + ']').replace(/[^0-9]/g, '')));
					}
					BN[i][j].unshift(BN[i][j].min()); //get min
					BN[i][j].unshift(BN[i][j].max()); //get max
				}
			}
		//**/ //send prices to BRC function
			appBRC(BN);
		}
		if (sp || tp) { //we need prices from elsewhere

			function parsePrices(resp, url) {
				parser = new DOMParser();
				dom = parser.parseFromString(resp, 'application/xml');

				for (BN = [], i = 0; i <= 1; i++) { //B/N
					for (BN[i] = [], j = 0; j <= 6; j++) { //type
						for (BN[i][j] = [], k = 0; k <= 7; k++) {
							BN[i][j].push(parseInt(dom.getElementsByTagName((i == 0 ? (langs.en.narcs[(j + 1)]).replace('abacco', 'obacco') : langs.en.booze[(j + 1)]).toLowerCase())[k].textContent)); //city
						}
						BN[i][j].unshift(BN[i][j].min()); //get min
						BN[i][j].unshift(BN[i][j].max()); //get max
					}
				}
		//**/
				appBRC(BN); //send prices to BRC function
			}
		//**/	//get prices and send them to parser
			grabHTML('http://' + dlh + '/BeO/webroot/index.php?module=API&action=smuggling_prices', parsePrices);
		}
	}
	//!-Done getting started
	//--Prices Highlights @ prices page
	if (prefs[21] && pp) {
		noBRC = false; //asume working BRC table
		if (typeof BN == 'undefined') { //see if prices are grabbed already
			noBRC = true; //no BRC mean no need to try and HL 'em
			for (BN = [], i = 0; i <= 1; i++) { //B/N
				for (BN[i] = [], j = 0; j <= 6; j++) { //type
					for (BN[i][j] = [], k = 0; k <= 7; k++) { //city
						BN[i][j].push(parseInt($I('//center[' + (1 + i) + ']/table//tr[' + (4 + k) + ']/td[' + (2 + j) + ']').replace(/[^0-9]/g, '')));
					}
					BN[i][j].unshift(BN[i][j].min()); //get min
					BN[i][j].unshift(BN[i][j].max()); //get max
				}
			}
		}
		for (i = 0; i <= 1; i++) {
			for (j = 0; j <= 6; j++) {
				for (k = 2; k <= 9; k++) {
					if (j == 0) { //add mouseover effects
						row = $X('//center[' + (1 + i) + ']/table//tr[' + (2 + k) + ']');
						row.id = i + 'row' + k;
						row.style.borderTop = '1px solid #000';

						mOver = 'this.style.backgroundColor = \'#888\';';
						mOver += 'document.getElementById(\'' + (i ? 0 : 1) + 'row' + k + '\').style.backgroundColor = \'#888\';';
						if (!noBRC) {
							mOver += 'document.getElementById(\'2row' + (k - 2) + '\').style.backgroundColor = \'#888\';';
						}
						row.setAttribute('onMouseover', mOver);

						mOut = 'this.style.backgroundColor = \'' + getValue('tableBg', '#F0F0F0') + '\';';
						mOut += 'document.getElementById(\'' + (i ? 0 : 1) + 'row' + k + '\').style.backgroundColor = \'' + getValue('tableBg', '#F0F0F0') + '\';';
						if (!noBRC) {
							mOut += 'document.getElementById(\'2row' + (k - 2) + '\').style.backgroundColor = \'' + getValue('tableBg', '#F0F0F0') + '\';';
						}
						row.setAttribute('onMouseout', mOut);
					}

					item = $X('//center[' + (1 + i) + ']/table//tr[' + (2 + k) + ']/td[' + (2 + j) + ']');
					item.style.borderLeft = '1px solid #000';
					if (!(j % 2)) { //add colors to rows
						$X('//center[' + (1 + i) + ']/table//tr[' + (2 + k) + ']/td[' + (2 + j) + ']').style.backgroundColor = '#888';
					}
					if (BN[i][j][k] == BN[i][j][0]) { //HL max
						item.style.color = '#FF0000';
					}
					if (BN[i][j][k] == BN[i][j][1]) { //HL min
						item.style.color = '#00FF00';
					}
					if (j == 5 && i == 0) { //bold-ify cocaine
						item.style.fontWeight = 'bold';
					}
					item.style.textAlign = 'center';
					item.style.width = '12%';
				}
			}
		}
	}
}

//---------------- Smuggling ----------------
if (editmode==0 && (prefs[28] && dlp == '/smuggling.php')) { //mainly add AF links and tweak innerHTML, other functions taken over by BRC
	//get input fields
	inputs = $x('//input');
	bn_xp = '//form/table/tbody/tr[1]/td';
	bn_text = $X(bn_xp).innerHTML.split('<br>');

	cash = parseInt(bn_text[3].replace(/[^0-9.]/g, ''), 10);
	booze = parseInt(bn_text[4].match(/\d+/), 10); //max amount user can carry
	narcs = parseInt(bn_text[5].match(/\d+/), 10);

	b_amount = [0, 0, 0, 0, 0, 0]; //what is user carrying
	n_amount = [0, 0, 0, 0, 0, 0];

	xpb = '//form/table/tbody/tr[2]/td/table/tbody/tr[';
	xpn = '//form/table/tbody/tr[2]/td[2]/table/tbody/tr[';

	for (i = 0; i <= 15; i++) { //add click to fill stuff and hotkeys
		if (i < 7) { //booze
			var x = i + 4;
			b_amount[i] = parseInt($I(xpb + x + ']/td[3]'), 10); //define how much of this item is being carried
			$I(xpb + x + ']/td', '<a id="bh'+i+'" index="'+i+'" ' + (prefs[4] ? 'accesskey="' + (i + 1) + '" ' : '') + 'title="'+lang.smuggling[17]+' ' + (i + 1) + ' )" onFocus="this.blur()" href="javascript:{}">' + (prefs[4] ? (i + 1) : '') + ' ' + $I(xpb + x + ']/td') + '</a>');

			getID('bh'+i).addEventListener('click', function(e){
				function z() { getTAG('input')[i].value = 0; } //zero
				var i = parseInt(e.target.getAttribute('index'));
				var inpt = getTAG('input'); //inputs

				for(var j=0;j<=6;j++) {//reset form
					if (j!=i) {
						inpt[j].value = 0;
					}
				}

				var missing = booze - b_amount[i];
				var value = inpt[i].value;
				if (b_amount[i] == 0) {
					if (value == 0) {
						inpt[i].value = booze;
						inpt[8].checked = 1; //sell
					} else { z(); }
				} else if (b_amount[i] == booze) {
					if (value == 0) {
						inpt[i].value = booze;
						inpt[7].checked = 1; //buy
					} else { z(); }
				} else if (b_amount[i] != booze) {
					if (value == 0) {
						inpt[i].value = missing;
						inpt[8].checked = 1; //buy
					} else if (value == missing) {
						inpt[i].value = b_amount[i];
						inpt[7].checked = 1; //sell
					} else { z(); }
				}
				if ($X('//input[@name="ver"]')) {
					$X('//input[@name="ver"]').focus();
				} else {
					$X('//input[@type="submit"]').focus();
				}
			}, true);
		}
		if (i > 8) { //narcs
			var x = i - 5;
			n_amount[(i - 9)] = parseInt($I(xpn + x + ']/td[3]'), 10); //define how much of this item is being carried
			$I(xpn + x + ']/td', '<a onFocus="this.blur()" id="nh'+i+'" index="'+i+'" title="'+lang.smuggling[18]+'" href="javascript:{}">' + $I(xpn + x + ']/td') + '</a>');

			getID('nh'+i).addEventListener('click', function(e){
				function z() { getTAG('input')[i].value = 0; } //fill zero
				var i = parseInt(e.target.getAttribute('index'));
				var inpt = getTAG('input'); //inputs

				for(var j=0;j<=6;j++) {//reset form
					if (j!=i-9) {
						inpt[j+9].value = 0;
					}
				}

				var missing = narcs - n_amount[i-9];
				var value = parseInt(inpt[i].value);
				if (n_amount[i-9] == 0) {
					if (value == 0) {
						inpt[i].value = narcs;
						inpt[17].checked = 1; //sell
					} else { z(); }
				} else if (n_amount[i-9] == narcs) {
					if (value == 0) {
						inpt[i].value = narcs;
						inpt[16].checked = 1; //buy
					} else { z(); }
				} else if (n_amount[i-9] < narcs) {
					if (value == 0) {
						inpt[i].value = missing;
						inpt[17].checked = 1; //buy
					} else if (value == missing) {
						inpt[i].value = n_amount[i-9];
						inpt[16].checked = 1; //sell
					} else { z(); }
				} else if (n_amount[i-9] > narcs) {
					if (value == 0) {
						inpt[i].value = n_amount[i-9];
						inpt[17].checked = 1; //sell
					} else { z(); }
				}
				if ($X('//input[@name="ver"]')) {
					$X('//input[@name="ver"]').focus();
				}
			}, true);
		}
	}
	$x('//input[@name="typebooze"] | //input[@name="typedrugs"]').forEach(function($n){
		$n.addEventListener('click', function() {
			if ($X('//input[@name="ver"]')) {
				$X('//input[@name="ver"]').focus();
			}
		}, true);
	});

	//create more efficient info text
	info_xp = '//form/table/tbody/tr/td';
	part = $I(info_xp).split('<br>');

	str = '<table border="0"><tr>';
	str += '<td>' + lang.smuggling[0] + '$ ' + commafy(cash) + ' | </td>';
	str += '<td>' + 'Max ' + lang.smuggling[1] + ': ' + booze + ' | </td>';
	str += '<td>' + 'Max ' + lang.smuggling[2] + ': ' + narcs + '</td>';
	str += '</tr></table>';
	str += '<a href="prices.php" target="main">'+lang.smuggling[19]+'</a>';

	$X(bn_xp).innerHTML = str;
	inputs[18].focus(); //focus captcha

	//AF stuff on Smuggling page
	if (dls != '') { //we found a BRC request!
		key = [0, 4, 6, 1, 2, 3, 5]; //convert b/n order to order on smuggling page
		n = key[(GetParam('n'))];
		b = key[(GetParam('b'))];
		fillBRC(n, b); //we know what we want, now fill it in!
	}
}
//------------------ Quick lookup ------------------
if (dlp.indexOf('user.php') != -1 && dls.indexOf('page=user') != -1) {
	if(getTXT('/html/body').search(lang.lookup[0]) != -1){
		var input = GetParam('nick');
		GM_xmlhttpRequest({ //grab data from xml
			method: 'GET',
			url: 'http://rix.omertabeyond.com/obxml/quicklookup.xml.php?v='+sets.version.replace('_', '')+'&input='+input,
			onload: function(resp){
				var parser = new DOMParser();
				var xml = parser.parseFromString(resp.responseText, 'application/xml');
				var total = xml.getElementsByTagName('totalresults')[0].textContent;
					db.innerHTML = 'This user does not exist: '+input;
				if(input.length<3){
					db.innerHTML += '<br />'+lang.lookup[3];
				}
				else if(total!='0'){
					db.innerHTML += (total<=50)?'<br />'+lang.lookup[1]+'<br />':'<br />'+lang.lookup[1]+'<br />'+lang.lookup[4]+' '+total+' '+lang.lookup[5]+'<br />';
					for(var i=0;i<50;i++){
						var results = xml.getElementsByTagName('name')[i].textContent;
						db.innerHTML += '<br /><a href="'+dlp+'?nick='+results+'">'+results+'</a>';
					}
					nickReader();
				} else {
					db.innerHTML += '<br />'+lang.lookup[2];
				}
			}
		});
	}
}
//---------------- Login page ----------------
if (dlp == '/' || dlp == '/index.php' || dlp == '/game-login.php') { // login page
	if (prefs[20]) { // clean login page pref
		$Del('/html/body/table/tbody/tr[2]'); //rough cleansing!
		$Del('//tr/td/table//table/tbody/tr[2]'); //yellow links
		$X('//td').setAttribute('height', '90%'); //new primary cell heigth
		var logo = $Cut('//td[contains(@style, "width:280px")]', 1); //replace the logo
		logo.style.textAlign = 'center';
		logo.innerHTML = logo.innerHTML + '<br /><br /><br /><br /><br /><hr color="#666" size="1" /><br />';
		var tr = cEL('tr');
		tr.appendChild(logo);
		$X('/html/body/table//table/tbody/tr').parentNode.insertBefore(tr, $X('/html/body/table//table/tbody/tr'));

		var tr2 = cEL('tr'); //add spacing
		var filler = logo.cloneNode(0);
		filler.innerHTML = '<br /><hr color="#666" size="1" /><br /><br /><br /><br /><br /><br /><br /><br /><br />';
		tr2.appendChild(filler);
		$X('/html/body/table//table/tbody/tr').parentNode.insertBefore(tr2, $X('/html/body/table//table/tbody/tr').nextSibling.nextSibling);

		var footer = $X('//tr[@height="100"]'); //add footer
		footer.setAttribute('height', '60');
		footer.childNodes[1].style.paddingTop = '4px';
		footer.childNodes[1].childNodes[1].innerHTML = '&copy; 2004-2011 - Omerta Game Ltd. | &copy; 2007-2011 - Omerta Beyond<br /><br /><a href="http://www.omertabeyond.com" target="_blank">Omerta Beyond</a> | <a href="' + PrefsLink + '" target="_blank">' + lang.prefsname + '</a> | <a href="' + (sets.version == '_dm' || sets.version == '_com' ? OBnUrl : EdoUrl) + '" target="_blank">' + lang.login[1] + '</a> | <a href="/game-register.php">' + lang.login[0] + '</a>';

		var input = [$X('//input[@name="email"]'), $X('//input[@name="pass"]'), $X('//input[@type="submit"]')]; //add focus effects and styling
		input.forEach(function ($n) {
			$n.setAttribute('class', 'loginHL');
		});
	} else {
		var input = [$X('//input[@name="email"]'), $X('//input[@name="pass"]'), $X('//input[@type="submit"]')];
	}
	if (input[0].value == 'Email') { //auto-focus (both clean login and normal login page)
		input[0].focus();
	} else if (input[1].value == '') {
		input[1].focus();
	} else {
		input[2].focus();
	}
}

//---------------- NickReader ----------------
if(prefs[16] && dlp != '/mid.php' && dlp != '/banner.php' && dlp != '/game.php' && dlp != '/menu.php' && dlp != '/info.php'){//if nickreader is on
	var nickReaderIcon = GM_getResourceURL('nickreader');
	function parseGrab(html, url){
		var body = html.slice(html.indexOf('</head>')+7);//don't need <head>
		if(body.indexOf('/BeO/webroot/index.php\?module=Donate.Methods') == -1){//check for clicklimit
			var ident = url.split('=')[1];//make sure all requests are handled seperatly
			var xDiv = cEL('div');//place html into page to get DOM
			xDiv.setAttribute('id', 'XHRDiv'+ident);
			xDiv.style.display = 'none';
			xDiv.innerHTML = body;
			db.appendChild(xDiv);

			//shiftin' poppin' 'n pushin' to get what we want ;o
			var keys = $x('//div[@id="XHRDiv'+ident+'"]//table[@id="user"]//tr//td[1]');//extract keys from DOM
			keys.pop(); keys.pop(); keys.pop();
			keys.shift(); keys.shift();
			for(i=keys.length-1;i>=0;i--){//filter non-left-side cells
				if(keys[i].getAttribute('class') != 'subtableheader'){
					keys.splice(i, 1);
				}
			}
			keys.pop();
			var last = keys[(keys.length-1)].textContent;
			if(last.indexOf('(') != -1){ keys.pop(); }

			var vals = $x('//div[@id="XHRDiv'+ident+'"]//table[@id="user"]//tr//td[2]');//extract vals from DOM
			vals.pop(); vals.pop();
			last = vals.pop();//check if last cell isn't friends cell
			if(last.innerHTML.indexOf('<table') != -1){
				if(keys.length > vals.length){
					keys.pop();
				}
			} else {
				vals.push(last);
			}

			//parse certain values to make them fit within the popup
			for(i=keys.length-1;i>=0;i--){
				keys[i] = keys[i].innerHTML.replace(/<[^<]+?>|\n|\t|:/ig, '');
				vals[i] = vals[i].innerHTML.replace(/<br>/g, '\n').replace(/<[^<]+?>| \/ |\t|&.+/ig, '').replace(/^ /, '');
				//vals[i] = vals[i].innerHTML.replace(/<[^<]+?>| \/ |\n|\t|&.+/ig,'').replace(/^ /,'');
				if(vals[i].indexOf(' online ')!=-1){
					vals[i] = vals[i].slice(0, vals[i].indexOf(' online ')+7);//limit Status
				}
				if(vals[i].indexOf('(')!=-1){
					vals[i] = vals[i].slice(0, vals[i].indexOf('('));//limit Family
				}
			}

			//setup the table
			var table = '<table width="100%" border="0" id="NRtable">';
			for(i=0;i<keys.length;i++){
				table += '<tr><td height="15"><b>'+keys[i]+'</b></td><td>' + vals[i] + '</td></tr>';
			}
			table += '</table>';

			var icon = cEL('img');
			icon.setAttribute('style', 'position:absolute; right:7px; top:7px;');
			icon.src = GM_getResourceURL('nickreader');

			//add to page and clean-up after us
			getID(url).innerHTML = table;
			getID(url).setAttribute('name', 'done');
			getID(url).appendChild(icon);
			$Del('//div[@id="XHRDiv'+ident+'"]');
			getID('proc').innerHTML = 0;
		} else {//stumbled on clicklimit, notify user and reset process
			getID(url).innerHTML += lang.NR.misc[3];
			getID('proc').innerHTML = 0;
		}
	}

	function checkNRdiv(url){
		var on = (getID('shft').textContent == '1')?1:0;//is the NR activated?
		var go = 1;//default is to add popup

		if(db.innerHTML.indexOf('id="'+url) != -1){//check for an existing popup
			var popup = getID(url);
			if(on){//if it's there, let's see it
				popup.style.display = 'block';
			}
			go = 0;//we found a popup already
			if(popup.innerHTML.indexOf('<td></td></tr>') != -1){//check for any empty values
				popup.parentNode.removeChild(popup);
				go = 1;//it's no good though
			}
			if(getID(url).getAttribute('name') == 'loading'){//check if it's loaded yet (clicklimit)
				popup.parentNode.removeChild(popup);
				go = 1;//it's no good though
			}
		}

		if(go && on){//yes we may proceed to add the popup
			var div = cEL('div');
			div.id = url;//unique
			div.setAttribute('class', 'NRInfo');
			div.innerHTML = '<img src="'+GM_getResourceURL('loading')+'" /> '+lang.NR.misc[0];

			//get actual color
			var color = getValue('titleBg', '#3F505F');
			div.setAttribute('style', 'background-color:'+ color + ' !important');

			//add follow the mouse
			document.addEventListener('mousemove', function(mouse){
				var divH = div.scrollHeight;
				var divW = div.scrollWidth;

				var X = mouse.pageX;
				var Y = mouse.pageY;
				var plusX = 20;
				var plusY = 20;

				if(X + divW + 20 > document.documentElement.scrollWidth){ //if box falls of the right
					plusX = -20 - divW;
				}
				if(Y + divH + 20 > window.innerHeight){ //if box falls of the bottom
					plusY = -20 - divH;
				}
				div.style.left = X + plusX;
				div.style.top = Y + plusY;
			}, true);

			//add popup to page
			div.setAttribute('name', 'loading');
			db.appendChild(div);

			//check if there isn't a process running already, otherwise grab the HTML
			if(getID('proc').innerHTML == 0){
				grabHTML(url, parseGrab);//(url to grab, function to execute after)
				getID('proc').innerHTML = 1;
			} else {
				getID(url).innerHTML += lang.NR.misc[4];
			}
		}
	}

	function nickReader(){
		var nicks = $x('//a[contains(@href, "user.php")][not(contains(@href, "&jh="))]');
		if(nicks.length > 0){
			//don't run this part twice
			if(db.innerHTML.search('id="NRstatus"') == -1){
				var color = getValue('titleBg', '#3F505F');
				var div = cEL('div');//setup NR status div
				div.id = 'NRstatus';
				div.setAttribute('style', 'background-color: ' + color + '!important');
				div.style.display = 'block';
				div.style.right = -180;
				div.style.top = 10;
				div.innerHTML = '<center><img src="'+nickReaderIcon+'" />&nbsp;&nbsp;<b>'+lang.NR.misc[2]+'</b></center>';
				db.appendChild(div);

				div = cEL('div');//setup shift event checker
				div.style.display = 'none';
				div.id = 'shft';
				div.innerHTML = 0;
				db.appendChild(div);

				div = cEL('div');//setup proces checker
				div.style.display = 'none';
				div.id = 'proc';
				div.innerHTML = 0;
				db.appendChild(div);

				function slideIn() {
					var s = getID("NRstatus");
					setTimeout(function(){s.style.right=-140;},100);
					setTimeout(function(){s.style.right=-100;},200);
					setTimeout(function(){s.style.right=-60;},300);
					setTimeout(function(){s.style.right=-30;},400);
					setTimeout(function(){s.style.right=10;},500);
				}
				function slideOut() {
					var s = getID("NRstatus");
					setTimeout(function(){s.style.right=-30;},100);
					setTimeout(function(){s.style.right=-60;},200);
					setTimeout(function(){s.style.right=-100;},300);
					setTimeout(function(){s.style.right=-140;},400);
					setTimeout(function(){s.style.right=-180;},500);
				}

				//add eventListeners with slide!
				window.addEventListener('keydown', function(event){
					if(event.keyCode==16){
						if(getID("shft").innerHTML == 0){
							slideIn();
							getID("shft").innerHTML = 1;
						} else {
							slideOut();
							getID("shft").innerHTML = 0;
						}
					}
				}, true);
			}
			nicks.forEach(function($n){//add mouse event checkers
				if($n.href.search('cpuser')==-1){
					$n.addEventListener('mouseover', function(){ checkNRdiv(this.href); }, true);
					$n.addEventListener('mouseout', function(){ if(getID(this.href)){ getID(this.href).style.display = 'none';} }, true);
				}
			});
			window.focus();//focus on frame so 'shift' event is noticed
		}
	}
	//run only on pages without manual trigger
	if(dls != '?module=Launchpad' && dls != '?module=Statistics'){
		window.addEventListener('load', function(){ nickReader(); }, true);
	}
}
if(prefs[16] && dls.indexOf('?module=Hitlist') != -1){//add nickreader to hitlist too
	var body = getID('smsdivcontainer')?getID('smsdivcontainer'):db; //check for smsdiv, otherwise go back to body (hitlist details fix)
	body.addEventListener('DOMNodeInserted', function(event){
		if(event.target.nodeName=='TABLE'){
			nickReader();
		}
	}, false);
}

//---------------- add global css style ----------------
if (dlp != '/game.php' && dlp != '/banner.php' && dlp != '/pic.php' && dlp != '/right.php') {
	GM_addStyle(GM_getResourceText('css'));
}

//---------------- Title changer + Beyond Favicon Replacer ----------------
if ((dlp == '/' || dlp == '/index.php' || dlp == '/game.php' || dlp == '/game-login.php') && lh.indexOf('beyond') == -1) {
	window.addEventListener('load', function () {
		setTimeout(function () {
			setIcon(GM_getResourceURL('favoriteIco'));
		}, 500);
		document.title = lang.title;
	}, false);
}

//---------------- Beyond Logo Replacer ----------------
var logoXpath = '//img[contains(@src, "logo0.gif")] | //img[contains(@src, "omertalo.gif")] | //img[contains(@src, "deathmatch.gif")] | //img[contains(@src, "omdmlogo.png")] | //img[contains(@src, "./static/images/game/layout/logo.png")] | //img[contains(@src, "omerta-game-logo.gif")]';
$x(logoXpath).forEach(function ($n) {
	$n.src = GM_getResourceURL(sets.version.replace('_', '') + 'Logo');
	if (dlp != '/servers.php') {
		$n.parentNode.innerHTML = '<a href="http://www.omertabeyond.com" target="_blank" onFocus="this.blur()">' + $n.parentNode.innerHTML + '</a>';
	}
});

};//the end \o/
