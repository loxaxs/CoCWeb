﻿import { BaseContent } from "../../BaseContent";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { GoblinAssassin } from "./GoblinAssassin";
import { StatusAffects } from "../../StatusAffects";
import {
    TAIL_TYPE_SPIDER_ADBOMEN,
    FACE_SNAKE_FANGS,
    VAGINA_WETNESS_WET,
    VAGINA_WETNESS_DROOLING,
    VAGINA_WETNESS_SLAVERING,
    VAGINA_WETNESS_SLICK,
} from "../../../includes/appearanceDefs";
import { trace } from "../../../console";
import { Appearance } from "../../Appearance";
import { CockTypesEnum } from "../../CockTypesEnum";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";

/**
 * Created by Fenoxo on Jan 18th 2014
 */

export class GoblinAssassinScene extends BaseContent {
    /* Goblins
     Gender: Female
     Height: 2-4 feet
     Eye Colors:  Red, Violet, Amber, or Pink
     Hair Colors: Red, Very Light Blonde, Purple, Pink, White
     Skin Colors: Green, though in rare cases gray, blue or yellowish.
     Appendages: Their arms and legs look like a human's, although they are scaled down to fit the goblin's smaller frames.
     Appearance: Goblins are normally lithe little creatures with somewhat elfin faces.  Their ears are pointed, though their unusual (and very punk rock) haircuts can sometimes hide them.   A goblins age can usually be determined by the size of her bust and hips.  Very young goblins have relatively small chests and hips, though as they age and give birth, their endowments will grow ludicrous sizes.  It is rumored that somewhere there is a goblin Queen who has so many children that she has become immobile.

     They often dress themselves in tight fitting leather harnesses to display their chests.  A goblin's crotch will ALWAYS be exposed.  They favor piercings in multiple locations, and most have jewelry in their nipples, clit, and both pairs of lips.
     Aging: Goblins do not get 'old' like other races, and do not get lines or wrinkles.  They will not die from age alone, though should a goblin be successful enough to immobilize herself, she may die if she does not have family that keeps her fed.
     Sex Life: Goblins are ALWAYS horny and ready to copulate.  They have large juicy vulva that ache for penetration, and despite their small size can take many of the larger members out there (in moderation).  They will always seek to have sex with any willing participant, and in those rare cases where they are too small, they will be sure to take as much cum inside them as possible.  Thanks to the wide array of psychology altering chemicals in their body, goblins get off on the act of giving birth.
     Life Cycle: The life of a young goblin is likely to end in the jaws of a hellhound, impaled on a minotaur's dick, or drowned tentacle-cum.  Due to the special properties of their wombs (any pregnancy ALWAYS results in a goblin), they are considered worthless to most monsters and demons, and due to their small size, they often end up dying after an encounter with a minotaur or similar creature. Despite the high fatality rate of young goblins, those who survive beyond their first pregnancy will often live a very long time, and will dedicate themselves to birthing their broods (4+ goblins per pregnancy) and perfecting alchemical recipes they can use to 'seduce' more 'fathers'.
     History: Goblins were once the technological leaders of what is now known as the Demon-Realm.  When the demons came, they signed a treaty guaranteeing peace and freedom to the goblin people.  The peace was a lie.  That night, a team of demons tunneled into the goblins water supply and began tainting with ever increasing levels of corruption.  Over the next few days, the goblins spent less and less time working, and more and more time fucking.

     Within a week, their greatest minds were spending all their time eating pussies and developing new aphrodisiacs.  Within a month the goblins were permanently turned on by the strongest of drugs and fucking nonstop in the streets of their once-great city.  A few did not partake of the tainted water, and locked themselves inside their dwellings for as long as they dared.  Some gave in to thirst or loneliness.  Others stayed indoors until the demons walked in and easily assumed control.  They put the few sane goblins left to work building the machines that run their empire to this day.  No one has seen those few survivors since, and most goblins don't waste time thinking about them.
     Social Structure: Goblins live in groups of 100-300, typically lead by an elder female with a direct bloodline to every goblin under her.

     STANDARD GOBLIN ENCOUNTER:
     3' even height.
     Breasts would be about DD cup if she were human.
     Nice hips & well-rounded ass.
     Green skin, pink and black(mostly pink) gothy hair.
     Vagina/ass/mouth capable of taking dicks with volume up to about 36 (so 12x3 or 24x1.5, etc, etc)
     Cute face, likes to put on drugged lipstick to incapacitate her foes with after raping them.
     Carries bottles of aphrodisiacs and drugs.
     Dressed in leather straps that support her chest (in a lewd way) while leaving her pierced nipples exposed and slightly parting her ass to expose her pucker & femmy funbits.  Pierced pointed ears.
     */
    public goblinAssassinEncounter(): void {
        this.clearOutput();
        // First Time Intro
        if (this.flags[kFLAGS.TIMES_ENCOUNTERED_GOBLIN_ASSASSIN] == 0) {
            this.outx(
                "A needle whizzes through the air and lands next to your foot. The fine craftsmanship along the side of the glass tube only brings you to one conclusion - it's owner has access to precision machinery and manufacturing capabilities uncommon in this land.",
            );
            this.outx(
                "\n\nYou ready your [weapon] as the needle's owner makes herself known, jumping down from on high into the dirt. It's a goblin, but one with an air of confidence and poise, obviously an experienced fighter. Whether you planned on fighting or not, the goblin has no intention of letting you leave unspoiled.",
            );
            // [Initiate combat encounter – goblin assassin]
        }
        // Repeat Intro - Cell Chambers
        else {
            this.outx(
                "A familiar sight catches your attention as a shadowy blur lands in front of you - another goblin assassin appears to be lurking around these parts. You ready your [weapon] as she straps on a belt loaded with various types of needles and assumes a combat stance.",
            );
            // [Initiate combat encounter – goblin assassin]
        }
        this.flags[kFLAGS.TIMES_ENCOUNTERED_GOBLIN_ASSASSIN]++;
        this.startCombat(new GoblinAssassin());
    }

