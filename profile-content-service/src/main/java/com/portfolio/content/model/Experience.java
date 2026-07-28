package com.portfolio.content.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "experiences")
public class Experience {

    @Id
    private String id;

    private String company;
    private String role;
    private String location;
    private String startDate;  // e.g. "Jan 2023"
    private String endDate;    // e.g. "Present"
    private boolean current;
    private String description;
    private List<String> highlights;
    private String companyLogoUrl;
    private int displayOrder;
}
