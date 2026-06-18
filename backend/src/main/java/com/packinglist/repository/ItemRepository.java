package com.packinglist.repository;

import com.packinglist.model.PackingItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends MongoRepository<PackingItem, String> {
    List<PackingItem> findByUserId(String userId);
    void deleteByUserId(String userId);
}
