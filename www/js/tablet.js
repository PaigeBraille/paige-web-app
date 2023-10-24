var gCodeLoaded = false;

var snd = null;
var sndok = true;

function beep(vol, freq, duration){
    if (snd == null) {
        if (sndok) {
            try {
                snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
            } catch (error) {
                snd = null;
                sndok = false;
            }
        }
    }
    if (snd) {
        snd.play();
    }
}

function tabletClick() {
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(200);
    }
    beep(3, 400, 10);
}

sendCommand = function(cmd) {
    SendPrinterCommand(cmd, true, get_Position);
}

moveTo = function(location) {
    // Always force G90 mode because synchronization of modal reports is unreliable
    var feedrate = 1000;
    var cmd;
    // For controllers that permit it, specifying mode and move in one block is safer
    cmd = 'G90 G0 ' + location;
    sendCommand(cmd);
}

MDIcmd = function(value) {
    tabletClick();
    sendCommand(value);
}

MDI = function(field) {
    MDIcmd(id(field).value);
}

enterFullscreen = function() {
    try {
        document.documentElement.requestFullscreen();
    } catch (exception) {
        try {
            document.documentElement.webkitRequestFullscreen();
        } catch (exception) {
            return;
        }
    }
    messages.rows = 4;
    messages.scrollTop = messages.scrollHeight;
}
exitFullscreen = function() {
    try {
        document.exitFullscreen();
    } catch (exception) {
        try {
            document.webkitExitFullscreen();
        } catch (exception) {
            return;
        }
    }
    messages.rows = 2;
    messages.scrollTop = messages.scrollHeight;
}

