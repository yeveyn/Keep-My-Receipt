package com.ssafy.keep_my_receipt.util

import android.content.Context
import android.content.SharedPreferences
import com.ssafy.keep_my_receipt.config.ApplicationClass

class SharedPreferencesUtil(context: Context) {
    private var preferences: SharedPreferences = context.getSharedPreferences(ApplicationClass.SHARED_PREFERENCES_NAME, Context.MODE_PRIVATE)

    fun setToken(token: String) {
        val editor = preferences.edit()
        editor.putString("token", token)
        editor.apply()
    }

    fun getToken(): String {
        return preferences.getString("token", "default")!!;
    }

    fun setAutoLogin(status:Boolean){
        val editor = preferences.edit()
        editor.putBoolean("autologin", status)
        editor.apply()
    }

    fun getAutoLogin() :Boolean {
        return preferences.getBoolean("autologin", false)
    }

}