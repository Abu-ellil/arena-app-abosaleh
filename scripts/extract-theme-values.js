#!/usr/bin/env node

/**
 * Arena Theme Value Extraction Helper
 *
 * This script provides utilities and guidance for extracting exact design values
 * from reference images to update the arena-theme.css file.
 *
 * Usage: node scripts/extract-theme-values.js
 */

const fs = require("fs");
const path = require("path");

// Color extraction guidance
const colorExtractionGuide = {
  "Primary Brand Colors": [
    "arena-primary - Main brand color (buttons, links, primary CTAs)",
    "arena-primary-hover - Hover state for primary elements",
    "arena-primary-active - Active/pressed state for primary elements",
    "arena-accent - Accent color for highlights and secondary CTAs",
  ],
  "Background Colors": [
    "arena-bg-primary - Main page background",
    "arena-bg-secondary - Secondary sections background",
    "arena-bg-card - Card/component backgrounds",
    "arena-bg-modal - Modal and overlay backgrounds",
    "arena-bg-input - Form input backgrounds",
  ],
  "Text Colors": [
    "arena-text-primary - Main text color",
    "arena-text-secondary - Secondary text color",
    "arena-text-muted - Muted/disabled text color",
    "arena-text-accent - Accent text color",
  ],
  "Border Colors": [
    "arena-border-primary - Default border color",
    "arena-border-secondary - Secondary border color",
    "arena-border-focus - Focus state border color",
  ],
};

// Measurement extraction guidance
const measurementGuide = {
  Typography: [
    "Font sizes for headings (h1-h6)",
    "Body text font size",
    "Small text font size",
    "Line heights for different text sizes",
    "Font families used",
  ],
  Spacing: [
    "Padding inside components",
    "Margins between components",
    "Grid gaps",
    "Section spacing",
  ],
  "Component Dimensions": [
    "Button heights and widths",
    "Input field heights",
    "Card dimensions",
    "Header height",
    "Footer height",
  ],
  "Border Radius": [
    "Button border radius",
    "Card border radius",
    "Input border radius",
    "Modal border radius",
  ],
  Shadows: [
    "Card shadows (blur, spread, offset)",
    "Button shadows",
    "Modal shadows",
    "Focus shadows",
  ],
};

// Reference images to analyze
const referenceImages = [
  "screencapture-thearenakuwait-home-2025-08-14-07_09_23.png",
  "screencapture-thearenakuwait-events-30secondchallenge-972109653-2025-08-14-07_22_26.png",
  "screencapture-thearenakuwait-booking-133552-2025-08-14-07_23_07.png",
  "screencapture-thearenakuwait-checkout-4bapfafktgmytm287sqa-2025-08-14-07_25_20.png",
];

function displayExtractionGuide() {
  console.log("\n🎨 Arena Theme Value Extraction Guide\n");
  console.log("=====================================\n");

  console.log("📁 Reference Images to Analyze:");
  referenceImages.forEach((image, index) => {
    console.log(`   ${index + 1}. ${image}`);
  });

  console.log("\n🎯 Color Values to Extract:\n");
  Object.entries(colorExtractionGuide).forEach(([category, colors]) => {
    console.log(`${category}:`);
    colors.forEach((color) => console.log(`   • ${color}`));
    console.log("");
  });

  console.log("📏 Measurements to Extract:\n");
  Object.entries(measurementGuide).forEach(([category, measurements]) => {
    console.log(`${category}:`);
    measurements.forEach((measurement) => console.log(`   • ${measurement}`));
    console.log("");
  });

  console.log("🛠️  Recommended Tools:\n");
  console.log("Color Extraction:");
  console.log("   • Digital Color Meter (macOS built-in)");
  console.log("   • ColorZilla browser extension");
  console.log("   • Adobe Color online tool");
  console.log("   • Photoshop/GIMP eyedropper tool\n");

  console.log("Measurement Tools:");
  console.log("   • PixelSnap (macOS)");
  console.log("   • Browser Developer Tools");
  console.log("   • Figma/Sketch rulers");
  console.log("   • Online pixel ruler tools\n");

  console.log("📝 Extraction Process:\n");
  console.log("1. Open reference image in your preferred tool");
  console.log("2. Use color picker to sample colors from UI elements");
  console.log("3. Use measurement tool to measure dimensions and spacing");
  console.log("4. Record exact hex values and pixel measurements");
  console.log("5. Update arena-theme.css with extracted values");
  console.log("6. Test implementation against reference images\n");
}

