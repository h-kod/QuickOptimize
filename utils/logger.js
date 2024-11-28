function logSizeReduction(originalSize, minimizedSize, fileType) {
  const reduction = ((originalSize - minimizedSize) / originalSize * 100).toFixed(2);
  console.log(`${fileType} file size reduced by: ${reduction}% (${(originalSize / 1024).toFixed(2)} KB to ${(minimizedSize / 1024).toFixed(2)} KB)`);
}

function logTotalReduction(totalOriginalSize, totalMinimizedSize, fileType) {
  if (totalOriginalSize > 0) {
    const totalReduction = ((totalOriginalSize - totalMinimizedSize) / totalOriginalSize * 100).toFixed(2);
    console.log(`Total ${fileType} size reduced by: ${totalReduction}% (${(totalOriginalSize / 1024).toFixed(2)} KB to ${(totalMinimizedSize / 1024).toFixed(2)} KB)`);
  }
}

module.exports = { logSizeReduction, logTotalReduction };
