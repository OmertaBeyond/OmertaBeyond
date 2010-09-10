/*
	This file contains the language array we use for Project Omerta Beyond

	Don't change anything unless you know what are you doing.
	Language arrays needed for multilingual OB

	Version: 1.9.3.80

	$Rev$:  Revision of last commit
	$Author$:  Author of last commit
	$Date$:  Date of last commit
*/

// Get language vars.
var langs = {
	en: {
		prefsname: 'Preferences',
		menuitem: ['OB Poll', 'Contact Form', 'Beyond FAQ', 'B/N Prices', 'Live famstats', 'Daily famstats'],
		prefs: [
			'Disable the "go for it" button until the image code entered is the correct length',//0 - CRIMES/CARS
			'Cocaine prices in the marquee',//1 - SMUGGLING/PRICES
			'Fingon\'s News in the info menu',//2 - FINGON
			'Jail Highlighter, auto-form and hotkeys',//3 - JAIL/BUSTING
			'Enable hotkeys (Smuggling)',//4 - SMUGGLING/PRICES
			'Add "000" and "000000" when pressing k/m at bank amounts',//5 - MISC
			'Remove Jailbusting Skill bar',//6 - CLEAN-UP
			'Return to bullets page after failed bullet buy',//7 - OTHER AFs
			'Auto-form crimes/car nicks',//8 - CRIMES/CARS
			'1-Click Vote',//9 - MISC
			'Refresh crimes/car nick page after waiting time is over',//10 - CRIMES/CARS
			'Return to page after wrong image code',//11 - MISC
			'Remove Capo Money texts (Non Capo users only)',//12 - CLEAN-UP
			'Detailed Familypage',//13 - MISC
			'Remove "Kill password not set" messages',//14 - CLEAN-UP
			'Extra links on user profiles',//15 - MISC
			'Enable Nickreader (hold \'Alt\' or switch on/off with \'Ctrl\')',//16 - MISC
			'Extra prices popup in marquee',//17 - SMUGGLING/PRICES
			'Remove blue profit calculations in CD-mode',//18 - CLEAN-UP
			'Disable Avatars on forum and on friend\'s list on profile page',//19 - CLEAN-UP
			'Clean login page',//20 - CLEAN-UP
			'Add highlights @ prices page',//21 - SMUGGLING/PRICES
			'Remove Race form bar',//22 - CLEAN-UP
			'Return to jail page after failure',//23 - JAIL/BUSTING
			'Enable Garage Car Highlighting',//24 - CRIMES/CARS
			'Auto-form Bullets',//25 - OTHER AFs
			'Auto-form Group Crimes',//26 (heist, oc, moc) - OTHER AFs
			'Auto-form Bloodbank',//27 - OTHER AFs
			'Auto-form Smuggling',//28 - SMUGGLING/PRICES
			'Auto-form Races',//29 - OTHER AFs
			'Remove "Recent forum posts" from user profile page',//30 - CLEAN-UP
			'Add Hotkeys to Inbox',//31 - MISC
			'Enable Scratcher',//32 - OTHER AFs, obsolete
			'Enable Trackers (Bullet, Poker, Scratching, BJ)',//33 - MISC
			'Tidy Spot raid page',//34 - UI Extras
			'Show crimestats and carstats on status page',//35 - CRIMES/CARS
			'Show Bodyguard Overview on BG\'s page',//36 UI EXTRAS
		],
		prefsTitle: [ //describe the options
			'You cant press the &quot;go for it&quot; button before you filled in a 3 character code',//0
			'Shows the cocaine prices for every city in the upper bar (with color highlight for low and high)',//1
			'Instead of the Omerta forums in the latest news (on the right side) you have latest articles from fingon',//2
			'Enables the jail highlight for busting list, friends and family, it auto-selects them according to priority and it enables the buy out hotkeys',//3
			'Enables the hotkeys for booze/narcs/both and for the auto-fill mode you choose (best/CD/RP/none)',//4
			'While in bank, don\'t get confused with the amount of zero\'s use the k and m keys to literally add thousands and millions',//5
			'Removes the jailbusting skill bar from your account page',//6
			'If you don\'t get the bullets on first try, it auto-refreshes the bullet page',//7
			'Auto-selects the best option for crimes and nick a car',//8
			'This option will allow you to open all the sites you can vote on (on "vote for Omerta") with just 1 click',//9
			'If you click on crimes/nick a car, but you still have waiting time on it, page will be refreshed after the waiting time is over',//10
			'Returns to the page you were on after entering the wrong code',//11
			'Removes the capo profit text from your account page',//12
			'You see the tops/capos/object holders in different colors, and with a letter next to the name that shows what they are',//13
			'Remove semi annoying text that you didn\'t enable kill password',//14
			'You get an extra line on users profile, with links for heisting or raiding with that person, setting him mentor, or hire detectives on him',//15
			'You get info from a users profile when you mouse-over his name (ex. in jail)',//16
			'If you put your mouse over the cities in the marquee, you get the prices for other b/n (the ones most used in b/n runs)',//17
			'Want to save room on your screen and maybe actually see the image code at once? Remove the calculation text',//18
			'While on Omerta forum or profile page you wont see users avatars anymore',//19
			'Clean up login page',//20
			'Adds coloring with green (low) and red (high) on the prices page',//21
			'Removes the race form progress bar from your account page',//22
			'Returns to jail page after your jail time is over',//23
			'Highlights the cars in your garage in different shades of grey, depending on the use for that car (heist/oc/moc)',//24
			'Auto-fills in the maximum amount of bullets you can buy, according to the number of bullets in the bullet factory and the amount of money in your pocket',//25
			'Auto fills in the bullets, gun etc you need to do a heist, oc or moc',//26
			'Auto-fills the amount of blood you can buy until 100%, using the cheapest type of blood you can buy',//27
			'Auto fills in the max amount of booze/narcs/both you can carry, enables the best run calculator filling and also allows you to click the type of b/n you want to fill in the max amount',//28
			'Sets focus on editbox and adds link to inbox after finished race',//29
			'Remove \"Recent Posts\" from user\'s profile.',//30
			'Enables you to open messages, reply instantly or to delete a message using hotkeys',//31
			'Show the Scratcher Panel with stats on the Scratch&Win page',//32, obsolete
			'Keep track of how many bullets you have bought, how many pokergames you played or how many cards you have scratched',//33
			'Get a clear overview of the Spot raid page so you can pick your target with more ease',//34
			'Show the amount of crimes which were successfull and the amount of cars stolen, plus the total profit from both',//35
			'A nice overview of all your bodyguards and their trained levels, including totals'//36
		],
		maxprefs: 37, // 1 + last pref #
		preftitles: [
			'Crimes/Car Nicks',//0
			'Smuggling and Booze/Narc Prices',//1
			'Jail/Busting',//2
			'Other Auto-formers',//3
			'Clean-up',//4
			'Fingon\'s News',//5
			'Interface Extras'//6
		],
		prefsPage: [
			'Check for update',
			'Check all',
			'Update'
		],
		jhl: [
			'Busting List and Options',
			'Family or Ingame nick',
			'Color',
			'Priority',
			'More',
			'Less',
			'Save!',
			'Swines, Beggars \'n Fools who don\'t deserve my busting',
			'Adding via profiles',
			'Jailpage Settings',
			'Default Priority',
			'Default Color',
			'Maximum length highlight list',
			'Buy out Hotkey when in jail',
			'Friend List Priority',
			'Family Priority',
			'If someone in jail is higher than one of the settings he/she will be highlighted with the color of the lowest priority number</span><br />The default priority number for friends is: <b>3</b> and for family is: <b>9</b><br />The default priority and color are used when automatically adding users to list<br />The lowest and default priority for anyone in jail is <b>10</b>',
			'Go up',
			'Go down',
			'Random'
		],
		marquee: [
			'Are you sure you want to travel to ',
			'All Prices',
			'Coke at: ',
			'You are already staying in this city!'
		],
		newmenu: 'Detected new menu content! Please update your preferences.\nThis includes the menu AND the hotkey preferences!',
		cusmenu: [
			'Are you sure you want to reset your custom menu?',
			' settings updated! Returning to normal menu..<br /><br />Click <a href="javascript:location.href=\'menu.php\'">here</a> if this stays longer then 3 seconds',
			'You\'re already using that key!'
		],
		login: ['Register', 'http://www.fingon.be', 'Fingon\'s'],
		status: ['none', 'None', 'succesfull', 'Money from crimes', 'crime', 'Worth all stolen cars', 'car', 'Interest', 'in', 'Now!'],
		wrongcode: ['The code you', '<br><center><b>Learn to type, analphabetic!</b><br><br><a href="javascript:history.back()">Click here to go back or wait a second</a></center>'],
		failedBullets: [
			'You may only buy 500 bullets.',
			'The price per bullet just changed, so if you really want those bullets, fill in the form again',
			'This factory doesn\'t have that many bullets.<br><br>The price of bullets may also have changed RIGHT NOW, please try again.3',
			'You cant buy a negative amount of bullets',
			'The code you verified didn\'t match the image code. The image code only contains lower case and numeric characters',
			'You don\'t have enough cash to make this deal.'
		],
		garage: 'Type',
		race: 'You\'re still tired from your last race',
		profile: ['Marital status:', 'SMS Status', 'Family Buster of', 'Dead', ' History'],
		wealth: ['Straydog', 'Poor', 'Nouveau Riche', 'Very rich', 'Too rich to be true', 'Richer than God', 'Rich'],
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
		stats: ['back to top', ['Dead Fams', 'Honoured', 'CDCT', 'Fams', 'BF', 'Roul', 'NS', 'Slots', 'BJ', 'Bookies', 'PB']],
		bank: 'You cannot transfer less than 100 dollars',
		smuggling: ['Pocket: ', 'Booze', 'Narcs', 'Current Booze/Narcotics Prices', 'All Prices', 'Both'],
		obay: ['Pack of bullets','bullets'],
		inbox: ['Notification', '(Admin message)', 'inviting', 'explosives', 'driver', 'weapon', 'Re: Bustout!,Re: Bailed!,Bustout!,Bailed!'],
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
		title: 'Omerta (COM)',
		menutitle: [
			'Preferences page where you can change most of our options',
			'Place where we ask our users some questions',
			'Here you can send us your ideas or found bugs',
			'List of frequently asked questions',
			'Omerta prices with little flavor of ours :P',
			'Live Family stats based by Rix\'s calculation.',
			'Latest family stats based by Fingon\'s calculation'
		],
		NR: {
			misc: [' Loading info..', 'Family:', 'Nickreader enabled', '.Clicklimit, please try again..', '.Wait for the previous..'],
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
		narcs: ['NO NARCS', 'Morphine', 'Marijuana', 'Glue', 'Heroin', 'Opium', 'Cocaine', 'Tabacco'],
		booze: ['NO BOOZE', 'Wine', 'Beer', 'Rum', 'Cognac', 'Whiskey', 'Amaretto', 'Port'],
		oneclick: [
			'You haven\'t used the 1-click voter yet!\nDo you want to use it now?\n',
			'You can\'t vote again yet!\nPlease wait another:\n',
			' hours, ',
			' minutes, and ',
			' seconds.\n',
			'You haven\'t used the 1-click voter today!\n',
			' days, ',
			'Do you want to use the 1-click voter now?',
			'Since you last used the 1-click voter, it\'s been: \n',
			'Do you still want to vote?'
		],
		scratcher: [
			'<b>Congratulations!</b>',
			'bullets<br>They have been added to your account!<br>',
			'won (\\d+) bullets',
			'<br>It has been added to your account!<br>',
			'You have won \\$ (\\d+)',
			'<b>Start scratching</b>',
			'ScratchTracker',
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
			'Stats have been reset!',
			'Sorry, but 10 per minute is enough.',
			'Go back to the main Scratch&Win page.'
		],
		bullettracker: [
			'Success, you bought',
			'Success you bought (\\d+) bullets for \\$ (\\d+)',
			'BulletTracker',
			'Bullets bought:',
			'Money spent:',
			'Price per bullet:'
		],
		crimetracker: ['Success you made', 'Success you made \\$ (\\d+) out of it'],
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
			'Local Mob',
			'Car Lot (Thunderbolt)',
			'Car Lot (Avus)',
			'Car Lot (Spyder)',
			'Whiskey Stills',
			'Farm (Marijuana)',
			'Farm (Beer)',
			'Docks (Heroin)',
			'Docks (Cognac)',
			'Factory',
			'Scrapyard',
			'Bar',
			'Restaurant',
			'Army Surplus Store',
			'Lawyers Office',
		],
		lastontime: [
			'Alive',
			'Last on:',
			'ago',
			'This user has not been seen online by our logger yet'
		],
		pokertracker: [
			'PokerTracker',
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
		bjtracker: [
			'BJ Tracker',
			'Play again',
			'User 1: You won',
			'User 1: You lost',
			'User 1: You played even',
			'User 1: Blackjack!!',//5
			'Insurance Set',
			'Dealer had a black jack',
			'Blackjacks',
			'Games tie: ',
			'Bet:',//10
			'User 1: You won you got your bet of \\$(\\d+) back',
			'User 1: You lost your bet of \\$(\\d+) was taken by the casino',
			'User 1: You played even so you got your bet of \\$(\\d+) back',
			'You<b> 2 :</b>',
			'User 2: You won',//15
			'User 2: You lost',
			'User 2: You played even',
			'User 2: You won you got your bet of \\$(\\d+) back',
			'User 2: You lost your bet of \\$(\\d+) was taken by the casino',
			'User 2: You played even so you got your bet of \\$(\\d+) back'//20
		],
		bgov: [
			'Bodyguards overview',
			'Name',
			'ID',
			'Level',
			'Attack',
			'Defense',
			'Special',
			'Costs',
			'Total',
			'att',
			'def',
			'trained'
		],
		cities: ['Detroit', 'Chicago', 'Palermo', 'New York', 'Las Vegas', 'Philadelphia', 'Baltimore', 'Corleone', 'NOWHERE'],
		killpage: 'All cities',
		myacc: ['Are you sure you want to buy a Smith & Wesson .357 Magnum?', 'Are you sure you want to buy a Tommy Gun?'],
		busttracker: ['You busted this person out of jail', 'You busted this person & his/her cellmate out of jail', 'You busted yourself out of jail'],
		accept: 'Accept'
	},
	dm: {
		prefsname: 'Preferences',
		menuitem: ['OB Poll', 'Contact Form', 'Beyond FAQ', 'B/N Prices', 'Live famstats', 'Daily famstats'],
		prefs: [
			'Disable the "go for it" button for too short image code',//0 - CRIMES/CARS
			'Cocaine prices in the marquee',//1 - SMUGGLING/PRICES
			'Fingon\'s News in the info menu',//2 - FINGON
			'Jail Highlighter, auto-form and hotkeys',//3 - JAIL/BUSTING
			'Enable hotkeys (Smuggling)',//4 - SMUGGLING/PRICES
			'Add "000" and "000000" when pressing k/m at bank amounts',//5 - MISC
			'Remove Jailbusting Skill bar',//6 - CLEAN-UP
			'Return to bullets page after failed bullet buy',//7 - OTHER AFs
			'Auto-form crimes/car nicks',//8 - CRIMES/CARS
			'1-Click Vote',//9 - MISC
			'Refresh crimes/car nick page after waiting time is over',//10 - CRIMES/CARS
			'Return to page after wrong image code',//11 - MISC
			'Remove Capo Money texts (Non Capo users only)',//12 - CLEAN-UP
			'Detailed Familypage',//13 - MISC
			'Remove "Kill password not set" messages',//14 - CLEAN-UP
			'Extra links on user profiles',//15 - MISC
			'Enable Nickreader (hold \'Alt\' or switch on/off with \'Ctrl\')',//16 - MISC
			'Extra prices popup in marquee',//17 - SMUGGLING/PRICES
			'Remove blue profit calculations in CD-mode',//18 - CLEAN-UP
			'Disable Avatars on forum and on friend\'s list on profile page',//19 - CLEAN-UP
			'Clean login page',//20 - CLEAN-UP
			'Add highlights @ prices page',//21 - SMUGGLING/PRICES
			'Remove Race form bar',//22 - CLEAN-UP
			'Return to jail page after failure',//23 - JAIL/BUSTING
			'Enable Garage Car Highlighting',//24 - CRIMES/CARS
			'Auto-form Bullets',//25 - OTHER AFs
			'Auto-form Group Crimes',//26 (heist, oc, moc) - OTHER AFs
			'Auto-form Bloodbank',//27 - OTHER AFs
			'Auto-form Smuggling',//28 - SMUGGLING/PRICES
			'Auto-form Races',//29 - OTHER AFs
			'Remove "Recent forum posts" from user profile page',//30 - CLEAN-UP
			'Add Hotkeys to Inbox',//31 - MISC
			'Enable Scratcher',//32 - OTHER AFs
			'Enable Trackers (Bullet, Poker, Scratching, BJ)',//33 - MISC
			'Tidy Spot raid page',//34 - UI Extras
			'Show crimestats and carstats on status page',//35 - CRIMES/CARS
			'Show Bodyguard Overview on BG\'s page'//36 UI EXTRAS
		],
		prefsTitle: [ //describe the options
			'Disable the "go for it" button until the image code entered is the correct length',//0
			'Shows the cocaine prices for every city in the upper bar (with color highlight for low and high)',//1
			'Instead of the Omerta forums in the latest news (on the right side) you have latest articles from fingon',//2
			'Enables the jail highlight for busting list, friends and family, it auto-selects them according to priority and it enables the buy out hotkeys',//3
			'Enables the hotkeys for booze/narcs/both and for the auto-fill mode you choose (best/CD/RP/none)',//4
			'While in bank, don\'t get confused with the amount of zero\'s use the k and m keys to literally add thousands and millions',//5
			'Removes the jailbusting skill bar from your account page',//6
			'If you don\'t get the bullets on first try, it auto-refreshes the bullet page',//7
			'Auto-selects the best option for crimes and nick a car',//8
			'This option will allow you to open all the sites you can vote on (on "vote for Omerta") with just 1 click',//9
			'If you click on crimes/nick a car, but you still have waiting time on it, page will be refreshed after the waiting time is over',//10
			'Returns to the page you were on after entering the wrong code',//11
			'Removes the capo profit text from your account page',//12
			'You see the tops/capos/object holders in different colors, and with a letter next to the name that shows what they are',//13
			'Remove semi annoying text that you didn\'t enable kill password',//14
			'You get an extra line on users profile, with links for heisting or raiding with that person, setting him mentor, or hire detectives on him',//15
			'You get info from a users profile when you mouse-over his name (ex. in jail)',//16
			'If you put your mouse over the cities in the marquee, you get the prices for other b/n (the ones most used in b/n runs)',//17
			'Want to save room on your screen and maybe actually see the image code at once? Remove the calculation text',//18
			'While on Omerta forum or profile page you wont see users avatars anymore',//19
			'Clean up login page',//20
			'Adds coloring with green (low) and red (high) on the prices page',//21
			'Removes the race form progress bar from your account page',//22
			'Returns to jail page after your jail time is over',//23
			'Highlights the cars in your garage in different shades of grey, depending on the use for that car (heist/oc/moc)',//24
			'Auto-fills in the maximum amount of bullets you can buy, according to the number of bullets in the bullet factory and the amount of money in your pocket',//25
			'Auto fills in the bullets, gun etc you need to do a heist, oc or moc',//26
			'Auto-fills the amount of blood you can buy until 100%, using the cheapest type of blood you can buy',//27
			'Auto fills in the max amount of booze/narcs/both you can carry, enables the best run calculator filling and also allows you to click the type of b/n you want to fill in the max amount',//28
			'Sets focus on editbox and adds link to inbox after finished race',//29
			'Remove \"Recent Posts\" from user\'s profile.',//30
			'Enables you to open messages, reply instantly or to delete a message using hotkeys',//31
			'Show the Scratcher Panel with stats on the Scratch&Win page',//32
			'Keep track of how many bullets you have bought, how many pokergames you played or how many cards you have scratched',//33
			'Get a clear overview of the Spot raid page so you can pick your target with more ease',//34
			'Show the amount of crimes which were successfull and the amount of cars stolen, plus the total profit from both',//35
			'A nice overview of all your bodyguards and their trained levels, including totals'//36
		],
		maxprefs: 37, // 1 + last pref #
		preftitles: [
			'Crimes/Car Nicks',//0
			'Smuggling and Booze/Narc Prices',//1
			'Jail/Busting',//2
			'Other Auto-formers',//3
			'Clean-up',//4
			'Fingon\'s News',//5
			'Interface Extras'//6
		],
		prefsPage: [
			'Check for update',
			'Check all',
			'Update'
		],
		jhl: [
			'Busting List and Options',
			'Family or Ingame nick',
			'Color',
			'Priority',
			'More',
			'Less',
			'Save!',
			'Swines, Beggers \'n Fools who don\'t deserve my busting',
			'Adding via profiles',
			'Jailpage Settings',
			'Default Priority',
			'Default Color',
			'Maximum length highlight list',
			'Buy out Hotkey when in jail',
			'Friend List Priority',
			'Family Priority',
			'If someone in jail is higher than one of the settings he/she will be highlighted with the color of the lowest priority number</span><br />The default priority number for friends is: <b>3</b> and for family is: <b>9</b><br />The default priority and color are used when automatically adding users to list<br />The lowest and default priority for anyone in jail is <b>10</b>',
			'Go up',
			'Go down',
			'Random'
		],
		marquee: [
			'Are you sure you want to travel to ',
			'All Prices',
			'Coke at: ',
			'You are already staying in this city!'
		],
		newmenu: 'Detected new menu content! Please update your preferences.\nThis includes the menu AND the hotkey preferences!',
		cusmenu: [
			'Are you sure you want to reset your custom menu?',
			' settings updated! Returning to normal menu..<br /><br />Click <a href="javascript:location.href=\'menu.php\'">here</a> if this stays longer then 3 seconds',
			'You\'re already using that key!'
		],
		customs: ' settings updated! Returning to normal menu..<br><br>Click <a href="javascript:location.href=\'menu.php\'">here</a> if this stays longer then 3 seconds',
		login: ['Register', 'http://www.fingon.be', 'Fingon\'s'],
		status: ['none', 'None', 'succesfull', 'Money from crimes', 'crime', 'Worth all stolen cars', 'car', 'Interest', 'in', 'Now!'],
		wrongcode: ['The code you', '<br><center><b>Learn to type, analphabetic!</b><br><br><a href="javascript:history.back()">Click here to go back or wait a second</a></center>'],
		failedBullets: [
			'You may only buy 500 bullets.',
			'The price per bullet just changed, so if you really want those bullets, fill in the form again',
			'This factory doesn\'t have that many bullets.<br><br>The price of bullets may also have changed RIGHT NOW, please try again.3',
			'You cant buy a negative amount of bullets',
			'The code you verified didn\'t match the image code. The image code only contains lower case and numeric characters',
			'You don\'t have enough cash to make this deal.'
		],
		garage: 'Type',
		race: 'You\'re still tired from your last race',
		profile: ['Marital status:', 'SMS Status', 'Family Buster of', 'Dead', ' History'],
		wealth: ['Straydog', 'Poor', 'Nouveau Riche', 'Very rich', 'Too rich to be true', 'Richer than God', 'Rich'],
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
		stats: ['back to top', ['Dead Fams', 'Honoured', 'CDCT', 'Fams', 'BF', 'Roul', 'NS', 'Slots', 'BJ', 'Bookies', 'PB']],
		bank: 'You cannot transfer less than 100 dollars',
		smuggling: ['Pocket: ', 'Booze', 'Narcs', 'Current Booze/Narcotics Prices', 'All Prices', 'Both'],
		obay: ['Pack of bullets','bullets'],
		inbox: ['Notification', '(Admin message)', 'inviting', 'explosives', 'driver', 'weapon', 'Re: Bustout!,Re: Bailed!,Bustout!,Bailed!'],
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
		title: 'Omerta (DM)',
		menutitle: [
			'Preferences page where you can change most of our options',
			'Place where we ask our users some questions',
			'Here you can send us your ideas or found bugs',
			'List of frequently asked questions',
			'Omerta prices with little flavor of ours :P',
			'Live Family stats based by Rix\'s calculation.',
			'' // DO NOT REMOVE !!
		],
		NR: {
			misc: [' Loading info..', 'Family:', 'Nickreader enabled', '.Clicklimit, please try again..', '.Wait for the previous..'],
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
		narcs: ['NO NARCS', 'Morphine', 'Marijuana', 'Glue', 'Heroin', 'Opium', 'Cocaine', 'Tabacco'],
		booze: ['NO BOOZE', 'Wine', 'Beer', 'Rum', 'Cognac', 'Whiskey', 'Amaretto', 'Port'],
		oneclick: [
			'You haven\'t used the 1-click voter yet!\nDo you want to use it now?\n',
			'You can\'t vote again yet!\nPlease wait another:\n',
			' hours, ',
			' minutes, and ',
			' seconds.\n',
			'You haven\'t used the 1-click voter today!\n',
			' days, ',
			'Do you want to use the 1-click voter now?',
			'Since you last used the 1-click voter, it\'s been: \n',
			'Do you still want to vote?'
		],
		scratcher: [
			'<b>Congratulations!</b>',
			'bullets<br>They have been added to your account!<br>',
			'won (\\d+) bullets',
			'<br>It has been added to your account!<br>',
			'You have won \\$ (\\d+)',
			'<b>Start scratching</b>',
			'ScratchTracker',
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
			'Stats have been reset!',
			'Sorry, but 10 per minute is enough.',
			'Go back to the main Scratch&Win page.'
		],
		bullettracker: [
			'Success, you bought',
			'Success you bought (\\d+) bullets for \\$ (\\d+)',
			'BulletTracker',
			'Bullets bought:',
			'Money spent:',
			'Price per bullet:'
		],
		crimetracker: ['Success you made', 'Success you made \\$ (\\d+) out of it'],
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
			'Local Mob',
			'Car Lot (Thunderbolt)',
			'Car Lot (Avus)',
			'Car Lot (Spyder)',
			'Whiskey Stills',
			'Farm (Marijuana)',
			'Farm (Beer)',
			'Docks (Heroin)',
			'Docks (Cognac)',
			'Factory',
			'Scrapyard',
			'Bar',
			'Restaurant',
			'Army Surplus Store',
			'Lawyers Office',
		],
		lastontime: [
			'Alive',
			'Last on:',
			'ago',
			'This user has not been seen online by our logger yet'
		],
		pokertracker: [
			'PokerTracker',
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
		bjtracker: [
			'BJ Tracker',
			'Play again',
			'User 1: You won',
			'User 1: You lost',
			'User 1: You played even',
			'User 1: Blackjack!!',//5
			'Insurance Set',
			'Dealer had a black jack',
			'Blackjacks',
			'Games tie: ',
			'Bet:',//10
			'User 1: You won you got your bet of \\$(\\d+) back',
			'User 1: You lost your bet of \\$(\\d+) was taken by the casino',
			'User 1: You played even so you got your bet of \\$(\\d+) back',
			'You<b> 2 :</b>',
			'User 2: You won',//15
			'User 2: You lost',
			'User 2: You played even',
			'User 2: You won you got your bet of \\$(\\d+) back',
			'User 2: You lost your bet of \\$(\\d+) was taken by the casino',
			'User 2: You played even so you got your bet of \\$(\\d+) back'//20
		],
		bgov: [
			'Bodyguards overview',
			'Name',
			'ID',
			'Level',
			'Attack',
			'Defense',
			'Special',
			'Costs',
			'Total',
			'att',
			'def',
			'trained'
		],
		cities: ['Detroit', 'Chicago', 'Palermo', 'New York', 'Las Vegas', 'Philadelphia', 'Baltimore', 'Corleone', 'NOWHERE'],
		killpage: 'All cities',
		myacc: ['Are you sure you want to buy a Smith & Wesson .357 Magnum?', 'Are you sure you want to buy a Tommy Gun?'],
		busttracker: ['You busted this person out of jail', 'You busted this person & his/her cellmate out of jail '],
		accept: 'Accept'
	},
	nl: {
		prefsname: 'Voorkeuren',
		menuitem: ['OB Poll', 'Contact formulier', 'Beyond FAQ', 'DnD prijzen', 'Live famstats', 'Dagelijkse famstats'],
		prefs: [
			'Blokkeer "ga ervoor" knop voor te korte image code',//0 - CRIMES/CARS
			'Coke prijzen in de bovenbalk',//1 - SMUGGLING/PRICES
			'Edo-Nieuws in het info menu',//2 - EDO
			'Jail Highlighter, automatisch invullen en sneltoetsen',//3 - JAIL/BUSTING
			'Voeg extra sneltoetsen toe (Smokkelen)',//4 - Non-existant
			'Voeg "000" en "000000" toe door k of m in te toetsen op de bank pagina',//5 - MISC
			'Verwijder Uitbreekervaring balk',//6 - CLEAN-UP
			'Ga terug naar kogelfabriek na mislukte koop',//7 - OTHER AFs
			'Automatisch invullen misdaden/auto\'s stelen',//8 - CRIMES/CARS
			'Stem in 1 klik!',//9 - MISC
			'Ververs Misdaden/Steel een auto pagina nadat de wachttijd voorbij is',//10 - CRIMES/CARS
			'Ga automatisch terug nadat je een verkeerde code hebt ingetoetst',//11 - MISC
			'Verwijder "Capo opbrengsten" tekst (alleen voor niet Capo\'s)',//12 - CLEAN-UP
			'Gedetailleerde familiepagina',//13 - MISC
			'Verwijder "Moord wachtwoord niet ingevuld" bericht',//14 - CLEAN-UP
			'Extra links op gebruikersprofielen',//15 - MISC
			'Nicklezer popup tijdens vasthouden van \'Alt\' of aan/uit met \'Ctrl\'',//16 - MISC
			'Voeg "extra prijzen popup" toe in de bovenbalk',//17 - SMOKKELEN/PRIJZEN
			'Verwijder blauwe berekeningen in CD-modus',//18 - CLEAN-UP
			'Verwijder avatars op forum en in vriendenlijst op profielpagina',//19 - CLEAN-UP
			'Opgeruimde login pagina',//20 - CLEAN-UP
			'Voeg highlights toe op prijzen pagina',//21 - SMUGGLING/PRICES
			'Verwijder Racevorm balk',//22 - CLEAN-UP
			'Ga automatisch naar de gevangenis na mislukking',//23 - JAIL/BUSTING
			'Voeg highlights toe aan auto\'s in de Garage',//24 - CRIMES/CARS
			'Automatisch invullen van kogels',//25 - ANDERE AFs
			'Automatisch invullen bij groeps misdaden',//26 (heist, oc, moc) - ANDERE AFs
			'Automatisch invullen van bloed',//27 - OTHER AFs
			'Automatisch invullen bij het smokkelen',//28 - SMUGGLING/PRICES
			'Automatisch invullen bij autoracen',//29 - OTHER AFs
			'Verwijder "Recente forumposts" van gebruikersprofielen',//30 - CLEAN-UP
			'Sneltoetsen gebruiken bij de Postbus',//31 - MISC
			'Auto-Krasser en Stats',//32 - OTHER AFs
			'Voeg Volgers toe (Kogels, Poker, Krassen, BJ)',//33 - MISC
			'Ruim de Spot Overvallen pagina op',//34 - UI Extras
			'Laat misdaad- en autojatstats zien op status pagina',//35 - CRIMES/CARS
			'Voeg Lijfwachten Overzicht toe op BG\'s pagina'//36 - UI EXTRAS
		],
		prefsTitle: [ //describe the options
			'Je kan de "Ga ervoor" knop niet gebruiken voor je 3 tekens hebt ingevuld',//0
			'Laat cokeprijzen van elke stad zien in de bovenbalk(met highlights voor high en low)',//1
			'Naast het gewone laatste nieuws van de admins komen nieuwsposts van Edo er ook te staan',//2
			'Schakelt jail highlighter in, vrienden en familie, selecteert automatisch naar prioriteit, en schakelt de hotkeys in',//3
			'Schakelt drank/drugs/beide hotkeys in en voor het automatisch invullen kies je (best/CD/RV/none)',//4
			'Bij de bank pagina kan je op de k of m toetsen drukken om duizenden of miljoenen toe te voegen aan het bedrag',//5
			'Verwijdert uitbreekervaring van je account pagina',//6
			'Als je bij je eerste poging faalt met kogels kopen vernieuwt het de kogels pagina',//7
			'Selecteert automatisch de beste optie bij misdaden en auto\'s jatten',//8
			'Hiermee kan je alle pagina\'s openen waar je op kan stemmen (bij "stem op omerta") met 1 druk op de knop',//9
			'Als je op misdaad/auto stelen klikt terwijl je nog wachttijd hebt word de pagina automatisch vernieuwt als de wachttijd voorbij is',//10
			'Keert terug naar de pagina waar je was als je een verkeerde code invulde',//11
			'Verwijdert capogeld tekst van je status pagina(Als je $0 capo geld hebt)',//12
			'Top/Capo\'s/objecthouders staan in kleur op fampage samen met een letter ernaast die aangeeft wat ze zijn',//13
			'Verwijdert Moordwachtwoord teksten',//14
			'Je krijgt een extra regel op een spelers profiel met links voor heists, raids, hem als mentor instellen of detectives op hem inhuren',//15
			'Als je met je muis over een spelersnaam gaat krijg je profielinformatie (behalve in gevangenis)',//16
			'Door je muis op steden te houden krijg je meer d&d prijzen (de duurderen die voornamelijk in runs gebruikt worden)',//17
			'Wil je geen last hebben van teksten die teveel ruimte innnemen tijden het boosten? Verwijder ze!',//18
			'Wanneer je op het Omerta forum zit of een profielpagina bezoekt zul je geen avatars meer zullen zien',//19
			'Opgeruimde login pagina',//20
			'Geeft een rode kleur aan de hoogste prijs en een groene kleur aan de laagste bij d&d prijzen',//21
			'Verwijdert het racevorm balkje van je status pagina',//22
			'Gaat terug naar gevangenis pagina als je weer vrij bent',//23
			'Dit highlight de auto\'s in verschillende tinten grijs afhankelijk van waar je ze het beste voor kunt gebruiken (heist/oc/moc)',//24
			'Vult automatische het maximale aantal kogels in dat je kunt kopen, word gekeken naar aantal kogels in de fabriek en het geld dat je hebt',//25
			'Vult kogels/wapen etc in voor heist, oc of moc',//26
			'Vult het aantal eenheden bloed zodat je op 100% uitkomt, geslecteerd op goedkoopste soort die je kunt kopen',//27
			'Vult het maximale aantal drank/drugs/beide dat je kan dragen. De beste run calculator vult in en geeft je ook de mogelijkheid om op het drank/drugs type te klikken waar die het maximum invult',//28
			'Focust op accepteren en voegt een link to naar inbox nadat je een race hebt gedaan',//29
			'Verwijdert de regel met de laatste forumposts van profielen',//30
			'Geeft je de mogelijkheid om berichten te openen met sneltoetsen en aldaar te antwoorden of het bericht te verwijderen met een sneltoets',//31
			'Geef het Krasser paneel met stats weer op de Kras&Win pagina',//32
			'Hou bij hoeveel kogels je koopt bij de kogelfabriek, hoeveel handen je hebt gespeeld met poker en hoeveel kaarten je hebt gekrast',//33
			'Krijg een goed overzicht van de spots zodat je makkelijker je doel kunt kiezen',//34
			'Laat het aantal misdaaden zien die succesvol waren en het total aantal auto\'s die je gestolen hebt, plus de totale winst van beide',//35
			'Een mooi overzicht van al je lijfwachten en hun getrainde levels, inclusief het totale aantal'//36
		],
		maxprefs: 37,
		preftitles: [
			'Misdaden/Auto stelen',//0
			'Smokkelen en Drank/Drugs Prijzen',//1
			'Gevangenis/Uitbreken',//2
			'Andere Auto-invullers',//3
			'Opruimen',//4
			'Edo-Nieuws',//5
			'Interface Extra\'s'//6
		],
		prefsPage: [
			'Controleer voor update',
			'Vink alles aan',
			'Update'
		],
		jhl: [
			'Uitbraak lijst en opties',
			'Familie of Gebruiker',
			'Kleur',
			'Prioriteit',
			'Meer',
			'Minder',
			'Opslaan!',
			'Uitschot der aarde dat mijn uitbraken niet verdient',
			'Toevoegen via profielen',
			'Gevangenis instellingen',
			'Standaard Prioriteit',
			'Standaard Kleur',
			'Maximum lengte highlight lijst',
			'Uitkoop sneltoets in het gevang',
			'Vrienden Lijst Prioriteit',
			'Familie Prioriteit',
			'Als iemand in het gevang in aanmerking komt voor voor 2 instellingen, krijgt hij/zij de kleur van het hoogste prioriteit<br>Het standaard nummer voor vrienden is: <b>3</b> en voor familie: <b>9</b><br>De standaard prioriteit en kleur worden gebruikt als je iemand toevoegt via een profiel link<br>De laagste prioriteit voor iemand is <b>10</b>',
			'Omhoog',
			'Omlaag',
			'Willekeurige'
		],
		marquee: [
			'Weet je zeker dat je wil reizen naar ',
			'Alle Prijzen',
			'Coke om: ',
			'Je verblijft al in deze stad!'
		],
		newmenu: 'Nieuwe menu indeling gevonden! Selecteer opnieuw je voorkeuren.\nDit houd in de menu- EN de hotkey voorkeuren!',
		cusmenu: [
			'Weet je zeker dat je je menu wilt resetten?',
			' indeling geupdate! <br><br>Click <a href="javascript:location.href=\'menu.php\'">Wacht of klik hier</a>',
			'Je hebt die hotkey al in gebruik!'
		],
		login: ['Registreren', 'http://www.edo-nieuws.nl', 'Edo-nieuws'],
		status: ['none', 'Geen', 'geslaagd', 'Geld van misdaden', 'misdaad', 'Waarde alle gestolen auto\'s', 'auto', 'Rente', 'in', 'Nu!'],
		wrongcode: ['De code die', '<br><center><b>Leer typen, analfabeet!</b><br><br><a href="javascript:history.back()">Klik hier om terug te gaan of wacht een ogenblik</a></center>'],
		failedBullets: [
			'You may only buy 500 bullets.',
			'De prijs per kogel is net veranderd, als je de kogels echt wilt hebben, vul dan de velden opnieuw in.',
			'Deze fabriek heeft niet zoveel kogels.<br><br>De prijs van de kogels kan ook NU veranderd zijn, probeer het opnieuw.3',
			'Je kunt geen negatief aantal kogels kopen',
			'De code die je invoerde kwam niet overeen met die van de afbeelding. De code bevat alleen kleine letters en cijfers.',
			'Je hebt niet genoeg geld voor deze deal.'
		],
		garage: 'Type',
		race: 'Je bent nog moe van je vorige race',
		profile: ['Burgerlijke staat:', 'SMS Status', 'Familie Uitbreker van', 'Dood', ' Geschiedenis'],
		wealth: ['Sloeber', 'Arm', 'Modaal', 'Erg rijk', 'Te rijk om waar te zijn', 'Rijker dan God', 'Rijk'],
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
		stats: ['naar boven', ['Dode Fams', 'Geëerd', 'CDCT', 'Fams', 'BF', 'Roul', 'NG', 'FM', 'BJ', 'Bookies', 'PB']],
		bank: 'Je kunt niet minder dan 100 dollar versturen',
		smuggling: ['Zak: ', 'Drank', 'Drugs', 'Huidige Drank/Drugs Prijzen', 'Alle Prijzen', 'Beide'],
		obay: ['Pak met kogels','kogels'],
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
		title: 'Omerta (NL)',
		menutitle: [
			'Voorkeur pagina waar je de meeste van onze opties kan veranderen',
			'Plaats waar we onze gebruikers een paar vragen stellen',
			'Hier kan je ons ideeën of gevonden bugs insturen',
			'Lijst van meest gestelde vragen',
			'De prijzen van Omerta met een snufje van ons :P',
			'Live Familie statistieken gebasseerd op Rix\'s berekeningen',
			'' // DO NOT REMOVE !!
		],
		NR: {
			misc: ['Info laden..', 'Familie:', 'Nicklezer actief', '.Kliklimiet, probeer nogmaals..', '.Wacht op de vorige..'],
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
		narcs: ['GEEN DRUGS', 'Morfine', 'Marihuana', 'Lijm', 'Hero&#239;ne', 'Opium', 'Coca&#239;ne', 'Tabak'],
		booze: ['GEEN DRANK', 'Wijn', 'Bier', 'Rum', 'Cognac', 'Whiskey', 'Amaretto', 'Port'],
		oneclick: [
			'Je hebt de 1-klik stemmer niet gebruikt.\nWil je deze nu gebruiken?\n',
			'Je kan nog niet stemmen!\nWacht nog:\n',
			' uur, ',
			' minuten, en ',
			' seconde(n).\n',
			'Je hebt de 1-klik stemmer vandaag nog niet gebruikt!\n',
			' dag(en), ',
			'Wil je de 1-klik stemmer nu gebruiken?',
			'Sinds de laatste keer dat je hebt gestemd is er verstreken:\n',
			'Wil je alsnog de 1-klik stemmer gebruiken?'
		],
		scratcher: [
			'<b>Gefeliciteerd!</b>',
			'Kogels<br>Ze zijn toegevoegd aan jouw account!<br>',
			'gewonnen (\\d+) Kogels',
			'<br>Het is toegevoegd aan je account!<br>',
			'Je hebt gewonnen \\$ (\\d+)',
			'<b>Start met krassen!</b>',
			'KrasVolger',
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
			'Stats gereset!',
			'Sorry, but 10 per minute is enough.',
			'Ga terug naar de Kras&Win pagina.'
		],
		bullettracker: [
			'Succes, je kocht',
			'Succes je kocht (\\d+) kogels voor \\$ (\\d+)',
			'KogelVolger',
			'Gekochtte kogels:',
			'Geld uitgegeven:',
			'Prijs per kogel:'
		],
		crimetracker: ['Success je hebt', 'Succes je hebt \\$ (\\d+) verdiend.'],
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
			'Lokale bende',
			'Autodealer (Thunderbolt)',
			'Autodealer (Avus)',
			'Autodealer (Spyder)',
			'Whiskey Stokerij',
			'Boerderij (Marihuana)',
			'Boerderij (Bier)',
			'Havens (Heroine)',
			'Havens (Cognac)',
			'Fabriek',
			'Oud ijzer handel',
			'Bar',
			'Restaurant',
			'Villa',
			'Vakbond Kantoor',
		],
		lastontime: [
			'Levend',
			'Laatst on:',
			'geleden',
			'Deze speler is nog niet online gezien door onze logger'
		],
		pokertracker: [
			'PokerVolger',
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
		bjtracker: [
			'BJ Volger',
			'Speel nog een keer',
			'User 1: Je hebt gewonnen',
			'User 1: Je hebt verloren',
			'User 1: Je speelde gelijk',
			'User 1: Blackjack!!',//5
			'Insurance Set',
			'De deler had een black jack',
			'Blackjacks',
			'Gelijkspel: ',
			'Gok:',//10
			'User 1: Je hebt gewonnen, je hebt je inzet van \\$(\\d+) terug',
			'User 1: Je hebt verloren, je inzet van \\$(\\d+) is nu voor het casino',
			'User 1: Je speelde gelijk, je krijgt je inzet van \\$(\\d+) dus terug',
			'Jij<b> 2 :</b>',
			'User 2: Je hebt gewonnen',//15
			'User 2: Je hebt verloren',
			'User 2: Je speelde gelijk',
			'User 2: Je hebt gewonnen, je hebt je inzet van \\$(\\d+) terug',
			'User 2: Je hebt verloren, je inzet van \\$(\\d+) is nu voor het casino',
			'User 2: Je speelde gelijk, je krijgt je inzet van \\$(\\d+) dus terug'//20
		],
		bgov: [
			'Lijfwachten overzicht',
			'Naam',
			'ID',
			'Level',
			'Aanval',
			'Afweer',
			'Speciaal',
			'Kosten',
			'Totaal',
			'att',
			'def',
			'getraind'
		],
		killpage: 'Alle steden',
		myacc: ['Weet je zeker dat je een Smith & Wesson .357 Magnum wilt kopen?', 'Weet je zeker dat je een Tommy Gun wilt kopen?'],
		busttracker: ['Je hebt deze gangster uit de gevangenis gebroken.', 'Je hebt deze persoon en zijn celmaat uit de gevangenis gebroken'],
		accept: 'Accepteer'
	}
};
