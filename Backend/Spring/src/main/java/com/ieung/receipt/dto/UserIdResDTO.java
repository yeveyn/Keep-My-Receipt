package com.ieung.receipt.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserIdResDTO {
    @Schema(description = "회원 아이디", required = true, example = "1")
    private long id;
}
