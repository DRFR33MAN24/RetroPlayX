package com.retroplay;

import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.os.Environment;
import android.util.DisplayMetrics;
import android.view.Display;
import android.widget.FrameLayout;

import androidx.lifecycle.Lifecycle;

import com.swordfish.libretrodroid.GLRetroView;
import com.swordfish.libretrodroid.GLRetroViewData;

public class GameView extends FrameLayout {
    GLRetroViewData data;
    public GameView(Context context, Lifecycle lifecycle,String romName,String coreName){
        super(context);

        data = new GLRetroViewData(context);
        data.setCoreFilePath("libmgba_libretro_android.so");
        data.setGameFilePath(this.getContext().getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS)+ "/example.gba");
        data.setGameFileBytes(null);


        data.setRumbleEventsEnabled(false);
        data.setPreferLowLatencyAudio(true);
       GLRetroView retroView = new GLRetroView(context,data);
        DisplayMetrics metrics = new DisplayMetrics();
       context.getDisplay().getMetrics(metrics);
        retroView.setMinimumHeight(metrics.heightPixels);
        retroView.setMinimumWidth(metrics.widthPixels);

//        this.layout(0,0,500,500);
       // this.setBackgroundColor(Color.GREEN);
       lifecycle.addObserver(retroView);
       this.addView(retroView);

    }
}