import http from "http";
import logger from './logs/logger';

export const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
            data: "It Works!",
        })
    );
});

server.listen(3000, () => {
    logger.warn(`Server started on port 3000`);
    console.log("Server running on http://localhost:3000/");
});