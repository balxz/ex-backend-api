console.clear()  
require("./configs")  
require("module-alias/register")  
require("#src/print")(app)  
require("#src/system/router")(path.join(__dirname, "plugins"))  
  
app.listen(port, "0.0.0.0", () => {
    open("http://localhost:" + port)  
})  