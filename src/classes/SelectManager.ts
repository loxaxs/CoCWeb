type Grep<T> = (ev: T) => boolean;

export class TextSelectionManager {
    private outputRoot: HTMLElement;
    private grep: Grep<MouseEvent>;

    constructor(
        cssAdder: (css: string) => void,
        grep: Grep<MouseEvent>,
        inputRoot: HTMLElement,
        outputRoot: HTMLElement,
    ) {
        cssAdder(`
        .noSelect {
            user-select: none;
        }
        `);

        this.grep = grep;

        inputRoot.addEventListener("mousedown", this.handleMousedown, true);
        inputRoot.addEventListener("mouseup", this.handleEnd, true);

        this.outputRoot = outputRoot;
    }

    handleMousedown = (ev: MouseEvent) => {
        if (this.grep(ev)) {
            this.handleStart();
        }
    };

    handleStart = () => {
        this.disallowSelection();
        setTimeout(this.handleEnd, 2000);
    };

    handleEnd = () => {
        this.reallowSelection();
    };

    disallowSelection = () => {
        this.outputRoot.classList.add("noSelect");
    };

    reallowSelection = () => {
        this.outputRoot.classList.remove("noSelect");
    };
}
