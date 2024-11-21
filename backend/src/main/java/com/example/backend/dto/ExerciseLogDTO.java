package com.example.backend.dto;

import com.example.backend.entity.ExerciseLog;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Setter
@Getter
public class ExerciseLogDTO {
    private Set<SetLogDTO> sets;
    private Date date;
    private ExerciseDTO exercise;
    private String userAuth0Id;


}
