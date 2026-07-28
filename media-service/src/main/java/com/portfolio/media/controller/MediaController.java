package com.portfolio.media.controller;

import com.portfolio.media.model.MediaAsset;
import com.portfolio.media.repository.MediaAssetRepository;
import com.portfolio.media.storage.StorageStrategy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
public class MediaController {

    private final StorageStrategy storageStrategy;
    private final MediaAssetRepository mediaAssetRepository;

    @PostMapping("/upload")
    public ResponseEntity<MediaAsset> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", required = false) String folder,
            HttpServletRequest request) {

        try {
            StorageStrategy.UploadResult result = storageStrategy.upload(file, folder);

            // X-User-Id is injected by the Gateway JWT filter
            String uploadedBy = request.getHeader("X-User-Id");

            MediaAsset asset = MediaAsset.builder()
                    .fileName(result.publicId()) // Use public ID or generated name
                    .originalFileName(file.getOriginalFilename())
                    .mimeType(file.getContentType())
                    .url(result.url())
                    .publicId(result.publicId())
                    .sizeBytes(file.getSize())
                    .uploadedBy(uploadedBy)
                    .build();

            asset = mediaAssetRepository.save(asset);
            return ResponseEntity.status(HttpStatus.CREATED).body(asset);

        } catch (Exception e) {
            log.error("File upload failed: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<MediaAsset>> getAll() {
        return ResponseEntity.ok(mediaAssetRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        return mediaAssetRepository.findById(id).map(asset -> {
            try {
                if (asset.getPublicId() != null) {
                    storageStrategy.delete(asset.getPublicId());
                }
                mediaAssetRepository.delete(asset);
                return ResponseEntity.noContent().<Void>build();
            } catch (Exception e) {
                log.error("Failed to delete asset {}: {}", id, e.getMessage(), e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).<Void>build();
            }
        }).orElse(ResponseEntity.notFound().build());
    }
}