toggleFullscreen = function() {
    var messages = id('messages');

    if (document.fullscreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
}

inputFocused = function() {
    isInputFocused = true;
}

inputBlurred = function() {
    isInputFocused = false;
}

zeroAxis = function(axis) {
    tabletClick();
    setAxisByValue(axis, 0);
}

toggleUnits = function() {
    tabletClick();
    sendCommand(modal.units == 'G21' ? 'G20' : 'G21');
    // The button label will be fixed by the response to $G
    sendCommand('$G');
}

btnSetDistance = function() {
    tabletClick();
    var distance = event.target.innerText;
    id('jog-distance').value = distance;
}

setDistance = function(distance) {
    tabletClick();
    id('jog-distance').value = distance;
}

jogTo = function(axisAndDistance) {
    // Always force G90 mode because synchronization of modal reports is unreliable
    var feedrate = JogFeedrate(axisAndDistance);
    if (modal.units == "G20") {
        feedrate /= 25.4;
        feedrate = feedrate.toFixed(2);
    }

    var cmd;
    cmd = '$J=G91F' + feedrate + axisAndDistance + '\n';
    // tabletShowMessage("JogTo " + cmd);
    sendCommand(cmd);
}

goAxisByValue = function(axis, coordinate) {
    tabletClick();
    moveTo(axis + coordinate);
}

setAxisByValue = function(axis, coordinate) {
    tabletClick();
    var cmd = 'G10 L20 P0 ' + axis + coordinate;
    sendCommand(cmd);
}

setAxis = function(axis, field) {
    tabletClick();
    coordinate = id(field).value;
    var cmd = 'G10 L20 P1 ' + axis + coordinate;
    sendCommand(cmd);
}
var timeout_id = 0,
    hold_time = 1000;

var longone = false;
function long_jog(target) {
    longone = true;
    distance = 1000;
    var axisAndDirection = target.value
    var feedrate = JogFeedrate(axisAndDirection);
    if (modal.units == "G20") {
        distance /= 25.4;
        distance = distance.toFixed(3);
        feedrate /= 25.4;
        feedrate = feedrate.toFixed(2);
    }
    cmd = '$J=G91F' + feedrate + axisAndDirection + distance + '\n';
    // tabletShowMessage("Long Jog " + cmd);
    sendCommand(cmd);
}

var joggers = id('jog-controls');
joggers.addEventListener('pointerdown', function(event) {
    var target = event.target;
    if (target.classList.contains('jog')) {
        timeout_id = setTimeout(long_jog, hold_time, target);
    }
});
joggers.addEventListener('pointerup', function(event) {
    clearTimeout(timeout_id);
    var target = event.target;
    if (target.classList.contains('jog')) {
        if (longone) {
            longone = false;
            console.log("Jog cancel");
            SendRealtimeCmd(0x85);
        } else {
            sendMove(target.value);
        }
    }
});
joggers.addEventListener('pointerout', function(event) {
    clearTimeout(timeout_id);
    var target = event.target;
    if (target.classList.contains('jog')) {
        if (longone) {
            longone = false;
            console.log("Jog cancel");
            SendRealtimeCmd(0x85);
        }
    }
});

sendMove = function(cmd) {
    tabletClick();
    var jog = function(params) {
        params = params || {};
        var s = '';
        for (key in params) {
            s += key + params[key]
        }
        jogTo(s);
    };
    var move = function(params) {
        params = params || {};
        var s = '';
        for (key in params) {
            s += key + params[key];
        }
        moveTo(s);
    };

    var distance = Number(id('jog-distance').value) || 0;

    var fn = {
        'G28': function() {
            sendCommand('G28');
        },
        'G30': function() {
            sendCommand('G30');
        },
        'X0Y0Z0': function() {
            move({ X: 0, Y: 0, Z: 0 })
        },
        'X0': function() {
            move({ X: 0 });
        },
        'Y0': function() {
            move({ Y: 0 });
        },
        'Z0': function() {
            move({ Z: 0 });
        },
        'X-Y+': function() {
            jog({ X: -distance, Y: distance });
        },
        'X+Y+': function() {
            jog({ X: distance, Y: distance });
        },
        'X-Y-': function() {
            jog({ X: -distance, Y: -distance });
        },
        'X+Y-': function() {
            jog({ X: distance, Y: -distance });
        },
        'X-': function() {
            jog({ X: -distance });
        },
        'X+': function() {
            jog({ X: distance });
        },
        'Y-': function() {
            jog({ Y: -distance });
        },
        'Y+': function() {
            jog({ Y: distance });
        },
        'Z-': function() {
            jog({ Z: -distance });
        },
        'Z+': function() {
            jog({ Z: distance });
        }
    }[cmd];

    fn && fn();
};
function tabletShowMessage(msg, collecting) {
    if (collecting || msg ==  '' || msg.startsWith('<') || msg.startsWith('ok') || msg.startsWith('\n') || msg.startsWith('\r')) {
        return;
    }
    if (msg.startsWith('error:')) {
        msg = '<span style="color:red;">' + msg + '</span>';
    }
    var messages = id('messages');
//    messages.value += "\n" + msg;
    messages.innerHTML += "<br>" + msg;
    messages.scrollTop = messages.scrollHeight;

    if(msg.startsWith('$/axes/x/max_travel_mm=')){
        displayer.setXTravel(parseFloat(msg.substring(23,msg.length)));
    }
    if(msg.startsWith('$/axes/y/max_travel_mm=')){
        displayer.setYTravel(parseFloat(msg.substring(23,msg.length)));
    }

    if(msg.startsWith('$/axes/x/homing/mpos_mm=')){
        displayer.setXHome(parseFloat(msg.substring(24,msg.length)));
    }
    if(msg.startsWith('$/axes/y/homing/mpos_mm=')){
        displayer.setYHome(parseFloat(msg.substring(24,msg.length)));
    }

    if(msg.startsWith('$/axes/x/homing/positive_direction=')){
        displayer.setXDir(msg.substring(35,msg.length));
    }
    if(msg.startsWith('$/axes/y/homing/positive_direction=')){
        displayer.setYDir(msg.substring(35,msg.length));
    }
}

function tabletShowResponse(response) {
    var messages = id('messages');
    messages.value = response;
}

var setJogSelector = function(units) {
    var buttonDistances = [];
    var menuDistances = [];
    var selected = 0;
    if (units == 'G20') {
        // Inches
        buttonDistances = [0.001, 0.01, 0.1, 1, 0.003, 0.03, 0.3, 3, 0.005, 0.05, 0.5, 5];
        menuDistances = [0.00025, 0.0005, 0.001, 0.003, 0.005, 0.01, 0.03, 0.05, 0.1, 0.3, 0.5, 1, 3, 5, 10, 30];
        selected = '1';
    } else  {
        // millimeters
        buttonDistances = [0.1, 1, 10, 100, 0.3, 3, 30, 300, 0.5, 5, 50, 500];
        menuDistances = [0.005, 0.01, 0.03, 0.05, 0.1, 0.3, 0.5, 1, 3, 5, 10, 30, 50, 100, 300, 500, 1000];
        selected = '10';
    }
    var buttonNames = ['jog00', 'jog01', 'jog02', 'jog03', 'jog10', 'jog11', 'jog12', 'jog13', 'jog20', 'jog21', 'jog22', 'jog23'];
    buttonNames.forEach( function(n, i) { id(n).innerHTML = buttonDistances[i]; } );

    var selector = id('jog-distance');
    selector.length = 0;
    selector.innerText = null;
    menuDistances.forEach(function(v) {
        var option = document.createElement("option");
        option.textContent=v;
        option.selected = (v == selected);
        selector.appendChild(option);
    });
}
function removeJogDistance(option, oldIndex) {
    selector = id('jog-distance');
    selector.removeChild(option);
    selector.selectedIndex = oldIndex;
}
function addJogDistance(distance) {
    selector = id('jog-distance');
    var option = document.createElement("option");
    option.textContent=distance;
    option.selected = true;
    return selector.appendChild(option);
}

var runTime = 0;

function setButton(name, isEnabled, color, text) {
    var button = id(name);
    button.disabled = !isEnabled;
    button.style.backgroundColor = color;
    button.innerText = text;
}

var leftButtonHandler;
function setLeftButton(isEnabled, color, text, click) {
    setButton('btn-start', isEnabled, color, text);
    leftButtonHandler = click;
}
function doLeftButton() {
    if (leftButtonHandler) {
        leftButtonHandler();
    }
}

var rightButtonHandler;
function setRightButton(isEnabled, color, text, click) {
    setButton('btn-pause', isEnabled, color, text);
    rightButtonHandler = click;
}
function doRightButton() {
    if (rightButtonHandler) {
        rightButtonHandler();
    }
}

var green = '#86f686';
var red = '#f64646';
var gray = '#f6f6f6';

function setRunnable() {
    if (gCodeLoaded) {
        // A GCode file is ready to go
        setLeftButton(true, green, 'Start', runGCode);
        setRightButton(false, gray, 'Pause', null);
    } else {
        // Can't start because no GCode to run
        setLeftButton(false, gray, 'Start', null);
        setRightButton(false, gray, 'Pause', null);
    }
}

var grblReportingUnits = 0;
var startTime = 0;

var spindleDirection = ''
var spindleSpeed = ''

function stopAndRecover() {
    stopGCode();
    // To stop GRBL you send a reset character, which causes some modes
    // be reset to their default values.  In particular, it sets G21 mode,
    // which affects the coordinate display and the jog distances.
    requestModes();
}

var oldCannotClick = null;

function tabletUpdateModal() {
    var newUnits = modal.units == 'G21' ? 'mm' : 'Inch';
    if (getText('units') != newUnits) {
        setText('units', newUnits);
        setJogSelector(modal.units);
    }
    // setDisabled('units', false);
}

function tabletGrblState(grbl, response) {
    // tabletShowResponse(response)
    var stateName = grbl.stateName;

    // Unit conversion factor - depends on both $13 setting and parser units
    var factor = 1.0;

    //  spindleSpeed = grbl.spindleSpeed;
    //  spindleDirection = grbl.spindle;
    //
    //  feedOverride = OVR.feed/100.0;
    //  rapidOverride = OVR.rapid/100.0;
    //  spindleOverride = OVR.spindle/100.0;

    var mmPerInch = 25.4;
    switch (modal.units) {
        case 'G20':
            factor = grblReportingUnits === 0 ? 1/mmPerInch : 1.0 ;
            break;
        case 'G21':
            factor = grblReportingUnits === 0 ? 1.0 : mmPerInch;
            break;
    }

    // if (cnc.filename == '') {
    //	canStart = false;
    //}

    var cannotClick = stateName == 'Run' || stateName == 'Hold';
    // Recompute the layout only when the state changes
    if (oldCannotClick != cannotClick) {
        selectDisabled('.control-pad .form-control', cannotClick);
        selectDisabled('.control-pad .btn', cannotClick);
        selectDisabled('.dropdown-toggle', cannotClick);
        selectDisabled('.axis-position .position', cannotClick);
        selectDisabled('.axis-position .form-control', cannotClick);
        selectDisabled('.axis-position .btn', cannotClick);
        selectDisabled('.axis-position .position', cannotClick);
        if (!cannotClick) {
            contractVisualizer();
        }
    }
    oldCannotClick = cannotClick;

    tabletUpdateModal();

    switch (stateName) {
        case 'Sleep':
        case 'Alarm':
            setLeftButton(true, gray, 'Start', null);
            setRightButton(false, gray, 'Pause', null);
            break;
        case 'Idle':
            setRunnable();
            break;
        case 'Hold':
            setLeftButton(true, green, 'Resume', resumeGCode);
            setRightButton(true, red, 'Stop', stopAndRecover);
            break;
        case 'Jog':
        case 'Home':
        case 'Run':
            setLeftButton(false, gray, 'Start', null);
            setRightButton(true, red, 'Pause', pauseGCode);
            break;
        case 'Check':
            setLeftButton(true, gray, 'Start', null);
            setRightButton(true, red, 'Stop', stopAndRecover);
            break;
    }

    if (grbl.spindleDirection) {
        switch (grbl.spindleDirection) {
            case 'M3': spindleDirection = 'CW'; break;
            case 'M4': spindleDirection = 'CCW'; break;
            case 'M5': spindleDirection = 'Off'; break;
            default: spindleDirection = '';  break;
        }
    }
    setText('spindle-direction', spindleDirection);

    spindleSpeed = grbl.spindleSpeed ? Number(grbl.spindleSpeed) : '';
    setText('spindle-speed', spindleSpeed);

    var now = new Date();
    setText('time-of-day', now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0'));
    if (stateName == 'Run') {
	var elapsed = now.getTime() - startTime;
	if (elapsed < 0)
	    elapsed = 0;
	var seconds = Math.floor(elapsed / 1000);
	var minutes = Math.floor(seconds / 60);
	seconds = seconds % 60;
	if (seconds < 10)
	    seconds = '0' + seconds;
	runTime = minutes + ':' + seconds;
    } else {
        startTime = now.getTime();
        runTime = "0:00";
    }

    setText('runtime', runTime);

    setText('wpos-label', modal.wcs);
    var distanceText = modal.distance == 'G90'
	             ? modal.distance
	             : "<div style='color:red'>" + modal.distance + "</div>";
    setHTML('distance', distanceText);

    var stateText = "";
    if (stateName == 'Run') {
        var rateNumber = modal.units == 'G21'
	             ? Number(grbl.feedrate).toFixed(0)
	             : Number(grbl.feedrate/25.4).toFixed(2);

	var rateText = rateNumber +
                       (modal.units == 'G21' ? ' mm/min' : ' in/min');

        stateText = rateText + " " + spindleSpeed + " " + spindleDirection;
    } else {
        // var stateText = errorText == 'Error' ? "Error: " + errorMessage : stateName;
        stateText = stateName;
    }
    setText('active-state', stateText);

    var modeText = modal.distance + " " +
                   modal.wcs + " " +
                   modal.units + " " +
                   "T" + modal.tool + " " +
                   "F" + modal.feedrate + " " +
                   "S" + modal.spindle + " ";

    setHTML('gcode-states', modal.modes || "GCode State");

    if (grbl.lineNumber && (stateName == 'Run' || stateName == 'Hold' || stateName == 'Stop')) {
        setText('line', grbl.lineNumber);
        scrollToLine(grbl.lineNumber);
    }
    displayer.reDrawTool(modal, arrayToXYZ(WPOS));

    var digits = modal.units == 'G20' ? 4 : 2;

    if (WPOS) {
        WPOS.forEach( function(pos, index) {
            setTextContent('wpos-'+axisNames[index], Number(pos*factor).toFixed(index > 2 ? 2 : digits));
        });
    }

    MPOS.forEach( function(pos, index) {
        setTextContent('mpos-'+axisNames[index], Number(pos*factor).toFixed(index > 2 ? 2 : digits));
    });
}

function addOption(selector, name, isDisabled, isSelected) {
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(name));
    opt.disabled = isDisabled;
    opt.selected = isSelected;
    opt.value = name;
    selector.appendChild(opt);
}
var filename = 'TEST.NC';
var watchPath = '';

function gotFiles(response_text) {
    try {
        var obj = JSON.parse(response_text);
        populateTabletFileSelector(obj);
    } catch (e) {
        console.error("Parsing error:", e);
        error = true;
    }
}

function toggleVisualizer() {
    if (id('mdifiles').hidden) {
        contractVisualizer();
    } else {
        expandVisualizer();
    }
}

function contractVisualizer() {
    id('mdifiles').hidden = false;
    id('setAxis').hidden = false;
    displayBlock('jog-controls');
    setBottomHeight();
}

function expandVisualizer() {
    id('mdifiles').hidden = true;
    id('setAxis').hidden = true;
    displayNone('jog-controls');
    setBottomHeight();
}

function populateTabletFileSelector(obj) {
    var selector = id('filelist');

    var selectedFile = filename.split('/').slice(-1)[0];

    selector.length = 0;

    if (obj.files) {
        var inRoot = watchPath === '';
        var legend = inRoot ? 'Load GCode File' : 'In ' + watchPath;
        addOption(selector, legend, selectedFile == '');

        if (!inRoot) {
            addOption(selector, '..', false, false);
        }
        var files = obj.files.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        })
        files.forEach(function(file) {
            // size -1 indicates a directory
            addOption(selector, file.size == -1 ? file.name + "/" : file.name, false, file.name == selectedFile);
        });
    } else {
        addOption(selector, "No files found", selectedFile == '');
    }
}

