package com.ssafy.keep_my_receipt.src.main

import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.text.Spannable
import android.text.SpannableStringBuilder
import android.text.style.ForegroundColorSpan
import android.util.Log
import android.widget.TextView
import com.ssafy.keep_my_receipt.R
import com.ssafy.keep_my_receipt.config.BaseActivity
import com.ssafy.keep_my_receipt.databinding.ActivityMainBinding
import com.ssafy.keep_my_receipt.util.ProgressDialog

class MainActivity : BaseActivity<ActivityMainBinding>(R.layout.activity_main) {
    private lateinit var customProgressDialog: ProgressDialog

    override fun onStart() {
        super.onStart()
        initStatus()
    }

    private fun initStatus() {
        // 로딩창
        customProgressDialog = ProgressDialog(this)
        customProgressDialog.window!!.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))

    }

//    fun setColorInPartitial(pre_string:String, string:String, color:String, textView:TextView) : TextView
//    {
//        val builder:SpannableStringBuilder = SpannableStringBuilder(pre_string + string)
//        builder.setSpan(ForegroundColorSpan (Color.parseColor(color)), 0, pre_string.length, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
//        textView.append(builder)
//        return textView
//    }
}