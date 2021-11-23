package com.mpi.lpfrefereeappserver.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author Raivo Lapins on 11/22/2021
 */
@RestController
@RequestMapping("${api.endpoint.timer}")
public class TimerController {

    private boolean isRunning;

    @GetMapping(value = "/stop")
    public String stopTimer() {
//        ModelAndView modelAndView = new ModelAndView("stopView");
        System.out.println("Stop called");
        isRunning = false;
        return "stop";
    }

    @GetMapping(value = "/start")
    public String startTimer() {
//        ModelAndView modelAndView = new ModelAndView("startView");
        System.out.println("Start called");
        isRunning = true;
        return "start";
    }

    @GetMapping(value = "/reset")
    public String resetTimer() {
//        ModelAndView modelAndView = new ModelAndView("resetView");
        System.out.println("Reset called");
        isRunning = false;
        return "reset";
    }
}
