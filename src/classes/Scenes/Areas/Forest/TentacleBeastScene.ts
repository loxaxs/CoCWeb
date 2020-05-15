import { BaseContent } from "../../../BaseContent";
import { trace } from "../../../../console";
import { StatusAffects } from "../../../StatusAffects";
import { TentacleBeast } from "./TentacleBeast";
import { PerkLib } from "../../../PerkLib";
import {
    VAGINA_LOOSENESS_TIGHT,
    VAGINA_LOOSENESS_NORMAL,
} from "../../../../includes/appearanceDefs";
import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";

export class TentacleBeastScene extends BaseContent {
    // Tentacle Encounter - beware legalese!
    /*
     LICENSE

    This license grants Fenoxo, creator of this game usage of the works of
    Dxasmodeus in this product. Dxasmodeus grants Fenoxo and the coders assigned by him
    to this project permission to alter the text to conform with current and new game
    private s, only. Dxasmodeus grants exclusive rights to Fenoxo to add upon events to meet with
    suggestions made by consumers as to new content. Dxasmodeus retains exclusive rights to alter
    or change the core contents of the events and no other developer may alter, change or use the events without
    permission from dxasmodeus except where otherwise specified in this license. Fenoxo agrees to
    include Dxasmodeus' name in the credits with indications to the specific contribution made to the licensor.
    This license must appear either at the beginning or the end of the primary file in the source code and cannot be deleted
    by a third party. This license is also retroactive to include all versions of the game code
    including events created by dxasmodeus.

    DECLARATION OF OWNERSHIP

    The following events are the creative works of dxasmodeus and are covered under this license.

    Tentacle Plant Event
    Giacomo the Travelling Merchant
    All item events relating to purchases from Giacomo the Travelling Merchant
    Worm Colony Infestation Events

    Tentacle Plant Event and Giacomo sub-events are copyright 2010 by Dxasmodeus.
    Worm Colony Events are copyright 2011 by dxasmodeus.

    THIRD PARTY USAGE

    As Fenoxo has made his game code open source, this license DOES NOT transfer to a
    third party developer. The events created by Dxasmodeus may not be used in whole or in part
    without permission and license from Dxasmodeus. Dxasmodeus reserves the sole and exclusive right to
    grant third party licenses of copyrighted scenarios.

    For further information and license requests, dxasmodeus may be contacted through private
    message at the Futanari Palace. http://www.futanaripalace.com/forum.php.

    ENFORCEMENT

    This license supercedes all previous licenses and remains in force.
    */

