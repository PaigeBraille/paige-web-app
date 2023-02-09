// Methods for parsing and enforcing the BRF file format

function parseBrf(rawBrf) {
    // Returns array of page strings
    return rawBrf.split("");
}

function textToBrf(text, maxLineLength, linesPerPage) {
    // Turns freeform text into valid BRF file
    var pages = textToValidBraillePages(text, maxLineLength, linesPerPage);
    return pages.join("\n");
}

function textToValidBraillePages(text, maxLineLength, linesPerPage) {
    // Split into lines with max linesPerPages chars per line
    // Split into pages with max maxLineLength lines per page
    // Use word wrap to avoid splitting in the middle of words

    var cleanedText = cleanText(text); 

    // Split the text into words
    var words = cleanedText.split(" ");
    var lines = [];
    var line = "";

    // Loop through each word and add it to the current line
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        // If adding the word to the line would exceed the max line length,
        // add the current line to the lines array and start a new line
        if (line.length + word.length > maxLineLength) {
            lines.push(line);
            line = "";
        }
        // Add the word to the current line, with a space if it's not the first word
        line += (line.length > 0 ? " " : "") + word;
    }
    // Add the last line to the lines array
    lines.push(line);

    var pages = [];
    var page = [];

    // Loop through each line and add it to the current page
    for (var i = 0; i < lines.length; i++) {
        // If adding the line to the page would exceed the max lines per page,
        // add the current page to the pages array and start a new page
        if (page.length === linesPerPage) {
            pages.push(page.join("\n"));
            page = [];
        }
        // Add the line to the current page
        page.push(lines[i]);
    }
    // Add the last page to the pages array
    pages.push(page.join("\n"));

    return pages;
}

function cleanText(text) {
    // For preprocessing
    return text.replace(/\r?\n|\r/g, " ").replace("//g", " ");
}