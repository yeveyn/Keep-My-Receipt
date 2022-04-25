package com.ieung.receipt.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignUpReqDTO {
    @NotBlank
    @Schema(description = "uid (일반회원:아이디, sns로그인:uid값)", required = true, example = "kakao123")
    private String uid;

    @NotNull
    @Pattern(regexp = "^(none|sns)$")
    @Schema(description = "회원가입 타입 (none, sns)", required = true, example = "sns")
    private String type;

    @NotBlank
    @Schema(description = "비밀번호", required = true, example = "123")
    private String password;

    @Schema(description = "이름", required = false, example = "카카오")
    private String name;

    @Schema(description = "이메일", required = false, example = "kakao123@test.com")
    private String email;

    @Schema(description = "핸드폰번호('-'값 없이 입력)", required = false, example = "01012345678")
    private String phone;

    @Schema(description = "주소", required = false, example = "")
    private String address;

    @Schema(description = "상세주소", required = false, example = "")
    private String addressDetail;
}
