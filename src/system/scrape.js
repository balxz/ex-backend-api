const fs = require("node:fs")
const path = require("node:path")

module.exports = (dir) => {
  let scrapers = {}
  for (let folder of fs.readdirSync(dir)) {
    let folderPath = path.join(dir, folder)
    if (!fs.statSync(folderPath).isDirectory()) continue

    scrapers[folder] = {}

    for (const file of fs.readdirSync(folderPath)) {
      if (file.endsWith(".js")) {
        let filePath = path.join(folderPath, file)
        let mod = require(filePath)
        Object.assign(scrapers[folder], mod)
      }
    }
  }

  return scrapers
}

let f = require.resolve(__filename)
fs.watchFile(f, () => {
  fs.unwatchFile(f)
  console.log(`reload file (${f})`)
  delete require.cache[f]
  require(f)
})