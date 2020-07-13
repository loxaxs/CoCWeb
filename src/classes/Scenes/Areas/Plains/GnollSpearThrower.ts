import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_DRY,
    BUTT_RATING_TIGHT,
    HIP_RATING_AMPLE,
    SKIN_TYPE_FUR,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_WETNESS_DROOLING,
} from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";
import { ChainedDrop } from "../../../internals/ChainedDrop";
import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";

/**
 * ...
 *
 * @author ...
 */
export class GnollSpearThrower extends Monster {
    private hyenaPhysicalAttack(): void {
        let damage = 0;
        // return to combat menu when finished
        this.doNext(this.game.playerMenu);
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && GnollSpearThrower.rand(3) < 2) {
            this.outx(
                `${this.capitalA + this.short} completely misses you with a blind attack!\n`,
                false,
            );
            // See below, removes the attack count once it hits rock bottom.
            if (this.statusAffectv1(StatusAffects.Attacks) == 0)
                this.removeStatusAffect(StatusAffects.Attacks);
            // Count down 1 attack then recursively call the function, chipping away at it.
            if (this.statusAffectv1(StatusAffects.Attacks) - 1 >= 0) {
                this.addStatusValue(StatusAffects.Attacks, 1, -1);
                this.eAttack();
            }
            return;
        }
        // Determine if dodged!
        if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx(
                "You see the gnoll's black lips pull back ever so slightly and the powerful muscles in her shapely thighs tense moments before she charges.  With a leap you throw yourself to the side, feeling the wind and fury pass through where you had just been standing.  You gracefully turn to face the hyena as she does the same, knowing that could have been very bad.",
            );
            return;
        }
        // Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && GnollSpearThrower.rand(100) < 10) {
            this.outx(
                `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s attack.\n`,
                false,
            );
            // See below, removes the attack count once it hits rock bottom.
            if (this.statusAffectv1(StatusAffects.Attacks) == 0)
                this.removeStatusAffect(StatusAffects.Attacks);
            // Count down 1 attack then recursively call the function, chipping away at it.
            if (this.statusAffectv1(StatusAffects.Attacks) - 1 >= 0) {
                this.addStatusValue(StatusAffects.Attacks, 1, -1);
                this.eAttack();
            }
            return;
        }
        // ("Misdirection"
        if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            GnollSpearThrower.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings, you anticipate and sidestep ${this.a}${this.short}' attacks.\n`,
                false,
            );
            // See below, removes the attack count once it hits rock bottom.
            if (this.statusAffectv1(StatusAffects.Attacks) == 0)
                this.removeStatusAffect(StatusAffects.Attacks);
            // Count down 1 attack then recursively call the function, chipping away at it.
            if (this.statusAffectv1(StatusAffects.Attacks) - 1 >= 0) {
                this.addStatusValue(StatusAffects.Attacks, 1, -1);
                this.eAttack();
            }
            return;
        }
        // Determine if cat'ed
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && GnollSpearThrower.rand(100) < 6) {
            this.outx(
                `With your incredible flexibility, you squeeze out of the way of ${this.a}${this.short}`,
            );
            if (this.plural) this.outx("' attacks.\n");
            else this.outx("'s attack.\n");
            // See below, removes the attack count once it hits rock bottom.
            if (this.statusAffectv1(StatusAffects.Attacks) == 0)
                this.removeStatusAffect(StatusAffects.Attacks);
            // Count down 1 attack then recursively call the function, chipping away at it.
            if (this.statusAffectv1(StatusAffects.Attacks) - 1 >= 0) {
                this.addStatusValue(StatusAffects.Attacks, 1, -1);
                this.eAttack();
            }
            return;
        }
        // Determine damage - str modified by enemy toughness!
        damage = Math.floor(
            this.str + this.weaponAttack - Math.random() * this.player.tou - this.player.armorDef,
        );
        if (damage > 0) damage = this.player.takeDamage(damage);
        if (damage <= 0) {
            damage = 0;
            // Due to toughness or amor...
            if (
                GnollSpearThrower.rand(this.player.armorDef + this.player.tou) <
                this.player.armorDef
            )
                this.outx(
                    `The gnoll before you suddenly charges, almost too fast to see.  Twin fists slam into your ${this.player.armorName} with enough force to stagger you, but the force is absorbed without doing any real damage.  As jaws powerful enough to crush bone flash at your neck, you are able to twist to the side, letting the furious hyena slip by you.`,
                );
            else
                this.outx(
                    `You deflect and block every ${this.weaponVerb} ${this.a}${this.short} throws at you.`,
                );
        } else {
            if (damage < 10)
                this.outx(
                    `The gnoll runs forward, fury in her dark eyes as twin fists glance off your chest.  The glancing blow sends her off balance and the flashing ivory jaws barely miss your throat.  You push back, stumbling away from the furious hyena. (${damage})`,
                );
            else
                this.outx(
                    `The gnoll rushes forward, almost too fast to detect before twin fists slam into your torso.  Before you can recover, ivory jaws flash before your eyes and you feel the sharp teeth start to clamp onto the ${this.player.skinDesc} of your neck.  Blinding pain causes you to fling yourself backwards, away from the teeth and drawing angry scrapes as you escape the jaws.  You roll away before picking yourself up, the hyena moving confidently towards you as you try to shake off the pain from the blow. (${damage})`,
                );
        }
        if (damage > 0) {
            if (this.short == "fetish zealot") {
                this.outx(
                    "\nYou notice that some kind of unnatural heat is flowing into your body from the wound",
                );
                if (this.player.inte > 50)
                    this.outx(", was there some kind of aphrodisiac on the knife?");
                else this.outx(".");
                this.game.dynStats("lus", this.player.lib / 20 + GnollSpearThrower.rand(4) + 1);
            }
            if (this.lustVuln > 0 && this.player.armorName == "barely-decent bondage straps") {
                if (!this.plural)
                    this.outx(
                        `\n${this.capitalA}${this.short} brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.`,
                        false,
                    );
                else
                    this.outx(
                        `\n${this.capitalA}${this.short} brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.`,
                        false,
                    );
                this.lust += 5 * this.lustVuln;
            }
        }
        this.statScreenRefresh();
        this.outx("\n");
        this.combatRoundOver();
    }

    // <Writers note: I recommend that the javelin have a chance to greatly decrease speed for the remaining battle.  I am writing the flavor text for this event if you choose to include it>
    private hyenaJavelinAttack(): void {
        let damage = 0;
        let slow = 0;
        // <Hyena Attack 2 – Javelin – Unsuccessful – Dodged>
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && GnollSpearThrower.rand(3) < 2) {
            this.outx(
                "The gnoll pulls a javelin from behind her and throws it at you, but blind as she is, it goes wide.",
            );
        }
        // Determine if dodged!
        else if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx(
                "The gnoll pulls a long, dark wooden javelin from over her shoulder.  Her spotted arm strikes forward, launching the missile through the air.  The spear flashes through the distance towards your vulnerable form.  Even as you see doom sailing towards you, a primal instinct to duck pulls you down, and you feel the wind from the massive missile as it passes close to your ear.",
            );
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && GnollSpearThrower.rand(100) < 10) {
            this.outx(
                `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s thrown spear.\n`,
                false,
            );
        }
        // ("Misdirection"
        else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            GnollSpearThrower.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings, you anticipate and sidestep ${this.a}${this.short}' thrown spear.\n`,
                false,
            );
        }
        // Determine if cat'ed
        else if (
            this.player.findPerk(PerkLib.Flexibility) >= 0 &&
            GnollSpearThrower.rand(100) < 6
        ) {
            this.outx(
                `With your incredible flexibility, you squeeze out of the way of ${this.a}${this.short}'s thrown spear.`,
            );
        }
        // <Hyena Attack 2 – Javelin – Unsuccessful – Absorbed>
        else if (this.player.armorDef > 10 && GnollSpearThrower.rand(2) == 0) {
            this.outx(
                `The gnoll pulls a long, dark wooden javelin from over her shoulder.  Her spotted arm strikes forward, launching the missile through the air.  The spear flashes through the air but hits at an angle, sliding off your ${this.player.armorName} without doing any damage.  It disappears into the grass.`,
            );
        } else if (this.player.findPerk(PerkLib.Resolute) >= 0 && this.player.tou >= 75) {
            this.outx(
                "You resolutely ignore the spear, brushing the blunted tip away when it hits you.\n",
            );
        }
        // <Hyena Attack 2 – Javelin – Successful – Player Entangled>
        else if (GnollSpearThrower.rand(3) >= 1) {
            damage = this.player.takeDamage(25 + GnollSpearThrower.rand(20));
            this.outx(
                `The gnoll pulls a long, black javelin from over her shoulder.  Her spotted arm strikes forward, launching the missile through the air.  You attempt to dive to the side, but are too late.  The powerful shaft slams, hard, into your back.  Pain radiates from the powerful impact.  Instead of piercing you, however, the tip seems to explode into a sticky goo that instantly bonds with your ${this.player.armorName}.  The four foot, heavy shaft pulls down on you awkwardly, catching at things and throwing your balance off.  You try to tug the javelin off of you but find that it has glued itself to you.  It will take time and effort to remove; making it impossible to do while a dominant hyena stalks you. (${damage})`,
            );
            if (this.player.findStatusAffect(StatusAffects.GnollSpear) < 0)
                this.player.createStatusAffect(StatusAffects.GnollSpear, 0, 0, 0, 0);
            slow = 15;
            while (slow > 0 && this.player.spe > 2) {
                slow--;
                this.player.addStatusValue(StatusAffects.GnollSpear, 1, 1);
                this.player.spe--;
                GnollSpearThrower.showStatDown("spe");


            }
        }
        // <Hyena Attack 2 – Javelin – Successful – Player Not Entangled>
        else {
            damage = this.player.takeDamage(25 + GnollSpearThrower.rand(20));
            this.outx(
                `The gnoll pulls a long, dark wooden javelin from over her shoulder.  Her spotted arm strikes forward, launching the missile through the air.  The javelin flashes through the intervening distance, slamming into your chest.  The blunted tip doesn't skewer you, but pain radiates from the bruising impact. (${damage})`,
            );
        }
        this.combatRoundOver();
    }

    // <Writer's Note: With the third attack, I intend that the damage be increased based on the breast size of the player.  Thus, the text will vary if the player is flat-chested as indicated by colored text.>
    private hyenaSnapKicku(): void {
        let damage = 0;
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && GnollSpearThrower.rand(3) < 2) {
            this.outx(
                "The gnoll tries to catch you with a brutal snap-kick, but blind as she is, she completely misses.",
            );
        }
        // Determine if dodged!
        else if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx(
                `The gnoll grins at you before striding forward and pivoting.  A spotted leg snaps up and out, flashing through the air towards your ${this.chestDesc()}.  You step back just in time, robbing the blow of force.  The paw lightly strikes your torso before the female hyena springs back, glaring at you.`,
            );
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && GnollSpearThrower.rand(100) < 10) {
            this.outx(
                `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s snap-kick.\n`,
                false,
            );
        }
        // ("Misdirection"
        else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            GnollSpearThrower.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings, you anticipate and sidestep ${this.a}${this.short}' snap-kick.\n`,
                false,
            );
        }
        // Determine if cat'ed
        else if (
            this.player.findPerk(PerkLib.Flexibility) >= 0 &&
            GnollSpearThrower.rand(100) < 6
        ) {
            this.outx(
                `With your incredible flexibility, you squeeze out of the way of ${this.a}${this.short}'s snap-kick.`,
            );
        }
        // Determine damage - str modified by enemy toughness!
        else {
            damage = this.player.biggestTitSize();
            if (damage > 20) damage = 20;
            damage += Math.floor(this.str - Math.random() * this.player.tou - this.player.armorDef);
            if (damage > 0) damage = this.player.takeDamage(damage);
            // No damage
            if (damage <= 0) {
                this.outx(
                    `The gnoll tries to catch your ${this.chestDesc()} with a snap-kick, but you manage to block the vicious blow.`,
                );
            }
            // <Hyena Attack 3 – Snap Kick – Successful>
            else {
                this.outx(
                    `A glint enters the dark eyes of the gnoll before she strides forward and pivots.  A long, spotted leg snaps up and out to slam against your ${this.chestDesc()}`,
                );
                if (this.player.biggestTitSize() >= 1)
                    this.outx(", sending a wave of pain through the sensitive flesh");
                this.outx(
                    `.  A small, traitorous part of you can't help but notice a flash of long, dark flesh beneath her loincloth even as you stagger back from the impact. (${damage})`,
                );
                this.game.dynStats("lus", 2);
            }
        }
        this.combatRoundOver();
    }

    private hyenaArousalAttack(): void {
        // Success = cor+lib > rand(150)
        const chance: number = GnollSpearThrower.rand(150);
        // <Hyena Attack 4 – Arousal Attack – Highly Successful>
        if (this.player.cor + this.player.lib > chance + 50) {
            this.outx(
                "A wry grin spreads across the gnoll's face before she sprints towards you.  Too fast to follow, she flies forward, and you desperately brace for an impact that doesn't come.  Instead of striking you, two spotted paws clamp behind your neck and pull your head down, planting your face against her leather loincloth.  A powerful, musky smell burns in your nose and the feel of firm flesh behind the flimsy leather leaves a tingling sensation along your face.  She holds you there, pressed against her groin for several moments, desire growing deep within your body, before you find the strength and will to pull away.  The amazon grins, letting you stumble back as you try to fight off the feel of her body.\n\n",
            );
            this.game.dynStats("lus", 25 + this.player.lib / 20 + this.player.sens / 5);
        }
        // <Hyena Attack 4 – Arousal Attack – Mildly Successful>
        else if (20 + this.player.cor + this.player.lib > chance) {
            this.outx(
                "A lazy grin spreads across the gnoll's face before she sprints towards you.  Too fast to follow, she flies forward, and you desperately brace for an impact that doesn't come.  Instead of striking you, two spotted paws clamp behind your neck and pull your head down, planting your face against her leather loincloth.  A powerful, musky smell burns in your nose and the feel of firm flesh behind the flimsy leather leaves a tingling sensation along your face.  Instinctively, you tear away from the hold, stumbling away from the sensations filling your mind, though some desire remains kindled within you.",
            );
            this.game.dynStats("lus", 15 + this.player.lib / 20 + this.player.sens / 5);
        }
        // <Hyena Attack 4 – Arousal Attack – Unsuccessful>
        else {
            this.outx(
                "A knowing glint fills the dark eyes of the gnoll before she sprints forward.  Your muscles tense as she reaches you and starts to lock two spotted paws behind your neck.  She pulls you down towards her musky crotch, but just as you brush her loincloth, you twist away.  The hyena snarls in frustration, and you're left wondering if that was her idea of foreplay.",
            );
        }
        this.combatRoundOver();
    }

    public eAttack(): void {
        let damage = 0;
        // return to combat menu when finished
        this.doNext(this.game.playerMenu);
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && GnollSpearThrower.rand(3) < 2) {
            this.outx(
                `${this.capitalA + this.short} completely misses you with a blind attack!\n`,
                false,
            );
            // See below, removes the attack count once it hits rock bottom.
            if (this.statusAffectv1(StatusAffects.Attacks) == 0)
                this.removeStatusAffect(StatusAffects.Attacks);
            // Count down 1 attack then recursively call the function, chipping away at it.
            if (this.statusAffectv1(StatusAffects.Attacks) - 1 >= 0) {
                this.addStatusValue(StatusAffects.Attacks, 1, -1);
                this.eAttack();
            }
        }
        // Determine if dodged!
        if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx(
                "You see the gnoll's black lips pull back ever so slightly and the powerful muscles in her shapely thighs tense moments before she charges.  With a leap you throw yourself to the side, feeling the wind and fury pass through where you had just been standing.  You gracefully turn to face the hyena as she does the same, knowing that could have been very bad.",
            );
        }
        // Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && GnollSpearThrower.rand(100) < 10) {
            this.outx(
                `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s attack.\n`,
                false,
            );
            // See below, removes the attack count once it hits rock bottom.
            if (this.statusAffectv1(StatusAffects.Attacks) == 0)
                this.removeStatusAffect(StatusAffects.Attacks);
            // Count down 1 attack then recursively call the function, chipping away at it.
            if (this.statusAffectv1(StatusAffects.Attacks) - 1 >= 0) {
                this.addStatusValue(StatusAffects.Attacks, 1, -1);
                this.eAttack();
            }
        }
        // ("Misdirection"
        if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            GnollSpearThrower.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings, you anticipate and sidestep ${this.a}${this.short}' attacks.\n`,
                false,
            );
            // See below, removes the attack count once it hits rock bottom.
            if (this.statusAffectv1(StatusAffects.Attacks) == 0)
                this.removeStatusAffect(StatusAffects.Attacks);
            // Count down 1 attack then recursively call the function, chipping away at it.
            if (this.statusAffectv1(StatusAffects.Attacks) - 1 >= 0) {
                this.addStatusValue(StatusAffects.Attacks, 1, -1);
                this.eAttack();
            }
        }
        // Determine if cat'ed
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && GnollSpearThrower.rand(100) < 6) {
            this.outx(
                `With your incredible flexibility, you squeeze out of the way of ${this.a}${this.short}`,
            );
            if (this.plural) this.outx("' attacks.\n");
            else this.outx("'s attack.\n");
            // See below, removes the attack count once it hits rock bottom.
            if (this.statusAffectv1(StatusAffects.Attacks) == 0)
                this.removeStatusAffect(StatusAffects.Attacks);
            // Count down 1 attack then recursively call the function, chipping away at it.
            if (this.statusAffectv1(StatusAffects.Attacks) - 1 >= 0) {
                this.addStatusValue(StatusAffects.Attacks, 1, -1);
                this.eAttack();
            }
        }
        // Determine damage - str modified by enemy toughness!
        damage = Math.floor(
            this.str + this.weaponAttack - Math.random() * this.player.tou - this.player.armorDef,
        );
        if (damage > 0) damage = this.player.takeDamage(damage);
        if (damage <= 0) {
            damage = 0;
            // Due to toughness or amor...
            if (
                GnollSpearThrower.rand(this.player.armorDef + this.player.tou) <
                this.player.armorDef
            )
                this.outx(
                    `The gnoll before you suddenly charges, almost too fast to see.  Twin fists slam into your ${this.player.armorName} with enough force to stagger you, but the force is absorbed without doing any real damage.  As jaws powerful enough to crush bone flash at your neck, you are able to twist to the side, letting the furious hyena slip by you.`,
                );
            else
                this.outx(
                    `You deflect and block every ${this.weaponVerb} ${this.a}${this.short} throws at you.`,
                );
        } else {
            if (damage < 10)
                this.outx(
                    `The gnoll runs forward, fury in her dark eyes as twin fists glance off your chest.  The glancing blow sends her off balance and the flashing ivory jaws barely miss your throat.  You push back, stumbling away from the furious hyena. (${damage})`,
                );
            else
                this.outx(
                    `The gnoll rushes forward, almost too fast to detect before twin fists slam into your torso.  Before you can recover, ivory jaws flash before your eyes and you feel the sharp teeth start to clamp onto the ${this.player.skinDesc} of your neck.  Blinding pain causes you to fling yourself backwards, away from the teeth and drawing angry scrapes as you escape the jaws.  You roll away before picking yourself up, the hyena moving confidently towards you as you try to shake off the pain from the blow. (${damage})`,
                );
        }
        if (damage > 0) {
            if (this.short == "fetish zealot") {
                this.outx(
                    "\nYou notice that some kind of unnatural heat is flowing into your body from the wound",
                );
                if (this.player.inte > 50)
                    this.outx(", was there some kind of aphrodisiac on the knife?");
                else this.outx(".");
                this.game.dynStats("lus", this.player.lib / 20 + GnollSpearThrower.rand(4) + 1);
            }
            if (this.lustVuln > 0 && this.player.armorName == "barely-decent bondage straps") {
                if (!this.plural)
                    this.outx(
                        `\n${this.capitalA}${this.short} brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.`,
                        false,
                    );
                else
                    this.outx(
                        `\n${this.capitalA}${this.short} brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.`,
                        false,
                    );
                this.lust += 5 * this.lustVuln;
            }
        }
        this.statScreenRefresh();
        this.outx("\n");
        this.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        if (this.short == "alpha gnoll") {
            this.game.clearOutput();
            this.outx(
                "The gnoll alpha is defeated!  You could use her for a quick, willing fuck to sate your lusts before continuing on.  Hell, you could even dose her up with that succubi milk you took from the goblin first - it might make her even hotter.  Do you?",
            );
            this.game.menu();
            this.game.addButton(0, "Fuck", this.game.urtaQuest.winRapeHyenaPrincess);
            this.game.addButton(
                1,
                "Succ Milk",
                this.game.urtaQuest.useSuccubiMilkOnGnollPrincesses,
            );
            this.game.addButton(4, "Leave", this.game.urtaQuest.urtaNightSleep);
        } else {
            this.game.plains.gnollSpearThrowerScene.hyenaVictory();
        }
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (this.short == "alpha gnoll") {
            this.game.urtaQuest.loseToGnollPrincessAndGetGangBanged();
        } else if (pcCameWorms) {
            this.outx("\n\nYour foe doesn't seem put off enough to leave...");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.plains.gnollSpearThrowerScene.hyenaSpearLossAnal();
        }
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "gnoll spear-thrower";
        this.imageName = "gnollspearthrower";
        this.long =
            "You are fighting a gnoll.  An amalgam of voluptuous, sensual lady and snarly, pissed off hyena, she clearly intends to punish you for trespassing.  Her dark-tan, spotted hide blends into a soft cream-colored fur covering her belly and two D-cup breasts, leaving two black nipples poking through the fur.  A crude loincloth is tied around her waist, obscuring her groin from view.  A leather strap cuts between her heavy breasts, holding a basket of javelins on her back.  Large, dish-shaped ears focus on you, leaving no doubt that she can hear every move you make.  Sharp, dark eyes are locked on your body, filled with aggression and a hint of lust.";
        this.createVagina(false, VAGINA_WETNESS_DROOLING, VAGINA_LOOSENESS_LOOSE);
        this.createBreastRow(Appearance.breastCupInverse("D"));
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 25, 0, 0, 0);
        this.tallness = 72;
        this.hipRating = HIP_RATING_AMPLE;
        this.buttRating = BUTT_RATING_TIGHT;
        this.skinTone = "tawny";
        this.skinType = SKIN_TYPE_FUR;
        // this.skinDesc = Appearance.Appearance.DEFAULT_SKIN_DESCS[SKIN_TYPE_FUR];
        this.hairColor = "black";
        this.hairLength = 22;
        this.initStrTouSpeInte(85, 60, 100, 50);
        this.initLibSensCor(65, 45, 60);
        this.weaponName = "teeth";
        this.weaponVerb = "bite";
        this.weaponAttack = 0;
        this.weaponPerk = "";
        this.weaponValue = 25;
        this.armorName = "skin";
        this.armorDef = 2;
        this.bonusHP = 250;
        this.lust = 30;
        this.lustVuln = 0.35;
        this.temperment = GnollSpearThrower.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 10;
        this.gems = 10 + GnollSpearThrower.rand(5);
        this.drop = new ChainedDrop()
            .add(this.consumables.GROPLUS, 1 / 5)
            .add(this.consumables.INCUBID, 1 / 2)
            .elseDrop(this.consumables.BROWN_D);
        this.special1 = this.hyenaJavelinAttack;
        this.special2 = this.hyenaSnapKicku;
        this.special3 = this.hyenaArousalAttack;
        this.checkMonster();
    }
}
