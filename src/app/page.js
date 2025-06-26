"use client";

import React, { useState, useEffect } from 'react'; // Import useState and useEffect

// Assuming MapComponent is a standard React component and can be imported directly.
// If MapComponent itself contains Next.js specific code, it would need further modification.
import MapComponent from "./components/Map";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const [isClient, setIsClient] = useState(false); // State to track if component is mounted on client

  useEffect(() => {
    // Set isClient to true once the component mounts, indicating it's running in the browser
    setIsClient(true);
  }, []); // Empty dependency array ensures this runs once after initial render

  const darkTheme = {
    backgroundColor: '#1a1a2e', // Dark background for the body
    color: '#e0e0e0',           // Light text color for main content
    sectionBg: '#2a2a4a',       // Slightly lighter dark for main sections
    cardBg: '#3a3a5e',          // Even lighter dark for cards/steps
    borderColor: '#4a4a70',     // Darker border for contrast
    primaryColor: '#8a8af0',    // A vibrant blue/purple for headings/highlights
    secondaryColor: '#f0e08a',  // A contrasting yellowish for accents
    boxShadow: '0 4px 15px rgba(0,0,0,0.4)', // Darker shadow for depth
  };

  // Estimate header height for main content padding-top.
  // This will now primarily be the height of your navigation bar.
  // You might need to fine-tune this value after checking your actual nav height in the browser.
  const headerHeight = '80px'; 

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: darkTheme.backgroundColor, color: darkTheme.color, minHeight: '100vh' }}>
      
      {/* 1. Header Section with Navigation Bar (Fixed Top) */}
      <header style={{ 
          backgroundColor: darkTheme.sectionBg, 
          color: darkTheme.color, 
          padding: '10px 0', 
          textAlign: 'center',
          boxShadow: darkTheme.boxShadow,
          position: 'fixed', 
          top: 0,
          left: 0, 
          width: '100%', 
          zIndex: 1000 
      }}>
        {/* Navigation Bar */}
        <nav style={{ 
            backgroundColor: darkTheme.borderColor, 
            padding: '10px 20px', 
            position: 'relative',
            display: 'flex', // Use flexbox for the nav bar
            justifyContent: 'space-between', // Space between logo/title and links/button
            alignItems: 'center' // Vertically align items
        }}>
          {/* Logo or Site Title (Example) */}
          <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: darkTheme.primaryColor }}>
            GeoView
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-toggle-button" // Class for CSS styling
            style={{
              background: 'none',
              border: `1px solid ${darkTheme.primaryColor}`,
              color: darkTheme.primaryColor,
              fontSize: '1.2em',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>

          {/* Navigation Links */}
          <ul 
            className={`nav-links ${isMenuOpen ? 'open' : ''}`} // Classes for CSS styling and toggle
            style={{ 
              listStyleType: 'none', 
              padding: '0', 
              margin: '0', 
              flexWrap: 'wrap',
              // Removed 'display: flex' from inline style to allow CSS media queries full control
              flexDirection: 'row',
              justifyContent: 'center', // Center links on desktop
            }}
          >
            <li style={{ margin: '0 15px' }}>
              <a href="#welcome" style={{ color: darkTheme.color, textDecoration: 'none', fontWeight: 'bold', fontSize: '1em', transition: 'color 0.3s' }}
                  onMouseOver={e => { e.currentTarget.style.color = darkTheme.secondaryColor; }} 
                  onMouseOut={e => { e.currentTarget.style.color = darkTheme.color; }}
              >Home</a>
            </li>
            <li style={{ margin: '0 15px' }}>
              <a href="#about" style={{ color: darkTheme.color, textDecoration: 'none', fontWeight: 'bold', fontSize: '1em', transition: 'color 0.3s' }}
                  onMouseOver={e => { e.currentTarget.style.color = darkTheme.secondaryColor; }} 
                  onMouseOut={e => { e.currentTarget.style.color = darkTheme.color; }}
              >About the Viewer</a>
            </li>
            <li style={{ margin: '0 15px' }}>
              <a href="#applications" style={{ color: darkTheme.color, textDecoration: 'none', fontWeight: 'bold', fontSize: '1em', transition: 'color 0.3s' }}
                  onMouseOver={e => { e.currentTarget.style.color = darkTheme.secondaryColor; }}
                  onMouseOut={e => { e.currentTarget.style.color = darkTheme.color; }}
              >Applications</a>
            </li>
            <li style={{ margin: '0 15px' }}>
              <a href="#live-map" style={{ color: darkTheme.color, textDecoration: 'none', fontWeight: 'bold', fontSize: '1em', transition: 'color 0.3s' }}
                  onMouseOver={e => { e.currentTarget.style.color = darkTheme.secondaryColor; }}
                  onMouseOut={e => { e.currentTarget.style.color = darkTheme.color; }}
              >Live Map</a>
            </li>
            <li style={{ margin: '0 15px' }}>
              <a href="#how-to-use" style={{ color: darkTheme.color, textDecoration: 'none', fontWeight: 'bold', fontSize: '1em', transition: 'color 0.3s' }}
                  onMouseOver={e => { e.currentTarget.style.color = darkTheme.secondaryColor; }}
                  onMouseOut={e => { e.currentTarget.style.color = darkTheme.color; }}
              >How to Use</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main content area - Padding-top adjusted for fixed header */}
      <main style={{ 
        margin: '20px auto', 
        padding: `20px 20px 0px 20px`, 
        paddingTop: headerHeight 
      }}>
        
        {/* NEW SECTION: Welcome Section - NOW 100% WIDTH */}
        <section id="welcome" style={{
            backgroundColor: darkTheme.sectionBg,
            padding: '40px 20px', // Added horizontal padding for full width
            borderRadius: '8px', 
            boxShadow: darkTheme.boxShadow,
            marginBottom: '30px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px', 
            backgroundImage: 'url(/images/welcome_banner.jpg)', // Reverted to original image path
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#ffffff', 
            textShadow: '0 0 10px rgba(0,0,0,0.8)' 
        }}>
            {/* Overlay for text readability on image */}
            <div style={{ 
                backgroundColor: 'rgba(0,0,0,0.5)', 
                padding: '20px', 
                borderRadius: '8px',
                maxWidth: '900px', 
                width: '100%' 
            }}>
                <h1 style={{ margin: '0', fontSize: '3em', color: darkTheme.primaryColor, textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Interactive Satellite Image Viewer</h1>
                <p style={{ fontSize: '1.5em', marginTop: '10px', marginBottom: '0', fontWeight: 'bold' }}>
                    Your Window to Earth&apos;s Dynamics and Actionable Insights.
                </p>
            </div>
        </section>

        {/* Other Sections - Now have maxWidth applied directly */}
        <section id="about" style={{ 
            backgroundColor: darkTheme.sectionBg, 
            padding: '30px', 
            borderRadius: '8px', 
            boxShadow: darkTheme.boxShadow,
            marginBottom: '30px',
            textAlign: 'center',
            maxWidth: '1200px', 
            margin: '0 auto'    
        }}>
            <h2 style={{ color: darkTheme.primaryColor, marginTop: '0', marginBottom: '15px' }}>About the Interactive Viewer</h2>
            <p style={{ lineHeight: '1.7', fontSize: '1.05em', marginBottom: '30px' }}>
                Fuel your decision-making with our powerful, user-friendly tools to explore 
                high-resolution satellite imagery, both **current and historical**, offering a unique perspective on our world. 
                Dynamically select and visualize different layers to gain valuable insights into geographical patterns, monitor land use, 
                track environmental changes, and understand various phenomena on Earth. 
                Our intuitive interface makes complex satellite data accessible and actionable for everyone.
            </p>
        </section>

        <section id="applications" style={{ 
            backgroundColor: darkTheme.sectionBg, 
            padding: '30px', 
            borderRadius: '8px', 
            boxShadow: darkTheme.boxShadow,
            marginBottom: '30px',
            maxWidth: '1200px', 
            margin: '0 auto'    
        }}>
            <h2 style={{ color: darkTheme.primaryColor, marginTop: '0', marginBottom: '25px', textAlign: 'center' }}>Key Applications and Impact</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px' }}>
                {/* Application Card 1: Agriculture */}
                <div style={{ flex: '1 1 45%', minWidth: '300px', background: darkTheme.cardBg, padding: '20px', borderRadius: '8px', boxShadow: darkTheme.boxShadow, border: `1px solid ${darkTheme.borderColor}` }}>
                    <h3 style={{ color: darkTheme.secondaryColor, marginTop: '0', marginBottom: '10px', fontSize: '1.2em' }}>Agriculture and Land Management</h3>
                    <img 
                        src="/images/agriculture.jpg" // Reverted to original image path
                        alt="Satellite view of agricultural fields" 
                        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '15px' }} 
                    />
                    <p style={{ fontSize: '0.95em', lineHeight: '1.6', color: darkTheme.color }}>
                        Farmers can monitor **crop health**, manage pastures, and track land changes. Our viewer helps visualize
                        field conditions, identify areas needing attention, and assess impacts from natural events like floods or fires,
                        leading to more efficient resource application and better farm management.
                    </p>
                </div>
                {/* Application Card 2: Environmental Monitoring */}
                <div style={{ flex: '1 1 45%', minWidth: '300px', background: darkTheme.cardBg, padding: '20px', borderRadius: '8px', boxShadow: darkTheme.boxShadow, border: `1px solid ${darkTheme.borderColor}` }}>
                    <h3 style={{ color: darkTheme.secondaryColor, marginTop: '0', marginBottom: '10px', fontSize: '1.2em' }}>Environmental and Climate Monitoring</h3>
                    <img 
                        src="/images/environment.jpg" // Reverted to original image path
                        alt="Satellite view of a forest or ecosystem" 
                        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '15px' }} 
                    />
                    <p style={{ fontSize: '0.95em', lineHeight: '1.6', color: darkTheme.color }}>
                        Gain vital insights for tracking **forests, water bodies, and coastlines**. Observe long-term climate trends
                        like desertification or sea-level changes. Our tools help monitor urban expansion, protect natural areas,
                        and support understanding of ecosystem dynamics.
                    </p>
                </div>
                {/* Application Card 3: Urban Planning and Rapid Assessment */}
                <div style={{ flex: '1 1 45%', minWidth: '300px', background: darkTheme.cardBg, padding: '20px', borderRadius: '8px', boxShadow: darkTheme.boxShadow, border: `1px solid ${darkTheme.borderColor}` }}>
                    <h3 style={{ color: darkTheme.secondaryColor, marginTop: '0', marginBottom: '10px', fontSize: '1.2em' }}>Urban Planning and Rapid Assessment</h3>
                    <img 
                        src="/images/urban_disaster.jpg" // Reverted to original image path
                        alt="Satellite view of a city or disaster area" 
                        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '15px' }} 
                    />
                    <p style={{ fontSize: '0.95em', lineHeight: '1.6', color: darkTheme.color }}>
                        City planners and development professionals can assess terrain and infrastructure. In times of disaster like
                        storms or floods, quickly visualize affected areas to aid **response efforts** and guide recovery,
                        simplifying complex assessment tasks.
                    </p>
                </div>
            </div>
        </section>

        <section id="live-map" style={{ 
            backgroundColor: darkTheme.sectionBg, 
            padding: '30px', 
            borderRadius: '8px', 
            boxShadow: darkTheme.boxShadow,
            marginBottom: '30px',
            maxWidth: '1200px', 
            margin: '0 auto'    
        }}>
          <h2 style={{ color: darkTheme.primaryColor, marginTop: '0', marginBottom: '25px', textAlign: 'center' }}>Dynamic Satellite Imagery Viewer</h2>
          {/* Conditionally render MapComponent only when client-side */}
          {isClient && <MapComponent />}
        </section>

        <section id="how-to-use" style={{ 
            backgroundColor: darkTheme.sectionBg, 
            padding: '30px', 
            borderRadius: '8px', 
            boxShadow: darkTheme.boxShadow,
            marginBottom: '30px',
            textAlign: 'center',
            maxWidth: '1200px', 
            margin: '0 auto'    
        }}>
            <div style={{ 
                padding: '15px', 
                borderRadius: '8px', 
                background: darkTheme.cardBg, 
                border: `1px solid ${darkTheme.borderColor}`, 
                boxShadow: darkTheme.boxShadow
            }}>
                <h3 style={{ 
                    marginTop: '0', 
                    marginBottom: '15px', 
                    color: darkTheme.primaryColor, 
                    fontSize: '1.3em', 
                    textAlign: 'center' 
                }}>How to Use the Viewer:</h3>
                <ul style={{ 
                    listStyleType: 'none', 
                    paddingLeft: '0', 
                    margin: '0' 
                }}>
                    <li style={{ 
                        marginBottom: '15px', 
                        padding: '12px 15px', 
                        background: darkTheme.backgroundColor, 
                        borderRadius: '5px', 
                        border: `1px solid ${darkTheme.borderColor}`, 
                        display: 'flex', 
                        alignItems: 'center',
                        fontSize: '1em',
                        color: darkTheme.color,
                        boxShadow: darkTheme.boxShadow
                    }}>
                        <span style={{ 
                            fontWeight: 'bold', 
                            color: darkTheme.secondaryColor, 
                            marginRight: '15px', 
                            minWidth: '25px', 
                            textAlign: 'center',
                            fontSize: '1.2em'
                        }}>1.</span>
                        <span>**Select a Layer:** Use the dropdown menu to choose from available satellite image layers.</span>
                    </li>
                    <li style={{ 
                        marginBottom: '15px', 
                        padding: '12px 15px', 
                        background: darkTheme.backgroundColor, 
                        borderRadius: '5px', 
                        border: `1px solid ${darkTheme.borderColor}`, 
                        display: 'flex', 
                        alignItems: 'center',
                        fontSize: '1em',
                        color: darkTheme.color,
                        boxShadow: darkTheme.boxShadow
                    }}>
                        <span style={{ 
                            fontWeight: 'bold', 
                            color: darkTheme.secondaryColor, 
                            marginRight: '15px', 
                            minWidth: '25px', 
                            textAlign: 'center',
                            fontSize: '1.2em'
                        }}>2.</span>
                        <span>**Adjust Visibility:** Control the transparency of the selected layer using the opacity slider.</span>
                    </li>
                    <li style={{ 
                        marginBottom: '15px', 
                        padding: '12px 15px', 
                        background: darkTheme.backgroundColor, 
                        borderRadius: '5px', 
                        border: `1px solid ${darkTheme.borderColor}`, 
                        display: 'flex', 
                        alignItems: 'center',
                        fontSize: '1em',
                        color: darkTheme.color,
                        boxShadow: darkTheme.boxShadow
                    }}>
                        <span style={{ 
                            fontWeight: 'bold', 
                            color: darkTheme.secondaryColor, 
                            marginRight: '15px', 
                            minWidth: '25px', 
                            textAlign: 'center',
                            fontSize: '1.2em'
                        }}>3.</span>
                        <span>**Explore the Map:** Pan and zoom to navigate the map for detailed observation of areas of interest.</span>
                    </li>
                    <li style={{ 
                        padding: '12px 15px', 
                        background: darkTheme.backgroundColor, 
                        borderRadius: '5px', 
                        border: `1px solid ${darkTheme.borderColor}`, 
                        display: 'flex', 
                        alignItems: 'center',
                        fontSize: '1em',
                        color: darkTheme.color,
                        boxShadow: darkTheme.boxShadow
                    }}>
                        <span style={{ 
                            fontWeight: 'bold', 
                            color: darkTheme.secondaryColor, 
                            marginRight: '15px', 
                            minWidth: '25px', 
                            textAlign: 'center',
                            fontSize: '1.2em'
                        }}>4.</span>
                        <span>**Get Details:** View specific layer information below the map controls, or simply click on the map overlay for an instant popup with details.</span>
                    </li>
                </ul>
            </div>
        </section>

      </main>

      {/* 5. Footer Section */}
      <footer style={{ 
          backgroundColor: darkTheme.sectionBg, 
          color: darkTheme.color, 
          padding: '20px 0', 
          textAlign: 'center',
          fontSize: '0.9em',
          boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: '0' }}>&copy; {new Date().getFullYear()} Interactive Satellite Image Viewer. All rights reserved.</p>
        <p style={{ margin: '5px 0 0' }}>Powered by Next.js, Leaflet.js, and Firebase.</p>
      </footer>

      {/* Global Styles for Responsiveness with styled-jsx */}
      <style jsx>{`
        /* Mobile styles (<= 768px) */
        @media (max-width: 768px) {
          .menu-toggle-button {
            display: block; /* Show menu button on small screens */
            width: auto; 
            margin-left: auto; /* Push to the right */
          }

          .nav-links {
            flex-direction: column;
            width: 100%;
            text-align: center;
            position: absolute; /* Position relative to nav */
            top: 100%; /* Below the nav bar */
            left: 0;
            background-color: ${darkTheme.borderColor}; /* Background for dropdown */
            box-shadow: ${darkTheme.boxShadow};
            /* This line ensures it's hidden by default and only flex when isMenuOpen is true */
            display: ${isMenuOpen ? 'flex' : 'none'}; 
            transition: all 0.3s ease-in-out; /* Smooth transition for opening/closing */
            padding: 10px 0; /* Add padding to the dropdown menu */
          }

          .nav-links li {
            margin: 10px 0; /* Vertical margin for mobile links */
          }

          main {
            padding: 10px; /* Reduced overall padding for small screens */
          }

          /* Adjust header padding for better mobile appearance if needed */
          header nav {
              padding: 10px 15px; /* Smaller horizontal padding for nav on mobile */
          }
        }

        /* Desktop styles (> 768px) */
        @media (min-width: 769px) {
          .menu-toggle-button {
            display: none; /* Hide menu button on large screens */
          }

          .nav-links {
            display: flex !important; /* Ensure always visible on large screens, overrides JS 'none' */
            flex-direction: row;
            position: static; /* Reset position for desktop */
            background-color: transparent; /* No background for dropdown */
            box-shadow: none;
            /* Remove padding set for mobile dropdown */
            padding: 0; 
          }
          .nav-links li {
            margin: 0 15px; /* Restore desktop margins */
          }

          /* Ensure desktop nav centers links when menu button is hidden */
          header nav {
            justify-content: space-between; /* Space out title and links */
          }
        }
      `}</style>
    </div>
  );
}
