package com.portfolio.content.repository;

import com.portfolio.content.model.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface BlogRepository extends MongoRepository<Blog, String> {
    List<Blog> findByPublishedTrueOrderByCreatedAtDesc();
    Optional<Blog> findBySlug(String slug);
    List<Blog> findAllByOrderByCreatedAtDesc();
}
