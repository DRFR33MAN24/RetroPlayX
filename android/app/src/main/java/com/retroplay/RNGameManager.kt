package com.retroplay

import android.content.Context
import android.view.*

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewGroupManager
import android.widget.FrameLayout
import com.retroplay.RNGameManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.annotations.ReactPropGroup
import com.retroplay.GameFragment
import androidx.fragment.app.FragmentActivity
import com.facebook.react.common.MapBuilder
import com.swordfish.libretrodroid.GLRetroView

//import com.swordfish.libretrodroid.GLRetroView;
//import com.swordfish.libretrodroid.GLRetroViewData;
class RNGameManager(var mCallerContext: ReactApplicationContext) : ViewGroupManager<FrameLayout>() {
    val COMMAND_CREATE = 1
    private var propWidth = 0
    private var propHeight = 0
    override fun getName(): String {
        return REACT_CLASS
    }

    public override fun createViewInstance(context: ThemedReactContext): FrameLayout {
        val inflater =
            context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        return inflater.inflate(R.layout.game_fragment, null) as FrameLayout
    }

    /**
     * Map the "captureImage" command to an integer
     */
    override fun getCommandsMap(): Map<String, Int>? {
        return MapBuilder.of("create", COMMAND_CREATE)
    }

    /**
     * Handle "captureImage" command called from JS
     */
    override fun receiveCommand(root: FrameLayout, commandId: String, args: ReadableArray?) {
        super.receiveCommand(root, commandId, args)
        val reactNativeViewId = args!!.getInt(0)
        val romID = args.getString(1)
        val coreName = args.getString(2)
        val commandIdInt = commandId.toInt()
        when (commandIdInt) {
            COMMAND_CREATE -> createFragment(root, reactNativeViewId, romID, coreName)
            else -> {}
        }
    }

    @ReactPropGroup(names = ["width", "height"], customType = "Style")
    fun setStyle(view: FrameLayout?, index: Int, value: Int) {
        if (index == 0) {
            propWidth = value
        }
        if (index == 1) {
            propHeight = value
        }
    }

    /**
     * Replace your React Native view with a custom fragment
     */
    fun createFragment(
        root: FrameLayout,
        reactNativeViewId: Int,
        romID: String?,
        coreName: String?
    ) {
        val parentView = root.findViewById<View>(reactNativeViewId) as ViewGroup
        setupLayout(parentView)
        val gameFragment = GameFragment(romID, coreName)
        val activity = mCallerContext.currentActivity as FragmentActivity?
        activity!!.supportFragmentManager
            .beginTransaction()
            .replace(reactNativeViewId, gameFragment, reactNativeViewId.toString())
            .commit()
    }

    fun setupLayout(view: View) {
        Choreographer.getInstance().postFrameCallback(object : Choreographer.FrameCallback {
            override fun doFrame(frameTimeNanos: Long) {
                manuallyLayoutChildren(view)
                view.viewTreeObserver.dispatchOnGlobalLayout()
                Choreographer.getInstance().postFrameCallback(this)
            }
        })
    }

    /**
     * Layout all children properly
     */
    fun manuallyLayoutChildren(view: View) {
        // propWidth and propHeight coming from react-native props
        val width = 500
        val height = 500
        val metrics = mCallerContext.currentActivity!!.windowManager.defaultDisplay
        view.measure(
            View.MeasureSpec.makeMeasureSpec(metrics.width, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(metrics.height, View.MeasureSpec.EXACTLY)
        )
        view.layout(0, 0, metrics.width, metrics.height)
        //view.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    }

    fun onKeyEventDown(keyCode: Int, event: KeyEvent) {
        val game_view =
            mCallerContext.currentActivity!!.findViewById<View>(R.id.gl_retro_view) as GLRetroView
        game_view?.sendKeyEvent(event.action, keyCode, 0)
    }

    fun onKeyEventUp(keyCode: Int, event: KeyEvent) {
        val game_view =
            mCallerContext.currentActivity!!.findViewById<View>(R.id.gl_retro_view) as GLRetroView
        game_view?.sendKeyEvent(event.action, keyCode, 0)
    }

    fun onGenericMotionEvent(event: MotionEvent?) {
        if (event != null) {
            sendMotionEvent(
                event,
                GLRetroView.MOTION_SOURCE_DPAD,
                MotionEvent.AXIS_HAT_X,
                MotionEvent.AXIS_HAT_Y,
                0
            )
            sendMotionEvent(
                event,
                GLRetroView.MOTION_SOURCE_ANALOG_LEFT,
                MotionEvent.AXIS_X,
                MotionEvent.AXIS_Y,
                0
            )
            sendMotionEvent(
                event,
                GLRetroView.MOTION_SOURCE_ANALOG_RIGHT,
                MotionEvent.AXIS_Z,
                MotionEvent.AXIS_RZ,
                0
            )
        }
    }

    private fun sendMotionEvent(
        event: MotionEvent,
        source: Int,
        xAxis: Int,
        yAxis: Int,
        port: Int
    ) {
        val game_view =
            mCallerContext.currentActivity!!.findViewById<View>(R.id.gl_retro_view) as GLRetroView
        game_view?.sendMotionEvent(
            source,
            event.getAxisValue(xAxis),
            event.getAxisValue(yAxis),
            port
        )
    }

    companion object {
        const val REACT_CLASS = "RNGameManager"
        @JvmStatic
        val instance: RNGameManager? = null
    }
}