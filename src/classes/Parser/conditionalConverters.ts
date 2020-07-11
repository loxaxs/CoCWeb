import { kGAMECLASS } from "../GlobalFlags/kGAMECLASS";

// Calls are now made through kGAMECLASS rather than thisPtr. This allows the compiler to detect if/when a function is inaccessible.

// Possible text arguments in the conditional of a if statement
// First, there is an attempt to cast the argument to a Number. If that fails,
// a dictionary lookup is performed to see if the argument is in the conditionalOptions[]
// object. If that fails, we just fall back to returning 0
export const conditionalOptions: Record<string, any> = {
    strength(): number {
        return kGAMECLASS.player.str;
    },
    toughness(): number {
        return kGAMECLASS.player.tou;
    },
    speed(): number {
        return kGAMECLASS.player.spe;
    },
    intelligence(): number {
        return kGAMECLASS.player.inte;
    },
    libido(): number {
        return kGAMECLASS.player.lib;
    },
    sensitivity(): number {
        return kGAMECLASS.player.sens;
    },
    corruption(): number {
        return kGAMECLASS.player.cor;
    },
    fatigue(): number {
        return kGAMECLASS.player.fatigue;
    },
    hp(): number {
        return kGAMECLASS.player.HP;
    },
    hour(): number {
        return kGAMECLASS.model.time.hours;
    },
    days(): number {
        return kGAMECLASS.model.time.days;
    },
    tallness(): number {
        return kGAMECLASS.player.tallness;
    },
    hairlength(): number {
        return kGAMECLASS.player.hairLength;
    },
    femininity(): number {
        return kGAMECLASS.player.femininity;
    },
    masculinity(): number {
        return 100 - kGAMECLASS.player.femininity;
    },
    cocks(): number {
        return kGAMECLASS.player.cockTotal();
    },
    breastrows(): number {
        return kGAMECLASS.player.bRows();
    },
    biggesttitsize(): number {
        return kGAMECLASS.player.biggestTitSize();
    },
    vagcapacity(): number {
        return kGAMECLASS.player.vaginalCapacity();
    },
    analcapacity(): number {
        return kGAMECLASS.player.analCapacity();
    },
    balls(): number {
        return kGAMECLASS.player.balls;
    },
    cumquantity(): number {
        return kGAMECLASS.player.cumQ();
    },
    // "biggesttitsize": function (): number { return kGAMECLASS.player.biggestTitSize(); },
    milkquantity(): number {
        return kGAMECLASS.player.lactationQ();
    },
    hasvagina(): boolean {
        return kGAMECLASS.player.hasVagina();
    },
    istaur(): boolean {
        return kGAMECLASS.player.isTaur();
    },
    isnaga(): boolean {
        return kGAMECLASS.player.isNaga();
    },
    isgoo(): boolean {
        return kGAMECLASS.player.isGoo();
    },
    isbiped(): boolean {
        return kGAMECLASS.player.isBiped();
    },
    hasbreasts(): boolean {
        return kGAMECLASS.player.biggestTitSize() >= 1;
    },
    hasballs(): boolean {
        return kGAMECLASS.player.balls > 0;
    },
    hascock(): boolean {
        return kGAMECLASS.player.hasCock();
    },
    isherm(): boolean {
        return kGAMECLASS.player.gender == 3;
    },
    cumnormal(): boolean {
        return kGAMECLASS.player.cumQ() <= 150;
    },
    cummedium(): boolean {
        return kGAMECLASS.player.cumQ() > 150 && kGAMECLASS.player.cumQ() <= 350;
    },
    cumhigh(): boolean {
        return kGAMECLASS.player.cumQ() > 350 && kGAMECLASS.player.cumQ() <= 1000;
    },
    cumveryhigh(): boolean {
        return kGAMECLASS.player.cumQ() > 1000 && kGAMECLASS.player.cumQ() <= 2500;
    },
    cumextreme(): boolean {
        return kGAMECLASS.player.cumQ() > 2500;
    },
    issquirter(): boolean {
        return kGAMECLASS.player.wetness() >= 4;
    },
    ispregnant(): boolean {
        return kGAMECLASS.player.pregnancyIncubation > 0;
    },
    isbuttpregnant(): boolean {
        return kGAMECLASS.player.buttPregnancyIncubation > 0;
    },
    hasnipplecunts(): boolean {
        return kGAMECLASS.player.hasFuckableNipples();
    },
    canfly(): boolean {
        return kGAMECLASS.player.canFly();
    },
    islactating(): boolean {
        return kGAMECLASS.player.lactationQ() > 0;
    },
    true(): boolean {
        return true;
    },
    false(): boolean {
        return false;
    },
};
