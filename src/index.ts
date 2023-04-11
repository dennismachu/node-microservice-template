import http from "http";
import AppLogger from './api/core/eventLogger';
let logger = new AppLogger();
let scope = 'index.ts';
const port = 5200
export const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
            data: "It Works!",
        })
    );
});

server.listen(port, () => {
    logger.logInfo(scope,`Server started on port ${port}`);  
    
}).on("error", (e) =>
logger.logWarn(scope,e.toString())
);;