package com.retroplay

import android.content.Context
import android.os.Environment

import android.widget.FrameLayout
import com.swordfish.libretrodroid.GLRetroViewData
import com.swordfish.libretrodroid.GLRetroView
import com.swordfish.libretrodroid.AspectRatioGLSurfaceView
import com.retroplay.GameView
import com.swordfish.radialgamepad.library.RadialGamePad
import android.view.LayoutInflater
import com.retroplay.VirtualGamePadConfigs
import android.view.View.OnTouchListener
import androidx.lifecycle.Lifecycle
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.retroplay.RNGameManager

class GameView(context: Context?, lifecycle: Lifecycle, romName: String?, coreName: String?) :
    FrameLayout(
        context!!
    ) {
    var data: GLRetroViewData

    init {
        data = GLRetroViewData(context!!)
        data.coreFilePath = "libmgba_libretro_android.so"
        data.gameFilePath =
            context.getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS).toString() + "/example.gba"
        data.gameFileBytes = null
        data.rumbleEventsEnabled = true
        data.preferLowLatencyAudio = true
        val retroView = GLRetroView(context, data)
        retroView.id = R.id.gl_retro_view
        retroView.setResizeMode(AspectRatioGLSurfaceView.RESIZE_MODE_FILL)
        //        DisplayMetrics metrics = new DisplayMetrics();
//       context.getDisplay().getMetrics(metrics);
//        retroView.setMinimumHeight(metrics.heightPixels);
//        retroView.setMinimumWidth(metrics.widthPixels);

//        this.layout(0,0,500,500);
        // this.setBackgroundColor(Color.GREEN);
        lifecycle.addObserver(retroView)
        this.addView(retroView)
    }
}