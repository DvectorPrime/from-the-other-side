import path from 'node:path'
import fs from 'node:fs/promises'

export async function getData() {
    try {
        const pathToData = path.join('data', 'data.json')
    
        const contentString = await fs.readFile(pathToData, 'utf8')
    
        const parsedData = JSON.parse(contentString)

        return parsedData
    } catch(error) {
        console.log(`Error : ${error}`)
        return []
    }
}