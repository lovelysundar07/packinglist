package com.packinglist.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "packing_items")
public class PackingItem {
    @Id
    private String id;
    private String name;
    private int quantity;
    private boolean packed;
    private String userId; // Links the item to a specific User
}
