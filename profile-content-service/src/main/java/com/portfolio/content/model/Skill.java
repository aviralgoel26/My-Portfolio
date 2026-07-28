package com.portfolio.content.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "skills")
public class Skill {

    @Id
    private String id;

    private String name;
    private String category;  // e.g. "Backend", "Frontend", "DevOps", "Tools"
    private String iconUrl;
    private int proficiencyLevel; // 1-100
    private int displayOrder;
    private boolean featured;
}
