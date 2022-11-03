import React, {useEffect, useRef, useState} from 'react';
import {PixelRatio, UIManager, findNodeHandle} from 'react-native';
import {MyGameViewManager} from './MyGameViewManager';

const createFragment = viewId =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    UIManager.MyGameViewManager.Commands.create.toString(),
    [viewId],
  );
export const GameView = ({navigation, route}) => {
  const ref = useRef(null);

  const {name, platform, id} = route.params;

  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);
  return (
    <MyViewManager
      style={{
        // converts dpi to px, provide desired height
        height: PixelRatio.getPixelSizeForLayoutSize(200),
        // converts dpi to px, provide desired width
        width: PixelRatio.getPixelSizeForLayoutSize(200),
      }}
      ref={ref}
    />
  );
};
