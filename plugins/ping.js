module.exports = {
    path: "/ping", // @property {string} path - Route of the endpoint.
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
        res.json({ message: "pong" })
    }
}