function generateColorExtractionTemplate() {
  console.log("🎨 Color Extraction Template\n");
  console.log("Copy this template and fill in the extracted hex values:\n");

  const template = `
/* Extracted Color Values - Replace [EXTRACT] with actual hex values */

/* Primary Brand Colors */
--arena-primary: #[EXTRACT]; /* Main brand color */
--arena-primary-hover: #[EXTRACT]; /* Primary hover state */
--arena-primary-active: #[EXTRACT]; /* Primary active state */
--arena-accent: #[EXTRACT]; /* Accent color */

/* Background Colors */
--arena-bg-primary: #[EXTRACT]; /* Main background */
--arena-bg-secondary: #[EXTRACT]; /* Secondary background */
--arena-bg-card: #[EXTRACT]; /* Card background */
--arena-bg-modal: #[EXTRACT]; /* Modal background */
--arena-bg-input: #[EXTRACT]; /* Input background */

/* Text Colors */
--arena-text-primary: #[EXTRACT]; /* Primary text */
--arena-text-secondary: #[EXTRACT]; /* Secondary text */
--arena-text-muted: #[EXTRACT]; /* Muted text */
--arena-text-accent: #[EXTRACT]; /* Accent text */

/* Border Colors */
--arena-border-primary: #[EXTRACT]; /* Primary border */
--arena-border-secondary: #[EXTRACT]; /* Secondary border */
--arena-border-focus: #[EXTRACT]; /* Focus border */
`;

  console.log(template);
}

function generateMeasurementTemplate() {
  console.log("📏 Measurement Extraction Template\n");
  console.log("Copy this template and fill in the measured pixel values:\n");

  const template = `
/* Extracted Measurements - Replace [MEASURE] with actual pixel values */

/* Typography */
--arena-text-xs: [MEASURE]px; /* Small text size */
--arena-text-sm: [MEASURE]px; /* Small text size */
--arena-text-base: [MEASURE]px; /* Base text size */
--arena-text-lg: [MEASURE]px; /* Large text size */
--arena-text-xl: [MEASURE]px; /* Extra large text size */
--arena-text-2xl: [MEASURE]px; /* 2X large text size */
--arena-text-3xl: [MEASURE]px; /* 3X large text size */

/* Line Heights */
--arena-leading-tight: [MEASURE]; /* Tight line height */
--arena-leading-normal: [MEASURE]; /* Normal line height */
--arena-leading-relaxed: [MEASURE]; /* Relaxed line height */

/* Spacing */
--arena-space-1: [MEASURE]px; /* Smallest spacing */
--arena-space-2: [MEASURE]px; /* Small spacing */
--arena-space-4: [MEASURE]px; /* Medium spacing */
--arena-space-6: [MEASURE]px; /* Large spacing */
--arena-space-8: [MEASURE]px; /* Extra large spacing */

/* Component Dimensions */
--arena-header-height: [MEASURE]px; /* Header height */
--arena-button-height-md: [MEASURE]px; /* Button height */
--arena-input-height: [MEASURE]px; /* Input height */
--arena-card-width: [MEASURE]px; /* Card width */
--arena-card-height: [MEASURE]px; /* Card height */

/* Border Radius */
--arena-radius-sm: [MEASURE]px; /* Small radius */
--arena-radius-md: [MEASURE]px; /* Medium radius */
--arena-radius-lg: [MEASURE]px; /* Large radius */
--arena-radius-card: [MEASURE]px; /* Card radius */
--arena-radius-button: [MEASURE]px; /* Button radius */

/* Shadows */
--arena-shadow-card: [MEASURE]px [MEASURE]px [MEASURE]px [MEASURE]px rgba([R], [G], [B], [A]);
--arena-shadow-button: [MEASURE]px [MEASURE]px [MEASURE]px [MEASURE]px rgba([R], [G], [B], [A]);
--arena-shadow-focus: [MEASURE]px [MEASURE]px [MEASURE]px [MEASURE]px rgba([R], [G], [B], [A]);
`;

  console.log(template);
}

