package com.example.backend.dto;

import com.example.backend.entity.User;
import lombok.Data;

@Data
public class UserDTO {
    private String id;
    private String email;
    private String name;

    public UserDTO() {}

    public UserDTO(User user) {
        this.id = String.valueOf(user.getId());
        this.email = user.getEmail();
        this.name = user.getName();
    }
}