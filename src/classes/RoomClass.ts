/**
 * ...
 *
 * @author Gedan
 */
export class Room {
    public RoomName?: string; // Index name
    public RoomDisplayName?: string; // Header text

    public NorthExit?: string;
    public NorthExitCondition?: () => boolean;

    public EastExit?: string;
    public EastExitCondition?: () => boolean;

    public SouthExit?: string;
    public SouthExitCondition?: () => boolean;

    public WestExit?: string;
    public WestExitCondition?: () => boolean;

    public RoomFunction?: any;
}
