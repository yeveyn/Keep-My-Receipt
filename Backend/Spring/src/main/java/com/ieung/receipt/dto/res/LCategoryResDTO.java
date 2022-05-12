package com.ieung.receipt.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LCategoryResDTO {
    @Schema(description = "대분류 유형")
    private String lcType;

    @Schema(description = "대분류 이름")
    private String lcName;
}
