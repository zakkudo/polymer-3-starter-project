export default function ensureArray(data = []) {
    if (data === null) {
        return data;
    }

    if (Array.isArray(data)) {
        return data;
    }

    return [data];
}
