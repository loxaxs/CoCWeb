import { saveAs } from "file-saver";
import { trace } from "../console";
import {
    ANTENNAE_NONE,
    ARM_TYPE_HUMAN,
    BREAST_CUP_B,
    EARS_HUMAN,
    EYES_HUMAN,
    HORNS_NONE,
    SKIN_TYPE_FUR,
    SKIN_TYPE_GOO,
    SKIN_TYPE_PLAIN,
    SKIN_TYPE_SCALES,
    TONUGE_HUMAN,
} from "../includes/appearanceDefs";
import { BaseContent } from "./BaseContent";
import { BreastStore } from "./BreastStore";
import { CoC } from "./CoC";
import { CockTypesEnum } from "./CockTypesEnum";
import { CocSettings } from "./CocSettings";
import { createFlags } from "./FlagTypeOverrides";
import { kFLAGS } from "./GlobalFlags/kFLAGS";
import { kGAMECLASS } from "./GlobalFlags/kGAMECLASS";
import { Armor } from "./Items/Armor";
import { ArmorLib } from "./Items/ArmorLib";
import { Weapon } from "./Items/Weapon";
import { WeaponLib } from "./Items/WeaponLib";
import { ItemSlotClass } from "./ItemSlotClass";
import { ItemType } from "./ItemType";
import { PerkLib } from "./PerkLib";
import { PerkType } from "./PerkType";
import { Player } from "./Player";
import { PregnancyStore } from "./PregnancyStore";
import { StatusAffects } from "./StatusAffects";
import { StatusAffectType } from "./StatusAffectType";

export class Saves {
    private static SAVE_FILE_CURRENT_INTEGER_FORMAT_VERSION = 816;
    // Didn't want to include something like this.base, but an integer is safer than depending on the text version number from the CoC class.
    // Also, this.base way the save file version doesn't need updating unless an important structural change happens in the save file.

    private gameStateGet: () => number;
    private gameStateSet: (state: number) => void;
    private itemStorageGet: any;
    private gearStorageGet: any;
    private base: BaseContent;

    public constructor(
        base: BaseContent,
        gameStateDirectGet: () => number,
        gameStateDirectSet: (state: number) => void,
    ) {
        this.base = base;
        this.gameStateGet = gameStateDirectGet; // this.base is so that the save game functions (and nothing else) get direct access to the gameState variable
        this.gameStateSet = gameStateDirectSet;
    }

    public linkToInventory(itemStorageDirectGet: any, gearStorageDirectGet: any): void {
        this.itemStorageGet = itemStorageDirectGet;
        this.gearStorageGet = gearStorageDirectGet;
    }

    public saveFileNames = [
        "CoC_1",
        "CoC_2",
        "CoC_3",
        "CoC_4",
        "CoC_5",
        "CoC_6",
        "CoC_7",
        "CoC_8",
        "CoC_9",
    ];
    public versionProperties: Record<string, any> = {
        legacy: 100,
        "0.8.3f7": 124,
        "0.8.3f8": 125,
        "0.8.4.3": 119,
        latest: 119,
    };
    public savedGameDir = "data/com.fenoxo.coc";

    public showSaveDisplay(): void {
        this.saveFileNames.forEach((name, i) => {
            const saveObject: Record<string, any> = this.getSaveObj(name);

            this.base.outx(this.loadSaveDisplay(saveObject, "" + (i + 1)), false);
        });
    }

    public loadSaveDisplay(saveFile: Record<string, any>, slotName: string): string {
        let holding = "";
        if (saveFile.exists && saveFile.flags[2066] == undefined) {
            if (saveFile.notes == undefined) {
                saveFile.notes = "No notes available.";
            }
            holding = slotName;
            holding += ":  <b>";
            holding += saveFile.short;
            holding += `</b> - <i>${saveFile.notes}</i>\r`;
            holding += `Days - ${saveFile.days}  Gender - `;
            if (saveFile.gender == 0) holding += "U";
            if (saveFile.gender == 1) holding += "M";
            if (saveFile.gender == 2) holding += "F";
            if (saveFile.gender == 3) holding += "H";
            holding += "\r";
            return holding;
        } else if (saveFile.exists && saveFile.flags[2066] != undefined) {
            return `${slotName}:  <b>UNSUPPORTED</b>\rThis is a save file that has been created in a modified version of CoC.\r`;
        } else {
            return `${slotName}:  <b>EMPTY</b>\r     \r`;
        }
    }

    public getSaveObj(key: string): Record<string, any> {
        const save = localStorage.getItem(key);
        if (save) return JSON.parse(save);
        else return {};
    }

    public loadScreen(): void {
        const slots = new Array(this.saveFileNames.length);

        this.base.outx("<b><u>Slot: Sex,  Game Days Played</u></b>\r", true);

        this.saveFileNames.forEach((name, i) => {
            const test: Record<string, any> = this.getSaveObj(name);

            this.base.outx(this.loadSaveDisplay(test, String(i + 1)), false);

            if (test.exists && test.flags[2066] == undefined) {
                slots[i] = () => {
                    trace("Loading save with name", name, "at index", i);
                    this.loadGame(name);
                };
            } else {
                slots[i] = undefined; // You have to set the parameter to 0 to disable the button
            }
        });

        // prettier-ignore
        this.base.choices(
            "Slot 1", slots[0],
            "Slot 2", slots[1],
            "Slot 3", slots[2],
            "Slot 4", slots[3],
            "Slot 5", slots[4],
            "Slot 6", slots[5],
            "Slot 7", slots[6],
            "Slot 8", slots[7],
            "Slot 9", slots[8],
            "Back", () => this.saveLoad(),
        );
    }

    public saveScreen(): void {
        const input = document.createElement("input");

        // var test; // Disabling this.base variable because it seems to be unused.

        this.base.outx("", true);
        if (this.base.player.slotName != "VOID")
            this.base.outx(
                `<b>Last saved or loaded from: ${this.base.player.slotName}</b>\r\r`,
                false,
            );
        this.base.outx("<b><u>Slot: Sex,  Game Days Played</u></b>\r");

        const saveFuncs: (() => void)[] = [];

        this.showSaveDisplay();

        this.saveFileNames.forEach((saveFileName, i) => {
            saveFuncs[i] = () => {
                trace("Saving game with name", saveFileName, "at index", i);
                this.saveGame(saveFileName, input);
            };
        });

        if (this.base.player.slotName == "VOID") this.base.outx("\r\r");

        this.base.outx(
            "<b>Leave the notes box blank if you don't wish to change notes.\r<u>NOTES:</u></b>",
        );

        // prettier-ignore
        this.base.choices(
            "Slot 1", saveFuncs[0],
            "Slot 2", saveFuncs[1],
            "Slot 3", saveFuncs[2],
            "Slot 4", saveFuncs[3],
            "Slot 5", saveFuncs[4],
            "Slot 6", saveFuncs[5],
            "Slot 7", saveFuncs[6],
            "Slot 8", saveFuncs[7],
            "Slot 9", saveFuncs[8],
            "Back", () => this.saveLoad(),
        );
        this.base.mainView.mainText.appendChild(input);
    }

    public saveLoad(): void {
        // Hide the name box in case of backing up from save
        // screen so it doesnt overlap everything.
        this.base.outx("", true);
        this.base.outx("<b>Where are my saves located?</b>\n");
        this.base.outx(
            "<i>In Windows Vista/7 (IE/FireFox/Other): <pre>Users/{username}/Appdata/Roaming/Macromedia/Flash Player/#Shared Objects/{GIBBERISH}/</pre>\n\n",
        );
        this.base.outx(
            "In Windows Vista/7 (Chrome): <pre>Users/{username}/AppData/Local/Google/Chrome/User Data/Default/Pepper Data/Shockwave Flash/WritableRoot/#SharedObjects/{GIBBERISH}/</pre>\n\n",
        );
        this.base.outx(
            "Inside that folder it will saved in a folder corresponding to where it was played from.  If you saved the CoC.swf to your HDD, then it will be in a folder called localhost.  If you played from my website, it will be in fenoxo.com.  The save files will be labelled CoC_1.sol, CoC_2.sol, CoC_3.sol, etc.</i>\n\n",
        );
        this.base.outx(
            "<b>Why do my saves disappear all the time?</b>\n<i>There are numerous things that will wipe out flash local shared files.  If your browser or player is set to delete flash cookies or data, that will do it.  CCleaner will also remove them.  CoC or its updates will never remove your savegames - if they disappear something else is wiping them out.</i>\n\n",
        );
        this.base.outx(
            "<b>When I play from my HDD I have one set of saves, and when I play off your site I have a different set of saves.  Why?</b>\n<i>Flash stores saved data relative to where it was accessed from.  Playing from your HDD will store things in a different location than fenoxo.com or FurAffinity.</i>\n",
        );
        this.base.outx(
            "<i>If you want to be absolutely sure you don't lose a character, copy the .sol file for that slot out and back it up! <b>For more information, google flash shared objects.</b></i>\n\n",
        );
        this.base.outx("<b>Why does the Save File and Load File option not work?</b>\n");
        this.base.outx(
            "<i>Save File and Load File are limited by the security settings imposed upon CoC by Flash. These options will only work if you have downloaded the game from the website, and are running it from your HDD. Additionally, they can only correctly save files to and load files from the directory where you have the game saved.</i>",
        );
        // this.base is to clear the 'game over' block from stopping simpleChoices from working.  Loading games supercede's game over.
        if (this.base.mainView.bottomButtons[0].labelText == "Game Over") {
            this.base.temp = 777;
            this.base.mainView.bottomButtons[0].labelText = "save/load";
        }
        if (this.base.temp == 777) {
            this.base.menu();
            this.base.addButton(1, "Load", this.loadScreen);
            this.base.addButton(2, "Load File", this.loadFromFile);
            this.base.addButton(3, "Delete", this.deleteScreen);
            this.base.addButton(4, "Back", kGAMECLASS.gameOver, true);
            return;
        }
        if (this.base.player.str == 0) {
            // prettier-ignore
            this.base.simpleChoices(
                "", undefined,
                "Load", () => this.loadScreen(),
                "Load File", () => this.loadFromFile(),
                "Delete", () => this.deleteScreen(),
                "Back", () => kGAMECLASS.mainMenu(),
            );
            return;
        }
        if (this.base.inDungeon) {
            // prettier-ignore
            this.base.simpleChoices(
                "", undefined,
                "Load", () => this.loadScreen(),
                "Load File", () => this.loadFromFile(),
                "Delete", () => this.deleteScreen(),
                "Back", () => kGAMECLASS.playerMenu(),
            );
            return;
        }
        if (this.gameStateGet() == 3)
            // prettier-ignore
            this.base.choices(
                "Save", () => this.saveScreen(),
                "Load", () => this.loadScreen(),
                "Load File", () => this.loadFromFile(),
                "Delete", () => this.deleteScreen(),
                "Back", undefined,
                "Save to File", () => this.saveToFile(),
                "Load File", () => this.loadFromFile(),
                "", undefined,
                "", undefined,
                "", undefined,
            );
        else {
            // prettier-ignore
            const autosaveText = this.base.player.autoSave ? 'AutoSav: ON' : 'AutoSav: OFF'

            this.base.choices(
                "Save",
                () => this.saveScreen(),
                "Load",
                () => this.loadScreen(),
                autosaveText,
                () => this.autosaveToggle(),
                "Delete",
                () => this.deleteScreen(),
                "",
                undefined,
                "Save to File",
                () => this.saveToFile(),
                "Load File",
                () => this.loadFromFile(),
                "",
                undefined,
                "",
                undefined,
                "Back",
                () => kGAMECLASS.playerMenu(),
            );
        }
    }

