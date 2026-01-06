import EventEmitter from "node:events"
import { createAlerts } from "../utils/createAlert.js"

export const sightingEvents = new EventEmitter()

sightingEvents.on("sighting-added", createAlerts)