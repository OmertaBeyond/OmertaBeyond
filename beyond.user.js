// ==UserScript==
// @name			Omerta Beyond
// @version			1.10
// @date			11-03-2011
// @author			OBDev Team <info@omertabeyond.com>
// @author			vBm <vbm@omertabeyond.com>
// @author			Dopedog <dopedog@omertabeyond.com>
// @author			Rix <rix@omertabeyond.com>
// @author			MrWhite <mrwhite@omertabeyond.com>
// @license			GNU General Public License v3
// @namespace			v3.omertabeyond.com
// @homepageURL			http://www.omertabeyond.com/
// @description			Omerta Beyond 1.10 (Still the best 'legal' script! ;))
// @icon			http://omertabeyond.googlecode.com/svn/trunk/images/logo.small.png
// @screenshot			http://omertabeyond.googlecode.com/svn/trunk/images/sshot.png http://omertabeyond.googlecode.com/svn/trunk/images/sshot_tn.png
// @require			http://omertabeyond.googlecode.com/svn/trunk/scripts/libs.js
// @require			http://omertabeyond.googlecode.com/svn/trunk/scripts/settings.js
// @require			http://omertabeyond.googlecode.com/svn/trunk/scripts/langs.js
// @resource	css		http://omertabeyond.googlecode.com/svn/trunk/scripts/beyond.css
// @resource	trash		http://omertabeyond.googlecode.com/svn/trunk/images/del.png
// @resource	colorpicker	http://omertabeyond.googlecode.com/svn/trunk/images/colorpicker.gif
// @resource	comLogo		http://omertabeyond.googlecode.com/svn/trunk/images/logo-com.png
// @resource	dmLogo		http://omertabeyond.googlecode.com/svn/trunk/images/logo-dm.png
// @resource	nlLogo		http://omertabeyond.googlecode.com/svn/trunk/images/logo-nl.png
// @resource	buttonMenu	http://omertabeyond.googlecode.com/svn/trunk/images/menu.png
// @resource	buttonKey	http://omertabeyond.googlecode.com/svn/trunk/images/key.png
// @resource	buttonReset	http://omertabeyond.googlecode.com/svn/trunk/images/reset.png
// @resource	favoriteIco	http://omertabeyond.googlecode.com/svn/trunk/images/favicon.png
// @resource	updateIco	http://omertabeyond.googlecode.com/svn/trunk/images/updateicon.png
// @resource	brcGear		http://omertabeyond.googlecode.com/svn/trunk/images/brcgear.png
// @resource	deleteIcon	http://omertabeyond.googlecode.com/svn/trunk/images/deleteicon.png
// @resource	reply		http://omertabeyond.googlecode.com/svn/trunk/images/reply.png
// @resource	loading		http://omertabeyond.googlecode.com/svn/trunk/images/loading.png
// @resource	nickreader	http://omertabeyond.googlecode.com/svn/trunk/images/magnifier.png
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
if (db.innerHTML.indexOf('clicklimit') != -1 && dlp != '/menu.php') {
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
}	else if (hOne == '500 - Internal Server Error') {
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
		case 'www.barafranca.com':
		case 'barafranca.com':
		case 'www.omerta3.com':
		case 'omerta3.com':
		case 'www.barafranca.us':
		case 'barafranca.us':
		case '89.149.221.178':
			return 'com';
			break;
		case 'deathmatch.barafranca.com':
		case 'dm.barafranca.com':
			return 'dm';
			break;
		case 'www.barafranca.nl':
		case 'barafranca.nl':
			return 'nl';
			break;
		case 'www.barafranca.gen.tr':
		case 'barafranca.gen.tr':
			return 'tr';
			break;
		case 'gm.omertabeyond.com':
		case 'www.omertabeyond.com':
			var version = window.location.search.split('=')[1];
			if (version.indexOf('&') == -1) {
				return version;
			} else {
				return version.split('&')[0];
			}
		default:
			return undefined;
	}
}

var lang, sets, whoami;
if (whereToRun() == 'com') {
	lang = langs.en;
	sets = settings.en;
	whoami = GM_getValue('nick_com', '');
} else if (whereToRun() == 'dm') {
	lang = langs.dm;
	sets = settings.dm;
	whoami = GM_getValue('nick_dm', '');
} else if (whereToRun() == 'nl') {
	lang = langs.nl;
	sets = settings.nl;
	whoami = GM_getValue('nick_nl', '');
} else if (whereToRun() == 'tr') {
	lang = langs.tr;
	sets = settings.tr;
	whoami = GM_getValue('nick_tr', '');
}

const SCRIPT_NAME = 'Omerta Beyond';
const SCRIPT_VERSION = '1.10';
const SCRIPT_VERSION_MAJOR = 1;
const SCRIPT_VERSION_MINOR = 10;
const SCRIPT_VERSION_MAINTENANCE = 0;
const SCRIPT_VERSION_BUILD = 32;
const SCRIPT_SUBVERSION = 32;
var minFFVersion = '3.6';
const SITE_LINK = 'http://www.omertabeyond.com';
const SCRIPT_LINK = 'http://gm.omertabeyond.com';
const UPDATE_URL = SCRIPT_LINK+"/version.xml";
var PrefsLink = SCRIPT_LINK + sets.prefslink;
var PricesLink = SCRIPT_LINK + sets.priceslink;
var ContactLink = SCRIPT_LINK + sets.contactlink;
var PollLink = SITE_LINK + sets.polllink;
const OBnUrl = 'http://news.omertabeyond.com/';
const EdoUrl = 'http://www.edo-nieuws.nl/news.php';
var ff = navigator.userAgent.split('/')[3].split(' ')[0];
const OB_v = SCRIPT_VERSION_MAJOR + '.' + SCRIPT_VERSION_MINOR + '.' + SCRIPT_VERSION_MAINTENANCE;
const OB = OB_v + '.' + SCRIPT_VERSION_BUILD;

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
	'bust',
	'nobust',
	'colours',
	'jailint',
	'nbint',
	'priority',
	'FL_prior',
	'Fam_prior',
	'maxHL',
	'buyout',
	'colour',
	'defpri',
	'defcol'
];