function tabletGetFileList(path) {
    SendGetHttp('/upload?path=' + encodeURI(path), files_directSD_list_success, null);
}

function tabletInit() {
    tabletGetFileList('/');
    requestModes();
}

function arrayToXYZ(a) {
    return {
        x: a[0],
        y: a[1],
        z: a[2]
    }
}

function showGCode(gcode) {
    gCodeLoaded = gcode != '';
    if (!gCodeLoaded) {
	gcode = "(No GCode loaded)";
    }

    id('gcode').value = gcode;
    if (gCodeLoaded) {
        var initialPosition = {
            x: WPOS[0],
            y: WPOS[1],
            z: WPOS[2]
        };

        displayer.showToolpath(gcode, modal, arrayToXYZ(WPOS));
    }
    // XXX this needs to take into account error states
    setRunnable();
}

var machineBboxAsked = false;

function askMachineBbox() {
    if (machineBboxAsked) {
        return;
    }
    machineBboxAsked = true;
    SendPrinterCommand("$/axes/x/max_travel_mm");
    SendPrinterCommand("$/axes/x/homing/mpos_mm");
    SendPrinterCommand("$/axes/x/homing/positive_direction");

    SendPrinterCommand("$/axes/y/max_travel_mm");
    SendPrinterCommand("$/axes/y/homing/mpos_mm");
    SendPrinterCommand("$/axes/y/homing/positive_direction");
}

