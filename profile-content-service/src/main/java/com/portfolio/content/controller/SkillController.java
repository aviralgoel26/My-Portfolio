package com.portfolio.content.controller;

import com.portfolio.content.model.Skill;
import com.portfolio.content.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillRepository skillRepository;

    @GetMapping
    public ResponseEntity<List<Skill>> getAll() {
        return ResponseEntity.ok(skillRepository.findAllByOrderByDisplayOrderAsc());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Skill>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(skillRepository.findByCategory(category));
    }

    @PostMapping
    public ResponseEntity<Skill> create(@RequestBody Skill skill) {
        return ResponseEntity.status(HttpStatus.CREATED).body(skillRepository.save(skill));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> update(@PathVariable String id, @RequestBody Skill skill) {
        return skillRepository.findById(id).map(existing -> {
            skill.setId(id);
            return ResponseEntity.ok(skillRepository.save(skill));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (!skillRepository.existsById(id)) return ResponseEntity.notFound().build();
        skillRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
