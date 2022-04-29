import {createProxyMiddleware} from "http-proxy-middleware"
module.exports = function(app:any){
    app.use(
        createProxyMiddleware("/api",{
            target:"http://localhost:9000",
            changeOrigin:true,
        })
    )
}