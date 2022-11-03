package com.retroplay;

import android.content.Context;
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
        data.setGameFilePath(this.getContext().getFilesDir()+ "/example.gba");
        data.setGameFileBytes(null);

        data.setRumbleEventsEnabled(false);
        data.setPreferLowLatencyAudio(true);
       GLRetroView retroView = new GLRetroView(context,data);

       lifecycle.addObserver(retroView);
       this.addView(retroView);

    }
}