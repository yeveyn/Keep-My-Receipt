package com.ssafy.keep_my_receipt.src.main

import android.content.Context
import android.webkit.JavascriptInterface
import com.ssafy.keep_my_receipt.config.ApplicationClass

class WebAppInterface(private val mContext: Context) {

    @JavascriptInterface
    fun requestToken(): String {
        return ApplicationClass.sSharedPreferences.getToken()
    }

}