import { kFLAGS } from "../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../GlobalFlags/kGAMECLASS";

// Lookup dictionary for converting any single argument brackets into it's corresponding string
// basically [armor] results in the "[armor]" segment of the string being replaced with the
// results of the corresponding anonymous function, in this case: function(): any {return player.armorName;}
// tags not present in the singleArgConverters object return an error message.
//
// Calls are now made through kGAMECLASS rather than thisPtr. This allows the compiler to detect if/when a function is inaccessible.

// ```
// grep '\[[a-zA-Z0-9]+\]' -EoR src | grep -Eo '\[.*\]' | tr [A-Z] [a-z] | sort -u
// ```

export const singleArgConverters: Record<string, any> = {
    // all the errors related to trying to parse stuff if not present are
    // already handled in the various *Descript() functions.
    // no need to duplicate them.

    // Note: all key strings MUST be ENTIRELY lowercase.

    agility(): string {
        return "[Agility]";
    },
    armor(): string {
        return kGAMECLASS.player.armorName;
    },
    ass(): string { // Do not use. Use `butt`
        return kGAMECLASS.buttDescript();
    },
    asshole(): string {
        return kGAMECLASS.assholeDescript();
    },
    balls(): string {
        return kGAMECLASS.ballsDescriptLight();
    },
    boyfriend(): string {
        return kGAMECLASS.player.mf("boyfriend", "girlfriend");
    },
    breast(): string {
        return kGAMECLASS.player.breastDescript(0);
    },
    breastcup(): string { // `[breastcup]`
        return kGAMECLASS.player.breastCup(0);
    },
    butt(): string {
        return kGAMECLASS.buttDescript();
    },
    butthole(): string { // Do not use. Use `asshole`
        return kGAMECLASS.assholeDescript();
    },
    chest(): string {
        return kGAMECLASS.chestDesc();
    },
    clit(): string {
        return kGAMECLASS.clitDescript();
    },
    cock(): string {
        return kGAMECLASS.player.cockDescript(0);
    },
    cockhead(): string {
        return kGAMECLASS.player.cockHead(0);
    },
    cocks(): string {
        return kGAMECLASS.player.multiCockDescriptLight();
    },
    cunt(): string { // do not use, use `vagina`
        return kGAMECLASS.vaginaDescript();
    },
    eachcock(): string {
        return kGAMECLASS.player.sMultiCockDesc();
    },
    evade(): string {
        return "[Evade]";
    },
    face(): string {
        return kGAMECLASS.player.face();
    },
    feet(): string {
        return kGAMECLASS.player.feet();
    },
    foot(): string {
        return kGAMECLASS.player.foot();
    },
    fullchest(): string {
        return kGAMECLASS.player.allChestDesc();
    },
    hair(): string {
        return kGAMECLASS.hairDescript();
    },
    hairorfur(): string { // `[hairOrFur]`
        return kGAMECLASS.hairOrFur();
    },
    he(): string {
        return kGAMECLASS.player.mf("he", "she");
    },
    he2(): string {
        return kGAMECLASS.player2.mf("he", "she");
    },
    him(): string {
        return kGAMECLASS.player.mf("him", "her");
    },
    him2(): string {
        return kGAMECLASS.player2.mf("him", "her");
    },
    himself(): string {
        return kGAMECLASS.player.mf("himself", "herself");
    },
    himself2(): string {
        return kGAMECLASS.player2.mf("himself", "herself");
    },
    hips(): string {
        return kGAMECLASS.hipDescript();
    },
    his(): string {
        return kGAMECLASS.player.mf("his", "her");
    },
    his2(): string {
        return kGAMECLASS.player2.mf("his", "her");
    },
    leg(): string {
        return kGAMECLASS.player.leg();
    },
    legs(): string {
        return kGAMECLASS.player.legs();
    },
    man(): string {
        return kGAMECLASS.player.mf("man", "woman");
    },
    men(): string {
        return kGAMECLASS.player.mf("men", "women");
    },
    master(): string {
        return kGAMECLASS.player.mf("master", "mistress");
    },
    misdirection(): string {
        return "[Misdirection]";
    },
    name(): string {
        return kGAMECLASS.player.short;
    },
    nipple(): string {
        return kGAMECLASS.nippleDescript(0);
    },
    nipples(): string {
        return `${kGAMECLASS.nippleDescript(0)}s`;
    },
    onecock(): string {
        return kGAMECLASS.player.oMultiCockDesc();
    },
    pg(): string {
        return "\n\n";
    },
    pussy(): string { // Do not use, use `vagina`
        return kGAMECLASS.vaginaDescript();
    },
    race(): string {
        return kGAMECLASS.player.race();
    },
    sack(): string {
        return kGAMECLASS.sackDescript();
    },
    sheath(): string {
        return kGAMECLASS.player.sheathDescription();
    },
    skin(): string {
        return kGAMECLASS.player.skin();
    },
    skindesc(): string { // `[skinDesc]`
        return kGAMECLASS.player.skin();
    },
    skinfurscales(): string { // `[skinFurScales]`
        return kGAMECLASS.player.skinFurScales();
    },
    teasetext(): string { // `[teaseText]`
        return kGAMECLASS.teaseText();
    },
    tongue(): string {
        return kGAMECLASS.tongueDescript();
    },
    vagina(): string {
        return kGAMECLASS.vaginaDescript();
    },
    vagorass(): string {
        return kGAMECLASS.player.hasVagina()
            ? kGAMECLASS.vaginaDescript()
            : kGAMECLASS.assholeDescript();
    },
    weapon(): string {
        return kGAMECLASS.player.weaponName;
    },

    latexyname(): string {
        return kGAMECLASS.flags[kFLAGS.GOO_NAME];
    },
    bathgirlname(): string {
        return kGAMECLASS.flags[kFLAGS.MILK_NAME];
    },
    cockplural(): string {
        return kGAMECLASS.player.cocks.length == 1 ? "cock" : "cocks";
    },
    dickplural(): string {
        return kGAMECLASS.player.cocks.length == 1 ? "dick" : "dicks";
    },
    headplural(): string {
        return kGAMECLASS.player.cocks.length == 1 ? "head" : "heads";
    },
    prickplural(): string {
        return kGAMECLASS.player.cocks.length == 1 ? "prick" : "pricks";
    },
    boy(): string {
        return kGAMECLASS.player.mf("boy", "girl");
    },
    guy(): string {
        return kGAMECLASS.player.mf("guy", "girl");
    },
    wings(): string {
        return kGAMECLASS.wingsDescript();
    },
    tail(): string {
        return kGAMECLASS.tailDescript();
    },
    onetail(): string {
        return kGAMECLASS.oneTailDescript();
    },
};
