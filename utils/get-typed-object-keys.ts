export const getTypedObjectKeys = Object.keys as <TObject extends object>(
    obj: TObject,
) => Array<keyof TObject>
