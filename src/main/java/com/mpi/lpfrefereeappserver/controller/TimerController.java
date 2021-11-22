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

    @GetMapping(value = "/stop")
    public String stopTimer() {
//        ModelAndView modelAndView = new ModelAndView("stopView");
        return "stop";
    }

    @GetMapping(value = "/start")
    public String startTimer() {
//        ModelAndView modelAndView = new ModelAndView("startView");
        return "start";
    }

    @GetMapping(value = "/reset")
    public String resetTimer() {
//        ModelAndView modelAndView = new ModelAndView("resetView");
        return "reset";
    }
}
