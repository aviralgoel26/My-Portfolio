package com.portfolio.content.repository;

import com.portfolio.content.model.Experience;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ExperienceRepository extends MongoRepository<Experience, String> {
    List<Experience> findAllByOrderByDisplayOrderAsc();
    List<Experience> findByCurrentTrue();
}
