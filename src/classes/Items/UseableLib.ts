import { BaseContent } from "../BaseContent";
import { SimpleUseable } from "./Other/SimpleUseable";

/**
 * Created by aimozg on 10.01.14.
 */

export class UseableLib extends BaseContent {
    public B_CHITN: SimpleUseable = new SimpleUseable(
        "B.Chitn",
        "B.Chitn",
        "a large shard of chitinous plating",
        6,
        "A perfect piece of black chitin from a bee-girl.  It still has some fuzz on it.",
        "You look over the scale carefully but cannot find a use for it.  Maybe someone else will know how to use it.",
    );
    public GLDSTAT: SimpleUseable = new SimpleUseable(
        "GldStat",
        "GldStat",
        "a golden statue",
        600,
        "An intricate golden idol of an androgynous humanoid figure with nine long tails.  It probably had some spiritual significance to its owner.",
        "",
        `You pull out the gold statue and turn it around in your hands a few times, carefully examining the intricate filigree and inscriptions covering the masterfully crafted idol.  Whoever made this certainly put a lot of time and love into their craft. It's not much use to you other than decoration, but based on the craftsmanship alone you judge that you could get a fair price for it if you pawned it off.`,
    );
    public GREENGL: SimpleUseable = new SimpleUseable(
        "GreenGl",
        "GreenGl",
        "a clump of green gel",
        6,
        "This tough substance has no obvious use that you can discern.",
        "You examine the gel thoroughly, noting it is tough and resiliant, yet extremely pliable.  Somehow you know eating it would not be a good idea.",
    );
    public T_SSILK: SimpleUseable = new SimpleUseable(
        "T.SSilk",
        "T.SSilk",
        "a bundle of tough spider-silk",
        6,
        "This bundle of fibrous silk is incredibly tough and strong, though somehow not sticky in the slightest.  You have no idea how to work these tough little strands into anything usable.  Perhaps one of this land's natives might have an idea?",
        "You look over the tough webbing, confusion evident in your expression.  There's really nothing practical you can do with these yourself.  It might be best to find someone more familiar with the odd materials in this land to see if they can make sense of it.",
    );
}
