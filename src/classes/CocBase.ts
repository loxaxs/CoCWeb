// CoCBase.ts
// A class that CoC extends, to move out the most-often just so that methods can be moved out of CoC, because
// working with this HUGE CoC.ts is very slow (to compile).

import { bindToClass } from "../ClassBinder";
import { GameModel } from "../model/GameModel";
import { TimeModel } from "../model/TimeModel";
import { MainView } from "../view/MainView";
import { CocSettings } from "./CocSettings";
import { addCocBinding } from "./core/binding/addCocBinding";
import { addCocControls } from "./core/binding/addCocControls";
import { createFlags, Flags } from "./FlagTypeOverrides";
import { kFLAGS } from "./GlobalFlags/kFLAGS";
import { ImageManager } from "./ImageManager";
import { InputManager } from "./InputManager";
import { UseableLib } from "./Items/UseableLib";
import { Monster } from "./Monster";
import { Parser } from "./Parser/Parser";
import { Player } from "./Player";
import { PlayerEvents } from "./PlayerEvents";

export abstract class CocBase {
    abstract outx(output: string, purgeText?: boolean, parseAsMarkdown?: boolean): void;

    protected playerEvent: PlayerEvents;
    public useables: UseableLib;
    public mainView: MainView;

    public model: GameModel;

    public parser: Parser;

    // ALL THE VARIABLES:
    // Declare the various global variables as class variables.
    // Note that they're set up in the constructor, not here.
    public debug: boolean;
    public ver: string;
    public versionComment: string;
    public mobile: boolean;
    public images: ImageManager;
    public player: Player;
    public player2: Player;
    public monster: Monster;
    public flags: Flags;
    protected gameState: number;
    public time: TimeModel;
    public currentText: string;

    public explored: boolean;
    public foundForest: boolean;
    public foundDesert: boolean;
    public foundMountain: boolean;
    public foundLake: boolean;
    public whitney: number;
    public monk: number;
    public sand: number;
    public giacomo: number;
    public temp: number;
    public args: any[];
    public funcs: any[];
    public oldStats: any; // I *think* this is a generic object
    public inputManager: InputManager;

    public testingBlockExiting: boolean;

    public kFlagsRef: any;