var gCodeFilename = '';

function nthLineEnd(str, n){
    if (n <= 0)
        return 0;
    var L= str.length, i= -1;
    while(n-- && i++<L){
        i= str.indexOf("\n", i);
        if (i < 0) break;
    }
    return i;
}

function scrollToLine(lineNumber) {
    var gCodeLines = id('gcode');
    var lineHeight = parseFloat(getComputedStyle(gCodeLines).getPropertyValue('line-height'));
    var gCodeText = gCodeLines.value;

    gCodeLines.scrollTop = (lineNumber) * lineHeight;

    var start;
    var end;
    if (lineNumber <= 0) {
        start = 0;
        end = 1;
    } else {
        start = (lineNumber == 1) ? 0 : start = nthLineEnd(gCodeText, lineNumber) + 1;
        end = gCodeText.indexOf("\n", start);
    }

    gCodeLines.select();
    gCodeLines.setSelectionRange(start, end);
}

function runGCode() {
    gCodeFilename && sendCommand('$sd/run=' + gCodeFilename);
    expandVisualizer();
}

function loadGCode() {
    tabletClick();
    var filelist = id('filelist');
    var filename =  filelist.options[filelist.selectedIndex].textContent;
    if (filename === '..') {
        watchPath = watchPath.slice(0, -1).replace(/[^/]*$/,'');
        filename = '';
        tabletGetFileList(watchPath);
    } else if (filename.endsWith('/')) {
        watchPath = watchPath + filename;
        filename = '';
        tabletGetFileList(watchPath);
    } else {
        gCodeFilename = watchPath + filename;
        setHTML('filename', gCodeFilename);
        fetch(encodeURIComponent('SD/' + gCodeFilename))
            .then(response => response.text() )
            .then(gcode => showGCode(gcode) );
    }
}
function toggleDropdown() {
    id('tablet-dropdown-menu').classList.toggle('show');
}
function hideMenu() { toggleDropdown(); }
function menuFullscreen() { toggleFullscreen(); hideMenu(); }
function menuReset() { stopAndRecover(); hideMenu(); }
function menuUnlock() { sendCommand('$X'); hideMenu(); }
function menuHomeAll() { sendCommand('$H'); hideMenu(); }
function menuHomeA() { sendCommand('$HA'); hideMenu(); }
function menuSpindleOff() { sendCommand('M5'); hideMenu(); }

