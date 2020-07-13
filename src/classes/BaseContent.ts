import { GameModel } from "../model/GameModel";
import { TimeModel } from "../model/TimeModel";
import { MainView } from "../view/MainView";
import { OtherKeys, StatKeys } from "../view/StatsView";
import { Appearance } from "./Appearance";
import { ASDate } from "./ASDate";
import { CoC } from "./CoC";
import { kGAMECLASS } from "./GlobalFlags/kGAMECLASS";
import { ImageManager } from "./ImageManager";
import { Utils } from "./internals/Utils";
import { ArmorLib } from "./Items/ArmorLib";
import { ConsumableLib } from "./Items/ConsumableLib";
import { UseableLib } from "./Items/UseableLib";
import { WeaponLib } from "./Items/WeaponLib";
import { Monster } from "./Monster";
import { Player } from "./Player";
import { Camp } from "./Scenes/Camp";
import { D3 } from "./Scenes/Dungeons/D3/D3";
import { Inventory } from "./Scenes/Inventory";

/**
 * Quick hacky method to wrap new content in a class-based structure
 * BaseContent acts as an access wrapper around CoC, enabling children of BaseContent to interact with
 * function instances/properties of CoC in the same manner older content does with the minimal amount
 * of modification.
 * Also this means we might start being able to get IDE autocomplete shit working again! Huzzah!
 *
 * @author Gedan
 */
export class BaseContent extends Utils {
    // TODO remove when we have proper enums for this

    public getGame(): CoC {
        return kGAMECLASS;
    }

    public cheatTime(time: number): void {
        kGAMECLASS.cheatTime(time);
    }
    public get timeQ(): number {
        return kGAMECLASS.timeQ;
    }

    public get camp(): Camp {
        return kGAMECLASS.camp;
    }

    public get d3(): D3 {
        return kGAMECLASS.d3;
    }

    public goNext(time: number, defNext: boolean): boolean {
        return kGAMECLASS.goNext(time, defNext);
    }

    public isHalloween(): boolean {
        return kGAMECLASS.isHalloween();
    }

    public isValentine(): boolean {
        return kGAMECLASS.isValentine();
    }

    public isHolidays(): boolean {
        return kGAMECLASS.isHolidays();
    }

    public isEaster(): boolean {
        return kGAMECLASS.isEaster();
    }

    public isThanksgiving(): boolean {
        return kGAMECLASS.isThanksgiving();
    }

    public get date(): ASDate {
        return kGAMECLASS.date;
    }

    public get inDungeon(): boolean {
        return kGAMECLASS.inDungeon;
    }

    public get inRoomedDungeon(): boolean {
        return kGAMECLASS.inRoomedDungeon;
    }
    public set inRoomedDungeon(v: boolean) {
        kGAMECLASS.inRoomedDungeon = v;
    }

    public get inRoomedDungeonResume(): any {
        return kGAMECLASS.inRoomedDungeonResume;
    }
    public set inRoomedDungeonResume(v: any) {
        kGAMECLASS.inRoomedDungeonResume = v;
    }

    public showStats(): void {
        kGAMECLASS.showStats();
    }

    public statScreenRefresh(): void {
        kGAMECLASS.statScreenRefresh();
    }

    public cleanupAfterCombat(nextFunc?: any): void {
        kGAMECLASS.cleanupAfterCombat(nextFunc);
    }

    public combatRoundOver() {
        return kGAMECLASS.combatRoundOver();
    }

    public enemyAI(): void {
        kGAMECLASS.enemyAI();
    }

    public spriteSelect(choice = 0): void {
        kGAMECLASS.spriteSelect(choice);
    }

    public hideStats(): void {
        kGAMECLASS.hideStats();
    }
    public hideUpDown(): void {
        kGAMECLASS.hideUpDown();
    }

    public startCombat(monster_: Monster, plotFight_ = false): void {
        kGAMECLASS.startCombat(monster_, plotFight_);
    }
    public startCombatImmediate(monster: Monster, _plotFight = false): void {
        kGAMECLASS.startCombatImmediate(monster, _plotFight);
    }

    // Needed in a few rare cases for dumping text coming from a source that can't properly escape it's brackets
    // (Mostly traceback printing, etc...)
    public rawOutputText(output: string, purgeText = false): void {
        kGAMECLASS.rawOutputText(output, purgeText);
    }

    public outx(output: string, purgeText = false, parseAsMarkdown = false): void {
        kGAMECLASS.outx(output, purgeText, parseAsMarkdown);
    }

    public clearOutput(): void {
        kGAMECLASS.currentText = "";
        kGAMECLASS.mainView.clearOutputText();
    }

    public doNext(eventNo: any): void {
        // Now typesafe
        kGAMECLASS.doNext(eventNo);
    }

    public menu(): void {
        kGAMECLASS.menu();
    }

