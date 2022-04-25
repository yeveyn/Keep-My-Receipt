package com.ssafy.keep_my_receipt.config

import android.app.Application
import android.content.SharedPreferences
import android.text.InputFilter
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.ktx.Firebase
import com.ssafy.keep_my_receipt.util.SharedPreferencesUtil
import java.util.regex.Pattern

class ApplicationClass : Application() {

    // 코틀린의 전역변수 문법
    companion object {
        // 만들어져있는 SharedPreferences 를 사용해야합니다. 재생성하지 않도록 유념해주세요
        lateinit var sSharedPreferences: SharedPreferencesUtil

        const val SHARED_PREFERENCES_NAME = "cursed_animal_random_chat"
        lateinit var database : FirebaseDatabase
        lateinit var databaseRef : DatabaseReference
        lateinit var patternFilter: Array<InputFilter>
    }

    override fun onCreate() {
        super.onCreate()
        sSharedPreferences = SharedPreferencesUtil(applicationContext)

        database = FirebaseDatabase.getInstance()
        databaseRef = database.reference

        patternFilter = arrayOf(
            InputFilter { src, start, end, dst, dstart, dend ->
                val ps = Pattern.compile("^[a-zA-Z0-9]*$")
                if (!ps.matcher(src).matches()) {
                    return@InputFilter ""
                } else{
                    return@InputFilter null
                }
            }
        )
    }
}