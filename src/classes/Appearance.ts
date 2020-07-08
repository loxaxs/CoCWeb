import { Utils } from "./internals/Utils";
import { Creature } from "./Creature";
import { Character } from "./Character";
import { CocSettings } from "./CocSettings";
import { StatusAffects } from "./StatusAffects";
import { CockTypesEnum, CockTypesGroup } from "./CockTypesEnum";
import { CoC } from "./CoC";
import { trace } from "../console";
import {
    ANAL_WETNESS_DRY,
    ANAL_WETNESS_NORMAL,
    ANAL_WETNESS_MOIST,
    ANAL_WETNESS_SLIMY,
    ANAL_WETNESS_DROOLING,
    ANAL_WETNESS_SLIME_DROOLING,
    ANAL_LOOSENESS_VIRGIN,
    ANAL_LOOSENESS_TIGHT,
    ANAL_LOOSENESS_NORMAL,
    ANAL_LOOSENESS_LOOSE,
    ANAL_LOOSENESS_STRETCHED,
    ANAL_LOOSENESS_GAPING,
    GENDER_NONE,
    GENDER_MALE,
    GENDER_FEMALE,
    GENDER_HERM,
    SKIN_TYPE_PLAIN,
    SKIN_TYPE_FUR,
    SKIN_TYPE_SCALES,
    SKIN_TYPE_GOO,
    SKIN_TYPE_UNDEFINED,
    HAIR_NORMAL,
    HAIR_FEATHER,
    HAIR_GHOST,
    HAIR_GOO,
    HAIR_ANEMONE,
    FACE_HUMAN,
    FACE_HORSE,
    FACE_DOG,
    FACE_COW_MINOTAUR,
    FACE_SHARK_TEETH,
    FACE_SNAKE_FANGS,
    FACE_CAT,
    FACE_LIZARD,
    FACE_BUNNY,
    FACE_KANGAROO,
    FACE_SPIDER_FANGS,
    FACE_FOX,
    FACE_DRAGON,
    FACE_RACCOON_MASK,
    FACE_RACCOON,
    FACE_BUCKTEETH,
    FACE_MOUSE,
    TONUGE_HUMAN,
    TONUGE_SNAKE,
    TONUGE_DEMONIC,
    TONUGE_DRACONIC,
    EYES_HUMAN,
    EYES_FOUR_SPIDER_EYES,
    EYES_BLACK_EYES_SAND_TRAP,
    EARS_HUMAN,
    EARS_HORSE,
    EARS_DOG,
    EARS_COW,
    EARS_ELFIN,
    EARS_CAT,
    EARS_LIZARD,
    EARS_BUNNY,
    EARS_KANGAROO,
    EARS_FOX,
    EARS_DRAGON,
    EARS_RACCOON,
    EARS_MOUSE,
    HORNS_NONE,
    HORNS_DEMON,
    HORNS_COW_MINOTAUR,
    HORNS_DRACONIC_X2,
    HORNS_DRACONIC_X4_12_INCH_LONG,
    HORNS_ANTLERS,
    ANTENNAE_NONE,
    ANTENNAE_BEE,
    ARM_TYPE_HUMAN,
    ARM_TYPE_HARPY,
    ARM_TYPE_SPIDER,
    TAIL_TYPE_NONE,
    TAIL_TYPE_HORSE,
    TAIL_TYPE_DOG,
    TAIL_TYPE_DEMONIC,
    TAIL_TYPE_COW,
    TAIL_TYPE_SPIDER_ADBOMEN,
    TAIL_TYPE_BEE_ABDOMEN,
    TAIL_TYPE_SHARK,
    TAIL_TYPE_CAT,
    TAIL_TYPE_LIZARD,
    TAIL_TYPE_RABBIT,
    TAIL_TYPE_HARPY,
    TAIL_TYPE_KANGAROO,
    TAIL_TYPE_FOX,
    TAIL_TYPE_DRACONIC,
    TAIL_TYPE_RACCOON,
    TAIL_TYPE_MOUSE,
    WING_TYPE_NONE,
    WING_TYPE_BEE_LIKE_SMALL,
    WING_TYPE_BEE_LIKE_LARGE,
    WING_TYPE_HARPY,
    WING_TYPE_IMP,
    WING_TYPE_BAT_LIKE_TINY,
    WING_TYPE_BAT_LIKE_LARGE,
    WING_TYPE_SHARK_FIN,
    WING_TYPE_FEATHERED_LARGE,
    WING_TYPE_DRACONIC_SMALL,
    WING_TYPE_DRACONIC_LARGE,
    WING_TYPE_GIANT_DRAGONFLY,
    LOWER_BODY_TYPE_HUMAN,
    LOWER_BODY_TYPE_HOOFED,
    LOWER_BODY_TYPE_DOG,
    LOWER_BODY_TYPE_NAGA,
    LOWER_BODY_TYPE_CENTAUR,
    LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS,
    LOWER_BODY_TYPE_DEMONIC_CLAWS,
    LOWER_BODY_TYPE_BEE,
    LOWER_BODY_TYPE_GOO,
    LOWER_BODY_TYPE_CAT,
    LOWER_BODY_TYPE_LIZARD,
    LOWER_BODY_TYPE_PONY,
    LOWER_BODY_TYPE_BUNNY,
    LOWER_BODY_TYPE_HARPY,
    LOWER_BODY_TYPE_KANGAROO,
    LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS,
    LOWER_BODY_TYPE_DRIDER_LOWER_BODY,
    LOWER_BODY_TYPE_FOX,
    LOWER_BODY_TYPE_DRAGON,
    LOWER_BODY_TYPE_RACCOON,
    PIERCING_TYPE_NONE,
    PIERCING_TYPE_STUD,
    PIERCING_TYPE_RING,
    PIERCING_TYPE_LADDER,
    PIERCING_TYPE_HOOP,
    PIERCING_TYPE_CHAIN,
    VAGINA_TYPE_HUMAN,
    VAGINA_TYPE_BLACK_SAND_TRAP,
    VAGINA_WETNESS_DRY,
    VAGINA_WETNESS_NORMAL,
    VAGINA_WETNESS_WET,
    VAGINA_WETNESS_SLICK,
    VAGINA_WETNESS_DROOLING,
    VAGINA_WETNESS_SLAVERING,
    VAGINA_LOOSENESS_TIGHT,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_LOOSENESS_GAPING,
    VAGINA_LOOSENESS_GAPING_WIDE,
    VAGINA_LOOSENESS_LEVEL_CLOWN_CAR,
    HIP_RATING_BOYISH,
    HIP_RATING_SLENDER,
    HIP_RATING_AVERAGE,
    HIP_RATING_AMPLE,
    HIP_RATING_CURVY,
    HIP_RATING_FERTILE,
    HIP_RATING_INHUMANLY_WIDE,
    BUTT_RATING_BUTTLESS,
    BUTT_RATING_TIGHT,
    BUTT_RATING_AVERAGE,
    BUTT_RATING_NOTICEABLE,
    BUTT_RATING_LARGE,
    BUTT_RATING_JIGGLY,
    BUTT_RATING_EXPANSIVE,
    BUTT_RATING_HUGE,
    BUTT_RATING_INCONCEIVABLY_BIG,
} from "../includes/appearanceDefs";

export class Appearance extends Utils {
    // Eventually, this should contain the entire char appearance.
    // At the moment, it's pretty piecemeal.
    // TODO remove when we have proper enums for this
    // include "../../includes/appearanceDefs.as";

    public static inverseMap(x: Record<string, any>): Record<string, any> {
        const result: Record<string, any> = {};
        for (const i of Object.keys(x)) {
            result[String(x[i])] = i;
        }
        return result;
    }

    public static hairOrFur(iCreature: Creature): string {
        if (iCreature.skinType == 1) return "fur";
        else return "hair";
    }

    public static hairDescription(iCreature: Creature): string {
        let description = "";
        let options: string[];
        //
        // LENGTH ADJECTIVE!
        //
        if (iCreature.hairLength == 0) {
            options = ["shaved", "bald", "smooth", "hairless", "glabrous"];
            description = `${Appearance.randomChoice(options)} head`;
            return description;
        }
        if (iCreature.hairLength < 1) {
            options = ["close-cropped, ", "trim, ", "very short, "];
            description += Appearance.randomChoice(options);
        }
        if (iCreature.hairLength >= 1 && iCreature.hairLength < 3) description += "short, ";
        if (iCreature.hairLength >= 3 && iCreature.hairLength < 6) description += "shaggy, ";
        if (iCreature.hairLength >= 6 && iCreature.hairLength < 10)
            description += "moderately long, ";
        if (iCreature.hairLength >= 10 && iCreature.hairLength < 16) {
            if (Appearance.rand(2) == 0) description += "long, ";
            else description += "shoulder-length, ";
        }
        if (iCreature.hairLength >= 16 && iCreature.hairLength < 26) {
            if (Appearance.rand(2) == 0) description += "very long, ";
            else description += "flowing locks of ";
        }
        if (iCreature.hairLength >= 26 && iCreature.hairLength < 40) description += "ass-length, ";
        if (iCreature.hairLength >= 40 && iCreature.hairLength < iCreature.tallness)
            description += "obscenely long, ";
        else if (iCreature.hairLength >= iCreature.tallness) {
            if (Appearance.rand(2) == 0) description += "floor-length, ";
            else description += "floor-dragging, ";
        }
        //
        // COLORS
        //
        description += `${iCreature.hairColor} `;
        //
        // HAIR WORDS
        //
        // If furry and longish hair sometimes call it a mane (50%)
        if (iCreature.skinType == 1 && iCreature.hairLength > 3 && Appearance.rand(2) == 0) {
            if (iCreature.hairType == 1) description += "feather-";
            else if (iCreature.hairType == 2) description += "transparent ";
            else if (iCreature.hairType == 3) description += "goo-";
            else if (iCreature.hairType == 4) description += "tentacle-";
            description += "mane";
            return description;
        }
        // if medium length refer to as locks sometimes
        // CUT - locks is plural and screws up tense.
        // If nothing else used, use hair!
        if (iCreature.hairType == 1) description += "feather-";
        else if (iCreature.hairType == 2) description += "transparent ";
        else if (iCreature.hairType == 3) description += "goo-";
        else if (iCreature.hairType == 4) description += "tentacle-";
        description += "hair";

        return description;
    }

    /**
     * Describe tongue. Monsters don't have tongues, apparently.
     *
     * @param    iCharacter Either Player or NonPlayer
     * @return    A beautiful description of a tongue.
     */
    public static tongueDescription(iCharacter: Character): string {
        if (iCharacter.tongueType == 1) return "serpentine tongue";
        else if (iCharacter.tongueType == 2) return "demonic tongue";
        else if (iCharacter.tongueType == 3) return "draconic tongue";
        else return "tongue";
    }

