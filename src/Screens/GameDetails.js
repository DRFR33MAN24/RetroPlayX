import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, View, Image, Dimensions} from 'react-native';
import {
  Divider,
  Card,
  Text,
  TopNavigation,
  useTheme,
  Button,
} from '@ui-kitten/components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

import {BackIcon} from '../Components/NavigationComponents';
import Carousel from 'react-native-reanimated-carousel';
import {appStyles} from '../Constants/style';

import {useDispatch, useSelector} from 'react-redux';
import {getGameDetails, getGameScreenshots} from '../Reducers/storeSlice';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Video from 'react-native-video';

const regexForStripHTML = /<sup.*>.*?<\/sup>/gi;
export const GameDetails = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {game_detail, game_screen_shots, game_trailer} = useSelector(
    state => state.store,
  );
  const theme = useTheme();
  let player = useRef(null);

  const {id} = route.params;

  useEffect(() => {
    dispatch(getGameDetails(3498));
    dispatch(getGameScreenshots(3498));
  }, []);
  const VerticalDivider = () => (
    <View
      style={{
        borderWidth: 1,
        height: '100%',
        borderColor: theme['text-hint-color'],
      }}></View>
  );
  console.log(game_detail.rating);
  //console.log(game_trailer.data[480]);
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme['background-basic-color-4']}}>
      <TopNavigation
        title={game_detail.name}
        accessoryLeft={<BackIcon navigation={navigation} />}
      />
      <Divider />

      <ScrollView style={{flex: 1, padding: appStyles.p10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: appStyles.s12,
          }}>
          <Image
            source={{uri: game_detail.background_image}}
            resizeMode="stretch"
            style={{
              width: 64,
              height: 64,
              borderRadius: appStyles.s12,
              marginHorizontal: appStyles.s6,
            }}
          />
          <View>
            <Text category="h5" numberOfLines={3}>
              {game_detail.name}
            </Text>
            <Text appearance="hint" category="label">
              {10} MB
            </Text>
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
            <View style={{flexDirection: 'row'}}>
              {[...Array(Math.ceil(parseFloat(5)))].map((e, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  size={15}
                  style={{color: theme['color-primary-300']}}
                />
              ))}
            </View>
          </View>
          <VerticalDivider />
          <View>
            <Text appearance="hint">Downloads</Text>
            <Text appearance="hint">{game_detail.added}</Text>
          </View>
          <VerticalDivider />
          <View>
            <Text appearance="hint">Platform</Text>
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
            // mode="horizontal-stack"
            // modeConfig={{
            //   snapDirection: 'left',
            //   stackInterval: 18,
            // }}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 1,
              parallaxScrollingOffset: 120,
              parallaxAdjacentItemScale: 0.6,
            }}
            autoPlay={true}
            width={Dimensions.get('screen').width}
            height={250}
            style={{marginVertical: appStyles.s12}}
            autoPlayInterval={3000}
            data={game_screen_shots.map(obj => obj.image)}
            renderItem={({item, index}) => (
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
                  source={{uri: item}}
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
        <Text>Game trailer</Text>
        {game_trailer.results ? (
          <View style={{width: '100%', height: 240}}>
            <Video
              source={{uri: game_trailer.results[0].data[480]}} // Can be a URL or a local file.
              ref={ref => {
                player = ref;
              }}
              resizeMode="stretch"
              paused={true}
              controls={true}
              useTextureView={false}
              poster={game_trailer.results[0].preview}
              //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
              //  onError={this.videoError}               // Callback when video cannot be loaded
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        ) : null}
        <View style={{paddingHorizontal: 10}}>
          <Text>About Game</Text>
          <Text category="p1" appearance="hint">
            {game_detail.description_raw}
          </Text>
          <Text>Geners</Text>
          {game_detail.genres?.map(obj => (
            <Text>{obj.name}</Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
