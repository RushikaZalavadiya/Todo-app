package io.ionic.todo;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.community.firebaseanalytics.FirebaseAnalytics;
import com.getcapacitor.community.firebaserc.FirebaseRemoteConfig;


public class MainActivity extends BridgeActivity {
    @Override
    protected  void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        registerPlugin(FirebaseAnalytics.class);
        registerPlugin(FirebaseRemoteConfig.class);
    }
}
