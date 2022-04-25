package com.ieung.receipt.repository;

import com.ieung.receipt.code.JoinCode;
import com.ieung.receipt.code.YNCode;
import com.ieung.receipt.entity.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepoCommon {
    User findUserLogin(String uid, JoinCode type);

    User findByUid(String uid, YNCode isBind);

}






































