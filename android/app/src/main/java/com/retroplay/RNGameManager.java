package com.retroplay;


import android.content.Context;


import android.view.Choreographer;
import android.view.Display;
import android.view.LayoutInflater;

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
//import com.swordfish.libretrodroid.GLRetroView;
//import com.swordfish.libretrodroid.GLRetroViewData;


import java.util.Map;

public class RNGameManager extends ViewGroupManager<FrameLayout> {

    public static final String REACT_CLASS = "RNGameManager";

    public final int COMMAND_CREATE = 1;
    ReactApplicationContext mCallerContext;
    private int propWidth;
    private int propHeight;




    public RNGameManager(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;



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
	 string romID = args.getString(1);
	 string coreName = args.getString(2);
        int commandIdInt = Integer.parseInt(commandId);

        switch (commandIdInt) {
            case COMMAND_CREATE:
                createFragment(root, reactNativeViewId,romID,coreName);
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
    public void createFragment(FrameLayout root, int reactNativeViewId,romID,coreName) {
        ViewGroup parentView = (ViewGroup) root.findViewById(reactNativeViewId);
        setupLayout(parentView);

        final GameFragment gameFragment = new GameFragment(romID,coreName);
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


          Display  metrics= mCallerContext.getCurrentActivity().getWindowManager().getDefaultDisplay();

        view.measure(
                View.MeasureSpec.makeMeasureSpec(metrics.getWidth(), View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(metrics.getHeight(), View.MeasureSpec.EXACTLY));

        view.layout(0, 0,metrics.getWidth() ,metrics.getHeight() );
    }
}