package com.ssafy.keep_my_receipt.util

import android.content.Context
import android.content.SharedPreferences
import com.ssafy.keep_my_receipt.config.ApplicationClass

class SharedPreferencesUtil(context: Context) {
    private var preferences: SharedPreferences = context.getSharedPreferences(ApplicationClass.SHARED_PREFERENCES_NAME, Context.MODE_PRIVATE)

    fun addUser(id: String) {
        val editor = preferences.edit()
        editor.putString("id", id)
        editor.apply()
    }

    fun getUserId(): String {
        return preferences.getString("id", "default")!!;
    }

    fun setAutoLogin(status:Boolean){
        val editor = preferences.edit()
        editor.putBoolean("autologin", status)
        editor.apply()
    }

    fun getAutoLogin() :Boolean {
        return preferences.getBoolean("autologin", false)
    }

    fun setChatPush(status: Boolean){
        val editor = preferences.edit()
        editor.putBoolean("chatPush", status)
        editor.apply()
    }

    fun getChatPush(): Boolean{
        return preferences.getBoolean("chatPush", true)
    }

    fun setEvalPush(status: Boolean){
        val editor = preferences.edit()
        editor.putBoolean("evalPush", status)
        editor.apply()
    }

    fun getEvalPush(): Boolean{
        return preferences.getBoolean("evalPush", true)
    }

}