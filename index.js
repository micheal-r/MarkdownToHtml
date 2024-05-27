#!/usr/bin/env node
const fs = require('fs');
const markdownIt = require('markdown-it');

const md = markdownIt({ breaks: true });

function showHelp() {
  console.log(`
Usage: npx MarkdownToHtml <inputMarkdownFile> <outputHtmlFile>

Description:
  Converts a Markdown file to an HTML file.

Arguments:
  <inputMarkdownFile>  Path to the input Markdown file.
  <outputHtmlFile>     Path to save the output HTML file.

Example:
  MarkdownToHtml input.md output.html
  `);
}

function convertMarkdownToHtml(inputFile, outputFile) {
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading input file:', err);
      return;
    }

    const htmlContent = md.render(data);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Title</title>
  <!-- Your head content here -->
</head>
<body>
  <!-- Your body content here -->
  ${htmlContent}
</body>
</html>`;

    fs.writeFile(outputFile, html, (err) => {
      if (err) {
        console.error('Error writing output file:', err);
        return;
      }
      console.log('Markdown converted to HTML:', outputFile);
    });
  });
}

const args = process.argv.slice(2);

if (args.length === 1 && (args[0] === '-h' || args[0] === '--help')) {
  showHelp();
  process.exit(0);
}

if (args.length !== 2) {
  console.error('Invalid usage. Run npx MarkdownToHtml with -h or --help for usage information.');
  process.exit(1);
}

const inputFile = args[0];
const outputFile = args[1];

convertMarkdownToHtml(inputFile, outputFile);
