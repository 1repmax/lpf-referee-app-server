package com.mpi.lpfrefereeappserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Raivo Lapins on 11/22/2021
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vote {

    private String position;
    private String decision;

}
