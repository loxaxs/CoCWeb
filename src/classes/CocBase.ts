// CoCBase.ts
// A class that CoC extends, to move out the most-often just so that methods can be moved out of CoC, because
// working with this HUGE CoC.ts is very slow (to compile).

import { kFLAGS } from "./GlobalFlags/kFLAGS";
import { Flags } from "./FlagTypeOverrides";

export abstract class CocBase {
    abstract debug: boolean;
    abstract outx(output: string, purgeText?: boolean, parseAsMarkdown?: boolean): void;
    abstract flags: Flags;

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
}
