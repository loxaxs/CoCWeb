import { NPCAwareContent } from "./NPCAwareContent";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { Kiha } from "./Kiha";
import { StatusAffects } from "../../StatusAffects";
import { SpiderMorphMob } from "../Areas/Swamp/SpiderMorphMob";
import { PerkLib } from "../../PerkLib";
import { CockTypesEnum } from "../../CockTypesEnum";
import { SKIN_TYPE_SCALES, TONUGE_SNAKE, TONUGE_DEMONIC } from "../../../includes/appearanceDefs";

export class KihaFollower extends NPCAwareContent {

    //Requirements:
    //-PC has achieved \"<i>Fuckbuddy</i>\" status with Hel (because threesomes)
    //-PC has maxed out Kiha's three basic \"<i>Talk</i>\" options
    //-PC is not genderless
    //-but unsexed people are ok?

    //(Scene procs the first time the player [EXPLORE]s the Swamp when all requirements have been filled)

    //New States:
    //During the course of this expansion, the dragoness will enter into a number of different \"<i>states,</i>\" each of which alters her general behavior. States follow two \"<i>paths</i>\" - a Lover path in which you eventually become friends with Kiha, and even lovers; and a Broken path, in which you break Kiha's mind and soul.

    //Lover Path:
    //1. Enemy - Kiha's default state, attacks PC on sight
    //2. Friendly - Begins after saving her from a spidery gang-rape. Kiha allows the PC to visit her at her home, and spar or talk. She cannot be sexed during this State.
    //3. Warm - Begins after raising Kiha's new Affection Score to 100. After much effort on the PCs part in trying to get to know her, she finally admits that she *might* feel *something* for the PC, and adds it would be \"<i>mutually beneficial</i>\" if they both had someone to sate their lusts with. Then sex. (I'm fucking working on this one, okay?)

    //==========================
    //  VARIABLES
    //==========================
    //VAG CAPACITY = 67
    //ANAL CAPACITY = 94

    //-1 = left to spiders, 0 = normal, 1 = friend, 2 = warm
    //const KIHA_AFFECTION_LEVEL: number = 421;
    //Used during warm.  Maxes at 100
    //const KIHA_AFFECTION: number = 422;
    //0 = normal, 1 = Kiha has bitched/moved out about corruption, 2 she came back
    //const KIHA_CORRUPTION_BITCH: number = 423;
    //const KIHA_NEED_SPIDER_TEXT: number = 424;
    //1 if they fucked, -1 if you ran
    //const KIHA_AND_HEL_WHOOPIE: number = 425;
    //const KIHA_ADMITTED_WARM_FEELINZ: number = 426;
    //const KIHA_MOVE_IN_OFFER: number = 427;
    //const KIHA_FOLLOWER: number = 428;
    //const KIHA_NEEDS_TO_REACT_TO_HORSECOCKING: number = 429;
    //const KIHA_CERVIXGINITY_TAKEN: number = 430;
    //const KIHA_HORSECOCK_FUCKED: number = 431;
    //const KIHA_CAMP_WATCH: number = 982;

