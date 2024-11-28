const axios = require("axios");
const jsdom = require("jsdom");
const fs = require("fs");
const path = require("path");
const { minify } = require("terser");
const { PurgeCSS } = require("purgecss");
const { logSizeReduction } = require("./logger");

async function downloadCSSFiles(url, cssOutputDir) {
  const { data: html } = await axios.get(url);
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const stylesheets = Array.from(document.querySelectorAll("link[rel='stylesheet']"))
    .map(link => link.href)
    .filter(href => href.startsWith("http") || href.startsWith("/"));

  let totalOriginalSize = 0;
  let totalMinimizedSize = 0;

  for (const stylesheet of stylesheets) {
    const cssUrl = new URL(stylesheet, url).href;
    const { data: cssContent } = await axios.get(cssUrl);

    const cssFileName = path.basename(cssUrl);
    const cssFilePath = path.join(cssOutputDir, cssFileName);

    fs.writeFileSync(cssFilePath, cssContent);
    console.log(`CSS file saved: ${cssFilePath}`);

    const minimizedCssFilePath = path.join(cssOutputDir, `m-${cssFileName}`);
    const purgeCSSResults = await new PurgeCSS().purge({
      content: [{ raw: html, extension: 'html' }],
      css: [{ raw: cssContent }],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    });
    const minimizedCssContent = purgeCSSResults[0].css;

    fs.writeFileSync(minimizedCssFilePath, minimizedCssContent);
    console.log(`Minimized CSS file saved: ${minimizedCssFilePath}`);

    const originalSize = Buffer.byteLength(cssContent, 'utf8');
    const minimizedSize = Buffer.byteLength(minimizedCssContent, 'utf8');
    logSizeReduction(originalSize, minimizedSize, "CSS");

    totalOriginalSize += originalSize;
    totalMinimizedSize += minimizedSize;
  }

  return { totalOriginalSize, totalMinimizedSize };
}

async function downloadJSFiles(url, jsOutputDir) {
  const { data: html } = await axios.get(url);
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const scripts = Array.from(document.querySelectorAll("script[src]"))
    .map(script => script.src)
    .filter(src => src.startsWith("http") || src.startsWith("/"));

  let totalOriginalSize = 0;
  let totalMinimizedSize = 0;

  for (const script of scripts) {
    const jsUrl = new URL(script, url).href;
    const { data: jsContent } = await axios.get(jsUrl);

    const jsFileName = path.basename(jsUrl);
    const jsFilePath = path.join(jsOutputDir, jsFileName);

    fs.writeFileSync(jsFilePath, jsContent);
    console.log(`JS file saved: ${jsFilePath}`);

    const minimizedJsFilePath = path.join(jsOutputDir, `m-${jsFileName}`);
    const minimizedJsContent = await minify(jsContent);

    fs.writeFileSync(minimizedJsFilePath, minimizedJsContent.code);
    console.log(`Minimized JS file saved: ${minimizedJsFilePath}`);

    const originalSize = Buffer.byteLength(jsContent, 'utf8');
    const minimizedSize = Buffer.byteLength(minimizedJsContent.code, 'utf8');
    logSizeReduction(originalSize, minimizedSize, "JS");

    totalOriginalSize += originalSize;
    totalMinimizedSize += minimizedSize;
  }

  return { totalOriginalSize, totalMinimizedSize };
}

module.exports = { downloadCSSFiles, downloadJSFiles };
