Omerta Beyond Changelog

## v1.10.0.85 - 16 February 2012

**NEW**

* Better compatibility with Scriptish, LubeMonkey and TamperMonkey.
* Script works on Chrome and Fennec now. \o/
* Support for auto update. (GM 0.9.12+ required)
* Ability to reset trackers at death.
* Added link to full changelog for changes and deaths (links to OBN site).
* Added Local crush button when stealing a car if user is famless.
* Added focus for elements on various places.
* Showing traveltime when traveling thru marquee
* Added price-per-bullet info in Sluggs logs.
* Added option to remove "Sluggs laughed" from it's logs.
* Added quick lookup options:
 * (#021) If partial name is written page will show suggestions.
 * (#050) If no name has been entered we'll redirect to own profile.
* Lackey II tweaks:
 * (#111) Added k/m usage.
 * (#112) Added commafy.
 * (#120) Added focus on popups.
* (#020) Visual tweaks for Inbox.
* (#031) Added countdown timers on spotraid page.
* (#040) Added Custom sytem delete messages.
* (#061) Show (BF) at deaths with bf kills.

**CHANGED**

* Various code cleanups and tweaks to comply with ECMAScript standards.
* Removed obsolete functions and OB features.
* Excluded all donate pages and game register.
* Several visual tweaks to better use available screen resolution.
* Moved around several options to give it better usability.
* Translated all remaining strings into Dutch.
* Fam info is saved on both join and/or leave.
* Rewrote the complete cote for 1 Click Voter.
* (#022) Changed nickReader buttons (only shift now)
* (#028) Merged custom menu and hotkeys page.
* (#055) Changed default priority for Jail Highlighter.

**FIXED**

* Various typo errors and spelling mistakes.
* Several visual fixes.
* Fixed Crime Tracker.
* Fixed Traveling thru marquee.
* Tweaked Raid page and fixed errors that were breaking the page.
* Fixed broken focus on various places.
* Fixed not showing quick links in inbox after delete msg.
* Fixed problems for Heist and OC.
* Fixed OB's breaking Poker page.
* Several fixes applied to prevent clicklimit:
 * (#005) Faster clicklimit when using OB.
 * (#110) Fixed refresh while being in SH (causing clicklimit).
* (#011) Coke prices broken on .nl
* BRC:
 * (#003) Fixed Smuggling page auto fill deselection.
 * (#027) Wrong calculation if user has capo.
 * (#041) Fixed not filling all b/n or setting wrong options.
 * (#059) fixed BN links dont listen to selected mode.
* (#054) Reply quicklink was broken.
* (#065) Fixed family not being set.
* (#068) Fixed logo not being changed on login page.
* (#079) Fixed problem with GMSCommands (update checker).
* (#081) Garage buttons dont show up when browser window is too small.
* (#096) Fixed OBNews not showing properly.
* (#115)(#118) Fixed wrong links on wedding and condoleance messages.
* (#119) Fixed hotkeys for inbox/smuggling dont work if set in menu.


Version 1.10.0.50 BETA		12/08/2011

	* Added Redirect to Status
	* Cleaned up some code
	* Changed minFFVersion to 4.0
	* ( FS#361 ) Changed page marquee gets prices from to omerta xml
	* Removed �Add to bustinglist� for fams on own familypage
	* ( FS#448 ) Implemented go back to inbox after sent message
	* ( FS#489 ) Added obay bullets to BulletTracker
	* ( FS#629 ) Added autofocus on login form
	* ( FS#628 ) Added boolean for PockerTracker
	* Fixed ninja bug breaking title and favicon (commented out another line from bmsg)
	* Fixed ninja bug title and favicon not showing on �logout� page (a slash was missing)
	* Changed behavior of whereToRun() to make it easier to include remote pages for testing purposes (such as a .html dump you want to create code for). This is now as easy as including the link to the file in the @inlude section and then create an if-hook on it in the code of Beyond.
	* Added easier way to select and swap cards with poker (you can now click the cards you want to swap and they are highlighted).
	* Text field for codes now regains focus after clicking on the �Can�t read this?� link.
	* Fixed some grammar errors in the update checker.
	* ( FS#316 ) Extra fields for JHL entries are now added dynamically instead of using the �more/less� buttons.
	* JHL settings are now saved clientside, so the page isn�t �refreshed� anymore.
	* Changed the way JHL settings are saved in our variables, creating more room for future settings and less room for errors.
	* Added constant to set bmsg on and off
	* ( FS#492 ) Fixed jailHL not working when nobust set
	* ( FS#600 ) Directionkeys in jail busted fixed
	* Added link to user rankings on dead mans profile
	* Removed Select all SH button
	* ( FS#443 ) Added garage button stick to bottom
	* ( FS#565 ) Fixed omerta3.com not properly detected
	* ( FS#472 ) Fixed AF when raiding
	* ( FS#599 ) Added hotkeys to inbox for next/prev/del/reply msg
	* Bulletlackey results will be added to Bullettracker
	* Added crush button to nicked car page
	* Added Bmsg 0.1 (example included incode)
	* Added Tidy Smuggling Page *WIP* (enable with incode boolean)
	* ( FS#427 ) Implemented Mailbox Navigation Buttons
	* ( FS#596 ) Fixed only OBN showing
	* ( FS#578 ) Implemented hide full games @ poker
	* (FS#573) Started with Lackey counter
	* Placed onceonly div for bgov before the bgspage function
	* Fixed broken killpass remover
	* ( FS#328 ) Added last 10 family changes
	* ( FS#591 ) Changed to focus on heistlinks
	* ( FS#437 ) Changed setValue for missinghealth
	* Fixed Nickreader appearing in menu
	* ( FS#569 ) Implemented label on garage entry
	* ( FS#455 ) Implemented removal from Jail hl for families
	* ( FS#440 ) Fixed saving city on travelling
	* ( FS#451 ) Implemented ship to city autoform
	* ( FS#519 ) Implemented Actions dropdown on profile
	* ( FS#577 ) Fixed calculators gone at bank
	* ( FS#581 ) Fixed outlining of fambank
	* Fixed In bank account not bold
	* Switched Lex att/def starting amounts
	* Placed grabLex function outside pref[36]
	* Fixed arrow at bank account
	* Added autoship focus @ garage
	* Fixed typo at heist cancel focus
	* Changed way of grabbing default color @ nickreader, brc, menu
	* ( FS#449 ) Fixed - Hotkeys in descriptions
	* ( FS#582 ) Fixed - Custom menu showing [ object Window ] instead of text
	* ( FS#583 ) Fixed - Highlights on family page not working
	* ( FS#584 ) Fixed - Obay Autoselect/focus fails for Pack of Bullets
	* ( FS#475 ) Implemented - Add a �bid� link next to the �go� link on Obay
	* ( FS#576 ) BF fail not working fixed
	* ( FS#512 ) ALL-in button @ Poker implemented
	* ( FS#487 ) Load BG stats on obay
	* ( FS#513 ) Added extra refresh button @ poker
	* ( FS#478 ) Reduced refreshtime to 0 on bulletspage
	* ( FS#489 ) Added bullets bought today
	* ( FS#483 ) Added Quicklookup suggestions
	* ( FS#564 ) added separate icon for EDO news
	* ( FS#563 ) fixed wrong linkification on dets page
	* ( FS#496 ) Fixed raidpage for spotowners
	* ( FS#555 ) made button dissapear when spot is not raidable
	* Removed Rob & Mia code from BGOV
	* Fixed refreshIn error when Lackeys close crimes/carnicks
	* ( FS#453 ) Added total money for cars on garagepage
	* ( FS#558 ) Fixed can�t select cars without garage pref
	* Removed CD from capomoneys table and changed amount for GF
	* ( FS#556 ) Adding lackey results to car/crimetrackers
	* ( FS#557 ) Fixed wrong linkifying in top log
	* Replaced fin link with OBnews on loginpage
	* Removed all controlpanel checks
	* ( FS#481 ) Fixed - Smuggling names no focus if no codes
	* Added �Remove Facebook API� feature
	* Added Family worth and position to faminfo @ fampage
	* ( FS#495 ) Fixed BT not showing on timer
	* ( FS#486 ) Fixed In jail msg gone
	* ( FS#311 ) improved some html
	* Made some changes to garage
	* ( FS#546 ) Fixed My account page
	* ( FS#544 ) Added OBnews in info menu
	* ( FS#543 ) Changed 1-click voter
	* ( FS#532 ) Fixed - b/n fill
	* Removed f.be stats link from menu
	* ( FS#482 ) fixed custom menu link problem
	* ( FS#444 ) added  to all necessary inputfields
	* ( FS#354 ) added SH calculator
	* Changed text of  pref
	* ( FS#505 ) Added last family deaths
	* ( FS#490 ) Implemented history info on user profile
	* ( FS#528 ) Removed redundant image removal on cars/crimes pages (Omerta implemented this option)
	* Added compatibility CSS for Firefox 4
	* Bumped copyright year
	* Cosmetics on outbox (turned �delete� into icon on preview msg)
	* ( FS#517 ) fixed raiding from profiles
	* Removed ignored parts of xhr (header is not supported anymore by firefox)
	* ( FS#506 ) switched to new FAQ page, mistakes yet to be fixed
	* ( FS#511 ) shown �unknown� death time for those that we don�t have any info
	* ( FS#510 ) added delete icon at outbox
	* Cosmetic fix at Mailbox (faster drawing of icons for 12ms according to firebug)
	* ( FS#491 ) added link for car race invite message
	* ( FS#500 ) fixed .dm bug for PPB (prices per bullet)
	* ( FS#501 ) fixed busted focus for bullet bids
	* Changed format for laston (should be faster now)
	* Added thumbnail for @screenshot (FF4)
	* ( FS#306 ) implement HR overview on family page
	* ( FS#502 ) implement death time on user profile
	* Removed obsolete code in order to fix problems at bullets page
	* some more FF4 compatibility fixes
	* (FS#14) WIP ... added very basic .tr support
	* ( FS#471 )( FS#480 ) Enhanced the update checker
	* ( FS#485 ) Added new lines on the end of files to fix compatibility with LubeMonkey, WebMonkey and Scriptish.
	* Fixed .nl edo nieuws link
	* Fixed omerta game register break
	* ( FS#458 ) implemented spotownership to family page
	* Fixed add to jailhl broken when friend request pending
	* Fixed BJtracker not working .nl
	* ( FS#142 ) Implemented (WIP) - Add Lex improvements to calculation
	* ( FS#488 ) Fixed - Garage HL not working in omerta3 domain
	* ( FS#457 ) Fixed - [Discussion] AF smuggling modi
	* ( FS#459 ) Fixed - BRC is wrong
	* ( FS#481 ) Fixed - Smuggling names no focus if no codes
	* ( FS#450 ) Fixed - BGOV dissapears
	* Expanded linkify for condoleances and you've been shot message
	* Implemented SlotsTracker
	* ( FS#474 ) Fixed wrong linkify in dets fail msg
	* ( FS#374 ) Implented linkify @ weddingwitness invite
	* ( FS#476 ) Removed commafy at id on BGOV
	* ( FS#477 ) Implented link to obay at BGOV
	* Fixed not working crimetracker on .nl
	* cleaned up some code
	* Bumped version to 1.10 xD

Version 1.9.3.93 		05/10/2010

	* Removed obsolete code (~1.9kB)
	* Minor code tweaks and optimizations
	* Several cosmetic fixes
	* Compatibility fixes regarding Scriptish
	* Several .dm tweaks to cope with new family system
	* (FS#6) Implemented Bodyguards Overview
	* (FS#60) Added - preserved state of menu caption upon refresh
	* (FS#98) Implemented script updater
	* (FS#109) Fixed - nickreader goes out of visible area
	* (FS#158) (FS#405) (FS#411) Rewrote custom menu and it ways, making the "new menu content detected" msg obsolete
	* (FS#180) Made new FFvChecker which works nicely and just comes up once when logging in
	* (FS#285) Fixed - hotkeys smuggling
	* (FS#291) fixed more/less on jhl prefs
	* (FS#298) (FS#379) Implemented loop to add focus on "Accept" link
	* (FS#301) Implemented - Jail HL @ Family
	* (FS#323) Fixed - B/N linkifiers
	* (FS#353) Implemented - garage
	* (FS#358) Implemented spot numbers on tiny raidpage
	* (FS#394) fixed busttracker on cellmate
	* (FS#403) fixed Akill text on profile not working
	* (FS#407) Better randomfactor for jail
	* (FS#413) Fixed FL removal
	* (FS#414) Added focus on start oc button as LE
	* (FS#415) ...among a lot other closed ones. Redid whole raidpage and some formhandling. Hopefully it works good now.
	* (FS#417) fixed focus for sratchtracker
	* (FS#418) Implemented interest/time left for bank account on status
	* (FS#421) Fixed missing underlining if top3 had object on fampagehl
	* (FS#422) BGOV shown on obay
	* (FS#423) Bustout yourself added to busttracker and fixed bust cellmate
	* (FS#425) fixed link for FNA on lean login
	* (FS#428) Fixed oc accept link
	* (FS#429) Added pref for BJT
	* (FS#430) Fixed - Busttrackerfail
	* (FS#435) Fixed - wrong focus on dets (on all) and linkifying only at .nl
	* (FS#436) Fixed NaN problem at trackers (if it's not fixed yet please reopen ticket)
	* (FS#438) Fixed typing errors on the preferences page
	* (FS#439) Fixed typos on OB FAQ
	* (FS#436) Fixed - NaN problem in trackers 
	* (FS#441) Fixed - Nickreader at hitlist
	* (FS#445) Fixed - Busttracker not saving 
	* (FS#446) Fixed - Bustoutyourselftracker fails 
	* (FS#447) Fixed - Name focus on dets
	* (FS#460) Fixed Bullettracker failing when owning BF
	* (FS#462) Fixed all fails cuz of new link to family control panel (linkify log, invite from profile, cd gf/fl promo)
	* (FS#468) Fixed wrong link for daily famstats on .com
	* Added new theme based colors using new getTintedColors() @ Garage
	* Fixed "Select some cars first" msg @ Garage
	* Fixed not showing capo list (we still assumed don was 1 capo)
	* Implemented BJ tracker (finally!)
	* Fixed interest reminder bug which forced you to refresh bank so that timer would work if just deposited some cash
	* Made dummy timers from dc+bar so that a lot of errors from Error Console won't show up again
	* Fixed missing focus on MOC go button as LE
	* Fixed an error causing raidpage to break. This only happened in large cities with 7+ spots.
	* Fixed cut-off mouseover msg for "disable go-for-it" pref
	* Fixed missing "go back to s&w page" and added focus
	* Fixed $XLast('//img[not(@id)]') is undefined error from Error Console
	* Added popup confirm msg for resetting custom menu
	* Added total-stolen-car-worth from MrWhite's car tracker
	* Added pref for crime and car tracker
	* Implemented car & and money trackers
	* Added focus on unclaimed s&w tickets
	* Changed version for fingon's link

Version 1.9.3.70 BETA 4		18/08/2010

	* More cosmetic changes regarding English :D (Thanks Chamas)
	* Files are fully UTF-8 now
	* (FS#406) Fixed missing BulletTracker if there is no owner for famBF
	* Fixed laston didn't show up on profiles
	* Merged pref for BulletT, PokerT and henceknown ScratchT into one pref
	* Removed the automated scratching part from scratcher (nicely asked by DrunkenGamer)
	* Implemented focus at s&w pages

Version 1.9.3.66 BETA 3		29/07/2010

	* Fixed remaining typos :$
	* Removed extra junk from the files (trimmed down almost 2kB)
	* Various cosmetic fixes (better positioning, again made all work fine at 1024x768)
	* Various tweaks regarding usage of xpaths etc.
	* Improved general handling of OB
	* General tweaking of Garage code
	* (FS#353)(FS#366) Improved JHL code a lot! (should be faster as well)
	* (FS#304) Added select next to Jail page (use left, right and down arrow keys)
	* (FS#393)(FS#372) fixed wrong link for AF at B/N from OB menu
	* (FS#356) Implemented disabled "go" button for raid page if famless
	* (FS#390) Improved raid page code and fixed tiny bug
	* (FS#386) Fixed wrongly saved prefs (.com got prefs of .nl and vice versa)
	* (FS#392)(FS#383) Added CD/GF promo calc to top3 CP, as well fixed linkifying
	* (FS#355)(FS#365) Removed redundant stuff from user profile page regarding online status

Version 1.9.3.55 BETA 2		21/06/2010

	* Added m/k to family bank
	* Added "sell" focus on cars whos value is greather then $5k
	* Implemented Scratcher as part of AutoFormers with some stats
	* Added a way better color picker for jail coloring at our prefs page
	* Improved English sentences used on our pages (Thanks Danny)
	* Added Bullet Tracker
	* Implemented good looking raid page ;)
	* Added live stats for .com
	* Added "last seen" on profiles again
	* Implemented Poker Tracker
	* Tiny reorder of preferences
	* Implemented default option to remove annoying pictures on crimes and nick-a-car pages
	* Some minor code tweaking
	* Removed a lot of obsolete code (Trimmed down size for ~10kB)

Version 1.9.3.31 BETA 1		16/05/2010

	* Usage of 0.8.6 Greasemonkey API !!
	* Restyled preferences page
	* Code refactoring (tweaked and fixed most of wrongly passed arguments)
	* Fixed wrong quicklinks on statistics page
	* Implemented redirection upon bank transfer
	* Cosmetic tweaks on inbox (changed order of quick icons to cope better with admin msgs)
	* Implemented hotkeys to inbox
	* Fixed problems regarding BRC (Best Run Calculator)
	* Implemented ABL (Anti Bust List)
	* Implemented Nuke Settings (Nested at User Scripts Commands)
	* Fixed problems caused by missing captchas
	* Increased bullets checkers for AF
	* Fixed linkifiers for WS on .nl and for Family Invite on both versions
	* Fixed moving back to old page upon visiting profile and forum (problem caused by bullets checker)
	* .dm support
	* each supported version has family stats in beyond menu now(.nl(rix)/.com(fingon)/.dm(rix))
	* price per bullet is default option now
	* fused "disable avatars on forum" and "remove avatars from FL" into just one option
	* fixed "black links" in menus
	* clicklimit upon first login (hyperactive BRC parser)
	* decreased overall size (1kB for png files, 3.58kB for langs and 1.2kB for our .css)
	* various cosmetic fixes to achieve full 1024x768 support
	* Added "Clean login page" again
	* Fixed several problems with NickReader
	* Fixed "look it's me" yet again (problem was due omerta's tabs)
	* Fixed several problems regarding News sections
	* Corrected some wrongly spelled words

Version 1.9.2.43	30/12/2009

	* changed dc+ links once again
	* changed my account links once again
	* 1-click voter tweaks by vbm
	* LOGGER constant for history link
	* removed @id
	* (FS#219) fixed b/n prefs for .nl
	* (FS#217) nickReader
	* (FS#218) my account
	* added confirm box for buy links @ My Account
	* updated links @ MyAccount to Shop
	* (FS#156) fixed NR for jail and hitlist
	* removed 'amount AF' from bloodAF since omerta does it already
	* (FS#214) - Look it's me! fixed (new event checker)
	* (FS#170) - Bloodbank (fixed for Shop AND trimmed code length)
	* added array.iMax() and array.iMin() to libs.js
	* removed unused query strings
	* (FS#214) fixed individual "look it's me" for (non tab users online page)
	* remove few spaces
	*(FS#209) fixed no capomoney shown
	*(FS#213) fixed b/n prices link
	*(FS#210) fixed bn name clicker
	*(FS#212) fixed BRC wrong calculation
	* added forgotten parseInt() @ parsePrices() (could be cause of the 'off' BRC results)
	* changed prices to external link (in jail proof)
	* fixed evil event (charCode problem FF)
	* (FS#211) Improved "Select All" button at inbox
	* (FS#204) fixed BRC (missing botprices.php)
	* minor JS syntax tweaks
	* removed extra junk
	* fixed yet another evil setTimeout (this time for wrong code)
	* fixed warnings caused by undeclared variables for smugglings page
	* added LOGGER constant to easily enable/disable logger links
	* removed extra junk
	* (FS#206) fixed HP linkifier from profile page
	* (FS#201)&(FS#202) fixed problems caused by NR
	* (FS#208) fixed "Set as Mentor" (was broken due changes on page)
	* applied patch for notorious line 7
	* (FS#200) added checker for family name (one or more words)
	* removed buggy WeddingInv linkifier
	* (FS#201) applied temp fix
	* added wiki changelog
	* added shortcut @ family bank to sent transfers
	* added missing pref for remove cd mode text
	* NR: no more double results
	* NR: no more freezing on clicklimit
	* NR: added eyecandy > slideIn :D
	* FS#87 - B/N AF CD mode failing
	* FS#108 - b/n rp mode fail
	* FS#178 - "Filter" Smuggling when doing CD runs
	* FS#171 - Raid AF bug 
	* fided broken buy-out hotkey
	* fixed bank calcs (DOM-iffied)
	* updated compatibility page
	* fixed broken dets AF (MrWhite)
	* fixed NR so it won't display ultra long friends cell
	* added quicklinks for capos @ manage users
	* added fambank calculator @ fambank
	* total cost row fix at bloodbank
	* added missing prefs for m/k
	* fixup for caches libs.js and lang.js
	* added unsafeWindow for console.* api so we can bypass limitation in 0.8.2 GM
	* (FS#70) fixed linkifying for bf at .nl again
	* (FS#192) implemented "Remove friend's avatars"
	* (FS#194) fixed family invites (when delete button replaced accept/deny link)
	* (FS#193) possible fix up for "buying out" while we're in jail (beyond disabled that button)
	* disabled online percentage at user's profile until logger is fixed
	* disabled calculators at bank page until we find workaround (m/k and calc collide due usage of onkeyUP)
	* replaced capomoneys table
	* (FS#183) added amount of users per regime @ capomoneys table
	* removed m/k usage to fix bank and make .21/.22 usable 
	* first commit of mrwhite *applause*
	* fixed useless setTimeout at bank page
	* (FS#190) fixed misplacing of icons for opened messages at inbox
	* (FS#189) fixed marquee travel to Detroit
	* (FS#187) (FS#188) fixed custom menu (as a result of above fix)
	* (FS#164) added m/k use
	* removed clickable bank amounts cause omerta got one now
	* (FS#120) added "all city" modifier @ detectives again
	* (FS#185) - removed third party hotkeys
	* (FS#186) - fixed marquee travel
	* added hotkeys @ inbox
	* fixed broken NR due to "Recent Forum Posts"
	* minor tweaking
	* added @unwrap meta imperative for debug purposes
	* fixed warning at pillory for missing throw link
	* added history link to family name at bullet factory
	* fixed focuser for DR in heists
	* properly defined few more variables
	* cleaned up beyond.css from obsolete styles
	* cleaned up and tweak of libs.js
	* (FS#129) completed missing strings for "failed bullets purchase"
	* (FS#177) completed missing strings for "title descriptors" at preferences page
	* internal tweaking and fixing for missing and not defined variables (speed up by 7% according to firebug's profiling)
	* fixed missing focus for MOC participants (EE, DR, WE)
	* added prefsPage lang placeholders
	* some minor internal tweak (vars, improper HTML tags etc.)
	* (FS#182) increased amount for autoform at local bullet factory (from 400 to 800)
	* (FS#169) added 'clicker' to titlebars (orange color) to open just extra ticket or bullets links
	* (FS#177) fixed missing titles for 2nd sets of preferences
	* (FS#177) added .com descriptors
	* tiny changes made to NickReader's div (changed border style, opacity and border radius)
	* rewrote toggle();
	* decreased refresh time for custom menu from 5 to 3 secs (in actual script it was 2 secs now it's 1.5)
	* disabled linkifier for WeddingInv
	* (FS#132) added family name history link at status page
	* tweaked code a bit (tabs, spaces, new lines etc.)
	* fixed MOC focuser for EE
	* (FS#174) fixed "Delete Selected" problem caused by our extra	buttons
	* (FS#175) added Select All for read messages
	* cleaned up extra spaces and tabs
	* added prefsTitles placeholders
	* removed last known bits of obsolete code
	* tweaked few xpaths
	* tweaked some more JS syntax
	* fixed wrong table caption at VFB
	* tweaked inbox to show icons in just one line
	* internal tweaks (replaces spaces with tabs, removed extra	tabs/spaces, missing brackets etc.)
	* (FS#173) added option to remove "Last Forum Posts" at user's profile
	* (FS#161) fixed "Add to busting list" link on user profile
	* (FS#152) removed history links at status page for .nl
	* again fixed kill pass remover
	* redo compatibility page
	* tweaked linkifying Ticket messages
	* (FS#172) nicknames at Detectives are clickable again
	* added checker for 'downtime'
	* added checker for ff 3.5+
	* yet another try at fixing blood cost table
	* removed leftovers from lang.js and changed prefs 30 to 7
	* (FS#160) fixed 'remove kill pass not set'
	* updated familylog linkifyer to apply to all user names
	* added checker for '503'
	* added focuser at submit button upon invite from profile (top3)
	* fixed CapoMoney calculator (how much till CD or GF) (Manage users)
	* added linkifier for names at Control Panel LOG and fully opened family log
	* (FS#159) added redirection upon missing amount at bank
	* removed 'disable ext images' option based on poll results
	* fixed wrong path for accessKey at iminjail.php for Buyout
	* removed obsolete focusers from various pages (due implementation on game itself)
	* removed unused functions from libs.js
	* (FS#147) removed CAPO CP last online time formater - obsolete
	* (FS#153) fixed invite linkyfier (removed tokens)
	* (FS#155) fixed broken "disable avatars"
	* cleaned up lang.js from unneeded strings
	* added few more checkers to "Return to bullets page after failed purchase"
	* changed the way potential bullets are calculated at garage
	* added checker so promotions in other lang at capo log are linkified as well
	* tiny internal changes caused by cleaned up lang.js
	* added rounder corners at NickReader and BRC settings table
	* re-enable buggy latestPicture fam info from Fing0ns
	* (FS#129) added "Return to bullets page after failed purchase"
	* (FS#32) added focus on first available "Throw" link
	* (FS#139) possible fix for cost table and 100% fix for wrong blood type (caused in last rev)
	* (FS#148) fixed history problems
	* added linkifier to CAPO CP, log table ( names are clickable )
	* some more internal cleanup at preferences
	* added missing semicolons and brackets
	* removed last bits of .dm support
	* fixed up wrong css identifier
	* fixed some evil evals that were around
	* bumped version to 1.9.2 revision 0
	* internal cleanup of unneeded code
	* (FS#145)(FS#141)(FS#122) removed "Anti noob" (obsolete since they implemented off button)
	* (FS#144) changed links opened for bullet vote ( only those are opened now instead of all )
	* (FS#134) fixed dc+ link to 'status' page


Version 1.9.1.98	21/09/2009

	* (FS#106) removed extra ? at status page
	* (FS#105) partially added autoform at scratch & win
	* replaced del, delall with $del, $Del (uses $x$X)
	* (FS#118) capo nick is clickable again
	* (FS#116)&(FS#105) added scratch & win focuser
	* (FS#119) fixed cd/gf promo money calculator
	* (FS#115)&(FS#104) changed online time/history link so it supports dead folks as well
	* (FS#125)&(FS#127) fixed wrong link for history at profiles
	* (FS#126) fixed GMT offset at last seen time
	* (FS#123) fixed showing prices for bullets section at obay ( only bullets filter)
	* (FS#112) added (Akill) next to 'Dead' if person was akilled
	* (FS#124) fixed capo status linkifying at status page
	* (FS#128) fixed wrong MsgId at omerta3.com for del shortcut at inbox
	* added "?" next to family name at status page ( will add some more info when it's ready)
	* added link to bodyguards number at status page that'll lead you to shop
	* some internal cleanup
	* (FS#138) removed shooting range leftovers for .nl
	* (FS#135) added checker for CD/GF promo is it's NaN
	* (FS#136) changed the way we calc CD/GF promo
	* removed debug leftovers
	* Removed obsolete code that was tied to 2.x Omerta
	* General tweaking (img compression, code cleanup)
	* Fixed DC+ tweaks (all are working now)
	* Fixed BRC problems (mostly :$)
	* Fixed linkifying at inbox messages for various cases (group crimes invites, fam invite ...etc.)
	* Fixed problems at profile pages (detective invites, wrong raceform expanders etc.)
	* Added Mailbox icons for Delete and Reply for individual messages
	* Fixed problems at OBay for bullet prices
	* Beyond menu is multilingual now
	* Fixed NickReader for various cases and matched it's div to used theme
	* Change Car highlighter at Garage to be optional (enable to show colors for oc/moc/heist cars)
	* Fixed Statistics page to show quicklinks again
	* All users page is sorted by highest rank again
	* Fixed various problems at Family page ( wrong colors, missing capos, wrong selectors)
	* Added spot raid AF (focus on driver's field and auto insert 200 bullets)
	* Fixed "Look it's me" to properly highlight our name at online users and all users pages
	* Fixed Bloodbank Autoformer ( selects cheapest and proper bloodtype )
	* Added "?" to status page ( history checker )
	* Added history and online status to profile page (info is not 100% accurate)


Version 1.9.1.81	03/08/2009

	* Fixed some evil eval code
	* minor cleanup and tweaks
	* (FS#70) fixed bf linkifying on .nl
	* (FS#66) added Linkify "Ticket Update" message
	* (FS#67) added Linkify "Crashed Message"
	* (FS#29) fixed inbox linkifying (hopefully all of it)
	* (FS#52) Profile wealth expander fixed
	* (FS#51) Bring back dc+ tweaks ( will result in errors for non dc+ will fix that later )
	* compressed brcgear.png
	* did JSLint on lang.js and libs.js
	* fixed problems reported by css validator at beyond.css
	* removed some more 2.9 code
	* Beyond menu is multilingual now
	* some internal tweaks and cleanup
	* fixed linkifying at status page (.nl)
	* fixed dc+ errors for non donors
	* (FS#31) fixed wrong raceform expanders
	* (FS#20) all users page are sorted by rank again
	* tiny tweaks (nothing interesting)
	* (FS#22) fixed Blood AF referrer from My Account page
	* fixed BRC bninfo problem
	* made NR and BRC match Omerta Theme
	* NR partly fixed
	* HL prices page works even with BRC off
	* fixed family page
	* added option for Garage HL rather then default
	* #63 added extra city checkers
	* #64 fixed open-in-new tab bug for Edo-niews
	* added ajax Tab fix
	* #23 fixed NR
	* #4 fixed missing quiclink @ stats
	* #21 fixed look it's me
	* #24 fixed bo-skill bar remover
	* #25 fixed RF bar remover
	* fixed missing capos @ fampage
	* minor tweaking
	* #16 go to jail crap
	* #3 added spot raid AF + invitation
	* #34 fixed detectives invitation
	* fixed family page AGAIN
	* added no AF if no RP to be earned @ RP-mode
	* fixed missing BRC setting Div
	* tweaked the shit out of BRC for vBm's happyness


Version 1.9.1.73	26/07/2009

	* (854) garbled output on successful travel via marquee
	* (862) missing prices per bullet on obay page
	* (836) after buyout get back to jailpage
	* (673) fixed problems on user.php
	* (378) added checker for race messages ( where to add link to inbox )
	* (837) added "remove avatars from forum" option
	* few tiny changes
	* new BRC :o
	* fixed Friends/Fam @ JHL
	* fixed refresh after jail is over (wrong ID's)
	* (FS#7) - Added title descriptors to OB menu
	* (FS#8) - Removed Strike-through finished auctions
	* minor changes regarding prefs[23] ("Return to jail page after jailtime is over)
	* (FS#4) fixed missing quicklinks @ statistics page
	* (FS#15) added "anti noob tooltips" removal
	* (FS#18) removed obsolete strike-through line at obay for finished auctions
	* (FS#19) fixed problems at smuggling page regarding wrong amount of b/n and cash
	* (FS#33) better include/exclude routine
		- added support for omerta3.com
	* (FS#9) fixed color picker at prefs page
	* (FS#36) fixed check all button at prefs page
	* removed OBUpdate due problems with matching
	* another JHL fix attempt
	* minor tweaky to BRC (@ Detroit)
	* tweaked version checker
	* Fixed BRC
	* added No AF option
	* added hide AF setting Div
	* removed 2.9 support
	* fixed garage car selector
	* Obay bullet price fixed @ item specific
	* general tweaking

Version 1.9.1.64	20/07/2009

Basically there is a lot of changes since 1.9 but being that we lost track of all ... here are most recent ones

	* (835) fixed city changer on menu when traveling via marque
	* linked "none" of fam section at status page to recruitment page
	* removed wrong link for hire detectives on users profile
	* added two useful functions to libs.js
	* commented out obsolete code that's tied to loggerbot that's not working
		- removed OB menu links for Fingon's fam info and our graphs
		- removed quick links to history from 'my account' page, and user profile
	* fixed problems at "My account" page
		- hand and tommy gun are linkified and clicking will buy those weapons
		- plane is linkified to market page
	* (820) added link to profile page so we can set user as mentor
	* fixed JHL (on the train) (rev .62)
	* fixed wrong dependency path :$
	* added update icon
	* some minor tweaks in code
	* replaced images with compressed one
	* (840) Travel' page improvements are back now
	* possible BRC fix ?!
	* (833) changed color for HP self linking
	* (823) hopefully fixed problem with linking to Bloodbank (dc+)
	* (793p) fixed only "ody>" problem of this bug ( applies to flying via marque )
	* (793p) fixed bloodbank AF
	* added "502" detector
	* fixed version detector ( .com/.nl )
	* added faster prices drawing
	* removed options KS related for .com/.nl
	* (817) fixed bullets auto form
	* (812) rum prices are showing again inside extra popup in marque
	* (809) fixed crimes auto form
	* save custom menu background color (808)
	* htmldir fixes (//center)
	* added new NickReader (upgrade to follow)
	* fixed HP link @ profile
	* fixed invitation links bg-colors @ profiles
	* fixed filling amoun of money instead of amount of booze

Version 1.9.0.37	25/11/2008
	
	Major Update
		1.	Moved Language arrays in external file

	New Features
		1.	Best Run Calculator (BRC)
		2.	New Jail Highlighter
			Ability to switch between Highlighted players (using hotkeys)
			Added buy-out hotkey
			Family and FL priority can be adjusted
		3.	Added links to user profiles @ inbox notification messages
		4.	Added update notifier
		5.	Added 3 character limit and character checker for image code field (ignore #^&$ etc )
		6.	Added 1-click Voter
		7.	Added "Go to Jail" after jail time is over (bustermode)
	
	Updated Features
		1.	Added max-save and pic.leech.it to image blocker
		2.	Upgraded familypage, all player links will now have coloring matching their status
		3.	Upgraded NickReader, added Ctrl and Alt to active it to prevent unwanted 'reads'
			Press Ctrl: switches NickReader On or Off, to make reading more nicks easy
			Press and hold Alt: Nickreader will we on as long Alt is pressed, read a few nicks
		4.	Also added a "NickReader Status" which will we seen when the reader is active
		5.	The NickReader can be used on ANY page now and wont go out-of-screen
		6.	Added checkers for hotkeys, no more double hotkeys!
		7.	Added option to dis/enable hotkeys on inbox/I-am-in-jail/smuggling
		8.	Made detailed info @ profiles default
		9.	Buy-me-out hotkey has been made custom
		10. Login page 'cleaner' expanded to use edonews for .nl
		11. Removing Jailbusting Bar from dc+ also once you select it's preference
		12. Prices page is jail-proof ( even you're in jail you still can see prices )
		13. Linkifying
			Click on ws id to fill in form to sell ws on obay


	Bug Fixes 


		1.	Various cosmetic fixes:
			on family page
			on jail page
			on nickreader ( display dollar sign in front of numbers )			
		2.	Fixed various AutoFormers:
			BF AF was broken due to wrong regexp and/or missing LBF owner
			while being in fam AF on smuggling page was broken when you try to sell stuff
			OC AF was totaly busted
			BRC was failing for marijuana due to devs named it's input 'marihuana'
			Heist AF was totaly busted
			Bloodbank AF fails to buy proper blood if you're "0" type
		3.	Custom menu works for Translation Crew now too
		4.	Fixed linkifying for various conditions
			ws id was removed due to wrong word count
			oc msgs waren't counted properly
			dc+ links were broken
			moc inv msg was broken due to wrong word count
		5.	Flying via marquee was impossible while you were playing poker
		6.	NickReader 
			didnt show honour points
			falling off the screen ( bottom and right )
		7.	Jail Highlighter
			colors couldnt be changed for own family
			changed the way it detects inputed words ( users )
			fixed random person selector if no one from JHL or FL is in jail
			if priority is left blank person gets highlighted but not selected
		8.	Fixed preferences for .nl
		9.	Hotkeys 
			not working in msg (delete+reply)
			even thou you removed hotkey alert still appears that it's used
		10. Prices were wrong due to wrong lang detection
		11. Code checker/protector wasnt working correctly
		12. Script update checker
			fails to properly determine which version you're using
			fails to redirect you to proper page where you can update
		 


--------------------------------------------------------------------------------------------

Version 1.8	18/08/2008

	Major Update
		1. Introduced GreaseMonkey 0.8 API's
		2. Full FireFox 3 support
		3. Added .dm support
	
	New Features
		1. Added possibility to add and remove buttons to the menu
		2. Added hotkeys Alt+Shift+0-9 for first 10 msgs @ inbox
		3. Added OC Autoformer

	Updated Features
		1. Added Fingon's News and last deaths from Fingon's at login page
		2. Split fampage/profile nickreader options
		3. Added on/off switch for nickreader on fampage (checkbox in right above it)
		4. Added option for colors @ prices.php
		5. Car selector will work on page 2 and beyond now too
		6. New preferences page (new look, deleted unused stuff)

	Bug Fixes ( numbers are ID's from our beta page )
		7	obay price per bullet is gone
		8	Link to omerta changelog is wrong http://www.barafranca.comchangelog.php/ should be http://www.barafranca.com/changelog.php/
		9	Buttond " select Bustouts " doesn't work...
		11	busting out don't autoselect random people in jail when u dont have any more friends or family members in jail it just pick 1st one
		12	Jail Highlight preferences only saves "Family or Ingame" field and not the "color/priority" field so now highlighter doesnt work
		13	Crimes section doesnt autorefresh when waiting time is over.
		14	same with ID "13" but then for the carnick page
		21	Fixed	when u do crime if u pick some other crime u need manually click with mouse on window where u need to put code
		20	When in Garage, when you select 'under xx' value and then clicks 'select', it only selects ABOVE, not under.
		18	Fixed	on crime page, the auto focus or w/e is not on the box where u type the code but on the button next to it
		26	Fixed	when u buy b/n and put wrong code u get standard msg but when u are redirected back on b/n window u have still yours old code in code window
		27	Fixed	when u open some1s profile on some u can see money and rf (with numbers) and on some u can see only word (rich etc ). i did show vBm so he know about this problem example are ing : Emnlm & Blizz
		24	When a capo is called Sonai, both Sona and Sonai are underlined in the big cloud of usernames on the fampage, while only Sonai should be underlined, not Sona too.
		25	custom menu is broken ;x
		28	New servers added to servers.php so .nl one changed it's place and compatibility flag was set for .cn because of it.
		29	Cocaine prices from OB menu is broken and outdated ( still uses Reborn's bot ;x )
		30	when u remove shoot on bottle from crime he auto pick last crime but mouse go on "go for it" and not in window where u should type code
		48	missing translation for 'inviting' for .nl @ lang.inbox array
		36	smuggling: when doin alt+shift+= (Narcs ([) - Booze (]) - Both (=) ) it puts -9 in the coca�ne box
		37	addition to #36: the rest of the narcs stays at 0, while i have drugs in my pocket
		38	Fingons News Preferences BETA: doesn't work, you can't change the amount of news items & also you can't change the background of it.
		39	custom marquee colors: after u changed the colors you cannot change them back to default. leaving a space in the inputfield doesn't work either.
		40	Error 404! /omerta.php File Not Found!
		41	.css is missing on prefs page. restyle it asap!
		42	The thing about "linking names on messages and heist messages" just bugs all the heist messages unabing you to see the right result of the heist when receiving the message. You have to disable the greasemonkey in order to read it right, otherwise it just cuts it all :S
		43	You can give 2 links same hotkey! They both don't work then. Leave it like this, or maybe change it!
		44	ID 12 still not working!
		45	ID 42 it was cut at the word "stopped". Don't know if it has anything to do with it.
		46	Fixed	when i look people profile without clicking on there ing with nickreader after short time i get msg about 40 click limit per minute
		49	addition to id 42: if city is Las Vegas only Las is displayed. ( due to improper word count )
		51	#20 is back
		52	dm prefs page is not triggered ( instead we see .com prefs )
		53	.dm prices are wrong ( again we see .com prices )
		54	on .dm login page we see fingon's info for .com
		64	Dopedogs Menu has bugs in it, "You don't have any added buttons in this submenu" This appears when you first add one then delete it. Also after refreshing this still appears! URL is wrong it tries to open http://www.barafranca.com/www.site.com
		61	outdated libs.js
		63	B/N autoform, crimes/car nick doesn't pick highest %..... (.com)
		69	Nickreader will leave blank fields when clicklimit is reached and will not retry
		67	tweaked login screen has a bug, it won't show the news till you refresh for the 2nd time.
		68	Booze/Narcs ingame shows the old stylesheet (classic)
		70	@ #64 will only dissapear of the second button added will be on an non existing position after removing one of the buttons above
		71	missing .nl and .dm new prefs page.
		72	Cant click my testament's username on the stats page, to link to his profile.
		73	Fixed	.dm/.nl prefs gets 1 undefined item for selecting based on row making made by corresponding prefs.php
		74	Fixed	Linkifying on status page is broken.
		75	Since we have credits embeded into prefs page there's no need to have custom script that changes omerta's credits page. So remove that part of code.
		76	Clicking my pocket money wont automatically fill it in at bank anymore - however, deposit is ticked.
		
--------------------------------------------------------------------------------------------
Version 1.7	29/06/2008

	Major Update
		1. added .nl compatibility in .com script (one script for both versions)

	New features
		1. added heist autoformer
		2. added reply button @ inbox
		3. added reset option for custom menu
		4. added additional beyond submenus again
		5. added clean login page
		6. added auto return @ smuggling.php when image code was wrong
		7. added omerta beyond favicon


	Feature updates
		1. new custom menu buttons at the bottom of the menu
		2. new logo
		3. autoselect lowest % @ crime page if the bottle is removed


	Bug fixes
		1. back to old jail highlighter code
		2. fixed bulletfactory, adding commas in the input
		3. fixed blood AF, issue when trying to fill in wrong bloodtype that is not compatible
		4. fixed obay, last bullets didnt get per price info
		5. fixed updating custom menu, first had to set menuprefs then hotkeyprefs
		6. fixed updating custom menu, after a new menu all prefs would go one up in the menu
		7. fixed marquee prices, rum was getting cut off from 'other prices' popup
		8. fixed customs menu, wouldn't work for crew members since they have an extra menu

--------------------------------------------------------------------------------------------
Version 1.6.2	15/05/2008

	Bloodformer ( had issue when inserts missing amount )
	if bottle is gone AF was broken
	added appendix for credits.php
	fixed code so health is clickable again in dc+ bar
	fixed version number for fingon's news so it's 2.8 now
	partial code is rewritten so it's using $X$x now where it's needed
	in case there's no one from fl or jail hl in jail it will select random
	unintentional 'bug' for jail page ... input box wasn't focused when user is on FL
	made lil mistake for bank thingie ( changed prefs6 with prefs7 :x ) it's fixed now
	mid.php order has changed so instead of health, rp was linked to bloodbank
	forced refreshing on mid.php is lowered to 1 min

---------------------------------------------------------------------------------------------
Version 1.6.1	25/04/2008

	Change "All users" link so you select it by rank right away
	Corrected typo: To edit which hotkeys you want to use with Alt+Shift+"letter"
	Wealth/RF wouldn't load when having an active SMS Status.
	Wealth/RF wouldn't load when being Familybuster.
	Fingon's daily famstats is working again (tnx zenga)
	Delete buttons would dissappear after deleting one message
	No price per bullet after selecting by type/price etc.
	Change title to "Omerta (COM)" didn't work anymore (new game.php in 2.7c) (Nor will it change the title of omertabeyond.com anymore)
	Autoselect anonymous, autoselect bid amount on Obay
	Made individual delete buttons to optionaly
	Added price per bullets + autoform on the bulletobjects pages

------------------------------------------------------------------------------------------------
Version 1.6	21/04/2008

	Customize your menu
	Customize your hotkeys
	Garage car selector
	Quicklinks at Statistics page
	Profile nickreader (hover over friends and see their stats)
	Detailed family page: capolist / % of members online / extended userlist (colors/nickreader)
	Bloodbank autofiller
	Prices per bullet on Obay
	Detailed Wealth/Race form on profiles
	Return to page after wrong image code
	Refresh Crime/Car Nick page after waiting time is over
	Individual delete buttons for each inbox message
	Context menu item with info about version
	Added new functions and helpers ( tnx ecmanaut for $x$X )
	Few pages are cleaned from crap
	Added update notifier (tnx jeremy tymes)
	Booze/narcs wouldn't autofill as Capodecina or Delivery Boy
	Remove bottle caused crime page to autoselect "go for it" instead of image code box
	Testament, Own Ingame and Translation Crew links on status page are working again
	Hotkeys/links for B/N type to fill in the maximum you can sell/buy
	Removed Server Choice, since we only have one server
	Bulletform -> autofill the amount that you can actually buy with your money (still 400 as max.)
	Better code for bank and car page
	Added colorpicker for jailhighlighter
	Better code for logo replacer

-------------------------------------------------------------------------------------------
Version 1.5	01/01/2008

	Hotkeys to do a crime, car, booze, narcs and jail (Alt + Shift + C, V, B, N or J),
	Change the title of the Omerta page to 'Omerta (COM)' for tabbed browing,
	Remove FAQ in menu,
	Changed links in status page to work with new status page,
	After layout changed most links in beyond menu were broken, now fixed,
	Fingons news now used news from 2.7b,
	Removed some leftovers from debugging,
	Added autoform for cars that selects highest percent chance,
	Added autoform for booze/narcs that buys by rank saved from status page,
	Added autoform for jail highlighter that selects the highest priority person in jail

---------------------------------------------------------------------
Version 1.4	08/11/2007

			Bug Fixes
				 1. DC+ health link bug fixed
				 2. Fixed time in coke marquee to report again in OT (tnx Ini)
				 3. Fixed few errors regarding no value for elements
				 4. Logo and server chooser were not working for non www page (http://barafranca.com/)
				 5. Fixed capo msg (trimming wasn't working always)

			General Updates
				 1. Better logo replacer code (no need to include paths with original logo)
				 2. Rewritten xpath links
				 3. Added delall function (remove whole chunks on the page)
				 4. Added few more global functions and vars
				 5. Source code is trimmed down for few kB in size

			Feature Updates
				 1. Added Fingon's Daily Famstats in beyond menu
				 2. Added link to TCUI for those that are part of the crew
				 3. Added Img -> Link converter (no more big ass images in profiles) (tnx lazyttrick for helping)


------------------------------------------------------------------------
Version 1.3.1	14/10/2007

			Bug Fixes
				 1. Clean Useless Menu works again
				 2. New links to http://beyond.dvsoft.org/ because old links are broken
				 3. Error in the Info bar when you dont have DC+

			New Feature
				 1. Dont like Jailbusting Skill Bar ? ... remove it then

-------------------------------------------------------------------------
Version 1.3	14/09/2007

			Bug Fix
				 1. Marquee not refreshing when there are no prices

			New Features
				 1. Click your bank amount to take all money from bank
				 2. Brought back the Server Choice!

---------------------------------------------------------------------------
Version 1.2.2	22/08/2007

			Speed Update
				 1. Logo is embedded into script now

			Bug Fix
				 1. Useless menu is not removing stuff from TOPs menu anymore

			General Updates
				 1. Health in DC+ bar is clickable now
				 2. Ingame at status page is clickable now
				 3. Capo string at status page is shorten now

------------------------------------------------------------------------
Version 1.2.1	10/08/2007

			Feature Update
				 1. Beyond menu completely custom! / Added Cocaine Prices menu

			General Update
				 1. Added 'Omerta Beyond' logo!

---------------------------------------------------------------------------
Version 1.2	08/08/2007

			Feature Updates
				 1. Fingon's news menu made official (From Fingon's database)
				 2. Fingon's news links to a small article page in the main frame
				 3. Customize your marquee with your own colours

			Bug Fix
				 1. Jail Highlighter doesnt overwrite friends if the priority is less than 3

			New Feature
				 1. View a random quote from Pappa's Site

			Speed Update
				 1. Beyond and Calculators menu uses "Pure Javascript" instead of printing HTMLs

--------------------------------------------------------------------------
Version 1.1.2	03/08/2007

			Feature Update
				 1. Choose as many Families/Names as you want to jail highlighter / Added Priority

			New Feature
				 1. Options to delete 'Shoot the bottle' from crimes

------------------------------------------------------------------------------
Version 1.1.1	31/07/2007

			Major Feature Update
				 1. Choose 6 families for the jail highlight and choose highlight colour

			Bug Fix
				 1. Fixed bug with Jail Highlighter only working for the first instance (Thanks to Eagle)

---------------------------------------------------------
Version 1.1	29/07/2007

			New Features
				 1. Choose a sister fam to highlight in the jail list
				 2. Booze/Narcs Prices table for main frame (Prices Supplied by ReBorN)
				 3. Cocaine prices in marquee refreshes every 2 minutes

			Speed Update
				 1. Checks just for file path, not whole url

			Bug Fix
				 1. Clean useless menus uses direct path

----------------------------------------------------------
Version 1.0.1	27/07/2007

			Speed Update
				 1. Only runs on pages the script changes

			General Update
				 1. Works on Omerta test servers

-----------------------------------------------------------
Version 1.0	22/07/2007

			New Features
				 1. Clear out useless submenus
				 2. IgBot Submenu
				 3. Cocaine prices in marquee (Prices Supplied by ReBorN)
				 4. Fingon's news in the info menu on the right
				 5. Calculators Submenu