    public hideMenus(): void {
        kGAMECLASS.hideMenus();
    }
    // prettier-ignore
    public choices(
        text1?: string, butt1?: (() => void) | 0,
        text2?: string, butt2?: (() => void) | 0,
        text3?: string, butt3?: (() => void) | 0,
        text4?: string, butt4?: (() => void) | 0,
        text5?: string, butt5?: (() => void) | 0,
        text6?: string, butt6?: (() => void) | 0,
        text7?: string, butt7?: (() => void) | 0,
        text8?: string, butt8?: (() => void) | 0,
        text9?: string, butt9?: (() => void) | 0,
        text0?: string, butt0?: (() => void) | 0,
    ): void {
        // Now typesafe
        kGAMECLASS.choices(
            text1, butt1,
            text2, butt2,
            text3, butt3,
            text4, butt4,
            text5, butt5,
            text6, butt6,
            text7, butt7,
            text8, butt8,
            text9, butt9,
            text0, butt0,
        );
    }

    // prettier-ignore
    public simpleChoices(
        text1?: string, butt1?: (() => void) | 0,
        text2?: string, butt2?: (() => void) | 0,
        text3?: string, butt3?: (() => void) | 0,
        text4?: string, butt4?: (() => void) | 0,
        text5?: string, butt5?: (() => void) | 0,
    ): void {
    // Now typesafe
        kGAMECLASS.simpleChoices(
            text1, butt1,
            text2, butt2,
            text3, butt3,
            text4, butt4,
            text5, butt5,
        );
    }

    public doYesNo(eventYes: any, eventNo: any): void {
        kGAMECLASS.doYesNo(eventYes, eventNo);
    }

    public addButton<TI, TR>(pos: number, text = "", func1?: (i: TI) => TR, arg1?: TI): void {
        kGAMECLASS.addButton(pos, text, func1, arg1);
    }

    public sackDescript(): string {
        return Appearance.sackDescript(this.player);
    }

    public cockClit(value = 0): string {
        return kGAMECLASS.cockClit(value);
    }

    public sheathDesc(): string {
        return kGAMECLASS.player.sheathDescription();
    }

    public chestDesc(): string {
        return this.player.chestDesc();
    }

    public allChestDesc(): string {
        return this.player.allChestDesc();
    }

    public allBreastsDescript(): string {
        return kGAMECLASS.allBreastsDescript();
    }

    public sMultiCockDesc(): string {
        return kGAMECLASS.player.sMultiCockDesc();
    }

    public SMultiCockDesc(): string {
        return kGAMECLASS.player.SMultiCockDesc();
    }

    public oMultiCockDesc(): string {
        return kGAMECLASS.player.oMultiCockDesc();
    }

    public OMultiCockDesc(): string {
        return kGAMECLASS.player.OMultiCockDesc();
    }

    public tongueDescript(): string {
        return kGAMECLASS.tongueDescript();
    }

    public ballsDescriptLight(forcedSize = true): string {
        return kGAMECLASS.ballsDescriptLight(forcedSize);
    }

    public ballDescript(): string {
        return kGAMECLASS.ballDescript();
    }

    public ballsDescript(): string {
        return kGAMECLASS.ballsDescript();
    }

    public simpleBallsDescript(): string {
        return kGAMECLASS.simpleBallsDescript();
    }

    public assholeDescript(): string {
        return kGAMECLASS.assholeDescript();
    }

    public eAssholeDescript(): string {
        return Appearance.assholeDescript(this.monster);
    }

    public hipDescript(): string {
        return kGAMECLASS.hipDescript();
    }

    public assDescript(): string {
        return kGAMECLASS.assDescript();
    }

    public buttDescript(): string {
        return kGAMECLASS.buttDescript();
    }

    public assholeOrPussy(): string {
        return Appearance.assholeOrPussy(this.player);
    }

    public nippleDescript(rowNum: number): string {
        return kGAMECLASS.nippleDescript(rowNum);
    }

    public cockDescript(cockNum = 0): string {
        return kGAMECLASS.player.cockDescript(cockNum);
    }

    public multiCockDescript(): string {
        return kGAMECLASS.player.multiCockDescript();
    }

    public multiCockDescriptLight(): string {
        return kGAMECLASS.player.multiCockDescriptLight();
    }

    public breastDescript(rowNum: number): string {
        return this.player.breastDescript(rowNum);
    }

    public breastSize(val: number): string {
        return Appearance.breastSize(val);
    }

    public biggestBreastSizeDescript(): string {
        return Appearance.biggestBreastSizeDescript(this.player);
    }

    public hairDescript(): string {
        return kGAMECLASS.hairDescript();
    }

    public hairOrFur(): string {
        return kGAMECLASS.hairOrFur();
    }

    public clitDescript(): string {
        return kGAMECLASS.clitDescript();
    }

    public vaginaDescript(vaginaNum = 0): string {
        return kGAMECLASS.vaginaDescript(vaginaNum);
    }

    public allVaginaDescript(): string {
        return kGAMECLASS.allVaginaDescript();
    }

