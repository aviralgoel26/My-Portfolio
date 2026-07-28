package com.portfolio.content.controller;

import com.portfolio.content.model.Blog;
import com.portfolio.content.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogRepository blogRepository;

    @GetMapping
    public ResponseEntity<List<Blog>> getPublished() {
        return ResponseEntity.ok(blogRepository.findByPublishedTrueOrderByCreatedAtDesc());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Blog>> getAll() {
        return ResponseEntity.ok(blogRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<Blog> getBySlug(@PathVariable String slug) {
        return blogRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getById(@PathVariable String id) {
        return blogRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Blog> create(@RequestBody Blog blog) {
        return ResponseEntity.status(HttpStatus.CREATED).body(blogRepository.save(blog));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> update(@PathVariable String id, @RequestBody Blog blog) {
        return blogRepository.findById(id).map(existing -> {
            blog.setId(id);
            return ResponseEntity.ok(blogRepository.save(blog));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (!blogRepository.existsById(id)) return ResponseEntity.notFound().build();
        blogRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
