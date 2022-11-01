import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Image, Dimensions } from 'react-native';
import {
  Divider,
  Card,
  Text,
  TopNavigation,
  useTheme,
  Button,
} from '@ui-kitten/components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { BackIcon } from '../Components/NavigationComponents';
import Carousel from 'react-native-reanimated-carousel';
import { appStyles } from '../Constants/style';

import { useDispatch, useSelector } from 'react-redux';
import { getGameDetails } from '../Reducers/storeSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export const GameDetails = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const { game_detail } = useSelector(state => state.store);
  const theme = useTheme();

  const { id } = route.params;


  useEffect(() => {
    dispatch(getGameDetails(id));
  }, [])
  const VerticalDivider = () => (
    <View
      style={{
        borderWidth: 1,
        height: '100%',
        borderColor: theme['text-hint-color'],
      }}></View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme['background-basic-color-4'] }}>
      <TopNavigation
        title={game_detail.name}
        accessoryLeft={<BackIcon navigation={navigation} />}
      />
      <Divider />

      <ScrollView style={{ flex: 1, padding: appStyles.p10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: appStyles.s12,
          }}>
          <Image
            source={{ uri: game_detail.background_image }}
            resizeMode="stretch"
            style={{ width: 64, height: 64, borderRadius: appStyles.s12 }}
          />
          <View>
            <Text category="h3">{game_detail.name}</Text>
            <Text appearance="hint">{10}MB</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: appStyles.s12,
          }}>
          <View>
            <Text appearance="hint">Rating</Text>
            <View style={{ flexDirection: 'row' }}>
              {[...Array(5)].map((e, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  size={15}
                  style={{ color: theme['color-primary-300'] }}
                />
              ))}
            </View>
          </View>
          <VerticalDivider />
          <View>
            <Text appearance="hint">Downloads</Text>
            <Text appearance="hint">{1000}</Text>
          </View>
          <VerticalDivider />
          <View>
            <Text appearance="hint">System</Text>
            <Text appearance="hint">{'NES'}</Text>
          </View>
        </View>
        <Button size="small">Install</Button>
        {/* <Image
          source={{uri: image}}
          resizeMode="stretch"
          style={{width: '100%', height: 200, marginVertical: appStyles.s12}}
        /> */}
        <GestureHandlerRootView>


          <Carousel
            mode="horizontal-stack"
            modeConfig={{
              snapDirection: 'left',
              stackInterval: 18,
            }}
            autoPlay={true}
            width={Dimensions.get('screen').width}
            height={250}
            style={{ marginVertical: appStyles.s12 }}
            autoPlayInterval={3000}
            data={[game_detail.background_image, game_detail.background_image_additional, game_detail.background_image_additional]}
            renderItem={({ item, index }) => (
              <View
                style={{
                  padding: 0,
                  margin: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: 200,
                }}>
                <Image
                  key={index}
                  source={{ uri: item }}
                  resizeMode="cover"
                  style={{
                    width: '80%',
                    height: 200,
                    marginVertical: appStyles.s12,
                    borderRadius: appStyles.s6,
                  }}
                />
              </View>
            )}
          />
        </GestureHandlerRootView>
        <View style={{ paddingHorizontal: 10 }}>
          <Text>About Game:</Text>
          <Text category="p1" appearance="hint">
            {game_detail.description}
          </Text>
          <Text>{''}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
