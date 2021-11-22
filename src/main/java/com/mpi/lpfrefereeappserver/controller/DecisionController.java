package com.mpi.lpfrefereeappserver.controller;

import com.mpi.lpfrefereeappserver.model.Vote;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author Raivo Lapins on 11/22/2021
 */
@RestController
@RequestMapping("${api.endpoint.decision}")
public class DecisionController {

    @GetMapping(value = "/vote")
    public Vote castVote(@RequestBody Vote vote) {
//        ModelAndView modelAndView = new ModelAndView("stopView");
        return vote;
    }
}
