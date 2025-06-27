'use client'; // This component and its children are Client Components

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic for client-side only components
import styles from './page.module.css'; // Import CSS Module for styling

// Dynamically import MapComponent with ssr: false to ensure it only renders on the client.
// This is the most robust way to handle external map libraries that rely on 'window'.
const MapComponent = dynamic(() => import("./components/Map"), { ssr: false });

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define your theme colors using a consistent object for easy modification
  const darkTheme = {
    backgroundColor: '#1a1a2e',
    color: '#e0e0e0',
    sectionBg: '#2a2a4a',
    cardBg: '#3a3a5e',
    borderColor: '#4a4a70',
    primaryColor: '#8a8af0',
    secondaryColor: '#f0e08a',
    boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
  };

  // You can derive headerHeight if it's dynamic, or keep it a fixed CSS variable
  // For simplicity and direct control via CSS, it's often better managed in the CSS module.
  const headerHeight = '80px'; // Still a useful value for padding-top on main content

  return (
    <div className={styles.container} style={{ backgroundColor: darkTheme.backgroundColor, color: darkTheme.color }}>

      {/* Header Section with Navigation Bar (Fixed Top) */}
      <header className={styles.header} style={{ backgroundColor: darkTheme.sectionBg, boxShadow: darkTheme.boxShadow }}>
        <nav className={styles.navbar} style={{ backgroundColor: darkTheme.borderColor }}>
          {/* Logo or Site Title */}
          <div className={styles.logo} style={{ color: darkTheme.primaryColor }}>
            GeoView
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.menuToggleButton}
            style={{
              borderColor: darkTheme.primaryColor,
              color: darkTheme.primaryColor,
            }}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>

          {/* Navigation Links */}
          <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
            <li><a href="#welcome" style={{ color: darkTheme.color }} onMouseOver={e => { e.currentTarget.style.color = darkTheme.secondaryColor; }} onMouseOut={e => { e.currentTarget.style.color = darkTheme.color; }}>Home</a></li>
            <li><a href="#about" style={{ color: darkTheme.color }} onMouseOver={e => { e.currentTarget.style.color = darkTheme.secondaryColor; }} onMouseOut={e => { e.currentTarget.style.color = darkTheme.color; }}>About the Viewer</a></li>
            <li><a href="#applications" style={{ color: darkTheme.color }} onMouseOver={e => { e.currentTarget.style.color = darkTheme.secondaryColor; }} onMouseOut={e => { e.currentTarget.style.color = darkTheme.color; }}>Applications</a></li>
            <li><a href="#live-map" style={{ color: darkTheme.color }} onMouseOver={e => { e.currentTarget.style.color = darkTheme.secondaryColor; }} onMouseOut={e => { e.currentTarget.style.color = darkTheme.color; }}>Live Map</a></li>
            <li><a href="#how-to-use" style={{ color: darkTheme.color }} onMouseOver={e => { e.currentTarget.style.color = darkTheme.secondaryColor; }} onMouseOut={e => { e.currentTarget.style.color = darkTheme.color; }}>How to Use</a></li>
          </ul>
        </nav>
      </header>

      {/* Main content area - Padding-top adjusted for fixed header */}
      <main className={styles.mainContent} style={{ paddingTop: headerHeight }}>

        {/* Welcome Section */}
        <section id="welcome" className={styles.welcomeSection} style={{ backgroundColor: darkTheme.sectionBg, boxShadow: darkTheme.boxShadow, color: '#ffffff', backgroundImage: 'url(/images/welcome_banner.jpg)' }}>
          <div className={styles.welcomeOverlay} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <h1 style={{ color: darkTheme.primaryColor }}>Interactive Satellite Image Viewer</h1>
            <p>Your Window to Earth&apos;s Dynamics and Actionable Insights.</p>
          </div>
        </section>

        {/* Other Sections - Applying classes for consistent styling */}
        <section id="about" className={styles.section} style={{ backgroundColor: darkTheme.sectionBg, boxShadow: darkTheme.boxShadow }}>
          <h2 style={{ color: darkTheme.primaryColor }}>About the Interactive Viewer</h2>
          <p>
            Fuel your decision-making with our powerful, user-friendly tools to explore
            high-resolution satellite imagery, both **current and historical**, offering a unique perspective on our world.
            Dynamically select and visualize different layers to gain valuable insights into geographical patterns, monitor land use,
            track environmental changes, and understand various phenomena on Earth.
            Our intuitive interface makes complex satellite data accessible and actionable for everyone.
          </p>
        </section>

        <section id="applications" className={styles.section} style={{ backgroundColor: darkTheme.sectionBg, boxShadow: darkTheme.boxShadow }}>
          <h2 style={{ color: darkTheme.primaryColor }}>Key Applications and Impact</h2>
          <div className={styles.applicationCards}>
            {/* Application Card 1: Agriculture */}
            <div className={styles.card} style={{ backgroundColor: darkTheme.cardBg, boxShadow: darkTheme.boxShadow, borderColor: darkTheme.borderColor }}>
              <h3 style={{ color: darkTheme.secondaryColor }}>Agriculture and Land Management</h3>
              <img src="/images/agriculture.jpg" alt="Satellite view of agricultural fields" className={styles.cardImage} />
              <p>
                Farmers can monitor **crop health**, manage pastures, and track land changes. Our viewer helps visualize
                field conditions, identify areas needing attention, and assess impacts from natural events like floods or fires,
                leading to more efficient resource application and better farm management.
              </p>
            </div>
            {/* Application Card 2: Environmental Monitoring */}
            <div className={styles.card} style={{ backgroundColor: darkTheme.cardBg, boxShadow: darkTheme.boxShadow, borderColor: darkTheme.borderColor }}>
              <h3 style={{ color: darkTheme.secondaryColor }}>Environmental and Climate Monitoring</h3>
              <img src="/images/environment.jpg" alt="Satellite view of a forest or ecosystem" className={styles.cardImage} />
              <p>
                Gain vital insights for tracking **forests, water bodies, and coastlines**. Observe long-term climate trends
                like desertification or sea-level changes. Our tools help monitor urban expansion, protect natural areas,
                and support understanding of ecosystem dynamics.
              </p>
            </div>
            {/* Application Card 3: Urban Planning and Rapid Assessment */}
            <div className={styles.card} style={{ backgroundColor: darkTheme.cardBg, boxShadow: darkTheme.boxShadow, borderColor: darkTheme.borderColor }}>
              <h3 style={{ color: darkTheme.secondaryColor }}>Urban Planning and Rapid Assessment</h3>
              <img src="/images/urban_disaster.jpg" alt="Satellite view of a city or disaster area" className={styles.cardImage} />
              <p>
                City planners and development professionals can assess terrain and infrastructure. In times of disaster like
                storms or floods, quickly visualize affected areas to aid **response efforts** and guide recovery,
                simplifying complex assessment tasks.
              </p>
            </div>
          </div>
        </section>

        <section id="live-map" className={styles.section} style={{ backgroundColor: darkTheme.sectionBg, boxShadow: darkTheme.boxShadow }}>
          <h2 style={{ color: darkTheme.primaryColor }}>Dynamic Satellite Imagery Viewer</h2>
          {/* MapComponent is now dynamically imported with ssr: false, so `isClient` check is no longer strictly needed here,
              but it serves as an extra layer of safety if MapComponent itself had complex internal lifecycle issues.
              However, dynamic import with ssr:false is usually sufficient. */}
          <MapComponent />
        </section>

        <section id="how-to-use" className={styles.section} style={{ backgroundColor: darkTheme.sectionBg, boxShadow: darkTheme.boxShadow }}>
          <div className={styles.howToUseBox} style={{ backgroundColor: darkTheme.cardBg, boxShadow: darkTheme.boxShadow, borderColor: darkTheme.borderColor }}>
            <h3 style={{ color: darkTheme.primaryColor }}>How to Use the Viewer:</h3>
            <ul className={styles.howToUseList}>
              <li style={{ backgroundColor: darkTheme.backgroundColor, boxShadow: darkTheme.boxShadow, borderColor: darkTheme.borderColor }}>
                <span style={{ color: darkTheme.secondaryColor }}>1.</span>
                <span>**Select a Layer:** Use the dropdown menu to choose from available satellite image layers.</span>
              </li>
              <li style={{ backgroundColor: darkTheme.backgroundColor, boxShadow: darkTheme.boxShadow, borderColor: darkTheme.borderColor }}>
                <span style={{ color: darkTheme.secondaryColor }}>2.</span>
                <span>**Adjust Visibility:** Control the transparency of the selected layer using the opacity slider.</span>
              </li>
              <li style={{ backgroundColor: darkTheme.backgroundColor, boxShadow: darkTheme.boxShadow, borderColor: darkTheme.borderColor }}>
                <span style={{ color: darkTheme.secondaryColor }}>3.</span>
                <span>**Explore the Map:** Pan and zoom to navigate the map for detailed observation of areas of interest.</span>
              </li>
              <li style={{ backgroundColor: darkTheme.backgroundColor, boxShadow: darkTheme.boxShadow, borderColor: darkTheme.borderColor }}>
                <span style={{ color: darkTheme.secondaryColor }}>4.</span>
                <span>**Get Details:** View specific layer information below the map controls, or simply click on the map overlay for an instant popup with details.</span>
              </li>
            </ul>
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className={styles.footer} style={{ backgroundColor: darkTheme.sectionBg }}>
        <p>&copy; {new Date().getFullYear()} Interactive Satellite Image Viewer. All rights reserved.</p>
        <p>Built by Bayo Herbert.</p>
      </footer>
    </div>
  );
}