    // [LOSS SEXAHNZ]
    public gobboAssassinBeatYaUp(): void {
        this.clearOutput();
        let x: number;
        if (this.player.lust <= 99)
            this.outx(
                "You collapse, utterly beaten. To make sure you'll be easier to handle, the victorious assassin saunters up, a pair of fluid filled needles in her hands. She jams them into your [player.legs], emptying the contents into you before you can so much as stammer a protest. Burning lust pours through your veins unbidden, and you moan out loud as the chemicals have their way with you as easily as the goblin soon will.\n\n",
            );
        // i. *Lust Loss – Male/Herm (Fits)(FENCRAFTED)
        // 50% odds for herms
        if (
            this.player.cockThatFits(this.monster.vaginalCapacity()) >= 0 &&
            this.player.hasCock() &&
            (!this.player.hasVagina() || GoblinAssassinScene.rand(2) == 0)
        ) {
            x = this.player.cockThatFits(this.monster.vaginalCapacity());
            if (x < 0) x = this.player.smallestCockIndex();
            this.outx(
                `You tear through your ${this.player.armorName} in a rush, anything to release [eachCock] from its hellish confinement.  You’re so aroused, so horny.  Any passing thoughts of modesty are immediately discarded and forgotten, washed away under the wave of your all-consuming lust as your fingers slide home around [oneCock] and begin to play with the turgid tool.  You immediately buck from the sensation of incredible, pent-up need, nearly cumming on the spot.  Looking up, you meet the emerald-skinned woman’s eyes pleadingly.`,
            );
            this.outx(
                '\n\nThe goblin assassin watches impassively for a moment, but as your need intensifies, her attitude softens while your member hardens.  "<i>Oh, I think I’m gonna regret this, but ',
            );
            if (this.player.cockTotal() == 1) this.outx("that thing");
            else this.outx("those things");
            this.outx(
                ` look mighty tasty.  You don’t mind if I sample just a little bit of your seed do you?</i>"  The sapphire-maned beauty kneels down next to you and lets her tiny, delicate digits dance across the underside of [oneCock], drawing a lurid moan from your lips as she wonders out loud, “I don’t hear a no, ${this.player.mf(
                    "stud",
                    "sexy",
                )}.  That’s good... I’m just going to take a little bit of cum... just a few squirts.  Surely a `,
            );
            if (this.player.tallness >= 60) this.outx("big, ");
            this.outx(
                `${this.player.mf(
                    "strapping young man",
                    "sexy breeder",
                )} will have enough jizz to pay for ${this.player.mf("his", "her")} trespass?</i>"`,
            );
            this.outx("  Those delightful, dancing fingers pirouette down to your ");
            if (this.player.balls > 0)
                this.outx("[sack], giving it a gentle caress before vanishing.");
            else if (this.player.hasVagina())
                this.outx(
                    `${this.vaginaDescript()}, the tips giving your soaked mound only the barest ghost of a touch.`,
                );
            else
                this.outx(
                    "taint, the tips giving your sensitive skin only the barest ghost of a touch.",
                );

            this.outx(
                '\n\nShe explains, "<i>I won’t help with that until you give me an answer.  Be honest with yourself - you don’t care about other girls at all.  You just came up here to fuck a goblin assassin.  Am I right?</i>"',
            );

            this.outx("\n\nYou try to answer ‘no’, but it trails off into a weak, ");
            if (this.player.femininity < 40) this.outx("almost ");
            this.outx(
                'girlish moan.  The need thrumming through [eachCock] is telling you - no, demanding - that you do what she says and fuck her.  Like a beast in rut, you groan.  You look the short-but-stacked aggressor in her big, liquid blue eyes and make a decision entirely rationalized by your aching, drug-fueled needs.  Still pumping your shaft like a man possessed, you whimper, "<i>Yes... I... I came to have sex with you.</i>"',
            );
            this.outx("\n\nVeridian skin caresses you just above");
            if (this.player.hasSheath()) this.outx(" the sheath");
            else this.outx("your base");
            this.outx(
                'for a brief moment but vanishes before you can gain any satisfaction from the act.  "<i>I’m sorry, that was too slow,</i>" the diminutive fighter teases, a moment before she slams a pair of needles into your [legs].  [EachCock] rises and imeediately spurts a trickle of white pre-cum, unable to resist the potent chemical concoction flooding your bloodstream, so perfectly tailored to inflame your passions past the point of reason.  You fail to notice the removal of the spent plungers, but you sure as hell notice the return of the lithe green woman’s probing caresses.  She whispers, "<i>Now tell me how other girls don’t matter.  This was all just a ruse to get you some green love, wasn’t it?</i>"',
            );
            this.outx(
                '\n\nYour response is as immediate as it is enthusiastic.  You tell her exactly what she wants and then some more , panting and moaning as the assassin’s nimble fingers tickle every throbbing-hard inch of your over-filled fuck-tool.  It spews another rope of pre so thick and white it may as well be the real deal as you finish, begging, "<i>Yes, I came here for your delicious, juicy cunny.  Please, fuck my cock.  I need it so bad!  I’ll do anything!</i>"',
            );
            this.outx(
                '\n\n"<i>Awww, you’re squirting for me already.  I just hope there’s enough left to pay your fine.  If not, I can always put some succubi’s delight in a few of these needles,</i>" muses the emerald slut.  She steps over you, the jiggly, rounded curves of her ass hanging over you for a moment before she drops her musky, squishing box straight down onto your nose and lips.  Droplets of fem-spunk roll down your cheeks as the goblin grinds her swollen mound against you, her fragrant pussy driving your neglected cock',
            );
            if (this.player.cocks.length > 1) this.outx("s");
            this.outx(
                ` wild with need.  Thankfully, as soon as you submit to her puffy mound and give it a lick, a pair of soft, wrinkled feet wrap around your ${this.cockDescript(
                    x,
                )}, drawing out a thick flood of your pre-cum.`,
            );
            this.outx(
                `\n\nToes smear your precum around your ${this.player.cockHead(
                    x,
                )} before the warm soles drag them down the ${GoblinAssassinScene.num2Text(
                    Math.round(this.player.cocks[x].cockLength),
                )} inches of your length, basting your ${this.cockDescript(
                    x,
                )} in a mixture of goblin sweat and your personal juices.  You moan in delight, your sounds of rapture muted by the puffy, soaked lips that obscure your mouth, your cock spurting helpless trails of white submissively onto her feet.  Every brush of your lips is rewarded with caresses from the goblin’s tiny toes.  Every lick sends those squeezing, cum-lubed feet sliding up and down.  Every suck on her clit causes her pace to increase.  With encouragement like that, you cannot stop yourself from attending to the goblin’s syrupy box, worshipping her womanhood like a slave before an altar of a glorious god.`,
            );
            this.outx(
                `\n\nThe short, stacked woman moves her legs to lay your cock on her left foot while the entirety of her right foot presses down on your ${this.cockDescript(
                    x,
                )}’s underside, squeezing a thick flow of your pent-up jism from the cum-slit at its tip.  Her sole rocks up and down your length, milking dollop after dollop of jizz onto the goblin’s toes.  After a while, she switches her legs to let her now-soaked foot do the rest of the squeezing.  You happily squirt and squirm, dripping like a sieve but not yet achieving true release.  The goblin, having no such problem, cums noisily atop you, numerous times.  Each successive squirt of girl-fluid soaks your face more than the one before, and by the time she’s done, your ${this.hairDescript()} is sticky with it, half-buried in a puddle of goblin-lust.  You’re so close.  So very close.  Just a little bit more... a few more strokes.`,
            );
            this.outx('\n\n"<i>');
            if (this.silly()) this.outx("Stop right there, criminal scum.");
            else this.outx("Hold your horses.");
            this.outx(
                '</i>"  The emerald assassin glances over her shoulder at you and urges, "<i>Come on now.  Fill me up.  Let out all that spunk I’ve been making build up ',
            );
            if (this.player.balls > 0) this.outx("in your balls");
            else this.outx("inside you");
            this.outx('.  Pay your ‘fine’, and I might let you go.</i>"');
            if (this.player.balls > 0) this.outx("  A hand squeezes your [sack] encouragingly");
            else this.outx("  Hands squeeze your [butt] encouragingly");
            this.outx(
                " as the goblin impales herself to the hilt with a sloppy squelch.  You orgasm, cumming hard inside her.  Your back arches, your body clenches, and rope after rope of seed sprays inside the goblin’s baby-hungry womb.  Her pussy seems to drink it down, wicking the jizz away from you just as fast as you can put it out.",
            );
            if (this.player.cumQ() >= 750) {
                this.outx(
                    "  Even her near-supernatural fertility can’t keep up with your fantastic virility, and soon the goblin is sporting a small bump on her belly.",
                );
                if (this.player.cumQ() >= 2000)
                    this.outx("  It swells to a rounded, pregnant dome by the time you finish.");
            }
            this.outx(
                "  All of your passion spends itself in the glorious climax, leaving you feeling like an empty, wasted husk.",
            );
            this.outx(
                "\n\nStanding up with your white goo dripping from her nethers, the goblin gives you a wink and disappears around a corner, leaving you alone to slumber.",
            );
        }
        // ii. Lust Loss - Male - No Fit
        else if (
            this.player.biggestCockArea() > this.monster.vaginalCapacity() &&
            this.player.hasCock() &&
            (!this.player.hasVagina() || GoblinAssassinScene.rand(2) == 0)
        ) {
            x = this.player.biggestCockIndex();
            this.outx(
                "You tear through your [armor] in a rush, anything to release [eachCock] from its hellish confinement.  You’re so aroused, so horny.  Any passing thoughts of modesty are immediately discarded and forgotten, washed away under the wave of your all-consuming lust as your fingers slide home around [oneCock] and begin to play with the turgid tool.  You immediately buck from the sensation of incredible, pent-up need, nearly cumming on the spot.  Looking up, you meet the emerald-skinned woman’s eyes pleadingly.",
            );
            this.outx(
                '\n\nThe assassin sighs and grumbles, "<i>Another one with a fucking tree-trunk for a cock.</i>"  She begrudgingly slips out of her straps, perky, dark-green nipples popping free from their confinement to jut proudly from her chest.  “The downside of being a goblin,” explains the athletic green-skinned beauty, \'<i>is that around a dick like that... a heaving, pulsating tower of cock-flesh like that... I’ve just gotta TRY it.</i>"  Now nude, your captor saunters up, wide hips shaking from side to side with every step.  "<i>Being a size-queen is suffering,</i>" she finishes with a wry smile.',
            );
            this.outx(
                `\n\nYou watch her tirade with confused indifference, comprehending little beyond the petite slut’s desire to mount your member.  Tracing your hands over the pulsating veins on your ${this.cockDescript(
                    x,
                )}, your body continues on autopilot, masturbating hard and fast for the emerald beauty as she climbs atop you.  Her juicy gash spreads over the bulge of your urethra as the goblin sinks down atop you, her legs splaying to the sides obscenely.  She commands, "<i>Hands off bub.  You lost to a goblin, and that means you get to be a dad, whether you want to or not.</i>"`,
            );
            this.outx(
                `\n\nThe puffy emerald curtains drape your dick in elastic goblin pussy and brush your feverishly pumping fingers away.  Your captor lets a lewd moan slip through her lips as she begins grinding along your mammoth pole, dragging dark-hued genetalia back and forth on your massive dong.  A perky, hard little clit pops out of the top of the goblin’s glittery pussy-folds, visibly twitching in a display of supreme enjoyment.  Driven by your own insatiable desire, you shift under her, trying to slide your ${this.cockDescript(
                    x,
                )} even faster through her pussy.`,
            );
            if (this.player.biggestCockLength() > this.player.tallness / 2)
                this.outx(
                    "  Your incredibly long phallus blocks your view of the sultry goblin, and you never see the blow coming.",
                );
            this.outx("  A none-too-tender swat connects with your ");
            if (this.player.balls > 0) this.outx("[balls]");
            else this.outx("cock");
            this.outx(' as the goblin grunts, "<i>Stop squirming!</i>"');
            this.outx(
                "\n\nYou hesitantly obey, too startled by the sudden pain to risk movement again.  You’ll just have to wait until the short, stacked woman decides she’s had her fun and lets you get off.",
            );

            this.outx(
                '\n\n"<i>Oh, you finally figured it out?  You’re just livestock to me - just a cum-nozzle for me to play with until I tire of you and put you up in a pen.  Maybe if your cum is thick enough, I’ll take you back and chain you up with our other animals.  Of course, if I did that you’d have to pump out enough spunk to keep a few dozen matrons pregnant,</i>" says the viridian tart in between the lurid squelches of her flexible pussy on your dick.  No... if she takes you back, you’ll never get to do what you came here for!  She drags herself forward until she’s ',
            );
            if (this.player.biggestCockLength() < this.player.tallness / 2)
                this.outx(
                    `sitting on your face, the ${this.player.cockHead(
                        x,
                    )} of your maleness jutting against her drooling lips.`,
                );
            else
                this.outx(
                    `sitting on the ground ‘above’ you, your ${this.player.cockHead(
                        x,
                    )} reaching all the way up to spear her moist box, judging by what you’re feeling anyway.`,
                );

            this.outx(
                `\n\nHer soft feet clasp your dick from each side, displaying a level of flexibility you would not have expected from the girl.  The supple soles slide and caress your length.  Her toes curl around to stroke the sensitive sides of your urethral bulge.  Even the hard knobs of her heels cradle your ${this.cockDescript(
                    x,
                )} underside as she masturbates you with her feet.`,
            );

            this.outx(
                "\n\nLubricated as they are by the copious vaginal drippings, the assassin's feet have an easy time bringing you to the very edge of orgasm.  Every squishy, delicate step she takes brings you closer and closer, and soon you are trembling beneath her sweat and fem-spunk lubricated soles.  ",
            );
            if (this.player.cumQ() >= 1000)
                this.outx(
                    "You spurt huge dollops of pre-cum into her waiting twat thanks to your prodigious virility, though it is only a hint of things to come.  ",
                );
            else if (this.player.cumQ() >= 250)
                this.outx(
                    "You drool a steady flow of pre-cum into her waiting twat, though it’s only a hint of things to come.  ",
                );
            this.outx(
                '  "<i>It won’t be long now.  Yeah, I’m an assassin, but I take care of myself too.  I keep these puppies nice and moisturized, just in case I need to use them on a freak-cock like yours.</i>"',
            );

            this.outx("\n\nYou try to grunt in protest, but it’s muffled by your ");

            if (this.player.biggestCockLength() >= this.player.tallness / 2)
                this.outx("pulsating, iron-hard cock");
            else this.outx("captor’s pillowy asscheeks");
            this.outx(
                `.  The goblin pulls hard with her feet, and her sloppy, stretched cunt just barely slurps in your entire ${this.player.cockHead(
                    x,
                )}.  You shiver in delight from the tight, vise-like grip constricting your maleness, and nearly erupt from sensation when the little green minx manages to pull another inch inside herself.  She trembles and shudders, her feet suddenly going wild along your length.  The goblin’s cushy soles smear along your ${this.cockDescript(
                    x,
                )} with the wild abandon of one lost to pleasure, her juices squirting out from her slit as she climaxes.  The onslaught of touches is too much for your straining member, and with a tight, hot clench, you feel your imminent release has arrived.  A fat bulge appears at the base of your shaft, coupled with an explosion of warm pleasure from within you.  It travels from your base all the way towards the tip, before disappearing into the goblin with a cunt-stretching squirt.  She moans out loud, clearly enjoying the sensation of being stuffed with cream, and the two of you sigh together while your dick finishes pumping `,
            );
            if (this.player.cumQ() <= 10) this.outx("dribbles");
            else if (this.player.cumQ() <= 100) this.outx("squirts");
            else if (this.player.cumQ() <= 250) this.outx("thick wads");
            else if (this.player.cumQ() <= 1750) this.outx("waves of gooey spooge");
            else this.outx("rivers of cum");
            this.outx(" into the goblin’s box.");
            if (this.player.cumQ() >= 2500)
                this.outx(" Her belly rounds up nicely under your voluminous attentions.");

            this.outx(
                `\n\nThe green girl gives your ${this.cockDescript(
                    x,
                )} a few last affectionate squeezes before she disentangles herself from you.  You slump down, still feeling a little turned on, and return to masturbating.  The goblin laughs, "<i>A few more performances like that and I just might have to keep you.</i>"  You play with yourself until you fall asleep, and even then, you dream of the feel of that silken pussy back on top of your dick.`,
            );
        }
        // iii. Lust Loss - Female
        else {
            this.outx(
                "Defeated by your own needs, your fingers dart to your [armor], rapidly disassembling it in your hurry to expose your aching, tender puss to the goblin’s eyes.  The assassin watches you with an unimpressed, bemused expression, though she remains rooted in place, her gaze locked onto you as you succumb to your lusts.  Knowing that you have an audience, you twist and contort your body to present your [chest] and [vagina] to the petite greenskin.  Glistening moisture forms on your exposed nether-lips, tempting you to slide your fingers into their slick warmth.  As if you could resist.",
            );
            this.outx(
                "\n\nYou begin masturbating, violently and unabashedly ravishing your form, forgetting entirely about the one who put you in such a state.  Parting your slippery flesh with questing digits, you lose yourself to the pleasant, warm explosions firing through your nerves with every caress of your honeypot.  At the same time, the fingers on your free hand ",
            );
            if (this.player.hasFuckableNipples())
                this.outx(
                    "piston in and out of your [nipple], masturbating it just as hard as the real thing.",
                );
            else
                this.outx("squeeze around a taut nipple, twisting and pulling on it unthinkingly.");
            this.outx(
                "  Your masturbatory reverie is interrupted sudden impacts against both your wrists.",
            );

            this.outx(
                '\n\nLooking on in confusion, you can only stare as the goblin steps over you, straddling your prone form and easily batting away every attempt you make to touch yourself.  She pulls off her belt of needles and casually removes a set of small leather thongs from its inner lining.  With practiced skill, she binds your hands together with a narrow leather leash.  You don’t resist, expecting the kinky viridian bitch is planning some perverse sex game to get you both off that much harder.  She smirks down and says, "<i>I don’t see much point in fucking a two-bit twat like yourself, but you got me horny, so by Lethice’s drippy tits, you’re gonna get me off.</i>"',
            );
            this.outx(
                "\n\nBefore you can mutter a protest, the goblin pivots and drops atop your face, plugging your mouth-hole with her wet gash.  Musky fem-drool slimes over your cheeks, running down to the nape of your neck where it drips on the ground.  The goblin utters a quiet, appreciative moan, rocking her hips ever so slightly to drag the bump of her clitty across your parted lips.  She doesn’t do anything for your needs at all!  You try to protest, but all that gets you is a mouth full of slime, tangy and arousing though it may be.  The leather thong binding your hands goes taut as you try to pull your fingers back into your aching cunt, but in your compromised position, you cannot will up the strength to overpower the tiny, dominating minx.",
            );

            this.outx(
                '\n\n"<i>Oh, you wanna cum too?  Then you better lick faster, slut.  You’re not getting anything until you get me off,</i>" taunts the face-fucking box’s owner.  Determined to convince her to tend to you, you close your mouth and hide away your tongue, bargaining with the only thing you can still control.',
            );

            this.outx(
                `\n\nAn irritated slap cracks against the ${this.player.skin()} of your [chest] with stinging force.  The explosion of pain sends stars through your cunt-clouded vision, but you hold fast, only giving a tiny muffle of discomfort.  Sighing, the goblin fiddles with her bandolier.  You can’t see what she’s doing, but you know she’s up to no good!  There’s a brief sting of pain in your arm, followed by a rush of ecstatic, burning euphoria.  Your [vagina] juices itself, and you moan uncontrollably.  Lust thrums through your veins.  Desire mounts to new levels.  You can’t resist this... not anymore.  You open wide and start to lick, assaulting the lush green pussy with your tongue, anything to get her off and bring you the relief you ACHE for.`,
            );

            this.outx(
                '\n\nThere’s a momentary pain in your other arm, followed by a wave of vertigo.  In its wake, your arousal seems to double, climbing so high that your previous levels of sexual need seem insignificant by comparison.  Your [hips] lift from the ground of their own accord, the electric sensation of every air current over your engorged mons too delicious to resist.  The goblin, clearly enjoying your efforts, comments, "<i>Oh my, are you fucking the air?  Are you seriously getting off on feeling the breeze on your bare, exposed cunt?  And you’re so wet down there!  Honey, I’m a fucking goblin, but you’d put me to shame right now.</i>"',
            );
            this.outx(
                '\n\nYou suck on her clit to shut her up while sliding your [butt] on the ground.  Every hump, every movement, and every pointless undulation against your phantasmal lover seems more fevered and desperate than the last.  Already, the dirt beneath you has turned into fragrant, soupy mud.  Your ass is painted brown with it, and the wet squishes it makes as you drag your bottom through the mud-puddle only serve to arouse you and your captor further.  She moans, "<i>Want some more?  Mmm... I don’t think you’ll be able to get off like you are now.</i>"',
            );
            this.outx(
                "\n\nPanting into the goblin’s green, leaky cunt, you can’t do anything to answer except to hum against her lips and trace your tongue in circles over her clit.  You’re so turned on that you feel like your sense your orgasm, lurking over a hill that you can’t quite mount.  Your desperate, obscene motions bring you pleasure, but it just isn’t enough, even with the flood of accursed goblin drugs flooding your system.",
            );

            this.outx(
                '\n\nA pinprick on your tender, engorged nipple is the only warning you have before another wave of narcotic aphrodisiacs assault your system.  Your muscles locks as your pussy seems to come alive, practically fountaining fem-slime.  The puddle beneath you is up your shoulders, but you’re too lost in fantasies of sex and the tasty cunt atop your face to care.  The goblin’s thick, well-rounded thighs squeeze on your head as she begins panting, "<i>Fuck yes, lick it there you hungry slut, lick my birth-hole you insignificant tongue-slut.  I ought to bring you inside our city.  I’m sure we could put you in a stall, maybe lock everything but your mouth behind a wall and make you chain-lick dozens of pregnant green cunnies until you’re living on nothing but sticky-sweet girl-cum.</i>"',
            );
            this.outx(
                "\n\nYour eyes roll back, not that they had anything to look at besides curvy veridian buttocks, and your tongue goes absolutely nuts, whipping back and forth through the curtains of slime that drool down into your open, moaning maw.  The goblin grinds atop you, moaning loudly as she reaches her own peak, barely caring about your pleasure.  Thankfully, with the latest injection, your [vagina] has grown so sensitive that every whisper of air over your red, swollen folds feels like an individual tongue.  You squirm, complete, irressistable need controlling your body from the waist down.  The torrent of lady-jizz that suddenly fills your mouth startles you for a moment, and then you too are cumming, your [vagina] climaxing from nothing more than faint air currents.",
            );
            this.outx(
                "\n\nPassing out in a puddle of mixed juices, you barely notice the goblin’s departure.",
            );
        }
        this.cleanupAfterCombat();
        this.dynStats("lus", -100);
    }

