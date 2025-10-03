export const parseJSON = async (value) => {
    return JSON.parse(JSON.stringify(value))
}