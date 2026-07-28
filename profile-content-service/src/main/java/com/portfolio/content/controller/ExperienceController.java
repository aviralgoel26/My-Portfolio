package com.portfolio.content.controller;

import com.portfolio.content.model.Experience;
import com.portfolio.content.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content/experiences")
@RequiredArgsConstructor
public class ExperienceController {

    private final ExperienceRepository experienceRepository;

    @GetMapping
    public ResponseEntity<List<Experience>> getAll() {
        return ResponseEntity.ok(experienceRepository.findAllByOrderByDisplayOrderAsc());
    }

    @PostMapping
    public ResponseEntity<Experience> create(@RequestBody Experience experience) {
        return ResponseEntity.status(HttpStatus.CREATED).body(experienceRepository.save(experience));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Experience> update(@PathVariable String id, @RequestBody Experience experience) {
        return experienceRepository.findById(id).map(existing -> {
            experience.setId(id);
            return ResponseEntity.ok(experienceRepository.save(experience));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (!experienceRepository.existsById(id)) return ResponseEntity.notFound().build();
        experienceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
