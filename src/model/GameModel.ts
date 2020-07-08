import { Player } from "../classes/Player";
import { TimeModel } from "./TimeModel";

export class GameModel {
    public player: Player = new Player();
    public oldStats: Record<string, any> = {};
    public time: TimeModel = new TimeModel();

    public flags: Record<string, any> = {};

    // I think this is supposed to be a compile time constant, sorta...
    public mobile = false;

    // TODO: Should this be attached to player instead?
    public maxHP: any;
}
