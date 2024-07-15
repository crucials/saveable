export default function asyncForEach<TElement>(
    array: TElement[],
    doForEach: (value: TElement, index: number) => Promise<void>,
) {
    return new Promise<void>((resolve) => {
        array.forEach(async (element, index) => {
            await doForEach(element, index)

            if (index === array.length - 1) {
                resolve()
            }
        })
    })
}
