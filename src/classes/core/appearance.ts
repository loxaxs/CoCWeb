import { CoC } from "../CoC";

import { CockTypesEnum } from "../CockTypesEnum";
import { PerkLib } from "../PerkLib";
import { PregnancyStore } from "../PregnancyStore";
import { StatusAffects } from "../StatusAffects";
import { trace } from "../../console";
import { kFLAGS } from "../GlobalFlags/kFLAGS";

export function appearance(this: CoC): void {
    this.funcs = [];
    this.args = [];
    // Temp vars
    let temp = 0;
    let rando = 0;
    // Determine race type:
    let race = "human";

    const { player } = this;

    race = player.race();
    // Discuss race
    this.outx("", true);
    if (race != "human")
        this.outx(
            "You began your journey as a human, but gave that up as you explored the dangers of this realm.  ",
        );
    // Height and race.
    this.outx(
        `You are a ${Math.floor(player.tallness / 12)} foot ${
            player.tallness % 12
        } inch tall ${race}, with ${player.bodyType()}.`,
    );
    if (player.armorName == "comfortable clothes")
        this.outx(
            `  <b>You are currently wearing ${player.armorName} and using your ${player.weaponName} as a weapon.</b>`,
        );
    else
        this.outx(
            `  <b>You are currently wearing your ${player.armorName} and using your ${player.weaponName} as a weapon.</b>`,
        );
    // Face
    if (
        player.faceType == CoC.FACE_HUMAN ||
        player.faceType == CoC.FACE_SHARK_TEETH ||
        player.faceType == CoC.FACE_BUNNY ||
        player.faceType == CoC.FACE_SPIDER_FANGS ||
        player.faceType == CoC.FACE_FERRET_MASK
    ) {
        if (player.skinType == CoC.SKIN_TYPE_PLAIN || player.skinType == CoC.SKIN_TYPE_GOO)
            this.outx(`  Your face is human in shape and structure, with ${player.skin()}.`);
        if (player.skinType == CoC.SKIN_TYPE_FUR)
            this.outx(
                `  Under your ${player.skinFurScales()} you have a human-shaped head with ${player.skin(
                    true,
                    false,
                )}.`,
            );
        if (player.skinType == CoC.SKIN_TYPE_SCALES)
            this.outx(`  Your face is fairly human in shape, but is covered in ${player.skin()}.`);
        if (player.faceType == CoC.FACE_SHARK_TEETH)
            this.outx(
                "  A set of razor-sharp, retractable shark-teeth fill your mouth and gives your visage a slightly angular appearance.",
            );
        else if (player.faceType == CoC.FACE_BUNNY)
            this.outx(
                "  The constant twitches of your nose and the length of your incisors gives your visage a hint of bunny-like cuteness.",
            );
        else if (player.faceType == CoC.FACE_SPIDER_FANGS)
            this.outx(
                "  A set of retractable, needle-like fangs sit in place of your canines and are ready to dispense their venom.",
            );
        else if (player.faceType == CoC.FACE_FERRET_MASK)
            this.outx(
                "  The [skinFurScales] around your eyes is significantly darker than the rest of your face, giving you a cute little ferret mask.",
            );
    } else if (player.faceType == CoC.FACE_FERRET) {
        if (player.skinType == CoC.SKIN_TYPE_PLAIN)
            this.outx(
                "  Your face is an adorable cross between human and ferret features, complete with a wet nose and whiskers.  The only oddity is your lack of fur, leaving only [skin] visible on your ferret-like face.",
            );
        else
            this.outx(
                `  Your face is coated in ${player.hairColor} fur with [skin] underneath, an adorable cross between human and ferret features.  It is complete with a wet nose and whiskers.`,
            );
    } else if (player.faceType == CoC.FACE_RACCOON_MASK) {
        // appearance for skinheads
        if (player.skinType != CoC.SKIN_TYPE_FUR && player.skinType != CoC.SKIN_TYPE_SCALES) {
            this.outx(`  Your face is human in shape and structure, with ${player.skin()}`);
            if (
                (player.skinTone == "ebony" || player.skinTone == "black") &&
                (player.skinType == CoC.SKIN_TYPE_PLAIN || player.skinType == CoC.SKIN_TYPE_GOO)
            )
                this.outx(
                    ", though with your dusky hue, the black raccoon mask you sport isn't properly visible.",
                );
            else
                this.outx(
                    ", though it is decorated with a sly-looking raccoon mask over your eyes.",
                );
        }
        // appearance furscales
        else {
            // (black/midnight furscales)
            if (
                (player.hairColor == "black" || player.hairColor == "midnight") &&
                (player.skinType == CoC.SKIN_TYPE_FUR || player.skinType == CoC.SKIN_TYPE_SCALES)
            )
                this.outx(
                    `  Under your ${player.skinFurScales()} hides a black raccoon mask, barely visible due to your inky hue, and`,
                );
            else
                this.outx(
                    `  Your ${player.skinFurScales()} are decorated with a sly-looking raccoon mask, and under them`,
                );
            this.outx(` you have a human-shaped head with ${player.skin(true, false)}.`);
        }
    } else if (player.faceType == CoC.FACE_RACCOON) {
        this.outx(
            `  You have a triangular raccoon face, replete with sensitive whiskers and a little black nose; a mask shades the space around your eyes, set apart from your ${player.skinFurScales()} by a band of white.`,
        );
        // (if skin)
        if (player.skinType == CoC.SKIN_TYPE_PLAIN)
            this.outx("  It looks a bit strange with only the skin and no fur.");
        else if (player.skinType == CoC.SKIN_TYPE_SCALES)
            this.outx(
                "  The presence of said scales gives your visage an eerie look, more reptile than mammal.",
            );
    } else if (player.faceType == CoC.FACE_FOX) {
        this.outx(
            "  You have a tapered, shrewd-looking vulpine face with a speckling of downward-curved whiskers just behind the nose.",
        );
        if (player.skinType == CoC.SKIN_TYPE_PLAIN)
            this.outx(
                `  Oddly enough, there's no fur on your animalistic muzzle, just ${player.skinFurScales()}.`,
            );
        else if (player.skinType == CoC.SKIN_TYPE_FUR)
            this.outx(`  A coat of ${player.skinFurScales()} decorates your muzzle.`);
        else if (player.skinType == CoC.SKIN_TYPE_SCALES)
            this.outx(
                `  Strangely, ${player.skinFurScales()} adorn every inch of your animalistic visage.`,
            );
    } else if (player.faceType == CoC.FACE_BUCKTEETH) {
        // appearance
        this.outx(`  Your face is generally human in shape and structure, with ${player.skin()}`);
        if (player.skinType == CoC.SKIN_TYPE_FUR || player.skinType == CoC.SKIN_TYPE_SCALES)
            this.outx(` under your ${player.skinFurScales()}`);
        this.outx(" and mousey buckteeth.");
    } else if (player.faceType == CoC.FACE_MOUSE) {
        // appearance
        this.outx(
            "  You have a snubby, tapered mouse's face, with whiskers, a little pink nose, and ",
        );
        if (player.skinType != CoC.SKIN_TYPE_FUR && player.skinType != CoC.SKIN_TYPE_SCALES)
            this.outx(player.skin());
        else this.outx(`${player.skin()} under your ${player.skinFurScales()}`);
        this.outx(".  Two large incisors complete it.");
    }
    // Naga
    if (player.faceType == CoC.FACE_SNAKE_FANGS) {
        if (player.skinType == CoC.SKIN_TYPE_PLAIN || player.skinType == CoC.SKIN_TYPE_GOO)
            this.outx(
                `  You have a fairly normal face, with ${player.skin()}.  The only oddity is your pair of dripping fangs which often hang over your lower lip.`,
            );
        if (player.skinType == CoC.SKIN_TYPE_FUR)
            this.outx(
                `  Under your ${player.skinFurScales()} you have a human-shaped head with ${player.skin(
                    true,
                    false,
                )}.  In addition, a pair of fangs hang over your lower lip, dripping with venom.`,
            );
        if (player.skinType == CoC.SKIN_TYPE_SCALES)
            this.outx(
                `  Your face is fairly human in shape, but is covered in ${player.skinFurScales()}.  In addition, a pair of fangs hang over your lower lip, dripping with venom.`,
            );
    }
    // horse-face
    if (player.faceType == CoC.FACE_HORSE) {
        if (player.skinType == CoC.SKIN_TYPE_PLAIN || player.skinType == CoC.SKIN_TYPE_GOO)
            this.outx(
                `  Your face is equine in shape and structure.  The odd visage is hairless and covered with ${player.skinFurScales()}.`,
            );
        if (player.skinType == CoC.SKIN_TYPE_FUR)
            this.outx(
                `  Your face is almost entirely equine in appearance, even having ${player.skinFurScales()}.  Underneath the fur, you believe you have ${player.skin(
                    true,
                    false,
                )}.`,
            );
        if (player.skinType == CoC.SKIN_TYPE_SCALES)
            this.outx(
                `  You have the face and head structure of a horse, overlaid with glittering ${player.skinFurScales()}.`,
            );
    }
    // dog-face
    if (player.faceType == CoC.FACE_DOG) {
        if (player.skinType == CoC.SKIN_TYPE_PLAIN || player.skinType == CoC.SKIN_TYPE_GOO)
            this.outx(
                `  You have a dog-like face, complete with a wet nose.  The odd visage is hairless and covered with ${player.skinFurScales()}.`,
            );
        if (player.skinType == CoC.SKIN_TYPE_FUR)
            this.outx(
                `  You have a dog's face, complete with wet nose and panting tongue.  You've got ${player.skinFurScales()}, hiding your ${player.skin(
                    true,
                    false,
                )} underneath your furry visage.`,
            );
        if (player.skinType == CoC.SKIN_TYPE_SCALES)
            this.outx(
                `  You have the facial structure of a dog, wet nose and all, but overlaid with glittering ${player.skinFurScales()}.`,
            );
    }
    // cat-face
    if (player.faceType == CoC.FACE_CAT) {
        if (player.skinType == CoC.SKIN_TYPE_PLAIN || player.skinType == CoC.SKIN_TYPE_GOO)
            this.outx(
                `  You have a cat-like face, complete with a cute, moist nose and whiskers.  The ${player.skin()} that is revealed by your lack of fur looks quite unusual on so feline a face.`,
            );
        if (player.skinType == CoC.SKIN_TYPE_FUR)
            this.outx(
                `  You have a cat-like face, complete with moist nose and whiskers.  Your ${
                    player.skinDesc
                } is ${player.hairColor}, hiding your ${player.skin(true, false)} underneath.`,
            );
        if (player.skinType == CoC.SKIN_TYPE_SCALES)
            this.outx(
                `  Your facial structure blends humanoid features with those of a cat.  A moist nose and whiskers are included, but overlaid with glittering ${player.skinFurScales()}.`,
            );
        if (player.eyeType != CoC.EYES_BLACK_EYES_SAND_TRAP)
            this.outx(
                "  Of course, no feline face would be complete without vertically slit eyes.",
            );
    }
    // Minotaaaauuuur-face
    if (player.faceType == CoC.FACE_COW_MINOTAUR) {
        if (player.skinType == CoC.SKIN_TYPE_PLAIN || player.skinType == CoC.SKIN_TYPE_GOO)
            this.outx(
                `  You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose.  Despite your lack of fur elsewhere, your visage does have a short layer of ${player.hairColor} fuzz.`,
            );
        if (player.skinType == CoC.SKIN_TYPE_FUR)
            this.outx(
                `  You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose.  Your ${player.skinFurScales()} thickens noticably on your head, looking shaggy and more than a little monstrous once laid over your visage.`,
            );
        if (player.skinType == CoC.SKIN_TYPE_SCALES)
            this.outx(
                "  Your face resembles a minotaur's, though strangely it is covered in shimmering scales, right up to the flat cow-like nose that protrudes from your face.",
            );
    }
    // Lizard-face
    if (player.faceType == CoC.FACE_LIZARD) {
        if (player.skinType == CoC.SKIN_TYPE_PLAIN || player.skinType == CoC.SKIN_TYPE_GOO)
            this.outx(
                `  You have a face resembling that of a lizard, and with your toothy maw, you have quite a fearsome visage.  The reptilian visage does look a little odd with just ${player.skin()}.`,
            );
        if (player.skinType == CoC.SKIN_TYPE_FUR)
            this.outx(
                `  You have a face resembling that of a lizard.  Between the toothy maw, pointed snout, and the layer of ${player.skinFurScales()} covering your face, you have quite the fearsome visage.`,
            );
        if (player.skinType == CoC.SKIN_TYPE_SCALES)
            this.outx(
                `  Your face is that of a lizard, complete with a toothy maw and pointed snout.  Reflective ${player.skinFurScales()} complete the look, making you look quite fearsome.`,
            );
    }
    if (player.faceType == CoC.FACE_DRAGON) {
        this.outx(
            `  Your face is a narrow, reptilian muzzle.  It looks like a predatory lizard's, at first glance, but with an unusual array of spikes along the under-jaw.  It gives you a regal but fierce visage.  Opening your mouth reveals several rows of dagger-like sharp teeth.  The fearsome visage is decorated by ${player.skinFurScales()}.`,
        );
    }
    if (player.faceType == CoC.FACE_KANGAROO) {
        this.outx("  Your face is ");
        if (player.skinType == CoC.SKIN_TYPE_PLAIN) this.outx("bald");
        else this.outx(`covered with ${player.skinFurScales()}`);
        this.outx(
            " and shaped like that of a kangaroo, somewhat rabbit-like except for the extreme length of your odd visage.",
        );
    }
    // M/F stuff!
    this.outx(`  It has ${player.faceDesc()}.`);
    // Eyes
    if (player.eyeType == CoC.EYES_FOUR_SPIDER_EYES)
        this.outx(
            "  In addition to your primary two eyes, you have a second, smaller pair on your forehead.",
        );
    else if (player.eyeType == CoC.EYES_BLACK_EYES_SAND_TRAP)
        this.outx("  Your eyes are solid spheres of inky, alien darkness.");

    // Hair
    // if bald
    if (player.hairLength == 0) {
        if (player.skinType == CoC.SKIN_TYPE_FUR)
            this.outx("  You have no hair, only a thin layer of fur atop of your head.  ");
        else
            this.outx(
                `  You are totally bald, showing only shiny ${player.skinTone} ${player.skinDesc} where your hair should be.`,
            );
        if (player.earType == CoC.EARS_HORSE)
            this.outx("  A pair of horse-like ears rise up from the top of your head.");
        else if (player.earType == CoC.EARS_FERRET)
            this.outx("  A pair of small, rounded ferret ears sit on top of your head.");
        else if (player.earType == CoC.EARS_DOG)
            this.outx("  A pair of dog ears protrude from your skull, flopping down adorably.");
        else if (player.earType == CoC.EARS_COW)
            this.outx("  A pair of round, floppy cow ears protrude from the sides of your skull.");
        else if (player.earType == CoC.EARS_ELFIN)
            this.outx("  A pair of large pointy ears stick out from your skull.");
        else if (player.earType == CoC.EARS_CAT)
            this.outx("  A pair of cute, fuzzy cat ears have sprouted from the top of your head.");
        else if (player.earType == CoC.EARS_LIZARD)
            this.outx(
                "  A pair of rounded protrusions with small holes on the sides of your head serve as your ears.",
            );
        else if (player.earType == CoC.EARS_BUNNY)
            this.outx(
                "  A pair of floppy rabbit ears stick up from the top of your head, flopping around as you walk.",
            );
        else if (player.earType == CoC.EARS_FOX)
            this.outx("  A pair of large, adept fox ears sit high on your head, always listening.");
        else if (player.earType == CoC.EARS_DRAGON)
            this.outx(
                "  A pair of rounded protrusions with small holes on the sides of your head serve as your ears.  Bony fins sprout behind them.",
            );
        else if (player.earType == CoC.EARS_RACCOON)
            this.outx("  A pair of vaguely egg-shaped, furry raccoon ears adorns your head.");
        else if (player.earType == CoC.EARS_MOUSE)
            this.outx("  A pair of large, dish-shaped mouse ears tops your head.");
        if (player.antennae == CoC.ANTENNAE_BEE)
            this.outx(
                "  Floppy antennae also appear on your skull, bouncing and swaying in the breeze.",
            );
    }
    // not bald
    else {
        if (player.earType == CoC.EARS_HUMAN)
            this.outx(
                `  Your ${this.hairDescript()} looks good on you, accentuating your features well.`,
            );
        else if (player.earType == CoC.EARS_FERRET)
            this.outx(
                `  A pair of small, rounded ferret ears burst through the top of your ${this.hairDescript()}.`,
            );
        else if (player.earType == CoC.EARS_HORSE)
            this.outx(
                `  The ${this.hairDescript()} on your head parts around a pair of very horse-like ears that grow up from your head.`,
            );
        else if (player.earType == CoC.EARS_DOG)
            this.outx(
                `  The ${this.hairDescript()} on your head is overlapped by a pair of pointed dog ears.`,
            );
        else if (player.earType == CoC.EARS_COW)
            this.outx(
                `  The ${this.hairDescript()} on your head is parted by a pair of rounded cow ears that stick out sideways.`,
            );
        else if (player.earType == CoC.EARS_ELFIN)
            this.outx(
                `  The ${this.hairDescript()} on your head is parted by a pair of cute pointed ears, bigger than your old human ones.`,
            );
        else if (player.earType == CoC.EARS_CAT)
            this.outx(
                `  The ${this.hairDescript()} on your head is parted by a pair of cute, fuzzy cat ears, sprouting from atop your head and pivoting towards any sudden noises.`,
            );
        else if (player.earType == CoC.EARS_LIZARD)
            this.outx(
                `  The ${this.hairDescript()} atop your head makes it nigh-impossible to notice the two small rounded openings that are your ears.`,
            );
        else if (player.earType == CoC.EARS_BUNNY)
            this.outx(
                `  A pair of floppy rabbit ears stick up out of your ${this.hairDescript()}, bouncing around as you walk.`,
            );
        else if (player.earType == CoC.EARS_KANGAROO)
            this.outx(
                `  The ${this.hairDescript()} atop your head is parted by a pair of long, furred kangaroo ears that stick out at an angle.`,
            );
        else if (player.earType == CoC.EARS_FOX)
            this.outx(
                `  The ${this.hairDescript()} atop your head is parted by a pair of large, adept fox ears that always seem to be listening.`,
            );
        else if (player.earType == CoC.EARS_DRAGON)
            this.outx(
                `  The ${this.hairDescript()} atop your head is parted by a pair of rounded protrusions with small holes on the sides of your head serve as your ears.  Bony fins sprout behind them.`,
            );
        else if (player.earType == CoC.EARS_RACCOON)
            this.outx(
                `  The ${this.hairDescript()} on your head parts around a pair of egg-shaped, furry raccoon ears.`,
            );
        else if (player.earType == CoC.EARS_MOUSE)
            this.outx(
                `  The ${this.hairDescript()} atop your head is funneled between and around a pair of large, dish-shaped mouse ears that stick up prominently.`,
            );
        if (player.antennae == CoC.ANTENNAE_BEE) {
            if (player.earType == CoC.EARS_BUNNY)
                this.outx(
                    "  Limp antennae also grow from just behind your hairline, waving and swaying in the breeze with your ears.",
                );
            else
                this.outx(
                    "  Floppy antennae also grow from just behind your hairline, bouncing and swaying in the breeze.",
                );
        }
    }
    // Tongue
    if (player.tongueType == CoC.TONUGE_SNAKE)
        this.outx("  A snake-like tongue occasionally flits between your lips, tasting the air.");
    else if (player.tongueType == CoC.TONUGE_DEMONIC)
        this.outx(
            "  A slowly undulating tongue occasionally slips from between your lips.  It hangs nearly two feet long when you let the whole thing slide out, though you can retract it to appear normal.",
        );
    else if (player.tongueType == CoC.TONUGE_DRACONIC)
        this.outx(
            "  Your mouth contains a thick, fleshy tongue that, if you so desire, can telescope to a distance of about four feet.  It has sufficient manual dexterity that you can use it almost like a third arm.",
        );

    // Horns
    // Demonic horns
    if (player.hornType == CoC.HORNS_DEMON) {
        if (player.horns == 2)
            this.outx(
                `  A small pair of pointed horns has broken through the ${player.skinDesc} on your forehead, proclaiming some demonic taint to any who see them.`,
            );
        if (player.horns == 4)
            this.outx(
                `  A quartet of prominent horns has broken through your ${player.skinDesc}.  The back pair are longer, and curve back along your head.  The front pair protrude forward demonically.`,
            );
        if (player.horns == 6)
            this.outx(
                `  Six horns have sprouted through your ${player.skinDesc}, the back two pairs curve backwards over your head and down towards your neck, while the front two horns stand almost eight inches long upwards and a little forward.`,
            );
        if (player.horns >= 8)
            this.outx(
                `  A large number of thick demonic horns sprout through your ${
                    player.skinDesc
                }, each pair sprouting behind the ones before.  The front jut forwards nearly ten inches while the rest curve back over your head, some of the points ending just below your ears.  You estimate you have a total of ${this.num2Text(
                    player.horns,
                )} horns.`,
            );
    }
    // Minotaur horns
    if (player.hornType == CoC.HORNS_COW_MINOTAUR) {
        if (player.horns < 3)
            this.outx(
                "  Two tiny horn-like nubs protrude from your forehead, resembling the horns of the young livestock kept by your village.",
            );
        if (player.horns >= 3 && player.horns < 6)
            this.outx(
                "  Two moderately sized horns grow from your forehead, similar in size to those on a young bovine.",
            );
        if (player.horns >= 6 && player.horns < 12)
            this.outx(
                "  Two large horns sprout from your forehead, curving forwards like those of a bull.",
            );
        if (player.horns >= 12 && player.horns < 20)
            this.outx(
                "  Two very large and dangerous looking horns sprout from your head, curving forward and over a foot long.  They have dangerous looking points.",
            );
        if (player.horns >= 20)
            this.outx(
                "  Two huge horns erupt from your forehead, curving outward at first, then forwards.  The weight of them is heavy, and they end in dangerous looking points.",
            );
    }
    // Lizard horns
    if (player.hornType == CoC.HORNS_DRACONIC_X2) {
        this.outx(
            `  A pair of ${this.num2Text(
                Math.floor(player.horns),
            )} inch horns grow from the sides of your head, sweeping backwards and adding to your imposing visage.`,
        );
    }
    // Super lizard horns
    if (player.hornType == CoC.HORNS_DRACONIC_X4_12_INCH_LONG)
        this.outx(
            "  Two pairs of horns, roughly a foot long, sprout from the sides of your head.  They sweep back and give you a fearsome look, almost like the dragons from your village's legends.",
        );
    // Antlers!
    if (player.hornType == CoC.HORNS_ANTLERS) {
        if (player.horns > 0)
            this.outx(
                `  Two antlers, forking into ${this.num2Text(
                    player.horns,
                )} points, have sprouted from the top of your head, forming a spiky, regal crown of bone.`,
            );
    }
    // BODY PG HERE
    this.outx("\n\nYou have a humanoid shape with the usual torso, arms, hands, and fingers.");
    // WINGS!
    if (player.wingType == CoC.WING_TYPE_BEE_LIKE_SMALL)
        this.outx(
            "  A pair of tiny-yet-beautiful bee-wings sprout from your back, too small to allow you to fly.",
        );
    if (player.wingType == CoC.WING_TYPE_BEE_LIKE_LARGE)
        this.outx(
            "  A pair of large bee-wings sprout from your back, reflecting the light through their clear membranes beautifully.  They flap quickly, allowing you to easily hover in place or fly.",
        );
    if (player.wingType == CoC.WING_TYPE_BAT_LIKE_TINY)
        this.outx(
            "  A pair of tiny bat-like demon-wings sprout from your back, flapping cutely, but otherwise being of little use.",
        );
    if (player.wingType == CoC.WING_TYPE_BAT_LIKE_LARGE)
        this.outx(
            "  A pair of large bat-like demon-wings fold behind your shoulders.  With a muscle-twitch, you can extend them, and use them to soar gracefully through the air.",
        );
    if (player.wingType == CoC.WING_TYPE_SHARK_FIN)
        this.outx(
            "  A large shark-like fin has sprouted between your shoulder blades.  With it you have far more control over swimming underwater.",
        );
    if (player.wingType == CoC.WING_TYPE_FEATHERED_LARGE)
        this.outx(
            `  A pair of large, feathery wings sprout from your back.  Though you usually keep the ${player.hairColor}-colored wings folded close, they can unfurl to allow you to soar as gracefully as a harpy.`,
        );
    if (player.wingType == CoC.WING_TYPE_DRACONIC_SMALL)
        this.outx(
            "  Small, vestigial wings sprout from your shoulders.  They might look like bat's wings, but the membranes are covered in fine, delicate scales.",
        );
    else if (player.wingType == CoC.WING_TYPE_DRACONIC_LARGE)
        this.outx(
            "  Magnificent wings sprout from your shoulders.  When unfurled they stretch further than your arm span, and a single beat of them is all you need to set out toward the sky.  They look a bit like bat's wings, but the membranes are covered in fine, delicate scales and a wicked talon juts from the end of each bone.",
        );
    else if (player.wingType == CoC.WING_TYPE_GIANT_DRAGONFLY)
        this.outx(
            "  Giant dragonfly wings hang from your shoulders.  At a whim, you could twist them into a whirring rhythm fast enough to lift you off the ground and allow you to fly.",
        );

    // Wing arms
    if (player.armType == CoC.ARM_TYPE_HARPY)
        this.outx(
            "  Feathers hang off your arms from shoulder to wrist, giving them a slightly wing-like look.",
        );
    else if (player.armType == CoC.ARM_TYPE_SPIDER)
        this.outx(
            "  Shining black exoskeleton  covers your arms from the biceps down, resembling a pair of long black gloves from a distance.",
        );
    // Done with head bits. Move on to body stuff
    // Horse lowerbody, other lowerbody texts appear lower
    if (player.lowerBody == CoC.LOWER_BODY_TYPE_PONY)
        this.outx(
            "  From the waist down you have an incredibly cute and cartoonish parody of a horse's body, with all four legs ending in flat, rounded feet.",
        );
    else if (player.isTaur())
        this.outx(
            "  From the waist down you have the body of a horse, with all four legs capped by hooves.",
        );
    // Hip info only displays if you aren't a centaur.
    if (!player.isTaur()) {
        if (player.thickness > 70) {
            this.outx(`  You have ${this.hipDescript()}`);
            if (player.hipRating < 6) {
                if (player.tone < 65) this.outx(" buried under a noticeable muffin-top, and");
                else this.outx(" that blend into your pillar-like waist, and");
            }
            if (player.hipRating >= 6 && player.hipRating < 10)
                this.outx(" that blend into the rest of your thick form, and");
            if (player.hipRating >= 10 && player.hipRating < 15)
                this.outx(" that would be much more noticeable if you weren't so wide-bodied, and");
            if (player.hipRating >= 15 && player.hipRating < 20)
                this.outx(" that sway and emphasize your thick, curvy shape, and");
            if (player.hipRating >= 20)
                this.outx(" that sway hypnotically on your extra-curvy frame, and");
        } else if (player.thickness < 30) {
            this.outx(`  You have ${this.hipDescript()}`);
            if (player.hipRating < 6) this.outx(" that match your trim, lithe body, and");
            if (player.hipRating >= 6 && player.hipRating < 10)
                this.outx(" that sway to and fro, emphasized by your trim body, and");
            if (player.hipRating >= 10 && player.hipRating < 15)
                this.outx(" that swell out under your trim waistline, and");
            if (player.hipRating >= 15 && player.hipRating < 20)
                this.outx(", emphasized by your narrow waist, and");
            if (player.hipRating >= 20)
                this.outx(" that swell disproportionately wide on your lithe frame, and");
        }
        // STANDARD
        else {
            this.outx(`  You have ${this.hipDescript()}`);
            if (player.hipRating < 6) this.outx(", and");
            if (player.femininity > 50) {
                if (player.hipRating >= 6 && player.hipRating < 10)
                    this.outx(" that draw the attention of those around you, and");
                if (player.hipRating >= 10 && player.hipRating < 15)
                    this.outx(" that make you walk with a sexy, swinging gait, and");
                if (player.hipRating >= 15 && player.hipRating < 20)
                    this.outx(" that make it look like you've birthed many children, and");
                if (player.hipRating >= 20)
                    this.outx(
                        " that make you look more like an animal waiting to be bred than any kind of human, and",
                    );
            } else {
                if (player.hipRating >= 6 && player.hipRating < 10)
                    this.outx(" that give you a graceful stride, and");
                if (player.hipRating >= 10 && player.hipRating < 15)
                    this.outx(" that add a little feminine swing to your gait, and");
                if (player.hipRating >= 15 && player.hipRating < 20)
                    this.outx(" that force you to sway and wiggle as you move, and");
                if (player.hipRating >= 20) {
                    this.outx(" that give your ");
                    if (player.balls > 0) this.outx("balls plenty of room to breathe");
                    else if (player.hasCock())
                        this.outx(`${player.multiCockDescript()} plenty of room to swing`);
                    else if (player.hasVagina())
                        this.outx(`${this.vaginaDescript()} a nice, wide berth`);
                    else this.outx("vacant groin plenty of room");
                    this.outx(", and");
                }
            }
        }
    }
    // ASS
    // Horse version
    if (player.isTaur()) {
        // FATBUTT
        if (player.tone < 65) {
            this.outx(`  Your ${this.buttDescript()}`);
            if (player.buttRating < 4) this.outx(" is lean, from what you can see of it.");
            if (player.buttRating >= 4 && player.buttRating < 6)
                this.outx(" looks fairly average.");
            if (player.buttRating >= 6 && player.buttRating < 10)
                this.outx(" is fairly plump and healthy.");
            if (player.buttRating >= 10 && player.buttRating < 15)
                this.outx(" jiggles a bit as you trot around.");
            if (player.buttRating >= 15 && player.buttRating < 20)
                this.outx(" jiggles and wobbles as you trot about.");
            if (player.buttRating >= 20)
                this.outx(" is obscenely large, bordering freakish, even for a horse.");
        }
        // GIRL LOOK AT DAT BOOTY
        else {
            this.outx(`  Your ${this.buttDescript()}`);
            if (player.buttRating < 4)
                this.outx(" is barely noticable, showing off the muscles of your haunches.");
            if (player.buttRating >= 4 && player.buttRating < 6)
                this.outx(" matches your toned equine frame quite well.");
            if (player.buttRating >= 6 && player.buttRating < 10)
                this.outx(" gives hints of just how much muscle you could put into a kick.");
            if (player.buttRating >= 10 && player.buttRating < 15)
                this.outx(" surges with muscle whenever you trot about.");
            if (player.buttRating >= 15 && player.buttRating < 20)
                this.outx(" flexes its considerable mass as you move.");
            if (player.buttRating >= 20)
                this.outx(" is stacked with layers of muscle, huge even for a horse.");
        }
    }
    // Non-horse PCs
    else {
        // TUBBY ASS
        if (player.tone < 60) {
            this.outx(` your ${this.buttDescript()}`);
            if (player.buttRating < 4) this.outx(" looks great under your gear.");
            if (player.buttRating >= 4 && player.buttRating < 6)
                this.outx(" has the barest amount of sexy jiggle.");
            if (player.buttRating >= 6 && player.buttRating < 10)
                this.outx(" fills out your clothing nicely.");
            if (player.buttRating >= 10 && player.buttRating < 15)
                this.outx(" wobbles enticingly with every step.");
            if (player.buttRating >= 15 && player.buttRating < 20)
                this.outx(" wobbles like a bowl full of jello as you walk.");
            if (player.buttRating >= 20)
                this.outx(
                    " is obscenely large, bordering freakish, and makes it difficult to run.",
                );
        }
        // FITBUTT
        else {
            this.outx(` your ${this.buttDescript()}`);
            if (player.buttRating < 4) this.outx(" molds closely against your form.");
            if (player.buttRating >= 4 && player.buttRating < 6)
                this.outx(
                    " contracts with every motion, displaying the detailed curves of its lean musculature.",
                );
            if (player.buttRating >= 6 && player.buttRating < 10)
                this.outx(" fills out your clothing nicely.");
            if (player.buttRating >= 10 && player.buttRating < 15)
                this.outx(" stretches your gear, flexing it with each step.");
            if (player.buttRating >= 15 && player.buttRating < 20)
                this.outx(" threatens to bust out from under your kit each time you clench it.");
            if (player.buttRating >= 20)
                this.outx(" is marvelously large, but completely stacked with muscle.");
        }
    }
    // TAILS
    if (player.tailType == CoC.TAIL_TYPE_HORSE)
        this.outx(
            `  A long ${
                player.hairColor
            } horsetail hangs from your ${this.buttDescript()}, smooth and shiny.`,
        );
    if (player.tailType == CoC.TAIL_TYPE_FERRET)
        this.outx(
            `  A long ferret tail sprouts from above your [butt].  It is thin, tapered, and covered in shaggy ${player.hairColor} fur.`,
        );
    if (player.tailType == CoC.TAIL_TYPE_DOG)
        this.outx(
            `  A fuzzy ${
                player.hairColor
            } dogtail sprouts just above your ${this.buttDescript()}, wagging to and fro whenever you are happy.`,
        );
    if (player.tailType == CoC.TAIL_TYPE_DEMONIC)
        this.outx(
            `  A narrow tail ending in a spaded tip curls down from your ${this.buttDescript()}, wrapping around your ${player.leg()} sensually at every opportunity.`,
        );
    if (player.tailType == CoC.TAIL_TYPE_COW)
        this.outx(
            "  A long cowtail with a puffy tip swishes back and forth as if swatting at flies.",
        );
    if (player.tailType == CoC.TAIL_TYPE_SPIDER_ADBOMEN) {
        this.outx(
            "  A large, spherical spider-abdomen has grown out from your backside, covered in shiny black chitin.  Though it's heavy and bobs with every motion, it doesn't seem to slow you down.",
        );
        if (player.tailVenom > 50 && player.tailVenom < 80)
            this.outx("  Your bulging arachnid posterior feels fairly full of webbing.");
        if (player.tailVenom >= 80 && player.tailVenom < 100)
            this.outx("  Your arachnid rear bulges and feels very full of webbing.");
        if (player.tailVenom == 100)
            this.outx(
                "  Your swollen spider-butt is distended with the sheer amount of webbing it's holding.",
            );
    }
    if (player.tailType == CoC.TAIL_TYPE_BEE_ABDOMEN) {
        this.outx(
            "  A large insectile bee-abdomen dangles from just above your backside, bobbing with its own weight as you shift.  It is covered in hard chitin with black and yellow stripes, and tipped with a dagger-like stinger.",
        );
        if (player.tailVenom > 50 && player.tailVenom < 80)
            this.outx("  A single drop of poison hangs from your exposed stinger.");
        if (player.tailVenom >= 80 && player.tailVenom < 100)
            this.outx("  Poisonous bee venom coats your stinger completely.");
        if (player.tailVenom == 100)
            this.outx("  Venom drips from your poisoned stinger regularly.");
    }
    if (player.tailType == CoC.TAIL_TYPE_SHARK) {
        this.outx(
            "  A long shark-tail trails down from your backside, swaying to and fro while giving you a dangerous air.",
        );
    }
    if (player.tailType == CoC.TAIL_TYPE_CAT) {
        this.outx(
            `  A soft ${
                player.hairColor
            } cat-tail sprouts just above your ${this.buttDescript()}, curling and twisting with every step to maintain perfect balance.`,
        );
    }
    if (player.tailType == CoC.TAIL_TYPE_LIZARD) {
        this.outx(
            `  A tapered tail hangs down from just above your ${this.assDescript()}.  It sways back and forth, assisting you with keeping your balance.`,
        );
    }
    if (player.tailType == CoC.TAIL_TYPE_RABBIT)
        this.outx(
            `  A short, soft bunny tail sprouts just above your ${this.assDescript()}, twitching constantly whenever you don't think about it.`,
        );
    else if (player.tailType == CoC.TAIL_TYPE_HARPY)
        this.outx(
            `  A tail of feathers fans out from just above your ${this.assDescript()}, twitching instinctively to help guide you if you were to take flight.`,
        );
    else if (player.tailType == CoC.TAIL_TYPE_KANGAROO) {
        this.outx("  A conical, ");
        if (player.skinType == CoC.SKIN_TYPE_GOO) this.outx(`gooey, ${player.skinTone}`);
        else this.outx(`furry, ${player.hairColor}`);
        this.outx(
            `, tail extends from your ${this.assDescript()}, bouncing up and down as you move and helping to counterbalance you.`,
        );
    } else if (player.tailType == CoC.TAIL_TYPE_FOX) {
        if (player.tailVenom == 1)
            this.outx(
                `  A swishing ${
                    player.hairColor
                } fox's brush extends from your ${this.assDescript()}, curling around your body - the soft fur feels lovely.`,
            );
        else
            this.outx(
                `  ${this.Num2Text(player.tailVenom)} swishing ${
                    player.hairColor
                } fox's tails extend from your ${this.assDescript()}, curling around your body - the soft fur feels lovely.`,
            );
    } else if (player.tailType == CoC.TAIL_TYPE_DRACONIC) {
        this.outx(
            "  A thin, scaly, prehensile reptilian tail, almost as long as you are tall, swings behind you like a living bullwhip.  Its tip menaces with spikes of bone, meant to deliver painful blows.",
        );
    }
    // appearance
    else if (player.tailType == CoC.TAIL_TYPE_RACCOON) {
        this.outx(`  A black-and-${player.hairColor}-ringed raccoon tail waves behind you.`);
    } else if (player.tailType == CoC.TAIL_TYPE_MOUSE) {
        // appearance
        this.outx(
            `  A naked, ${player.skinTone} mouse tail pokes from your butt, dragging on the ground and twitching occasionally.`,
        );
    }
    // LOWERBODY SPECIAL
    if (player.lowerBody == CoC.LOWER_BODY_TYPE_HUMAN)
        this.outx(
            "  Two normal human legs grow down from your waist, ending in normal human feet.",
        );
    else if (player.lowerBody == CoC.LOWER_BODY_FERRET)
        this.outx(
            "  Two furry, digitigrade legs form below your [hips].  The fur is thinner on the feet, and your toes are tipped with claws.",
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_HOOFED)
        this.outx(
            "  Your legs are muscled and jointed oddly, covered in fur, and end in a pair of bestial hooves.",
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_DOG)
        this.outx(
            "  Two digitigrade legs grow downwards from your waist, ending in dog-like hind-paws.",
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_NAGA)
        this.outx(
            "  Below your waist your flesh is fused together into a very long snake-like tail.",
        );
    // Horse body is placed higher for readability purposes
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS)
        this.outx(
            "  Your perfect lissome legs end in mostly human feet, apart from the horn protruding straight down from the heel that forces you to walk with a sexy, swaying gait.",
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_DEMONIC_CLAWS)
        this.outx(
            "  Your lithe legs are capped with flexible clawed feet.  Sharp black nails grow where once you had toe-nails, giving you fantastic grip.",
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_BEE)
        this.outx(
            "  Your legs are covered in a shimmering insectile carapace up to mid-thigh, looking more like a pair of 'fuck-me-boots' than exoskeleton.  A bit of downy yellow and black fur fuzzes your upper thighs, just like a bee.",
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_GOO)
        this.outx(
            `  In place of legs you have a shifting amorphous blob.  Thankfully it's quite easy to propel yourself around on.  The lowest portions of your ${player.armorName} float around inside you, bringing you no discomfort.`,
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_CAT)
        this.outx(
            "  Two digitigrade legs grow downwards from your waist, ending in soft, padded cat-paws.",
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_LIZARD)
        this.outx(
            `  Two digitigrade legs grow down from your ${this.hipDescript()}, ending in clawed feet.  There are three long toes on the front, and a small hind-claw on the back.`,
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_BUNNY)
        this.outx(
            "  Your legs thicken below the waist as they turn into soft-furred rabbit-like legs.  You even have large bunny feet that make hopping around a little easier than walking.",
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_HARPY)
        this.outx(
            `  Your legs are covered with ${player.hairColor} plumage.  Thankfully the thick, powerful thighs are perfect for launching you into the air, and your feet remain mostly human, even if they are two-toed and tipped with talons.`,
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_KANGAROO)
        this.outx(
            "  Your furry legs have short thighs and long calves, with even longer feet ending in prominently-nailed toes.",
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS)
        this.outx(
            "  Your legs are covered in a reflective black, insectile carapace up to your mid-thigh, looking more like a pair of 'fuck-me-boots' than exoskeleton.",
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_DRIDER_LOWER_BODY)
        this.outx(
            "  Where your legs would normally start you have grown the body of a spider, with eight spindly legs that sprout from its sides.",
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_FOX)
        this.outx(
            "  Your legs are crooked into high knees with hocks and long feet, like those of a fox; cute bulbous toes decorate the ends.",
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_DRAGON)
        this.outx(
            `  Two human-like legs grow down from your ${this.hipDescript()}, sheathed in scales and ending in clawed feet.  There are three long toes on the front, and a small hind-claw on the back.`,
        );
    else if (player.lowerBody == CoC.LOWER_BODY_TYPE_RACCOON)
        this.outx(
            "  Your legs, though covered in fur, are humanlike.  Long feet on the ends bear equally long toes, and the pads on the bottoms are quite sensitive to the touch.",
        );
    if (player.findPerk(PerkLib.Incorporeality) >= 0)
        this.outx(
            `  Of course, your ${player.legs()} are partially transparent due to their ghostly nature.`,
        );

    this.outx("\n");
    if (player.findStatusAffect(StatusAffects.GooStuffed) >= 0) {
        this.outx(
            "\n<b>Your gravid-looking belly is absolutely stuffed full of goo. There's no way you can get pregnant like this, but at the same time, you look like some fat-bellied breeder.</b>\n",
        );
    }
    // Pregnancy Shiiiiiitz
    if (
        player.buttPregnancyType == PregnancyStore.PREGNANCY_FROG_GIRL ||
        player.buttPregnancyType == PregnancyStore.PREGNANCY_SATYR ||
        player.isPregnant()
    ) {
        if (player.pregnancyType == PregnancyStore.PREGNANCY_OVIELIXIR_EGGS) {
            this.outx("<b>");
            // Compute size
            temp =
                player.statusAffectv3(StatusAffects.Eggs) +
                player.statusAffectv2(StatusAffects.Eggs) * 10;
            if (player.pregnancyIncubation <= 50 && player.pregnancyIncubation > 20) {
                this.outx("Your swollen pregnant belly is as large as a ");
                if (temp < 10) this.outx("basketball.");
                if (temp >= 10 && temp < 20) this.outx("watermelon.");
                if (temp >= 20) this.outx("beach ball.");
            }
            if (player.pregnancyIncubation <= 20) {
                this.outx("Your swollen pregnant belly is as large as a ");
                if (temp < 10) this.outx("watermelon.");
                if (temp >= 10 && temp < 20) this.outx("beach ball.");
                if (temp >= 20) this.outx("large medicine ball.");
            }
            this.outx("</b>");
            temp = 0;
        }
        // Satur preggos - only shows if bigger than regular pregnancy or not pregnancy
        else if (
            player.buttPregnancyType == PregnancyStore.PREGNANCY_SATYR &&
            player.buttPregnancyIncubation > player.pregnancyIncubation
        ) {
            if (player.buttPregnancyIncubation < 125 && player.buttPregnancyIncubation >= 75) {
                this.outx("<b>You've got the begginings of a small pot-belly.</b>");
            } else if (player.buttPregnancyIncubation >= 50) {
                this.outx(
                    "<b>The unmistakable bulge of pregnancy is visible in your tummy, yet it feels odd inside you - wrong somehow.</b>",
                );
            } else if (player.buttPregnancyIncubation >= 30) {
                this.outx(
                    "<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>",
                );
            } else {
                // Surely Benoit and Cotton deserve their place in this list
                if (
                    player.pregnancyType == PregnancyStore.PREGNANCY_IZMA ||
                    player.pregnancyType == PregnancyStore.PREGNANCY_MOUSE ||
                    player.pregnancyType == PregnancyStore.PREGNANCY_AMILY ||
                    player.pregnancyType == PregnancyStore.PREGNANCY_EMBER ||
                    player.pregnancyType == PregnancyStore.PREGNANCY_BENOIT ||
                    player.pregnancyType == PregnancyStore.PREGNANCY_COTTON ||
                    player.pregnancyType == PregnancyStore.PREGNANCY_URTA
                )
                    this.outx(
                        "\n<b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>",
                    );
                else if (player.pregnancyType != PregnancyStore.PREGNANCY_MARBLE)
                    this.outx(
                        "\n<b>Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.</b>",
                    );
                else
                    this.outx(
                        "\n<b>Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.</b>",
                    );
            }
        }
        // URTA PREG
        else if (player.pregnancyType == PregnancyStore.PREGNANCY_URTA) {
            if (player.pregnancyIncubation <= 432 && player.pregnancyIncubation > 360) {
                this.outx("<b>Your belly is larger than it used to be.</b>\n");
            }
            if (player.pregnancyIncubation <= 360 && player.pregnancyIncubation > 288) {
                this.outx(
                    "<b>Your belly is more noticably distended.   You're pretty sure it's Urta's.</b>",
                );
            }
            if (player.pregnancyIncubation <= 288 && player.pregnancyIncubation > 216) {
                this.outx(
                    "<b>The unmistakable bulge of pregnancy is visible in your tummy, and the baby within is kicking nowadays.</b>",
                );
            }
            if (player.pregnancyIncubation <= 216 && player.pregnancyIncubation > 144) {
                this.outx(
                    "<b>Your belly is large and very obviously pregnant to anyone who looks at you.  It's gotten heavy enough to be a pain to carry around all the time.</b>",
                );
            }
            if (player.pregnancyIncubation <= 144 && player.pregnancyIncubation > 72) {
                this.outx(
                    "<b>It would be impossible to conceal your growing pregnancy from anyone who glanced your way.  It's large and round, frequently moving.</b>",
                );
            }
            if (player.pregnancyIncubation <= 72 && player.pregnancyIncubation > 48) {
                this.outx(
                    "<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>",
                );
            }
            if (player.pregnancyIncubation <= 48) {
                this.outx(
                    "\n<b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>",
                );
            }
        } else if (player.buttPregnancyType == PregnancyStore.PREGNANCY_FROG_GIRL) {
            if (player.buttPregnancyIncubation >= 8)
                this.outx(
                    "<b>Your stomach is so full of frog eggs that you look about to birth at any moment, your belly wobbling and shaking with every step you take, packed with frog ovum.</b>",
                );
            else
                this.outx(
                    "<b>You're stuffed so full with eggs that your belly looks obscenely distended, huge and weighted with the gargantuan eggs crowding your gut. They make your gait a waddle and your gravid tummy wobble obscenely.</b>",
                );
        } else if (player.pregnancyType == PregnancyStore.PREGNANCY_FAERIE) {
            // Belly size remains constant throughout the pregnancy
            this.outx("<b>Your belly remains swollen like a watermelon. ");
            if (player.pregnancyIncubation <= 100)
                this.outx(
                    "It's full of liquid, though unlike a normal pregnancy the passenger you’re carrying is tiny.</b>",
                );
            else if (player.pregnancyIncubation <= 140)
                this.outx("It feels like it’s full of thick syrup or jelly.</b>");
            else this.outx("It still feels like there’s a solid ball inside your womb.</b>");
        } else {
            if (player.pregnancyIncubation <= 336 && player.pregnancyIncubation > 280) {
                this.outx("<b>Your belly is larger than it used to be.</b>");
            }
            if (player.pregnancyIncubation <= 280 && player.pregnancyIncubation > 216) {
                this.outx(
                    "<b>Your belly is more noticably distended.   You are probably pregnant.</b>",
                );
            }
            if (player.pregnancyIncubation <= 216 && player.pregnancyIncubation > 180) {
                this.outx("<b>The unmistakable bulge of pregnancy is visible in your tummy.</b>");
            }
            if (player.pregnancyIncubation <= 180 && player.pregnancyIncubation > 120) {
                this.outx(
                    "<b>Your belly is very obviously pregnant to anyone who looks at you.</b>",
                );
            }
            if (player.pregnancyIncubation <= 120 && player.pregnancyIncubation > 72) {
                this.outx(
                    "<b>It would be impossible to conceal your growing pregnancy from anyone who glanced your way.</b>",
                );
            }
            if (player.pregnancyIncubation <= 72 && player.pregnancyIncubation > 48) {
                this.outx(
                    "<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>",
                );
            }
            if (player.pregnancyIncubation <= 48) {
                // Surely Benoit and Cotton deserve their place in this list
                if (
                    player.pregnancyType == PregnancyStore.PREGNANCY_IZMA ||
                    player.pregnancyType == PregnancyStore.PREGNANCY_MOUSE ||
                    player.pregnancyType == PregnancyStore.PREGNANCY_AMILY ||
                    player.pregnancyType == PregnancyStore.PREGNANCY_EMBER ||
                    player.pregnancyType == PregnancyStore.PREGNANCY_BENOIT ||
                    player.pregnancyType == PregnancyStore.PREGNANCY_COTTON ||
                    player.pregnancyType == PregnancyStore.PREGNANCY_URTA
                )
                    this.outx(
                        "\n<b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>",
                    );
                else if (player.pregnancyType != PregnancyStore.PREGNANCY_MARBLE)
                    this.outx(
                        "\n<b>Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.</b>",
                    );
                else
                    this.outx(
                        "\n<b>Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.</b>",
                    );
            }
        }
        this.outx("\n");
    }
    this.outx("\n");
    if (player.gills)
        this.outx(
            "A pair of feathery gills are growing out just below your neck, spreading out horizontally and draping down your chest.  They allow you to stay in the water for quite a long time.  ",
        );
    // Chesticles..I mean bewbz.
    if (player.breastRows.length == 1) {
        this.outx(
            `You have ${this.num2Text(player.breastRows[temp].breasts)} ${this.breastDescript(
                temp,
            )}, each supporting `,
        );
        if (player.breastRows[0].nipplesPerBreast == 1)
            this.outx(
                `${this.num2Text(player.breastRows[temp].nipplesPerBreast)} ${
                    Math.floor(player.nippleLength * 10) / 10
                }-inch ${this.nippleDescript(temp)}.`,
            );
        else
            this.outx(
                `${this.num2Text(player.breastRows[temp].nipplesPerBreast)} ${
                    Math.floor(player.nippleLength * 10) / 10
                }-inch ${this.nippleDescript(temp)}s.`,
            );
        if (player.breastRows[0].milkFullness > 75)
            this.outx(
                `  Your ${this.breastDescript(
                    temp,
                )} are painful and sensitive from being so stuffed with milk.  You should release the pressure soon.`,
            );
        if (player.breastRows[0].breastRating >= 1)
            this.outx(`  You could easily fill a ${player.breastCup(temp)} bra.`);
        // Done with tits.  Move on.
        this.outx("\n");
    }
    // many rows
    else {
        this.outx(
            `You have ${this.num2Text(
                player.breastRows.length,
            )} rows of breasts, the topmost pair starting at your chest.\n`,
            false,
        );
        while (temp < player.breastRows.length) {
            if (temp == 0) this.outx("--Your uppermost rack houses ");
            if (temp == 1) this.outx("\n--The second row holds ");
            if (temp == 2) this.outx("\n--Your third row of breasts contains ");
            if (temp == 3) this.outx("\n--Your fourth set of tits cradles ");
            if (temp == 4) this.outx("\n--Your fifth and final mammory grouping swells with ");
            this.outx(
                `${this.num2Text(player.breastRows[temp].breasts)} ${this.breastDescript(
                    temp,
                )} with `,
            );
            if (player.breastRows[temp].nipplesPerBreast == 1)
                this.outx(
                    `${this.num2Text(player.breastRows[temp].nipplesPerBreast)} ${
                        Math.floor(player.nippleLength * 10) / 10
                    }-inch ${this.nippleDescript(temp)} each.`,
                );
            else
                this.outx(
                    `${this.num2Text(player.breastRows[temp].nipplesPerBreast)} ${
                        Math.floor(player.nippleLength * 10) / 10
                    }-inch ${this.nippleDescript(temp)}s each.`,
                );
            if (player.breastRows[temp].breastRating >= 1)
                this.outx(`  They could easily fill a ${player.breastCup(temp)} bra.`);
            if (player.breastRows[temp].milkFullness > 75)
                this.outx(
                    `  Your ${this.breastDescript(
                        temp,
                    )} are painful and sensitive from being so stuffed with milk.  You should release the pressure soon.`,
                );
            temp++;
        }
        // Done with tits.  Move on.
        this.outx("\n");
    }
    // Crotchial stuff - mention snake
    if (player.lowerBody == CoC.LOWER_BODY_TYPE_NAGA && player.gender > 0) {
        this.outx("\nYour sex");
        if (player.gender == 3 || player.totalCocks() > 1) this.outx("es are ");
        else this.outx(" is ");
        this.outx(
            "concealed within a cavity in your tail when not in use, though when the need arises, you can part your concealing slit and reveal your true self.\n",
        );
    }
    // Cock stuff!
    temp = 0;
    if (player.cocks.length == 1) {
        if (player.lowerBody == CoC.LOWER_BODY_TYPE_CENTAUR)
            this.outx(
                "\nEver since becoming a centaur, your equipment has shifted to lie between your rear legs, like a horse.",
            );
        this.outx(
            `\nYour ${player.cockDescript(temp)} is ${
                Math.floor(10 * player.cocks[temp].cockLength) / 10
            } inches long and `,
            false,
        );
        if (Math.round(10 * player.cocks[temp].cockThickness) / 10 < 2) {
            if (Math.round(10 * player.cocks[temp].cockThickness) / 10 == 1)
                this.outx(`${Math.floor(10 * player.cocks[temp].cockThickness) / 10} inch thick.`);
            else
                this.outx(
                    `${Math.round(10 * player.cocks[temp].cockThickness) / 10} inches thick.`,
                );
        } else
            this.outx(
                `${this.num2Text(
                    Math.round(10 * player.cocks[temp].cockThickness) / 10,
                )} inches wide.`,
            );
        // Horsecock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.HORSE) {
            this.outx(
                "  It's mottled black and brown in a very animalistic pattern.  The 'head' of your shaft flares proudly, just like a horse's.",
            );
        }
        // dog cock flavor
        if (
            player.cocks[temp].cockType == CockTypesEnum.DOG ||
            player.cocks[temp].cockType == CockTypesEnum.FOX ||
            player.cocks[temp].cockType == CockTypesEnum.FOX
        ) {
            if (player.cocks[temp].knotMultiplier >= 1.8)
                this.outx(
                    `  The obscenely swollen lump of flesh near the base of your ${player.cockDescript(
                        temp,
                    )} looks almost too big for your cock.`,
                );
            else if (player.cocks[temp].knotMultiplier >= 1.4)
                this.outx(
                    `  A large bulge of flesh nestles just above the bottom of your ${player.cockDescript(
                        temp,
                    )}, to ensure it stays where it belongs during mating.`,
                );
            else if (player.cocks[temp].knotMultiplier > 1)
                this.outx(
                    `  A small knot of thicker flesh is near the base of your ${player.cockDescript(
                        temp,
                    )}, ready to expand to help you lodge it inside a female.`,
                );
            // List thickness
            this.outx(
                `  The knot is ${
                    Math.round(
                        player.cocks[temp].cockThickness * player.cocks[temp].knotMultiplier * 10,
                    ) / 10
                } inches wide when at full size.`,
            );
        }
        // Demon cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.DEMON) {
            this.outx(
                "  The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused.  The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.",
            );
        }
        // Tentacle cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.TENTACLE) {
            this.outx(
                "  The entirety of its green surface is covered in perspiring beads of slick moisture.  It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.",
            );
        }
        // Cat cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.CAT) {
            this.outx(
                "  It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip.  Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.",
            );
        }
        // Snake cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.LIZARD) {
            this.outx(
                "  It's a deep, iridescent purple in color.  Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.",
            );
        }
        // Anemone cock flavor
        if (player.cocks[temp].cockType == CockTypesEnum.ANEMONE) {
            this.outx(
                "  The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload.  At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.",
            );
        }
        // Kangawang flavor
        if (player.cocks[temp].cockType == CockTypesEnum.KANGAROO) {
            this.outx(
                "  It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.",
            );
        }
        // Draconic Cawk Flava flav
        if (player.cocks[temp].cockType == CockTypesEnum.DRAGON) {
            this.outx(
                "  With its tapered tip, there are few holes you wouldn't be able to get into.  It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.",
            );
        }
        if (player.cocks[temp].cockType == CockTypesEnum.BEE) {
            this.outx(
                "  It's a long, smooth black shaft that's rigid to the touch.  Its base is ringed with a layer of four inch long soft bee hair.  The tip has a much finer layer of short yellow hairs.  The tip is very sensitive, and it hurts constantly if you don’t have bee honey on it.",
            );
        }
        // Worm flavor
        if (player.findStatusAffect(StatusAffects.Infested) >= 0)
            this.outx(
                `  Every now and again a slimy worm coated in spunk slips partway out of your ${player.cockDescript(
                    0,
                )}, tasting the air like a snake's tongue.`,
            );
        if (player.cocks[temp].sock) this.sockDescript(temp);
        // DONE WITH COCKS, moving on!
        this.outx("\n");
    }
    if (player.cocks.length > 1) {
        temp = 0;
        rando = this.rand(4);
        if (player.lowerBody == CoC.LOWER_BODY_TYPE_CENTAUR)
            this.outx(
                `\nWhere a horse's penis would usually be located, you have instead grown ${player.multiCockDescript()}!\n`,
                false,
            );
        else
            this.outx(
                `\nWhere a penis would normally be located, you have instead grown ${player.multiCockDescript()}!\n`,
                false,
            );
        while (temp < player.cocks.length) {
            // middle cock description
            if (rando == 0) {
                if (temp == 0) this.outx("--Your first ");
                else this.outx("--Your next ");
                this.outx(player.cockDescript(temp), false);
                this.outx(" is ");
                this.outx(
                    `${Math.floor(10 * player.cocks[temp].cockLength) / 10} inches long and `,
                );
                if (Math.floor(player.cocks[temp].cockThickness) >= 2)
                    this.outx(
                        `${this.num2Text(
                            Math.round(player.cocks[temp].cockThickness * 10) / 10,
                        )} inches wide.`,
                    );
                else {
                    if (player.cocks[temp].cockThickness == 1) this.outx("one inch wide.");
                    else
                        this.outx(
                            `${
                                Math.round(player.cocks[temp].cockThickness * 10) / 10
                            } inches wide.`,
                        );
                }
            }
            if (rando == 1) {
                this.outx("--One of your ");
                this.outx(
                    `${player.cockDescript(temp)}s is ${
                        Math.round(10 * player.cocks[temp].cockLength) / 10
                    } inches long and `,
                );
                if (Math.floor(player.cocks[temp].cockThickness) >= 2)
                    this.outx(
                        `${this.num2Text(
                            Math.round(player.cocks[temp].cockThickness * 10) / 10,
                        )} inches thick.`,
                    );
                else {
                    if (player.cocks[temp].cockThickness == 1) this.outx("one inch thick.");
                    else
                        this.outx(
                            `${
                                Math.round(player.cocks[temp].cockThickness * 10) / 10
                            } inches thick.`,
                        );
                }
            }
            if (rando == 2) {
                if (temp > 0) this.outx("--Another of your ");
                else this.outx("--One of your ");
                this.outx(
                    `${player.cockDescript(temp)}s is ${
                        Math.round(10 * player.cocks[temp].cockLength) / 10
                    } inches long and `,
                );
                if (Math.floor(player.cocks[temp].cockThickness) >= 2)
                    this.outx(
                        `${this.num2Text(
                            Math.round(player.cocks[temp].cockThickness * 10) / 10,
                        )} inches thick.`,
                    );
                else {
                    if (player.cocks[temp].cockThickness == 1) this.outx("one inch thick.");
                    else
                        this.outx(
                            `${
                                Math.round(player.cocks[temp].cockThickness * 10) / 10
                            } inches thick.`,
                        );
                }
            }
            if (rando == 3) {
                if (temp > 0) this.outx("--Your next ");
                else this.outx("--Your first ");
                this.outx(
                    `${player.cockDescript(temp)} is ${
                        Math.round(10 * player.cocks[temp].cockLength) / 10
                    } inches long and `,
                );
                if (Math.floor(player.cocks[temp].cockThickness) >= 2)
                    this.outx(
                        `${this.num2Text(
                            Math.round(player.cocks[temp].cockThickness * 10) / 10,
                        )} inches in diameter.`,
                    );
                else {
                    if (Math.round(player.cocks[temp].cockThickness * 10) / 10 == 1)
                        this.outx("one inch in diameter.");
                    else
                        this.outx(
                            `${
                                Math.round(player.cocks[temp].cockThickness * 10) / 10
                            } inches in diameter.`,
                        );
                }
            }
            // horse cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.HORSE) {
                this.outx(
                    `  It's mottled black and brown in a very animalistic pattern.  The 'head' of your ${player.cockDescript(
                        temp,
                    )} flares proudly, just like a horse's.`,
                );
            }
            // dog cock flavor
            if (
                player.cocks[temp].cockType == CockTypesEnum.DOG ||
                player.cocks[temp].cockType == CockTypesEnum.FOX
            ) {
                this.outx("  It is shiny, pointed, and covered in veins, just like a large ");
                if (player.cocks[temp].cockType == CockTypesEnum.DOG) this.outx("dog's cock.");
                else this.outx("fox's cock.");

                if (player.cocks[temp].knotMultiplier >= 1.8)
                    this.outx(
                        `  The obscenely swollen lump of flesh near the base of your ${player.cockDescript(
                            temp,
                        )} looks almost comically mismatched for your ${player.cockDescript(
                            temp,
                        )}.`,
                    );
                else if (player.cocks[temp].knotMultiplier >= 1.4)
                    this.outx(
                        `  A large bulge of flesh nestles just above the bottom of your ${player.cockDescript(
                            temp,
                        )}, to ensure it stays where it belongs during mating.`,
                    );
                else if (player.cocks[temp].knotMultiplier > 1)
                    this.outx(
                        `  A small knot of thicker flesh is near the base of your ${player.cockDescript(
                            temp,
                        )}, ready to expand to help you lodge your ${player.cockDescript(
                            temp,
                        )} inside a female.`,
                    );
                // List knot thickness
                this.outx(
                    `  The knot is ${
                        Math.floor(
                            player.cocks[temp].cockThickness *
                                player.cocks[temp].knotMultiplier *
                                10,
                        ) / 10
                    } inches thick when at full size.`,
                );
            }
            // Demon cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.DEMON) {
                this.outx(
                    "  The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused.  The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.",
                );
            }
            // Tentacle cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.TENTACLE) {
                this.outx(
                    "  The entirety of its green surface is covered in perspiring beads of slick moisture.  It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.",
                );
            }
            // Cat cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.CAT) {
                this.outx(
                    "  It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip.  Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.",
                );
            }
            // Snake cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.LIZARD) {
                this.outx(
                    "  It's a deep, iridescent purple in color.  Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.",
                );
            }
            // Anemone cock flavor
            if (player.cocks[temp].cockType == CockTypesEnum.ANEMONE) {
                this.outx(
                    "  The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload.  At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.",
                );
            }
            // Kangwang flavor
            if (player.cocks[temp].cockType == CockTypesEnum.KANGAROO) {
                this.outx(
                    "  It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.",
                );
            }
            // Draconic Cawk Flava flav
            if (player.cocks[temp].cockType == CockTypesEnum.DRAGON) {
                this.outx(
                    "  With its tapered tip, there are few holes you wouldn't be able to get into.  It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.",
                );
            }
            if (player.cocks[temp].sock != "" && player.cocks[temp].sock != undefined) {
                // I dunno what was happening, but it looks like .sock is undefined, as it doesn't exist. I guess this is probably more left over from some of the restucturing.
                // Anyways, check against undefined values, and stuff works again.
                trace("Found a sock description (WTF even is a sock?)", player.cocks[temp].sock);
                this.sockDescript(temp);
            }
            temp++;
            rando++;
            this.outx("\n");
            if (rando > 3) rando = 0;
        }
        // Worm flavor
        if (player.findStatusAffect(StatusAffects.Infested) >= 0)
            this.outx(
                `Every now and again slimy worms coated in spunk slip partway out of your ${player.multiCockDescriptLight()}, tasting the air like tongues of snakes.\n`,
                false,
            );
        // DONE WITH COCKS, moving on!
    }
    // Of Balls and Sacks!
    if (player.balls > 0) {
        if (player.findStatusAffect(StatusAffects.Uniball) >= 0) {
            if (player.skinType != CoC.SKIN_TYPE_GOO)
                this.outx(
                    `Your [sack] clings tightly to your groin, holding ${this.ballsDescript()} snugly against you.`,
                );
            else if (player.skinType == CoC.SKIN_TYPE_GOO)
                this.outx(
                    `Your [sack] clings tightly to your groin, dripping and holding ${this.ballsDescript()} snugly against you.`,
                );
        } else if (player.cockTotal() == 0) {
            if (player.skinType == CoC.SKIN_TYPE_PLAIN)
                this.outx(
                    `A ${this.sackDescript()} with ${this.ballsDescript()} swings heavily under where a penis would normally grow.`,
                );
            if (player.skinType == CoC.SKIN_TYPE_FUR)
                this.outx(
                    `A fuzzy ${this.sackDescript()} filled with ${this.ballsDescript()} swings low under where a penis would normally grow.`,
                );
            if (player.skinType == CoC.SKIN_TYPE_SCALES)
                this.outx(
                    `A scaley ${this.sackDescript()} hugs your ${this.ballsDescript()} tightly against your body.`,
                );
            if (player.skinType == CoC.SKIN_TYPE_GOO)
                this.outx(
                    `An oozing, semi-solid sack with ${this.ballsDescript()} swings heavily under where a penis would normally grow.`,
                );
        } else {
            if (player.skinType == CoC.SKIN_TYPE_PLAIN)
                this.outx(
                    `A ${this.sackDescript()} with ${this.ballsDescript()} swings heavily beneath your ${player.multiCockDescriptLight()}.`,
                );
            if (player.skinType == CoC.SKIN_TYPE_FUR)
                this.outx(
                    `A fuzzy ${this.sackDescript()} filled with ${this.ballsDescript()} swings low under your ${player.multiCockDescriptLight()}.`,
                );
            if (player.skinType == CoC.SKIN_TYPE_SCALES)
                this.outx(
                    `A scaley ${this.sackDescript()} hugs your ${this.ballsDescript()} tightly against your body.`,
                );
            if (player.skinType == CoC.SKIN_TYPE_GOO)
                this.outx(
                    `An oozing, semi-solid sack with ${this.ballsDescript()} swings heavily beneath your ${player.multiCockDescriptLight()}.`,
                );
        }
        this.outx(
            `  You estimate each of them to be about ${this.num2Text(
                Math.round(player.ballSize),
            )} `,
        );
        if (Math.round(player.ballSize) == 1) this.outx("inch");
        else this.outx("inches");
        this.outx(" across.\n");
    }
    // VAGOOZ
    if (player.vaginas.length > 0) {
        if (player.gender == 2 && player.lowerBody == CoC.LOWER_BODY_TYPE_CENTAUR)
            this.outx(
                "\nEver since becoming a centaur, your womanly parts have shifted to lie between your rear legs, in a rather equine fashion.",
            );
        this.outx("\n");
        if (player.vaginas.length == 1)
            this.outx(
                `You have a ${this.vaginaDescript(0)}, with a ${
                    Math.floor(player.clitLength * 10) / 10
                }-inch clit`,
            );
        if (player.vaginas[0].virgin) this.outx(" and an intact hymen");
        this.outx(".  ");
        if (player.vaginas.length > 1)
            this.outx(
                `You have ${player.vaginas.length} ${this.vaginaDescript(0)}s, with ${
                    Math.floor(player.clitLength * 10) / 10
                }-inch clits each.  `,
            );
        if (player.lib < 50 && player.lust < 50) {
            // not particularly horny

            // Wetness
            if (
                player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_WET &&
                player.vaginas[0].vaginalWetness < CoC.VAGINA_WETNESS_DROOLING
            )
                this.outx("Moisture gleams in ");
            if (player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_DROOLING) {
                this.outx("Occasional beads of ");
                this.outx("lubricant drip from ");
            }
            // Different description based on vag looseness
            if (player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_WET) {
                if (player.vaginas[0].vaginalLooseness < CoC.VAGINA_LOOSENESS_LOOSE)
                    this.outx(`your ${this.vaginaDescript(0)}. `);
                if (
                    player.vaginas[0].vaginalLooseness >= CoC.VAGINA_LOOSENESS_LOOSE &&
                    player.vaginas[0].vaginalLooseness < CoC.VAGINA_LOOSENESS_GAPING_WIDE
                )
                    this.outx(`your ${this.vaginaDescript(0)}, its lips slightly parted. `);
                if (player.vaginas[0].vaginalLooseness >= CoC.VAGINA_LOOSENESS_GAPING_WIDE)
                    this.outx(`the massive hole that is your ${this.vaginaDescript(0)}.  `);
            }
        }
        if ((player.lib >= 50 || player.lust >= 50) && player.lib < 80 && player.lust < 80) {
            // kinda horny

            // Wetness
            if (player.vaginas[0].vaginalWetness < CoC.VAGINA_WETNESS_WET)
                this.outx("Moisture gleams in ");
            if (
                player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_WET &&
                player.vaginas[0].vaginalWetness < CoC.VAGINA_WETNESS_DROOLING
            ) {
                this.outx("Occasional beads of ");
                this.outx("lubricant drip from ");
            }
            if (player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_DROOLING) {
                this.outx("Thin streams of ");
                this.outx("lubricant occasionally dribble from ");
            }
            // Different description based on vag looseness
            if (player.vaginas[0].vaginalLooseness < CoC.VAGINA_LOOSENESS_LOOSE)
                this.outx(`your ${this.vaginaDescript(0)}. `);
            if (
                player.vaginas[0].vaginalLooseness >= CoC.VAGINA_LOOSENESS_LOOSE &&
                player.vaginas[0].vaginalLooseness < CoC.VAGINA_LOOSENESS_GAPING_WIDE
            )
                this.outx(`your ${this.vaginaDescript(0)}, its lips slightly parted. `);
            if (player.vaginas[0].vaginalLooseness >= CoC.VAGINA_LOOSENESS_GAPING_WIDE)
                this.outx(`the massive hole that is your ${this.vaginaDescript(0)}.  `);
        }
        if (player.lib > 80 || player.lust > 80) {
            // WTF horny!

            // Wetness
            if (player.vaginas[0].vaginalWetness < CoC.VAGINA_WETNESS_WET) {
                this.outx("Occasional beads of ");
                this.outx("lubricant drip from ");
            }
            if (
                player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_WET &&
                player.vaginas[0].vaginalWetness < CoC.VAGINA_WETNESS_DROOLING
            ) {
                this.outx("Thin streams of ");
                this.outx("lubricant occasionally dribble from ");
            }
            if (player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_DROOLING) {
                this.outx("Thick streams of ");
                this.outx("lubricant drool constantly from ");
            }
            // Different description based on vag looseness
            if (player.vaginas[0].vaginalLooseness < CoC.VAGINA_LOOSENESS_LOOSE)
                this.outx(`your ${this.vaginaDescript(0)}. `);
            if (
                player.vaginas[0].vaginalLooseness >= CoC.VAGINA_LOOSENESS_LOOSE &&
                player.vaginas[0].vaginalLooseness < CoC.VAGINA_LOOSENESS_GAPING_WIDE
            )
                this.outx(`your ${this.vaginaDescript(0)}, its lips slightly parted. `);
            if (player.vaginas[0].vaginalLooseness >= CoC.VAGINA_LOOSENESS_GAPING_WIDE)
                this.outx("the massive hole that is your cunt.  ");
        }
        // Line Drop for next descript!
        this.outx("\n");
    }
    // Genderless lovun'
    if (player.cockTotal() == 0 && player.vaginas.length == 0)
        this.outx("\nYou have a curious lack of any sexual endowments.\n");

    // BUNGHOLIO
    if (player.ass) {
        this.outx("\n");
        this.outx(
            `You have one ${this.assholeDescript()}, placed between your butt-cheeks where it belongs.\n`,
            false,
        );
    }
    // Piercings!
    if (player.eyebrowPierced > 0)
        this.outx(
            `\nA solitary ${player.eyebrowPShort} adorns your eyebrow, looking very stylish.`,
            false,
        );
    if (player.earsPierced > 0)
        this.outx(`\nYour ears are pierced with ${player.earsPShort}.`, false);
    if (player.nosePierced > 0)
        this.outx(`\nA ${player.nosePShort} dangles from your nose.`, false);
    if (player.lipPierced > 0)
        this.outx(`\nShining on your lip, a ${player.lipPShort} is plainly visible.`, false);
    if (player.tonguePierced > 0)
        this.outx(
            `\nThough not visible, you can plainly feel your ${player.tonguePShort} secured in your tongue.`,
            false,
        );
    if (player.nipplesPierced == 3)
        this.outx(
            `\nYour ${this.nippleDescript(0)}s ache and tingle with every step, as your heavy ${
                player.nipplesPShort
            } swings back and forth.`,
            false,
        );
    else if (player.nipplesPierced > 0)
        this.outx(
            `\nYour ${this.nippleDescript(0)}s are pierced with ${player.nipplesPShort}.`,
            false,
        );
    if (player.totalCocks() > 0) {
        if (player.cocks[0].pierced > 0) {
            this.outx(
                `\nLooking positively perverse, a ${
                    player.cocks[0].pShortDesc
                } adorns your ${player.cockDescript(0)}.`,
                false,
            );
        }
    }
    if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00286] == 1)
        this.outx(
            "\nA magical, ruby-studded bar pierces your belly button, allowing you to summon Ceraph on a whim.",
        );
    if (player.hasVagina()) {
        if (player.vaginas[0].labiaPierced > 0)
            this.outx(
                `\nYour ${this.vaginaDescript(0)} glitters with the ${
                    player.vaginas[0].labiaPShort
                } hanging from your lips.`,
                false,
            );
        if (player.vaginas[0].clitPierced > 0)
            this.outx(
                `\nImpossible to ignore, your ${this.clitDescript()} glitters with its ${
                    player.vaginas[0].clitPShort
                }.`,
                false,
            );
    }
    // MONEY!
    if (player.gems == 0) this.outx("\n\n<b>Your money-purse is devoid of any currency.");
    if (player.gems > 1)
        this.outx(`\n\n<b>You have ${player.gems} shining gems, collected in your travels.`, false);
    if (player.gems == 1)
        this.outx(`\n\n<b>You have ${player.gems} shining gem, collected in your travels.`, false);
    this.mainView.setOutputText(this.currentText);

    this.flushOutputTextToGUI();
}