    private saveToFile(notes?: HTMLInputElement): void {
        this.saveGameObject(`CoC_${this.base.player.short}`, notes, true);
    }

    private loadFromFile(): void {
        this.openSave();
        this.base.showStats();
        this.base.statScreenRefresh();
    }

    private autosaveToggle(): void {
        this.base.player.autoSave = !this.base.player.autoSave;
        this.saveLoad();
    }

    public deleteScreen(): void {
        this.base.outx("Slot,  Race,  Sex,  Game Days Played\n", true);

        const choiceArgList: ((() => void) | string | undefined)[] = [];

        this.showSaveDisplay();

        this.saveFileNames.forEach((name, i) => {
            choiceArgList[2 * i] = `Slot ${i + 1}`;

            choiceArgList[2 * i + 1] = this.getSaveObj(name).exists
                ? () => {
                      this.base.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION] = name;
                      this.confirmDelete();
                  }
                : undefined; // disable buttons for empty slots
        });

        this.base.outx("\n<b>ONCE DELETED, YOUR SAVE IS GONE FOREVER.</b>");
        this.base.choices(...(choiceArgList as any), "Back" as any, (() => this.saveLoad()) as any);
    }

    public confirmDelete(): void {
        this.base.outx(
            `You are about to delete the following save: <b>${
                this.base.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION]
            }</b>\n\nAre you sure you want to delete it?`,
            true,
        );
        this.base.simpleChoices(
            "No",
            () => this.deleteScreen(),
            "Yes",
            () => this.purgeTheMutant(),
        );
    }

    public purgeTheMutant(): void {
        const slot = `${this.base.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION]}`;

        const test = this.getSaveObj(slot);
        trace(`DELETING SLOT: ${this.base.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION]}`);
        const commentList: string[] = [
            "been virus bombed",
            "been purged",
            "been vaped",
            "been nuked from orbit",
            "taken an arrow to the knee",
            "fallen on its sword",
            "lost its reality matrix cohesion",
            "been cleansed",
            "suffered the following error: (404) Porn Not Found",
        ];

        trace(`${commentList.length} array slots`);
        const comment = BaseContent.randomChoiceTyped(commentList);
        this.base.outx(
            `${this.base.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION]} has ${comment}.`,
            true,
        );

        localStorage.removeItem(slot);

        this.base.doNext(() => this.deleteScreen());
    }

    public saveGame(slot: string, notes?: HTMLInputElement): void {
        this.base.player.slotName = slot;
        this.saveGameObject(slot, notes);
    }

    public loadGame(slot: string): void {
        const saveFile = this.getSaveObj(slot);

        // Check the property count of the file
        const numProps: number = Object.keys(saveFile).length;

        let sfVer: any;
        if (saveFile.version == undefined) {
            sfVer = this.versionProperties.legacy;
        } else {
            sfVer = this.versionProperties[saveFile.version];
        }

        if (!(typeof sfVer == "number")) {
            sfVer = this.versionProperties.latest;
        }

        trace(`File version ${saveFile.version || "legacy"} expects propNum ${sfVer}`);

        trace(`Got ${numProps} file properties -- success!`);
        // I want to be able to write some debug stuff to the GUI during the loading process
        // Therefore, we clear the display *before* calling loadGameObject
        this.base.outx("", true);

        this.loadGameObject(saveFile, slot);
        this.base.outx("Game Loaded");
        this.base.temp = 0;
        this.base.statScreenRefresh();

        if (this.base.player.slotName == "VOID") {
            trace(`Setting in-use save slot to: ${slot}`);
            this.base.player.slotName = slot;
        }

        this.base.doNext(() => this.base.playerMenu());
        // }
    }

    /*

    OH GOD SOMEONE FIX THIS DISASTER!!!!111one1ONE!

    */
    // FURNITURE'S JUNK
    public saveGameObject(slot: string, notes?: HTMLInputElement, exportFile?: boolean): void {
        // Autosave stuff
        if (this.base.player.slotName != "VOID") this.base.player.slotName = slot || "";

        CoC.saveAllAwareClasses(this.base.getGame()); // Informs each saveAwareClass that it must save its values in the flags array

        // Initialize the save file
        let saveFile: any;
        if (!slot) {
            saveFile = {};
        } else {
            saveFile = this.getSaveObj(slot);
        }

        this.populateSaveFile(saveFile, notes);

        this.writeSave(exportFile, saveFile, slot);
    }

    /**
     * makeSaveFile
     *
     * Extract the saveable state of the game into the `saveFile` object
     */
    public populateSaveFile(saveFile: any, notes?: HTMLInputElement) {
        // Set a single variable that tells us if this.base save exists
        saveFile.exists = true;
        saveFile.version = this.base.ver;
        this.base.flags[kFLAGS.SAVE_FILE_INTEGER_FORMAT_VERSION] =
            Saves.SAVE_FILE_CURRENT_INTEGER_FORMAT_VERSION;

        // CLEAR OLD ARRAYS
        // Save sum dataz
        trace("SAVE DATAZ");
        saveFile.short = this.base.player.short;
        saveFile.a = this.base.player.a;

        // Notes
        if (notes && notes.value != "") {
            saveFile.notes = notes.value;
            this.base.getGame().notes = notes.value;
        } else saveFile.notes = this.base.getGame().notes;

        try {
            // flags
            saveFile.flags = {};
            for (const key of Object.keys(this.base.flags)) {
                // Don't save unset/default flags
                if ((this.base.flags as Record<string | number, any>)[key] !== 0) {
                    saveFile.flags[key] = (this.base.flags as Record<string | number, any>)[key];
                }
            }
            let i = 0;

            // CLOTHING/ARMOR
            saveFile.armorId = this.base.player.armor.id;
            saveFile.weaponId = this.base.player.weapon.id;
            saveFile.armorName = this.base.player.modArmorName;

            // PIERCINGS
            saveFile.nipplesPierced = this.base.player.nipplesPierced;
            saveFile.nipplesPShort = this.base.player.nipplesPShort;
            saveFile.nipplesPLong = this.base.player.nipplesPLong;
            saveFile.lipPierced = this.base.player.lipPierced;
            saveFile.lipPShort = this.base.player.lipPShort;
            saveFile.lipPLong = this.base.player.lipPLong;
            saveFile.tonguePierced = this.base.player.tonguePierced;
            saveFile.tonguePShort = this.base.player.tonguePShort;
            saveFile.tonguePLong = this.base.player.tonguePLong;
            saveFile.eyebrowPierced = this.base.player.eyebrowPierced;
            saveFile.eyebrowPShort = this.base.player.eyebrowPShort;
            saveFile.eyebrowPLong = this.base.player.eyebrowPLong;
            saveFile.earsPierced = this.base.player.earsPierced;
            saveFile.earsPShort = this.base.player.earsPShort;
            saveFile.earsPLong = this.base.player.earsPLong;
            saveFile.nosePierced = this.base.player.nosePierced;
            saveFile.nosePShort = this.base.player.nosePShort;
            saveFile.nosePLong = this.base.player.nosePLong;

            // MAIN STATS
            saveFile.str = this.base.player.str;
            saveFile.tou = this.base.player.tou;
            saveFile.spe = this.base.player.spe;
            saveFile.inte = this.base.player.inte;
            saveFile.lib = this.base.player.lib;
            saveFile.sens = this.base.player.sens;
            saveFile.cor = this.base.player.cor;
            saveFile.fatigue = this.base.player.fatigue;
            // Combat STATS
            saveFile.HP = this.base.player.HP;
            saveFile.lust = this.base.player.lust;
            saveFile.teaseLevel = this.base.player.teaseLevel;
            saveFile.teaseXP = this.base.player.teaseXP;
            // LEVEL STATS
            saveFile.XP = this.base.player.XP;
            saveFile.level = this.base.player.level;
            saveFile.gems = this.base.player.gems;
            saveFile.perkPoints = this.base.player.perkPoints;

            // Appearance
            saveFile.gender = this.base.player.gender;
            saveFile.femininity = this.base.player.femininity;
            saveFile.thickness = this.base.player.thickness;
            saveFile.tone = this.base.player.tone;
            saveFile.tallness = this.base.player.tallness;
            saveFile.hairColor = this.base.player.hairColor;
            saveFile.hairType = this.base.player.hairType;
            saveFile.gills = this.base.player.gills;
            saveFile.armType = this.base.player.armType;
            saveFile.hairLength = this.base.player.hairLength;
            saveFile.beardLength = this.base.player.beardLength;
            saveFile.eyeType = this.base.player.eyeType;
            saveFile.beardStyle = this.base.player.beardStyle;
            saveFile.skinType = this.base.player.skinType;
            saveFile.skinTone = this.base.player.skinTone;
            saveFile.skinDesc = this.base.player.skinDesc;
            saveFile.skinAdj = this.base.player.skinAdj;
            saveFile.faceType = this.base.player.faceType;
            saveFile.tongueType = this.base.player.tongueType;
            saveFile.earType = this.base.player.earType;
            saveFile.earValue = this.base.player.earValue;
            saveFile.antennae = this.base.player.antennae;
            saveFile.horns = this.base.player.horns;
            saveFile.hornType = this.base.player.hornType;
            saveFile.wingDesc = this.base.player.wingDesc;
            saveFile.wingType = this.base.player.wingType;
            saveFile.lowerBody = this.base.player.lowerBody;
            saveFile.tailType = this.base.player.tailType;
            saveFile.tailVenum = this.base.player.tailVenom;
            saveFile.tailRecharge = this.base.player.tailRecharge;
            saveFile.hipRating = this.base.player.hipRating;
            saveFile.buttRating = this.base.player.buttRating;

            // Sexual Stuff
            saveFile.balls = this.base.player.balls;
            saveFile.cumMultiplier = this.base.player.cumMultiplier;
            saveFile.ballSize = this.base.player.ballSize;
            saveFile.hoursSinceCum = this.base.player.hoursSinceCum;
            saveFile.fertility = this.base.player.fertility;
            saveFile.clitLength = this.base.player.clitLength;

            // Preggo stuff
            saveFile.pregnancyIncubation = this.base.player.pregnancyIncubation;
            saveFile.pregnancyType = this.base.player.pregnancyType;
            saveFile.buttPregnancyIncubation = this.base.player.buttPregnancyIncubation;
            saveFile.buttPregnancyType = this.base.player.buttPregnancyType;

            saveFile.cocks = this.base.player.cocks;
            saveFile.vaginas = this.base.player.vaginas;
            saveFile.breastRows = this.base.player.breastRows;
            saveFile.perks = this.base.player.perks;
            saveFile.statusAffects = this.base.player.statusAffects;
            saveFile.ass = this.base.player.ass;
            saveFile.keyItems = this.base.player.keyItems;

            saveFile.itemStorage = [];
            saveFile.gearStorage = [];

            // Set storage slot array
            for (i = 0; i < this.itemStorageGet().length; i++) {
                saveFile.itemStorage.push({});
            }

            // Populate storage slot array
            for (i = 0; i < this.itemStorageGet().length; i++) {
                saveFile.itemStorage[i].id =
                    this.itemStorageGet()[i].itype == undefined
                        ? undefined
                        : this.itemStorageGet()[i].itype.id;
                saveFile.itemStorage[i].quantity = this.itemStorageGet()[i].quantity;
                saveFile.itemStorage[i].unlocked = this.itemStorageGet()[i].unlocked;
            }
            // Set gear slot array
            for (i = 0; i < this.gearStorageGet().length; i++) {
                saveFile.gearStorage.push({});
            }

            // Populate gear slot array
            for (i = 0; i < this.gearStorageGet().length; i++) {
                saveFile.gearStorage[i].id = this.gearStorageGet()[i].isEmpty()
                    ? undefined
                    : this.gearStorageGet()[i].itype.id;
                saveFile.gearStorage[i].quantity = this.gearStorageGet()[i].quantity;
                saveFile.gearStorage[i].unlocked = this.gearStorageGet()[i].unlocked;
            }
            saveFile.ass = {};
            saveFile.ass.analWetness = this.base.player.ass.analWetness;
            saveFile.ass.analLooseness = this.base.player.ass.analLooseness;
            saveFile.ass.fullness = this.base.player.ass.fullness;
            // EXPLORED
            saveFile.exploredLake = this.base.player.exploredLake;
            saveFile.exploredMountain = this.base.player.exploredMountain;
            saveFile.exploredForest = this.base.player.exploredForest;
            saveFile.exploredDesert = this.base.player.exploredDesert;
            saveFile.explored = this.base.player.explored;
            saveFile.foundForest = this.base.getGame().foundForest;
            saveFile.foundDesert = this.base.getGame().foundDesert;
            saveFile.foundMountain = this.base.getGame().foundMountain;
            saveFile.foundLake = this.base.getGame().foundLake;
            saveFile.gameState = this.gameStateGet();

            // Time and Items
            saveFile.hours = this.base.model.time.hours;
            saveFile.days = this.base.model.time.days;
            saveFile.autoSave = this.base.player.autoSave;

            // PLOTZ
            saveFile.whitney = this.base.getGame().whitney;
            saveFile.monk = this.base.getGame().monk;
            saveFile.sand = this.base.getGame().sand;
            saveFile.giacomo = this.base.getGame().giacomo;
            saveFile.beeProgress = 0; // Now saved in a flag. getGame().beeProgress;

            // ITEMZ. Item1s
            const copySlot = (saveSlot: any, liveSlot: any) => {
                saveSlot.quantity = liveSlot.quantity;
                saveSlot.id = liveSlot.itype.id;
                saveSlot.unlocked = true;
            };

            saveFile.itemSlot1 = {};
            saveFile.itemSlot2 = {};
            saveFile.itemSlot3 = {};
            saveFile.itemSlot4 = {};
            saveFile.itemSlot5 = {};

            copySlot(saveFile.itemSlot1, this.base.player.itemSlot1);
            copySlot(saveFile.itemSlot2, this.base.player.itemSlot2);
            copySlot(saveFile.itemSlot3, this.base.player.itemSlot3);
            copySlot(saveFile.itemSlot4, this.base.player.itemSlot4);
            copySlot(saveFile.itemSlot5, this.base.player.itemSlot5);

            saveFile.itemSlot4.unlocked = this.base.player.itemSlot4.unlocked;
            saveFile.itemSlot5.unlocked = this.base.player.itemSlot5.unlocked;

            // Keybinds
            saveFile.controls = this.base.getGame().inputManager.SaveBindsToObj();
        } catch (error) {
            trace(error.message);

            this.base.outx(
                "There was a processing error while preparing the save. Please report the following message:\n\n",
            );
            this.base.outx(error.message);
            this.base.outx("\n\n");
            this.base.outx(error.getStackTrace());
        }
    }

    private writeSave(exportFile: boolean | undefined, saveFile: any, slot: string) {
        // Because actionscript is stupid, there is no easy way to block until file operations are done.
        // Therefore, I'm hacking around it for the chaos monkey.
        // Really, something needs to listen for the FileReference.complete event, and re-enable saving/loading then.
        // Something to do in the future
        let backup: any;
        let backupAborted = false;

        if (exportFile) {
            // outx(serializeToString(saveFile), true);
            let text = JSON.stringify(saveFile, null, 2);
            let blob = new Blob([text], { type: "text/plain;charset=utf-8" });
            let filename = this.generateFilename(slot);

            saveAs(blob, filename);

            this.base.outx("Attempted to save to file.", true);
        } else {
            // Write the file
            // saveFile.flush();
            localStorage.setItem(slot, JSON.stringify(saveFile));

            // Reload it
            saveFile = this.getSaveObj(slot);
            backup = this.getSaveObj(`${slot}_backup`);
            let numProps = 0;

            // Copy the properties over to a new file object
            for (const prop of Object.keys(saveFile)) {
                numProps++;
                backup[prop] = saveFile[prop];
            }

            // There should be 124 root properties minimum in the save file. Give some wiggleroom for things that might be omitted? (All of the broken saves I've seen are MUCH shorter than expected)
            if (numProps < this.versionProperties[this.base.ver]) {
                this.base.outx(
                    `<b>Aborting save.  Your current save file is broken, and needs to be bug-reported.</b>\n\nWithin the save folder for CoC, there should be a pair of files named "${slot}.sol" and "${slot}_backup.sol"\n\n<b>We need BOTH of those files, and a quick report of what you've done in the game between when you last saved, and this.base message.</b>\n\n`,
                    true,
                );
                this.base.outx(
                    "When you've sent us the files, you can copy the _backup file over your old save to continue from your last save.\n\n",
                );
                this.base.outx(
                    "Alternatively, you can just hit the restore button to overwrite the broken save with the backup... but we'd really like the saves first!",
                );
                trace("Backup Save Aborted! Broken save detected!");
                backupAborted = true;
            } else {
                // Property count is correct, write the backup
                // backup.flush();
                localStorage.setItem(`${slot}_backup`, JSON.stringify(backup));
            }

            if (!backupAborted) this.base.outx(`Saved to slot${slot}!`, true);
        }

        if (!backupAborted) {
            this.base.doNext(() => this.base.playerMenu());
        } else {
            this.base.menu();
            this.base.addButton(0, "Next", this.base.playerMenu);
            this.base.addButton(9, "Restore", this.restore, slot);
        }

        trace("done saving");
        return { saveFile, backup, backupAborted };
    }

    private generateFilename(saveName: string) {
        let domain = location.host.replace(/\./g, "-").replace(/-[^-]+$/, "");
        let save = saveName.replace(/^CoC_?/, "").replace(/_/g, "");
        let time = new Date().toISOString().replace(/T(\d+):(\d+).*/g, "--$1-$2");
        let pre = `CoC--${domain}--${save}--${time}.coc`;
        let filename = pre.replace(/[\\/:*"<>|]/, "").replace(/ /g, "_");
        return filename;
    }

    public restore(slotName: string): void {
        this.base.clearOutput();
        // copy slot_backup.sol over slot.sol
        const backupFile = this.getSaveObj(`${slotName}_backup`);
        const overwriteFile = this.getSaveObj(slotName);

        for (const prop of Object.keys(backupFile)) {
            overwriteFile[prop] = backupFile[prop];
        }

        // overwriteFile.flush();
        localStorage.setItem(slotName, JSON.stringify(overwriteFile));

        this.base.outx(`Restored backup of ${slotName}`, true);
        this.base.menu();
        this.base.doNext(() => this.base.playerMenu());
    }

    public openSave(): void {
        const input = document.createElement("input");
        input.id = "load";
        input.type = "file";
        input.accept = ".coc";
        input.style.display = "none";
        input.addEventListener("change", () => {
            if (!input.files || input.files.length === 0) {
                alert("Error in file loading");
            } else {
                this.onFileLoaded(input.files[0]);
            }
        });
        input.click();
    }

    public onFileLoaded(file: File): void {
        trace("File target = ", file.name);
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.addEventListener("loadend", () => {
            let obj;
            try {
                if (!fileReader) throw new Error("FileReader disappeared");
                if (typeof fileReader.result !== "string")
                    throw new Error("File read result not a string");
                obj = JSON.parse(fileReader.result);
            } catch (e) {
                this.base.outx(
                    "<b>!</b> Save file not found, check that it is in the same directory as the CoC.swf file.\n\nLoad from file is not available when playing directly from a website like furaffinity or fenoxo.com.",
                    true,
                );
            }
            if (obj) {
                this.onDataLoaded(obj);
            }
        });
        fileReader.addEventListener("error", this.ioErrorHandler);
    }

    public ioErrorHandler(): void {
        this.base.outx(
            `<b>!</b> Save file not found, check that it is in the same directory as the CoC_${this.base.ver}.swf file.\r\rLoad from file is not available when playing directly from a website like furaffinity or fenoxo.com.`,
            true,
        );
        this.base.doNext(() => this.saveLoad());
    }

    public onDataLoaded(saveObj: any): void {
        try {
            // I want to be able to write some debug stuff to the GUI during the loading process
            // Therefore, we clear the display *before* calling loadGameObject
            this.base.outx("Loading save...", true);
            // trace("OnDataLoaded! - Reading data", this.base.loader, this.base.loader.data.readObject);
            trace("Read in object = ", saveObj);

            this.loadGameObject(saveObj);
            this.base.outx("Loaded Save");
        } catch (rangeError) {
            this.base.outx("<b>!</b> File is either corrupted or not a valid save", true);
            this.base.doNext(() => this.saveLoad());
        }
        // catch (error: Error) {
        //         outx("<b>!</b> Unhandled Exception", true);
        //         outx("[pg]Failed to load save. The file may be corrupt!");

        //         doNext(returnToSaveMenu);
        //     }
        this.base.statScreenRefresh();
        // eventParser(1);
    }

    public loadGameObject(saveData: Record<string, any>, slot = "VOID"): void {
        const game: CoC = this.base.getGame();
        game.dungeonLoc = 0;
        game.inRoomedDungeon = false;
        game.inRoomedDungeonResume = undefined;

        // Autosave stuff
        this.base.player.slotName = slot;

        trace("Loading save!");
        // Initialize the save file
        const saveFile = saveData;
        if (saveFile && saveFile.exists) {
            // KILL ALL COCKS;
            this.base.player = new Player();
            this.base.flags = createFlags();
            this.base.model.player = this.base.player;

            this.base.inventory.clearStorage();
            this.base.inventory.clearGearStorage();
            this.base.player.short = saveFile.short;
            this.base.player.a = saveFile.a;
            game.notes = saveFile.notes;

            // flags

            for (const key of Object.keys(this.base.flags)) {
                if (saveFile.flags[key])
                    (this.base.flags as Record<string | number, any>)[key] = saveFile.flags[key];
            }
            let i = 0;

            // PIERCINGS

            // trace("LOADING PIERCINGS");
            this.base.player.nipplesPierced = saveFile.nipplesPierced;
            this.base.player.nipplesPShort = saveFile.nipplesPShort;
            this.base.player.nipplesPLong = saveFile.nipplesPLong;
            this.base.player.lipPierced = saveFile.lipPierced;
            this.base.player.lipPShort = saveFile.lipPShort;
            this.base.player.lipPLong = saveFile.lipPLong;
            this.base.player.tonguePierced = saveFile.tonguePierced;
            this.base.player.tonguePShort = saveFile.tonguePShort;
            this.base.player.tonguePLong = saveFile.tonguePLong;
            this.base.player.eyebrowPierced = saveFile.eyebrowPierced;
            this.base.player.eyebrowPShort = saveFile.eyebrowPShort;
            this.base.player.eyebrowPLong = saveFile.eyebrowPLong;
            this.base.player.earsPierced = saveFile.earsPierced;
            this.base.player.earsPShort = saveFile.earsPShort;
            this.base.player.earsPLong = saveFile.earsPLong;
            this.base.player.nosePierced = saveFile.nosePierced;
            this.base.player.nosePShort = saveFile.nosePShort;
            this.base.player.nosePLong = saveFile.nosePLong;

            // MAIN STATS
            this.base.player.str = saveFile.str;
            this.base.player.tou = saveFile.tou;
            this.base.player.spe = saveFile.spe;
            this.base.player.inte = saveFile.inte;
            this.base.player.lib = saveFile.lib;
            this.base.player.sens = saveFile.sens;
            this.base.player.cor = saveFile.cor;
            this.base.player.fatigue = saveFile.fatigue;

            // CLOTHING/ARMOR
            let found = false;
            if (saveFile.weaponId) {
                this.base.player.setWeaponHiddenField(
                    (ItemType.lookupItem(saveFile.weaponId) as Weapon) || WeaponLib.FISTS,
                );
            } else {
                this.base.player.setWeapon(WeaponLib.FISTS);
                const itemLib = ItemType.getItemLibrary();
                for (const itype of Object.keys(itemLib)) {
                    if (
                        itemLib[itype] instanceof Weapon &&
                        (itemLib[itype] as Weapon).name == saveFile.weaponName
                    ) {
                        this.base.player.setWeaponHiddenField(
                            (itemLib[itype] as Weapon) || WeaponLib.FISTS,
                        );
                        found = true;
                        break;
                    }
                }
            }
            if (saveFile.armorId) {
                this.base.player.setArmorHiddenField(
                    (ItemType.lookupItem(saveFile.armorId) as Armor) ||
                        ArmorLib.COMFORTABLE_UNDERCLOTHES,
                );
                if (this.base.player.armor.name != saveFile.armorName)
                    this.base.player.modArmorName = saveFile.armorName;
            } else {
                found = false;
                this.base.player.setArmor(ArmorLib.COMFORTABLE_UNDERCLOTHES);
                // player.armor = ArmorLib.COMFORTABLE_UNDERCLOTHES;
                const itemLib = ItemType.getItemLibrary();
                for (const itype of Object.keys(itemLib)) {
                    if (
                        itemLib[itype] instanceof Armor &&
                        (itemLib[itype] as Armor).name == saveFile.armorName
                    ) {
                        this.base.player.setArmorHiddenField(
                            (itemLib[itype] as Armor) || ArmorLib.COMFORTABLE_UNDERCLOTHES,
                        );
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    const itemLibNew = ItemType.getItemLibrary();
                    for (const itype of Object.keys(itemLibNew)) {
                        if (itemLibNew[itype] instanceof Armor) {
                            const a: Armor = itemLibNew[itype] as Armor;
                            if (
                                a.value == saveFile.armorValue &&
                                a.def == saveFile.armorDef &&
                                a.perk == saveFile.armorPerk
                            ) {
                                this.base.player.setArmor(a);
                                this.base.player.modArmorName = saveFile.armorName;
                                found = true;
                                break;
                            }
                        }
                    }
                }
            }

            // Combat STATS
            this.base.player.HP = saveFile.HP;
            this.base.player.lust = saveFile.lust;
            if (saveFile.teaseXP == undefined) this.base.player.teaseXP = 0;
            else this.base.player.teaseXP = saveFile.teaseXP;
            if (saveFile.teaseLevel == undefined) this.base.player.teaseLevel = 0;
            else this.base.player.teaseLevel = saveFile.teaseLevel;

            // LEVEL STATS
            this.base.player.XP = saveFile.XP;
            this.base.player.level = saveFile.level;
            this.base.player.gems = saveFile.gems;
            if (saveFile.perkPoints == undefined) this.base.player.perkPoints = 0;
            else this.base.player.perkPoints = saveFile.perkPoints;

            // Appearance
            this.base.player.gender = saveFile.gender;
            if (saveFile.femininity == undefined) this.base.player.femininity = 50;
            else this.base.player.femininity = saveFile.femininity;
            // EYES
            if (saveFile.eyeType == undefined) this.base.player.eyeType = EYES_HUMAN;
            else this.base.player.eyeType = saveFile.eyeType;
            // BEARS
            if (saveFile.beardLength == undefined) this.base.player.beardLength = 0;
            else this.base.player.beardLength = saveFile.beardLength;
            if (saveFile.beardStyle == undefined) this.base.player.beardStyle = 0;
            else this.base.player.beardStyle = saveFile.beardStyle;
            // BODY STYLE
            if (saveFile.tone == undefined) this.base.player.tone = 50;
            else this.base.player.tone = saveFile.tone;
            if (saveFile.thickness == undefined) this.base.player.thickness = 50;
            else this.base.player.thickness = saveFile.thickness;

            this.base.player.tallness = saveFile.tallness;
            this.base.player.hairColor = saveFile.hairColor;
            if (saveFile.hairType == undefined) this.base.player.hairType = 0;
            else this.base.player.hairType = saveFile.hairType;
            if (saveFile.gills == undefined) this.base.player.gills = false;
            else this.base.player.gills = saveFile.gills;
            if (saveFile.armType == undefined) this.base.player.armType = ARM_TYPE_HUMAN;
            else this.base.player.armType = saveFile.armType;
            this.base.player.hairLength = saveFile.hairLength;
            this.base.player.skinType = saveFile.skinType;
            if (saveFile.skinAdj == undefined) this.base.player.skinAdj = "";
            else this.base.player.skinAdj = saveFile.skinAdj;
            this.base.player.skinTone = saveFile.skinTone;
            this.base.player.skinDesc = saveFile.skinDesc;
            // Convert from old skinDesc to new skinAdj + skinDesc!
            if (this.base.player.skinDesc.includes("smooth")) {
                this.base.player.skinAdj = "smooth";
                if (this.base.player.skinType == SKIN_TYPE_PLAIN)
                    this.base.player.skinDesc = "skin";
                if (this.base.player.skinType == SKIN_TYPE_FUR) this.base.player.skinDesc = "fur";
                if (this.base.player.skinType == SKIN_TYPE_SCALES)
                    this.base.player.skinDesc = "scales";
                if (this.base.player.skinType == SKIN_TYPE_GOO) this.base.player.skinDesc = "goo";
            }
            if (this.base.player.skinDesc.includes("thick")) {
                this.base.player.skinAdj = "thick";
                if (this.base.player.skinType == SKIN_TYPE_PLAIN)
                    this.base.player.skinDesc = "skin";
                if (this.base.player.skinType == SKIN_TYPE_FUR) this.base.player.skinDesc = "fur";
                if (this.base.player.skinType == SKIN_TYPE_SCALES)
                    this.base.player.skinDesc = "scales";
                if (this.base.player.skinType == SKIN_TYPE_GOO) this.base.player.skinDesc = "goo";
            }
            if (this.base.player.skinDesc.includes("rubber")) {
                this.base.player.skinAdj = "rubber";
                if (this.base.player.skinType == SKIN_TYPE_PLAIN)
                    this.base.player.skinDesc = "skin";
                if (this.base.player.skinType == SKIN_TYPE_FUR) this.base.player.skinDesc = "fur";
                if (this.base.player.skinType == SKIN_TYPE_SCALES)
                    this.base.player.skinDesc = "scales";
                if (this.base.player.skinType == SKIN_TYPE_GOO) this.base.player.skinDesc = "goo";
            }
            if (this.base.player.skinDesc.includes("latex")) {
                this.base.player.skinAdj = "latex";
                if (this.base.player.skinType == SKIN_TYPE_PLAIN)
                    this.base.player.skinDesc = "skin";
                if (this.base.player.skinType == SKIN_TYPE_FUR) this.base.player.skinDesc = "fur";
                if (this.base.player.skinType == SKIN_TYPE_SCALES)
                    this.base.player.skinDesc = "scales";
                if (this.base.player.skinType == SKIN_TYPE_GOO) this.base.player.skinDesc = "goo";
            }
            if (this.base.player.skinDesc.includes("slimey")) {
                this.base.player.skinAdj = "slimey";
                if (this.base.player.skinType == SKIN_TYPE_PLAIN)
                    this.base.player.skinDesc = "skin";
                if (this.base.player.skinType == SKIN_TYPE_FUR) this.base.player.skinDesc = "fur";
                if (this.base.player.skinType == SKIN_TYPE_SCALES)
                    this.base.player.skinDesc = "scales";
                if (this.base.player.skinType == SKIN_TYPE_GOO) this.base.player.skinDesc = "goo";
            }
            this.base.player.faceType = saveFile.faceType;
            if (saveFile.tongueType == undefined) this.base.player.tongueType = TONUGE_HUMAN;
            else this.base.player.tongueType = saveFile.tongueType;
            if (saveFile.earType == undefined) this.base.player.earType = EARS_HUMAN;
            else this.base.player.earType = saveFile.earType;
            if (saveFile.earValue == undefined) this.base.player.earValue = 0;
            else this.base.player.earValue = saveFile.earValue;
            if (saveFile.antennae == undefined) this.base.player.antennae = ANTENNAE_NONE;
            else this.base.player.antennae = saveFile.antennae;
            this.base.player.horns = saveFile.horns;
            if (saveFile.hornType == undefined) this.base.player.hornType = HORNS_NONE;
            else this.base.player.hornType = saveFile.hornType;
            this.base.player.wingDesc = saveFile.wingDesc;
            this.base.player.wingType = saveFile.wingType;
            this.base.player.lowerBody = saveFile.lowerBody;
            this.base.player.tailType = saveFile.tailType;
            this.base.player.tailVenom = saveFile.tailVenum;
            this.base.player.tailRecharge = saveFile.tailRecharge;
            this.base.player.hipRating = saveFile.hipRating;
            this.base.player.buttRating = saveFile.buttRating;

            // Sexual Stuff
            this.base.player.balls = saveFile.balls;
            this.base.player.cumMultiplier = saveFile.cumMultiplier;
            this.base.player.ballSize = saveFile.ballSize;
            this.base.player.hoursSinceCum = saveFile.hoursSinceCum;
            this.base.player.fertility = saveFile.fertility;
            this.base.player.clitLength = saveFile.clitLength;

            // Preggo stuff
            this.base.player.knockUpForce(saveFile.pregnancyType, saveFile.pregnancyIncubation);
            this.base.player.buttKnockUpForce(
                saveFile.buttPregnancyType,
                saveFile.buttPregnancyIncubation,
            );

            let hasViridianCockSock = false;

            // ARRAYS HERE!
            // Set Cock array
            for (i = 0; i < saveFile.cocks.length; i++) {
                this.base.player.createCock();
            }
            // Populate Cock Array
            for (i = 0; i < saveFile.cocks.length; i++) {
                this.base.player.cocks[i].cockThickness = saveFile.cocks[i].cockThickness;
                this.base.player.cocks[i].cockLength = saveFile.cocks[i].cockLength;
                this.base.player.cocks[i].cockType = CockTypesEnum[saveFile.cocks[i].cockType];
                this.base.player.cocks[i].knotMultiplier = saveFile.cocks[i].knotMultiplier;
                if (saveFile.cocks[i].sock == undefined) this.base.player.cocks[i].sock = "";
                else {
                    this.base.player.cocks[i].sock = saveFile.cocks[i].sock;
                    if (this.base.player.cocks[i].sock == "viridian") hasViridianCockSock = true;
                }
                if (saveFile.cocks[i].pierced == undefined) {
                    this.base.player.cocks[i].pierced = 0;
                    this.base.player.cocks[i].pShortDesc = "";
                    this.base.player.cocks[i].pLongDesc = "";
                } else {
                    this.base.player.cocks[i].pierced = saveFile.cocks[i].pierced;
                    this.base.player.cocks[i].pShortDesc = saveFile.cocks[i].pShortDesc;
                    this.base.player.cocks[i].pLongDesc = saveFile.cocks[i].pLongDesc;

                    if (
                        this.base.player.cocks[i].pShortDesc == "undefined" ||
                        this.base.player.cocks[i].pLongDesc == "undefined"
                    ) {
                        this.base.player.cocks[i].pierced = 0;
                        this.base.player.cocks[i].pShortDesc = "";
                        this.base.player.cocks[i].pLongDesc = "";
                    }
                }
                // trace("LoadOne Cock i(" + i + ")");
            }
            // Set Vaginal Array
            for (i = 0; i < saveFile.vaginas.length; i++) {
                this.base.player.createVagina();
            }
            // Populate Vaginal Array
            for (i = 0; i < saveFile.vaginas.length; i++) {
                this.base.player.vaginas[i].vaginalWetness = saveFile.vaginas[i].vaginalWetness;
                this.base.player.vaginas[i].vaginalLooseness = saveFile.vaginas[i].vaginalLooseness;
                this.base.player.vaginas[i].fullness = saveFile.vaginas[i].fullness;
                this.base.player.vaginas[i].virgin = saveFile.vaginas[i].virgin;
                if (saveFile.vaginas[i].type == undefined) this.base.player.vaginas[i].type = 0;
                else this.base.player.vaginas[i].type = saveFile.vaginas[i].type;
                if (saveFile.vaginas[i].labiaPierced == undefined) {
                    this.base.player.vaginas[i].labiaPierced = 0;
                    this.base.player.vaginas[i].labiaPShort = "";
                    this.base.player.vaginas[i].labiaPLong = "";
                    this.base.player.vaginas[i].clitPierced = 0;
                    this.base.player.vaginas[i].clitPShort = "";
                    this.base.player.vaginas[i].clitPLong = "";
                } else {
                    this.base.player.vaginas[i].labiaPierced = saveFile.vaginas[i].labiaPierced;
                    this.base.player.vaginas[i].labiaPShort = saveFile.vaginas[i].labiaPShort;
                    this.base.player.vaginas[i].labiaPLong = saveFile.vaginas[i].labiaPLong;
                    this.base.player.vaginas[i].clitPierced = saveFile.vaginas[i].clitPierced;
                    this.base.player.vaginas[i].clitPShort = saveFile.vaginas[i].clitPShort;
                    this.base.player.vaginas[i].clitPLong = saveFile.vaginas[i].clitPLong;
                }
                // trace("LoadOne Vagina i(" + i + ")");
            }
            // NIPPLES
            if (saveFile.nippleLength == undefined) this.base.player.nippleLength = 0.25;
            else this.base.player.nippleLength = saveFile.nippleLength;
            // Set Breast Array
            for (i = 0; i < saveFile.breastRows.length; i++) {
                this.base.player.createBreastRow();
                // trace("LoadOne BreastROw i(" + i + ")");
            }
            // Populate Breast Array
            for (i = 0; i < saveFile.breastRows.length; i++) {
                this.base.player.breastRows[i].breasts = saveFile.breastRows[i].breasts;
                this.base.player.breastRows[i].nipplesPerBreast =
                    saveFile.breastRows[i].nipplesPerBreast;
                // Fix nipplesless breasts bug
                if (this.base.player.breastRows[i].nipplesPerBreast == 0)
                    this.base.player.breastRows[i].nipplesPerBreast = 1;
                this.base.player.breastRows[i].breastRating = saveFile.breastRows[i].breastRating;
                this.base.player.breastRows[i].lactationMultiplier =
                    saveFile.breastRows[i].lactationMultiplier;
                if (this.base.player.breastRows[i].lactationMultiplier < 0)
                    this.base.player.breastRows[i].lactationMultiplier = 0;
                this.base.player.breastRows[i].milkFullness = saveFile.breastRows[i].milkFullness;
                this.base.player.breastRows[i].fuckable = saveFile.breastRows[i].fuckable;
                this.base.player.breastRows[i].fullness = saveFile.breastRows[i].fullness;
                if (this.base.player.breastRows[i].breastRating < 0)
                    this.base.player.breastRows[i].breastRating = 0;
            }

            // Force the creation of the default breast row onto the player if it's no longer present
            if (this.base.player.breastRows.length == 0) this.base.player.createBreastRow();

            let hasHistoryPerk = false;
            let hasLustyRegenPerk = false;

            // Populate Perk Array
            for (i = 0; i < saveFile.perks.length; i++) {
                if (saveFile.perks[i] === undefined) {
                    console.error(`perk #${i} is undefined`);
                    continue;
                }
                let id: string = saveFile.perks[i].id || saveFile.perks[i].perkName || "";
                const value1: number = saveFile.perks[i].value1;
                const value2: number = saveFile.perks[i].value2;
                const value3: number = saveFile.perks[i].value3;
                const value4: number = saveFile.perks[i].value4;

                // Fix saves where the Whore perk might have been malformed.
                if (id == "History: Whote") id = "History: Whore";

                // Fix saves where the Lusty Regeneration perk might have been malformed.
                if (id == "Lusty Regeneration") {
                    hasLustyRegenPerk = true;
                } else if (id == "LustyRegeneration") {
                    id = "Lusty Regeneration";
                    hasLustyRegenPerk = true;
                }

                // Some shit checking to track if the incoming data has an available History perk
                if (id.includes("History:")) {
                    hasHistoryPerk = true;
                }

                const ptype: PerkType = PerkType.lookupPerk(id);

                if (ptype == undefined) {
                    trace(`ERROR: Unknown perk id=${id}`);

                    // (saveFile.perks as Array).splice(i,1);
                    // NEVER EVER EVER MODIFY DATA IN THE SAVE FILE LIKE this.base. EVER. FOR ANY REASON.
                } else {
                    trace(`Creating perk : ${ptype}`);
                    this.base.player.createPerk(ptype, value1, value2, value3, value4);

                    if (isNaN(this.base.player.perk(this.base.player.numPerks - 1).value1)) {
                        if (
                            this.base.player.perk(this.base.player.numPerks - 1).perkName ==
                            "Wizard's Focus"
                        ) {
                            this.base.player.perk(this.base.player.numPerks - 1).value1 = 0.3;
                        } else {
                            this.base.player.perk(this.base.player.numPerks).value1 = 0;
                        }

                        trace(
                            `NaN byaaaatch: ${
                                this.base.player.perk(this.base.player.numPerks - 1).value1
                            }`,
                        );
                    }

                    if (
                        this.base.player.perk(this.base.player.numPerks - 1).perkName ==
                        "Wizard's Focus"
                    ) {
                        if (
                            this.base.player.perk(this.base.player.numPerks - 1).value1 == 0 ||
                            this.base.player.perk(this.base.player.numPerks - 1).value1 < 0.1
                        ) {
                            trace("Wizard's Focus boosted up to par (.5)");
                            this.base.player.perk(this.base.player.numPerks - 1).value1 = 0.5;
                        }
                    }
                }
            }

            // Fixup missing History: Whore perk IF AND ONLY IF the flag used to track the prior selection of a history perk has been set
            if (hasHistoryPerk == false && this.base.flags[kFLAGS.HISTORY_PERK_SELECTED] != 0) {
                this.base.player.createPerk(PerkLib.HistoryWhore, 0, 0, 0, 0);
            }

            // Fixup missing Lusty Regeneration perk, if the player has an equipped viridian cock sock and does NOT have the Lusty Regeneration perk
            if (hasViridianCockSock == true && hasLustyRegenPerk == false) {
                this.base.player.createPerk(PerkLib.LustyRegeneration, 0, 0, 0, 0);
            }

            if (this.base.flags[kFLAGS.TATTOO_SAVEFIX_APPLIED] == 0) {
                // Fix some tatto texts that could be broken
                if (
                    typeof this.base.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK] == "string" &&
                    this.base.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK].includes(
                        "lower back.lower back",
                    )
                ) {
                    this.base.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK] = `${
                        this.base.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK].split(".")[0]
                    }.`;
                }

                let refunds = 0;

                if (typeof this.base.flags[kFLAGS.JOJO_TATTOO_LOWERBACK] == "string") {
                    refunds++;
                    this.base.flags[kFLAGS.JOJO_TATTOO_LOWERBACK] = "";
                }

                if (typeof this.base.flags[kFLAGS.JOJO_TATTOO_BUTT] == "string") {
                    refunds++;
                    this.base.flags[kFLAGS.JOJO_TATTOO_BUTT] = "";
                }

                if (typeof this.base.flags[kFLAGS.JOJO_TATTOO_COLLARBONE] == "string") {
                    refunds++;
                    this.base.flags[kFLAGS.JOJO_TATTOO_COLLARBONE] = "";
                }

                if (typeof this.base.flags[kFLAGS.JOJO_TATTOO_SHOULDERS] == "string") {
                    refunds++;
                    this.base.flags[kFLAGS.JOJO_TATTOO_SHOULDERS] = "";
                }

                this.base.player.gems += 50 * refunds;
                this.base.flags[kFLAGS.TATTOO_SAVEFIX_APPLIED] = 1;
            }

            if (this.base.flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] == 1) {
                this.base.flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] = 0;
                trace("Force-reverting Marble At Farm flag to 0.");
            }

            // Set Status Array
            for (i = 0; i < saveFile.statusAffects.length; i++) {
                if (saveFile.statusAffects[i].statusAffectName == "Lactation EnNumbere") continue; // ugh...
                const stype: StatusAffectType = StatusAffectType.lookupStatusAffect(
                    saveFile.statusAffects[i].statusAffectName,
                );
                if (stype == undefined) {
                    CocSettings.error(
                        `Cannot find status affect '${saveFile.statusAffects[i].statusAffectName}'`,
                    );
                    continue;
                }
                this.base.player.createStatusAffect(
                    stype,
                    saveFile.statusAffects[i].value1,
                    saveFile.statusAffects[i].value2,
                    saveFile.statusAffects[i].value3,
                    saveFile.statusAffects[i].value4,
                );
                // trace("StatusAffect " + player.statusAffect(i).stype.id + " loaded.");
            }
            // Make sure keyitems exist!
            if (saveFile.keyItems != undefined) {
                // Set keyItems Array
                for (i = 0; i < saveFile.keyItems.length; i++) {
                    this.base.player.createKeyItem("TEMP", 0, 0, 0, 0);
                }
                // Populate keyItems Array
                for (i = 0; i < saveFile.keyItems.length; i++) {
                    this.base.player.keyItems[i].keyName = saveFile.keyItems[i].keyName;
                    this.base.player.keyItems[i].value1 = saveFile.keyItems[i].value1;
                    this.base.player.keyItems[i].value2 = saveFile.keyItems[i].value2;
                    this.base.player.keyItems[i].value3 = saveFile.keyItems[i].value3;
                    this.base.player.keyItems[i].value4 = saveFile.keyItems[i].value4;
                    // trace("KeyItem " + player.keyItems[i].keyName + " loaded.");
                }
            }

            let storage: ItemSlotClass;
            // Set storage slot array
            if (saveFile.itemStorage == undefined) {
                // trace("OLD SAVES DO NOT CONTAIN ITEM STORAGE ARRAY");
            } else {
                // Populate storage slot array
                for (i = 0; i < saveFile.itemStorage.length; i++) {
                    // trace("Populating a storage slot save with data");
                    this.base.inventory.createStorage();
                    storage = this.itemStorageGet()[i];
                    const savedIS = saveFile.itemStorage[i];
                    if (savedIS.shortName) {
                        if (savedIS.shortName.indexOf("Gro+") != -1) savedIS.id = "GroPlus";
                        else if (savedIS.shortName.indexOf("Sp Honey") != -1)
                            savedIS.id = "SpHoney";
                    }
                    if (savedIS.quantity > 0)
                        storage.setItemAndQty(
                            ItemType.lookupItem(savedIS.id || savedIS.shortName),
                            savedIS.quantity,
                        );
                    else storage.emptySlot();
                    storage.unlocked = savedIS.unlocked;
                }
            }
            // Set gear slot array
            if (saveFile.gearStorage == undefined || saveFile.gearStorage.length < 18) {
                // trace("OLD SAVES DO NOT CONTAIN ITEM STORAGE ARRAY - Creating new!");
                this.base.inventory.initializeGearStorage();
            } else {
                for (
                    i = 0;
                    i < saveFile.gearStorage.length && this.gearStorageGet().length < 20;
                    i++
                ) {
                    this.gearStorageGet().push(new ItemSlotClass());
                    // trace("Initialize a slot for one of the item storage locations to load.");
                }
                // Populate storage slot array
                for (
                    i = 0;
                    i < saveFile.gearStorage.length && i < this.gearStorageGet().length;
                    i++
                ) {
                    // trace("Populating a storage slot save with data");
                    storage = this.gearStorageGet()[i];
                    if (
                        (saveFile.gearStorage[i].shortName == undefined &&
                            saveFile.gearStorage[i].id == undefined) ||
                        saveFile.gearStorage[i].quantity == undefined ||
                        saveFile.gearStorage[i].quantity == 0
                    )
                        storage.emptySlot();
                    else
                        storage.setItemAndQty(
                            ItemType.lookupItem(
                                saveFile.gearStorage[i].id || saveFile.gearStorage[i].shortName,
                            ),
                            saveFile.gearStorage[i].quantity,
                        );
                    storage.unlocked = saveFile.gearStorage[i].unlocked;
                }
            }
            this.base.player.ass.analLooseness = saveFile.ass.analLooseness;
            this.base.player.ass.analWetness = saveFile.ass.analWetness;
            this.base.player.ass.fullness = saveFile.ass.fullness;

            // Shit
            this.gameStateSet(saveFile.gameState);
            this.base.player.exploredLake = saveFile.exploredLake;
            this.base.player.exploredMountain = saveFile.exploredMountain;
            this.base.player.exploredForest = saveFile.exploredForest;
            this.base.player.exploredDesert = saveFile.exploredDesert;
            this.base.player.explored = saveFile.explored;
            game.foundForest = saveFile.foundForest;
            game.foundDesert = saveFile.foundDesert;
            game.foundMountain = saveFile.foundMountain;
            game.foundLake = saveFile.foundLake;

            // Days
            // Time and Items
            this.base.model.time.hours = saveFile.hours;
            this.base.model.time.days = saveFile.days;
            if (saveFile.autoSave == undefined) this.base.player.autoSave = false;
            else this.base.player.autoSave = saveFile.autoSave;

            // PLOTZ
            game.whitney = saveFile.whitney;
            game.monk = saveFile.monk;
            game.sand = saveFile.sand;
            if (saveFile.giacomo == undefined) game.giacomo = 0;
            else game.giacomo = saveFile.giacomo;
            if (saveFile.beeProgress != undefined && saveFile.beeProgress == 1)
                game.forest.beeGirlScene.setTalked(); // Bee Progress update is now in a flag
            // The flag will be zero for any older save that still uses beeProgress and newer saves always store a zero in beeProgress, so we only need to update the flag on a value of one.

            let slotPairList: [ItemSlotClass, any][] = [
                [this.base.player.itemSlot1, saveFile.itemSlot1],
                [this.base.player.itemSlot2, saveFile.itemSlot2],
                [this.base.player.itemSlot3, saveFile.itemSlot3],
                [this.base.player.itemSlot4, saveFile.itemSlot4],
                [this.base.player.itemSlot5, saveFile.itemSlot5],
            ];

            // Unlock
            slotPairList.forEach(([liveSlot, saveSlot], k) => {
                if (k < 3) {
                    liveSlot.unlocked = true;
                } else {
                    liveSlot.unlocked = saveSlot.unlocked;
                }
            });

            slotPairList.forEach(([liveSlot, saveSlot]) => {
                if (saveSlot.shortName) {
                    if (saveSlot.shortName.indexOf("Gro+") > -1) saveSlot.id = "GroPlus";
                    else if (saveSlot.shortName.indexOf("Sp Honey") > -1) saveSlot.id = "SpHoney";
                }

                liveSlot.setItemAndQty(
                    ItemType.lookupItem(saveSlot.id || saveSlot.shortName) || "",
                    saveSlot.quantity || 0,
                );
            });

            CoC.loadAllAwareClasses(this.base.getGame()); // Informs each saveAwareClass that it must load its values from the flags array
            this.unFuckSave();

            // Control Bindings
            if (saveFile.controls != undefined) {
                game.inputManager.LoadBindsFromObj(saveFile.controls);
            }
            this.base.doNext(this.base.playerMenu);
        }
    }

    public unFuckSave(): void {
        // Fixing shit!

        // Fix duplicate elven bounty perks
        if (this.base.player.findPerk(PerkLib.ElvenBounty) >= 0) {
            // CLear duplicates
            while (this.base.player.perkDuplicated(PerkLib.ElvenBounty))
                this.base.player.removePerk(PerkLib.ElvenBounty);
            // Fix fudged preggers value
            if (this.base.player.perkv1(PerkLib.ElvenBounty) == 15) {
                this.base.player.setPerkValue(PerkLib.ElvenBounty, 1, 0);
                this.base.player.addPerkValue(PerkLib.ElvenBounty, 2, 15);
            }
        }

        if (this.base.player.findStatusAffect(StatusAffects.KnockedBack) >= 0) {
            this.base.player.removeStatusAffect(StatusAffects.KnockedBack);
        }

        if (this.base.player.findStatusAffect(StatusAffects.Tentagrappled) >= 0) {
            this.base.player.removeStatusAffect(StatusAffects.Tentagrappled);
        }

        if (
            this.base.player.findStatusAffect(StatusAffects.SlimeCraving) >= 0 &&
            this.base.player.statusAffectv4(StatusAffects.SlimeCraving) == 1
        ) {
            this.base.player.changeStatusValue(
                StatusAffects.SlimeCraving,
                3,
                this.base.player.statusAffectv2(StatusAffects.SlimeCraving),
            ); // Duplicate old combined strength/speed value
            this.base.player.changeStatusValue(StatusAffects.SlimeCraving, 4, 1); // Value four indicates this.base tracks strength and speed separately
        }

        // Fix issues with corrupt cockTypes caused by a error in the serialization code.

        if (
            !(
                CockTypesEnum[this.base.flags[kFLAGS.RUBI_COCK_TYPE]] ||
                typeof this.base.flags[kFLAGS.RUBI_COCK_TYPE] == "number"
            )
        ) {
            // Valid contents of flags[kFLAGS.RUBI_COCK_TYPE] are either a CockTypesEnum or a number

            trace("Fixing save (goo girl)");
            this.base.outx("\n<b>Rubi's cockType is invalid. Defaulting him to human.</b>\n");
            this.base.flags[kFLAGS.RUBI_COCK_TYPE] = 0;
        }

        if (
            !(
                CockTypesEnum[this.base.flags[kFLAGS.GOO_DICK_TYPE]] ||
                typeof this.base.flags[kFLAGS.GOO_DICK_TYPE] == "number"
            )
        ) {
            // Valid contents of flags[kFLAGS.GOO_DICK_TYPE] are either a CockTypesEnum or a number

            trace("Fixing save (goo girl)");
            this.base.outx(
                "\n<b>Latex Goo-Girls's cockType is invalid. Defaulting him to human.</b>\n",
            );
            this.base.flags[kFLAGS.GOO_DICK_TYPE] = 0;
        }

        const flagData = String(this.base.flags[kFLAGS.KATHERINE_BREAST_SIZE]).split("^");
        if (flagData.length < 7 && this.base.flags[kFLAGS.KATHERINE_BREAST_SIZE] > 0) {
            // Older format only stored breast size or zero if not yet initialized
            this.base.getGame().telAdre.katherine.breasts.cupSize = this.base.flags[
                kFLAGS.KATHERINE_BREAST_SIZE
            ];
            this.base.getGame().telAdre.katherine.breasts.lactationLevel =
                BreastStore.LACTATION_DISABLED;
        }

        if (this.base.flags[kFLAGS.SAVE_FILE_INTEGER_FORMAT_VERSION] < 816) {
            // Older saves don't have pregnancy types for all impregnable NPCs. Have to correct this.base.
            // If anything is detected that proves this.base is a new format save then we can return immediately as all further checks are redundant.
            if (this.base.flags[kFLAGS.AMILY_INCUBATION] > 0) {
                if (this.base.flags[kFLAGS.AMILY_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.base.flags[kFLAGS.AMILY_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }
            if (this.base.flags[kFLAGS.AMILY_OVIPOSITED_COUNTDOWN] > 0) {
                if (this.base.flags[kFLAGS.AMILY_BUTT_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                if (this.base.player.findPerk(PerkLib.SpiderOvipositor) >= 0)
                    this.base.flags[kFLAGS.AMILY_BUTT_PREGNANCY_TYPE] =
                        PregnancyStore.PREGNANCY_DRIDER_EGGS;
                else
                    this.base.flags[kFLAGS.AMILY_BUTT_PREGNANCY_TYPE] =
                        PregnancyStore.PREGNANCY_BEE_EGGS;
            }

            if (this.base.flags[kFLAGS.COTTON_PREGNANCY_INCUBATION] > 0) {
                if (this.base.flags[kFLAGS.COTTON_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.base.flags[kFLAGS.COTTON_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.base.flags[kFLAGS.EMBER_INCUBATION] > 0) {
                if (this.base.flags[kFLAGS.EMBER_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.base.flags[kFLAGS.EMBER_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.base.flags[kFLAGS.FEMALE_SPIDERMORPH_PREGNANCY_INCUBATION] > 0) {
                if (this.base.flags[kFLAGS.FEMALE_SPIDERMORPH_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.base.flags[kFLAGS.FEMALE_SPIDERMORPH_PREGNANCY_TYPE] =
                    PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.base.flags[kFLAGS.HELSPAWN_AGE] > 0) {
                kGAMECLASS.helScene.pregnancy.knockUpForce(); // Clear Pregnancy, also removed any old value from HEL_PREGNANCY_NOTICES
            } else if (this.base.flags[kFLAGS.HEL_PREGNANCY_INCUBATION] > 0) {
                if (this.base.flags[kFLAGS.HELIA_PREGNANCY_TYPE] > 3) return; // Must be a new format save
                // HELIA_PREGNANCY_TYPE was previously HEL_PREGNANCY_NOTICES, which ran from 0 to 3. Converted to the new format by multiplying by 65536
                // Since HelSpawn's father is already tracked separately we might as well just use PREGNANCY_PLAYER for all possible pregnancies
                this.base.flags[kFLAGS.HELIA_PREGNANCY_TYPE] =
                    65536 * this.base.flags[kFLAGS.HELIA_PREGNANCY_TYPE] +
                    PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.base.flags[kFLAGS.KELLY_INCUBATION] > 0) {
                if (this.base.flags[kFLAGS.KELLY_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.base.flags[kFLAGS.KELLY_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.base.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_PLAYER)
                return; // Must be a new format save
            if (
                this.base.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] ==
                PregnancyStore.PREGNANCY_OVIELIXIR_EGGS
            )
                return; // Must be a new format save
            if (this.base.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] == 1)
                this.base.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            if (this.base.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] == 2)
                this.base.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] =
                    PregnancyStore.PREGNANCY_OVIELIXIR_EGGS;

            if (this.base.flags[kFLAGS.PHYLLA_DRIDER_INCUBATION] > 0) {
                if (this.base.flags[kFLAGS.PHYLLA_VAGINAL_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.base.flags[kFLAGS.PHYLLA_VAGINAL_PREGNANCY_TYPE] =
                    PregnancyStore.PREGNANCY_DRIDER_EGGS;
                this.base.flags[kFLAGS.PHYLLA_DRIDER_INCUBATION] *= 24; // Convert pregnancy to days
            }

            if (this.base.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION] > 0) {
                if (this.base.flags[kFLAGS.SHEILA_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.base.flags[kFLAGS.SHEILA_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
                if (this.base.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION] >= 4)
                    this.base.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION] = 0;
                // Was ready to be born
                else
                    this.base.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION] =
                        24 * (4 - this.base.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION]); // Convert to hours and count down rather than up
            }

            if (
                this.base.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] != 0 &&
                this.base.flags[kFLAGS.SOPHIE_INCUBATION] != 0
            )
                return; // Must be a new format save
            if (
                this.base.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] > 0 &&
                this.base.flags[kFLAGS.SOPHIE_INCUBATION] == 0
            ) {
                // She's in the wild and pregnant with an egg
                this.base.flags[kFLAGS.SOPHIE_INCUBATION] = this.base.flags[
                    kFLAGS.SOPHIE_PREGNANCY_TYPE
                ]; // SOPHIE_PREGNANCY_TYPE was previously SOPHIE_WILD_EGG_COUNTDOWN_TIMER
                this.base.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            } else if (
                this.base.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] == 0 &&
                this.base.flags[kFLAGS.SOPHIE_INCUBATION] > 0
            ) {
                this.base.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.base.flags[kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_TYPE] != 0) return; // Must be a new format save
            if (this.base.flags[kFLAGS.TAMANI_DAUGHTER_PREGGO_COUNTDOWN] > 0) {
                this.base.flags[kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_TYPE] =
                    PregnancyStore.PREGNANCY_PLAYER;
                this.base.flags[kFLAGS.TAMANI_DAUGHTER_PREGGO_COUNTDOWN] *= 24; // Convert pregnancy to days
                this.base.flags[
                    kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT
                ] = this.base.player.statusAffectv3(StatusAffects.Tamani);
            }

            if (this.base.flags[kFLAGS.TAMANI_PREGNANCY_TYPE] != 0) return; // Must be a new format save
            if (this.base.player.findStatusAffect(StatusAffects.TamaniFemaleEncounter) >= 0)
                this.base.player.removeStatusAffect(StatusAffects.TamaniFemaleEncounter); // Wasn't used in previous code
            if (this.base.player.findStatusAffect(StatusAffects.Tamani) >= 0) {
                if (this.base.player.statusAffectv1(StatusAffects.Tamani) == -500) {
                    // this.base used to indicate that a player had met Tamani as a male
                    this.base.flags[kFLAGS.TAMANI_PREGNANCY_INCUBATION] = 0;
                    this.base.flags[kFLAGS.TAMANI_MET] = 1; // this.base now indicates the same thing
                } else
                    this.base.flags[kFLAGS.TAMANI_PREGNANCY_INCUBATION] =
                        this.base.player.statusAffectv1(StatusAffects.Tamani) * 24; // Convert pregnancy to days
                this.base.flags[
                    kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS
                ] = this.base.player.statusAffectv2(StatusAffects.Tamani);
                this.base.flags[kFLAGS.TAMANI_PREGNANCY_COUNT] = this.base.player.statusAffectv3(
                    StatusAffects.Tamani,
                );
                this.base.flags[kFLAGS.TAMANI_TIMES_IMPREGNATED] = this.base.player.statusAffectv4(
                    StatusAffects.Tamani,
                );
                if (this.base.flags[kFLAGS.TAMANI_PREGNANCY_INCUBATION] > 0)
                    this.base.flags[kFLAGS.TAMANI_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
                this.base.player.removeStatusAffect(StatusAffects.Tamani);
            }

            if (
                this.base.flags[kFLAGS.EGG_WITCH_TYPE] == PregnancyStore.PREGNANCY_BEE_EGGS ||
                this.base.flags[kFLAGS.EGG_WITCH_TYPE] == PregnancyStore.PREGNANCY_DRIDER_EGGS
            )
                return; // Must be a new format save
            if (this.base.flags[kFLAGS.EGG_WITCH_TYPE] > 0) {
                if (this.base.flags[kFLAGS.EGG_WITCH_TYPE] == 1)
                    this.base.flags[kFLAGS.EGG_WITCH_TYPE] = PregnancyStore.PREGNANCY_BEE_EGGS;
                else this.base.flags[kFLAGS.EGG_WITCH_TYPE] = PregnancyStore.PREGNANCY_DRIDER_EGGS;
                this.base.flags[kFLAGS.EGG_WITCH_COUNTER] =
                    24 * (8 - this.base.flags[kFLAGS.EGG_WITCH_COUNTER]); // Reverse the count and change to hours rather than days
            }

            if (this.base.player.buttPregnancyType == PregnancyStore.PREGNANCY_BEE_EGGS) return; // Must be a new format save
            if (this.base.player.buttPregnancyType == PregnancyStore.PREGNANCY_DRIDER_EGGS) return; // Must be a new format save
            if (this.base.player.buttPregnancyType == PregnancyStore.PREGNANCY_SANDTRAP_FERTILE)
                return; // Must be a new format save
            if (this.base.player.buttPregnancyType == PregnancyStore.PREGNANCY_SANDTRAP) return; // Must be a new format save
            if (this.base.player.buttPregnancyType == 2)
                this.base.player.buttKnockUpForce(
                    PregnancyStore.PREGNANCY_BEE_EGGS,
                    this.base.player.buttPregnancyIncubation,
                );
            if (this.base.player.buttPregnancyType == 3)
                this.base.player.buttKnockUpForce(
                    PregnancyStore.PREGNANCY_DRIDER_EGGS,
                    this.base.player.buttPregnancyIncubation,
                );
            if (this.base.player.buttPregnancyType == 4)
                this.base.player.buttKnockUpForce(
                    PregnancyStore.PREGNANCY_SANDTRAP_FERTILE,
                    this.base.player.buttPregnancyIncubation,
                );
            if (this.base.player.buttPregnancyType == 5)
                this.base.player.buttKnockUpForce(
                    PregnancyStore.PREGNANCY_SANDTRAP,
                    this.base.player.buttPregnancyIncubation,
                );

            // If dick length zero then player has never met Kath, no need to set flags. If her breast size is zero then set values for flags introduced with the employment expansion
            if (this.base.flags[kFLAGS.KATHERINE_BREAST_SIZE] != 0) return; // Must be a new format save
            if (this.base.flags[kFLAGS.KATHERINE_DICK_LENGTH] != 0) {
                this.base.flags[kFLAGS.KATHERINE_BREAST_SIZE] = BREAST_CUP_B;
                this.base.flags[kFLAGS.KATHERINE_BALL_SIZE] = 1;
                this.base.flags[kFLAGS.KATHERINE_HAIR_COLOR] = "neon pink";
                this.base.flags[kFLAGS.KATHERINE_HOURS_SINCE_CUM] = 200; // Give her maxed out cum for that first time
            }

            if (this.base.flags[kFLAGS.URTA_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_BEE_EGGS)
                return; // Must be a new format save
            if (this.base.flags[kFLAGS.URTA_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_DRIDER_EGGS)
                return; // Must be a new format save
            if (this.base.flags[kFLAGS.URTA_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_PLAYER)
                return; // Must be a new format save
            if (this.base.flags[kFLAGS.URTA_PREGNANCY_TYPE] > 0) {
                // URTA_PREGNANCY_TYPE was previously URTA_EGG_INCUBATION, assume this.base was an egg pregnancy
                this.base.flags[kFLAGS.URTA_INCUBATION] = this.base.flags[
                    kFLAGS.URTA_PREGNANCY_TYPE
                ];
                if (this.base.player.findPerk(PerkLib.SpiderOvipositor) >= 0)
                    this.base.flags[kFLAGS.URTA_PREGNANCY_TYPE] =
                        PregnancyStore.PREGNANCY_DRIDER_EGGS;
                else
                    this.base.flags[kFLAGS.URTA_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_BEE_EGGS;
            } else if (this.base.flags[kFLAGS.URTA_INCUBATION] > 0) {
                // Assume Urta was pregnant with the player's baby
                this.base.flags[kFLAGS.URTA_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
                this.base.flags[kFLAGS.URTA_INCUBATION] =
                    384 - this.base.flags[kFLAGS.URTA_INCUBATION]; // Reverse the pregnancy counter since it now counts down rather than up
            }

            if (
                this.base.flags[kFLAGS.EDRYN_PREGNANCY_TYPE] > 0 &&
                this.base.flags[kFLAGS.EDRYN_PREGNANCY_INCUBATION] == 0
            ) {
                // EDRYN_PREGNANCY_TYPE was previously EDRYN_BIRF_COUNTDOWN - used when Edryn was pregnant with Taoth
                if (this.base.flags[kFLAGS.EDRYN_PREGNANCY_INCUBATION] > 0)
                    this.base.flags[kFLAGS.URTA_FERTILE] = PregnancyStore.PREGNANCY_PLAYER; // These two variables are used to store information on the pregnancy Taoth
                this.base.flags[kFLAGS.URTA_PREG_EVERYBODY] = this.base.flags[
                    kFLAGS.EDRYN_PREGNANCY_INCUBATION
                ]; // is overriding (if any), so they can later be restored.
                this.base.flags[kFLAGS.EDRYN_PREGNANCY_INCUBATION] = this.base.flags[
                    kFLAGS.EDRYN_PREGNANCY_TYPE
                ];
                this.base.flags[kFLAGS.EDRYN_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_TAOTH;
            } else if (
                this.base.flags[kFLAGS.EDRYN_PREGNANCY_INCUBATION] > 0 &&
                this.base.flags[kFLAGS.EDRYN_PREGNANCY_TYPE] == 0
            )
                this.base.flags[kFLAGS.EDRYN_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
        }
    }
}
