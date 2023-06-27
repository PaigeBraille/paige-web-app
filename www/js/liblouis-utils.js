var initialInputText = document.querySelector("#initialInputText");
var translatedText = document.querySelector("#translated");
var paginationText = document.querySelector("#pagination-text");

var PAIGE_CHARACTER_WAIT_TIME_MS = 100;

var MAX_LINE_LENGTH = 15;
var LINES_PER_PAGE = 5;

var allPagesText = [""];
var currentPage = 0;

var gradeButton1 = document.getElementById('buttonGrade1');
var gradeButton2 = document.getElementById('buttonGrade2');
var gradeValue = gradeButton1.value;

function setActiveGradeButton(button) {
  gradeButton1.classList.remove("active");
  gradeButton2.classList.remove("active");
  button.classList.add("active");
  gradeValue = button.value;
}

function setupGradeButtons() {
  gradeButton1.addEventListener('click', function () {
    setActiveGradeButton(gradeButton1);
    onPaigeChange(initialInputText.value, false);
  });
  gradeButton2.addEventListener('click', function () {
    setActiveGradeButton(gradeButton2);
    onPaigeChange(initialInputText.value, false);
  });
}

function makeTextareaAutoScroll(textarea) {
  textarea.scrollTop = textarea.scrollHeight;
}

function goToNextPage() {
  if (currentPage < allPagesText.length - 1) {
    currentPage += 1;
    onPaigeChange(allPagesText[currentPage], false);
  }
}

function goToPreviousPage() {
  if (currentPage > 0) {
    currentPage -= 1;
    onPaigeChange(allPagesText[currentPage], false);
  }
}

function processText(text, goToLastPage) {
  if (USES_PAIGE_DISPLAY) {
    // Enforce BRF standard
    allPagesText[currentPage] = text; // Edit current page
    var newText = cleanText(allPagesText.join(" "));
    if (newText.replace(/\s+/g, '').length === 0) {
      currentPage = 0;
      allPagesText = [""];
      return "";
    }
    allPagesText = textToValidBraillePages(newText, MAX_LINE_LENGTH, LINES_PER_PAGE);
    if (goToLastPage) {
      currentPage = allPagesText.length - 1;
    }
    return allPagesText[currentPage];
  } else {
    allPagesText = [text];
    currentPage = 0;
    return text;
  }
}

function translateLines(lines) {
  var translation = [];
  try {
    for (var i = 0; i < lines.length; i++) {
      var line = cleanText(lines[i].replace("\n", ""));
      if (line.replace(/\s+/g, '').length !== 0) {
        translation.push(translateWithLiblouis(line, gradeValue));
      }
    }
    return translation.join("\n");
  } catch (error) {
    console.error(error);
    return translation.join("\n");
  }
}


function onPaigeChange(newInput, goToLastPage) {
  makeTextareaAutoScroll(initialInputText);
  makeTextareaAutoScroll(translatedText);
  newInput = processText(newInput, goToLastPage);
  initialInputText.value = newInput;
  var lines = newInput.split("\n");
  document.getElementById("pagination-text").innerHTML = "Page " + (currentPage + 1).toString() + " of " + allPagesText.length;
  translatedText.value = translateLines(lines);
}

