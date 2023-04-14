import http from "http";
import AppLogger from './core/eventLogger';
import app from "./app";
import { connectDatabase } from "./config/database";
let logger = new AppLogger();
let scope = 'index.ts';
const port = 3000
const server = http.createServer({}, app);

server.listen(port, () => {
    connectDatabase();
    logger.logInfo(scope,`Server started on port ${port}`);  
    
}).on("error", (e) =>
logger.logWarn(scope,e.toString())
);;