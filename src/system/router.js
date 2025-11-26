require("#/configs")

module.exports = async (dir, _root = true) => {
    let scrap = require("#src/system/scrape")(path.join(__dirname, "../scraper"))

    for (let file of fs.readdirSync(dir)) {
        let filePath = path.join(dir, file)

        if (fs.statSync(filePath).isDirectory()) {
            await module.exports(filePath, false)
            continue
        }

        try {
            delete require.cache[require.resolve(filePath)]
            let route = require(filePath)

            if (!route.path || !route.type) {
                console.warn(chalk.red(`[ ROUTE ERROR ] ${file} - missing "path" or "type"`))
                continue
            }

            let { path: routePath, type, disable = false, run } = route
            let endpoint = routePath.startsWith("/") ? routePath : "/" + routePath

            app[type](endpoint, async (req, res) => {
                if (disable) return res.sendFile(mainten)
                try {
                    let config = require("#/configs")
                    run(req, res, { axios, scrap, config })
                } catch (e) {
                    console.error(chalk.red(`${file} - ${e}`))
                    res.status(500).json({ status: 500, message: "try Again Next Time." })
                }
            })

            console.log(
                chalk.blue("[ ROUTE LIST ]"),
                chalk.yellow(endpoint),
                disable ? chalk.red("<disabled>") : chalk.green("<active>")
            )

        } catch (err) {
            console.error(`[ ROUTE ERROR ] — ${filePath}\n${err}`)
        }
    }

    if (_root) {
        console.log(chalk.cyan("SCRAPE LIST"))
        Object.entries(scrap).forEach(([cat, obj]) => {
            console.log(chalk.cyan(`${cat.toUpperCase()}`))
            Object.keys(obj).forEach(fn => console.log(chalk.green(`• ${fn} <active>`)))
        })

        console.log(chalk.yellow("http://localhost:" + port))
    }
}

let f = require.resolve(__filename)
fs.watchFile(f, () => {
    fs.unwatchFile(f)
    console.log(chalk.green(`reload file (${f})`))
    delete require.cache[f]
    require(f)
})
