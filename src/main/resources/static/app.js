var stompClient = null;
var timer = null;
var isRunning = false;
var canReset = false;


function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/api/updates', function (greeting) {
            showApiMessage(greeting.body);
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


function showApiMessage(payloadText) {
    if (payloadText === "timerStart" && isRunning) {
        timer.resume();
        canReset = false;
    } else if (payloadText === "timerStart") {
        timer = startTimer(1*60, "timer", function() {alert("Done!");});
        isRunning = true;
    } else if (payloadText === "timerStop") {
        timer.pause();
        canReset = true;
    } else if (payloadText === "timerReset" && canReset) {
        timer.reset();
    }
    $("#greetings").append("<tr><td>" + payloadText + "</td></tr>");
}


$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").click(function() { connect(); });
    $("#disconnect").click(function() { disconnect(); });
});


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
            m = Math.floor(now/60000), s = Math.floor(now/1000)%60;
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


document.addEventListener("DOMContentLoaded", function() {
  connect();
});


$(window).on("unload", function() {
  alert( "Handler for .unload() called." );
  disconnect();
});