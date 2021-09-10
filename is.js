function getType(e) {
    return Object.prototype.toString.call(e).slice(8,-1);
}

function isStr(e) {
    return getType(e) === 'String';
}

export {
    getType,
    isStr,
};