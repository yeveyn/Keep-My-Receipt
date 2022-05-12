package com.ieung.receipt.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LCategoryReqDTO {
    //대분류 유형
    @NotBlank
    @Schema(description = "대분류 유형(자산, 예산, 지출, 수입)")
    private String lCategoryType;

    //대분류 이름
    @NotBlank
    @Schema(description = "태그 이름", required = true)
    private String tagName;
}