    // [WIN RAEPZ]
    public gobboAssassinRapeIntro(): void {
        this.spriteSelect(24);
        this.outx("", true);
        this.outx(
            "The assassin falls to her feet, desperately trying to regain her composure but ultimately caving in to the exhaustion of defeat. The leather belt that was once wrapped around her pillowy breasts now hangs unfastened around her waist, the syringes once adorning it now littered around her. A shattered needle by her side emits a sweet-smelling vapor that soon reaches her nose, causing the girl to blush furiously as lust begins to overcome her senses.",
        );
        this.dynStats("lus", 20);
        // If cant rape or breastfeed
        if (this.player.lust < 30 && this.player.findStatusAffect(StatusAffects.Feeder) < 0) {
            this.cleanupAfterCombat();
            return;
        }
        let buttseks;
        let feeder;
        let fitsFuck;
        let tooBig;
        let corruptTooBig;
        let cuntFuck;
        let spiderCondom;
        let jog;
        let eggs;
        if (this.player.canOvipositSpider()) {
            eggs = this.laySomeDriderEggsInGobboTwat;
        }
        // cunt stuff
        if (this.player.hasVagina()) cuntFuck = this.gobboGetsRapedFem;
        // Dick stuff:
        if (this.player.hasCock()) {
            // Corrupt too big scene
            if (
                this.player.cockArea(this.player.biggestCockIndex()) >
                    this.monster.vaginalCapacity() &&
                this.player.cor > 80 &&
                kGAMECLASS.monk > 2
            )
                corruptTooBig = this.rapeAGoblinCorruptTooBig;
            // Regular too big scene
            if (
                this.player.cockArea(this.player.biggestCockIndex()) >
                this.monster.vaginalCapacity()
            )
                tooBig = this.manRapesGoblinTooBig;
            // It fits!
            if (this.player.cockThatFits(this.monster.vaginalCapacity()) >= 0) {
                jog = this.gobboGetsRapedMaleFits;
                fitsFuck = this.gatsGoblinBoners;
            }
            // Buttsex toggle
            if (this.player.cockThatFits(this.monster.analCapacity()) >= 0 && this.player.cor > 70)
                buttseks = this.gobboButtSecks;
            // Spidercondom
            if (
                this.player.tailType == TAIL_TYPE_SPIDER_ADBOMEN &&
                this.player.cockThatFits(this.monster.vaginalCapacity()) >= 0
            )
                spiderCondom = this.goblinCondomed;
        }
        // Breastfeed adds an option
        if (this.player.findStatusAffect(StatusAffects.Feeder) >= 0) {
            feeder = this.giveGoblinAMilkMustache;
        }
        if (
            this.player.lust >= 33 &&
            this.player.gender > 0 &&
            (fitsFuck != undefined ||
                cuntFuck != undefined ||
                tooBig != undefined ||
                corruptTooBig != undefined ||
                buttseks != undefined ||
                feeder != undefined ||
                spiderCondom != undefined ||
                eggs != undefined)
        ) {
            this.outx(
                "\n\n<b>What do you do to her, and if anything, which of your body parts do you use?</b>",
            );
            this.choices(
                "Dick Fuck",
                fitsFuck,
                "DickTooBig",
                tooBig,
                "CorruptDick",
                corruptTooBig,
                "Dick In Ass",
                buttseks,
                "Jog Fuck",
                jog,
                "Breastfeed",
                feeder,
                "Web Condom",
                spiderCondom,
                "Pussies",
                cuntFuck,
                "Lay Eggs",
                eggs,
                "Leave",
                this.cleanupAfterCombat,
            );
        } else if (feeder != undefined || eggs != undefined) {
            this.outx("\n\n<b>You aren't horny enough to rape her, but ");
            if (feeder != undefined)
                this.outx(
                    "your nipples ache with the desire to feed her your milk.  Do you feed her milk or leave?</b>",
                );
            else
                this.outx(
                    "your abdomen aches with the desire to impregnate her full of insect eggs.  Do you?</b>",
                );
            this.simpleChoices(
                "Feed",
                feeder,
                "Lay Eggs",
                eggs,
                "",
                undefined,
                "",
                undefined,
                "Leave",
                this.cleanupAfterCombat,
            );

        } else {
            trace("falling through gobboAssassinRapeIntro");
            this.cleanupAfterCombat();
        }
    }
    private giveGoblinAMilkMustache(): void {
        this.outx("", true);
        this.outx(
            `You slowly walk up to the downed goblin, gently telling her that everything will be all right now. She looks at you a bit incredulously and spreads her legs, obviously hoping that you will satisfy the urges that she has. You shake your head at her and instead cup your hands under your ${this.biggestBreastSizeDescript()} and tell her that it's feeding time. The goblin looks at you annoyed and says, "<i>I don't want your breasts! I want your naughty bits!</i>" You laugh at her and grab her arms, pulling them behind her head.\n\n`,
            false,
        );

        this.outx(
            `She struggles against your grip, trying to get something, anything inside her needy pussy while yelling "<i>Come on ${this.player.mf(
                "slut",
                "stud",
            )}, you know you want to - mmph!</i>"  You cut her off by shoving her mouth onto your ${this.nippleDescript(
                0,
            )}. She gasps involuntarily, filling her mouth with your milk. In an instant she freezes, then slowly swallows the milk in her mouth. She relaxes in your arms a moment later, gently suckling at your nipple. Her old lust-filled self is gone, replaced with a pliant girl who now wants nothing but your milk. You slowly lower your hand and start rubbing at her still-slick pussy. In response, she puts her hand on your other ${this.nippleDescript(
                0,
            )}, playing with it and teasing you.\n\n`,
            false,
        );

        this.outx(
            `After a while, you feel the goblin fall asleep in your arms. Even then, she still continues suckling gently on your ${this.nippleDescript(
                0,
            )}. You smile, satisfied, and gently lift the goblin off your chest. You pat her shoulder softly, and she stirs awake again. She gives you a bit of a dazed look before you give her a gentle push, and she starts walking away with a vacant, drooling stare.`,
        );
        // set lust to 0, increase sensitivity slightly
        this.dynStats("lib", 0.2, "lus", -50);
        // You've now been milked, reset the timer for that
        this.player.addStatusValue(StatusAffects.Feeder, 1, 1);
        this.player.changeStatusValue(StatusAffects.Feeder, 2, 0);
        this.cleanupAfterCombat();
    }
    private gobboButtSecks(): void {
        this.spriteSelect(24);
        let x: number = this.player.cockThatFits(this.monster.analCapacity());
        if (x < 0) x = 0;
        this.outx("", true);
        this.outx(this.images.showImage("goblin-win-male-buttsex"));
        this.outx(
            "As usual, you easily defeat another slutty goblin. Was there any doubt you could? Knowing what's about to happen, the goblin braces herself for the inevitable. Her face is flushed from arousal as she licks her lips. To goad you even further, she spreads her legs, revealing more of her sopping cunt.\n\n",
        );
        this.outx(
            '"<i>Fuck me, stud!</i>" she begs. Though defeated, she has to gall to make demands. "<i>Pump me full of your baby batter!</i>" Her defeat doesn\'t seem to do much to silence her tongue.\n\n',
            false,
        );
        this.outx(
            "You're insulted. Who emerged victorious from the prior battle? You could have left her there to wallow in a pool of her own juices if you weren't so damn horny yourself. So what do you do? After some silent pondering, you get a deliciously wicked idea.\n\n",
        );
        this.outx(
            `After quickly removing your ${
                this.player.armorName
            }, you tear off what little clothing the green-skinned woman is wearing.  With ease, you lift her off the ground and position her over your ${this.cockDescript(
                x,
            )}. The little goblin whore is so enthralled with you that her body quivers from excitement.\n\n`,
            false,
        );
        this.outx(
            `With a sneer, you take the crown of your ${this.cockDescript(
                x,
            )} and press it not against her drenched pussy lips, but her asshole!\n\n`,
            false,
        );
        this.outx(
            '"<i>Not there!</i>" she begs, her lips trembling and eyes watering. "<i>I need your spunk to make my own tribe!</i>" she explains.\n\n',
            false,
        );
        this.outx(
            "You say nothing to the trembling woman in your grasp. No words could describe the joy you feel from crushing her dreams. By the elders, this world has truly corrupted you, and you love it!\n\n",
        );
        this.outx(
            `Without any reservations, you slam the goblin whore onto your ${this.cockDescript(
                x,
            )}, virtually impaling her! The immediate tightness of her asshole nearly drives you over the edge! The more she squirms, the tighter her ass muscles squeeze you. You stand frozen in ecstasy for a moment, your tongue drooping out of your mouth and eyes rolling into the back of your head.\n\n`,
            false,
        );
        this.outx(
            `Protesting, the goblin squirms more, even going as far as to beat her fists into your chest; she's so feeble at the moment that her strikes actually tickle. Her puny assault is enough to knock you out of your carnal daze. You grin manically as you grasp her tiny waist and hammer her! Your ${this.cockDescript(
                x,
            )} quickly adjusts to her stretching asshole as you thrust harder and deeper!\n\n`,
            false,
        );
        this.outx(
            `"<i>This isn't what I wanted!</i>" she cries, "<i>This isn't what I wanted!</i>" If your ${this.cockDescript(
                x,
            )} expanding her ass wasn't enough, she can feel your `,
        );
        if (this.player.balls > 0) this.outx(this.sackDescript(), false);
        else this.outx(this.hipDescript(), false);
        this.outx(" smacking her plump rump with each thrust, as if to tease her.\n\n");
        this.outx(
            "The tight confines of the goblin's asshole prove too much for you. Your body convulses wildly as you unload a massive load in her. Spent, you throw the little whore onto the ground; you have no further use for her at the moment.\n\n",
        );
        this.outx(
            `As you pick up your ${this.player.armorName} and begin to get dressed, you glance at the goblin. Her hands began to dig in her now stretched out anus, desperately trying to gather up the cum you deposited in her. Smirking, you walk away nonchalantly, quite pleased with yourself.`,
        );
        this.cleanupAfterCombat();
        this.player.orgasm();
    }