    public static nippleDescription(iCreature: Creature, iRowNum: number): string {
        // DEBUG SHIT!
        if (iRowNum > iCreature.breastRows.length - 1) {
            CocSettings.error(
                `<B>Error: Invalid breastRows (${iRowNum}) passed to nippleDescription()</b>`,
            );
            return `<B>Error: Invalid breastRows (${iRowNum}) passed to nippleDescription()</b>`;
        }
        if (iRowNum < 0) {
            CocSettings.error(
                `<B>Error: Invalid breastRows (${iRowNum}) passed to nippleDescription()</b>`,
            );
            return `<B>Error: Invalid breastRows (${iRowNum}) passed to nippleDescription()</b>`;
        }
        let haveDescription = false;
        let description = "";
        let options: string[];
                // Size descriptors 33% chance
        if (Appearance.rand(4) == 0) {
            // TINAHHHH
            if (iCreature.nippleLength < 0.25) {
                options = ["tiny ", "itty-bitty ", "teeny-tiny ", "dainty "];
                description += Appearance.randomChoice(options);
            }
            // Prominant
            if (iCreature.nippleLength >= 0.4 && iCreature.nippleLength < 1) {
                options = [
                    "prominent ",
                    "pencil eraser-sized ",
                    "eye-catching ",
                    "pronounced ",
                    "striking ",
                ];
                description += Appearance.randomChoice(options);
            }
            // Big 'uns
            if (iCreature.nippleLength >= 1 && iCreature.nippleLength < 2) {
                options = ["forwards-jutting ", "over-sized ", "fleshy ", "large protruding "];
                description += Appearance.randomChoice(options);
            }
            // 'Uge
            if (iCreature.nippleLength >= 2 && iCreature.nippleLength < 3.2) {
                options = ["elongated ", "massive ", "awkward ", "lavish ", "hefty "];
                description += Appearance.randomChoice(options);
            }
            // Massive
            if (iCreature.nippleLength >= 3.2) {
                options = ["bulky ", "ponderous ", "thumb-sized ", "cock-sized ", "cow-like "];
                description += Appearance.randomChoice(options);
            }
            haveDescription = true;
        }
        // Milkiness/Arousal/Wetness Descriptors 33% of the time
        if (Appearance.rand(3) == 0 && !haveDescription) {
            // Fuckable chance first!
            if (iCreature.hasFuckableNipples()) {
                // Fuckable and lactating?
                if (iCreature.biggestLactation() > 1) {
                    options = [
                        "milk-lubricated ",
                        "lactating ",
                        "lactating ",
                        "milk-slicked ",
                        "milky ",
                    ];
                    description += Appearance.randomChoice(options);
                }
                // Just fuckable
                else {
                    options = [
                        "wet ",
                        "mutated ",
                        "slimy ",
                        "damp ",
                        "moist ",
                        "slippery ",
                        "oozing ",
                        "sloppy ",
                        "dewy ",
                    ];
                    description += Appearance.randomChoice(options);
                }
                haveDescription = true;
            }
            // Just lactating!
            else if (iCreature.biggestLactation() > 0) {
                // Light lactation
                if (iCreature.biggestLactation() <= 1) {
                    options = ["milk moistened ", "slightly lactating ", "milk-dampened "];
                    description += Appearance.randomChoice(options);
                }
                // Moderate lactation
                if (iCreature.biggestLactation() > 1 && iCreature.biggestLactation() <= 2) {
                    options = ["lactating ", "milky ", "milk-seeping "];
                    description += Appearance.randomChoice(options);
                }
                // Heavy lactation
                if (iCreature.biggestLactation() > 2) {
                    options = ["dripping ", "dribbling ", "milk-leaking ", "drooling "];
                    description += Appearance.randomChoice(options);
                }
                haveDescription = true;
            }
        }
        // Possible arousal descriptors
        else if (Appearance.rand(3) == 0 && !haveDescription) {
            if (iCreature.lust > 50 && iCreature.lust < 75) {
                options = ["erect ", "perky ", "erect ", "firm ", "tender "];
                description += Appearance.randomChoice(options);
                haveDescription = true;
            }
            if (iCreature.lust >= 75) {
                options = ["throbbing ", "trembling ", "needy ", "throbbing "];
                description += Appearance.randomChoice(options);
                haveDescription = true;
            }
        }
        if (
            !haveDescription &&
            Appearance.rand(2) == 0 &&
            iCreature.nipplesPierced > 0 &&
            iRowNum == 0
        ) {
            if (iCreature.nipplesPierced == 5) description += "chained ";
            else description += "pierced ";
            haveDescription = true;
        }
        if (!haveDescription && iCreature.skinType == 3) {
            options = ["slime-slick ", "goopy ", "slippery "];
            description += Appearance.randomChoice(options);
        }
        if (!haveDescription && iCreature.findStatusAffect(StatusAffects.BlackNipples) >= 0) {
            options = ["black ", "ebony ", "sable "];
            description += Appearance.randomChoice(options);
        }

        // Nounsssssssss*BOOM*
        let choice = 0;
        choice = Appearance.rand(5);
        if (choice == 0) description += "nipple";
        if (choice == 1) {
            if (iCreature.nippleLength < 0.5) description += "perky nipple";
            else description += "cherry-like nub";
        }
        if (choice == 2) {
            if (iCreature.hasFuckableNipples()) description += "fuckable nip";
            else {
                if (iCreature.biggestLactation() >= 1 && iCreature.nippleLength >= 1)
                    description += "teat";
                else description += "nipple";
            }
        }
        if (choice == 3) {
            if (iCreature.hasFuckableNipples()) description += "nipple-hole";
            else {
                if (iCreature.biggestLactation() >= 1 && iCreature.nippleLength >= 1)
                    description += "teat";
                else description += "nipple";
            }
        }
        if (choice == 4) {
            if (iCreature.hasFuckableNipples()) description += "nipple-cunt";
            else description += "nipple";
        }
        return description;
        /* OLD
         if(creature.breastRows[rowNum].lactationMultiplier >= 1.5 && creature.breastRows[rowNum].lactationMultiplier < 1.75) {
         if(creature.breastRows[rowNum].milkFullness > 75) return "over-full leaking teat";
         if(rand(2) == 0) return "milky teat";
         else return "milk spout";
         }
         if(creature.breastRows[rowNum].lactationMultiplier >= 1.75) {
         if(creature.breastRows[rowNum].milkFullness > 75) return "over-full leaking teat";
         if(rand(2) == 0) return "milk-drooling teat";
         else return "drippy cow-teat";
         }
         if(creature.lust > 75) {
         if(rand(2) == 0) return "painfully hard nipple";
         else return "over-stimulated nipple";
         }
         if(creature.lust > 50) {
         if(rand(2) == 0) return "erect nipple";
         else return "hard nipple";
         }
         if(creature.breastRows[rowNum].milkFullness > 75) return "milky over-full nipple";
         return "nipple";
         */
    }

    public static hipDescription(iCharacter: Character): string {
        let description = "";
        let options: string[];
        if (iCharacter.hipRating <= 1) {
            options = ["tiny ", "narrow ", "boyish "];
            description = Appearance.randomChoice(options);
        } else if (iCharacter.hipRating > 1 && iCharacter.hipRating < 4) {
            options = ["slender ", "narrow ", "thin "];
            description = Appearance.randomChoice(options);
            if (iCharacter.thickness < 30) {
                if (Appearance.rand(2) == 0) description = "slightly-flared ";
                else description = "curved ";
            }
        } else if (iCharacter.hipRating >= 4 && iCharacter.hipRating < 6) {
            options = ["well-formed ", "pleasant "];
            description = Appearance.randomChoice(options);
            if (iCharacter.thickness < 30) {
                if (Appearance.rand(2) == 0) description = "flared ";
                else description = "curvy ";
            }
        } else if (iCharacter.hipRating >= 6 && iCharacter.hipRating < 10) {
            options = ["ample ", "noticeable ", "girly "];
            description = Appearance.randomChoice(options);
            if (iCharacter.thickness < 30) {
                if (Appearance.rand(2) == 0) description = "flared ";
                else description = "waspish ";
            }
        } else if (iCharacter.hipRating >= 10 && iCharacter.hipRating < 15) {
            options = ["flared ", "curvy ", "wide "];
            description = Appearance.randomChoice(options);
            if (iCharacter.thickness < 30) {
                if (Appearance.rand(2) == 0) description = "flared ";
                else description = "waspish ";
            }
        } else if (iCharacter.hipRating >= 15 && iCharacter.hipRating < 20) {
            if (iCharacter.thickness < 40) {
                if (Appearance.rand(2) == 0) description = "flared, ";
                else description = "waspish, ";
            }
            options = ["fertile ", "child-bearing ", "voluptuous "];
            description += Appearance.randomChoice(options);
        } else if (iCharacter.hipRating >= 20) {
            if (iCharacter.thickness < 40) {
                if (Appearance.rand(2) == 0) description = "flaring, ";
                else description = "incredibly waspish, ";
            }
            options = ["broodmother-sized ", "cow-like ", "inhumanly-wide "];
            description += Appearance.randomChoice(options);
        }
        // Taurs
        if (iCharacter.isTaur() && Appearance.rand(3) == 0) description += "flanks";
        // Nagas have sides, right?
        else if (iCharacter.isNaga() && Appearance.rand(3) == 0) description += "sides";
        // Non taurs or taurs who didn't roll flanks
        else {
            options = ["hips", "thighs"];
            description += Appearance.randomChoice(options);
        }

        return description;
    }

    public static cockDescript(creature: Creature, cockIndex = 0): string {
        if (creature.cocks.length == 0)
            return "<b>ERROR: CockDescript Called But No Cock Present</b>";
        let cockType: CockTypesEnum = CockTypesEnum.HUMAN;
        if (cockIndex != 99) {
            // CockIndex 99 forces a human cock description
            if (creature.cocks.length <= cockIndex)
                return `<b>ERROR: CockDescript called with index of ${cockIndex} - out of BOUNDS</b>`;
            cockType = creature.cocks[cockIndex].cockType;
        }
        const isPierced: boolean =
            creature.cocks.length == 1 && creature.cocks[cockIndex].isPierced; // Only describe as pierced or sock covered if the creature has just one cock
        const hasSock: boolean = creature.cocks.length == 1 && creature.cocks[cockIndex].sock != "";
        const isGooey: boolean = creature.skinType == CoC.SKIN_TYPE_GOO;
        return Appearance.cockDescription(
            cockType,
            creature.cocks[cockIndex].cockLength,
            creature.cocks[cockIndex].cockThickness,
            creature.lust,
            creature.cumQ(),
            isPierced,
            hasSock,
            isGooey,
        );
    }

    // This function takes all the variables independently so that a creature object is not required for a cockDescription.
    // This allows a single cockDescription function to produce output for both cockDescript and the old NPCCockDescript.
    public static cockDescription(
        cockType: CockTypesEnum,
        length: number,
        girth: number,
        lust = 50,
        cumQ = 10,
        isPierced = false,
        hasSock = false,
        isGooey = false,
    ): string {
        if (Appearance.rand(2) == 0) {
            if (cockType == CockTypesEnum.HUMAN)
                return `${Appearance.cockAdjective(
                    cockType,
                    length,
                    girth,
                    lust,
                    cumQ,
                    isPierced,
                    hasSock,
                    isGooey,
                )} ${Appearance.cockNoun(cockType)}`;
            else
                return `${Appearance.cockAdjective(
                    cockType,
                    length,
                    girth,
                    lust,
                    cumQ,
                    isPierced,
                    hasSock,
                    isGooey,
                )}, ${Appearance.cockNoun(cockType)}`;
        }
        return Appearance.cockNoun(cockType);
    }

