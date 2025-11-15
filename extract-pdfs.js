const fs = require('fs');
const path = require('path');

async function extractPDFText(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    // Convert Buffer to Uint8Array as required by the library
    const uint8Array = new Uint8Array(dataBuffer);
    
    // Dynamic import - PDFParse is a class
    const pdfParseModule = await import('pdf-parse');
    const PDFParse = pdfParseModule.PDFParse;
    
    // Create instance, load, and get text
    const parser = new PDFParse(uint8Array);
    await parser.load();
    const text = await parser.getText();
    const info = await parser.getInfo();
    
    return {
      filename: path.basename(pdfPath),
      numPages: parser.numpages || 'unknown',
      text: text,
      info: info
    };
  } catch (error) {
    return {
      filename: path.basename(pdfPath),
      error: error.message
    };
  }
}

async function main() {
  const pdf1 = await extractPDFText('./public/[MASTER DECK] The Scale Climate Accelerator.pdf');
  const pdf2 = await extractPDFText('./public/Climate Action Accelerator - Fund I Draft II.pdf');
  
  console.log(JSON.stringify({ pdf1, pdf2 }, null, 2));
}

main().catch(console.error);

