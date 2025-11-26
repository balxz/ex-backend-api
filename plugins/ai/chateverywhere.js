module.exports = {
    path: "/chateverywhere", // @property {string} path - Route of the endpoint.
    type: "get", // @property {"get"|"post"|"put"|"delete"} type 
    disable: false, // @property {boolean} disable if scrape error.
    /**
     * @async
     * @function run
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     * @param {{ axios: any, scrap: any }} libs
     */
    run: async (req, res, { axios, scrap }) => {
        let { text } = req.query
        if (!text) {
            return res.status(400).json({ error: "input parrams text" })
        }
        
        /** @property {scrap.folders.function} libs */
        let rspons = await scrap.ai.chateverywhere(text)
        
        res.json({ respons: rspons, })
    }
}