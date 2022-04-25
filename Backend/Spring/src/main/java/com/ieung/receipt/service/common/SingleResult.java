package com.ieung.receipt.service.common;


import com.ieung.receipt.service.common.CommonResult;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SingleResult<T> extends CommonResult {
    private T data;

}
