package com.portfolio.content.repository;

import com.portfolio.content.model.Education;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface EducationRepository extends MongoRepository<Education, String> {
    List<Education> findAllByOrderByDisplayOrderAsc();
}
