package com.example.backend;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity // This tells Hibernate to make a table out of this class
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	private String name;

	private String email;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "exerciseLog_id") // Foreign key in SetLog table
	private Set<ExerciseLog> exerciseLogs;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "workout_id") // Foreign key in SetLog table
	private Set<Workout> workouts;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
