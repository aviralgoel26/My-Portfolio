package com.portfolio.media.storage;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class CloudinaryStorageImpl implements StorageStrategy {

    private final Cloudinary cloudinary;

    @Override
    public UploadResult upload(MultipartFile file, String folder) throws Exception {
        @SuppressWarnings("unchecked")
        Map<String, Object> result = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "folder", folder != null ? folder : "portfolio",
                        "resource_type", "auto",
                        "use_filename", true,
                        "unique_filename", true
                )
        );

        String url = (String) result.get("secure_url");
        String publicId = (String) result.get("public_id");

        log.info("Uploaded file to Cloudinary: {} -> {}", file.getOriginalFilename(), url);
        return new UploadResult(url, publicId);
    }

    @Override
    public void delete(String publicId) throws Exception {
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        log.info("Deleted Cloudinary asset: {}", publicId);
    }
}
