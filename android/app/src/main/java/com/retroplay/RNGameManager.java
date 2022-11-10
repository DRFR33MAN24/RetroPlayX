package com.retroplay;


import android.content.Context;


import android.view.Choreographer;
import android.view.Display;
import android.view.KeyEvent;
import android.view.LayoutInflater;

import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;


import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactPropGroup;
import com.swordfish.libretrodroid.GLRetroView;
//import com.swordfish.libretrodroid.GLRetroView;
//import com.swordfish.libretrodroid.GLRetroViewData;


import java.util.Map;

public class RNGameManager extends ViewGroupManager<FrameLayout> {

    public static final String REACT_CLASS = "RNGameManager";
    private static RNGameManager instance = null;
    public final int COMMAND_CREATE = 1;
    ReactApplicationContext mCallerContext;
    private int propWidth;
    private int propHeight;


    public RNGameManager(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;


    }

    public static RNGameManager getInstance() {
        return instance;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }


    @Override
    public FrameLayout createViewInstance(ThemedReactContext context) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        FrameLayout frameLayout = (FrameLayout) inflater.inflate(R.layout.game_fragment, null);

        return frameLayout;
    }


    /**
     * Map the "captureImage" command to an integer
     */
    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("create", COMMAND_CREATE);
    }

    /**
     * Handle "captureImage" command called from JS
     */
    @Override
    public void receiveCommand(@NonNull FrameLayout root, String commandId, @Nullable ReadableArray args) {
        super.receiveCommand(root, commandId, args);
        int reactNativeViewId = args.getInt(0);
        String romID = args.getString(1);
        String coreName = args.getString(2);
        int commandIdInt = Integer.parseInt(commandId);

        switch (commandIdInt) {
            case COMMAND_CREATE:
                createFragment(root, reactNativeViewId, romID, coreName);
                break;
            default: {
            }
        }
    }

    @ReactPropGroup(names = {"width", "height"}, customType = "Style")
    public void setStyle(FrameLayout view, int index, Integer value) {
        if (index == 0) {
            propWidth = value;
        }

        if (index == 1) {
            propHeight = value;
        }
    }

    /**
     * Replace your React Native view with a custom fragment
     */
    public void createFragment(FrameLayout root, int reactNativeViewId, String romID, String coreName) {
        ViewGroup parentView = (ViewGroup) root.findViewById(reactNativeViewId);
        setupLayout(parentView);

        final GameFragment gameFragment = new GameFragment(romID, coreName);
        FragmentActivity activity = (FragmentActivity) mCallerContext.getCurrentActivity();
        activity.getSupportFragmentManager()
                .beginTransaction()
                .replace(reactNativeViewId, gameFragment, String.valueOf(reactNativeViewId))
                .commit();
    }

    public void setupLayout(View view) {
        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            @Override
            public void doFrame(long frameTimeNanos) {
                manuallyLayoutChildren(view);
                view.getViewTreeObserver().dispatchOnGlobalLayout();
                Choreographer.getInstance().postFrameCallback(this);
            }
        });
    }

    /**
     * Layout all children properly
     */
    public void manuallyLayoutChildren(View view) {
        // propWidth and propHeight coming from react-native props
        int width = 500;
        int height = 500;


        Display metrics = mCallerContext.getCurrentActivity().getWindowManager().getDefaultDisplay();

        view.measure(
                View.MeasureSpec.makeMeasureSpec(metrics.getWidth(), View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(metrics.getHeight(), View.MeasureSpec.EXACTLY));

        view.layout(0, 0, metrics.getWidth(), metrics.getHeight());
        //view.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    }


    public void onKeyEventDown(int keyCode, KeyEvent event) {
        GLRetroView game_view = (GLRetroView) mCallerContext.getCurrentActivity().findViewById(R.id.gl_retro_view);
        if (game_view != null) {
            game_view.sendKeyEvent(event.getAction(), keyCode, 0);
        }
    }

    public void onKeyEventUp(int keyCode, KeyEvent event) {
        GLRetroView game_view = (GLRetroView) mCallerContext.getCurrentActivity().findViewById(R.id.gl_retro_view);
        if (game_view != null) {
            game_view.sendKeyEvent(event.getAction(), keyCode, 0);
        }
    }

    public void onGenericMotionEvent(MotionEvent event) {
        if (event != null) {
            sendMotionEvent(
                    event,
                    GLRetroView.MOTION_SOURCE_DPAD,
                    MotionEvent.AXIS_HAT_X,
                    MotionEvent.AXIS_HAT_Y,
                    0
            );
            sendMotionEvent(
                    event,
                    GLRetroView.MOTION_SOURCE_ANALOG_LEFT,
                    MotionEvent.AXIS_X,
                    MotionEvent.AXIS_Y,
                    0
            );
            sendMotionEvent(
                    event,
                    GLRetroView.MOTION_SOURCE_ANALOG_RIGHT,
                    MotionEvent.AXIS_Z,
                    MotionEvent.AXIS_RZ,
                    0
            );
        }
    }

    private void sendMotionEvent(MotionEvent event,int source,int xAxis,int yAxis,int port){
        GLRetroView game_view = (GLRetroView) mCallerContext.getCurrentActivity().findViewById(R.id.gl_retro_view);
        if (game_view != null){
            game_view.sendMotionEvent(source,event.getAxisValue(xAxis),event.getAxisValue(yAxis),port);
        }
    }
}