import React, {useEffect, useRef, useState} from 'react';
import {PixelRatio, UIManager, findNodeHandle, StatusBar} from 'react-native';
import {MyGameViewManager} from './MyGameViewManager';

const createFragment = (viewId, romID, coreName) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    UIManager.RNGameManager.Commands.create.toString(),
    [viewId, romID, coreName],
  );
export const GameView = ({navigation, route}) => {
  const ref = useRef(null);

  const {name, platform, id} = route.params;

  useEffect(() => {
    StatusBar.setHidden(true);
    navigation.setOptions({tabBarStyle: {display: 'none'}});
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId, id, platform);

    return () => StatusBar.setHidden(false);
  }, []);
  return (
    <MyGameViewManager
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
