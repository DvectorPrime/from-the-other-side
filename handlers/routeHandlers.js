import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { addNewSighting } from "../utils/addNewSighting.js";
import { sightingEvents } from "../events/sightingEvents.js";
import { stories } from "../data/stories.js";

export async function handleGet(res){
    const data = await getData()

    const dataString = JSON.stringify(data)

    sendResponse(res, 200, "application/json", dataString)
}

export async function handlePost(req, res) {
    try {
        const parsedData = await parseJSONBody(req)
        await addNewSighting(parsedData)

        sightingEvents.emit("sighting-added", parsedData)
        
        sendResponse(res, 201, "application/json", JSON.stringify(parsedData))
    } catch (err) {
        sendResponse(res, 400, "application/json", JSON.stringify(err))
    }
}

export async function handleNews(req, res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    const intervalId = setInterval(() => {
        let randomIndex = Math.floor(Math.random() * stories.length)

        const eventData = {
            event: "Ghost Story New Feed",
            story: stories[randomIndex]
        };

        res.write(`data: ${JSON.stringify(eventData)}\n\n`);
        console.log("send")
    }, 3000)

    req.on('close', () => {
        clearInterval(intervalId)
        try { res.end() } catch (e) {}
    })

}