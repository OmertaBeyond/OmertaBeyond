/*

This file contains the language array we use for Project Omerta Beyond

Don't change anything unless you know what are you doing.
Variables depending on version

Version: 1.30.0

*/

// Get language vars
var settings = {
	en: {
		version: '_com',
		prefslink: '/prefs.php?v=com',
		priceslink: '/prices.php?v=com',
		contactlink: '/contact.php?v=com',
		polllink: '/html/poll/poll.php?v=com',
		statslink: 'http://rix.omertabeyond.com/stats.php?v=com&d=n',
		status: [
			'none',
			'None'
		],
		wrongcode: 'The code you',
		failedBullets: [
			'You may only buy 500 bullets.',
			'The price per bullet just changed, so if you really want those bullets, fill in the form again',
			'This factory doesn\'t have that many bullets.<br><br>The price of bullets may also have changed RIGHT NOW, please try again.3',
			'You cant buy a negative amount of bullets',
			'The code you verified didn\'t match the image code. The image code only contains lower case and numeric characters',
			'You don\'t have enough cash to make this deal.',//5
			'You may only buy 1,000 bullets.'
		],
		garage: 'Type',
		race: 'You\'re still tired from your last race',
		profile: [
			'Marital status:',
			'SMS Status',
			'Family Buster of',
			'Dead',
			' History'
		],
		wealth: [
			'Straydog',
			'Poor',
			'Nouveau Riche',
			'Very rich',
			'Too rich to be true',
			'Richer than God',
			'Rich'
		],
		driver: [
			'Rookie',
			'Co-Driver',
			'Driver',
			'Advanced Driver',
			'Master Driver',
			'Chauffeur',
			'Advanced Chauffeur',
			'Master Chauffeur',
			'Racing Driver',
			'Race Supremo',
			'Champion'
		],
		busts: [
			'Rookie',
			'Novice',
			'Initiate',
			'Decent',
			'Apprentice',
			'Intermediate',
			'Professional',
			'Expert',
			'Ultimate',
			'Extrem Expert'
		],
		friends: 'Friends:',
		bank: 'You cannot transfer less than 100 dollars',
		smuggling: [
			'Pocket: ',
			'Booze',
			'Narcs',
			'Current Booze/Narcotics Prices',
			'All Prices',
			'Both'
		],
		obay: [
			'Pack of bullets',
			'bullets',
			'Bet'
		],
		inbox: [
			'Notification',
			'(Admin message)',
			'inviting',
			'explosives',
			'driver',
			'weapon',
			'Re: Bustout!,Re: Bailed!,Bustout!,Bailed!'
		],
		linkify: [
			'Route 66 heist',
			'Organised Crime',
			'Mega Organized Crime',
			'Target not found',
			'Carrace invite',
			'Target found',
			'Kill success',
			'Witness statement',
			'Condolences',
			'found',
			'Ticket update',
			'Crashed Message',
			'Invitation',
			'Raid Notification',
			'Married',
			'Wedding Gift',
			'Wedding'
		],
		NR: {
			misc: [
				' Loading info..',
				'Family:',
				'Nickreader enabled',
				'.Clicklimit, please try again..',
				'.Wait for the previous..'
			],
			positions: 'Don of,Capo of:,Sottocapo of:,Consiglieri of:',
			objects: 'Blackjack:,Roulette:,Bulletfactory:,Numbers Game:,Slotmachine:,Punto Banco:,Bookmaker office:',
			properties: 'User:,Rank:,Honor points:,Status,Wealth',
			error: 'Could not load page.'
		},
		BR: [
			'Best Run Calculator',
			'City',
			'Booze',
			'Narc',
			'Profit',
			'You are in ',
			'You can\'t fly to ',
			'You won\'t make any profit in ',
			'Auto-Fill',
			'Can\'t find any data about Rank, Plane and Family position. Please visit your status and profile pages to fix this!',
			'NOW'
		],
		narcs: [
			'NO NARCS',
			'Morphine',
			'Marijuana',
			'Glue',
			'Heroin',
			'Opium',
			'Cocaine',
			'Tabacco'
		],
		booze: [
			'NO BOOZE',
			'Wine',
			'Beer',
			'Rum',
			'Cognac',
			'Whiskey',
			'Amaretto',
			'Port'
		],
		scratcher: [
			'<b>Congratulations!</b>',
			'bullets<br>They have been added to your account!<br>',
			'won (\\d+) bullets',
			'<br>It has been added to your account!<br>',
			'You have won \\$ (\\d+)',
			'<b>Start scratching</b>',
			'Scratcher',
			'Scratched:',
			'Money spent:',
			'Money won:',
			'Profit:',
			'Millions:',
			'Bullets won:',
			'Price per bullet:',
			'Turn off',
			'Turn on',
			'Reset stats',
			'Stats have been reset!'
		],
		bullettracker: [
			'Success, you bought',
			'Success you bought (\\d+) bullets for \\$ (\\d+)',
			'BulletTracker',
			'Bullets bought:',
			'Money spent:',
			'Price per bullet:'
		],
		raidpage: [
			'<b>now</b>',
			'Now!',
			'Spot',
			'Type',
			'Owner',
			'Profit left',
			'Protection',
			'Next raid',
			'Bullets',
			'Driver',
			'Information',
			'Invite',
			'Local Mob'
		],
		lastontime: [
			'Alive',
			'Last on:',
			'ago'
		],
		pokertracker: [
			'Poker Tracker',
			'You have joined the game.',
			'You have called the current bet.',
			'You have raised the bet.',
			'Games played: ',
			'Games won: ',
			'Money spent: ',
			'Money won: ',
			'Profit: ',
			'You have checked the current bet.',
			'You have started a new game.'
		],
		cities: [
			'Detroit',
			'Chicago',
			'Palermo',
			'New York',
			'Las Vegas',
			'Philadelphia',
			'Baltimore',
			'Corleone',
			'NOWHERE'
		],
		killpage: 'All cities',
		myacc: [
			'Are you sure you want to buy a Smith & Wesson .357 Magnum?',
			'Are you sure you want to buy a Tommy Gun?'
		],
		busttracker: [
			'You busted this person out of jail',
			'You busted this person out of jail & his/her cellmate out of jail'
		],
		slottracker: [
			'Congratulations',
			'You Win \\$(\\d+)',
			'Bummer',
			'Congratulations! You won \\$(\\d+)',
			'YOU WON THE JACKPOT!!'
		],
		crimetracker: [
			'Well done! You made',
			'Well done! You made \\$ (\\d+) from your crime.'
		]
	},
	dm: {
		version: '_dm',
		prefslink: '/prefs.php?v=dm',
		priceslink: '/prices.php?v=dm',
		contactlink: '/contact.php?v=dm',
		polllink: '/html/poll/poll.php?v=dm',
		statslink: 'http://rix.omertabeyond.com/stats.php?v=dm&d=n',
		status: [
			'none',
			'None'
		],
		wrongcode: 'The code you',
		failedBullets: [
			'You may only buy 500 bullets.',
			'The price per bullet just changed, so if you really want those bullets, fill in the form again',
			'This factory doesn\'t have that many bullets.<br><br>The price of bullets may also have changed RIGHT NOW, please try again.3',
			'You cant buy a negative amount of bullets',
			'The code you verified didn\'t match the image code. The image code only contains lower case and numeric characters',
			'You don\'t have enough cash to make this deal.',//5
			'You may only buy 1,000 bullets.'
		],
		garage: 'Type',
		race: 'You\'re still tired from your last race',
		profile: [
			'Marital status:',
			'SMS Status',
			'Family Buster of',
			'Dead',
			' History'
		],
		wealth: [
			'Straydog',
			'Poor',
			'Nouveau Riche',
			'Very rich',
			'Too rich to be true',
			'Richer than God',
			'Rich'
		],
		driver: [
			'Rookie',
			'Co-Driver',
			'Driver',
			'Advanced Driver',
			'Master Driver',
			'Chauffeur',
			'Advanced Chauffeur',
			'Master Chauffeur',
			'Racing Driver',
			'Race Supremo',
			'Champion'
		],
		friends: 'Friends:',
		bank: 'You cannot transfer less than 100 dollars',
		smuggling: [
			'Pocket: ',
			'Booze',
			'Narcs',
			'Current Booze/Narcotics Prices',
			'All Prices',
			'Both'
		],
		obay: [
			'Pack of bullets',
			'bullets',
			'Bet'
		],
		inbox: [
			'Notification',
			'(Admin message)',
			'inviting',
			'explosives',
			'driver',
			'weapon',
			'Re: Bustout!,Re: Bailed!,Bustout!,Bailed!'
		],
		linkify: [
			'Route 66 heist',
			'Organised Crime',
			'Mega Organized Crime',
			'Target not found',
			'Carrace invite',
			'Target found',
			'Kill success',
			'Witness statement',
			'Condolences',
			'found',
			'Ticket update',
			'Crashed Message',
			'Invitation',
			'Raid Notification',
			'Married',
			'Wedding Gift',
			'Wedding'
		],
		NR: {
			misc: [
				' Loading info..',
				'Family:',
				'Nickreader enabled',
				'.Clicklimit, please try again..',
				'.Wait for the previous..'
			],
			positions: 'Don of,Capo of:,Sottocapo of:,Consiglieri of:',
			objects: 'Blackjack:,Roulette:,Bulletfactory:,Numbers Game:,Slotmachine:,Punto Banco:,Bookmaker office:',
			properties: 'User:,Rank:,Honor points:,Status,Wealth',
			error: 'Could not load page.'
		},
		BR: [
			'Best Run Calculator',
			'City',
			'Booze',
			'Narc',
			'Profit',
			'You are in ',
			'You can\'t fly to ',
			'You won\'t make any profit in ',
			'Auto-Fill',
			'Can\'t find any data about Rank, Plane and Family position. Please visit your status and profile pages to fix this!',
			'NOW'
		],
		narcs: [
			'NO NARCS',
			'Morphine',
			'Marijuana',
			'Glue',
			'Heroin',
			'Opium',
			'Cocaine',
			'Tabacco'
		],
		booze: [
			'NO BOOZE',
			'Wine',
			'Beer',
			'Rum',
			'Cognac',
			'Whiskey',
			'Amaretto',
			'Port'
		],
		scratcher: [
			'<b>Congratulations!</b>',
			'bullets<br>They have been added to your account!<br>',
			'won (\\d+) bullets',
			'<br>It has been added to your account!<br>',
			'You have won \\$ (\\d+)',
			'<b>Start scratching</b>',
			'Scratcher',
			'Scratched:',
			'Money spent:',
			'Money won:',
			'Profit:',
			'Millions:',
			'Bullets won:',
			'Price per bullet:',
			'Turn off',
			'Turn on',
			'Reset stats',
			'Stats have been reset!'
		],
		bullettracker: [
			'Success, you bought',
			'Success you bought (\\d+) bullets for \\$ (\\d+)',
			'BulletTracker',
			'Bullets bought:',
			'Money spent:',
			'Price per bullet:'
		],
		raidpage: [
			'<b>now</b>',
			'Now!',
			'Spot',
			'Type',
			'Owner',
			'Profit left',
			'Protection',
			'Next raid',
			'Bullets',
			'Driver',
			'Information',
			'Invite',
			'Local Mob'
		],
		lastontime: [
			'Alive',
			'Last on:',
			'ago'
		],
		pokertracker: [
			'Poker Tracker',
			'You have joined the game.',
			'You have called the current bet.',
			'You have raised the bet.',
			'Games played: ',
			'Games won: ',
			'Money spent: ',
			'Money won: ',
			'Profit: ',
			'You have checked the current bet.',
			'You have started a new game.'
		],
		cities: [
			'Detroit',
			'Chicago',
			'Palermo',
			'New York',
			'Las Vegas',
			'Philadelphia',
			'Baltimore',
			'Corleone',
			'NOWHERE'
		],
		killpage: 'All cities',
		myacc: [
			'Are you sure you want to buy a Smith & Wesson .357 Magnum?',
			'Are you sure you want to buy a Tommy Gun?'
		],
		busttracker: [
			'You busted this person out of jail',
			'You busted this person out of jail & his/her cellmate out of jail'
		],
		slottracker: [
			'Congratulations',
			'You Win \\$(\\d+)',
			'Bummer',
			'Congratulations! You won \\$(\\d+)',
			'YOU WON THE JACKPOT!!'
		],
		crimetracker: [
			'Well done! You made',
			'Well done! You made \\$ (\\d+) from your crime.'
		]
	},
	nl: {
		version: '_nl',
		prefslink: '/prefs.php?v=nl',
		priceslink: '/prices.php?v=nl',
		contactlink: '/contact.php?v=nl',
		polllink: '/html/poll/poll.php?v=nl',
		statslink: 'http://rix.omertabeyond.com/stats.php?v=nl&d=n',
		status: [
			'none',
			'Geen'
		],
		wrongcode: 'De code die',
		failedBullets: [
			'You may only buy 500 bullets.',
			'De prijs per kogel is net veranderd, als je de kogels echt wilt hebben, vul dan de velden opnieuw in.',
			'Deze fabriek heeft niet zoveel kogels.<br><br>De prijs van de kogels kan ook NU veranderd zijn, probeer het opnieuw.3',
			'Je kunt geen negatief aantal kogels kopen',
			'De code die je invoerde kwam niet overeen met die van de afbeelding. De code bevat alleen kleine letters en cijfers.',
			'Je hebt niet genoeg geld voor deze deal.',//5
			'You may only buy 1,000 bullets.'
		],
		garage: 'Type',
		race: 'Je bent nog moe van je vorige race',
		profile: [
			'Burgerlijke staat:',
			'SMS Status',
			'Familie Uitbreker van',
			'Dood',
			' Geschiedenis'
		],
		wealth: [
			'Sloeber',
			'Arm',
			'Modaal',
			'Erg rijk',
			'Te rijk om waar te zijn',
			'Rijker dan God',
			'Rijk'
		],
		driver: [
			'Nieuweling',
			'Bijrijder',
			'Bestuurder',
			'Ervaren bestuurder',
			'Perfecte bestuurder',
			'Chauffeur',
			'Ervaren chauffeur',
			'Sublieme chauffeur',
			'Racer',
			'Coureur',
			'Kampioen'
		],
		friends: 'Vrienden:',
		bank: 'Je kunt niet minder dan 100 dollar versturen',
		smuggling: [
			'Zak: ',
			'Drank',
			'Drugs',
			'Huidige Drank/Drugs Prijzen',
			'Alle Prijzen',
			'Beide'
		],
		obay: [
			'Pak met kogels',
			'kogels',
			'Bied'
		],
		inbox: [
			'Mededeling',
			'(Admin bericht)',
			'jou',
			'explosieven',
			'bestuurder',
			'wapen',
			'Re: Uitgebroken!,Re: Uitgekocht!,Uitgebroken!,Uitgekocht!'
		],
		linkify: [
			'Route 66 overval',
			'Georganiseerde Misdaad',
			'Mega Georganiseerde Misdaad',
			'Doelwit niet gevonden',
			'Autorace uitnodiging',
			'Doelwit gevonden',
			'Moord geslaagd',
			'Getuigenverklaring',
			'Condoleances',
			'hebben',
			'Ticket update',
			'Crashed Message',
			'Uitnodiging',
			'Raid Notification',
			'Married',
			'Wedding Gift',
			'Wedding'
		],
		NR: {
			misc: [
				'Info laden..',
				'Familie:',
				'Nicklezer actief',
				'.Kliklimiet, probeer nogmaals..',
				'.Wacht op de vorige..'
			],
			positions: 'Don van:,Capo van:,Sottocapo van:,Consiglieri van:',
			objects: 'Blackjack:,Roulette:,Kogelfabriek:,Nummerspel:,Fruitmachine:,Punto Banco:,Wedkantoor:',
			properties: 'Gebruiker:,Rang:,Eerpunten:,Status,Vermogen',
			error: 'Kan de pagina niet laden.'
		},
		BR: [
			'Beste Deal Calculator',
			'Stad',
			'Drank',
			'Drugs',
			'Winst',
			'Je bent in ',
			'Je kan niet vliegen naar ',
			'Je zal geen winst maken in ',
			'Auto-Invullen',
			'Er is geen data van Rank, Vliegtuig en Familiepositie. Bekijk je status en profiel pagina\'s om dit te verhelpen!',
			'NU'
		],
		narcs: [
			'GEEN DRUGS',
			'Morfine',
			'Marihuana',
			'Lijm',
			'Hero&#239;ne',
			'Opium',
			'Coca&#239;ne',
			'Tabak'
		],
		booze: [
			'GEEN DRANK',
			'Wijn',
			'Bier',
			'Rum',
			'Cognac',
			'Whiskey',
			'Amaretto',
			'Port'
		],
		scratcher: [
			'<b>Gefeliciteerd!</b>',
			'Kogels<br>Ze zijn toegevoegd aan jouw account!<br>',
			'gewonnen (\\d+) Kogels',
			'<br>Het is toegevoegd aan je account!<br>',
			'Je hebt gewonnen \\$ (\\d+)',
			'<b>Start met krassen!</b>',
			'Krasser',
			'Gekrast:',
			'Geld uitgegeven:',
			'Geld gewonnen:',
			'Winst:',
			'Miljoenen:',
			'Gewonnen kogels:',
			'Prijs per kogel:',
			'Zet uit',
			'Zet aan',
			'Reset stats',
			'Stats gereset!'
		],
		bullettracker: [
			'Succes, je kocht',
			'Succes je kocht (\\d+) kogels voor \\$ (\\d+)',
			'KogelVolger',
			'Gekochtte kogels:',
			'Geld uitgegeven:',
			'Prijs per kogel:'
		],
		raidpage: [
			'<b>nu</b>',
			'Nu!',
			'Spot',
			'Type',
			'Eigenaar',
			'Winst over',
			'Bescherming',
			'Next raid',
			'Kogels',
			'Bestuurder',
			'Gegevens',
			'Verstuur',
			'Lokale bende'
		],
		lastontime: [
			'Levend',
			'Laatst on:',
			'geleden'
		],
		pokertracker: [
			'Poker Volger',
			'Je doet nu mee aan het spel.',
			'Je hebt de huidige inzet gecalled.',
			'Je hebt de inzet verhoogd.',
			'Potjes gespeeld:',
			'Potjes gewonnen:',
			'Geld uitgegeven:',
			'Geld gewonnen:',
			'Winst:',
			'Je hebt de huidige inzet gecalled.',
			'Je hebt een nieuw spel gestart.'
		],
		killpage: 'Alle steden',
		myacc: [
			'Weet je zeker dat je een Smith & Wesson .357 Magnum wilt kopen?',
			'Weet je zeker dat je een Tommy Gun wilt kopen?'
		],
		busttracker: [
			'Je hebt deze gangster uit de gevangenis gebroken.',
			'Je hebt deze persoon en zijn celmaat uit de gevangenis gebroken'
		],
		slottracker: [
			'Gefeliciteerd',
			'Je Wint \\$(\\d+)',
			'Helaas',
			'Gefeliciteerd! Je wint \\$(\\d+)',
			'YOU WON THE JACKPOT!!'//needs nl text
		],
		crimetracker: [
			'Goed gedaan! Je hebt',
			'Goed gedaan! Je hebt \\$ (\\d+) gekregen van je misdaad.'
		]
	},
	tr: {
		version: '_tr',
		prefslink: '/prefs.php?v=tr',
		priceslink: '/prices.php?v=tr',
		contactlink: '/contact.php?v=tr',
		polllink: '/html/poll/poll.php?v=tr',
		statslink: '',
		status: [
			'none',
			'None'
		],
		wrongcode: 'The code you',
		failedBullets: [
			'You may only buy 500 bullets.',
			'The price per bullet just changed, so if you really want those bullets, fill in the form again',
			'This factory doesn\'t have that many bullets.<br><br>The price of bullets may also have changed RIGHT NOW, please try again.3',
			'You cant buy a negative amount of bullets',
			'The code you verified didn\'t match the image code. The image code only contains lower case and numeric characters',
			'You don\'t have enough cash to make this deal.',//5
			'You may only buy 1,000 bullets.'
		],
		garage: 'Type',
		race: 'You\'re still tired from your last race',
		profile: [
			'Marital status:',
			'SMS Status',
			'Family Buster of',
			'Dead',
			' History'
		],
		wealth: [
			'Straydog',
			'Poor',
			'Nouveau Riche',
			'Very rich',
			'Too rich to be true',
			'Richer than God',
			'Rich'
		],
		driver: [
			'Rookie',
			'Co-Driver',
			'Driver',
			'Advanced Driver',
			'Master Driver',
			'Chauffeur',
			'Advanced Chauffeur',
			'Master Chauffeur',
			'Racing Driver',
			'Race Supremo',
			'Champion'
		],
		friends: 'Friends:',
		bank: 'You cannot transfer less than 100 dollars',
		smuggling: [
			'Pocket: ',
			'Booze',
			'Narcs',
			'Current Booze/Narcotics Prices',
			'All Prices',
			'Both'
		],
		obay: [
			'Pack of bullets',
			'bullets',
			'Bet'
		],
		inbox: [
			'Notification',
			'(Admin message)',
			'inviting',
			'explosives',
			'driver',
			'weapon',
			'Re: Bustout!,Re: Bailed!,Bustout!,Bailed!'
		],
		linkify: [
			'Route 66 heist',
			'Organised Crime',
			'Mega Organized Crime',
			'Target not found',
			'Carrace invite',
			'Target found',
			'Kill success',
			'Witness statement',
			'Condolences',
			'found',
			'Ticket update',
			'Crashed Message',
			'Invitation',
			'Raid Notification',
			'Married',
			'Wedding Gift',
			'Wedding'
		],
		NR: {
			misc: [
				' Loading info..',
				'Family:',
				'Nickreader enabled',
				'.Clicklimit, please try again..',
				'.Wait for the previous..'
			],
			positions: 'Don of,Capo of:,Sottocapo of:,Consiglieri of:',
			objects: 'Blackjack:,Roulette:,Bulletfactory:,Numbers Game:,Slotmachine:,Punto Banco:,Bookmaker office:',
			properties: 'User:,Rank:,Honor points:,Status,Wealth',
			error: 'Could not load page.'
		},
		BR: [
			'Best Run Calculator',
			'City',
			'Booze',
			'Narc',
			'Profit',
			'You are in ',
			'You can\'t fly to ',
			'You won\'t make any profit in ',
			'Auto-Fill',
			'Can\'t find any data about Rank, Plane and Family position. Please visit your status and profile pages to fix this!',
			'NOW'
		],
		narcs: [
			'NO NARCS',
			'Morphine',
			'Marijuana',
			'Glue',
			'Heroin',
			'Opium',
			'Cocaine',
			'Tabacco'
		],
		booze: [
			'NO BOOZE',
			'Wine',
			'Beer',
			'Rum',
			'Cognac',
			'Whiskey',
			'Amaretto',
			'Port'
		],
		scratcher: [
			'<b>Congratulations!</b>',
			'bullets<br>They have been added to your account!<br>',
			'won (\\d+) bullets',
			'<br>It has been added to your account!<br>',
			'You have won \\$ (\\d+)',
			'<b>Start scratching</b>',
			'Scratcher',
			'Scratched:',
			'Money spent:',
			'Money won:',
			'Profit:',
			'Millions:',
			'Bullets won:',
			'Price per bullet:',
			'Turn off',
			'Turn on',
			'Reset stats',
			'Stats have been reset!'
		],
		bullettracker: [
			'Success, you bought',
			'Success you bought (\\d+) bullets for \\$ (\\d+)',
			'BulletTracker',
			'Bullets bought:',
			'Money spent:',
			'Price per bullet:'
		],
		raidpage: [
			'<b>now</b>',
			'Now!',
			'Spot',
			'Type',
			'Owner',
			'Profit left',
			'Protection',
			'Next raid',
			'Bullets',
			'Driver',
			'Information',
			'Invite',
			'Local Mob'
		],
		lastontime: [
			'Alive',
			'Last on:',
			'ago'
		],
		pokertracker: [
			'Poker Tracker',
			'You have joined the game.',
			'You have called the current bet.',
			'You have raised the bet.',
			'Games played: ',
			'Games won: ',
			'Money spent: ',
			'Money won: ',
			'Profit: ',
			'You have checked the current bet.',
			'You have started a new game.'
		],
		cities: [
			'Detroit',
			'Chicago',
			'Palermo',
			'New York',
			'Las Vegas',
			'Philadelphia',
			'Baltimore',
			'Corleone',
			'NOWHERE'
		],
		killpage: 'All cities',
		myacc: [
			'Are you sure you want to buy a Smith & Wesson .357 Magnum?',
			'Are you sure you want to buy a Tommy Gun?'
		],
		busttracker: [
			'You busted this person out of jail',
			'You busted this person out of jail & his/her cellmate out of jail'
		],
		slottracker: [
			'Congratulations',
			'You Win \\$(\\d+)',
			'Bummer',
			'Congratulations! You won \\$(\\d+)',
			'YOU WON THE JACKPOT!!'
		],
		crimetracker: [
			'Well done! You made',
			'Well done! You made \\$ (\\d+) from your crime.'
		]
	}
};