    public constructor() {
        bindToClass(this);

        this.useables = new UseableLib();

        // cheat for the parser to be able to find kFLAGS
        // If you're not the parser, DON'T USE THIS
        this.kFlagsRef = kFLAGS;

        // This is a flag used to prevent the game from exiting when running under the automated tester
        // (the chaos monkey)
        this.testingBlockExiting = false;

        // Used for stopping chaos monkey on syntax errors. Separate flag so we can make stopping optional
        CocSettings.haltOnErrors = false;

        this.parser = new Parser(this, CocSettings);

        this.model = new GameModel();
        this.mainView = new MainView(this.model);

        // Set up all the messy global stuff:

        // ******************************************************************************************

        const mainView: MainView = this.mainView;
        const model: GameModel = this.model;

        /**
         * Global Variables used across the whole game. I hope to whittle it down slowly.
         */

        /**
         * System Variables
         * Debug, Version, etc
         */
        // { region SystemVariables

        // DEBUG, used all over the place
        this.debug = false;

        // Version NUMBER
        this.ver = "1.0.3";
        this.versionComment = `Gotta love saves!`;

        // Indicates if building for mobile?
        this.mobile = false;
        model.mobile = this.mobile;

        this.images = new ImageManager();
        this.inputManager = new InputManager(mainView);

        // Insert the default bindings
        addCocBinding(this.inputManager);

        this.inputManager.RegisterDefaults();

        // } endregion

        /**
         * Player specific variables
         * The player object and variables associated with the player
         */
        // { region PlayerVariables

        // The Player object, used everywhere
        this.player = new Player();
        model.player = this.player;
        this.player2 = new Player();
        this.playerEvent = new PlayerEvents();

        // Used in perk selection, mainly eventParser, input and engineCore

        // Create monster, used all over the place
        this.monster = new Monster();
        // } endregion

        /**
         * State Variables
         * They hold all the information about item states, menu states, game states, etc
         */
        // { region StateVariables

        // User all over the place whenever items come up

        // The extreme flag state array. This needs to go. Holds information about everything, whether it be certain attacks for NPCs
        // or state information to do with the game.
        this.flags = createFlags();
        model.flags = this.flags;

        /// Used everywhere to establish what the current game state is
        // Key system variables
        this.gameState = 0;
        // } endregion

        /**
         * Display Variables
         * Variables that hold display information like number of days and all the current displayed text
         */
        // { region DisplayVariables

        // Holds the date and time display in the bottom left
        this.time = new TimeModel();
        model.time = this.time;

        // The string holds all the "story" text, mainly used in engineCore
        this.currentText = "";
        // }endregion

        /**
         * Item variables
         * Holds all the information about items in your inventory and stashes away
         */
        // {region ItemVariables

        /**
         * Plot Variables
         * Booleans and numbers about whether you've found certain places
         */
        // { region PlotVariables

        // Plot variables
        this.explored = false;
        this.foundForest = false;
        this.foundDesert = false;
        this.foundMountain = false;
        this.foundLake = false;
        this.whitney = 0;
        this.monk = 0;
        this.sand = 0;
        this.giacomo = 0;

        // *************************************************************************************

        // Fenoxo loves his temps
        this.temp = 0;

        // Used to set what each action buttons displays and does.
        this.args = [];
        this.funcs = [];

        // Used for stat tracking to keep up/down arrows correct.
        this.oldStats = {
            oldStr: 0,
            oldTou: 0,
            oldSpe: 0,
            oldInte: 0,
            oldSens: 0,
            oldLib: 0,
            oldCor: 0,
            oldHP: 0,
            oldLust: 0,
        };
        model.oldStats = this.oldStats;

        model.maxHP = this.maxHP;

        // ******************************************************************************************

        // Hide sprites
        mainView.hideSprite();
        // Hide up/down arrows
        mainView.statsView.hideUpDown();
    }

    public startupScreenBody(): void {
        this.outx(
            `
<u>Created by: Fenoxo </u>

Edited By:
Ashi, SoS, Prisoner416, Zeikfried, et al

Open - source contributions by:
aimozg, Amygdala, Cmacleod42, Enterprise2001, Fake - Name, Gedan, Yoffy, et al

<b>This copy is maintained by loxaxs <u><a href='https://github.com/loxaxs/CoCWeb'>(Source Code)</a></u>, <u><a href='https://github.com/mathieucaroff/CoCWeb/issues'>(Bug Tracker)</a></u></b>
<b>Ported to the web by end5 <u><a href='https://github.com/end5/CoCWeb'>(Source Code)</a></u></b>

<b><u>DISCLAIMER</u></b>
    <b>- There are many strange and odd fetishes contained in this flash. Peruse at your own risk.</b>
    <b>- Please be 18 or the legal age to view porn before playing.</b>
    <b>- Try to keep your keyboard clean. Think of the children!</b>

For more information see Fenoxo's Blog at <b><u><a href='http://www.fenoxo.com/'>fenoxo.com</a></u></b>.

Also go play <u><a href='http://www.furaffinity.net/view/9830293/'> Nimin </a></u> by Xadera on furaffinity.
`,
            false,
            false,
        );

        if (this.debug)
            this.outx("\n\n<b>DEBUG MODE ENABLED:  ITEMS WILL NOT BE CONSUMED BY USE.</b>");
        if (this.flags[kFLAGS.SHOW_SPRITES_FLAG]) this.outx("\n\n<b>Sprites disabled.</b>");
        if (this.flags[kFLAGS.EASY_MODE_ENABLE_FLAG])
            this.outx("\n\n<b>Easy Mode On:  Bad-ends can be ignored.</b>");
        if (this.flags[kFLAGS.SILLY_MODE_ENABLE_FLAG])
            this.outx(
                "\n\n<b>SILLY MODE ENGAGED: Crazy, nonsensical, and possibly hilarious things may occur.</b>",
            );
    }

    public maxHP(): number {
        return this.player.maxHP();
    }
}
