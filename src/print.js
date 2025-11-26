
module.exports = (app) => {
    app.use((req, res, next) => {
    let awal = Date.now()
    res.on("finish", () => {
        let durasi = Date.now() - awal
        let time = new Date().toLocaleTimeString("id-ID", { hour12: false })
        let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress
        console.log(`[${chalk.yellow(time)}] ${chalk.red(req.method)} ${chalk.white(req.originalUrl)} ${chalk.blue(durasi + "ms")} ${chalk.green(ip)}`)
    })
    next()
  })
}

let f = require.resolve(__filename)
fs.watchFile(f, () => {
    fs.unwatchFile(f)
    console.log(chalk.green(`reload file (${f})`))
    delete require.cache[f]
    require(f)
})