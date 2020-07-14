import { CoC } from "../CoC";

export let kGAMECLASS: CoC = {} as any;

export function setkGAMECLASS(coc: CoC) {
    kGAMECLASS = coc;
    (window as any).coc = coc
}
