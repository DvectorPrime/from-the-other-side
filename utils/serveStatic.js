import { readFile } from "node:fs/promises"
import path from "node:path"
import { sendResponse } from "./sendResponse.js"
import { getContentType } from "./getContentType.js"

export async function serveStatic(req, res, baseDir) {
    const pathToPublicFolder = path.join(baseDir, "public")
    
    const filePath = path.join(pathToPublicFolder, 
        req.url == "/" ?
        "index.html" : 
        req.url
    )

    const ext = path.extname(filePath)
    const contentType = getContentType(ext)

    try {
        const content = await readFile(filePath)

        sendResponse(res, 200, contentType, content)
    } catch(error) {
        if (error.code === "ENOENT"){
            const pathTo404 = path.join(pathToPublicFolder, "404.html")
            const content = await readFile(pathTo404)
            sendResponse(res, 404, "text/html", content)
        } else {
            sendResponse(res, 500, "text/html", `<html><h1>Server Error: ${err.code}</h1></html>`)
        }
    }
}