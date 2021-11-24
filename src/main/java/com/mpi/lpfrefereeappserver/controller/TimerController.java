package com.mpi.lpfrefereeappserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Raivo Lapins on 11/22/2021
 */
@RestController
@RequestMapping("${api.endpoint.timer}")
public class TimerController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;


    @GetMapping(value = "/stop")
    public void stopTimer() {
        System.out.println("Stop called");
        simpMessagingTemplate.convertAndSend("/api/updates", "timerStop");
    }

    @GetMapping(value = "/start")
    public void startTimer() {
        System.out.println("Start called");
        simpMessagingTemplate.convertAndSend("/api/updates", "timerStart");
    }

    @GetMapping(value = "/reset")
    public void resetTimer() {
        System.out.println("Reset called");
        simpMessagingTemplate.convertAndSend("/api/updates", "timerReset");
    }
}
