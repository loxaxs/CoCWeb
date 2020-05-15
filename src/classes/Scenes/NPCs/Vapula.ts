import {
    LOWER_BODY_TYPE_BEE,
    LOWER_BODY_TYPE_CAT,
    LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS,
    LOWER_BODY_TYPE_DOG,
    LOWER_BODY_TYPE_FOX,
    LOWER_BODY_TYPE_HOOFED,
    LOWER_BODY_TYPE_KANGAROO,
    LOWER_BODY_TYPE_LIZARD,
} from "../../../includes/appearanceDefs";
import { CoC } from "../../CoC";
import { CockTypesEnum } from "../../CockTypesEnum";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { PerkLib } from "../../PerkLib";
import { PregnancyStore } from "../../PregnancyStore";
import { StatusAffects } from "../../StatusAffects";
import { TimeAwareInterface } from "../../TimeAwareInterface";
import { NPCAwareContent } from "./NPCAwareContent";

export class Vapula extends NPCAwareContent implements TimeAwareInterface {
    public constructor() {
        super();
        CoC.timeAwareClassAdd(this);
    }

    // Implementation of TimeAwareInterface
    public timeChange(): boolean {
        if (this.model.time.hours > 23) {
            if (this.vapulaSlave() && this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 0) {
                if (this.flags[kFLAGS.VAPULA_HAREM_FUCK] == 0)
                    this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED]++;
                else this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
            }
            if (
                this.flags[kFLAGS.VAPULA_FOLLOWER] == 0.5 ||
                this.flags[kFLAGS.VAPULA_FOLLOWER] == 1.5
            )
                this.flags[kFLAGS.VAPULA_FOLLOWER]++;
            this.flags[kFLAGS.DAYS_SINCE_LAST_DEMON_DEALINGS]++;
        }
        if (
            this.vapulaSlave() &&
            this.player.hasKeyItem("Demonic Strap-On") < 0 &&
            this.player.gender == 2 &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 0
        ) {
            this.vapulaGivesPCAPresent();
            return true;
        }
        return false;
    }

    public timeChangeLarge(): boolean {
        if (
            this.flags[kFLAGS.VAPULA_FOLLOWER] >= 2.5 &&
            this.model.time.hours == 6 &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 0
        ) {
            this.femaleVapulaRecruitmentPartII();
            return true;
        }
        if (
            this.model.time.hours == 2 &&
            this.vapulaSlave() &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 0 &&
            this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] >= 5 &&
            (this.player.hasCock() ||
                (this.player.hasKeyItem("Demonic Strap-On") >= 0 && this.player.hasVagina()))
        ) {
            this.vapulaForceFeeds();
            return true;
        }
        return false;
    }
    // End of Interface Implementation

    public vapulaSlave(): boolean {
        return this.flags[kFLAGS.VAPULA_FOLLOWER] == 1;
    }

    // Two nights after "vagina enslave", if PC still meets initial requirements (else defer until she does)(Z)
    public femaleVapulaRecruitmentPartII(): void {
        this.outx(
            "\nYou are awoken by long fingers inching up your inner thighs, testing and caressing your soft flesh. You sigh, open your eyes, and are confronted by an excited, purple face looming over you."
        );
        this.outx(
            '\n\n"<i>I have found you, mistress,</i>" Vapula whispers.  "<i>And I have done what I promised!  Look.</i>"  She proudly produces an obscene-looking device, replete with rounded nodules and hanging straps.'
        );
        this.outx(
            "\n\nYou rub your eyes, accept the thing off the succubus and examine it.  It's a double dildo fitted with a harness: a strap-on that is evidently designed to fuck the user whilst they themselves are fucking. One end is relatively small, pink and fleshy-looking, the other is an eight inch purple monster covered in ludicrous orange leopard spots.  Vapula draws in close to you and eagerly points out its features as you turn it around in your hands."
        );
        this.outx(
            "\n\n\"<i>There aren't many strap-ons around like this, mistress; Lethice would kill me twice if she knew I had taken it.  The big end has a reservoir of spunk that refills itself - so you can feed me whenever you want.  The other end can be controlled with your mind to be any size you wish.  So you can pack your love tunnel out when you're fucking me, making yourself stupid with lust, or fill it just big enough to tease ever so slightly at that sexy little button you've got down there.</i>\"  Vapula is practically panting when she finishes, her hot breath rolling over you as she stares into your eyes.  Your new slave has done well here, perhaps better than she imagines.  If it works like she says it does, then you can have total say over the succubus's cum intake without being beholden to your own urges - giving you a huge amount of control over her.  The thought makes you bend into Vapula and kiss her hungrily, quickly pushing past her soft lips and sharp fangs to roughly tongue-fuck her.  She moans, sending pleasurable vibrations through your face, and wraps her own long tongue around yours, your saliva and warm muscle melding into one.  After a long minute you slowly pull away, trailing saliva from her lips."
        );
        this.outx(
            '\n\n"<i>Well done, my slave,</i>" you purr, caressing her face.  "<i>I will be sure to reward you with this item of yours, in the fullness of time.  Repeatedly.</i>"  Vapula grins with barely contained enthusiasm, before rising and slowly walking away from your bed, beading a trail of juices from her cunt as she goes.'
        );
        // [Vapula added]
        this.flags[kFLAGS.VAPULA_FOLLOWER] = 1;
        this.flags[kFLAGS.VAPULA_HAREM_FUCK] = 1;
        // [Demonic dildo added]
        this.player.createKeyItem("Demonic Strap-On", 0, 0, 0, 0);
        this.outx("\n\n(<b>Gained Item: Demonic Strap-On</b>)");
        this.doNext(this.playerMenu);
    }

    public vapulaGivesPCAPresent(): void {
        this.outx(
            '\nVapula walks up to you and frowns, clearly disappointed.  "<i>Since you got rid of the only way you could properly feed me, I got you this.</i>"\n\nShe drops a strap-on into your hand as she explains, "<i>It can convert the lust of a woman into something that will be palatable to my... appetites.  You\'re welcome.</i>"'
        );
        this.outx(
            "\n\nShe walks away without another word.  It might be time for some discipline."
        );
        this.player.createKeyItem("Demonic Strap-On", 0, 0, 0, 0);
        this.outx("\n\n(<b>Gained Item: Demonic Strap-On</b>)\n");
    }

    // Slave Vapula
    // Camp lines
    public vapulaSlaveFlavorText(): void {
        let choice: number = Vapula.rand(11);
        if (choice == 0)
            this.outx(
                "Vapula is currently resting on a very rough bed of leaves she's gathered herself.  She sleeps quietly, her hand absent-mindedly laid on her vagina and the other one resting on her breasts.  A thin trickle of her juice is leaking out of her crotch."
            );
        if (choice == 1)
            this.outx(
                "Your succubus slut, Vaplua, is furiously stroking herself on her bed of leaves, her purple body shining in sweat.  She moans raggedly, often looking up to you with lust-consumed eyes."
            );
        if (choice == 2) {
            if (this.flags[kFLAGS.VAPULA_HAREM_FUCK] == 0) choice = 3;
            else
                this.outx(
                    "Vapula is currently absent, probably getting screwed by some of the imps surrounding your camp in order to get her semen rations.  You're sure she would come back instantly if you ever needed to give her YOUR cum instead."
                );
        }
        if (choice == 3)
            this.outx(
                "Vapula is busy drinking a vial of milk that looks very much like the kind you'd usually find on imps.  Her purple cheeks seem to blush darker when she sees you; she awkwardly gulps the rest of the bottle, hiccups, and giggles softly, eyeing you with a coy smile and a lust-filled gaze.  The potion seems to have made her even more aroused than usual."
            );
        if (choice == 4) {
            this.outx("Vapula is currently toying with ");
            if (this.player.hasKeyItem("Deluxe Dildo") >= 0) this.outx("your deluxe dildo");
            else this.outx("a dildo");
            this.outx(
                ", pumping as fast as she can.  In her feverish display of lust she doesn't even notice you."
            );
        }
        if (choice == 5) {
            if (this.flags[kFLAGS.VAPULA_HAREM_FUCK] == 0 || !this.sophieBimbo.bimboSophie())
                choice = 6;
            // if harem fucking is on)
            else
                this.outx(
                    "Vapula is fingering herself while eating out Sophie, your harpy slut.  The dumb avian matron keeps moaning like she's in heat while the succubus furiously assaults her lush fuck-hole; both of their pair of wings flap in rhythm as they feel their pleasure rising in waves."
                );
        }
        if (choice == 6) {
            if (
                this.flags[kFLAGS.VAPULA_HAREM_FUCK] == 0 ||
                this.flags[kFLAGS.IZMA_NO_COCK] > 0 ||
                !this.izmaFollower()
            )
                choice = 7;
            // if Izma has cock and harem fucking is on)
            else
                this.outx(
                    "Your succubus is currently very busy with Izma, your tigershark lover.  Izma is standing and hiding Vapula from your sight and you don't notice what Vapula is doing to her until you see her frantic bobbing movements, and hear Izma's hisses and growls of pleasure.  Obviously your succubus must get the cum she needs from somewhere."
                );
        }
        if (choice == 7) {
            // if C. Jojo and harem fucking is on)
            if (this.flags[kFLAGS.VAPULA_HAREM_FUCK] == 0 || !this.jojoScene.campCorruptJojo())
                choice = 8;
            else {
                this.outx(
                    "You routinely hear screams of pleasure outside the camp, as well as some frantic male squeaks coming from Jojo, your "
                );
                if (this.jojoScene.tentacleJojo()) this.outx("tentacled ");
                this.outx("mouse pet.  Vapula seems to be having a lot of fun with your fuck-toy!");
            }
        }
        if (choice == 8) {
            if (
                this.flags[kFLAGS.VAPULA_HAREM_FUCK] == 0 ||
                !(this.amilyScene.amilyFollower() && this.amilyScene.amilyCorrupt())
            )
                choice = 9;
            // if C. Amily and harem fucking on)
            else
                this.outx(
                    "Vapula is busy caressing your corrupted mousette, Amily while softly kissing her breasts.  Her fingers are buried in your fuck-toy's pussy, and Amily is moaning whorishly and doesn't even bother to stop when she looks at you, her helpless eyes betraying her lack of control over her own lust."
                );
        }
        if (choice == 9) {
            if (this.player.findStatusAffect(StatusAffects.CampRathazul) < 0) choice = 10;
            else
                this.outx(
                    "Vapula is having a very active conversation with Rathazul, the alchemist.  They seem to be discussing the chemical properties of demonic mixtures and the various taints that could occur from their ingestion.  The succubus is holding a bottle of a purplish white fluid that appears to be her own milk, probably waiting for an analysis."
                );
        }
        if (choice == 10)
            this.outx(
                "Vapula is resting on her stomach, a buttplug shoved into her ass.  She doesn't seem to notice you watching her butt jiggle under the effect of her unconscious anal contractions."
            );
    }

    // Vapula-Followers interaction: Puru Puru Mouse (Z)
    // switch follower names depending on conditions
    public mouseWaifuFreakout(amily = false, jojo = false): void {
        this.clearOutput();
        if (amily) {
            this.outx("Amily ");
            if (jojo) this.outx("and ");
        }
        if (jojo) this.outx("Jojo ");
        this.outx("walk");
        if (!(amily && jojo)) this.outx("s");
        this.outx(" up to you, worried, as Vapula struts around the camp.");
        this.outx(
            '\n\n"<i>' +
                this.player.short +
                ', what is this? Am I dreaming or did you actually bring a demon to your camp? What in the world is wrong with you?</i>"'
        );
        this.outx(
            "\n\n\"<i>Relax,</i>\" you answer.  \"<i>Yes, she's a demon, but she's MY demon. She's under control, aren't you, honey?</i>\"  The succubus simpers softly and nods."
        );
        this.outx(
            '\n\n"<i>But... but this is insane!  You\'re supposed to be fighting demons, not joining them!  Did the taint of this cursed land somehow get the better of you?  Did you lose your soul yet?  These monsters are the same ones who destroy and corrupt innocents, and you invite one of them to camp?  This is madness!</i>"'
        );
        this.outx(
            "\n\nYou try your best to explain that Vapula is a renegade, that she fears Lethice."
        );
        this.outx(
            "\n\n\"<i>She's still a demon!  A succubus!  She'll suck the living soul out of you!</i>\""
        );
        // [if libido >=50]
        if (this.player.lib >= 50)
            this.outx('"<i>Well, as long as she swallows, I don\'t care,</i>" you quip.');
        this.outx('\n\n"<i>That\'s it!</i>"  The ');
        if (jojo && amily) this.outx("mice are");
        else this.outx("mouse is");
        this.outx(' raving.  "<i>You\'ve clearly given in to her demonic lust.</i>"');
        if (jojo) {
            this.outx(
                "\n\n\"<i>I'm leaving, " +
                    this.player.short +
                    ',</i>" Jojo says.  "<i>I only hope for your sake that you come to your senses soon... I will return to my place in the forest when you require assistance in freeing your soul of taint.</i>"'
            );
            this.flags[kFLAGS.JOJO_MOVE_IN_DISABLED] = 1;
            this.player.removeStatusAffect(StatusAffects.JojoNightWatch);
            this.player.removeStatusAffect(StatusAffects.PureCampJojo);
        }
        if (amily) {
            this.outx(
                '\n\nAmily shakes her head.  "<i>Goodbye, [name].  You\'ve changed.  What you did is pure folly.</i>"'
            );
            // Set - amily flipped her shit
            this.flags[kFLAGS.AMILY_FOLLOWER] = 0;
            // Enable village encounters
            this.flags[kFLAGS.AMILY_VILLAGE_ENCOUNTERS_DISABLED] = 0;
            // Change to plain mouse birth!
            if (this.player.pregnancyType == PregnancyStore.PREGNANCY_AMILY)
                this.player.knockUpForce(
                    PregnancyStore.PREGNANCY_MOUSE,
                    this.player.pregnancyIncubation
                );
            // FLAG THAT THIS SHIT WENT DOWN
            this.flags[kFLAGS.AMILY_CORRUPT_FLIPOUT] = 1;
            // Make sure the camp warning thing is off so she never moves back in.  Bitch be mad.
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00173] = 0;
        }
        // [(if PC corr > 70)
        if (this.player.cor > 70)
            this.outx(
                "\n\n\"<i>Fine. Go fuck off then, I don't need you.  I have a much better and hotter slut now. Don't hesitate to come back if you want some sweet pussy, though.</i>\""
            );
        this.outx("\n\n");
        if (jojo) this.outx("Jojo");
        if (amily && jojo) this.outx(" and ");
        if (amily) this.outx("Amily");
        if (amily && jojo) this.outx(" have ");
        else this.outx(" has ");
        this.outx("moved out.");
        this.outx("\n\nMaybe it's past time you brought them around to your way of thinking?");
        // Amily and Jojo removed from followers. Amily is encounterable again in the Village Place through the corrupted route and Jojo can still meditate with you.]
        this.doNext(this.playerMenu);
    }

    // tion camp
    // Follower Summoning text (Z)
    public callSlaveVapula(output = true): void {
        if (output) {
            this.clearOutput();
            if (this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 0) {
                this.outx(
                    "You gently tap Vapula on her shoulder and tell her you intend to put her goddess-like body to use.  She grunts at first but quickly smiles at you kinkily, letting you see her fangs as she voraciously stares at your crotch. You tear open the rags she's stitched together and cup her bouncy breasts. She swiftly responds with a passionate kiss, moaning in lust and quickly undressing you as you literally tongue-fuck each other. One of her hands darts at your crotch, slowly massaging it as she presses her body against your own, letting you feel the warmth of her jiggly bosom against your chest. You decide to return the favor; moving your own hands down, you slap her firm-yet-ample ass, getting a good grope of her purple flesh; your other hand starts exploring the depth of her vaginal recesses. She pulls back and openly cries in pleasure, her whole body shaking between your arms, a trickle of delicious succubus-saliva hanging between your lips.  After a few minutes of playful teasing, you release her; she stares at you with longing and flirtatious eyes."
                );
                this.outx('\n\n"<i>Want to have some fun, ' + this.player.short + '?</i>"');
            } else {
                this.outx(
                    "Vapula mooches over when you call her name, resentfully kicking an imp out of the way as she does. “<i>Yes, [master]?</i>” she says, with exaggerated sweetness."
                );

                if (this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA_GIBS_MILK] == 1) {
                    this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA_GIBS_MILK] = 2;
                    this.outx(
                        "\n\nYou wordlessly hold out your hand. Leering, Vapula places some bottled succubus milk into it.\n\n"
                    );
                    this.inventory.takeItem(this.consumables.SUCMILK, this.callSlaveVapula);
                    return;
                }
            }
        }
        // Option: Appearance
        // Option: Talk
        // Option: Feed (cocks only for now)
        // Option: Threesome
        // Option: Leave
        let mFeed;
        let fFeed;
        if (this.player.hasCock()) {
            if (this.player.lust >= 33) mFeed = this.feedVapulaACupOfJizz;
            else if (output) this.outx("\n\nYou aren't suitably aroused to feed Vapula right now.");
        }
        if (this.player.hasVagina() && this.player.hasKeyItem("Demonic Strap-On") >= 0) {
            if (this.player.lust >= 33) fFeed = this.chixFeedVapulaBlehblehIVantToZuckYourSpooo;
            else if (output && !this.player.hasCock())
                this.outx("\n\nYou aren't suitably aroused to feed Vapula right now.");
        }
        let threesome;
        if (this.player.lust < 33) {
            if (output)
                this.outx(
                    "\n\nYou aren't much interested in any of the threesomes Vapula seems poised to suggest."
                );
        }
        let spank;
        // Spank Vapula for misbehaving.
        // Requires Vapula force herself on you for food.
        // Requires bipedal-ness
        if (
            this.flags[kFLAGS.VAPULA_EARNED_A_SPANK] > 0 &&
            !this.player.isTaur() &&
            !this.player.isDrider()
        )
            spank = this.spankVapulaLikeABoss;
        else threesome = this.vapulaThreesomeMenu;

        this.choices(
            "Appearance",
            this.fapulaFapfapfapAppearance,
            "Talk",
            this.talkToVapulaForSomeReason,
            "Feed",
            mFeed,
            "Feed(Dildo)",
            fFeed,
            "Threesome",
            threesome,
            "Spank",
            spank,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined,
            "Leave",
            this.camp.campSlavesMenu
        );

        if (
            this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 0 &&
            this.flags[kFLAGS.FARM_CORRUPTION_STARTED] == 1
        )
            this.addButton(6, "Farm Work", this.sendToFarm);
        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 1)
            this.addButton(6, "Go Camp", this.backToCamp);

        if (
            this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 1 &&
            this.flags[kFLAGS.FOLLOWER_PRODUCTION_VAPULA] == 0
        )
            this.addButton(7, "Harvest Milk", this.harvestMilk);
        if (
            this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 1 &&
            this.flags[kFLAGS.FOLLOWER_PRODUCTION_VAPULA] == 1
        )
            this.addButton(7, "Stop Harvest", this.stopHarvest);

        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 1)
            this.addButton(9, "Back", kGAMECLASS.farm.farmCorruption.rootScene);
    }

    private sendToFarm(): void {
        this.clearOutput();

        this.outx(
            "You tell your succubus concubine that she is to head towards the lake, find a farm, present herself to the lady who works there and do as she says. Vapula laughs long and hard at this."
        );

        this.outx(
            "\n\n“<i>Good one [master],</i>” she guffaws. “<i>Me! Working on a farm! Taking orders from a dog! You’ve got such a wicked sense of humor, I wish I could coil it and suck it dry. You... you really can’t be serious about this, can you?</i>” she asks, sobering as she catches your expression."
        );

        this.outx(
            "\n\n“<i>I am. Her working with a succubus will teach her just as important a lesson as it will you, slaving in the dirt for my benefit. Don’t worry... I’ll be over to check up on you frequently, and if you’re </i>really<i> good I’ll give you something better to milk than your average cow when I do.</i>” "
        );

        this.outx(
            "\n\nVapula argues for a while longer, but you stand firm and eventually, complaining bitterly under her breath, the succubus stomps off in the direction of the lake. It’s difficult to believe she will be anything like a competent worker, you think, and the cloud of imps she will inevitably take with her means she’s pretty dubious in the protection stakes too; on the other hand, such close exposure to an out-and-out demon will surely have an interesting effect on Whitney."
        );

        this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] = 1;

        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private backToCamp(): void {
        this.clearOutput();

        this.outx(
            "You tell her to head back to camp; there are things you need to do to her you can’t do whilst she’s here. Repeatedly. Vapula fist pumps the sky."
        );

        this.outx(
            "\n\n“<i>Yessssss! You will NOT regret this, [master]. Oh, I am SO out of here!</i>” She practically sprints out of the farm yard, leaving you to laugh and then cough in the dust cloud she leaves."
        );

        this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] = 0;

        this.doNext(kGAMECLASS.farm.farmCorruption.rootScene);
    }

    private harvestMilk(): void {
        this.clearOutput();

        this.outx(
            "You tell Vapula that you want her hooked up to a milking machine whenever possible; you need her fluids."
        );

        this.outx(
            "\n\n“<i>Ooh, so that’s why you wanted me to come out here!</i>” Vapula grins and her fingers reach for a breast, already fantasising about insistent pressure on her nipples."
        );

        if (this.flags[kFLAGS.FARM_UPGRADES_REFINERY] == 0)
            this.outx(
                "“<i>It’ll sure as hell beat whatever disgusting thing the bitch would have me doing instead. Why don’t you make her build a concentration machine? Lethice has loads; makes one dose of cream go so much further.</i>”"
            );
        else this.outx("“<i>As you insist, [master]. It’ll sure as hell beat working.</i>”");

        this.flags[kFLAGS.FOLLOWER_PRODUCTION_VAPULA] = 1;

        this.doNext(kGAMECLASS.farm.farmCorruption.rootScene);
    }

    private stopHarvest(): void {
        this.clearOutput();

        this.outx(
            "You tell Vapula to stop producing succubus milk; you’re practically drowning in the stuff."
        );

        this.outx(
            "\n\n“<i>Well, that was the whole idea, [master]. Sure you don’t want to drink some more? Alright, alright!</i>” A familiarly sulky expression descends on the demon’s face as you deny her her second most favourite activity."
        );

        this.flags[kFLAGS.FOLLOWER_PRODUCTION_VAPULA] = 0;

        this.doNext(kGAMECLASS.farm.farmCorruption.rootScene);
    }

    // Vapula Appearance - this bitch is purpler than a Nigerian (Z)
    private fapulaFapfapfapAppearance(): void {
        this.clearOutput();
        this.outx(
            "Vapula is a 6 foot 1 inch-tall succubus with a voluptuously curvy build.  Her entire skin is purple, only growing darker whenever she's aroused.  She has a fairly human face with a surprising lack of horns; were it not for her skin, the only sign betraying her demonic origins would be her pair of fangs that are revealed whenever she smiles.  Her eyes are purple as well, often glinting with lust.  Her dark-purple hair grows luxuriously around her head, giving her a fierce, almost lion-like aspect, but it's offset by her majestic aquiline wings, leaving you wondering about her origins.  Two normal, well-formed legs grow down from her squeezable hips, swaying hypnotically as she walks.  She is wearing rags that cover only a tiny fraction of her body, concealing just her naughty bits to make the whole display more erotic."
        );
        this.outx(
            "\n\nShe has a pair of jiggly, perky H-cup breasts, each one adorned with a 1-inch nipple."
        );
        this.outx(
            "\n\nShe has a pink, wet pussy, although you know it can be stretched to take members of any size.  Drops of fem-juice often drip from her lush fuck-hole, leaving a trail behind her as she walks."
        );
        this.outx(
            "\n\nVapula has a tight asshole, placed right between her plush buttcheeks where it belongs."
        );

        if (kGAMECLASS.farm.farmCorruption.hasTattoo("vapula")) {
            this.outx("\n\n");
            if (kGAMECLASS.farm.farmCorruption.vapulaFullTribalTats()) {
                this.outx(
                    "She is covered from head to tail in tribal tattoos, erotic lines snaking all over her naked frame, giving her the look of a barely tamed savage."
                );
            } else {
                if (kGAMECLASS.farm.farmCorruption.numTattoos("vapula") > 1)
                    this.outx("She has the following tattoos emblazoned across her body:\n");
                else this.outx("She has ");

                if (this.flags[kFLAGS.VAPULA_TATTOO_COLLARBONE] != "")
                    this.outx(this.flags[kFLAGS.VAPULA_TATTOO_COLLARBONE] + "\n");
                if (this.flags[kFLAGS.VAPULA_TATTOO_SHOULDERS] != "")
                    this.outx(this.flags[kFLAGS.VAPULA_TATTOO_SHOULDERS] + "\n");
                if (this.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK] != "")
                    this.outx(this.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK] + "\n");
                if (this.flags[kFLAGS.VAPULA_TATTOO_BUTT] != "")
                    this.outx(this.flags[kFLAGS.VAPULA_TATTOO_BUTT] + "\n");
            }
        }

        this.dynStats("lus", 10);
        this.callSlaveVapula(false);
    }

    // Talk (Z)
    private talkToVapulaForSomeReason(): void {
        this.clearOutput();
        this.outx(
            "\"<i>You want to talk?  Well it's quite rare to see " +
                this.player.mf("studs", "girls") +
                ' looking for conversation with the likes of me, but go ahead.  What do you want to talk about?</i>"'
        );
        // Option: Stop Fucking Harem OR Fucking Harem OK (if toggled on off)
        // Option: Cerulean Threesome On/Off
        let threesomeT = "";
        let threesomeB;
        let haremT = "";
        const haremB = this.toggleVapulaHaremFucks;
        if (this.flags[kFLAGS.VAPULA_HAREM_FUCK] == 0) {
            this.outx(
                "\n\nVapula will not currently fuck anyone else in your camp without permission."
            );
            haremT = "FuckFollowers";
        } else {
            this.outx("\n\nVapula will fuck any willing partners you may have around camp.");
            haremT = "Don'tFuck";
        }
        // IF PC has cerulean succubused before
        if (this.player.findStatusAffect(StatusAffects.RepeatSuccubi) >= 0) {
            if (this.flags[kFLAGS.VAPULA_THREESOMES] == 0) {
                this.outx(
                    "\n\nShe won't currently assist the cerulean succubus if you invite her over."
                );
                threesomeT = "Assist On";
            } else {
                this.outx(
                    "\n\nIf you call the cerulean succubus, Vapula will assist her in pleasuring you."
                );
                threesomeT = "Assist Off";
            }
            threesomeB = this.toggleCeruleanVapulaAssist;
        }
        this.simpleChoices(
            haremT,
            haremB,
            threesomeT,
            threesomeB,
            "",
            undefined,
            "",
            undefined,
            "Back",
            this.callSlaveVapula
        );
    }

    private toggleCeruleanVapulaAssist(): void {
        this.clearOutput();
        // Cerulean Threesome On (Z)
        if (this.flags[kFLAGS.VAPULA_THREESOMES] == 0) {
            this.outx(
                "You inform Vapula that a succubus might join you in the following nights, and you want her to join the party; after all, if there's enough cum to feed one, there should be extra to feed another one.  Vapula wiggles and chortles, excited at the prospect of meeting a fellow creature to have a good fuck.  You warn her that she'll have to be very skilled if she doesn't want to be replaced.  Vapula smiles at you seductively and gently fondles your crotch, then says, \"<i>Don't worry; I know that deep down inside, you prefer giving your cum to me, right?</i>\"  The tingle is very pleasant, and you give your slut a soft kiss before sending her on her way.  You look forward to the oncoming threesome."
            );
            this.flags[kFLAGS.VAPULA_THREESOMES] = 1;
        }
        // Turn off
        else {
            // Cerulean Threesome Off (Z)
            this.outx(
                "You inform Vapula that you don't want her to meddle with your night fucks anymore.  Your succubus shrugs.  \"<i>Whatever.  As long as I get regular cum rations, I don't care much.  I'll do as you say.</i>\""
            );
            this.flags[kFLAGS.VAPULA_THREESOMES] = 0;
        }
        // Return to talk menu
        this.doNext(this.talkToVapulaForSomeReason);
    }

    private toggleVapulaHaremFucks(): void {
        this.clearOutput();
        // Stop Fucking Harem
        if (this.flags[kFLAGS.VAPULA_HAREM_FUCK] == 1) {
            this.outx(
                "You tell Vapula that you're fed up with seeing her fucking nearly everyone at camp and getting screwed by any living creature in its surroundings.  She's supposed to be YOUR succubus, and no one else's. You insist that you don't want to see anything near her pussy but your own genitals. You're her [master], after all, and her body is yours."
            );
            this.outx(
                "\n\nVapula protests, \"<i>But how am I supposed to feed? It's in my nature to get other people's spunk; I need it, just like you need to eat and breathe.</i>\""
            );
            this.outx(
                "\n\nYou assure her that your own cum production will be enough to satiate her needs. You just don't want her to feed off anyone else's."
            );
            this.outx(
                "\n\n\"<i>Ah, you're a possessive [master]... I see. Very well, from now on I will only live on your own semen. But I'm warning you: I have very big needs, and I can get quite... impulsive when I'm hungry. If you don't feed me enough I'm afraid I might get what I rightfully deserve by force.</i>\""
            );
            this.outx(
                "\n\nYou pretend not to understand her semi-hidden rape threats, confident that you'll be able to drown her futile menaces with cum when the time comes."
            );
            this.flags[kFLAGS.VAPULA_HAREM_FUCK] = 0;
        } else {
            // Fucking Harem OK
            this.outx(
                'You tell Vapula that you don\'t care anymore about where she gets her cum. From now on she might as well fuck whoever she wants as long as she remains available when you need to use her body. The succubus replies joyfully, "<i>Yay! I was hungry!</i>" and kisses you before storming off in the thick jungle. Knowing her, she is probably hunting for some potent imp to milk. You sigh and return to your campfire.'
            );
            this.flags[kFLAGS.VAPULA_HAREM_FUCK] = 1;
        }
        // Return to talk menu
        this.doNext(this.talkToVapulaForSomeReason);
    }

    // Feed
    private feedVapulaACupOfJizz(): void {
        this.clearOutput();
        this.outx(
            "You tell Vapula you're going to reward her for being such a good slut; idly stroking [oneCock] into erection, you command her to get on her knees so she can receive her meal.  The demoness eagerly complies and grabs hold of [oneCock].  She then proceeds to lick it, coating the entirety of your junk with her warm, sweet saliva. With an expert precision, she massages all your most sensitive points, pumping pre-cum up your urethra with ruthless efficiency.  As drops of your juices dribble from the tip of your " +
                this.cockDescript(0) +
                " she voraciously slurps them with a gourmand's smile."
        );
        this.outx(
            "\n\nHer ministrations feel good, but she keeps tickling you with her soft hands and pulpy lips, and her flexible tongue gives you the most infuriating tingles of pleasure.  With a groan of impatience, you grab her head and stuff your whole " +
                this.cockDescript(0) +
                " into her mouth, literally stuffing her full of your junk.  She nearly chokes at first but her old reflexes acquired from a whole life devoted to lewdness and licentiousness start kicking in; Vapula gluttonously deepthroats your meat, softly moaning as she fingers herself with one hand and caresses your "
        );
        if (this.player.balls > 0) this.outx(this.ballsDescriptLight());
        else this.outx("groin");
        this.outx(
            " with the other.  She sucks like a cock-hungry whore, treating your shaft like a straw as she slurps down your juices; her demonic throat feels incredibly hot and her saliva seems to make your " +
                this.cockDescript(0) +
                " grow even harder; her lips squeeze your meat in the most exquisite manner, sending you into short spasms of pleasure every time."
        );
        this.outx(
            "\n\nShe works on it for what seems like hours.  You look down at your slut; she keeps staring at you with avid yet playful eyes, never breaking eye contact as she relentlessly throatfucks herself; you feel her lips curve a little as the shape of a ravenous smile appears on her face, and her eyes glitter with an insatiable need.  The naughty bitch! She knows she's going to get what she wants, whether you like it or not.  You wish you were able to control yourself, but the covetous succubus never lets go of your " +
                this.cockDescript(0) +
                ", clinging to it like an animal."
        );
        this.outx(
            "\n\nYour stamina is rapidly overwhelmed and you decide to reward her effort; you savagely press Vapula's head against your groin, effectively burying all " +
                Vapula.num2Text(Math.round(this.player.cocks[0].cockLength)) +
                " inches of your " +
                this.cockDescript(0) +
                " in her waiting throat; her tongue keeps teasing your rod for a few seconds, and then you cum, brutally.  "
        );
        if (this.player.balls > 0) this.outx("Your " + this.ballsDescriptLight() + " churn");
        else this.outx("Your " + this.cockDescript(0) + " twitches");
        this.outx(
            " as you release a sticky spooge fountain in her stomach.  Her lips keep squeezing your junk in order to milk everything you've got, and in your shuddering orgasm you're too eager to comply.  With a surrendering sigh, you abandon yourself to your climax and keep cumming, squirting your baby-batter to the last drop as the succubus keeps gulping it.  Her eyes are closed in an expression of complete satisfaction; she enjoys her meal to its full extent, filling her belly with your spooge"
        );
        if (this.player.cumQ() >= 1500) this.outx(" until she looks six months pregnant");
        this.outx(
            ".  At last, the cum-flow spilling through your urethra starts to ebb and your " +
                this.cockDescript(0) +
                " stops throbbing; only then does she removes your junk from her mouth with a loud POP.  Your " +
                this.cockDescript(0) +
                " appears to be clean of any spooge: your cock-slut did a very good job.  Satisfied, you pat her head with your cock and let her digest her lavish meal."
        );
        this.player.orgasm();
        this.dynStats("cor", 0.5);
        this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
        this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Threesome
    private vapulaThreesomeMenu(): void {
        this.clearOutput();
        this.outx("Who do you invite?");
        // Option: Amily
        let amily;
        // Option: Ceraph
        let ceraph;
        // Option: Sophie
        let sophie;
        // Option: Jojo
        let jojo;
        // Option: Izma
        let izma;
        if (
            this.player.hasCock() ||
            (this.player.hasVagina() && this.player.hasKeyItem("Demonic Strap-On") >= 0)
        ) {
            if (this.jojoScene.campCorruptJojo()) jojo = this.vapulaJojoThreesomes;
            if (
                this.amilyScene.amilyFollower() &&
                this.amilyScene.amilyCorrupt() &&
                this.player.hasCock()
            )
                amily = this.vapulaAndAmilyThreesome;
            if (this.ceraphFollowerScene.ceraphIsFollower() && this.player.hasCock())
                ceraph = this.vapulaCeraphThreesome;
            if (this.sophieBimbo.bimboSophie()) sophie = this.vapulaSophieThreesomeSelect;
            if (this.izmaFollower() && this.flags[kFLAGS.IZMA_NO_COCK] == 0)
                izma = this.vapulaAndIzmaThreeSome;
        }
        this.choices(
            "Amily",
            amily,
            "Ceraph",
            ceraph,
            "Sophie",
            sophie,
            "Jojo",
            jojo,
            "Izma",
            izma,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined,
            "Back",
            this.callSlaveVapula
        );
    }

    // Vapula-Ceraph threesome
    private vapulaCeraphThreesome(): void {
        this.clearOutput();
        this.outx(
            "Using your magical talisman you summon Ceraph, your omnibus slut; she seems to appear out of nowhere and gleefully strides toward you as you are lasciviously holding Vapula in your arms and caressing her. The naked omnibus watches your unholy embrace, bemused: \"<i>I see you're quite busy, " +
                this.player.mf("Master", "Mistress") +
                ". I won't disturb you further.</i>\"  You point a finger at Ceraph while your other hand keeps stroking Vapula's tender ass and tell her to come immediately, your voice sounding almost breathless in your lust.  Startled by the imperiousness of your tone, the omnibus comes closer, not sure what to do as you keep toying with your purple wanton bitch.  You impatiently yank Ceraph's arm and pull her closer to Vapula in such a way that both hell-girls are now practically pressing their lush bodies against each other.  You tell your sluts that you will have your way with both of them; you feel your "
        );
        if (this.player.hasCock()) this.outx("dick");
        else this.outx("pussy");
        this.outx(
            " deserves a special kind of treatment.  Vapula and Ceraph are both thrilled in excitement."
        );
        this.outx("\n\nHow will you take them?");
        // Plz both - requires dick
        // Option: Butt-fuck train. Requires Ceraph to be herm.
        this.simpleChoices(
            "Please Both",
            this.vapulaCeraphThreesomePleaseBoth,
            "AnalTrain",
            this.vapulaAndCeraphButtfuckTrainYeehaw,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }

    // Option: Please both.
    private vapulaCeraphThreesomePleaseBoth(): void {
        this.clearOutput();
        let x: number = this.player.cockThatFits(100);
        if (x < 0) x = this.player.smallestCockIndex();
        this.outx(
            "You order your girls to turn around; you want to give them a good dicking.  They comply while giggling like a pair of whores, eager to get some cock up their holes."
        );
        this.outx(
            "\n\nYou push Vapula onto the floor, making her fall on her back, legs spread.  You then grab hold of Ceraph's shoulders and put her on all fours, her warm snatch facing Vapula's.  Already moist, the succubus and the omnibus naturally start caressing each other, kissing and groping each other's breasts.  You watch them giving in to their own depravity before joining the show; grabbing Ceraph's plump butt, you press the tip of your " +
                this.cockDescript(x) +
                " against her backdoor.  The unexpected intrusion makes the omnibus cry, her gasps of joy only enticing you to push further, even at the cost of stretching her anal ring.  A few seconds later you're all the way in, enjoying the boiling and tight recesses of her pucker.  You roughly seize Ceraph's fuck-pillows and proceed to relentlessly assault her ass, making her yell under the conjugated efforts of your throbbing junk and the hot succubus fingering her from below.  Completely dominated by the pleasure you're inflicting on her, your slut starts muttering dirty words, often interrupted by sudden screams, \"<i>Fuck... fuck... fuck my ass... " +
                this.player.mf("Master", "Mistress") +
                "...feels so- AAAAAH! Oh FUCK YEAH! Harder, " +
                this.player.mf("Master", "Mistress") +
                '! Fuck your bitch!</i>"'
        );

        this.outx(
            "\n\nAnnoyed by the noise she's making, you slap her firm rump repeatedly, your hands imprinting marks on her red ass-cheeks.  Your buttslut doesn't seem to care, completely blissful from being used by her rightful " +
                this.player.mf("Master", "Mistress") +
                ".  She groans, grinds harder and squirms in Vapula's embrace in her efforts to impale herself further on your " +
                this.cockDescript(x) +
                ".  The sight of your sluts' love-tunnels mixing their fluids together as they squirt as well as the insane motion of Ceraph's wobbling ass sending the sweetest sensations to your rod prove too much for you; despite your best efforts to hold back, you blast Ceraph's ass with your baby-batter, the globs effectively packing her anal entrance"
        );
        if (this.player.cumQ() >= 1500)
            this.outx(
                " and swelling her belly until she looks ready to give birth to a full horde of imps"
            );
        this.outx(".");
        this.outx("\n\nYou feel your ");
        if (this.player.balls > 0)
            this.outx(
                this.ballsDescriptLight() +
                    " twitch and your " +
                    this.cockDescript(x) +
                    " pulsate as they unload their"
            );
        else this.outx("your " + this.cockDescript(x) + " twitch and pulsate as it unloads its");
        this.outx(
            ' essence into your omnibus pet, bringing her to orgasm as she blubbers incoherently, "<i>Oh yessssssssss, just like that... Yeah... my ass... cum... yessssssssss...</i>"  Her voice goes so high pitched it trails off, letting you hear Vapula\'s soft moans below.  You quickly pull out your ' +
                this.cockDescript(x) +
                ', still orgasming.  You hear Ceraph feebly protest at the sudden lack of cock filling her hole, "<i>What are you doing? Put it back! Put it back already!</i>"'
        );
        this.outx(
            "\n\nWith another slap you tell her to shut up and learn to share; her partner hasn't received any cock yet, and you intend to remedy it.  Grabbing Vapula's thighs this time, you lunge toward her wet fuck-hole and bury your " +
                this.cockDescript(x) +
                " to the hilt, "
        );
        if (this.player.balls > 0)
            this.outx(this.ballsDescriptLight() + " hitting her butt-hole with a faint thud");
        else this.outx("thudding up against her cushy butt-cheeks");
        this.outx(
            ".  The purple sex-goddess squeals, your abrupt dick-digging utterly ravaging her cunt; her unholy warmth and impossibly tight confines are almost enough to make you cum instantly as her vaginal walls wrap in the most sensitive way around your rod, but you manage to hold off the flow of semen churning in your groin."
        );
        // [if 2nd cock]
        if (this.player.cockTotal() > 1)
            this.outx(
                '\n\nDeciding to put some of your junk to use, you eagerly grab your next dick and grind it against Ceraph\'s buttocks, bracing her for a second round of butt-fucking.  "<i>No, not again! Please fuck another ho-OOOOOH!</i>" her protests are quickly silenced as you easily slide your extra cock through her already stretched anal entrance, the penetration made easier due to your previous butt-fuck.  The sensation of having two cocks buried deep in hot, tight demon holes is incredibly exalting; you rest there for a moment, feeling the warm body of your sluts writhing against you as they try to milk you of your seed.'
            );
        // [if 3rd cock]
        if (this.player.cockTotal() > 2)
            this.outx(
                "\n\nHowever, there is still extra room left. You toy with your third member, wondering which hole shall be pierced next.  You finally choose to honor Vapula's tight butthole, just to spite that egotistical omnibus bitch who begged for more cock when she had received a fair ass-dicking earlier.  Besides, Vapula could really use a good butt-fuck.  Teasing the purple's succubus anal entrance with your fingers, you slowly stretch her muscles, opening her rectum little by little and making her shrill in pain and pleasure mixed; then, when you think the opening is wide enough, you slam all of your hardness inside, plowing her interior and knocking at the back of her colon.  Her ear-piercing thrill turns into a loud, low-pitched growl.  Her demon-hot anus is so tight it nearly crushes your cock!  The rough friction of your junk grinding against her interior sends all kinds of tickles into your throbbing erection, tearing your mind into pieces as it abandons itself to raw pleasure."
            );
        // [if 4th cock]
        if (this.player.cockTotal() > 3)
            this.outx(
                "\n\nThe sight of Ceraph's moist, shiny nether-lips is too tempting for you to resist; even though you don't want to give in to your bitch's desires that easily, your fourth penis is trembling and aching with need, and ignoring it when there's a vacant hole is just plain stupid.  You decide to give her the dick she's been begging for, and with a rude, hard trust you plunge your rod down her baby-maker.  You pant, thrilled in ecstasy as four amazing demonic holes contract and clasp around your many manhoods, milking them of all your spooge.  You crouch around your sluts, groping some hot succubi tit-flesh and drooling on Ceraph's hair as you abandon yourself to your their lush depths.  You thrust like a possessed minotaur, unable to control anything but the pace of your hips as they simultaneously pound every fuck-hole."
            );
        if (this.player.cockTotal() > 4)
            this.outx(
                "  Sadly, your extra junk does not have any hole left to fill.  It just hangs there, rubbing against Ceraph's backside and teasing her all the more."
            );
        // [if less than 4 cocks]
        if (this.player.cockTotal() < 4)
            this.outx(
                "\n\nYou keep thrusting fast and rough, paying little attention to the damage your hard fucking may cause to your girls' internal walls.  Once you get a bit tired, you switch holes.  Ceraph's snatch needs some love too, after all.  You furiously impale your sluts with all your might, groaning in effort and clawing their soft flesh in your ferocious grip.  You alternatively mash your groin against Vapula's, then Ceraph's, then Vapula's again.  Every time you pull out one of them starts mewling like a goblin in heat but you don't care; you keep pumping in and out of each hole, savoring every second of this stunning hard fuck-session."
            );
        // end of condition
        this.outx(
            "\n\nYou keep fucking your girls, making them moan alternatively.  The high-pitched screeches from Ceraph intertwine with the lewd, continuous rattles of Vapula as you pound her ass.  Combined with your periodic grunts, their pleasure-filled cries resound into a lustful song of depravity.  You're sure everyone must hear you but you keep going, only obsessed by the thought of filling your purple whores with more dick, more dick, and more dick.  You feel the warm and undulating body of Ceraph as well as the iron clasp of Vapula as she drags you into this infernal embrace; the cock-hungry whores below you have orgasmed so many times you have lost the count, their fem-cum accumulating in a thick puddle below Vapula's ass as they keep shuddering and trembling in turns.  Their unholy, demonic musk invades your nostrils and invigorates you all the more.  Your [feet] slip as you try your best to stuff as much of your junk as possible in their warm wet holes."
        );
        this.outx(
            "\n\nAt last, you can't keep up with this insane fucking rhythm.  Your blood is boiling with primal lust; your whole body is sweating and polluted with the vaginal squirting of your demon pets.  Once again, your balls swell and churn, ready to unload another glorious deposit of your seed inside your sluts' tight confines.  Feeling the release coming soon, you pump harder, determined to drain both girls of their stamina before they drain you of your spunk.  Before you even think of it, you cum.  A powerful jet escapes from the tip of [eachCock], literally drenching their bodies with your fluids.  In your mad and violent thrusting, you don't even know whose hole had the privilege of being fully stuffed with your baby-batter, but the insanely hot, tight and deliciously rough friction makes you think you just blasted an ass with jism.  Satisfied, you quickly remove your still pulsating dick and dive it into another hole, letting your succubus as well as your omnibus bitch enjoy a last intrusion as your junk spurts its last globs of semen.  Their vaginal walls are still contracting on their own and release another powerful spray of girl-juice, almost at the same time.  With a last, orgasming unison-moan, they relax, exhausted.  You promptly fall to the side, [eachCock] half-erect, coated with vaginal fluids, and still dribbling their residual cum. Completely soaked with dirt and spunk, your sluts just lie there, oblivious of their surroundings."
        );
        this.outx(
            "\n\nBut you're not done with these sluts yet.  Shaking Ceraph's shoulders, you remind her she still has a job to do.  The omnibus awkwardly squishes in the puddle of cum as she tries to stand up, but you quickly interrupt her and brutally shove your genitals in front of her face, looking at her impatiently.  Obviously knowing what you expect her to do, she proceeds to lick your cum-stained cock clean, suckling on the tip and carefully squeezing your dickflesh to extract as much remaining spunk as she can."
        );
        // [if multicocks]
        if (this.player.cockTotal() > 1)
            this.outx(
                "  She expertly jerks each of your rods in turn, gently polishing them as they grow back into an erect state."
            );
        this.outx(
            "  She's obviously used to this kind of practice; even though [eachCock] felt numb after cumming so hard, you feel your lust build up again as your genitals throb once more with need.  You grab Ceraph's head and impale her on your crotch, forcefully throat-fucking her."
        );
        this.outx(
            "\n\nWhile enjoying Ceraph's sweet and skilled blowjob, you lend a hand to your purple succubus, her beautiful body shining from all the sexual filth coating her.  You help her to her feet and pull her, pressing her melon-sized tits against you and kissing her savagely.  Still exhausted from the hard fuck, she weakly moans and hugs you tighter.  She places herself behind your back and starts rubbing her big, perky tits against you, her tall form wrapped around your chest.  She caresses you expertly, her adept hands running sensually over your sensitive points as she grinds her nipples against your back.  From time to time you turn your head and give her another passionate kiss, enjoying the delectable taste of her mouth."
        );
        // [if multicocks]
        if (this.player.cockTotal() > 1)
            this.outx(
                "\n\nYou tell Vapula to join Ceraph and help her out.  She looks puzzled at first, then quickly understands as you grab hold of her head and wave your second member at her.  She nods excitedly and rapidly starts sucking you off as well, her adroit lips and deft tongue entirely enveloping your meat.  She's as good at blowjobs as Ceraph, if not more."
            );
        this.outx(
            "  Your thoughts are quickly drowned in waves of pleasure, and soon your only thought is to ram more of your " +
                this.cockDescript(x) +
                " down your sluts' throats, pumping their heads alternatively around your shaft"
        );
        if (this.player.cockTotal() > 1) this.outx("s");
        if (this.player.balls > 0)
            this.outx(" as the girls keep fondling your " + this.ballsDescriptLight());
        this.outx(", bringing you extra tingles of pleasure to your body.");

        this.outx(
            "\n\nAt last, the sweet ministrations of your pair of hell-girls prove too much for your cum-stained body and you spurt a third load of spooge, [eachCock] quivering and trembling as it unloads its ultimate shot of semen directly in a waiting stomach.  The hell-girls cling to your dick"
        );
        if (this.player.cockTotal() > 1) this.outx("s");
        this.outx(", their lips doing their best to milk ");
        if (this.player.cockTotal() == 1) this.outx("it");
        else this.outx("them");
        this.outx(" of all ");
        if (this.player.cockTotal() == 1) this.outx("its ");
        else this.outx("their ");
        this.outx(
            "cream.  Once your junk feels completely empty, [oneCock] is released with a loud POP."
        );
        this.outx(
            '\n\nSatisfied, you kiss both of your sluts.  "<i>Thank you ' +
                this.player.mf("Master", "Mistress") +
                '.</i>" they say in unison, before you pat their heads and send them on their way; they will probably need to rest in order to digest their heavy meal.'
        );
        // lust set to 0
        this.player.orgasm();
        this.dynStats("cor", 1);
        if (this.player.lib > 10) this.dynStats("lib", -1);
        if (this.player.lib > 50) this.dynStats("lib", -1);
        if (this.player.lib > 70) this.dynStats("lib", -1);
        this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
        this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Option: Butt-fuck train. Requires Ceraph to be herm.
    // Ceraph-Vapula Buttfuck train
    private vapulaAndCeraphButtfuckTrainYeehaw(): void {
        this.clearOutput();
        let x: number = this.player.cockThatFits(100);
        if (x < 0) x = this.player.smallestCockIndex();
        this.outx(
            "Grinning lewdly, you dispose your omnibus and your succubus in a front line such that Ceraph's cock points toward Vapula's anus.  Ceraph pants expectantly.  \"<i>What do you have in mind this time, Master?</i>\" Without a word, you place yourself behind Ceraph's back and start stroking [eachCock] against her butt-cheeks, your tip dribbling pre-cum teasingly; you shove a few fingers into Ceraph's warm snatch, stimulating her until she lets out a muffled moan as her own cock grows to full erectness.  At last, you ready yourself, your cock knocking on Ceraph's backside.  You gently explain to your girls that you're going to initiate a butt-fuck train.  Vapula giggles softly, \"<i>Ooooh, I love this!  But... wait, I'm in the front of the -</i>\""
        );
        this.outx(
            "\n\nWithout any warning, you harshly push your " +
                this.cockDescript(x) +
                " into Ceraph's tight anal recesses, making her clench and tense in arousal.  She immediately responds by grasping Vapula's squeezable thighs and digs her own, broad prick inside the succubus' colon.  The totally unexpected rectal assault makes both hell-girls scream in surprise and pleasure mixed, their anal walls saturated with intense dick-friction.  You stand here comfortably, easily lodging your " +
                this.cockDescript(x) +
                " inside Ceraph's backdoor while letting her have a better grip on Vapula's buttocks.  The omnibus' pucker is insanely hot!  Your rod of flesh feels like it's going to melt under her demonic warmth, and her astonishingly narrow colon squeezes it in the most harsh and delightful way.  You decide to speed up the pace and start sliding back and forth, "
        );
        if (this.silly())
            this.outx(
                'screaming at the top of your lungs: "<i>BUTT-FUCK! BUTT-FUCK! BUTT-FUCK!</i>", soon joined by your horny anal partners'
            );
        else this.outx("groaning and panting as you ravage Ceraph's pucker with your junk");
        this.outx(".\n\n");
        this.outx(
            "Between two mad thrusts, you order Ceraph to imitate you in every movement, treating Vapula the same way you treat her.  You start slapping her jiggly ass, sending ripples across her red shivering flesh.  Entranced by your violent ministrations, the omnibus complies to your orders, spanking Vapula as hard as she can.  Soon moans are heard all across the butt-fuck train; the more you slap and thrust, the harder Ceraph hits the purple sex-goddess, as if she wanted to prove she was a better servant, worthier of your " +
                this.cockDescript(x) +
                ".  You reach around and knead Ceraph's tits, playing with her nipples as you devastate her backdoor with ferocious dick assaults, and she hesitantly grasps Vapula's bouncy tits, unable to match your thrusts in intensity.  She jerks her head backwards and moans, almost forgetting her own prick impaling the poor succubus in front of her.  Seeing that the poor bitch has lost all control over her own body, you stretch your arms further and reach Vapula's breasts.  The succubus is literally drooling in ecstasy; forced to feel the mighty thrusts of a strong omnibus as well as yours, she is bent over submissively, her tongue hanging and her eyes rolling under the combined strength of your anal-dickings.  You pound harder, squeezing her tits at each cock-nudge and muffling her pleasure-filled shrieks when you can."
        );

        this.outx(
            "\n\nAs for Ceraph, the poor thing isn't even able to think anymore.  Her rhythmical moans have been gradually replaced with some incoherent dirty babble, \"<i>Oh fuckfuckfuck... good.. fuck...  YES! Fuck... yes... fuckfuckfu-aaaAAAAAH!</i>\"  You keep impaling the omnibus' butthole with your " +
                this.cockDescript(x) +
                ", pounding harder in hope the anal tearing will shut her up, but she only seems to get even more pleasure from such a violation of her insides.  Her mind isn't able to reason properly, torn between her ferocious butt-penetration and the pleasure her own cock is getting as it moves of its own volition in and out of Vapula's tight little pucker."
        );

        this.outx(
            "\n\nYou pump more and more, growing more impatient and vicious as you feel your climax approaching.  You slap Ceraph's face, you toy with her nipples, you pinch Vapula's butt, you block Ceraph's thrusts midway, making both demonesses whimper in frustrated desire.  All the while, you keep butt-fucking Ceraph at a crazy pace, yelling like a " +
                this.player.mf("man", "herm") +
                " possessed as you claim her impossibly tight confines with unequaled intensity.  You ride the butt-fuck train, submitting both girls to your will as their anal entrances keep being assaulted over and over again.  Their warm love-tunnels are literally steaming in arousal and their feminine juices are being spilled in a free flow of lust."
        );
        // [if balls]
        if (this.player.balls > 0)
            this.outx(
                "  As you relentlessly smash your groin against Ceraph's plump rump, your " +
                    this.ballsDescriptLight() +
                    " repeatedly hit her quivering vagina; they are soon utterly coated in fem-spunk."
            );
        this.outx(
            "  The entirety of your crotch ends up drenched with a various mix of sexual juices, and your " +
                this.cockDescript(x) +
                " makes squelching noises at each thrust in and out of your omnibus' little ass."
        );

        this.outx(
            "\n\nEventually, you feel your stamina decreasing as a pressure builds in your loins and you brace yourself for the imminent cumshot. With a savage, desperate last thrust, you thoroughly impale the purple demoness on your junk and paint her interior walls with an explosion of spooge.  A mighty spray of cum spurt out of your " +
                this.cockDescript(x) +
                ", completely stuffing Ceraph with your seed."
        );
        if (this.player.cumQ() >= 1500)
            this.outx(
                "  She automatically clenches her anus in order to keep as much of your baby-batter inside as possible, but to no avail; torrents of white goo start spurting out of her rectum, splattering her legs and your groin."
            );
        this.outx(
            "  This sudden extra pressure on her colon sends Ceraph over the edge, and she cums too; bleating in ecstasy, she grabs Vapula's hips and shoves her cock all the way inside her backdoor as she releases a milky flood of her own.  For several seconds you all stand there, fluids steadily flowing in and out of Ceraph as you both climax.  Vapula, literally mindbroken by the intense butt-fuck, utterly abandons herself to her pleasure and her pussy explodes in an abundant spray of fem-juices.  Ceraph's pussy quivers and convulses, her mad arousal making her squirt juices in thick torrents from her feminine counterpart.  The whole wagon of peckers and butts stands still, frozen in pure ecstasy as fluids keep dripping of every hole and dick.  A dirty puddle, formed by all the sexual juices spurted by your depraved embrace, grows and thickens as your " +
                this.cockDescript(x) +
                " as well as Ceraph's keep pulsating in orgasm. At last, when every cock has been milked of all its seed, you relax."
        );
        this.outx(
            "\n\nYou dump your buttsluts, letting them splash in the cum-puddle, exhausted. Triumphantly exhibiting your " +
                this.cockDescript(x) +
                ", you tell them to finish their job.  Vapula and Ceraph growl reluctantly as they grovel in the spunk-tainted mud and crawl toward your junk before licking it with delectation.  You let them enjoy their meal, groaning in pleasure as they squeeze their pittance out of your " +
                this.cockDescript(x) +
                " and suck out the last globs of semen out of your urethra.  When you're all absolutely positive that no residual cum has been wasted, you smirk in satisfaction; you give your sluts a hard cock-slap for good measure and send them away."
        );
        // Lust set to 0
        this.player.orgasm();
        this.dynStats("sen", -2, "cor", 1);
        this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
        this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Vapula-Sophie threesome
    private vapulaSophieThreesomeSelect(): void {
        if (this.player.hasCock()) this.vapulaSophieThreeSome();
        else this.vapulaSophieThreesomeCunts();
    }

    private vapulaSophieThreeSome(): void {
        this.clearOutput();
        let x: number = this.player.cockThatFits(100);
        if (x < 0) x = this.player.smallestCockIndex();
        this.outx(
            "You call Sophie insistently, panting in anticipation.  The blond-feathered bimbo doesn't come at first - perhaps the dumb slut forgot her name again - but as you grow more impatient you finally notice the platinum-headed woman, her enormous boobs bouncing hypnotically and her luscious thighs swaying lustfully as she walks.  She grins beatifically and coos: \"<i>Yes?  Is there anything I can, like, do for... ooooh, but who's this?  She's sooooooo beautiful!  She's got, like, big boobs and stuff!</i>\"  Vapula sighs in consternation.  \"<i>What can you do with her, " +
                this.player.short +
                "? I'm sure she's going to forget my presence by next hour.</i>\""
        );
        this.outx(
            '\n\nYou hush her up and tell to follow you.  You walk toward the harpy bimbo as she idly fingers her twat; her eyes lighten up as you approach, always longing for some action.  "<i>Wanna fuck?</i>" You smirk and lunge toward your bird slut, engulfing your head in her bountiful bosom and sucking on her hard nipples.  Sophie moans softly and starts stroking your head;  you move your head up and kiss her gluttonously, enjoying the potent effect of her lipstick as it flows through your veins and brings [eachCock] to a fully aroused state.  You pull back and stare at Sophie for a moment, her eyes gleaming in adoration as she giggles and kisses you everywhere, invigorating you more and more.  You tell Vapula to come over and help you out.  With a mighty torsion, you both turn over that bountiful avian body, forcibly putting her on all fours and ignoring her complaints.  Her enormous ass is now fully exposed, wobbling and blushing in arousal, and her blond wings keep flapping aimlessly as the bimbo croons in incomprehension.  You dig into ophie\'s plush ass-cheeks with your fingers, bracing yourself for an imminent butt-fucking.'
        );
        this.outx(
            '\n\nVapula comments, "<i>Well, that\'s one air-brained bimbo.  I\'ve rarely had the chance to have my way with one of these bird-bitches; they\'re at war with Lethice, you know.  Could I get a taste of this fine ass?</i>"  You silence her and remind her that this feathered slut is yours; you have the right to lay claims on her ass, and by the Gods you intend to use that right to its full extent.  Meanwhile, Sophie keeps simpering whorishly below you, "<i>Hey, hey, what are you doing?  Are you, like, talking about me or something?</i>"'
        );
        this.outx(
            "\n\nCompletely ignoring her, you keep arguing with Vapula about that sumptuous yet controversed rump.  Vapula is complaining, \"<i>But if you take her and blow your load inside her, where will I get my meal from? She's just a dumb harpy bitch, she doesn't need your dick; I do, I need to feed!</i>\""
        );
        this.outx(
            "\n\nYou laugh at the purple succubus and reassure her: seeing the sheer amount of lipstick you've just absorbed, you're pretty much loaded to satiate an entire horde of horny goblins.  With a pressing tone, you command her to sit on Sophie's back, just between her wings and you, such that she directly faces you and her pussy grinds against the harpy's generous buttocks.  You explain your plan, \"<i>I'm going to butt-fuck this bimbo, like it or not.  Now your job is to please me.  Butt-fucking people is a hard and tedious task and I'm going to need a lot of comfort to keep going.  You have no idea how much comfort I may need.  Do your best, and if you're good enough I'll let you taste my cum.  Understood?</i>\""
        );
        this.outx(
            "\n\nVapula nods and smirks as she accepts the challenge you've put out on her.  Sophie agitates below the two of you: \"<i>Hey guys, what's going on? Someone's just sitting on my ass and it feels, like, all hot and stuUUFFFFFF!</i>\""
        );
        this.outx(
            "\n\nWithout ceremony you grab the avian slut's fuckpillows and eagerly sandwich your meat between them, pressing the tip of your " +
                this.cockDescript(x) +
                " against her tight anus.  As soon as the first inches start sliding in, the bimbo slut flaps her wings frenetically as she squawks in pleasure, her anal muscles contracting on their own as an invitation to slide in further.  Before you even think of it "
        );
        if (this.player.cockArea(x) > 75) this.outx("you've filled the entirety of her colon");
        else
            this.outx(
                "your cock is already buried to the hilt, its mammoth girth bulging between her broad hips"
            );
        this.outx(
            "; the bulge even grinds a bit against Vapula's own butt and the succubus reaches toward you, entranced with lust.  She wraps her arms around you, letting you feel her tender boobs being squeezed against your [chest] as she gives you a mad kiss filled with passion.  Your lips remain locked for a while as you explore each other's mouths with your tongues; you almost forget the burning hot and roughly tight hole.  It entraps your " +
                this.cockDescript(x) +
                " as it continues massaging with the harpy's vice-like anal muscles.  The bimbo keeps wriggling arond your rod in order to get more of it inside, pleasantly smashing her fat rear against your groin."
        );
        this.outx(
            "\n\nStill not breaking the kiss, you groan silently and pull out your " +
                this.cockDescript(x) +
                ", all smeared in pre-cum.  Sophie whimpers and wails softly until you thrust all the way back in, literally jamming her with your junk.  Her pupils widen, her mouth opens and her gigantic tits keep swinging in the dirt as her whole body trembles and shudders from the brutal anal violation.  Her cry of pleasure is so high-pitched you barely hear her subsequent moan; satisfied, you start thrusting at a more convenient rhythm, enjoying the lush depths of the avian slut as the succubus keeps making out with you.  You keep butt-fucking Sophie, unable to focus on the ministrations of the expert succubus or the extremely warm recesses of the harpy's interior.  You regularly slap her plush, fat buttocks, sending ripples across her whole fleshy body. Needless to say, the bimbo's pussy is completely drenched in fem-spunk, her wide pussy drooling trickles after trickles of her juices, betraying her utter arousal."
        );
        // [if 2nd cock]
        if (this.player.cockTotal() > 1)
            this.outx(
                "\n\nIt would be a shame to waste such a welcoming love-tunnel.  Grabbing hold of your second prick, you push it down her vaginal entrance, effectively double-penetrating her.  Sophie moans all the more from the unexpected intrusion, and with such a lush hole, you easily slide the rest of your prick inside.  Her wings keep flapping in irregular motions as you fuck each of her holes at the same time with both of your cocks.  You pump at her entrances with nigh inhuman intensity, each prick vying with the other in a contest of licentiousness."
            );
        this.outx(
            "\n\nVapula is now taking care of your groin.  Darting a hand at your crotch, she gently fondles your "
        );
        if (this.player.balls > 0) this.outx("balls and massages your ");
        this.outx(this.buttDescript() + ".");
        // [if third cock]
        if (this.player.totalCocks() > 2)
            this.outx(
                "  Using her extra flexibility, she bends over and start jerking your third pole, the sweet handjob adding to your pure cocktail of pleasure."
            );
        this.outx(
            "  You can feel her hard nipples poke at your skin as they gently scrape across your torso.  Vapula hardly ever interrupts her embrace, only pulling back from your lips to take care of other intimate parts of your body.  You keep riding the bimbo senseless, making her squirm and squawk in ecstasy as your own cries of pleasure are muffled by Vapula's voracious lips."
        );
        this.outx(
            "\n\nVapula's expert stimulation as well as Sophie's uncontrollably hot ass eventually drain your stamina and you feel [eachCock] flutter and twinge as it releases its milky load.  Sophie climaxes and squirts a copious amount of her juice as you deliver rope after rope of jism into her tight confines.  Remembering your succubus slut, you "
        );
        if (this.player.cockTotal() < 3) this.outx("hastily pull out and ");
        this.outx("wave ");
        if (this.player.cockTotal() >= 3) this.outx("one of ");
        this.outx("your still pulsing dick");
        if (this.player.cockTotal() >= 3) this.outx("s");
        this.outx(
            ' at Vapula, spraying her purple body with white paint.  She welcomes the cum-rain with a happy squeal that turns into a demonic cry of pleasure when you stuff your protruding rod inside her steaming love-tunnel, directly injecting your seed in her womb.  She pulls your head between her chest orbs, screaming in delight as you feed her.  "<i>Yes!  YES!  Give it to me!  Aaaaaaaaaaaaaaahhh....</i>" she growls in utter bliss and satiation as you fill her with even more spunk.  The poor bimbo below you is still busy squirting unbelievable amounts of girl-juices, literally flooding a large perimeter with a mix of various sexual fluids as her large pussy muscles keep contracting on their own.'
        );
        this.outx(
            "\n\nWhen you're all done, you dismount.  Your mouth is filled with the succubus' essence, and Gods it tastes good.  You tell Vapula to get off Sophie's butt too; as soon as she does the bimbo completely clenches and relaxes before falling into a deep slumber, her stretched anus still exposed as she snores and wallows in a pool of juices, mostly her own.  \"<i>Finish your meal</i>\", you tell Vapula.  The tired succubus complies and proceeds to suck the last remaining bits of escaping goo from the harpy's tight anal contraction.  Then, she keeps licking and squeezing your " +
                this.cockDescript(x) +
                " until it shines, completely polished with succubus saliva."
        );
        this.outx(
            '\n\n"<i>Enough. You should rest now.</i>"  Nodding, Vapula heads toward her leaf-bed in order to recover from the intense threesome and digest her copious meal.'
        );
        // lust set to 50, lipstick affect (if no adaptation)
        this.sophieScene.luststickApplication(10);
        this.player.orgasm();
        this.dynStats("cor", 2);
        this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
        this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
        if (this.player.lust < 50) this.player.lust = 50;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Vapula-Sophie threesome (as female)
    private vapulaSophieThreesomeCunts(): void {
        this.clearOutput();
        this.outx(
            "You call Sophie insistently, panting in anticipation as you slide into your strap-on's harness.  The blond-feathered bimbo doesn't show at first - perhaps the dumb slut forgot her name again - but as you grow more impatient you finally notice the platinum-headed woman, her enormous boobs bouncing hypnotically and her luscious thighs swaying lustfully as she walks.  She grins beatifically and coos, \"<i>Yes? Is there anything I can, like, do for... ooooh, but who's this?  She's sooooooo beautiful!  She's got, like, big boobs and stuff!</i>\"  She claps her hands with even greater excitement as she turns her attention to you, or rather your crotch.  \"<i>And you've grown a cock!  I've made a new friend and I've, like, got a nice big cock to play with!  This is the best day of my life!</i>\" You think she genuinely means it."
        );
        this.outx(
            '\n\nVapula sighs in consternation.  "<i>What can you do with her, ' +
                this.player.short +
                "? I'm sure she's going to forget who I am in an hour.</i>\""
        );
        this.outx(
            '\n\nYou hush her up and tell her to follow you.  You walk toward the harpy bimbo as she idly fingers her twat; her eyes lighten up as you approach, always longing for some action.  "<i>Wanna fuck?</i>"  You smirk and lunge toward your bird slut, engulfing your head in her bountiful bosom and sucking on her hard nipples.  Sophie moans softly and starts stroking your head; you straighten up and with little encouragement get her to kneel, eagerly licking and kissing the purple dildo until it glitters with wet gold.  As she works it, you tell Vapula to come over and help you out.  With a mighty torsion, you both turn over that bountiful avian body, forcibly putting her on all fours and ignoring her complaints.  Her enormous ass is now fully exposed, wobbling and blushing in arousal, and her blond wings keep flapping aimlessly as the bimbo croons in incomprehension.  You dig Sophie\'s plush ass-cheeks with your fingers, rubbing the purple dildo between them, sighing with pleasure as you rotate your own hips, turning the pink end around in your wet depths, building yourself into the kind of lust maddened state sufficient to hand out the butt-fucking your poor dumb bird-bitch deserves.'
        );

        this.outx(
            '\n\n"<i>That\'s one air-headed bimbo,</i>" Vapula comments, lazily fingering herself as she watches you.  "<i>I\'ve rarely had the chance to have my way with one of these bird-bitches; they\'re at war with Lethice, you know. Could I get a taste of this fine ass?</i>" You silence her and remind her that this feathered slut is yours; you have the right to lay claims on her ass, and by the Gods you intend to use that right to its full extent.  Meanwhile, Sophie keeps simpering whorishly below you: "<i>Hey, hey, what are you doing? Are you, like, talking about me or something?</i>"  Completely ignoring her, you keep arguing with Vapula over the former\'s sumptuous yet disputed rump.'
        );
        this.outx(
            "\n\nVapula is complaining, \"<i>But if you take her and blow your load inside her, where will I get my meal from?  She's just a dumb harpy bitch, she doesn't need the strap-on; I do, I need to feed!</i>\"  You laugh at the purple succubus and reassure her: you don't know quite how the strap-on functions, but given the sheer amount of lipstick it's just absorbed, you reckon that it is straining as tight as a crossbow.  With a pressing tone, you command her to sit on Sophie's back, just between her wings and you, such that she directly faces you and her pussy grinds against the harpy's generous buttocks."
        );
        this.outx(
            "\n\n\"<i>I'm going to buttfuck this bimbo so hard she won't be able to sit down for a week.  It's not for my benefit,</i>\" you go on, in an arch tone.  \"<i>I don't get anything from reaming this dick in and out of her ass; it's just what she needs and deserves.  You are my entertainment whilst I go about this Gods-given task.  Make it pleasing for me, and who knows, Maybe I'll give you what YOU need and deserve.</i>\""
        );
        this.outx(
            "\n\nVapula licks her lips and smirks as she accepts the challenge you've laid out for her.  Sophie agitates below the two of you.  \"<i>Hey guys, what's going on? Someone's just sitting on my ass and it feels, like, all hot and stuUUFFFFFF!</i>\""
        );
        this.outx(
            "\n\nWithout ceremony you grab the avian slut's fuckpillows and eagerly sandwich your dildo between them, pressing the tip of it against her tight anus.  As soon as the first inches start sliding in, the bimbo slut flaps her wings frenetically as she squawks in pleasure, her anal muscles contracting on their own as an invitation to slide in further.  Before you even think of it your strap-on is already buried to its leather hilt, its mammoth erection bulging between her broad hips; the bulge even grinds a bit against Vapula's own butt and the succubus reaches toward you, entranced with lust. She wraps her arms around you, her tender boobs against your own " +
                this.allBreastsDescript() +
                " as she gives you a mad kiss filled with passion. Your lips remain locked for a while as you explore each other's mouths with your tongue; you almost forget the tight hole wrapped around your dildo.  You are brought back to it by the bimbo wriggling around the rod rammed in her rear in an attempt to squeeze more of it into her, twisting your end around in your sopping " +
                this.vaginaDescript(0) +
                " as she pleasantly mashes her fat rear against your groin."
        );
        this.outx(
            "\n\nStill not breaking the kiss, you groan silently and pull out your bulging dildo, already drooling its payload.  Sophie whimpers and wails softly until you thrust all the way back in, literally jamming her with your false junk.  Her pupils widen, her mouth opens and her gigantic tits keep swinging in the dirt as her whole body trembles and shudders from the brutal anal violation.  Her cry of pleasure is so high-pitched you barely hear her moan; satisfied, you start thrusting at a more convenient rhythm, enjoying the avian slut thrusting your strap-on back into you as your succubus keeps lavishly making out with you.  You regularly slap Sophie's plush, fat buttocks, sending ripples across her whole fleshy body.  Needless to say, the bimbo's pussy is completely drenched in fem-spunk, her wide pussy drooling trickle after trickle of her juices, betraying her deep arousal."
        );
        this.outx(
            "\n\nVapula shifts her attention to your breasts, her long tongue running lasciviously over your " +
                this.nippleDescript(0) +
                "s, tightly circling and gently teasing their tips until they are as sensitive and erect as any clitoris.  Her soft lips edge you further and further into your fuck daze, riding the bimbo senseless, making her squirm and squawk in ecstasy as your own cries of pleasure are muffled by Vapula's voracious lips."
        );
        this.outx(
            "\n\nVapula's expert stimulation as well as Sophie's uncontrollably hot ass eventually drain your stamina and you buck into the harpy as hard as you can, helplessly eager for the return thrusts which push you towards orgasm.  You thrust your tongue deep into the succubus's mouth as you reach it, your pussy spasming around the hot, soft, vibrating mass buried within it.  Dimly, you are aware of the other end of the strap-on fluttering, twinging, and then releasing its milky load.  Sophie climaxes and squirts a copious amount of her juice as you deliver rope after rope of jism into her tight confines.  Remembering your succubus slut, you hastily pull out and wave the over-stimulated cum producer at Vapula, spraying her purple godly body with white paint.  She welcomes the rain with a happy squeal that turns into a demonic cry of pleasure when you stuff it crudely inside her steaming love-tunnel, directly injecting your seed in her womb.  She pulls your head between her chest orbs, screaming in delight as you feed her.  \"<i>Yes! YES! Give it to me! Aaaaaaaaaaaaaaahhh....</i>\"  She growls in utter bliss and satiation as you fill her with even more spunk.  The poor bimbo below you is still busy squirting unbelievable amounts of girl-juices, flooding the immediate area with a mix of various sexual fluids as her large pussy muscles keep contracting on their own."
        );
        this.outx(
            "\n\nAt last, when you're all done, you dismount.  Your mouth is filled with the succubus' essence, and Gods it tastes good. You tell Vapula to get off Sophie's butt too; as soon as she does the bimbo completely clenches and relaxes before falling into a deep slumber, her stretched anus still exposed as she snores and wallows into a pool of juices, mostly her own.  \"<i>Finish your meal</i>\", you tell Vapula, sighing as you peel out of the strap-on.  The tired succubus complies and proceeds to gently eat both the strap-on and your sex clean of the aftermath of your demented threesome.  She keeps licking at your pleasantly aching " +
                this.vaginaDescript(0) +
                ' until it is completely clean, polished with succubus saliva.  "<i>Enough. You should rest now.</i>"  Nodding, Vapula heads toward her leaf-bed in order to recover from the intense threesome and digest her copious meal.'
        );
        this.player.orgasm();
        this.dynStats("cor", 2);
        this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
        this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Vapula-Amily threesome
    private vapulaAndAmilyThreesome(): void {
        this.clearOutput();
        let x: number = this.player.cockThatFits(100);
        if (x < 0) x = this.player.smallestCockIndex();
        this.outx(
            '"<i>Amily!</i>" you yell.  In no time a purplish blur rushes towards you; skidding to a halt, she kneels before you, hands behind her back, fully exposed.  "<i>Yes my ' +
                this.player.mf("Master", "Mistress") +
                '?</i>"  Amily says seductively, licking her lips.'
        );
        this.outx('\n\n"<i>Oh but... you\'re not alone!  This is-</i>"');
        this.outx(
            '\n\n"<i>This is Vapula, another of my sluts; but for you, she\'s going to be your mistress. You will be her personal fuck-toy and you will please her in every way as you would please me. Is that clear?</i>"'
        );
        this.outx(
            '\n\nThe little mousy looks down awkwardly, intimidated by the towering succubus.  "<i>Y-yes ' +
                this.player.mf("Master", "Mistress") +
                '...</i>"'
        );
        this.outx(
            "\n\nYou order Amily to get on her hands and knees and get ready for your dick. As the mousy cumdumpster braces herself for her imminent pounding, you tell your purple fuckbuddy to stand before Amily's mouth to be eaten out"
        );
        if (this.player.balls > 0)
            this.outx(
                ": her drooling pussy needs to be prepared because you're going to take her next"
            );
        this.outx(
            ".  Vapula smirks in excitement and eagerly shoves her tumescent pussy in front of the mousette's waiting lips; Amily keeps wagging her butt impatiently, looking forward to being used as a disposable anal-toy.  You wink at Vapula; she's going to like it."
        );
        this.outx(
            "\n\nGrabbing hold of your mouse's plush buttcheeks, you stretch her anal opening and in a brutal, powerful thrust, you slide all of your " +
                this.cockDescript(x) +
                " down her interior.  Amily immediately squeaks, her mouth drooling and her whole body twitching as she adapts to the erect prick inside her.  Her cries of pleasure are suddenly muffled as Vapula, too turned on to care about your mousette, brutally grabs her head and squeezes her face between her legs.  In the meantime, you start pumping at her ass, effortlessly moving your hips backwards and forwards as your " +
                this.cockDescript(x) +
                " ravages the mousegirl's insides.  The poor creature, already driven over the edge by your relentless anal pounding, is now forced to lick the succubus' luscious pussy, her tongue being forced into probing her lush depths at each thrust received from behind.  She keeps moving back and forth between Vapula and you, roughly mishandled as both ends of her body are being abused.  However, this does not seem to decrease in the least the pleasure she's getting. She joyfully slams back her ass against your groin at every thrust, her insides always hungry for more dickflesh.  Your hips are quasi-immobile as she impales herself on her own in an insatiable cock-hunger."
        );
        this.outx(
            "\n\nHer tongue appears to have magical effects on Vapula: the horny succubus keeps moaning, fondling her breasts with one hand while the other keeps pressing the mousette's head against her crotch.  Amily keeps exploring the succubus' love-tunnel with her tongue, her enthusiasm making up for her lack of experience.  She slurps and swallows every drop of fem-juice dribbling out of Vapula's cunt, making the demoness squirm; her face displays nothing but utter bliss."
        );
        this.outx(
            "\n\nAs your " +
                this.cockDescript(x) +
                " effortlessly slides deeper down your mousegirl's colon, your pre-cum acting as a slick lube against her tight anal ring, you decide to spice up things a little.  Leaning down on Amily's back, you reach over and start toying with her huge tits.  You knead her voluptuous orbs and pinch her nipples, making her whole body tremble in extreme arousal.  The purple hell-girl on the other side leans down too, quickly catching up on your intention; you kiss her ardently, the two of you locked into a demonic embrace, utterly oblivious of the cumslut undulating below you as her holes are being negligently used."
        );
        this.outx(
            "\n\nThis mad triangle of lust eventually breaks as Vapula pulls back feverishly and screams, her body taken by a series of shivering orgasms.  You watch in fascination as the succubus jerks and twitches hypnotically, her lustrous vagina delivering torrent after torrent of fem-spunk.  Amily's upper body is soon wholly drenched, despite her best efforts to waste as little of the succubus' juices as possible.  She keeps gulping at Vapula's baby-maker in a ravenous display of lust."
        );
        this.outx(
            "\n\nAs Amily drinks, you can't help but notice her body is slowly being transformed by Vapula's essence.  Her horns start growing, her hips widen; her tits keep burgeoning"
        );
        // [if not defurred]
        if (this.flags[kFLAGS.AMILY_NOT_FURRY] == 0)
            this.outx(" and her fur starts shrinking, letting her rosy skin shine below");
        this.outx(
            ".  By Lethice, your succubus is literally warping your cumslut into a replica of herself!  All the more aroused by this obscene show of corruption, you pound harder, grabbing hold of her horns for better leverage.  At last, your " +
                this.cockDescript(x) +
                " is suddenly squeezed as Amily's ample butt swells under the taint of Vapula's juice; this extra pressure is enough to make you cum, your loins churning and your junk bulging as you shoot your load through Amily's anus.  The poor cumslut starts fainting from the sheer flow of spunk flooding her interior as well as her mouth; with a pathetic squirting orgasm, she goes limp and moans pitifully.  You pump ragingly as you reach your climax, making entire ropes of jism spurt in and out of her ass and slathering her backside.  Once your orgasm begins to falter, you carelessly drop your mousy slut, letting her crawl in a small pool of mixed juices.  Vapula lets go of Amily's jaw, discarding her disposable fuck-toy, satiated."
        );
        // [if balls]
        if (this.player.balls > 0) {
            this.outx(
                "\n\nYou speak in a hoarse, breathless voice, \"<i>It's not over.</i>\"  You shake the tired mousette, telling her she'd better get ready for another round.  Amily whimpers and squeaks feebly, but you pay no attention as you grab her shoulders and give her a perfect view of your dangling, cum-dripping " +
                    this.ballsDescriptLight() +
                    ".  You order, \"<i>Lick.</i>\"  As your mousy cumslut complies and starts tickling your gonads with her demonic tongue, you pull Vapula, bringing her close to you; she is still recovering from her intense orgasm and doesn't say anything as you spread her legs and dart your hand at her vagina, testing her wetness. Once you've teased her enough, you grab her hips, lift her and impale her dripping cunt on your " +
                    this.cockDescript(x) +
                    " with all your might.  The powerful intrusion makes the succubus moan, but you don't stop there; enclosing her with your arms, you savagely lift her up and down on your dicks, enjoying her fresh, wet warmth as you let her bounce atop you.  You hug her tightly as she twists wildly against your body, unable to restrain herself under your merciless ploughing."
            );
            this.outx(
                "\n\nAmily keeps sucking on your " +
                    this.ballsDescriptLight() +
                    ", her tongue absorbing any drop of semen dribbling from the vigorous clash of genitals above her.  Her repeated slurping and fondling makes your cum-receptacles swell again as your rising lust keeps loading them with more seed.  You feel a familiar pressure building at your crotch, your urethra inflating and pulsing as you keep pumping at Vapula's fuck-hole.  You keep up this crazy pace until your " +
                    this.cockDescript(x) +
                    " starts twitching on its own, releasing a milky stream directly into the succubus' waiting womb."
            );
            // [if cum production massive]
            if (this.player.cumQ() >= 1500)
                this.outx(
                    "  Sticky globs of white goo are shot from the tip of your rod, effectively stuffing Vapula so full of your spooge that some of it drips out and rains down on Amily's face, sopping her with fluids. The succubus quivers in your arms, giving in to her lust before squirting a powerful spray of fem-spooge, splattering Amily even more."
                );
            this.outx(
                "  Once your orgasm starts fading, you drop Vapula and tell her to imitate Amily; the dilligent succubus gets on her knees and quickly licks your " +
                    this.cockDescript(x) +
                    ", feeding her cum-thirst as she cleans your junk of its spooge.  Your two sluts work quickly, easily sucking up every bit of goo until your " +
                    this.cockDescript(x) +
                    " eventually shrinks to a half-erect state, your lust consumed."
            );
        }
        this.outx(
            "\n\nYou give a pat to Amily's head, telling her she's been an excellent buttslut. The mousette blushes in contentment under the bemused eyes of Vapula; you give your demon pet a last kiss, telling her Amily is hers for the remainder of the hour.  Knowing how insatiable the succubus is, she'll probably try to suck out your cum out of Amily's ass.  You keep musing these perverse thoughts as you leave your sluts to their business."
        );
        this.player.orgasm();
        this.dynStats("cor", 2);
        this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
        this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Vapula/Night Succubus
    public vapulaAssistsCeruleanSuccubus(): void {
        let x: number = this.player.cockThatFits(100);
        if (x < 0) x = this.player.smallestCockIndex();
        // [automatically triggers once the option Night Fuck is toggled and Cerulean potion is drunk, can't be selected from menu. Requires Cerulean potion to have been drunk once]
        this.outx(
            '\n<b>That night...</b>\nYou wake up Vapula, telling her to get ready for your "guest". You expose your ' +
                this.cockDescript(x) +
                ", ordering your succubus slut to work you up into a proper aroused state.  The sleepy purple girl yawns a bit, still half-conscious from her dirty dreams, and you profit from the opening to shove your junk between her lips.  Clearly getting the message, Vapula starts licking it, her expert mouth taking all your length without even thinking of it.  She deepthroats you for a while, until you hear steps from outside the camp. In the moonlight you can make out a tall silhouette: the night succubus has come back."
        );
        this.outx('\n\n"<i>Ah, there you are. Come in, we were just waiting for you.</i>"');
        this.outx(
            '\n\nA little surprised by the sight of Vapula, her mouth full of dick as you pump more and more inside her, the blue succubus clears her throat and cautiously walks toward you, not expecting this turn of events.  "<i>So you\'re getting your own slut to release you of your cum?  What am I going to do then?  You drunk from me; it is only legitimate that I should drink from you too.</i>"'
        );
        this.outx(
            "\n\nYou tell the blue woman not to worry about that and gently pat Vapula's head; the purple demoness coughs as she interrupts her divine blowjob and giggles when she notices one of her own kind.  She slowly gets up and is soon joined by your demon guest, awaiting your next orders.  The blue succubus and the purple succubus stand before you, their eyes filled with voracious lust and impatient need.  Two girls are eager for your cum, and there's only one " +
                this.player.mf("man", "herm") +
                " to satisfy them both... You don't know if you'll be up to the task, but it sure can't hurt to try.  Smiling to both, you remove your " +
                this.player.armorName +
                " and lazily lie down, your erect " +
                this.cockDescript(x) +
                ' standing provocatively.  "<i>Well, come on ladies.  Please me.  Can\'t you see I need some satisfaction?</i>"'
        );
        this.outx(
            "\n\nAt this invitation, both luscious creatures practically jump you.  In no time you're covered with blue and purple flesh, arms and lips caressing you everywhere but focusing on your most sensitive spots.  You shiver several times as the hell-girls give you tingles of pleasure that tease you almost unbearably.  You feel hands and tongues being pressed against your " +
                this.cockDescript(x) +
                " and smearing it with saliva and pre-cum; you are kissed several times, your mouth is being padded with a flexible demonic tongue as your palate is filled with a sweet unholy taste; the scent of horny succubi makes you giddy and all the more aroused.  You feel nipples being stuffed in your mouth and you instinctively suck, gulping the succubi's essences like a newborn."
        );
        this.outx(
            "\n\nDrops of some fluid start falling on your face; looking up, you see nothing but a drooling, gushing pink pussy being lowered down.  Idly wondering whose it might be, you start probing your tongue into that moist vagina, eagerly sucking and licking as the whore atop you moans and bucks wildly; from her hoarse, ragged voice you can recognize Vapula.  Gods, she's such a horny succubus slut!  You keep eating her out until she screeches madly in pleasure, probably waking up every living creature around your camp.  At the same time, you feel your " +
                this.cockDescript(x) +
                " is being handled and inserted into a nice warm snatch.  The brutal temperature change and amazing tightness drives you near the edge, and you actually feel your spooge flowing up and down your urethra as you contract your hips in a desperate effort to control yourself.  Your groin harshly hits the blue succubus', and your " +
                this.cockDescript(x) +
                ' digs even deeper in her innermost depths.  She sighs in contentment and slowly whispers, "<i>Guests first.</i>"'
        );
        this.outx(
            "\n\nShe starts riding you ferociously, clamping you down and gripping your hips with claw-like hands.  Her vaginal muscles implacably contract around your " +
                this.cockDescript(x) +
                ", acting as an boiling-hot and inescapable cock-ring.  Still trying your best to explore Vapula's love-tunnel, you reach around to get some of her tits, only to find the blue succubus' hands pinching your slut's nipples, making her shriek in torturesome pleasure.  You both keep groping her voluptuous body, making her shudder under your abusive massages.  Your head is now entirely soaked with Vapula's juices - that whore seems to orgasm ridiculously often.  Every time you consider pulling back your tongue and gasping for some fresh air, her twat squirts another crazy jet of fem-spunk down your face, making your vision blurry and leaving you with no choice but to lick her interior clean.  However, your efforts only stimulate her all the more, leading you to wonder how she can generate such an absurd amount of vaginal juices."
        );
        // [if multicock]
        if (this.player.cockTotal() > 1)
            this.outx(
                "  She suddenly seems to have an idea: leaning down to reach your second cock, she starts licking it, accompanying the savage thrusting of the blue demoness as she slurps your extra junk, giving you even more pleasure."
            );
        else
            this.outx(
                "  The blue demoness leans down and starts licking Vapula's moist pussy, intertwining her flexible tongue with yours and pleasuring the purple slut even more."
            );

        this.outx(
            "\n\nBoth hell-girls keep riding you relentlessly, thrashing back and forth as they impale themselves on your bodily appendages.  Their combined efforts are driving you mad with pleasure and with a deep sigh, you release your seed into your blue lover's waiting womb.  Her vaginal walls are furiously at work, doing their best to milk you as hard as they can and pumping glob after glob of spooge inside her.  The succubus utters a deep growl of pleasure as she is finally being fed, her eyes staring into nothingness and her pussy working on its own to keep all of your spunk.  As you keep thrusting in and out of the blue girl's depths, you feel Vapula trembling atop you, her buttocks grinding against your head in the most agreeable way before she releases a powerful shot of her own juice, splattering your neck and chest.  She then abandons herself to the arms of her blue fellow, who idly caresses her while still milking you.  As the last jet of semen forces its way inside her, her vaginal muscles eventually relax.  Both sluts sigh, winded; they collapse to the side, holding each other in their arms."
        );
        this.outx(
            "\n\nMaybe because you've drunk an appreciable amount of succubi juices, your " +
                this.cockDescript(x) +
                " is still half-erect, and you don't feel totally satisfied.  You give repeated cock-slaps to your lovers until they finally wake up.  Showing your still cum-dribbling cock, you tell them you still aren't satiated and you still have baby-batter to give away.  The simple mention of more available spooge is enough to get them all ready and waiting, their tongues hanging like hungry dogs.  You tell your blue guest to lie down and order Vapula to perform a good sixty-nine so she can lick your semen out of her colleague's cunt.  Exhausted from the intense threesome, they meekly comply and start eating each other out.  You place yourself behind Vapula's jiggly rump and start squeezing her fat buttocks, stretching them to reveal her tight anal opening.  Her whole body tenses at the realization of what she's going to receive, but before she can protest, you brutally jam all of your " +
                this.cockDescript(x) +
                " inside her colon.  Grunting in effort, you grab hold of her hips and thrust in and out relentlessly, smearing her anal walls with your residual semen.  Her tight confines and unbelievable hotness are more than enough to build up your lust back, and your " +
                this.cockDescript(x) +
                " only gets harder as it pounds Vapula's hot ass repeatedly.  The purple succubus, being taken in every orifice, keeps twisting in intolerable ecstasy and the blue wet cunt stuffing her mouth barely conceals her whorish moans."
        );
        // [if second cock]
        if (this.player.cockTotal() > 1)
            this.outx(
                "\n\nSince there seems to be an available hole, you quickly insert your second penis into Vapula's drooling twat, bumping the blue succubus' tongue out of its way.  \"<i>Make room for me, slut.</i>\"  You feel the tongue being quickly removed and slowly massaging your junk instead.  Your efforts being facilitated by the blue demoness smearing juices all over your dickflesh, you thrust at full force inside Vapula's snatch.  The subtle feeling of a demonic tongue probing her interior is replaced by the mad pushes of a big hard cock is enough to make her squirt.  Cum rains down your hips and the blue succubus' mouth as you double-penetrate your purple pet, ravaging her from both holes."
            );
        // [if third cock]
        if (this.player.cockTotal() > 2)
            this.outx(
                "\n\nIt feels good, but your guest's tongue feels redundant around your second cock since it already has a warm place to be lodged in.  Picking your third tool, you tell your blue slut to open her mouth wide so she can get her dessert.  Shoving all your length in her throat, you stand still, the thrilling sensation of penetrating three succubi holes at once making you laugh triumphantly.  The whole situation appears comical to you.  These powerful creatures, responsible for the fall of an entire land, now begging for their holes to be filled...  You laugh as you pump back and forth, your mad state of arousal quickening your incoming release.  The succubus' mouth doesn't feel as deliciously rough as Vapula's ass, and not as tight as her warm cunt, but sweet nonetheless, her mouth and lips doing an excellent job at driving you crazy with lust."
            );
        this.outx(
            "\n\nYou keep pounding away, coating your succubi with a mix of newly formed pre-cum, old cum from your previous ejaculation and vaginal juices being spilled all over your " +
                this.cockDescript(x) +
                ".  The succubus' inhuman recesses start to feel too hot for you, and with another powerful shot, you cum.  The contact of your globs of spooge hitting Vapula's backdoor makes her squirt another of her insane orgasms, but you keep releasing your milk inside her."
        );
        // [if second cock]
        if (this.player.cockTotal() > 1) {
            this.outx("  You pack her tight snatch ");
            // [if third cock]
            if (this.player.cockTotal() > 2) this.outx("and your blue lover's mouth ");
            this.outx("likewise.");
        }
        this.outx(
            "  Jism is being spilled all over Vapula's backside and spurts in sticky jets down her baby-maker and the blue slut's waiting mouth.  Vapula's holes tremble and contract in order to keep as much spooge as possible, and the blue succubus tries to feed as well, frustrated to feel her own semen being eaten by Vapula's gluttonous tongue.  Cum keeps circulating in and out of the hell-girls, with your " +
                this.cockDescript(x) +
                " as a source.  Due to their mouths being occupied gulping semen from some hole, they only utter slow, lewd moans as they release their own juices in orgasm. The echo of your trio of bodies abandoning themselves to this debauched orgy is resonating all around your camp.  It should be wiser to end this quickly, lest you attract a horde of horny imps willing to join the party."
        );
        this.outx(
            "\n\nYou abruptly pop out your " +
                this.cockDescript(x) +
                " and rudely order your sluts to finish their work.  Still recovering from the hard fuck, they lazily obey and lick all the cum from your soaked junk.  They work quickly, not willing to let any drop of cum be stolen by their concurrent.  Sometimes their tongues will claim the same deposit of spooge and they will fight over it, their tongues entwining until they lewdly kiss each other.  The display is quite erotic but you'd prefer they'd kiss your " +
                this.cockDescript(x) +
                ", so you call them to order every time it happens.  When they're finally done emptying you from all your sperm, you give your lovers a tender kiss, thanking them for your efforts.  The blue succubus, still dazed by this intense session, hands you distractedly a bottle of her own milk.  \"<i>Woah.  That was... amazing. I don't know what she does to you but you taste much, much better when you keep this girl around.  We should definitely repeat this soon.</i>\"  Giving your dick a goodbye kiss, she staggers out of your camp, probably drunk from your huge cumload."
        );
        this.outx(
            "\n\nYou ask Vapula if she agrees with what the blue succubus said. As a response, your pet hugs you tightly"
        );
        if (this.player.tallness < 60) this.outx(", enclosing your head in her cleavage");
        this.outx(
            '.  "<i>That was fun! I can\'t wait to have another party like this! You should invite her more often!</i>"'
        );
        this.outx("\n\nYou know you definitely will.");
        // standard night succubus stat increases
        this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
        this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
        this.player.orgasm();
        this.dynStats(
            "str",
            Vapula.rand(2),
            "tou",
            Vapula.rand(2),
            "spe",
            Vapula.rand(2),
            "int",
            Vapula.rand(2),
            "cor",
            2.5
        );
        this.inventory.takeItem(this.consumables.CERUL_P, this.playerMenu);
    }

    // Vapula/Jojo threesome
    private vapulaJojoThreesomes(): void {
        this.clearOutput();
        this.outx(
            "You call out in the jungle, \"<i>Slut!</i>\"  Vapula snickers, \"<i>I'm here, you know.</i>\"  You slap her ass to shut her up and quickly explain that you don't call her slut because she doesn't care, being a succubus.  There is only one fucktoy you call by that name, because he's in denial.  By Lethice you intend to have your way with him, and Vapula will get to participate too.  As she eagerly listens to you, her tongue inadvertently licking her lips, you hear soft steps behind you.  You look back and see Jojo walking hesitantly, intimidated by your unholy presence and the towering ex-dominatrix.  \"<i>You were right, he's such a cute shy slut.  I bet he secretly wants some nice cock to ram his every hole.  Don't you, little pet?</i>\"  The mousy monk huddles up little by little, bowing his head uncomfortably."
        );
        this.outx(
            '\n\nYou walk up to Jojo and slap him in the face, making him whimper.  "<i>Hey, your mistress Vapula is talking to you.  Show some respect, look at her and answer.</i>"'
        );
        this.outx(
            "\n\nJojo only manages to mutter some terrified words.  From his mumbles, you understand that he's begging you not to abandon him to a demon and keep him with you.  You chortle cruelly: this poor slut must be really scared of Vapula.  \"<i>Ha ha, so you acknowledge you prefer my junk to this hot body standing before you?  What a cum-craving buttslut.   I'm sorry, Vapula, but even your luscious charms aren't enough to- wait, why are you keeping your hands in front of your crotch like that?  Don't pretend to be ashamed, bitch!  Show your beautiful mouse cock to us!  There's no need to be afraid, we're all friends.</i>\"  Seeing that Jojo won't comply, you forcibly grab hold of his arms, revealing what Jojo was trying to hide: a raging erection, his throbbing 13 inch long rodent prick pointing at Vapula's naked body and dribbling pre-cum. He tries his best to look away from her but his cock stands as proud as he feels ashamed."
        );
        this.outx(
            '\n\n"<i>Awww, look at that!  Looks like our little pet has a crush on you!  Look at how hard he is!</i>"'
        );
        this.outx(
            '\n\n"<i>You\'re right!  He really likes me!  Is that the effect I have on you, little boy?</i>"'
        );
        this.outx(
            "\n\n\"<i>You should be ashamed of displaying your lust so shamelessly.  It's not polite to be that hard for your mistress.  Have a little self-respect for gods' sake.</i>\""
        );
        this.outx(
            "\n\nYou both keep taunting the poor mouse, laughing at him and making him feel all the more ashamed; but if anything, his arm-length cock only grows bigger and harder.  You smirk - that slut is really getting off on being abused! Well, you're going to give him a treatment he won't forget."
        );
        this.outx("\n\n<b>How will you use your fucktoy?</b>");
        this.outx(
            "\n\nYou could fuck Vapula in front of him; it would serve him right for displaying an erection for your succubus lover without your consent."
        );
        if (this.player.hasCock())
            this.outx(
                "\n\nYou could initiate a butt-fuck train, and ram his asshole while he fucks Vapula's; this way he would get what he clearly wants."
            );
        let tease;
        let train;
        if (this.player.hasVagina() || this.player.hasKeyItem("Demonic Strap-On") >= 0)
            tease = this.NTRSomeJojos;
        if (!this.player.hasCock()) {
        } else {
            tease = this.NTRSomeJojos;
            train = this.jojoButtFuckTrain;
        }
        this.simpleChoices(
            "Tease Jojo",
            tease,
            "ButtfuckTrain",
            train,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }

    // Netorare
    // Butt-fuck train
    // Vapula/Jojo Netorare
    private NTRSomeJojos(): void {
        this.clearOutput();
        if (this.player.hasCock()) {
            let x: number = this.player.cockThatFits(100);
            if (x < 0) x = this.player.smallestCockIndex();
            this.outx(
                "\"<i>Admit it, you'd love to use that smoking hot body, wouldn't you?  Don't lie to me.  You'd give up your soul in order to fuck her brains out.  Don't you want to plunge your dick inside her?  Don't you want to fuck my beautiful succubus wife?</i>\""
            );
            this.outx(
                "\n\nJojo shakes his head in denial, but he can hardly keep any shred of credibility when his rock-hard mouse cock speaks for him."
            );
            this.outx(
                "\n\n\"<i>That's only natural. After all, who wouldn't want to get a good grope of this fine ass...</i>\"  You punctuate the end of your sentence with a hard slap on Vapula's butt, making her jolt."
            );
            this.outx(
                '\n\n"<i>These perky tits...</i>"  You reach around and knead her twin orbs, paying special attention to her nipples.  Vapula openly moans from your titillation, and Jojo\'s eyes are glowing in lust and shame mixed.'
            );
            this.outx(
                "\n\n\"<i>These pulpy lips...</i>\" You turn her head and give her a lewd, passionate kiss, taking frequent peeks at Jojo in order to make sure he doesn't miss anything.  You pull back with a groan and smirk at him, \"<i>Hmmm...she's delicious.  I bet you've never tasted a succubus before... I pity you.  She's so good...</i>\"  You kiss Vapula again, enjoying the contact of her lips against yours as much as Jojo's raging envy."
            );
            this.outx(
                "\n\n\"<i>This wet pussy...</i>\"  You dart a hand to Vapula's crotch from behind and start fingering her; she wiggles and twists in your arms, and the erotic display is making Jojo blush in arousal.  His eyes seem to be locked as they bulge more and more out of their orbits; he can't help but gaze at the object of his lust being roughly manhandled by his master.  You stare back at him, your hands working on their own as they caress and abuse the succubus' sensitive flesh."
            );
            this.outx(
                '\n\n"<i>These hips... these thighs...</i>"  Grabbing hold of Vapula\'s waist, you shove your ' +
                    this.cockDescript(x) +
                    " between her legs and start grinding your junk against her vaginal entrance, teasing her in the most lustful manner. You keep grinding until your purple slut utters a lubricious moan."
            );
            this.outx(
                '\n\n"<i>No, really, her whole body is perfect.</i>"  You run your hands all over the succubus curves, pinching here and caressing here.  "<i>And gods, that tight anus!  Oh, Jojo, if you knew how cock-hungry she is...</i>"  With a wicked, wanton smile, you rail Vapula\'s ass with your ' +
                    this.cockDescript(x) +
                    ", filling the entirety of her interior with your dickflesh as you watch the monk.  The poor mousy slut has completely given in to his lust; he has fallen on his knees and is now stroking himself feverishly, unable to break your gaze.  You start pounding Vapula's butt; with each thrust you grunt ostensibly, letting your mouse pet know how much you enjoy it.  As for Vapula, the slutty demoness is clearly enjoying her anal treatment, the sight of a poor bitch masturbating to her being all the more arousing to her.  She also stares at him with longing eyes, as if to provoke him with her nude, horny body being fucked by someone else.  Soon she is screaming in utter ecstasy and starts babbling meaningless dirty talk, \"<i>Fuck, fuck me... oh yessssssssssssss... more!  MORE!</i>\"  She's clearly acting as a naughty bitch!  You wonder if the presence of a shy creature is helping to release her inner wantonness... Shrugging it off, you decide to focus on the nice purple body impaling itself on your " +
                    this.cockDescript(x) +
                    " and pound her harder, your meat releasing streams of sex juices as it pounds in and out of Vapula's pucker."
            );
            if (this.player.cockTotal() > 1) {
                this.outx(
                    "\n\nYou decide to add some more depravity to this sheer show of lewdness.  Grabbing your second turgid shaft, you knock at Vapula's vaginal entrance, your tip slowly rubbing her nether-lips.  Then, at the moment she least expects, you ram it in, effectively double-penetrating her."
                );
                // [if third cock]
                if (this.player.cockTotal() > 2)
                    this.outx(
                        "  Since the horny slut has a demonic vaginal capacity, you might as well fit more dick in it: in no time your third dick joins its colleague in this infernal vaginal assault."
                    );
                this.outx("  ");
            } else this.outx("\n\n");
            this.outx(
                "You push in and out of her, claiming both her holes and snickering at the poor mouse thing that can get neither. With a mighty push, you put Vapula on all fours and lean down in order to touch more of her supple body.  Your purple slut is now dying with pleasure, her tongue hanging and her eyes staring behind Jojo as the monk squeaks pitifully in his pathetic self-stroking."
            );
            this.outx(
                '\n\nStill looking at Jojo, you keep taunting him as you ravage Vapula\'s anus.  "<i>Do you want to know if she feels good?  Because I can tell you she does.  Gods, her ass is so... hot... my cock is about to melt... fuck...  Do you want to know if I feel good to her?  Darling, tell our mouse pet how good you feel.</i>"'
            );
            this.outx(
                '\n\n"<i>Oh, yes... YES!  Like that!  Deeper!  YES!  Harde-aargh....</i>"  Unable to think properly under the intense butt-fucking she\'s receiving, her eyes roll and she becomes oblivious of everything but her hole'
            );
            if (this.player.cockTotal() > 1) this.outx("s");
            this.outx(" being filled with cock.");

            this.outx(
                "\n\nIncapable of bearing such a teasing treatment, Jojo starts to weep sofly as he ragingly tries to get rid of his shameful erection.  He strokes his broad mouse dong with unusual ferocity, his eyes consumed with frustrated lust and humiliation.  His eyes bulge, his balls swell, his hips rock back and forth, "
            );
            if (this.jojoScene.tentacleJojo())
                this.outx("his tentacles start flying toward his ass, ");
            this.outx("his-");
            this.outx('\n\n"<i>No.</i>"');

            this.outx(
                "\n\nStartled by your command, unexpectedly coming from someone busy pounding some succubus ass, Jojo stares at you, puzzled."
            );
            this.outx('\n\n"<i>Don\'t cum before me, slut.  Me first and her first.</i>"');
            this.outx(
                "\n\nToo scared to disobey, the rodent monk only meekly nods and releases his iron grip on his erect prick, his tail wagging in despair.  He can only watch helplessly as you finish butt-fucking Vapula, his dick vibrating on its own at this pure display of anal sluttery.  The succubus' lush recesses finally drain your stamina completely and with a loud groan, you cum, fully loading your purple slut's backdoor with seed.  Her ass avidly devours your baby-batter as she screams like a whore in heat, visibly welcoming her new ration of spooge."
            );
            // [if second cock]
            if (this.player.cockTotal() > 1)
                this.outx(
                    "  Your extra junk shoved down her love-tunnel also explodes in a milky torrent, blasting her fuck-hole full of spooge too."
                );
            this.outx(
                "  Her anal walls milk you with ruthless efficiency; you wouldn't have expected less from an experienced demon, but the feeling is amazing.  Your meat is being squeezed and clamped as [eachCock] releases its full load of sperm.  As you watch the poor mouse slut being denied an orgasm, his desperately aroused state only turns you on all the more.  Removing your " +
                    this.cockDescript(x) +
                    " from Vapula's warm and tight pucker, you wave it at your monk pet, spraying him with your spooge.  Since you haven't given him the authorization to get off yet, the fucktoy is forced to endure your white rain as well as the squirts of an orgasming succubus he never got to touch.  Tears mix with your seed as they dribble down his face and stain his fur, but you don't care; if anything, you are only compelled to pollute him with even more thick ropes of jism."
            );
            this.outx(
                "\n\nWhen the mouse slut is completely soiled, you order him to place himself behind Vapula.  You want him to lick your cum off her ass while she sucks your dick.  Excited at the prospect of giving and receiving pleasure at the same time, Vapula eagerly does as she is told, suckling from your " +
                    this.cockDescript(x) +
                    " and presenting her purple, cum-stuffed backside to your other slut.  Whimpering in humiliation, treated as a sex-slave unworthy of getting your cum firsthand, Jojo proceeds to lick the succubus' gaping asshole, sobbing and sniffing every now and then as he loudly slurps your cum.  Not caring in the least about the cumslut wiping her ass clean, your purple demon lover distractedly enjoys her dessert, satiating her craving for semen as she milks the last globs of goo still present in your body."
            );
            this.outx(
                '\n\nWhen you\'re both completely empty, you help Vapula to her feet; as the succubus kisses you and thanks you for her meal, you notice that Jojo is still sitting before you, curled up and waiting for your next orders.  You laugh with your succubus companion at his submissive posture; Vapula kicks his butt and snickers, "<i>Can\'t you see we\'re busy?  Piss off, slut.</i>" You approve.  "<i>You heard what she said.  Go get fucked elsewhere.</i>"  Still terrified by the unholy couple you both form, Jojo nods feebly and quickly disappears into the jungle.'
            );
        }
        // Jojo NTR (as female)
        else {
            this.outx(
                'You call out in the jungle, "<i>Slut!</i>"  Vapula snickers, "<i>I\'m here, you know.</i>"  You slap her ass to shut her up and quickly explain about your mousey fucktoy in denial; how pleasing it is to humiliate a sex slave who cannot face who he is, and how you intend to use her to further his debasement.  As she eagerly listens to you, her tongue inadvertently licking her lips, you hear soft steps behind you.  You look back and see Jojo walking hesitantly, intimidated by your unholy presence and the towering ex-dominatrix.  "<i>You were right, he\'s such a cute shy slut.  I bet he secretly wants some nice cock to ram his every hole.  Don\'t you, little pet?</i>"  The mousy monk huddles up little by little, bowing his head uncomfortably.'
            );
            this.outx(
                '\n\nYou walk up to Jojo and slap him in the face, making him whimper.  "<i>Hey, your mistress Vapula is talking to you.  Show some respect, look at her and answer.</i>"'
            );
            this.outx(
                "\n\nJojo only manages to mutter some terrified words.  From his mumbles, you understand that he's begging you not to abandon him to a demon and keep him with you. You chortle cruelly: this poor slut must be really scared of Vapula.  \"<i>Ha ha, so you acknowledge you prefer what I do to you to this hot body standing before you?  What a craven little sissy.  I'm sorry, Vapula, but even your luscious charms aren't enough to- wait, why are you keeping your hands in front of your crotch like that?  Don't pretend to be ashamed, bitch!  Show your beautiful mouse cock to us!  There's no need to be afraid, we're all friends.</i>\"  Seeing that Jojo won't comply, you forcibly grab hold of his arms, revealing what Jojo was trying to hide: a raging erection, his throbbing 13 inch long rodent prick pointing at Vapula's naked body and dribbling pre-cum.  He tries his best to look away from her but his cock stands as proud as he is ashamed."
            );
            this.outx(
                '\n\n"<i>Awww, look at that!  Looks like our little pet has a crush for you! Look at how hard he is!</i>"'
            );
            this.outx(
                '\n\n"<i>You\'re right!  He really likes me!  Is that the effect I have on you, little boy?</i>"'
            );
            this.outx(
                "\n\n\"<i>You should be ashamed of displaying your lust so wantonly.  It's not polite to be that hard for your mistress.  Have a little self-respect for gods' sake.</i>\""
            );
            this.outx(
                "\n\nYou both keep taunting the poor mouse, laughing at him and making him feel all the more ashamed; but if anything, his arm-length cock only grows bigger and harder.  You smirk - the sissy is really getting off on being abused!  Well, you're going to give him a treatment he won't forget.  You buckle into your strap-on, sighing lasciviously as you slide the pink dildo end into your " +
                    this.vaginaDescript(0) +
                    ", smiling wickedly as Jojo's breath quickens."
            );
            this.outx(
                "\n\n\"<i>Admit it, you'd love to use that smoking hot body, wouldn't you?  Don't lie to me.  You'd give up your soul in order to fuck her brains out.  Don't you want to plunge your dick inside her?  Don't you want to fuck my beautiful succubus wife?</i>\""
            );
            this.outx(
                "\n\nJojo shakes his head in denial, but he can hardly keep any shred of credibility when his rock- hard mouse cock speaks for him."
            );
            this.outx(
                "\n\n\"<i>That's only natural.  After all, who wouldn't want to get a good grope of this fine ass...</i>\"  You punctuate the end of your sentence with a hard slap on Vapula's butt, making her jolt."
            );
            this.outx(
                '\n\n"<i>These perky tits...</i>"  You reach around and knead her twin orbs, paying special attention to her nipples.  Vapula openly moans from your titillation, and Jojo\'s eyes are glowing in lust and shame mixed.'
            );
            this.outx(
                '\n\n"<i>These pulpy lips...</i>" You turn her head and give her a lewd, passionate kiss, taking frequent peeks at Jojo in order to make sure he doesn\'t miss anything.  You pull back with a groan and smirk at him.'
            );
            this.outx(
                "\n\n\"<i>Hmmm... she's delicious.  I bet you've never tasted a succubus before...  I pity you.  She's so good...</i>\""
            );
            this.outx(
                "\n\nYou kiss Vapula again, enjoying the contact of her lips against yours as much as Jojo's raging envy."
            );
            this.outx(
                "\n\n\"<i>This wet pussy...</i>\"  You dart a hand to Vapula's crotch from behind and start fingering her; she wiggles and twists in your arms, and the erotic display is making Jojo blush in arousal.  His eyes seem to be locked as they bulge more and more out of their orbits; he can't help but gaze at the object of his lust being roughly manhandled by his mistress.  You stare back at him, your hands working on their own as they caress and abuse the succubus' sensitive flesh."
            );
            this.outx(
                '\n\n"<i>These hips... these thighs...</i>"  Grabbing hold of Vapula\'s waist, you shove the purple end of your strap-on between her legs and start grinding against her vaginal entrance, teasing her in the most lustful manner.  You keep grinding until your purple slut utters a lubricious moan.'
            );
            this.outx(
                '\n\n"<i>No, really, her whole body is perfect.</i>"  You run your hands all over the succubus curves, pinching here and caressing here.'
            );
            this.outx(
                "\n\n\"<i>And gods, that tight anus!  Oh, Jojo, if you knew how cock-hungry she is...</i>\" With a wicked, wanton smile, you rail Vapula's ass with your artificial cock, filling the entirety of her interior with dick substitute as you watch the monk.  The poor mousy slut has completely given in to his lust; he has fallen on his knees and is now stroking himself feverishly, unable to break your gaze.  You start pounding Vapula's butt; with each thrust you moan as your end saws into your dripping hole, letting your mouse pet know how much you enjoy it.  As for Vapula, the slutty demoness is clearly enjoying her anal treatment, the sight of a poor bitch masturbating to her being all the more arousing to her.  She also stares at him with longing eyes, as if to provoke him with her nude, horny body being fucked by someone else.  Soon she is screaming in utter ecstasy and starts babbling meaningless dirty talk.  \"<i>Fuck, fuck me... oh yessssssssssssss... more! MORE!</i>\"  She's clearly acting as a naughty bitch!  You wonder if the presence of a shy creature is helping to release her inner wantonness.  Shrugging it off, you decide to focus on the nice purple body impaling itself on your dildo and pound her harder, the obscene device releasing streams of its sap as it surges in and out of Vapula's pucker.  With a mighty push, you put Vapula on all fours and lean down in order to touch more of her supple body, grabbing hold of her plump breasts, pinching her hard nipples between the gaps in your fingers as you begin to batter into her as hard as you can.  Your purple slut is now dying with pleasure, her tongue hanging and her eyes staring behind Jojo as the monk squeaks pitifully in his pathetic self-stroking."
            );
            this.outx(
                '\n\nStill looking at Jojo, you keep taunting him as you ravage Vapula\'s anus.  "<i>Do you want to know if I feel good to her? Darling, tell our mouse pet how good you feel.</i>"\n\n"<i>Oh, yes... YES! Like that! Deeper! YES! Harde-aargh...</i>"  Unable to think properly under the intense butt-fucking she\'s receiving, her eyes roll and she becomes oblivious of everything but being filled with cock.  Incapable of bearing such a teasing treatment, Jojo starts to weep sofly as he ragingly tries to get rid of his shameful erection.  He strokes his broad mouse dong with unusual ferocity, his eyes consumed with frustrated lust and humiliation. His eyes bulge, his balls swell, his hips rock back and forth, '
            );
            if (this.jojoScene.tentacleJojo())
                this.outx("his tentacles start flying toward his ass, ");
            this.outx("his-");
            this.outx('\n\n"<i>No.</i>"');

            this.outx(
                "\n\nStartled by your command, unexpectedly coming from someone busy pounding some succubus ass, Jojo stares at you, puzzled."
            );
            this.outx('\n\n"<i>Don\'t cum before me, slut. Me first and her first.</i>"');
            this.outx(
                "\n\nToo scared to disobey, the rodent monk only meekly nods and releases his iron grip on his erect prick, his tail wagging in despair.  He can only watch helplessly as you finish butt-fucking Vapula, his dick vibrating on its own at this pure display of anal sluttery.  With a loud moan, you clench down upon your vibrating sex tool and cum, releasing the other end fully as you do, loading your purple slut's backdoor with seed.  Her ass avidly devours the liquid surge as she screams like a whore in heat, visibly welcoming her new ration of baby-batter.  She eagerly thrusts back against you, making your end of the strap-on rub your walls delightfully, and the two of you continue to rut into each other eagerly even as demonic jizz spurts around the dildo and paints Vapula's ass cheeks.  As you watch the poor mousy slut being denied an orgasm, his desperately aroused state only turns you on all the more: removing the strap-on from Vapula's warm and tight pucker, you wave it at your monk pet, spraying him with spooge."
            );
            this.outx(
                "\n\nSince you haven't given him the authorization to get off yet, the fucktoy is forced to endure your white rain as well as the squirts of an orgasming succubus he never got to touch.  Tears mix with your seed as they dribble down his face and stain his fur, but you don't care; if anything, you are only compelled to pollute him with even more thick ropes of demon jism.  When the mousy slut is completely soiled, you order him to place himself behind Vapula; you want him to lick the cum off her ass while she eats you out.  Excited at the prospect of giving and receiving pleasure at the same time, Vapula does as she's told; kneeling before you she sends her long tongue eagerly searching into your leaking twat, flicking at your " +
                    this.clitDescript() +
                    " whilst presenting her purple, cum-packed backside to your other slut.  Whimpering in humiliation, treated as a sex-slave unworthy of getting cum firsthand, Jojo proceeds to lick the succubus' gaping asshole, sobbing and sniffing every now and then as he loudly slurps your cum.  Not caring in the least about the cumslut wiping her ass clean, your purple demon lover distractedly enjoys her dessert, exploring every crevice of your sex and teasing out every last drop of sweet girl cum.  When you're both completely clean, you help Vapula to her feet; as the succubus kisses you and thanks you for her meal, you notice that Jojo is still sitting before you, curled up and waiting for your next orders."
            );
            this.outx(
                '\n\nYou laugh with your succubus companion at his submissive posture.  Vapula kicks his butt and snickers, "<i>Can\'t you see we\'re busy? Piss off, slut.</i>" You approve: "<i>You heard what she said. Go get fucked elsewhere.</i>"  Still terrified by the unholy couple you both form, Jojo nods feebly and quickly disappears into the jungle.'
            );
        }
        this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
        this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
        this.player.orgasm();
        this.dynStats("sen", -2, "cor", 4);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Vapula/Jojo Butt-fuck train
    private jojoButtFuckTrain(): void {
        this.clearOutput();
        let x: number = this.player.cockThatFits(100);
        if (x < 0) x = this.player.smallestCockIndex();
        this.outx(
            "You tell Jojo it's his lucky day - you're going to have a joyful butt-fuck session with him and your purple pet."
        );
        this.outx(
            "\n\n\"<i>Admit it, you'd love to use that smoking hot body, wouldn't you?  Don't lie to me.  You'd give up your soul in order to fuck her brains out.  Don't you want to plunge your dick inside her?  Don't you want to fuck my beautiful succubus wife?</i>\""
        );
        this.outx(
            "\n\nJojo shakes his head in denial, but he can hardly keep any shred of credibility when his rock-hard mouse cock speaks for him."
        );
        this.outx(
            "\n\n\"<i>Don't worry, you're going to get a hot piece of her ass soon enough.</i>\"  You tell Vapula to place herself in front of your mousy pet such that the tip of his erect cock points toward her little pucker.  You point your own cock toward Jojo's slutty ass and give him a last warning."
        );
        this.outx(
            "\n\n\"<i>Remember: you get to use her butt temporarily but only because I say so.  Other than that, she's mine.  You have no right on her pussy, tits or even face.  You are allowed to fuck her butt only because it turns me on to see her at the end of a butt-fuck train, but don't you dare take advantage of the situation.  You're a mindless dick, nothing else.  If I order you to stop fucking her, you will stop fucking her right away.  Your whole body is mine, and hers too. Do you understand?</i>\""
        );
        this.outx(
            "\n\nJojo mumbles a few words, you can't understand all of them but you think he's gotten the message."
        );
        this.outx('\n\n"<i>All right! Let\'s get going!</i>"');
        this.outx(
            "\n\nYou seize your " +
                this.cockDescript(x) +
                " and press its tip against the mouse's sphincter, slowly pushing.  Startled by the sudden anal invasion, Jojo reflexively grabs Vapula's hips and inserts his rodent prick into her.  The simultaneous penetrations make your sluts squeak and moan in ecstasy, their bodies entranced as their anal walls provide them one thousand subtle sensations.  You grip his arms, using him as leverage to pull out, and slam it back home again.  Used like the fucktoy he truly is, Jojo doesn't resist; his dick moves of its own volition in and out of Vapula's interior as you relentlessly push him back and forth.  You secretly rejoice: his tight little ass is clearly adapting to your " +
                this.cockDescript(x) +
                " and it somehow feels even better than usual.  You pound hard, making him groan and beg for more; you eagerly give him what he wants and stuff him full of your dickflesh."
        );
        if (this.player.cockArea(x) > 100)
            this.outx(
                "  You can actually feel his internal organs being bumped against your meat as your " +
                    this.cockDescript(x) +
                    " stretches his colon beyond its normal size and thrusts in and out like a charging mammoth."
            );
        this.outx(
            "\n\nYou pump him full of your junk as he does the same to the buttslut in front of him.  You can't tell who yelps louder, but these bitches seem to enjoy the butt-fucking they're receiving.  This only entices you to fuck Jojo harder, knowing that the might of your thrusts will propagate down Vapula's butt; you ruthlessly smash your groin against Jojo's butt, pulling his arms harder at each thrust and oblivious of the mouse's pain in your passionate embrace.  Besides, the monk slut is probably getting off on getting manhandled like that.  You reach around and grab Vapula's breasts, holding her tight and crushing Jojo between the two of you as you keep ravaging his butt with repeated assaults."
        );
        // [if tentacle Jojo]
        if (this.jojoScene.tentacleJojo()) {
            this.outx(
                "\n\nBetween two butt-assaults, you order your pet to put his pretty appendages to some use for once: your ass needs to be taken care of too.  Jojo doesn't seem to react.  You first think he didn't hear you over Vapula's screams and the mad thuds of groins being clasped against butts, but you are soon relieved as you feel some tubular appendage tickling your buttocks.  Encouraging him, you thrust deeper in his own butt, inviting him to return the favor.  Your efforts are rewarded as you feel your own anus being savagely violated by some fat penile flora, sap-like slime being spilled down your legs.  The cock fucks you hard and rough, speeding up and slowing down irregularly as Jojo tries to muster his stamina.  At the same time, another of these green rods finds its way toward your mouth; you eagerly suck the tip like a popsickle and it immediately shoves itself down your throat.  Your neck bulges obscenely from the huge dick-intrusion, but you don't care; his cock tastes too sweet."
            );
            // [if vagina]
            if (this.player.hasVagina())
                this.outx(
                    "  Last but not least, a soft cock-knock at the entrance of your " +
                        this.vaginaDescript() +
                        " signals an incoming intrusion.  If your mouth weren't so full of cock you would sigh in relief as your aching pussy is thoroughly penetrated."
                );
        }
        // [if PC has extra long tentacle cock, variable is n1]
        let n1 = -1;
        let n2 = -1;
        let n3 = -1;
        this.temp = this.player.cockTotal();
        while (this.temp > 0) {
            this.temp--;
            if (this.player.cocks[this.temp].cockType == CockTypesEnum.TENTACLE && this.temp != x) {
                if (n1 == -1) n1 = this.temp;
                else if (n2 == -1) n2 = this.temp;
                else if (n3 == -1) n3 = this.temp;
                break;
            }
        }
        if (n1 >= 0)
            this.outx(
                "\n\nA deliciously depraved idea crosses your mind; using your dick muscles, you move your " +
                    this.cockDescript(n1) +
                    " toward Vapula.  It squirms for a moment as you look for her wet snatch, poking her everywhere with your tip and teasing her with your accidental ministrations, but at last you find her vaginal entrance.  Using the rubbery flexibility of your plant-like prick, you brutally shove it down her love-tunnel, trying to force inside as many inches as you can.  You can feel her instinctively altering her own body in order to accommodate more dickflesh inside her, and you keep pushing until your " +
                    this.cockDescript(n1) +
                    " is stretched to maximum capacity.  Somehow your tentacle rod is entirely buried in Vapula's warm depths, and her unbelievable tightness is driving you mad with lust.  It twists on its on volition inside her, its vegetable-like texture being more sensitive and receptive to pleasure than a normal prick and the sensations it sends to you are abnormally exquisite.  You almost forgot the asshole you were pounding with your " +
                    this.cockDescript(x) +
                    " but the way Jojo wriggles against it in order to fit more of your length inside him reminds you of your job."
            );
        // [if PC has another tentacle cock, variable is n2]
        if (n2 >= 0)
            this.outx(
                "\n\nSince your sluts still have free holes left, you decide to fill some more fuck-holes with your junk.  Guiding  your " +
                    this.cockDescript(n2) +
                    " toward Vapula's mouth, you think you could use a proper blowjob from a trained succubus and wait for her to let out another moan before filling your junk completely and thrusting up and down brutally, literally mouth-fucking her and treating her lips as a tight cock-ring.  Her expert tongue wraps around your girth, squeezing it and clinging to it like it's the most precious thing in her life.  She keeps jerking back and forth due to the hard butt-fucking she's receiving, and the jolts are transmitted to your " +
                    this.cockDescript(n2) +
                    " in the most teasing manner."
            );
        // [if PC has another tentacle cock, variable is n3]
        if (n3 >= 0)
            this.outx(
                "\n\nSince Vapula is already sucking you off, why not Jojo?  You still have appropriate junk left after all.  You promptly send your wriggling " +
                    this.cockDescript(n3) +
                    " and push it between the mousey's lips.  However, the slut won't open them!  You pound him ragingly, slamming the entirety of your " +
                    this.cockDescript(x) +
                    " down his colon and bruising his firm butt until he lets out a deep howl of pleasure and pain mixed; you profit from the opening and stuff his mouth so full of your " +
                    this.cockDescript(n3) +
                    " you think he's going to choke.  However, his mouth seems to be accustomed to take monstrous lengths - probably a side-effect of his corruption - and he quickly accommodates to your size.  Although he can't provide a blowjob as sweet as Vapula, you can definitely tell he's skilled at sucking dick.  The cute little slut!  You ram his asshole faster to reward him; this increased butt-fucking pace seems to have the desired effect, and soon your " +
                    this.cockDescript(n3) +
                    " is throbbing in need as is bathes in the mousey's saliva."
            );
        // [add this at the end of any tentacle multicock text]
        if (n1 >= 0) {
            this.outx(
                "\n\nYou pound Vapula and Jojo harder than ever, riding the butt-fuck wave and creating delightful disruptions in the whole train as you fill both sluts with your junk over and over again.  You keep pumping, the tightness of either hole threatening to send you over the edge at every thrust."
            );
            // [if Jojo has tentacle dicks]
            if (this.jojoScene.tentacleJojo())
                this.outx(
                    "  You enjoy this absolutely crazy display of corrupted debauchery: you, getting dick and giving dick to the same creature as well as indirectly and directly violating multiple holes with your junk.  An endless circle of loop-fuck feeding itself through lust and dicklesh.  How weird the three of you would appear to an external observer, locked as you are in this train of penetrating dicks!  None of you can moan to express the sheer bliss you're all feeling, as your mouths are filled with dick; you can't slow down, as both your sluts are taken in an insane frenzy, always willing to fill more cock in some hole.  All you can do is pump faster and faster until the final release."
                );
        }
        this.outx(
            "\n\nYou wish this blissful state of mind and pleasure would last forever, and you're sure both your butt-fuck partners are feeling the same way; sadly, your stamina has a limit, and theirs does too.  You feel your spooge flowing all through your genitals, ready to be unloaded.  With a silent groan, you give Jojo one last pound before utterly blasting him with spunk.  You paint his anal walls white"
        );
        // [if second multicock]
        if (n1 >= 0) this.outx(", as well as Vapula's love-tunnel");
        if (n2 >= 0) this.outx(" and throat, ");
        if (n3 >= 0) this.outx("and Jojo's too");
        this.outx(
            ".  You feel that Jojo's release is coming too.  With a powerful thrust, he squirts his own mouse semen down Vapula's waiting ass"
        );
        // [if tentacle Jojo]
        if (this.jojoScene.tentacleJojo())
            this.outx("; his tentacles absolutely drench your every hole with greenish mousey-cum");
        this.outx(
            ".  Vapula's own orgasm also starts kicking in, the feeling of hot cum flooding her interior being too much for her horny body to bear."
        );
        this.outx(
            "\n\nYou all spend a few minutes in utter ecstasy, thinking of nothing but the steady flow of sexual juices flowing in and out of various bodies.  You all focus on two things: giving everything you've got and keeping everything you're receiving.  Jojo, the nexus of this network of cum-flows, thrashes savagely as his genitals throb with need and his ass spasms reflexively; the poor thing is clearly getting unbearable pleasure and can't control his own movements anymore.  Your own orgasm brings you to a new level of ecstasy as your " +
                this.cockDescript(x) +
                " keeps pulsating and releasing torrents of baby-batter.  At last, when the cum-flow finally ebbs, you rest on Jojo's back for a while, cock buried deep in his ass.  He does the same to Vapula, but you're too exhausted to care.  Besides, the naughty little pet deserved a reward.  You all fall over, sloshing in a newly-formed puddle of thick sexual fluids, and rest for a while.  As you're about to fall asleep you whisper in Jojo's ear, \"<i>Good job slut...</i>\"  Your last vision is the mouse's head nodding in contentment."
        );
        this.outx(
            "\n\nWhen you wake up, Jojo is gone, and Vapula is still snoring deep in the cum puddle, her body entirely coated with dried semen.  You cock-slap the purple succubus to wake her and tell her she might as well clean your " +
                this.cockDescript(x) +
                " since the cowardly mouse left.  She nods weakly and her mouth opens, visibly waiting for your sloppy dick to fill her since she's too tired to sit up.  Sighing, you lower your junk into a proper sucking position; her tongue seems to be working on its own as it licks your meat clean of any dirty juice left.  You try to shove more dickflesh inside her throat but you can see she's too winded to perform any elaborate blowjob.  Shrugging in mild disappointment, you leave the purple slut as she carelessly wallows in the cum puddle; you head toward a stream to get cleaned up."
        );
        this.player.orgasm();
        this.dynStats("lib", -1, "sen", -2, "cor", 2);
        this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
        this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private vapulaAndIzmaThreeSome(): void {
        this.clearOutput();
        if (this.player.hasCock()) this.vapulaAndIzma(false);
        else this.vapulaAndIzma(true);
    }

    // Vapula/Izma threesome(F)
    private vapulaAndIzma(girls = true): void {
        this.clearOutput();
        let x: number = this.player.cockThatFits(100);
        if (x < 0) x = this.player.smallestCockIndex();
        if (!girls) {
            this.outx(
                "You call your beta tigershark, telling her you'll have some use for her body.  Izma eagerly approaches you, although she frowns a bit when she sees the towering succubus accompanying you.  \"<i>What can I do for my alp-... wait, what are you doing with her?</i>\"  Vapula only smirks at Izma's puzzled reaction."
            );
            this.outx(
                "\n\nYou gently explain that you intend to have some extra fun, that's why you brought this gorgeous creature to please you both.  Izma isn't really convinced, but still walks up to you, not willing to antagonize her alpha.  You tell to remove her cloth and turn around so you can have a clear view of her toned butt.  \"<i>What do you have in mind, " +
                    this.player.short +
                    '?</i>"\n\n"<i>Shhh... just do as I say.</i>"  With a discreet gesture, you order Vapula to get on her knees in front of Izma; she\'s going to feed from your tigershark this time.  With a conniving smile, Vapula obeys and before your shark lover can react, you\'re already grinding your ' +
                    this.cockDescript(x) +
                    " against her muscular butt-cheeks while the purple succubus grabs hold of her 15 inch long pecker.  You rub the tip of your " +
                    this.cockDescript(x) +
                    ' against her butt crack.  "<i>W-wait! What are you guys doing? Are you going to fuck my... I don\'t want to-</i>"'
            );
            this.outx(
                "\n\n\"<i>Relax, love.  I'm just going to rail your little pucker while my trained fucktoy will take care of your junk, so you'll be pleased from both sides.  Admit you are being turned on. Don't you like a good dicking?</i>\""
            );
            this.outx('\n\n"<i>I... just... I\'m not used to-</i>"');
            this.outx(
                "\n\n\"<i>Ha ha, as if you had any choice in the matter!  You're my beta, remember that.  Bend over, lift your tail and take it, I'm sure you'll love it as much as I will.</i>\""
            );
            this.outx(
                "\n\nIzma tries to struggle but she's no match to your superior strength; you forcibly seize her arms and incline her back, fully exposing her butt to you.  Her initial resolution fades quickly when Vapula takes a good portion of her beast-like prick in her mouth, sucking it with expert precision and fondling her balls with care.  Izma's cries of protestation quickly turn into moans: the poor tigershark can't possibly resist a succubus' blowjob.  Meanwhile, you keep groping the tigershark's butt, giving it rough slaps for good measure."
            );
            this.outx(
                "\n\n\"<i>If you knew how long I've been wanting to do this... Such a fine ass isn't to be neglected. So fit... so muscular... do you know how often you've teased me with it?  It's time to take the dick you're clearly begging to be filled with.</i>\""
            );
            this.outx(
                "\n\nYour taunts don't seem to affect Izma; if anything, they only turn her on all the more.  You tease Izma's butthole with your hands and " +
                    this.cockDescript(x) +
                    ", stretching her fuckpillows to make room for your incoming junk.  The poor tigershark doesn't even resist anymore, completely overwhelmed by your teasing ministrations and Vapula's dexterous fondling.  Her shark tail is wagging in apprehension and excitement; her loose pussy is now freely gushing juices and her tight asshole is occasionally leaking some lubricant.  She's finally getting ready!"
            );
            this.outx(
                "\n\nWith a roar of triumph, you grab her toned hips and force your " +
                    this.cockDescript(x) +
                    " inside her, tearing her asshole and stretching it further.  Izma screeches, obviously not used to anal violation.  Her shark tail twists and wriggles nervously above her ass, nearly hitting you.  With one hand, you immobilize her inconvenient appendage; with your free hand, you grasp again on her toned buttocks, gripping the hard muscles as your herm lover contracts them; her anal walls are squeezing your " +
                    this.cockDescript(x) +
                    " so tightly it actually hurts.  You tell Vapula to suck harder in order to relieve your tigershark's tension.  Your skilled succubus nods and starts clamping her pink lips around Izma's mammoth prick, effectively trapping it in an organic cock-ring.  At last you feel some of the intense pressure on your " +
                    this.cockDescript(x) +
                    " being released, allowing you to pull out and slam back, almost bruising your groin as it mashes against her hard butt-muscles.  This time her ass completely gives in to your ferocious dick-assault.  You pull back and stuff her again, increasing the pace of your repeated thrusts as the both of you gain confidence.  Soon you're butt-fucking her senseless, devastating her rectal entrance with your towering rod."
            );
            this.outx(
                "\n\nNeedless to say, Izma's mind is being torn in pleasure; the sweet blowjob she's receiving from your voracious succubus contrasts with your rough anal ploughing and brings her the weirdest mix of sensation. She growls and moans, her hands grasping Vapula's head as its bobs up and down the length of her long prick.  Her pussy is dripping drop after drop of fem-juice.  You notice her asshole is getting wetter and wetter as you keep penetrating it; could it be that your tigershark lover is a buttslut in denial?  Excited at the idea of turning the prude tigershark into an eager anal beta, you intensify the pace of your butt-fucking, determined to bring her to ecstasy by the sole power of your " +
                    this.cockDescript(x) +
                    ". You want her to cum from her butt being devastated, certainly not from a petty blowjob, even from a succubus.  Vapula rapidly takes note of your sudden change of rhythm; she grins wickedly and starts taking Izma's whole dickflesh into her mouth, effortlessly deepthroating her.  Izma, being utterly crushed between her two lovers, squirms and thrashes savagely; it won't be long before she cums from your combined throat- and butt-fucking."
            );
            this.outx(
                "\n\nAs you give your tigershark lover another raging thrust, her groin hits Vapula's face, and the monstrously thick rod bumps against the back of her throat, making her cough unintentionally.  With a triumphal cry, you seize Izma's breasts, kneading them harshly as you pinch her nipples, caring little about her comfort in your fiery passion.  The extra stimulation is enough to make the tigershark cum, and her gaping pussy releases torrents of fem-spunk, soaking the floor with her juices.  Her orgasm is sending shivers all across her body and the way her body is trembling in your arms is enough to send you over the edge: you release a milky flood in her anus, packing her interior with seed; the contact of your goo being shot across her colon triggers her masculine orgasm, and she lets out a torrent of her own spunk into the succubus' waiting stomach, unloading her load into your purple slut as you unload yours into her.  The flow of fluids flowing in and out of her body makes her thrill in ecstasy until your " +
                    this.cockDescript(x) +
                    " stops vibrating, running out of spooge to shoot. Vapula keeps gluttonously sucking her subsistence out of Izma's traitorously long cock, squeezing her balls in order to extract as much semen as she can."
            );
            this.outx(
                "\n\nNodding in approval, you pull out your own " +
                    this.cockDescript(x) +
                    " out of your tigershark's ass and tell Vapula to keep going.  With your rod still in hand, you walk around Vapula and grab hold of her plush, jiggly ass; without warning, you plunge your still-dripping rod into her tight entrance.  Unsurprisingly, the anal penetration is much easier with the purple succubus.  She jolts a bit but this doesn't reduce the intensity of her ministrations in the least; her tainted saliva appears to have an aphrodisiac effect on Izma's cock, never letting her go completely soft.  You pump your " +
                    this.cockDescript(x) +
                    " in and out of Vapula's plump rump while she still sucks off your tigershark lover, letting her balls fill back up with cum.  The three of you go at it for what seems like hours, Vapula wobbling back and forth between your hard butt-fuck and Izma's dick.  Her asshole is somehow as tight as Izma's, but so wonderfully hot!  The sudden change of temperature is making you shiver in pleasure.  You keep pounding away, not really caring about a slutty creature used to butt-dickings."
            );
            this.outx(
                "\n\nYou stare at Izma, the two of you keeping eye contact as you both penetrate your fucktoy from both ends.  Then, at last, you wink at Izma as you both cum a second time, releasing simultaneously streams of spunk in the succubus' horny body.  She happily devours all you've got, her lips and anal-lips contracting mercilessly in order to milk both cocks fresh baby-batter.  You cum and cum, your " +
                    this.cockDescript(x) +
                    " and Izma's pulsating in rhythm as they paint the succubus' inner depths white.  You then pull out of her ass and walk toward Izma.  The poor tigershark is completely drained from the double-blowjob, and staggers her way toward the stream to get hydrated, pulling back her dick with a loud POP as it escapes from Vapula's needy lips.  The succubus looks disappointed to see her new sperm feeder running away, but you remind her your own " +
                    this.cockDescript(x) +
                    " still needs to be cleaned. With a happy sigh, she works on your junk for a while, tingling you in the most pleasant way as her tongue runs across your dickflesh and slurps all the remaining goo. When you're as empty as she's full, you both rest side to side, recovering from the intense fuck."
            );
        }
        // Vapula/Izma threesome (as female)
        else {
            this.outx(
                "You call your beta tigershark, telling her you'll have some use for her body.  Izma eagerly approaches you as you slip into your strap-on, only starting to frown when she sees the towering succubus accompanying you.  \"<i>What can I do for my alp-... wait, what are you doing with her?</i>\"  Vapula only smirks at Izma's puzzled reaction."
            );
            this.outx(
                "\n\nYou gently explain that you intend to have some extra fun, and you've brought this gorgeous creature to please you both.  Izma isn't really convinced, but still walks up to you, not willing to antagonize her alpha. You tell to remove her cloth and turn around so you can have a clear view of her toned butt.  \"<i>What do you have in mind, " +
                    this.player.short +
                    '?</i>"\n\n"<i>Shhh... just do as I say.</i>"  With a discreet gesture, you order Vapula to get on her knees in front of Izma; she\'s going to feed from your tigershark this time.  With a conniving smile, Vapula obeys and before your shark lover can react, you\'re already grinding your obscene dildo against her muscular butt-cheeks while the purple succubus grabs hold of her 15 inch long pecker.  You rub the tip of your strap-on against her butt crack, sighing as the movement sends pleasurable vibrations down into your end.'
            );
            this.outx(
                '\n\n"<i>B-but wait! What are you guys doing? Are you going to fuck my... I don\'t want to-</i>"'
            );
            this.outx(
                "\n\n\"<i>Relax, love.  I'm just going to rail your little pucker while my trained fucktoy will take care of your junk, so you'll be pleased from both sides.  Why don't you admit you are being turned on?  Don't you like the idea of your alpha giving you a good dicking?</i>\""
            );
            this.outx('\n\n"<i>I... just... I\'m not used to-</i>"');
            this.outx(
                "\n\n\"<i>Ha ha, as if you have any choice in the matter!  You're my beta, remember that.  Bend over, lift your tail and take it, I'm sure you'll love it as much as I will.</i>\""
            );
            this.outx(
                "\n\nIzma tries to struggle but you forcibly seize her arms and incline her back, fully exposing her butt to you.  Her initial resolution fades quickly when Vapula takes a good portion of her beast-like prick in her mouth, sucking it with expert precision and fondling her balls with care.  Izma's cries of protestation quickly turn into moans: the poor tigershark can't possibly resist a succubus' blowjob.  Meanwhile, you keep groping the tigershark's butt, giving it rough slaps for good measure."
            );
            this.outx(
                '\n\n"<i>So fit... so muscular... </i>" you sigh.  "<i>Do you know how often you\'ve teased me with it? Perhaps you thought you could get away with it.  Perhaps you thought your alpha would only ever want your cock, that she\'d never be able to dish out what you can.  Well guess what, beta- the dick\'s on the other shoe now!</i>"'
            );
            this.outx(
                "\n\nYour taunts don't seem to affect Izma; if anything, they only turn her on all the more.  You tease Izma's butthole with your hands and dildo, stretching her fuckpillows to make room for your incoming junk.  The poor tigershark doesn't even resist anymore, completely overwhelmed by your teasing ministrations and Vapula's dexterous fondling.  Her shark tail is wagging in apprehension and excitement; her loose pussy is now freely gushing juices and her tight asshole is occasionally leaking some lubricant.  She's finally getting ready!"
            );
            this.outx(
                "\n\nWith a roar of triumph, you grab her toned hips and force your artificial length inside her, widening her asshole and stretching it further.  Izma screeches, obviously not used to anal violation.  Her shark tail twists and wriggles nervously above her ass, nearly hitting you.  With one hand, you immobilize her inconvenient appendage; with your free hand, you grasp again on her toned buttocks, gripping the hard muscles as your herm lover contracts them; her anal walls are squeezing the dildo so tightly you can't even move it.  You tell Vapula to suck harder in order to relieve your tigershark's tension."
            );
            this.outx(
                "\n\nYour skilled succubus nods and starts clamping her pink lips around Izma's mammoth prick, effectively trapping it in an organic cock-ring.  At last you feel some of the intense pressure on your strap-on being released, allowing you to pull out and slam back, almost bruising your groin as it mashes against her hard butt-muscles. This time her ass completely gives in to your ferocious dick-assault.  You pull back and stuff her again, increasing the pace of your repeated thrusts as the both of you gain confidence.  You pant and bead sweat from the intense fuck, each outward pull sucking the malleable pink end of your strap-on further into your " +
                    this.vaginaDescript(0) +
                    "."
            );
            this.outx(
                "\n\nNeedless to say, Izma's mind is being torn in pleasure; the sweet blowjob she's receiving from your voracious succubus contrasts with your rough anal ploughing and brings her the weirdest mix of sensation.  She growls and moans, her hands grasping Vapula's head as it bobs up and down the length of her long prick.  Her pussy is dripping drops after drops of fem-juice.  You notice her asshole is getting wetter and wetter as you keep penetrating it; could it be that your tigershark lover is a buttslut in denial?  Excited at the idea of turning the prude tigershark into an eager anal beta, you intensify the pace of your butt-fucking, determined to bring her to ecstasy by the sole power of your artificial dick."
            );
            this.outx(
                "\n\nYou want her to cum from her butt being devastated, certainly not from a petty blowjob, even from a succubus.  Vapula rapidly takes note of your sudden change of rhythm; she grins wickedly and starts taking Izma's whole dickflesh into her mouth, effortlessly deepthroating her.  Izma, being utterly crushed between her two lovers, starts to squirm and thrash savagely; it won't be long before she cums from your combined throat and butt-fucking.  As you give your tigershark lover another deep thrust, her groin hits Vapula's face, and the monstrously thick rod bumps against the back of the succubus's throat, making her cough unintentionally.  With a triumphal cry, you seize Izma's breasts, kneading them harshly as you pinch her nipples, caring little about her comfort in your fiery passion."
            );
            this.outx(
                "\n\nThe extra stimulation is enough to make the tigershark cum, and her gaping pussy releases torrents of fem-spunk, soaking the floor with her juices.  The sound of spattering fluid and her wail are enough to push you to your own peak; you grunt and groan as contraction after contraction slams into you as you deliriously continue to fuck the tiger-girl's ass, fucking yourself as you do.  Your orgasm triggers the purple end of the dildo: demonic semen floods Izma's anus, packing her interior with seed.  The contact of your goo being shot across her colon triggers her masculine orgasm, and she lets out a torrent of her own spunk into the succubus' waiting stomach, unloading her load into your purple slut as you unload yours into her.  The flow of fluids flowing in and out of her body makes her thrill in orgasm until your dildo stops vibrating, running out of spooge to shoot.  Vapula keeps gluttonously sucking her subsistence out of Izma's traitorously long cock, squeezing her balls in order to extract as much semen as she can."
            );
            this.outx(
                "\n\nNodding in approval, you pull the dildo out of your tigershark's ass with a wet pop and tell Vapula to keep going.  With your rod still in hand, you walk around Vapula and grab hold of her plush, jiggly ass and without warning stuff your still-dripping strap-on in her ass; unsurprisingly, the anal penetration is much easier with the purple succubus.  She jolts a bit but this doesn't reduce the intensity of her ministrations in the least; her tainted saliva appears to have an aphrodisiac effect on Izma's cock, never letting her get completely soft.  You pump your dildo in and out of Vapula's plump rump, enjoying the pink end stroking your dripping " +
                    this.vaginaDescript(0) +
                    " while she still sucks off your tigershark lover, letting her balls fill back up with cum."
            );
            this.outx(
                "\n\nThe three of you go at it for what seems like hours, Vapula wobbling back and forth between your hard butt-fuck and Izma's dick.  Heat seems to radiate off the succubus, which is unsurprising; the taste of semen and your rough dildo-ing have pushed the sexual creature deep into rut.  You pound away with abandon at her, not really caring about a slut used to butt- dickings.  You stare at Izma, the two of you keeping eye contact as you both penetrate your fucktoy from both ends.  Then, at last, you wink at Izma as you both cum a second time, releasing simultaneously streams of spunk in Vapula's burning body."
            );
            this.outx(
                "\n\nShe happily devours all you've got, her lips and nether-lips contracting mercilessly in order to milk both cocks for fresh baby-batter.  The sight of the shameless cumbucket getting what she wants pushes you to a new height and you orgasm and orgasm, your end of the strap-on vibrating furiously in your streaming depths as the other end and Izma pulsate in rhythm and paint the succubus' inner depths white.  You then pull out of her ass and walk toward Izma. The poor tigershark is completely drained from the double-blowjob, and staggers her way toward the stream to get hydrated, pulling back her dick with a loud POP as it escapes from Vapula's needy lips.  The succubus looks disappointed to see her new sperm feeder running away, but you remind her you still need to be cleaned.  With a happy sigh, she works on your " +
                    this.vaginaDescript(0) +
                    " for a while, tingling you in the most pleasant way as her tongue runs slowly across your drooling sex and slurps up all the girl slime she can possibly tease out of you.  When you're as dry as she is full, you both rest side to side, recovering from the intense fuck."
            );
        }
        this.player.orgasm();
        this.dynStats("sen", -2, "cor", 2);
        this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
        this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Feed (as female)
    private chixFeedVapulaBlehblehIVantToZuckYourSpooo(): void {
        this.clearOutput();
        this.outx(
            "You produce the demonic dildo and hold it by the hilt of its giant purple end, wagging it lazily by your side with a playful grin.  Vapula knows what that means; she is on her knees in an instant, staring at you with wolfish anticipation."
        );
        // Feed/Tease
        let tease;
        if (this.flags[kFLAGS.VAPULA_HAREM_FUCK] == 0) tease = this.teaseVapula;
        this.simpleChoices(
            "Feed",
            this.chicksFeedVapula,
            "Tease",
            tease,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }

    // Tease
    private teaseVapula(): void {
        this.clearOutput();
        // Requires: Vapula not fucking harem
        if (
            this.flags[kFLAGS.VAPULA_HAREM_FUCK] == 0 &&
            this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] == 0
        ) {
            this.outx(
                "You decide you aren't going to give her what she wants so easily . You're also genuinely curious about how badly she needs cum, and how far you can push her.  You don't say anything as you slowly buckle the strap-on, sighing as you slip the small, pink end into your " +
                    this.vaginaDescript(0) +
                    ".  You make Vapula wait as you close your eyes and make the dildo pulse inside you, slowly filling you up and then withdrawing, letting it push up against your " +
                    this.clitDescript() +
                    "."
            );
            this.outx(
                "\n\nYou open your eyes to find Vapula is biting her lip fretfully from watching you, a small pool of liquid arousal collecting beneath her.  You smile lazily as you stand over her and brush the purple end against her face; the way this makes the end wedged inside of you push to and fro against your sensitive walls makes you coo.  Vapula follows the bulbous tip like a cat and a string; as it brushes against her mouth she tries to wrap her lips around it, but you tut mockingly and pull it out of reach. With an evidently huge force of will the succubus makes herself be still again, and you resume stroking her face with your artificial cock."
            );
            this.outx('\n\n"<i>How badly do you want this, slut?</i>" you ask.');
            this.outx('\n\n"<i>Very badly, mistress.</i>" she replies.');
            this.outx('\n\n"<i>Perhaps you could describe it to me.</i>"');
            this.outx(
                '\n\n"<i>Like... like being thirsty, hungry and horny at the same time.  But mostly horny. It- it makes me salivate.</i>"  She swallows as if to prove this point.  You smirk and continue to gently rub the cock against her face, gently pleasuring yourself as you do.'
            );
            this.outx('\n\n"<i>How interesting. Do all succubae get like this?</i>"');
            this.outx(
                '\n\n"<i>Please give me my fix, mistress, then we\'ll discuss this all you want,</i>" grits Vapula through pointed teeth.  "<i>I\'m fucking dying here!</i>"  Your face falls mockingly, and you slowly step backwards.'
            );
            this.outx(
                "\n\n\"<i>Ohh.  Now you've said a rude word to your mistress.  I guess you don't want it so badly after all.</i>\"  Vapula watches the cock recede with almost comical despair."
            );
            this.outx("\n\n\"<i>Wait, no...  I didn't mean it!  Please don't...</i>\"");
            this.outx(
                "\n\n\"<i>You'll talk about it tomorrow, my hungry little cumslut.  If you're good.</i>\" You turn and stride away, laughing as you slowly unbuckle the strap-on.  The expression on Vapula's face as you leave is going to keep you very warm tonight."
            );
            this.dynStats("lus", 10 + this.player.sens / 10);
            this.flags[kFLAGS.VAPULA_TEASE_COUNT]++;
        }
        // Second Tease
        // Requires: Vapula not fucking harem, teased the day before
        else if (
            this.flags[kFLAGS.VAPULA_HAREM_FUCK] == 0 &&
            this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] == 1
        ) {
            this.outx(
                "You smile as once again Vapula gets into position on her knees, and you buckle on the strap-on and stand over her.  This time you make the pink end grow long, closing your eyes as it inches up your tunnel, before slowly thrusting your " +
                    this.hipDescript() +
                    " backwards and forwards in front of your succubus, letting it shrink and grow so it climbs up and down your wet walls."
            );
            this.outx(
                "\n\nBreathing heavily, you open your eyes to find Vapula is struggling to stop herself from openly drooling, her eyes shooting from you back to the tip of the purple dildo in front of her as she licks her lips and swallows continuously."
            );
            this.outx('\n\n"<i>You must be very hungry by now, slut,</i>" you tease.');
            this.outx(
                '\n\n"<i>You have no idea,</i>" she replies wetly. Once again you begin to rub the dildo across her beautiful face.'
            );
            this.outx(
                '\n\n"<i>It must be hard knowing that no matter how good you are at milking dick, it has no effect upon whether the person who owns you will give you cum.  And that you gave me this power over you.  How does that feel?</i>"'
            );
            this.outx(
                '\n\n"<i>It has given me a valuable insight into cruelty, certainly,</i>" Vapula growls.  She is having trouble concentrating, her lips instinctively reaching for your dildo\'s crown.  "<i>It amazes me you still have a soul.</i>"'
            );
            this.outx(
                '\n\n"<i>That\'s not a very nice thing to say,</i>" you purr, stopping your ministrations for a moment and pulling away slightly.  A look of anguish appears on Vapula\'s face.  "<i>What would you do for me now, just to get your fix?</i>"'
            );
            // [Hooves:
            if (this.player.lowerBody == LOWER_BODY_TYPE_HOOFED || this.player.isTaur())
                this.outx(
                    '"<i>I would worship your feet, mistress.  I would clean your hooves with my tongue to a shine, tease out every scrap of dirt from every crevice.  And I would thank you for the privilege.</i>"'
                );
            // [Naga:
            else if (this.player.isNaga())
                this.outx(
                    '\n\n"<i>I would worship your scales, mistress.  I would buff every single one with my tongue so it shone, lick every inch of your tail, deep throat you all the way down into my belly.  And I would thank you for the privilege.</i>"'
                );
            // [Drider:
            else if (this.player.isDrider())
                this.outx(
                    '\n\n"<i>I would be your egg dump, mistress.  I would take your dripping ovipositor in every hole, my cunt, my ass, my mouth, then clean it with my tongue afterwards.  I would find and feed you ovi-potions just so you could keep me stuffed with your essence constantly.  And I would thank you for the privilege.</i>"'
                );
            // [Goo:
            else if (this.player.isGoo())
                this.outx(
                    '\n\n"<i>I would let you engulf me, mistress.  I would let you push yourself into my every hole and crevice, drown me in your essence, fuck me so completely I wouldn\'t know where I started and you began.  And I would thank you for the privilege.</i>"'
                );
            else if (
                this.player.lowerBody == LOWER_BODY_TYPE_DOG ||
                this.player.lowerBody == LOWER_BODY_TYPE_CAT ||
                this.player.lowerBody == LOWER_BODY_TYPE_LIZARD ||
                this.player.lowerBody == LOWER_BODY_TYPE_KANGAROO ||
                this.player.lowerBody == LOWER_BODY_TYPE_FOX
            )
                this.outx(
                    '\n\n"<i>I would worship your feet, mistress.  I would lick every inch of your claws, massage your soft undersides with my tongue.  I would pare all of your claws to needle sharpness and then let you test them on my backside.  And I would thank you for the privilege.</i>"'
                );
            // [Insect:
            else if (
                this.player.lowerBody == LOWER_BODY_TYPE_BEE ||
                this.player.lowerBody == LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS
            )
                this.outx(
                    '\n\n"<i>I would worship your feet, mistress.  I would lick every inch of your boots, clean your soles with my tongue.  I wouldn\'t stop until they shone. And I would thank you for the privilege.</i>"'
                );
            // [Human/demonic feet:
            else
                this.outx(
                    '\n\n"<i>I would worship your feet, mistress.  I would lick every inch of them, clean your soles with my tongue, between your toes, lavish each of your pinkies with attention as if they were ten cocks belonging to you.  And I would thank you for the privilege.</i>"'
                );

            this.outx(
                "\n\nShe speaks feverishly, without stopping for a moment's thought.  You laugh at her earnestness."
            );

            this.outx(
                "\n\n\"<i>You've got such a fertile imagination on you when you're hungry, slut.  Makes me wonder what else you could come up with if I left you a little while longer.</i>\"  You pause as you run your fingers through her hair, before once again bucking your hips towards her face, the tip of the purple dildo inches away from her face.  You lavishly lengthen your dildo, packing your tunnel and working it back and forth as the thought of what you're doing to Vapula and her colourful words fizzle in your mind.  You open your mouth, arch your back and then exhale with deep satisfaction as you reach a small but perfectly formed high, your " +
                    this.vaginaDescript(0) +
                    " dribbling juices around your harness.  You smile down sweetly at Vapula, who doesn't look like she's blinked in a while, and slowly step away, leading the dildo away from her bit by bit."
            );
            this.outx("\n\n\"<i>I guess we'll find out, won't we? Same time tomorrow.</i>\"");
            this.outx(
                "\n\nYou turn and walking away, your mouth curling into a wicked grin as a despairing wail reaches you from behind..."
            );
            this.flags[kFLAGS.VAPULA_TEASE_COUNT]++;
        }
        // Third Tease
        else {
            // Requires: Vapula not fucking harem, teased two days in a row
            this.outx(
                "Once again you buckle up, sighing with pleasure as you sink the pink dildo into your moist hole, and once again you wait until Vapula gets onto her knees before you.  She looks at you silently and sullenly as you droop the monstrous purple end over her face."
            );
            this.outx(
                '\n\n"<i>How are we feeling today then, slut?</i>"  By way of answer, Vapula simply opens her mouth.  A small waterfall of drool cascades out of her mouth, quickly forming an impressive pool of the stuff in front of her.  She closes it again, still oozing saliva, and waits, staring upwards at you hollowly.  You giggle, amazed and perversely proud of how far you\'ve managed to push your succubus slave.'
            );
            this.outx(
                '\n\n"<i>Cute. But where are your manners, slut?  I think maybe you need to clean up after yourself before we can talk about giving you a meal.  I think maybe-</i>"  Vapula surges forwards, faster than you would have given her credit for, latching onto the dildo before you can pull it away from her.  She pushes into it, growling with ferocious need, so hard you lose your balance and fall onto your back.  Immediately the succubus is on you, your artificial cock swiftly disappearing between her purple lips.'
            );
            this.outx(
                "\n\nSwallowing it up to the hilt she begins to work it savagely, slurping and grunting obscenely.  Before you can properly react, she catches the base of the dildo with her teeth and pushes it into you as hard as you can.  You gasp as the pink end responds, growing by several inches and sliding further into your moist cunt. In and out Vapula drags the dildo, slapping it into your groin as she fucks you whilst blowing the purple end for all she is worth, her overflowing saliva spattering upon your thighs.  For a moment you think about getting up, asserting your authority and making her stop... but then the warm length wedged in your depths makes you arch your back with pleasure as Vapula shakes the cock in her mouth around like a bear with a salmon, making your end twist and spasm delightfully."
            );
            this.outx(
                "\n\nDeciding it is worth taking advantage of the insane hunger you've managed to stoke in your bitch, "
            );
            // Naga:
            if (this.player.isNaga())
                this.outx(
                    "you slide your tail under and over her trunk, wrapping your coils around her and drawing her face into your stuffed crotch."
                );
            // Other:
            else if (this.player.isTaur() || this.player.isGoo() || this.player.isDrider())
                this.outx(
                    "you sit the monstrous half of your body down comfortably and draw her face into your stuffed cotch."
                );
            else
                this.outx(
                    "you open your [legs] and wrap them around her head, drawing her face into your stuffed crotch."
                );

            this.outx(
                "\n\nShe works on it for what seems like hours.  You look down at your slut; she keeps staring at you with avid yet playful eyes, never breaking eye contact as she relentlessly throatfucks herself; you feel her lips curve a little as the shape of a ravenous smile appears on her face, and her eyes are glittering with an insatiable need.  The naughty bitch!  She knows she's going to get what she wants, whether you like it or not.  You wish you were able to control yourself, but through the sheer force of her obscene hunger the succubus is somehow able to control your end of the strap-on, making the dildo shrink, pulsate and push into your " +
                    this.vaginaDescript(0) +
                    " involuntary, which soon has you panting, groaning, and thrusting back into her to sate your own growing need."
            );
            this.outx(
                "\n\nYour stamina is rapidly overwhelmed and you decide to reward her effort; you savagely press Vapula's head against your groin, burying all eight inches of your false cock into her waiting throat; in symphony the two of you will your throbbing dildo to expand to pack you mercilessly tight, making you cum brutally.  Your " +
                    this.clitDescript() +
                    " pulses as your vagina contracts ecstatically around the bulging sex toy; vaguely you feel release at the other end, and you hear Vapula loudly and shamelessly enjoy what the dildo pumps out.  You abandon yourself to the climax and keep thrusting your " +
                    this.hipDescript() +
                    " into her face, girlcum spurting around your harness."
            );
            this.outx(
                "\n\nAfter a long haze of mindless bliss, you feel long fingers undoing the strap-on and lifting it away, before curling around your thighs.  You peacefully look down to find Vapula bending into your crotch, her warm, slimy tongue touching your belly. She looks about six months pregnant with the amount of spooge she has managed to milk from the dildo, but she is still intent upon licking you clean.  You sigh and let her, her tongue expertly gliding across your skin and exploring every corner and fold of your dripping sex; she smacks her lips and happily hums as she goes about it, evidently enjoying you like a dessert to the fine main course she just received.  Eventually she finishes her mutually pleasurable task, and the two of you slowly get to your feet.  You want to be angry with her but you are too satiated to properly feel it; you can see in her smiling eyes that she knows it."
            );
            this.outx(
                '\n\n"<i>You\'re a bad, filthy little cumslut,</i>" you say, as sternly as you can.'
            );
            this.outx(
                '\n\n"<i>That\'s what you train me to be, mistress,</i>" she murmurs.  You send her on her way to digest her lavish meal with a slap on the ass.'
            );
            this.player.orgasm();
            this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
            this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
        }
        this.dynStats("cor", 1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Feed (as female)
    private chicksFeedVapula(): void {
        this.clearOutput();
        // [Teased once or twice:
        if (this.flags[kFLAGS.VAPULA_TEASE_COUNT] > 1) {
            this.outx(
                "You push the pink end of the dildo into you with a sigh, then strap yourself into the harness so that the monstrous purple end bobs out in front of you.  You stand over a tense Vapula and tease her with it first, lightly brushing her face with the tip for a while.  She swallows thickly and licks her lips as you caress her with your cum fountain, but makes no movements towards it.  Eventually you giggle at her furious concentration and tell her you're going to reward her for being such a good slut, before pushing the end against her lips.  A flood of ecstatic thank-you-mistresses are swiftly muffled out as the dildo disappears into her mouth."
            );
        } else {
            this.outx(
                "You tell Vapula you're going to reward her for being such a good slut; pushing the pink end of the dildo into you with a sigh, you strap yourself into the harness so that the monstrous purple end bobs out in front of you.  You giggle as Vapula grabs hold of it and proceeds to lick it, coating the entirety of your artificial junk with her warm, sweet saliva."
            );
        }
        this.outx(
            "\n\nShe voraciously slurps the end and smiles up at you, making you laugh even harder.  This bizarre ritual is giving you a good insight into why guys like blowjobs so much; although you can't feel what your succubus slut is doing, it certainly feels very good to see her on her knees like this in front of you, slurping away at you with such evident enjoyment.  Hell, the fact you can't feel it almost makes it better; you could stand here and make her debase herself like this all day if you wanted to."
        );
        this.outx(
            "\n\nVapula evidently has other ideas, however. Her smooth fingers trail across your " +
                this.buttDescript() +
                ", clasping you for a time as you run your fingers through her long hair, before inching inwards, sinking one and then two fingers into your " +
                this.assholeDescript() +
                ".  You close your eyes and flex your mind, making your end of the dildo twitch and then pulse, making it grow and then ebb, grow and then ebb, slowly working your tunnel until it feels wide and soaked with arousal.  Still looking cheekily upwards, Vapula crooks her fingers inwards, stroking at your dildo through your walls.  With a groan of impatience, you grab her head and drive the whole of the purple dildo into her mouth, stuffing her full of the warm, artificial dick.  She nearly chokes at first but her old reflexes acquired from a whole life devoted to lewdness and licentiousness start kicking in; Vapula gluttonously deepthroats it, softly moaning as she fingers herself with one hand and finger fucks your ass with the other.  She sucks like a whore, her lips and throat squeezing the dildo expertly, apparently oblivious to the fact it can't feel her."
        );
        this.outx(
            "\n\nYou shake your head in wonder at your succubus slave; she really is just hungry for dick.  You decide to give her what she evidently needs. You take hold of her hair and piston into her, driving down her tight throat and then back out again, using the outward pull to thrust your end further into yourself, sending rivulets of girlcum down your thighs."
        );
        this.outx(
            "\n\nShe works on it for what seems like hours.  You look down at your slut; she keeps staring at you with avid yet playful eyes, never breaking eye contact as she relentlessly throatfucks herself; you feel her lips curve a little as the shape of a ravenous smile appears on her face, and her eyes are glittering with an insatiable need.  The sight is enough to increase your own arousal, and you begin to move your dildo around more freely, sawing into her face as you push it backwards, forwards, grow it, shrink it, and then eventually just make it vibrate with violent force.  Your stamina is rapidly overwhelmed and you decide to reward her effort; you savagely press Vapula's head against your groin, burying all eight inches of your false cock into her waiting throat; deliriously you will your throbbing dildo to expand to pack you mercilessly tight, finally pushing you over the edge.  Your " +
                this.clitDescript() +
                " throbs as your vagina spasms ecstatically around the bulging sex toy; vaguely you feel release at the other end, and you hear Vapula loudly and shamelessly enjoy what the dildo pumps out.  You abandon yourself to the climax and keep thrusting your " +
                this.hipDescript() +
                " into her face, girlcum spurting around your harness."
        );
        this.outx(
            "\n\nAfter a long haze of mindless bliss, you feel long fingers undoing the strap-on and lifting it away, before curling around your thighs.  You peacefully look down to find Vapula bending into your crotch, her warm, slimy tongue touching your belly.  She looks about six months pregnant with the amount of spooge she has managed to milk from the dildo, but she is still intent upon licking you clean.  You sigh and let her, her tongue expertly gliding across your skin and exploring every corner of your dripping sex; she smacks her lips and happily hums as she goes about it, evidently enjoying you like a dessert to the fine main course she just received.  Eventually she finishes her mutually pleasurable task, and the two of you slowly get to your feet. Without a word you send her on her way to digest her lavish meal with a slap on the ass."
        );
        this.doNext(this.camp.returnToCampUseOneHour);
        this.player.orgasm();
        this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
        this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
    }

    // Forcefeed
    public vapulaForceFeeds(): void {
        if (
            this.player.hasVagina() &&
            this.player.hasKeyItem("Demonic Strap-On") >= 0 &&
            !this.player.hasCock()
        ) {
            this.outx(
                "\n<b>In the night...</b>\nArousal blooms in your dreams, and you are relentlessly pushed into increasingly juicier and filthier fantasies; feeling hopelessly wet, you half awaken and hazily slide a hand down towards your crotch, to try and find release and rest.  Your fingers touch leather and latex where your vagina should be; bewildered, you rise to see Vapula working around your crotch, tightening the final harnesses of your strap-on, locking you into the pink dildo throbbing in your " +
                    this.vaginaDescript(0) +
                    " whilst she licks hungrily at the tip of the opposite end.  You try to sit up but the ferocious succubus pins you down ruthlessly, her strength increased by her state of hunger.  She smirks at you wickedly and whispers, \"<i>So you don't want me to use any dick but the one I gave you, yet you won't feed me?  That's very bad of you, " +
                    this.player.short +
                    "... really, really bad...  Do you want to starve me?  Do you want me to beg you for cum?  You naughty slut, you better be ready because I'm going to get what is rightfully mine.  I'm HUNGRY!</i>\""
            );
            this.outx(
                "\n\nWith a wolfish groan she swallows the purple dildo up to the hilt and begins to work it savagely, slurping and grunting obscenely.  Before you can properly react, she catches the base of the dildo with her teeth and pushes it into you as hard as she can.  You gasp as the pink end reacts, growing by several inches and sliding further into your moist cunt.  In and out Vapula drags the dildo, slapping it into your groin as she fucks you whilst blowing the purple end for all she is worth, her saliva running down your thighs.  For a moment you think about getting up, asserting your authority and making her stop... but then the warm length wedged in your depths makes you coo with pleasure as Vapula shakes the cock in her mouth around like a bear with a salmon, making your end twist and spasm delightfully.  Deciding it is worth taking advantage of her insane hunger, "
            );
            // Naga:
            if (this.player.isNaga())
                this.outx(
                    "you slide your tail under and over her trunk, wrapping your coils around her and drawing her face into your stuffed crotch."
                );
            // Other:
            else if (this.player.isTaur() || this.player.isGoo() || this.player.isDrider())
                this.outx(
                    "you sit the monstrous half of your body down comfortably and draw her face into your stuffed cotch."
                );
            else
                this.outx(
                    "you open your [legs] and wrap them around her head, drawing her face into your stuffed crotch."
                );

            this.outx(
                "\n\nShe works on it for what seems like hours.  You look down at your slut; she keeps staring at you with avid yet playful eyes, never breaking eye contact as she relentlessly throatfucks herself; you feel her lips curve a little as the shape of a ravenous smile appears on her face, and her eyes are glittering with an insatiable need.  The naughty bitch! She knows she's going to get what she wants, whether you like it or not.  You wish you were able to control yourself, but through the sheer force of her obscene hunger the succubus is somehow able to control your end of the strap-on, making the dildo shrink, pulsate and push into your " +
                    this.vaginaDescript(0) +
                    " involuntary, which soon has you panting, groaning, and thrusting back into her to sate your own growing need."
            );
            this.outx(
                "\n\nYour stamina is rapidly overwhelmed and you decide to reward her effort; you savagely press Vapula's head against your groin, burying all eight inches of your false cock into her waiting throat; in symphony the two of you will your throbbing dildo to expand to pack you mercilessly tight, making you cum brutally.  Your " +
                    this.clitDescript() +
                    " pulses as your vagina contracts ecstatically around the bulging sex toy; vaguely you feel release at the other end, and you hear Vapula loudly and shamelessly enjoy what the dildo pumps out.  You abandon yourself to the climax and keep thrusting your " +
                    this.hipDescript() +
                    " into her face, girlcum spurting around your harness."
            );
            this.outx(
                "\n\nAfter a long haze of mindless bliss, you feel long fingers undoing the strap-on and lifting it away, before curling around your thighs.  You peacefully look down to find Vapula bending into your crotch, her warm, slimy tongue touching your belly.  She looks about six months pregnant with the amount of spooge she has managed to milk from the dildo, but she is still intent upon licking you clean.  You sigh and let her, her tongue expertly gliding across your skin and exploring every corner of your dripping sex; she smacks her lips and happily hums as she goes about it, evidently enjoying you like a dessert to the fine main course she just received.  Eventually she finishes her mutually pleasurable task, and the two of you slowly get to your feet. You want to be angry with her but you are too satiated to properly feel it; you can see in her smiling eyes that she knows it.  Without a word you send her on her way to digest her lavish meal with a slap on the ass, and return to your bed."
            );
            this.player.orgasm();
            this.dynStats("cor", 1);
            this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
            this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
            this.flags[kFLAGS.VAPULA_EARNED_A_SPANK] = 1;
        }
        // [if no fuck harem is on and PC hasn't fed/fucked Vapula for 5 days that scene will trigger at night]
        else if (this.player.hasCock()) {
            let x: number = this.player.cockThatFits(100);
            if (x < 0) x = this.player.smallestCockIndex();
            this.outx(
                "\n\nYou are suddenly awakened by a gentle tingle at the base of your crotch.  As you open your eyes, you slowly make out in the surrounding darkness a purple shape bobbing up and down leisurely.  You realize that Vapula has profited from your unconsciousness to take your genitals by force!  You try to sit up but the ferocious succubus pins you down ruthlessly, her strength increased by her state of hunger.  She releases your junk with a wet POP and starts licking her lips, slurping back any drop of pre-cum that might have escaped her voracious mouth.  She smirks at you wickedly and whispers, \"<i>So you don't want me to use any dick but yours, yet you won't feed me?  That's very bad of you, " +
                    this.player.short +
                    "... really, really bad... Do you want to starve me?  Do you want me to beg you for your cum?  You naughty stud, you better be ready because I'm going to get what is rightfully mine.  I'm HUNGRY!</i>\"  With a wolfish groan, she starts sucking you off again, still pinning you down with one hand while the other tickles your crotch."
            );
            this.outx(
                "\n\nShe works on it for what seems like hours. You look down at your slut; she keeps staring at you with avid yet playful eyes, never breaking eye contact as she relentlessly throatfucks herself; you feel her lips curve a little as the shape of a ravenous smile appears on her face, and her eyes are glittering with an insatiable need. The naughty bitch!  She knows she's going to get what she wants, whether you like it or not.  You wish you were able to control yourself, but the covetous succubus never lets go of your " +
                    this.cockDescript(x) +
                    ", clinging to it like an animal."
            );
            this.outx(
                "\n\nYour stamina is rapidly overwhelmed and you decide to reward her effort; you savagely press Vapula's head against your groin, effectively burying all of your " +
                    this.cockDescript(x) +
                    " in her waiting throat; her tongue keeps teasing your rod for a few seconds, and then you cum, brutally."
            );
            if (this.player.balls > 0) this.outx("  Your " + this.ballsDescriptLight() + " churn");
            else this.outx("  Your " + this.cockDescript(x) + " twitches");
            this.outx(" as you release a sticky spooge fountain in her stomach.");
            this.outx(
                "\n\nHer lips keep squeezing your junk in order to milk everything you've got, and in your shuddering orgasm you're too eager to comply.  With a surrendering sigh, you abandon yourself to your climax and keep cumming, squirting your baby-batter to the last drop as the succubus keeps gulping it.  Her eyes are closed in an expression of complete satisfaction; she enjoys her meal to its full extent, filling her belly with your spooge"
            );
            // [if cum production is massive]
            if (this.player.cumQ() >= 1500)
                this.outx(
                    " until she looks 6 months pregnant.  At last, the cum-flow spilling through your urethra starts to ebb and your " +
                        this.cockDescript(x) +
                        " stops throbbing; only then does she removes your junk from her mouth with a loud POP.  Your tool appears to be clean of any spooge: your cock-slut did a very good job.  Satisfied, you pat her head with your cock and let her digest her lavish meal."
                );
            this.player.orgasm();
            this.dynStats("cor", 1);
            this.flags[kFLAGS.VAPULA_DAYS_SINCE_FED] = 0;
            this.flags[kFLAGS.VAPULA_TEASE_COUNT] = 0;
            this.flags[kFLAGS.VAPULA_EARNED_A_SPANK] = 1;
        }
        this.doNext(this.playerMenu);
    }

    // Spank Vapula for misbehaving.
    // Requires Vapula force herself on you for food.
    // Requires dick or vapula dildo!
    // Requires bipedal-ness
    private spankVapulaLikeABoss(): void {
        this.clearOutput();
        this.outx(
            "Without any warning, you grab the lusty succubus by the wrists and pull her into you, easily manhandling her surprised form until she's bent over your [leg], vulnerable and squealing like the gutter-slut she is.  Her wings batter at your face and chest, but after a little wrangling, you pin them flat against her back.  The best she can manage now is a few weak twitches at her wing-tips.  Her large, well-formed breasts jiggle and shake as she struggles, but all the trembling purple mountains accomplish is bringing a ready flush to your " +
                this.player.skin()
        );
        if (this.player.hasCock()) this.outx(" and a healthy surge of blood to [eachCock]");
        else if (this.player.hasVagina()) this.outx(" and a teltale moistness to your nethers");
        this.outx(".");
        this.outx(
            '\n\n"<i>Be still, you whimpering, useless excuse for a demon!</i>" you command.  Unsurprisingly, she continues to struggle.'
        );
        this.outx(
            "\n\nVapula cries,  \"<i>Lemme go!  Can't we just go double team some people and forget about all this?</i>\"  Her violet eyes crane hopefully towards you, and she wears a winning smile across the smooth curves of her lips.  For a moment, you reconsider your plans, but then again, she earned this when she forced herself on you.  Upon seeing the resolve in your gaze, her struggles start anew, but you have her firm - she's not going anywhere."
        );
        this.outx(
            "\n\nOnce you have the rebellious succubus well in hand, you lift your right palm high in the air, upraised and ready to drop.  The moment seems to drag on for a while, and once your female slave is trembling with worry, you bring it down hard.  SMACK!  The hit rings out through your camp"
        );
        if (this.camp.companionsCount() > 2)
            this.outx(", drawing the eyes of your other companions.");
        else if (this.camp.companionsCount() == 2)
            this.outx(", drawing the attention of your other companion.");
        else this.outx(", echoing off the sentinel-like rocks that seem to ring your encampment.");
        this.outx(
            "  Her tail goes wild at the impact, whipping around in a frenzy and actually managing to slap your cheek!  That bitch!"
        );
        this.outx(
            '\n\nThis time, your hand cocks and releases in a split-second, coming down with even more force than before.  Vapula screams, "<i>Ow! Stop it, by Lethice, please!</i>"  This time, her thrashing, spaded tail stays obediently low, harmlessly cutting through the air so as not to irritate you.'
        );
        this.outx(
            '\n\n"<i>That\'s better,</i>" you growl as you admire her gradually reddening bottom.  It\'s certainly unusual to watch a purple behind turn red, quite the opposite of how it would look on a normal person.  Still, two red handprints quickly become apparent on the closest cheek, one laid over top of the other.  "<i>Now hold still and take your punishment,</i>" you order, "<i>I expect a demon like you ought to be enough of a pain-loving masochist to get off before I finish.  Isn\'t that right?</i>"  You smack her other, untouched cheek for a bit of audible punctuation and smile at the high pitched peep of pain that she makes.'
        );
        if (this.player.findPerk(PerkLib.Sadist) >= 0)
            this.outx(
                "  Dishing out all this suffering is getting you a little hot under the collar, and you squirm a bit in place in anticipation of the pain to come."
            );
        this.outx(
            "\n\nVapula scrunches her eyes shut and shakes her purple hair around, barely making a sound outside of her instinctive peep at the hit.  You lift your palm again and bring it down in another spank, not quite as hard as the last but in the same place.  She bites her lip but stays blissfully silent.  Well, at least she's not calling every imp in a five mile radius to come bother you.  You paddle her again, finding some untouched lavender flesh to abuse while you watch the new handprints appear on her shapely behind.  Tears well up at the corners of the succubus's eyes, and she makes a start at talking."
        );
        this.outx(
            '\n\nYou interrupt, scolding, "<i>Don\'t even start.  You swore to obey me as your [master] and you broke that promise.  Now you have to endure this.  Buckle up, sweatheart.</i>"'
        );
        this.outx(
            "\n\nYou begin to attack her bottom with a barrage of quick slaps, bouncing the purple derriere back and forth from the hard-hitting strikes.  You don't spend too much time in any one place, instead trying to make sure you hit every untouched, unmarked portion of that beautiful butt.  Soon your slave's bouncy cheeks are tanned to the point where they seem to glow a rosy red, tender and sore.  Vapula bites her lips with each impact and tries to hold back her tears, but they flow on, unabated."
        );
        this.outx(
            "\n\nThe succubus is panting, gasping really, and while you assume it to be pain at first, when you touch her warm, flushed skin to dab away one of her tears, you realize that she's actually turned on.  The bitch IS getting off on it.  You aren't sure if she's actually a natural painslut or just obeying your masochistic suggestions, but a quick dip into the violet crevasse between her legs confirms the presence of copious lubricants and a hard, aroused clitty.  Vapula shudders when you stroke her pussy and begs, \"<i>Please, let's fuck!  I'm so wet for you!  You can spank me while we fuck until my ass is bruised and swollen!  Don't you wanna feel my pussy clench each time you punish me for being a disobedient little skank?</i>\""
        );
        this.outx(
            "\n\nWhile that's certainly an appealing offer, it would defeat the point of this little exercise.  You shake your head sadly, ignoring the heat in your "
        );
        if (this.player.hasCock()) this.outx("maleness");
        else if (this.player.hasVagina()) this.outx("vagina");
        else this.outx("tingling anus");
        this.outx(
            ", and bring your palm back down again to start a fresh wave of punishment.  Vapula actually does begin to make vocalizations at this point, but they sound closer to moans and whimpers of pleasure than cries of pain.  As a matter of fact, you can feel the hard nubs of her nipples dragging across your [leg] every time she contorts in pain.  A few blows later and stray drops of feminine lubricants spatter off your [foot].  Vapula's tail stabs towards her vulnerable sex, but you immediately yank it away and give her a harder than usual slap for punishment."
        );
        this.outx(
            "\n\nIf she's going to cum, it's going to be because of you.  There's no masturbating your way out of punishment.  You pound away at that reddened bottom with renewed vigor, and soon, those drops of enjoyment turn into a tide of lubricated pleasure.  Vapula's head begins to thrash with each spank, and her body quakes, not from orgasm but from being on the edge for so long.  You double the pace, and as the entirety of her bottom goes red, Vapula cums, unleashing a tide of succubus-spunk to stain your [leg].  You give her a few gentle swats to see her orgasm through and release her once it's over."
        );
        this.outx(
            "\n\nThe demoness nervelessly flops off you and onto the ground, moaning in pain and pleasure, rubbing her abused bottom.  Hopefully she learned her lesson, and if not, you can always teach it to her again, next time."
        );
        // {+20ish lust}
        this.dynStats("lus", 10 + this.player.lib / 7);
        // {Sadist: + 20 lust}
        if (this.player.findPerk(PerkLib.Sadist) >= 0)
            this.dynStats("lus", 10 + this.player.lib / 7);
        this.flags[kFLAGS.VAPULA_EARNED_A_SPANK] = 0;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
}
