package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
public class ExerciseLogDTO {
    @Setter
    private Set<SetLogDTO> sets;
    @Setter
    private Date date;
    @Setter
    private ExerciseDTO exercise;
    private String userAuth0Id;

}
