const getFiles = require("./getFiles");
module.exports = (client) => {
    const features = getFiles(__dirname + "/../features", ".js");
    for (const feature of features) {
        const run = require(feature);
        run(client);
    }
}