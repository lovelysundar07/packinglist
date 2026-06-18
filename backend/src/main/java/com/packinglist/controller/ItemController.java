package com.packinglist.controller;

import com.packinglist.model.PackingItem;
import com.packinglist.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    // Get all items for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PackingItem>> getItemsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(itemService.getItemsByUserId(userId));
    }

    // Add a new item to the user's packing list
    @PostMapping
    public ResponseEntity<PackingItem> addItem(@RequestBody PackingItem item) {
        return ResponseEntity.ok(itemService.addItem(item));
    }

    // Update an existing packing item (packed status, name, quantity)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateItem(@PathVariable String id, @RequestBody PackingItem item) {
        try {
            PackingItem updated = itemService.updateItem(id, item);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    // Delete a packing item
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable String id) {
        try {
            itemService.deleteItem(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Item deleted successfully.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
