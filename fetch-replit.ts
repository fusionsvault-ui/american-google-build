import fs from 'fs';

async function fetchAssets() {
  try {
    console.log('Fetching JS bundle...');
    const jsUrl = 'https://american-founders-replica-2--ekaterinasergey.replit.app/assets/index-CBaQGI6a.js';
    const jsResponse = await fetch(jsUrl);
    const jsText = await jsResponse.text();
    
    // Write JS to a file for analysis
    fs.writeFileSync('replit-bundle.js', jsText);
    console.log('JS bundle saved to replit-bundle.js. Length:', jsText.length);

    // Let's also extract any recognizable constant patterns or React components in the file
    // and write them to a structured text file for us to read.
    const strings = [];
    const stringRegex = /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/g;
    
    console.log('Analyzing bundle contents...');
  } catch (error) {
    console.error('Error fetching assets:', error);
  }
}

fetchAssets();
