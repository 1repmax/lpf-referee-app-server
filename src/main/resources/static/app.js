var stompClient = null;
var timer = null;
var isRunning = false;
var canReset = false;
var leftVote = null;
var centerVote = null;
var rightVote = null;


function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/api/updates', function (greeting) {
            showApiMessage(greeting.body);
        });
        stompClient.subscribe('/api/votes', function (vote) {
            updateCircles(vote.body);
        });
    });
}


function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}


function updateCircles(votePayload) {
    var vote = JSON.parse(votePayload);
    var position = vote.position;
    if (position === "CENTER") {
        centerVote = vote.decision;
        console.log("CENTER : " + centerVote);
    } else if (position === "LEFT") {
        leftVote = vote.decision;
        console.log("LEFT : " + leftVote);
    } else if (position === "RIGHT") {
        rightVote = vote.decision;
        console.log("RIGHT : " + rightVote);
    }

    if (!(leftVote === null) && !(centerVote === null) && !(rightVote === null)) {
        console.log("Displaying result");
        drawCircles();
        leftVote = null;
        centerVote = null;
        rightVote = null;
    }
}


function showApiMessage(payloadText) {
    if (payloadText === "timerStart" && isRunning) {
        timer.resume();
        canReset = false;
    } else if (payloadText === "timerStart") {
        timer = startTimer(1 * 60, "timer", function() {alert("Done!");});
        isRunning = true;
    } else if (payloadText === "timerStop") {
        timer.pause();
        canReset = true;
    } else if (payloadText === "timerReset" && canReset) {
        timer.reset();
    }
}


function startTimer(seconds, container, oncomplete) {
    var startTime, timer, obj, ms = seconds * 1000,
        display = document.getElementById(container);
    obj = {};

    obj.resume = function() {
        startTime = new Date().getTime();
        timer = setInterval(obj.step,250); // adjust this number to affect granularity
                            // lower numbers are more accurate, but more CPU-expensive
    };

    obj.pause = function() {
        ms = obj.step();
        clearInterval(timer);
    };

    obj.step = function() {
        var now = Math.max(0,ms-(new Date().getTime()-startTime)),
            m = Math.floor(now / 60000), s = Math.floor(now/1000)%60;
        s = (s < 10 ? "0" : "")+s;
        display.innerHTML = m+":"+s;
        if( now == 0) {
            clearInterval(timer);
            obj.resume = function() {};
            if(oncomplete) oncomplete();
        }
        return now;
    };

    obj.reset = function() {
        ms = 60*1000;
        display.innerHTML = "1:00";
    };

    obj.resume();
    return obj;
}


function drawCircles() {
    drawCirclePairs("circleLeft", 150, "mistakeLeft", 60, "LEFT");
    drawCirclePairs("circleCenter", 150, "mistakeCenter", 60, "CENTER");
    drawCirclePairs("circleRight", 150, "mistakeRight", 60, "RIGHT");
}


function drawCirclePairs(largeCircleId, largeRadius, smallCircleId, smallRadius, position) {
    drawCircle(largeCircleId, largeRadius, position, "LARGE");
    drawCircle(smallCircleId, smallRadius, position, "SMALL");
}


function drawCircle(circleId, radius, position, size) {
    const canvas = document.getElementById(circleId);
    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = getFillStyle(position, size);
    context.fill();
    context.lineWidth = 0;
    context.strokeStyle = '#003300';
    context.stroke();

}


function getFillStyle(position, size) {
    var fillStyle;
    var decision = getDecisionForPosition(position);

    if (size === "SMALL") {
        if (decision === "GOOD_LIFT") {
            fillStyle = "white";
        } else if (decision === "RED") {
            fillStyle = "red";
        } else if (decision === "BLUE") {
            fillStyle = "blue";
        } else if (decision === "YELLOW") {
            fillStyle = "yellow";
        } else {
            fillStyle = "grey";
        }
    } else {
        if (decision === "GOOD_LIFT") {
            fillStyle = "white";
        } else if (decision === "RED" || decision === "BLUE" || decision === "YELLOW") {
            fillStyle = "red";
        } else {
            fillStyle = "grey";
        }
    }

    return fillStyle;
}


function getDecisionForPosition(position) {
    if (position === "LEFT") {
        return leftVote;
    } else if (position === "CENTER") {
        return centerVote;
    } else {
        return rightVote;
    }

}


document.addEventListener("DOMContentLoaded", function() {
  connect();
  drawCircles();
});


$(window).on("unload", function() {
  alert( "Handler for .unload() called." );
  disconnect();
});