    public static cockNoun(cockType: CockTypesEnum): string {
        /*
        if (cockType is int) {
            trace("Someone is still calling cockNoun with an integer cock type");
            trace("Fix this shit already, dammit!")
            cockType = CockTypesEnum.ParseConstantByIndex(cockType);
        }
        */
        if (cockType == CockTypesEnum.HUMAN) {
            // Yeah, this is kind of messy
            // there is no other easy way to preserve the weighting fenoxo did
            return Appearance.randomChoice(
                "cock",
                "cock",
                "cock",
                "cock",
                "cock",
                "prick",
                "prick",
                "pecker",
                "shaft",
                "shaft",
                "shaft",
            );
        } else if (cockType == CockTypesEnum.BEE) {
            return Appearance.randomChoice(
                "bee prick",
                "bee prick",
                "bee prick",
                "bee prick",
                "insectoid cock",
                "insectoid cock",
                "furred monster",
            );
        } else if (cockType == CockTypesEnum.DOG) {
            return Appearance.randomChoice(
                "dog-shaped dong",
                "canine shaft",
                "pointed prick",
                "knotty dog-shaft",
                "bestial cock",
                "animalistic puppy-pecker",
                "pointed dog-dick",
                "pointed shaft",
                "canine member",
                "canine cock",
                "knotted dog-cock",
            );
        } else if (cockType == CockTypesEnum.FOX) {
            return Appearance.randomChoice(
                "fox-shaped dong",
                "vulpine shaft",
                "pointed prick",
                "knotty fox-shaft",
                "bestial cock",
                "animalistic vixen-pricker",
                "pointed fox-dick",
                "pointed shaft",
                "vulpine member",
                "vulpine cock",
                "knotted fox-cock",
            );
        } else if (cockType == CockTypesEnum.HORSE) {
            return Appearance.randomChoice(
                "flared horse-cock",
                "equine prick",
                "bestial horse-shaft",
                "flat-tipped horse-member",
                "animalistic stallion-prick",
                "equine dong",
                "beast cock",
                "flared stallion-cock",
            );
        } else if (cockType == CockTypesEnum.DEMON) {
            return Appearance.randomChoice(
                "nub-covered demon-dick",
                "nubby shaft",
                "corrupted cock",
                "perverse pecker",
                "bumpy demon-dick",
                "demonic cock",
                "demonic dong",
                "cursed cock",
                "infernal prick",
                "unholy cock",
                "blighted cock",
            );
        } else if (cockType == CockTypesEnum.TENTACLE) {
            return Appearance.randomChoice(
                "twisting tentacle-prick",
                "wriggling plant-shaft",
                "sinuous tentacle-cock",
                "squirming cock-tendril",
                "writhing tentacle-pecker",
                "wriggling plant-prick",
                "penile flora",
                "smooth shaft",
                "undulating tentacle-dick",
                "slithering vine-prick",
                "vine-shaped cock",
            );
        } else if (cockType == CockTypesEnum.CAT) {
            return Appearance.randomChoice(
                "feline dick",
                "spined cat-cock",
                "pink kitty-cock",
                "spiny prick",
                "animalistic kitty-prick",
                "oddly-textured cat-penis",
                "feline member",
                "spined shaft",
                "feline shaft",
                "barbed dick",
                "nubby kitten-prick",
            );
        } else if (cockType == CockTypesEnum.LIZARD) {
            return Appearance.randomChoice(
                "reptilian dick",
                "purple cock",
                "inhuman cock",
                "reptilian prick",
                "purple prick",
                "purple member",
                "serpentine member",
                "serpentine shaft",
                "reptilian shaft",
                "bulbous snake-shaft",
                "bulging snake-dick",
            );
        } else if (cockType == CockTypesEnum.ANEMONE) {
            return Appearance.randomChoice(
                "anemone dick",
                "tentacle-ringed cock",
                "blue member",
                "stinger-laden shaft",
                "pulsating prick",
                "anemone prick",
                "stinger-coated member",
                "blue cock",
                "tentacle-ringed dick",
                "near-transparent shaft",
                "squirming shaft",
            );
        } else if (cockType == CockTypesEnum.KANGAROO) {
            return Appearance.randomChoice(
                "kangaroo-like dick",
                "pointed cock",
                "marsupial member",
                "tapered shaft",
                "curved pecker",
                "pointed prick",
                "squirming kangaroo-cock",
                "marsupial cock",
                "tapered kangaroo-dick",
                "curved kangaroo-cock",
                "squirming shaft",
            );
        } else if (cockType == CockTypesEnum.DRAGON) {
            return Appearance.randomChoice(
                "dragon-like dick",
                "segmented shaft",
                "pointed prick",
                "knotted dragon-cock",
                "mythical mast",
                "segmented tool",
                "draconic dick",
                "draconic cock",
                "tapered dick",
                "unusual endowment",
                "scaly shaft",
            );
        } else if (cockType == CockTypesEnum.DISPLACER) {
            return Appearance.randomChoice(
                "coerl cock",
                "tentacle-tipped phallus",
                "starfish-tipped shaft",
                "alien member",
                "almost-canine dick",
                "bizarre prick",
                "beastly cock",
                "cthulhu-tier cock",
                "coerl cock",
                "animal dong",
                "star-capped tool",
                "knotted erection",
            );
        }
        return Appearance.randomChoice("cock", "prick", "pecker", "shaft");
    }

    // New cock adjectives.  The old one sucked dicks
    // This function handles all cockAdjectives. Previously there were separate functions for the player, monsters and NPCs.
    public static cockAdjective(
        cockType: CockTypesEnum,
        length: number,
        girth: number,
        lust = 50,
        cumQ = 10,
        isPierced = false,
        hasSock = false,
        isGooey = false,
    ): string {
        // First, the three possible special cases
        if (isPierced && Appearance.rand(5) == 0) return "pierced";
        if (hasSock && Appearance.rand(5) == 0)
            return Appearance.randomChoice(
                "sock-sheathed",
                "garment-wrapped",
                "smartly dressed",
                "cloth-shrouded",
                "fabric swaddled",
                "covered",
            );
        if (isGooey && Appearance.rand(4) == 0)
            return Appearance.randomChoice("goopey", "gooey", "slimy");
        // Length 1/3 chance
        if (Appearance.rand(3) == 0) {
            if (length < 3)
                return Appearance.randomChoice("little", "toy-sized", "mini", "budding", "tiny");
            if (length < 5) return Appearance.randomChoice("short", "small");
            if (length < 7) return Appearance.randomChoice("fair-sized", "nice");
            if (length < 9) {
                if (cockType == CockTypesEnum.HORSE)
                    return Appearance.randomChoice("sizable", "pony-sized", "colt-like");
                return Appearance.randomChoice("sizable", "long", "lengthy");
            }
            if (length < 13) {
                if (cockType == CockTypesEnum.DOG)
                    return Appearance.randomChoice("huge", "foot-long", "mastiff-like");
                return Appearance.randomChoice("huge", "foot-long", "cucumber-length");
            }
            if (length < 18)
                return Appearance.randomChoice("massive", "knee-length", "forearm-length");
            if (length < 30) return Appearance.randomChoice("enormous", "giant", "arm-like");
            if (cockType == CockTypesEnum.TENTACLE && Appearance.rand(2) == 0) return "coiled";
            return Appearance.randomChoice("towering", "freakish", "monstrous", "massive");
        }
        // Hornyness 1/2
        else if (lust > 75 && Appearance.rand(2) == 0) {
            if (lust > 90) {
                // Uber horny like a baws!
                if (cumQ < 50) return Appearance.randomChoice("throbbing", "pulsating"); // Weak as shit cum
                if (cumQ < 200) return Appearance.randomChoice("dribbling", "leaking", "drooling"); // lots of cum? drippy.
                return Appearance.randomChoice(
                    "very drippy",
                    "pre-gushing",
                    "cum-bubbling",
                    "pre-slicked",
                    "pre-drooling",
                ); // Tons of cum
            } else {
                // A little less lusty, but still lusty.
                if (cumQ < 50)
                    return Appearance.randomChoice(
                        "turgid",
                        "blood-engorged",
                        "rock-hard",
                        "stiff",
                        "eager",
                    ); // Weak as shit cum
                if (cumQ < 200)
                    return Appearance.randomChoice(
                        "turgid",
                        "blood-engorged",
                        "rock-hard",
                        "stiff",
                        "eager",
                        "fluid-beading",
                        "slowly-oozing",
                    ); // A little drippy
                return Appearance.randomChoice("dribbling", "drooling", "fluid-leaking", "leaking"); // uber drippy
            }
        }
        // Girth - fallback
        if (girth <= 0.75) return Appearance.randomChoice("thin", "slender", "narrow");
        if (girth <= 1.2) return "ample";
        if (girth <= 1.4) return Appearance.randomChoice("ample", "big");
        if (girth <= 2) return Appearance.randomChoice("broad", "meaty", "girthy");
        if (girth <= 3.5) return Appearance.randomChoice("fat", "distended", "wide");
        return Appearance.randomChoice("inhumanly distended", "monstrously thick", "bloated");
    }

    // Cock adjectives for single cock
    private static cockAdjectives(
        iCockLength: number,
        iCockThickness: number,
        iCockType: CockTypesEnum,
        iCreature: Creature,
    ): string {
        let description = "";
        let rando = 0;
        let descripts = 0;
        // length or thickness, usually length.
        if (Appearance.rand(4) == 0) {
            if (iCockLength < 3) {
                rando = Appearance.rand(3);
                if (rando == 0) description = "little";
                else if (rando == 1) description = "toy-sized";
                else description = "tiny";
            } else if (iCockLength < 5) {
                if (Appearance.rand(2) == 0) description = "short";
                else description = "small";
            } else if (iCockLength < 7) {
                if (Appearance.rand(2) == 0) description = "fair-sized";
                else description = "nice";
            } else if (iCockLength < 9) {
                rando = Appearance.rand(3);
                if (rando == 0) description = "long";
                else if (rando == 1) description = "lengthy";
                else if (rando == 2) description = "sizable";
            } else if (iCockLength < 13) {
                if (Appearance.rand(2) == 0) description = "huge";
                else description = "foot-long";
            } else if (iCockLength < 18) {
                if (Appearance.rand(2) == 0) description = "massive";
                else description = "forearm-length";
            } else if (iCockLength < 30) {
                if (Appearance.rand(2) == 0) description = "enormous";
                else description = "monster-length";
            } else {
                rando = Appearance.rand(3);
                if (rando == 0) description = "towering";
                else if (rando == 1) description = "freakish";
                else description = "massive";
            }
            descripts = 1;
        }
        // thickness go!
        else if (Appearance.rand(4) == 0 && descripts == 0) {
            if (iCockThickness <= 0.75) description += "narrow";
            else if (iCockThickness <= 1.1) description += "nice";
            else if (iCockThickness <= 1.4) {
                if (Appearance.rand(2) == 0) description += "ample";
                else description += "big";
            } else if (iCockThickness <= 2) {
                if (Appearance.rand(2) == 0) description += "broad";
                else description += "girthy";
            } else if (iCockThickness <= 3.5) {
                if (Appearance.rand(2) == 0) description += "fat";
                else description += "distended";
            } else {
                if (Appearance.rand(2) == 0) description += "inhumanly distended";
                else description += "monstrously thick";
            }
            descripts = 1;
        }
        // Length/Thickness done.  Moving on to special animal characters/lust stuff.
        /* Animal Fillers - turned off due to duplication in noun segment
         else if(type == 1 && descripts == 0 && rand(2) == 0) {
         if(rand(2) == 0) descript += "flared ";
         else descript += "musky ";
         }
         else if(type == 2 && descripts == 0 && rand(2) == 0) {
         descript += "musky ";
         }*/
        // FINAL FALLBACKS - lust descriptors
        // Lust stuff
        else if (iCreature.lust > 90) {
            // lots of cum? drippy.
            if (iCreature.cumQ() > 50 && iCreature.cumQ() < 200 && Appearance.rand(2) == 0) {
                // for hroses and dogs
                if (CockTypesGroup[iCockType] == "animal") description += "animal-pre leaking";
                else description += "pre-slickened";
                descripts = 1;
            }
            // Tons of cum
            if (iCreature.cumQ() >= 200 && Appearance.rand(2) == 0) {
                // for horses and dogs
                if (CockTypesGroup[iCockType] == "animal") description += "animal-spunk dripping";
                else description += "cum-drooling";
                descripts = 1;
            }
            // Not descripted? Pulsing and twitching
            if (descripts == 0) {
                if (Appearance.rand(2) == 0) description += "throbbing";
                else description += "pulsating";
                descripts = 1;
            }
        }
        // A little less lusty, but still lusty.
        else if (iCreature.lust > 75) {
            if (
                descripts == 0 &&
                iCreature.cumQ() > 50 &&
                iCreature.cumQ() < 200 &&
                Appearance.rand(2) == 0
            ) {
                description += "pre-leaking";
                descripts = 1;
            }
            if (descripts == 0 && iCreature.cumQ() >= 200 && Appearance.rand(2) == 0) {
                description += "pre-cum dripping";
                descripts = 1;
            }
            if (descripts == 0) {
                if (Appearance.rand(2) == 0) description += "rock-hard";
                else description += "eager";
                descripts = 1;
            }
        }
        // Not lusty at all, fallback adjective
        else if (iCreature.lust > 50) description += "hard";
        else description += "ready";
        return description;
    }

