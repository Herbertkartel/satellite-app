// src/app/components/Map.js
"use client"; // Required for client-side components in Next.js 13+ App Router

import React, { useRef, useEffect, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure to import Leaflet's CSS

// Your firebase config file is located at: src/app/lib/firebase.js
import { db } from '../lib/firebase'; 
import { collection, getDocs } from 'firebase/firestore';

// FIX: Removed direct image imports and reverted to CDN URLs for Leaflet's default icons.
// These lines are removed:
// import markerIcon2x from 'leaflet/dist/images/marker-icon2x.png'; 
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';


// Override Leaflet's default icon paths using CDN URLs
delete L.Icon.Default.prototype._getIconUrl; // This line is crucial for some environments

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const SatelliteMapViewer = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const currentOverlayRef = useRef(null);

  const [opacity, setOpacity] = useState(0.7);  
  const [availableImages, setAvailableImages] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [loadingImages, setLoadingImages] = useState(true);

  const fetchImages = useCallback(async () => {
    setLoadingImages(true);
    try {
      const querySnapshot = await getDocs(collection(db, "satelliteImages"));
      const imagesData = [];
      querySnapshot.forEach((doc) => {
        imagesData.push({ id: doc.id, ...doc.data() });
      });
      setAvailableImages(imagesData);
      
      if (imagesData.length > 0) {
        setSelectedImageId(imagesData[0].id);
      }
    } catch (error) {
      console.error("Error fetching satellite images from Firebase:", error);
    } finally {
      setLoadingImages(false);
    }
  }, []);

  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current).setView([0.5, 32.0], 7);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance.current);
    }

    fetchImages();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [fetchImages]);

  useEffect(() => {
    if (mapInstance.current && selectedImageId) {
      const imageToDisplay = availableImages.find(img => img.id === selectedImageId);

      if (imageToDisplay) {
        if (currentOverlayRef.current) {
          mapInstance.current.removeLayer(currentOverlayRef.current);
        }

        const imageBounds = [
          [imageToDisplay.bounds.south, imageToDisplay.bounds.west],
          [imageToDisplay.bounds.north, imageToDisplay.bounds.east],
        ];

        currentOverlayRef.current = L.imageOverlay(imageToDisplay.url, imageBounds, { opacity });
        
        currentOverlayRef.current.on('click', (e) => {
          if (mapInstance.current && imageToDisplay) {
            L.popup()
              .setLatLng(e.latlng)  
              .setContent(`
                <div style="font-family: Arial, sans-serif; font-size: 14px; max-width: 250px;">
                  <h4 style="margin: 0 0 5px; color: #333;">${imageToDisplay.name}</h4>
                  <p style="margin: 0; line-height: 1.4;"><strong>Acquired:</strong> ${imageToDisplay.dateAcquired}</p>
                  <p style="margin: 0; line-height: 1.4;"><strong>Category:</strong> ${imageToDisplay.category}</p>
                  <p style="margin: 0; line-height: 1.4;"><strong>Region:</strong> ${imageToDisplay.region}</p>
                  ${imageToDisplay.url ? `<p style="margin: 0; line-height: 1.4;"><a href="${imageToDisplay.url}" target="_blank" rel="noopener noreferrer">View Original Image</a></p>` : ''}
                </div>
              `)
              .openOn(mapInstance.current);
          }
        });

        currentOverlayRef.current.addTo(mapInstance.current);
        mapInstance.current.fitBounds(imageBounds);
      }
    } else if (mapInstance.current && !selectedImageId && currentOverlayRef.current) {
      mapInstance.current.removeLayer(currentOverlayRef.current);
      currentOverlayRef.current = null;
    }
  }, [selectedImageId, availableImages, opacity]);

  useEffect(() => {
    if (currentOverlayRef.current) {
      currentOverlayRef.current.setOpacity(opacity);
    }
  }, [opacity]);

  const currentImageDetails = availableImages.find(img => img.id === selectedImageId);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Dynamic Satellite Imagery Viewer</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="image-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>Select Satellite Image:</label>
          {loadingImages ? (
            <span style={{ color: '#555' }}>Loading images...</span>
          ) : (
            <select
              id="image-select"
              value={selectedImageId || ''}
              onChange={(e) => setSelectedImageId(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px', cursor: availableImages.length === 0 ? 'not-allowed' : 'pointer' }}
              disabled={availableImages.length === 0}
            >
              <option value="">-- No Image Selected --</option>
              {availableImages.map((image) => (
                <option key={image.id} value={image.id}>
                  {image.name} ({image.dateAcquired})
                </option>
              ))}
            </select>
          )}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="opacity" style={{ marginRight: '10px', fontWeight: 'bold' }}>Overlay Opacity:</label>
          <input
            id="opacity"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            style={{ width: '150px', cursor: !selectedImageId ? 'not-allowed' : 'pointer' }}
            disabled={!selectedImageId}  
          />
          <span style={{ marginLeft: '10px', color: '#555' }}>{(opacity * 100).toFixed(0)}%</span>
        </div>
      </div>

      <div ref={mapRef} style={{ height: '700px', width: '100%', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />

      {currentImageDetails && (  
        <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', border: '1px solid #eee', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Currently Selected Image Details:</h3>
          <p><strong>Name:</strong> {currentImageDetails.name}</p>
          <p><strong>Acquired:</strong> {currentImageDetails.dateAcquired}</p>
          <p><strong>Category:</strong> {currentImageDetails.category}</p>
          <p><strong>Region:</strong> {currentImageDetails.region}</p>
        </div>
      )}
    </div>
  );
};

export default SatelliteMapViewer;