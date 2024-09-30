package com.ReadCorner.Library.util.Cloud;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    @Value("${cloudinary.folder}")
    private String folder;

    public String uploadImage(MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            // Generate UUID for the file
            String uuid = UUID.randomUUID().toString();
            // Extract the original file name and remove the extension
            String originalFileName = file.getOriginalFilename();
            String fileNameWithoutExtension = originalFileName != null ? originalFileName.split("\\.")[0] : "file";
            // Construct the file name using UUID and original name without extension
            String fileName = fileNameWithoutExtension + "_" + uuid;
            // Upload the file to Cloudinary with folder and file name
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("folder", folder, "public_id", fileName));
            return uploadResult.get("url").toString();
        }
        return null;
    }

    public void deleteImage(String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }


    public String getPublicIdFromUrl(String url) {

        // Extract the path part of the URL
        String[] parts = url.split("/v\\d+/");
        if (parts.length < 2) {
            return null;
        }
        String path = parts[1];
        String fileName = path.split("\\.")[0];
        return fileName;
    }
}
