package com.retroplay

import android.os.Bundle

import com.retroplay.VirtualGamePadConfigs.RETRO_PAD_RIGHT
import com.retroplay.VirtualGamePadConfigs.RETRO_PAD_LEFT

import android.widget.FrameLayout

import com.swordfish.radialgamepad.library.RadialGamePad
import com.swordfish.radialgamepad.library.event.Event
import android.view.LayoutInflater
import android.view.View

import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.flowWithLifecycle
import androidx.lifecycle.lifecycleScope
import com.swordfish.libretrodroid.GLRetroView
import kotlinx.coroutines.flow.merge
import kotlinx.coroutines.launch


class GameFragment     // Required empty public constructor
    (
    private val romID: String, // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    /*     private static final String ARG_PARAM1 = "param1";
          private static final String ARG_PARAM2 = "param2"; */
    // TODO: Rename and change types of parameters
    private val coreName: String
) : Fragment() {
    var gameView: GameView? = null
    private var leftPad: RadialGamePad? = null
    private var rightPad: RadialGamePad? = null

    //    /**
    //     * Use this factory method to create a new instance of
    //     * this fragment using the provided parameters.
    //     *
    //     * @param param1 Parameter 1.
    //     * @param param2 Parameter 2.
    //     * @return A new instance of fragment MyFragment.
    //     */
    //    // TODO: Rename and change types and number of parameters
    //    public static MyFragment newInstance(String param1, String param2) {
    //        MyFragment fragment = new MyFragment();
    //        Bundle args = new Bundle();
    //        args.putString(ARG_PARAM1, param1);
    //        args.putString(ARG_PARAM2, param2);
    //        fragment.setArguments(args);
    //        return fragment;
    //    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        /*         if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        } */
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        super.onCreateView(inflater, container, savedInstanceState)

        // FrameLayout frameLayout = (FrameLayout) inflater.inflate(R.layout.other_fragment, null);
        gameView = GameView(this.context, this.lifecycle, romID, coreName)
        initializeVirtualGamePad()
        return gameView
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
    }

    private fun initializeVirtualGamePad() {
        leftPad = RadialGamePad(RETRO_PAD_RIGHT, 8f, this.requireContext())
        rightPad = RadialGamePad(RETRO_PAD_LEFT, 8f, this.requireContext())

        // We want the pad anchored to the bottom of the screen
        leftPad!!.gravityX = -1f
        leftPad!!.gravityY = 1f
        rightPad!!.gravityX = 1f
        rightPad!!.gravityY = 1f

        this.requireActivity().findViewById<FrameLayout>(R.id.left_container).addView(leftPad)
        this.requireActivity().findViewById<FrameLayout>(R.id.right_container).addView(rightPad)



        lifecycleScope.launch {
            merge(leftPad!!.events(), rightPad!!.events())
                .flowWithLifecycle(lifecycle, Lifecycle.State.RESUMED)
                .collect {
                    handleEvent(it)
                }
        }
    }
    private fun handleEvent(event: Event) {
       val retroView = gameView?.findViewById<GLRetroView>(R.id.gl_retro_view);
        when (event) {
            is Event.Button -> if (retroView != null) {
                retroView.sendKeyEvent(event.action, event.id)
            }
            is Event.Direction -> if (retroView != null) {
                retroView.sendMotionEvent(event.id, event.xAxis, event.yAxis)
            }
        }
    }
}