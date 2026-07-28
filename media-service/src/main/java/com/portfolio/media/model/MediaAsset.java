package com.portfolio.media.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "media_assets")
public class MediaAsset {

    @Id
    private String id;

    private String fileName;
    private String originalFileName;
    private String mimeType;
    private String url;
    private String publicId;    // Cloudinary public_id for deletion
    private long sizeBytes;
    private String uploadedBy;  // user ID from JWT header

    @Builder.Default
    private Instant createdAt = Instant.now();
}
