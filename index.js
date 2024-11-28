const fs = require("fs");
const path = require("path");
const { argv } = require("./config/yargsConfig");
const { downloadCSSFiles, downloadJSFiles } = require("./utils/download");
const { logTotalReduction } = require("./utils/logger");

async function saveUsedCSSAndJS(url, outputDir, downloadCSS = true, downloadJS = true) {
  try {
    // Get the hostname from the URL
    const hostname = new URL(url).hostname;
    const websiteOutputDir = path.join(outputDir, hostname);

    let totalOriginalCssSize = 0;
    let totalMinimizedCssSize = 0;
    let totalOriginalJsSize = 0;
    let totalMinimizedJsSize = 0;

    if (downloadCSS) {
      const cssOutputDir = path.join(websiteOutputDir, "css");
      if (!fs.existsSync(cssOutputDir)) {
        fs.mkdirSync(cssOutputDir, { recursive: true });
      }

      const cssSizes = await downloadCSSFiles(url, cssOutputDir);
      totalOriginalCssSize += cssSizes.totalOriginalSize;
      totalMinimizedCssSize += cssSizes.totalMinimizedSize;
    }

    if (downloadJS) {
      const jsOutputDir = path.join(websiteOutputDir, "js");
      if (!fs.existsSync(jsOutputDir)) {
        fs.mkdirSync(jsOutputDir, { recursive: true });
      }

      const jsSizes = await downloadJSFiles(url, jsOutputDir);
      totalOriginalJsSize += jsSizes.totalOriginalSize;
      totalMinimizedJsSize += jsSizes.totalMinimizedSize;
    }

    logTotalReduction(totalOriginalCssSize, totalMinimizedCssSize, "CSS");
    logTotalReduction(totalOriginalJsSize, totalMinimizedJsSize, "JS");

  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

const websiteUrl = argv.website;
const outputDirectory = "./output";
const downloadCSS = argv.css;
const downloadJS = argv.js;

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

saveUsedCSSAndJS(websiteUrl, outputDirectory, downloadCSS, downloadJS);
