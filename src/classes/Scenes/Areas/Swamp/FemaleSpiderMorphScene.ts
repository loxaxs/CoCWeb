import { BaseContent } from "../../../BaseContent";
import { TimeAwareInterface } from "../../../TimeAwareInterface";
import { PregnancyStore } from "../../../PregnancyStore";
import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { CoC } from "../../../CoC";
import { trace } from "../../../../console";
import { FemaleSpiderMorph } from "./FemaleSpiderMorph";
import { TONUGE_SNAKE, TONUGE_DEMONIC } from "../../../../includes/appearanceDefs";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";

/**
 * Created by aimozg on 03.01.14.
 */

export class FemaleSpiderMorphScene extends BaseContent implements TimeAwareInterface {
    public pregnancy: PregnancyStore;

    public constructor() {
        super();
        this.pregnancy = new PregnancyStore(
            kFLAGS.FEMALE_SPIDERMORPH_PREGNANCY_TYPE,
            kFLAGS.FEMALE_SPIDERMORPH_PREGNANCY_INCUBATION,
            0,
            0,
        );
        this.pregnancy.addPregnancyEventSet(PregnancyStore.PREGNANCY_PLAYER, 100);
        // Event: 0 (= not pregnant),  1,  2 (< 100)
        CoC.timeAwareClassAdd(this);
    }

    // Implementation of TimeAwareInterface
    public timeChange(): boolean {
        this.pregnancy.pregnancyAdvance();
        if (this.pregnancy.isPregnant && this.pregnancy.incubation == 0)
            this.pregnancy.knockUpForce(); // Silently clear the spider morph's pregnancy if the player doesn't see the egg sac in time
        trace(
            `\nFemale Spidermorph time change: Time is ${this.model.time.hours}, incubation: ${this.pregnancy.incubation}, event: ${this.pregnancy.event}`,
        );
        return false;
    }

    public timeChangeLarge(): boolean {
        return false;
    }
    // End of Interface Implementation

