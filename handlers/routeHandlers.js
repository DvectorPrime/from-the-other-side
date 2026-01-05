import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { addNewSighting } from "../utils/addNewSighting.js";

export async function handleGet(res){
    const data = await getData()

    const dataString = JSON.stringify(data)

    sendResponse(res, 200, "application/json", dataString)
}

export async function handlePost(req, res) {
    try {
        const parsedData = await parseJSONBody(req)
        addNewSighting(parsedData)
        
        sendResponse(res, 201, "application/json", JSON.stringify(parsedData))
    } catch (err) {
        sendResponse(res, 400, "application/json", JSON.stringify(err))
    }
}