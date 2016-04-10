var
    isFirstStart = true,
    firstStartTime = 0,
    lastPauseTime = 0,
    stoppedTime = 0,
    tickInterval = null,
    lapNumber = 0,
    isRunning = false;

function clear() {
    isFirstStart = true;
    firstStartTime = 0;
    lastPauseTime = 0;
    clearInterval(tickInterval);
    document.getElementById('counter').innerHTML = '00:00:00';
    document.getElementById('msec').innerHTML = '000';
    document.getElementById('start').style.display = 'block';
    document.getElementById('pause').style.display = 'none';
    isRunning = false;
    document.getElementById('log').innerHTML = '';
}

function start() {
    var currentTime = new Date();
    if (isFirstStart) {
        firstStartTime = currentTime;
        lastPauseTime = currentTime;
        stoppedTime = 0;
        isFirstStart = false;
    } else {
        stoppedTime += currentTime - lastPauseTime;
    }
    tickInterval = setInterval(tick, 41);
    document.getElementById('start').style.display = 'none';
    document.getElementById('pause').style.display = 'block';
    isRunning = true;
}

function pause() {
    clearInterval(tickInterval);
    lastPauseTime = new Date();
    document.getElementById('start').style.display = 'block';
    document.getElementById('pause').style.display = 'none';
    isRunning = false;
    log('Stop');
}

function split() {
    if (isRunning) {
        log('Split');
    }
}

function tick() {
    var currentTime = new Date();
    var timeInterval = currentTime - firstStartTime - stoppedTime;
    var msec = timeInterval % 1000;
    if (msec < 10) {
        msec = '00' + msec;
    } else if (msec < 100) {
        msec = '0' + msec;
    }
    var sec = parseInt(timeInterval / 1000 % 60);
    var min = parseInt(sec / 60 % 60);
    var h = parseInt(min / 60);
    if (sec < 10) {
        sec = '0' + sec;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (h < 10) {
        h = '0' + h;
    }
    var counter = h + ':' + min + ':' + sec;
    document.getElementById('counter').innerHTML = counter;
    document.getElementById('msec').innerHTML = msec;
}

function log(action) {
    var time = document.getElementById('counter').innerHTML + '.' + document.getElementById('msec').innerHTML;
    ++lapNumber;
    document.getElementById('log').innerHTML += '<div>' + lapNumber + ' ' + action + ' ' + time + '</div>';
}

function init() {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('pause').addEventListener('click', pause);
    document.getElementById('split').addEventListener('click', split);
    document.getElementById('clear').addEventListener('click', clear);
    clear();
}
init();

function digitalWatch() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    document.getElementById("digital_watch").innerHTML = 'Real time: ' + hours + ":" + minutes + ":" + seconds;
    setTimeout(digitalWatch, 1000);

}
digitalWatch();
