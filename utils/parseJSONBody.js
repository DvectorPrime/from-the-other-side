export async function parseJSONBody(req){
    let body = ""

    for await (const chunk of req) {
        body += chunk
    }

    try {
        const rawData = JSON.parse(body)
        return rawData
    } catch(err) {
        console.log(`Invalid JSON format: ${err}`)
    }
}