package com.packinglist.service;

import com.packinglist.model.PackingItem;
import com.packinglist.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<PackingItem> getItemsByUserId(String userId) {
        return itemRepository.findByUserId(userId);
    }

    public PackingItem addItem(PackingItem item) {
        return itemRepository.save(item);
    }

    public PackingItem updateItem(String itemId, PackingItem updatedItem) {
        Optional<PackingItem> optionalItem = itemRepository.findById(itemId);
        if (optionalItem.isPresent()) {
            PackingItem item = optionalItem.get();
            item.setName(updatedItem.getName());
            item.setQuantity(updatedItem.getQuantity());
            item.setPacked(updatedItem.isPacked());
            return itemRepository.save(item);
        } else {
            throw new RuntimeException("Item not found with id: " + itemId);
        }
    }

    public void deleteItem(String itemId) {
        itemRepository.deleteById(itemId);
    }
}
