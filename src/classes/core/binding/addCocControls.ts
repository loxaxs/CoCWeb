import { CoC } from "../../CoC";
import { InputManager } from "../../InputManager";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";

export const addCocControls = (coc: CoC) => {
    // include "../../includes/ControlBindings.as";
    coc.inputManager.AddBindableControl("Show Stats", "Show the stats pane when available", () => {
        if (coc.mainView.statsButton.visible && coc.player.str > 0) {
            coc.displayStats();
        }
    });

    coc.inputManager.AddBindableControl("Level Up", "Show the level up page when available", () => {
        if (coc.mainView.levelButton.visible && coc.player.str > 0) {
            coc.levelUpGo();
        }
    });

    coc.inputManager.AddBindableControl(
        "Quicksave 1",
        "Quicksave the current game to slot 1",
        () => {
            if (coc.mainView.dataButton.visible && coc.player.str > 0) {
                coc.saves.saveGame("CoC_1");
                coc.outx("Game saved to slot 1!", true);
                coc.doNext(coc.playerMenu);
            }
        },
    );

    coc.inputManager.AddBindableControl(
        "Quicksave 2",
        "Quicksave the current game to slot 2",
        () => {
            if (coc.mainView.dataButton.visible && coc.player.str > 0) {
                coc.saves.saveGame("CoC_2");
                coc.outx("Game saved to slot 2!", true);
                coc.doNext(coc.playerMenu);
            }
        },
    );

    coc.inputManager.AddBindableControl(
        "Quicksave 3",
        "Quicksave the current game to slot 2",
        () => {
            if (coc.mainView.dataButton.visible && coc.player.str > 0) {
                coc.saves.saveGame("CoC_3");
                coc.outx("Game saved to slot 3!", true);
                coc.doNext(coc.playerMenu);
            }
        },
    );

    coc.inputManager.AddBindableControl(
        "Quicksave 4",
        "Quicksave the current game to slot 4",
        () => {
            if (coc.mainView.dataButton.visible && coc.player.str > 0) {
                coc.saves.saveGame("CoC_4");
                coc.outx("Game saved to slot 4!", true);
                coc.doNext(coc.playerMenu);
            }
        },
    );

    coc.inputManager.AddBindableControl(
        "Quicksave 5",
        "Quicksave the current game to slot 5",
        () => {
            if (coc.mainView.dataButton.visible && coc.player.str > 0) {
                coc.saves.saveGame("CoC_5");
                coc.outx("Game saved to slot 5!", true);
                coc.doNext(coc.playerMenu);
            }
        },
    );

    coc.inputManager.AddBindableControl(
        "Quickload 1",
        "Quickload the current game from slot 1",
        () => {
            if (coc.mainView.dataButton.visible) {
                const saveFile = coc.saves.getSaveObj("CoC_1");
                if (saveFile.data.exists) {
                    coc.saves.loadGame("CoC_1");
                    coc.showStats();
                    coc.statScreenRefresh();
                    coc.outx("Slot 1 Loaded!", true);
                    coc.doNext(coc.playerMenu);
                }
            }
        },
    );

    coc.inputManager.AddBindableControl(
        "Quickload 2",
        "Quickload the current game from slot 2",
        () => {
            if (coc.mainView.dataButton.visible) {
                const saveFile = coc.saves.getSaveObj("CoC_2");
                if (saveFile.data.exists) {
                    coc.saves.loadGame("CoC_2");
                    coc.showStats();
                    coc.statScreenRefresh();
                    coc.outx("Slot 2 Loaded!", true);
                    coc.doNext(coc.playerMenu);
                }
            }
        },
    );

    coc.inputManager.AddBindableControl(
        "Quickload 3",
        "Quickload the current game from slot 3",
        () => {
            if (coc.mainView.dataButton.visible) {
                const saveFile = coc.saves.getSaveObj("CoC_3");
                if (saveFile.data.exists) {
                    coc.saves.loadGame("CoC_3");
                    coc.showStats();
                    coc.statScreenRefresh();
                    coc.outx("Slot 3 Loaded!", true);
                    coc.doNext(coc.playerMenu);
                }
            }
        },
    );

    coc.inputManager.AddBindableControl(
        "Quickload 4",
        "Quickload the current game from slot 4",
        () => {
            if (coc.mainView.dataButton.visible) {
                const saveFile = coc.saves.getSaveObj("CoC_4");
                if (saveFile.data.exists) {
                    coc.saves.loadGame("CoC_4");
                    coc.showStats();
                    coc.statScreenRefresh();
                    coc.outx("Slot 4 Loaded!", true);
                    coc.doNext(coc.playerMenu);
                }
            }
        },
    );

    coc.inputManager.AddBindableControl(
        "Quickload 5",
        "Quickload the current game from slot 5",
        () => {
            if (coc.mainView.dataButton.visible) {
                const saveFile = coc.saves.getSaveObj("CoC_5");
                if (saveFile.data.exists) {
                    coc.saves.loadGame("CoC_5");
                    coc.showStats();
                    coc.statScreenRefresh();
                    coc.outx("Slot 5 Loaded!", true);
                    coc.doNext(coc.playerMenu);
                }
            }
        },
    );

    coc.inputManager.AddBindableControl("Show Menu", "Show the main menu", () => {
        if (
            coc.mainView.newGameButton.visible &&
            coc.mainView.newGameButton.labelText === "Main Menu"
        ) {
            coc.mainMenu();
        }
    });

    coc.inputManager.AddBindableControl("Data Menu", "Show the save/load menu", () => {
        if (coc.mainView.dataButton.visible) {
            coc.saves.saveLoad();
        }
    });

    coc.inputManager.AddBindableControl("Appearance Page", "Show the appearance page", () => {
        if (coc.mainView.appearanceButton.visible) {
            coc.appearance();
        }
    });

    coc.inputManager.AddBindableControl("No", "Respond no to any available prompt", () => {
        if (
            coc.mainView.bottomButtons[1].labelText == "No" &&
            coc.mainView.bottomButtons[1].visible
        ) {
            coc.mainView.bottomButtons[1].click();
        }
    });

    coc.inputManager.AddBindableControl("Yes", "Respond yes to any available prompt", () => {
        if (
            coc.mainView.bottomButtons[0].labelText == "Yes" &&
            coc.mainView.bottomButtons[0].visible
        ) {
            coc.mainView.bottomButtons[0].click();
        }
    });

    coc.inputManager.AddBindableControl("Show Perks", "Show the perks page", () => {
        if (coc.mainView.perksButton.visible) {
            coc.displayPerks();
        }
    });

    coc.inputManager.AddBindableControl("Continue", "Respond to continue", () => {
        // Button 9
        if (
            coc.mainView.bottomButtons[9].visible &&
            !~["Nevermind", "Abandon", "Next", "Return", "Back", "Leave", "Resume"].indexOf(
                coc.mainView.bottomButtons[9].labelText,
            )
        ) {
            // trace( "keyboard(): processing space bar for button 9",
            //  mainView.buttonIsVisible( 9 ) ? "(visible)" : "(hidden)",
            //  mainView.getButtonText( 9 ) );
            coc.mainView.bottomButtons[9].click();
            return;
        }

        // Button 0
        if (
            coc.mainView.bottomButtons[0].visible &&
            !~["Next", "Return", "Back"].indexOf(coc.mainView.bottomButtons[0].labelText)
        ) {
            // trace( "keyboard(): processing space bar for button 0",
            //  mainView.buttonIsVisible( 0 ) ? "(visible)" : "(hidden)",
            //  mainView.getButtonText( 0 ) );
            coc.mainView.bottomButtons[0].click();
            return;
        }

        // Button 4
        if (
            coc.mainView.bottomButtons[4].visible &&
            !~["Nevermind", "Next", "Return", "Back", "Leave"].indexOf(
                coc.mainView.bottomButtons[4].labelText,
            )
        ) {
            // trace( "keyboard(): processing space bar for button 4",
            //  mainView.buttonIsVisible( 4 ) ? "(visible)" : "(hidden)",
            //  mainView.getButtonText( 4 ) );
            coc.mainView.bottomButtons[4].click();
            return;
        }

        // Button 5
        if (
            coc.mainView.bottomButtons[5].visible &&
            !~["Next", "Return", "Back"].indexOf(coc.mainView.bottomButtons[5].labelText)
        ) {
            // trace( "keyboard(): processing space bar for button 5",
            //  mainView.buttonIsVisible( 5 ) ? "(visible)" : "(hidden)",
            //  mainView.getButtonText( 5 ) );
            coc.mainView.bottomButtons[5].click();
            return;
        }
    });

    coc.inputManager.AddBindableControl(
        "Cycle Background",
        "Cycle the background fill of the text display area",
        () => {
            if (!coc.mainView.mainText.classList.contains("tan")) {
                coc.mainView.mainText.classList.add("tan");
            } else if (!coc.mainView.mainText.classList.contains("white")) {
                coc.mainView.mainText.classList.add("white");
            } else {
                coc.mainView.mainText.classList.remove("tan", "white");
            }
        },
    );

    coc.inputManager.AddBindableControl("Button 1", "Activate button 1", () => {
        if (coc.mainView.bottomButtons[0].visible) {
            coc.mainView.bottomButtons[0].click();
        }
    });

    coc.inputManager.AddBindableControl("Button 2", "Activate button 2", () => {
        if (coc.mainView.bottomButtons[1].visible) {
            coc.mainView.bottomButtons[1].click();
        }
    });

    coc.inputManager.AddBindableControl("Button 3", "Activate button 3", () => {
        if (coc.mainView.bottomButtons[2].visible) {
            coc.mainView.bottomButtons[2].click();
        }
    });

    coc.inputManager.AddBindableControl("Button 4", "Activate button 4", () => {
        if (coc.mainView.bottomButtons[3].visible) {
            coc.mainView.bottomButtons[3].click();
        }
    });

    coc.inputManager.AddBindableControl("Button 5", "Activate button 5", () => {
        if (coc.mainView.bottomButtons[4].visible) {
            coc.mainView.bottomButtons[4].click();
        }
    });

    coc.inputManager.AddBindableControl("Button 6", "Activate button 6", () => {
        if (coc.mainView.bottomButtons[5].visible) {
            coc.mainView.bottomButtons[5].click();
        }
    });

    coc.inputManager.AddBindableControl("Button 7", "Activate button 7", () => {
        if (coc.mainView.bottomButtons[6].visible) {
            coc.mainView.bottomButtons[6].click();
        }
    });

    coc.inputManager.AddBindableControl("Button 8", "Activate button 8", () => {
        if (coc.mainView.bottomButtons[7].visible) {
            coc.mainView.bottomButtons[7].click();
        }
    });

    coc.inputManager.AddBindableControl("Button 9", "Activate button 9", () => {
        if (coc.mainView.bottomButtons[8].visible) {
            coc.mainView.bottomButtons[8].click();
        }
    });

    coc.inputManager.AddBindableControl("Button 10", "Activate button 10", () => {
        if (coc.mainView.bottomButtons[9].visible) {
            coc.mainView.bottomButtons[9].click();
        }
    });

    coc.inputManager.AddBindableControl(
        "Cheat! Give Hummus",
        "Cheat code to get free hummus",
        (keyCode: number) => {
            if (coc.flags[kFLAGS.CHEAT_ENTERING_COUNTER] == 0) {
                if (keyCode == 38) {
                    coc.flags[kFLAGS.CHEAT_ENTERING_COUNTER]++;
                } else {
                    coc.flags[kFLAGS.CHEAT_ENTERING_COUNTER] = 0;
                }
            } else if (coc.flags[kFLAGS.CHEAT_ENTERING_COUNTER] == 1) {
                if (keyCode == 40) {
                    coc.flags[kFLAGS.CHEAT_ENTERING_COUNTER]++;
                } else {
                    coc.flags[kFLAGS.CHEAT_ENTERING_COUNTER] = 0;
                }
            } else if (coc.flags[kFLAGS.CHEAT_ENTERING_COUNTER] == 2) {
                if (keyCode == 37) {
                    coc.flags[kFLAGS.CHEAT_ENTERING_COUNTER]++;
                } else {
                    coc.flags[kFLAGS.CHEAT_ENTERING_COUNTER] = 0;
                }
            } else if (coc.flags[kFLAGS.CHEAT_ENTERING_COUNTER] == 3) {
                if (keyCode == 39) {
                    if (
                        coc.player.str > 0 &&
                        coc.mainView.bottomButtons[0].labelText !== "Game Over"
                    ) {
                        kGAMECLASS.inventory.giveHumanizer();
                    }
                } else {
                    coc.flags[kFLAGS.CHEAT_ENTERING_COUNTER] = 0;
                }
            }
        },
        InputManager.CHEATCONTROL,
    );
};
