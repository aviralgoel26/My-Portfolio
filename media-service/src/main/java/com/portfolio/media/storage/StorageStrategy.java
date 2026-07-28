package com.portfolio.media.storage;

import org.springframework.web.multipart.MultipartFile;

public interface StorageStrategy {
    /**
     * Upload a file and return its public URL.
     */
    UploadResult upload(MultipartFile file, String folder) throws Exception;

    /**
     * Delete a file by its provider-specific ID.
     */
    void delete(String publicId) throws Exception;

    record UploadResult(String url, String publicId) {}
}