function validateThemeFile() {
  const themeFilePath = path.join(
    __dirname,
    "..",
    "app",
    "styles",
    "arena-theme.css"
  );

  if (!fs.existsSync(themeFilePath)) {
    console.log("❌ arena-theme.css file not found!");
    return false;
  }

  const themeContent = fs.readFileSync(themeFilePath, "utf8");
  const extractMarkers = themeContent.match(/\[EXTRACT\]/g);
  const measureMarkers = themeContent.match(/\[MEASURE\]/g);
  const toExtractMarkers = themeContent.match(/\[TO_EXTRACT\]/g);
  const toMeasureMarkers = themeContent.match(/\[TO_MEASURE\]/g);

  const totalMarkers =
    (extractMarkers?.length || 0) +
    (measureMarkers?.length || 0) +
    (toExtractMarkers?.length || 0) +
    (toMeasureMarkers?.length || 0);

  console.log("\n📊 Theme File Status:\n");
  console.log(`✅ arena-theme.css file exists`);
  console.log(`📝 Values pending extraction: ${totalMarkers}`);

  if (extractMarkers?.length) {
    console.log(`   • [EXTRACT] markers: ${extractMarkers.length}`);
  }
  if (measureMarkers?.length) {
    console.log(`   • [MEASURE] markers: ${measureMarkers.length}`);
  }
  if (toExtractMarkers?.length) {
    console.log(`   • [TO_EXTRACT] markers: ${toExtractMarkers.length}`);
  }
  if (toMeasureMarkers?.length) {
    console.log(`   • [TO_MEASURE] markers: ${toMeasureMarkers.length}`);
  }

  if (totalMarkers === 0) {
    console.log("🎉 All values have been extracted!");
  } else {
    console.log(
      `\n⚠️  ${totalMarkers} values still need to be extracted from reference images.`
    );
  }

  return true;
}

function updateThemeValue(variable, value) {
  const themeFilePath = path.join(
    __dirname,
    "..",
    "app",
    "styles",
    "arena-theme.css"
  );

  if (!fs.existsSync(themeFilePath)) {
    console.log("❌ arena-theme.css file not found!");
    return false;
  }

  let themeContent = fs.readFileSync(themeFilePath, "utf8");

  // Replace the variable with the new value
  const variableRegex = new RegExp(`(--${variable}:\\s*)[^;]+;`, "g");
  const replacement = `$1${value};`;

  if (themeContent.match(variableRegex)) {
    themeContent = themeContent.replace(variableRegex, replacement);
    fs.writeFileSync(themeFilePath, themeContent);
    console.log(`✅ Updated --${variable} to ${value}`);
    return true;
  } else {
    console.log(`❌ Variable --${variable} not found in theme file`);
    return false;
  }
}

function showUsage() {
  console.log("\n🚀 Arena Theme Extraction Helper\n");
  console.log("Usage: node scripts/extract-theme-values.js [command]\n");
  console.log("Commands:");
  console.log("   guide          Show extraction guide and process");
  console.log("   colors         Generate color extraction template");
  console.log("   measurements   Generate measurement extraction template");
  console.log("   validate       Check theme file status");
  console.log("   update <var> <value>  Update a specific theme variable");
  console.log("\nExamples:");
  console.log("   node scripts/extract-theme-values.js guide");
  console.log("   node scripts/extract-theme-values.js colors");
  console.log(
    '   node scripts/extract-theme-values.js update arena-primary "#0066FF"'
  );
  console.log("");
}

// Main execution
function main() {
  const command = process.argv[2];

  switch (command) {
    case "guide":
      displayExtractionGuide();
      break;
    case "colors":
      generateColorExtractionTemplate();
      break;
    case "measurements":
      generateMeasurementTemplate();
      break;
    case "validate":
      validateThemeFile();
      break;
    case "update":
      const variable = process.argv[3];
      const value = process.argv[4];
      if (!variable || !value) {
        console.log(
          "❌ Usage: node scripts/extract-theme-values.js update <variable> <value>"
        );
        console.log(
          'Example: node scripts/extract-theme-values.js update arena-primary "#0066FF"'
        );
      } else {
        updateThemeValue(variable, value);
      }
      break;
    default:
      showUsage();
      break;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  displayExtractionGuide,
  generateColorExtractionTemplate,
  generateMeasurementTemplate,
  validateThemeFile,
  updateThemeValue,
};