    // [FEMSAUCE]
    private gobboGetsRapedFem(): void {
        this.spriteSelect(24);
        this.outx("", true);
        if (this.player.isTaur()) {
            this.outx(this.images.showImage("goblin-win-female-taur-rapedfem"));
            this.outx(
                'You pick up the goblin, holding her tightly against your side with your arm. You tear a piece of supple leather off of her slutty garments and use it to bind her arms behind her back, just to be sure she can\'t do anything. She looks up at you, her eyes wide and frightened at the thought of being at the mercy of a much larger creature. In spite of it all, she seems more than a little turned on, if the juices staining your flank are any indication. You look down at her and remark, "<i>So the little skank has a submissive streak huh?</i>"\n\n',
                false,
            );

            this.outx(
                "She blushes red and the flow of feminine fluid thickens as she nods. You know she'll probably enjoy whatever sexual act you could perform with her, so you may as well surprise her. A cruel idea forms in the back of your mind – getting revenge for her attempts to drug you. You easily rip the pouches from her belt and pull out a few random bottles. The goblin, understanding your intent, begins struggling to free herself, but you easily restrain the smaller woman and force the drugs into her mouth, one after the another. When she tries to spit them out, you massage her throat, triggering her instinct to swallow.\n\n",
            );

            this.outx(
                `By the third bottle she's given up on struggling free and is instead attempting to find some part of your body to grind against. Her mouth is open wide and her entire face is flushed reddish-purple with desire. You finish force-feeding her the remaining bottles and release her, catching her ankles just before she hits the ground. The scent of her arousal and the vapors from all the drugs and aphrodisiacs give you a bit of a 'contact high', at least in the sense that your ${this.vaginaDescript(
                    0,
                )} drips with feminine moisture. Your arousal can wait. This slut needs to be punished.\n\n`,
                false,
            );

            this.outx(
                "You flip the creature back into the crux of your arm, this time with her facing the opposite direction. *THWACK!* Your hand smacks her nicely rounded ass. You pull back, feeling drops of wetness thanks to her prominent pussy-lips. The little bitch's cunt is so inflamed with need that she's practically squirting from a simple spank. You swat her again, watching her entire body tense and feeling her fluids splatter you. \"<i>YOU GOT ME WET, YOU CUNT!! BAD BITCH!</i>\" you scold, slapping her even harder.\n\n",
            );

            this.outx(
                "The goblin squeals, though in delight or pain you can't be sure. You start spanking her harder and harder, turning her ass from green to red with the repeated abuse. Her entire body begins convulsing and squirting, splattering your arm with her honey. She got off on it! Well, after that kind of show, she's going to get you off too - or else!\n\n",
            );

            this.outx(
                `You drop her for real this time but don't give her the opportunity to stand, roughly shoving your ${this.vaginaDescript(
                    0,
                )} on top of her. She thrashes against you, too lost to her own pleasure to realize what's going on. Her tiny fists beating weakly against your haunches feels surprisingly good, and you allow it to continue for a while until you've had enough 'foreplay' and start to roughly rub your box against her face, letting her tongue slip into your folds.\n\n`,
                false,
            );

            this.outx(
                `You can't see what she's doing but her struggling soon stops as the flavor and scent trigger her to lick. You tremble; it feels WAY better than it should. Perhaps some of her potions have left a residue on her lips and tongue, but you don't care. You put even more of your considerable weight onto the little slut as your hind legs go weak from pleasure. She reacts by sliding her hands up and pounding on your ${this.clitDescript()}, trying to get you off of her.\n\n`,
                false,
            );

            this.outx(
                "Her efforts are rewarded as you cum on the drugged green bitch, leaving the taste of pussy on her tongue. Her face has a strange dopey smile on it, and she looks like she's in some strange state in between consciousness and sleep. You watch as she twitches and writhes on the ground, gasping for air and orgasming repeatedly. While at first you're worried, the convulsions start to slow down; the little twat ought to be fine.\n\n",
            );

            this.outx(
                "You casually dress, ignoring the pants and moans from the blissed-out goblin, and prepare to leave. Taking one last look over your shoulder, you realize her fluids have made a puddle bigger than her. She'll probably have a hell of a hangover when she wakes up. You sigh and trot off, feeling a bit guilty about overdoing it.",
            );
            this.cleanupAfterCombat();
            this.player.orgasm();
        }
        // Goblin victory rape, female naga:
        else if (this.player.isNaga()) {
            this.outx(this.images.showImage("goblin-win-female-naga-rapedfem"));
            this.outx(
                "You slither over to the helpless goblin, who watches you half in fear, half in curiosity. ",
            );
            // [Has fangs:
            if (this.player.faceType == FACE_SNAKE_FANGS)
                this.outx(
                    "You bare your fangs at her and the curiosity disappears. She turns to run, but your tail is faster than she is.",
                );
            // [No fangs:
            else
                this.outx(
                    "You smile at her and the fear disappears. She's still wary though, and you make sure to grab her with your tail before she changes her mind about you.",
                );
            this.outx("\n\n");

            this.outx(
                "You wrap yourself tightly around your struggling prey, in the process removing her slutty 'clothes'. The incapacitated goblin whimpers plaintively at you and you respond by giving her cunt a smack with your hand. Pulling your hand away, you're surprised at how wet it is. You wipe it dry on her face and bring your head down to her ear.\n\n",
            );

            // [Corrupt characters:
            if (this.player.cor > 60) {
                this.outx(
                    "You hiss something incoherent to the terrified woman, who starts to quiver in your grip. Laughing, your fingers slide into her mouth and she begins to suck on them in an attempt to appease you. Her tiny tongue feels wonderful; clearly she's very experienced at this.  ",
                );
                this.outx(
                    "Using your fingers, you spread open her mouth. She's confused but can't resist as you fiddle with something beside you. She realizes what's about to happen too late, as you pull off a number of shiny flasks from her pouches. As punishment for trying to poison you, you start emptying bottle after bottle into her mouth, stroking her throat and forcing her to drink them down.\n\n",
                );
            }
            // [Non-corrupt characters:
            else {
                this.outx(
                    "You ask her if she's sorry for trying to poison you as your fingers slide around her face. She nods vehemently at you, too constricted or afraid to answer. You smile pleasantly at her and feel her body relax a little in your grip.  Your fingers slide into her mouth and she sucks on them eagerly, clearly not wanting to anger you. Her tongue is talented and you enjoy the experience for a little bit until you decide you've toyed with her enough.\n\n",
                );

                this.outx(
                    "Opening your fingers, you open her mouth and prevent it from closing. The confused goblin tries to see what you're doing beside her but can't. When you bring up a handful of shiny flasks from her pouches though, her body tenses again and she whimpers at you.\n\n",
                );

                this.outx(
                    "Your pity for the creature doesn't extend quite far enough to prevent you from punishing her though, and you pick out some of the less potent looking concoctions from the bunch. While stroking her throat gently to make sure she swallows you pour in vial after vial.\n\n",
                );
            }
            this.outx(
                "The effects don't take long to materialize, and soon the slut is a purplish hue and desperately trying to grind against your coils. She pants and moans in frustration as her dripping cunt can't get enough pleasure from your smooth underbelly, while you wait, enjoying the sensations.\n\n",
            );

            this.outx(
                "You slide your tail up to her cunt and tweak her clit with the tip. She immediately releases a gush of fluids, thoroughly coating your already slick and sticky coils in more of her cum. You waggle your finger in front of her face to tell her off; you're not done with her yet.\n\n",
            );

            this.outx(
                "With a smooth motion your tail slides inside her, causing her to moan in pleasure and buck her hips. You squirm about inside, stretching her so wide you suspect she'll be gaping for quite a while. The tip of your tail hits the end of her love canal and you're surprised to find her uterus is pulsating, trying to grip at something that's not there. Curious, you move your tail up to the opening, which grabs you and drags you inside her womb. You smile at the pleasure-overloaded goblin and begin stroking at the walls. She clamps down hard on you and screams out in ecstasy as her eyes roll back into her head.\n\n",
            );

            this.outx(
                "With no warning you pull out your entire tail, feeling a massive gush of fluids sliding out behind you. The goblin is barely conscious, so you look around inside her pouch for something to help. Nothing seems to look like it would help your cause though, and you're beginning to regret being so vicious, when you notice a particularly tiny flask at the very bottom.\n\n",
            );

            this.outx(
                "You pull it out and examine it. Not much more than a centimeter long, it's filled with a white fluid. There's a label, but the lettering is far too small to read. You think you can make out the word \"<i>wake</i>\", but aren't entirely sure.\n\n",
            );

            this.outx(
                "Shrugging, you dump the contents into the goblin's mouth, little more than a drop that's quickly absorbed into her tongue. For a moment nothing happens, then the tiny figure starts to shake violently. Not sure what to do, you simply stay as you are, holding her tight. The shaking stops as suddenly as it started though, and you think you might have killed her.\n\n",
            );

            this.outx(
                `That's proven very false in a moment though, as her eyes fly open and she yells out "<i>WHOOOOOO!</i>". You're startled at the sudden change in demeanor, but decide to roll with it, shoving your ${this.vaginaDescript(
                    0,
                )} into the evidently very energetic little creature.\n\n`,
                false,
            );

            this.outx(
                'You hear a muffled yell of "<i>YOU GOT IT BOSS!</i>" as she starts licking and gently chewing at you. The feeling is wonderful and you can\'t help but wonder what was in the vial, but the thought is wiped from your mind as you cum, spraying all over her.\n\n',
                false,
            );

            this.outx(
                "You orgasm repeatedly, the goblin not tiring and the residue of the various substances you poured into her still coating her lips and tongue, making you not feel like stopping. Eventually you grow tired, releasing the goblin from your coils. She lands on her feet, does a pirouette, runs about the clearing for a bit (all while giggling like a madwoman), then collapses face first onto her 'clothes'.\n\n",
            );

            this.outx(
                "Thoroughly confused about what just happened, you decide not to test fate by sticking around near the heavily drugged creature and make for camp as soon as you've grabbed your things.",
            );
            this.cleanupAfterCombat();
            this.player.orgasm();
        } else {
            this.outx(this.images.showImage("goblin-win-female-rapedfem"));
            this.outx(
                'You pick up the goblin, sitting her onto your knee and restraining both her arms behind her back with your left hand.  You tear a piece of supple leather off of her slutty garments and use it to bind her arms there.  She looks up at you, her eyes wide and frightened at the thought of being at the mercy of a larger creature.  In spite of it all, she seems more than a little turned on, if the juices staining your knee are any indication.  You look down at her and remark, "<i>So the little skank has a submissive streak huh?</i>"\n\n',
                false,
            );
            this.outx(
                "She blushes red and the flow of feminine fluid thickens as she nods.  You know she'll probably enjoy whatever sexual act you could perform with her, so you may as well surprise her.  A cruel idea forms in the back of your mind – getting revenge for her attempts to drug you.  You easily rip the pouches from her belt and pull out a few random bottles.  The goblin, understanding your intent, begins struggling to free herself, but you easily restrain the smaller woman and force the drugs into her mouth, one after the another.  When she tries to spit them out, you massage her throat, triggering her instinct to swallow.\n\n",
            );
            this.outx(
                `By the third bottle she's given up on struggling and is instead trying to grind her cunt into your knee.  Her mouth is open wide and her entire face is flushed reddish-purple with desire.  You finish force-feeding her the remaining bottles and shove her, catching her ankles to hold her over your leg with her ass in the air.  The scent of her arousal and the vapors from all the drugs and aphrodisiacs give you a bit of a 'contact high', at least in the sense that your ${this.vaginaDescript(
                    0,
                )} `,
            );
            if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_WET)
                this.outx("grows puffy and moist");
            else if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_DROOLING)
                this.outx("drips with feminine moisture");
            else if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_SLAVERING)
                this.outx("slowly begins to soak your thighs");
            else this.outx("drools with need, puddling under you");
            this.outx(".  Your arousal can wait.  This slut needs to be punished.\n\n");
            this.outx(
                "*<b>THWACK</b>!* Your hand smacks her nicely rounded ass.  You pull back, feeling drops of wetness thanks to her prominent pussy-lips.  The little bitch's cunt is so inflamed with need that she's practically squirting from a simple spank.  You swat her again, watching her entire body tense and feeling her fluids splatter you.\n\n",
            );
            this.outx(
                '"<i>YOU GOT ME WET, YOU CUNT!!  BAD BITCH!</i>" you scold, slapping her even harder.\n\n',
                false,
            );
            this.outx(
                "The goblin squeals, though in delight or pain you can't be sure.  You start spanking her harder and harder, turning her ass from green to red with the repeated abuse.  Her entire body begins convulsing and squirting, splattering your arm with her honey.  She got off on it!  Well, after that kind of show, she's going to get you off too - or else!\n\n",
            );
            this.outx(
                `You pull her off your leg and shove her face into your ${this.vaginaDescript(
                    0,
                )}.  She thrashes against you, too lost to her own pleasure to realize what's going on.   Forcefully you put her plump little lips on your box and grind, letting her tongue slip into your folds.  Her eyes are little white slits, her pupils rolled up out of view, but there's enough of something in there that her tongue recognizes the taste and starts licking.  You tremble; it feels WAY better than it should.  Perhaps some of her potions have left a residue on her lips and tongue, but you don't care.\n\n`,
                false,
            );
            this.outx("You cum on the drugged green bitch, ");
            if (this.player.vaginas[0].vaginalWetness > VAGINA_WETNESS_DROOLING)
                this.outx("splattering her with your fluids");
            else if (this.player.vaginas[0].vaginalWetness > VAGINA_WETNESS_SLICK)
                this.outx("coating her face with the proof of your pleasure");
            else if (this.player.vaginas[0].vaginalWetness > VAGINA_WETNESS_WET)
                this.outx("leaving her sticky with your nether-juices");
            else this.outx("leaving the taste of pussy on her tongue");
            this.outx(".  ");
            if (this.player.biggestLactation() >= 3.5)
                this.outx("Milk explodes from your nipples, soaking the petite slut.  ");
            else if (this.player.biggestLactation() > 2)
                this.outx(
                    "Twin streams of milk soak the slut's hair, running down her face like white tears.  ",
                );
            else if (this.player.biggestLactation() >= 1)
                this.outx(
                    "Milk dribbles from your nipples, falling into the little slut's hair.  ",
                );
            this.outx(
                "Her face has a strange dopey smile on it, and she looks like she's in some strange state in between consciousness and sleep.  You grab her by the hair and toss her on the ground, watching her body twitch and jump as her orgasm continues to rack her body.  It looks like it's starting to slow down, the little twat ought to be fine.\n\n",
            );
            this.outx(
                "You casually dress, ignoring the pants and moans from the blissed-out goblin, and prepare to leave.   Taking one last look over your shoulder, you realize her fluids have made a puddle bigger than her.  She'll probably have a hell of a hangover when she wakes up.  You ",
            );
            if (this.player.cor > 50) this.outx("smirk");
            else this.outx("sigh");
            this.outx(" and saunter off, feeling ");
            if (this.player.cor < 50) this.outx("a bit guilty about overdoing it.");
            else this.outx("thoroughly satisfied with your revenge.");
            this.cleanupAfterCombat();
            this.player.orgasm();
        }
    }

    // Corrupt too big fuck
    private rapeAGoblinCorruptTooBig(): void {
        const x: number = this.player.biggestCockIndex();
        this.outx("", true);
        this.spriteSelect(24);
        this.outx(this.images.showImage("goblin-win-male-corruptedfuck"));
        this.outx(
            `You begin to remove your ${
                this.player.armorName
            }, looking down on your helpless would-be-attacker and soon-to-be victim while licking your lips hungrily. Your ${this.multiCockDescriptLight()}`,
        );
        if (this.player.cockTotal() == 1) this.outx(" is");
        else this.outx(" are all");
        this.outx(
            " far more aware of the situation than she is as you stoop down and strip her of every scrap of her admittedly sparse clothing. While you look her over, ",
        );
        if (this.player.cockTotal() > 1)
            this.outx(
                `one of your ${this.multiCockDescriptLight()} comes to rest on top of her and the fact that it's `,
            );
        else
            this.outx(
                `your ${this.cockDescript(x)} comes to rest on top of her and the fact that it's `,
            );
        if (this.player.cocks[0].cockLength < 20) this.outx("about as long as her entire torso");
        else this.outx("bigger than she is");
        this.outx(" gives you a wicked idea.\n\n");

        this.outx(
            `You have a seat, legs wide, on the ground and hold the little goblin whore with her relatively tiny slit resting at the tip of your ${this.cockDescript(
                x,
            )}. Finally out of her stupor a look of extreme conflict crosses her face as her need for cock and cum goes to war with her survival instincts. On the brink of defeat, those instinct suddenly regroup and beat back her lust once she feels the pain of just the ${this.player.cockHead(
                x,
            )} of your ${this.cockDescript(
                x,
            )} starting to stretch out her ${this.monster.vaginaDescript()}. She does all she can to resist, but with the way you're holding this is little more than flailing wildly and pushing against your ${this.cockDescript(
                x,
            )} with her feet, practically climbing it like the tree trunk it must look like from her perspective.\n\n`,
            false,
        );
        this.outx(
            `Both of you dripping with sweat from your respective exertions, you slowly begin to realize the combination of her furious struggling and the tightness of her ${this.monster.vaginaDescript()} is going to keep you from the penetration you were so looking forward to. However, as you begin to consider finishing off in her throat, a darkness stirs and another idea crosses your mind.\n\n`,
            false,
        );
        this.outx(
            `The goblin relaxes a little when she feels you no longer pressing her down onto your ${this.cockDescript(
                x,
            )}. She absolutely thrills when you bring her tiny pussy to your lips and begin to have at it. Your tongue plays around both on the inside and outside of her ${this.monster.vaginaDescript()} until you coax her little nub out from hiding. You wrap your lips around it and begin putting your corruption to task. As you drive the goblin slut closer and closer to orgasm, working over her clit with an expertise rarely found outside of the infernal ranks, bolts of corrupt energies travel from your tongue, through her clit, and deep into her core. As she cums, screaming, you pull off of her, admiring the outward signs of your demonic handiwork. What before was an average sized love button has swollen five times its size into a proud, engorged clit... and that's not the only thing you enlarged.\n\n`,
            false,
        );

        this.outx(
            `You reposition your fucktoy so that now she's facing away from you and again bring your ${this.cockDescript(
                x,
            )} into contact with her ${this.monster.vaginaDescript()}. Again she struggles, but after her orgasm she doesn't have the strength to put up a decent fight; all her resistance does is arouse you further, now that she's fighting the inevitable. You begin to press her down onto yourself.\n\n`,
            false,
        );

        this.outx('"<i>Too much...</i>" she says, weakly. The tip of the head pops in.\n\n', false);
        this.outx(
            '"<i>You\'ll kill me...</i>" she pleads. The rest of the head follows.\n\n',
            false,
        );
        this.outx('"<i>Stop...</i>" she begs. The shaft starts to sink in.\n\n', false);
        this.outx('"<i>Don\'t...</i>" More enters her small body.\n\n', false);
        this.outx('"<i>Please...</i>" She fills to capacity.\n\n', false);
        this.outx('"<i>Please...</i>" And beyond.\n\n', false);
        this.outx('"<i>... Fuck me.</i>"\n\n', false);
        this.outx(
            `You ram home the rest of your ${this.cockDescript(
                x,
            )} left outside of your newly christened dick jockey. It's enough to orgasm the bitch, and you haven't even gotten started. You `,
        );
        if (this.player.cocks[0].cockLength < 20)
            this.outx("can feel the massive bulge in her midsection");
        else this.outx("stretch her so much that you can see the bulge even from this angle");
        this.outx(
            ` and it drives your lust even higher. You withdraw more cock from the hole than your cum starved slut has body, causing her eyes to roll into the back of her head as her ${this.monster.vaginaDescript()} clamps down on you and she cums again. Every time you pull out or hammer home brings her off to the point that by the time you've both gotten down on all fours, rutting like a pair of wild animals, she can only lie there, practically foaming at the wide open mouth`,
        );
        if (this.player.biggestTitSize() >= 1) {
            this.outx(`, her head resting between your ${this.breastDescript(0)}`);
            if (this.player.biggestLactation() >= 1) {
                this.outx(` as your ${this.nippleDescript(0)} `);
                if (this.player.biggestLactation() < 2)
                    this.outx("occasionally drip milky tears onto her face");
                if (this.player.biggestLactation() < 3)
                    this.outx("weep streams of milk onto her features");
                else this.outx("plaster her with gouts of fluid");
            }
        }
        this.outx(". Her hair is matted with");
        if (this.player.biggestLactation() >= 1) this.outx(" milk and");
        this.outx(
            " the sweat of the both of you, and the only sound she makes is an occasional gurgle of ecstasy every few orgasms.\n\n",
        );
        this.outx(
            '"<i>Alright, whore. You wanted my babies? Here. They. CUM!</i>" you yell. However, ',
            false,
        );
        if (this.player.hasVagina()) {
            this.outx(`while your ${this.vaginaDescript(0)} `);
            if (this.player.vaginas[0].vaginalWetness <= VAGINA_WETNESS_SLICK) this.outx("juices ");
            else if (this.player.vaginas[0].vaginalWetness <= VAGINA_WETNESS_DROOLING)
                this.outx("floods ");
            else this.outx("explodes ");
            if (this.player.cockTotal() > 1)
                this.outx(`and the rest of your ${this.multiCockDescriptLight()} drench her, `);
        } else if (this.player.cockTotal() > 1) {
            this.outx(`while your other ${Appearance.cockNoun(CockTypesEnum.HUMAN)}`);
            if (this.player.cockTotal() > 2) this.outx(" drench her, ");
            else this.outx(" drenches her, ");
        }
        this.outx("the bitch is too tight! Like a natural cock-ring! ");
        if (this.player.balls >= 2)
            this.outx(`Your ${this.ballsDescriptLight()} are trying but, h`);
        else this.outx("H");
        this.outx(
            `er spasming ${this.monster.vaginaDescript()} is clamping down so hard on your ${this.cockDescript(
                x,
            )} that it can't release.\n\n`,
            false,
        );
        this.outx(
            "The moment passes and you're left unsatisfied.  This only serves to piss you off as your cum receptacle fails in its one duty. You, however, are undaunted. In fact you redouble your efforts. If this size queen slut wants to deny you your pay off while getting off herself, well, you'll just have to cum her into oblivion the next go-round.\n\n",
        );
        this.outx(
            "For what seems like hours you almost literally screw the brains out of her little green head, working yourself back up to the brink. You consider pulling out this time, but decide against it. At least two loads worth at once; it'll work, and the bitch has it coming.\n\n",
        );
        this.outx(
            '"<i>Let\'s. Try. This. AGAIN!</i>" you shout, pulling the two of you back into a sitting position and arching both of your backs.\n\n',
            false,
        );
        this.outx(
            `Your ${this.cockDescript(
                x,
            )} is pressed so firmly against her skin that you can see the cum working its way up and out of your shaft and bloating your goblin toy with only the first shot. `,
        );
        if (this.player.cockTotal() > 2)
            this.outx(
                `Your remaining ${this.multiCockDescriptLight()} blast geysers into the air, coating you both in your spunk. `,
            );
        if (this.player.cockTotal() == 2)
            this.outx(
                "Your remaining penis blasts geysers into the air, coating you both with spunk. ",
            );
        this.outx(
            "The same tightness that prevented your cumming the first time now ensures that none of the copious amount of seed you blast into her escapes until you pull out. It's a good thing your corruption was so effective, as she is beginning to look pregnant enough to hold a beach ball.\n\n",
        );
        this.outx(
            `Finally you blow your last wad into this latest piece of ass, shoving her off of your ${this.cockDescript(
                x,
            )} and letting her fall to the ground. The impact sends torrents of cum sluicing out of her.\n\n`,
            false,
        );
        this.outx(
            "You stand and prepare to leave, looking down at the goblin slut you just finished with.\n\n",
        );
        this.outx(
            '"<i>I hope my daughters are a better fuck than their bitch mother,</i>" you say. "<i>Tell\'em to find me if they want to get split like a log too.</i>"',
            false,
        );
        this.outx("\n\nShe absolutely will.");
        this.player.orgasm();
        this.dynStats("cor", 1);
        this.cleanupAfterCombat();
    }

    // (TOO BIG – pin the bitch to the ground with your cock, coat it in her potions, and make her lick it clean, then blow your load in her mouth, possible cum inflation.)
    private manRapesGoblinTooBig(): void {
        this.outx("", true);
        this.outx(this.images.showImage("goblin-win-male-corruptedbj"));
        const x: number = this.player.biggestCockIndex();
        this.spriteSelect(24);
        this.outx("You whip out your stiffening maleness, revealing its ");
        if (this.player.cockArea(x) < 80) this.outx("nearly ");
        this.outx(
            " absurd size to your victim.  The goblin-girl's eyes grow to the size of dinner plates in shock as she takes in the view.   Knowing you'll try regardless of the size-mismatch, she spreads her legs and settles herself more comfortably on the ground.\n\n",
        );
        this.outx("You ");
        if (this.player.cor < 50)
            this.outx("shrug and guess you may as well try since she's ready");
        else this.outx("grin, happy to try and stretch her around yourself");
        this.outx(".  The ");
        if (this.player.cocks[0].cockType == CockTypesEnum.HORSE) this.outx("flare");
        else this.outx("head");
        this.outx(
            ` of your ${this.cockDescript(
                x,
            )} visibly pulses in excitement as you brush it against her already-slick folds.  She squirms under you, clearly enjoying the feeling of you pushing against her opening.  With painful slowness, you begin pushing forward, feeling her body stretch around your `,
        );
        if (this.player.cocks[0].cockType == CockTypesEnum.HORSE) this.outx("flare");
        else this.outx("crown");
        this.outx(
            ", but after a moment or two of progress the tiny passage will stretch no more, and you're sure you can't force any more in without hurting her.\n\n",
        );
        this.outx(
            `Disgruntled with the tease, you pull out and slide it onto her torso, pinning her underneath your ${this.cockDescript(
                x,
            )} and smearing her face and body with her juices.  Her tits squish down enough that her erect little purple nipples barely poke out on each side.  The little slut looks relieved and more than a little turned on.  She licks her lips and speaks happily, "<i>Thanks hun, I think you would have torn me in half!  Don't worry, I'm more than happy to get soaked with your cum,</i>" as she wraps her arms and legs around you`,
        );
        if (this.player.hasKnot(0))
            this.outx(" hooking the heels of her feet just behind your knot");
        this.outx(".\n\n");
        this.outx(
            '"<i>She\'s good at this,</i>" you muse as she begins grinding underneath you, using her legs to piston her entire body up and down your length, her arms and hands rubbing and caressing you with surprising passion.  The feeling is intense – these goblins know how to please a ',
            false,
        );
        if (this.player.gender == 3) this.outx("herm");
        else this.outx("man");
        this.outx(
            `, that's for sure!  You start dripping with excitement, soaking the goblin's face with an errant drop.  Her smile only broadens when she blinks it away.   A trail of warm wetness licks its way up your tip as the goblin greedily begins to devour your pre, going so far as to lick it from your urethra.  Your ${this.hipDescript()} twitch, lifting her off the ground as she clings to your member.\n\n`,
            false,
        );
        this.outx(
            `You'd never think such an act would be so enjoyable, but it's just too good.  You lose control, blasting a load of hot seed over the goblin's face.  She sputters and tries to wipe the spunk from her eyes when your next blast hits her square in the forehead, unbalancing the sprightly woman.   She thumps down hard on the ground after losing her grip on your spasming ${this.cockDescript(
                x,
            )}.  You step back, dick bobbling in the air as your orgasm finishes, `,
        );
        if (this.player.cumQ() < 75)
            this.outx("splattering her a few more times with potent seed.  ");
        else if (this.player.cumQ() < 250) this.outx("painting her with a thick layer of seed.  ");
        else this.outx("soaking her and leaving her in a thick puddle of seed. ");
        this.outx(
            'The green slut seems to handle it pretty well, even going so far as to scoop up your spunk and rub it into her cunt as she masturbates.  She licks her lips as she watches you redress, a sultry smile on her cum-painted face, "<i>You tasted as good as I thought stud!  Maybe shrink that bad-boy down and come visit me for a better visit next time ok?  Hopefully by then all this baby batter I\'m cramming into my box will give me a nice belly for you to rub!</i>"\n\n',
            false,
        );
        this.outx(
            "You shake your head and leave, somewhat drained and relieved by the experience.",
        );
        this.player.orgasm();
        this.cleanupAfterCombat();
    }

    // [DUDEGASM]
    private gobboGetsRapedMaleFits(): void {
        this.spriteSelect(24);
        let x: number = this.player.cockThatFits(this.monster.vaginalCapacity());
        if (x < 0) x = this.player.biggestCockIndex();
        this.outx("", true);
        this.outx(this.images.showImage("goblin-win-male-getridden"));
        // (FITS( barley) – Get ridden)
        if (this.player.cockArea(x) > this.monster.vaginalCapacity() * 0.8) {
            this.outx(
                `You pick up the defeated goblin, looking her over. She crosses her arms across her chest pitifully and asks, "<i>What now?</i>" with her eyes darting down when she thinks you won't notice. A grimace temporarily crossing her face at the size of your ${this.cockDescript(
                    x,
                )}. You get the idea of giving her more cock than she can handle, and lower her down towards your ${this.cockDescript(
                    x,
                )}. The tip slips between her moist and folds, stretching her and taking some of her weight off your arms. She winces slightly, wrapping her legs as far around your ${this.hipDescript()} as possible.\n\n`,
                false,
            );
            this.outx(
                "You start walking, letting your movements work with gravity, allowing you to penetrate her with little difficulty. Those puffy wet walls clench you tightly as she slides down, ",
            );
            if (this.player.cocks[0].cockType == CockTypesEnum.DEMON)
                this.outx("rubbing painfully against your demonic nubs");
            else if (this.player.hasKnot(0)) this.outx("stretching painfully around your knot");
            else if (
                this.player.cocks[0].cockType == CockTypesEnum.HORSE ||
                this.player.cocks[0].cockType.Index > 3
            )
                this.outx("feeling painfully tight around you");
            this.outx(
                ". With each and every step she slides down further, stretching her to capacity, until she sits almost completely impaled on you, grabbing your ",
            );
            if (this.player.biggestTitSize() >= 1)
                this.outx(this.player.allBreastsDescript(), false);
            else this.outx("torso");
            this.outx(
                " to help support herself.  A steady pulse of motion massages you in time with the green girl's breathing.  You realize just how much of her body must be devoted to accommodating monstrous members, no wonder goblins are so fragile in a fight!\n\n",
            );
            this.outx(
                'She pants happily, her tongue rolling free from her mouth as she comments, "<i>So full. . .</i>"  Still wincing from the monster inside her she begins to cheer you on, "<i>oooh go-ah-faster! I wanna bounce!</i>"\n\n',
                false,
            );
            this.outx(
                `It's all the encouragement you need, and you break into a run, feeling her lithe form bounce on your ${this.cockDescript(
                    x,
                )}, drawing out a cacophony of cries ranging from happy wails and moans to slight yelps of pain. Her tiny fists dig into your `,
            );
            if (this.player.biggestTitSize() >= 1) this.outx("tits");
            else this.outx("skin");
            this.outx(
                " as she hangs on, clenching and smashing her ample tits against you. You run hard, feeling her bounce and wriggle as her cunt and rapid breathing squeezing and milking you like you never before. You're sure if you could feel like this every time you took a jog, you'd be in great shape.\n\n",
            );
            this.outx(
                '"<i>Ooh fuck stud, bounce me! Yeah just like that,</i>" she moans, "<i>Are you gonna cum? Omigod please cum, I need you to fill me up just like this!</i>"\n\n',
                false,
            );
            this.outx(
                `The familiar tightness of a coming orgasm grows in your groin, tightening as you near release. You pick up the pace, full out sprinting, letting the girl bounce and jiggle as she clings to you, supported entirely by your ${this.cockDescript(
                    x,
                )}. `,
            );
            if (this.player.balls > 0)
                this.outx(
                    `Your ${this.ballsDescriptLight()} tighten, releasing the seed of your orgasm.  `,
                );
            this.outx(
                "The howl of a powerful orgasm fills your ears as your cumming sets off the little green cock-sleeve. One of her hands lets go, and starts rubbing her belly while she kisses and licks your belly-button.",
            );
            if (this.player.cumQ() >= 100)
                this.outx(
                    `  Your enhanced body easily stuffs her full of cream, pudging her belly out slightly, your seed staying embedded in her womb with nowhere to escape, her cunt plugged tightly with your ${this.cockDescript(
                        x,
                    )}.`,
                );
            if (this.player.cumQ() >= 500)
                this.outx(
                    `  The orgasm is so potent that by the time you wind down, she looks to be sporting a pregnancy the size of a medicine ball.  Your cum is trapped inside her, unable to find any gap between her walls and your ${this.cockDescript(
                        x,
                    )}.`,
                );
            else if (this.player.cumQ() >= 250)
                this.outx(
                    `  The orgasm is so potent that by the time you wind down, she looks heavily pregnant.  Your cum is unable to find any gap between her walls and your ${this.cockDescript(
                        x,
                    )}.`,
                );
            this.outx("\n\n");
            this.outx(
                "You pant and stop, pulling the stuffed goblin off you and setting her on the ground, smiling in satisfaction as your cum ",
            );
            if (this.player.cumQ() >= 250) this.outx("pours out in a river");
            else this.outx("leaks");
            this.outx(
                ' from her now-gaping twat. She rubs her belly and blows you a kiss, still trying to catch her breath. You smirk and begin redressing. Once finished, you start walking away, but she calls out one last time to you, "<i>MMMmm I hope you don\'t mind if I find you again. I need more of your baby batter so I can give you lots of beautiful sluts to fuck!</i>"\n\n',
                false,
            );
            if (this.player.cor > 50) this.outx("Chuckling");
            else this.outx("Shuddering");
            this.outx(", you make your way back to camp, satisfied.");
        }
        // (FITS – Get ridden)
        else {
            this.outx(
                `You pick up the defeated goblin, looking her over.  She crosses her arms across her chest pitifully and asks, "<i>What now?</i>" with her eyes darting down when she thinks you won't notice.  You muse to yourself 'great minds think alike' and lower her down towards your ${this.cockDescript(
                    x,
                )}.  The tip slips between her moist and parted folds, brushing against her entrance and taking some of her weight for you.  She goes cross-eyed and smiles happily, wrapping her legs as far around your ${this.hipDescript()} as possible.\n\n`,
                false,
            );
            this.outx(
                "You start walking, letting the movements work with gravity to allow you to effortlessly penetrate her.  Those puffy wet walls clench you tightly as she slides down ",
            );
            if (this.player.cocks[0].cockType == CockTypesEnum.DEMON)
                this.outx("rubbing perfectly against your demonic nubs");
            else if (this.player.hasKnot(0)) this.outx("stretching tightly around your knot");
            else if (
                this.player.cocks[0].cockType == CockTypesEnum.HORSE ||
                this.player.cocks[0].cockType.Index > 3
            )
                this.outx("feeling absolutely perfect around you");
            this.outx(
                ".  With each and every step you take, she slides down further, until she sits fully impaled on you, grabbing your ",
            );
            if (this.player.biggestTitSize() >= 1)
                this.outx(this.player.allBreastsDescript(), false);
            else this.outx("torso");
            this.outx(
                " to help support herself.   A steady pulse of motion massages you in time with the green girl's breathing, making you realize just how much of her body must be devoted to accommodating monstrous members.\n\n",
            );
            this.outx(
                'She pants happily, her tongue rolling free from her mouth as she cheers you on, "<i>oooh go-ah-faster!  I wanna bounce!</i>"\n\n',
                false,
            );
            this.outx(
                `It's all the encouragement you need, and you break into a run, feeling her lithe form bounce on your ${this.cockDescript(
                    x,
                )}, drawing out a cacophony of happy wails and moans.  Her tiny fists dig into your `,
            );
            if (this.player.biggestTitSize() >= 1) this.outx("tits");
            else this.outx("skin");
            this.outx(
                " as she hangs on, clenching and smashing her ample tits against you.  You run hard, feeling her bounce and wriggle as her cunt and rapid breathing begin squeezing and milking you like never before.  You're sure if you could feel like this every time you took a jog, you'd be in great shape.\n\n",
            );
            this.outx(
                '"<i>Ooh fuck stud, bounce me! Yeah just like that,</i>" she moans, "<i>Are you gonna cum? Omigod please cum, I need you to fill me like this!</i>"\n\n',
                false,
            );
            this.outx(
                `The familiar tightness of a coming orgasm grows in your groin, tightening as you near release.  You pick the pace, full out sprinting, letting the girl bounce and jiggle as she clings to you, supported entirely by your ${this.cockDescript(
                    x,
                )}.  `,
            );
            if (this.player.balls > 0)
                this.outx(
                    `Your ${this.ballsDescriptLight()} tighten, releasing the seed of your orgasm.  `,
                );
            this.outx(
                "The howl of a powerful orgasm fills your ears as your cumming sets off the little green cock-sleeve.  One of her hands lets go, and starts rubbing her belly while she kisses and licks your belly-button.",
            );
            if (this.player.cumQ() >= 250) {
                this.outx(
                    "  Your enhanced body easily stuffs her full of cream, pudging her belly out slightly and dripping down your ",
                );
                if (this.player.balls > 0) this.outx(this.ballsDescriptLight(), false);
                else this.outx("legs");
                this.outx(".");
            }
            if (this.player.cumQ() >= 500)
                this.outx(
                    `  The orgasm is so potent that by the time you wind down, she looks heavily pregnant and your cum squirts out of any gap it can find between her walls and your ${this.cockDescript(
                        x,
                    )}.`,
                );
            this.outx("\n\n");
            this.outx(
                "You pant and stop, pulling the stuffed goblin off you and setting her on the ground, smiling in satisfaction as your cum ",
            );
            if (this.player.cumQ() >= 250) this.outx("pours out in a river");
            else this.outx("leaks");
            this.outx(
                ' from her now-gaping twat.  She rubs her belly and blows you a kiss, still trying to catch her breath.  You smirk and begin redressing.  Once finished, you start walking away, but she calls out one last time to you, "<i>Ummm I hope you don\'t mind if I find you again.  I need more of your baby batter so I can give you lots of beautiful sluts to fuck!</i>"\n\n',
                false,
            );
            if (this.player.cor > 50) this.outx("Chuckling");
            else this.outx("Shuddering");
            this.outx(", you make your way back to camp, satisfied.");
        }
        this.cleanupAfterCombat();
        this.player.orgasm();
    }

    // Spider goblin condom
    private goblinCondomed(): void {
        this.spriteSelect(24);
        const x: number = this.player.cockThatFits(this.monster.vaginalCapacity());
        this.outx("", true);
        this.outx(this.images.showImage("goblin-win-male-goblincondomed"));
        this.outx(
            `Defeated, the goblin girl's knees give out and she sinks backward, lying on her back with her emerald ankles suspended above her head. "Use me," she begs, "humiliate, degrade, and debase me! Just, whatever you do, fill me!" As you strip off your ${this.player.armorName}, she spreads her legs as wide as she can, the wanton girl presenting her drooling pussy to you, puffy green lips already dripping with beads of anxious sweat and eager lubrication. She wiggles in the dirt, gripping her plump rear with both hands and lifting her ass into the air for you, hopefully. You can practically feel the heat pouring off the small slut's cum-hungry cunt, her breeding-fever leaving her eyes glassy and unfocused. Standing over her, it's clear that the only things she's even aware of are the pulsing pussy between her legs and your burgeoning erection.\n\n`,
            false,
        );

        this.outx(
            `Impatiently, she thrusts her legs out and hooks her toes around your lower body, trying to pull you closer while still keeping her needy hole accessible. Her olive feet clench around your flesh, her soles firm and muscular on your ${this.player.skinFurScales()} as she slides up and down the outsides of your ${this.hipDescript()}. Dragging her heels across your thighs, the goblin pushes her feet together on either side of your ${this.cockDescript(
                x,
            )}, the balls of her jade skin pressing against `,
        );
        if (this.player.balls > 0) this.outx("your throbbing sack");
        else this.outx("the base of your shaft");
        this.outx(
            " while her digits curl around your member like thick fingers . Stroking you slowly at first, the lime-hued girl picks up her tempo and alternates to the soft embrace of the silken skin between her instep and her calf, using the firmness of her ankles to massage your dick to full-mast. Quivering between her feet, blobs of pre-cum begin to leak from your tip, nearly transparent globules rolling down your glans. The goblin uses her big toes to gather up the warm fluid reverently, letting it flow between each digit gleefully before spreading it back onto your shaft with firm caresses, kneading the seedless ejaculate into your flesh like oil, her feet glistening like sea-green beryl with your fluid.\n\n",
        );

        this.outx(
            `By now, a widening lake of over-stimulated honey has pooled under the lascivious girl. Moaning lewdly, her fingers still digging into her ass cheeks, you realize the goblin is cumming just from giving you a footjob. She needs your dick so badly that it's almost pathetic and a wicked idea crosses your mind.  Taking hold of her pre-cum slick feet, you run your fingers along her ejaculate-softened skin, tickling and rubbing her soles until the girl squeals in ecstasy, clenching her eyes shut as her panting desire becomes too much for her to keep her hands away from her cunt any longer. With a warm splash of overflowing honey, she digs the fingers of her right hand into her verdant slit, her left hand rubbing her jade clit in widening circles so quickly the vibrations jiggle her butt in the mud she's made of the forest floor. While she's distracted, you work your spinnerets, the delicate organ weaving a long, thin sheath of finely meshed spider silk, taking care to leave the sticky strands between the inert layers of the flexible condom. Sliding it over your ${this.cockDescript(
                x,
            )}, you marvel at how light it is! You can even feel the wind's breeze through the silken covering. Time to give the goblin what she asked for, if not what she wanted.\n\n`,
            false,
        );

        this.outx(
            `Still holding her wriggling feet, you bend down and pull her legs apart as far as you can, muscles stretching almost wider and wider as her inner thighs clench against the tugging. The added pressure along with her own frantic jilling crests the girl into another orgasm, this time her gushing lube squirting upwards in crystal streams of depraved lust that patter against your abdomen warmly. Her arms fall at her sides, palms up and fingers twitching, clearing the path for your ${this.cockDescript(
                x,
            )} to the quivering green pussy she has so kindly prepared for you. Pushing against her engorged lips, you find she's so wet that you practically slip right in, her climax-racked muscles spasming irregularly as you fill her with your stiff manhood. "Oh yesss, you finally found your cock" she pants, drool bubbling in her mouth. "Pump me like you hate me, you fucker" she demands and you haul her upward by the ankles, pulling her further onto your pulsing dick, her dribbling cunny sucking at your shaft as her deep green inner folds part before your thrusting length. "I'm not a glass doll, you pussy, just fucking jam it in!" she screams, fingers clawing at the ground as she bucks upward to get more of you inside her.\n\n`,
            false,
        );

        this.outx(
            `The mouthy bitch apparently forgot who lost the fight, it seems, so you decide to remind her. Using her legs like a lever, you twist her around on your dick, spinning her 180 degrees, leaving her lying on her tits, her ass jutting up as you slam your cock the rest of the way into the olive-skinned nympho. She grunts and starts to say something else, but you push forward and grind her face into the mud before she can get it out, her mouth filling with her own lubrication-soaked dirt with an ecstatic gurgle. Her legs fight against your grip, jerking this way and that, her slick feet nearly slipping out of your hands. You grit your teeth and begin screwing her slavering twat as hard as you can, eager to tame the thrashing cunt of a girl. Slamming her sweat-soaked thighs against your ${this.hipDescript()}, your thrusts become almost savage, bringing a deep flush to her backside as you slap her snatch against your groin, the secret condom working perfectly, as thin as skin on your ${this.cockDescript(
                x,
            )}.\n\n`,
            false,
        );

        this.outx(
            `As you feel the tickling heat of your orgasm worming its way into your veins, you lean down, putting your weight into every uterus-filling movement while the goblin sputters and screeches her approval, toes curling in your hands. You release her legs to grab the goblin slut's thin waist with both hands and slam against her jutting ass one last time before liquid heat pours from your ${this.cockDescript(
                x,
            )} in thick streams of potent seed. At the cresting grunt, she wraps her legs around your ${this.buttDescript()}, locking her ankles and using her sore legs to pull your gushing prick as deeply into her fertile loins as possible and keep you there. Rocking against her, you rub her head and breasts through the mud one last time as your loads fill her tummy with the ejaculate she so craved, her narrow belly bulging at the weight of your jizz. You take a moment longer to enjoy the clenching, pulsing depths of the cum dumpster before sliding out an inch and taking hold of the loose strand you left in your secret cock-shawl. Pulling carefully, you unravel the delicate outer layer, leaving only the sticky strands covering the inner, juice-filled sheath. With a short bark of laughter, you pull out of the whorish girl, the spider silk condom sealing as your tip slides out. Then, wresting her feet apart, you unceremoniously dump her to the ground.\n\n`,
            false,
        );

        this.outx(
            'Squirming right-side up, covered in sweat and mud, the emerald girl\'s face screws into an expression of confusion as she pokes at the bulge of her abdomen. "What... that doesn\'t feel right," she mumbles, pushing at her skin with both hands. Checking her cunny with a long, middle finger, she pulls it out clean, devoid of the ivory cream she expected. "The fuck? A condom?" she screeches. "You bastard!" Pushing at her belly with increasingly frantic motions, her mouth gapes when the seed-loaded balloon bounces right back, still intact. "Why won\'t it burst?" she demands. You politely inform her that spider silk is terribly strong and oh so sticky. Reaching her fingers into her slit, she tries to pull it out and gasps at the feeling of her inner walls being pulled by the clinging webbing. Despite her best effort, the silk bubble stays right where you left it, snugly glued in place by your binding webbing. You laugh and wish her luck trying to get it out as you gather your clothes and walk away. So full of cum and yet unable to get any of it into her womb, the goblin girl moans helplessly, fingering herself in desperation, as if her orgasm could dislodge the treasure you\'ve left inside of her.',
            false,
        );

        this.player.orgasm();
        this.cleanupAfterCombat();
    }

    // REQUIRES: AT LEAST ONE DICK AND A COPY OF ATLAS SHRUGGED - MUST NOT BE MONSTROUSLY HUGE
    private gatsGoblinBoners(): void {
        this.outx("", true);
        let x: number = this.player.cockThatFits(this.monster.analCapacity());
        if (x < 0) x = this.player.smallestCockIndex();
        this.outx(this.images.showImage("goblin-win-male-goblinboners"));
        this.outx(
            "The goblin lies strewn across the ground upon her stomach, exhausted from the battle. Her plump legs are unintentionally spread open while her ass pokes up into the air, giving you a clear view of her wet pussy as she tries to get herself off.  It seems as if the green-skinned slut has already forgotten about you - too many fruitless encounters might've caused her to give up hope on finding a virile specimen to pump her full of cum.\n\n",
        );

        this.outx("Luckily for her, you have every intention of changing that.\n\n");

        this.outx("You begin to fondle your cock");
        if (this.player.cockTotal() > 1) this.outx("s");
        this.outx(
            " as you walk towards the unsuspecting goblin girl, taking in the sight of her perfectly round cheeks as they jiggle against her hurried movements, her soft thighs clenched against the eager hand between them.  Bending down, you quickly grab the goblin's ample hips, causing the girl to squeak in surprise as she turns around to catch the sight of your erect length",
        );
        if (this.player.cockTotal() > 1) this.outx("s");
        this.outx(".\n\n");

        this.outx(
            '"<i>W-woah!  Hey stud, whaddya think you\'re doing back there?</i>" she yelps, more surprised than scared at your sudden appearance.  Instead of answering, you decide to grab your cock',
            false,
        );
        if (this.player.cockTotal() > 1) this.outx("s");
        this.outx(" and slap ");
        if (this.player.cockTotal() == 1) this.outx("it");
        else this.outx("them");
        this.outx(
            ` against the bare flesh of her ass, whilst your victim anxiously awaits your next move.  You take your time massaging the goblin's slutty ass with your bare hands before sliding your ${this.cockDescript(
                x,
            )} in between her soft cheeks.  Your horny victim appears impatient, attempting to grind against you as she spreads her moist lips open, enthusiastic that she's found someone willing to mate with her.  You slap her ass firmly as you quicken your thrusting - seconds before finally plunging `,
        );
        if (this.player.cockTotal() == 1)
            this.outx(
                "your dick inside of the panting whore, pushing her forwards violently as you enter her tight snatch",
            );
        else if (this.player.cockTotal() == 2)
            this.outx(
                "both of your dicks inside of the panting whore, pushing her forwards violently as you enter her tight snatch and asshole",
            );
        else {
            this.outx(
                "two of your dicks inside of the panting whore, pushing her forwards violently as you enter her tight snatch and asshole - your other cock",
            );
            if (this.player.cockTotal() >= 4) this.outx("s");
            this.outx(" remaining sandwiched in between her asscheeks");
        }
        this.outx(".\n\n");

        this.outx(
            "You roughly pound against the goblin girl, maintaining a firm grip on her hips while she squeals with delight.  The sound of your groin slapping against her echoes throughout the area, followed by your grunting and the goblin's moans of ecstasy.  Your victim struggles to lift herself up by her arms, only to collapse back down from the feeling of you invading her insides.\n\n",
        );

        this.outx(
            `Eventually you begin to feel yourself coming to a climax, your movements getting faster and faster as you build up to your release.  The goblin below you has already lost herself to the pleasure of your ${this.cockDescript(
                x,
            )}, her eyes rolled upwards and her tongue drooling out of her mouth while her slutty face rubs against the ground you're currently pounding her on.  With a final thrust, your hips lurch forward as you paint her insides with your thick spunk, relishing in the feeling of your ejaculate filling her up to the brim and plugging her entrance`,
        );
        if (this.player.cockTotal() == 2) this.outx("s");
        this.outx(
            ".  You slowly release yourself from her tight body, finishing off by covering her curved back and pert rump with the rest of your seed.\n\n",
        );

        this.outx(
            `You pick yourself back up, jerking yourself slowly as cum dribbles from your ${this.cockDescript(
                x,
            )} onto the collapsed body of the goblin.  It'll be awhile before she comes back to consciousness, but you're certain she'll have a better appreciation for sex when she does.`,
        );
        this.player.orgasm();
        this.cleanupAfterCombat();
    }

    private laySomeDriderEggsInGobboTwat(): void {
        this.clearOutput();
        this.outx(this.images.showImage("goblin-win-drider-egged"));
        // Play standard goblin victory text
        this.outx(
            "The pitiful struggling of the little green-skinned creature as she tries to scramble away from you gives you a rather generous view of her drooling box.  While you feel yourself ",
        );
        if (this.player.hasCock()) this.outx("harden");
        else if (this.player.hasVagina()) this.outx("moisten");
        else this.outx("twitch");
        this.outx(
            " slightly,  you can't help but register the growing weight of your spider half.  Looking down at the goblin again, you decide that maybe you can both get something... <i>similar</i> to what you want.",
        );

        this.outx(
            "\n\nYou quickly undress and skitter over to the sniffling slut, reaching down to pull her up and turning her to face you as you do.  Looping one arm under her armpits, you prod at her soft stomach with your free hand, inquiring about the state of her children.",
        );

        // [if (femininity > 50)
        if (this.player.femininity > 50)
            this.outx(
                "\n\n\"<i>W-what?  You- I haven't got any, you stupid bitch!  This your idea of fun, jackass?  Kicking people when they're down?!</i>\"",
            );
        // [if (femininity < 51)
        else
            this.outx(
                "\n\n\"<i>W-what?  You- I haven't got any, you stupid bastard!  This your idea of fun, jackass?  Kicking people when they're down?!</i>\"",
            );
        this.outx(
            "  She lashes out with her feet, but there's no strength behind it, and her pout deepens as tears begin to gather at the corners of her eyes.",
        );

        this.outx(
            '\n\n"<i>Lemme go, lemme go!</i>"  She squirms around, and you slip your other hand under her arm to help restrain her.  You hold her out further from you as you begin to curl your spider abdomen underneath yourself.  Already, you can see your egg-chute poking free of your carapace, twitching in time with your heartbeat, drooling green lube all over your undercarriage.',
        );

        this.outx(
            "\n\nYour goblin plaything has fallen silent, staring at the thickening rod between your many legs.",
        );

        this.outx(
            '\n\n"<i>What?  What is that?  What\'s it for?</i>"  Her nervous tone does nothing to conceal the interest sliding down her thighs.  You pull her closer, holding her just above your ovipositor, and kiss her on her forehead, promising her all the children she could ever dream of.  Her conflicted smile and heavy panting makes your heart beat just a little faster, and any reply is cut off as you impale the purpled-haired woman on your slippery shaft.',
        );

        this.outx(
            "\n\nStifled gasps and grunts escape her lips as you work her up and down like a living sex toy, stuffing as much of yourself into as you can.  A deep blush spreads across your goblin whore's face; one of her hands twists and pulls at her nipple as she bites down on her lip while her free hand massages excitedly at the bulge you make with every thrust.  Your carapace is slick with a mixture of her juices and the slow leak of your arachnid egg lube.",
        );

        this.outx(
            "\n\nYou finally bottom out, working the green cum-sleeve all the way down as you feel your thickness brush against her cervix.  You slide your hands out from under her arms and reposition them on her shoulders, pinning her in place for what's about to come.  Her stomach pushes out slightly when the first wave of lube forces its way inside her and she gasps in bliss, rubbing her hands across her 'pregnancy'.  Your own smile grows wider as you feel your bottom half clench and shiver, as the first of many eggs forces its way up your ovipositor.",
        );

        this.outx(
            "\n\nYou feel its slow path up into the goblin, your egg-tube flaring out around it, until it stops just short of her womb's entrance.  She looks up from her stomach, her wide-eyed stare meeting yours for only a second before a powerful spasm forces the egg past her clenched cervix.  The miniature whore convulses, her eyes rolling back, tongue lolling as she cums hard, a torrent of girlcum spraying across your chitin.",
        );
        if (this.player.hasCock()) {
            this.outx(
                "  Your own orgasm is just as strong, [eachCock] spraying powerfully across your torso",
            );
            if (this.player.hasVagina()) this.outx("and y");
        } else if (this.player.hasVagina()) this.outx("  Y");
        if (this.player.hasVagina())
            this.outx(
                "our [vagina] clenching in time with hers as your copious fluids drench your spider half.",
            );

        this.outx("\n\nThen the next egg rolls forward, and the next, and the next...");

        this.outx(
            "\n\nYou keep her pinned against your body as you fill her up, one orb at a time, each sphere bloating her stretched stomach a little further, until she's so full you can feel your eggs through the taut skin of her belly.  The goblin is nearly unconscious, insensibly gurgling as the pleasure of her instant pregnancy numbs her mind.  You pull her off with a loud wet plop, her twitching snatch leaking an unending stream of her own clear fluids as well as a sticky string of your green egg-mucus.",
        );

        this.outx(
            "\n\nLaying her down in the shade, you put your clothes back on, glad to be free of the extra weight and ready to continue your adventure.",
        );
        this.player.dumpEggs();
        this.player.orgasm();
        this.cleanupAfterCombat();
    }
}
