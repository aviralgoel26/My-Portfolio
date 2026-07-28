package com.portfolio.content.repository;

import com.portfolio.content.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByFeaturedTrueOrderByDisplayOrderAsc();
    List<Project> findAllByOrderByDisplayOrderAsc();
}