    public encounter(): void {
        trace("Tentacle event here");
        this.clearOutput();
        this.spriteSelect(100);
        // Tentacle Encounter - beware legalese!
        // Gender hilarity chance.
        if (
            this.player.gender == 0 &&
            TentacleBeastScene.rand(3) == 0 &&
            !this.player.isNaga() &&
            !this.player.isTaur() &&
            !this.player.isGoo()
        ) {
            // Warm up for neuters as per the old event:
            this.outx(
                "You see a massive, shambling form emerge from the underbrush. While first appearing to be a large shrub, it shifts its bulbous mass and reveals a collection of thorny tendrils and cephalopodic limbs. Sensing your presence, it lumbers at you, full speed, tentacles outstretched.\n\n",
                false
            );

            if (this.player.cor > 50 && this.player.cor <= 75)
                this.outx(
                    "You debate the merits of running from such a creature, and realize it's now too late to escape.  ",
                    false
                );
            if (this.player.cor > 75)
                this.outx(
                    "You smile and stride forward, welcoming the pleasure you expect from such a monster.  ",
                    false
                );
            // HILARIOUS NEUTER EVENT HERE
            if (this.player.cor < 75)
                this.outx(
                    "While you attempt to resist the abomination, its raw muscle mass is too much. ",
                    false
                );
            this.outx(
                'It pins you to the ground easily. You feel slimy tentacles run up and down your groin as the creature searches for whatever gonads it expected you to have. When it realizes that you have neither penis nor vagina, it smartly casts you to the ground in apparent disgust.\n\n"<i>WHAT THE FUCK IS THIS SHIT?!!</i>" The creature speaks in an unnervingly human voice.\n\n',
                false
            );
            this.outx(
                'Completely confused, all you can do is sit there in shock.\n\n"<i>Where are your naughty bits, goddammit!</i>" the creature bellows. "<i>Us tentacle creatures need to FEED!</i>"\n\n',
                false
            );
            this.outx(
                'You sheepishly state that you are gender-neutral and have no genitalia.\n\n"<i>You gotta be shitting me!!</i>" the monster bellows in contempt. "<i>Of all the motherfuckers I ambush, it has to be the ONE bastard I can\'t feed from! What am I supposed to do now, asshole?! I gotta eat!</i>"',
                false
            );
            this.outx(
                'At a loss for words, you meekly offer the creature some of your food you have packed for your journey. The creature slaps it out of your hand, almost breaking your wrist.\n\n"<i>I can\'t eat that shit!</i>" roars the abomination. "<i>Do I look like I have a fucking mouth to chew that with?! NOOOOOO! I feed off dicks and wayward women! Cum and tit milk! YOU have NEITHER!!!</i>"  ',
                false
            );
            this.outx(
                'The beast slaps you squarely on the ass as if to push you along. "<i>Get the fuck out of here!</i>" it screams. "<i>Get lost so I can hunt me a REAL meal!!!</i>"',
                false
            );
            this.outx(
                "You walk away from the creature, which hides back in the brush. After you trek a bit, you wonder if what happened really DID happen...",
                false
            );
            this.dynStats("lus", -5);
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // Combat starter
        this.outx(
            "You see a massive, shambling form emerge from the underbrush.  While it resembles a large shrub, a collection of thorny tendrils and cephalopodic limbs sprout from its bulbous mass.  Sensing your presence, it lumbers at you, full speed, tentacles outstretched.\n\n",
            false
        );
        if (this.player.cor > 50 && this.player.cor <= 75)
            this.outx("You debate the merits of running from such a creature.\n\n", false);
        if (this.player.cor > 75)
            this.outx(
                "You smile and stride forward, welcoming the pleasure you expect from such a monster.\n\n",
                false
            );
        // Worms get nothing!
        if (this.player.findStatusAffect(StatusAffects.Infested) >= 0) {
            this.outx(
                "It stops itself completely in a moment and twitches, as if sniffing the air, before turning around and disappearing into the underbrush.",
                false
            );
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        if (this.player.cor > 50) {
            this.outx("Do you joyfully submit or fight back?\n\n", false);
            this.simpleChoices(
                "Fight",
                this.startTentacleBeastCombat,
                "Submit",
                this.tentacleLossRape,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
            return;
        }
        this.startCombat(new TentacleBeast());
    }

    private startTentacleBeastCombat(): void {
        this.startCombat(new TentacleBeast());
        this.playerMenu();
    }

    private tentacleEntice(): void {
        // Spoiler for Entice Attack Male/Herm:
        if (this.player.gender == 1 || this.player.gender == 3) {
            if (TentacleBeastScene.rand(2) == 0) {
                this.outx(
                    "In an effort to distract the creature, you begin gyrating your hips and swinging your penis in a shameless imitation of MeatSpin. The Tentacled Horror briefly pauses to observe your actions and rears similar to a posturing spider, considering your next actions.\n\n",
                    false
                );
                this.monster.lust += 10 + TentacleBeastScene.rand(5);
            }
            // Failure:
            else
                this.outx(
                    "You grab your penis and shake it feverishly at the creature in order to distract it.  It swats a tentacle at you, forcing you to adroitly dodge the reprisal.  Apparently, the beast found you unimpressive.\n\n",
                    false
                );
        }
        // Spoiler for Entice Attack-Female:
        else {
            // Success:
            if (TentacleBeastScene.rand(2) == 0) {
                // GENDERLEZZ
                if (this.player.gender == 0)
                    this.outx(
                        `You brazenly turn your back on the creature and, glancing over your shoulder, begin bending over and presenting your ${this.buttDescript()} to the beast. It pauses and observes while you bend over further, presenting a full view of both your back door and your ${this.assholeDescript()}. You shift from side to side and observe the beast match your movements. You have obtained its attention to say the least.\n\n`,
                        false
                    );
                // CHICKS
                else
                    this.outx(
                        `You brazenly turn your back on the creature and, glancing over your shoulder, begin bending over and presenting your ${this.buttDescript()} to the beast. It pauses and observes while you bend over further, presenting a full view of both your back door and your honey hole. You shift from side to side and observe the beast match your movements. You have obtained its attention to say the least.\n\n`,
                        false
                    );
                this.monster.lust += 10 + TentacleBeastScene.rand(5);
            }
            // Failure
            else {
                this.outx(
                    `You begin shaking your hips and grabbing your ${this.allBreastsDescript()} to distract the creature. However, the near-miss from the tentacle it attempted to swat you with convinces you of its desire to beat your ass, rather than fuck it.\n\n`,
                    false
                );
            }
        }
        kGAMECLASS.combatRoundOver();
    }

    public tentacleVictoryRape(): void {
        this.outx("", true);
        this.spriteSelect(100);
        // Male/Herm
        if (this.player.gender == 1 || this.player.gender == 3) {
            this.outx(
                "Seizing the opportunity, you rush the monster while it is stopped. You grab the fattest hollow tentacle you can find and summarily shit-kick the beast onto the ground. Holding the creature down with one foot, you take the hollow tentacle and poise it in front of your raging erection.\n\n",
                false
            );
            this.outx(
                '"<i>You want dick milk, you freak?!</i>" you bellow in triumph. "<i>HERE YOU GO!</i>"\n\n',
                false
            );
            this.outx(
                "You impale the tentacle on your penis and begin humping wildly, treating the creature's armature as your own personal onahole. The creature squirms wildly, trying to escape your lust-driven strength. Replying with a swift kick with your free foot, the creature's resolve to escape wavers.\n\n",
                false
            );
            this.outx(
                '"<i>Quit fuckin\' squirming and take your MEDICINE!</i>" you thunder as you cheap-shot the beast for good measure.\n\n',
                false
            );
            this.outx(
                "Feeling your peak approach, you allow your muscles into their rhythmic contractions as you unload your cum into the creature like a howitzer attacking a fort. Laughing like a maniac with each shot, you see your jizz leak out as the creature struggles to assimilate your 'donation'.\n\n",
                false
            );
            this.outx(
                "Withdrawing your prick, you cast the beast aside and begin walking away both amused and satisfied. The beast stumbles weakly back into the wood it came from, clearly worse-off from the encounter.",
                false
            );
        }
        // Female:
        else {
            this.player.slimeFeed();
            // High Corruption
            if (this.player.cor >= 66) {
                this.outx(
                    "Seizing the opportunity, you rush the monster while it is stopped. You grab the fattest phallic tentacle you can find and summarily shit-kick the beast onto the ground. Holding the creature down with one foot, you take the tentacle-cock and poise it in front of your dripping cunt.\n\n",
                    false
                );
                this.outx(
                    "Laughing like a true psychotic, you stuff the tentacle into your womb.",
                    false
                );
                this.player.cuntChange(20, true, true, false);
                this.outx(
                    "  Your vaginal muscles quickly go to work stroking, squeezing and kneading the appendage. The creature, more intent with escape than hammering your box, begins struggling. You summarily slug the beast as well as any professional pugilist to stop its throes.\n\n",
                    false
                );
                this.outx(
                    '"<i>STOP STRUGGLING AND FUCK MY LITTLE PUSSY!</i>", you screech.\n\n',
                    false
                );
                this.outx(
                    "The sensation of the beast ejaculating immediately gets your attention. As your womb fills with its warm load, a brutal idea takes you. The beast responded after you hit it. Smirking like a devil, you turn the beast into a punching bag. With each strike, the beast sprays a batch of goo deep inside your body. The sheer force of the spray is working your hole into an ecstatic frenzy. As you orgasm, you slug the creature again, forcing another batch of semen to flush your womanhood. After an hour of this, you reach a multi-orgasmic peak and release. The creature twitches weakly as you pull the limp tentacle from your body. The excess spunk flows out like an overturned bucket, leaving one hell of a mess. You walk away satisfied. It is unclear whether the tentacled horror survived your lust... but who cares. Your satisfaction is all you cared about, anyway.",
                    false
                );
            }
            // Rape Win Female-Low Corruption::
            else {
                this.outx(
                    "Seizing the opportunity, you rush the monster while it is stopped. You grab the fattest phallic tentacle you can find and summarily push the beast onto the ground. Holding the creature down with your body weight, you take the tentacle-cock and poise it in front of your dripping cunt.\n\n",
                    false
                );
                this.outx(
                    "You sit on the creature and begin using the tentacle as a living dildo. With your mass atop it, the creature cannot move or struggle, despite its lack of any attempts to do so. You push the limb deeper and deeper until you feel it bottom out against your cervix.",
                    false
                );
                this.player.cuntChange(20, true, true, false);
                this.outx(
                    "\n\nSensing your needs, the tamed beast extends a tendril from the main tentacle that easily pushes past your cervical opening and breeches the deepest parts of your womb. The feeler penetrates past your uterus and lodges itself as deeply as possible. The beast begins rapidly vibrating and undulating its member, stimulating the deepest parts of your sex.\n\n",
                    false
                );
                this.outx(
                    "You quickly reach a cunt-cramping orgasm, which forces the creature to unload a torrent of hot, musky fluids inside you. You feel bloated and stuffed as the beast reflexively sprays the entire contents of its seminal sacs... or whatever it stores its cum in... inside you. With a quick squeeze, you start expelling the tentacle, which prompts the creature to withdraw its tendril and leave your body. You walk away well satisfied while the abomination is too exhausted to move.",
                    false
                );
            }
        }
        this.player.orgasm();
        this.cleanupAfterCombat();
    }

    // Spoiler for Bad End-Tentacle Monster:
    // [CONDITIONS: Futa/Herm, Corruption > 50, Lust Defeat Only, Obtained 3 previous Lust Defeats to Tentacle Monster.]
    private futaTentacleBadEnd(): void {
        this.outx("", true);
        this.spriteSelect(100);
        this.outx(
            "Having repeatedly been ravaged by the tentacle beast in your travels, you surrender yourself to yet another savage session of forced pleasure. However, the beast lunges forward with its great maw open. Utterly surprised, you do not have time to react before the creature's tentacles seize you and swallow you whole!!!\n\n",
            false
        );
        this.outx(
            `The last rays of light fade as the creature closes its beak, trapping you inside. You begin flailing and fighting in sheer panic at the prospect of being eaten alive. As you struggle, countless tentacles wrap around your arms and legs, essentially binding you inside the creature. A thick tentacle forces its way down your mouth and you feel the familiar sensation of salty lust being emptied into your mouth. Your ${this.cockDescript(
                0
            )} instantly becomes erect, triggering a tentacle to encapsulate your member completely. As this occurs, another limb buries itself deep within your ass.\n\n`,
            false
        );
        this.outx(
            "The beast then begins to milk your dick as fiercely as it ever has been in your entire life. You feel as if your prick will be ripped from your crotch as you immediately climax, dumping load after load of your semen into the horror. Your ejaculations only make the beast milk you harder, prompting an almost constant orgasmic cycle. After awhile, the shock and pain subside as you become utterly drunk off the sensation of the constant stream of cock milk you are producing.\n\n",
            false
        );
        this.outx(
            "In your last moments of lucidity, you realize that you are not being eaten or technically harmed at all. The creature has bonded with you as a living producer of food.  As long as you are healthy and cumming, it has all the food it could ever possibly want... so long as your gonads hold out.\n\n",
            false
        );
        this.outx(
            "You pass out, only to awaken briefly to the constant sensation of semen flowing out of your body.  Were it not for the tentacle force-feeding you, you would weakly moan with pleasure at the feeling of constant orgasm.  You slip in and out of consciousness countless times. When lucid, you can only enjoy the fact you are STILL blowing a load.\n\n",
            false
        );
        this.outx(
            "However, you become lucid once and notice that you are no longer cumming. In fact, you feel a harsh warmth all over your body. Blinding light pierces you despite having your eyes closed. You also notice the absence of the tentacle from both your mouth and your ass. You also hear voices, yet you cannot make them out. A sharp, acrid smell invades your nostrils, rousing you to full wakefullness. You feel terribly weak and the light still prevents you from opening your eyes. However, for the most part, you are awake and cognizant of your environment.",
            false
        );
        // Goto rape #2
        this.doNext(this.futaTentacleEpilogue);
    }

    private futaTentacleEpilogue(): void {
        this.outx("", true);
        this.spriteSelect(100);
        // [Met Giacomo at least once]
        if (kGAMECLASS.giacomo > 0) {
            this.outx(
                '"<i>Well, well, well. You aren\'t a total loss, I see.</i>", says a sharp, masculine voice.\n\n',
                false
            );
            this.outx(
                "While the fog of your brain has yet to lift completely, you recognize the voice to be the seedy merchant, Giacomo.\n\n",
                false
            );
            this.outx(
                '"<i>It is a good thing I happened to be out and about today.</i>", Giacomo says. "<i>I was testing out a new weapon to sell and I happened to see one of those nasty tentacle beasties. I had no idea they captured prey! Hell, you must have spent a few months inside that thing feeding it!</i>"\n\n',
                false
            );
            this.outx(
                "You attempt to say something, only to find yourself incapable of speaking. You feel the man's bony hands pick you up and set you down in what feels like his cart.\n\n",
                false
            );
            this.outx(
                '"<i>Well, I can\'t be a total bastard all the time.</i>", Giacomo jingles. "<i>I guess I can drop you off at the next village I come to so you can recover. Isn\'t that absolutely nice of me! Even better! I will do this for free!!!</i>"\n\n',
                false
            );
            this.outx(
                "Giacomo giggles to himself at his cheaply bought humanitarianism. A part of you dreads what is to happen next as nothing about the merchant ever struck you as trustworthy. However, a day or so later, true to his word, he leaves you at the clinic in the first town he comes to. Your recovery takes the better part of the year. The healers and apothecaries purge you of all of your corruptions, save your transgendered status. However, the sheer stress on your body has effectively ended your adventuring lifestyle and you resign yourself to settle down to a comparatively mundane existence, broken by the occasional tryst with a villager curious about your genitalia.",
                false
            );
        }
        // [Never met Giacomo]
        else {
            this.outx('"<i>Will she live?</i>", says a soft and feminine voice.\n\n', false);
            this.outx(
                '"<i>Yes, doctor. She will live.</i>", replies a gruff and clearly masculine voice.\n\n',
                false
            );
            this.outx('"<i>Is the beast dead</i>", queries the doctor.\n\n', false);
            this.outx('"<i>Dead several times over, madam.</i>", answers the man.\n\n', false);
            this.outx(
                '"<i>We cannot leave this unfortunate woman out in the wild like this. Load her onto the wagon. We will take her back to the village. I am certain I can help this woman recover.</i>", the doctor states flatly.\n\n',
                false
            );
            this.outx(
                "Strong masculine hands easily lift your atrophied body and place you on a wooden slab. You feel the shaking of a cart as its movement assaults your stunted senses. After a while you notice the cart stops as it arrives at its destination. A cacophony of voices talk over one another as you feel a half a dozen people move you to what can only be a clinic. Many of the voices talk constantly as you are examined and various medicines are applied to you exhausted body. Your vision returns in a day or so, revealing that you are in a hospital and laborious effort from the staff allowed for your revival.\n\n",
                false
            );
            this.outx(
                "Your recovery takes the better part of the year. The healers and apothecaries purge you of all of your corruptions, save your transgendered status. However, the sheer stress on your body has effectively ended your adventuring lifestyle and you resign yourself to settle down to a comparatively mundane existence, broken by the occasional tryst with a villager curious about your genitalia, which you are more than happy to display.",
                false
            );
        }
        this.getGame().gameOver();
    }

    public tentacleLossRape(): void {
        this.clearOutput();
        this.spriteSelect(100);
        // Genderless madness
        if (this.player.gender == 0) {
            // Taur madness
            if (this.player.isTaur()) {
                this.centaurGenderlessRetardation();
                return;
            } else if (this.player.isNaga()) {
                this.genderlessHilarityForNagaKenDolls();
                return;
            } else if (this.player.isGoo()) {
                this.tentacularGenderGooTimes();
                return;
            } else {
                if (this.player.cor < 75)
                    this.outx(
                        "While you attempt to resist the abomination, its raw muscle mass is too much. ",
                        false
                    );
                this.outx(
                    'It pins you to the ground easily. You feel slimy tentacles run up and down your groin as the creature searches for whatever gonads it expected you to have. When it realizes that you have neither penis nor vagina, it smartly casts you to the ground in apparent disgust.\n\n"<i>WHAT THE FUCK IS THIS SHIT?!!</i>" The creature speaks in an unnervingly human voice.  Completely confused, all you can do is sit there in shock.\n\n',
                    false
                );
                this.outx(
                    '"<i>Where are your naughty bits, goddammit!</i>" the creature bellows. "<i>Us tentacle creatures need to FEED!</i>"\n\n',
                    false
                );
                this.outx(
                    'You sheepishly state that you are gender neutral and have no genitalia.\n\n"<i>You gotta be shitting me!!</i>" the monster bellows in contempt. "<i>Of all the motherfuckers I ambush, it has to be the ONE bastard I can\'t feed from! What am I supposed to do now, asshole?! I gotta eat!</i>"',
                    false
                );
                this.outx(
                    '\n\nAt a loss for words, you meekly offer the creature some of your food. The creature slaps it out of your hand, almost breaking your wrist.\n\n"<i>I can\'t eat that shit!</i>" roars the abomination. "<i>Do I look like I have a fucking mouth to chew that with?! NOOOOOO! I feed off dicks and wayward women! Futa cum and tit milk! YOU have NEITHER!!!</i>"',
                    false
                );
                this.outx(
                    '\n\nThe beast slaps you squarely on the ass as if to push you along. "<i>Get the fuck out of here!</i>" it screams.  "<i>Get lost so I can hunt me a REAL meal!!!</i>"  ',
                    false
                );
                this.outx(
                    "You walk away from the creature, which hides back in the brush. After you trek a bit, you wonder if what happened really DID happen...",
                    false
                );
                if (this.getGame().inCombat) this.cleanupAfterCombat();
                else this.doNext(this.camp.returnToCampUseOneHour);
                return;
            }
        }
        // Horsecock surprise!
        if (
            this.player.horseCocks() > 0 &&
            this.player.cocks[0].cockLength > 15 &&
            this.player.cocks[0].cockThickness >= 3
        ) {
            if (this.player.cor < 75 && this.player.lust < 100)
                this.outx(
                    "It grabs you before you can get away!\n\nWhile you attempt to resist the abomination, its raw muscle mass is too much. ",
                    false
                );
            this.outx(
                "It pins you to the ground easily. You immediately feel a sharp, horrible pain at the base of your cock. You look down to see the end of a thorny tendril impaled in your pelvic region. Fiery pain courses through your veins as you feel the creature inject you with some sort of liquid. As the pain sears through you, your monstrous equine member immediately becomes fully erect and pre-cum flows freely from your flare.\n\n",
                false
            );
            this.outx(
                "You see a large hollow tentacle attempt to descend upon your stiff cock. Much to your surprise and the creature's frustration, it barely opens wide enough to cover the tip of your impressive member. The creature mindlessly continues attempting to entrap your penis. It only succeeds in sending pangs of pleasure down your shaft as the thumping on the end of your cock shoots down to your roots.\n\n",
                false
            );
            this.outx(
                "Amused as well as aroused, you choose to lull the creature into reticence as it keeps trying to suck your horsecock in. Each wave of pleasure makes your prick bob about",
                false
            );
            if (this.player.balls > 0)
                this.outx(
                    `, and you feel your ${this.ballsDescript()} rise and drop in unison to the muscular contractions pumping freshly made cum into position for release`
                );
            this.outx(".\n\n", false);
            this.outx(
                "You bask in the glow of pleasure as the creature still fumbles around your dong, not realizing that you are just too big. An evil thought crosses your mind. Since this thing wants you bad enough, why not oblige it? Not expecting your increased strength due to your equine features, you wrench yourself free of the creature's restraints and summarily grasp the tentacle trying to cover your cock. With a great buck and heave, you force your dick into the tentacle, stretching it immensely. The creature lets out an inhuman howl as it reacts painfully to your newfound zeal.\n\n",
                false
            );
            this.outx(
                "You begin pumping and thrusting like mad, working yourself to an orgasm. The creature tries to pull away, but finds that it is the one that cannot escape. Feeling your ",
                false
            );
            if (this.player.balls > 0) this.outx("balls ");
            else this.outx("cock ");
            this.outx(
                "rise up, you thrust as deep as you can go before you begin hosing a massive, steady stream of cum into the creature. For several minutes, you continuously empty yourself into the beast as it flops about, trying to escape. After a few minutes, the creature struggles more and you feel the wet warmth of your own cum around your tip. Cum begins leaking liberally from the tentacle. ",
                false
            );
            if (this.player.balls > 0)
                this.outx("Your balls have overfilled the creature!\n\n", false);
            else this.outx("Your cum has overfilled the creature!\n\n", false);
            this.outx(
                "One last jerk from the creature breaks your hold and it pulls itself away from your member, excess cum spilling everywhere and flying through the air as it flops about. Clearly overwhelmed, the beast lumbers clumsily back into the bush. You laugh to yourself as you made the creature taste its own proverbial medicine as its efforts to overwhelm you completely backfired.",
                false
            );
            this.player.orgasm();
            this.dynStats("str", 0.5, "spe", -0.5, "int", -1, "lib", 5, "sen", 1, "cor", 1);
            this.monster.HP = 0;
            if (this.player.HP == 0) this.player.HP++;
            if (this.getGame().inCombat) this.cleanupAfterCombat();
            else this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // Bad end + counter here
        if (this.player.lust > 99) {
            this.temp = this.player.findStatusAffect(StatusAffects.TentacleBadEndCounter);
            if (this.temp < 0) {
                this.player.createStatusAffect(StatusAffects.TentacleBadEndCounter, 0, 0, 0, 0);
            } else {
                // count up
                this.player.statusAffect(this.temp).value1++;
                // Bad end
                if (
                    this.player.statusAffect(this.temp).value1 >= 3 &&
                    this.player.cor > 50 &&
                    this.player.gender == 3
                ) {
                    this.futaTentacleBadEnd();
                    return;
                }
            }
        }
        // Centaur madness!
        else if (this.player.isTaur()) {
            this.outx(
                "Tentacles wrap around your legs before you can stop them.  They continue to coil up your legs, spreading an uncomfortable warmth through your equine half.  Another tentacle wraps around your torso, spreading that same warmth and fuzzing your mind.  You grab one you can reach and attempt to tear it off of you, but two thinner, translucent feelers immobilize your arms, pulling them up behind your head.\n\n",
                false
            );
            this.player.slimeFeed();
            this.outx(
                `They test your body, slipping about over your form.  A small tentacle finds its way into your mouth, coiling about your tongue and down your throat.  It's careful not to make you choke, seemingly as curious about your innards as it is about your shell.  You're given little time to think though, as a surge of fluid is deposited into your stomach, making your desire to cum grow even more.  The sharp spines coiled about you act similarly, spreading warmth about them wherever they touch your ${this.player.skin()}.\n\n`,
                false
            );
            // has at least 1 cock, engulfable:
            if (this.player.hasCock()) {
                if (this.player.cockArea(this.player.smallestCockIndex()) <= 50) {
                    this.outx(
                        `More aphrodisiac-toxin pours into you, causing ${this.sMultiCockDesc()} to expand.  `
                    );
                    if (this.player.cockTotal() > 1)
                        this.outx(
                            `  The creature seems surprised at first to discover such a large brace of cocks, testing their texture and wrapping around each individually.  Your ${this.multiCockDescriptLight()} responds by wriggling about and tempting the beast to continue its exploration, but the gesture is futile and they're abandoned, though not for long.`
                        );
                    this.outx("\n\n", false);

                    this.outx(
                        `A peculiar sensation rolls over it as an unseen tentacle engulfs you, rippling and milking your ${this.cockDescript(
                            0
                        )}.  Your body naturally tries to drive into it but the tentacle isn't strong enough to provide resistance.  Your wild humping causes it to bump up and down against your underbelly, a surprisingly pleasurable feeling.  The tentacle pays no heed, continuing to ripple and constrict around you;  a suckling noise accompanies the sensation of your pre-cum being suctioned out.\n\n`,
                        false
                    );
                }
                // has cock, not engulfable:
                else {
                    this.outx(
                        `More aphrodisiac-toxin pours into you, causing ${this.sMultiCockDesc()} to expand. Something bumps up against the tip but can't seem to fit around your ${this.cockDescript(
                            0
                        )}.  It continues trying for a while, sending pangs of pleasure down the length.  The tentacle eventually gives up and latches onto the tip, positioned right at the opening to your urethra.  It sucks up your pre-cum as it drips from you, accompanied by a loud suckling noise.`
                    );
                    // [With testicles:
                    if (this.player.balls > 0)
                        this.outx(
                            `The sucking reaches all the way to your ${this.ballsDescriptLight()}, a spectacularly strange sensation that nevertheless feels wonderful.`
                        );
                    this.outx("\n\n", false);
                }
            }
            // has vagina:
            if (this.player.hasVagina()) {
                this.outx(
                    `A squirming tentacle forces its way inside your ${this.vaginaDescript(
                        0
                    )}, undulating and squirming as it works its way deeper and deeper.  Your body responds by pumping out more fluid, making the passage of the monstrous thing easier.`
                );
                this.player.cuntChange(32, true, true, false);
                if (this.player.hasCock()) {
                    if (this.player.cockArea(this.player.smallestCockIndex()) <= 50)
                        this.outx(
                            "  Your humping appears to not affect the creatures continuing efforts, despite the force of your body.",
                            false
                        );
                }
                this.outx(
                    "  You feel the beast bottom out against your uterus and cry out in pleasure, gyrating yourself about as fluid sprays behind you.\n\n",
                    false
                );
            }
            // Breasts > Manly, non-lactating:
            if (this.player.biggestTitSize() >= 1 && this.player.lactationQ() <= 0) {
                this.outx(
                    `Roving tentacles latch onto your ${this.allBreastsDescript()}; tiny spikes jabbing into each ${this.nippleDescript(
                        0
                    )} and injecting some sort of hot fluid.`
                );
                if (this.player.totalBreasts() == 2)
                    this.outx("  The anus-like tips affix to them.");
                else
                    this.outx(
                        "  The anus-like tips attach to one pair as more appear in order to take the others.",
                        false
                    );
                this.outx(
                    "  You feel a gush of liquid leave your body as the translucent lengths of the tentacles turn stark white.  The fluid they inject has caused you to lactate!  They suckle at you incessantly and before long your nipples ache from overuse and your breasts have run completely dry.\n\n",
                    false
                );
                this.player.boostLactation(1.5);
            }
            // Anus == gaping:
            if (this.player.ass.analLooseness >= 4) {
                this.outx(
                    `Your ${this.assholeDescript()} makes an inviting target for the squirming mass and it's quick to capitalize.  A particularly bulbous appendage slides deep inside, roiling about in a way that not even your well-trained hole has been treated to.`
                );
                if (this.player.hasCock())
                    this.outx(
                        "  A series of undulating lumps pass over your prostate, pushing out a splash of pre-cum.",
                        false
                    );
                this.outx(
                    "  You moan into the tentacle in your mouth appreciatevely at the beast's spectacular skill.\n\n",
                    false
                );
            }
            // Breasts > Manly, lactating, not enough to overfill:
            if (
                this.player.biggestTitSize() >= 1 &&
                this.player.lactationQ() > 0 &&
                this.player.lactationQ() < 1000
            ) {
                this.outx(
                    `Roving tentacles latch onto your ${this.allBreastsDescript()}, tiny spikes jabbing into your ${this.nippleDescript(
                        0
                    )}s and injecting some sort of hot fluid.  The pressure inside grows nearly unbearable as you feel your milk production increase.  To your relief, an anus-like tip attaches to each nipple.  They suckle at you incessantly and before long your nipples ache from overuse and your breasts have run completely dry.\n\n`,
                    false
                );
                this.player.boostLactation(1);
            }
            // Breasts > Manly, lactating, enough to overfill:
            else if (this.player.biggestTitSize() >= 1 && this.player.lactationQ() >= 1000) {
                this.outx(
                    `Roving tentacles latch onto your ${this.allBreastsDescript()}, tiny spikes jabbing into your ${this.nippleDescript(
                        0
                    )} and injecting some sort of hot fluid.  The pressure inside grows nearly unbearable as you feel your milk production increase.  To your relief, an anus-like tip attaches to each nipple.  They suckle at you incessantly and before long your nipples ache from overuse, but your breasts are still prepared to provide more milk!  The suction decreases as the beast before you becomes overfilled and eventually is forced to give up.\n\n`,
                    false
                );
                if (this.player.hasCock()) {
                    this.outx(`Your ${this.cockDescript(0)} explodes inside the creature, `);
                    if (this.player.cumQ() <= 500)
                        this.outx(
                            "pushing the creature to the edge of its fluid-containing abilities.",
                            false
                        );
                    else
                        this.outx(
                            "quickly overfilling the tentacle attached to it; it explodes off of you, freeing your spunk to spray from both you and the retreating beast.  ",
                            false
                        );
                }
                this.outx(
                    "The tentacles holding you release, leaking fluids everywhere.  You delight in giving one of the larger ones a hard stomp, as a reminder not to trifle with you.",
                    false
                );
                // end (victory)
                this.player.orgasm();
                this.dynStats("tou", 0.5, "spe", -0.5, "int", -0.5, "lib", 1, "sen", 1, "cor", 1);
                this.player.boostLactation(0.5);
                this.monster.HP = 0;
                if (this.player.HP == 0) this.player.HP++;
                if (this.getGame().inCombat) this.cleanupAfterCombat();
                else this.doNext(this.camp.returnToCampUseOneHour);
                return;
            }
            // has cock:
            if (this.player.hasCock()) {
                this.player.cumMultiplier += 0.5;
                this.outx(
                    `The creature's desires are soon fulfilled as your ${this.cockDescript(
                        0
                    )} starts to swell.  `
                );
                // [has testicles:
                if (this.player.balls > 0)
                    this.outx(
                        `Your ${this.ballsDescriptLight()} tighten up against you in preparation for their inevitable release, ready to spray their boiling load into the beast.  `
                    );
                this.outx(
                    "You rear up as a surge of euphoria races through you; your equine strength manages to overpower the tentacles holding your forelegs down for the briefest of moments needed to release your spunk into the suction of the tentacle, and you feel it get whisked out and down toward the writhing mass.\n\n",
                    false
                );
            }
            // has vagina:
            if (this.player.hasVagina()) {
                this.outx(
                    `Your ${this.vaginaDescript(
                        0
                    )} ripples about the coiled intruder as you climax; fem-cum drips down the tentacle and fills the area with your musky scent.  You rear up as a surge of euphoria races through you, managing to overpower the tentacles holding your forelegs down for the briefest of moments.  But even with your forelegs free, the tentacle in your ${this.vaginaDescript(
                        0
                    )} remains, rippling with waves of seed that spray inside you in massive, hot globules.  The sticky substance flooding your love canal pushes you over the edge and you orgasm again, spraying more as you cry out in pleasure.\n\n`,
                    false
                );
            }
            // has cock, normal cum amount, anus < gaping:
            if (
                this.player.hasCock() &&
                this.player.cumQ() < 1500 &&
                this.player.ass.analLooseness < 4
            ) {
                this.outx(
                    `Just as you think it's over, another tentacle rams into your ${this.assholeDescript()} and begins roughly massaging your prostate as it swells massively, causing another surge of cum to leave you, and another, and another.`
                );
                this.player.buttChange(40, true, true, false);
                this.outx(
                    "  It continues to violate your ass until you black out from exhaustion, the number of loads you've released no longer countable.",
                    false
                );
                // end (loss)
                this.player.orgasm();
                this.dynStats("tou", 1, "int", -0.5, "lib", 2, "sen", 1, "cor", 0.5);
                if (this.getGame().inCombat) this.cleanupAfterCombat();
                else this.doNext(this.camp.returnToCampUseTwoHours);
                return;
            }
            // has cock, normal cum amount, anus == gaping:
            if (
                this.player.hasCock() &&
                this.player.cumQ() < 1500 &&
                this.player.ass.analLooseness >= 0
            ) {
                this.outx(
                    `Just as you think it's over, the tentacle inside your ${this.assholeDescript()} begins to swell massively, causing another surge of cum to leave you, and another, and another.  It continues to violate your ass until you black out from exhaustion, the number of loads you've released no longer countable.`
                );
                // end (loss)
                this.player.orgasm();
                this.dynStats("tou", 1, "int", -0.5, "lib", 2, "sen", 1, "cor", 0.5);
                if (this.getGame().inCombat) this.cleanupAfterCombat();
                else this.doNext(this.camp.returnToCampUseTwoHours);
                return;
            }
            // { has vagina, anus < gaping:
            if (this.player.hasVagina()) {
                this.outx(
                    `Just as you think it's over, a tentacle rams into your ${this.assholeDescript()} and begins to swell massively, causing another surge of girlcum to leave you, and another, and another.`
                );
                this.player.buttChange(40, true, true, false);
                this.outx(
                    "  It continues to violate your ass until you black out from exhaustion, the number of times you've orgasmed no longer countable.",
                    false
                );
                // end (loss)
                this.player.orgasm();
                this.dynStats("tou", 1, "int", -0.5, "lib", 2, "sen", 1, "cor", 0.5);
                if (this.getGame().inCombat) this.cleanupAfterCombat();
                else this.doNext(this.camp.returnToCampUseTwoHours);
                return;
            }
            // { has cock, huge cum amount:
            if (this.player.hasCock()) {
                this.outx(
                    "You continue to pump more and more baby batter into the monster until, much to your surprise, it overwhelms the beast and comes surging back out to coat your ",
                    false
                );
                if (this.player.balls > 0) this.outx(`${this.sackDescript()} and `);
                this.outx(
                    "hind legs.  When the creature tries to pull away you step forward awkwardly, forelegs still raised, and continue spraying your copious amount of seed directly into the main mass.  It writhes about beneath you, incapable of doing anything as its soggy, heavily-laden tentacles are now no match for your strength.\n\n",
                    false
                );

                this.outx("Eventually you");
                if (this.player.balls > 0) this.outx(`r ${this.ballsDescriptLight()}`);
                this.outx(
                    " empty and you turn around to leave, giving the spunk covered mass a swift kick as a reminder of your superiority.",
                    false
                );
                // end (victory)
                this.player.orgasm();
                this.dynStats("tou", 0.5, "spe", -0.5, "int", -0.5, "lib", 1, "sen", 1, "cor", 1);
                this.monster.HP = 0;
                if (this.player.HP == 0) this.player.HP++;
                if (this.getGame().inCombat) this.cleanupAfterCombat();
                else this.doNext(this.camp.returnToCampUseOneHour);
                return;
            }
            // end (loss)
            this.player.orgasm();
            this.dynStats("tou", 1, "int", -0.5, "lib", 2, "sen", 1, "cor", 0.5);
            if (this.getGame().inCombat) this.cleanupAfterCombat();
            else this.doNext(this.camp.returnToCampUseTwoHours);
            return;
        }
        // Milk surprise!
        if (this.player.biggestLactation() >= 3.5 && this.player.gender > 0) {
            this.player.slimeFeed();
            this.outx(
                "Before you can react the creature has wrapped a long, sinewy tendril around each of your legs.  A third tendril quickly circles your waist.  You can feel the creature's strength immediately and wince as it tightens its grip.  The constricting pain is followed by a tingling, almost burning sensation, which you quickly recognize means the beast has injected you with some kind of poison.  A warm sensation floods your body and you realize with a start the poison is actually an aphrodisiac.\n\n",
                false
            );
            this.dynStats("lib", 2);
            this.outx(
                "You feel light-headed as the drug spreads through your body quickly.  Your ",
                false
            );
            // Just dicks
            if (this.player.gender == 1) {
                this.outx(this.multiCockDescriptLight(), false);
                if (this.player.cockTotal() > 1) this.outx(" begin ");
                else this.outx(" begins ");
            }
            // Pussy
            else {
                // AND dick(s)
                if (this.player.cockTotal() > 0) {
                    this.outx(`${this.vaginaDescript(0)} and ${this.multiCockDescriptLight()}`);
                    this.outx(" begin ");
                }
                // Nope just pussy
                else {
                    this.outx(this.vaginaDescript(0), false);
                    this.outx(" begins ");
                }
            }
            this.outx(
                "to throb urgently.  You are scarcely aware of the creature's approach; the strong tentacles lay you back gently, almost tenderly as your drug-clouded mind attempts to count their number.  It's impossible for an accurate count with them moving so quickly, but you can see there are two kinds.  The thicker, stronger tentacles are covered in dome-like protrusions of varying sizes and each ends with a very anus-like pucker.  The smaller tentacles are smooth and translucent, letting some light pass through them.  They also end in a tight, anus-like orifice.\n\n",
                false
            );
            this.outx(
                `You shudder as your ${this.allBreastsDescript()} are quickly encircled and molested by the smaller tentacles.  Your swollen mammaries ache as the tentacles attach their orifices to your oozing nipples.  The tentacles begin a distinct milking pattern, alternating which nipple is milked first; you moan in delight and watch as your milk travels through the tentacle shaft and down to the shambling beast's body.\n\n`,
                false
            );
            // (Optional Paragraphs)
            if (this.player.gender == 2) {
                // [Female/Virgin-Tight Cunt]
                if (this.player.vaginalCapacity() < 30)
                    this.outx(
                        `The beast senses your excitement and with beguiling speed swiftly impales your ${this.vaginaDescript(
                            0
                        )} with one of its massive, knobbly tentacles.  You squeal in pain and pleasure as you feel every bumpy inch pound into you, your cunt being stretched to unbelievable proportions.  The tentacle quickly bottoms out in your shallow hole, pressing urgently against your cervix as it begins to rhythmically pound your ${this.vaginaDescript(
                            0
                        )}.\n`,
                        false
                    );
                // [Female/Loose-Moist Cunt]
                else
                    this.outx(
                        `The beast senses your excitement and with beguiling speed swiftly impales your ${this.vaginaDescript(
                            0
                        )} with one of its massive, knobbly tentacles.  You moan like a whore as the beast's knobbly cock slides into with ease, every bump sending shivers through your spine as it finally bottoms out deep in your cunt, pressing into your cervix urgently.  The monster begins to pound heartily at your ${this.vaginaDescript(
                            0
                        )}, filling the air with lewd squishing sounds.\n`,
                        false
                    );
                if (this.player.cuntChange(20, true)) this.outx("\n", false);
                this.outx("\n", false);
            } // HERMS
            if (this.player.gender == 3) {
                // [Herm/Virgin-Tight Cunt]
                if (this.player.vaginalCapacity() < 30)
                    this.outx(
                        `The beast senses your excitement and with beguiling speed swiftly impales your ${this.vaginaDescript(
                            0
                        )} with one of its massive, knobbly tentacles.  You wail in excitement and pain, but before you can even digest the invasion, another tentacle impales itself on your ${this.cockDescript(
                            0
                        )}.  The anus-like opening gapes to envelope you, slowly devouring your member.  The double assault drives your body wild, and you begin pumping back against the invader and thrusting your ${this.cockDescript(
                            0
                        )} deeper into its tight fuck hole.\n\n`,
                        false
                    );
                // [Herm/Loose-Wet Cunt]
                else
                    this.outx(
                        `The beast senses your excitement and with beguiling speed swiftly impales your ${this.vaginaDescript(
                            0
                        )} with one of its massive, knobbly tentacles but before you can even digest the invasion another tentacle impales itself on your ${this.cockDescript(
                            0
                        )}, the anus like opening gaping to envelope you.  The double assault drives your body wild, and you begin pumping back against the invader and thrusting your ${this.cockDescript(
                            0
                        )} deeper into its tight fuck hole.\n\n`,
                        false
                    );
                if (this.player.cuntChange(20, true)) this.outx("\n", false);
                this.outx("\n", false);
            }
            this.outx(
                `You slowly become aware that the beast has slowed its assault on your genitals and soon stops altogether, withdrawing entirely.  The beast lets out an audible gurgle and you smile as you feel the tentacles re-double their assault on your ${this.nippleDescript(
                    0
                )}s.  The beast slowly lifts you off the ground with its strong tentacles, suspending you about three feet off the ground before flipping you over.  You hang suspended in the air, your ${this.allBreastsDescript()} dangling lewdly under you.  Suddenly you feel the desire to "<i>moo</i>" as the attack on your aching ${this.nippleDescript(
                    0
                )}s continues.  The tentacles continue their assault for what seems like hours, but then you gradually sense the tentacles beginning to slow.  Another gurgling sound confirms your suspicions - the beast wants your milk, but it's obvious you have far too much to offer!  You grin wickedly when the beast's tentacles begin to sag, quickly reaching up to fondle and massage your ${this.breastDescript(
                    0
                )}.  The stimulation causes even more milk to gush down the tentacles length.  After a few moments of the increased assault the beast groans and releases you, the tentacles popping off your nipples audibly, spraying your milk about as they release you.\n\n`,
                false
            );
            // [Female/Herm]
            if (this.player.gender >= 2)
                this.outx(
                    `Your ${this.allBreastsDescript()} ache, but you can tell immediately they are not depleted.  More milk dribbles as the tentacles try to retreat, and you grin, hardly satisfied with the beast's attack.  You reach between your thighs, seizing the nearest knobbly tentacle.  The beast is so sated it offers no resistance as you begin to pound your ${this.vaginaDescript(
                        0
                    )} with the living dildo.  The idea of turning the tables on the raping beast spurs you on to new heights and you cum quickly around the knobbly shaft, your cunt spasming and milking the bumpy tentacle hard.  As you finish with the tentacle the beast gives a final gurgle and retreats into the forest.`
                );
            // [Male]
            else
                this.outx(
                    `You feel your ${this.nippleDescript(
                        0
                    )}s dribbling milk as the tentacles attempt their retreat.  You realize the beast has nowhere near drained you and you grin eagerly as your ${this.cockDescript(
                        0
                    )} throbs mightily.  You reach back and seize the nearest knobby tentacle, the beast offering no resistance as you shove your ${this.cockDescript(
                        0
                    )} into the tight, puckered orifice.  You moan in delight, grunting happily as you fuck the tight hole wildly.  The thought of turning the tables on the raping beast drives you closer to the edge; soon you bury all of your cock into the tight fuck tool and unload your massive torrent of cum into the tentacle.  Your hot cum gushes into the beast and you can feel the tentacle throb and squirm in protest as you fill the beast even more.  After your ${this.cockDescript(
                        0
                    )} slips free the beast lets out a final gurgle of defeat and slithers away into the forest.`
                );
            this.player.orgasm();
            this.dynStats("tou", 0.5, "spe", -0.5, "int", -0.5, "lib", 1, "sen", 1, "cor", 1);
            this.player.boostLactation(0.5);
            this.monster.HP = 0;
            if (this.player.HP == 0) this.player.HP++;
            if (this.getGame().inCombat) this.cleanupAfterCombat();
            else this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        if (this.player.gender == 1) {
            this.dynStats("str", -1, "int", -1, "lib", 5, "sen", 2, "lus", 25, "cor", 1);
            if (this.player.cor < 75)
                this.outx(
                    "It grabs you before you can get away!\n\nWhile you attempt to resist the abomination, its raw muscle mass is too much. ",
                    false
                );
            this.outx(
                "It pins you to the ground easily. You immediately feel a sharp, horrible pain ",
                false
            );
            if (this.player.cockTotal() > 1)
                this.outx(`at the base of your ${this.multiCockDescriptLight()}.`);
            this.outx(
                "  You look down to see the end of a thorny tendril impaled in your pelvic region. Fiery pain courses through your veins as you feel the creature inject you with some sort of liquid. As the pain sears through you, ",
                false
            );
            if (this.player.cockTotal() == 1)
                this.outx(
                    "your member immediately becomes fully erect and pre-cum leaks liberally from your tip.",
                    false
                );
            else
                this.outx(
                    "your members immediately become fully erect, pre-cum drizzling from the tips.",
                    false
                );
            this.outx(
                "\n\nRealizing what is about to happen, you try to struggle. The beast responds by slamming you to the ground a few times, stunning you.  ",
                false
            );
            if (this.player.cockTotal() == 1)
                this.outx(
                    "In your daze you see a monstrous, hollow tentacle poised over your furious cock. You scream in shock and protest, but your cries fall upon deaf ears. The tentacle descends upon your penis, now begging for release, and clamps down upon your pubic mound, fully encapsulating your member.",
                    false
                );
            else
                this.outx(
                    `In your daze you see ${this.player.cockTotal()} monstrous, hollow tentacles poised over your furious cocks.  You scream in shock and protest, but your cries fall upon deaf ears.  The tentacles descend upon your ${this.multiCockDescriptLight()}, all begging for release, and clamps down upon your pubic mound, fully encapsulating your dicks.`
                );
        }
        if (this.player.gender == 2) {
            this.player.slimeFeed();
            this.dynStats("spe", -1, "int", -1, "lib", 5, "sen", 3, "lus", 20, "cor", 1);
            if (this.player.cor < 75)
                this.outx(
                    "It grabs you before you can get away!\n\nWhile you struggle valiantly, the beast's raw might is more than a match for you. ",
                    false
                );
            this.outx(
                "Tentacles burst from the mass and bind your arms, legs, and midriff. ",
                false
            );
            if (this.player.cor < 75)
                this.outx(
                    "You struggle to break free, but the creature only constricts you further, ensuring your immobility. ",
                    false
                );
            this.outx(
                "A quick flex of the tentacles securing your legs leaves you spreadeagled before the maw of the horror.  ",
                false
            );
            if (this.player.cor < 75)
                this.outx(
                    "Fearing for your life, you scream and struggle for help, but only the apathetic sounds of nature respond.",
                    false
                );
            this.outx(
                `\n\n${
                    this.player.totalBreasts() + 1
                } thorny tendrils appear and pierce your breasts and groin. A sharp pain and a burning sensation tear through you, overriding the previous wave of pleasure. You feel fluids being injected into you and a distinctive, agonizing misery flows into your veins.  Your breasts and `,
                false
            );
            if (this.player.vaginas.length == 1) this.outx("clit ");
            else this.outx("clits ");
            this.outx(
                "heat up and begin to swell. The pressure in your breasts is maddening and to your shock, you feel yourself leaking milk.",
                false
            );
        }
        if (this.player.gender == 3) {
            this.player.slimeFeed();
            this.dynStats("spe", -1, "int", -1, "lib", 5, "sen", 4, "lus", 35, "cor", 2);
            if (this.player.cor < 75)
                this.outx(
                    "While you attempt to resist the abomination, its raw muscle mass is too much. ",
                    false
                );
            this.outx(
                "It pins you to the ground easily. You immediately feel a sharp, horrible pain at the base of your ",
                false
            );
            if (this.player.cockTotal() > 1) this.outx("cocks");
            else this.outx(this.cockDescript(0), false);
            this.outx(
                ".  You look down to see the end of a thorny tendril impaled in your pelvic region. Fiery pain courses through your veins as you feel the creature inject you with some sort of liquid. As the pain sears through you, your ",
                false
            );
            if (this.player.cockTotal() > 1)
                this.outx(
                    `${this.multiCockDescriptLight()} immediately become fully erect and leak pre-cum liberally from their tips.  `
                );
            else
                this.outx(
                    "member immediately becomes fully erect and pre-cum leaks liberally from your tip.  ",
                    false
                );
            this.outx(
                `  ${TentacleBeastScene.Num2Text(
                    this.player.totalNipples()
                )} thorny tentacles pierce your nipples, and you feel as if someone shot acid into your tits, which immediately begin to swell.`
            );
            this.player.growTits(1, this.player.breastRows.length, false, 2);
            this.outx(
                "\n\nRealizing what is about to happen, you try to struggle. The beast responds by slamming you to the ground a few times, stunning you. In your daze you see a monstrous, hollow tentacle poised over your ",
                false
            );
            if (this.player.cockTotal() > 1) this.outx("furious cocks.  ");
            else this.outx("furious cock.  ");
            this.outx(
                "You scream in shock and protest, but your cries fall upon deaf ears. The tentacle descends upon your ",
                false
            );
            if (this.player.cockTotal() > 1)
                this.outx(
                    `${this.multiCockDescriptLight()}, now begging for release, and clamps down around your pubic mound, fully encapsulating your members.  `
                );
            else
                this.outx(
                    `${this.cockDescript(
                        0
                    )}, now begging for release, and clamps down upon your pubic mound, fully encapsulating your member.`
                );
        }
        // Call page 2!
        this.doNext(this.tentacleRapeContinuation);
    }

    private tentacleRapeContinuation(): void {
        this.player.orgasm();
        this.dynStats("tou", 1, "int", -0.5, "lib", 2, "sen", 1, "cor", 0.5);
        this.clearOutput();
        this.spriteSelect(100);
        if (this.player.gender == 1) {
            this.outx(
                "You next feel the wretched sensation of another tentacle pushing its way past your anus and into your rectum. You cry more out of frustration and anger than pain as the foreign body settles a few inches inside your body. With a furious, coordinated rhythm, the monstrosity begins swelling the tentacle in your ass and "
            );
            if (this.player.cockTotal() == 1)
                this.outx(
                    `using a sucking-stroking motion on your helpless ${this.multiCockDescriptLight()}. The swelling of the ass tentacle pressures your prostate in a paradoxically pleasurable and painful manner. You realize, much to your terror, that this beast is MILKING you of your semen!`
                );
            else
                this.outx(
                    `using a sucking-stroking motion on your ${this.multiCockDescriptLight()}.  The swelling of the ass tentacle pressures your prostate in a paradoxical pleasurable and painful manner.  You realize, much to your terror, that this beast is MILKING you of your semen!`
                );
            this.player.buttChange(50, true);
            this.outx(
                "\n\nHelpless and overwhelmed by the pleasure of such rough and primal stimulation, all you can do is give the creature what it wants; your hot cum. Your body only responds to the sensations from your ",
                false
            );
            if (this.player.cockTotal() == 1)
                this.outx(
                    `${this.multiCockDescriptLight()} and ass and in a very short time, your phallus explodes, launching stream upon stream of hot, thick cum into the horror. Your hips and pelvis buck violently with each thrust as the creature masterfully strokes your ${this.multiCockDescriptLight()}  and milks your prostate of your fluids. You cry with each orgasm, prompting the thing to milk you harder. After an eternity of successive ejaculations, the creature withdraws its unholy arms and leaves you in a bruised, lacerated, overfucked heap on the ground, discarded like a person throws away a corn cob after a meal.`
                );
            else
                this.outx(
                    `${this.multiCockDescriptLight()} and ass and in a very short time, your dicks explode, launching stream upon stream upon stream of hot, thick cum into the horror.  Your hips and pelvis buck violently with each thrust as the creature masterfully strokes your ${this.multiCockDescriptLight()} and milks your prostate of your fluids.  You cry with each orgasm, prompting the thing to milk you harder. After an eternity of successive ejaculations, the creature withdraws its unholy arms and leaves you in a bruised, lacerated, overfucked heap on the ground, discarded like a person throws away a corn cob after a meal.`
                );
        } else if (this.player.gender == 2) {
            this.outx(
                "The beast rears up to reveal a beak-like maw. It opens its massive jaws to reveal "
            );
            if (this.player.vaginas.length == 1)
                this.outx(
                    "a tongue shaped like a large cock while its tongue, like any tentacle, immediately seeks out your defenseless pussy. It prods itself mockingly around your labia as you attempt to contract to keep it from violating you and depriving you of what dignity you have left. The creature flexes its appendage and easily forces its way into your vagina",
                    false
                );
            else
                this.outx(
                    `${
                        this.player.vaginas.length
                    } tongues shaped like large cocks while its tongues, like any other tentacles, seeks out your defenseless pussies.  It prods itself mockingly around your labias as you attempt to contract to keep them from violating you and depriving you of what dignity you have left.  The creature flexes its appendages and easily forces its way into your ${this.vaginaDescript(
                        0
                    )}s`
                );
            if (this.player.vaginas.length > 1) this.outx("s");
            this.outx(
                ". As you cry out in shock, another dick-shaped appendage forces its way into your throat. The beast takes care to prevent you from choking on its limb.",
                false
            );
            this.outx(
                `\n\nIn a coordination that can only signify higher intelligence, the monster fucks your ${this.vaginaDescript(
                    0
                )}`,
                false
            );
            if (this.player.vaginas.length > 1) this.outx("s");
            this.outx(
                " and mouth and begins milking your swollen breasts and sucks your throbbing ",
                false
            );
            if (this.player.vaginas.length > 1) this.outx("clits. ");
            else this.outx("clit. ");
            this.player.cuntChange(this.player.vaginalCapacity() * 0.76, true);
            this.outx(
                ` Your body betrays your resistance as pleasure hammers you from crotch to head. After some time, you begin bucking your hips in tandem to the creature's thrusts, drunk with pleasure. As you peak for your orgasm, you feel the creature bottom out inside your womb. Oceans of hot cum flood your ${this.vaginaDescript(
                    0
                )}`
            );
            if (this.player.vaginas.length > 1) this.outx("s");
            this.outx(
                " and your mouth. You are being inseminated by the abomination, but you do not care. The fucking is too good. The hot, musky fluids pour into your mouth. The taste crushes your last bit of resistance and you NEED MORE, not just to swallow, but to devour with your womb. You manage to free one hand, only to grasp the tentacle in your mouth to coax more semen inside you. You feel your stomach distend from the amount of cum you greedily swallow. The beast floods you with more cum than you can handle and proceeds to soak you from head to toe in its fluids as it runs from your overwhelmed orifices.",
                false
            );
            this.doNext(this.tentacleRapeContinuationForFemales);
            this.player.slimeFeed();
            // lactate more from the encounter.
            this.player.boostLactation(0.3);
            return;
        } else if (this.player.gender == 3) {
            if (this.player.cockTotal() == 1) {
                this.outx(
                    `A sharp tug tells you that the creature has sealed itself upon your ${this.cockDescript(
                        0
                    )}. You see ${this.player.totalBreasts()} smaller tentacles latch onto your erect nipples. You feel milk begin to leak out as the creature makes a perfect seal around your areola. A thick, phallic tentacle probes underneath your trapped ${this.cockDescript(
                        0
                    )} until it finds your vaginal opening. You cry out as the member punches past your opening and bottoms out in your womb. The tentacle swells up until it completely fills your ${this.vaginaDescript(
                        0
                    )}.  `
                );
                this.player.cuntChange(this.player.vaginalCapacity() * 0.76, true, false, true);
                this.outx(
                    `With freakish coordination, the beast sucks your ${this.cockDescript(
                        0
                    )} and tits while hammering away at your ${this.vaginaDescript(
                        0
                    )}. The overwhelming pleasure courses through your body and triggers an immediate orgasm, sending gouts of cum into the tentacle sealed around your ${this.cockDescript(
                        0
                    )}. The sensation of your fluids entering the creature prompts it to suck your ${this.cockDescript(
                        0
                    )} harder as well as hammer your ${this.vaginaDescript(
                        0
                    )} faster, leading to a chain of orgasms.\n\n`,
                    false
                );
                this.outx(
                    "Drunk with pleasure, you revel in the sensation of cumming into the creature while it breast feeds from you. All you can do is drown in the experience of being milked from top to bottom. The creature begins piledriving your box faster and you feel like the creature is going to impale you with its phallic tentacle.\n\n",
                    false
                );
                this.outx(
                    `The creature's milking tentacles stop moving and you feel the dick-tentacle press sharply against your womb. You feel the thunderous force of hot fluid lance into your body as the creature cums repeatedly inside you, triggering yet another orgasm. The creature cums in surges and shoots repeatedly inside you. Within moments, excess cum spews out of your ${this.vaginaDescript(
                        0
                    )} as it cannot hold anymore, but the creature keeps cumming.\n\n`,
                    false
                );
                this.outx(
                    "After a while the creature withdraws its tentacles from you. It poises the tentacle-cock over your face and lets out one last load, covering your face in hot, thick sperm. You reflexively open your mouth and allow loads of the salty juice down your throat. Once spent, the creature shambles off, leaving you well milked and cum-soaked.",
                    false
                );
            } else {
                this.outx(
                    `A sharp tug tells you that the creature has sealed itself upon your ${this.multiCockDescriptLight()}. You see ${this.player.totalBreasts()} smaller tentacles latch onto your erect nipples. You feel milk begin to leak out as the creature makes a perfect seal around your areola. A thick, phallic tentacle probes underneath your trapped cocks until it finds your vaginal opening. You cry out as the member punches past your opening and bottoms out in your womb. The tentacle swells up until it completely fills your ${this.vaginaDescript(
                        0
                    )}.`
                );
                this.player.cuntChange(this.player.vaginalCapacity() * 0.76, true, true, false);
                this.outx(
                    `  With freakish coordination, the beast sucks your ${this.multiCockDescriptLight()} and tits while hammering away at your ${this.vaginaDescript(
                        0
                    )}. The overwhelming pleasure courses through your body and triggers an immediate orgasm, sending gouts of cum into the tentacles sealed around your pricks. The sensation of your fluids entering the creature prompts it to suck your throbbing cocks harder as well as hammer your ${this.vaginaDescript(
                        0
                    )} faster, leading to a chain of orgasms.\n\n`,
                    false
                );
                this.outx(
                    "Drunk with pleasure, you revel in the sensation of cumming into the creature while it breast feeds from you. All you can do is drown in the experience of being milked from top to bottom. The creature begins piledriving your box faster and you feel like the creature is going to impale you with its phallic tentacle.\n\n",
                    false
                );
                this.outx(
                    `The creature's milking tentacles stop moving and you feel the dick-tentacle press sharply against your womb. You feel the thunderous force of hot fluid lance into your body as the creature cums repeatedly inside you, triggering yet another orgasm. The creature cums in surges and shoots repeatedly inside you. Within moments, excess cum spews out of your ${this.vaginaDescript(
                        0
                    )} as it cannot hold anymore, but the creature keeps cumming.\n\n`,
                    false
                );
                this.outx(
                    "After a while the creature withdraws its tentacles from you. It poises the tentacle-cock over your face and lets out one last load, covering your face in hot, thick sperm. You reflexively open your mouth and allow loads of the salty juice down your throat. Once spent, the creature shambles off, leaving you well milked and cum-soaked.",
                    false
                );
            }
            this.player.slimeFeed();
            // lactate more from the encounter.
            this.player.boostLactation(0.3);
        }
        if (this.getGame().inCombat) this.cleanupAfterCombat();
        else this.doNext(this.camp.returnToCampUseOneHour);
    }

    private tentacleRapeContinuationForFemales(): void {
        this.clearOutput();
        this.spriteSelect(100);
        if (this.player.vaginas.length == 1) {
            // single coochie
            this.outx(
                "Satisfied, the creature drops you smartly, withdraws its limbs from you, and lumbers away.  Covered completely in cum, you see that your clitoris has swollen up to "
            );
            // Big clit girls get huge clits
            if (
                (this.player.findPerk(PerkLib.BigClit) >= 0 && this.player.clitLength > 2) ||
                this.player.clitLength > 3
            )
                this.outx(
                    `almost ${TentacleBeastScene.num2Text(
                        Math.floor(this.player.clitLength * 1.75)
                    )} inches in length. `
                );
            // normal girls get big clits
            else
                this.outx(
                    "almost four inches in length.  Bruised and sore, you pass into unconsciousness "
                );
        } else {
            this.outx(
                `Satisfied, the creature drops you smartly and withdraws its limbs from you and lumbers away.  Covered completely in cum, you see that your ${this.player.vaginas.length} clits have swollen up to almost four inches in length.  Bruised and sore, you pass into unconsciousness, `
            );
        }
        // Not too corrupt
        if (this.player.cor < 75)
            this.outx("too intoxicated with lust to fume over your violation. ");
        // Very corrupt
        else this.outx("too intoxicated with lust to continue the pleasure. ");
        // If has big-clit grow to max of 6"
        if (
            this.player.clitLength < 7 &&
            this.player.clitLength >= 3.5 &&
            this.player.findPerk(PerkLib.BigClit) >= 0
        ) {
            this.player.clitLength += 0.1 + this.player.cor / 100;
            this.outx(
                `Your massive clitty eventually diminishes, retaining a fair portion of its former glory.  It is now ${
                    Math.floor(this.player.clitLength * 10) / 10
                } inches long when aroused, `
            );
            if (this.player.clitLength < 5) this.outx("like a tiny cock.");
            if (this.player.clitLength >= 5 && this.player.clitLength < 7)
                this.outx("like a slick throbbing cock.");
            if (this.player.clitLength >= 7) this.outx("like a big thick cock.");
        }
        // Grow clit if smaller than 3.5"
        else if (this.player.clitLength < 3.5) {
            this.outx(
                "In time your clit returns to a more normal size, but retains a bit of extra volume."
            );
            this.player.clitLength += 0.2;
        }
        // Mention that clit doesn't grow if your big enough.
        else this.outx("In time it returns to its normal size, losing all the extra volume.");
        if (this.player.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_TIGHT)
            this.player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_NORMAL;
        this.player.slimeFeed();
        if (this.getGame().inCombat) this.cleanupAfterCombat();
        else this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Centaur v. Tentacle Monster: (display if pc is unsexed centaur)
    private centaurGenderlessRetardation(): void {
        this.outx("", true);
        this.spriteSelect(100);
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00247] == 0 || this.player.balls == 0) {
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00247] = 1;
            this.outx(
                "Tentacles wrap around your legs before you can make a move to stop them, binding you tightly and coiling upwards.  One slides slowly along your underside, making you shiver in ",
                false
            );
            if (this.player.cor < 50 && this.player.lust < 70) this.outx("dread");
            else this.outx("anticipation");
            this.outx(
                `, but stops when it reaches your haunches.  Another starts testing the same area, briefly touching your ${this.assholeDescript()} but clearly not finding what it's looking for.\n\n`,
                false
            );

            this.outx(
                '"<i>WHAT THE FUCK IS WRONG WITH YOUR BODY?!</i>" yells out an unnervingly human voice.\n\n',
                false
            );

            this.outx("Startled past horror, your mouth hangs wide open.\n\n", false);

            this.outx(
                '"<i>Why the FUCK can\'t I find your juicy bits?</i>" the creature shrills.  "<i>I\'m so hungry I could risk stealing spoo from an army of goblins in heat!</i>"\n\n',
                false
            );

            this.outx(
                "You stammer out something about having no genitals, not thinking clearly enough to dissemble.\n\n",
                false
            );

            this.outx(
                "\"<i>Oh, you think this shit is FUNNY, don't you?</i>\"  The voice has switched to a mocking tone.  \"<i>I know, let's wander into the forest and fuck with the hungry creatures who want some nice, nutritious cum!  Let's make them work for my amusement!  It'll be fucking HILARIOUS!</i>\"\n\n",
                false
            );

            this.outx(
                `A tentacle smacks your ${this.buttDescript()} hard, and the voice returns to normal.\n\n`,
                false
            );

            this.outx(
                '"<i>I just caught a motherfucking HORSE, just to find out you haven\'t got anything for me to eat!  Do you have any idea how fucking hard it is to catch a horse!?</i>"\n\n',
                false
            );

            this.outx(
                "Feeling kind of ashamed now, you agree that horses are probably pretty hard to catch, but point out you're not <i>really</i> a horse, you're a centaur.  This is met by a stunned silence, which you, being unable to read the mood of the creature very well, decide to fill with your own voice.  You briefly explain the main differences between horses and centaurs, then mention that you weren't exactly <i>willing</i> prey; the monster certainly never asked you if it would be okay to feed from your genitalia, and that perhaps it should reconsider its strategy.\n\n",
                false
            );
            this.outx("More silence.\n\n", false);

            this.outx("Out of nowhere a tentacle slaps you in the face.\n\n", false);

            this.outx(
                '"<i>FUCK you, you stupid horse!  Why don\'t you grow a pair?  Literally!</i>"\n\n',
                false
            );

            this.outx(
                "It raises its tentacles and slams them into you as one, dropping you to the ground, unconscious.  With that, the tentacles retract and the monster shambles off into the forest, mumbling something about burning.",
                false
            );
        }
        // (Followup scene, if pc has seen above at least once, is unsexed centaur and has balls: -Z)
        else {
            this.outx(
                "Tentacles wrap around your legs before you can make a move to stop them, binding you tightly and coiling upwards.  One slides slowly along your underside, making you shiver in ",
                false
            );
            if (this.player.cor < 50 && this.player.lust < 70) this.outx("dread");
            else this.outx("anticipation");
            this.outx(
                `, slipping forward to probe between your haunches.  It arrives at and discovers your ${this.sackDescript()} with some little ceremony, stroking and fondling it.\n\n`,
                false
            );

            this.outx(
                '"<i>Now THIS is what I\'m talking about!</i>" the creature\'s eerie voice sings out.  "<i>Daddy needs his medicine!</i>"\n\n',
                false
            );

            this.outx(
                `The tentacle, now joined by a second, hunts around your ${this.ballsDescriptLight()}, seeking any organs that might serve as a release valve for their contents.  You stare at it as it searches, quite certain you know what's coming next.\n\n`,
                false
            );

            this.outx(
                '"<i>No, no, no. Where the FUCK is it?</i>" the creature mumbles, frustration spiking the pitch of its voice.\n\n',
                false
            );

            this.outx(
                "You glibly explain that though you do in fact have 'a pair', as requested, you're still very much genderless, without any sexual organs.\n\n",
                false
            );

            this.outx(
                "The tentacles cease movement as their owner digests your words; it begins to shake visibly, shedding leaf-litter as it does.\n\n",
                false
            );

            this.outx(
                '"<i>You... literal-minded... PRICK!</i>" it howls, rounding on you with furious venom and making you flinch.  "<i>First of all, you\'re not GENDERLESS, you\'re UNSEXED!  Gender identity rolls up social and behavioral factors like masculine or feminine mannerisms, dress, and domestic roles; the only thing YOU are less is anything remotely USEFUL between your legs!  If you\'re going to be PEDANTIC, try at least to be right!</i>"\n\n',
                false
            );

            this.outx(
                "You quail, surprised at misguessing the character of its reaction.\n\n",
                false
            );

            this.outx(
                '"<i>SECOND of all,</i>" it continues, "<i>it occurs to me that, in your misguided zeal, you\'ve forgotten that you, a: have BALLS, and b: have NO WAY to close your legs!  WHICH BRINGS ME TO C: TENTACLE TO THE GROIN!</i>"\n\n',
                false
            );

            this.outx(
                `Your eyes bulge out as one of the feelers which had been still during your argument pulls away from your ${this.sackDescript()} and then returns with a sharp slap; as your vision pinks over under the wave of nausea, the creature releases your legs and you collapse into what can only be assumed is a centaur fetal position.\n\n`,
                false
            );

            this.outx(
                '"<i>Q.E.D., MOTHERFUCKER!</i>" it shouts, gesticulating in the air wildly with its tentacles as it turns and clumps back into the dense brush.',
                false
            );
        }
        this.player.takeDamage(5);
        if (this.getGame().inCombat) this.cleanupAfterCombat();
        else this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Naga v. Tentacle Monster:
    private genderlessHilarityForNagaKenDolls(): void {
        this.outx("", true);
        this.spriteSelect(100);
        this.outx(
            `Out of nowhere tentacles bind your arms and tail, holding you firm in a matter of seconds.  You struggle to free yourself but can do nothing against the strength of the beast holding you in your current state.  More of the appendages start teasing around your body, as if looking for something.  A handful test the entrance to your ${this.assholeDescript()} but evidently that's not what they're after.\n\n`,
            false
        );

        this.outx(
            "An oddly human voice comes from the undergrowth, catching you off-guard.  \"<i>Look, I'm really sorry about this, but I'm really not all that familiar with, uh, whatever it is you are.  Where do you keep the naughty bits?</i>\"\n\n",
            false
        );

        this.outx(
            'A little stunned by the question, you tell the voice that you don\'t have any "<i>naughty bits</i>".\n\n',
            false
        );

        this.outx(
            '"<i>I\'m sorry, maybe I just worded the question badly.  Um, where do you keep your penis... esss and or vagina... ssss.</i>"  The words are followed up by prolonged hisses that may or may not represent the usual attempt to transmute one language to another by tacking new suffixes on.\n\n',
            false
        );

        this.outx(
            "Sensing an opportunity to get out of this situation, you respond with your own series of hisses and hand gestures as if to say you have no idea what the beast wants.  It responds with a sigh and you're released from its grip, landing on the ground in a bit of a heap.\n\n",
            false
        );

        this.outx(
            '"<i>Fucking tourists.</i>"  It slams its tentacles down in a brutal blow, knocking you out.',
            false
        );
        this.player.takeDamage(15);
        if (this.getGame().inCombat) this.cleanupAfterCombat();
        else this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Goo v. Tentacle Monster:
    private tentacularGenderGooTimes(): void {
        this.outx("", true);
        this.spriteSelect(100);
        this.outx(
            "All of a sudden, tentacles come whipping out of the undergrowth to grab you.  Though, they're moving a little too fast, and manage to compress your body walls so far together that you're almost squeezed in half.\n\n",
            false
        );

        this.outx(
            '"<i>SHIT. SHIT. SHIT. SHIT.</i>"  An oddly human voice is profaning loudly.  "<i>Are you dead?</i>"\n\n',
            false
        );

        this.outx(
            "You respond that you are not, you're just mostly liquid and insubstantial.\n\n",
            false
        );

        this.outx(
            '"<i>Uh huh... that so?  Well, so long as you have some substantial naughty bits, I\'ll be happy.</i>"\n\n',
            false
        );

        this.outx("There's an awkward silence.\n\n", false);

        this.outx('"<i>You haven\'t got anything, have you?</i>"\n\n', false);

        this.outx("You shake your head.\n\n", false);

        this.outx(
            '"<i>Well, fuck.</i>"  A tentacle pokes you and you\'d guess the beast is watching you jiggle as it chuckles.  "<i>Maybe this isn\'t a total waste. I wonder, what do you taste like?</i>"\n\n',
            false
        );

        this.outx(
            "One of the larger tentacles extends and latches onto your base, its anus-like opening sucking gently at your gooey mass.  There follows a brief moment where you're not really afraid of the situation, but are instead mildly curious yourself what you taste like.\n\n",
            false
        );

        this.outx(
            '"<i>FUCK!</i>" comes the voice again.  "<i>You\'re sour apple!  I fucking HATE sour apple!</i>"\n\n',
            false
        );

        this.outx("It slams its tentacles down in a brutal blow, knocking you out.");
        if (this.getGame().inCombat) this.cleanupAfterCombat();
        else this.doNext(this.camp.returnToCampUseOneHour);
    }
}
