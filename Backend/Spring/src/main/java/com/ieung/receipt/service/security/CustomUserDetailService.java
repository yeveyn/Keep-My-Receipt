package com.ieung.receipt.service.security;


import com.ieung.receipt.entity.User;
import com.ieung.receipt.service.SignService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {

    private final SignService signService;

    @Override
    public UserDetails loadUserByUsername(String userPk){
        User user = null;
        try {
            user = signService.findUserById(Long.valueOf(userPk));
        } catch (Exception e){
            e.printStackTrace();
        }

        return user;
    }
}
