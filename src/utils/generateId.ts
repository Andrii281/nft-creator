export const generateId = () => {
    const randomChunk = () => {
        return (Math.random()  * Date.now()).toString(36);
    }

    return `${randomChunk()}-${randomChunk()}-${randomChunk()}-${randomChunk()}`;
}