//---------------- int->str bninfo compatibility ----------------
txt = getValue('bninfo', '');
if (typeof txt == 'number') {
	setValue('bninfo', '' + txt);
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

	var string = '<tr style="height: 25px;" id="prefsrow"><td colspan="4" class="toptd">Omerta Beyond ' + OB + ' <span style="padding-right:10px;">: '+lang.prefsname+' </span> <a href="#" name="updater" ><img src="'+GM_getResourceURL('updateIco')+'" border="0" title="'+lang.prefsPage[0]+'" alt="'+lang.prefsPage[0]+'" /></a></td></tr>';

	function addCat(title) { //pref category
		toggleStr = 'var node = this; while(node.nextSibling.innerHTML.search(/<input/)!=-1){ var node = node.nextSibling; var show = ((node.style.display == \'none\') ? \'\' : \'none\'); node.style.display = show; };'; //js to toggle hiding prefs for category
		string += '<tr style="height: 25px;" id="cat" class="tr" onClick="javascript:' + toggleStr + '"><td colspan="4" class="td"><b>&nbsp; &rarr; <u>';
		string += title;
		string += '</u></b></td></tr>';
	}

	function addPrefItems(list) { //indices of prefs to list... order matters!
		for (i = -1; ++i < list.length;) { //loop through given prefs for category
			string += '<tr style="height: 25px; display:none;" class="tr"><td width=25 class="td">'; //start pref row
			string += '<input type="checkbox" id="check' + list[i] + '" name="check_list" /></td>'; //checkbox
			string += '<td class="td"' + (((i + 1) == list.length) ? ' colspan="3"' : '');
			string += '><span title="' + prefsTitle[list[i]] + '" style="cursor:pointer" onclick="javascript:node = this.parentNode.previousSibling.childNodes[0];node.checked = (node.checked ? 0 : 1)">';
			string += prefstr[list[i++]] + '</span></td>'; //pref name
			if (i == list.length) {
				string += '</tr>'; //end pref row
			} else {
				string += '<td width="25" class="td"><input type="checkbox" id="check' + list[i] + '" name="check_list" /></td>'; //checkbox
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
	addPrefItems([25, 7, 26, 27, 29]);

	addCat(lang.preftitles[4]); //Clean up
	addPrefItems([6, 22, 12, 14, 30, 19, 20, 18]);

	addCat(lang.preftitles[5]); //OBnews / Edo
	addPrefItems([2, 38]);

	addCat(lang.preftitles[6]); //misc
	addPrefItems([16, 11, 13, 5, 15, 9, 31, 33, 34, 36, 37]);

	string += '<tr style="height: 50px;"><td colspan="4" class="bigtd"><button type="button" name="Check_All" class="button" onClick="Check(document.myform.check_list)">'+lang.prefsPage[1]+'</button>';
	string += '&nbsp;<button type="button" name="#" class="button" onClick="';

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

	if(prefs[3]){//JHL stuff
		var family = getValue('bust', '').split(",");
		var colour = getValue('colours', '').split(",");
		var priority = getValue('priority', '').split(",");
		var nobust = getValue('nobust', '').split(",");
		var nbint = getValue('nbint', 3);
		var jailint = getValue('jailint', 4);
		var maxHL = getValue('maxHL', 5);
		var hotkeys = getValue('rawkeyprefs','');
		var buyout = getValue('buyout','/');
		var FL_prior = getValue('FL_prior',3);
		var Fam_prior = getValue('Fam_prior',9);
		var defpri = getValue('defpri',5);
		var defcol = getValue('defcol','33FF66');

		var savestring = '<button type="button" class="button" name="#" onClick="location.href = \''+PrefsLink+'&maxHL=\' + document.getElementById(\'maxHL\').value + \'&buyout=\' + document.getElementById(\'buyout\').value + \'&FL_prior=\' + document.getElementById(\'FL_prior\').value + \'&Fam_prior=\' + document.getElementById(\'Fam_prior\').value + \'&defpri=\' + document.getElementById(\'defpri\').value + \'&defcol=\' + document.getElementById(\'defcol\').value + \'&bust=\'';
		fam_list = col_list = pri_list = nb_list = '';

		for(i=-1;++i<jailint;){
			fam_list += " + document.getElementById('family" +i+ "').value.toUpperCase() + ','";
			col_list += " + document.getElementById('colour" +i+ "').value.replace('#', '') + ','";
			pri_list += " + document.getElementById('priority" +i+ "').value + ','";
		}
		for(i=-1;++i<nbint;){
			nb_list += " + document.getElementById('nobust" +i+ "').value.replace('&','%26').toUpperCase() + ','";
		}
		savestring += fam_list + " + '&colours='" + col_list + " + '&priority='" + pri_list + " + '&nobust='" + nb_list;
		savestring += '">'+lang.jhl[6]+'</button>';

		var string = '<tr style="height: 25px;"><td colspan="6" class="toptd">Omerta Beyond : Jail Highlighter '+lang.jhl[0]+'</td></tr>';
		string += '<tr style="height: 25px;" class="tr"><td class="td">&nbsp;</td><td width="210" class="td"><b>'+lang.jhl[1]+'</b></td><td width="75" class="td"><b>'+lang.jhl[2]+'</b></td><td width="76" class="td">&nbsp;</td><td width="50" class="td"><b>'+lang.jhl[3]+'</b></td><td class="td">&nbsp;</td></tr>';
		for(i=-1;++i<jailint;){
			if(family[i] == null) { family[i] = ""; }
			if(colour[i] == null) { colour[i] = ""; }
			if(priority[i] == null) { priority[i] = ""; }
			if(!colour[i]) { colour[i] = "CCCCCC"; }
			string += '<tr height="25" class="tr"><td>&nbsp;</td><td><img height="20" onmouseover="style.cursor=\'pointer\'" onClick="javascript:getElementById(\'family'+i+'\').value=\'\';getElementById(\'colour'+i+'\').value=\'\';getElementById(\'priority'+i+'\').value=\'\';" src="'+GM_getResourceURL("trash")+'" alt="Delete" /><input id="family' + i + '" value="' + family[i].replace('%20', ' ').replace('%26', '&') + '" type="text" name="#" class="inputbig" /></td>';
			string += '<td><input id="colour'+i+'" value="'+colour[i]+'" type="text" name="color'+(i+1)+'" class="color {pickerPosition:\'top\',pickerFaceColor:\'transparent\',pickerFace:3,pickerBorder:0,pickerInsetColor:\'black\'}" style="-moz-border-radius:5px; border-radius:5px; padding-left:3px; background:none repeat scroll 0 0 #CCC; border:1px solid #000; font-family:tahoma;font-size:10px;width:75px;" /></td>';
			string += '<td><img src="'+GM_getResourceURL("colorpicker")+'" border="0" onmouseover="this.style.cursor=\'pointer\';" onmouseout="this.style.cursor=\'default\';" onClick="document.getElementById(\'colour'+i+'\').color.showPicker()" alt="Pick color" /></td>';
			string += '<td><input id="priority'+i+'" value="'+priority[i]+'" type="text" name="#" class="inputsmall" /></td><td>&nbsp;</td></tr>';
		}
		if(jailint > "1") {
			string += '<tr class="tr" style="height: 25px;" align="center"><td colspan="6" class="td" style="border-bottom-width:2px;"><button type="button" class="button" onClick="location.href = \''+PrefsLink+'&jailint=' + (parseInt(jailint)+1) + '\'">'+lang.jhl[4]+'</button> <button type="button" class="button" onClick="location.href = \''+PrefsLink+'&jailint=' + (parseInt(jailint)-1) + '\'">'+lang.jhl[5]+'</button>&nbsp;-&nbsp;'+savestring+'</td></tr>';
		} else {
			string += '<tr class="tr" style="height: 25px;" align="center"><td colspan="6" class="td" style="border-bottom-width:2px;"><button type="button" class="button" onClick="location.href = \''+PrefsLink+'&jailint=' + (parseInt(jailint)+1) + '\'">'+lang.jhl[4]+'</button> &nbsp;-&nbsp;'+savestring+'</td></tr>';
		}
		string += '<tr style="height: 25px;" class="tr"><td class="td">&nbsp;</td><td class="td" colspan="5"><b>'+lang.jhl[7]+'</b></td></tr>';
		for(i=-1;++i<nbint;){
			if(nobust[i] == null){ nobust[i] = ""; }
			string += '<tr style="height: 25px;" class="tr"><td>&nbsp;</td><td colspan="5"><img height="20" onmouseover="style.cursor=\'pointer\'" onClick="javascript:getElementById(\'nobust'+i+'\').value=\'\';" src="'+GM_getResourceURL("trash")+'" alt="Delete" /><input id="nobust' + i + '" value="' + nobust[i].replace('%20', ' ').replace('%26', '&') + '" type="text" name="#" class="inputbig" /></td>';
		}
		if(nbint > "1") {
			string += '<tr class="tr" style="height: 25px;" align="center"><td colspan="6" class="td" style="border-bottom-width:2px;"><button type="button" class="button" onClick="location.href = \''+PrefsLink+'&nbint=' + (parseInt(nbint)+1) + '\'">'+lang.jhl[4]+'</button> <button type="button" class="button" onClick="location.href = \''+PrefsLink+'&nbint=' + (parseInt(nbint)-1) + '\'">'+lang.jhl[5]+'</button>&nbsp;-&nbsp;'+savestring+'</td></tr>';
		} else {
			string += '<tr class="tr" style="height: 25px;" align="center"><td colspan="6" class="td" style="border-bottom-width:2px;"><button type="button" class="button" onClick="location.href = \''+PrefsLink+'&nbint=' + (parseInt(nbint)+1) + '\'">'+lang.jhl[4]+'</button> &nbsp;-&nbsp;'+savestring+'</td></tr>';
		}
		string += '<tr style="height: 25px;" class="tr"><td class="td">&nbsp;</td><td class="td" colspan="2"><center><b>'+lang.jhl[8]+'</b></center><td class="td" colspan="2"><center><b>'+lang.jhl[9]+'</b></center></td><td class="td">&nbsp;</td></tr>';
		string += '<tr style="height: 25px;" class="tr"><td colspan="2" align="right">'+lang.jhl[10]+': <input id="defpri" value="' + defpri + '" type="text" name="defpri" class="inputmiddle" /></td><td colspan="2" align="right">'+lang.jhl[14]+': &nbsp;</td><td colspan="2"><input id="FL_prior" value="' + FL_prior + '" type="text" onBlur="if(this.value > 9 || this.value < 1) this.value = 3;" name="#" class="inputsmall" /></td></tr>';
		string += '<tr style="height: 25px;" class="tr"><td colspan="2" align="right">'+lang.jhl[11]+': <input id="defcol" value="' + defcol + '" type="text" name="defcol" class="color {pickerPosition:\'top\',pickerFaceColor:\'transparent\',pickerFace:3,pickerBorder:0,pickerInsetColor:\'black\'}" style="-moz-border-radius:5px; border-radius:5px; padding-left:3px; background:none repeat scroll 0 0 #CCC; border:1px solid #000; font-family:tahoma;font-size:10px;width:70px;" /></td><td width="10"><img src="'+GM_getResourceURL("colorpicker")+'" border="0" onmouseover="this.style.cursor=\'pointer\';" onmouseout="this.style.cursor=\'default\';" onClick="document.getElementById(\'defcol\').color.showPicker()" alt="Pick color" /></td><td colspan="1" align="right" width="100">'+lang.jhl[15]+': &nbsp;</td><td colspan="2"><input id="Fam_prior" value="' + Fam_prior + '" type="text" onBlur="if(this.value > 9 || this.value < 1) this.value = 9;" name="#" class="inputsmall" /></td></tr>';
		string += '<tr style="height: 25px;" class="tr"><td colspan="4" align="right">'+lang.jhl[12]+': &nbsp;</td><td colspan="2"><input id="maxHL" value="' + maxHL + '" type="text" onBlur="if(this.value > 5) this.value = 5;" name="#" class="inputsmall" /></td></tr>';
		string += '<tr style="height: 25px;" class="tr"><td colspan="4" align="right">'+lang.jhl[13]+': &nbsp;</td><td colspan="2"><input id="buyout" value="' + buyout + '" type="text" onBlur="var h = \''+hotkeys+'\'; if(h.indexOf(this.value) != -1) this.value = \'\';" name="#" class="inputsmall" /></td></tr>';
		string += '<tr class="tr" height="25" align="center"><td colspan="6" class="td">'+savestring+'</td></tr>';
		string += '<tr style="height: 20px;"><td class="tdcredits" colspan="6" class="bigtd"><div id="credits">'+lang.jhl[16]+'</div></td></tr>';

		getID('tablejail').innerHTML = string;
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
			$s.MozBorderRadius = '5px';
			if ($N == "INPUT") {
				$s.paddingLeft = '3px';
			}
			if ($N == "BUTTON") {
				$n.setAttribute('onmouseover', 'this.style.cursor = "pointer";');
			}
		}
	});
	$x('//input[@class="inputbig"]').forEach(function ($n) {
		$n.style.verticalAlign = '6px';
	});

	// Check for update
	var updater = $X('//a[@name="updater"]');
	updater.addEventListener('click', function(){ OBUpdate(true); }, true);
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
			url: 'http://gm.omertabeyond.com/prices.xml.php?v='+sets.version.replace('_', ''),
			onload: function(resp){
				var marquee = document.getElementsByTagName('div')[0];
				marquee.innerHTML = '';

				var parser = new DOMParser();
				var dom = parser.parseFromString(resp.responseText, 'application/xml');

				function getPrice(drug, city) {
					return dom.getElementsByTagName(drug)[0].getElementsByTagName(city.replace(' ', ''))[0].textContent;
				}

				var p = [];
				var q = new Array;
				var p_C = [langs.en.cities[6], langs.en.cities[1], langs.en.cities[3], langs.en.cities[5], langs.en.cities[0], langs.en.cities[4], langs.en.cities[7], langs.en.cities[2]];
				var p_id = ['6', '1', '3', '5', 'nul', '4', '7', '2'];

				for (i=0;i<=7;i++){ p[i]=getPrice('Cocaine', p_C[i]); q[i]=p[i]; }

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
				var time = dom.getElementsByTagName('Time')[0].textContent;

				var hoverdiv = cEL('div');
				hoverdiv.id = 'hiddenbox';
				hoverdiv.setAttribute('style', 'display:none; position:absolute; background-color:#000; border:1px solid #FFF; font-size:9px; top:2px; width:520px; text-align:center');
				marquee.appendChild(hoverdiv);

				function hoverlink(city, priceStr) {
					var link = cEL('a');
					link.href = '#';
					link.style.color = '#FFF';
					link.style.fontSize = '10px';
					if (city == 'Palermo' || city == 'Corleone' || city == 'Las Vegas' || city == 'Detroit') {
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
					hoverdiv.innerHTML = 'Morphine: ' + getPrice('Morphine', city) + ' | ' + 'Heroin: ' + getPrice('Heroin', city) + ' | ' + 'Opium: ' + getPrice('Opium', city) + ' | ' + 'Whiskey: ' + getPrice('Whiskey', city) + ' | ' + 'Amaretto: ' + getPrice('Amaretto', city) + ' | ' + 'Rum: ' + getPrice('Rum', city);
				}

				function flytolink(city, priceStr, priceToFly, cityId) {
					var link, owncity;
					link = cEL('a');
					link.href = '#';
					link.id = city;
					link.style.color = '#FFF';
					link.style.fontSize = '10px';
					link.addEventListener('click', function () {
						if (owncity == city) {
							alert(lang.marquee[3]);
						} else if (confirm(lang.marquee[0] + city + '?')) {
							top.frames[2].location = 'http://' + dlh + '/BeO/webroot/index.php?module=Travel&action=TravelNow&City=' + ((cityId == 'nul') ? 0 : cityId);
						}
					}, true);

					if (prefs[17]) {
						if (city == 'Palermo' || city == 'Corleone' || city == 'Las Vegas' || city == 'Detroit') {
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
				var span = cEL('span');
				var priceandtime = cEL('span');
				span.appendChild(priceandtime);

				i=0;
				p.forEach(function($n){
					span.style.color = '#FFF';
					span.appendChild(flytolink(p_C[i], p_C[i]+':'+q[i], 500, p_id[i]));
					var separator = cEL('span');
					separator.innerHTML = ' | ';
					span.appendChild(separator);
					i++;
				});

				var link = cEL('a');
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
					city = langs.en.cities[city-4];
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
	//beyond menu descriptions
	var descr = [lang.prefsname].concat(lang.menuitem);
	//beyond menu links
	var qlinks = [PrefsLink +'&ob='+OB, PollLink, ContactLink, SCRIPT_LINK + '/?p=faq', PricesLink, sets.statslink];
	//beyond menu titles
	var qtitle = lang.menutitle;

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
			$X('html/body').style.backgroundColor='#3F505F';
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
			$X('html/body').style.backgroundColor='#3F505F';
			setTimeout(function() { location.href='menu.php'; }, 1500);//refresh to see our results
		}, true);

	}
	if (!dls) {
		//add action buttons (change menu, change hotkeys, reset menu)
		$X('//td[@class="container"]').innerHTML = $X('//td[@class="container"]').innerHTML + '<span class="quicklook">Menu: <img onMouseover="style.cursor=\'pointer\'" title="'+lang.cusmenu[3]+'" onClick="location.href=\'menu.php?menu\'" src="'+GM_getResourceURL('buttonMenu')+'" style="vertical-align:-2px" /> <img onMouseover="style.cursor=\'pointer\'" title="'+lang.cusmenu[4]+'" onClick="location.href=\'menu.php?keys\'" src="'+GM_getResourceURL('buttonKey')+'" style="vertical-align:-2px" /> <img id="reset_button" onMouseover="style.cursor=\'pointer\'" title="'+lang.cusmenu[5]+'" src="'+GM_getResourceURL('buttonReset')+'" style="vertical-align:-2px" /></span>';
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
		if (menuCity.search(langs.en.cities[i])!=-1) {
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
	setValue('missingHealth',health);
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
		if(city == langs.en.cities[i]){
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
		var text = $X('//font').textContent;
		text = text.split(' ');
		text = text[(text.length - 1)];
			unsafeWindow.console.log(text)
		var citys = ['Detroit', 'Chicago', 'Palermo', 'New', 'Las', 'Philadelphia', 'Baltimore', 'Corleone'];
		for (i = 0; i < citys.length; i++) {
			if (citys[i] == text) {
				city = (i + 4);
			}
		}
		if (city) {
			unsafeWindow.console.log(city)
			setPow('bninfo', 2, city); //if traveled, save new city
		}
	}
}

//---------------- My Account / Statuspage ----------------
if (dls == '?module=Launchpad') {
	var carTracker, crimeTracker, crimemoney, pad, x, famXP, x2, x3, planeXP, handgunXP, tommygunXP, bguardsXP, jailBustXP, bustTracker, carnicks, cartxt, capo, interest, banktleft;
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

			$X('//table[@class="thinline"][3]/tbody/tr[4]/td[1]').innerHTML = '<b>'+ $X('//table[@class="thinline"][3]/tbody/tr[4]/td[1]').innerHTML +'</b>';
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
				isCapo = $X(x+'5]/td[2]').textContent.split(' ')[1];
				if (prefs[12] && /Capo/.test(isCapo)) {//if remove Capo Money is on
					capo = $X(x+'5]/td[2]').textContent.split(' ')[0];
					$X(x+'5]/td[2]').innerHTML = '<a href="/user.php?nick=' + capo + '">'+ capo +'</a>';
				}
			}

			//linkify player nick
			$X(x+'12]/td[2]').innerHTML = '<a href="/user.php?nick=' + getTXT(x+'12]/td[2]').split('\t')[1] + '">'+ getTXT(x+'12]/td[2]').split('\t')[1] +'</a>';

			if (/\bTranslation\b/.test($X(x+'6]/td[2]').textContent)) {//Translation link
				$I(x+'6]/td[2]', '<a href="http://dev.barafranca.com/translate/" target="_blank">'+ $X(x+'6]/td[2]').textContent +'</a>');
			}

			if ($X(famXP) && lang.status[1].match($X(famXP).textContent)) {//Family status
				$I(famXP, '<a href="/family_recruitment.php"><b>'+ $X(famXP).textContent +'</b></a>');
			}

			var inbank = parseInt($X('//table[@class="thinline"][3]/tbody/tr[4]/td[2]/a').innerHTML.replace(/,/g, '').replace(/\s/g, '').replace('$', ''), 10);
			if (inbank > 0 && interest > 0) {
				var tr = cEL('tr');
				var tdl = cEL('td');
				var tdr = cEL('td');
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

				tdl.innerHTML = '<b>'+lang.status[7]+'</b>';
				tdr.innerHTML = '<a href="/bank.php">$ '+commafy(interest)+' ('+when+')</a>';
				tr.appendChild(tdl);
				tr.appendChild(tdr);
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
				var crimetdl = cEL('td');
				var crimetdr = crimetdl.cloneNode(1);
				var average = Math.round(parseInt(crimemoney,10)/parseInt(crimeTracker,10));
				var average2 = isNaN(average) ? 0 : average;

				crimetdl.innerHTML = '<b>'+lang.status[3]+'</b>';
				crimetdr.innerHTML = '$ '+commafy(crimemoney)+' ($'+commafy(average2)+'/'+lang.status[4]+')';
				crimetr.appendChild(crimetdl);
				crimetr.appendChild(crimetdr);
				$x('//table[@class="thinline"]')[4].appendChild(crimetr);

				var crimetr = cEL('tr');
				var crimetdl = cEL('td');
				var crimetdr = crimetdl.cloneNode(1);
				var average3 = Math.round(parseInt(carmoney,10)/parseInt(carTracker,10));
				var average4 = isNaN(average3) ? 0 : average3;
				if (isNaN(average)) average = 0;
				crimetdl.innerHTML = '<b>'+lang.status[5]+'</b>';
				crimetdr.innerHTML = '$ '+commafy(carmoney)+' ($'+commafy(average4)+'/'+lang.status[6]+')';
				crimetr.appendChild(crimetdl);
				crimetr.appendChild(crimetdr);
				$x('//table[@class="thinline"]')[4].appendChild(crimetr);
			}

			$x('//a[contains(@href,"shoptabs=9")]')[1].setAttribute('href', '/BeO/webroot/index.php?module=Bloodbank&action=');//timer
			$x('//a[contains(@href,"shoptabs=9")]')[0].setAttribute('href', '/BeO/webroot/index.php?module=Bloodbank&action=');//next bloodbuy
			$X('//a[contains(@href,"shoptabs=8")]').setAttribute('href', '/BeO/webroot/index.php?module=Bloodbank&action=');//healthbar
			$X(bguardsXP).innerHTML = '<a href="/BeO/webroot/index.php?module=Bodyguards&action=">'+$X(bguardsXP).innerHTML+'</a>';
			if ($X(planeXP) && lang.status[0].match($X(planeXP).textContent)) {
				$I(planeXP, '<a href="/BeO/webroot/index.php?module=Shop&action=display_section&id=7"><b>'+ $X(planeXP).textContent +'</b></a>');
			}
			if ($X(handgunXP) && lang.status[0].match($X(handgunXP).textContent)) {
				$I(handgunXP, '<a href="javascript:if(confirm(\''+lang.myacc[0]+'\')){window.location = \'http://'+dlh+'/BeO/webroot/index.php?module=Shop&action=buy_item&item=3\';}"><b>'+ $X(handgunXP).textContent +'</b></a>');
			}
			if ($X(tommygunXP) && lang.status[0].match($X(tommygunXP).textContent)) {
				$I(tommygunXP, '<a href="javascript:if(confirm(\''+lang.myacc[1]+'\')){window.location = \'http://'+dlh+'/BeO/webroot/index.php?module=Shop&action=buy_item&item=4\';}"><b>'+ $X(tommygunXP).textContent +'</b></a>');
			}
		}
		if (tab == '/profile.php' && prefs[14]) {//remove kill passwords
			for (i=5;i>1;i--) {
				$Del('//div[@id="smsdivcontainer"]//center/table/tbody/tr[5]');
			}
		}
		nickReader();//apply nickReader again
	}

	//grab ajax event
	getID('smsdivcontainer').addEventListener('DOMNodeInserted', function (event) {
		var trigger = '<b>Status</b>';
		if (event.target.innerHTML.search(trigger) != -1) {
			runCode(selectedTab());//we found html in the Node => run the code
		}
	}, false );

	//Try and grab info on page load
	var attempt = setInterval(function() {//using setInterval to enable use of setValue which fails in eventListener above
		if($X('//a[contains(@href, "/BeO/webroot/index.php?module=Bloodbank&action=")]')){//if page contains health bar
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
if (((dls == '?module=Shop') || dls.indexOf('?module=Bodyguards') != -1 && dlp.indexOf('&action=obay_details') == -1) && prefs[36]) {
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
			var bgname = $X(path+'['+y+']/tbody/tr/td/h2').textContent;
			var bgarr = bgname.match(/(\w+) - ID (\d+)  - Level (\d+) /);
			bgsname[y] = bgarr[1];
			bgsid[y] = bgarr[2];
			bgslvl[y] = parseInt(bgarr[3], 10);
			bgsatt[y] = parseInt($X('//*[@id="jsprogbar_div_attack_'+bgarr[1]+'"]').textContent, 10);
			bgsdef[y] = parseInt($X('//*[@id="jsprogbar_div_defense_'+bgarr[1]+'"]').textContent, 10);
			if ($X('//*[@id="jsprogbar_div_special_'+bgarr[1]+'"]') != null) {
				bgsspec[y] = parseInt($X('//*[@id="jsprogbar_div_special_'+bgarr[1]+'"]').textContent, 10);
			} else { //special doesn't exist for this bg
				bgsspec[y] = 0;
			}
			//calcing total costs of the bg
			//http://gamewiki.barafranca.com/index.php?title=Bodyguards_NL#De_bodyguards
			if (bgsname[y] == 'Ike') {
				attplvl = 4;
				defplvl = 7;
				statt = 10;
				stdef = 25;
				startc = 50000;
			}
			if (bgsname[y] == 'Joe') {
				attplvl = 3;
				defplvl = 6;
				statt = 0;
				stdef = 25;
				startc = 50000;
			}
			if (bgsname[y] == 'Lee') {
				attplvl = 1;
				defplvl = 10;
				statt = 0;
				stdef = 50;
				startc = 100000;
			}
			if (bgsname[y] == 'Lex') {
				attplvl = 2;
				defplvl = 5;
				statt = 10;
				stdef = 0;
				startc = 1000000;
			}
			if (bgsname[y] == 'Ray') {
				attplvl = 1;
				defplvl = 5;
				statt = 0;
				stdef = 10;
				startc = 10000;
			}
			if (bgsname[y] == 'Vic') {
				attplvl = 8;
				defplvl = 3;
				statt = 20;
				stdef = 0;
				startc = 250000;
			}
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
			//<table cellpadding="0" cellspacing="0"><tr><td>
			trdump += '<tr style="background-color:'+getValue('tableBg', '#F0F0F0')+'">';
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
		trdump += '<tr style="background-color:'+getValue('tableBg', '#F0F0F0')+'">';
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
		div.setAttribute('style', 'background-color:'+getValue('tableBg', '#F0F0F0')+', border:1px solid black; color:#FFF');
		div.innerHTML = '<table class="thinline" style="width:620px"><tr><td class="tableheader">'+lang.bgov[1]+'</td><td class="tableheader">'+lang.bgov[2]+'</td><td class="tableheader">'+lang.bgov[3]+'</td><td class="tableheader">'+lang.bgov[4]+'</td><td class="tableheader">'+lang.bgov[5]+'</td><td class="tableheader">'+lang.bgov[6]+'</td><td class="tableheader">'+lang.bgov[7]+'</td></tr><tr><td colspan="7" height="1" bgcolor="black"></td></tr>'+trdump+'<table>';
		c.appendChild(div);
		c.appendChild(br);
		if (dls.indexOf('?module=Shop') != -1 || (dls.indexOf('?module=Bodyguards&action=') != -1 && db.innerHTML.search('smsdivcontainer')>-1) ) {
			$X('//div[@id="smsdivcontainer"]').insertBefore(c, $X('//div[@class="otable widetable"]'));
		}
		if (dls.indexOf('?module=Bodyguards') != -1 && dls.indexOf('?module=Bodyguards&action=') == -1) {
			db.insertBefore(c, $X('//div[@class="otable widetable"]'));
		}
	}
	//eventListeners
	if (dls.indexOf('?module=Shop') != -1 || (dls.indexOf('?module=Bodyguards&action=') != -1 && db.innerHTML.search('smsdivcontainer')>-1) ) { //via Shop
		getID('smsdivcontainer').addEventListener('DOMNodeInserted', function (event) { //wait for DOM
			if (event.target.innerHTML.search('/static/images/game/bodyguards/lee') != -1) { //wait for BG overview node
				getID('smsdivcontainer').addEventListener('load', function() { //add onLoad eventlistener
					if(db.innerHTML.search('onceonly')==-1) { //onLoad bubbles more then once
						bgspage();
						grabLex();

						var foo = cEL('div'); //create hardcoded fix so we run code only once
						foo.innerHTML = 'onceonly';
						foo.style.visibility = 'hidden';
						getID('smsdivcontainer').appendChild(foo);
					}
				}, true);
			}
		}, false);
	}
	if (dls.indexOf('?module=Bodyguards') != -1 && dls.indexOf('?module=Bodyguards&action=') == -1) { //via stand-alone
		bgspage();
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
	var x, path, lbf, bf, BFTextXp;
	x = '/html/body//center';
	path = '/table/tbody/tr[3]/td';
	BFTextXp = x + '[2]/table/tbody/tr/td';
	if (prefs[25] && db.innerHTML.indexOf(lang.bullettracker[6]) == -1 && getELNAME('produce')[0] == null) {
		var maxBul = (sets.version == '_dm' ? 3000 : 1000);
		window.addEventListener('load', function () {
			$x('//input')[1].focus();
		}, true);
		lbf = $I(x + path).split('<br>')[3].match(/\d+/g)[0];
		$X('//fieldset//input[@type="text"][@name="amount_sys"]').value = (lbf >= maxBul) ? maxBul : lbf;
		if (getELNAME('become')[0] == null) { // no owner fix
			bf = $I(x + '[2]' + path).split('<br>')[4].replace(',', '').match(/\d+/g)[0];
			$X('//fieldset//input[@type="text"][@name="amount_bull"]').value = bf;
		}
	}
}
if (prefs[7] && dlp == '/bullets2.php') { //if return back after wrong buy is on
	if (db.innerHTML.search(lang.failedBullets[0]) != -1 || db.innerHTML.search(lang.failedBullets[1]) != -1 || db.innerHTML.search(lang.failedBullets[2]) != -1 || db.innerHTML.search(lang.failedBullets[3]) != -1 || db.innerHTML.search(lang.failedBullets[4]) != -1 || db.innerHTML.search(lang.failedBullets[5]) != -1) {
		db.innerHTML += '<br /><b>Auto Refresh in 1 sec</b>';
		setTimeout(function () {
			history.back();
		}, 0);
	}
}

//---------------- OB/Edo News ----------------
//if (dlp == '/~fingon/beyond.php') { //apply ingame theme to fingon thingy
//	$x('//tr').forEach(function ($n) {
//		$n.style.backgroundColor = getValue('tableBg', '#F0F0F0');
//	});
//	$x('//td[@background="images/topic.gif"]').forEach(function ($n) {
//		$n.setAttribute('background', 'http://www.barafranca.com/static/images/game/generic/headershine.png');
//		$n.setAttribute('style', 'background-color:' + getValue('titleBg', '#F0F0F0') + '; height:23px; color:white;');
//	});
//	db.style.backgroundColor = getValue('bodyBg', '#B0B0B0');
//	db.style.color = getValue('fontClr', '#000');
//
//	var goToFin = $XLast('//b');
//	goToFin.style.textAlign = 'center';
//	goToFin.innerHTML = '<a style="color:#EEE !important; font-weight:bold;" href="http://news.omertabeyond.com' + dls + '" target="_blank">Click here to go to the actual news post</a>';
//}

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
			var url = (sets.version == '_com') ? OBnUrl : 'http://www.edo-nieuws.nl/xje/xje_nieuws.php?id=';//set url prepend
			for(var o=0,f=0;(o+f)<=4;1){//loop dates
				var nextmonth=0;
				if((oDay[o]<fDay[f] && oMonth[o]<=fMonth[f]) || (oDay[o]>fDay[f] && oMonth[o]<fMonth[f]) || (oMonth[o]>fMonth[f] && fMonth!=1)){//check dates
					if(sets.version == '_com'){//ob
						news.push([url+fUrl[f],fArticles[f].replace(/ /,' <br>')]);
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
				item.setAttribute('style', 'font-size:11px !important;');//manuall override to make sure it keeps font-size
				if(item.href.search('barafranca')==-1) {
					item.parentNode.parentNode.setAttribute('style', 'background:url(\''+GM_getResourceURL('favoriteIco')+'\') no-repeat 90% 20%;');
					item.setAttribute('target', 'blank');
				}
				if(news[i][1].search(lang.login[2])!=-1 && sets.version=='_nl'){
					item.setAttribute('target', 'main');
				}
				item.innerHTML = news[i][1];
				oNews[i].style.height = item.offsetHeight;
			}
			//We have better news
			var times = $X('//a[contains(@href,"mag.php")]');
			times.href = sets.version=='_com' ? OBnUrl : sets.version=='_dm' ? OBnUrl : EdoUrl;
			times.style.fontSize = '11px';
			times.innerHTML = 'OBNews';
		}
		//prep arrays
		var fUrl=[];
		var fArticles=[];
		var fDay=[];
		var fMonth=[];

		if(sets.version=='_com'){//grab news from obnews rss feed
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://news.omertabeyond.com/rss.php',
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
		}
		if(sets.version=='_nl'){//get news from Edo mainpage
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.edo-nieuws.nl/news.php',
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
		if(prefs[38]) { //remove Facebook API from news frame
			$del('//iframe');
		}
	}
}

//---------------- Jail Highlighter and Jail autoform ----------------
if(prefs[3] && dlp == '/jail.php' && $X('/html/body//form/center')){
	//Assemble prefs
	var words = replaceLast(getValue('bust', ''), ',', '', 1).split(',');
	var bgColors = replaceLast(getValue('colours', ''), ',', '', 1).split(',');
	var prioritys = replaceLast(getValue('priority', ''), ',', '', 1).split(',');
	var nobust = replaceLast(getValue('nobust', ''), ',', '', 1).split(',');
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
			i = rand(0, (inJail.length-lowlifes)); //new
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
		window.addEventListener('keypress', function(e){
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
	if ($X('//img[@id="imgcode"]')) { // ADD autofocus if captcha is missing
		$X('//input[@name="ver"]').focus();
	} else {
		if ($x('//input')[2] != null) {
			$x('//input')[2].focus();
		}
	}

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
	} else if ($X('html/body').textContent.search('Closed') == -1 && prefs[10]) {
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
//---------------- Lackey Messages ----------------
if (dls.indexOf('action=showMsg') != -1) {
	var crimeTracker = getValue('crimes', 0);
	var crimemoney = getValue('crimemoney', 0);
	var carTracker = getValue('cars', 0);
	var carmoney = getValue('carmoney', 0);
	var msgTyp = $X('/html/body/center/table/tbody/tr/td[2]/table/tbody/tr/td/b').textContent;
	var msgText = '/html/body/center/table/tbody/tr/td[2]/table/tbody/tr[5]/td';
	arr = $X(msgText).innerHTML.split(' ');	
	var Lcrime = new RegExp(lang.crimetracker[3]);
	if (Lcrime.test(msgTyp)) {
		var no = (arr[29]=='sent')?arr[38]:arr[29];
		crimeTracker += parseInt(no);
		setValue('crimes', crimeTracker);
		var am = (arr[64]=='of')?arr[83]:arr[64];
		var crmoney = am.replace(/,/g, '').replace('$', '');
		crimemoney += parseInt(crmoney);
		setValue('crimemoney', crimemoney);
	}
	var Lcar = new RegExp(lang.crimetracker[2]);
	if (Lcar.test(msgTyp)) {
		var no = (arr[29]=='sent')?arr[38]:arr[29];
		carTracker += parseInt(no);
		setValue('cars', carTracker);
	}
}
//---------------- Cars Page ----------------
if (urlsearch == '/BeO/webroot/index.php?module=Cars') {
	if (db.innerHTML.search(/table/i) > -1 && prefs[8]) { //if Car Nick AF is enabled
		for (p = [], i = 0; i <= 3; i++) { //Get percentages
			p.push($i('//form//td[3]', i).replace(/\D|/g, ''));
		}
		$x('//input')[(p.indexOf(p.max() + '') + 1)].checked = true; //select radio by %
	} else if ($X('html/body').textContent.search('Closed') == -1 && prefs[10]) {
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
	var worth = db.innerHTML.match(/\[\$(.*)\]/);
	var carTracker = getValue('cars', 0);
	var carmoney = getValue('carmoney', 0);
	if (worth != null) {
		var worth2 = parseInt(worth[1].replace(',', '').trim(), 10);
		if (worth2 >= 5000) {
			$X('//input[@type="submit"]').focus();
		} else {
			$x('//input[@type="submit"]')[1].focus();
		}
		++carTracker;
		setValue('cars', carTracker);
		carmoney += parseInt(worth2);
		setValue('carmoney', carmoney);
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
		setValue('missingHealth', '100' - getTXT(healthXpBar).replace('%', ''));
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
if(urlsearch == ('/user.php' + dls) && dls != '?editmode=true'){
	if(db.innerHTML.search('table') != -1){
		var tbody = $X('//tbody');
		tbody.lastChild.previousSibling.previousSibling.previousSibling.setAttribute('name', 'forumPosts');
		tbody.lastChild.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.setAttribute('name', 'FL');

		var status = $X('//span[@id="status"]').innerHTML;
		var inFam = $X('//span[@id="family"]').innerHTML;
		var alive = (status.indexOf(lang.profile[3])==-1);//alive/dead

		//DEAD or AKILLED ?
		if(!alive){
			if($X('//img').parentNode.nodeName != 'A'){
				var akill = '<span style="color:red; font-weight:bold;"> (Akill) </span>';
				status += akill;
			}
			GM_xmlhttpRequest({
				method: 'GET',
				url: SCRIPT_LINK+'?p=stats&w=deaths&v='+sets.version.replace('_','')+'&ing='+$X('//span[@id=\'username\']').innerHTML,
				onload: function(xhr) {
					var response = JSON.parse(xhr.responseText);
					if (response["DiedAt"] === null) {
						$X('//span[@id="status"]').innerHTML = status + ' | Death date is not known';
					} else {
						$X('//span[@id="status"]').innerHTML = status + ' | Died at '+response["Date"]+' OT ('+response["Agod"]+'d '+response["Agoh"]+'h '+response["Agom"]+'m ago)';
					}
				}
			});
		}

		if (status == lang.lastontime[0]) { // show last online time on profile
			GM_xmlhttpRequest({
				method: 'GET',
				url: SCRIPT_LINK+'?p=stats&w=laston&v='+sets.version.replace('_','')+'&ing='+$X('//span[@id=\'username\']').innerHTML,
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
			if ($X('//tr[@name="forumPosts"]/td[1]').textContent.indexOf('Recent') != -1) {
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

		if (x ==- 1) { tr--; }
		if (y == -1) { tr--; }
		if (z == -1) { tr--; }
		xpath = '/html/body//center/table/tbody/tr['+tr+']/td[2]';
		var wlth = $I(xpath);

		var kind = ['', ' ($0 - $50.000)', ' ($50.001 - $100.000)', ' ($100.001 - $500.000)', ' ($1.000.001 - $5.000.000)', ' ($5.000.001 - $15.000.000)', ' ( > $15.000.001)', ' ($500.001 - $1.000.000)'], i=1;
		lang.wealth.forEach(function($n){ if(wlth.search($n) != -1){ $I(xpath,$I(xpath) + kind[i]); i=0; } if(i!=0){ i++; }});

		//Raceform
		var xpath2 = '/html/body//center/table/tbody/tr['+(tr+1)+']/td[2]';
		var rf = $X(xpath2).textContent;
		var q = lang.driver;
		for (i=0;i<=10;i++) {
			if (rf.match(q[i]) && (rf.length == q[i].length)) {
				$I(xpath2,(i+1) + " - " + $I(xpath2));
			}
		}

		var nick = $X('/html/body//center/table/tbody/tr[3]/td[2]/a').textContent;
		var self = ($X('/html/body//center/table/tbody/tr[3]/td[2]/a').textContent.toUpperCase() == getValue('nick').toUpperCase());//self/other
		var other = $X('/html/body//center/table/tbody/tr/td/i').textContent;
		var checkHistory = $X('//td[@class="tableheader"]/i').textContent
		$x('//td[@class="tableheader"]')[0].innerHTML = $x('//*[@class="tableheader"]')[0].innerHTML + ' | <a href="http://stats.omertabeyond.com/history.php?v='+sets.version.replace('_','')+'&name='+checkHistory+'">View History</a>';

		if (alive) { //Add interesting stuff here
			if (!self) { //additions useless for self
				//Send HP's
				$X('//span[@id="hp"]').innerHTML = '<a href="/honorpoints.php?who='+nick+'" class="red">'+$X('//span[@id="hp"]').innerHTML+'</a>';

				//Invite links
				if (prefs[15]) {
					tr = cEL('tr');
					tdl = cEL('td');
					tdr = tdl.cloneNode(1);
					tdl.setAttribute('class', 'subtableheader');
					tdl.innerHTML = 'Actions:';
					tdr.setAttribute('class', 'profilerow');

					links = '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tbody><tr align="center" valign="top">';
					links += '<td width="20%">';
					links += '<a class="red" href="BeO/webroot/index.php?module=Heist&action=&who='+nick+'">Heist</a><br />';//heist link
					links += '</td>';
					links += '<td width="20%">';
					links += '<a class="red" href="BeO/webroot/index.php?module=Spots&action=&driver='+nick+'">Raid</a><br />';//raid link
					links += '</td>';
					links += '<td width="20%">';
					links += '<a class="red" href="javascript:if(confirm(\'Are you sure you want to make '+nick+' your Mentor?\')) document.location.href =\'/honorpoints.php?view=mentorsetup&mentor='+nick+'\';">Set Mentor</a><br />';//mentor link
					links += '</td>';
					links += '<td width="20%">';
					links += '<a class="red" href="kill.php?search='+nick+'" onClick="">Hire Detectives</a><br />';//dets link
					links += '</td>';
					if(parseInt(getPow('bninfo',4,-1),10)>2 && inFam == 'None'){//check for top3 position and if person is not in family
						links += '<td width="20%">';
						links += '<a class="red" href="/BeO/webroot/index.php?module=Family&who='+nick+'">Invite to Family</a><br />';//family link
						links += '</td>';
					}
					links += '</tr></tbody></table>';

					tdr.innerHTML = links;
					tr.appendChild(tdl);
					tr.appendChild(tdr);
					tbody.insertBefore(tr,tbody.lastChild.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling);
				}

				//Add to
				if(prefs[3]){
					names = getValue('bust','')
					add = 1;
					if(names){
						names = names.split(',')
						length = getValue('jailint',0)
						if(length == 0){ setValue('jailint',6); length=6; } //check for missing jailint
						who = nick.toUpperCase();
						for(i=0;i<length;i++) if(names[i]==who) add = 0;
					}
					row = $X('/html/body//center/table/tbody/tr[3]/td[2]') //name row
					str = row.innerHTML + ' / ' + '<a href="' + dlp + '?nick='+nick+'&jh='+add+'"><span class="red">';
					str += ((add == 1) ? 'Add to ' : 'Remove from ');
					str += 'busting list</span></a>';
					row.innerHTML = str;
				}
			} else {//Linkify self hp's
				HPxp = $X('/html/body//center/table/tbody/tr[5]/td[2]');
				HPxp.innerHTML = '<a href="/honorpoints.php"><span style="color:red"><i>'+HPxp.innerHTML+'</i></span></a>';
			}
		}
	}
}

//---------------- Add user to jail highlighter by referral ----------------
if (dlp == '/user.php' && dls.indexOf('&jh=') != -1) {
	add = GetPost('jh');
	if (add == 1) {
		length = getValue('jailint', 0);

		names = getValue('bust', '');
		cols = getValue('colours');
		pris = getValue('priority');
		who = $X('/html/body//center/table/tbody/tr[3]/td[2]/a').textContent;
		nick = who.toUpperCase();
		if (length == 0) { //check for missing jailint
			setValue('jailint', 6);
			length = 6;
		}
		if (!names) { //check for missing data
			names = ',,,,,,';
			cols = ',,,,,,';
			pris = ',,,,,,';
		}
		names = names.split(','); //load stored data
		cols = cols.split(',');
		pris = pris.split(',');
		i = -1;
		while (names[++i] && names[i] != nick); //find first open spot
		if (names[i] != nick) {
			if (i == length) { //extend jailint if neccesary

				setValue('jailint', ++length);
			}
			names[i] = nick; //insert new data into arrays
			cols[i] = getValue('defcol', '33FF66');
			pris[i] = getValue('defpri', 5);
			setValue('bust', names.join(',')); //join and save values
			setValue('colours', cols.join(','));
			setValue('priority', pris.join(','));
			alert(who+' '+lang.jhl[20]);
			if($x('/html/body//center/table/tbody/tr[3]/td[2]/a').length == 3) {
				link = $X('/html/body//center/table/tbody/tr[3]/td[2]/a[3]');
			} else {
				link = $X('/html/body//center/table/tbody/tr[3]/td[2]/a[2]');
			}
			link.href = dlp + '?nick=' + who + '&jh=0';
			link.innerHTML = '<span class="red">'+lang.jhl[21]+'</span>';
		} else {
			alert('Oops! ' + who + ' '+lang.jhl[22]);
		}
	} else if (add == 0) {
		length = getValue('jailint', 0)
		if (length == 0) { //check for missing jailint
			setValue('jailint', 6);
			length = 6;
		}
		names = getValue('bust', '').split(','); //load data
		cols = getValue('colours').split(',');
		pris = getValue('priority').split(',');
		who = $X('/html/body//center/table/tbody/tr[3]/td[2]/a').textContent;
		nick = who.toUpperCase();
		i = -1;
		while (names[++i] && names[i] != nick && i < length); //find user
		names[i] = ''; //remove user and data
		cols[i] = '';
		pris[i] = '';
		setValue('bust', names.join(',')); //join and save values
		setValue('colours', cols.join(','));
		setValue('priority', pris.join(','));
		alert(who + ' '+lang.jhl[23]);
		if($x('/html/body//center/table/tbody/tr[3]/td[2]/a').length == 3) {
			link = $X('/html/body//center/table/tbody/tr[3]/td[2]/a[3]');
		} else {
			link = $X('/html/body//center/table/tbody/tr[3]/td[2]/a[2]');
		}
		link.href = dlp + '?nick=' + who + '&jh=1';
		link.innerHTML = '<span class="red">'+lang.jhl[24]+'</span>';
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
	var money = $x('//table')[2].getElementsByTagName('td')[2].textContent; //check for banked money
	if (!money.split(' ')[1]) { //money in bank
		var h, m, s, seconds, d;
		var rx = $x('//table')[2].getElementsByTagName('td')[6].textContent; //get recieved amt
		var tmp = 1 * rx.replace(/\D/g, '') - 1 * money.replace(/\D/g, ''); //calc interest
		var intLine = $x('//table')[2].getElementsByTagName('td')[4];
		intLine.innerHTML += ' &rarr ($'+commafy(tmp)+')';
		setValue('interest', tmp);

		//interest reminder
		seconds = 0;
		if ($X('//span[@id="counter__days_value"]') != null) { //just deposited some cash, so 1 day and 00:00:00 left
			d = $X('//span[@id="counter__days_value"]').textContent;
			d = parseInt(d, 10);
			seconds = (seconds + (d * 86400));
		} else {
			if ($X('//span[@id="counter__hours_value"]') != null) {
				h = $X('//span[@id="counter__hours_value"]').textContent;
				h = parseInt(h, 10);
				seconds = (seconds + (h * 3600));
			}
			if ($X('//span[@id="counter__minutes_value"]') != null) {
				m = $X('//span[@id="counter__minutes_value"]').textContent;
				m = parseInt(m, 10);
				seconds = (seconds + (m * 60));
			}
			if ($X('//span[@id="counter__seconds_value"]') != null) {
				s = $X('//span[@id="counter__seconds_value"]').textContent;
				s = parseInt(s, 10);
				seconds = (seconds + (s));
			}
		}

		//when do we get interest?
		var timestamp = Math.round(parseInt(new Date().getTime(), 10) / 1000);
		timestamp = parseInt(timestamp, 10);
		setValue('banktleft', (timestamp + seconds));
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

	var tbl = '<table class="thinline" width="100% rules="none" align="center">';
	tbl += '<tr><td class="tableheader" colspan="4">Calculators</td></tr>';
	tbl += '<br />';
	tbl += '<tr><td align="right" width="25%">'+lang.calc[0]+'</td>';
	tbl += '<td align="center" width="25%">';
	tbl += '<input name="amount" type="text" value="" onKeyUp="' + func1 + 'get' + func2 + '*0.9' + func3 + '" />';
	tbl += '</td><td align="right" width="25%">'+lang.calc[1]+'</td><td align="center" id="get" width="25%">$0</td></tr>';
	tbl += '<tr><td align="right" width="25%">'+lang.calc[2]+'</td>';
	tbl += '<td align="center" width="25%">';
	tbl += '<input name="amount" type="text" value="" onKeyUp="' + func1 + 'give' + func2 + '/0.9' + func3 + '" />';
	tbl += '</td><td align="right" width="25%">'+lang.calc[3]+'</td><td align="center" id="give" width="25%">$0</td></tr>';
	tbl += '<br />';
	tbl += '<tr><td align="right" width="25%">'+lang.calc[4]+'</td>';
	tbl += '<td align="center" width="25%">';
	tbl += '<input name="amount" type="text" value="" onKeyUp="' + func1 + 'int' + func2 + func_switch + func3 + '" />';
	tbl += '</td><td align="right" width="25%">'+lang.calc[5]+'</td><td align="center" id="int" width="25%">$0</td></tr>';
	tbl += '<br />';
	tbl += '</table>';

	//DOM-ify
	var dummy = cEL('div');
	dummy.id = 'calc';
	dummy.style.display = 'none';
	dummy.innerHTML = tbl;
	db.appendChild(dummy);
	tbl = getID('calc').firstChild.cloneNode(1);
	$x('//td[@width="33%"]')[2].appendChild(tbl);
	$del('//div[@id="calc"]');

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
			for(i=2;i<rows-2;i++){ //loop rows
				var y = '//html/body//form//center/table/tbody/tr['+(i+2)+']/td[2]/a';//get car
				var car = $X(y).href.match(/\d*$/)[0];
				var carType = '';
				var carRow = $X('/html/body//form//center/table/tbody/tr['+(i+2)+']'); //get the specific row
				var carVal = parseInt($X('/html/body//form//center/table/tbody/tr['+(i+2)+']/td[4]').innerHTML.replace(',', '').replace('$', '')); //get value
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
		}

		//add amount of bullets
		var head = $X('//h2');
		var cars = head.textContent.match(/\d+/g)[2];
		if(cars>0){
			head.textContent = head.textContent+' | '+lang.garage[0]+' '+cars*12;
		}

		//add amount of money
		var head = $X('//h2');
		if(rows>2){
			head.textContent = head.textContent+' | '+lang.garage[18]+' $'+commafy(totVal);
		}

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
		var allShButton = all.cloneNode(0);
		allShButton.value = lang.garage[10];
		allShButton.removeAttribute('onclick');
		allShButton.addEventListener('click', function(){
			$x('//table[@class="thinline"]//tr[@class="thinline"]').forEach(function($n){
				if($n.lastChild.previousSibling.textContent.replace(/[^A-Z]/ig,'').search('INSAFEHOUSE')!=-1){
					$n.getElementsByTagName('input')[1].checked = true;
				}
			});
		}, true);
		all.parentNode.insertBefore(allShButton, all.nextSibling);

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
	nick = getValue('nick', '');
	if (nick !== '') {
		names = $x('//a');
		names.forEach(function ($n) {
			if ($n.textContent == nick || $n.textContent == nick + '+') {
				$n.innerHTML = '<span class="green">' + $n.innerHTML + '</span>';
			}
		});
	}
}
//---------------- Family page ----------------
if (prefs[13] && dlp == '/family.php') {
	//Add to busting list
	addtojhl = cEL('span'); //not an anchor, will mess up grabbing tops etc..
	addtojhl.innerHTML = '<br />'+lang.jhl[24];
	addtojhl.id = 'addlink';
	addtojhl.setAttribute('class','red');
	addtojhl.addEventListener('mouseover', function() { this.style.cursor = 'pointer'; }, true);
	addtojhl.addEventListener('mouseout', function() { this.style.cursor = 'default'; }, true);
	addtojhl.addEventListener('click', function(){
		length = getValue('jailint', 0);
		names = getValue('bust', '');
		cols = getValue('colours');
		pris = getValue('priority');
		who = $X('//td[@class="profilerow"]').textContent;
		who = who.substr(0,who.indexOf(' ')).replace(/[^a-zA-Z]/g,'');
		nick = who.toUpperCase();
		if (length == 0) { //check for missing jailint
			setValue('jailint', 6);
			length = 6;
		}
		if (!names) { //check for missing data
			names = ',,,,,,';
			cols = ',,,,,,';
			pris = ',,,,,,';
		}
		names = names.split(','); //load stored data
		cols = cols.split(',');
		pris = pris.split(',');
		i = -1;
		while (names[++i] && names[i] != nick); //find first open spot
		if (names[i] != nick) {
			if (i == length) { //extend jailint if neccesary
				setValue('jailint', ++length);
			}
			names[i] = nick; //insert new data into arrays
			cols[i] = getValue('defcol', '33FF66');
			pris[i] = getValue('defpri', 5);
			setValue('bust', names.join(',')); //join and save values
			setValue('colours', cols.join(','));
			setValue('priority', pris.join(','));
			alert(who+' '+lang.jhl[20]);
		} else {
			alert('Oops! '+who+' '+lang.jhl[22]);
		}
	}, true);
	$X('//td[@class="profilerow"]').appendChild(addtojhl);

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
	SorC = (nTop == 3) ? 2 : /Consi/.test($X('//table').textContent);//Sotto or Consi

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
	$x('//a[@style="color: blue;"]').forEach(function($n){aOnline.push('#'+$n.textContent+'#');});
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
	memTable = $x('//table[@class="thinline"]')[6].getElementsByTagName('tr');
	memTable[0].innerHTML = '<td class="tableheader" style="text-align:left !important">&nbsp;'+lang.fampage[0]+'</td><td class="tableheader" style="font-weight:normal !important; text-align:right !important;"><span><sup>(<u>capo/top3</u>) - (online > <span class="blue">'+lang.fampage[1]+'</span> | <span class="green">'+lang.fampage[2]+'</span> | <span class="purple">'+lang.fampage[3]+'</span> | <span class="orange">capo</span> | <span class="red">top3</span>)</sup></span>&nbsp;</td>';

	for (i = 0; ++i < memTable.length;) {//cosmetical fix for colspan
		memTable[i].getElementsByTagName('td')[0].setAttribute('colspan', '2');
	}

	//add % online
	membersL = $X('//table//table//tr['+(nTop+8)+']/td');
	membersR = $X('//table//table//tr['+(nTop+8)+']/td[2]');
	mem = parseInt(membersR.textContent, 10);
	membersR.innerHTML = Math.round(aOnline.length / mem * 100) + '% ('+aOnline.length + ' / ' + membersR.textContent + ' )';
	membersL.innerHTML = membersL.textContent.replace(':', '') + ' Online:';

	//add # space left
	HQ = $X('//table//table//tr['+(nTop+10)+']/td[2]');
	HQ.innerHTML = HQ.textContent + ' (' + (parseInt(HQ.textContent, 10)-mem) + ' open )';

	//calc CD/GF promos
	promo = $x('//table[@class="thinline"]//td[@class="tableitem"]//table//tr');

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

	// add HR
	var famid, famIdFromImg;
	var famid = dls.split("=")[1];
	var famIdFromImg = $X('//img[contains(@src, "family_image.php")]').src.match(/\d+/g)[0];

	if(famid === famIdFromImg) {
		var url = 'id='+famid;
	} else {
		var url = 'ing='+famname;
	}
	var famname = $x('//td[@class="profilerow"]')[0].textContent.split(" ")[0].trim().toLowerCase();
	var maintable = $x('//table[@class="thinline"]/tbody')[0];
	var maintable2 = $x('//table/tbody/tr[1]/td')[2];
	var newtr = document.createElement("tr");

	GM_xmlhttpRequest({
		method: 'GET',
		url: SCRIPT_LINK+'?p=stats&w=hr&v='+sets.version.replace('_', '')+'&'+url,
		onload: function(xhr) {
			var response = JSON.parse(xhr.responseText);
			var newtd = document.createElement('td');
			var newtd2 = document.createElement('td');
			var newtr = document.createElement('tr');

			newtd.setAttribute('class', 'subtableheader');
			newtd.setAttribute('style', 'padding-left: 4px; text-align: left;');
			newtd.textContent = 'Ranks:';
			newtd2.setAttribute('class', 'profilerow');

			newtd2.innerHTML = '<table width="100%"> <tr><td>Godfather/First Lady:</td><td class="bold">'+response['gf']+'</td></tr> <tr><td>Capodecina:</td><td class="bold">'+response['cd']+'</td></tr><tr><td>Bruglione:</td><td class="bold">'+response['brug']+'</td></tr><tr><td>Chief:</td><td class="bold">'+response['chief']+'</td></tr><tr><td>Local Chief:</td><td class="bold">'+response['lc']+'</td></tr><tr><td>Assassin:</td><td class="bold">'+response['assa']+'</td></tr><tr><td>Swindler:</td><td class="bold">'+response['swin']+'</td></tr><tr><td colspan="2"><hr /></td></tr><tr><td>Total points:</td><td class="bold">'+response['pts']+'</td></tr></table>';

			newtr.appendChild(newtd);
			newtr.appendChild(newtd2);
			maintable.appendChild(newtr);
		}
	});
	GM_xmlhttpRequest({
		method: 'GET',
		url: SCRIPT_LINK+'?p=stats&w=famdeaths&v='+sets.version.replace('_','')+'&'+url,
		onload: function(xhr) {
			var responsed = JSON.parse(xhr.responseText);
			var newtable = document.createElement('table');
			newtable.setAttribute('class', 'thinline');
			newtable.setAttribute('width', '100%');
			newtable.setAttribute('cellspacing', '0');
			newtable.setAttribute('cellpadding', '2');
			newtable.setAttribute('rules', 'none');

			var dtable = '<tr><td colspan="100%" class=tableheader>Last family deaths</td></tr> <tr><td colspan="100%" bgcolor=black height=1></td></tr><tr><td class="bold" align="left">Name</td><td class="bold" align="center">Rank</td><td class="bold" align="center">Time</td><td class="bold" align="right">Ago</td></tr>';
			for (i = -1; ++i < responsed.length;) {
				dtable += '<tr><td><a href="user.php?name='+responsed[i]['Name']+'">'+responsed[i]['Name']+'</a></td><td align="center"><a href="http://stats.omertabeyond.com/history.php?v='+sets.version.replace('_','')+'&name='+responsed[i]['Name']+'">'+responsed[i]['Rank']+'</td><td align="center">'+responsed[i]['Date']+'</td><td align="right">'+responsed[i]['Agod']+'d '+responsed[i]['Agoh']+'h '+responsed[i]['Agom']+'m</td></tr>';
			}
			newtable.innerHTML = dtable;
			maintable2.appendChild(newtable);
		}
	});

	//Add Family position and Worth
	var famname = $I('//td[@class="profilerow"]').split(' ')[0].slice(5);
	GM_xmlhttpRequest({ //grab data from stats API
		method: 'GET',
		url: 'http://'+dlh+'/BeO/webroot/index.php?module=API&action=statistics',
		onload: function(resp){
			var parser = new DOMParser();
			var xml = parser.parseFromString(resp.responseText, 'application/xml');

			var fams = xml.getElementsByTagName('stats')[0].getElementsByTagName('families')[0].children;
			for(i = -1; ++i<fams.length; ) { //loop all fams
				if(famname == fams[i].getElementsByTagName('name')[0].textContent) {
					var fampos = i+1;
					var famworth = fams[i].getElementsByTagName('worth')[0].textContent;

					var posrow = cEL('tr');
					var tdL = cEL('td');
					tdL.innerHTML = lang.fampage[4] + ':';
					tdL.setAttribute('class', 'subtableheader');
					tdL.setAttribute('style', 'padding-left:4px; text-align:left;');
					posrow.appendChild(tdL);

					var tdR = cEL('td');
					tdR.innerHTML = '#' + fampos + ' - ' + lang.fampage[5] + ': ' + famworth;
					tdR.setAttribute('class', 'profilerow');
					posrow.appendChild(tdR);

					$X('//td[@class="subtableheader"]').parentNode.parentNode.insertBefore(posrow, $X('//td[@class="subtableheader"]').parentNode.nextSibling);
					i = fams.length; //stop the loop!
				}
			}
		}
	});
}

//---------------- Manage Users (top3 only) ----------------
if (dls.indexOf('module=Family')!=-1) {
	//invite from profile
	$X('//input[@name="invite"]').value = GetParam('who');
	$X('//input[@name="invite"]/parent::*/input[last()]').focus();
	// Add promo calculation for CD/GF/FL.
	var promo = $x('//table[@class="color2"][2]//td//table//tr');

	var chiefP = promo[5].getElementsByTagName('td')[1].textContent.replace(/\D/g, '');
	var brugP = promo[6].textContent.replace(/\D/g, '');
	if (brugP != '0' && chiefP !='0') {
		var percentage = ((brugP-chiefP)/chiefP);
	} else {
		var percentage = 0;
	}
	var cdP = (parseInt((brugP*percentage), 10)+parseInt(brugP, 10));
	var gfP = (parseInt((cdP*percentage), 10)+parseInt(cdP, 10));

	promo[6].innerHTML = '<td>Bruglione</td><td>$ '+commafy(brugP)+'</td><td>Capodecina</td><td>$ '+commafy(cdP)+'</td></tr><tr><td>GF / FL</td><td>$ '+commafy(gfP)+'</td><td>&nbsp;</td><td>&nbsp;</td>';

}
if (dlp == '/cpuser.php' && db.innerHTML.search('type="password"') == -1) {

//--Add Capo Money list + calc
	txt = $x('//td[@class="tableitem"]');//CapoMoney txt
	nick = $x('//td[@class="tableheader"]/b');//Capo's
	nick.splice(0, 1);//remove first table (not a capo table)
	table = $X('//table');//select first table
	input = $X('//input[@value="Promote"]');//select first input
	a = '//table[';
	b = ']//tr/td[@class="tableheader"]/b';

	//setup new table
	newTable = cEL('table');
	newTable.setAttribute('cellspacing', '0');
	newTable.setAttribute('cellpadding', '3');
	newTable.setAttribute('bordercolor', 'black');
	newTable.setAttribute('cellspacing', '0');
	newTable.setAttribute('border', '1');
	newTable.setAttribute('bgcolor', '#a8a8a8');
	newTable.setAttribute('width', '600');
	newTable.setAttribute('rules', 'none');
	//clone header from existing table
		headTr = table.getElementsByTagName('tr')[0].cloneNode(1);
		headTr.getElementsByTagName('td')[0].innerHTML = '<b>Capomoney\'s</b>';
		blackTr = table.getElementsByTagName('tr')[1].cloneNode(1);
	newTable.appendChild(headTr);
	newTable.appendChild(blackTr);
	//add CM list | switch to !DOM :D
		newTr = cEL('tr');
			newTd = cEL('td');
				list = '<table width="100%">';
				list += '<tr><td></td><td><b>Capo</b></td><td><b>CapoMoney</b></td><td><b>to GF</b></td></tr>';
				for(i=0;i<nick.length;i++){//loop all capo's
					n = i+2;
					member = $x('count(//table['+n+']//tr[@valign="top"]//td/a)');//members
					name = nick[i].textContent.slice(nick[i].textContent.indexOf(' '),nick[i].textContent.lastIndexOf(' (')).replace(/\s/,'');
					list += '<tr><td><a href="#'+name+'">&darr;</a></td><td><a href="http://'+dlh+'/user.php?nick='+name+'">'+name+'</a>('+member+')';
					list += '</td><td>';
					CM = txt[i].innerHTML.slice(0,txt[i].innerHTML.indexOf('<'));
					CM = CM.replace(/[a-zA-Z]| |\s/g, '');
					list += CM.replace('$', '$ ') + '</td><td>';
					CM = CM.replace(/[^0-9]/g,'');
					list += (10000000 - CM)>0 ? '$ ' + commafy((10000000 - CM)) + '</td><td>' : '<b>X</b></td><td>';//GF
					$I(a+(i+2)+b,'<a name="' + name + '">' + $I(a+(i+2)+b) + '</a>&nbsp;<a href="#">&uarr; <u>'+lang.stats[0]+'</u> &uarr;</a>');
				}
				list += '</table>';
			newTd.innerHTML = list;
		newTr.appendChild(newTd);
	newTable.appendChild(newTr);

	table.parentNode.insertBefore(newTable, input.nextSibling);//add newTable to page
	table.parentNode.insertBefore(cEL('p'), input.nextSibling);//need more space ;)
}
if(dlp == '/cpbank.php' && db.innerHTML.search('type="password"')==-1){
	//Shortcut to send
	bank = $x('//table[@class="thinline"]//td[@class="tableheader"]/b');
	name = bank[3].textContent.slice(bank[3].textContent.indexOf(' '), bank[3].textContent.lastIndexOf(':')).replace(/\s/, '');
	bank[2].innerHTML += '&nbsp;<a href="#'+name+'">&darr;</a>';
	bank[3].innerHTML += '&nbsp;<a name="'+name+'"><a href="#">&uarr;</a>';
	//Calculators
	var func1  = 'javascript: var amt=this.value.replace(/\\D/g,\'\'); if(amt){ get = document.getElementById(\'';//put ID here
	var func2 = '\'); if(get){ tmp = \'\'+Math.round(amt';//put factor here
	var func3  = '); str =\'\'; while(tmp > 0){ if(str!=\'\'){ while(str.length % 4 !=3 ){ str = \'0\' + str;};';
	func3 += 'str = \',\' + str;};dec = (tmp % 1000)+\'\';str = dec + str;tmp = Math.floor(tmp/1000);};';
	func3 += 'get.textContent = \'$\' + str}; };';
	var func_switch  = '* (amt >= 1000000 ? (amt >= 3000000 ? (amt >= 6000000 ? (amt >= 10000000 ? (amt >= 15000000 ? ';
	func_switch += '(amt >= 21000000 ? (amt >= 27000000 ? (amt >= 35000000 ? 1.01 : 1.015) : 1.02) : 1.025 ) : 1.03) : 1.035)';
	func_switch += ' : 1.04) : 1.045) : 1.05 )';

	var tbl = '<table class="thinline" width="600" rules="none" align="center">';
	tbl +='<tr><td class="tableheader" colspan="4">Calculators</td></tr>';
	tbl +='<br />';
	tbl +='<tr><td align="right" width="25%">'+lang.calc[0]+'</td>';
	tbl +='<td align="center" width="25%">';
	tbl += '<input name="amount" type="text" value="" onKeyUp="'+func1+'get'+func2+'*0.85'+func3+'" />';
	tbl += '</td><td align="right" width="25%">'+lang.calc[1]+'</td><td align="center" id="get" width="25%">$0</td></tr>';
	tbl +='<tr><td align="right" width="25%">'+lang.calc[2]+'</td>';
	tbl +='<td align="center" width="25l%">';
	tbl += '<input name="amount" type="text" value="" onKeyUp="'+func1+'give'+func2+'/0.85'+func3+'" />';
	tbl += '</td><td align="right" width="25%">'+lang.calc[3]+'</td><td align="center" id="give" width="25%">$0</td></tr>';
	tbl +='<br />';
	tbl += '</table>';
	$X('//table').innerHTML += '<br />'+tbl;

	if(prefs[5]){
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
			//if ($x('//a')[y].textContent == lang.accept) { // 'Accept | '
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
			dr.focus();
		}
		if (/action=go/.test(db.innerHTML)) {
			$x('//input')[10].focus();
		}
		if (/action=cancel/.text(db.innerHTML)) {
			$X('//a').focus();
		}
		if (/carid/.test(db.innerHTML)) {
			$x('//input')[1].focus();
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
			$x('//input[@type="text"]')[0].value = 500;
			window.addEventListener('load', function () {
				$x('//input[@type="submit"]')[0].focus();
			}, true);
		}
		if (/drivers/.test(db.innerHTML)) { //as LE
			window.addEventListener('load', function () {
				$x('//input[@type="submit"]')[0].focus();
			}, true);
		}
	}
	//Spot raid
	if ((/Spots/).test(dls)) {
		$x('//input[@name="bullets"]').forEach(function ($n) {
			$n.value = 200;
			$n.setAttribute('value', 200);
			$n.addEventListener('change', function () {
				$n.setAttribute('value', $n.value);
			}, true);
		});
		if (/driver/.test(dls)) {
			$x('//input[@name="driver"]').forEach(function ($n) {
				$n.value = GetParam('driver');
			});
		}
	}
}

//---------------- Raidpage ----------------
if ((dls == '?module=Spots' || dls == '?module=Spots&action=' || dls.indexOf('driver') != -1) && prefs[34]) {
	if (db.innerHTML.indexOf('url(&quot;/static/images/cities/maps') != -1) {
		var am = $x('//div[contains(@id, "spot_")]').length / 3; // get total amount of spots
		var city = $x('//b')[0].textContent;

		function whatspot(city, type) {
			var cords;
			if (city == 'Detroit') {
				if (type == lang.raidpage[13]) { //Car Lot (Thunderbolt)
					cords = 'F3';
				}
				if (type == lang.raidpage[14]) { //Car Lot (Avus)
					cords = 'G10';
				}
				if (type == lang.raidpage[15]) { //Car Lot (Spyder)
					cords = 'J6';
				}
				if (type == lang.raidpage[16]) { //Whiskey Stills
					cords = 'G6';
				}
				if (type == lang.raidpage[17]) { //Farm (Marijuana)
					cords = 'F1';
				}
				if (type == lang.raidpage[18]) { //Farm (Beer)
					cords = 'G1';
				}
				if (type == lang.raidpage[19]) { //Docks (Heroin)
					cords = 'H8';
				}
				if (type == lang.raidpage[20]) { //Docks (Cognac)
					cords = '?';
				}
				if (type == lang.raidpage[21]) { //Factory
					cords = 'E4';
				}
				if (type == lang.raidpage[22]) { //Scrapyard
					cords = 'I2';
				}
				if (type == lang.raidpage[23]) { //Bar
					cords = 'G7';
				}
				if (type == lang.raidpage[24]) { //Restaurant
					cords = 'H7';
				}
				if (type == lang.raidpage[25]) { //Army Surplus Store
					cords = 'F10';
				}
				if (type == lang.raidpage[26]) { //Lawyers Office
					cords = 'H6';
				}
			}
			if (city == 'Chicago') {
				if (type == lang.raidpage[13]) { //Car Lot (Thunderbolt)
					cords = 'D5';
				}
				if (type == lang.raidpage[14]) { //Car Lot (Avus)
					cords = 'J7';
				}
				if (type == lang.raidpage[15]) { //Car Lot (Spyder)
					cords = 'H5';
				}
				if (type == lang.raidpage[16]) { //Whiskey Stills
					cords = 'F6';
				}
				if (type == lang.raidpage[17]) { //Farm (Marijuana)
					cords = 'L9';
				}
				if (type == lang.raidpage[18]) { //Farm (Beer)
					cords = 'M7';
				}
				if (type == lang.raidpage[19]) { //Docks (Heroin)
					cords = 'F7';
				}
				if (type == lang.raidpage[20]) { //Docks (Cognac)
					cords = '?';
				}
				if (type == lang.raidpage[21]) { //Factory
					cords = 'M10';
				}
				if (type == lang.raidpage[22]) { //Scrapyard
					cords = 'L7';
				}
				if (type == lang.raidpage[23]) { //Bar
					cords = 'H6';
				}
				if (type == lang.raidpage[24]) { //Restaurant
					cords = 'H8';
				}
				if (type == lang.raidpage[25]) { //Army Surplus Store
					cords = 'C4';
				}
				if (type == lang.raidpage[26]) { //Lawyers Office
					cords = 'E5';
				}
			}
			if (city == 'Las Vegas') {
				if (type == lang.raidpage[15]) { //Car Lot (Spyder)
					cords = 'J7';
				}
				if (type == lang.raidpage[22]) { //Scrapyard
					cords = 'F6';
				}
				if (type == lang.raidpage[23]) { //Bar
					cords = 'H7';
				}
				if (type == lang.raidpage[24]) { //Restaurant
					cords = 'I6';
				}
				if (type == lang.raidpage[25]) { //Army Surplus Store
					cords = 'E5';
				}
			}
			if (city == 'Corleone') {
				if (type == lang.raidpage[17]) { //Farm (Marijuana)
					cords = 'I7';
				}
				if (type == lang.raidpage[22]) { //Scrapyard
					cords = 'G6';
				}
				if (type == lang.raidpage[24]) { //Restaurant
					cords = 'H6';
				}
				if (type == lang.raidpage[25]) { //Army Surplus Store (Villa)
					cords = 'F5';
				}
			}
			if (city == 'Palermo') {
				if (type == lang.raidpage[13]) { //Car Lot (Thunderbolt)
					cords = 'E5';
				}
				if (type == lang.raidpage[15]) { //Car Lot (Spyder)
					cords = 'J8';
				}
				if (type == lang.raidpage[17]) { //Farm (Marijuana)
					cords = 'H4';
				}
				if (type == lang.raidpage[21]) { //Factory
					cords = 'G6';
				}
				if (type == lang.raidpage[22]) { //Scrapyard
					cords = 'J7';
				}
				if (type == lang.raidpage[23]) { //Bar
					cords = 'H5';
				}
				if (type == lang.raidpage[24]) { //Restaurant
					cords = 'I6';
				}
				if (type == lang.raidpage[25]) { //Army Surplus Store (Villa)
					cords = 'G4';
				}
				if (type == lang.raidpage[26]) { //Lawyers Office (UC)
					cords = 'H6';
				}
			}
			if (city == 'New York') {
				if (type == lang.raidpage[13]) { //Car Lot (Thunderbolt)
					cords = 'D4';
				}
				if (type == lang.raidpage[14]) { //Car Lot (Avus)
					cords = 'K6';
				}
				if (type == lang.raidpage[15]) { //Car Lot (Spyder)
					cords = 'F8';
				}
				if (type == lang.raidpage[16]) { //Whiskey Stills
					cords = 'H5';
				}
				if (type == lang.raidpage[17]) { //Farm (Marijuana)
					cords = 'B6';
				}
				if (type == lang.raidpage[18]) { //Farm (Beer)
					cords = 'M9';
				}
				if (type == lang.raidpage[19]) { //Docks (Heroin)
					cords = 'G8';
				}
				if (type == lang.raidpage[20]) { //Docks (Cognac)
					cords = 'I8';
				}
				if (type == lang.raidpage[21]) { //Factory
					cords = 'G4';
				}
				if (type == lang.raidpage[22]) { //Scrapyard
					cords = 'K5';
				}
				if (type == lang.raidpage[23]) { //Bar
					cords = 'I5';
				}
				if (type == lang.raidpage[24]) { //Restaurant
					cords = 'F6';
				}
				if (type == lang.raidpage[25]) { //Army Surplus Store (Villa)
					cords = 'N7';
				}
				if (type == lang.raidpage[26]) { //Lawyers Office (UC)
					cords = 'J6';
				}
			}
			if (city == 'Philadelphia') {
				if (type == lang.raidpage[13]) { //Car Lot (Thunderbolt)
					cords = 'E5';
				}
				if (type == lang.raidpage[15]) { //Car Lot (Spyder)
					cords = 'J3';
				}
				if (type == lang.raidpage[16]) { //Whiskey Stills
					cords = 'H5';
				}
				if (type == lang.raidpage[17]) { //Farm (Marijuana)
					cords = 'B3';
				}
				if (type == lang.raidpage[19]) { //Docks (Heroin)
					cords = 'G9';
				}
				if (type == lang.raidpage[20]) { //Docks (Cognac)
					cords = 'L6';
				}
				if (type == lang.raidpage[22]) { //Scrapyard
					cords = 'L2';
				}
				if (type == lang.raidpage[23]) { //Bar
					cords = 'I4';
				}
				if (type == lang.raidpage[26]) { //Lawyers Office (UC)
					cords = 'G6';
				}
			}
			if (city == 'Baltimore') {
				if (type == lang.raidpage[13]) { //Car Lot (Thunderbolt)
					cords = 'D6';
				}
				if (type == lang.raidpage[15]) { //Car Lot (Spyder)
					cords = 'G2';
				}
				if (type == lang.raidpage[17]) { //Farm (Marijuana)
					cords = 'M3';
				}
				if (type == lang.raidpage[21]) { //Factory
					cords = 'K7';
				}
				if (type == lang.raidpage[22]) { //Scrapyard
					cords = 'G10';
				}
				if (type == lang.raidpage[23]) { //Bar
					cords = 'F5';
				}
				if (type == lang.raidpage[24]) { //Restaurant
					cords = 'G6';
				}
				if (type == lang.raidpage[25]) { //Army Surplus Store (Villa)
					cords = 'B10';
				}
				if (type == lang.raidpage[26]) { //Lawyers Office (UC)
					cords = 'F6';
				}
			}
			return cords;
		}

		var div = cEL('div'); // the main div
		div.setAttribute('style', 'background-color:'+getValue('tableBg', '#F0F0F0')+', border:1px solid black; font-family:Tahoma,Verdana');
		var divdump = '<table class="thinline" style="width:630px" cellpadding="0"><tr class="tableheader"><td>&nbsp;</td><td>'+lang.raidpage[3]+'</td><td>'+lang.raidpage[4]+'</td><td>'+lang.raidpage[5]+'</td><td>'+lang.raidpage[6]+'</td><td>'+lang.raidpage[7]+'</td><td>'+lang.raidpage[11]+'</td></tr><tr><td height="2" bgcolor="black" colspan="7"></td></tr>';

		var ownfam = getValue('family', '');
		for (var y = 0; y < am; y+=1) {
			var id = $x('//*[@id="map"]/div[contains(@id, "spot_")]')[y].id; // = 'spot_*'
			id = parseInt(id.replace('spot_', ''));
			var type = $X('//*[@id="spot_default_'+id+'"]/b').textContent;
			var cords = whatspot(city, type);
			var owner = $X('//*[@id="spot_default_'+id+'"]/table/tbody/tr/td[2]').textContent;

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
					if (rpfam[1] != stripHTML(ownfam)) { // not own fam
						rpform = '<form name="startraid" method="post" style="display:inline" action="index.php?module=Spots&action=start_raid"><input type="hidden" name="type" value="'+id+'" /><input type="hidden" name="bullets" /><input type="hidden" name="driver" /><input style="-moz-border-radius:5px; border-radius:5px;" type="submit" value="Go!" /></form>';
					} else {
						time = '';
						//profit = $x('//td')[(((u * 14) + 5) - tdskipnum)].innerHTML; // reload profit cuz it's of
					}
				} else {
					rpform = '<form name="startraid" method="post" style="display:inline" action="index.php?module=Spots&action=start_raid"><input type="hidden" name="type" value="'+id+'" /><input type="hidden" name="bullets" /><input type="hidden" name="driver" /><input style="-moz-border-radius:5px; border-radius:5px;" type="submit" value="Go!" /></form>';
				}
			}
			//parsing everything
			divdump += '<tr style="height: 22px;"><td style="padding-left:5px">'+cords+'</td><td>'+type+'</td><td>'+(owner!=lang.raidpage[12]?('<a href="http://'+dlh+'/user.php?nick='+owner.split(' ')[0]+'">'+owner.split(' ')[0]+'</a> '+ (owner.split(' ')[1]?owner.split(' ')[1]:'')):owner)+'</td><td style="text-align:right; padding-right:10px">'+profit+'</td><td><table cellpadding="0" cellspacing="0" style="border:1px solid #000; margin:0px; padding:0px; width:102px; -moz-border-radius:3px; border-radius:3px;"><tr><td>'+prot+'</td></tr></table></td><td style="text-align:center">'+time+'</td><td style="text-align:center">'+rpform+'</td></tr>';
		}
		divdump += '</table>';
		div.innerHTML = divdump;

		var div2 = cEL('div2'); // Div with forms
		div2.setAttribute('style', 'background-color:'+getValue('tableBg', '#F0F0F0')+', border:1px solid black; color:#FFF');
		div2.innerHTML = '<table class="thinline" style="width:630px"><tr><td colspan="2" class="tableheader">'+lang.raidpage[10]+'</td></tr><tr><td colspan="2" height="1" bgcolor="black"></td></tr><tr style="background-color:'+getValue('tableBg', '#F0F0F0')+'"><td style="text-align:right">'+lang.raidpage[8]+'</td><td style="padding-left:40px"><input style="-moz-border-radius:5px; border-radius:5px; padding-left:4px" id="raidpagebullets" type="text" name="bullets" size="3" value="200" /></td></tr><tr style="background-color:'+getValue('tableBg', '#F0F0F0')+'"><td style="text-align:right;">'+lang.raidpage[9]+'</td><td style="padding-left:40px"><input style="-moz-border-radius:5px; border-radius:5px; padding-left:4px" id="raidpagedriver" type="text" name="driver" /></td></tr></table>';
		var c = cEL('center');
		if(db.innerHTML.search('id="spot_extra_'+id+'"')!=-1){
			var owndiv = cEL('div');
			owndiv.id = 'spot_extra_'+id+'';
			owndiv.innerHTML = $X('//div[@id="spot_extra_'+id+'"]').innerHTML;
			unsafeWindow.console.log(owndiv);
			owndiv.setAttribute('style', 'background-color:'+getValue('tableBg', '#F0F0F0'));
			c.appendChild(owndiv);
			c.appendChild(cEL('br'));
		}
		db.innerHTML = '';
		c.appendChild(div2);
		c.appendChild(cEL('br'));
		c.appendChild(div);
		db.appendChild(c);
		
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
	var table, prices, tr, missing, A, B, t, m, type, types, ajaxDiv;
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
	//add price per bullet

	function addPrice(num) {
		var bullets = parseInt($X(xpath).getElementsByTagName('td')[(1 + num)].innerHTML.replace(/[^0-9.]/g, ''), 10);
		var price = parseInt($X(xpath).getElementsByTagName('td')[(2 + num)].innerHTML.replace(/[^0-9.]/g, ''), 10);
		$X(xpath).getElementsByTagName('td')[(1 + num)].innerHTML = $X(xpath).getElementsByTagName('td')[(1 + num)].innerHTML + ' ($ ' + Math.round(price / bullets) + ')';
	}

	trlen = $x('//center/table[3]/tbody/tr[@class="one"]').length;
	for (i = 1; i <= trlen; ++i) {
		if (dls.indexOf('specific') == -1) { //on view object page
			var xpath = '/html/body//center/table[3]/tbody/tr[@class="one"][' + i + ']';
			if (!$X(xpath) || $I(xpath).indexOf(sets.obay[0]) > 100) {
				break;
			}
			if ($I(xpath).indexOf(sets.obay[0]) != -1) {
				addPrice(1);
			}
		}
		if (dls.indexOf('type=11') != -1) {
			var xpath = '/html/body//center/table[3]/tbody/tr[@class="one"][' + i + ']';
			if (!$X(xpath) || $I(xpath).indexOf(sets.obay[1]) > 100) {
				break;
			}
			if ($I(xpath).indexOf(sets.obay[1]) != -1) {
				addPrice(0);
			}
		}
	}

	if (dls.indexOf('specific') != -1) { //add focus and check on every page
		if (document.body.innerHTML.indexOf(sets.obay[1]) != -1) {
			if (sets.version == '_dm') {
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
	var br = cEL('br');
	var span = document.getElementsByTagName('span')[0];
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

//---------------- linkify names ----------------
//---- link names in inbox
if (dls.indexOf('action=showMsg') != -1) {
	var msgType = $X('/html/body/center/table/tbody/tr/td[2]/table/tbody/tr/td/b').textContent;
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

//---------- refresh button @ poker -----------
if (dls.search('module=Poker') != -1) {
	refresh = $X('//span/a[contains(@href, "BeO/webroot/index.php?module=Poker&action=")]');
	refresh.innerHTML = refresh.innerHTML + '(=)';
	refresh.accessKey = '=';

	//add m/k usage in amount boxes
	if (prefs[5]) {
		var inputs = $x('//input[@name="ante"] | //input[@name="buy_in"] | //input[@name="max_raise"] | //input[@name="raiseby"]');
		inputs.forEach(function ($n) {
			$n.setAttribute('onkeydown', 'javascript:var symcode = event.which;if(symcode == 75){ this.value = this.value + "000"; } if(symcode == 77){ this.value = this.value + "000000"; }this.value = this.value.replace(/k|m/g,""); return (symcode == 75||symcode == 77)?false:true;');
		});
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
				if(who[len] != 'Object(s)') {
					who[len] = '<a href="/user.php?nick=' + who[len].match(/\w+/g)[0] + '><b>' + who[len] + '</b></a>';
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
					var index = ((sets.version=='_com')?5:6); //version dependency
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
		var td2 = document.getElementsByTagName('table')[0].rows[10].cells[1];
		var input = document.getElementsByTagName('table')[0].rows[10].cells[1].childNodes[0];

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
		var newp = document.createElement("p");
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
				if(who[len] != 'Object(s)') {
					who[len] = '<a href="/user.php?nick=' + who[len].match(/\D+/g)[0].replace('.', '') + '"><b>' + who[len] + '</b></a>';
				}
			}
			$n.innerHTML = who.join(' ');
		}
	});
}

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

//---------------- BulletTracker ----------------
if (dlp == '/bullets2.php' && prefs[33]) {
	var btbullets = getValue('btbullets', 0);
	var btmoney = getValue('btmoney', 0);
	if (db.innerHTML.indexOf(lang.bullettracker[0]) != -1) {
		var rex = new RegExp(lang.bullettracker[1]);
		var str = db.innerHTML.replace(/,/g, '');
		var r = str.match(rex);
		btbullets += parseInt(r[1]);
		btmoney += parseInt(r[2]);
		setValue('btbullets', btbullets);
		setValue('btmoney', btmoney);
	}
	if (btbullets == 0) {
		btdolpbul = 0;
	} else {
		btdolpbul = Math.round((btmoney / btbullets) * 100) / 100;
	}
	var div = cEL('div');
	div.id = 'btracker';
	div.setAttribute('style', 'position:fixed; bottom:20px; left:20px; width:200px; background-color:#455C6F; border:2px solid #000; -moz-border-radius:5px; border-radius:5px; padding:4px');
	div.innerHTML = '<center><b>'+lang.bullettracker[2]+'</b></center><table width="100%"><tr><td bgcolor="black"></td></tr></table><div id="btstats">'+lang.bullettracker[3]+' <font style="float:right"><b>'+commafy(btbullets)+'</b></font><br />'+lang.bullettracker[4]+' <font style="float:right"><b>$'+commafy(btmoney)+'</b></font><br />'+lang.bullettracker[5]+' <font style="float:right"><b>$'+commafy(btdolpbul)+'</b></font></div><br />&nbsp;<div id="resetbt" align="right" style="position:absolute; bottom:2px; right:2px; border:2px solid grey; -moz-border-radius:5px; border-radius:5px;" onmouseover="this.style.border=\'2px solid #DDDF00\'; this.style.cursor = \'pointer\';" onmouseout="this.style.border=\'2px solid grey\'; this.style.cursor=\'default\';" >&nbsp;<b>'+lang.scratcher[16]+'</b> <img src="'+GM_getResourceURL('deleteIcon')+'" style="vertical-align:-3px" /></div>';
	db.appendChild(div);

	getID('resetbt').addEventListener('click', function() {
		getID('resetbt').innerHTML = '&nbsp;<b>'+lang.scratcher[17]+'<b>&nbsp;';
		getID('btstats').innerHTML = lang.bullettracker[3]+' <font style="float:right"><b>0</b></font><br />'+lang.bullettracker[4]+' <font style="float:right"><b>$0</b></font><br />'+lang.bullettracker[5]+' <font style="float:right"><b>$0</b></font>';
		setValue('btbullets', 0);
		setValue('btmoney', 0);
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
	var str = document.body.innerHTML.replace(/,/g, '');
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
			if (r[1] == ptself) { // we won?
				var pttype = r[2];
				ptgwon += 1;
				ptmwon += parseInt(r[3], 10);
				setValue('ptgwon', ptgwon);
				setValue('ptmwon', ptmwon);
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

//---------------- BJTracker ----------------
if (dlp.indexOf('/gambling/blackjack.php') != -1 && prefs[33]) {
	var bj = getValue('bj', 0);
	var bjgames = getValue('bjgames', 0);
	var bjgwon = getValue('bjgwon', 0);
	var bjmwon = getValue('bjmwon', 0);
	var bjspent = getValue('bjspent', 0);
	var bjtie = getValue('bjtie', 0);
	var bet = getValue('bjbet', 0);
	var str = document.body.innerHTML.replace(/,/g, '');
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
	var str = document.body.innerHTML.replace(/,/g, '');
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

	$x('//td[@class="tableheader"]')[0].innerHTML = '<a href="#" class="orange" title="'+lang.oneclick[10]+'">' + $x('//td[@class="tableheader"]')[0].textContent + '</a>';

	$x('//td[@class="tableheader"]/a')[0].addEventListener('click', function () {
		$x('//*[@name="forticket"]').forEach(function ($n) {
			GM_openInTab($n);
		});
	}, true);

	if (prefs[9]) {
		lastSTR = getValue('lastvote', 0); //get last voting time
		vote = 0; //initialize to DON'T VOTE
		if (!lastSTR) {
			vote = confirm(lang.oneclick[0]);
		} else { //not first run
			//initialize last voting time and current time as Date objects
			last = new Date(lastSTR);
			now = new Date();

			//time since last vote
			date = now.getDate() - last.getDate();
			hr = now.getHours() - last.getHours();
			min = now.getMinutes() - last.getMinutes();
			sec = now.getSeconds() - last.getSeconds();

			//check for negative values
			if (sec < 0) {
				min--;
				sec += 60;
			}
			if (min < 0) {
				hr--;
				min += 60;
			}
			if (hr < 0) {
				date--;
				hr += 24;
			}
			if (date < 0) {
				month = last.getMonth();
				month++; //getMonth starts with Jan=0
				if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
					date += 31;
				}
				if (month == 4 || month == 6 || month == 9 || month == 11) {
					date += 30;
				}
				if (month == 2) {
					date += 28;
				}
			}

			msg = '';
			if (now.getUTCDate() != last.getUTCDate()) { //different day, ask for vote [user decision to wait full 24hr]
				msg += lang.oneclick[5] + '\n' + lang.oneclick[8];
				msg += date + lang.oneclick[6] + hr + lang.oneclick[2] + min + lang.oneclick[3] + sec + lang.oneclick[4];
				msg += '\n' + lang.oneclick[7];
				vote = confirm(msg);
			} else { //same day, no vote [not encouraging vote abusers]
				hr = 23 - now.getUTCHours(); //time till 0:00 OT
				min = 59 - now.getUTCMinutes();
				sec = 59 - now.getUTCSeconds();
				msg += lang.oneclick[1];
				msg += hr + lang.oneclick[2] + min + lang.oneclick[3] + sec + lang.oneclick[4] + '\n';
				msg += lang.oneclick[9];
				vote = confirm(msg);
			}
		}
		if (vote) { //give me liberty or give me death!
			$x('/html/body//table/tbody/tr[3]//a[contains(@href, "votelot.php")]').forEach(function ($n) {
				GM_openInTab($n.href);
			});
			//get current time after voting and store as last voting time
			now2 = new Date();
			nowSTR = now2.toUTCString();
			setValue('lastvote', nowSTR);
		}
	}
}

//---------------- Best Run Calculator ----------------		//**/ => signals for major function call
if (dlp == '/prices.php' || dlp == '/smuggling.php' || dlp == '/travel.php') {
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
				if (smugCity.search(langs.en.cities[i]) != -1) {
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
				td.innerHTML = '<center><i>' + lang.BR[5] + langs.en.cities[i] + '</i></center>';
				tr.appendChild(td);
				allProfits.push(0);
				bestBN.push([0, 0]);
			} else if (plane == 0 && (((city == 6 || city == 11) && (i + 4) != 6 && (i + 4) != 11) || ((city != 6 && city != 11) && ((i + 4) == 6 || (i + 4) == 11)))) { //No plane to travel there
				td.innerHTML = '<center><i>' + lang.BR[6] + langs.en.cities[i] + '</i></center>';
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
					td.innerHTML = '<center><i>' + lang.BR[7] + langs.en.cities[i] + '</i></center>';
					tr.appendChild(td);
					bestBN.push([0, 0]); //push dummy to complete array
				} else { //profit \o/
					bestBN.push([bestNarc, bestBooze]);
					td.innerHTML = '&nbsp;' + langs.en.cities[i];
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

			//grab color from actual theme
			color = getActual($X('//td[@class="tableheader"]'), 'background-color');
			color = color.split(',');
			for (i = 0; i <= 2; i++) {
				color[i] = color[i].replace(/[^0-9]/g, '');
			}
			color = '#' + RGBtoHex(color[0], color[1], color[2]);

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
				div = document.getElementById('AF');
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

				getID('do_n').addEventListener('click', function(){ AF(getInfo[5],0,1); }, true);
				getID('do_b').addEventListener('click', function(){ AF(getInfo[5],1,0); }, true);
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
if (prefs[28] && dlp == '/smuggling.php') { //mainly add AF links and tweak innerHTML, other functions taken over by BRC
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
//---------------- Clean login page ----------------
if ((dlp == '/' || dlp == '/index.php' || dlp == '/game-login.php') && prefs[20]) {
	$Del('/html/body/table/tbody/tr[2]'); //rough cleansing!
	$Del('//tr/td/table//table/tbody/tr[2]'); //yellow links
	$X('//td').setAttribute('height', '90%'); //new primary cell heigth
	var logo = $Cut('//td[@width="280"]', 1); //replace the logo
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
	footer.childNodes[1].childNodes[1].innerHTML = '&copy; 2004-2011 - Omerta Game Ltd. | &copy; 2007-2011 - Omerta Beyond<br /><br /><a href="http://www.omertabeyond.com" target="_blank">Omerta Beyond</a> | <a href="' + PrefsLink + '" target="_blank">' + lang.prefsname + '</a> | <a href="' + (sets.version == '_dm' || sets.version == '_com' ? 'http://news.omertabeyond.com' : EdoUrl) + '" target="_blank">' + lang.login[1] + '</a> | <a href="/game-register.php">' + lang.login[0] + '</a>';

	var input = [$X('//input[@name="email"]'), $X('//input[@name="pass"]'), $X('//input[@type="submit"]')]; //add focus effects and styling
	input.forEach(function ($n) {
		$n.setAttribute('class', 'loginHL');
	});
	if (input[0].value == 'Email') { //auto-focus
		input[0].focus();
	} else if (input[1].value == '') {
		input[1].focus();
	} else {
		input[2].focus();
	}
}

//---------------- NickReader ----------------
if(prefs[16] && dlp != '/mid.php' && dlp != '/banner.php' && dlp != '/game.php'){//if nickreader is on
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
		var on = (getID('alt').textContent == '1' || getID('ctrl').textContent == '1')?1:0;//is the NR activated?
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
			var div = document.createElement('div');
			div.id = url;//unique
			div.setAttribute('class', 'NRInfo');
			div.innerHTML = '<img src="'+GM_getResourceURL('loading')+'" /> '+lang.NR.misc[0];

			//get actual color
			var color = getActual($X('//div[@class="tableheader"]'), 'background-color');
			color = color.split(',');
			for(i=0;i<=2;i++){ color[i] = color[i].replace(/[^0-9]/g,''); }
			color = '#'+RGBtoHex(color[0], color[1],color[2]);
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
				//hack to grab color from current theme
				var dummy = cEL('div');
				dummy.setAttribute('class', 'tableheader');
				dummy.style.display = 'none';
				db.appendChild(dummy);

				//grab actual color from dummy
				var color = getActual($X('//div[@class="tableheader"]'), 'background-color');
				color = color.split(',');
				for(i=0;i<=2;i++){
					color[i] = color[i].replace(/[^0-9]/g, '');
				}
				color = '#'+RGBtoHex(color[0], color[1], color[2]);

				var div = cEL('div');//setup NR status div
				div.id = 'NRstatus';
				div.setAttribute('style', 'background-color: ' + color + '!important');
				div.style.display = 'block';
				div.style.right = -180;
				div.style.top = 10;
				div.innerHTML = '<center><img src="'+nickReaderIcon+'" />&nbsp;&nbsp;<b>'+lang.NR.misc[2]+'</b></center>';
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

				div = cEL('div');//setup proces checker
				div.style.display = 'none';
				div.id = 'proc';
				div.innerHTML = 0;
				db.appendChild(div);


				//add eventListeners with slide!
				db.setAttribute('onKeydown', 'function slideIn(){ var s = document.getElementById("NRstatus"); setTimeout(function(){s.style.right=-140;},100);setTimeout(function(){s.style.right=-100;},200);setTimeout(function(){s.style.right=-60;},300); setTimeout(function(){s.style.right=-30;},400);setTimeout(function(){s.style.right=10;},500);} if(event.keyCode==18){ if(document.getElementById("alt").innerHTML == 0){slideIn();} document.getElementById("alt").innerHTML = 1; } if(event.keyCode==17){ if(document.getElementById("ctrl").innerHTML == 0){ slideIn();document.getElementById("ctrl").innerHTML = 1;}else{var s = document.getElementById("NRstatus"); setTimeout(function(){s.style.right=-30;},100);setTimeout(function(){s.style.right=-60;},200);setTimeout(function(){s.style.right=-100;},300); setTimeout(function(){s.style.right=-140;},400);setTimeout(function(){s.style.right=-180;},500);document.getElementById("ctrl").innerHTML = 0;}}');
				db.setAttribute('onKeyup', 'if(event.keyCode==18){ if(document.getElementById("alt").innerHTML == 1){var s = document.getElementById("NRstatus"); setTimeout(function(){s.style.right=-30;},100);setTimeout(function(){s.style.right=-60;},200);setTimeout(function(){s.style.right=-100;},300); setTimeout(function(){s.style.right=-140;},400);setTimeout(function(){s.style.right=-180;},500);} document.getElementById("alt").innerHTML = 0; document.getElementById("ctrl").innerHTML = 0; }');
			}
			nicks.forEach(function($n){//add mouse event checkers
				if($n.href.search('cpuser')==-1){
					$n.addEventListener('mouseover', function(){ checkNRdiv(this.href); }, true);
					$n.addEventListener('mouseout', function(){ if(document.getElementById(this.href)){ document.getElementById(this.href).style.display = 'none';} }, true);
				}
			});
			window.focus();//focus on frame so 'ctrl' event is noticed
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
if ((dlp == '/' || dlp == '/index.php' || dlp == '/game.php' || dlp == 'game-login.php') && lh.indexOf('beyond') == -1) {
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
