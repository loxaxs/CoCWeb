/**
 * copy
 * Copy the listed properties from the .from() source to the .to destination
 * @param keyList the list of properties to copy
 * @param source the source object
 * @param destination the destination object
 */
export let copy = <TKey extends string>(...keyList: TKey[]) => {
    let from = <TSource extends Record<TKey, unknown>>(source: TSource) => {
        let to = <TDestOut extends TSource & TDestIn, TDestIn>(destination: TDestIn) => {
            let destinationResult: any = destination;

            keyList.forEach((key) => {
                destinationResult[key] = source[key];
            });

            return destinationResult as TDestOut;
        };

        return { to };
    };

    return {
        from,
        // prettier-ignore
        into: <TDestIn>(destination: TDestIn) =>
                <TSource extends Record<TKey, unknown>, TDestOut extends TSource & TDestIn>(source: TSource) =>
                    copy<TKey>(...keyList)
                        .from<TSource>(source)
                        .to<TDestOut, TDestIn>(destination)
    };
};
