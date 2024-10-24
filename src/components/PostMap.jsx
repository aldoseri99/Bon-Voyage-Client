import React, { useEffect } from "react"
import L from "leaflet" // Make sure to import L from leaflet
import "leaflet/dist/leaflet.css"

const PostMap = ({ posts, onPostClick }) => {
  useEffect(() => {
    if (!posts.length) {
      console.error("No posts provided")
      return
    }

    // Initialize the map
    const map = L.map("map").setView([0, 0], 2) // Center the map

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map)

    // Add markers for each post
    const markers = posts
      .map((post) => {
        if (
          !post.coordinates ||
          !post.coordinates.lat ||
          !post.coordinates.lon
        ) {
          console.error("Invalid coordinates for post:", post)
          return null // Skip posts without valid coordinates
        }

        const marker = L.marker([post.coordinates.lat, post.coordinates.lon])
          .addTo(map)
          .bindPopup(
            `<a href="#" id="post-link-${post._id}">${post.title} - Rating: ${post.rate}</a>`
          )

        // Add click event to the popup link
        marker.on("popupopen", () => {
          const link = document.getElementById(`post-link-${post._id}`)
          link.onclick = (e) => {
            e.preventDefault()
            onPostClick(post) // Navigate to the details page
          }
        })

        return marker
      })
      .filter(Boolean) // Filter out any null markers

    // Fit the map to the bounds of the markers
    if (markers.length) {
      const group = new L.featureGroup(markers)
      map.fitBounds(group.getBounds())
    } else {
      console.warn("No valid markers to display on the map.")
    }

    // Clean up on unmount
    return () => {
      map.remove()
    }
  }, [posts, onPostClick])

  window.handlePostClick = onPostClick

  return <div id="map" style={{ height: "600px", width: "100%" }} />
}

export default PostMap
