package com.mpi.lpfrefereeappserver.controller;

import com.mpi.lpfrefereeappserver.model.Vote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

/**
 * @author Raivo Lapins on 11/22/2021
 */
@RestController
@RequestMapping("${api.endpoint.decision}")
public class DecisionController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping(value = "/vote")
    public Vote castVote(@RequestBody Vote vote) {
        simpMessagingTemplate.convertAndSend("/api/votes", vote);
        return vote;
    }
}