export function sockDescript(this: CoC, index: number): void {
    const { player } = this;
    this.outx("  ");

    if (player.cocks[index].sock == "wool")
        this.outx(
            "It's covered by a wooly white cock-sock, keeping it snug and warm despite how cold it might get.",
        );
    else if (player.cocks[index].sock == "alabaster")
        this.outx(
            "It's covered by a white, lacey cock-sock, snugly wrapping around it like a bridal dress around a bride.",
        );
    else if (player.cocks[index].sock == "cockring")
        this.outx(
            "It's covered by a black latex cock-sock with two attached metal rings, keeping your cock just a little harder and [balls] aching for release.",
        );
    else if (player.cocks[index].sock == "viridian")
        this.outx(
            "It's covered by a lacey dark green cock-sock accented with red rose-like patterns.  Just wearing it makes your body, especially your cock, tingle.",
        );
    else if (player.cocks[index].sock == "scarlet")
        this.outx(
            "It's covered by a lacey red cock-sock that clings tightly to your member.  Just wearing it makes your cock throb, as if it yearns to be larger...",
        );
    else if (player.cocks[index].sock == "cobalt")
        this.outx(
            "It's covered by a lacey blue cock-sock that clings tightly to your member... really tightly.  It's so tight it's almost uncomfortable, and you wonder if any growth might be inhibited.",
        );
    else if (player.cocks[index].sock == "gilded")
        this.outx(
            "It's covered by a metallic gold cock-sock that clings tightly to you, its surface covered in glittering gems.  Despite the warmth of your body, the cock-sock remains cool.",
        );
    else if (player.cocks[index].sock == "amaranthine") {
        this.outx("It's covered by a lacey purple cock-sock");
        if (player.cocks[index].cockType != CockTypesEnum.DISPLACER)
            this.outx(" that fits somewhat awkwardly on your member");
        else this.outx(" that fits your coeurl cock perfectly");
        this.outx(".  Just wearing it makes you feel stronger and more powerful.");
    } else this.outx("<b>Yo, this is an error.</b>");
}
