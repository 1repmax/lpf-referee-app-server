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
    public String stopTimer() {
//        ModelAndView modelAndView = new ModelAndView("stopView");
        System.out.println("Stop called");
        simpMessagingTemplate.convertAndSend("/api/updates", "timerStop");
        return "stop";
    }

    @GetMapping(value = "/start")
    public String startTimer() {
//        ModelAndView modelAndView = new ModelAndView("startView");
        System.out.println("Start called");
        simpMessagingTemplate.convertAndSend("/api/updates", "timerStart");
        return "start";
    }

    @GetMapping(value = "/reset")
    public String resetTimer() {
//        ModelAndView modelAndView = new ModelAndView("resetView");
        System.out.println("Reset called");
        simpMessagingTemplate.convertAndSend("/api/updates", "timerReset");
        return "reset";
    }
}
