package com.portfolio.content.controller;

import com.portfolio.content.model.Education;
import com.portfolio.content.repository.EducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content/education")
@RequiredArgsConstructor
public class EducationController {

    private final EducationRepository educationRepository;

    @GetMapping
    public ResponseEntity<List<Education>> getAll() {
        return ResponseEntity.ok(educationRepository.findAllByOrderByDisplayOrderAsc());
    }

    @PostMapping
    public ResponseEntity<Education> create(@RequestBody Education education) {
        return ResponseEntity.status(HttpStatus.CREATED).body(educationRepository.save(education));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Education> update(@PathVariable String id, @RequestBody Education education) {
        return educationRepository.findById(id).map(existing -> {
            education.setId(id);
            return ResponseEntity.ok(educationRepository.save(education));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (!educationRepository.existsById(id)) return ResponseEntity.notFound().build();
        educationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