    public followerKiha(): boolean {
        if (this.flags[kFLAGS.KIHA_CORRUPTION_BITCH] == 1) return false;
        if (this.flags[kFLAGS.KIHA_FOLLOWER] > 0) return true;
        return false;
    }
    private kihaAffection(changes: number = 0): boolean {
        if (this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] == 2) this.flags[kFLAGS.KIHA_AFFECTION] += changes;
        if (this.flags[kFLAGS.KIHA_AFFECTION] > 100) this.flags[kFLAGS.KIHA_AFFECTION] = 100;
        return !!this.flags[kFLAGS.KIHA_AFFECTION];
    }

    //Introduction
    public kihaSpiderEventIntro(): void {
        this.outputText("", true);
        this.spriteSelect(72);
        this.outputText("You make your way to the swamp, and soon find yourself submerged waist-deep in a reeking marsh surrounded by tall, vine-covered trees, many of which support strands of thick gossamer webbing.  You wander the bog for what seems like an eternity before you finally stumble across a small island, in what may well be the heart of the swamp.  At this point, you're moments from saying to hell with it and going home, but... why not?\n\n", false);

        this.outputText("You drag yourself up onto the shore of the island and take a quick look around.  The small isle is completely cut off from the swamp around it, surrounded on all sides by the thick, murky water you've been wading through.  A small glade stands in the center of the land here, surrounded by the trees of the shoreline.  In its center lies a coppice of tightly spaced trees.  Surprisingly, it's clear of vines and webbing, quite unlike most of the swamp.  This incongruity only reminds you that you've seen neither hide nor hair of any of the swamp's denizens in quite some time.  The stillness and silence around the glade is unnerving, and for just a split second, you feel as if you're being watched.\n\n", false);

        this.outputText("Warily, you approach the trees in the center.  While you had guessed they were tightly packed by the darkness beyond them, you're surprised to see that the tall ones have grown so close together that their bark forms something of a solid, circular wall, and their canopies a thick roof.  You're forced to circle around the grove, unable to find another means of ingress - even the tiniest of cracks between tree-trunks has been filled in with thick layers of dried mud.\n\n", false);

        this.outputText("Intrigued, you're considering climbing the bark walls when you hear wings flapping above you.  You look up just in time to see Kiha the dragoness plummeting down from on high, her axe arcing towards you!\n\n", false);

        this.outputText("Evading it by a hair's breadth, you can yet feel the burning-hot metal of her weapon with the flesh of your shoulder.  You roll out of her reach, and a moment later Kiha exhales a white-hot plume of fire, creating a burning barrier between you.\n\n", false);

        this.outputText("Furious, she screams, \"<i>I knew it!  You really ARE one of Lethice's spies, aren't you?  Why else would you keep harassing me?  What do you WANT!?</i>\"\n\n", false);

        this.outputText("What the fuck?  ", false);
        if (this.player.cor < 66) this.outputText("You try to calm the dragoness down, explaining that you aren't one of Lethice's minions, that what you told her the first time around was true - that you're here to end the demon threat.  Kiha doesn't seem to be buying it, though...\n\n", false);
        else this.outputText("Irate, you stare her down, and with a dangerous gentleness, remind her that you're here to crush the demons.  Your fist tightens as, not unexpectedly, the erratic woman appears to hear none of it.\n\n", false);

        this.outputText("\"<i>Bullshit!  You're working for the demons!</i>\" she howls.  \"<i>First you try and make me go soft, tell me I don't need to fight, and then suddenly you're sneaking into my home.  Well, no more!</i>\"  Her axe swings around to point straight at you.  \"<i>I've killed the Demon Queen's agents before, and if I have to, I'll kill you too, " + this.player.short + "!</i>\"\n\n", false);

        this.outputText("The dragoness charges through her wall of fire, screaming with rage and swinging her deadly axe!\n\n", false);

        this.outputText("You're fighting Kiha!", false);
        this.startCombat(new Kiha());
        //Flag this status to differentiate what happens on defeat or loss!
        this.monster.createStatusAffect(StatusAffects.spiderfight, 0, 0, 0, 0);
    }
    //(Play normal Kiha combat scenario, but instead of the normal results at the end...)

    //Player Loses to Kiha: (Z)
    public loseKihaPreSpiderFight(): void {
        this.outputText("", true);
        this.spriteSelect(72);
        this.outputText("Before you can collapse, Kiha grabs you by the throat and hauls you off the ground.  She slams your back into the bark of a tree, crushing your windpipe with her powerful clawed hand.  She puts her face right up next to yours, so that you can feel her hot, searing breath on your face, nearly enough to blister your skin.\n\n", false);

        this.outputText("\"<i>I don't want to kill you,</i>\" Kiha says, so softly you're surprised it could have come from a person who seems ready to end your life.  \"<i>I don't.  But... I don't have any choice!</i>\"  She grabs her axe and readies it for the killing blow.  \"<i>I won't be taken back there.  I won't!  I'll annihilate anyone the Demon Queen sends my way!</i>\"\n\n", false);

        this.outputText("As Kiha raises her arm, you desperately try to struggle free - but the dragoness is much too strong for you in your weakened state.  Glimpses of your life begin to flash before your eyes... Until you glance over Kiha's shoulder.  Perhaps two dozen spider-morphs and driders have crawled up the shore, and are slowly advancing upon your little tableau.  It seems she's made enemies of the denizens here, and you've given them the opportunity of a lifetime to take Kiha down a notch.\n\n", false);

        this.outputText("You could warn Kiha of the approaching mob - or you could let them jump her and scamper away in the confusion, leaving Kiha to whatever horrible fate awaits her.  What do you do?", false);
        //(Display Options: [Warn Kiha] [Let Them])
        this.simpleChoices("Warn Kiha", this.warnKihaOfHerImpendingDemise, "Let Them", this.letTheSpidersHaveTheirWayWithKiha, "", undefined, "", undefined, "", undefined);
    }

    //Player Wins Against Kiha (Z)
    public playerBeatsUpKihaPreSpiderFight(): void {
        this.outputText("", true);
        this.spriteSelect(72);
        this.outputText("The dragoness slumps back against one of the trees, her limbs trembling weakly.\n\n", false);

        this.outputText("\"<i>I... I won't let you... take me...</i>\" she groans, trying desperately to stand and continue the fight.  Before you can do anything about the situation, however, you hear waves breaking just behind you.  Turning, you see a horde of some two dozen spider-morphs approaching the little island.  It seems Kiha's made enemies of the swamp's denizens, and you've finally taken the dragoness down hard enough that they're coming for their sweet revenge.\n\n", false);

        this.outputText("You look down upon your fallen foe, who is now watching wide-eyed as the first spider-folk pull themselves up onto dry land, brandishing claws and fangs and clubs.  For a moment, you're sure you can see raw terror in her eyes.\n\n", false);

        this.outputText("\"<i>Oh, Marae,</i>\" she whimpers as a pair of driders come into view, both grinning wickedly as they take the lead of the horde.\n\n", false);

        this.outputText("To your surprise, Kiha hangs her head and whispers, \"<i>Just go, " + this.player.short + ".  You've already beaten me, and they'll punish me for my weakness...  I deserve whatever's coming to me.  So JUST GO!</i>\"\n\n", false);

        this.outputText("You could make like a baker and move your buns, but Gods knows what will happen to Kiha if you do.", false);
        //(Display Options: [Help Kiha] [Leave Her]
        this.simpleChoices("Help Kiha", this.helpKihaAgainstSpoidahs, "Leave Her", this.leaveKihaToSpoidahHorde, "", undefined, "", undefined, "", undefined);
    }

    //Warn Kiha (Z)
    private warnKihaOfHerImpendingDemise(): void {
        this.outputText("", true);
        this.spriteSelect(72);
        this.outputText("\"<i>Kiha! Behind you!</i>\" you shout, desperately pointing at the group of monsters closing in behind her.\n\n", false);

        this.outputText("She smirks.  \"<i>Come on, " + this.player.short + ".  What do you think I am, stupid?</i>\"\n\n", false);

        this.outputText("By now, the bigger of the two driders is directly behind Kiha, looming over her with a wicked grin on her lips.  You try to stammer out another warning, but too late!  She hauls Kiha off the ground by her weapon arm and slaps a wad of wet webbing into the angry woman's mouth, leaving the dragoness virtually defenseless and allowing you to slip free.  You tumble to the ground but now your one-time executioner is moments away from being tossed to the spider-morphs gathering around the spinney of trees, all waiting for their chance at the dragoness.\n\n", false);

        this.outputText("Before the drider can cast Kiha into the mob, you leap, jabbing into the pale spider-morph's temple with every ounce of muscle you can manage.  Staggered by your blow, the drider drops Kiha at your feet and stumbles back.  The other members of the mob, however, continue to advance around their stunned leader.\n\n", false);

        this.outputText("\"<i>You!</i>\" Kiha snaps, tearing the webs away and grabbing her axe, \"<i>Why the hell did you do that?</i>\"\n\n", false);

        this.outputText("\"<i>Talk later!</i>\" you answer.\n\nYou're now fighting the spider horde!", false);
        this.startCombat(new SpiderMorphMob());
        //(Proceed to Spider Horde Combat)
        //Set first round cover
        this.monster.createStatusAffect(StatusAffects.MissFirstRound, 0, 0, 0, 0);
        this.HPChange(100, false);
        this.fatigue(-30);
        this.dynStats("lus", -40);
    }

    //Let Them (Z)
    private letTheSpidersHaveTheirWayWithKiha(): void {
        this.outputText("", true);
        this.spriteSelect(72);
        this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] = -1;
        this.outputText("You say nothing to alert the savage dragoness to her impending doom.  Only when one of the driders stalks up behind her does Kiha seem to realize something is amiss, and by then it is far too late.  The drider picks her up by her weapon arm and slaps a wad of wet webbing into her mouth, holding the surprised Kiha for only a moment before throwing her to the mob who descend upon her in a frenzy of muffled screaming and erect penises.\n\n", false);

        this.outputText("\"<i>Thank you, stranger,</i>\" the drider says, surprisingly cordial.  \"<i>This bitch has been a thorn in the side of the swamp's people for some time.  We will teach her a lesson she won't soon forget.</i>\"\n\n", false);

        this.outputText("Before you can answer, the drider has grabbed her own cock and shuffled into the maelstrom of sexual energy now surrounding Kiha.  You laugh and gather your belongings, and hit the road.  Maybe that'll teach the bitch for trying to fuck with YOU.", false);
        //(Kiha's State becomes Shaken)
        this.cleanupAfterCombat();
    }
    //Help Kiha (Z)
    private helpKihaAgainstSpoidahs(): void {
        this.outputText("", true);
        this.spriteSelect(72);
        this.outputText("Looking from the defeated dragoness to the horde of spider-folk about to, at best, gang-rape her, you lean down and offer Kiha a hand.\n\n", false);

        this.outputText("\"<i>W-what are... what do you think you're doing, " + this.player.short + "?</i>\" she snaps, recoiling away from you.  \"<i>I told you to run!</i>\"\n\n", false);

        this.outputText("Beckoning once again with your hand, you look at her with as much seriousness as you can manage and say, \"<i>Join with me if you want to live.</i>\"\n\n", false);

        this.outputText("\"<i>W-what!?</i>\" she asks, utterly dumbfounded by your insistence.  Lacking the time to ", false);
        if (this.player.cor >= 66) this.outputText("beat", false);
        else this.outputText("talk", false);
        this.outputText(" any logic into her obtuse head, you simply haul Kiha to her feet and toss her the axe before turning to the onrushing foes.\n\n", false);
        //(Proceed to Spider Horde Combat)
        this.startCombat(new SpiderMorphMob());
        //st - say, 100 hp, -30 fatigue, and -40 lust - then have her cover for you for the first few rounds if you lost to her so you can blitz them or heal. -Z)
        this.HPChange(100, false);
        this.fatigue(-30);
        this.dynStats("lus", -40);
    }
    //Leave Her (Z)
    private leaveKihaToSpoidahHorde(): void {
        this.outputText("", true);
        this.spriteSelect(72);
        this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] = -1;
        this.outputText("Fuck Kiha, fuck the swamp, and fuck this.  You grab your shit and high-tail it just as the spiders close in on the dragoness.  All you see over your shoulder is a number of spider-boys and driders grabbing their cocks and swarming over Kiha for a good old-fashioned gang-rape.  Whistling a merry tune, you saunter on back to camp to the satisfying sounds of Kiha's muffled screams and pleas wafting over the tree-tops.", false);

        this.outputText("\n\nServes that bitch right.", false);
        //(Kiha's state becomes Shaken)
        this.cleanupAfterCombat();
    }


    public beatSpiderMob(): void {
        this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] = 1;
        //SPIDER HORDE - PC VICTORIOUS! (Z)
        this.outputText("", true);
        this.spriteSelect(72);
        this.outputText("\"<i>Fall back!</i>\" screams the largest of the two driders, clutching a nasty wound you've left on her breast.  \"<i>Let's get out of here!</i>\"[pg]", false);

        this.outputText("The spiders retreat, skulking back into the swamp, licking their wounds and tucking their tails.  You and Kiha are left standing victorious, surrounded by splinters of chitin and bits of spider silk.  Panting heavily from two grueling consecutive battles, Kiha leans against her massive axe, looking nearly ready to collapse.  Gently, you put a hand on her shoulder - this time, she doesn't shrug it off.[pg]", false);

        this.outputText("\"<i>Why, " + this.player.short + "?</i>\" she asks, her voice barely more than a whisper.  \"<i>Why... why did you help me?  I tried to hurt you, and you just... turned around and saved me.  I don't get it.</i>\"[pg]", false);

        this.outputText("You explain again that you aren't a servant of Lethice - that it's Kiha's choice whether she's your enemy or not.  She listens, motionless, but you can see her gaze has softened considerably since the first time you tried talking sense to the powerful dragoness.[pg]", false);

        this.outputText("\"<i>", false);
        if (this.silly()) this.outputText("B-baka", false);
        else this.outputText("Dumbass", false);
        this.outputText(",</i>\" she finally says as you finish talking.  \"<i>You could have gotten yourself raped, or beaten, or killed!  But still... I...</i>\" she suddenly flushes bright red, just like her scales.  \"<i>Thanks, I guess.</i>\"", false);

        this.outputText("[pg]You ", false);
        if (this.player.cor < 50) this.outputText("squeeze her shoulder and ", false);
        this.outputText("tell her that maybe now, the two of you can be friends.", false);

        this.outputText("[pg]\"<i>Friends... yeah, maybe that wouldn't be terrible,</i>\" Kiha says, giving you an arrogant smile.  \"<i>Go on, get out of here.</i>\"  You return her smile and start walking toward the water's edge.", false);

        this.outputText("[pg]\"<i>H-hey, " + this.player.short + "!</i>\"  Kiha suddenly shouts, causing you to turn at the shore.  \"<i>D-don't forget... um, I mean... remember where this place is, all right?  Friends, uh, visit each other sometimes, I guess.</i>\"", false);

        this.outputText("[pg]You give her a knowing little wink, which only makes her scowl as you start wading back through the swamp.", false);

        //(Kiha's State becomes Friendly)
        this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] = 1;
        this.cleanupAfterCombat();
    }

    public loseToSpiderMob(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.outputText("You collapse, unable to continue the fight.  Smirking, one of the driders whacks you over the head with the flat of her spider-leg.  You fall face-first into the mud, nearly insensate as the horde passes by you to their real prize - Kiha.  You can just see her past the mud and tall grass of the islet as she's dragged down by sheer numbers.  Two dozen spider-morphs, half with rock-hard cocks at the ready, descend upon her.  Before the dragoness can react, she's being bound with webs by a drider as a spider-boy plugs each of her holes in turn.  Kiha screams and struggles, at least until a cock is shoved into her mouth and a pair of spider-sluts jam her hands up her cunt.", false);
        this.outputText("[pg]You can't do much else but watch as the first wave of spiders cums, coating Kiha white with their jizz before a second group comes up, jamming their dicks in her still-gaping, dripping holes.  This happens twice and then thrice, until Kiha is little more than a thick, sopping pool of barely-conscious jizz, only her two demonic horns and leathery wings protruding from the cumbath to prove her identity.  Finally satisfied, the spiders begin to retreat, but not before leveling unsubtle threats against the dragoness.", false);
        this.outputText("[pg]When they've finally gone, you manage to crawl over to Kiha and ask if she's all right.  All you get is a blank stare.  You try to make her as comfortable as possible, but there's nothing much you can do for her after that.  Once she's somewhat cleaned up and you've patched up her wounds, you limp back to camp.", false);
        //(Kiha's State becomes Friendly)
        this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] = 1;
        this.cleanupAfterCombat();
    }

    //Meeting Kiha - \"<i>Friendly</i>\" State (Z)
    public kihaFriendlyGreeting(output: boolean = true): void {
        if (output) this.clearOutput();
        this.spriteSelect(72);
        if (output && this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] == 1 && this.flags[kFLAGS.KIHA_TALK_STAGE] >= 7) {
            this.kihaAdmitsSheLikesYourWang();
            return;
        }
        if (this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] == 2) {
            this.warmLoverKihaIntro(output);
            return;
        }
        if (output && this.flags[kFLAGS.KIHA_TALK_STAGE] == 6 && this.player.cor <= 50) {
            //Talk to Friendly Kiha - Fourth Time (requires <=30 corruption on account of making the PC act like a bitch) (Z)
            //(SPECIAL: Play next time the PC encounters Kiha after Talk 3 if he meets reqs, skipping the main menu)
            this.outputText("As you wander through the swamp, you eventually come to the familiar territory of your friend, Kiha.  Remembering her hasty departure the last time you talked, a pang of worry takes hold in your chest.  She mentioned taking the fight to the demons.... Surely she didn't, did she? Grimacing at the thought, you pick up the pace and make your way to her little islet.", false);
            this.outputText("[pg]To your initial great relief, you find Kiha sitting outside her swampy home, head hung low and held between her strong hands.  But as you approach, you notice her hair has been rustled, torn in places, and she's covered in small cuts and bruises.  Horrified, you can see dark white stains along her thighs and ever-damp crotch, or smeared between her big, bare breasts.  You can only imagine what has happened to her in your absence.", false);
            this.outputText("[pg]\"<i>Kiha... are you alright?</i>\"", false);
            this.outputText("[pg]Her fire-red eyes glance up at you, though she neither moves nor responds.  Without another word, you sit down beside her and wrap an arm around the dragoness's shoulders.  To your surprise, she doesn't push you away.  Indeed, you feel her tremble just a bit at your touch.", false);
            this.outputText("[pg]\"<i>I-I fucked up, alright?</i>\"  she finally says after a long silence, picking her head up to look you in the eye.  \"<i>That's... that's what you came here to hear, isn't it?  You want to hear me say it, don't you!?  Well fine: you were right, and I was wrong.  I can't just go kick down Lethice's door.  I-I couldn't even get close.</i>\"  You try to comfort her, but Kiha just turns her face sharply away, refusing to let you see her as she lets out what could have been a growl... or a sob.", false);
            this.outputText("[pg]\"<i>Maybe you're right... maybe we can't win.  After all... Lethice already has.</i>\"", false);
            this.outputText("[pg]A part of you wants to slap her, to shake her violently and tell her that no, she's wrong.  Instead, you squeeze her tight against you and look up to the heavens.  The dragoness's islet has a clear line of sight to the open air, a perfect place for the airborne predator to take off and land.  But from here, you can clearly see the ", false);
            if (this.model.time.hours < 20) this.outputText("clouds", false);
            else this.outputText("stars", false);
            this.outputText(" in the sky.  You point to them, telling Kiha to look.  The dragoness does as you ask, following your pointing finger up to the sky.  After a moment, though, she harrumphs and scowls at you.", false);
            this.outputText("[pg]\"<i>What the hell am I supposed to be looking at?  It's just the sky.  So what?</i>\"", false);
            this.outputText("[pg]God dammit Kiha.", false);
            this.outputText("[pg]You shake your head and try to explain why the ", false);
            if (this.model.time.hours < 20) this.outputText("clouds", false);
            else this.outputText("stars", false);
            this.outputText(" are beautiful.  You spend a few minutes pointing to a few shapes and patterns in the sky, a warrior with a shield here, a proud centaur there - you even spot a dragon.  Kiha listens with disinterest, rolling her eyes as you try to show her one of the last, immutable things of beauty left in the world.  Even the demons, you say, cannot destroy the heavens.", false);
            this.outputText("[pg]\"<i>Bah!  You just watch, " + this.player.short + ".  The queen bitch isn't just sitting on her ass; she won't rest until the whole world's ruined!  The demons already ruined the seasons, caused an endless drought.  Who's to say they can't shoot a giant dick into the sky, or make it rain corrupted cum forever, until we're all slavering monsters?  What's to stop them, huh?</i>\"", false);
            this.outputText("[pg]You are.  She is.  All of you - anyone who hasn't given in to corruption.  Anyone with the will and the strength to fight back.  You tell her of everyone you've met in your travels, the few stalwart souls that still resist Lethice's hordes.", false);
            this.outputText("[pg]\"<i>Then why... why haven't we done something, " + this.player.short + "?  Why couldn't we just have gone... together?</i>\"", false);
            this.outputText("[pg]Because you aren't ready yet.  Neither is she.  But some day - soon - you will be.", false);
            this.outputText("[pg]To your surprise, Kiha slips an arm of her own around your waist, returning your affection for the first time.  You smile, and stroke her cheek, happy as the dragoness rests her head on your shoulder.", false);
            this.flags[kFLAGS.KIHA_TALK_STAGE]++;
            this.dynStats("cor", -1);
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        else if (output) {
            //(Activated on Kiha proc'ing in the swamps; replaces combat encounter)
            this.outputText("Deciding to pay the pretty dragoness a visit, you make your way into the swamp and to the island grove Kiha called her home.  To your delight, it seems Kiha has moved a fallen tree-trunk over the muck, creating a bridge from the bank to her island's shore.  ", false);
            if (this.flags[kFLAGS.KIHA_NEED_SPIDER_TEXT] == 1) {
                this.outputText("Though you can see a few spider-folk watching you as you make your way across, the thrashing you gave them last time seems to be keeping them at bay for now.  ", false);
                this.flags[kFLAGS.KIHA_NEED_SPIDER_TEXT] = 0;
            }
            this.outputText("You walk over to the ring of trees and call out for the dragoness.", false);

            this.outputText("[pg]A moment later and she explodes from the treetops, landing in front of you with enough force to shake the ground.  She stands, fiery greataxe held at the ready, but when she recognizes you, however, she visibly relaxes.", false);

            this.outputText("[pg]\"<i>Oh, uh, hey, " + this.player.short + ",</i>\" she says leaning on her greataxe.  \"<i>It's... good to see you again, I guess.  Did you, uh, want something?</i>\"", false);
        }
        var talk = undefined;
        if (this.flags[kFLAGS.KIHA_TALK_STAGE] < 6) talk = this.talkToFriendlyKiha;
        //(Display Options: [Talk] [Spar] [Hug] [Leave]
        this.simpleChoices("Talk", talk, "Spar", this.sparWithKiha, "Hug", this.hugFriendWarmKiha, "", undefined, "Leave", this.camp.returnToCampUseOneHour);
    }
    //Spar with Friendly Kiha - Intro (Z)
    private sparWithKiha(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.outputText("You ask Kiha if she'd be willing to do a mock-fight with you.  She arches an eyebrow at the suggestion, but quickly hefts her greataxe onto her shoulder and smirks at you.  \"<i>You sure about this?  I won't hold back - and I'll NEVER be defeated!</i>\"", false);

        this.outputText("[pg]You return her smug grin and ready your [weaponName].", false);

        //(Use the normal Kiha combat scenario, with the following changes upon Win/Lose, and no \"<i>Run</i>\" option available)
        this.startCombat(new Kiha());
        this.spriteSelect(72);
        this.monster.createStatusAffect(StatusAffects.Spar, 0, 0, 0, 0);
    }
    //Spar with Friendly Kiha - Player Wins (Z)
    public winSparWithKiha(): void {
        this.clearOutput();
        this.spriteSelect(72);
        if (!this.followerKiha()) {
            this.outputText("Kiha sways back and forth for a moment, then drops her axe with numb hands.  As soon as she does, the hot glow of the weapon's cutting edge fades to silver, and the weapon lands with a heavy 'thunk' in the dirt.  The dragoness drops to her knees and slumps back against a tree, her limbs trembling weakly as she tries to rise.  \"<i>You... you... haven't... beaten me,</i>\" she mutters, even though it's quite clear that you have.", false);
            this.outputText("[pg]Even though it was just a mock match, you can clearly see the dragoness took the loss as a personal failure.  She flops back down, unable to rise again, and curses at herself.  \"<i>If... if I can't defeat you, " + this.player.short + ", how the hell am I supposed to beat Lethice?</i>\"", false);
            this.outputText("[pg]While you can't answer her question, you can give her a hand up.  She's surprisingly light for her size and build, though - when you pull her up, she tumbles forward into your arms.", false);
            this.outputText("[pg]\"<i>W-what are you doing!?</i>\"  she starts, pushing away.  \"<i>You - you dumbass!</i>\"  Face as red as her scales, she launches into the air and flies off.", false);
            this.outputText("[pg]You sigh and head back to camp.", false);
            this.kihaAffection(20);
        }
        else {
            this.outputText("Kiha sways back and forth for a moment, then drops her axe with numb hands.  As soon as she does, the hot glow of the weapon's cutting edge fades to silver, and the weapon lands with a heavy 'thunk' in the dirt.  The dragoness drops to her knees and slumps back against a rock, her limbs trembling weakly as she tries to rise.  \"<i>You... you... haven't... beaten me,</i>\" she mutters, even though it's quite clear that you have.", false);
            this.outputText("[pg]Even though it was just a mock match, you can clearly see the dragoness took the loss as a personal failure.  She flops back down, unable to rise again, and curses at herself.  \"<i>If... if I can't defeat you, " + this.player.short + ", how the hell am I supposed to beat Lethice?</i>\"", false);
            this.outputText("[pg]While you can't answer her question, you can give her a hand up.  She's surprisingly light for her size and build, though - when you pull her up, she tumbles forward into your arms.", false);
            this.outputText("[pg]\"<i>W-what are you doing!?</i>\"  she starts, pushing away.  \"<i>You - you dumbass!</i>\"  Face as red as her scales, she storms off to the other side of camp.", false);
            this.outputText("[pg]You sigh and head back towards your stuff.", false);
            this.kihaAffection(20);
        }
        this.cleanupAfterCombat();
    }
    //Spar with Friendly Kiha - Kiha Wins (Z)
    public sparWithFriendlyKihaLose(): void {
        this.clearOutput();
        this.spriteSelect(72);
        if (!this.followerKiha()) {
            this.outputText("You can't take it anymore!  You stumble away from the dragoness, but only make it a few feet before toppling over, landing right on your ass.  Dazed, you can only sit there as Kiha casually walks over and presses the haft of her axe into your throat.", false);
            this.outputText("[pg]\"<i>Bam. You're dead!</i>\" she laughs, giving you a little pop on the chin before slinging it back over her shoulder.  \"<i>Come on, " + this.player.short + "!</i>\"  she jeers, \"<i>How the hell do you think you're going to beat the Demon Queen if you can't even beat me, huh?</i>\"", false);
            this.outputText("[pg]Her words cut deeper than you expected, and you remain silent.  After a moment, Kiha huffs and looks away.  \"<i>Look. If you really wanna get stronger, I guess we could... keep doing this.  Not that I'm doing it for you!</i>\"  she adds, crossing her arms.  \"<i>You're good target practice.  That's all.</i>\"", false);
            this.outputText("[pg]Oh, Kiha.", false);
            this.outputText("[pg]You dust yourself off and head back to camp under the watchful gaze of the dragoness.  You'll have to spend some time recovering.", false);
        }
        else {
            this.outputText("You can't take it anymore!  You stumble away from the dragoness, but only make it a few feet before toppling over, landing right on your ass.  Dazed, you can only sit there as Kiha casually walks over and presses the haft of her axe into your throat.", false);
            this.outputText("[pg]\"<i>Bam. You're dead!</i>\" she laughs, giving you a little pop on the chin before slinging it back over her shoulder.  \"<i>Come on, " + this.player.short + "!</i>\"  she jeers, \"<i>How the hell do you think you're going to beat the Demon Queen if you can't even beat me, huh?</i>\"", false);
            this.outputText("[pg]Her words cut deeper than you expected, and you remain silent.  After a moment, Kiha huffs and looks away.  \"<i>Look. If you really wanna get stronger, just keep trying.  That's how you won my heart, wasn't it?</i>\"  she adds, crossing her arms and blushing.  \"<i>C-come on, let's get you healed up.</i>\"", false);
            this.outputText("[pg]Oh, Kiha.", false);
            this.outputText("[pg]You dust yourself off and head back to the center of camp under the dragoness's watchful gaze.", false);
        }
        this.kihaAffection(10);
        this.cleanupAfterCombat();
    }
    //Hug Friendly/Warm Kiha (Z)
    private hugFriendWarmKiha(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.outputText("With a little grin, you grab Kiha in a tight surprise hug!", false);
        this.outputText("[pg]\"<i>What... what're you...</i>\" she stammers, but soon goes quiet with a final mutter of \"<i>Idiot.</i>\"", false);
        this.outputText("[pg]You're not surprised at her comforting warmth, but Kiha is amazingly soft once you get your arms around her.  Her smooth, partially-scaled skin yields easily as you press the dragoness against yourself.  What shocks you most, however, is that after a long moment, Kiha sighs and slips her muscular arms around you, too.", false);
        this.outputText("[pg]The peaceful, companionable embrace only lasts for a few seconds before Kiha suddenly and violently pushes you away.  \"<i>What do you think you're doing, idiot!</i>\"  she shouts, and launches off into the air before you can respond.", false);
        this.outputText("[pg]You shake your head and head on back to camp.", false);
        this.kihaAffection(5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    //lose some corruption?
    //Talk to Friendly Kiha - First Time (Z)
    private talkToFriendlyKiha(): void {
        this.clearOutput();
        this.spriteSelect(72);
        if (this.flags[kFLAGS.KIHA_TALK_STAGE] <= 3) {
            this.flags[kFLAGS.KIHA_TALK_STAGE] = 3;
            this.outputText("You ask the dragoness if she wouldn't mind talking for a few minutes.", false);
            this.outputText("[pg]Kiha crosses her arms contemptuously.  \"<i>Oh, you're still all talk!  Talking doesn't get anybody anywhere, dammit!  Have you ever tried talking to a demon?  All it does is give them more time to find a way to fuck you.</i>\"  You sigh and ask her to just humor you.  She rolls her eyes, but doesn't refuse you.  That's a start, at least.", false);
            this.outputText("[pg]Reclining near the dragoness, you ask her a little bit about herself.  Innocent questions, really - where she was born, about her parents, anything she can tell you.  The dragon huffs, breathing out a little cloud of smoke.  \"<i>Fucking idiot.  I told you that I don't remember, okay?  Just a few... images before the demons took me.</i>\"", false);
            this.outputText("[pg]You ask her about those bits and pieces, but she cuts you off with a sweep of her arm, her claws flying so near your face you can feel the air moving.  \"<i>Just shut up, damn it!  I don't want to talk about it!</i>\"  You shrug and ask her what she wants to talk about.  She sneers. \"<i>Fine, if you're so keen on talking, let's talk about YOU!</i>\"", false);
            this.outputText("[pg]Wait, didn't you do this already?  But, you decide to humor the dragoness, and start to tell her a little bit about the village you grew up in, training to be champion, and your eventual arrival in the land of Mareth.  The dragoness listens silently, motionlessly, simply eyeing you as you speak.  When you finish, culminating your story in first meeting her, Kiha only nods slightly.", false);
            this.outputText("[pg]You venture to ask her if she has anything to say, but she turns her nose up at the idea.  \"<i>You think we're the same, don't you?  That we both had it SO tough?  Well, you're wrong!  Just because you helped me out ONCE doesn't mean we're all buddy-buddy, and it sure as hell doesn't mean we're the same.  So... so just fuck off, alright!?</i>\"  she screams before thrusting into the air and flying off.", false);
            this.outputText("[pg]God dammit, Kiha.", false);
        }
        else if (this.flags[kFLAGS.KIHA_TALK_STAGE] == 4) {
            //Talk to Friendly Kiha - Second Time (Z)
            this.outputText("You try to talk to Kiha again, but she starts speaking a moment before you do:  \"<i>I'm done listening to you ramble on about yourself,</i>\"  she snaps, glowering at you.  \"<i>I feel like talking about ME, and you're going to shut up and listen.  Got it?</i>\"", false);
            this.outputText("[pg]You suppress a grin and agree.  She gives you a surprisingly approving nod, and begins to speak:  \"<i>I was born a lizan, destined to be a warrior - a great warrior.  I'd have fought in countless battles, slain my tribe's enemies by the thousands... and I would never have been defeated.</i>\"", false);
            this.outputText("[pg]You communicate your understanding, though a quick glance from the dragoness forestalls speech.  \"<i>When the demons came, I would have tried to fight.  We all would have. But somehow... somehow they won.  We must have been fools.  If we had trained harder, fought better... I could... could still remember who I was...</i>\"", false);
            this.outputText("[pg]She trails off for a moment.  You're about to speak, but she suddenly blows a great cone of fire into the air, illuminating the dark swamp with a pillar of fire.", false);
            this.outputText("[pg]\"<i>But look at what they made me,</i>\" she says, grinning.  \"<i>The demons wanted the perfect warrior - the next generation of demon soldiers.  Well, they got the first part right,</i>\" she says, baring her fangs and claws menacingly.  \"<i>Now that I'm free, I just need to find that bitch Lethice and shove a claw right up her ass... for my people.</i>\"", false);
            this.outputText("[pg]Before you can answer her claim, the dragoness inclines her head to you and leaps into the air, disappearing into the dense foliage.", false);
            this.outputText("[pg]Maybe... just maybe... this is progress?", false);
        }
        //Talk to Friendly Kiha - Third Time (Z)
        else if (this.flags[kFLAGS.KIHA_TALK_STAGE] == 5) {
            this.outputText("You sit the dragoness down once again, and gently try to coax a little more out of her.  Surely she's got more to tell, after all.  Before you've even finished your request, however, the dragoness snarls and lets out a little gout of flame, ending just before your nose.", false);
            this.outputText("[pg]\"<i>Dammit, " + this.player.short + "!</i>\"  she hisses, waving away the smoke.  \"<i>I'm fucking done talking!  Why the hell do you keep this shit up, huh?  All this talk and talk and talk!  You keep coming here, talking your precious morals and acting like you ACTUALLY give a shit about me.  Well, fucking stop!</i>\"", false);
            this.outputText("[pg]She waves a clawed hand your way, making you stumble back or else lose your face.  \"<i>You keep saying you're some high and mighty champion out to stop the demons!  Well where's the fucking proof, huh?  It's all talk with you!  Why the hell aren't we out there FIGHTING!?  We should be kicking in Lethice's front door, not pussy-footing around here TALKING about our fucking FEELINGS or some shit!  Come on, if you're so strong you can knock me on my ass, you and I together ought to be able to do SOMETHING about this fucking bitch!  Right?</i>\"", false);
            this.outputText("[pg]You're utterly taken aback by the dragoness's sudden outburst.  Before, it seemed like she was more interested in defending herself - hiding, really - than fighting.  What's brought this change on?", false);
            this.outputText("[pg]She snarls animalistically.  \"<i>Oh, I fucking knew it!  I say, 'hey, let's take on the demons', and all you want to do is fucking analyze my feelings.  Of course you do! What good are you, anyway? What use is a champion who just sits around talking, huh?  How is that going to fuck up Lethice, topple the demons?  Huh?</i>\"", false);
            this.outputText("[pg]You try to calm her, telling her you just aren't ready to take down the demon queen.  She laughs maniacally, so hard that a bit of red-hot fire blows out her mouth.  \"<i>Oh, of course not!  You wouldn't be ready - you haven't sat on your ass enough yet, have you!  Well let me tell you a little bit about my feelings then, since you're so god-damn eager!  I'm done waiting around! Those demons ruined my life, and I'm fucking done waiting.  I want vengeance, and I want it RIGHT FUCKING NOW!</i>\"", false);
            this.outputText("[pg]Before you can answer the dragoness, she blasts off the ground and flies off, hurtling over the treetops with her axe firmly in hand.", false);
            this.outputText("[pg]You hope she doesn't get herself in trouble, but there's not much you can really do about it right now...", false);
        }
        this.flags[kFLAGS.KIHA_TALK_STAGE]++;
        //lose some corruption
        this.dynStats("cor", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    //Kiha x salamander Threesome - Introduction (Z)
    public kihaXSalamander(): void {
        this.clearOutput();
        this.spriteSelect(72);
        //Requirements:
        //-PC has achieved \"<i>Fuckbuddy</i>\" status with Hel (via Mino threesome) OR Hel is a companion.
        //-PC has achieved \"<i>Friendly</i>\" status with Kiha (via saving her from spider gangbang) and maxed out her Affection meter (100 Affection).
        //-PC has a dick
        //-Scene procs when exploring the [SWAMP], the first time all of the requirements are fulfilled.
        //Introduction Scene:
        this.outputText("You make your way to the murky swamp.  The going is rough, your progress impeded by the thick vines and webs that hang between the trees.  Despite - or perhaps because of - your slow pace, you're surprised that nearly an hour goes by without you encountering anything of note.  By now, you'd expect to have found a bit of usable silk, or a spider-girl, or anything.", false);
        this.outputText("[pg]Suddenly, your quiet trek is interrupted by Kiha the dragoness plummeting out of the air, slamming into the ground with earth-shaking force, spraying loam and moss everywhere as she comes to a stop.", false);
        this.outputText("[pg]She rises to her feet, leaning heavily on her greataxe.  \"<i>Well, well,</i>\"  she sneers, a thin grin on her lips.  \"<i>Coming to visit me, " + this.player.short + "?  How thoughtful.</i>\"", false);
        this.outputText("[pg]You attempt to explain that you were just exploring, but before you can finish half a sentence, Kiha swings her axe up into a fighting pose.  \"<i>Fuck that,</i>\"  the dragoness growls.  \"<i>I'm in the mood for a fight, so come on, " + this.player.short + "!  Put 'em up!</i>\"", false);
        this.outputText("[pg]You quickly prepare for combat, readying your [weaponName] against the inevitable assault, and have only just done so when Kiha launches herself at you, swinging wildly with her greataxe.  You narrowly parry one blow, then another, forced back by the dragoness's relentless assault.", false);
        this.outputText("[pg]She pushes you back under a hail of axe blows, seemingly unconcerned for your safety as you only just avoid cuts from all directions.  As she continues her attack, she begins laughing riotously, almost cruelly as she comes closer and closer to beheading you.", false);
        this.outputText("[pg]Suddenly your back's to a tree, and you know you aren't going anywhere - you're afraid you're going to have to hurt the murderous dragoness to save yourself when you catch sight of a dark, shadow-wreathed form moving behind Kiha, a curved sword raised.", false);
        this.outputText("[pg]You consider warning the dragoness, but too late!  The mysterious figure leaps from the brush and shoulder-slams into Kiha, throwing her right off you and into the mud.  Before you can even say a word to your new friend, she grabs you by the scruff of your neck and throws you to the ground behind her, putting herself between you and Kiha.", false);
        this.outputText("[pg]You could just lie there, but you're not sure how well you'd fare against two powerful warriors at once - you could end up dominated, at the very least.  You could instead try and get the jump on the fighters before they jump you... Or, you suppose you could get the fuck out while you have the chance.", false);
        //(Display Options: [Lie There] [Jump Them] [GTFO])
        this.simpleChoices("Lie There", this.lieThere, "Jump Them", this.jumpDaBitches, "GTFO", this.GTFO, "", undefined, "", undefined);
    }

    //GTFO (Z)
    private GTFO(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.flags[kFLAGS.KIHA_AND_HEL_WHOOPIE] = -1;
        this.outputText("While Kiha and the mysterious swordsman are distracted, you pick yourself up out of the mud and high-tail it out and head back to camp.  Over your shoulder, you hear the sounds of battle raging.", false);
        //to what penalty?
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    //Lie There
    private lieThere(): void {
        this.flags[kFLAGS.KIHA_AND_HEL_WHOOPIE] = 1;
        this.outputText("", true);
        this.spriteSelect(72);
        this.outputText("You decide to let things take their course.  You look up to the swordsman standing over you...", false);
        this.outputText("[pg]Wait, you recognize that tail - and that taut ass!  You grin as you watch Helia the salamander's fiery tail swish over you, her scimitar gripped firmly in both hands.", false);
        this.outputText("[pg]\"<i>OH HELL NO, you scaly bitch,</i>\"  Hel growls, leering down at Kiha as the dragoness leaps to her feet, axe raised.  \"<i>You do NOT fucking touch my " + this.player.short + " and get away with it.  You hear me?</i>\"", false);
        this.outputText("[pg]\"<i>You BITCH!</i>\"  Kiha screams, flicking mud off her nude body.  \"<i>How dare you?  How DARE YOU throw ME in the MUD!?  I'll fucking teach you!</i>\"", false);
        this.outputText("[pg]OHSHIT.  You duck down as a great gout of flame shoots over you, utterly consuming Hel in the blast and nearly baking you into the mud.  Laughing, Kiha roars in triumph as Hel vanishes in the smoke cloud left over from the dragon-flame blast.", false);
        this.outputText("[pg]You cough violently as the smoke settles.  You wave your hand in front of your face, desperately looking in the baked mud for some sign of a surely-incinerated Hel... yet she still stands!  Though you can see her scale bikini and thong have been incinerated, leaving her as nude as Kiha with her big breasts hanging free, she has survived seemingly unscathed.", false);
        this.outputText("[pg]Scowling, the salamander simply crosses her arms over her ample bosom.  \"<i>Seriously. Seriously, you cunt!?</i>\"  Hel snaps, grabbing her fiery tail.  \"<i>Do you even fucking SEE THIS!? That weak shit does nothing to me, you moron.</i>\"", false);
        this.outputText("[pg]Kiha stands dumbfounded for a moment, surprised her potent fire-breath didn't simply melt the flesh from Hel's bones.  She recovers quickly, though, and yells, \"<i>Get out of here!  This is MY swamp, and that ", false);
        if (!this.player.isGoo()) this.outputText("meatsack", false);
        else this.outputText("goosack", false);
        this.outputText(" behind you belongs to ME, you got it?</i>\"", false);
        this.outputText("[pg]\"<i>Oh, " + this.player.mf("he", "she") + " belongs to you, is that it?</i>\"", false);
        this.outputText("[pg]\"<i>That's right, you bitch.  So get your fat scaly ass out of the way!</i>\"", false);
        this.outputText("[pg]\"<i>FAT!?</i>\"  Hel fumes, her tail swaying dangerously behind her.  \"<i>You're just jealous you don't have an ass as fine as this one!</i>\"", false);
        this.outputText("[pg]Kiha scowls, turning a half-circle so her muscular ass is clearly visible.  \"<i>Ha! Like I have ANYTHING to be jealous of!  You're the one that ought to be jealous!</i>\"", false);
        this.outputText("[pg]Hel stomps her foot in outrage.  \"<i>Oh, fuck you! My ass is LEAGUES better than that mound of shitter-muscle.</i>\"", false);
        this.outputText("[pg]\"<i>SHITTER MUSCLE!?!</i>\"", false);
        this.outputText("[pg]\"<i>Shitter muscle,</i>\" Hel says with a sneer.  \"<i>And to top it all off... You've got small tits.  Why the hell would " + this.player.short + " want those little things over THESE,</i>\" she laughs, cupping her big E-cups for emphasis.", false);
        this.outputText("[pg]\"<i>Oh, like " + this.player.short + " would even look twice at those floppy things!</i>\" Kiha growls, grabbing her own D-cups defensively.  \"<i>" + this.player.mf("He", "She") + " OBVIOUSLY prefers smaller, perkier boobs.  Don't you, " + this.player.short + "?</i>\"", false);
        this.outputText("[pg]You start to stammer an answer, but before you know it, Hel's put a foot on your chest, pushing you just a little deeper into the still-hot mud.  \"<i>How the hell would YOU know what " + this.player.short + " likes, huh?  <i>I</i> know exactly what makes " + this.player.mf("him", "her") + " tick!</i>\"", false);
        this.outputText("[pg]Before you can say a word in your own defense, Hel uses her clawed foot to rip off the bottom of your [armorName].  Grinning at you, she puts the heel of her foot on the bottom of [cock one].  She gives it a short, forceful rub, pushing your stiffening cock into your belly as she runs her heel across it.  She gives your cock a few playful strokes, but the tell-tale hardening of your cock soon turns it into a full-blown footjob, with Hel hooking her heel's claw around one side of your shaft and wrapping the rest of her foot around the other side.  She shamelessly jerks you off, pumping your stiffy as Kiha stares, wide-eyed.", false);
        this.outputText("[pg]Kiha yells in feral outrage.  \"<i>HOW THE FUCK DARE YOU!?</i>\"  she screams, storming over.  \"<i>Get your filthy feet off " + this.player.short + "!</i>\"", false);
        this.outputText("[pg]Kiha gives Hel a forceful shove, causing her to stumble back as the dragoness looms over you.  \"<i>Why the hell would you like a whore like her, huh?</i>\" she asks, \"<i>The kind of girl who, on a damn whim, just starts handing out favors.  What, do you LIKE sluts?  Huh?  Is that it?</i>\"", false);
        this.outputText("[pg]Dammit, these girls aren't letting you get a word in edgewise.  You're about to start shouting, but to your utter shock, Kiha plants her foot right on your cock.  \"<i>Well, if you like wanton sluts so much, what do you think about this!?</i>\"  She runs her foot along the length of your cock, making a slow, sensuous stroke along the entire length, coming to rest her surprisingly dainty toes on your now-engorged tip.  \"<i>That's what you like, isn't it?  I had you figured for something other than a sex-crazed freak, but maybe that bitch is right - you're just in it for this, aren't you?</i>\"", false);
        this.outputText("[pg]You look on tensely as Kiha runs the length of her own heel-claw along your cock's underside, making a slow, gentle path from tip to base [if (hasBalls) \"giving your sack a little pat with the flat of her claw, making you cringe with pleasure and fear\"].", false);
        this.outputText("[pg]Suddenly, Hel rises from the dirt beside you, her tail flaming dangerously.  \"<i>Oh, FUCK YOU!</i>\"  Hel cries, stamping back to stand beside Kiha.  \"<i>How the FUCK would you know ANYTHING about what " + this.player.mf("he", "she") + " likes?  You think you know?  I'll fucking SHOW YOU!</i>\"", false);
        this.outputText("[pg]As Kiha's foot comes to rest along the base of your cock, Hel rubs her foot along your cockhead, making you gasp and shudder with ecstasy as she begins to foot-fuck you.  Kiha growls and makes a quick jab up your shaft, using the hook of her claw like half a hand to jerk you off as Hel slides the flat of her foot along your shaft.", false);
        this.outputText("[pg]Growling at each other like animals, Kiha and Hel continue to foot-fuck you.  Now they're not even paying attention to you, instead staring each other down in a death glare that would wither even a demon's will.  You gasp and moan under the double-foot-assault, squirming as they viciously bring you closer and closer to orgasm.", false);
        this.outputText("[pg]You roll your head back in a silent cry as Hel and Kiha rape you, scowling and mumbling curses, waiting to see whose footjob will bring you to orgasm fastest - a sort of test of sexual expertise between the fiery scaled girls.  You aren't going to last much longer under this kind of pressure, and you desperately buck your hips into their feet.  But they refuse to let up, and so with a soul-baring moan, you cum.  You shudder and squirm as a white-hot streak of cum shoots out of your dick, smearing all over the sole of Hel's foot.  She gasps happily, but her ecstatic reaction lets your pecker flop free, spurting another load right up Kiha's thigh, staining her dark red scales white near her loose cunt.  The dragoness laughs triumphantly, but your dick gets away again, squirting a last shot of jizz right onto Hel's taut ass, leaving a trickle of sperm running down her ass cheeks.");
        this.outputText("[pg]\"<i>See?</i>\"  Kiha shouts, grabbing at the stain you've left on her thighs, \"<i>" + this.player.short + " obviously likes me better - " + this.player.mf("he", "she") + " dropped " + this.player.mf("his", "her") + " cum RIGHT next to my vag.  " + this.player.mf("He", "She") + " probably wants to knock me up even, don't you, " + this.player.short + "?</i>\"", false);
        this.outputText("[pg]\"<i>Oh, is that right?</i>\"  Hel laughs, giving her ample hips a shake forceful enough to dislodge your spooge, hitting Kiha full on the face.  \"<i>" + this.player.short + " put a load right in my asscheeks - " + this.player.mf("he", "she") + " gave me the last AND the dirtiest load.  What do you get? Oh, that's right, a vag shot.  How unique!</i>\"", false);
        this.outputText("[pg]\"<i>What would you even know about it, slut?</i>\"  Kiha roars, breathing fire right in Hel's face.  The salamander just waves it off indignantly.", false);
        this.outputText("[pg]\"<i>Hey, hey dragon bitch.  You've got a little SOMETHING ON YOUR <i>FACE!</i>\"  She shouts, whipping her tail around and swatting Kiha right in the cheek.  The dragoness recoils, clasping her now beat-red cheek before lashing out, punching Hel right in the tit.", false);
        this.outputText("[pg]Okay, fuck this, you think to yourself, trying to grab your torn clothing as the two fire-girls start to go at it all-out.  You grab your shit and try to stumble out of the line of fire as you redress, watching the two girls throw each other into the mud and start beating the shit out of each other.", false);
        this.outputText("[pg]When you're finally dressed and ready, you shout \"<i>BREAK IT UP!</i>\"  as loud as you can, hopefully trying to break through the sounds of their wet wrestling and flying punches.  It takes a moment, but the girls finally stop their fighting, rolling up to sit in the mud.", false);
        this.outputText("[pg]For the life of you, you can't tell them apart - Kiha's wings and horns are invisible in the thick cake of half-baked mud coating whichever one she is, and Hel's more ample endowments are out of sight under two pairs of sitting butts and crossed arms.", false);
        this.outputText("[pg]\"<i>Well fine!</i>\"  one of them yells.  For the first time, you notice their voices are damn similar.  \"<i>Tell that bitch you like me better, and maybe she'll get the goddamn point already!</i>\"", false);
        this.outputText("[pg]\"<i>Like her better!  Ha!  Come on, " + this.player.short + ", you and I both know you like ME better.  AND that I give the best footsies.</i>\"", false);
        this.outputText("[pg]Well, shit. This isn't good.  You can't tell the girls apart, and now they're asking who you like better.  You sigh heavily, and as evenly as possible, try to explain that you like BOTH of them.", false);
        this.outputText("[pg]\"<i>WHAT!?</i>\"  they cry in unison, then turn and glare angrily at each other.  \"<i>You-you can't like HER TOO!</i>\"  they say, again in perfect concert.", false);
        this.outputText("[pg]Yes, you damn well can!", false);
        this.outputText("[pg]Happily, Kiha finally wipes the mud off her dark face, glaring at Hel, who quickly does the same.  The dragoness huffs indignantly.  \"<i>I guess if " + this.player.short + " is all right with you...</i>\"");
        this.outputText("[pg]\"<i>Yeah, yeah,</i>\"  Hel says, rolling her eyes.  \"<i>And you do give damn good footjobs.</i>\"", false);
        this.outputText("[pg]\"<i>Yeah.  Yeah, I do.</i>\"", false);
        this.outputText("[pg]Hel scowls at the haughty dragoness... Then they both break out laughing at once.  You try to keep a straight face, but soon you're laughing with them.", false);
        this.outputText("[pg]\"<i>Fine,</i>\"  Kiha says, putting up a cocky grin.  \"<i>If " + this.player.short + " can tolerate you, then I guess... you're welcome in my swamp, I guess.</i>\"", false);
        this.outputText("[pg]\"<i>And hey... if you ever go to the plains...</i>\"", false);
        this.outputText("[pg]\"<i>Not on your life, bitch!</i>\"  Kiha yells, laughing, and shoots up into the air, raining mud and loam behind her.", false);
        this.outputText("[pg]\"<i>FUCK YOU ANYWAY!</i>\"  Hel yells after her, fist clenched.", false);
        this.outputText("[pg]And here we almost had a beautiful moment going.  You sigh, wipe the mud off Hel's face enough to give her a little kiss, and head on back to camp.", false);
        this.outputText("[pg]Your [armorName] squelches wetly all the way, full of your cum as it is.", false);
        this.player.orgasm();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    //Jump Them
    private jumpDaBitches(): void {
        this.flags[kFLAGS.KIHA_AND_HEL_WHOOPIE] = 1;
        this.outputText("", true);
        this.spriteSelect(72);
        this.outputText("Scowling, you pick yourself up from the mud and wipe the grit off your [armorName].  You stalk up behind the mysterious swordsman and grab her by the scruff of the neck.  Suddenly she's yelling and flailing in your arms, a hefty tail thrashing around your [legs].  You tighten your grip on her and drag her over to Kiha as the dragoness is pulling herself out of the mud, reaching for the battleaxe that fell out of her hand.  Before she can find it, you toss the swordsman onto her, barreling Kiha over and leaving the two of them lumped in a pile in the mud.");
        this.outputText("[pg]The swordsman's cloak came off in the throw; tossing it aside, you step up to loom over Hel the salamander, her pale face currently mashed between Kiha's big, dusky tits.  \"<i>G-get off of me!</i>\" Kiha snaps, pushing at the salamander's shoulders.", false);
        this.outputText("[pg]\"<i>Hey! Hands off, bitch,</i>\" Hel growls, voice muffled in Kiha's flesh, brandishing her long, sharp claws.  She extricates herself from the dragoness's bosom, just in time for Kiha to give her a solid punch right in the face!", false);
        this.outputText("[pg]Hel tumbles off her, clutching her cheek as Kiha tries to get up a second time.  Not fucking likely.  You ");
        if (this.player.isBiped()) this.outputText("stride over");
        else if (this.player.isNaga()) this.outputText("slither over");
        else this.outputText("move toward her");
        this.outputText(" and plant a [foot] on her chest, pinning her to the ground.  \"<i>Hey, what the fuck!  Get off me!</i>\"");
        this.outputText("[pg]After what she just tried to pull, you tell her to sit down and shut up.  Behind you, Hel squirms around until you grab her arm and drag her over to sit by Kiha.  \"<i>" + this.player.short + "!  I was trying to help you!</i>\"  You just scowl and grab both scaly girls by the hair, dragging them up to kneel in front of you.  They squirm and struggle in your grasp, until you give the both of them a hand slap.  That shuts them up for the moment.", false);
        this.outputText("[pg]Now that the girls are relatively docile in your grasp, you reach into your dirty [armorName] and pull out [eachCock].  A bit of mud seems to have soaked through your clothes, and a few nice big patches are on your hardening cock's shaft.  Grinning wickedly at the scaly girls, you tell them that since it's their fault your dick's dirty, it's their duty to clean you up.", false);
        this.outputText("[pg]Kiha gapes at you, wide-eyed.  \"<i>B-bullshit! I'm not touching that disgusting thing.</i>\"  While her mouth is open and spewing her bullshit, you happily plunge your cock right in, thrusting in past her full lips until your head ", false);
        if (this.player.cocks[0].cockLength >= 8) this.outputText("bends down her throat");
        else if (this.player.cocks[0].cockLength > 6) this.outputText("hits the back of her throat", false);
        else this.outputText("rests right on the tip of her tongue", false);
        this.outputText(".  She struggles, gagging; you give her a light slap and tell her to clean your dick off.", false);
        this.outputText("[pg]Kiha continues to struggle, forcing you to grab her head in both hands and start using her mouth like your personal onahole, rocking her jaw back and forth over your [cock].  Seeing Kiha gag on your cock, Hel lets out a hearty laugh, teasing the dragoness about her current predicament.", false);
        //[If Single Cock]
        if (this.player.cockTotal() == 1) {
            this.outputText("[pg]Not wanting to let such a lewd mouth as Hel's go to waste, you pull out of Kiha's mouth until only your head is still between her lips and, grabbing Hel's chin, pull her over to your shaft and command her to lick.  Now it's Hel's turn to struggle in your grasp, but Kiha gives her a hard slap on the ass with her tail, the force of the blow throwing her face right into your crotch.  Grudgingly, Hel's long, slender tongue slips out of her mouth and wraps around and around the length of your [cock], coiling around you like a snake.", false);
            this.outputText("[pg]So enwrapped, you put a hand on each of the girls heads and begin to thrust into Kiha's mouth again, fucking her mouth with Hel's tongue still circled around your prick's length.  You settle into a nice rut, face-fucking Kiha while each buck of your hips drags Hel's entire head along for the ride, her cheek slapping into Kiha's each time you bottom out in the dragoness's mouth.", false);
        }
        //[Else, If Multicock]
        else {
            this.outputText("[pg]Not wanting to let such a lewd mouth as Hel's go to waste, you grab your [cock 2] out of your armor and press its head against Hel's lips.  She starts to protest, but just like you did with Kiha, as soon as she opens her mouth to complain you ram your secondary cock in, burying its length in her face.  She gags and gasps, but you just grab both girls by the hair and start to fellate yourself with them, ramming their faces down your cocks until you're a spit-slicked mess, until both girls have become completely compliant, simply allowing you to use them.", false);
        }
        //[scenes recombine]
        this.outputText("[pg]Tiring of the scaly girls' oral ministrations, you pull them back off your cock", false);
        if (this.player.cockTotal() > 1) this.outputText("s", false);
        this.outputText(", grinning as thick ropes of saliva and pre still connect their gaping, well-used mouths to you.  Roughly, you throw the girls on their backs, side by side as you loom over them.  Grinning, you say that since they've been such good girls and got your dick", false);
        if (this.player.cockTotal() > 1) this.outputText("s", false);
        this.outputText(" nice and spotless, you'll be kind enough to get them off.", false);

        this.outputText("[pg]Hel smiles slightly, relieved she's finally getting some action; Kiha, on the other hand, squirms and tries to crawl away from you.  Before she can, you roll Hel over onto her, pinning Kiha down with Hel's much greater weight.  You kneel down between their legs and, pulling them by the feet a bit closer to you, leaving their slavering cunts just at the tip of your [cock].  You heft Hel's wide hips up, leaving her ass in the air.  With one hand, you stroke your [cock] as you line up with her slick, wet cunny; with the other, you grab Kiha's long, thick tail and press the tip of it up against Hel's tight little pucker.", false);
        this.outputText("[pg]Kiha just sits there, huffing and motionless underneath Hel.  You're ready to chastise her when suddenly, Hel wraps her own fiery tail around your waist and thrusts it into Kiha's slick twat.  The dragoness yelps in shock as Hel's tail slams into her unprepared cunt, and sure enough her tail lashes out, plunging into Hel's ready anus.  The salamander grunts as the first few inches of Kiha's scaly tail slither into her, guided by your hand.  Now that's she's half-full, you grab your cock and thrust into Helia's wet and ready cunt.", false);
        this.outputText("[pg]Hel squeals as you begin your half of the double fucking.  You grab her big hips and start hammering her hard and fast, slamming your [cock] in and out of her as fast as you can right from the get-go.  Within moments, the poor salamander's tongue has lolled from her mouth and her eyes are crossed, overwhelmed by the pleasure of your furious assault and the big, thick tail squirming around in her asshole.", false);
        this.outputText("[pg]A particularly cruel idea crosses your mind.  You lean around Hel, and grab Kiha's arms.  Before the dragoness can protest, you wrap her arms lovingly around Hel's waist and push the salamander's insensate face between her big tits, forcing Kiha to gently hug Hel as the two of you fuck her.  Indignant, Kiha immediately tries to move her arms, but Hel chooses that exact moment to have a violent orgasm, thrusting her tail hard into Kiha's twat, filling her loose hole utterly.  The dragoness cries out, gripping down on Hel's back hard enough to scratch her red scales, but you can hardly pay attention to her as the slick fuck-tunnel enveloping your cock tries desperately to milk your shaft through Hel's orgasm, squeezing and crushing your length until you're forced to pull out lest you cum, too.", false);
        this.outputText("[pg]You yank your cum-soaked [cock] out of Hel's quivering pussy and roll her off the dragoness.  You leer at Kiha, but with Hel's spasming tail thrashing about in her slit, she hardly even notices you - she's much too busy desperately keeping in her moans of pleasure, trying to maintain her unwilling facade.  Taking advantage of her helpless state, you grab Kiha's legs and throw them over your shoulders, spreading her legs and the cheeks of her big butt nicely.", false);

        this.outputText("[pg]Grinning, you shift around until your cockhead's lined up with the tight, dark ring of the dragoness's asshole.  The pressure of your tip brushing against her sphincter is enough to break Kiha out of her reverie, but it's too late to help her.  She can only throw her head back and scream as you thrust in, burying yourself ", false);
        if (this.player.cockArea(0) < 36) this.outputText("up to the hilt", false);
        else this.outputText("until she simply can't take any more of you, her anus already stretched beyond its capacity", false);
        this.outputText(".  grabbing her big, soft tits, you start to pull out of her, savaging her nipples and digging into her sensitive titflesh as you bring your cock out until just the head remains inside her.", false);

        this.outputText("[pg]With a grin, you slam back into her with one mighty thrust.  The dragoness screams as you ram into her asshole, brutally fucking her butt until she can't hold in her cries and moans any longer.  She starts moaning like a whore, matching each and every one of your thrusts with a lewd moan or by pinching her own nipples.  She even grabs Hel's tail, still buried inside her, and starts to masturbate herself with it, doubling her pleasure as you ream her.", false);
        this.outputText("[pg]She's deliciously tight, her anal walls gripping down and milking you with every thrust until her insides are utterly soaked with your thick pre.  Kiha gasps as an errant thrust lets a bit of your warm white pre escape, dribbling down her buttcheeks to pool beneath her thighs.  Now with each of your thrusts she begins to grip down hard on your [cock], her pleasure beginning to overwhelm her.  Laughing, you remind her just how much of a slut she's become, screaming her pleasure as she fucks herself with a stranger's tail and you pound her asshole until your cum's leaking out.", false);
        this.outputText("[pg]Kiha only even tries to deny you for a split second before Hel, chuckling, wiggles her tail's tip inside the dragoness's twat.  Kiha rolls her head back and cums, screaming, her stuffed holes contracting hard on your prick and Hel's tail.  With glee, you notice that Kiha's own tail is still buried in Hel's asshole, and starts thrashing wildly.  The salamander yells out in panicked pleasure, and before you know it she's cumming again, fingering herself as Kiha tail-fucks her ass.  Watching the two girls cum together, and Kiha's anal contractions on your own member, finally overwhelm you.", false);

        this.outputText("[pg]With a grunt of pleasure, you slam yourself into Kiha and cum, shooting your load deep into the dragoness's bowels", false);
        if (this.player.cumQ() >= 1000) this.outputText(" filling her so utterly that your cum squirts back out her asshole around your cock", false);
        this.outputText(".  You make a few final, weak thrusts, riding out your orgasm until Kiha and Hel have finally calmed down, and your own [cock] is only dribbling a weak trickle of seed up Kiha's ass.", false);
        this.outputText("[pg]Laughing weakly, exhausted by your efforts at dominating the two fiery redheads, you pull out of Kiha's rectum, watching as cum gushers out of her stretched bum.  You give her a little pat on the thigh before untangling yourself from the dragoness.  You stop by to give Hel and Kiha both a quick kiss on the lips before grabbing your gear and staggering off to camp, leaving the girls to sort themselves out in the murky swamp.", false);
        this.player.orgasm();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    //Warm Kiha Admittance
    private kihaAdmitsSheLikesYourWang(): void {
        this.clearOutput();
        this.spriteSelect(72);
        if (this.flags[kFLAGS.KIHA_ADMITTED_WARM_FEELINZ] == 0) {
            this.flags[kFLAGS.KIHA_ADMITTED_WARM_FEELINZ] = 1;
            this.outputText("While exploring the swamp, you find yourself in your dragoness friend's familiar territory.  Kiha, always one for a flashy entrance, glides down from the treetops, her wings casting a fearsome shadow over the clearing.  She lands with a light touch, just a few feet away from you and leaning casually on her axe.  The dragoness harrumphs, \"<i>Back to visit already?  Well, I guess you're better than some of the other beasties that could be calling on me.</i>\"  As always, she's trying to wrong-foot you, and before you can answer her insinuations, she keeps right on going, \"<i>Why do you keep coming around?  Don't you have any real friends?  It'd be kind of pathetic if I'm the only one you have to talk to.</i>\"");
            this.outputText("[pg]Kiha's scaly tail curls up beside you and gives you a playful swat on the rump.  You jump in surprise.  Wait a second... is she blushing?  Is that affection she has buried under her tough, mean demeanor?  A show of tenderness might widen the cracks in the wall around her heart...");
            this.outputText("[pg]Do you hug her, and potentially take things to the next level, or would you rather do something else, and keep things as they are?");
        }
        //Warm Kiha Admittance Repeat
        else {
            this.outputText("Kiha lightly drops out of the trees in front of you, kicking up a small splash of fetid water as she comes to rest a few feet away.  She rests her axe over her shoulder nonchalantly and smiles as she says, \"<i>Did you come back to get your ass kicked?  You wouldn't be the first to throw fights so you could check me out while you're lying on the ground.</i>\"  Her tail swings around to playfully catch you on the " + this.buttDescript() + ", a hint of crimson spreading on her dark skin, matching the ruby hue of her shimmering scales.  Kiha strikes a battle-ready pose that looks a bit more lewd than normal as she asks, \"<i>So, you here to fight, or waste more time talking?</i>\"");
            this.outputText("[pg]Do you hug her, and potentially take things to the next level, or would you rather do something else?");
        }
        this.simpleChoices("Talk", undefined, "Spar", this.sparWithKiha, "Hug", this.hugFriendWarmKiha, "LovinHug", this.lovinHugKiha, "Leave", this.camp.returnToCampUseOneHour);
    }
    //Loving Hug
    private lovinHugKiha(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] = 2;
        this.flags[kFLAGS.KIHA_AFFECTION] = 0;
        this.outputText("You close in with Kiha before she can react and wrap your arms around her, squeezing her tightly while you admit, \"<i>I came here because I like you.</i>\"", false);
        this.outputText("[pg]Kiha looks ", false);
        if (this.player.tallness >= 95) this.outputText("up ");
        else if (this.player.tallness <= 60) this.outputText("down ");
        this.outputText("at you with moisture glittering in her reptilian eyes.  Her voice quivers uncertainly as she stutters, \"<i>W-what do you mean?</i>\"", false);
        this.outputText("[pg]You tell her how you enjoy her company, how she reminds you what you're here for, and how beautiful she is (when she isn't screaming at you).  Kiha shivers in your arms, though nothing about the steamy embrace feels the slightest bit cold.  She blinks hard and whimpers, \"<i>I... I n-never thought... I don't...</i>\"  The feisty redhead trails off and returns the hug, squeezing so hard that you worry she might break one of your ribs.  She certainly crushes most of the breath from your lungs.", false);
        this.outputText("[pg]It takes a few moments for Kiha to sense your discomfort, and when she does, she twists out of the hug, nervously fidgeting.  You grab her and pull her back over, this time taking her chin in your hand and ", false);
        if (this.player.tallness >= 95) this.outputText("pulling it down", false);
        else if (this.player.tallness <= 60) this.outputText("tilting it up", false);
        else this.outputText("tilting it slightly", false);
        this.outputText(" to plant a kiss on her dusky, parted lips.  She melts into you, the heat of her body making you sweat, but this once, you don't mind at all.  Kiha's tail wags happily, splashing through water as the eager dragoness leans against you, pushing the two of you back towards one of the nearby trees.  She hooks a leg around your thigh, pulling you so tightly into her that you can't help but be aware of her supple breasts crushing against you, the hard points of her nipples digging into you and your " + this.player.armorName + ".", false);
        this.outputText("[pg]The warrioress's axe stands a few feet back, like a silent sentinel.  It's been forgotten in the heat of moment.  Kiha's prodigious, normally suppressed libido reveals itself when she forces a long tongue into your mouth, tying up your own oral organ while her mischievous, clawed fingers gently remove your " + this.player.armorName + ", one piece at a time.", false);
        if (this.player.hasCock()) this.outputText("[pg][EachCock] springs free, smacking into Kiha's thigh as it fully engorges.  She gives it a gentle pump before commenting, \"<i>Acceptable, I suppose.</i>\"", false);
        else if (this.player.hasVagina()) this.outputText("[pg]Your [vag] tingles as it's exposed to the air.  The lusty dragon-maid dips a digit inside your depths before commenting, \"<i>Not bad, I guess.</i>\"", false);
        else this.outputText("[pg]Your smooth groin and [asshole] tingle as they're exposed to the open air.  Kiha gently caresses your smooth skin all the way down your taint before commenting, \"<i>Not ideal, but I can make do.</i>\"", false);
        this.outputText("[pg]You pant, still breathless from the kiss, a slight frown covering your features from her less-than-enthusiastic appraisal of your body.  The chocolate-colored cutie grabs you by the [butt] and pulls you back against her.  This time, you ", false);
        if (this.player.tallness >= 95) this.outputText("lean down");
        else if (this.player.tallness <= 60) this.outputText("reach up");
        else this.outputText("reach");
        this.outputText(" towards her shining, sweat-slicked breasts.  Her dark nipple seems to beckon you, and you give it a gentle lick before devouring the sensitive bud.  Kiha swoons and arches her tail up, letting it curl up your back to massage you.  The smooth, scaly back massage is almost as intriguing as the soft feminine flesh you're suckling upon, but ultimately, it is her nipple that holds your attention.  You only suck it for a few moments, but once you pull back, Kiha is panting and blushing heavily.");
        this.outputText("[pg]\"<i>Is... is that all you've got?  It'll take m-more than that,</i>\" Kiha moans once you start sucking on her other nipple. You reach down to her sex, fairly dripping with molten need, and you begin to caress it, teasing her vulva while staying locked on her pert tit.  Muscular thighs quiver once, then go nerveless, nearly tumbling both of you into the water before you shift to hold Kiha's trembling, nerveless body aloft.  Her wings flap weakly as she soaks your hand, tiny dribbles of femspunk spurting down into the swamp water from her quick orgasm.  The exhausted reptilian lady slowly wraps her arms, legs, and even wings around you, holding you tightly as she tries to recover her strength.  Moisture drips down the back of your shoulder - is Kiha crying?");
        this.outputText("[pg]Reaching up, you run your hand through Kiha's hair, comforting the weakened, vulnerable girl.  She sniffles and whispers, \"<i>You idiot... what if... if a demon had found us?</i>\"  Her body slowly uncoils from around you, the last part to break contact her tail as it unwinds from your [leg].  The dragoness wipes her face off on her forearm picking up her axe and muttering, \"<i>idiot.</i>\"", false);
        this.outputText("[pg]Still naked and too turned on to think properly, you kiss her again.  Kiha sighs when you pull back and smiles, whispering, \"<i>My idiot.</i>\"", false);
        this.outputText("[pg]Kiha's wings scatter leaves and detritus everywhere as she beats them, flapping hard enough to lift both of you off the ground.  ", false);
        if (this.player.canFly()) this.outputText("You could fly yourself, but you hang on for now, enjoying the embrace.", false);
        else this.outputText("You've no choice but to hang on to her for dear life as she lifts off.", false);
        this.outputText("[pg]Finding a gap in the foliage, the temperamental dragon-woman takes you up and out into the sky.  The gnarled swamp-trees beneath you look far less imposing from up here, and soon, they're flying past in a blur.  Without warning, Kiha twists and dives, taking you down to a small island in the swamp - her home.  She swoops through a gap in the roof with you in tow, confidently catching herself on the far wall of her abode and setting you down on the hard-packed floor.  You stumble, woozy from the abrupt flight.");
        this.outputText("[pg]\"<i>Does getting dragons off really make you that light-headed?</i>\" Kiha asks.  She tackles you into her bed before you can answer.  Her attitude, while still fierce, reminds you more of a playful kitten than a threat.", false);
        //[Route to appropriate sex scene!]
        this.dynStats("lus=", 100);
        if (this.player.hasCock()) this.doNext(this.lovingHugDickings);
        else if (this.player.hasVagina()) this.doNext(this.lovingHugsGirlFuckSex);
        else this.doNext(this.lovingHugsForRetards);
    }
    //Loving Hug Continued: Dicks Ahoy!
    private lovingHugDickings(): void {
        this.outputText("", true);
        this.spriteSelect(72);
        var x: number = this.player.biggestCockIndex();
        this.outputText("Kiha laughs, \"<i>", false);
        if (this.player.biggestCockArea() > 100) this.outputText("How do you walk with this thing swinging around everywhere, bludgeoning into everyone you meet?", false);
        else if (this.player.biggestCockArea() > 9) this.outputText("How do you walk with this thing sticking out all the time, or was that just for me?");
        else this.outputText("How can you enjoy sex with something that small?  I don't know if I'll even feel it.");
        this.outputText("</i>\"  She goes right on to squeeze " + this.oMultiCockDesc() + " in her hand, letting you feel the strength of her grip for the barest moment before stroking you slowly and sensually.  You moan, so pent up from all the foreplay that you happily hump away at Kiha's fingers.  Her handjob feels divine after being so close with so little stimulation for oh so very long.  Pre-cum quickly coats the dragoness's hand, making the air fill with lewd wet 'schlicks' from each stroke.", false);
        this.outputText("[pg]\"<i>You're so pathetic,</i>\" Kiha taunts as she begins to pump you faster, edging you closer to an irresistible orgasm.  \"<i>You used to be so tough, Champion.  What happened?  A few tugs on your ", false);
        if (this.player.biggestCockArea() <= 9) this.outputText("little ", false);
        this.outputText("tool and you're putty in my hands.</i>\"  Tiring of her tirade, you summon up your strength and pull her down next to you, climbing atop her torso to rest your " + this.cockDescript(x) + " squarely between her tits.  You grab her nipples and roughly pull them inward, drawing a gasp of mixed pain and pleasure from your lover.  The gasp turns into a lurid moan once you begin sliding your dribbling dick through the brown-hued valley that is her cleavage", false);
        if (this.player.cocks[this.player.biggestCockIndex()].cockLength >= 36) this.outputText(", even though you bump her repeatedly in the nose with your moist tip");
        this.outputText(".  Kiha's soft breasts envelop as much of your dick as possible in cushiony chest-flesh, and though she isn't as well-endowed up there as many of the women in this land, her extra-warm body-heat suffuses your member with more than enough pleasure to let you blow your load.");
        this.outputText("[pg]");
        if (this.player.horseScore() > 4 || this.player.dogScore() > 4 || this.player.catScore() > 4) this.outputText("Growling");
        else this.outputText("Grunting");
        this.outputText(", you clench for a moment as climax works through your body, expelling ", false);
        if (this.player.cumQ() > 400) this.outputText("thick ");
        this.outputText("jets of cum over Kiha's face, neck, ");
        if (this.player.cumQ() >= 400) {
            this.outputText("hair, ");
            if (this.player.cumQ() >= 800) this.outputText("floor, ");
            if (this.player.cumQ() >= 1200) this.outputText("walls, ");
        }
        this.outputText("and chest.  Kiha shivers and turns crimson (well, more crimson than usual) from the submissive position she finds herself in.  Using her tongue, she laps the creamy spooge from tip of her nose.  \"<i>Mmm... nice job, Hero.  Didn't anyone ever tell you the woman's supposed to get off first?</i>\" asks Kiha.", false);
        this.outputText("[pg]You pointedly remind her that she already did.  She gets even redder, her tail lashing back and forth behind her from embarrassment. Kiha scowls and retorts, \"<i>Well, I'm not satisfied yet, so you better keep it up.</i>\"  She gives your " + this.cockDescript(x) + " a far gentler slap than you'd expect from her expression.  The dragoness's scowl melts into a sultry 'come-hither' expression as she slowly spreads her well-defined thighs, exposing the dark, hairless entrance to her nethers.  Moisture drips from it, staining her bed with lady-spunk, but Kiha just diddles her clit and purrs at you, beckoning you to come fuck her with every motion of her body.", false);
        this.outputText("[pg]The sight stirs your loins back to a full, throbbing hardness, even though [eachCock] is still leaking strings of ejaculate from its cum-slit.  You look into her eyes and plant a long, slow kiss on her lips before sliding into her velvety-soft depths.  Kiha moans into your mouth, wrapping her arms and legs around as she yields to your manhood, her hips already rocking in needy, aching pleasure.  A single string of saliva hangs between your lips as you break the kiss and gaze into her oddly-slit, fiery red eyes.  She murmurs, \"<i>I... I think I lo-oooh right there...</i>\"", false);
        this.outputText("[pg]You slowly thrust your " + this.cockDescript(x) + " inside her and little half-kisses, half-bites at the nape of her neck", false);
        if (this.player.cockTotal() > 1) {
            this.outputText(", letting ", false);
            if (this.player.cockTotal() == 2) this.outputText("your other");
            else this.outputText("the rest of your");
            this.outputText(" maleness drip on her belly");
        }
        this.outputText(".  You ask her what she was saying, and Kiha replies, \"<i>You're... oooh... not THAT bad.</i>\"  That wasn't it.  You growl deep in your throat and increase your pace, slamming your pelvis against the dusky dragon with bed-shaking force.  Her hot breath washes over your shoulder as you begin to nibble and lick at her ear, paying attention to every little bit of her while you fuck her hard and fast.  Kiha's clawed fingertips dig into your back, drawing lines of blood as she begins to moan louder and louder, punctuated only by fervent cries of, \"<i>YES!</i>\"", false);
        this.outputText("[pg]Hips thrusting, you fuck Kiha as if your life depended on it, and with the way she's clawing at your back, it just might!  Her tight, hot little pussy squirts small rivulets of dragon-jizz each time your " + this.cockDescript(x) + " batters its way back inside.  Her clawed feet cross behind your back after a particularly forceful push and trap you there, ");
        if (this.player.cockArea(x) < 50) this.outputText("hilted inside her soaked love-tunnel,");
        else this.outputText("as far in as your prodigious size with allow,");
        this.outputText(" your " + this.player.cockHead(x) + " butting up against the entrance of her womb. Kiha turns and bites your shoulder while her tail spirals around the two of you, forcing you into the most intimate of embraces.  Her whole body quakes once, twice, and then goes into tiny, rhythmic convulsions.  A low, pleasured moan hisses out Kiha's mouth as her mouth disengages from your flesh, and you're able to see her eyes roll part-way back from the intensity of it all.");
        this.outputText("[pg]The dragoness's slippery cunt caresses your " + this.cockDescript(x) + " from root to crown over and over, begging you to release your seed.  You arch your back as much as you're able and happily comply.  Cum erupts from " + this.sMultiCockDesc() + " to claim its prize - your blissed-out mate's jizz-hungry uterus.");
        if (this.player.cockTotal() > 1) {
            this.outputText("  Thanks to your ");
            if (this.player.cockTotal() == 2) this.outputText("dual ");
            else this.outputText("multiple ");
            this.outputText("manhoods, the twitching woman's front gets coated just as well as her insides.");
        }
        if (this.player.cumQ() >= 500) this.outputText("  Jet after jet of your creamy batter soaks the reptilian womb in spunk, the proof of your virility.");
        if (this.player.cumQ() >= 1000) {
            this.outputText("  It doesn't take long for you to flood the poor cum-receptacle and drizzle out onto the bed.  Feeling way too good to care, you just keep moaning while you ");
            if (this.player.cumQ() <= 2000) this.outputText("fill Kiha's bed");
            else this.outputText("turn Kiha's abode into your spermy swimming pool");
            this.outputText(".");
        }
        this.outputText("  Even after as you wind down, the feisty woman's pussy seems to suck on your cock, still lost in its own pleasure.");
        this.outputText("[pg]Kiha continues to cum for some time, but eventually, she does come down from her orgasmic high.  Her distant, irritable demeanor seems gone (for now), and all you can see in her unusual eyes is love.  The dragoness holds you tight and whispers, \"<i>Acceptable...</i>\"");
        this.outputText("[pg]It figures.  You sigh and catch a quick nap next to her.");
        this.outputText("[pg]<b>A little later...</b>");
        this.outputText("\nKiha flies you back to get your armor.  The search takes a little while, but you eventually recover it.  She looks at you hesitantly before giving you a goodbye kiss.  \"<i>Don't get yourself killed out there.  I'd get bored without you messing everything up all the time.</i>\"", false);
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    //Loving Hugs 4 Girls
    private lovingHugsGirlFuckSex(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.outputText("Kiha gently rubs your mons and teases, \"<i>Awful wet down here, huh?  I kind of figured you would be a bit less... shameless.</i>\"  She goes on to drag a finger through your slippery slit, carefully keeping her claw from catching on you as she rubs your [clit].  The overload of sensation steals your retort from your lips, leaving you nothing to do but moan and lift your hips into her insistent pressure, so eager for more pleasure that your body seems to move on its own.  The dragoness giggles, \"<i>Is this all I have to do to defeat you?  Just... slip a finger in your twat and turn you to jelly?</i>\"", false);
        this.outputText("[pg]Twisting your body, you grab hold of Kiha and pull her atop you, the sudden motion dragging her away from your sensitive nethers - for now.  Pulling on her legs, you get the feisty dragon-girl's pussy positioned right above you.  Of course, that means her face is right above your [vag] as well.  Kiha exhales over your lips, basting your nethers in moist, arousing heat that shoots tingles of delight down your [clit].  She teases, \"<i>You're wetter than a goblin that got into the canine peppers down here!</i>\"");
        this.outputText("[pg]You shut her up by nosing up against her prominant bud.  The streamers of fem-slime that drip down on your face are easy to ignore as you get into tonguing her out.  It helps that most of it winds up pouring into your mouth, letting your senses be subsumed in the tangy taste and feel of her womanhood.  Kiha shudders and shuts up.  It seems she's managed to just sit back and enjoy sex for what it is.");
        this.outputText("[pg]A moment later, a bolt of pleasure hits your [vag].  Kiha is humming away at your box, lapping hungrily at your juices and returning the favor.  The inside of her abode is starting to reek of arousal and sexual fluids, inundated with enough female pheromones to make you both a bit dizzy.  The dragoness's dark vulva is so smooth and kissable, so perfectly lickable, that your attentions grow ever more fevered.  Perfectly in sync with you, Kiha tends to your own lusts with expert licks of her long, reptilian tongue.", false);
        this.outputText("[pg]Kiha mutters, \"<i>Gonna... gonna...</i>\" into your pussy, but before she can finish, you slam yours down on her face, grinding yourself off on her nose while you take her to orgasm.  Your body burns with lust, and once you taste the warrior-woman's burst of girl-honey on your tongue, you moan and buck your " + this.hipDescript() + " harder, frigging your [clit] off on her nose until the pleasure makes you seize, juices ");
        if (this.player.wetness() < 3) this.outputText("dripping ");
        else if (this.player.wetness() < 4) this.outputText("running ");
        else if (this.player.wetness() < 5) this.outputText("flooding ");
        else this.outputText("exploding ");
        this.outputText("out from you [vag] on her face.  Your hard nipples dig into Kiha's taut belly as you writhe atop her.  The dragon's sweat-slicked, undulating form is the perfect companion for your orgasm-addled mind, and each time you manage to control your seizing muscles, you make sure to take another few licks of the reptile's honey.  Delicious.");
        this.outputText("[pg]Kiha slowly drags herself off of you to lie beside you, smooth-yet-scaly body dragging up beside you until she's looking you eye to eye, her hot breath smelling strongly of your juices.  You kiss her, sucking her bottom lip into your mouth for a moment before she pulls back, looking at you with open eyes filled with love.  She pulls you tight and whispers, \"<i>That was a... acceptable...</i>\"  Kiha smirks and closes her eyes.  You sigh and catch a quick nap next to her.");
        this.outputText("[pg]<b>A little later...</b>");
        this.outputText("\nKiha flies you back to get your armor.  The search takes a little while, but you eventually recover it.  She looks at you hesitantly before giving you a goodbye kiss.  \"<i>Don't get yourself killed out there.  I'd get bored without you messing everything up all the time.</i>\"", false);
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    //Loving Hugs 4 Genderless Tards:
    private lovingHugsForRetards(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.outputText("Kiha roughly slaps your ass, sending a shiver of sensation up your over-aroused spine.  You glare back at her while she titters, \"<i>I bet that pucker is pretty sensitive huh?</i>\"  Before you can answer, Kiha has pulled you into her arms, back into a warm, sensual kiss.  Her dusky lips muffle your reply before her long tongue sensually twists about your own, caressing your oral cavity until all thoughts of your reply are long forgotten.  Kiha's ruby tresses shroud your faces while you make out, your two bodies rubbing together.", false);
        this.outputText("[pg]A tickling sensation between your buttcheeks jolts you from the marvelous make-out a moment before Kiha's tail snakes through your sphincter and inside your [asshole].  You gasp ", false);
        if (this.player.analCapacity() < 30) this.outputText("in mixed pain and pleasure");
        else this.outputText("in pleasure");
        this.outputText(" from the unexpected intrusion, and though it isn't unwelcome (being the only sexually penetrable orifice you've got), she could have at least let you know what she was about to do!  You can feel it wriggling inside you, twisting and squirming in your butt.  Surprisingly, the dragon-woman's scales lend her tail a stimulating texture that caresses every twist and fold of your innards.");
        this.outputText("[pg]Kiha rolls you up top of her, keeping your [legs] spread and out of the way to allow her tail unimpeded access to your [asshole].  She reaches up to pinch your nipple, asking, \"<i>Are you really getting off on that?  It feels like half my tail is jammed up there, and you're blushing redder than a sunburnt imp.</i>\"");
        this.outputText("[pg]You tell her to shut up and shove it deeper.  Kiha gives a whimsical smile and obliges your crude request by forcing another inch of thick dragon-tail into your rectum. It stretches you so wide - ", false);
        if (this.player.ass.analLooseness < 4) this.outputText("you're sure you'll gape for a little after this");
        else this.outputText("you're sure you'll gape even wider for a little bit after this");
        this.outputText(".  Kiha smirks and withdraws slightly, pulling you down into her lap before she spears it up once again, the hot, thick appendage burrowing deep to nest its balmy heat in your core.");
        this.outputText("[pg]\"<i>You idiot... loving a tail in your butt?  Gross,</i>\" your lover comments as she begins to piston it deeper and deeper inside you.  You groan and lean over her, suckling one of her dark nipples into your mouth.  Her skin tastes a little salty from her sweat, with a trace of spiciness you can't quite recognize.  She moans, her tail quivering ever-so-slightly inside your anal passage as you tend to the dragoness's hard little bud.  You bite and lick, snaking your hand down between her legs to feel the molten heat of her delta.  She soaks your hand.");
        this.outputText("[pg]Kiha grabs you by the hair and pulls your head back to look her in the eyes.  She whispers, \"<i>I... I think I lo-oooooh right there...</i>\"  Whatever she was about to say... it got cut off but your fingertips' dalliances upon her mons.  You pull back and ask, \"<i>What?</i>\" in between the body-shaking thrusts of her draconic tail, but Kiha grabs your hand and stuffs your fingers back in her pussy.  She demands, \"<i>MORE!</i>\"  You thumb her clit and stuff three fingers into her soaking cunt, feeling her nethers quiver and squeeze at your fingers as if they could milk the sperm from them.  Encouraged by this, you pump her pussy with firm strokes, matching the timing to the thrusts of her tail into your well-and-truly violated anus.");
        this.outputText("[pg]The reptile-woman's eyes start to roll back, and she exhults, \"<i>Yesssssssss,</i>\" in a triumphant hiss a moment before her whole body begins to thrash.  Her tail twists inside you, pressing against a particularly sensitive spot to trigger an equally intense pleasure-cascade inside you.  Her nipple slips free of your gaping, moaning mouth as you wordlessly revel in sexual bliss with your lover.  You pull yourself tight against her, and the two of you clutch onto each other for dear life as you climax rocks your bodies.");
        this.outputText("[pg]As the passion subsides, your scaled companion slowly extricates herself from your [asshole], your heavily violated passage tingling as it gapes wide for a moment.  She rolls to the side with you still in her arms and gives you a quick peck on the lips before admitting, \"<i>That wasn't so bad...</i>\"  Not so bad?  Not so bad!?  That was great!  Her eyelids drift closed as she falls fast asleep, robbing you of a chance to reply.  Oh, Kiha.  You sigh and catch a quick nap next to her.");
        this.outputText("[pg]<b>A little later...</b>");
        this.outputText("\nKiha flies you back to get your armor.  The search takes a little while, but you eventually recover it.  She looks at you hesitantly before giving you a goodbye kiss.  \"<i>Don't get yourself killed out there.  I'd get bored without you messing everything up all the time.</i>\"", false);
        this.player.orgasm();
        this.dynStats("sen", - 2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    //\"<i>Warm</i>\"/Lover Kiha Intro
    private warmLoverKihaIntro(output: boolean = true): void {
        var campo = undefined;
        var leave = this.camp.returnToCampUseOneHour;
        if (output) {
            this.clearOutput();
            this.spriteSelect(72);
            //Approaching Kiha @ Camp:
            if (this.followerKiha()) {
                if (this.flags[kFLAGS.KIHA_NEEDS_TO_REACT_TO_HORSECOCKING] == 1) {
                    this.kihaReactsToHorseDicking();
                    return;
                }
                this.outputText("When you approach your dragoness lover, a warm smile spreads across her dark features.  She gives you a playful punch on the shoulder and laughs, \"<i>Hey, doofus. You need something -- maybe a little dragon loving?</i>\" she adds with a wink.");
                leave = this.camp.campLoversMenu;
                //choices("Hang Out",hangOutWithKiha,"Hug",hugFriendWarmKiha,"InviteCamp",campo,"Sex",kihaSexMenu,"Spar",sparWithKiha,"",0,"",0,"",0,"",0,"Leave",leave);
                this.menu();
                this.addButton(0, "Hang Out", this.hangOutWithKiha);
                this.addButton(1, "Hug", this.hugFriendWarmKiha);
                this.addButton(3, "Sex", this.kihaSexMenu);
                this.addButton(4, "Spar", this.sparWithKiha);
                if (this.flags[kFLAGS.KIHA_CAMP_WATCH] > 0) this.addButton(8, "Stop Guard", this.guardMyCampKiha);
                else this.addButton(8, "Guard Camp", this.guardMyCampKiha);
                this.addButton(9, "Leave", leave);
                return;
            }
            //[Proc on the normal chances of finding Kiha in the swamp]
            else {
                this.outputText("While exploring the swamp, you find yourself entering the familiar territory of your dragon-girl lover.  With a newfound spring in your step, you wind your way through the dense foliage to the cluster of trees Kiha calls her home.  Before you can even call out her name, you hear a rush of air high above you, and a moment later Kiha herself lands lightly before you, a small smile on her dark features.", false);
                this.outputText("\"<i>Hey, doofus,</i>\" she grins.  \"<i>Just couldn't resist seeing me for another minute, could you? Well, I can hardly blame you...</i>\"", false);
            }
        }
        if (!this.followerKiha() && this.flags[kFLAGS.KIHA_MOVE_IN_OFFER] == 1) campo = this.inviteKihaForDickings;
        //(Display Options:
        //-[Hug Kiha]
        //-[Spar](Hug & Spar as in Friendly)
        //-[Hang Out](If any Talk options left play those first; else, use new options)
        //-[Sex]
        //   Biggus Dickus // Vaginal // Anal // 69+Tail // Tail Pegging // Item/Morph-specific scenes?
        //-[Invite to Camp] (If KihaAffection >= 200)
        //-[Leave])
        this.choices("Hang Out", this.hangOutWithKiha, "Hug", this.hugFriendWarmKiha, "InviteCamp", campo, "Sex", this.kihaSexMenu, "Spar", this.sparWithKiha,
            "", undefined, "", undefined, "", undefined, "", undefined, "Leave", leave);
    }


    //Hang Out (Play one at random)
    private hangOutWithKiha(): void {
        this.clearOutput();
        this.spriteSelect(72);
        //Hang Out 1
        var select: number = KihaFollower.rand(3);

        if (select == 0) {
            this.outputText("With a smile, you offer the dragoness your arm and ask if she'd like to take a walkabout.  She seems rather surprised at the suggestion, adding it's rather tame all things considered; but, with a little urging, you're soon walking arm in arm ");
            if (!this.followerKiha()) this.outputText("through the dense overgrowth of the swamp");
            else this.outputText("back to her old haunt in the swamp");
            this.outputText(".");
            this.outputText("[pg]You tease and toy with each other as you walk, occasionally venturing to brush Kiha's thigh or cheek, or tensing as she pops your [butt] with her tail after a particularly vitriolic pun. Both of you laugh constantly, though - Kiha's endlessly amused by your idealism or inexplicable adventures, and you can't help but roll your eyes and chuckle at her long-since faltered facade of cruelty and power.");
            this.outputText("[pg]After perhaps twenty minutes of companionable walking, though, your peaceful stroll is interrupted by a sudden ghostly cackling from above as a drider descends from the treetops.  The spider-bitch leers at you, a demonic cock and ovipositor already erect and ready to impregnate some easy prey.  You ready your [weaponName] for battle, but before you can act Kiha lunges off the ground.  With a roar, your dragon lover lets out a gout of fire that incinerates the webbing supporting the drider; the monster lets out a helpless cry as she tumbles to the ground, knocked unconscious by the impact.");
            this.outputText("[pg]Kiha lands beside you, leaning heavily on her fiery greataxe.  \"<i>Don't you worry, doofus,</i>\" she says, reaching over to run a hand playfully through your hair.  \"<i>You don't have to worry about a thing while Kiha's around.</i>\"  Suddenly, she turns to the forest at large and roars: \"<i>You hear that, monsters - this one is mine!  MINE!  So hands off or you'll have ME to deal with, got it?</i>\"");
            this.outputText("[pg]You can't help but grin as she boasts of protecting her mate from the vile monsters of the realm. You know you could easily have beaten the drider, but you let Kiha have the moment - she's quite cute when she's being protective of you.  Before she can launch into a full-blown tirade, though, you grab the dragon-girl and pull her into a tight hug.  She lets out a short little gasp, but utterly melts in your arms when you plant your lips on hers.");
            this.outputText("[pg]\"<i>You... ");
            if (this.player.tallness >= 72) this.outputText("big");
            else this.outputText("little");
            this.outputText(" idiot,</i>\" she whimpers when you finally break the kiss.  Gently, you stroke her cheek and thank her for \"<i>protecting</i>\" you.  A few minutes later and ");
            if (!this.followerKiha()) this.outputText("you're back at Kiha's little islet, waving to the dragoness as she flies back home and you head to camp");
            else this.outputText("you're walking arm in arm again, heading home");
            this.outputText(".");
        }
        //Hang Out 2
        else if (select == 1) {
            this.outputText("You fish around in your mind for something you and Kiha can do together, but the dragoness herself surprises you by saying, \"<i>So, uh, " + this.player.short + ". I was just about to eat... I-I've got enough for two, if you want.</i>\"  You smile and tell her that would be lovely, thank you.  Awkwardly, she returns your grin, obviously unused to eating with others.", false);
            if (!this.player.canFly()) this.outputText("  She slips her arms around you and takes off, flying through the roof-entrance to her lair");
            else this.outputText("  Extending a hand to you, the two of you fly up to and through the roof entrance to her lair", false);
            this.outputText(".");
            this.outputText("[pg]Kiha's small nest is spartan, to say the least - walls made from living tree trunks, a hard-packed dirt floor, and a circle of what looks like tall grass from the plains making up her bed.  She has a single, small plank of wood balanced on a quartet of rocks serving as a table, with a slab of uncooked meat (perhaps a wild boar's thigh?) sitting openly on it.  She tells you to sit and, brandishing her sharp talons, begins to cut up the meat for you to make up for her lack of silverware.");
            this.outputText("[pg]You start to question if she expects you to eat raw... whatever it is... but the dragoness cuts you off mid-sentence by rearing back and belching up a burst of flame onto the mystery meat, roasting it instantly and singeing the hairs on your face.  She lets out a boisterous laugh as you shake off the rather explosive effects of her fiery breath, but you have to admit it was effective: your meal is now a pile of medium-well cooked strips fit to be eaten.");
            this.outputText("[pg]Satisfied with her handiwork, Kiha sits down across from you.  She stares at you for a long moment, glancing quickly from you to the smoking meat in front of you.  Apparently, she wants you to take the first bite.  Gingerly, you pick up a strip of the greasy meat and, looking into Kiha's waiting eyes, pop it into your mouth.");
            this.outputText("[pg]\"<i>W-well?  It's good... right?</i>\"");
            this.outputText("[pg]You give the stringy, yet juicy, meat a few experimental chews before giving your answer:");
            //[It's Good] [Blech]
            this.simpleChoices("It's Good", this.itsGood, "Blech", this.blechKihaYourCooking, "", undefined, "", undefined, "", undefined);
            return;
        }
        //Hang Out 3
        else {
            //[if @ swamp:
            if (!this.followerKiha()) {
                this.outputText("Looking up from the dragoness to the treetops, you notice that Kiha's little islet has a surprisingly spacious clearing above it - probably why the dragoness chose this spot to make her home in the first place, since it's easier to take off and land without branches crashing into you every time.  You notice the ");
                if (this.model.time.hours < 21) this.outputText("particularly cloudy day above you, with great pink and purple clouds drifting across the demonically-tainted horizon");
                else this.outputText("stars are out, a thousand little pin-pricks in the heavens", false);
                this.outputText(".");
            }
            else {
                this.outputText("Looking up from your dragoness lover, you note the particularly clear ");
                if (this.model.time.hours < 21) this.outputText("day around your camp - thick pink and purple clouds are rolling lazily over the wasteland, shimmering behind the great maw of the portal");
                else this.outputText("night in the wastelands.  The stars are out, as they always are at night in your part of Mareth, a thousand thousand little pin-pricks in the heavens");
                this.outputText(".");
            }
            this.outputText("[pg]With your dragoness friend close at hand, what might have been an average ");
            if (this.model.time.hours < 21) this.outputText("day");
            else this.outputText("night");
            this.outputText(" seems suddenly romantic.  With a playful grin, you wrap an arm around Kiha's supple waist, point up to the heavens and bid her look at the ");
            if (this.model.time.hours < 21) this.outputText("clouds");
            else this.outputText("stars");
            this.outputText(".  The dragoness does as you ask, following your pointing finger up to the sky.");
            this.outputText("[pg]\"<i>Hey,</i>\" she says, snuggling close in your arms.  \"<i>I remember what you said a while ago, after I... when you and I first looked up at the sky.  I've been thinking about what you said, doofus.  You're stupid sometimes... but you're not wrong.</i>\"");
            this.outputText("[pg]Kiha grins at you - before you know it, you're on the ground, wrapped tight in the dragoness's powerful arms, face pressed between her soft, dusky mounds.  You shift a moment in her grasp before settling in, cuddling up to your lover and staring with her into the heavens.  Kiha holds you close, resting her chin on the crown of your head, occasionally running her scaly fingers through your [hair] or brushing your thighs with her long, flexible tail.  You bask in her warmth, a soft glow that spreads throughout your body; you nuzzle your cheek into her pillowy bosom, looking for a moment from the sky to the beautiful woman holding you.");
            this.outputText("[pg]Kiha's been staring at you for a long time, it seems.  She smiles at you as your gazes meet, her hand running through your hair one last time.  \"<i>Oh, you ");
            if (this.player.tallness >= 72) this.outputText("big");
            else this.outputText("little");
            this.outputText(" idiot.  Don't just lie there,</i>\" she laughs.  Before you can move, through, Kiha leans up and presses her lips to yours, drawing you into a long, loving kiss.  Gently, her long, reptilian tongue presses against your lips, slithering in to entwine with your own tongue.  You lay together for a long while, cuddling and kissing and playing with each other.");
            this.outputText("[pg]Time seems meaningless in your draconic lover's embrace, yet eventually you know you must part - for the moment.  Giving her another long kiss, you pick yourself up from between Kiha's hefty bosom and, say your goodbyes.");
            this.outputText("[pg]Kiha gives you a wry smirk as you extricate yourself from your arms.  \"<i>I'll see you soon... Doofus.</i>\"");
        }
        this.doNext(this.camp.returnToCampUseOneHour);
        this.kihaAffection(5);
    }

    //[It's Good]
    private itsGood(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.outputText("You give Kiha a little wink and tell her's it great.  She breaks out into a big, dopey grin as you explain your delight at the fine, wood-smoked texture and delightful juiciness of the flash-cooked meat.  Kiha takes your compliments to heart, declaring, \"<i>O-of course it's good; just the fact that </i>I<i> cooked it ought to make it obvious!</i>\"");
        this.outputText("[pg]You share a laugh with the pretty dragoness as she grabs a strip of meat and wolfs it down.  Now uninhibited, the two of you dig into the meal, quickly devouring Kiha's \"<i>home cooking.</i>\"  By the time you're done, you're both a greasy mess thanks to your lack of utensils, your fingers and her claws slathered with meat juices and fat.  Each of you teases the other about your states of appearance.");
        this.outputText("[pg]You stand, trying to clean a bit of grease off your fingers, when suddenly you're pushed violently onto Kiha's grass nest.  Straddling you, the dragoness grins and begins pulling off your [armorName].  \"<i>Don't think I'm just going to let you walk on out of here without thanking me for the meal,</i>\" she growls lustily, her hot flesh pressing against you.");
        //(Display normal sex options)
        this.kihaAffection(5);
        this.kihaSexMenu(false, false);
    }
    //[Blech]
    private blechKihaYourCooking(): void {
        this.outputText("", true);
        this.spriteSelect(72);
        this.outputText("You gag and spit, choking up the disgusting, burning chunk of \"<i>meat</i>\" you just tried to eat.  Kiha gapes at you, aghast, until you ");
        if (this.player.canFly()) this.outputText("fly off.  Scowling, Kiha takes to the air too, landing behind you outside");
        else this.outputText("demand to be taken outside.  Grudgingly, Kiha walks over, grabs you by the waist, and hauls you outside");
        this.outputText(".  Once you're back on the ground, you grab the dragoness's hefty greataxe out of her hands and stalk into the woods.");
        this.outputText("[pg]Confused, your lover follows you through the densely-packed trees of the swamp, until you see a boar rooting around in the brush.  Sighting in on the creature, your let out a powerful roar and fling the axe at it.  The boar looks up, OINKs loudly, and tries to scamper off - but Kiha's spinning axe lops its head neatly off.");
        this.outputText("[pg]You drag the carcass back to Kiha's hovel, and spend the next hour skinning it, getting a new slab of meat ready, and carefully explaining how to cook decently.  Though visibly annoyed you didn't like her \"<i>home cooking,</i>\" Kiha sits and listens as you explain the finer details of the feeding of yourself and others.  When you're done, and the boar is nicely cooked on your hastily-constructed spit, you hand a leg to Kiha and tell her to try it.");
        this.outputText("[pg]Frowning, she snatches the meat out of your hand and takes a big bite out of it.  You grin as her eyes water at the overwhelming juiciness and sweetness of the meat as you've prepared it.  You think you might just be the first person to ever cook just for her.  Still, though, when you ask her what she thinks, Kiha huffs and answers, \"<i>Well, it's alright... I guess.</i>\"");
        this.outputText("[pg]You roll your eyes and spend the next few minutes enjoying a delicious, quiet meal with your dragon lover.  When you've finished, you ruffle Kiha's hair, tell her to try and take better care of herself - or at least make herself a proper meal sometime - and head off back to camp.  You can almost hear her fuming behind you as you walk.");
        this.kihaAffection(- 10);
        this.doNext(this.camp.returnToCampUseOneHour);
    }


    private kihaSexMenu(display: boolean = true, allowBack: boolean = true): void {
        this.spriteSelect(72);
        var gro = undefined;
        var incu = undefined;
        var tent = undefined;
        var horse = undefined;
        var anal = undefined;
        var sixtyNine = undefined;
        var dickWorship = undefined;
        var fuckVag = undefined;
        var dom = undefined;
        // var backFunc = (allowBack ? this.kihaScene.encounterKiha : this.camp.returnToCampUseOneHour);
        if (display) this.outputText("\n");
        //REQUIRES CAMP FOLLOWER:
        if (this.followerKiha()) {
            if (this.player.gender > 0) dom = this.dominateKihasFaceWithStuffAndStuffOrSomethingIDunnoWhyImStillWritingThis;
            //Req: Gro+ (also soft ghost req!)
            if (this.player.hasItem(this.consumables.GROPLUS)) {
                if (display) {
                    if (this.player.findPerk(PerkLib.Incorporeality) >= 0) this.outputText("\nYou could try and pump her boobs a bit with gro+, and if she decides against it, possess her and do it anyway!");
                    else this.outputText("\nYou could see if she'd let you pump her boobs with gro+.");
                }
                gro = this.ghostboobiesKiha;
            }
            else if (display) this.outputText("\nIf you had some gro+, you could ask her about making her breasts bigger.");
            if (this.player.hasItem(this.consumables.INCUBID) || this.player.hasItem(this.consumables.P_DRAFT)) {
                if (display) this.outputText("\nYou could slip her an incubi draft and let her fuck your ass with it.");
                incu = this.giveKihaIncubusDraft;
            }
            else if (display) this.outputText("\nIf you had an incubi draft, you could have her grow a dick for you to take in the ass, at least for a while.");
            if (this.player.tentacleCocks() > 1)
                tent = this.fuckKihaWithATentacle;
            //Req: Cock
            if (this.player.hasCock()) {
                if (this.player.cockThatFits(67) >= 0) fuckVag = this.fuckKihasVagInCamp;
                else if (display) this.outputText("\nKiha's vagina is too small and tight for you to take.");
                //(requires 50+ minimum lust, or 80+ libido, or a lust/fuck draft)
                if (this.player.cockThatFits(200) >= 0 && (this.player.minLust() > 50 || this.player.lib > 80 || this.player.hasItem(this.consumables.L_DRAFT))) {
                    //Dick also can't be that small.
                    if (this.player.cockArea(this.player.cockThatFits(200)) >= 40) {
                        horse = this.boneTheShitOutofKihaHolesWithHorsecock;
                    }
                    else if (display) {
                        if (this.player.minLust() > 50 || this.player.lib > 80) this.outputText("\nYou have a hunch that if your dick were bigger you'd be able to really go town on her with your incredible libido.");
                        else this.outputText("\nIf you had a bigger dick and a lust draft you could really go to town on her.");
                    }
                }
            }
        }
        else if (display && this.player.hasCock()) this.outputText("\nKiha doesn't seem to keen on the idea of vaginal sex right now.");
        //WARM SEX:
        //Req Dick That Fits Butt
        if (this.player.hasCock()) {
            //savinTheAnalForKiha()
            if (this.player.cockThatFits(94) >= 0) anal = this.savinTheAnalForKiha;
            else if (display) this.outputText("\nYou're too big to fuck her ass.");
            //Req Bigass Dick
            if (this.player.biggestCockArea() >= 150) dickWorship = this.kihaPlaysWithBigassCocksFemDomAhoy;
            else if (display) this.outputText("\nYour penis isn't ridiculously large enough for her to take care of it with her hands and feet.");
        }
        //Req Vag
        if (this.player.hasVagina()) sixtyNine = this.kihaGirlGirlSex;
        this.choices("Anal", anal, "Dominate", dom, "FuckVag", fuckVag, "Get HJ", dickWorship, "Girl69", sixtyNine, "GroPlusTits", gro, "Give I.Drft", incu, "LustyDicking", horse, "TentacleFuck", tent, (allowBack ? "Back" : "Leave"), (allowBack ? this.kihaScene.encounterKiha : this.camp.returnToCampUseOneHour));
    }

    //Savage Every Hole With A Bigass Horsecock
    //(requires 50+ minimum lust, or 80+ libido, or a lust/fuck draft)
    private boneTheShitOutofKihaHolesWithHorsecock(): void {
        this.clearOutput();
        this.spriteSelect(72);
        var c: number = this.player.cumQ();
        var x: number = -1;
        var y: number = -1;
        //Find appropriately large horsecock
        if (this.player.horseCocks() > 0) {
            this.temp = this.player.cockTotal();
            while (this.temp > 0) {
                this.temp--;
                if (this.player.cocks[this.temp].cockType == CockTypesEnum.HORSE && this.player.cockArea(this.temp) >= 40) {
                    x = this.temp;
                    y = x + 1;
                    break;
                }
            }
        }
        if (x == -1) {
            x = this.player.cockThatFits(200);
            y = x + 1;
        }

        this.outputText("You remove your [armor] as you close in with Kiha, happy to let the ", false);
        if (this.player.minLust() < 50) this.outputText("half-turgid");
        else this.outputText("always semi-hard");
        this.outputText(" length of your ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("fat horse-cock");
        else this.outputText(this.cockDescript(x));
        this.outputText(" flop free in the breeze.  The haughty dragoness's eyes zero in on [eachCock], a knowing smirk gracing her proud features as she takes in the sight of your swelling manhood", false);
        if (this.player.cockTotal() > 1) this.outputText("s");
        if (this.player.isTaur()) this.outputText(" beneath your equine body");
        this.outputText(".  \"<i>Idiot, you're gonna get raped pulling stunts like this, you know that, right?</i>\" Kiha asks, gazing you up and down with a hungry look in her eyes.  You shrug and get closer, doing your best to ignore the puff of flame that shoots from her nostril as she snorts in disdain, \"<i>Fine, I'll help ya with this, but it's only because I wanna bring Lethice down.  I don't normally like this sort of thing.</i>\"");
        this.outputText("[pg]Kiha drops down to her knees");
        if (this.player.isTaur()) this.outputText(", crawling under your horse body");
        this.outputText(", the better to examine your ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("bestial equine dong");
        else this.outputText("[cock " + y + "]");
        this.outputText(" and its slowly-filling ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("flared ");
        this.outputText("tip.  A single dollop of creamy ooze drips from the wide, semi-dilated cum-slit in the center to plop on the floor, a strong reminder of your unquenched lust and potent virility.  The powerful warrioress sniffs experimentally, taking in the musky, aromatic odor of your thick maleness.  She licks her lips as she cradles the heavy shaft in her hands.  It pulses hotly from her touches, thrumming with each hammering beat of your heart.  She seems distracted by something, but shakes her head to clear it.");
        this.outputText("[pg]You part your lips to speak, ready to inquire about Kiha's distraction, at least, until Kiha's dark, spit-glossed lips press against your urethra, slowly spreading across the top of your ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("flare's mesa");
        else this.outputText(this.player.cockHead(x));
        this.outputText(" as she opens wide.  ");
        if (this.player.hasSheath()) this.outputText("She pumps you just above the sheath");
        else this.outputText("She pumps your shaft");
        this.outputText(" with one hand, using slow, even strokes that tickle every sensitive area.  ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("Her other caresses the skin of your sheath, fingers slipping in between the folded outer skin and your dick's concealed, untouched flesh.  ");
        else if (this.player.balls > 0) this.outputText("Her other fondles your [balls], steadily increasing your desire for release.  ");
        else this.outputText("Her other fondles your taint, steadily increasing your desire for release.  ");
        this.outputText("It feels almost supernaturally sensitive.");
        if (this.player.inte < 20) {
            this.outputText("  An unthinking, ");
            if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("bestial whinny ");
            else this.outputText("groan ");
            this.outputText("of pleasure bursts from your lips, ");
            if (this.player.isTaur()) this.outputText("hooves stamping as ");
            this.outputText("your concern for the dragon evaporating thanks to the pleasure coursing through your ");
            if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("animal");
            else this.outputText("well");
            this.outputText("-endowed form.");
        }
        else this.outputText("  A ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE || this.player.isTaur()) this.outputText("whinny ");
        else this.outputText("groan ");
        var horse: boolean = false;
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE || this.player.isTaur()) horse = true;
        this.outputText("starts in your throat, but ");
        if (horse) this.outputText("you catch yourself before you start braying like an animal");
        else this.outputText("you catch yourself before it manages to escape your lips");
        this.outputText(".  Between your inner embarrassment and the pleasure shooting through your ");
        if (horse) this.outputText("animal");
        else this.outputText("well");
        this.outputText("-endowed form, you forget all about your concern for the dragon.");
        this.outputText("[pg]Filled with mirth, the fiery orbs of Kiha's eyes watch your every reaction.  Her lips slowly stretch into a wide, obscene 'O' in order to accommodate the entire circumference of your mouth-wrecking ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("beast-");
        this.outputText("prick.  The ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("thick flare");
        else this.outputText(this.player.cockHead(x));
        this.outputText(" proves a satisfying challenge for your partner.  Working slowly, her jaw spreads wider and wider, the puffy softness of her lips squeezing and struggling waves of sensation up the root of your cock.  The blissful agony is soon over, as Kiha works the turgid ");
        if (horse) this.outputText("animal ");
        this.outputText("endowment into the interior of her mouth, the dragon-like tongue coiling your member as easily as a snake encircles its prey.");
        this.outputText("[pg]Your reptilian lover bobs haltingly on your shaft.  Even with her efforts, she's struggling to slide more than a half-inch at a time through the lip-lined gateway to her mouth.  Consternated, she begins to pump you faster, ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("her free hand eagerly caressing you inside your own sheath with inhuman warmth");
        else {
            if (this.player.balls > 0) this.outputText("her tongue working as much of your shaft as possible with inhuman warmth.");
            else this.outputText("her free hand eagerly caressing your [balls] with inhuman warmth.");
        }
        this.outputText(".  Her eyes seem a trifle irritated, but the fire of arousal is far more visible in her gaze than that lesser, blighted emotion.  She works your dick like a woman possessed, rubbing, stroking, licking, and squeezing, every motion designed to please your ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("big, pony-like prick.");
        else this.outputText("[cock " + y + "].");
        if (this.player.balls > 0) this.outputText("  Your [balls] smear and shudder against her chin, so tight, hot, and ready to explode.");
        this.outputText("[pg]Kiha ");
        if (this.player.balls > 0) this.outputText("squeezes your [sack]");
        else if (this.player.hasVagina()) this.outputText("fondles your [vag]");
        else this.outputText("gives her tongue an encouraging twist");
        this.outputText(", and you can endure it no longer.  It's so hot, so tight, and so... right to have her like this, half-impaled on your shaft just as you start to cum.  Your [sack] tightens from the effort of expelling your seed, flooding your senses with the familiar, tight clench of orgasmic pleasure.  Kiha's mouth is stretched wider for the briefest moment by your swelling ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("flare");
        else this.outputText(this.player.cockHead(x));
        this.outputText(", an incredulous yet hungry look plastered on her somewhat confused face.  The next second, she's gurgling and gulping, her mouth flooding with seed as you pump it out like a firehose.  ");
        if (c <= 250) this.outputText("She manages to guzzle it all down without too much difficulty.");
        else if (c <= 1000) this.outputText("Her eyes water, and trickles of cum run from her nose, but she still manages to gulp most of it down.");
        else {
            this.outputText("Her eyes water copiously as semen back-floods out her nostrils.  Her throat works to swallow it all, guzzling it noisily, but it just isn't enough.  Jizz squirts from the corners of her mouth and makes a mess of her heaving breasts before it finally winds down to a manageable level.  Her belly even looks a bit pudgy from all the ");
            if (this.player.cocks[x].cockType.Index > 0 && this.player.cocks[x].cockType.Index < 10) this.outputText("animal ");
            this.outputText("sperm she's been forced to swallow.");
        }
        this.outputText("[pg]Kiha pulls back and releases your tip from her sore, semen-drenched puckers.  She coughs and gasps for a moment, inadvertently smearing the salty sludge all over herself.  When she recovers, she sighs, \"<i>You got it everywhere, idiot.  Now I'll have to go get a bath, but first, you had better return the favor.</i>\"");
        //{Variant: Low Lib/Minlust + Fuck/Lust draft}
        if (this.player.minLust() < 50 && this.player.lib < 80) {
            this.outputText("[pg]\"<i>No problem,</i>\" you think, reaching for a handy potion to spike your lagging libido back into the stratosphere.  The potion goes down smooth, with barely any effects at first.  However, after a few moments [eachCock] stiffens and tingles, hungry for more.  You can even faintly detect some new, odd scents in the air.");
            this.player.consumeItem(this.consumables.L_DRAFT);
        }
        this.outputText("[pg]Kiha ");
        if (horse) {
            if (this.player.isTaur()) this.outputText("clambers out from beneath you, pulling herself onto a nearby rock, putting herself into position for your horse-body to mount her. She spreads her legs wide, her slick vagina releasing a tantalizing musk that begs for a cock to fill it");
        }
        else this.outputText("leans back against a rock and spreads her legs, exposing you to a tantalizing, cock-filling scent");
        this.outputText(".  Pre-cum trails from your tip in thick ropes, swaying beneath your bobbing, blood-filled ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("horse-");
        this.outputText("cock.  That aroma... that wondrous odor.  It fills your nostrils, and as your hormone-flooded consciousness slowly turns it over, you recognize it for what it is - breeding scent.  You're smelling a female... no, a fertile female - a bitch, a ");
        if (horse) this.outputText("mare");
        else this.outputText("slut");
        this.outputText("... a tight cock-sleeve already marked with your seed, just waiting to be mounted and impregnated with your young. You zero in on her cunt - her breeding hole - and step forward, ");
        if (this.player.cocks[x].cockType.Index > 0) {
            if (this.player.isTaur()) this.outputText("throwing your hooves onto the rock, looming over Kiha");
            else this.outputText("fondling your bestial tool with one hand");
        }
        else {
            this.outputText("[if (isTaur = true) \"throwing your hooves onto the rock, looming over Kiha\" else \"fondling your " + this.cockDescript(x) + " with one hand\"]");
        }
        this.outputText(", the bobbing motions flinging ropes of pre-cum from your " + this.cockDescript(x) + " every which way.  ");
        if (horse) this.outputText("\"<i>Fuck, am I... rutting?!</i>\"  ");
        else this.outputText("\"<i>Fuck, why am I... ?!</i>\"  ");
        this.outputText("you manage to wonder, instantly sidetracking yourself, \"<i>Mmmm... yes... fucking...</i>\"");
        this.outputText("[pg]Kiha gives you an odd look when you roughly spread her legs and batter your ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("flat ");
        this.outputText("cockhead against her unprepared cunt.  A frightened squeak slips through her lips as you push harder and harder, eventually popping in with little care for your partners feelings - you're far too focused on plugging her womb full of your ");
        if (horse) this.outputText("horse-");
        this.outputText("spunk to worry about such trivialities.  The dragoness ");
        if (this.player.isTaur()) this.outputText("punches your underside");
        else this.outputText("tries to push you back");
        this.outputText(", shouting, \"<i>What are you doing, [name]? HEY?! ARE YOU FUCKING LISTENING TO ME?</i>\"");
        this.outputText("[pg]Growling in irritation, you pop out of the breed-ready ");
        if (horse) this.outputText("mare");
        else this.outputText("slut");
        this.outputText("'s cunt, and slap her across the face with your cum-dripping, pussy-wetted member.  Her eyes go wide in absolute, complete shock.  She didn't expect that.  Nevertheless, you press on, smearing your ");
        if (horse) this.outputText("savage shaft");
        else this.outputText(this.cockDescript(x));
        this.outputText(" over her face and forcing her to get a good whiff of your potent cock-scent.  Her eyes gradually lose their focus, gravitating down the thick cylinder of ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("horse-");
        this.outputText("meat slapping at her cheeks.  Soon, she is licking it in a daze.  Her breeding-scent is now much stronger in the air, perhaps double what it was before.  Judging her ready, you give her jaw a gentle smack and return to your previous task: insemination.");
        this.outputText("[pg]Kiha babbles, \"<i>Wh-what's g-going onnn... mmm... smells nice... fuck me?</i>\"  Happily, you oblige.  After battering her lips open the first time, the repeat insertion goes much more smoothly, allowing the ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("wide head of your stallion-shaft");
        else this.outputText(this.player.cockHead(x) + " of your " + this.cockDescript(x));
        this.outputText(" to spear through Kiha's entrance and into her womanly canal.  She groans appreciably, and the wordless exultations of your mate are all the encouragement you need to push deeper, shoving inch after inch of ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("well-lubed horse-dick");
        else this.outputText(this.cockDescript(x));
        this.outputText(" into Kiha's fully-dilated pussy.  The dragon-cunt is nice and tight around your large");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText(", mammalian");
        this.outputText(" member.  It slurps up inch after inch of pulsating cock, devouring your dick with a hunger born of the female's instinctive drives and desires.");
        //{UPCOMING HENTAI LOGIC}
        this.outputText("[pg]Pussy-juice dribbles onto the ground and immediately disappears into the parched earth as you butt up against her cervix.  You draw back and thrust, smashing your ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("flat-tipped horsecock");
        else this.outputText(this.cockDescript(x));
        this.outputText(" up against her inner entrance, pre-cum slipping through the tiny opening to baste her womb.  Each time you butt up against it, you feel Kiha's cervix give a little bit more, open up just a little wider.  Sweat runs down your body as you pump Kiha's cunt mercilessly, fucking her hard, just like the little ");
        if (horse) this.outputText("mare ");
        else this.outputText("slut ");
        this.outputText("deserves.  She's so very hot, practically burning up.  Her body even seems to steam from it as she writhes beneath you, but her hips begin to rise and fall to your tempo, obedient to your dominance and pliantly acquiescing  to your unspoken desire to mate.");
        this.outputText("[pg]You growl savagely and thrust particularly hard, easily popping your swollen cock-tip through her dilated cervix");
        if (this.flags[kFLAGS.KIHA_CERVIXGINITY_TAKEN] == 0) {
            this.outputText(" to steal her womb cherry");
            this.flags[kFLAGS.KIHA_CERVIXGINITY_TAKEN]++;
        }
        else this.outputText(" to plow your favorite dragon-hole");
        this.outputText(".  Kiha winces and shakes her head, rousing from her sexual stupor to question, \"<i>W-what, oh shit you're... you're breaking meeee!</i>\"  She shudders and shakes as her eyes roll back from the raw sensation.  Panting and moaning, Kiha idly licks your cock-sludge from her lips and babbles, \"<i>W-why is it so goooood?</i>\"");
        if (this.player.balls) this.outputText("  You slap your [balls] into in her ass hard as you thrust, smearing them all over her sweaty ass and tail.");
        else this.outputText("  You slap into her hard as you thrust, feeling her tail thrashing beneath your [butt].");
        this.outputText("  The lust-lost warrior violently thrashes and begins to scream, not in pain, but bliss.  Her snatch clenches like a vice, wringing your ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("equine ");
        else this.outputText("thick ");
        this.outputText("inseminator in achingly tight hotness.  You bellow and bury yourself fully inside of her, clenching heat surging out from your [balls], dick-tip ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("flaring ");
        else this.outputText("engorging ");
        this.outputText("to seal itself inside your fuck-broken lover's baby-hole.  What feels like a gallon of seed lurches out from your cock.  Kiha's innards turn white from the creamy deluge");
        if (c <= 250) this.outputText(", stuffed up with hot cum");
        else if (c <= 1500) this.outputText(", her belly inflating to pregnant proportions");
        else if (c <= 3000) this.outputText(", her belly inflating to pregnant equine proportions");
        else this.outputText(", her belly distending hugely, grossly even, utterly filled with cum until it's squirting from her pussy in a river of white");
        this.outputText(".");
        this.outputText("[pg]Sighing, you pull out of the twitching dragoness.  Her violated twat runs white with cum, dripping out in the messiest creampie you've made in some time.  Kiha shivers and reaches down, scooping your musky ");
        if (this.player.cocks[x].cockType.Index > 0) this.outputText("animal-");
        this.outputText("cum from herself to sample its unique flavor.  The sight invigorates your flagging cock, raising it back to towering, horse-like proportions");
        if (this.player.isTaur()) this.outputText(" until the shaft bumps your belly");
        this.outputText(".  You've just started to breed this bitch!");
        this.outputText("[pg]Kiha's ");
        if (c > 250) this.outputText("cum-gravid ");
        else this.outputText("spunk-stuffed ");
        this.outputText("form proves easy to move.  She barely seems conscious of you - too busy sighing and rubbing at her pussy to really care how she's moved.  You wipe her cunt-stink from your shaft on the inside of her butt-cheeks, thankful that the scales fade to skin that close to her puckered tailhole.  Pulling her tail aside to give you a better view, ");
        if (this.player.isTaur()) this.outputText("you push her onto her hands and knees atop the rock and re-mount her, and ");
        this.outputText("you slide your cock between Kiha's sweat-soaked asscheeks.  Some small part of you is aware that there's no sense mating this hole, but with the air so heavily laden in fuck-scent, you don't really care.");
        this.outputText("[pg]You shove your ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("flare");
        else this.outputText(this.player.cockHead(x));
        this.outputText(" against Kiha's tight anal opening, eliciting a squeal of surprise from your breeding bitch at the unexpected thrust.  Unfortunately, it's so tightly closed that you can't quite get in, even with all the juices soaking your cock.  Regretfully, you dip your dick into the river of slime that trails from your ");
        if (horse) this.outputText("mare");
        else this.outputText("slut");
        this.outputText("'s cunny and try again.  Still, you cannot quite force your way in.  ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("The unique shape of your cockhead makes such penetration difficult, but with animalistic stubbornness, you keep at it.");
        else this.outputText("The sheer size of your cockhead makes such penetration difficult, but with animalistic stubbornness, you keep at it.");
        this.outputText("  Battering against her pucker, relaxing, and circling the tight hole with your ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("flare");
        else this.outputText(this.player.cockHead(x));
        this.outputText(", you work her asshole until it begins to give.  It won't be long now.");
        if (this.player.isTaur()) this.outputText("[pg]You reach down and grab Kiha's tail, providing ");
        else this.outputText("[pg]The dragon's limp tail provides ");
        this.outputText("a suitable handhold to help level your tool into her dark, rear cavern.  Pulling hard on it, you ram forward, and at last, your slime-slicked ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("horse-");
        this.outputText("cock pops through Kiha's sphincter to nestle in her gut.  She's blessedly hot, and her back-door feels twice as tight as her well-fucked pussy.  It will be more than suitable for breeding.  ");
        if (!this.player.isTaur()) this.outputText("You run a hand over her rump, stopping only to give it familiar slaps as y");
        else this.outputText("Y");
        this.outputText("ou force the rest of your thick ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("animal-");
        this.outputText("cock into the dragon's butthole.  Her tight, anal ring acts like a cock-ring for your immense member, keeping it ultra-hard inside her even as it kisses up ");
        if (this.player.hasSheath()) this.outputText("to your sensitive sheath");
        else this.outputText("to your sensitive loins");
        this.outputText(".  You realize you're too big for this to be comfortable for her, but you begin to fuck her ass anyway, knowing that as a female, she'll enjoy your dominance as much as she'll love being bred, even in the ass.");
        this.outputText("[pg]\"<i>F-fuck, you're so goddamn BIG!</i>\" Kiha cries as she pants in the dirt.  You can feel her stuffed womb sloshing against you through the thin walls of her guts");
        if (c < 250) this.outputText(", and see the unique equine shape buried in her tight tummy");
        this.outputText(".  Of course you're big, you think, you're the alpha, the " + this.player.mf("stud", "breeder") + ", the one in charge.  You ");
        if (this.player.isTaur()) this.outputText("lean down to ");
        this.outputText("smack her rear in appreciation of your bitch's loyal service and jackhammer against her bouncy butt, holding tight to her tail lest it go wild from her pleasure.");
        this.outputText("[pg]Kiha begins moaning, and you occasionally feel her semen-soaked fingertips bumping against your ");
        if (this.player.balls > 0) this.outputText("[balls]");
        else this.outputText("sheath");
        this.outputText(".  She gives you encouraging squeezes while you destroy her anus, egging you on to utterly ravish her.  Those tender fingertips soon disappear back into the dragoness's hungry twat, masturbating her quim with your heavy spunk as lube.  You sneer and slap the bitch's cum-hungry ass, watching it jiggle slightly as the light reflects off the scaled portion.  Not satisfied with fucking every one of her body's holes in turn, you grab her ruby tresses and pull back, forcing your ");
        if (horse) this.outputText("mare ");
        else this.outputText("slut ");
        this.outputText("to arch her back into a serpentine curve.  The view nearly sets you off, but your body isn't quite ready to blow yet.  You need a little more.");
        this.outputText("[pg]You command, \"<i>beg,</i>\" with ");
        if (horse) this.outputText("the unquestionable authority of a herd alpha.");
        else this.outputText("an unquestionable air of authority.");
        this.outputText("  Kiha twists her head slightly, wincing as it pulls her hair.  She can only get far enough to let you see one of her reptilian eyes, but you can see drool hanging from her dusky lips as she speaks, \"<i>G-give it to me.  F-fill my ass.  Mount me!  CLAIM ME!</i>\"  You grunt and bottom out in her gut, your ");
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) this.outputText("flare ");
        else this.outputText(this.player.cockHead(x) + " ");
        this.outputText("spreading wide as you reach your absolute apex.  Cum surges through your body, stretching your urethra, opening the tip of your sensitive cumslit as it launches into your slut's rear.  She groans happily, her eyes rolling back and tongue lolling from her mouth.  Kiha's vocalizations aren't even words at this point, just animal grunts of pleasure, much like your own.  You flood her rectum with seed, pumping her rump with jism.  You hold her immobile against you until you finish inseminating her, and then, with a quick smack on her reddening cheek, you slide out and release her hair.");
        if (c >= 3000) this.outputText("[pg]A torrent of cum runs from her overfilled butthole and cunt.  It seems there just isn't enough room inside her to hold it all, and with two plus-sized loads in her bottom holes, most of it has to escape.  Even with that, she still looks heavily pregnant, a perfect tribute to your unholy virility.");
        else if (c >= 1000) this.outputText("[pg]A wash of cum runs from her overfilled butthole and cunt.  Even with that, she still looks heavily pregnant, a perfect tribute to your potent virility.");
        else this.outputText("[pg]Trickles of cum run from her butthole and well-ravished cunt, a potent reminder of your virility and the dominance you have over your females.");
        this.outputText("  Kiha rolls onto her side, cradling her belly, both holes gaping and marked by your spunk.  She mewls, \"<i>So... good,</i>\" and dips a finger back into her pussy, gathering up more of your seed to taste.");
        this.outputText("[pg]You circle and lower yourself in front of her face, the perfect height, and you rest your cum-soaked shaft on her face, the " + this.player.cockHead(x) + " drooping into her hair to leak seed into the reddish tresses.  Kiha sniffs your ");
        if (this.player.balls > 0) this.outputText("[balls]");
        else if (this.player.hasSheath()) this.outputText("sheath");
        else this.outputText("cock");
        this.outputText(" and sighs happily.  She reaches up to touch it, her hands reverently smearing her pussy-juices and your leftover cum all over your cock and her face.  She still seems to be quite out of it, but at least she's enthusiastic in her cocklust.  You wipe as much of the sexual slime from your dick off on her nose as possible, and then dry yourself with her hair.  Kiha purrs and scoops some into her mouth as you rise, barely noting your departure as she begins to masturbate.");
        //(FIRST TIME ONLY:
        if (this.flags[kFLAGS.KIHA_HORSECOCK_FUCKED] == 0) {
            this.outputText("[pg]Once you get away from her intoxicating scent, you realize what you just did.  You clap a hand over your mouth");
            if (this.player.cor <= 33) this.outputText(" and wince");
            this.outputText(", wondering just what caused you to go so lust-crazy.  ");
            if (this.player.lib < 80 && this.player.minLust() < 50) this.outputText("Was it the lust draft?  Or");
            else this.outputText("Was it");
            this.outputText(" something Kiha's body - or yours - did?  You shake your head and hope she won't hold the incident against you.");
            if (this.player.statusAffectv1(StatusAffects.Exgartuan) == 1) this.outputText("  Exgartuan suggests, \"<i>She probably loved it if she had as much fun as I did.</i>\"");
            this.flags[kFLAGS.KIHA_NEEDS_TO_REACT_TO_HORSECOCKING] = 1;
        }
        //(REPEAT:
        else this.outputText("[pg]It happened again!  You shudder and stroke yourself, the unmistakable desire to do it again already cementing itself in your brain.  Well, at least Kiha doesn't mind too much.");
        if (this.player.minLust() < 50 && this.player.lib < 80) {
            this.outputText("[pg]<b>(You used up one lust draft!)</b>");
        }
        this.flags[kFLAGS.KIHA_HORSECOCK_FUCKED]++;
        this.player.orgasm();
        this.dynStats("lib", -1, "sen", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    //flags[kFLAGS.KIHA_NEEDS_TO_REACH_TO_HORSECOCKING] = 1;
    //Kiha's Reaction to Horsecock Sex (1 time only)
    public kihaReactsToHorseDicking(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.outputText("Kiha folds her arms across your chest when you approach, her wordlessness letting you know that she clearly remembers the events of your last meeting.  You stop a few feet away and cross your arms, waiting to see what she's going to do.  In a flash, she's on you!  Not punching, kicking, or biting you, but hugging you, sniffling into your shoulder.  She whimpers, \"<i>I... I didn't mean for that to happen!  I didn't!  I swear!</i>\"");
        this.outputText("[pg]You push her back and look the teary dragoness in the eyes as you ask her what she means.  She replies, \"<i>You don't know?  Oh... okay.  Well... one of the things the demons did to us... it was supposed to make us able to manipulate our pheromones, in order to exploit our enemies.  We... we broke out before we learned how to use it.  I think... I might have used it a little bit when we had sex... and somehow... somehow I think I did it to both of us.  You might have even reacted to it somehow, I don't know.  You smelled so goddamn good!</i>\"");
        this.outputText("[pg]Wow!  You hug her again and laugh, glad that she seems to be okay after everything that happened.  She scowls and punches your shoulder, hard enough that it will probably bruise.");
        this.outputText("[pg]\"<i>Idiot!  I all but mind-control you into a ravenous fuck-beast and all you can do is laugh about it?  You jackass!</i>\" Kiha yells.  You pull her back into your arms and explain that it felt pretty goddamn good, even if things did get a little out of hand.  Kiha goes limp in your arms and whispers, \"<i>...better than good, doofus.</i>\"");
        this.outputText("[pg]You ask her if she thinks she could do it again.  She looks at you, emotions warring behind her reptilian eyes before she answers, \"<i>Maybe... I can't really control it.  If we acted like that again... I... it would probably happen again.</i>\"");
        this.outputText("[pg]You aren't sure if she looks hopeful or scared.");
        this.outputText("[pg]Do you want to do anything with Kiha?");
        this.flags[kFLAGS.KIHA_NEEDS_TO_REACT_TO_HORSECOCKING] = 2;
        //{MENU HERE}
        this.warmLoverKihaIntro(false);
    }

    //BIGGUS DICKUS Cock Slurping
    private kihaPlaysWithBigassCocksFemDomAhoy(): void {
        this.clearOutput();
        this.spriteSelect(72);
        var x: number = this.player.biggestCockIndex();
        //Works for swamp or camp!
        this.outputText("You playfully approach the fiery cutey and pull her into a tight hug, your bodies molding together as one.  Kiha looks ");
        if (this.player.tallness >= 84) this.outputText("up ");
        else if (this.player.tallness <= 60) this.outputText("down ");
        this.outputText("at you with feigned indifference, but her vertically slit eyes seem a tad more moist than normal.  Her warm, soft body heat suffuses you, rousing your loins to wakefulness.  Like a long-dormant beast, your " + this.cockDescript(x) + " rises from its slumber.  It snakes between your bodies, easily escaping from your [armor] to smush past Kiha's soft cleavage.  The [cockHead biggest] peaks out to nuzzle your scaly lover's cheek, pulsing hotly against the smattering of tiny, freckle-like scales that dot her visage");
        if (this.player.cocks[x].cockLength > 48) this.outputText(" for a moment before climbing higher.  It quickly blocks your view of your lover.");
        else this.outputText(" for a moment before thickening and twitching against her.");
        this.outputText("  Elephant in the room indeed.");
        this.outputText("[pg]Kiha nips at it with her teeth, pulling on your thick cock-skin to get your attention.  \"<i>A little over-eager, huh?  You're hopeless, doofus.  What'd you do, use Gro+ as lube?</i>\" she wonders, even as she peels you out of your [armor].  \"<i>You know, if you don't learn to control yourself, you're going to wind up strapped into a demon fucking machine for the rest of your life.  Though, with a dick like this, maybe that's what you've been getting ready for.</i>\"  Kiha sighs, \"<i>Pathetic,</i>\" and circles your [cockHead biggest] with delicate touches of her fingertips and feather-light caresses from her claws.");
        this.outputText("[pg]Smiling, you inform your domineering partner that you only got that way because of her.  Because her lovely, sculpted form was so very close to you.  She turns crimson (well, more crimson than normal), and slaps your [cock biggest] with her palm.  \"<i>R-really... I did... THIS?</i>\" she stammers.  You nod, as sagely as you can with an erection ");
        if (this.player.cocks[x].cockLength > 48) this.outputText("bigger than");
        else this.outputText("the size of");
        this.outputText(" your torso.  Kiha actually giggles, a sound you never would have expected her to make when you first met, and she playfully begins to jack off your [cock biggest], humming happily when it gets slightly larger and harder in her hands.");
        this.outputText("[pg]You lean back against a ");
        if (this.followerKiha()) this.outputText("rock");
        else this.outputText("tree");
        this.outputText(" and sigh in contentment, happy to let Kiha tend to the omnipresent beast that hangs down with your [legs].  The heavy, sensitive burden that is your [cock biggest] is always making it hard to move, and worse, it practically immobilizes you when it gets hard.  But in moments like this, you're glad you have so much sensitive dick for Kiha's hands to explore");
        if (this.player.cocks[x].cockType == CockTypesEnum.HUMAN) this.outputText(", particularly your medial ring and the sensitive edge of your flare.");
        else if (this.player.hasKnot(x)) this.outputText(", particularly your massive, bulging canid knot.");
        else if (this.player.cocks[x].cockType == CockTypesEnum.DEMON) this.outputText(", particularly the hundreds of demonic nodules that ring your shaft.");
        else if (this.player.cocks[x].cockType == CockTypesEnum.ANEMONE) this.outputText(", particularly the groups of aphrodisiac laced tentacles under your crown.");
        else if (this.player.cocks[x].cockType == CockTypesEnum.TENTACLE) this.outputText(", particularly the underside of your tentacle's mushroom-like tip.");
        else if (this.player.cocks[x].cockType == CockTypesEnum.CAT) this.outputText(", particularly the hundreds of rubbery spines covering your feline maleness.");
        else this.outputText(".");
        this.outputText("  The whole world seems to spin as Kiha's attentions bring you to ever-higher levels of pleasure, and you grab hold of her hips to steady yourself when you nearly slide off your resting place.  She ");
        if (this.player.cocks[x].cockLength > 48) this.outputText("pulls your cockhead down and ");
        this.outputText("sticks out a remarkably long, reptilian tongue.  It encircles your tip like a snake, though instead of crushing the life from its prey, it appears content to try and squeeze the cum out of you.");
        this.outputText("[pg]The onslaught of affection batters the strength from your [legs], leaving you to slump down to the ground.  Kiha gets down on her knees to maintain her position.  Her tongue untwists from around your [cock biggest] quickly, feeling so good it almost hurts and nearly unleashing your load at the same time.  She kisses the moist cum-slit at your tip and looks around your shaft, her lips coated in pre as she teases, \"<i>Such a big, virile " + this.player.mf("male", "specimen") + ", and yet... this thing makes you so easy to defeat.</i>\"");
        this.outputText("[pg]Kiha twists her tail ");
        if (this.player.hasKnot(x)) this.outputText("beneath your knot ");
        else {
            this.outputText("around your base");
            if (this.player.hasSheath()) this.outputText(", just above the sheath, ");
            else this.outputText(" ");
        }
        this.outputText("into an impromptu cock-ring.  The hot, scaly appendage pulls just tough enough to make your [cock biggest] even harder, but not quite painfully so.  You whine from the pent-up pressure in your [balls], a high-pitched, keening sound of pleasure.  Your dragoness trails a claw-tip down the bulge of your urethra as she replies, \"<i>Not long now, doofus... not long now.  I-I've got to... uh... train you to control this... this... thing.  Maybe if you cum hard enough, you won't lose like a chump to some low-level demonic toadling, will you?</i>\"");
        this.outputText("[pg]You nod, too overwhelmed by the symphony of touches up on your shaft.  Kiha shuffles closer, then spins around to sit half in your lap, half on her tail.  Her steamy box grinds on you while her ruby tresses tickle your nose and cascade in waves over your [chest].  The movement wraps another half-coil of tail around your [cock biggest], the bottom ring pulling even tighter, in turn making you even harder.  Kiha wraps her arms around your maleness for support and lifts her legs, placing the hot, supple soles of her feet on either side of your mammoth urethral bulge.  A huge dollop of pre-cum beads at your [cockHead biggest], but Kiha slurps it down before it can escape.  \"<i>Can't have you running around covered in your own sex-stink can we?  Goblins would be all over you before you know it, and an idiot like you would probably make them all pregnant with this... this... mmm... uh, gross thing.</i>\"");
        this.outputText("[pg]Kiha interlocks her fingers and begins pumping you fast and hard.  Her feet rub along either side of your [cock biggest] in circular motions to the same tempo.  She leans back over her shoulder to kiss you, the dragon's extra-warm body temperature making you sweat and drip.  It's so hot... so very hot.  You can feel the warmth building in your core.  ");
        if (this.player.balls > 0) this.outputText("Your balls clench and relax in time with the waves of pleasure, and y");
        else this.outputText("Y");
        this.outputText("our dick feels ready to burst.  Kiha is shaken by your massive prick's twitching, and frenches you more aggressively before whispering, \"<i>Go on, cum.  Cum for me, my toy.  Let your dick rejoice just this once, and cum for me.</i>\"  Kiha circles your [cockHead biggest] with her tongue, lashing the saliva-soaked appendage back and forth across the summit of your bloated organ.  You groan loudly and clench, feeling the cum start to pump from your [balls], up through your bulging, flooding urethra.");
        this.outputText("[pg]Kiha comments, \"<i>That's it, that's a good " + this.player.mf("boy", "girl") + ",</i>\" just in time to watch the first globules of semen blast into the air.  You clench and unload another geyser of sperm into the air before the first rains down over Kiha, splattering over her hair and face");
        if (this.player.cumQ() >= 1000) this.outputText(", effectively bukkaking her from the sheer volume of your ejaculate");
        this.outputText(".  Some of it even hits you, but you're too busy clenching rhythmically, expelling every drop of your creamy white juicy into the air for Kiha's still-pumping soles.  ");
        if (this.player.cumQ() >= 2000) this.outputText("Wave after wave of spunk rains down over you, forming a gratuitous puddle and utterly, completely sliming you both.  ");
        this.outputText("Kiha shivers slightly and brushes a few ropes of jism away from her eyes as she says, \"<i>Idiot!  You got me wet!</i>\"");
        this.outputText("[pg]You slump down with a dopey smile, dragging the spooge-spattered dragoness with you, back into a hug.  Kiha snorts a puff of fire in irritation, but admits, \"<i>You know, if I do that to you... I wouldn't mind you getting all hot and bothered for me more often.  J-just keep it out of my hair next time, doofus!</i>\"  She stands, uncoiling her tail from your slowly-softening shaft and stretching, forcing you to look at the absolutely soaked wetness of her pussy.  The lips are tinged reddish and enflamed with lust, though Kiha seems to manage it well as she saunters away towards a stream.");
        if (this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] > 0) {
            if (this.player.cor < 50) this.outputText("  You hope she doesn't get jumped upby your tiger-shark children.");
            else this.outputText("  You wonder what would happen if she got jumped by your tiger-shark children.");
        }
        this.outputText("[pg]Wiping up as best you can, you don your [armor] and walk back");
        if (this.monk >= 5 && this.player.findStatusAffect(StatusAffects.NoJojo) < 0 && this.flags[kFLAGS.JOJO_DEAD_OR_GONE] == 0) {
            if (!this.jojoScene.tentacleJojo()) this.outputText(", ignoring the sounds of Jojo feverishly masturbating in the woods");
            else this.outputText(", ignoring the sound of Jojo vigorously fucking himself with all his tentacles in the trees");
        }
        this.outputText(".");
        if (this.sophieBimbo.bimboSophie()) this.outputText("  Sophie greets you when you return, though she seems crestfallen once she smells the sex on you and realizes how thoroughly you've been sated.");
        if (this.amilyScene.amilyCorrupt()) this.outputText("  Amily begs, \"<i>May I help to service you next time, " + this.player.mf("master", "mistress") + "?</i>\"");
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    //Girl Camp/Warm Sex
    private kihaGirlGirlSex(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.outputText("You pull Kiha into your arms and ask, \"<i>Up for a little play?</i>\"  She blushes and gives a tiny, curt nod.  You smile as you pinch Kiha's nipples softly, tweaking the dragoness's twin buds with just enough pressure to make them firm up in your grip.  Rolling them back and forth, you watch as Kiha's expression flashes between annoyance, desire, and unrepentant lust.  When you hear the 'drip... drip...drip...' of her juices on the ground, you know she's ready.");
        this.outputText("[pg]Kiha stands before you, back arched to present her chest to you, mouth open slightly, and pussy drooling wantonly.  Perfect! You lick the smooth curve of one of her well-rounded breasts, the soft flesh giving just the right amount when you nuzzle against it.  Even with Kiha's supernaturally warm body, you can feel her excitement heating her and see the telltale blush spreading through her chocolate-hued skin.  You lap at her nipple, then reluctantly part from her delectable breast-flesh to undress.  Tossing your [armor] to the side, you bare your body to the reptilian woman and reveal the flush of your own arousal.");
        this.outputText("[pg]The scaly texture of her tail suddenly encircles your waist and pulls violently to the side, yanking you down on to the ground.  A moment later, Kiha is on top of you, savagely kissing and nipping at your body - first your neck, then your collar bone, and then your nipples.  Nothing is safe from Kiha's crude affections, not even your pussy.  Kiha traces a fingertip down your navel, stopping just above your cunt.  You gasp, feeling deliciously hot and growing wetter and wetter from the thought of being caressed down there so roughly.  ");
        if (this.player.wetness() < 4) this.outputText("Trickles");
        else this.outputText("Small rivers");
        this.outputText(" of lubricant run down your [legs] as Kiha molests you, always pulling back just when it seems she'll finally touch your feminine core.");
        this.outputText("[pg]In a flash, the dragoness flips about to smother your face in sopping muff.  \"<i>Lick,</i>\" she growls, simultaneously parting your labia with one of her knuckles.  You gasp in response, taking in a mouthful of dragon-cunt without meaning to, then lolling out your tongue to lick at your lover's tasty cooch.  Kiha sighs and massages your vulva with her palm, feeling your sensitive entrance up before putting her knuckle back inside.  She flicks her thumb over your [clit]");
        if (this.player.clitLength >= 10) this.outputText(", gasping when it grows to a ridiculous size.");
        else if (this.player.clitLength >= 3) this.outputText(", humming appreciably when it grows to cock-like length.");
        else this.outputText(", humming happily when it stiffens against her.");
        this.outputText("[pg]\"<i>I don't think you'd get a goblin off like that,</i>\" grumbles Kiha, \"<i>Let me show you how it's done.</i>\"  Her hands move to squeeze your [butt] as she dives into your crotch.  A long, flexible tongue disappears between your legs and spears into your canal, penetrating you as thoroughly as a man's member, but far gentler, far hotter, and MUCH wetter.  You squirm beneath the dragoness and rock your [hips] into her face, luxuriating in the touches, tastes, and audible wet squelches of your copulation.");
        this.outputText("[pg]Kiha mutters, \"<i>Better,</i>\" and goes back to attacking your saliva-soaked canal.  Tiring of her crude jibs at your oral skills, you twist and roll, landing with her underneath.  You bend back down to her drooling cunny and suck it into your mouth.  The hard pleasure-pearl pulsates insistently on your lips as you lash at it with your tongue, slathering it in affection even as you plunge two fingers into the drizzling slot beneath.  Kiha's well-coordinated assault upon your mound pauses, then breaks apart into uncoordinated caresses.  You pump her box hard, adding a third finger as her juicy snatch yields to your hard-pumping hand.");
        this.outputText("[pg]The dragoness's clit swells slightly in your mouth, the only warning you get before a flood of tangy girl-spunk is released from Kiha's climaxing pussy.  Her tongue goes wild inside you, slamming back and forth at the walls of your vaginal canal, sending unintentional spikes of pleasure that make it hard to focus on the quivering cunt you're still pumping.  You give her clit one last lick, then give in to the pleasure and mash your " + this.vaginaDescript() + " back into Kiha's mouth and nose.  You cum just as hard as your lover, releasing a ");
        if (this.player.wetness() < 3) this.outputText("trickle");
        else if (this.player.wetness() <= 3) this.outputText("small gush");
        else if (this.player.wetness() <= 4) this.outputText("river");
        else this.outputText("explosion");
        this.outputText(" of lady-spooge to mess her face.");
        this.outputText("[pg]Mouths stuffed in each others' twats, you lie with your lover, lazily lapping at fragrant girl-honey while your bodies shiver from aftershocks of bliss.  Kiha admits, \"<i>Okay, you're - lick - not too bad - lick - at this.</i>\"  You swat her rump and stroke her happily swaying tail before thanking her.");
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    //Warm Kiha Sex - Anal (Needs a cock that fits her butt)
    private savinTheAnalForKiha(): void {
        this.clearOutput();
        this.spriteSelect(72);
        var x: number = this.player.cockThatFits(94);
        if (x < 0) x = 0;
        this.outputText("Giving the dragoness a little grin, you slip around her half-furled wings and grab her big, soft butt. Kiha lets out a little gasp, then turns to glower at you, though you duck behind her massive wings and give her cheeks a little squeeze.  \"<i>W-what do you think you're doing back there, doofus?</i>\" Giving her a playful swat, you turn around, pressing your [chest] against ");
        if (this.player.tallness >= 60) this.outputText("her shoulders ");
        else this.outputText("the small of her back ");
        this.outputText("and grabbing both of her lush, soft buttcheeks in your hands.  Kiha makes a show of growling and squirming in your grasp, but does not resist as you tease, eventually even swishing her tail over to rub your thighs and your own [butt].");
        this.outputText("[pg]\"<i>Gah!</i>\"  the dragoness gasps as she feels your hardening " + this.cockDescript(x) + " pressing into her butt, barely restrained by your [armorName].  \"<i>Oh, of all the things to obsess over!</i>\"  she groans, but to your delight Kiha wiggles her hips in your grip, grinding her soft butt against your prick.  You give her a sharp little spank, and laugh as Kiha draws a sharp breath and clenches her derriere - just in time for you to free the beast, your " + this.cockDescript(x) + " flopping down between her butt cheeks.");

        this.outputText("[pg]\"<i>Oh, I get it,</i>\" Kiha jeers, suddenly pushing back until your cock is pinned between your ");
        //(depending on length:
        if (this.player.cocks[x].cockLength < 12) this.outputText("belly");
        else this.outputText("chest");
        this.outputText(" and her butt.  \"<i>You want a little assplay, is that it?  You ");
        if (this.player.tallness >= 60) this.outputText("big");
        else this.outputText("little");
        this.outputText(" pervert.</i>\"  Despite her biting words, she continues to grind against you, now lifting her bum up and down to run along the length of your shaft");
        //[if cock less than 3</i>\" wide:
        if (this.player.cocks[x].cockLength < 3) this.outputText("; you pull her cheeks apart just long enough to slip your prick between them, letting Kiha hotdog you");
        this.outputText(".  Moving your hips in tandem with hers, the two of you must look to any observers like a couple engaged in some perverse dance, grinding, teasing, and groping at each other until you're both flush and Kiha's thighs are slick with her girl-lube");
        if (this.player.hasVagina()) this.outputText(", just as yours are");
        this.outputText(".");
        this.outputText("[pg]Suddenly, Kiha thrusts her hips back - you stumble and fall, your back hitting a ");
        if (!this.followerKiha()) this.outputText("tree");
        else this.outputText("rock");
        this.outputText(" nearby.  Before you can recover, Kiha's straddling you, a savage grin on her face.  \"<i>For a so-called Champion, you're a total pervert... After all that, I bet you wanna stick that,</i>\" she glances down to your stiff " + this.cockDescript(x) + ", already dribbling pre, \"<i>in my ass, don't you?  After all, you're so obsessed with it...</i>\"");
        this.outputText("[pg]You nod eagerly, your mind ensnared by her soft butt and the thought of your prick sliding into her tight, hot passage.  Kiha makes a <i>tsk</i> sound, \"<i>Such a dirty mind, thinking about such dirty places,</i>\" you groan as she, already positioned to easily just slide down on your cock, stands and steps back.  \"<i>Oh, don't worry, I'll give you what you want.... but not yet!</i>\"");
        this.outputText("[pg]Kiha spits, her glob of saliva hitting the bottom of your cock with a warm, wet smack.  You shudder at the sudden heat on your " + this.cockDescript(x) + ", but it turns into a writhe of pleasure as Kiha grabs your prick between two of her big, scaly toes, her claws hanging menacingly around your girth.  She grins, looking over you as she pushes your prick back down against your belly.  Her supple, leathery soles press down on your rod, slowly sliding up and down your length, grinding her saliva into your cock, spreading her lubricant around.");
        this.outputText("[pg]You groan in need as the dragoness runs her scaly foot across your dick, desperately wanting to stick yourself into her warm hole, or even to buck your hips, but Kiha holds you down, her claws brushing gently across your sensitive crotch-flesh; your skin tingles at her lightest touch, made dangerously sensitive by the lack of penetration.  Kiha grins, watching the effect she's having on you, and spits again to add a bit more lube to your cock, rubbing it in at length with her soft heel. It doesn't seem as though she's satisfied, however.");
        this.outputText("[pg]Kiha takes her foot off your dick and slips down onto her hands and knees, crawling ");
        if (this.player.isNaga()) this.outputText("along your long naga tail");
        else this.outputText("between your [legs]");
        this.outputText(".  Her movements are slow, sensual, teasing as she advances on you.  Her large, dusky breasts brush the ground, stiff nipples coming to rest on either side of your abused prick, dabbling into the pool of pre and spit she's left around the base of your cock. Laying atop you, the dragoness takes her breasts and wraps them around your shaft, enveloping your " + this.cockDescript(x) + " in warm, soft titflesh.  You let out a low, animalistic moan as she drags her tits along the entire length of your prick, keeping them pressed tightly together and spitting again and again onto you.  Her tits are as good as a wet pussy, not too tight but deliciously wet. You desperately want to cum, to smear her big tits with your seed, and the mere thought causes a long trickle of pre to leak out of your " + this.player.cockHead(x) + ", adding itself to the sodden mess your lover's turned your shaft into.  Kiha grins devilishly at you, her long tongue flicking out to taste your seed.");
        this.outputText("[pg]\"<i>Mmm, not bad.  And so much... you must be dying to stick your cock in, aren't you?  Do you want that " + this.cockDescript(x) + " inside me, doofus; to feel my tight little asshole swallow you up? I think you're about ready...</i>\"");
        this.outputText("[pg]Kiha shifts, straddling your [hips] and spreading her ass cheeks wide.  She lowers herself, slowly, moving down just enough to let your sensitive " + this.player.cockHead(x) + " brush the tight ring of her pucker.  You both gasp at once, a little lightning bolt of pleasure connecting you for a fraction of a second.  Kiha groans, slowly sliding down, just enough so that your head pokes through her clenched sphincter, brushing against the hot, moist walls of her anal passage.");
        this.outputText("[pg]She stops, though, suspending your prick in the air between the two of you.  She reaches up, tweaking your [nipples] playfully");
        if (this.player.biggestTitSize() >= 3) this.outputText(" as she palms your " + this.biggestBreastSizeDescript(), false);
        this.outputText(".  She leans forward, pressing her chest to yours, as she wraps her arms around your shoulders.  She pulls you tight, holding you close as she resumes her descent upon your cock, her previously domineering attitude vanishing in a second as you stretch the walls of her anus.  Your well-lubricated cock has little trouble sliding into her, but the insertion is nonetheless nearly overwhelming.  Kiha's innards are hot and tight, squeezing down on your shaft like a warm, wet vice.");
        this.outputText("[pg]You hug Kiha close, pulling her in tight as she finally ");
        if (this.player.cocks[x].cockLength >= 40) this.outputText("bottoms out on your cock");
        else this.outputText("rests her cheeks on your crotch");
        this.outputText(".  Both of you are gasping and panting from the slow descent, Kiha ");
        if (this.flags[kFLAGS.TIMES_KIHA_ANALED] >= 5) this.outputText("growing pleased by");
        else this.outputText("unused to anal penetration");
        this.outputText(" and you already so sensitive from edging again and again.  Kiha slowly rolls her hips, dragging out an inch of your cock at a time before her gripping asshole swallows it back up; when she moves, though, she's careful never to seperate the two of you, always holding each other close as she gently rides your " + this.cockDescript(x) + ".  You grin as she finally allows you to move, your hips reaching up to meet hers as she begins making short, quick bounces, still holding you tight enough to nip your ear and trace kisses along your neck.");
        this.outputText("[pg]You move together, pressing your cock deep into Kiha's hot bowels before withdrawing nearly to the tip.  Again and again your " + this.cockDescript(x) + " slides in and out of Kiha's asshole, slowly stretching her until the going gets easy.  She starts to pick up the pace, pulling you up from the ");
        if (this.followerKiha()) this.outputText("rock");
        else this.outputText("tree");
        this.outputText(" you've been resting against and mashing your face between her pre-slicked tits as she starts to well and truly ride your dick, hammering her hips down and down again on your throbbing shaft until you're aching with the need for release.");
        this.outputText("[pg]Kiha bites her lip, moaning openly from the anal penetration.  Deciding not to cum alone, you reach down and sink a few fingers into her wet box.  She screams in pleasure as you snake your hand into her hot, needy cunt.  Instantly your fingers are submerged in her juices, warm and sticky and sweet.  You finger her for a moment, then bring your digits out and press them against Kiha's parted lips, letting the dragoness taste the need you've created in her.  She suckles on you, lapping up her own juices as you shift your other hand to fingering her, easily sliding a fist into her ready twat.");
        this.outputText("[pg]Your massive insertion nearly sets her off.  Kiha groans, grinding her teeth along your knuckles as you start to thrust into her faster, creating a double rhythm inside her.  You can feel your dick pounding her through her vaginal walls, and vice-versa.  Grinning, you try to touch yourself through her insides, straining and tickling Kiha's innermost depths - and touching a very certain spot.");
        this.outputText("[pg]Kiha screams and cums, clamping down hard on your fist and cock as gushers of hot girlcum flood out of her loins.  \"<i>Y-yeaaaahh!</i>\"  she cries, \"<i>Come on, you think... you think I'll just let you cum... Just like that!?  Just for getting me... getting me off til I can't - aaaahhhh! - think straight... and I'd let you cum too; shoot a big hot load right up that ass you're so obsessed with?</i>\"");
        this.outputText("[pg]\"<i>Well you're fucking right, dumbass!  CUM ALREADY!</i>\"");
        this.outputText("[pg]Your lover's orgasm and crying demand launch you into your own climax.  Finally able to let yourself go, you unleash a torrent of white, hot seed into Kiha's asshole, shooting globs of spunk deep inside her.  She grips down on your " + this.cockDescript(x) + " hard, digging her claws into your shoulders and biting your neck, thrashing herself up and down your spasming shaft as the two of you cum together, riding out a powerful orgasm until your mind is nearly blank with pleasure.");
        this.outputText("[pg]By the time you recover, Kiha's turned around, now sitting in your lap, your cum-soaked cock stuffed up her ass and your hands wrapped around her waist.  She nestles against your chest, reaching back to run her fingers through your hair.  \"<i>N-not bad, for a pervert,</i>\" Kiha chuckles, rubbing the small part of your prick not tucked inside her.  \"<i>If you're lucky... I might just let you do this again.</i>\"");
        this.outputText("[pg]Grinning, you give your dragoness a long, loving kiss on the lips.  You sit entwined for a long while, kissing and cuddling, until Kiha eventually draws herself off of you.  \"<i>Don't just sit there all day, doofus,</i>\" she teases, \"<i>Don't you have demons to defeat?</i>\"");
        this.outputText("[pg]You give Kiha a playful swat on the butt as you depart, laughing as the impact causes a trickle of your cum to leak out and down her thigh.  \"<i>Oh, you idiot!</i>\"  she growls as you run off back to your duties.");
        this.player.orgasm();
        this.flags[kFLAGS.TIMES_KIHA_ANALED]++;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    //Warm/Follower Kiha Vagaginaginal
    private fuckKihasVagInCamp(): void {
        this.outputText("", true);
        this.spriteSelect(72);
        this.outputText("You grab Kiha by the hand, running your fingers across the scaly texture on the outside of her claw while you pull her in close.  She blushes cutely and smirks, \"<i>Couldn't stay away, huh, [name]?</i>\"  Smiling knowingly, you pull her hand down towards your loins.  A look of confusion clouds the dragoness's usual, stormy gaze as you pull her hand inside the bottom of your [armor].  The feel of [oneCock] pulsing hotly against her fingers is all it takes to shatter your lover's haughty demeanor.  ");
        if (this.silly()) this.outputText("She asks in a high-pitched whine, \"<i>Did I do thaaat?</i>\"  Steve Urkel has nothing on her!");
        else this.outputText("She nervously stutters, \"<i>Is that... because of me?</i>\"");
        this.outputText("[pg]Nodding a little eagerly, you pull the warrioress closer to pin her hand in place, utilizing the familiar, constricting pressure of two bodies tightly entwined.  Kiha's ruby eyes widen, the black slits dilating as emotion surges through her powerful frame.  Her tail slides up behind your [legs] to wrap around them affectionately.  It pulls just tight enough to spread its warmth through you without restricting or unbalancing your movements.  You confidently kiss her, delighted to discover her hand moving on its own as soon as the embrace loosens.");
        this.outputText("[pg]\"<i>S-so you want to... umm... fuck?</i>\" Kiha asks.  You brush a lock of copper hair away from her face and solemnly answer that you want to 'make love'.  Back home, they would joke about making a dark girl blush.  With Kiha, it seems almost preternaturally easy, particularly when she's blushing as hard as she is now.  Her eyelids lower, and her entire dusky visage takes on a smoky, seductive cast as your words sink in.  Kiha's hand shimmies out of your [armor] to hold your [hips], but only for a brief moment.");
        this.outputText("[pg]With a smooth, confident motion, Kiha easily peels you out of your [armor] to expose you as completely as herself.  You let her toss your gear aside before you take charge again, groping one of her squeezable, soft breasts in your hand as you lower her to the ground.  She allows herself to be handled, her actions surprisingly meek for one so often focused on physical dominance, and you take advantage of it while you can.  The dragoness lies on the ground, her legs lewdly splayed to reveal the glimmering delta of her ever-wet womanhood, flush with the arousal you've kindled within her.");
        this.outputText("[pg]You close the intervening distance and climb atop your lover, meeting her heavy, lidded gaze with one of mirth and wonder, always amazed to have such unfettered access to Kiha's long closed-off heart.  She's beautiful, a sparkling ruby jewel you're fortunate enough to take for your own.  Kiha purrs, \"<i>Come on then, </i>lover<i>... show me this... love-making of yours.</i>\"");
        this.outputText("[pg]You need no further encouragement.  Taking your [cockFit 67] in hand, you rub it against Kiha's outer lips, the hot moisture from her furnace-like twat seeming to bubble over your crown.  The dragoness happily hums, \"<i>Mmmm, I could get used to this, if this is what 'love' is...</i>\" as you gradually increase the pleasure.  Her slit, while muscular, is as yielding and pliant as the rest of her right now, a moist fruit that is yours for the plucking. You slip right on inside her.  That cunt... that juicy, hot cunt... squeezes your [cockFit 67] with just enough pressure to make you twitch, spikes of pleasure firing nonstop through your rod until it seems to be flexing inside her, as hungry for the eventual release as you.");
        this.outputText("[pg]Kiha wraps her hands around your neck to pull you down for a wet, draconic kiss.  You respond by reaching back to give the dragon's booty a familiar squeeze, encouraging her to keep it up. She runs one hand's claws down your back, hard enough for the dagger-sharp tips to ");
        if (this.player.skinType != SKIN_TYPE_SCALES) this.outputText("leave long, red scratches on your back.");
        else this.outputText("dislodge the occasional old scale from your hide.");
        this.outputText("  The other stays in place, helping to hold you steadily in lip-lock, even while you impale her folds with your hard-as-adamantium dragonlance.  You thrust hard, pulling back from the dragon's dusky, pouting lips as you watch her facial expression gradually become even more lewd, forced into lasciviousness by your assault on her nethers.");
        this.outputText("[pg]Kiha whines, \"<i>Mine... harder, please... give me... mine.</i>\"  Her breathy exhalations are colored so thickly with unspoken desire you can practically see it in the air.");
        this.outputText(" You nibble at her ear and whisper, \"<i>Yes, and you're mine.  Lie back and take it.  All you have to do is enjoy it.</i>\"");
        this.outputText(" The usually-serious dragon-girl nods into your shoulder as you begin to jackhammer at her cunt.  Juices soak your loins, small spatters spraying out from Kiha's pussy with each hip-jarring impact of groin to loin.  Faster and faster, you drive your [cockFit 67] into her sodden snatch.  It's perfect - a welcoming, hot little hole to snuggle your penis with pleasure until you can take it no longer.  The familiar upwelling of pleasure starts in your [balls], surging up through your waist until [eachCock] is spasming and unloading sticky white jets of love.");
        if (this.player.cockTotal() > 1) this.outputText("[pg]Kiha's belly is quickly glazed white with goo, and her ");
        else this.outputText("[pg]Kiha's ");
        this.outputText("pussy is soon filled up with the stuff.  She squeals in pleasure, wriggling slowly under you as she digs her claws into your arms involuntarily.  Rivulets of spooge trickle from her pussy down the crack of her ass, mixed in with her clear girl-honey.");
        if (this.player.cumQ() >= 500) this.outputText("  Such a meager display is only the start.  You fire rope after rope of cum, enough to slightly distend the dragoness's belly with your seed.");
        if (this.player.cumQ() >= 1500) this.outputText("  Jizz pumps and pumps, squirting from her filled pussy almost as fast as you inject, yet you still manage to make her look nearly pregnant by the time you finish.");
        if (this.player.cumQ() >= 1000) this.outputText("  The drippings form a nice big puddle under Kiha.");
        this.outputText("[pg]After some languid snuggling, Kiha beams up at you radiantly.  \"<i>That was... okay,</i>\" she declares, a quaver of uncertainty in her voice as her emotional defenses come back up.  You stand and slowly stretch the kinks from your muscles.  Teasingly, you remind her that it seemed a little better than 'okay'.  A tail sweeps your [legs] out from under you, a moment before Kiha pounces you with cat-like agility.  She hisses, \"<i>It was better than okay, alright?  It was great.  You've made me happy, [name]!</i>\"");
        this.outputText("[pg]Kiha punches you in the chest before climbing off you.  \"<i>I don't have time for those emotions, doofus... not while Lethice lives.</i>\"  Well, it was a nice moment.");
        this.player.orgasm();
        this.dynStats("lib", -1, "sen", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    //Kiha Takes an Incubus Draft (Requires [Pure?] Incubus Draft)
    private giveKihaIncubusDraft(): void {
        this.outputText("", true);
        this.spriteSelect(72);
        this.outputText("A particularly wicked idea crosses your mind.  Smiling, you approach your draconic lover but, with a feigned look of alarm, point over her shoulder and yell \"<i>HEY, WHAT'S THAT!?!?</i>\"  Grabbing her axe, Kiha spins around, giving you just enough time to grab an incubus draft from your pack and pop the cork.  By the time Kiha rounds on you, fuming, you're ready.  You grab her mouth and shove the draft in, pinching her nose closed so that she has no choice but to swallow.");
        this.outputText("[pg]Kiha staggers back, dropping her greataxe and gripping her stomach as the draft sloshes through her system.  You grin as a sudden squirt of fem-lube erupts from her bare pussy, followed by a sudden twitch and shift of the flesh just above her soaked cunt.  \"<i>W-what did you give me, " + this.player.short + "?  You... you idiot!</i>\" she screams as the skin above her groin violently erupts, a long, hard human-like prick bursting forth into the light.  Kiha lets out a wail of pleasure as her newly-formed prick takes shape, already jetting great white globs of cum onto her thighs and legs.  Her legs give, and Kiha collapses, squirming as her new cock twitches and spasms between her once-powerful legs.");
        this.outputText("[pg]Taking advantage of the dragoness's dazed state, you give her a gentle push onto her back and straddle her, slowly peeling off your [armor].  Grinning down at Kiha, you ask her how she likes your little gift.  She grunts, flushing red and turning away...  Though her cock makes a slight little twitch, causing another glob of sticky cum to drool off her.  You take hold of her new shaft, running your grip along all eight inches of it, smearing her length with her own spunk.  Kiha gasps and groans at the touch, still too sensitive from her recent orgasm to even respond to your jeers.");
        this.outputText("[pg]You start to masturbate her, pumping her cock harder and faster, smearing the cream of her first orgasm into her flesh as lubricant as you go.  Overwhelmed by the raw sensitivity of her new shaft, Kiha is helpless to do anything but submit and shift her hips in your grasp, trying to wring out a bit more pleasure from each of your strokes - though you're quick to put a stop to that.");
        this.outputText("[pg]\"<i>Gaaaah!  W-what's the big idea, huh?  What're you doooing?</i>\" Kiha whines, squirming in your grasp.  You give her a little swat on the tit, leaving a red handprint on her dark flesh.  No, you're in control this time.  Kiha likes to think she's in charge, but you're going to show her exactly who calls the (cum)shots around here.");
        this.outputText("[pg]You speed up your ministrations, jacking the dragon-girl off until her pre flows liberally into your grasp.  She grunts, eyes nearly crossing as she prepares to cum...  You take your hands off, leaving her prick wobbling naked and alone in the air.  Kiha whines, but you restrain her desperate efforts to touch herself, until the trickle of pre-cum leaking from her new member comes to an end.  She might have been helpless before, but the look in Kiha's eyes now says that she's positively begging you to give her release.  Well, you suppose you could oblige her...");
        this.outputText("[pg]You shift on top of the dragon-girl, squatting down so that the ring of your [asshole] gently kisses the tip of Kiha's prick.  You both gasp, connected for a second by an electric spark of pleasure as her well-lubed tip presses into you.  \"<i>Come oooon, [name],</i>\" she pleads, misty red eyes staring into yours, \"<i>G-give it to me... please....</i>\"  Cruelly, you resist, instead shifting your hips in a wide, languid circle, slowly letting only an inch of her slip into your ");
        if (this.player.ass.analLooseness < 3) this.outputText("tight");
        else if (this.player.ass.analLooseness < 4) this.outputText("welcoming");
        else this.outputText("loose");
        this.outputText(" passage.  Kiha whines and groans, until finally you relent and slide down, taking her thick prick into your ass.");
        this.player.buttChange(14, true, true, false);
        this.outputText("  Your lover screams, hurtling toward orgasm - until you stop perfectly still as your [butt] rests against her thighs.  You relax your anal muscles, careful not to give the cock snugly stuffed inside you any extra stimulation.  Made too submissive by sensation, Kiha cannot even attempt to defy your wishes and can only lie in a pool of her cum and fem-lube, pleading for mercy.");
        this.outputText("[pg]Graciously, you grant her request.  Once she's calmed down from the edge, you begin to rise and fall on her prick, slowly bouncing on her dragon-rod.  You let go of her hands, grinning as they instantly rush to your hips, attempting -- and failing -- to hasten your pace.  Kiha pants and thrusts her hips into you, though a quick, hard pinch of her nipples stops that.");
        if (this.silly()) this.outputText("  This is your game, you remind her: you control the horizontal and the vertical.");
        this.outputText("  Every time she desperately tries to move, to force you to speed up, you stop completely, tantalizing her into submission.");
        this.outputText("[pg]Eventually, though, even your lightest touch begins sending shivers up Kiha's spine.  The dragoness writhes beneath you, gritting her teeth as spurts of pre flow freely into your bowels, further coating your anal walls with her dragon-seed.  Smirking at the pleasure-mad dragon, you finally whisper, \"<i>I think you've had enough.  Cum.</i>\"");
        this.outputText("[pg]She cums.");
        this.outputText("[pg]Roaring, Kiha thrusts her cock up into your ass as you slam down upon her, meeting half-way as the first great, hot load of dragon-spunk shoots into your ass.  You grind your [asshole] around your lover's reptilian prick, milking out squirt after squirt of dragon-spooge until white streamers leak freely out of your asshole and coat the ground beneath you.");
        this.outputText("[pg]By the time Kiha's orgasm subsides, you're both covered in her hot white spunk, reeking of sex, sweat, and semen.  Shuddering from the sticky, slimy sensation up your ass, you crawl off your lover, her prick popping out of you with a wet POP.  Looking down at her, you see Kiha's eyes are crossed, her chest heaving; she's mumbling something about some pink eggs in her stash, but seems otherwise insensate.  You give her soon-to-be-gone cock a last loving little pat before gathering your [armorName] and heading out.");
        this.dynStats("sen", 4, "lus", 30, "cor", .5);
        this.player.orgasm();
        if (this.player.hasItem(this.consumables.P_DRAFT)) this.player.consumeItem(this.consumables.P_DRAFT);
        else {
            this.player.consumeItem(this.consumables.INCUBID);
            this.dynStats("cor", 2);
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    //Kiha Tentacle Scene
    private fuckKihaWithATentacle(): void {
        this.clearOutput();
        this.spriteSelect(72);
        //{Requirements: 1 tentacle dick over 18 inches long.}
        var x: number = -1;
        var y: number = -1;
        var z: number = -1;
        var zz: number = -1;
        this.temp = this.player.cockTotal();
        while (this.temp > 0) {
            this.temp--;
            if (this.player.cocks[this.temp].cockType == CockTypesEnum.TENTACLE) {
                if (x == -1) {
                    x = this.temp;
                    x++;
                }
                else if (y == -1) {
                    y = this.temp;
                    y++;
                }
                else if (z == -1) {
                    z = this.temp;
                    z++;
                }
                else if (zz == -1) {
                    zz = this.temp;
                    zz++;
                }
                else break;
            }
        }
        this.outputText("You smile warmly and undress yourself, eying your fiery companion with desire and fondness. Kiha doesn't understand at first; she stands there suspiciously as you remove your [armor]: \"<i>Huh? What are you doing, [name]? Is it one of your petty tricks?</i>\"");
        if (this.silly()) this.outputText("  You whisper slowly, \"<i>Shhhh... no tears now.  Only dreams... and tentacles.</i>\"");
        this.outputText("  You shake your head, still grinning; a few seconds later, your vegetal-like junk is fully exposed, its long and enormous tentacles wriggling around as they taste the cold air after being contained for too long in your narrow clothing. Kiha appears to be stunned by your abundant and flourishing genitalia.  \"<i>W-what is THAT? What do you think you're going to do with that, [name]? I dare you to approach me with ");
        if (this.player.tentacleCocks() > 1) this.outputText("those monstrous things");
        else this.outputText("that monstrous thing");
        this.outputText(".  I fucking dare you!</i>\"");
        this.outputText("[pg]Sighing in disappointment, you patiently explain that you want to share a 'special' experience with her. You say you want to please her with your tentacle dicks; you say you thought she would be aroused by the sight of such versitale, talented cocks.");
        this.outputText("[pg]\"<i>D-don't think you're turning me on or anything!  This is just... gross. These wriggling things... so long... so obscenely big... and that scent - wait what are you doing GET AWAY FROM ME!</i>\"");
        this.outputText("[pg]While the dark reptilian girl stood there naked, you had seized the opportunity to launch your penile appendages around her, effectively entrapping her with your [cock all].  The lianas keep writhing around her luscious body, encircling her waist and chest as they slither between her scales.  As you gently feel her up with your junk, you tell her to relax; you want her to feel good, and you know you will.  Your cocks keep rubbing every part of her nude body, saturating her every sense with dick. As [oneCock] slides along her breasts, you notice she can't help but bow down and take a quick lick.  Genuinely amused, you ask her if she's finally starting to like your dicked ministrations.");
        this.outputText("[pg]\"<i>Y-no! Stop it! You're driving me crazy, your dicks are everywhere!  It's all around me... I can smell it... I can taste it... don't think you can win me over like this, i-it feels so... aaaah...</i>\"");
        this.outputText("[pg]As you wrap more and more of your [cock all] around her, Kiha's complaints eventually fade into slow, ragged breaths betraying her rising lust.  With a triumphant laugh, you grab Kiha's body and bring her closer to you, feeling her hot breath intertwining with yours as you both keep eye contact.  Her gaze seems to be filled with frustration and lust, but also trust.  You keep whispering tender words as your tentacle dongs grind ever harder against her limbs and scales.  Then, staring at her intensely, you move the tip of your [cock " + x + "] upwards and plunge it directly into her mouth.");
        this.outputText("[pg]The scaly woman is too surprised at first, and her jaw hangs open as you force more and more inches down her hot throat.  You feel her warm tongue and saliva slowly dampening your rod, providing you with the most pleasant tingles.  As you gradually feel your own lust building up, you keep complimenting your draconic lover, telling her how she's good at this and begging her never to stop.  Kiha looks at you with teasing eyes and a wicked grin - well, you suppose it would look wicked if it weren't so deformed by your enormous [cock " + x + "] -, relieved to see she still has some control over you. You let her work over your tentacle prick, enjoying the contact of her boiling-hot mouth as her tongue and lips effortlessly slide up and down your vegetal dick-tower.");
        this.outputText("[pg]It feels heavenly good, but you have other uses for your junk.  With a bit of regret, you slowly pop out your [cock " + x + "], leaving Kiha panting with delight - and anguished desire.");
        this.outputText("[pg]\"<i>[name]... who do you think you are, playing with me like that?  I'm not a pet to be toyed with-</i>\"");
        this.outputText("[pg]\"<i>Shhh.</i>\"  Before she can let out another whimper, you grab hold of her neck and fiercely kiss her lips, your saliva being mixed with hers and your own dick-juice.  You ferociously embrace the dragon girl, hands and tentacles clasping her to your chest as if you wanted to overwhelm her last shows of defiance with your love.  When her nervous struggles completely cease, you pull back and agitate your [cock " + x + "] in front of her eyes, so she can see the cause of her imminent pleasure.  She stares at your rod with dumbfounded eyes as it wriggles its way through the warm folds and scales of her plush body; your tentacle circumvents her toned butt before lodging itself in front of her backdoor, ready for an imminent anal penetration.  Her glinting eyes are now only full of sheer hunger; she wants you as much as you want her, if not more.");
        this.outputText("[pg]Still not breaking eye contact, you murmur in the sweetest, kindest voice: \"<i>I love you.</i>\"  With a mighty but love-filled thrust, you devastate Kiha's interior.  The scaly woman shrills from the firm yet tender intrusion, but you can see her eyes dilating, her mouth opening frantically; her whole body becomes languid as she abandons herself to your arms.  You hold her tight as if to reassure her and start pumping in and out of her relaxed butthole, using her own saliva as a lube.  Kiha's infernal recesses are nearly setting your [cock " + x + "] on fire, but the excruciating pleasure acts only as an incentive to pound deeper, and harder. As you rectally ravage your lover, you can hear her muffled cries of felicity; as reluctant as she may have been at first, it is obvious she is enjoying her butt-treatment.  You can tell from the flexibility and relative looseness of her anal walls that your dragon girl is quite used to back-dickings, and it is always relieving not to have to fight your way through someone's asshole as your [cock " + x + "] pushes forward.  On the contrary, it seems her anal ring is contracting on its own volition, facilitating the colon insertion before squeezing mercilessly once your [cock " + x + "] lodges in it.");
        //{if another tentacle dick}
        if (y != -1) {
            this.outputText("[pg]You stare at Kiha's blissful face; the strong dragon woman is wincing in pain and pleasure mixed under your repeated assaults.  Leaning closer to her, you gently whisper words of encouragement, warning her that this is only the beginning.  As you speak, you uncoil your [cock " + y + "] and place it directly at her vaginal entrance, ready for an imminent double-penetration.  Although Kiha didn't seem to notice your hushed words, you feel her jolt within your arms as your secondary dong knocks on her baby-maker.  Seeing that the scaly girl is pretty much aroused to oblivion, you don't take many precautions and roughly shove the tip of your [cock " + y + "] down her love-tunnel, filling inch after inch of her hot, moist recesses.  Eventually, her fuck-hole is entirely filled with tentacle dick");
            if (this.player.cockArea(y - 1) < 24) this.outputText(" and your rod buried to the hilt within her");
            this.outputText(".  As you alternatively pound away at her front and back door, you can feel her dark scaly body contorting between your arms: Kiha is drowning in an unholy fountain of pleasure.  She thrashes wildly and nearly escapes your grasp; the ferocious girl isn't one to be dominated, and in her oblivious passion she lets her inhumane vitality express to its full extent.  Although you were rather rough and unsubtle with her cunt, it is literally dripping cascades of fem-spunk; the shimmering liquid flows down her toned thighs and releases hot steam as it impregnates the cursed floor.  Some of her boiling sexual essence is coated on your [cock " + y + "] as you thrust in and out of her gaping pussy.  The hot fluid serves as an aphrodisiac on your plant-like junk and makes it even harder; your mind is filled with feverish sensations as the both of you descend even deeper in libertinism.");
            //{if another tentacle dick}
            if (z != -1) {
                this.outputText("[pg]While you certainly appreciate the vision of a fiery and powerful girl writhing against your body, you think her ecstatic face is missing something, and you know what it is: a juicy meaty cock!  Her gaping mouth letting out hectic moans is surely a pleasant sight to see, but you would rather see those pulpy lips encircling some dick.  Moving your wriggling [cock " + z + "] toward Kiha's face, you teasingly ask her if she wants some more cock, making sure to pound her hard at every word.  The flaring tip of your [cock " + z + "] is simmering in arousal before her eyes, giving her a perfect view of your extravagant junk.  The dragoness is too shaken up to give a proper answer; every now and then she mutters a single incoherent sound, her words being mangled by intermittent moans at every thrust from your [cock " + x + "] and your [cock " + y + "] into her holes: \"<i>Aah... wait... aah... no... ooh... aah... wait... y-yeaAAAAH! YES! Oh... yesyesyesyeESSSSSSSS! AAAAaaah... aah....</i>\"");
                this.outputText("[pg]How could you refuse such an invitation?  You graciously give in to her needy demands for cock and approach her with your [cock " + z + "]; however, still unwilling to be treated as a mere fuck-toy, Kiha acts first: her flexible tongue grabs your plant-like rod and she gulps down the entirety of your length, suckling and squeezing ferociously.  Her lips cling to your [cock " + z + "] with an almost desperate need; she seems to be determined to get what she wants and it's clear she won't let go of your tentacle prick before having milked it of all its substance.  Your cock is being sucked so hard it sometimes hurts; her lips act as an incredibly tight cock-ring, entrapping your liana-dick and effectively preventing it from moving; it feels good, but the sensation is unbearably teasing.  You can actually see enormous globs of pre-cum running up your sinuous shaft before being greedily swallowed by the cock-hungry dragoness.");
                //{if another tentacle dick}
                if (zz != -1) {
                    this.outputText("[pg]At last, Kiha is entirely stuffed with your tentacle pricks.  Since you can't penetrate her any more, you decide to toy with her body: your remaining junk wraps around every part of her body.  You enjoy the hot contact of your rubbery dickflesh against her fit thighs, her plush yet firm buttocks and her bouncy breasts.  These seem to be whirling around like an invitation for some cock to slide between them.  You give Kiha a good tit-fuck, the little scales pleasantly scratching your dong as it slides below her dangling orbs.  Her whole body is a delight to touch and grope: the soft contact of her skin under which runs boiling heat and the rough sensation of her scattered scales are both entrancing you in different ways.  The extremity of your [cock " + zz + "] somehow ends up near Kiha's butt, and you can feel her tail wagging left and right in excitement.  A wicked idea crosses your mind: wrapping your lengthy tentacle pecker around Kiha's scaly appendage, you squeeze it hard, almost painfully.  The dragoness tries to yell but her screams are muffled by your filling [cock " + z + "]; her tail seems to vibrate on its own within your tentacle grip.  The scaly girl convulses savagely in a sheer display of fury and fiery lust; the two of you struggle, fighting and loving each other in an impetuous display of passionate ire.  Your bodies grind against each other, your muscles tense against the dragoness'.  You are obviously dominant in this mad sexual clash due to your wriggling mass of tentacle junk filling her every orifice and taking advantage of her most awkward postures to give her dazing pleasure.  Nevertheless, the impulsive dragon girl won't surrender that easily and still opposes the most vehement resistance.  This debauched embrace is swiftly escalating in violence and intensity and it seems that only orgasm will resolve the crazy fight.");
                }
            }
        }
        //{conclusion}
        this.outputText("[pg]The hot dragon girl's recesses eventually prove to be too much for your shivering body; your [balls] ");
        if (this.player.balls > 0) this.outputText("churn and quiver");
        else this.outputText("churns and quivers");
        this.outputText(", and you can feel semen gathering at the base of your crotch for an ultimate burst of love.  Kiha and you have been hugging and fucking for what seems like hours, and your hot sweating bodies are literally emitting an aura of pure animal lust as they grind against each other.  You pump harder and faster, eager to bring your draconic lover closer to climax before your own orgasm kicks in.  Suddenly, there it comes: you blast Kiha's insides with your spooge, spraying her innermost depths with your hot, sticky goo.  [EachCock] release an enormous fountain of sap, drenching the dragoness' body and splattering every square inch of her skin with your seed.  You pound away as you keep cumming, [eachCock] squelching noisily as it thrusts in and out of her interior; likewise, the girl's orifices undulate and contract irregularily, doing their best to milk you of everything you have.  In no time, the dragoness becomes a spunk-sopping mess; some of the scales sprinkled over her body actually shine from all the cum-polishing.  Kiha's holes are completely filled and your baby-batter dribbles out of her in thick greenish-white ropes.  Your fluids mix with the fiery girl's own vagina juices and sweat and soon a puddle of sexual filth appears below the exotic couple you both form.  Semen keeps flowing out of the tip of [eachCock] and soaking your lover until you feel completely drained.  When the last glob of goo comes out, you release your embrace somewhat and you both fall over to rest, [eachCock] still buried deep inside her.  There's a loud splash as Kiha's robust body hits the fluid-polluted floor.  You keep caressing and cuddling your lover, enjoying her warm and moist contact as she still hugs you tightly.  Then, at last, she awkwardly removes [eachCock] from her orifices. Her holes are gaping and packed with an absurd amount of jism, but this doesn't seem to reduce her pride in the least.  She quickly swallows the remainder of cum on her lips and grumbles dizzily: \"<i>You idiot, look at what you did!  Now I'm completely coated with your filth, I'll have to get cleaned up!  Don't think I'm a slave to your disgusting dicks... I only accepted because you were so pathetically in need... D-don't you do this again!  Well, unless, you know, you really want to.  Not that I liked it, but since you love doing this that much... I-I guess you... could... well- I must go.</i>\" Kiha then clumsily turns around and flies off, flapping her wings erratically; she's still giddy from the hard tentacle fuck you both just had and is probably going to wash herself in some river.");
        this.player.orgasm();
        this.dynStats("lib", 1, "sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    //Kiha Camp Move In Hint (Happens once and unlocks options)
    public kihaOffersToMoveIn(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.outputText("While wandering through the swamp you come across Kiha, the oft-aggressive dragoness calmly sauntering up to you for a change.  You exchange greetings in the usual flirtatious manner, Kiha doing her best to maintain her air of superiority, even as her eyes rove over your body.  She steps close and bumps you, hip to hip.  \"<i>Didja miss me?</i>\" she asks, putting on a grin, though you can see... apprehension, perhaps, in her eyes.");
        this.outputText("[pg]You smile at her nervous query and nod.  She can be a real bitch sometimes, but you know, deep down inside, she well and truly likes you.  Kiha beams and slugs your shoulder, saying, \"<i>I knew it, you wimp!</i>\"");
        this.outputText("[pg]You punch her back just as hard and retort, \"<i>Whatever, I'm not anywhere near your territory this time!  Who was missing who?</i>\"");
        this.outputText("[pg]Kiha digs her claws into the moist, swampy ground and wrings her hands, lost in thought.  You wait expectantly until she realizes you saw her, and then, she sighs heavily, \"<i>Okay, okay... I missed you, [name].</i>\"  She stabs a clawed fingertip against your [chest] as she concludes, \"<i>There!  I said it!  I guess I might even lo... like you!  Maybe, if you feel the same way, we could... spend more time together?</i>\"");
        this.outputText("[pg]You grin and hug her, comforting the nervous dragoness until she recovers and gives you a surprise slap on the ass with her tail.  Same old Kiha...");
        this.outputText("[pg]It sounds like she might be wanting to move in with you, if you were to ask.");
        this.flags[kFLAGS.KIHA_MOVE_IN_OFFER] = 1;
        this.warmLoverKihaIntro(false);
    }
    //Invite Kiha to Camp
    private inviteKihaForDickings(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.outputText("You lean back against a tree and ask the haughty dragoness if she would like to come to your camp... maybe even stay a while.  She stops for a moment to consider, her hands clenching nervously as she digests the delicious news.  Looking back your way, her eyes brighten, her face lifts, and she cheers, \"<i>REALLY!?</i>\"");
        this.outputText("[pg]Nodding, you take her hands and assure her, \"<i>Really.  Move in with me, Kiha.</i>\"");
        this.outputText("[pg]The reptilian woman coughs nervously and attempts to salvage what little is left of her haughty exterior, saying, \"<i>I... uh, mean, I guess, if you haven't totally fucked it up.</i>\"  Her vertically slit pupils seem to twinkle with amusement as she says so, and though you can tell she doesn't mean it, you aren't particularly inclined to take the insult after making such an important offer.");
        this.outputText("[pg]You keep your retort light-hearted, but with an edge of seriousness that ought to keep her off-balance and get you a clear, truthful answer.  \"<i>You don't have to come if you don't want to, you know?</i>\"");
        this.outputText("[pg]Kiha stops, dark-skin paling until she looks like a shadow of her former self.  Moisture puddles at the corner of her eyes while she tries to hold back tears, the cracks in her hard facade widening from within and without.  She looks back at you with a touch of anger and defiance in her eyes, but she's unable to ignore, or to hide, what's in her heart.  Kiha's face comes alive as she breaks through her emotion mask, tears running down her cheeks unchecked.  She embraces you in a crushing bear hug, holding onto you like a drowning man would cling to driftwood.  Her words are as unexpected as they are heartfelt.");
        this.outputText("[pg]\"<i>No...[name], I... I'm sorry.  I would love to see your camp,</i>\" she says as she snuggles her tears away on your shoulder.  She pauses and whispers to you, still holding you tight, \"<i>Don't leave me alone, please... I-I... I love you.</i>\"  You tenderly stroke her ruby locks as she confesses her feelings, \"<i>I sh-should've told you sooner - I almost did.  It's so hard to trust anyone out here, so very hard.  I mean... I'm fucked up... the demons broke me in so many ways.  I still don't even know who I am, and you... you put up with my shit.  You fought me tooth and nail, but you didn't hold it against me.  You kept coming back, and never let me despair alone.  I love you, [name], and don't you forget it.</i>\"");
        this.outputText("[pg]Kiha sniffles softly and continues, \"<i>I almost feel bad for Lethice to have you as an enemy.  Do me a favor and kick her in the twat for me when you find her, okay?</i>\"  You both share a nervous laugh at that and slowly end the hug.  Dabbing at one of her tears, you suggest, \"<i>Come on, let's carry your stuff over and get you moved in.</i>\"  Kiha's tail wags happily, and the two of you begin gathering her things.");
        this.outputText("[pg]<b>(Kiha has joined your camp as a lover!)</b>");
        this.flags[kFLAGS.KIHA_FOLLOWER] = 1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    //Possession 'n Boobies
    //REQs ghost TF + gro+
    private ghostboobiesKiha(): void {
        this.outputText("", true);
        this.spriteSelect(72);
        this.outputText("Gaze flitting between the syringe in your outstretched grasp and your eager face, Kiha seems to be struggling not to punch you in the face.  \"<i>'Gro+'?</i>\" she repeats incredulously, tail swishing in annoyance.  \"<i>And what do you plan to do with that, exactly?</i>\"");
        this.outputText("[pg]Not bothered by her predictable response, you try your best to explain how you came across the stuff.  Noting her lack of a response, you change the subject to sex and how interesting it might be with its help.  Kiha shakes her head disappointedly and turns away with a low growl.  She moves away from you without even denying the offer, leaving you and your needle of growth serum in her dust.");
        //{if no ghost legs (whadda fag)}
        if (this.player.findPerk(PerkLib.Incorporeality) < 0) {
            this.outputText("[pg]Shaking your head in disappointment, you shuffle away, replacing the Gro+ in your pack with a sigh.  Maybe some day.");
            this.doNext(this.playerMenu);
            return;
        }
        //{if you've got that ghost shit down}
        this.outputText("[pg]You're not beaten that easily, however.  Reaching into yourself and accessing your innate spooky powers, your form swiftly shimmers and becomes translucent.  Moving soft as a whisper, you float up behind the haughty dragon girl and dive right into her back.  \"<i>OH, HELL NO,</i>\" she screams, clawing at her back at a futile attempt to haul you back out.  She continues to rampage around a bit longer as you fully settle into your new and delightfully jiggly vessel.");
        this.outputText("[pg]Even as you take control of her limbs - mostly to stop her from damaging something important - she screams curses at you, switching to cussing you out telepathically after you wretch control of her mouth away.  Pushing her back into the surprisingly cavernous recesses of her head, you glance at the dropped Gro+.  Your impish smirk streaks across her face as you bend to retrieve the thing.  Her angry cries turn to panicked pleading as you cup her sizeable - but not nearly large enough - breast, steadying your hand and hesitating for just a moment.");
        this.outputText("[pg]In sinks the needle, cold metal sending a little shiver running through Kiha's body.  Not five seconds passes between pushing the plunger and the first ominous tinglings.  Dropping the half-empty tube once more, you double-grab Kiha's bosom expectantly.  The feeling of your fingers being forced apart by her slowly-swelling boobflesh feels absolutely wonderful... but... only in one side.  You glance down to watch with a mixture of trepidation and fasciation as only one of her scale-framed breasts puff up while the other sits dormant.  \"<i>S-Stop!  What the hell!?</i>\" Kiha mentally screams, unable to react in any way to her suddenly lopsided measurements.");
        this.outputText("[pg]Kiha's protests swiftly fade to gasps of poorly-disguised delight as you focus both hands on her oversized F-cup, knocking your knees at how good the slutty tit feels in its engorged state.  Her surprisingly soft skin yields to her slender fingers as you knead into the flesh, exploring every square inch of her new expanse.  Your manipulations nearly cause her to forget her predicament... nearly.  \"<i>Hey hey, HEY!  Deal with this!</i>\" Kiha demands, one of your hands quivering in her novel attempt to point at her other, unaltered breast.  \"<i>You're not just going to... leave me like this?</i>\"");
        this.outputText("[pg]You sit in silence for several moments, breaking it every few seconds with a little boob-squeeze.  \"<i>... Well?</i>\" she eventually huffs.  More seconds pass, her irritation mounting. \"<i>FIX THIS!</i>\"");
        this.outputText("[pg]Against her will and all of her mental strength, Kiha shakes her head slowly.  Bending low to scoop the syringe back up, you tap the tip against the bigger of her assets as a pointed reminder that rudeness will get her nowhere.  \"<i>You wouldn't,</i>\" she says softly, the metal touching her boob, once again reminding her of her predicament.  With a shrug of her shoulders, you explain the value of being polite to those you care about.");
        this.outputText("[pg]\"<i>... Please make my - nngh - other boob bigger,</i>\" she mutters, struggling to formulate sentences as you once again toy with her huge melon.  \"<i>Please...</i>\"  You chide her for the lackluster attempt, pinky circling the areola as punishment.  \"<i>I... p-please...</i>\"");
        this.outputText("[pg]The poor girl can hardly think!  Perfect.  Transferring the Gro+ to between her teeth and leaving one hand the task of hefting the heavy boob, her free hand traces a path down to her downright gushing loins.  \"<i>S-Stop! No!</i>\" she squeals, struggling against your hold on her bod.  Too late; three of her fingers dig into her womanhood, widening the tunnel as you plunge in.  \"<i>Make my tit bigger!</i>\" Kiha screeches, mind scrambled by the confused pleasure of someone else schlicking herself.  \"<i>Please!  I want it!  I love having big boobs!  Fuck!</i>\"");
        this.outputText("[pg]That's what you were waiting for.  Slooowly drawing out of her cunt and not even bothering to flick the excess girl-cum off your fingers, you grab up the Gro+ and smoothly inject the rest of the serum into her other, neglected breast.  Her ecstasy as the orb begins to balloon outward nearly knocks you over, issuing forth in huge and overpowering waves of lust.  Before you know it you're on your back, both you and Kiha (in a constant cycle of overpowering limbs and losing control of them) grabbing, squeezing, rubbing anything that feels good on Kiha's body as your dragon girl's satisfaction ratchets her sensitivity up to even higher levels.");
        this.outputText("[pg]Like drawing a heavy bow, Kiha's back arches as her climax fast approaches, her big, muscular butt lifting right off the ground.  Her attempts to articulate any thought she might have merely translates to gurgles and moans as you both writhe around, your heavy - and finally same-sized - tits smooshing against the ground, her arms, themselves... Goodness; if only masturbation could always feel this good!  There's nothing like fucking someone's mind, you decide.");
        this.outputText("[pg]At some point Kiha seems to have rolled onto her belly, ass stuck up into the sex-heavy air and knees drawn up to her torso.  The way her squeezable hips jerk around violently would be a clear invitation to any man, woman, or beast who happened to glance her way.  Arms still flitting around her entire self in an attempt to pleasure every part of her simultaneously, the poor oversensitized dragon girl seems to have infected you with her lust.  You happily smash her tits harder into the ground, entirely caught up in the lusty typhoon.");
        this.outputText("[pg]Her entire body tenses as an orgasmic tremor rocks your system, both of you bellowing your pleasure.  Gushes of her translucent fluids surge past her fingers are you continue to stroke the inflamed labia.  Flopping to her side, Kiha trembles as the orgasm runs its course and eventually fades.  She lies there for a few minutes more, enjoying the near-electric aftershocks running through her body.  Before she can even rise, however, she's snoozing, curled up and pressing her knees into her too-big chest.  Taking that as your cue to depart, you wriggle your ghostly essence back out of her back, reforming and recorporealizing behind her.");
        this.outputText("[pg]Your lust spent and curiosity sated, you step over and past Kiha.  Glancing back over your shoulder, you notice her bosom has shrunken just a little already.  You realize, with a sigh, that you'd probably need to take more drastic measures to make more of a permanent effect on her cup size.  Oh well, you figure.  There's always next time.");
        this.player.orgasm();
        this.dynStats("cor", 2);
        this.player.consumeItem(this.consumables.GROPLUS);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    //Kiha & Corrupt PCs -- Parting Ways
    //(Play the first time the PC meets Kiha while having 66+ Corruption)
    public kihaBitchesOutCorruptPCs(): void {
        this.clearOutput();
        this.spriteSelect(72);
        if (!this.followerKiha()) {
            this.outputText("You make your way through the murky swamp, your mind turning to thoughts of your dragoness ");
            if (this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] == 1) this.outputText("friend");
            else this.outputText("lover");
            this.outputText(" as you enter her territory.  Your lusty, twisted mind wanders to Kiha's dark, voluptuous body, her big, soft breasts, her cunt, lewdly displayed to the world and always leaking lubricant like a well-oiled fuck machine... You grin wickedly to yourself, your ");
            if (this.player.hasCock()) this.outputText("[cock]");
            else if (this.player.hasVagina()) this.outputText("[vag]");
            else this.outputText("lust");
            this.outputText(" stirring powerfully at the thought of spreading her scaly legs and fucking her raw, until she begs for release, again and again until you've wrung her out and throw her away.  How wonderful that would be!");
            this.outputText("[pg]As if your thoughts had summoned her, Kiha slips out from behind a tree, her wide hips swaying slightly with each of her powerful, predatory movements...  Her battleaxe flares in her hands, a fiery haze surrounding its brutal curve.  Well, shit.");
            this.outputText("[pg]\"<i>[name].</i>\"  She says flatly, planting the haft of her axe in the ground, leaning heavily upon it.");
            this.outputText("[pg]You say hello, looking nervously around.  Something isn't right here, and your hand drifts toward your [weaponName].");
            this.outputText("[pg]\"<i>Listen, [name],</i>\" Kiha says, eyeing you from behind her axe.  \"<i>Maybe we've gotten to be friends lately, but... something's changed about you.  I can SMELL the corruption on you, the lust... I-I can't do it, [name].  I can't be around someone that could turn into someTHING at any moment, someone who's just letting themselves go like... like you are. Please j-just go, [name].</i>\"  You try to protest, to reason with the fiery warrior, but she only lifts up her axe and levels it at you...  \"<i>J-JUST GO!</i>\"");
            this.simpleChoices("Fight", this.kihaScene.meetKihaAndFight, "", undefined, "", undefined, "", undefined, "Leave", this.camp.returnToCampUseOneHour);
        }
        else {
            this.outputText("Kiha approaches you, her belongings gathered in her hands.  The sexy dragoness seems visibly upset, and before you can say a word, she interrupts, \"<i>Don't say a word, [name].  You're corrupt.  I can smell the corruption rolling off you from over here.  I won't be here when you turn into a demon, and I don't want to fight you... but if you come after me, I won't hesitate to defend myself!</i>\"");
            this.outputText("[pg]Kiha closes her eyes and launches herself into the air, only leaving a few tears for the parched wasteland to claim.");
            this.doNext(this.playerMenu);
        }
        this.flags[kFLAGS.KIHA_CORRUPTION_BITCH] = 1;
        //(Display Options: [Fight!] [Leave])

    }
    //[Leave]
    //You slump your shoulders, deciding not to risk confrontation.  As you step back from the dragoness, she lowers her axe, her head hanging sadly.  It seems this pains her as much as you, but... you return to camp.

    //Kiha & Less-Corrupt PC -- Reunited
    public kihaUnbitchesUncorruptedFolks(): void {
        this.clearOutput();
        this.spriteSelect(72);
        //(Play first time PC meets Kiha with 65 or less Corruption)
        this.outputText("You make your way back into Kiha's territory, more confident now in your more sane, stable condition.  You wander over to the small islet the dragoness calls home, and call out her name.");
        this.outputText("[pg]Kiha plummets from the sky moments later, her axe held high.  \"<i>[name]!</i>\" she growls, assuming a battle pose.  \"<i>I-I told you to stay... just stay away from... from... meee?</i>\" her cry turns into a whine as she stares at you, incredulous.  \"<i>You... you've changed again.  I-I don't believe it.  Your corruption, it's... receding.  How!?</i>\"");
        this.outputText("[pg]You approach the dragoness, pushing aside her axe and explaining just how you purged your corruption -- how she and others can do it, too.  Kiha's eyes are wide, misty, as you talk, but just as you end your speech the dragoness tosses her axe aside and leaps into your arms, pulling you into a tight, warm hug.  \"<i>Y-you idiot,</i>\" she whispers, nuzzling against you.  \"<i>We've come so far, and...  and don't you ever do that again, doofus.  You hear?  I don't... I don't want to lose my idiot again...</i>\"");
        this.outputText("[pg]Oh, Kiha.");
        this.flags[kFLAGS.KIHA_CORRUPTION_BITCH] = 2;
        //(Normal Kiha Menu options)
        if (!this.followerKiha()) this.kihaFriendlyGreeting(false);
        else {
            this.outputText("  You make your way back to camp, arm in arm.");
            this.doNext(this.camp.returnToCampUseOneHour);
        }
    }
    //Kiha @ Camp: Appearance
    private kihaCampAppearance(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.outputText("Kiha is a 6 foot tall dragoness, with dark skin and blood-red scales covering much of her body.  She is naked, shameless of her nudity, and carries a tremendous enchanted greataxe, the head of which blazes with heat.  She has a sharp, predatory face with dark red eyes bearing black, reptilian slits.  Long red hair grows from her scalp, reaching down past her shoulders.  She has strong, child-bearing hips and a squishy bubble-butt.  She has two reptilian legs adorned with scales and claws, ending in soft, leathery soles.");
        this.outputText("[pg]She has a pair of dusky, soft D-cup tits, with a single 0.5 inch nipple on each breast.");
        this.outputText("[pg]Kiha has a loose twat between her legs which constantly drips a warm, wet lubricant that stains her thighs.");
        this.outputText("[pg]Between her gropable butt-cheeks, Kiha has a single tight asshole, right where it belongs.");
        this.doNext(this.kihaScene.encounterKiha);
    }


    //New option added to Kiha's \"<i>In-camp/warm</i>\" dialogue menu, ['dominance' during sex]
    private dominateKihasFaceWithStuffAndStuffOrSomethingIDunnoWhyImStillWritingThis(): void {
        this.clearOutput();
        this.spriteSelect(72);
        //NOTE: There are various random scenes that can be triggered at certain points;
        //the game will select them at random so that
        //A. The scene doesn't get tedious and stale 4 times around.
        //B. It increases the chance of multi-genital play and recognition.
        //Please note that some scenes have genital requirements, and will not trigger if the PC is lacking the appropriate \"<i>equipment</i>\".
        //['Dominance' during sex] (can be repeatable once she's in camp, for giggles)
        //outputText("You feel that Kiha's over-emphasis on dominating you during sex is something that needs to be addressed.  Accordingly, you broach the topic with her.  The dragoness averts her head in response and stares out into the woods to one side of the camp, not bothering to give you the courtesy of a verbal acknowledgement.  \"<i>Hey, I'm talking to you!</i>\"  You assert, annoyed at her refusal to listen.  \"<i>...That's nice,</i>\" Kiha dismissively responds, after a pause.");
        //outputText("[pg]You see what's going on: being nice about this isn't going to get you anywhere.  You need to show some dominance if you want her to listen.  \"<i>HEY!  LOOK AT ME WHEN I'M TALKING TO YOU!</i>\"  You snarl, advancing towards the stubborn woman.  Attentively, she returns your gaze.  \"<i>Yes, [name]?  What is it?</i>\"  She inquires, apparently having \"<i>forgotten</i>\" what you just asked her.  You sternly tell her that she needs to learn how to be a bottom in the relationship and take a good fuck from you sometimes, rather than expecting you to play along with her whims.  \"<i>Aw, that's cute; you thinking you have any say in the matter,</i>\" she replies, facetiously.  This makes you angry.  You do have a say in the matter, you tell her, and she will listen.  Kiha grins. \"<i>You're all talk; just be a good " + player.mf("boy","girl") + " and let me do my thing during sex.  Otherwise, I might have to hurt you.  I wouldn't want to hurt my </i>friend<i> now, would I?</i>\"");
        //outputText("[pg]That seems like a challenge.  Will you rise to it, or will you back down?");
        this.outputText("Feeling that Kiha's natural inclination for dominance has grown a little stale, you broach the idea of YOU dominating Her.  The dragoness glances your way and grins toothily as she cracks her knuckles.  \"<i>Why would I want to let you dominate me, doofus?  I've been fighting to stay on top out in the swamps as long as I can remember.  What makes you think I'd want to submit to some cute " + this.player.mf("guy", "girl") + " I just met?</i>\"  She blushes a little when she realizes she just called you cute.");
        this.outputText("[pg]Sighing, you fold your arms across your chest and tell her that you won't take no for an answer.  Kiha snorts derisively, two tiny puffs of flame shooting from her nostrils as she cracks her neck and stands.  She grabs her axe out of the dirt and whirls to face you.");
        this.outputText("[pg]\"<i>If you want have your way with me, you'll need to earn it, just like anyone else,</i>\" Kiha explains.  She narrows her eyes at you and questions, \"<i>The question is, are you " + this.player.mf("man", "woman") + " enough to take what you want?  I wouldn't want you to get hurt.</i>\"");
        this.outputText("[pg]That seems like a challenge.  Will you rise to it, or will you back down?");
        //[Back down]    [Fight for position]
        this.simpleChoices("Back Down", this.beABitchDumbass, "FightForDom", this.fightForDominanceWithDragonCunnies, "", undefined, "", undefined, "", undefined);
    }

    //[Back down]
    private beABitchDumbass(): void {
        this.clearOutput();
        this.spriteSelect(72);
        //outputText("You break eye contact with the fierce dragoness and remain silent in the face of her challenge, unwilling to pursue the issue any further at the moment.  She snorts, dismissively.  \"<i>That's what I thought,</i>\" she sneers, narrowing her eyes in warning.  After a short pause, her fiery stare almost palpable on your cheek, she turns away once more- with an infuriating little toss of her head- and when you finally glance back at her again, you see that the corners of her mouth are turned up in a smirk.  You turn and walk away shamefully, unable to find the words to explain yourself or to defend your outburst.");
        this.outputText("You break eye contact with the fierce dragoness and remain silent in the face of her challenge, unwilling to pursue the issue any further at the moment.  She snorts, dismissively, \"<i>If you don't fight for the things you want, people will just keep taking them from you.</i>\"  Kiha lewdly spreads her legs and runs her tail over her outer lips, teasing you as hard as she can.  She smirks as your eyes glue to her groin and turns away.");
        this.outputText("[pg]\"<i>Maybe once you grow some balls,</i>\" the dragoness taunts, giving you a wink.");
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    //[Fight for position]
    private fightForDominanceWithDragonCunnies(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.outputText("You inform her that you doubt she'll be hurting you today.  With an almost child-like sense of glee, you ready your [weapon] and step into the dragoness's intimidating presence.");
        this.outputText("[pg]\"<i>I wouldn't have it any other way, [name],</i>\" she says as she grins, raising her axe into a more combat-ready stance.  It's time to prove your worth!");
        //[Leads to a fight]
        this.startCombat(new Kiha());
        this.monster.createStatusAffect(StatusAffects.DomFight, 0, 0, 0, 0);
    }

    //[PC loses the fight]
    public pcLosesDomFight(): void {
        this.clearOutput();
        this.spriteSelect(72);
        this.outputText("\"<i>Ha! You better shape up quick!  If you lose to </i>me<i>, you'll certainly lose to the demons!</i>\"  Kiha exclaims, victorious over your bruised and battered form.  The strain is too much, and you end up passing out.");
        this.outputText("[pg]You awake on your bedspread, being tended to by Kiha as she rubs ointment on your bruises and wounds. \"<i>Look, I know that was just a friendly sparring match, but seriously: You can't lose like that to the Demons.  I can't think of what I'd do if my special Idiot were turned into... one of them.</i>\"  Kiha says somberly.  You're touched by her concern, but you assure her that no demon will take you alive.  She smiles and places a hand on your shoulder, but the look she gives you seems to hint that you missed her point entirely.");
        this.cleanupAfterCombat();
    }
    //[PC wins the fight]
    public pcWinsDomFight(): void {
        this.clearOutput();
        this.spriteSelect(72);
        var x: number = this.player.cockThatFits(67);
        if (x < 0) x = this.player.smallestCockIndex();
        this.outputText("Defeated, the Dragon-morph falls to the ground, her arm reaching out to the cool, dirty ground to soften her descent.  \"<i>Hah... you win.  I guess I do have to be the bottom, then,</i>\"  she says, with a wry smile. She whimpers, tossing her axe to the side as she weakly splays her legs, giving you ready access to do as you will with her.  Smirking, you remove your [armor] and ");
        if (this.player.hasCock()) this.outputText("pull your quickly hardening " + this.multiCockDescriptLight());
        else if (this.player.hasVagina()) this.outputText("release your lathered up " + this.vaginaDescript(0));
        this.outputText(" from your drawers.  Chuckling, you tease Kiha about how she had to make something so easy into something so difficult, as you work yourself between her legs.  You're almost about to penetrate her lubed and drooling pussy when you feel her scaly muscles tense up.  Before you can react, your throat is tightly compressed and constricted by what appears to be Kiha's tail.");
        if (this.flags[kFLAGS.KIHA_CHOKED_OUT_PC] > 0) this.outputText("  Not again!");
        this.outputText("[pg]\"<i>Like a moth to an open flame!  If all some demon has to do is fake their defeat and spread their legs to get you into </i>this<i> position, then you will be easy prey indeed.  The real world doesn't arbitrarily roll over and concede defeat after a friendly spar!  The fight's not over till it's over, and right now it looks like you've lost.  Submit, and let me do what I do best,</i>\" Kiha coos confidently.  You're in for it now.");

        this.outputText("[pg]Wrapping her attractive thighs around your ");
        if (this.player.hasCock()) this.outputText(this.hipDescript());
        else this.outputText("face");
        this.outputText(", the dragoness draws ");
        if (this.player.hasCock()) this.outputText("you ");
        else this.outputText("your tongue ");
        this.outputText("past her love button and into her eager pussy.  Moaning out in callous pleasure, Kiha pumps you against her twat and takes the time to mock you while you grunt from the sensation of soft pussy against your ");
        if (this.player.hasCock()) this.outputText(this.cockDescript(x));
        else this.outputText("mouth muscle");
        this.outputText(".  \"<i>It's a shame really, you had to take something so easy and make it into something much harder.  Don't you feel silly, all wrapped up in my tail and powerless to- UGHAAHH! That's it!  Right there!  FUCK! Riiight there!</i>\"  Kiha squeals out.  The momentary cry of ecstasy she unleashes causes her tail to uncoil just a bit and give you the opportunity to break free.");
        this.outputText("[pg]Working your hands quickly into the fleeting gaps in her stranglehold, you capitalize on her distraction and wiggle out of her grip.  \"<i>W-wha-?</i>\" she tries to blather out, but her expression of dismay and confusion is cut off as you roughly flip her body over with your hands.  The air is filled briefly with a loud \"<i>umph</i>\" from your dragoness lover, and then a wail of surprise as you");

        var choices: any[] = [];
        if (this.player.hasCock()) choices[choices.length] = 0;
        if (this.player.hasVagina()) choices[choices.length] = 1;
        choices[choices.length] = 2;
        var select: number = choices[KihaFollower.rand(choices.length)];
        //PC's cock is chosen/ has cock only:
        if (select == 0 || !this.player.hasVagina()) {
            this.outputText(" plow back into her cunt.  With your brute strength and form, you pin her body down to the ground and fuck her from behind.");
            //Kiha response one (requires vagina):
            if (KihaFollower.rand(2) == 0) this.outputText("[pg]\"<i>Ha!  The Champion still has some fight in " + this.player.mf("him", "her") + "!  Keep me here if you can, wimp!  I WILL pin you down and cum all over your face!  You'll lap it all up like a good little " + this.player.mf("boy", "girl") + " to bo- UGH!</i>\"");
            //Kiha response one (requires cock):
            else this.outputText("[pg]\"<i>Ha!  The Champion still has some fight in " + this.player.mf("him", "her") + "!  Keep me here if you can, wimp!  I WILL pin you down and make you beg to plant your seed in my womb!  Just wa-OOhhOhhh...</i>\"");
        }
        //PC's vagina is chosen/ has vagina only:
        else {
            this.outputText(" work your way between her legs and joined your clits together in a gyrating dance of pleasure.  Locked in a scissoring position, Kiha can only giggle in blissful delight as you grind your pussies together.");
            //Kiha response one (requires cock):
            if (this.player.hasCock() && KihaFollower.rand(2) == 0) this.outputText("[pg]\"<i>Ha!  The Champion still has some fight in " + this.player.mf("him", "her") + "!  Keep me here if you can, wimp!  I WILL pin you down and make you beg to plant your seed in my womb!  Just wa-OOhhOhhh...</i>\"");
            //Kiha response one (requires vagina):
            else this.outputText("[pg]\"<i>Ha!  The Champion still has some fight in " + this.player.mf("him", "her") + "!  Keep me here if you can, wimp!  I WILL pin you down and cum all over your face!  You'll lap it all up like a good little " + this.player.mf("boy", "girl") + " to bo- UGH!</i>\"");
        }
        this.outputText("[pg]Subdued for the time being, you push onward with coitus and brutalize Kiha's ever moistening pussy, the female dragon morph crying out in sheer delight at the \"<i>punishment</i>\" being inflicted upon her ");
        if (select == 0 || !this.player.hasVagina()) this.outputText("love canal");
        else this.outputText("clit");
        this.outputText(".  \"<i>Come on, idiot!  Give me all you've got, if you have the balls!</i>\"");

        //PC is male or herm, nutless:
        if (this.player.gender != 2 && this.player.balls == 0) this.outputText("[pg]You're not sure if that's an insult or a challenge to step it up.");
        this.outputText("[pg]She wants it rough?  Fine by me, you think to yourself.  Taking hold of her scarlet hair, you give her a forceful");
        //PC is fucking Kiha with a cock:
        if (select == 0 || !this.player.hasVagina()) this.outputText(" tug along her lengths and pull her head back towards you, soliciting a pained scream from Kiha as her roots convey the agony of the act to her.  \"<i>Is that all you've GOT?! Give me a break!</i>\"");
        //PC is fucking Kiha via scissoring:
        else this.outputText(" twist of your fingers along her clitoral hood, causing Kiha to screech in surprised pain and pleasure.  \"<i>Is that all you've GOT?! Give me a break!</i>\"");
        this.outputText(" she mockingly yells back at you.  In a flash, her right leg sweeps against your shoulder and pushes you towards the ground; her other leg and body twisting to assist in knocking you over.  As fast as you can, you try and work your limbs and body to fend off Kiha's attempts to force you against the ground, but it's no use.  The dragoness... ");
        //Kiha decides to ride the PC's cock (requires cock):
        if (select == 0) this.outputText("works her way on top of your pelvis and impales herself on your " + this.cockDescript(x) + ", grinning like a mad fool as she does so.  \"<i>Told you!</i>\"  She remarks. \"<i>Was that really the best you could do?  With the hair pulling?</i>\"  She sighs.  \"<i>I guess I have to teach you a thing or two...</i>\"  Lowering herself down in between savage slams of her rump against your pelvis, the cool and arrogant woman takes the " + this.player.skin() + " of your neck and pierces it with her canines, causing you to cry out as the sting of her bite flows through you.  Humming her approval, she carries on with the coarse treatment of your entrapped cock, mashing and working forth a crescendo of skin on skin slapping noises.");
        //Kiha ensnares the PC between her legs for cunnilingus (universal):
        else if (select == 1) this.outputText("quickly wraps her legs around your head and rolls your body into a belly down prone.  \"<i>Eat it " + this.player.mf("big boy", "you delectable slut") + "!  I've got you in a hold you can't possibly escape from!  Lap it up bitch!</i>\"  For the time being you comply, if only to give you time to find a way out of this as you probe her cunt with your tongue.  \"<i>Yeeeaahhhah, just like that.  Good " + this.player.mf("boy", "girl") + ", lick your mistress's pussy!</i>\"  She coos authoritatively, her thigh tensing up with every stroke.  The dragon woman even has the nerve to play with your hair as she keeps you within her tight embrace.");
        //Kiha traps the player in a submissive 69 (universal):
        else {
            this.outputText("settles on top of you and seizes your [legs], pulling up with determined strength as she brings your [feet] up to her ears.  When the flurry of motion settles you find yourself staring up at Kiha's well toned asscheeks, the sensation of wet lady fluids drooling down your face as Kiha takes your ");
            if (this.player.hasCock()) this.outputText(this.cockDescript(x));
            else this.outputText(this.clitDescript());
            this.outputText(" in her mouth.  \"<i>Get used to that angle [name]; it's your new favorite position.</i>\"  She taunts, before ");
            if (!this.player.hasCock()) this.outputText("lapping viciously at your cunt.");
            else this.outputText("ramming your cock down her craw.");
        }
        this.outputText("[pg]This won't do at all!  You're going to dominate her, whether she likes it or not!  Mustering your strength, you wait for the best moment to break free and ");
        if (select <= 1) this.outputText("not have your neck's flesh ripped up in the process");
        else this.outputText("not have a mishap with your genitalia");
        this.outputText(".  Finally, your chance for freedom arrives and you take it, raising your arms up and twisting against her body with all your might.  The move works and Kiha is flung from your lap and down the incline you both were rutting against.  Unfortunately... or fortunately, you find yourself rolling down the same hill as her; the world spinning around violently as you slip and tumble towards even ground.  After what feels like a dizzying eternity, you feel the evenness of earth under your spinning body, and come to rest against an old wooden stump of a dead tree.");
        this.outputText("[pg]Groaning, you survey the immediate area for the less than cooperative dragon woman.");

        //repick scene
        choices = [];
        if (this.player.hasCock()) {
            choices[choices.length] = 0;
            choices[choices.length] = 1;
        }
        if (this.player.hasVagina()) choices[choices.length] = 2;
        choices[choices.length] = 2;
        select = choices[KihaFollower.rand(choices.length)];
        //Random event one of three: Kiha wins... or so she thinks (doggy-style sexing)
        if (select == 0) {
            this.outputText("[pg]Your answer comes in the form of a tail wrapped around your obviously engorged member");
            if (this.player.cockTotal() > 1) this.outputText("s");
            this.outputText(", the scaly appendage tugging you toward its mistress.  Once within her reach, she grabs your shoulders with her hands, forcing you against a nearby tree stump.  It isn't so wide that you could really be trapped against it, but that fact becomes moot as Kiha saunters up to your body and seductively wraps a leg around both you and the tree.  Her other leg joins in as she takes you by the face and plants a firm, wet kiss on your lips; you can almost taste the arousal and passion in her breath as she pants into your mouth.  Secure in your \"<i>prison</i>\", Kiha begins to pump her hips along the length of your " + this.cockDescript(x) + ", moaning like an easy whore as she stimulates herself with your prick.  \"<i>Yohouu-you put up a g-good fight! Ju-just relax with that knowledge and let Kiha show you that deep down, you'll always enjoy being my little bitch...</i>\"");
            this.outputText("[pg]You refuse to simply submit and let her milk you for all you're worth.  You need to break free now or you'll lose this \"<i>fight</i>\" with the arrival of orgasm.  Giving it your all, you yell out a war cry and push forward, breaking the flimsy tree behind you in the process with Kiha clinging to your body.  Crashing into another dead tree directly in front of you, Kiha loses her grip and falls from your body, the desiccated pine trunk snapping under the force of impact.  Before she can react, you flip her onto a nearby rock and pin her there, intent on finishing this struggle for dominance here and now... but maybe she needs a little something as punishment first?");
            this.outputText("[pg]Grinning with mischievous intent, you take a firm grasp of your " + this.cockDescript(x) + " and brush the " + this.player.cockHead(x) + " against Kiha's incredibly wet clit.  \"<i>I'll let you have your fun for now, Idiot!  But I'll dominate you yet!</i>\" she yells.  You don't think so, not after you're done with what you're about to do.  Instead of giving her the mounting that she obviously craves, you take to teasing her clitty.  Horror shoots through Kiha's body as she starts struggling, wishing for anything but <i>teasing</i> right now.  \"<i>Hey! Hey you bastard, that's no fair!</i>\" She squeals, the sensation igniting her body with intense, ticklish arousal.  You can't just fuck her into submission; you need her to beg for it before you give her what she wants, you tell the dragoness.  \"<i>I-I HATE YOOuuuu!</i>\" she cries out, whimpering as you deny her the penetration her body hungers for.  It doesn't take too long before the once proud woman is jittering against the rock face, clenching her jaw shut to prevent her from begging.  Her intense expression of determination finally gives way as she breaks, babbling utter nonsense until you stop and give her a moment of respite.");
            this.outputText("[pg]\"<i>Please! I-Ihi-need you in me!</i>\" Kiha begs, her frustration too much for her.  Satisfied with her punishment, you decide to oblige her.  Once again taking her from behind, you gyrate against her with savage and lustful force; the dragoness only all too willing to lay there and receive every moment of it.  \"<i>AHHH! FUCK-FUCK-FUCK!</i>\" she squeals.  Your release imminent and her resistance no longer an issue, you ravage her cunt with reckless abandon; Kiha is completely submissive to your thrusts as she bucks against you, endeavoring to bring you to a hot and sticky climax.  As release boils up your loins you bury your face in Kiha's neck, howling your muffled orgasmic arrival into her scaly hide as the warm essence of life rushes into her waiting vagina.  Screaming in orgasmic delight herself, Kiha scratches wildly at the rock face she lies against, the scraping sound of hard dragon claws against unyielding stone signifying that this was the spot where you taught Kiha to love being the \"<i>bottom</i>\".  The pair of you groan and cry out in sexual bliss as each contraction of your prick fires yet another stream of cum along the contours of her hot pussy, tapering off with the eventual emptying of your balls.  You lay against her for a time, catching your breath while she grasps your hands in her own, planting kisses up your arms while you rest.");
        }
        //Random event two of three: Footjobs and missionary, oh my!
        else if (select == 1) {
            this.outputText("The forceful slamming of Kiha's shin against the back of your knee answers the mystery of where the dragoness went, sending you crashing down against the dirty ground.  With the wind knocked out of you, you don't realize what's happening next until Kiha begins to make her presence known along your shaft");
            if (this.player.cockTotal() > 1) this.outputText("s");
            this.outputText(".  Gazing downward, you come to realize that the dragoness has your prick");
            if (this.player.cockTotal() > 1) this.outputText("s");
            this.outputText(" in her clawed foot!  You gasp out in pleasured shock as she stimulates the tender softness of your dick");
            if (this.player.cockTotal() > 1) this.outputText("s");
            this.outputText(", all the while having to stare up at her as she smiles in triumph.  \"<i>The Champion puts up a hell of a fight, but in the end, falls to a simple footjob.  What hope do you have against the demons, [name]?  Might as well let me take on your crusade and resign yourself to being my bitch!</i>\"  She arrogantly decrees.");
            this.outputText("[pg]Not a chance, you think. She's getting dominated, here and now!");

            this.outputText("[pg]Reacting quickly, you clench your hands up into fists and smash the pressure points of Kiha's hips, causing her to lose control of her legs momentarily.  \"<i>OH, FUCK ME!</i>\" she screams in agony, releasing your member");
            if (this.player.cockTotal() > 1) this.outputText("s");
            this.outputText(" from her clawed foot.  Gracefully, you transition your \"<i>attack</i>\" into a powerful leg sweep, knocking her feet from underneath her and sending her ass-first onto the ground.  She groans in pain, then euphoria as you slide on top and forcefully plant your cock deep in her pussy.  \"<i>Yeah, that's the idea,</i>\" You chide.  \"<i>But you've been a bad girl; I think I need to work you over until you're nice and ready for me...</i>\"");

            this.outputText("[pg]Pinning her arms to the cold ground, you move your head down to her supple breast, gently flicking the little stubs of her nipples with your tongue.");

            //PC has a demon/snake tongue:
            if (this.player.tongueType == TONUGE_SNAKE || this.player.tongueType == TONUGE_DEMONIC) {
                this.outputText("[pg]Kiha initially reacts with titillation, then a sense of perverted violation as you wrap the hardening nub with your mouth muscle, ");
                //Demon:
                if (this.player.tongueType == TONUGE_DEMONIC) this.outputText("taking to her pointed mammary like a boa to prey as you lather up each teat separately.  The hot-tempered dragon girl squirms, completely at your mercy while you have your fun.");
                //Snake:
                else this.outputText("stimulating the soft, nubby flesh with your forked tongue, hissing for effect as you do it.  Imagine the look on her face if you worked that little bugger over her clit; she'd go berserk!  But she hasn't earned that yet; what you want to hear is her begging for a good dicking first.");
            }
            this.outputText("[pg]Her breathing becoming plagued with arousal and stimulus overload, she finally yields, beseeching you to stop playing with her breasts and to get on with \"<i>more important things.</i>\"");

            this.outputText("[pg]Trapped in the missionary position and horny beyond belief, Kiha can only wrap her legs and arms around you, babbling and ceaselessly begging you to fuck her, to flood her pussy with your seed.");

            this.outputText("[pg]\"<i>Please! I-Ihi-need you in me! AHHH! FUCK-FUCK-FUCK!</i>\" She squeals.  Your release imminent and her resistance no longer an issue, you ravage her cunt with reckless abandon; Kiha is completely submissive to your thrusts as she bucks against you, endeavoring to bring you to a hot and sticky climax.  As release boils up in your loins, you bury your face in Kiha's neck, howling your muffled orgasmic arrival against her scales as the warm essence of life rushes into her waiting vagina.  Screaming in orgasmic delight herself, Kiha herself buries her face against your neck and moans her stifled gratification into your being.  The pair of you groan and cry out in sexual bliss as each contraction of your prick fires yet another stream of cum along the contours of her hot pussy, tapering off with the eventual emptying of your balls.  You lay against her for a time, catching your breath while she kisses and nuzzles you appreciatively.");
        }
        //Random Scene three of three: Standing dominant cunnilingus, with a reversal:
        else {
            this.outputText("[pg]Out of nowhere, you feel Kiha's tail once again find its way around your throat and drag you painfully towards her.  She doesn't let go until you're firmly planted against a withered old tree, and she straddles your battered form, pressing you against the rough bark with her powerful thighs.  Your head is already trapped between your wooden head-rest and her drooling vagina by the time you manage to regain your composure, and it's too late to do anything about it; she's got you right where she wants you.  Kiha laughs triumphantly as she begins to grind her clit wetly across your face.  \"<i>Quite the will you have there, Champion!  You could have won, if you were a little more attentive to your surroundings.  Now... now you'll have to settle for eating my pussy, weakling!  Get to it!</i>\"");
            this.outputText("[pg]You need a moment to plan how to get out of this, so you grudgingly go along with it for now.  Like a rattlesnake's tail, you flick the tip of your tongue rapidly over her clitty; the dragoness moans her approval and grabs you by the hair to help \"<i>guide</i>\" you.  \"<i>Gods, you eat pussy well! That's about all you're good for if you can't beat me, right?</i>\"  She says mockingly, as if she was daring you to make a move.  Sensing weakness in her grip, you do just that.");
            this.outputText("[pg]Grabbing at her ankles, you give a mighty tug and yank them out from underneath her, breaking her grip on you and sending her crashing into the dirt.  Still in your grasp, you work her legs all the way up to her ears and bury your face in her snatch, teasing and tormenting the needy sex with mean-spirited effectiveness.  The dragoness only whines and groans in delight, offering no strong resistance as you bring her to climax, legs twitching uncontrollably as she coats you in a rush of pussy juice.  Taking a moment to clean yourself, you lap up the fluids that Kiha has so \"<i>graciously</i>\" shared with you.  \"<i>Oh... wow.  We have to do that again sometime!</i>\"  Kiha remarks, exhausted and panting for air.  A grin cracks across your face, realizing that you haven't cum yet.  \"<i>Who says it's over?</i>\"  You say with a grin, as you grab her and pin her against a tree.  Slumped against the ground, she's in the perfect position for ");
            if ((this.player.hasCock() && KihaFollower.rand(2)) || !this.player.hasVagina()) {
                this.outputText("a facial.[pg]You tell your lover to stay there and don't move while you conclude the act, furiously stroking your length");
                if (this.player.cockTotal() > 1) this.outputText("s");
                this.outputText(" only inches away from Kiha's face.  Her body perks up as it dawns on her what you have in mind, and she arcs her head back for your impending release.  \"<i>Come on... come on... yeah, cum baby, I want it so bad...</i>\" she whines in between pants of lust, impatiently longing for your orgasm.  A few moments later you feel the warmth of seed gushing from your " + this.player.cockHead(x) + ", strings of sperm slamming against Kiha's pretty features.  She gasps in satisfaction as your cum rains down on her, moaning as your ejaculate coats her cheeks and brow.  Not one to let jism go to waste, you take her by the back of the head and press your " + this.cockDescript(x) + " against her lips; Kiha yields her mouth to your whims and hums in bliss as more seed flows into her throat and maw.");
                //Cum multiplier low:
                if (this.player.cumQ() < 250) this.outputText("[pg]Satisfied with her submission and eagerness to slurp up all of your load, you pull free of her mouth and pet her hair lovingly.  Swallowing your creamy dessert, Kiha shoots you an appreciative look of affection and fulfilled gratification.");
                //Cum multiplier moderate:
                else if (this.player.cumQ() < 1000) this.outputText("[pg]She gags a few times as she tries to alternate between swallowing your sperm and not choking on it, but she manages to ingest all of it.  Rubbing her seed filled belly, Kiha lays back against the trunk and sighs happily.");
                //Cum multiplier high:
                else this.outputText("[pg]The volume you expend forth is just too much for her to handle; her soft cheeks bulging with an uncontainable load of cum.  She pushes free of your prick and spits out a tidal wave of semen, coughing the entire time. Your orgasm doesn't stop there though, as you bathe her naked form in salty jism.  \"<i>Oh gods, there's so much!  I'm stuffed with it and you're still going?!</i>\" She worriedly exclaims.  You respond by pinning her head against the trunk and bringing your streaming prick back up to her face, giving her another round of facials.  The dragon creature gargles and whines as your dense load impacts on her face, covering her entire head and marking her scarlet hair with your load.  Taking care not to drown her, you pull away after a few moments and drench the remainder of her body in semen.  Wiping her eyes clean of your fluids (or trying to), Kiha gasps and giggles at the \"<i>unique</i>\" punishment she's receiving.  Once passed, you try to find a dry area on Kiha to wipe the results of your orgasm off on; to your dismay, there simply isn't one.  She's completely drenched in cum!  Shrugging, you command her to open her mouth wide open so she can clean you.  A few strands of sperm visibly part where her mouth should be, and you figure that she's heeded your command as you push onwards.  Your cock carries with it the obstructive strands of seed that covered her maw into her mouth and against her warm, wet tongue.  It takes her awhile, but she manages to finish the job.");
            }
            else {
                this.outputText("finishing you off.");
                this.outputText("[pg]Helpless to offer any resistance, and perhaps unwilling to resist, even if she could, Kiha lays back and accepts that you have won this \"<i>battle</i>\", licking, suckling and kissing your " + this.clitDescript() + " as you grind against her.  The sensation of her long, reptilian tongue pressing against and sliding sensuously over your nether-lips and clit is incredibly intense and satisfying, and it isn't long until you bellow a " + this.player.mf("manly", "girlish little") + " cry and cum hard, your muscles tensing with pleasure as you drench the dragoness' face in lady-cum.  She readily licks it all up as it flows, moaning as she swallows your sexual essence.");
            }
        }
        //Post sexing dialogue
        this.outputText("[pg]The act concluded, you turn to seeing how to ensure Kiha's future cooperation in deciding who gets to be the bottom or the top during sex, and your respective roles in more mundane interaction as well.  Your gesture to gain her attention needs to be forceful, but not too violent.  Grabbing her by the throat, you press the back of her head against the tree, and gaze into her (cum-obstructed) eyes.  You inform her in no uncertain terms that you've proven your dominance- repeatedly, now- and from this point forward, you EXPECT that she will submit to your will, in light of your multiple victories over her, and your obviously greater prowess in battle.  Whoever loses is the sub for the winner's pleasures, right?");
        //outputText("[pg]Kiha nods, as best she can with her head pinned against the tree trunk, and then grins.  \"<i>Just the way I like it, [name]. Let's get back to camp; no doubt there are demons that need our feet up their asses.</i>\"  That sounds like a good idea.  (And maybe she can clean herself up when she gets back).");
        this.outputText("[pg]Kiha nods, as best she can with her head pinned, and then she grins.  \"<i>Dominance isn't something you do once and get forever, [name].  If you want to stay on top with me, you'd better back it up with your actions.  It takes more than a few losses to make me ANYONE's bitch.</i>\"  Well, that's probably as good as you'll get out of her for now.  You suggest heading back to camp; no doubt there's some demons needing feet up their asses.  Kiha replies, \"<i>Sounds like a good idea, [master].</i>\"  There's an undercurrent of humor in her words, but she's the one who couldn't handle you in a fight.");
        this.player.orgasm();
        this.cleanupAfterCombat();
    }

    private guardMyCampKiha(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.KIHA_CAMP_WATCH] > 0) {
            this.flags[kFLAGS.KIHA_CAMP_WATCH] = 0;
            this.outputText("You tell Kiha you don't want her to guard the camp at night any more.\n\n\"<i>Look Doofus, if you want to wake up with an imp-cock so deep in your ass that you taste semen, it's your call.  If any of them come near me, I'm still killing them,</i>\" Kiha warns before stalking off.");
        }
        else {
            this.outputText("You ask Kiha if she wouldn't mind setting a watch at night.\n\n\"<i>So you want me to cut any demons in half that get too close?</i>\" Kiha asks.\n\nYou nod.\n\n\"<i>Yeah, I suppose I can, since you asked nicely.</i>\"  She ruffles your [hair] fondly.");
            this.flags[kFLAGS.KIHA_CAMP_WATCH] = 1;
        }
        this.menu();
        this.addButton(0, "Next", this.warmLoverKihaIntro);
    }
}
