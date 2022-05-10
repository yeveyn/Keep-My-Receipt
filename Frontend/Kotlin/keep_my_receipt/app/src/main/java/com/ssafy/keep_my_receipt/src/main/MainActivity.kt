package com.ssafy.keep_my_receipt.src.main

import android.util.Log
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import com.google.android.gms.tasks.OnCompleteListener
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.firebase.messaging.FirebaseMessaging
import com.ssafy.keep_my_receipt.R
import com.ssafy.keep_my_receipt.config.BaseActivity
import com.ssafy.keep_my_receipt.databinding.ActivityMainBinding
import kotlinx.android.synthetic.main.activity_main.*
import com.ssafy.keep_my_receipt.src.main.WebAppInterface
import com.ssafy.keep_my_receipt.config.ApplicationClass
class MainActivity : BaseActivity<ActivityMainBinding>(R.layout.activity_main) {
    private var alarmed: String? = null
    private lateinit var webView: WebView
    //private lateinit var bottomNavigationView: BottomNavigationView

    override fun onStart() {
        super.onStart()
        initStatus()

        setWebView()
        //setBottomNav()
        setFCM()
    }

    override fun onBackPressed() {
        if(webView.canGoBack()) {
            //웹사이트에서 뒤로 갈 페이지가 존재한다면,
            webView.goBack() // 웹사이트 뒤로가기
        }else
        {
            super.onBackPressed()
        }
    }

    private fun initStatus() {
        webView = binding.webview
        //bottomNavigationView = binding.bottomNavigationView
    }

    private fun setWebView() {
        webView.settings.javaScriptEnabled = true // 자바스크립트 허용
        webView.webViewClient = WebViewClient() // 웹뷰에서 새 창이 뜨지 않도록 방지하는 구문 1
        webView.webChromeClient = WebChromeClient() // 웹뷰에서 새 창이 뜨지 않도록 방지하는 구문 1
        webview.addJavascriptInterface(WebAppInterface(this), "Android")
        webView.loadUrl("http://k6d104.p.ssafy.io/")
    }

//    private fun setBottomNav() {
//        //바텀 네비개이션 뷰 가져오기
//        bottomNavigationView.setOnItemSelectedListener {
//            when(it.itemId){
//                R.id.book-> {
//                    Log.d("메인 액티비티 BottomNav","장부 클릭")
//                    webView.loadUrl("http://k6d104.p.ssafy.io/receipt/requestList")
//                    return@setOnItemSelectedListener true
//                }
//
//                R.id.chart-> {
//                    Log.d("메인 액티비티 BottomNav","차트 클릭")
//                    webView.loadUrl("https://www.example.com")
//                    return@setOnItemSelectedListener true
//                }
//
//                R.id.add-> {
//                    Log.d("메인 액티비티 BottomNav","거래내역 추가 클릭")
//                    webView.loadUrl("https://www.daum.net")
//                    return@setOnItemSelectedListener true
//                }
//                R.id.members-> {
//                    Log.d("메인 액티비티 BottomNav","멤버관리 클릭")
//                    return@setOnItemSelectedListener true
//                }
//                R.id.report-> {
//                    Log.d("메인 액티비티 BottomNav","보고서 클릭")
//                    return@setOnItemSelectedListener true
//                }
//            }
//            false
//        }
//    }

    private fun setFCM() {
        // client FCM token 확인
        FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
            if (!task.isSuccessful) {
                Log.w("Fetching FCM token fail", task.exception)
                return@OnCompleteListener
            }

            val token = task.result
            ApplicationClass.sSharedPreferences.setToken(token)
            //Log.d("FCM client token", token)
        })

        alarmed = intent.extras.toString()
        if (alarmed != null) {
            //Todo url 파라미터 설정
            webView.loadUrl("http://k6d104.p.ssafy.io/")
        }
    }
}