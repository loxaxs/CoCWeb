import { Monster } from "../../Monster";
import { StatusAffects } from "../../StatusAffects";
import { PerkLib } from "../../PerkLib";
import { trace } from "../../../console";
import { VAGINA_WETNESS_NORMAL, VAGINA_LOOSENESS_NORMAL, ANAL_LOOSENESS_VIRGIN, ANAL_WETNESS_DRY, HIP_RATING_CURVY, BUTT_RATING_LARGE, LOWER_BODY_TYPE_HOOFED, TAIL_TYPE_COW } from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { WeightedDrop } from "../../internals/WeightedDrop";

export class Marble extends Monster {
    private marbleSpecialAttackOne(): void {
        //Special1: Heavy overhead swing, high chance of being avoided with evasion, does heavy damage if it hits.
        var damage: number = 0;
        //Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0) {
            this.outputText("Marble unwisely tries to make a massive swing while blinded, which you are easily able to avoid.", false);
            this.combatRoundOver();
            return;
        }
        //Determine if dodged!
        if (this.player.spe - this.spe > 0 && Math.floor(Math.random() * (((this.player.spe - this.spe) / 4) + 80)) > 60) {
            this.outputText("You manage to roll out of the way of a massive overhand swing.", false);
            this.combatRoundOver();
            return;
        }
        //Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && Marble.rand(100) < 60) {
            this.outputText("You easily sidestep as Marble tries to deliver a huge overhand blow.", false);
            this.combatRoundOver();
            return;
        }
        //Determine damage - str modified by enemy toughness!
        damage = Math.floor((this.str + 20 + this.weaponAttack) - Math.random() * (this.player.tou) - this.player.armorDef);
        if (damage <= 0) {
            damage = 0;
            //Due to toughness or amor...
            this.outputText("You somehow manage to deflect and block Marble's massive overhead swing.", false);
        }
        if (damage > 0) damage = this.player.takeDamage(damage);
        this.outputText("You are struck by a two-handed overhead swing from the enraged cow-girl.  (" + damage + " damage).", false);
        this.statScreenRefresh();
        this.combatRoundOver();
    }
    private marbleSpecialAttackTwo(): void {
        //Special2: Wide sweep; very high hit chance, does low damage.
        var damage: number = 0;
        //Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0) {
            this.outputText("Marble makes a wide sweeping attack with her hammer, which is difficult to avoid even from a blinded opponent.\n", false);
        }
        //Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && Marble.rand(100) < 10) {
            this.outputText("You barely manage to avoid a wide sweeping attack from marble by rolling under it.", false);
            this.combatRoundOver();
            return;
        }
        //Determine damage - str modified by enemy toughness!
        damage = Math.floor((this.str + 40 + this.weaponAttack) - Math.random() * (this.player.tou) - this.player.armorDef);
        damage /= 2;
        if (damage <= 0) {
            damage = 0;
            //Due to toughness or amor...
            this.outputText("You easily deflect and block the damage from Marble's wide swing.", false);
        }
        this.outputText("Marble easily hits you with a wide, difficult to avoid swing.  (" + damage + " damage).", false);
        if (damage > 0) this.player.takeDamage(damage);
        this.statScreenRefresh();
        this.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        this.game.marbleScene.marbleFightWin();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.marbleScene.marbleFightLose();
    }

    public constructor() {
        super();
        trace("Marble Constructor!");
        this.a = "";
        this.short = "Marble";
        this.imageName = "marble";
        this.long = "Before you stands a female humanoid with numerous cow features, such as medium-sized cow horns, cow ears, and a cow tail.  She is very well endowed, with wide hips and a wide ass.  She stands over 6 feet tall.  She is using a large two handed hammer with practiced ease, making it clear she is much stronger than she may appear to be.";
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_NORMAL, VAGINA_LOOSENESS_NORMAL);
        this.createBreastRow(Appearance.breastCupInverse("F"));
        this.ass.analLooseness = ANAL_LOOSENESS_VIRGIN;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.tallness = 6 * 12 + 4;
        this.hipRating = HIP_RATING_CURVY;
        this.buttRating = BUTT_RATING_LARGE;
        this.lowerBody = LOWER_BODY_TYPE_HOOFED;
        this.skinTone = "pale";
        this.hairColor = "brown";
        this.hairLength = 13;
        this.initStrTouSpeInte(75, 70, 35, 40);
        this.initLibSensCor(25, 45, 40);
        this.weaponName = "large hammer";
        this.weaponVerb = "hammer-blow";
        this.weaponAttack = 10;
        this.armorName = "tough hide";
        this.armorDef = 5;
        this.temperment = Marble.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 7;
        this.gems = Marble.rand(5) + 25;
        this.drop = new WeightedDrop(this.weapons.L_HAMMR, 1);
        this.tailType = TAIL_TYPE_COW;
        this.special1 = this.marbleSpecialAttackOne;
        this.special2 = this.marbleSpecialAttackTwo;
        this.checkMonster();
    }

}


