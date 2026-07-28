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
@Document(collection = "education")
public class Education {

    @Id
    private String id;

    private String institution;
    private String degree;
    private String field;
    private String startYear;
    private String endYear;
    private String grade;
    private String description;
    private String institutionLogoUrl;
    private int displayOrder;
}
