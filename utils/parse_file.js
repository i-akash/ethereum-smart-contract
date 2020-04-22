let fs = require('fs')
function parseFileAsJson(filePath) {
    let json = JSON.parse(fs.readFileSync(filePath).toString())
    return json
}

function parseFileAsString(filePath) {
    let content = fs.readFileSync(filePath).toString()
    return content
}
module.exports = { parseFileAsJson, parseFileAsString }