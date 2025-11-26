
/** module **/
global.fs = require("node:fs")
global.path = require("node:path")
global.chalk = require("chalk") 
global.open = require("open")
global.axios = require("axios")
global.express = require("express")
global.app = express()

/** app **/
global.port = 9999

let f = require.resolve(__filename)
fs.watchFile(f, () => {
    fs.unwatchFile(f)
    console.log(chalk.green(`reload file (${f})`))
    delete require.cache[f]
    require(f)
})