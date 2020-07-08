import { Useable } from "./Useable";

/**
 * Created by aimozg on 09.01.14.
 */

/**
 * An item, that is consumed by player, and disappears after use. Direct subclasses should override "doEffect" method
 * and NOT "useItem" method.
 */
export class Consumable extends Useable {
    /**
     * Perform effect on player WITHOUT requiring item being in player's inventory and removing it
     */
    /**
     * Removes item from player and does effect
     */
}
