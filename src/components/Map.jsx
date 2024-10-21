import React, { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const Map = ({ coordinates, id }) => {
  useEffect(() => {
    if (!coordinates.lat || !coordinates.lon) {
      console.error("Invalid coordinates provided:", coordinates)
      return
    }

    // Initialize the map
    const map = L.map(id).setView([coordinates.lat, coordinates.lon], 13)

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map)

    // Add a marker for the provided coordinates
    L.marker([coordinates.lat, coordinates.lon])
      .addTo(map)
      .bindPopup("Location!")
      .openPopup()

    // Clean up on unmount
    return () => {
      map.remove()
    }
  }, [coordinates, id])

  return <div id={id} style={{ height: "300px", width: "100%" }} />
}

export default Map
