import { InputManager } from "../../InputManager";

export const addCocBinding = (manager: InputManager) => {
    manager.BindKeyToControl(83, "Show Stats");
    manager.BindKeyToControl(76, "Level Up");
    manager.BindKeyToControl(112, "Quicksave 1");
    manager.BindKeyToControl(113, "Quicksave 2");
    manager.BindKeyToControl(114, "Quicksave 3");
    manager.BindKeyToControl(115, "Quicksave 4");
    manager.BindKeyToControl(116, "Quicksave 5");
    manager.BindKeyToControl(117, "Quickload 1");
    manager.BindKeyToControl(118, "Quickload 2");
    manager.BindKeyToControl(119, "Quickload 3");
    manager.BindKeyToControl(120, "Quickload 4");
    manager.BindKeyToControl(121, "Quickload 5");
    manager.BindKeyToControl(8, "Show Menu");
    manager.BindKeyToControl(68, "Data Menu");
    manager.BindKeyToControl(65, "Appearance Page");
    manager.BindKeyToControl(78, "No");
    manager.BindKeyToControl(89, "Yes");
    manager.BindKeyToControl(80, "Show Perks");
    manager.BindKeyToControl(13, "Continue");
    manager.BindKeyToControl(32, "Continue", InputManager.SECONDARYKEY);
    manager.BindKeyToControl(36, "Cycle Background");
    manager.BindKeyToControl(49, "Button 1");
    manager.BindKeyToControl(50, "Button 2");
    manager.BindKeyToControl(51, "Button 3");
    manager.BindKeyToControl(52, "Button 4");
    manager.BindKeyToControl(53, "Button 5");
    manager.BindKeyToControl(54, "Button 6");
    manager.BindKeyToControl(55, "Button 7");
    manager.BindKeyToControl(56, "Button 8");
    manager.BindKeyToControl(57, "Button 9");
    manager.BindKeyToControl(48, "Button 10");
    manager.BindKeyToControl(81, "Button 6", InputManager.SECONDARYKEY);
    manager.BindKeyToControl(87, "Button 7", InputManager.SECONDARYKEY);
    manager.BindKeyToControl(69, "Button 8", InputManager.SECONDARYKEY);
    manager.BindKeyToControl(82, "Button 9", InputManager.SECONDARYKEY);
    manager.BindKeyToControl(84, "Button 10", InputManager.SECONDARYKEY);

    console.log("inputManager", manager, (manager as any)._keysToControlMethods)
};