function getAsciiFileName(AsciiBase10) {
  var AsciiBase16 = AsciiBase10.toString(16);
  var AsciiBase16FileName = AsciiBase16.toUpperCase();
  return AsciiBase16FileName;
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function getBrf() {
  var allText = allPagesText.join(" ");
  return textToBrf(allText, MAX_LINE_LENGTH, LINES_PER_PAGE);
}

function getFullTranslation() {
  var lines = allPagesText.join("\n").split("\n");
  return translateLines(lines);
}


function saveTextInput() {
  if (IS_UI_DEMO) {
    download("braille.brf", textToBrf(translatedText.value, MAX_LINE_LENGTH, LINES_PER_PAGE));
  } else {
    var filename = translatedText.value.split("\n")[0].replace(/\s/g, '_');
    var brfFileContents = getBrf();
    var translationFileContents = getFullTranslation();

    console.log("BRF File contents:");
    console.log(brfFileContents);
    console.log("TXT File contents:");
    console.log(translationFileContents);

    PAIGE_files_start_upload(filename + ".brf", brfFileContents);
    function uploadTxt() {
      PAIGE_files_start_upload(filename + ".txt", translationFileContents);
    }
    setTimeout(uploadTxt, 5000);
  }
}

function clearTextInput() {
  initialInputText.value = "";
  translatedText.value = "";
  allPagesText = [];
  currentPage = 0;
  document.getElementById("pagination-text").innerHTML = "Page 1 of 1";
  try {
    console.log("Attempting to clear");
    macro_command("ESP", "clear.gcode");
    SendDisableCommand();
  } catch (e) {
    console.error("Error sending clear command", e);
  }
}

function printToBraille(tableNames, inputStr) {
  return liblouis.translateString(tableNames, inputStr);
}

function brailleToPrint(tableNames, inputStr) {
  try {
    return liblouis.backTranslateString(tableNames, inputStr);
  } catch (e) {
    console.warn("Could not translate input string, trying work breakdown");
    let words = inputStr.split(' ');
    let translatedWords = [];
    for (let i = 0; i < words.length; i++) {
      try {
        let translatedWord = liblouis.backTranslateString(tableNames, words[i]+' ');
        let translatedWord2 = liblouis.backTranslateString(tableNames, words[i])+' ';
        if (translatedWord2.length > translatedWord.length) {
          translatedWord = translatedWord2;
        }
        translatedWords.push(translatedWord);
      } catch (e) {
        console.error("Error translating word", words[i], e);
      }
    }
    return translatedWords.join('');
  }
}

function updateTextFromEnglishFileUpload(text) {

  var tableNames = "en-ueb-g1.ctb";
  if (gradeValue === '2') {
    tableNames = "en-ueb-g2.ctb";
  }
  var brailleInput = printToBraille(tableNames, text);
  onPaigeChange(brailleInput, false);
}

function translateWithLiblouis(inputStr, grade) {
  // Use unicode.dis if you want to translate to/from Unicode Braille instead of ASCII Braille
  // If using without unicode.dis, ASCII Braille should be rendered using the braille font (aph_braille_shadowsregular)

  // var tableNames = "unicode.dis,en-ueb-g1.ctb";
  // if (grade === '2') {
  //   tableNames = "unicode.dis,en-ueb-g2.ctb"
  // }

  var tableNames = "en-ueb-g1.ctb";
  if (grade === '2') {
    tableNames = "en-ueb-g2.ctb";
  }
  try {
    if (IS_UI_DEMO) {
      return printToBraille(tableNames, inputStr);
    } else {
      return brailleToPrint(tableNames, inputStr);
    }
  } catch (e) {
    console.error("Error with liblouis translation", e);
  }
}

function checkPotentiometerValue(line) {
  console.log({ PAIGE_POTENT_VALUE: PAIGE_POTENT_VALUE });
  if (line === 1) {
    if ((PAIGE_POTENT_VALUE >= 4) & (PAIGE_POTENT_VALUE <= 12)) return true;
  }
  if (line === 2) {
    if ((PAIGE_POTENT_VALUE >= 16) & (PAIGE_POTENT_VALUE <= 24)) return true;
  }
  if (line === 3) {
    if ((PAIGE_POTENT_VALUE >= 27) & (PAIGE_POTENT_VALUE <= 36)) return true;
  }
  if (line === 4) {
    if ((PAIGE_POTENT_VALUE >= 41) & (PAIGE_POTENT_VALUE <= 48)) return true;
  }
  if (line === 5) {
    if ((PAIGE_POTENT_VALUE >= 52) & (PAIGE_POTENT_VALUE <= 60)) return true;
  }
  return false;
}