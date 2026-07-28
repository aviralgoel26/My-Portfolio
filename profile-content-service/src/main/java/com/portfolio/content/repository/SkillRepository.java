package com.portfolio.content.repository;

import com.portfolio.content.model.Skill;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SkillRepository extends MongoRepository<Skill, String> {
    List<Skill> findByCategory(String category);
    List<Skill> findAllByOrderByDisplayOrderAsc();
}
