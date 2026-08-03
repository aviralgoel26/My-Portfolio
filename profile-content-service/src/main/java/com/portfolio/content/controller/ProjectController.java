package com.portfolio.content.controller;

import com.portfolio.content.kafka.AnalyticsEventPublisher;
import com.portfolio.content.model.Project;
import com.portfolio.content.repository.ProjectRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final AnalyticsEventPublisher eventProducer;

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects(HttpServletRequest request) {
        eventProducer.publishPageView("/projects", request.getRemoteAddr(), request.getHeader("User-Agent"));
        return ResponseEntity.ok(projectRepository.findAllByOrderByDisplayOrderAsc());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Project>> getFeaturedProjects() {
        return ResponseEntity.ok(projectRepository.findByFeaturedTrueOrderByDisplayOrderAsc());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable String id, HttpServletRequest request) {
        return projectRepository.findById(id).map(project -> {
            eventProducer.publishProjectView(id, project.getTitle());
            return ResponseEntity.ok(project);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody Project project) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectRepository.save(project));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable String id, @RequestBody Project project) {
        return projectRepository.findById(id).map(existing -> {
            project.setId(id);
            return ResponseEntity.ok(projectRepository.save(project));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable String id) {
        if (!projectRepository.existsById(id)) return ResponseEntity.notFound().build();
        projectRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
