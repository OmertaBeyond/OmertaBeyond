// -------------------------------------------------------------------------------------
//
// This file contains the language array we use for Project Omerta Beyond
//
// Changing these values are at your own risk. If you make bug changes or bugfixes, 
// please inform us too so we can make any changes if we think are necesary.
//
// -------------------------------------------------------------------------------------

// vers: 1.9.1.98

// get language vars
var langs = {
	en: {
		version: '_com',
		prefslink: '/prefs.php?v=com',
		prefsname: 'Preferences',
		menuitem: ['OB Poll', 'Contact Form', 'Beyond FAQ', 'B/N Prices', 'Logger Graphs', 'Daily famstats'],
		prefs: [
			"Disable the 'go for it' button for too short image code",//0 - CRIMES/CARS
			"Cocaine prices in the marquee",//1 - SMUGGLING/PRICES
			"Fingon's News in the info menu",//2 - FINGON
			"Jail Highlighter, auto-form and hotkeys",//3 - JAIL/BUSTING
			"",//4 - Non-existant
			"Clickable bank amounts",//5 - MISC
			"Remove Jailbusting Skill bar",//6 - STATUS PAGE CLEAN-UP
			"Disable externally hosted images on profiles",//7 - MISC
			"Auto-form crimes/car nicks",//8 - CRIMES/CARS
			"1-Click Vote",//9 - MISC
			"Refresh crimes/car nick page after waiting time is over",//10 - CRIMES/CARS
			"Return to page after wrong image code",//11 - MISC
			"Remove Capo Money texts (Non Capo users only)",//12 - STATUS PAGE CLEAN-UP
			"Detailed Familypage",//13 - MISC
			"Remove \"Kill password not set\" messages",//14 - MISC
			"",//15 - Non-existant
			"Enable Nickreader (hold 'Alt' or switch on/off with 'Ctrl')",//16 - MISC
			"Extra prices popup in marquee",//17 - SMUGGLING/PRICES
			"Display price per bullet",//18 - OBAY
			"",//19 - Non-existant
			"Clean login page with Fingon's News",//20 - FINGON / MISC
			"Add highlights @ prices page",//21 - SMUGGLING/PRICES
			"Remove Race form bar",//22 - STATUS PAGE CLEAN-UP
			"Return to jail page after failure",//23 - JAIL/BUSTING
			"Enable Garage Car Highlighting",//24 - CRIMES/CARS
			"Auto-form Bullets",//25 - OTHER AFs
			"Auto-form Group Crimes",//26 (heist, oc, moc) - OTHER AFs
			"Auto-form Bloodbank",//27 - OTHER AFs
			"Auto-form Smuggling",//28 - SMUGGLING/PRICES
			"Auto-form Races",//29 - OTHER AFs
			"",//30 - NONE
			"Anti NOOB tooltips",//31 - MISC
			"Enable hotkeys (Smuggling)",//32 - SMUGGLING/PRICES
			"",//33 - NONE
			"Extra links on user profiles",//34 - MISC
			"Disable Avatars on forum"//35 - MISC
		],
		maxprefs: 36, // 1 + last pref #
		preftitles: [
			"Crimes/Car Nicks",//0
			"Smuggling and Booze/Narc Prices",//1
			"Jail/Busting",//2
			"",//3 Non-existant
			"Obay",//4
			"Other Auto-formers",//5
			"Status Page Clean-up",//6
			"Fingon\'s News",//7
			"Interface Extras"//8
		],
		marquee: ['Are you sure you want to travel to ', '? This will cost you $ ', 'All Prices', 'Coke at: ', 'You are in jail', 'You\'re in jail and you can\'t fly at the moment', 'Error while traveling to '],
		newmenu: 'Detected new menu content! Please update your preferences.\nThis includes the menu AND the hotkey preferences!',
		customs: " settings updated! Returning to normal menu..<br><br>Click <a href='javascript:location.href=\"menu.php\"'>here</a> if this stays longer then 5 seconds",
		fingon: 8,
		login: ["Register", "http://www.fingon.be", "Fingon's"],
		status: ['none', 'None'],
		wrongcode: ["The code you", "<br><center><b>Learn to type, analphabetic!</b><br><br><a href=\"javascript:history.back()\">Click here to go back or wait a second</a></center>"],
		race: "You're still tired from your last race",
		profile: ["Marital status:", "SMS Status", "Family Buster of", "Dead", " History"],
		wealth: ['Straydog', 'Poor', 'Nouveau Riche', 'Very rich', 'Too rich to be true', 'Richer than God', 'Rich'],
		driver: ['Rookie', 'Co-Driver', 'Driver', 'Advanced Driver', 'Master Driver', 'Chauffeur', 'Advanced Chauffeur', 'Master Chauffeur', 'Racing Driver', 'Race Supremo', 'Champion'],
		friends: "Friends:",
		stats: ["back to top", ['Dead Fams', 'Honoured', 'CDCT', 'Fams', 'BF', 'Bookies', 'Roul', 'NG', 'Slots', 'BJ', 'PB']],
		bank: [3, "You"],
		smuggling: ["Pocket: ", "Booze", "Narcs", "Current Booze/Narcotics Prices", "All Prices", "Both"],
		obay: ["Pack of bullets","bullets"],
		inbox: ["Notification", "(Admin message)", "inviting", "explosives", "driver", "weapon", "Re: Bustout!,Re: Bailed!,Bustout!,Bailed!"],
		linkify: ["Route 66 heist", "Organised Crime", "Mega Organized Crime", "Target not found", "Carrace invite", "Target found", "Kill success", "Witness statement", "Condolences", "found", "Ticket update", "Crashed Message", "Invitation", "Raid Notification","Married","Wedding Gift","Wedding"],
		title: "Omerta (COM)",
		menutitle: ["Preferences page where you can change most of our options", "Place where we ask our users some questions", "Here you can send us your ideas or found bugs", "List of frequent asked questions", "Omerta prices with little flavor of ours :P", "Good looking graphical representation of stats from Omerta", "Latest family stats based by Fingon's calculation"],
		NR: {
			misc: ["Loading info..", "Family:", "Nickreader enabled"],
			positions: "Don of,Capo of:,Sottocapo of:,Consiglieri of:",
			objects: "Blackjack:,Roulette:,Bulletfactory:,Numbers Game:,Slotmachine:,Punto Banco:,Bookmaker office:",
			properties: "User:,Rank:,Honor points:,Status,Wealth",
			error: "Could not load page."
		},
		BR: [
			"Best Run Calculator",
			"City",
			"Booze",
			"Narc",
			"Profit",
			"You are in ",
			"You can't fly to ",
			"You won't make any profit in ",
			"Auto-Fill",
			"Can't find any data about Rank, Plane and Familyposition. Please visit your status and profile pages to fix this!",
			"NOW"
		],
		narcs: ["NO NARCS", "Morphine", "Marijuana", "Glue", "Heroin", "Opium", "Cocaine", "Tabacco"],
		booze: ["NO BOOZE", "Wine", "Beer", "Rum", "Cognac", "Whiskey", "Amaretto", "Port"],
		oneclick: [
			"You haven't used the 1-click voter yet!\nDo you want to use it now?\n",
			"You can't vote again yet!\nPlease wait another:\n",
			" hours, ",
			" minutes, and ",
			" seconds.\n",
			"You haven't used the 1-click voter today!\n",
			" days, ",
			"Do you want to use the 1-click voter now?",
			"Since you last used the 1-click voter, it's been: \n",
			"Do you still want to vote?"
		],
		cities: ['Detroit', 'Chicago', 'Palermo', 'New York', 'Las Vegas', 'Philadelphia', 'Baltimore', 'Corleone', 'NOWHERE']
	},
	nl: {
		version: '_nl',
		prefslink: '/prefs.php?v=nl',
		prefsname: 'Voorkeuren',
		menuitem: ['OB Poll', 'Contact formulier', 'Beyond FAQ', 'DnD prijzen', 'Loggrafieken', 'Dagelijkse famstats'],
		prefs: [
			"Blokkeer 'ga ervoor' knop voor te korte image code",//0 - CRIMES/CARS
			"Coke prijzen in de bovenbalk",//1 - SMUGGLING/PRICES
			"Edo-Nieuws in het info menu",//2 - EDO
			"Jail Highlighter, automatisch invullen en sneltoetsen",//3 - JAIL/BUSTING
			"",//4 - Non-existant
			"Klik op bankrekening om dit in te vullen",//5 - MISC
			"Verwijder Uitbreekervaring balk",//6 - STATUS PAGE CLEAN-UP
			"Zet extern gehoste plaatjes in profielen uit",//7 - MISC
			"Automatisch invullen misdaden/auto's stelen",//8 - CRIMES/CARS
			"Stem in 1 klik!",//9 - MISC  - used to be title changer but it's empty now
			"Ververs Misdaden/Steel een auto pagina nadat de wachttijd voorbij is",//10 - CRIMES/CARS
			"Ga automatisch terug nadat je een verkeerde code hebt ingetoetst",//11 - MISC
			"Verwijder 'Capo opbrengsten' tekst (alleen voor niet Capo's)",//12 - STATUS PAGE CLEAN-UP
			"Gedetailleerde familiepagina",//13 - MISC
			"Verwijder \"Moord wachtwoord niet ingevuld\" bericht",//14 - MISC
			"",//15 - Non-existant
			"Nicklezer popup tijdens vasthouden van 'Alt' of aan/uit met 'Ctrl'",//16 - MISC
			"Voeg 'extra prijzen popup' toe in de bovenbalk",//17 - SMOKKELEN/PRIJZEN
			"Voeg de prijs per kogel toe op Obay",//18 - OBAY 
			"",//19 - Non-existant
			"Opgeruimde login pagina met nieuws van Edo",//20 - FINGON /MISC
			"Voeg highlights toe op prijzen pagina",//21 - SMUGGLING/PRICES
			"Verwijder Racevorm balk",//22 - STATUS PAGE CLEAN-UP
			"Ga automatisch naar de gevangenis na mislukking",//23 - JAIL/BUSTING
			"Voeg highlights toe aan auto's in de Garage",//24 - CRIMES/CARS
			"Automatisch invullen van kogels",//25 - ANDERE AFs
			"Automatisch invullen bij groeps misdaden",//26 (heist, oc, moc) - ANDERE AFs
			"Automatisch invullen van bloed",//27 - OTHER AFs
			"Automatisch invullen bij het smokkelen",//28 - SMUGGLING/PRICES
			"Automatisch invullen bij autoracen",//29 - OTHER AFs
			"",//30 - NONE
			"Anti NOOB tooltips",//31 - MISC
			"Voeg extra sneltoetsen toe (Smokkelen)",//32 - SMUGGLING/PRICES
			"",//33 - NONE
			"Extra links op gebruikersprofielen",//34 - MISC
			"Schakel gebruikersafbeeldingen op forum uit"//35 - MISC
		],
		preftitles: [
			"Misdaden/Auto stelen",//0
			"Smokkelen en Drank/Drugs Prijzen",//1
			"Gevangenis/Uitbreken",//2
			"",//3 Non-existant
			"Obay",//4
			"Andere Auto-invullers",//5
			"Status Pagina opruimen",//6
			"Edo-Nieuws",//7
			"Interface Extra's"//8
		],
		maxprefs: 36,
		marquee: ['Weet je zeker dat je wil reizen naar ', '? Dit kost je $ ', 'Alle Prijzen', 'Coke om: ', 'Je zit in de gevangenis', 'Je kan op dit moment niet vliegen', 'Fout tijdens het reizen naar'],
		newmenu: 'Nieuwe menu indeling gevonden! Selecteer opnieuw je voorkeuren.\nDit houd in de menu- EN de hotkey voorkeuren!',
		customs: " indeling geupdate! <br><br>Click <a href='javascript:location.href=\"menu.php\"'>Wacht of klik hier</a>",
		fingon: 3,
		login: ["Registreren", "http://www.edo-nieuws.nl", "Edo-nieuws"],
		status: ['none', 'Geen'],
		wrongcode: ["De code die", "<br><center><b>Leer typen, analfabeet!</b><br><br><a href=\"javascript:history.back()\">Klik hier om terug te gaan of wacht een ogenblik</a></center>"],
		race: "Je bent nog moe van je vorige race",
		profile: ["Burgerlijke staat:", "SMS Status", "Familie Uitbreker van", "Dood", " Geschiedenis"],
		wealth: ["Sloeber", "Arm", "Modaal", "Erg rijk", "Te rijk om waar te zijn", "Rijker dan God", "Rijk"],
		driver: ["Nieuweling", "Bijrijder", "Bestuurder", "Ervaren bestuurder", "Perfecte bestuurder", "Chauffeur", "Ervaren chauffeur", "Sublieme chauffeur", "Racer", "Coureur", "Kampioen"],
		friends: "Vrienden:",
		stats: ["naar boven", ['Dode Fams', 'Geëerd', 'CDCT', 'Fams', 'BF', 'Bookies', 'Roul', 'NG', 'FM', 'BJ', 'PB']],
		bank: [2, "Je"],
		smuggling: ["Zak: ", "Drank", "Drugs", "Huidige Drank/Drugs Prijzen", "Alle Prijzen", "Beide"],
		obay: ["Pak met kogels","kogels"],
		inbox: ["Mededeling", "(Admin bericht)", "jou", "explosieven", "bestuurder", "wapen", "Re: Uitgebroken!,Re: Uitgekocht!,Uitgebroken!,Uitgekocht!"],
		linkify: ["Route 66 overval", "Georganiseerde Misdaad", "Mega Georganiseerde Misdaad", "Doelwit niet gevonden", "Autorace uitnodiging", "Doelwit gevonden", "Moord geslaagd", "Getuigenverklaring", "Condoleances", "hebben", "Ticket update", "Crashed Message", "Invitation", "Raid Notification","Married","Wedding Gift","Wedding"],
		title: "Omerta (NL)",
		menutitle: ["Voorkeur pagina waar je de meeste van onze opties kan veranderen", "Plaats waar we onze gebruikers een paar vragen stellen", "Hier kan je ons ideeën of gevonden bugs insturen", "Lijst van meest gestelde vragen", "De prijzen van Omerta met een snufje van ons :P", "Goed uitziende grafische representatie van de Omerta statistieken", "Huidige familie statistieken gebaseerd op Fingon's calculatie"],
		NR: {
			misc: ["Info laden..", "Familie:", "Nicklezer aan"],
			positions: "Don van:,Capo van:,Sottocapo van:,Consiglieri van:",
			objects: "Blackjack:,Roulette:,Kogelfabriek:,Nummerspel:,Fruitmachine:,Punto Banco:,Wedkantoor:",
			properties: "Gebruiker:,Rang:,Eerpunten:,Status,Vermogen",
			error: "Kan de pagina niet laden."
		},
		BR: [
			"Beste Deal Calculator",
			"Stad",
			"Drank",
			"Drugs",
			"Winst",
			"Je bent in ",
			"Je kan niet vliegen naar ",
			"Je zal geen winst maken in ",
			"Auto-Invullen",
			"Er is geen data van Rank, Vliegtuig en Familiepositie. Bekijk je status en profiel pagina's om dit te verhelpen!",
			"NU"
		],
		narcs: ["GEEN DRUGS", "Morfine", "Marihuana", "Lijm", "Hero&#239;ne", "Opium", "Coca&#239;ne", "Tabak"],
		booze: ["GEEN DRANK", "Wijn", "Bier", "Rum", "Cognac", "Whiskey", "Amaretto", "Port"],
		oneclick: [
			"Je hebt de 1-klik stemmer niet gebruikt.\nWil je deze nu gebruiken?\n",
			"Je kan nog niet stemmen!\nWacht nog:\n",
			" uur, ",
			" minuten, en ",
			" seconde(n).\n",
			"Je hebt de 1-klik stemmer vandaag nog niet gebruikt!\n",
			" dag(en), ",
			"Wil je de 1-klik stemmer nu gebruiken?",
			"Sinds de laatste keer dat je hebt gestemd is er verstreken:\n",
			"Wil je alsnog de 1-klik stemmer gebruiken?"
		],
		cities: ['Detroit', 'Chicago', 'Palermo', 'New York', 'Las Vegas', 'Philadelphia', 'Baltimore', 'Corleone', 'NOWHERE']
	}
};
