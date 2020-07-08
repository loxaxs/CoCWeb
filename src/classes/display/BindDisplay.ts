import { CoCButton } from "../../view/CoCButton";

/**
 * Defines a composite display object of all the seperate components required to display a
 * single BoundControlMethod, its associated primary and secondary bindings with the buttons
 * used to bind methods to new keys.
 *
 * @author Gedan
 */
export class BindDisplay {
    public element: HTMLTableRowElement;

    // Object components and settings
    private _nameLabel: HTMLParagraphElement;
    private _buttons: CoCButton[];


    /**
     * Create a new composite object, initilizing the label to be used for display, as well as the two
     * buttons used for user interface.
     *
     * @param maxWidth Defines the maximum available width that the control can consume for positining math
     */
    public constructor() {
        this.element = document.createElement("tr");

        const labelCell = document.createElement("td");
        this.element.appendChild(labelCell);

        this._nameLabel = document.createElement("p");
        labelCell.appendChild(this._nameLabel);

        const button1 = document.createElement("td");
        button1.className = "controlButton";
        button1.innerHTML = '<a class="button"></a>';

        const button2 = document.createElement("td");
        button2.className = "controlButton";
        button2.innerHTML = '<a class="button"></a>';

        this._buttons = [new CoCButton(button1), new CoCButton(button2)];
        this.element.appendChild(button1);
        this.element.appendChild(button2);
    }


    public get htmlText() {
        return this._nameLabel.innerHTML;
    }

    public set htmlText(value) {
        this._nameLabel.innerHTML = value;
    }

    public get button1Text() {
        return this._buttons[0].labelText;
    }

    public get button2Text() {
        return this._buttons[1].labelText;
    }

    public set button1Text(value) {
        // if (value != this._button1Text) {
        //     this._button1Text = value;
        this._buttons[0].labelText = `<b>${value}</b>`;
        // }
    }

    public set button2Text(value) {
        // if (value != this._button2Text) {
        //     this._button2Text = value;
        this._buttons[1].labelText = `<b>${value}</b>`;
        // }
    }

    public set button1Callback(callback: () => void) {
        this._buttons[0].callback = callback;
    }

    public set button2Callback(callback: () => void) {
        this._buttons[1].callback = callback;
    }
}
