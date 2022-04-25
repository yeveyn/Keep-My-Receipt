package com.ssafy.keep_my_receipt.src.main
import com.ssafy.keep_my_receipt.R
import com.ssafy.keep_my_receipt.config.BaseActivity
import com.ssafy.keep_my_receipt.databinding.ActivityMainBinding

class MainActivity : BaseActivity<ActivityMainBinding>(R.layout.activity_main) {

    override fun onStart() {
        super.onStart()
        initStatus()
    }

    private fun initStatus() {
    }
}