    /**
     * Apply statmods to the player. dynStats wraps the regular stats call, but supports "named" arguments of the form: any
// "statname", value.
     * Exclusively supports either long or short stat names with a single call.
     * "str", "lib" "lus", "cor" etc
     * "strength, "libido", lust", "corruption"
     * Specify the stat you wish to modify and follow it with the value.
     * Separate each stat and value with a comma, and each stat/value pair, again, with a comma.
     * eg: dynStats("str", 10, "lust" -100); will add 10 to str and subtract 100 from lust
     * Also support operators could be appended with + - * /=
     * eg: dynStats("str+", 1, "tou-", 2, "spe*", 1.1, "int/", 2, "cor=", 0)
     *     will add 1 to str, subtract 2 from tou, increase spe by 10%, decrease int by 50%, and set cor to 0
     *
     * @param ... args
     */
    public dynStats(...args: any[]): void {
        kGAMECLASS.dynStats(...args);
    }

    public silly(): boolean {
        return kGAMECLASS.silly();
    }

    public HPChange(changeNum: number, display: boolean): void {
        kGAMECLASS.HPChange(changeNum, display);
    }

    public fatigue(mod: number, type = 0): void {
        kGAMECLASS.fatigue(mod, type);
    }

    public playerMenu(): void {
        kGAMECLASS.playerMenu();
    }

    public get player(): Player {
        return kGAMECLASS.player;
    }

    public set player(val: Player) {
        kGAMECLASS.player = val;
    }

    public get player2(): Player {
        return kGAMECLASS.player2;
    }

    public set player2(val: Player) {
        kGAMECLASS.player2 = val;
    }

    public get debug(): boolean {
        return kGAMECLASS.debug;
    }

    public set debug(val: boolean) {
        kGAMECLASS.debug = val;
    }

    public get ver(): string {
        return kGAMECLASS.ver;
    }

    public set ver(val: string) {
        kGAMECLASS.ver = val;
    }

    public get images(): ImageManager {
        return kGAMECLASS.images;
    }

    public set images(val: ImageManager) {
        kGAMECLASS.images = val;
    }

    public get monster(): Monster {
        return kGAMECLASS.monster;
    }

    public set monster(val: Monster) {
        kGAMECLASS.monster = val;
    }

    public get consumables(): ConsumableLib {
        return kGAMECLASS.consumables;
    }
    public get useables(): UseableLib {
        return kGAMECLASS.useables;
    }
    public get weapons(): WeaponLib {
        return kGAMECLASS.weapons;
    }
    public get armors(): ArmorLib {
        return kGAMECLASS.armors;
    }
    public get inventory(): Inventory {
        return kGAMECLASS.inventory;
    }

    public get time(): TimeModel {
        return kGAMECLASS.time;
    }

    public set time(val: TimeModel) {
        kGAMECLASS.time = val;
    }

    public get temp(): number {
        return kGAMECLASS.temp;
    }

    public set temp(val: number) {
        kGAMECLASS.temp = val;
    }

    public get args(): any[] {
        return kGAMECLASS.args;
    }

    public set args(val: any[]) {
        kGAMECLASS.args = val;
    }

    public get funcs(): any[] {
        return kGAMECLASS.funcs;
    }

    public set funcs(val: any[]) {
        kGAMECLASS.funcs = val;
    }

    public get mainView(): MainView {
        return kGAMECLASS.mainView;
    }

    public set mainView(val: MainView) {
        kGAMECLASS.mainView = val;
    }

    public get model(): GameModel {
        return kGAMECLASS.model;
    }

    public set model(val: GameModel) {
        kGAMECLASS.model = val;
    }

    public get flags() {
        return kGAMECLASS.flags;
    }

    public set flags(val) {
        kGAMECLASS.flags = val;
    }

    public showStatDown(arg: StatKeys | OtherKeys): void {
        kGAMECLASS.mainView.statsView.showStatDown(arg);
    }

    public showStatUp(arg: StatKeys | OtherKeys): void {
        kGAMECLASS.mainView.statsView.showStatUp(arg);
    }

    /**
     * PRIMO BULLSHIT FUNCTION ACCESS
     */
    // Need to work out a better way of doing this -- I THINK maybe treating external functions as a string and calling
    // addButton like "addButton(0, "thing", "thisFunc");" might be a way to do it -- check if Func var is a Func type in this.addbutton args
    // if it is, pass it into kGAMECLASS, if it isn't, check if string. If it is, use the string to pull the func from kGAMECLASS
    // before passing it into addbutton etc.
    // Going the string route also makes it... not awful to call into other content classes too - split string on . and chain
    // lookups into objects ie "umasShop.firÌÌstVisitPart1" -> kGAMECLASS["umasShop"].["firstVisitPart1"]()
    // @aimozg: but kGAMECLASS.umasShop.firstVisistPart1 instead of String is compile-time safe.
    // Clearly this isn't going to fly long term, but it's... functional for now.
}
