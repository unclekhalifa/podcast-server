const sanitize = require("sanitize-filename");
const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const app = express();

const PORT = 8000;
const HTTPS_PORT = 8443;
const PATHTOTRACKS = `${__dirname}/tracks`;

const credentials = {
    key: fs.readFileSync(`${__dirname}/certs/cert.key`, "utf-8"),
    cert: fs.readFileSync(`${__dirname}/certs/cert.crt`, "utf-8")
};

app.get("/", (req, res) => {
    try {
        const query = req.query.tid;
        if (!query) return res.status(500).json({ error: "Invalid params" });

        const sanitizedId = sanitize(query);
        if (!fs.existsSync(`${PATHTOTRACKS}/${sanitizedId}`)) return res.status(400).json({ error: `${query} not found` });

        return res.sendFile(`${PATHTOTRACKS}/${sanitizedId}`);
    } catch {
        return res.status(500).json({ error: "Invalid request" });
    }
});

app.get("/rss", (req, res) => res.sendFile(`${__dirname}/public/feed.xml`));

app.get("*", (req, res) => res.status(400).json({error: "Path not found"}));

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

httpsServer.listen(HTTPS_PORT, () => {
    console.log(`Server is listening on port ${HTTPS_PORT}`);
})