function requestModes() { sendCommand('$G'); }

cycleDistance = function(up) {
    var sel = id('jog-distance');
    var newIndex = sel.selectedIndex + (up ? 1 : -1);
    if (newIndex >= 0 && newIndex < sel.length) {
        tabletClick();
        sel.selectedIndex = newIndex;
    }
}
clickon = function(name) {
    //    $('[data-route="workspace"] .btn').removeClass('active');
    var button = id(name);
    button.classList.add('active');
    button.dispatchEvent(new Event('click'));
}
var ctrlDown = false;
var oldIndex = null;;
var newChild = null;

function shiftUp() {
    if (!newChild) {
        return;
    }
    removeJogDistance(newChild, oldIndex);
    newChild = null;
}
function altUp() {
    if (!newChild) {
        return;
    }
    removeJogDistance(newChild, oldIndex);
    newChild = null;
}

function shiftDown() {
    if (newChild) {
        return;
    }
    var sel = id('jog-distance');
    var distance = sel.value;
    oldIndex = sel.selectedIndex;
    newChild = addJogDistance(distance * 10);
}
function altDown() {
    if (newChild) {
        return;
    }
    var sel = id('jog-distance');
    var distance = sel.value;
    oldIndex = sel.selectedIndex;
    newChild = addJogDistance(distance / 10);
}