    public static cockMultiNoun(cockType: CockTypesEnum): string {
        /*
        if (cockType is int) {
            trace("Someone is still calling cockNoun with an integer cock type");
            trace("Fix this shit already, dammit!");
            cockType = CockTypesEnum.ParseConstantByIndex(cockType);
        }
        */
        let options: string[];
        let description = "";
        if (cockType == CockTypesEnum.HUMAN) {
            options = [
                "cock",
                "cock",
                "cock",
                "cock",
                "cock",
                "prick",
                "prick",
                "pecker",
                "shaft",
                "shaft",
                "shaft",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.BEE) {
            options = [
                "bee prick",
                "bee prick",
                "bee prick",
                "bee prick",
                "insectoid cock",
                "insectoid cock",
                "furred monster",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.DOG) {
            options = [
                "doggie dong",
                "canine shaft",
                "pointed prick",
                "dog-shaft",
                "dog-cock",
                "puppy-pecker",
                "dog-dick",
                "pointed shaft",
                "canine cock",
                "canine cock",
                "dog cock",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.HORSE) {
            options = [
                "horsecock",
                "equine prick",
                "horse-shaft",
                "horse-prick",
                "stallion-prick",
                "equine dong",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.DEMON) {
            options = [
                "demon-dick",
                "nubby shaft",
                "corrupted cock",
                "perverse pecker",
                "bumpy demon-dick",
                "demonic cock",
                "demonic dong",
                "cursed cock",
                "infernal prick",
                "unholy cock",
                "blighted cock",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.TENTACLE) {
            options = [
                "tentacle prick",
                "plant-like shaft",
                "tentacle cock",
                "cock-tendril",
                "tentacle pecker",
                "plant prick",
                "penile flora",
                "smooth inhuman shaft",
                "tentacle dick",
                "vine prick",
                "vine-like cock",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.CAT) {
            options = [
                "feline dick",
                "cat-cock",
                "kitty-cock",
                "spiny prick",
                "pussy-prick",
                "cat-penis",
                "feline member",
                "spined shaft",
                "feline shaft",
                "'barbed' dick",
                "kitten-prick",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.LIZARD) {
            options = [
                "reptile-dick",
                "purple cock",
                "inhuman cock",
                "reptilian prick",
                "purple prick",
                "purple member",
                "serpentine member",
                "serpentine shaft",
                "reptilian shaft",
                "snake-shaft",
                "snake dick",
            ];
            description += Appearance.randomChoice(options);
        } else {
            description += Appearance.randomChoice("cock", "prick", "pecker", "shaft");
        }
        return description;
    }

    /**
     * Describe creatures balls.
     *
     * @param    iForcedSize    Force a description of the size of the balls
     * @param    iPlural        Show plural forms
     * @param    iCreature        Monster, Player or NonPlayer
     * @param    iWithArticle    Show description with article in front
     * @return    Full description of balls
     */
    public static ballsDescription(
        iForcedSize: boolean,
        iPlural: boolean,
        iCreature: Creature,
        iWithArticle = false,
    ): string {
        if (iCreature.balls == 0) return "prostate";

                        let description = "";
        let options: string[];

        if (iPlural && iCreature.findStatusAffect(StatusAffects.Uniball) < 0) {
            if (iCreature.balls == 1) {
                if (iWithArticle) {
                    options = ["a single", "a solitary", "a lone", "an individual"];
                } else {
                    options = ["single", "solitary", "lone", "individual"];
                }
                description += Appearance.randomChoice(options);
            } else if (iCreature.balls == 2) {
                if (iWithArticle) {
                    options = ["a pair of", "two", "a duo of"];
                } else {
                    options = ["pair of", "two", "duo of"];
                }
                description += Appearance.randomChoice(options);
            } else if (iCreature.balls == 3) {
                options = ["three", "triple"];
                if (iWithArticle) options.push("a trio of");
                else options.push("trio of");
                description += Appearance.randomChoice(options);
            } else if (iCreature.balls == 4) {
                options = ["four", "quadruple"];
                if (iWithArticle) options.push("a quartette of");
                else options.push("quartette of");
                description += Appearance.randomChoice(options);
            } else {
                if (iWithArticle) {
                    options = ["a multitude of", "many", "a large handful of"];
                } else {
                    options = ["multitude of", "many", "large handful of"];
                }
                description += Appearance.randomChoice(options);
            }
        }
        // size!
        if (iCreature.ballSize > 1 && (Appearance.rand(3) <= 1 || iForcedSize)) {
            if (description) description += " ";

            if (iCreature.ballSize >= 18) description += "hideously swollen and oversized";
            else if (iCreature.ballSize >= 15) description += "beachball-sized";
            else if (iCreature.ballSize >= 12) description += "watermelon-sized";
            else if (iCreature.ballSize >= 9) description += "basketball-sized";
            else if (iCreature.ballSize >= 7) description += "soccerball-sized";
            else if (iCreature.ballSize >= 5) description += "cantaloupe-sized";
            else if (iCreature.ballSize >= 4) description += "grapefruit-sized";
            else if (iCreature.ballSize >= 3) description += "apple-sized";
            else if (iCreature.ballSize >= 2) description += "baseball-sized";
            else if (iCreature.ballSize > 1) description += "large";
        }
        // UNIBALL
        if (iCreature.findStatusAffect(StatusAffects.Uniball) >= 0) {
            if (description) description += " ";
            options = [
                "tightly-compressed",
                "snug",
                "cute",
                "pleasantly squeezed",
                "compressed-together",
            ];
            description += Appearance.randomChoice(options);
        }
        // Descriptive
        if (iCreature.hoursSinceCum >= 48 && Appearance.rand(2) == 0 && !iForcedSize) {
            if (description) description += " ";
            options = ["overflowing", "swollen", "cum-engorged"];
            description += Appearance.randomChoice(options);
        }
        // lusty
        if (iCreature.lust > 90 && description == "" && Appearance.rand(2) == 0 && !iForcedSize) {
            options = [
                "eager",
                "full",
                "needy",
                "desperate",
                "throbbing",
                "heated",
                "trembling",
                "quivering",
                "quaking",
            ];
            description += Appearance.randomChoice(options);
        }
        // Slimy skin
        if (iCreature.skinType == 3) {
            if (description) description += " ";
            options = ["goopey", "gooey", "slimy"];
            description += Appearance.randomChoice(options);
        }
        if (description) description += " ";

        options = ["nut", "gonad", "teste", "testicle", "testicle", "ball", "ball", "ball"];

        // I don't know how this was ever supposed to work.

        description += Appearance.randomChoice(options);
        if (iPlural) description += "s";

        if (iCreature.findStatusAffect(StatusAffects.Uniball) >= 0 && Appearance.rand(2) == 0) {
            if (Appearance.rand(3) == 0) description += " merged into a cute, spherical package";
            else if (Appearance.rand(2) == 0)
                description += " combined into a round, girlish shape";
            else description += " squeezed together into a perky, rounded form";
        }
        return description;
    }

    // Returns random description of scrotum
    public static sackDescript(iCreature: Creature): string {
        if (iCreature.balls == 0) return "prostate";

        const options = ["scrotum", "sack", "nutsack", "ballsack", "beanbag", "pouch"];

        const description = Appearance.randomChoice(options);

        return description;
    }

    /* Moved to Creature.as
            public static  sheathDescription(i_character:Character): string
            {
                if (i_character.hasSheath()) return "sheath";
                else return "base";
            }
    */

    public static vaginaDescript(iCreature: Creature, iVaginaIndex = 0): string {
        if (iVaginaIndex > iCreature.vaginas.length - 1) {
            CocSettings.error(
                `<B>Error: Invalid vagina number (${iVaginaIndex}) passed to vaginaDescript()</b>`,
            );
            return `<B>Error: Invalid vagina number (${iVaginaIndex}) passed to vaginaDescript()</b>`;
        }
        if (iVaginaIndex < 0) {
            CocSettings.error(
                `<B>Error: Invalid vaginaNum (${iVaginaIndex}) passed to vaginaDescript()</b>`,
            );
            return `<B>Error: Invalid vaginaNum (${iVaginaIndex}) passed to vaginaDescript()</b>`;
        }
        if (iCreature.vaginas.length <= 0) {
            CocSettings.error("ERROR: Called vaginaDescription with no vaginas");
            return "ERROR: Called vaginaDescription with no vaginas";
        }

        let description = "";
        let weighting = 0;
                let options: string[];

        // Very confusing way to display values.
        if (iCreature.vaginas[iVaginaIndex].vaginalLooseness == 0) weighting = 61;
        if (
            iCreature.vaginas[iVaginaIndex].vaginalLooseness == 4 ||
            iCreature.vaginas[iVaginaIndex].vaginalLooseness == 5
        )
            weighting = 10;

        // tightness descript - 40% display rate
        if (Appearance.rand(100) + weighting > 60) {
            if (iCreature.vaginas[iVaginaIndex].vaginalLooseness == 0) {
                if (iCreature.vaginas[iVaginaIndex].virgin) description += "virgin";
                else description += "tight";
            }
            if (iCreature.vaginas[iVaginaIndex].vaginalLooseness == 2) description += "loose";
            if (iCreature.vaginas[iVaginaIndex].vaginalLooseness == 3) description += "very loose";
            if (iCreature.vaginas[iVaginaIndex].vaginalLooseness == 4) description += "gaping";
            if (iCreature.vaginas[iVaginaIndex].vaginalLooseness == 5) description += "gaping-wide";
        }
        // wetness descript - 30% display rate
        if (Appearance.rand(100) + weighting > 70) {
            if (description != "") description += ", ";
            if (iCreature.vaginas[iVaginaIndex].vaginalWetness == 0) description += "dry";
            if (iCreature.vaginas[iVaginaIndex].vaginalWetness == 1) description += "moist";
            if (iCreature.vaginas[iVaginaIndex].vaginalWetness == 2) description += "wet";
            if (iCreature.vaginas[iVaginaIndex].vaginalWetness == 3) description += "slick";
            if (iCreature.vaginas[iVaginaIndex].vaginalWetness == 4) description += "drooling";
            if (iCreature.vaginas[iVaginaIndex].vaginalWetness == 5) description += "slavering";
        }
        if (iCreature.vaginas[iVaginaIndex].labiaPierced > 0 && Appearance.rand(3) == 0) {
            if (description != "") description += ", ";
            description += "pierced";
        }
        if (description == "" && iCreature.skinType == 3) {
                                    if (Appearance.rand(2) == 0) description += "gooey";
            else description += "slimy";
        }
        if (iCreature.vaginaType() == 5 && Math.floor(Math.random() * 2) == 0) {
            if (description != "") description += ", ";
            options = [
                "black",
                "onyx",
                "ebony",
                "dusky",
                "sable",
                "obsidian",
                "midnight-hued",
                "jet black",
            ];
            description += Appearance.randomChoice(options);
        }

        if (description != "") description += " ";
        options = ["vagina", "pussy", "cooter", "twat", "cunt", "snatch", "fuck-hole", "muff"];
        description += Appearance.randomChoice(options);
        // Something that would be nice to have but needs a variable in Creature or Character.

        return description;
    }

    public static clitDescription(iCreature: Creature): string {
        let description = "";
        let options: string[];
        let haveDescription = false;
        // Length Adjective - 50% chance
        if (Appearance.rand(2) == 0) {
            // small clits!
            if (iCreature.clitLength <= 0.5) {
                options = ["tiny ", "little ", "petite ", "diminutive ", "miniature "];
                description += Appearance.randomChoice(options);
            }
            // "average".
            if (iCreature.clitLength > 0.5 && iCreature.clitLength < 1.5) {
                // no size comment
            }
            // Biggies!
            if (iCreature.clitLength >= 1.5 && iCreature.clitLength < 4) {
                options = ["large ", "large ", "substantial ", "substantial ", "considerable "];
                description += Appearance.randomChoice(options);
            }
            // 'Uge
            if (iCreature.clitLength >= 4) {
                options = ["monster ", "tremendous ", "colossal ", "enormous ", "bulky "];
                description += Appearance.randomChoice(options);
            }
        }
        // Descriptive descriptions - 50% chance of being called
        if (Appearance.rand(2) == 0) {
            // Doggie descriptors - 50%
            // TODO Conditionals don't make sense, need to introduce a class variable to keep of "something" or move race or Creature/Character
            if (iCreature.skinType == 1 && !haveDescription && Appearance.rand(2) == 0) {
                description += "bitch-";
                haveDescription = true;
            }
            /* Horse descriptors - 50%
             if(creature.skinType == 1 > 2 && !descripted && rand(2) == 0) {
             descripted = true;
             descript += "mare-";
             }*/
            // Horny descriptors - 75% chance
            if (iCreature.lust > 70 && Appearance.rand(4) < 3 && !haveDescription) {
                options = ["throbbing ", "pulsating ", "hard "];
                description += Appearance.randomChoice(options);
                haveDescription = true;
            }
            // High libido - always use if no other descript
            if (iCreature.lib > 50 && Appearance.rand(2) == 0 && !haveDescription) {
                options = ["insatiable ", "greedy ", "demanding ", "rapacious"];
                description += Appearance.randomChoice(options);
                haveDescription = true;
            }
        }
        if (iCreature.hasVagina()) {
            if (!haveDescription && iCreature.vaginas[0].clitPierced > 0) {
                description += "pierced ";
                haveDescription = true;
            }
        } else {
            CocSettings.error("ERROR: CLITDESCRIPT WITH NO CLIT");
            return "ERROR: CLITDESCRIPT WITH NO CLIT";
        }

        // Clit nouns
        options = [
            "clit",
            "clitty",
            "button",
            "pleasure-buzzer",
            "clit",
            "clitty",
            "button",
            "clit",
            "clit",
            "button",
        ];
        description += Appearance.randomChoice(options);

        return description;
    }

    /**
     * Gives a full description of a Character's butt.
     * Be aware that it only supports Characters, not all Creatures.
     *
     * @param    iCharacter
     * @return    A full description of a Character's butt.
     */
    public static buttDescription(iCharacter: Character): string {
        let description = "";
        let options: string[];
        if (iCharacter.buttRating <= 1) {
            if (iCharacter.tone >= 60) description += "incredibly tight, perky ";
            else {
                options = ["tiny", "very small", "dainty"];
                description = Appearance.randomChoice(options);
                // Soft PC's buns!
                if (iCharacter.tone <= 30 && Appearance.rand(3) == 0) description += " yet soft";
                description += " ";
            }
        }
        if (iCharacter.buttRating > 1 && iCharacter.buttRating < 4) {
            if (iCharacter.tone >= 65) {
                options = [
                    "perky, muscular ",
                    "tight, toned ",
                    "compact, muscular ",
                    "tight ",
                    "muscular, toned ",
                ];
                description = Appearance.randomChoice(options);
            }
            // Nondescript
            else if (iCharacter.tone >= 30) {
                options = ["tight ", "firm ", "compact ", "petite "];
                description = Appearance.randomChoice(options);
            }
            // FLABBAH
            else {
                options = [
                    "small, heart-shaped ",
                    "soft, compact ",
                    "soft, heart-shaped ",
                    "small, cushy ",
                    "small ",
                    "petite ",
                    "snug ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (iCharacter.buttRating >= 4 && iCharacter.buttRating < 6) {
            // TOIGHT LIKE A TIGER
            if (iCharacter.tone >= 65) {
                options = [
                    "nicely muscled ",
                    "nice, toned ",
                    "muscly ",
                    "nice toned ",
                    "toned ",
                    "fair ",
                ];
                description = Appearance.randomChoice(options);
            }
            // Nondescript
            else if (iCharacter.tone >= 30) {
                options = ["nice ", "fair "];
                description = Appearance.randomChoice(options);
            }
            // FLABBAH
            else {
                options = [
                    "nice, cushiony ",
                    "soft ",
                    "nicely-rounded, heart-shaped ",
                    "cushy ",
                    "soft, squeezable ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (iCharacter.buttRating >= 6 && iCharacter.buttRating < 8) {
            // TOIGHT LIKE A TIGER
            if (iCharacter.tone >= 65) {
                options = [
                    "full, toned ",
                    "muscly handful of ",
                    "shapely, toned ",
                    "muscular, hand-filling ",
                    "shapely, chiseled ",
                    "full ",
                    "chiseled ",
                ];
                description = Appearance.randomChoice(options);
            }
            // Nondescript
            else if (iCharacter.tone >= 30) {
                options = ["handful of ", "full ", "shapely ", "hand-filling "];
                description = Appearance.randomChoice(options);
            }
            // FLABBAH
            else {
                if (Appearance.rand(8) == 0) return "supple, handful of ass";
                options = [
                    "somewhat jiggly ",
                    "soft, hand-filling ",
                    "cushiony, full ",
                    "plush, shapely ",
                    "full ",
                    "soft, shapely ",
                    "rounded, spongy ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (iCharacter.buttRating >= 8 && iCharacter.buttRating < 10) {
            // TOIGHT LIKE A TIGER
            if (iCharacter.tone >= 65) {
                options = [
                    "large, muscular ",
                    "substantial, toned ",
                    "big-but-tight ",
                    "squeezable, toned ",
                    "large, brawny ",
                    "big-but-fit ",
                    "powerful, squeezable ",
                    "large ",
                ];
                description = Appearance.randomChoice(options);
            }
            // Nondescript
            else if (iCharacter.tone >= 30) {
                options = ["squeezable ", "large ", "substantial "];
                description = Appearance.randomChoice(options);
            }
            // FLABBAH
            else {
                options = [
                    "large, bouncy ",
                    "soft, eye-catching ",
                    "big, slappable ",
                    "soft, pinchable ",
                    "large, plush ",
                    "squeezable ",
                    "cushiony ",
                    "plush ",
                    "pleasantly plump ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (iCharacter.buttRating >= 10 && iCharacter.buttRating < 13) {
            // TOIGHT LIKE A TIGER
            if (iCharacter.tone >= 65) {
                options = [
                    "thick, muscular ",
                    "big, burly ",
                    "heavy, powerful ",
                    "spacious, muscular ",
                    "toned, cloth-straining ",
                    "thick ",
                    "thick, strong ",
                ];
                description = Appearance.randomChoice(options);
            }
            // Nondescript
            else if (iCharacter.tone >= 30) {
                options = ["jiggling ", "spacious ", "heavy ", "cloth-straining "];
                description = Appearance.randomChoice(options);
            }
            // FLABBAH
            else {
                options = [
                    "super-soft, jiggling ",
                    "spacious, cushy ",
                    "plush, cloth-straining ",
                    "squeezable, over-sized ",
                    "spacious ",
                    "heavy, cushiony ",
                    "slappable, thick ",
                    "jiggling ",
                    "spacious ",
                    "soft, plump ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (iCharacter.buttRating >= 13 && iCharacter.buttRating < 16) {
            // TOIGHT LIKE A TIGER
            if (iCharacter.tone >= 65) {
                options = [
                    "expansive, muscled ",
                    "voluminous, rippling ",
                    "generous, powerful ",
                    "big, burly ",
                    "well-built, voluminous ",
                    "powerful ",
                    "muscular ",
                    "powerful, expansive ",
                ];
                description = Appearance.randomChoice(options);
            }
            // Nondescript
            else if (iCharacter.tone >= 30) {
                options = ["expansive ", "generous ", "voluminous ", "wide "];
                description = Appearance.randomChoice(options);
            }
            // FLABBAH
            else {
                options = [
                    "pillow-like ",
                    "generous, cushiony ",
                    "wide, plush ",
                    "soft, generous ",
                    "expansive, squeezable ",
                    "slappable ",
                    "thickly-padded ",
                    "wide, jiggling ",
                    "wide ",
                    "voluminous ",
                    "soft, padded ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (iCharacter.buttRating >= 16 && iCharacter.buttRating < 20) {
            if (iCharacter.tone >= 65) {
                options = [
                    "huge, toned ",
                    "vast, muscular ",
                    "vast, well-built ",
                    "huge, muscular ",
                    "strong, immense ",
                    "muscle-bound ",
                ];
                description = Appearance.randomChoice(options);
            }
            // Nondescript
            else if (iCharacter.tone >= 30) {
                if (Appearance.rand(5) == 0) return "jiggling expanse of ass";
                if (Appearance.rand(5) == 0) return "copious ass-flesh";
                options = ["huge ", "vast ", "giant "];
                description = Appearance.randomChoice(options);
            }
            // FLABBAH
            else {
                options = [
                    "vast, cushiony ",
                    "huge, plump ",
                    "expansive, jiggling ",
                    "huge, cushiony ",
                    "huge, slappable ",
                    "seam-bursting ",
                    "plush, vast ",
                    "giant, slappable ",
                    "giant ",
                    "huge ",
                    "swollen, pillow-like ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (iCharacter.buttRating >= 20) {
            if (iCharacter.tone >= 65) {
                if (Appearance.rand(7) == 0) return "colossal, muscly ass";
                options = [
                    "ginormous, muscle-bound ",
                    "colossal yet toned ",
                    "strong, tremdously large ",
                    "tremendous, muscled ",
                    "ginormous, toned ",
                    "colossal, well-defined ",
                ];
                description = Appearance.randomChoice(options);
            }
            // Nondescript
            else if (iCharacter.tone >= 30) {
                options = ["ginormous ", "colossal ", "tremendous ", "gigantic "];
                description = Appearance.randomChoice(options);
            }
            // FLABBAH
            else {
                options = [
                    "ginormous, jiggly ",
                    "plush, ginormous ",
                    "seam-destroying ",
                    "tremendous, rounded ",
                    "bouncy, colossal ",
                    "thong-devouring ",
                    "tremendous, thickly padded ",
                    "ginormous, slappable ",
                    "gigantic, rippling ",
                    "gigantic ",
                    "ginormous ",
                    "colossal ",
                    "tremendous ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        options = [
            "butt",
            "butt",
            "butt",
            "butt",
            "ass",
            "ass",
            "ass",
            "ass",
            "backside",
            "backside",
            "derriere",
            "rump",
            "bottom",
        ];

        description += Appearance.randomChoice(options);
                return description;
    }

    /**
     * Gives a short description of a creature's butt.
     * Different from buttDescription in that it supports all creatures, not just characters.
     * Warning, very judgemental.
     *
     * @param    creature
     * @return Short description of a butt.
     */
    public static buttDescriptionShort(iCreature: Creature): string {
        let description = "";
        let options: string[];
        if (iCreature.buttRating <= 1) {
            options = ["insignificant ", "very small "];
            description = Appearance.randomChoice(options);
        }
        if (iCreature.buttRating > 1 && iCreature.buttRating < 4) {
            options = ["tight ", "firm ", "compact "];
            description = Appearance.randomChoice(options);
        }
        if (iCreature.buttRating >= 4 && iCreature.buttRating < 6) {
            options = ["regular ", "unremarkable "];
            description = Appearance.randomChoice(options);
        }
        if (iCreature.buttRating >= 6 && iCreature.buttRating < 8) {
            if (Appearance.rand(3) == 0) return "handful of ass";
            options = ["full ", "shapely "];
            description = Appearance.randomChoice(options);
        }
        if (iCreature.buttRating >= 8 && iCreature.buttRating < 10) {
            options = ["squeezable ", "large ", "substantial "];
            description = Appearance.randomChoice(options);
        }
        if (iCreature.buttRating >= 10 && iCreature.buttRating < 13) {
            options = ["jiggling ", "spacious ", "heavy "];
            description = Appearance.randomChoice(options);
        }
        if (iCreature.buttRating >= 13 && iCreature.buttRating < 16) {
            if (Appearance.rand(3) == 0) return "generous amount of ass";
            options = ["expansive ", "voluminous "];
            description = Appearance.randomChoice(options);
        }
        if (iCreature.buttRating >= 16 && iCreature.buttRating < 20) {
            if (Appearance.rand(3) == 2) return "jiggling expanse of ass";
            options = ["huge ", "vast "];
            description = Appearance.randomChoice(options);
        }
        if (iCreature.buttRating >= 20) {
            options = ["ginormous ", "colossal ", "tremendous "];
            description = Appearance.randomChoice(options);
        }
        options = ["butt ", "ass "];
        description += Appearance.randomChoice(options);
        if (Appearance.rand(2) == 0) description += "cheeks";
        return description;
    }

    public static assholeDescript(iCreature: Creature): string {
        let description = "";

        // The way this was setup didn't work. Trying to inline-define object key-values wasn't looking up the variable *VALUES* it was using the string representation
        // of the variable name as the key.
        // ie, querying ANAL_WETNESS_DESCRIPTORS[0] would actually return "undefined" rather than "".
        // This is just fucking awful but I'm just making things work in the face of bugs I'm running into.

        // 66% Wetness Descript
        const ANAL_WETNESS_DESCRIPTORS: Record<string, any> = new Object();
        ANAL_WETNESS_DESCRIPTORS[ANAL_WETNESS_DRY] = "";
        ANAL_WETNESS_DESCRIPTORS[ANAL_WETNESS_NORMAL] = "";
        ANAL_WETNESS_DESCRIPTORS[ANAL_WETNESS_MOIST] = "moist ";
        ANAL_WETNESS_DESCRIPTORS[ANAL_WETNESS_SLIMY] = "slimy ";
        ANAL_WETNESS_DESCRIPTORS[ANAL_WETNESS_DROOLING] = "drooling ";
        ANAL_WETNESS_DESCRIPTORS[ANAL_WETNESS_SLIME_DROOLING] = "slime-drooling ";

        if (Appearance.rand(3) <= 1) {
            description += ANAL_WETNESS_DESCRIPTORS[iCreature.ass.analWetness];
        }

        const ANAL_TIGHTNESS_DESCRIPTORS: Record<string, any> = new Object();
        ANAL_TIGHTNESS_DESCRIPTORS[ANAL_LOOSENESS_VIRGIN] = "virgin ";
        ANAL_TIGHTNESS_DESCRIPTORS[ANAL_LOOSENESS_TIGHT] = "tight ";
        ANAL_TIGHTNESS_DESCRIPTORS[ANAL_LOOSENESS_NORMAL] = "loose ";
        ANAL_TIGHTNESS_DESCRIPTORS[ANAL_LOOSENESS_LOOSE] = "roomy ";
        ANAL_TIGHTNESS_DESCRIPTORS[ANAL_LOOSENESS_STRETCHED] = "stretched ";
        ANAL_TIGHTNESS_DESCRIPTORS[ANAL_LOOSENESS_GAPING] = "gaping ";

        // 25% tightness description
        if (
            Appearance.rand(4) == 0 ||
            (iCreature.ass.analLooseness <= 1 && Appearance.rand(4) <= 2)
        ) {
            description += ANAL_TIGHTNESS_DESCRIPTORS[iCreature.ass.analLooseness];
        }

        // asshole descriptor
        description += Appearance.randomChoice(
            "ass",
            "anus",
            "pucker",
            "backdoor",
            "asshole",
            "butthole",
        );

        return description;
    }

    public static wingsDescript(iCreature: Creature): string {
        return `${Appearance.DEFAULT_WING_NAMES[iCreature.wingType]} wings`;
    }

    // prettier-ignore
    public static BREAST_CUP_NAMES: string[] = [
        //        0         1             2          3             4            5             6             7             8             9
              "flat",  "A-cup",      "B-cup",   "C-cup",      "D-cup",    "DD-cup", "big DD-cup",      "E-cup",  "big E-cup",    "EE-cup", //  0-9
        "big EE-cup",  "F-cup",  "big F-cup",  "FF-cup", "big FF-cup",     "G-cup",  "big G-cup",     "GG-cup", "big GG-cup",     "H-cup", // 10-19
         "big H-cup", "HH-cup", "big HH-cup", "HHH-cup",      "I-cup", "big I-cup",     "II-cup", "big II-cup",      "J-cup", "big J-cup", // 20-29
        //        0               1         2               3          4                5         6             7            8                9
            "JJ-cup",   "big JJ-cup",  "K-cup",    "big K-cup",  "KK-cup",    "big KK-cup",  "L-cup",    "big L-cup",  "LL-cup",    "big LL-cup", // 30-39
             "M-cup",    "big M-cup", "MM-cup",   "big MM-cup", "MMM-cup", "large MMM-cup",  "N-cup",  "large N-cup",  "NN-cup",  "large NN-cup", // 40-49
             "O-cup",  "large O-cup", "OO-cup", "large OO-cup",   "P-cup",   "large P-cup", "PP-cup", "large PP-cup",   "Q-cup",   "large Q-cup", // 50-59
            "QQ-cup", "large QQ-cup",  "R-cup",  "large R-cup",  "RR-cup",  "large RR-cup",  "S-cup",  "large S-cup",  "SS-cup",  "large SS-cup", // 60-69
             "T-cup",  "large T-cup", "TT-cup", "large TT-cup",   "U-cup",   "large U-cup", "UU-cup", "large UU-cup",   "V-cup",   "large V-cup", // 70-79
            "VV-cup", "large VV-cup",  "W-cup",  "large W-cup",  "WW-cup",  "large WW-cup",  "X-cup",  "large X-cup",  "XX-cup",  "large XX-cup", // 80-89
             "Y-cup",  "large Y-cup", "YY-cup", "large YY-cup",   "Z-cup",   "large Z-cup", "ZZ-cup", "large ZZ-cup", "ZZZ-cup", "large ZZZ-cup", // 90-99
    ];

    public static breastCup(size: number): string {
        return Appearance.BREAST_CUP_NAMES[
            Math.min(Math.floor(size), Appearance.BREAST_CUP_NAMES.length - 1)
        ];
    }

    /**
     * Returns breast size from cup name.
     * Acceptable input: "flat","A","B","C","D","DD","DD+",... "ZZZ","ZZZ+" or exact match from BREAST_CUP_NAMES array
     */
    public static breastCupInverse(name: string, defaultValue = 0): number {
        if (name.length == 0) return defaultValue;
        if (name == "flat") return 0;
        const big: boolean = name.endsWith("+");
        if (big) name = name.substr(0, name.length - 1);
        for (let i = 0; i < Appearance.BREAST_CUP_NAMES.length; i++) {
            if (name == Appearance.BREAST_CUP_NAMES[i]) return i;
            if (Appearance.BREAST_CUP_NAMES[i].indexOf(name) == 0) return i + (big ? 1 : 0);
        }
        return defaultValue;
    }

    public static createMapFromPairs(src: any[]): Record<string, any> {
        const result: Record<string, any> = {};
        for (const [key, value] of src) result[key] = value;
        return result;
    }

    public static DEFAULT_GENDER_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [GENDER_NONE, "genderless"],
        [GENDER_MALE, "male"],
        [GENDER_FEMALE, "female"],
        [GENDER_HERM, "hermaphrodite"],
    ]);
    public static DEFAULT_SKIN_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [SKIN_TYPE_PLAIN, "skin"],
        [SKIN_TYPE_FUR, "fur"],
        [SKIN_TYPE_SCALES, "scales"],
        [SKIN_TYPE_GOO, "goo"],
        [SKIN_TYPE_UNDEFINED, "undefined flesh"],
    ]);
    public static DEFAULT_SKIN_DESCS: Record<string, any> = Appearance.createMapFromPairs([
        [SKIN_TYPE_PLAIN, "skin"],
        [SKIN_TYPE_FUR, "fur"],
        [SKIN_TYPE_SCALES, "scales"],
        [SKIN_TYPE_GOO, "skin"],
        [SKIN_TYPE_UNDEFINED, "skin"],
    ]);
    public static DEFAULT_HAIR_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [HAIR_NORMAL, "normal"],
        [HAIR_FEATHER, "feather"],
        [HAIR_GHOST, "transparent"],
        [HAIR_GOO, "goopy"],
        [HAIR_ANEMONE, "tentacle"],
    ]);
    public static DEFAULT_FACE_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [FACE_HUMAN, "human"],
        [FACE_HORSE, "horse"],
        [FACE_DOG, "dog"],
        [FACE_COW_MINOTAUR, "cow"],
        [FACE_SHARK_TEETH, "shark"],
        [FACE_SNAKE_FANGS, "snake"],
        [FACE_CAT, "cat"],
        [FACE_LIZARD, "lizard"],
        [FACE_BUNNY, "bunny"],
        [FACE_KANGAROO, "kangaroo"],
        [FACE_SPIDER_FANGS, "spider"],
        [FACE_FOX, "fox"],
        [FACE_DRAGON, "dragon"],
        [FACE_RACCOON_MASK, "raccoon mask"],
        [FACE_RACCOON, "racoon"],
        [FACE_BUCKTEETH, "buckteeth"],
        [FACE_MOUSE, "mouse"],
    ]);
    public static DEFAULT_TONGUE_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [TONUGE_HUMAN, "human"],
        [TONUGE_SNAKE, "snake"],
        [TONUGE_DEMONIC, "demonic"],
        [TONUGE_DRACONIC, "draconic"],
    ]);
    public static DEFAULT_EYES_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [EYES_HUMAN, "human"],
        [EYES_FOUR_SPIDER_EYES, "4 spider"],
        [EYES_BLACK_EYES_SAND_TRAP, "sandtrap black"],
    ]);
    public static DEFAULT_EARS_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [EARS_HUMAN, "human"],
        [EARS_HORSE, "horse"],
        [EARS_DOG, "dog"],
        [EARS_COW, "cow"],
        [EARS_ELFIN, "elfin"],
        [EARS_CAT, "cat"],
        [EARS_LIZARD, "lizard"],
        [EARS_BUNNY, "bunny"],
        [EARS_KANGAROO, "kangaroo"],
        [EARS_FOX, "fox"],
        [EARS_DRAGON, "dragon"],
        [EARS_RACCOON, "raccoon"],
        [EARS_MOUSE, "mouse"],
    ]);
    public static DEFAULT_HORNS_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [HORNS_NONE, "non-existant"],
        [HORNS_DEMON, "demon"],
        [HORNS_COW_MINOTAUR, "cow"],
        [HORNS_DRACONIC_X2, "2 draconic"],
        [HORNS_DRACONIC_X4_12_INCH_LONG, 'four 12" long draconic'],
        [HORNS_ANTLERS, "deer"],
    ]);
    public static DEFAULT_ANTENNAE_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [ANTENNAE_NONE, "non-existant"],
        [ANTENNAE_BEE, "bee"],
    ]);
    public static DEFAULT_ARM_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [ARM_TYPE_HUMAN, "human"],
        [ARM_TYPE_HARPY, "harpy"],
        [ARM_TYPE_SPIDER, "spider"],
    ]);
    public static DEFAULT_TAIL_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [TAIL_TYPE_NONE, "non-existant"],
        [TAIL_TYPE_HORSE, "horse"],
        [TAIL_TYPE_DOG, "dog"],
        [TAIL_TYPE_DEMONIC, "demonic"],
        [TAIL_TYPE_COW, "cow"],
        [TAIL_TYPE_SPIDER_ADBOMEN, "spider abdomen"],
        [TAIL_TYPE_BEE_ABDOMEN, "bee abdomen"],
        [TAIL_TYPE_SHARK, "shark"],
        [TAIL_TYPE_CAT, "cat"],
        [TAIL_TYPE_LIZARD, "lizard"],
        [TAIL_TYPE_RABBIT, "rabbit"],
        [TAIL_TYPE_HARPY, "harpy"],
        [TAIL_TYPE_KANGAROO, "kangaroo"],
        [TAIL_TYPE_FOX, "fox"],
        [TAIL_TYPE_DRACONIC, "draconic"],
        [TAIL_TYPE_RACCOON, "raccoon"],
        [TAIL_TYPE_MOUSE, "mouse"],
    ]);
    public static DEFAULT_WING_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [WING_TYPE_NONE, "non-existant"],
        [WING_TYPE_BEE_LIKE_SMALL, "small bee-like"],
        [WING_TYPE_BEE_LIKE_LARGE, "large bee-like"],
        [WING_TYPE_HARPY, "harpy"],
        [WING_TYPE_IMP, "imp"],
        [WING_TYPE_BAT_LIKE_TINY, "tiny bat-like"],
        [WING_TYPE_BAT_LIKE_LARGE, "large bat-like"],
        [WING_TYPE_SHARK_FIN, "shark fin"],
        [WING_TYPE_FEATHERED_LARGE, "large feathered"],
        [WING_TYPE_DRACONIC_SMALL, "small draconic"],
        [WING_TYPE_DRACONIC_LARGE, "large draconic"],
        [WING_TYPE_GIANT_DRAGONFLY, "giant dragonfly"],
    ]);
    public static DEFAULT_WING_DESCS: Record<string, any> = Appearance.createMapFromPairs([
        [WING_TYPE_NONE, "non-existant"],
        [WING_TYPE_BEE_LIKE_SMALL, "small bee-like"],
        [WING_TYPE_BEE_LIKE_LARGE, "large bee-like"],
        [WING_TYPE_HARPY, "large feathery"],
        [WING_TYPE_IMP, "small"],
        [WING_TYPE_BAT_LIKE_TINY, "tiny, bat-like"],
        [WING_TYPE_BAT_LIKE_LARGE, "large, bat-like"],
        [WING_TYPE_SHARK_FIN, ""],
        [WING_TYPE_FEATHERED_LARGE, "large, feathered"],
        [WING_TYPE_DRACONIC_SMALL, "small, draconic"],
        [WING_TYPE_DRACONIC_LARGE, "large, draconic"],
        [WING_TYPE_GIANT_DRAGONFLY, "giant dragonfly"],
    ]);
    public static DEFAULT_LOWER_BODY_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [LOWER_BODY_TYPE_HUMAN, "human"],
        [LOWER_BODY_TYPE_HOOFED, "hoofed"],
        [LOWER_BODY_TYPE_DOG, "dog"],
        [LOWER_BODY_TYPE_NAGA, "naga"],
        [LOWER_BODY_TYPE_CENTAUR, "centaur"],
        [LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS, "demonic high-heels"],
        [LOWER_BODY_TYPE_DEMONIC_CLAWS, "demonic claws"],
        [LOWER_BODY_TYPE_BEE, "bee"],
        [LOWER_BODY_TYPE_GOO, "goo"],
        [LOWER_BODY_TYPE_CAT, "cat"],
        [LOWER_BODY_TYPE_LIZARD, "lizard"],
        [LOWER_BODY_TYPE_PONY, "pony"],
        [LOWER_BODY_TYPE_BUNNY, "bunny"],
        [LOWER_BODY_TYPE_HARPY, "harpy"],
        [LOWER_BODY_TYPE_KANGAROO, "kangaroo"],
        [LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS, "chitinous spider legs"],
        [LOWER_BODY_TYPE_DRIDER_LOWER_BODY, "drider"],
        [LOWER_BODY_TYPE_FOX, "fox"],
        [LOWER_BODY_TYPE_DRAGON, "dragon"],
        [LOWER_BODY_TYPE_RACCOON, "raccoon"],
    ]);
    public static DEFAULT_PIERCING_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [PIERCING_TYPE_NONE, "none"],
        [PIERCING_TYPE_STUD, "stud"],
        [PIERCING_TYPE_RING, "ring"],
        [PIERCING_TYPE_LADDER, "ladder"],
        [PIERCING_TYPE_HOOP, "hoop"],
        [PIERCING_TYPE_CHAIN, "chain"],
    ]);
    public static DEFAULT_VAGINA_TYPE_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [VAGINA_TYPE_HUMAN, "human"],
        [VAGINA_TYPE_BLACK_SAND_TRAP, "black sandtrap"],
    ]);
    public static DEFAULT_VAGINA_WETNESS_SCALES: [number, string][] = [
        [VAGINA_WETNESS_DRY, "dry"],
        [VAGINA_WETNESS_NORMAL, "normal"],
        [VAGINA_WETNESS_WET, "wet"],
        [VAGINA_WETNESS_SLICK, "slick"],
        [VAGINA_WETNESS_DROOLING, "drooling"],
        [VAGINA_WETNESS_SLAVERING, "slavering"],
    ];
    public static DEFAULT_VAGINA_LOOSENESS_SCALES: [number, string][] = [
        [VAGINA_LOOSENESS_TIGHT, "tight"],
        [VAGINA_LOOSENESS_NORMAL, "normal"],
        [VAGINA_LOOSENESS_LOOSE, "loose"],
        [VAGINA_LOOSENESS_GAPING, "gaping"],
        [VAGINA_LOOSENESS_GAPING_WIDE, "gaping wide"],
        [VAGINA_LOOSENESS_LEVEL_CLOWN_CAR, "clown-car level"],
    ];
    public static DEFAULT_ANAL_WETNESS_SCALES: [number, string][] = [
        [ANAL_WETNESS_DRY, "dry"],
        [ANAL_WETNESS_NORMAL, "normal"],
        [ANAL_WETNESS_MOIST, "moist"],
        [ANAL_WETNESS_SLIMY, "slimym"],
        [ANAL_WETNESS_DROOLING, "drooling"],
        [ANAL_WETNESS_SLIME_DROOLING, "slime-drooling"],
    ];
    public static DEFAULT_ANAL_LOOSENESS_SCALES: [number, string][] = [
        [ANAL_LOOSENESS_VIRGIN, "virgin"],
        [ANAL_LOOSENESS_TIGHT, "tight"],
        [ANAL_LOOSENESS_NORMAL, "normal"],
        [ANAL_LOOSENESS_LOOSE, "loose"],
        [ANAL_LOOSENESS_STRETCHED, "stretched"],
        [ANAL_LOOSENESS_GAPING, "gaping"],
    ];
    public static DEFAULT_HIP_RATING_SCALES: [number, string][] = [
        [HIP_RATING_BOYISH, "boyish"],
        [HIP_RATING_SLENDER, "slender"],
        [HIP_RATING_AVERAGE, "average"],
        [HIP_RATING_AMPLE, "ample"],
        [HIP_RATING_CURVY, "curvy"],
        [HIP_RATING_FERTILE, "fertile"],
        [HIP_RATING_INHUMANLY_WIDE, "inhumanly wide"],
    ];
    public static DEFAULT_BUTT_RATING_SCALES: [number, string][] = [
        [BUTT_RATING_BUTTLESS, "buttless"],
        [BUTT_RATING_TIGHT, "tight"],
        [BUTT_RATING_AVERAGE, "average"],
        [BUTT_RATING_NOTICEABLE, "noticeable"],
        [BUTT_RATING_LARGE, "large"],
        [BUTT_RATING_JIGGLY, "jiggly"],
        [BUTT_RATING_EXPANSIVE, "expansive"],
        [BUTT_RATING_HUGE, "huge"],
        [BUTT_RATING_INCONCEIVABLY_BIG, "inconceivably big"],
    ];

    /**
     * Assume scale = [[0,"small"],[5,"average"],[10,"big"]]
     *      value < 0   ->   "less than small"
     *      value = 0   ->   "small"
     *  0 < value < 5   ->   "between small and average"
     *      value = 5   ->   "average"
     *  5 < value < 10  ->   "between average and big"
     *      value = 10  ->   "big"
     *      value > 10  ->   "more than big"
     */
    public static describeByScale(
        value: number,
        scale: any[],
        lessThan = "less than",
        moreThan = "more than",
    ): string {
        if (scale.length == 0) return "undescribeale";
        if (scale.length == 1) return `about ${scale[0][1]}`;
        if (value < scale[0][0]) return `${lessThan} ${scale[0][1]}`;
        if (value == scale[0][0]) return scale[0][1];
        for (let i = 1; i < scale.length; i++) {
            if (value < scale[i][0]) return `between ${scale[i - 1][1]} and ${scale[i][1]}`;
            if (value == scale[i][0]) return scale[i][1];
        }
        return `${moreThan} ${scale[scale.length - 1][1]}`;
    }

    /**
     * numberOfThings(0,"brain") = "no brains"
     * numberOfThings(1,"head") = "one head"
     * numberOfThings(2,"tail") = "2 tails"
     * numberOfThings(3,"hoof","hooves") = "3 hooves"
     */
    public static numberOfThings(n: number, name: string, pluralForm?: string): string {
        pluralForm = pluralForm || `${name}s`;
        if (n == 0) return `no ${pluralForm}`;
        if (n == 1) return `one ${name}`;
        return `${n} ${pluralForm}`;
    }

    /**
     * 13 -> 2'1"
     * 5.5 -> 5.5"
     * Positive only!
     */
    public static feetsAndInches(n: number): string {
        const feet: number = Math.floor(n / 12);
        const inches: number = n - feet * 12;
        if (feet > 0) return `${feet}'${inches}"`;
        else return `${inches}"`;
    }

    /**
     * 13 -> 13" (2'1")
     */
    public static inchesAndFeetsAndInches(n: number): string {
        if (n < 12) return `${n}"`;
        return `${n}" (${Appearance.feetsAndInches(n)})`;
    }

    public static allBreastsDescript(creature: Creature): string {
        let storage = "";
        if (creature.breastRows.length == 0) return "unremarkable chest muscles ";
        if (creature.breastRows.length == 2) {
                        storage += "two rows of ";
        }
        if (creature.breastRows.length == 3) {
            if (Appearance.rand(2) == 0) storage += "three rows of ";
            else storage += "multi-layered ";
        }
        if (creature.breastRows.length == 4) {
            if (Appearance.rand(2) == 0) storage += "four rows of ";
            else storage += "four-tiered ";
        }
        if (creature.breastRows.length == 5) {
            if (Appearance.rand(2) == 0) storage += "five rows of ";
            else storage += "five-tiered ";
        }
        storage += Appearance.biggestBreastSizeDescript(creature);
        return storage;
    }

    public static tailDescript(iCreature: Creature): string {
        if (iCreature.tailType == TAIL_TYPE_NONE) {
            trace("WARNING: Creature has no tails to describe.");
            return "<b>!Creature has no tails to describe!</b>";
        }

        let descript = "";

        if (iCreature.tailType == TAIL_TYPE_FOX && iCreature.tailVenom >= 1) {
            // Kitsune tails, we're using tailVenom to track tail count
            if (iCreature.tailVenom > 1) {
                if (iCreature.tailVenom == 2) descript += "pair ";
                else if (iCreature.tailVenom == 3) descript += "trio ";
                else if (iCreature.tailVenom == 4) descript += "quartet ";
                else if (iCreature.tailVenom == 5) descript += "quintet ";
                else if (iCreature.tailVenom > 5) descript += "bundle ";

                descript += "of kitsune tails";
            } else descript += "kitsune tail";
        } else {
            descript += Appearance.DEFAULT_TAIL_NAMES[iCreature.tailType];
            descript += " tail";
        }

        return descript;
    }

    public static oneTailDescript(iCreature: Creature): string {
        if (iCreature.tailType == TAIL_TYPE_NONE) {
            trace("WARNING: Creature has no tails to describe.");
            return "<b>!Creature has no tails to describe!</b>";
        }

        let descript = "";

        if (iCreature.tailType == TAIL_TYPE_FOX && iCreature.tailVenom >= 1) {
            if (iCreature.tailVenom == 1) {
                descript += "your kitsune tail";
            } else {
                descript += "one of your kitsune tails";
            }
        } else {
            descript += `your ${Appearance.DEFAULT_TAIL_NAMES[iCreature.tailType]} tail`;
        }

        return descript;
    }

    public static biggestBreastSizeDescript(creature: Creature): string {
        let temp14: number = Math.random() * 3;
        let descript = "";
        const temp142: number = creature.biggestTitRow();
        // ERROR PREVENTION
        if (creature.breastRows.length - 1 < temp142) {
            CocSettings.error("");
            return "<b>ERROR, biggestBreastSizeDescript() working with invalid breastRow</b>";
        } else if (temp142 < 0) {
            CocSettings.error("");
            return "ERROR SHIT SON!  BIGGESTBREASTSIZEDESCRIPT PASSED NEGATIVE!";
        }
        if (creature.breastRows[temp142].breastRating < 1) return "flat breasts";
        // 50% of the time size-descript them
        if (Appearance.rand(2) == 0)
            descript += Appearance.breastSize(creature.breastRows[temp142].breastRating);
        // Nouns!
        temp14 = Appearance.rand(10);
        if (temp14 == 0) descript += "breasts";
        if (temp14 == 1) {
            if (creature.breastRows[temp142].lactationMultiplier > 2) descript += "milk-udders";
            else descript += "breasts";
        }
        if (temp14 == 2) {
            if (creature.breastRows[temp142].lactationMultiplier > 1.5) descript += "milky ";
            if (creature.breastRows[temp142].breastRating > 4) descript += "tits";
            else descript += "breasts";
        }
        if (temp14 == 3) {
                        descript += "breasts";
        }
        if (temp14 == 4) descript += "tits";
        if (temp14 == 5) descript += "tits";
        if (temp14 == 6) descript += "tits";
        if (temp14 == 7) {
            if (
                creature.breastRows[temp142].lactationMultiplier >= 1 &&
                creature.breastRows[temp142].lactationMultiplier < 2.5
            )
                descript += "milk jugs";
            if (creature.breastRows[temp142].lactationMultiplier >= 2.5) descript += "udders";
            if (creature.breastRows[temp142].lactationMultiplier < 1) descript += "jugs";
        }
        if (temp14 == 8) {
            if (creature.breastRows[temp142].breastRating > 6) descript += "love-pillows";
            else descript += "boobs";
        }
        if (temp14 == 9) {
            if (creature.breastRows[temp142].breastRating > 6) descript += "tits";
            else descript += "breasts";
        }
        return descript;
    }

    public static breastSize(val: number): string {
        let descript = "";
        // Catch all for dudes.
        if (val < 1) return "manly ";
        // Small - A->B
        if (val <= 2) {
            descript += Appearance.randomChoice("palmable ", "tight ", "perky ", "baseball-sized ");
        }
        // C-D
        else if (val <= 4) {
            descript += Appearance.randomChoice(
                "nice ",
                "hand-filling ",
                "well-rounded ",
                "supple ",
                "softball-sized ",
            );
        }
        // DD->big EE
        else if (val < 11) {
            descript += Appearance.randomChoice(
                "big ",
                "large ",
                "pillowy ",
                "jiggly ",
                "volleyball-sized ",
            );
        }
        // F->big FF
        else if (val < 15) {
            descript += Appearance.randomChoice(
                "soccerball-sized ",
                "hand-overflowing ",
                "generous ",
                "jiggling ",
            );
        }
        // G -> HHH
        else if (val < 24) {
            descript += Appearance.randomChoice(
                "basketball-sized ",
                "whorish ",
                "cushiony ",
                "wobbling ",
            );
        }
        // I -> KK
        else if (val < 35) {
            descript += Appearance.randomChoice(
                "massive motherly ",
                "luscious ",
                "smothering ",
                "prodigious ",
            );
        }
        // K- > MMM+
        else {
            descript += Appearance.randomChoice(
                "mountainous ",
                "monumental ",
                "back-breaking ",
                "exercise-ball-sized ",
                "immense ",
            );
        }
        return descript;
    }

    /* Moved to Creature.as
            public static  chestDesc(creature:Creature): string
            {
                if (creature.biggestTitSize() < 1) return "chest";
                else return biggestBreastSizeDescript(creature);
            }
    */

    public static assholeOrPussy(creature: Creature): string {
        if (creature.hasVagina()) return Appearance.vaginaDescript(creature, 0);
        return Appearance.assholeDescript(creature);
    }

    public static multiCockDescriptLight(creature: Creature): string {
        if (creature.cocks.length < 1) {
            CocSettings.error("");
            return "<B>Error: multiCockDescriptLight() called with no penises present.</B>";
        }
        // Get cock counts
        let descript = "";
        let currCock = 0;
        const totCock: number = creature.cocks.length;
        let dogCocks = 0;
        let horseCocks = 0;
        let normalCocks = 0;
                                                let same = true;
        // For temp14 random values
                let descripted = false;
        // If one, return normal cock descript
        if (totCock == 1) return creature.cockDescript(0);
        // Count cocks & Prep average totals
        while (currCock <= totCock - 1) {
            if (creature.cocks[currCock].cockType == CockTypesEnum.HUMAN) {
                normalCocks++;
                            }
            if (creature.cocks[currCock].cockType == CockTypesEnum.HORSE) {
                horseCocks++;
                            }
            if (creature.cocks[currCock].cockType == CockTypesEnum.DOG) {
                dogCocks++;
                            }
                                    // If cocks are matched make sure they still are
            if (
                same &&
                currCock > 0 &&
                creature.cocks[currCock].cockType != creature.cocks[currCock - 1].cockType
            )
                same = false;
            currCock++;
        }
        // Crunch averages
                        // Quantity descriptors
        if (creature.cockTotal() == 1) {
            if (dogCocks == 1) return Appearance.cockNoun(CockTypesEnum.DOG);
            if (horseCocks == 1) return Appearance.cockNoun(CockTypesEnum.HORSE);
            if (normalCocks == 1) return creature.cockDescript(0);
            // Failsafe
            return creature.cockDescript(0);
        }
        if (currCock == 2) {
            // For cocks that are the same
            if (same) {
                descript += Appearance.randomChoice(
                    "pair of ",
                    "two ",
                    "brace of ",
                    "matching ",
                    "twin ",
                );
                descript += creature.cockAdjective();
                if (normalCocks == 2) descript += ` ${Appearance.cockNoun(CockTypesEnum.HUMAN)}s`;
                if (horseCocks == 2) descript += `, ${Appearance.cockNoun(CockTypesEnum.HORSE)}s`;
                if (dogCocks == 2) descript += `, ${Appearance.cockNoun(CockTypesEnum.DOG)}s`;
                // Failsafe
                if (creature.cocks[0].cockType.Index > 2)
                    descript += `, ${Appearance.cockNoun(creature.cocks[0].cockType)}s`;
            }
            // Nonidentical
            else {
                descript += Appearance.randomChoice("pair of ", "two ", "brace of ");
                descript += `${creature.cockAdjective()}, `;
                descript += Appearance.randomChoice(
                    "mutated cocks",
                    "mutated dicks",
                    "mixed cocks",
                    "mismatched dicks",
                );
            }
        }
        if (currCock == 3) {
            // For samecocks
            if (same) {
                descript += Appearance.randomChoice(
                    "three ",
                    "group of ",
                    "<i>ménage à trois</i> of ",
                    "triad of ",
                    "triumvirate of ",
                );
                descript += creature.cockAdjective();
                if (normalCocks == 3) descript += ` ${Appearance.cockNoun(CockTypesEnum.HUMAN)}s`;
                if (horseCocks == 3) descript += `, ${Appearance.cockNoun(CockTypesEnum.HORSE)}s`;
                if (dogCocks == 3) descript += `, ${Appearance.cockNoun(CockTypesEnum.DOG)}s`;
                // Tentacles
                if (creature.cocks[0].cockType.Index > 2)
                    descript += `, ${Appearance.cockNoun(creature.cocks[0].cockType)}s`;
            } else {
                descript += Appearance.randomChoice("three ", "group of ");
                descript += `${creature.cockAdjective()}, `;
                descript += Appearance.randomChoice(
                    "mutated cocks",
                    "mutated dicks",
                    "mixed cocks",
                    "mismatched dicks",
                );
            }
        }
        // Large numbers of cocks!
        if (currCock > 3) {
            descript += Appearance.randomChoice(
                "bundle of ",
                "obscene group of ",
                "cluster of ",
                "wriggling bunch of ",
            );
            // Cock adjectives and nouns
            descripted = false;
            // Same
            if (same) {
                if (currCock == normalCocks) {
                    descript += `${creature.cockAdjective()} `;
                    descript += `${Appearance.cockNoun(CockTypesEnum.HUMAN)}s`;
                    descripted = true;
                }
                if (currCock == dogCocks) {
                    descript += `${creature.cockAdjective()}, `;
                    descript += `${Appearance.cockNoun(CockTypesEnum.DOG)}s`;
                    descripted = true;
                }
                if (currCock == horseCocks) {
                    descript += `${creature.cockAdjective()}, `;
                    descript += `${Appearance.cockNoun(CockTypesEnum.HORSE)}s`;
                    descripted = true;
                }
                if (creature.cocks[0].cockType.Index > 2) {
                    descript += `${creature.cockAdjective()}, `;
                    descript += `${Appearance.cockNoun(creature.cocks[0].cockType)}s`;
                    descripted = true;
                }
            }
            // If mixed
            if (!descripted) {
                descript += `${creature.cockAdjective()}, `;
                descript += Appearance.randomChoice(
                    "mutated cocks",
                    "mutated dicks",
                    "mixed cocks",
                    "mismatched dicks",
                );
            }
        }
        return descript;
    }

    public static multiCockDescript(creature: Creature): string {
        if (creature.cocks.length < 1) {
            CocSettings.error("");
            return "<B>Error: multiCockDescript() called with no penises present.</B>";
        }
        // Get cock counts
        let descript = "";
        let currCock = 0;
        const totCock: number = creature.cocks.length;
        let dogCocks = 0;
        let horseCocks = 0;
        let normalCocks = 0;
                                let averageLength = 0;
        let averageThickness = 0;
        let same = true;
        // For temp14 random values
                let descripted = false;
        // Count cocks & Prep average totals
        while (currCock <= totCock - 1) {
            // trace("Counting cocks!");
            if (creature.cocks[currCock].cockType == CockTypesEnum.HUMAN) {
                normalCocks++;
                            }
            if (creature.cocks[currCock].cockType == CockTypesEnum.HORSE) {
                horseCocks++;
                            }
            if (creature.cocks[currCock].cockType == CockTypesEnum.DOG) {
                dogCocks++;
                            }
            averageLength += creature.cocks[currCock].cockLength;
            averageThickness += creature.cocks[currCock].cockThickness;
            // If cocks are matched make sure they still are
            if (
                same &&
                currCock > 0 &&
                creature.cocks[currCock].cockType != creature.cocks[currCock - 1].cockType
            )
                same = false;
            currCock++;
        }
        // Crunch averages
        averageLength /= currCock;
        averageThickness /= currCock;
        // Quantity descriptors
        if (currCock == 1) {
            if (dogCocks == 1) return Appearance.cockNoun(CockTypesEnum.DOG);
            if (horseCocks == 1) return Appearance.cockNoun(CockTypesEnum.HORSE);
            if (normalCocks == 1) return Appearance.cockDescript(creature, 0);
            // Catch-all for when I add more cocks.  Let cock descript do the sorting.
            if (creature.cocks.length == 1) return Appearance.cockDescript(creature, 0);
        }
        if (currCock == 2) {
            // For cocks that are the same
            if (same) {
                descript += Appearance.randomChoice(
                    "a pair of ",
                    "two ",
                    "a brace of ",
                    "matching ",
                    "twin ",
                );
                descript += Appearance.cockAdjectives(
                    averageLength,
                    averageThickness,
                    creature.cocks[0].cockType,
                    creature,
                );
                if (normalCocks == 2) descript += ` ${Appearance.cockNoun(CockTypesEnum.HUMAN)}s`;
                if (horseCocks == 2) descript += `, ${Appearance.cockNoun(CockTypesEnum.HORSE)}s`;
                if (dogCocks == 2) descript += `, ${Appearance.cockNoun(CockTypesEnum.DOG)}s`;
                // Tentacles
                if (creature.cocks[0].cockType.Index > 2)
                    descript += `, ${Appearance.cockNoun(creature.cocks[0].cockType)}s`;
            }
            // Nonidentical
            else {
                descript += Appearance.randomChoice("a pair of ", "two ", "a brace of ");
                descript += `${Appearance.cockAdjectives(
                    averageLength,
                    averageThickness,
                    creature.cocks[0].cockType,
                    creature,
                )}, `;
                descript += Appearance.randomChoice(
                    "mutated cocks",
                    "mutated dicks",
                    "mixed cocks",
                    "mismatched dicks",
                );
            }
        }
        if (currCock == 3) {
            // For samecocks
            if (same) {
                descript += Appearance.randomChoice(
                    "three ",
                    "a group of ",
                    "a <i>ménage à trois</i> of ",
                    "a triad of ",
                    "a triumvirate of ",
                );
                descript += Appearance.cockAdjectives(
                    averageLength,
                    averageThickness,
                    creature.cocks[currCock - 1].cockType,
                    creature,
                );
                if (normalCocks == 3) descript += ` ${Appearance.cockNoun(CockTypesEnum.HUMAN)}s`;
                if (horseCocks == 3) descript += `, ${Appearance.cockNoun(CockTypesEnum.HORSE)}s`;
                if (dogCocks == 3) descript += `, ${Appearance.cockNoun(CockTypesEnum.DOG)}s`;
                // Tentacles
                if (creature.cocks[0].cockType.Index > 2)
                    descript += `, ${Appearance.cockNoun(creature.cocks[0].cockType)}s`; // Not sure what's going on here, referencing index *may* be a bug.
            } else {
                descript += Appearance.randomChoice("three ", "a group of ");
                descript += Appearance.cockAdjectives(
                    averageLength,
                    averageThickness,
                    creature.cocks[0].cockType,
                    creature,
                );
                descript += Appearance.randomChoice(
                    ", mutated cocks",
                    ", mutated dicks",
                    ", mixed cocks",
                    ", mismatched dicks",
                );
            }
        }
        // Large numbers of cocks!
        if (currCock > 3) {
            descript += Appearance.randomChoice(
                "a bundle of ",
                "an obscene group of ",
                "a cluster of ",
                "a wriggling group of ",
            );
            // Cock adjectives and nouns
            descripted = false;
            // If same types...
            if (same) {
                if (creature.cocks[0].cockType == CockTypesEnum.HUMAN) {
                    descript += `${Appearance.cockAdjectives(
                        averageLength,
                        averageThickness,
                        CockTypesEnum.HUMAN,
                        creature,
                    )} `;
                    descript += `${Appearance.cockNoun(CockTypesEnum.HUMAN)}s`;
                    descripted = true;
                }
                if (creature.cocks[0].cockType == CockTypesEnum.DOG) {
                    descript += `${Appearance.cockAdjectives(
                        averageLength,
                        averageThickness,
                        CockTypesEnum.DOG,
                        creature,
                    )}, `;
                    descript += `${Appearance.cockNoun(CockTypesEnum.DOG)}s`;
                    descripted = true;
                }
                if (creature.cocks[0].cockType == CockTypesEnum.HORSE) {
                    descript += `${Appearance.cockAdjectives(
                        averageLength,
                        averageThickness,
                        CockTypesEnum.HORSE,
                        creature,
                    )}, `;
                    descript += `${Appearance.cockNoun(CockTypesEnum.HORSE)}s`;
                    descripted = true;
                }
                // TODO More group cock type descriptions!
                if (creature.cocks[0].cockType.Index > 2) {
                    descript += `${Appearance.cockAdjectives(
                        averageLength,
                        averageThickness,
                        CockTypesEnum.HUMAN,
                        creature,
                    )}, `;
                    descript += `${Appearance.cockNoun(creature.cocks[0].cockType)}s`;
                    descripted = true;
                }
            }
            // If mixed
            if (!descripted) {
                descript += `${Appearance.cockAdjectives(
                    averageLength,
                    averageThickness,
                    creature.cocks[0].cockType,
                    creature,
                )}, `;
                                descript += Appearance.randomChoice(
                    "mutated cocks",
                    "mutated dicks",
                    "mixed cocks",
                    "mismatched dicks",
                );
            }
        }
        return descript;
    }
}
