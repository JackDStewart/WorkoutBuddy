package com.example.backend.Service;

import com.example.backend.DTO.ExerciseLogDTO;
import com.example.backend.Entity.Exercise;
import com.example.backend.Entity.ExerciseLog;
import com.example.backend.Entity.SetLog;
import com.example.backend.Entity.User;
import com.example.backend.Repository.ExerciseLogRepository;
import com.example.backend.Repository.ExerciseRepository;
import com.example.backend.Repository.SetLogRepository;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ExerciseLogService {

    private final ExerciseLogRepository exerciseLogRepository;
    private final SetLogRepository setLogRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;

    @Autowired
    public ExerciseLogService(ExerciseLogRepository exerciseLogRepository, SetLogRepository setLogRepository, ExerciseRepository exerciseRepository, UserRepository userRepository) {
        this.exerciseLogRepository = exerciseLogRepository;
        this.setLogRepository = setLogRepository;
        this.exerciseRepository = exerciseRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public List<ExerciseLog> saveAll(List<ExerciseLogDTO> exerciseLogDTOs) {
        List<ExerciseLog> exerciseLogs = new ArrayList<>();

        for (ExerciseLogDTO exerciseLogDTO : exerciseLogDTOs) {
            ExerciseLog exerciseLog = new ExerciseLog();
            exerciseLog.setDate(exerciseLogDTO.getDate());

            BigInteger auth0idInt = new BigInteger(exerciseLogDTO.getUserAuth0Id().substring(14));
            Optional<User> userOptional = userRepository.findById(auth0idInt);
            if (userOptional.isEmpty()) {
                throw new RuntimeException("User not found with Auth0 ID: " + auth0idInt);
            }
            User user = userOptional.get();
            exerciseLog.setUser(user);

            // Fetch or create Exercise
            Exercise exercise = exerciseRepository.findByName(exerciseLogDTO.getExercise().getName())
                    .orElseGet(() -> {
                        Exercise newExercise = new Exercise();
                        newExercise.setName(exerciseLogDTO.getExercise().getName());
                        newExercise.setEquipment(exerciseLogDTO.getExercise().getEquipment());
                        newExercise.setMuscleGroup(exerciseLogDTO.getExercise().getMuscleGroup());
                        return newExercise;
                    });
            exerciseLog.setExercise(exercise);
            exerciseRepository.save(exercise);

            // Convert DTO sets to SetLog entities and associate with ExerciseLog
            Set<SetLog> setLogs = exerciseLogDTO.getSets().stream()
                    .map(dto -> {
                        SetLog setLog = new SetLog();
                        setLog.setReps(dto.getReps());
                        setLog.setWeight(dto.getWeight());
                        return setLog;
                    })
                    .collect(Collectors.toSet());

            setLogRepository.saveAll(setLogs);

            exerciseLog.setSets(setLogs);
            exerciseLogs.add(exerciseLog);
        }

        // Save ExerciseLogs with cascade save for SetLogs
        return (List<ExerciseLog>) exerciseLogRepository.saveAll(exerciseLogs);
    }
}