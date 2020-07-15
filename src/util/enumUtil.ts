export let toEnumNumber = <TEnum>(
    enumeration: Record<string, number> & Record<number, string>,
    indexOrName: number | string,
    defaultNumber: number = 0,
) => {
    let index: number = typeof indexOrName === "string" ? enumeration[indexOrName] : indexOrName;
    if (enumeration[index] === undefined) {
        index = defaultNumber;
    }
    return (index as any) as TEnum;
};