    public fSpiderMorphGreeting(): void {
        this.outx("", true);
        this.spriteSelect(73);
        // Egg sack sometimes
        if (this.pregnancy.event == 2) {
            // If she's past event 2 then she has laid the eggs
            this.findASpiderMorphEggSack();
            return;
        }
        // *Greeting Event (1st time):
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00270] == 0) {
            this.outx(
                `You go exploring into the swamp, doing your best to ignore the oppressive heat and moisture of the place.  Insects buzz and flit about you constantly in an attempt to drive you mad with their incessant buzzing.  You swat a particularly noisy one from your ${this.player.face()} before you realize you're no longer alone.\n\n`,
                false,
            );

            this.outx(
                "A strange, naked female stands before you, hands on her hips as she eyes you up and down.  She's completely unclothed, revealing the paleness of her glistening skin to the humid swamp air, and though her legs and arms are both wreathed in some kind of shiny black covering, it only seems to enhance her nudity rather than conceal it.  Bobbing behind her is a sizable, black sphere with a few small protrusions that you can only assume are spinnerets. She's clearly a spider-girl, and now that you look closer, that black material is her exoskeleton!  The monster-girl flashes her needle-like fangs at you in a smile as she approaches.\n\n",
            );
        }
        // *Greeting Event (Repeat)
        else
            this.outx(
                "You go exploring in the swamp, and before you get far, a female spider-morph appears!  She's clearly different than the last one you ran into, though many of her features remain the same.  You realize she's no more than a dozen paces away and slowly approaching with a strange glint in her eye.\n\n",
            );
        // Menu for either
        this.outx("What do you do?");
        // prettier-ignore
        this.choices(
            "Fight", this.fightFSpiderMorph,
            "Try to Talk", this.talkToFSpiderMorph,
            "", undefined,
            "", undefined,
            "Leave", this.runFromFSpiderMorph,
        );
        // Incremement 'times encountered spider-girls'
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00270]++;
    }

    // Selecting fight starts combat and eventParsers to 1 to display the combat menu and enemy description.
    private fightFSpiderMorph(): void {
        this.startCombat(new FemaleSpiderMorph());
        this.spriteSelect(73);
        this.playerMenu();
    }

    // Run
    private runFromFSpiderMorph(): void {
        this.outx("", true);
        this.spriteSelect(73);
        // Selecting has a 50% chance of displaying the following:
        if (FemaleSpiderMorphScene.rand(2) == 0) {
            this.outx(
                "You turn around and flee before she can get any closer.  After running for a few moments, you realize the spider-woman isn't trying to pursue you at all.  The last image you see of her is her looking down at the ground with an expression of incredible melancholy.",
            );
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        // The other 50% will start combat and then immediately attempt to run.
        else {
            this.startCombat(new FemaleSpiderMorph());
            kGAMECLASS.runAway();
        }
    }

    // *Try to Talk
    private talkToFSpiderMorph(): void {
        this.outx("", true);
        this.spriteSelect(73);
        if (FemaleSpiderMorphScene.rand(2) == 0) {
            this.outx(
                "You hold up your hands non-threateningly and ask the spider-girl why she's trying to sneak up on you.  Her eyes go wide and she claps her chitinous hands over her mouth in shock before she cries, \"<i>Omigosh, I'm so sorry!</i>\"  You smirk at the decidedly girlish response while she recovers and continues to speak, \"<i>I didn't mean to scare you!  I've been living out here by myself for so long... ever since the demons destroyed our village.  C-could we just... umm... talk for a little while?</i>\"\n\n",
            );
            this.outx(
                "The spider-girl twiddles her fingers nervously for a moment until you give her a nod.  You did mean to talk to her, and it seems that it's worked out a little better than you intended.  She takes a few tiny steps forward before sitting down cross-legged on some ferns.  Feeling no threat from the strange monster-girl, you sit down across from her and let her ply you with questions about your adventures, and once she's finished, you do the same.\n\n",
            );
            // (OPTION 1 - SEX)
            if (FemaleSpiderMorphScene.rand(2) == 0) {
                this.outx(
                    "After you've both had your fill of talk, the spider-girl asks, \"<i>I-I w-was wondering if you'd do me a favor... I have certain... urges, and",
                );
                if (this.player.gender == 0) {
                    this.outx(
                        " o-oh nevermind, you're genderless... crap.</i>\"  She blushes and lifts her abdomen, shooting a web into the trees that she uses to escape from the awkward situation.  You're left utterly alone, once again.",
                    );
                    this.doNext(this.camp.returnToCampUseOneHour);
                    return;
                }
                this.outx(
                    " well, you're the first sane person I've had a chance to ask.  Oh fuck it, can I tie you up and fuck you? Please?</i>\"\n\n",
                );
                this.outx("Do you let her fuck you?");
                // prettier-ignore
                this.choices(
                    "Yes", this.voluntaryFemaleSpiderMorphRapesYou,
                    "", undefined,
                    "", undefined,
                    "", undefined,
                    "Leave", this.declinedCrazyFemaleSpiderMorphSexFunTimes,
                );
            }
            // (OPTION 2 - GIFT)
            else {
                this.outx(
                    "After you've both had your fill of talk, the spider-girl smiles and gives you a gentle hug.  She trills, \"<i>Thank you so much for talking to me!  It feels so good to actually... communicate with someone again.  I can't thank you enough, but here, take this.  Maybe it will help you on your journey.</i>\"\n\n",
                );
                this.inventory.takeItem(this.consumables.S_GOSSR, this.camp.returnToCampUseOneHour);
            }
        }
        // *Try to Talk - Aggressive Variant
        else {
            this.outx(
                "You hold your hands up non-threateningly and ask the spider-girl why she's trying to sneak up on you.\n\n",
            );
            // (Start combat and immediately call a web attack)
            const femaleSpiderMorph: FemaleSpiderMorph = new FemaleSpiderMorph();
            this.startCombat(femaleSpiderMorph);
            femaleSpiderMorph.spiderMorphWebAttack();
        }
    }

    // *OPTION 1 Yes - Let Her Fuck You
    private voluntaryFemaleSpiderMorphRapesYou(): void {
        this.startCombat(new FemaleSpiderMorph());
        this.spriteSelect(73);
        this.getGame().inCombat = false;
        this.loseToFemaleSpiderMorph();
    }

    // *OPTION 1 No (Declined sex)
    private declinedCrazyFemaleSpiderMorphSexFunTimes(): void {
        this.outx("", true);
        this.outx(
            "You tell the lusty spider-morph that you're not interested in having sex with her now, and though she looks crestfallen, she nods understandingly and zips up a line of webbing into the trees before the situation can become any more awkward.",
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // *Defeat Female
    // *Summary: Webs PC down, suckles nipple and injects aphrodisiac into each breast, then sixty-nine's, ending with webbing bukkake?
    private defeatFemale(): void {
        this.outx("", true);
        this.spriteSelect(73);
        // (Noncombat Intro)
        if (!this.getGame().inCombat) {
            this.outx("You agree to have sex with the poor, pent-up arachnid maid, and ");
            if (this.player.cor < 33) this.outx("nervously");
            else if (this.player.cor < 66) this.outx("playfully");
            else this.outx("seductively");
            this.outx(
                ` undress, tossing your ${this.player.armorName} to the side to fully expose yourself, just like your soon-to-be lover.`,
            );
            if (this.player.hasCock()) {
                if (this.player.lust < 70) {
                    if (this.player.cockTotal() > 1) this.outx("  Each of y");
                    else this.outx("  Y");
                    this.outx("our ");
                    if (this.player.lust < 33) this.outx("flaccid");
                    else this.outx("half-erect");
                    this.outx(" member");
                    if (this.player.cockTotal()) this.outx("s");
                    this.outx(
                        " stiffens slightly as you wonder how the spider-girl will 'do' you, rising in preparation of the coming sexual contact.",
                    );
                } else {
                    if (this.player.cockTotal() > 1) this.outx("  Each of y");
                    else this.outx("  Y");
                    this.outx("our rock-hard member");
                    if (this.player.cockTotal()) this.outx("s");
                    this.outx(
                        " twitches powerfully as you wonder how the spider-girl will 'do' you, trembling in anticipation of the coming sexual contact.",
                    );
                }
            } else if (this.player.hasVagina()) {
                this.outx(`  Meanwhile, your ${this.vaginaDescript(0)} `);
                if (this.player.wetness() < 4) this.outx("moistens");
                else this.outx("drips");
                this.outx(
                    " while your labia engorge, growing more sensitive and ready to be touched.",
                );
            }
            this.outx("\n\n");

            this.outx(
                `The arachnid woman turns around and shakes her bottom at you, letting your eyes trace up and down the surface of her shiny, thigh-high carapace to her pert, heart-shaped ass and pendulous abdomen.  It contracts and trembles, wobbling dangerously before it disgorges a heavy spray of webbing.  The sticky, organic bindings smack into you and pin you to the ground, though the cushiony peat moss is soft enough to prevent injury.  In fact, it's nearly mattress-like in its sponginess.  You give a futile half-struggle before the spider hits you with another wave of webbing, completely gluing you down in an impenetrable mass of white stickiness.  You can't help but notice that she's avoided your groin, face, and ${this.chestDesc()} entirely.\n\n`,
                false,
            );

            this.outx(
                '"<i>Just one more for safety,</i>" coos the spider with a hungry, almost feral look in her eye.  Her carapace-clad knees knock together and she grunts softly before spraying one last layer of her web atop you.  She climbs on to you now that her task has been finished and explains, "<i>We wouldn\'t want my skin to get stuck to the sticky web while we\'re fucking, now would we?</i>"  You nod, a little worried about your position for the first time.\n\n',
                false,
            );

            this.outx(
                'The arachnid-girl smirks, her face taking on a cruel, predatory cast as she says, "<i>You\'re going to service me and love it.</i>"\n\n',
                false,
            );
        }
        // (Combat Intro: HP)
        else if (this.player.HP < 1) {
            this.outx(
                "You drop to the ground, utterly defeated and unable to resist the cruel spider-kin's intentions any longer.  She kicks you in the side, the hard carapace of her foot digging into you quite painfully.  Rolling onto your back from the impact, you look up at her with fear in your eyes as she deftly removes your equipment.  She turns about, takes a slow, sensuous step back, and begins wiggling her sizable backside at you, almost teasing you with it.  You take the moment to get a better look at her, and your eyes trace up her lissom, carapace-coated legs to her heart-shaped ass before finally settling on the bobbing, heavy weight of her abdomen.\n\n",
            );

            this.outx(
                "As you watch, a number of spinnerets become quite visible, poking up from recessed holes in the carapace.  They pulsate and squirm in perfect sync for a few moments, readying the webbing until they're ready to disgorge it.  As one, they spray out a wave of white, sticky webbing.  It splatters over you and pins you to the ground beneath its weight.  You try to rise, but between your wounds and the sticky, gossamer fibers, you're already completely immobilized.  A second fibrous thread coats the first, and you note that the new layer has a different consistency than the first.\n\n",
            );

            this.outx(
                'The victorious spider muses, "<i>We wouldn\'t want me to get stuck on my own web while I rape you, now would we?</i>"\n\n',
                false,
            );

            this.outx(
                `Knowing that she plans to force herself on you, you can't help but become aroused by the notion of the curvy spider-vixen riding your face while her smooth carapace clenches around your head.  You shake the thought away, but she sees your distraction and begins to trace a pointed fingertip around one of your ${this.nippleDescript(
                    0,
                )}s before asking, "<i>Oh, are you ready for the sex already?  It's been so long that I was going to savor this, but I suppose we should get started.</i>"\n\n`,
                false,
            );
        }
        // (Combat Intro: Lust Loss)
        else {
            this.outx(
                `You drop to the ground and begin to furiously finger your ${this.vaginaDescript(
                    0,
                )}, arching your ${this.hipDescript()} as the aching need for sexual contact overpowers your inhibitions.  `,
            );
            if (this.player.hasCock())
                this.outx(
                    `${this.SMultiCockDesc()} flop about lewdly, leaving trails of pre-cum everywhere that they touch.  `,
                );
            this.outx(
                "The spider-girl looks down at your prone, masturbating form and slowly begins to diddle her own needy box.  She turns about and spreads her legs, never slowing in her ministrations.  Her pale, heart-shaped ass begins to bob from side to side in time with her fingering, frequently eclipsed by the heavy weight of her spider-like abdomen.\n\n",
            );

            this.outx(
                "Numerous protrusions bulge up from the spherical, arachnid organ, each engorging and twisting slightly in perfect sync with each other.  In truth, you barely notice as you're too focused on the steamy wet delta of her sex to care about her weird spider-bits.  Unfortunately, each of those spinnerets unloads its webbing at you in a wave, pulling your hands away from your sex and completely pinning you to the ground.  You struggle futilely, desperate to get a finger back in your aching box, but the sticky threads hold fast, immobilizing you.  They repeat their contortions again, and a moment later you're buried further under the gossamer threads.\n\n",
            );

            this.outx(
                'The arachnid woman approaches and delicately plucks at the taut webbing as she muses, "<i>We wouldn\'t want my delicate skin to get caught on these sticky threads, now would we?</i>"\n\n',
                false,
            );

            this.outx(
                `You wonder what she has in store for you, momentarily distracted from the boiling need at your core by the gnawing fear in your belly.  Reading your expression, the spider-girl laughs and begins to trace a circle around your ${this.nippleDescript(
                    0,
                )} while she explains, "<i>Why would I want to eat you my dear?  I have a... different sort of hunger I intend to have you sate.  Though perhaps I can find something to eat down here.</i>"  She rubs a knuckle over your exposed sex, making you moan in frustration.\n\n`,
                false,
            );
        }
        // START FUNFUNSEXYTIMES)
        this.outx(
            `The spider-morph licks her lips and rubs her hands over her ass and abdomen, moaning lewdly as she gives in to her long-neglected sexual needs.  Narrowing slightly, her glittering purple eyes lock onto your exposed ${this.nippleDescript(
                0,
            )}s.  The spider-girl purses her reflective black lips into a seductive pucker a moment before devouring one of the pointy areola.  You feel the tips of her fangs against your skin, scraping tiny, venom-filled furrows into your flesh`,
        );
        if (this.player.biggestLactation() >= 1)
            this.outx(" with each draught of milk that she pulls from your lactating breasts");
        else this.outx(" with each fruitless, nipple-engorging suckle she gives you");
        this.outx(".\n\n");

        this.outx(
            `You wriggle underneath your spidery dominatrix, helplessly caught within her web while she torments each of your ${this.nippleDescript(
                0,
            )}s.  Your lust builds ever higher, and while your loins ache for the slightest touch, she tactfully avoids your `,
        );
        if (this.player.wetness() < 3) this.outx("moist");
        else if (this.player.wetness() < 5) this.outx("drooling");
        else this.outx("gushing");
        this.outx(
            " nether-lips, leaving them to stew in their own juices.  You moan, unable to remain silent under such stimulation.  The lusty arachnid-girl finally pops off your puffed-up nipples and looks up past the red scratches to your face.\n\n",
        );

        this.outx(
            `"<i>Delicious!  Now to get you ready,</i>" she says with a smug grin.  You groan your frustration, but your voice is thrown up a few octaves when she sinks over an inch of her needle-like fangs into your breast.  Venom boils into your pierced flesh, the hot drug burning through your veins as your body spreads it throughout all its extremities. Your ${this.player.skin()} flushes, and though you didn't think it possible, your ${this.vaginaDescript()} gushes out a veritable flood of slick girlcum that turns the pearly threads a damp gray.  The air stinks with the heady aroma of puddling girl-lust, and you instinctively hump against your bindings, the restraints turning your motions into little more than pathetic, repetitive muscle twitches.\n\n`,
            false,
        );

        this.outx(
            "The spider-girl pulls back and admires her handiwork for a moment before she repeats the action on ",
        );
        if (this.player.biggestTitSize() < 1) this.outx("the other side of your chest");
        else if (this.player.totalBreasts() == 2) this.outx("your other breast");
        else this.outx("another one of your many breasts");
        this.outx(
            ".  By now, your body is thrumming with sexual need and even the pain of her fangs penetrating your flesh registers as nothing more than a burst of masochistic pleasure.  A ",
        );
        if (this.player.wetness() >= 4) this.outx("gush");
        else this.outx("tiny squirt");
        this.outx(
            ` of girl-cum splatters out of your ${this.vaginaDescript()}, the poor, aphrodisiac-laden box having a tiny orgasm from the liquid lust the spider is dumping into your veins. You don't even try to stifle the needy whines you're making anymore, resorting to moaning like a wanton slut... anything to entice the spider to hurry up and fuck you already.\n\n`,
            false,
        );

        this.outx(
            'The monster-woman lays her hand across your mons to feel your warm need spill out between her fingers, the liquid lust making her smooth, black carapace glitter darkly in the muted, swampy sunlight.  She announces, "<i>I think my play-toy is ready,</i>" with a throaty purr.\n\n',
            false,
        );

        this.outx(
            "Chitinous knees sink into the web and loam around your head, and the large black sphere of the spider's abdomen blocks the light, forcing your eyes to adjust to the shade between the arachnid-woman's legs. Now that you can get a look, you truly examine the spider-girl's box.  Unlike the rest of her pale skin, the spider-girl's sex is dark as midnight and shining with feminine moisture, the flesh around it fading to a dusky color as it slowly blends back into her near-porcelain complexion.\n\n",
        );

        this.outx(
            'She rubs a finger between your lips to get at your puddling lady-spunk and asks, "<i>Like what you see?  Well if you want me to do any more, you had better start licking, because I\'ll keep injecting you with more venom until you get me off!</i>"\n\n',
            false,
        );

        this.outx(
            `To emphasize her point, the spider-girl bites down on your ${this.player.leg()} and squirts a fresh load of her overwhelming, sexual venom deep inside you.  Another squirt gushes out, soaking the dominatrix's fingertip, and you pant and beg for release, knowing you'll do anything she asks at this point.  In response, the exoskeleton-covered legs spread further apart, lowering those midnight lips close enough to be within easy licking distance.  The first bead of moisture drops down to splat on your lips, and you lick it off unthinkingly, getting your first taste of your spidery mistress.\n\n`,
            false,
        );

        this.outx(
            "The arachnid sex tastes... sweet - unnaturally so, almost cloying in its intensity.  You lean up to lick at her slimy black box, and as soon as you make contact with her oozing nether-lips, her legs give out, dropping her weight fully on to you and smothering you in her honey-dripping cunt.  Grunting in discomfort from the change in pressure, your aphrodisiac-addled mind remembers that licking her pussy will get you release.  You thrust your tongue forward with every ounce of your strength, burying ",
        );
        if (this.player.tongueType == TONUGE_SNAKE)
            this.outx(
                "the snake-like length the whole way into her womb, slithering right past her cervix.",
            );
        else if (this.player.tongueType == TONUGE_DEMONIC)
            this.outx(
                "the massive, demonic length into her vagina, curling it around the walls and stroking them all with even motions.",
            );
        else
            this.outx(
                "all of your length as deep into her passage as possible, licking and lapping at it in an orgasm-seeking frenzy.",
            );
        this.outx(
            "  The hard nub of her clit bumps your lower lip, and you start to open and close your jaw as fast as possible to stroke that tiny pleasure-organ off.\n\n",
        );

        this.outx(
            "Your arachnid mistress rocks her hips against your face, her asscheeks and weighty abdomen utterly enveloping the rest of her visage as she rides your mouth like her own personal pleasure rodeo.  Her fem-spooge slowly fills your cheeks, and you hum in pleasure at the almost sickeningly-sweet taste while you gulp it down in between your oral assaults.  Her box becomes your focus, the absolute meaning for your life, while her hips and thighs replace the rest of the world. You feel her begin to masturbate you with the hard, unforgiving chitin of her digits, relenting every time you slow even the slightest amount, and you fuck her with your mouth, constantly trying to do more and more, a complete slave to your mistress' whims.\n\n",
        );

        this.outx(
            `Once again, fangs stab deep into your ${this.player.legs()}, not too far from the last injection, stoking the sexual need to levels you can't even comprehend.  You twist and scream, babbling in bliss and agonizing need, but restrained as you are, it's a pointless endeavor.  The spider-girl slaps your vulva with one hand each time she withdraws her finger, teasing you even as your pussy works to turn the swamp into a lake full of girl-cum.  The shining legs clamp about your head and push you harder into her climaxing cunt, a veritable flood of spider-spunk gushing into your mouth while her tunnel clamps and squeezes your tongue.  The dick-milking contractions threaten to crush your tongue completely!\n\n`,
            false,
        );

        this.outx(
            `Throughout it all, the fingertip in your ${this.vaginaDescript()} sits idle, not even bothering to provide the slightest stimulation.  Her lack of attention leaves you to thrust and push at your restraints futilely while your face is fucked by the sweet, sweet spider-puss.  You cry out in frustration, the scream of anguish only vibrating the dominatrix's clit that much harder, prolonging her orgasm even further.  The puffy black lips squelch noisily on your ${this.player.face()} a few moments longer, before they finally depart with a messy scchhhhhlick.\n\n`,
            false,
        );

        this.outx(
            "You cry and beg for release, but the shuddering spider-morph's only answer is a languid bite on your arm, pumping a fresh batch of her lust-inducing toxins into your body.  Once finished with your latest cunt-flooding injection, she asks, \"<i>Why do all that work when I can just keep biting you until you're sitting here creaming my web for hours?</i>\"\n\n",
        );

        this.outx(
            `Each of her love-bites hurts less than the last, completely replacing the sensation of pain with agonizing pleasure.  Your ${this.vaginaDescript()} grows so sensitive that you can feel each of the puffed up, soaked lips rubbing against the other with every contraction and twitch that ripples down your ${this.player.legs()}.  The sated arachnid woman brushes her hand over your sweating forehead as she whispers, "<i>Shhhh, one more bite ought to give you some release.</i>"\n\n`,
            false,
        );

        this.outx(
            "Her fangs sheath themselves in your neck, pouring the potent aphrodisiacs straight into your arteries and setting off fireworks of pleasure in what's left of your psyche.  Your pussy throbs and ",
        );
        if (this.player.wetness() >= 5) this.outx("erupts like a fountain, spraying over and over");
        else this.outx("puddles juice on the ground over and over");
        this.outx(
            ", each climax triggering off the contractions of the previous until your eyes roll back, your mouth drapes open, and you moan in mindless, absolute pleasure.  You cum, and cum, and cum for what seems like hours, and though you feel the taste of the spider's pussy on your lips a few more times, your mind is too busy drowning in bliss to record anything more than tiny, fragmented bursts of sensation into your memory.\n\n",
        );

        this.outx(
            "During your dreamless sleep, your body registers the feeling of your restraints being removed, but you slumber on, completely unaware.",
        );
        // [end]
        this.player.orgasm();
        this.dynStats("lib", 2, "sen", 1);
        if (!this.getGame().inCombat) this.doNext(this.camp.returnToCampUseOneHour);
        else this.cleanupAfterCombat();
    }

    // *Defeat Male
    private spiderMorphFemaleRidesACawk(): void {
        // *SUMMARY:  PC is tied down and has a web-condom sprayed around their dick, then a webbing cock-ring.  The PC is then ridden hard, bit numerous times, and never able to cum until pain lances through his (balls/cock) from the lack of release.  Finally, she bites PC's neck and the PC cums, inflating web-condom of various size.
        this.outx("", true);
        this.spriteSelect(73);
        let x: number = this.player.cockThatFits(this.monster.vaginalCapacity());
        if (x < 0) x = 0;
        // (Noncombat Intro:)
        if (!this.getGame().inCombat) {
            this.outx(
                `You shuck your ${
                    this.player.armorName
                } and toss it aside, feeling ${this.sMultiCockDesc()} `,
            );
            if (this.player.lust < 70)
                this.outx(
                    "twitch and begin to stiffen in anticipation of sex with the beautiful spider-maid.",
                );
            else
                this.outx(
                    "twitch, already hard and aching for the touch of the beautiful spider-maid.",
                );
            this.outx(
                '  Striding forward, you close to an arms-length away before she stops you with an outstretched palm.  She says, "<i>Not yet, lie down over there so I can take you properly.</i>"\n\n',
                false,
            );
        }
        // (All:)
        if (!this.getGame().inCombat)
            this.outx("You shrug and step back to lay down in the soft moss,");
        else if (this.player.HP < 1) this.outx("You collapse into the soft moss,");
        else this.outx("You collapse into the soft moss and begin to masturbate,");
        this.outx(
            " sinking slightly into it while you watch the arachnid woman turn around and begin to shake her cute backside at you.  It sways entrancingly, the hefty weight of her large abdomen bobbing past with each shake to momentarily obstruct your view.  As you watch, a number of protuberances on the abdomen twist and writhe for a half-second before spraying out a huge quantity of sticky webbing.  It hits you like a hammer, knocking you completely flat and plastering your naked form to the dirt.",
        );
        if (this.player.lust > 99)
            this.outx(
                "  One of the gossamer strands hits your arm hard enough to rip it away from your groin, and you're left pinned down, unable to touch yourself.",
            );
        this.outx(
            "  Once it finishes, you find that your head, chest, and crotch were all left uncovered by the sticky strands.  She unleashes another burst of pearlescent webbing to coat the first, and you're left completely, utterly restrained.\n\n",
        );

        this.outx(
            '"<i>Perfect, now that you\'re nice and comfortable, we can have sex!</i>" decrees the ',
            false,
        );
        if (this.getGame().inCombat) this.outx("victorious arachnid.");
        else this.outx("arachnid with a dangerous gleam in her eyes.  Why did you agree to this?");
        this.outx("\n\n");

        this.outx(
            "Once again, the inhuman brunette turns around, bobbing her ass above your prone body, and unconsciously, ",
        );
        if (this.player.lust >= 80)
            this.outx(
                "you thrust up as if you could somehow mate with her vagina in spite of your restraints",
            );
        else this.outx("you grow harder and harder, entranced by the sexy sight");
        this.outx(
            `.  She giggles at you before squirting another few strands of webbing at you, this time directly at your ${this.cockDescript(
                x,
            )}.  It sticks snugly around the `,
        );
        if (!this.player.hasSheath()) this.outx("base");
        else this.outx("sheath");
        this.outx(", a tight ring that holds your dick immobile in its vice-like grasp.  ");
        if (this.player.cockTotal() > 1) {
            this.outx("She makes ");
            if (this.player.cockTotal() == 2) this.outx("a similar ring");
            else this.outx("similar rings");
            this.outx(" for your other penis");
            if (this.player.cockTotal() > 2) this.outx("es");
            this.outx(" as well, making sure you'll be completely bound.  ");
        }
        this.outx(
            `You wince from the onset of tightness and wonder if you'll be able to cum like this, but she immediately shoots out more of her silky strands, sealing a perfect sheath of non-sticky fibers around your ${this.cockDescript(
                x,
            )}, anchored to the ring.\n\n`,
            false,
        );

        this.outx("\"<i>We wouldn't want me to get pregnant from a ");
        if (this.player.spiderScore() < 4) this.outx("beast's seed");
        else this.outx("strange, itinerate spider's seed");
        this.outx(
            ', would we?</i>" asks your captor.  Your eyes go wide, and you start to plead with her, but she quickly muffles you with a spray of webbing that blocks your mouth, but leaves your nose open.  A carapace-covered hand',
            false,
        );
        if (this.player.cockTotal() > 1) {
            this.outx(" pushes past your other dick");
            if (this.player.cockTotal() > 2) this.outx("s");
            this.outx(" and");
        }
        this.outx(
            " caresses the poor, bound cock as she looks down at you, a cruel smile spreading over her face as her violet-hued eyes bore into yours.\n\n",
        );

        this.outx(
            `"<i>How does it feel, having your dick bound and useless, cradled in a spider-woman's slippery grip?  I bet you can feel perfectly through those nice, thin webs I used to make your condom can't you?  Well don't spurt.  I'm going to be using this,</i>" teases the spider-woman, emphasizing the last of her words with a gentle slap at your ${this.cockDescript(
                x,
            )}.\n\n`,
            false,
        );

        this.outx(
            `You groan at the treatment, struggling against your bonds, but it's utterly futile.  You're bound from your ${this.player.feet()} to your neck in the stuff, and you won't be getting loose from the iron-strong strands at this rate.  The spider-woman interrupts your struggles by straddling your waist and giving you a perfect view of her shining, black snatch.  Her puffy lips practically ooze moisture, looking almost like someone oiled them up before your encounter, but with the strong female scent pouring off them, there's no way that's anything but a reflection of her needy, aroused state.  The black flesh fades to a dusky color before merging into the pale skin around them, highlighting her vulva like the perfect target for you to plunge into.  Sadly, there's nothing for you to do but wait.\n\n`,
            false,
        );

        this.outx(
            `The arachnid-girl begins to lower herself down, but pauses and shifts once she brushes your ${this.cockDescript(
                x,
            )}.  With the change in angle, her lips slide over your silk-girded penis, slathering the smooth cocoon with wetness that you can somehow feel through it.  She leans forward, placing her hands to either side of your torso and letting her unrestrained breasts bounce above you, the dark nipples `,
        );

        if (this.player.biggestTitSize() >= 2)
            this.outx(`dragging over your own ${this.nippleDescript(0)}s`);
        else this.outx("hovering just above your chest");
        this.outx(
            ".  The spider-maiden seem to tire of the teasing once you begin to twitch against her.\n\n",
        );

        this.outx(
            `"<i>Are those pathetic twitches all you can give me?  I'll have to fix that,</i>" proclaims your arachnid lover.  She leans further down to kiss your ${this.chestDesc()}, then a moment later opens wider and bites down, hard.  Her fangs slide into your flesh with minimal resistance, narrow enough that it feels more like a pinch than anything truly painful, but then her venom begins to flow.  You feel it forcing its way into your veins, burning hotly as the foreign fluid permeates your very being.  Starting at the site of her bite, the heat spreads outward slowly, slowly shifting from boiling discomfort to the fiery blaze of arousal.  Your ${this.cockDescript(
                x,
            )} begins to pulse in time with your heartbeat under its wrappings, actually starting to ache with need.`,
        );
        if (this.player.cockTotal() > 1) {
            this.outx("  Meanwhile, your extra penis");
            if (this.player.cockTotal() > 2) this.outx("es");
            this.outx(" drool");
            if (this.player.cockTotal() == 2) this.outx("s");
            this.outx(" pre-cum, but ");
            if (this.player.cockTotal() == 2) this.outx("is");
            else this.outx("are");
            this.outx(" completely ignored.");
        }
        this.outx("\n\n");

        this.outx(
            `Your dick is suddenly grabbed in the vice-like grip of the carapace and shoved directly into the wet, velvet grip of the spider-girl's vagina.  The sudden change in temperature and pressure is too much for your venom-filled body, and you start to cum immediately.  You feel the jizz boiling up through your body, but the tight ring of silk around your ${this.cockDescript(
                x,
            )} pens it in, preventing you from achieving even the smallest release.  It actually hurts you to be stopped so suddenly.  The spider notices your expression and smirks, tracing her fingertips along the side of your ${this.player.face()} as she says, "<i>Aww, I couldn't have you going soft yet.  Maybe if you're good and completely sate me, I'll let you cum later on.</i>"\n\n`,
            false,
        );

        this.outx(
            `A tortured groan is your only response - how are you supposed to satisfy a woman when you can't even move and you're constantly on the edge of orgasm, but unable to achieve it?  Her clutching womanhood squeezes you particularly hard, shattering your concentration and reminding you of the unnatural sexual desire coursing through your body.  The spider-girl fucks you hard and fast, slapping noisily into your bound ${this.hipDescript()} repeatedly while she massages one of her breasts and tweaks at her nipple.\n\n`,
            false,
        );

        this.outx(
            `You cum again, just like last time, but the only thing it brings you is pain and the agony of pent-up release.  That tortuous vice... it squeezes and caresses, egging you on to release, but you know release will only bring pain and frustration.  You try to hold it back, holding your feverish body absolutely still while you're raped by the ecstatic bug-bitch, but it's impossible.  She's moving too fast, and her pussy is far too hot for your ${this.cockDescript(
                x,
            )} to last.  Your eyes cross from the effort of it all, and then she's cumming, and the rippling, milking squeezes of her pussy force you to cum on the spot.\n\n`,
            false,
        );

        this.outx(
            `Your entire body locks up, pushing up with every ounce of muscle while your body tries to squeeze out the pent-up seed.  There's a snapping, tearing sound from the web-ring around your ${this.cockDescript(
                x,
            )}, and you feel it loosen somewhat - not completely, but just enough for your seed to finally escape!  It pumps out in huge globules, at last granting you the sweet feeling of absolute, penultimate release.  Spooge bubbles from your urethra, packing the condom with multiple loads worth of goo until it balloons out, filling the spider-slut's vagina.\n\n`,
            false,
        );

        this.outx(
            "She rolls off of you, letting the slowly inflating cum-balloon pop out of her snatch while she gasps and tries to regain her breath.  You moan, still locked in orgasm while you force out every last goopy drop of your jism.  The balloon grows and grows until it stops, nearly as big around as ",
        );
        if (this.player.cumQ() < 25) this.outx("a baseball");
        else if (this.player.cumQ() < 100) this.outx("a grapefruit");
        else if (this.player.cumQ() < 400) this.outx("a basketball");
        else if (this.player.cumQ() < 700)
            this.outx("a watermelon, dragging your dick down under its massive weight");
        else if (this.player.cumQ() < 1500)
            this.outx("an exercise ball, smothering you under the web-wrapped cum");
        else
            this.outx(
                "a person, completely covering you before it finally bursts and drenches everything in the area with your copious cum",
            );
        this.outx(".\n\n");

        this.outx(
            "Finally at peace, you go limp in the bonds, slipping into a deep slumber.  During your dreamless sleep, your body registers the feeling of your restraints being severed.",
        );

        this.player.orgasm();
        this.dynStats("lib", 2, "sen", 1);
        if (!this.getGame().inCombat) this.doNext(this.camp.returnToCampUseOneHour);
        else this.cleanupAfterCombat();
    }

    // *Defeat Male - Too Big
    // Summary: web-spooling around dick, then webjob.
    private femaleSpiderMorphTooBigWebRape(): void {
        this.outx("", true);
        this.spriteSelect(73);
        let x: number = this.player.cockThatFits(this.monster.vaginalCapacity());
        if (x < 0) x = 0;
        // (Consensual)
        if (!this.getGame().inCombat) {
            this.outx(
                `You hastily remove your ${
                    this.player.armorName
                } and toss it aside, glad to be able to let ${this.sMultiCockDesc()} flop out and breathe.  The spider-girl's eyes widen as she takes in ALL of your `,
            );
            if (this.player.lust < 70) this.outx("expanding");
            else this.outx("hard");
            this.outx(
                " length.  Her expression of incredulous disbelief is actually kind of cute, so you start stroking yourself to make it even bigger.\n\n",
            );

            this.outx(
                `"<i>W-wow, you're a big ${this.player.mf(
                    "boy",
                    "girl",
                )}, aren't you?  Why don't you lie down and get comfortable while I get you restrained... I wouldn't want that beast between your legs to kill me!</i>" she says.\n\n`,
                false,
            );

            this.outx(
                `You lay down, quite confident in your plus-sized erection and daydreaming about all the ways she could take you.  Is she going to thigh-fuck you?  Maybe she'll give you a hand-job with that slippery-smooth carapace of hers?  Of course, you suppose she could always just grind her gorgeous little gash on your mammoth manhood.  ${this.SMultiCockDesc()} drips a nice, fat drop of pre-cum from its slightly-dilated slit at its ${this.player.cockHead()} from all your dirty thoughts.  The wet droplet reminds you of where you are, and you look up in time get a nice view of the pale woman's well-rounded ass as it shakes back and forth, jiggling slightly while her abdomen sways heavily above it.\n\n`,
                false,
            );

            this.outx(
                `All over the spherical, arachnid organ, her spinnerets engorge, becoming more visible.  They twist for a moment before spurting out heavy flows of webbing, the weighty strands coating your ${this.player.legs()}, arms, parts of your torso , and even your ${this.player.feet()}.  The only places left totally uncovered are your head and crotch.  A second blast of smooth, non-sticky threads encase the first, making sure your lover won't get stuck to you once things get intimate.  The spider-maid giggles as she saunters up to get a closer look at your ${this.cockDescript(
                    x,
                )}`,
            );
            if (this.player.cockTotal() > 1) this.outx(", ignoring the other, smaller members");
            this.outx(
                ".  She asks, \"<i>This is your pride and joy, isn't it?  Well, I don't have much use for such a bulky thing, but if you eat me out good enough, maybe I'll see if its orgasm is as impressive as its size.</i>\"\n\n",
            );
        }
        // (COMBAT LOSS)
        else {
            this.outx("You drop to the ground and ");
            if (this.player.lust > 99)
                this.outx(
                    `stick your hands into your groin, fondling ${this.oMultiCockDesc()} with need`,
                );
            else this.outx("groan in obvious pain, unable to move");
            this.outx(
                `.  The spider-girl advances, giggling girlishly at your state while she painstakingly removes every piece of armor, visibly gasping at the size of your ${this.cockDescript(
                    x,
                )} as it flops out.\n\n`,
                false,
            );

            this.outx(
                '"<i>T-this is so big!  I\'ll never be able to ride this monster... maybe you can help me in another way though,</i>" she muses.\n\n',
                false,
            );

            this.outx(
                `Before you can react, the spider-woman turns around and presents her pert ass to you, allowing you to follow the hypnotic swaying of her cheeks and the heavy, pendulous bounces of her abdomen as it bounces above.  As one, you see numerous spinnerets emerging from small gaps in the exoskeleton.  They rapidly engorge, filling and bulging slightly before they twist and unleash a wave of sticky cargo in your direction.  Webs splatter into you hard, pinning your ${this.player.legs()} and arms flat against the ground before binding your neck, torso, and even your ${this.player.feet()} under the imprisoning silk.  A second blast of smooth, non-sticky threads encase the first, making sure the victor won't get stuck while taking advantage of her prey.\n\n`,
                false,
            );

            this.outx(
                "The spider-girl asks, \"<i>You don't mind if I don't waste my time trying to fuck this, do you?  It's so big that it's worthless as a dick, and more like an obscene toy than anything practical.  Maybe if you please me enough I'll still let it squirt though.</i>\"\n\n",
            );
        }
        // (All)
        this.outx(
            `You start to protest, but the dominatrix squats down, resting the smooth carapace of her abdomen directly on top of your ${this.cockDescript(
                x,
            )}, squishing the urethral bulge flat under its weight.  She sighs and rocks her hips back and forth, dragging the weighty bulb back and forth over your dick with slow, teasing motions that cause the poor member to rapidly fill to its maximum, twitching size.  Looking quite satisfied, she announces, "<i>That's a good ${this.player.mf(
                "boy",
                "girl",
            )}.  Now to knit a nice, soft, little cock-sock to muzzle this beast.</i>"\n\n`,
            false,
        );

        this.outx(
            `Immediately, smooth silk strands start to slide out from her spinnerets, sliding in long loops around your ${this.cockDescript(
                x,
            )} until the top third of it is completely covered.  You realize that unlike the webs pinning you down, these gossamer threads don't stick at all, and while the wonderfully soft cock-sock she's weaving feels quite tight, it easily flexes and slides a little bit each time it's touched.  That wonderful encapsulation continues, binding every inch of your dick in a tight alabaster sheath until there's not a single speck of your skin visible.  The spider-girl stands and rubs the warm webs up and down, masterbating you with the silken tube a few times until you start to groan in pleasure.\n\n`,
            false,
        );

        this.outx(
            'The female arachnid stops and announces, "<i>No cumming yet my cute, big-dicked prey.  You still need to service me, remember?</i>"  You grunt and try to twist upward and push your bound penis up into her hands again, but the enveloping, sticky mess of her webbing keeps you pinned totally in place, unable to raise your hips even an inch.  While you struggle, she changes position to bring herself above your face.  Her abdomen blocks much of the light from your view, but you can see her tight, dark ring and black-skinned, glistening sex in startling detail from your submissive position in the dirt.\n\n',
            false,
        );

        this.outx(
            `Your arachnid mistress doesn't delay, sitting down to place her squishing-wet lips in position to brush against your mouth and nose while her smooth, nearly porcelain-white cheeks envelop most of your face.  Dully, you note the weight of her abdomen resting atop your head, and you hope that she doesn't web your face once she's done.  She wouldn't do that, would she?  Before you have time to ponder the situation further, you feel two hard nipples grazing your ${this.cockDescript(
                x,
            )} and belly.  Two dagger-sharp points bury themselves in your thigh, and a moment later, liquid arousal is thrumming through your veins, making your dick slowly fill the space inside its sheath with a steady dribble of pre-cum.\n\n`,
            false,
        );

        this.outx(
            'Pulling out, the spider-woman slaps the fresh wound and demands, "<i>Lick me, my deliciously-dicked morsel!  Pleasure me or I\'ll keep biting you until you obey!</i>"\n\n',
            false,
        );

        this.outx(
            "You're already shivering and panting with need, exhaling hot lungfuls of air onto the moist spider-snatch as you try to get ahold of yourself.  More bites... there's no way you could handle being that turned on and not getting ANY relief.  You tilt your head to press your lips into the sloppy vulva and extend your tongue for the first, hesitant taste of her feminine drippings.  They're sweet!  Her pussy is like honey, almost sickeningly sweet, like a slowly dripping fountain of sugar that makes your tongue buzz in delight with each plunge into the syrupy muff.\n\n",
        );

        this.outx(
            `"<i>Oooh, that's right, my little insect, keep licking... service me, your mistress,</i>" commands the spider-girl while she takes your web-wrapped cock in her hands.  After being ignored for so long, the touches of her slender digits upon your ${this.cockDescript(
                x,
            )} provide a cacophany of sensation that makes your head swim.  Eager for more rewards, your tongue attacks the sloppy puss above with almost religious fervor, worshipping the dripping pussy with long licks while you gently suckle the tiny bulb of her clit.  The spider-girl begins to slowly jack you off with the pre-cum-soaked sheath, the warm, wet tightness of it feeling like a huge pussy sliding along your girth.  She pumps it up and down, fucking you with her webs to the tempo of your thrashing tongue.\n\n`,
            false,
        );

        this.outx(
            `The faster you go, the faster she jerks you with the webs.  Soon both of you are breathing hard, gasping out nonsense noises of pleasure, and drizzling your lusty fluids freely.  The fast pumping, slippery web-pussy bunches up around your base, pulling tight at your tip with every downstroke, and with each upstroke, it creates a small vacuum, sucking on your cock while it exposes a little of your flesh to the air.  It feels wondrous, and though you're utterly and completely bound, the muscles of your ${this.hipDescript()} continually thrust and buck against their restraints, trying to rut with the gossamer sleeve like some unthinking beast.\n\n`,
            false,
        );

        this.outx(
            "A splash of candy-sweet syrup bursts onto your tongue, and then the plush black spider-cunt is being mashed down into your face hard enough to cut off your breathing.  The motion leaves you with nothing to do but lick at the spasming passage while it squirts feminine fluids all over your face.  You lick and swallow, mewling piteously into the sweet snatch while your own orgasm slowly builds from the slippery-tight embrace of your mistress's sensuous webs.  Spooge bursts from your massive cum-slit, spurting hard enough to distort the webs and create a bubble of cum atop your cock.  You gulp down another helping of lady spunk, and then the next pulse of seed pumps into the bubble, making a nice rounded cum-pouch atop your silken condom.  You cum over and over, pumping up the little balloon until your ",
        );
        if (this.player.balls == 0) this.outx("body is completely empty");
        else this.outx("balls have completely emptied");
        this.outx(".\n\n");

        this.outx(
            "Suddenly, the focus of your attention pulls away with a wet schlick, leaving you to draw huge breaths of pussy-scented air and see your dick for the first time in a while.  It's a mess.  There's ",
        );
        if (this.player.cumQ() < 50)
            this.outx(
                "an apple-sized lump of cum on the tip of it, filled full of your submissive seed.",
            );
        else if (this.player.cumQ() < 300)
            this.outx(
                "a grapefruit-sized bubble of cum on the tip of it, filled full of your submissive seed.",
            );
        else if (this.player.cumQ() < 700)
            this.outx(
                "a basketball-sized balloon of cum at the tip of it, weighing you down and filled with a huge amount of your submissive seed.",
            );
        else if (this.player.cumQ() < 1000)
            this.outx(
                "a watermelon-sized balloon of cum at the tip of it, resting heavily atop your belly and sloshing with all the submissive seed you pumped into it.",
            );
        else if (this.player.cumQ() < 2000)
            this.outx(
                "an exercise-ball sized mass of cum hanging from the tip of it, drooping over your body and sloshing wetly with all the submissive seed you pumped into it.",
            );
        else {
            this.outx(
                "a person-sized mass of cum hanging from it, draped over you and filled with all the submissive seed you pumped into it.",
            );
            if (this.player.cumQ() >= 4000)
                this.outx(
                    "  It pops, too weak to contain all that liquid pressure, soaking the both of you with your spunk!",
                );
        }
        this.outx(
            "  You sigh and fall into a fitful slumber, barely registering the spider-girl cutting your restraints.",
        );
        this.player.orgasm();
        this.dynStats("lib", 2, "sen", 1);
        if (!this.getGame().inCombat) this.doNext(this.camp.returnToCampUseOneHour);
        else this.cleanupAfterCombat();
    }

    public loseToFemaleSpiderMorph(): void {
        if (this.player.hasCock()) {
            if (this.player.cockThatFits(this.monster.vaginalCapacity()) == -1)
                this.femaleSpiderMorphTooBigWebRape();
            else this.spiderMorphFemaleRidesACawk();
        } else if (this.player.hasVagina()) this.defeatFemale();
        else {
            this.outx(
                "The spider-girl knocks you out, muttering something about 'genderless freaks' the entire time.",
                true,
            );
            this.cleanupAfterCombat();
        }
    }

    // *Victory Intro
    public defeatASpiderBitch(): void {
        this.outx("", true);
        this.spriteSelect(73);
        this.outx("The spider-girl drops to her knees and wobbles unsteadily");
        if (this.monster.lust > 99)
            this.outx(
                ', thrusting two of her carapace-covered finger-tips deep into her sloppy box as she gives into her lust.  She actually has the temerity to demand, "<i>Fuck me, fuck me now!</i>"',
                false,
            );
        else this.outx(", too wounded to fight back or run away.");
        if (this.player.lust >= 33 && this.player.gender > 0) {
            this.outx("\n\nWhat do you do to her?");
            let scissor;
            let pussyFuck;
            let analFuck;
            if (this.player.hasVagina()) scissor = this.fSpiderMorphRape;
            if (this.player.hasCock()) {
                if (this.player.cockThatFits(this.monster.vaginalCapacity()) != -1)
                    pussyFuck = this.fSpiderMorphRapeDude;
                else this.outx("  <b>You don't have a dick small enough to fuck her vagina.</b>");
                if (this.player.cockThatFits(this.monster.analCapacity()) != -1)
                    analFuck = this.evilSpiderGirlVictoryAnal;
                else this.outx("  <b>Her ass is too tight for you to fit inside.</b>");
            }
            // prettier-ignore
            this.choices(
                "Fuck Ass", analFuck,
                "Fuck Pussy", pussyFuck,
                "Scissor", scissor,
                "", undefined,
                "Leave", this.cleanupAfterCombat,
            );
        } else this.cleanupAfterCombat();
    }

    // *Victory Female
    // *Summary: Make her bite herself in the tit and inject aphrodisiac venom, then scissor (or brief clit-fuck)
    private fSpiderMorphRape(): void {
        this.outx("", true);
        this.spriteSelect(73);
        this.outx(
            `You laugh at her and push her down with your ${this.player.legs()}, enjoying the view of the pale maiden's unblemished skin and dark, fetishy-looking exoskeleton when she bounces in swamp loam.  Her legs scissor closed nervously, a weak effort to conceal her sex from you`,
        );
        if (this.player.lust > 99)
            this.outx(", even as her fingers continue to work her slick lips relentlessly");
        this.outx(
            ".  You slap her hands away and pry her legs open, getting a nice, close look at her vagina.\n\n",
        );

        this.outx(
            "Her pussy is dark, like her nipples, though the lips of her sex are closer to a pure midnight-black than the dusky skin of those tiny nubs.  A sheen of feminine lube has built up over her vulva, making her outer labia and skin glisten noticeably in the muted sunlight that filters down to the swamp floor.  Around her vagina, the skin rapidly fades from dark chocolate back to the porcelain white of the rest of her body.  You prod and play with the moist slit, feeling the soft skin part around your fingers like a soft velvet glove.  She grows wetter in response, giving up plaintive little moans at your incursion",
        );
        if (this.monster.lust > 99)
            this.outx(" until she's panting and her tiny clit has emerged, hard as a rock");
        this.outx(".\n\n");

        this.outx(
            `The spider-kin's honeyed onyx-hued pussy is irresistible, and you remove your ${this.player.armorName} to prepare for the coming sex.  While you're distracted, the defeated arachnid-morph begins to masturbate while watching you with wide, eager eyes.  You grab a nearby vine and yank the slut's hands away from her pussy.  She protests, but you smirk and inform her she won't get her mitts back until she gets you off.  The spider-girl nods mutely, though confusion crosses her face once you start circling her, coming up next to her chest.\n\n`,
            false,
        );

        this.outx(
            'You lift one of her breasts up with one hand while raising her head with the other, bringing slutty-looking black lips close enough for her to kiss her nipple.  She shrugs and begins licking and suckling.  You have to wonder if she could get off from the nipple stimulation alone, though that isn\'t your goal.  Sighing, you whisper into her ear, "<i>Bite.  I want to see that cute little pussy of yours gushing with need.</i>"  She shakes her head violently, protesting as much as she can, but you slap her tit right back into her mouth and restate your instruction.\n\n',
            false,
        );

        this.outx(
            "After several repetitions, she finally gives in and lets her fangs pierce the skin of her breast.  The pain of the act causes her jaw to clench, driving the venom-laden spears the rest of the way in.  Her eyes go wide with pain at first, but once her eyelids begin to droop into a lusty, needy gaze, you judge she's had enough and pull her off.  Two tiny red spots are the marks of her 'injection', and judging from how the spider-girl is humping at the air, you know her body is ready.\n\n",
        );

        this.outx(
            `You lie down beside the spider-slut and thread your ${this.player.legs()} between her thighs and lower body.  She gasps and moans at every tiny touch against her needy cunt as you get into position, streaking your lower body with liberal amounts of her copious fem-cum.  Once your ${this.vaginaDescript()} finally contacts her sloppy, gushing box, the result is instantaneous and powerful - she cums hard.  Her legs twist and spasm around your ${this.player.legs()}, the nerveless convulsions spread up her body until she's writhing in the dirt and her tits are flopping and jiggling.\n\n`,
            false,
        );

        this.outx(
            `While the stimulation of her twitching body grinding against your ${this.vaginaDescript()} is wonderful, you quickly tire of her thrashing.  You locate her bulky abdomen and find one of the spinnerets.  The fleshy protuberance is surprisingly quite easy to handle, and you aim it at one of the spider-girl's legs and squeeze.  A torrent of webbing splatters over her carapace-clad legs, and though it doesn't stick to her, it does completely engulf her ankle and adhere to the ground, securing her in place.  You pull back and repeat the action with her other leg, leaving her stuck fast.\n\n`,
            false,
        );

        this.outx(
            `You thread yourself back under and around her, sliding back up against her still-quivering cunt until your slippery sex is mashing against it.  With two pairs of slippery pussy lips gliding over each other, squishing wetly from the mixed dribbles of fem-cum, the rest of the swamp fades to a barely-noticed background.  Your ${this.clitDescript()} quickly emerges from its sheath`,
        );
        if (this.player.clitLength < 4)
            this.outx(", bumping and gliding against the black spider-cooch's sopping lips.");
        else
            this.outx(
                ", slowly spearing forward to penetrate the sopping wet spider-cooch with its decidedly unladylike length and girth.",
            );
        this.outx(
            "  The pale beauty moans and screams, her bound arms pulling futilely against the restraints as you work her relentlessly, using her body as your lubricated, vibrating toy.\n\n",
        );

        this.outx(
            `The squishes and schlicks of your mating echo out, while both your voices rise to higher pitches from the pleasure.  The arachnid-woman cums numerous times, squirting her sweet honey over your ${this.vaginaDescript()} enough times to leave a puddle under the joining of your waists.  Even in the humid swamp air, the splattering lady-spunk quickly soaks into the mud, but your spidery lover will keep making more; you're sure of it.  You grab one of her feet for leverage and hump harder and harder until your ${this.clitDescript()} `,
        );
        if (this.player.clitLength >= 4)
            this.outx(
                "is seized by her velvet embrace just right, and you cum while fucking her with your 'tiny' nub.",
            );
        else
            this.outx(
                "drags over her velvet lips just right, and you cum hard, screaming in ecstasy.",
            );
        this.outx("\n\n");

        this.outx(
            "You roll and buck, your hips moving entirely of their own volition.  Eyes closed, you enjoy the moment and let your fingertips curl into the mossy ground beneath while rolling pleasure radiates from your womanhood.  ",
        );
        if (this.player.cockTotal() > 1) {
            this.outx(`Throughout it all, ${this.sMultiCockDesc()} spews wasted seed over her leg`);
            if (this.player.cumQ() >= 400) {
                this.outx(", even leaving a ");
                if (this.player.cumQ() >= 400 && this.player.cumQ() < 1000) this.outx("small ");
                else if (this.player.cumQ() >= 2000) this.outx("huge ");
                this.outx("puddle on the ground");
            }
            this.outx(".  ");
        }
        this.outx(
            "The spider-girl shares a moment of climax with you before abruptly going limp in her restraints, slumping into ",
        );
        if (this.player.cumQ() < 400) this.outx("her own");
        else this.outx("the mixed");
        this.outx(
            " puddle of girl-cum.  You simply lie back and tremble a bit, waiting for the aftershocks to die down before you extricate yourself from the hapless hussy.\n\n",
        );

        this.outx(
            "It doesn't take more than a few moments to recover and get dressed, though it looks like your lover didn't fare nearly as well.  ",
        );
        if (this.player.cor < 33)
            this.outx(
                "In a moment of pity, you work to free her from the restraints before you leave.",
            );
        else if (this.player.cor < 66)
            this.outx(
                "You feel a little guilty, and before you go, you untie the bindings around her hands so that she'll be able to free herself.",
            );
        else
            this.outx(
                "You leave her there with her hands and feet completely restrained.  Sucks to be her.",
            );
        this.player.orgasm();
        if (!this.getGame().inCombat) this.doNext(this.camp.returnToCampUseOneHour);
        else this.cleanupAfterCombat();
    }

    // *Victory Male
    // Summary:  Bind her hands with vines and fuck the immobilized spider-girl. BORING
    private fSpiderMorphRapeDude(): void {
        let x: number = this.player.cockThatFits(this.monster.vaginalCapacity());
        if (x < 0) x = 0;
        this.outx("", true);
        this.spriteSelect(73);
        this.outx(
            `You push the spider-girl onto her back, getting a good long look at your conquest before you take off your ${
                this.player.armorName
            }.  At the sight of your ${this.multiCockDescriptLight()}, she `,
        );
        if (this.monster.lust <= 99)
            this.outx(
                "relaxes a bit.  The smell of an aroused female wafts up from her, reminding you that is probably what she wanted from the get-go.",
            );
        else
            this.outx(
                "salivates, both holes dripping liquid in anticipation of the coming sex.  The smell of sex fills the air, and you realize you're about to give her exactly what she wants.",
            );
        this.outx("  It doesn't matter - you're going to fuck her pussy full of cum.\n\n");

        this.outx(
            "The spider-girl spreads her legs wide, giving you a nice view of the strange, glossy black entrance that is her slit.  Unlike her arms and legs, her pussy lips aren't shining onyx due to a carapace, but because of their pigmentation and dripping moisture.  The dark skin fades from its dusky hue to a porcelain white, drawing your gaze to lock upon that slowly-blooming, midnight-black tunnel.  Spellbound, you watch as she completely submits, stroking two fingers over the puffy lips of her vulva before sinking her fingers into the welcoming depths of her cunt.\n\n",
        );

        this.outx(`You advance, ${this.sMultiCockDesc()} `);
        if (this.player.lust < 70) this.outx("thickening ");
        else this.outx("pulsating");
        this.outx(
            ` and ready to penetrate that beckoning, arachnid pussy.  The moist lips slip around your ${this.cockDescript(
                x,
            )} easily, squelching wetly while you slide home.  You gasp from the sudden change, rocking your ${this.hipDescript()} slowly against the spider-morph's while you acclimate yourself, reveling in the heat of her loins.  She grabs your head in that moment, guiding you down with a weak tug to place your lips upon her breast, and with a smile, you start to suckle the chocolate skin of her nub.\n\n`,
            false,
        );

        this.outx(
            'The defeated arachnid trembles visibly, moaning out loud while you plunge into her depths over and over, slowly beginning to fuck her with faster, more confident strokes.  She actually starts to whine, "<i>P-please j-just pull out before you cum?  I want you to keep fucking me, b-but I don\'t want to be pregnant.</i>"\n\n',
            false,
        );

        this.outx(
            "That was unexpected.  You slap her ass and bite down on her nipple to silence her worthless words - if she didn't want you to fuck her pussy she shouldn't have been trying so hard to get in your pants.  She writhes, squirming and venting tiny strands of half-formed web from her abdomen with each thrust, nearly cumming but still wide-eyed and worried about pregnancy.  You massage her other breast with your free hand, pumping and pounding away at her",
        );
        if (this.player.cockTotal() > 1) {
            this.outx(" while your other ");
            if (this.player.cockTotal() == 2) this.outx("cock flops about uselessly");
            else this.outx("cocks flop about uselessly");
        }
        this.outx(
            ".  That extra stimulation is all it takes to get her off and make her squirt your groin with her copious lady-spunk.  You tweak her nipple and bite down again, ",
        );
        if (this.player.cor < 50) this.outx("teasing the eager twat");
        else this.outx("punishing the worthless twat");
        this.outx(
            " for cumming early while the spastic milking motions of her quivering cunt finally bring you to the edge.\n\n",
        );

        this.outx("You bottom out");
        if (this.player.balls > 0) this.outx(" and slap your balls into her soaked taint");
        this.outx(`, ${this.cockDescript(x)} twitching`);
        if (this.player.cockTotal() > 1) {
            this.outx(" while the ");
            if (this.player.cockTotal() > 2) this.outx("rest spasm pointlessly");
            else this.outx("other spasms pointlessly");
        } else this.outx(" happily as it prepares to unload");
        this.outx(
            `.  Jism boils out of your cum-slit, packing itself deep inside, right against her cervix, and the spider-girl's violet eyes cross from the new sensation in her still-cumming cunt.  You pump your ${this.hipDescript()} in time with each sloppy eruption of seed, pushing more and more of your spooge inside her until you're sure it'll take hold in her womb.`,
        );
        if (this.player.cumQ() >= 500) {
            this.outx("  Each spurt feels bigger than the last, and by the time you finish");
            if (this.player.cumQ() < 1000)
                this.outx(
                    ", you can tell from the small rounded bump that she's had plenty of baby-batter.",
                );
            else
                this.outx(
                    ", it's leaking out around the seal of her labia in a steady stream.  You make a puddle underneath her, and her belly is tight and stretched, like a pregnant woman's.",
                );
        }
        this.outx("\n\n");

        this.outx(
            `The soon-to-be expecting mother comes down from her orgasm first, regaining control of herself while your ${this.cockDescript(
                x,
            )} is giving the last of its gifts to her pussy.  Her hands roam over her `,
        );
        if (this.player.cumQ() >= 1000) this.outx("distended ");
        this.outx(
            'belly, a look of shocked disbelief on her face while she moans and begins to cry, "<i>I\'m going to be pregnant!  I n-n-never asked for this...</i>"\n\n',
            false,
        );

        this.outx("Pulling out, ");
        if (this.player.cor < 33)
            this.outx(
                "you wipe away her tears and kiss her, explaining that any new untainted life is a blessing.  She brightens at your kind words and returns her attention to her belly, still a bit dazed by it all.",
            );
        else if (this.player.cor < 66)
            this.outx(
                "you shrug and sigh, wiping the tears from her eyes and feeling a slight twinge of guilt.  She still sniffles and rubs her belly, obviously confused about the new development.",
            );
        else
            this.outx(
                "you slap her across the face and tell her to toughen up.  She starts to bawl at that, curling into a tight little ball and openly weeping.",
            );
        this.outx("  You get dressed and head back to camp.");

        this.player.orgasm();
        this.pregnancy.knockUpForce(
            PregnancyStore.PREGNANCY_PLAYER,
            PregnancyStore.INCUBATION_SPIDER - 200,
        ); // Spiders carry for half as long as the player does for some reason
        if (!this.getGame().inCombat) this.doNext(this.camp.returnToCampUseOneHour);
        else this.cleanupAfterCombat();
    }

    // *Victory Anal:
    // Summary: Fuck her ass until she loses control of her spinnerets and starts spraying webs willy-nilly.
    private evilSpiderGirlVictoryAnal(): void {
        let x: number = this.player.cockThatFits(this.monster.analCapacity());
        if (x == -1) x = 0;
        const y: number = this.player.cockThatFits2(this.monster.analCapacity());
        this.outx("", true);
        this.spriteSelect(73);
        this.outx(
            `You peel off your ${this.player.armorName} while you gaze disdainfully down at your prize.  `,
        );
        if (this.monster.lust > 99)
            this.outx(
                "She's moaning plaintively and happily fingering herself, practically offering her juicy box to you.",
            );
        else
            this.outx(
                "She's groaning painfully and struggling to move before falling back down, legs akimbo, inadvertantly displaying her pussy to you.",
            );
        this.outx(
            "  Sighing, you grab her narrow frame, admiring the lightness of her body as you heft her up and position her onto her hands and knees.  ",
        );
        if (this.monster.lust > 99) this.outx("She mewls with disappointment.  ");
        this.outx(
            "This is a much better position for her; ass-up, with her pussy and pucker fully exposed.\n\n",
        );

        this.outx(
            `The spider-morph looks back fearfully, but she flexes her back to raise up her abdomen and allow you easier access to her holes like the obedient slut she truly is.  You wrap your arms around the heavy, exoskeletal organ and step forward, leveraging your ${this.cockDescript(
                x,
            )} to slide it into her welcoming pussy.  The arachnid cunt sucks you in with a wet slurp, welcoming your cock to the oozing sheath with uncommon eagerness until the plush black pussy lips are compressing against your loins.  You have trouble not giving into the hot, moist pressure of the silken canal and rutting her like a beast then and there, but a tighter, better hole beckons for your now-lubricated fuck-stick's attention.\n\n`,
            false,
        );

        this.outx(
            "You circle a finger along the pebbly skin just outside the spider-slut's rectum, watching the tight hole wink with each brush across her sensitive skin.  She looks back and asks with a worried frown, \"<i>Y-you aren't going to put anything in there, are you?  It feels weird!</i>\"\n\n",
        );

        this.outx(
            `Of course you will.  You answer her query by withdrawing from the velvet tunnel and planting your ${this.cockDescript(
                x,
            )} squarely at the spider-morph's tight asshole.  She yelps in surprise and tries to scrabble away, but you hold her fast, leaning on her to push her tits and face into the loamy swamp dirt.  Pressing on, you mount her, thrusting your ${this.cockDescript(
                x,
            )} deep into her dark hole`,
        );
        if (y >= 0)
            this.outx(`, while your ${this.cockDescript(y)} slips into her warmed-up cunt.`);
        else
            this.outx(
                ", the tight ring of her sphincter clutching feebly at you while you stretch it wider.",
            );
        this.outx(
            "  Her carapace-clad finger-tips dig into the ground, and her back arches reflexively as if she could somehow twist away from the stimulation.  You pin her down underneath you and hold her tight until her struggles cease.\n\n",
        );

        this.outx(
            "At last, she gives up on resisting the forced sodomy and relaxes.  Once you feel her sphincter release its death-grip on your member, you start to fuck her ass.  You pump her hard and fast, with little concern for her pleasure, reveling in the claiming of this untamed monster-girl's tight, possibly virgin hole.  Each hard-pushing, butt-fucking stroke leaves her clenching ring a little looser, a little more accommodating of your maleness.  The slowly-widening sphincter gets stretched wide, leaving her hole slightly agape with each pull back",
        );
        if (y >= 0)
            this.outx(
                `, but it's still tighter than the sloppy spider-cunt that keeps rhythmically devouring your ${this.cockDescript(
                    y,
                )}`,
            );
        this.outx(".\n\n");

        this.outx(
            `Your victim bites her lip, trying to hold in the gasps of pleasure, but you slap her pillowy asscheek, forcing her to cry out in surprise.  With the dam broken, you're treated to an audible symphony of verbal enjoyment.  The spider-girl gasps and croons, moans and pants, and eventually just starts babbling 'yes' with every ass-filling thrust of your ${this.cockDescript(
                x,
            )}.  Her legs go weak, and you're forced to hold her aloft by her abdomen while you rail away at her exposed ass, fucking the spider-girl as hard as your muscles will allow.\n\n`,
            false,
        );

        this.outx("The spider-skank cums hard, revealing her orgasm ");
        if (y == -1) this.outx("by splattering her fragrant lady-spunk into the dirt");
        else {
            this.outx(`by splattering your ${this.cockDescript(y)}`);
            if (this.player.balls > 0) this.outx(" and balls");
            this.outx(" with her copious lady-spunk");
        }
        this.outx(
            ".  Still a ways from a climax of your own, you toy with the insensate spider's spinnerets, tugging, pulling, and eventually prodding a finger inside their openings experimentally.  Your anal fuck-toy goes hog-wild, bucking and shivering, her whole body shaking and writhing while her moan escalates in pitch and volume until it borders on being too high-pitched to detect.\n\n",
        );

        this.outx(
            "Sloppy white goo starts spurting from her spinnerets, drizzling into your hands in a half-formed, sticky mess.  You experimentally tug on one of the miniature organs, twisting it to point at the spider-girl's back.  Heavy ropes of goopey proto-web spurt all over her, puddling in the small of her shaking back.  You content yourself with bukkaking her in her own fluids while you savage her ruined asshole",
        );
        if (y != -1) this.outx(" and cum-drizzling slit");
        this.outx(" and watch her cheeks jiggle from the force of your blow.\n\n");

        this.outx("Fucking her like this, it doesn't take long to reach orgasm, and ");
        if (this.player.balls > 0) this.outx("with your balls squirming and unloading");
        else this.outx("prostate unloading");
        this.outx(", you pump injections of fertile cream deep into her empty bowels");
        if (y != -1) this.outx(" and pussy");
        this.outx(
            ", filling her up with warm seed.  The spider-girl slowly starts to calm down, her spinnerets going limp in your grip.  She reaches around to touch her belly, as if to feel the intestine-stuffing loads washing into her backside",
        );
        if (this.player.cumQ() > 500) {
            this.outx(
                ".  Incredibly, she can, and as you jizz even more inside her, she's treated to the feel of her belly inflating",
            );
            if (this.player.cumQ() < 750) this.outx(" slightly");
            else if (this.player.cumQ() >= 1200)
                this.outx(" massively, turning into a practically obscene bulge");
        }
        this.outx(".\n\n");

        this.outx(
            "You pop out and step back, giving the spider a gentle slap that pushes her on to her side.  A ",
        );
        if (this.player.cumQ() < 100) this.outx("trickle");
        else if (this.player.cumQ() < 500) this.outx("gush");
        else this.outx("river");
        this.outx(
            " of seed rushes out of her gaped anus, pooling on the swamp floor as she slowly loses consciousness.  You give her ass an affectionate slap and get dressed, feeling sated and ready to resume your adventures.",
        );
        if (y != 1)
            this.pregnancy.knockUpForce(
                PregnancyStore.PREGNANCY_PLAYER,
                PregnancyStore.INCUBATION_SPIDER - 200,
            ); // Spiders carry for half as long as the player does for some reason
        this.player.orgasm();
        if (!this.getGame().inCombat) this.doNext(this.camp.returnToCampUseOneHour);
        else this.cleanupAfterCombat();
    }

    // *Egg Sack Find
    private findASpiderMorphEggSack(): void {
        this.outx("", true);
        this.spriteSelect(73);
        this.outx(
            "You stumble upon a huge, webbed sack hanging from a tree.  Examining it closer, you see that bound up inside it are nearly a dozen webs, each containing a wriggling form.  They start moving faster and faster, perhaps reacting to the nearby movement, before the shells finally shatter and unleash their cargo.  Inside each is a tiny, six inch tall humanoid figure, each resembling a child in miniature.  Remarkably, their features remind you of your own, and before the significance of that fact settles in, they drop to the ground and scurry away on their tiny, carapace-covered legs.\n\n",
        );

        this.outx(
            "You're left scratching your head when you realize they were your own children, birthed by the spider-morph you fucked not so long ago.\n\n",
        );
        this.pregnancy.knockUpForce(); // Clear Spidermorph pregnancy
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    /* Joke Shit

     \"<i>PIZZA,</i>\" she suddenly screams, wrapping you and picking you up.  You can't even tell where you're going, but you eventually end up at a cave, and she promptly goes in.  Propping you up on the wall like some sort of ornament, the spider-girl moves away from you, preheating her oven and choosing a pizza to cook.  As you know, preheating takes quite a while, so she heads over to her computer chair and plops down, booting up Team Fortress 2 for a bit of jumpin' and shootin'.  \"<i>NO CAT GOD DAMN IT,</i>\" she screams as a demonic-looking feline leaps upon her keyboard from on high.  \"<i>CAT YOU ARE THE WORST CAT.</i>\"  Of course, the cat does not even take heed of her outbursts, stomping around the keyboard and hitting literally every key.  The cat then lies comfortably, taking no heed of the girl's hands still attempting to type, and takes a nap.  While you can tell the spider-girl is upset with the obstruction, she makes no move to remove the cat.  You guess it was too cute for her to get upset with it.  The oven's ready, so she rises (taking precautions against waking the cat, of course) and puts a pizza in.  Delicious.
     Oh god what...

     alright*/
}