function jogClick(name) {
    clickon(name);
}

// Reports whether a text input box has focus - see the next comment
var isInputFocused = false;
function tabletIsActive() {
    return id('tablettab').style.display !== 'none';
}
function handleKeyDown(event) {
    // When we are in a modal input field like the MDI text boxes
    // or the numeric entry boxes, disable keyboard jogging so those
    // keys can be used for text editing.
    if (!tabletIsActive()) {
        return;
    }
    if (isInputFocused) {
        return;
    }
    switch(event.key) {
	case "ArrowRight":
	    jogClick('jog-x-plus');
            event.preventDefault();
	    break;
	case "ArrowLeft":
	    jogClick('jog-x-minus');
            event.preventDefault();
	    break;
	case "ArrowUp":
	    jogClick('jog-y-plus');
            event.preventDefault();
	    break;
	case "ArrowDown":
	    jogClick('jog-y-minus');
            event.preventDefault();
	    break;
	case "PageUp":
	    jogClick('jog-z-plus');
            event.preventDefault();
	    break;
	case "PageDown":
	    jogClick('jog-z-minus');
            event.preventDefault();
	    break;
	case "Escape":
	case "Pause":
	    clickon('btn-pause');
	    break;
	case "Shift":
            shiftDown();
	    break;
	case "Control":
	    ctrlDown = true;
	    break;
	case "Alt":
	    altDown();
	    break;
	case "=": // = is unshifted + on US keyboards
	case "+":
	    cycleDistance(true);
            event.preventDefault();
	    break;
	case '-':
	    cycleDistance(false);
            event.preventDefault();
	    break;
	default:
	    console.log(event);
    }
}
function handleKeyUp(event) {
    if (!tabletIsActive()) {
        return;
    }
    if (isInputFocused) {
        return;
    }
    switch(event.key) {
	case "Shift":
	    shiftUp();
	    break;
	case "Control":
	    ctrlDown = false;
	    break;
	case "Alt":
	    altUp();
	    break;
    }
}

