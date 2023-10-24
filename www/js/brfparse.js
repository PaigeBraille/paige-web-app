// Methods for parsing and enforcing the BRF file format

function textToBrf(text, maxLineLength, linesPerPage) {
    // Turns freeform text into valid BRF file
    var pages = textToValidBraillePages(text, maxLineLength, linesPerPage);
    return pages.join("\n");
}
function textToValidBraillePages(text, maxLineLength, linesPerPage) {
    var cleanedText = cleanText(text);
    var words = cleanedText.split(" ");
    var lines = [];
    var line = "";
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (word.length > maxLineLength) {
            var splitWord = word.match(new RegExp('.{1,' + maxLineLength + '}', "g"));
            for (var j = 0; j < splitWord.length; j++) {
                var part = splitWord[j];
                if (line.length + part.length > maxLineLength) {
                    lines.push(line);
                    line = "";
                }
                line += (line.length > 0 ? " " : "") + part;
                if (j === splitWord.length - 1) {
                    lines.push(line);
                    line = "";
                }
            }
        } else {
            if (line.length + word.length > maxLineLength) {
                lines.push(line);
                line = "";
            }
            line += (line.length > 0 ? " " : "") + word;
        }
    }
    lines.push(line);
    var pages = [];
    var page = [];
    for (var i = 0; i < lines.length; i++) {
        if (page.length === linesPerPage) {
            pages.push(page.join("\n"));
            page = [];
        }
        page.push(lines[i]);
    }
    pages.push(page.join("\n"));
    return pages;
}

function cleanText(text) {
    return text.replace(/\r?\n|\r| +/g, " ");
}