export default function getTypeName(data) {
    if (Object(data) === data) {
        return Object.prototype.toString.call(data).slice(8, -1);
    }

    return typeof data;
}
