package com.packinglist.service;

import com.packinglist.model.User;
import com.packinglist.repository.UserRepository;
import com.packinglist.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    public User registerUser(User user) {
        // Simple validations
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists!");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }
        
        // Force role to CLIENT for all public signups (real-time security)
        user.setRole("CLIENT");

        // NOTE: For simplicity in this basic setup, password is saved in plain text.
        // In production, always encode the password using BCrypt or another password encoder.
        return userRepository.save(user);
    }

    public Optional<User> login(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getClientsOnly() {
        return userRepository.findByRole("CLIENT");
    }

    public void removeUser(String userId) {
        // Delete user record
        userRepository.deleteById(userId);
        // Cascade delete: Remove all packing list items created by this user
        itemRepository.deleteByUserId(userId);
    }
}
