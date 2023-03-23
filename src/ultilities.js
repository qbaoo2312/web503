function getRandomFileName() {
    var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    var random = ("" + Math.random()).substring(2, 8);
    var random_number = timestamp + random;
    return random_number.toLowerCase();
}

export {
    getRandomFileName
}