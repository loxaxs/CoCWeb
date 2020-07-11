import { BoundControlMethod } from "../BoundControlMethod";
import { InputManager } from "../InputManager";
import { BindDisplay } from "./BindDisplay";

/**
 * Defines a new UI element, providing a scrollable container to be used for display of bound
 * keyboard controls.
 *
 * @author Gedan
 */
export class BindingPane {
    public element: HTMLElement;

    private _inputManager: InputManager;

    // A lookup for integer keyCodes -> string representations

    private _functions: BoundControlMethod[];

    /**
     * Initiate the BindingPane, setting the stage positioning and reference back to the input manager
     * so we can generate function callbacks later.
     *
     * @param inputManager Reference to the game input manager for method access
     * @param xPos
//  X position on the stage for the top-left corner of the ScrollPane
     * @param yPos
//  Y position on the stage for the top-left corner of the ScrollPane
     * @param width
//  Fixed width of the containing ScrollPane
     * @param height
//  Fixed height of the containing ScrollPane
     */
    public constructor(inputManager: InputManager) {
        this._inputManager = inputManager;

        this.element = document.createElement("div");

        this._functions = [];
    }

    public ListBindingOptions(): void {
        this.InitContentObjects();
    }

    /**
     * Initiate the container used to display all of the available functions that can be bound,
     * along with a pair of buttons representing primary and secondary keys.
     * The buttons call back into the input manager to trigger the key binding mode, display object
     * switches, and set state so the input manager knows what function to bind an incoming keyCode
     * to.
     * TODO: Shoot self in face.
     */
    private InitContentObjects(): void {
        // Add a nice little instructional field at the top of the display.
        let helpLabel = "<b>Keyboard Control Bindings:</b>\n\n";
        helpLabel +=
            "Click a button next to the action you wish to bind to a new key, then hit the key you want to bind the selected action to.\n\n";
        helpLabel += "Custom bindings are stored inside your save game files.\n\n";
        helpLabel += "Duplicate keys are automatically unbound from their old control action.\n\n";
        helpLabel +=
            "<b>Reset Ctrls</b> will reset all of the control bindings to their defaults.\n\n";
        helpLabel +=
            "<b>Clear Ctrls</b> will remove all of the current control bindings, leaving everything Unbound.\n\n";

        this.element.innerHTML = helpLabel;

        const table = document.createElement("table");

        for (const func of this._functions) {
            const newLabel = new BindDisplay();
            newLabel.htmlText = `<b>${func.Name}:</b>`;
            newLabel.button1Text = String.fromCharCode(func.PrimaryKey);
            newLabel.button2Text = String.fromCharCode(func.SecondaryKey);

            // This is going to look crazy...
            const genPrimaryCallback = function (funcName: string, inMan: InputManager) {
                return () => {
                    inMan.ListenForNewBind(funcName, InputManager.PRIMARYKEY);
                };
            };

            const genSecondaryCallback = function (funcName: string, inMan: InputManager) {
                return () => {
                    inMan.ListenForNewBind(funcName, InputManager.SECONDARYKEY);
                };
            };
            // ... Warned you.

            newLabel.button1Callback = genPrimaryCallback(func.Name, this._inputManager);
            newLabel.button2Callback = genSecondaryCallback(func.Name, this._inputManager);

            // this._content.addChild(newLabel);
            table.appendChild(newLabel.element);
        }
        this.element.appendChild(table);
    }

    public set functions(funcs: BoundControlMethod[]) {
        this._functions = funcs;
    }

    public get functions(): BoundControlMethod[] {
        return this._functions;
    }
}
