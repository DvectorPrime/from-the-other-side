import { getData } from "./getData.js";
import path from "node:path";
import fs from "node:fs/promises"
import { sanitizeInput } from "./sanitizeInput.js";

export async function addNewSighting(parsedData) {
    try {
        const data = await getData()
        
        let sanitizedData = sanitizeInput(parsedData)

        data.push(sanitizedData)

        const dataFilePath = path.join('data', 'data.json')

        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 4), {encoding: 'utf8'})
    } catch (error) {
        console.log(`Error ${error}`)
        throw new Error("Error Writing Data")
    }
}