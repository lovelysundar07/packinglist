package com.packinglist.controller;

import com.packinglist.model.User;
import com.packinglist.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(originPatterns = {"http://localhost:5173", "http://127.0.0.1:5173", "https://*.vercel.app"}, allowCredentials = "true")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Get all users (Clients and Admins)
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        // Clear passwords for security
        users.forEach(user -> user.setPassword(null));
        return ResponseEntity.ok(users);
    }

    // Delete a user (Cascade deletes items)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        try {
            userService.removeUser(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User deleted successfully, and their items were removed.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