setJogSelector('mm');

function mdiEnterKey(event) {
    if (event.key === 'Enter') {
        MDIcmd(event.target.value);
        event.target.blur();
    }
}

id('mditext0').addEventListener('keyup', mdiEnterKey);
id('mditext1').addEventListener('keyup', mdiEnterKey);

// The listener could be added to the tablettab element by setting tablettab's
// contentEditable property.  The problem is that it is too easy for tablettab
// to lose focus, in which case it does not receive keys.  The solution is to
// delegate the event to window and then have the handler check to see if the
// tablet is active.
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

numpad.attach({target: "wpos-x", axis: "X"});
numpad.attach({target: "wpos-y", axis: "Y"});
numpad.attach({target: "wpos-z", axis: "Z"});
numpad.attach({target: "wpos-a", axis: "A"});

function fullscreenIfMobile() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        toggleFullscreen();
    }
}

id('tablettablink').addEventListener('DOMActivate', fullscreenIfMobile, false);

id('tablettab').addEventListener('activate', askMachineBbox, false);

id("control-pad").classList.add("open");

// setMessageHeight(), with these helper functions, adjusts the size of the message
// window to fill the height of the screen.  It would be nice if we could do that
// solely with CSS, but I did not find a way to do that.  Everything I tried either
// a) required setting a fixed message window height, or
// b) the message window would extend past the screen bottom when messages were added
function height(element) {
    return element.getBoundingClientRect().height;
}
function heightId(eid) {
    return height(id(eid));
}
function bodyHeight() { return height(document.body); }
function controlHeight() {
    return heightId('nav-panel') + heightId('axis-position') + heightId('setAxis') + heightId('control-pad');
}
function setBottomHeight() {
    if (!tabletIsActive()) {
        return;
    }
    var residue = bodyHeight() - heightId('navbar') - controlHeight();
    var tStyle = getComputedStyle(id('tablettab'))
    var tPad = parseFloat(tStyle.paddingTop) + parseFloat(tStyle.paddingBottom); 
    tPad += 20;
    var msgElement = id('status');
    msgElement.style.height = (residue - tPad) + 'px';
}
window.onresize = setBottomHeight;

id('tablettablink').addEventListener('DOMActivate', setBottomHeight, false);

function updateGcodeViewerAngle()  {
    const gcode = id('gcode').value;
    displayer.cycleCameraAngle(gcode, modal, arrayToXYZ(WPOS));
}

id('toolpath').addEventListener("mouseup", updateGcodeViewerAngle);
