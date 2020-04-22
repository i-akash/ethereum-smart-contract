let path = require('path')

function resolveLocation(filepaths = []) {
    return path.join(...filepaths)
}

module.exports = { resolveLocation }
