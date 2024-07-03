export const ArrayToObject = (inputArray: Record<string,any>[]) =>{
    return inputArray.reduce((acc, item) => {
        acc[item.path] = item.message;
        return acc;
    }, {});

}