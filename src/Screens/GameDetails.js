import React, {useEffect, useState} from 'react';
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
import {appStyles} from '../Constants/style';

export const GameDetails = ({navigation, route}) => {
  // const navigateDetails = () => {
  //   navigation.navigate('Details');
  // };
  const theme = useTheme();

  const {
    image,
    details,
    link,
    downloads,
    rating,
    title,

    category,
    system,
    size,
  } = route.params;

  // useEffect(() => {
  //   // api call
  //   setSurveys(surveysData);
  //   //console.log(surveyData);
  // }, []);
  const VerticalDivider = () => (
    <View
      style={{
        borderWidth: 1,
        height: '100%',
        borderColor: theme['text-basic-color'],
      }}></View>
  );

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme['background-basic-color-4']}}>
      <TopNavigation
        title={title}
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
            source={{uri: image}}
            resizeMode="stretch"
            style={{width: 64, height: 64, borderRadius: appStyles.s12}}
          />
          <Text category="h2">{title}</Text>
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
              {[...Array(rating)].map((e, i) => (
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
            <Text appearance="hint">{downloads}</Text>
          </View>
          <VerticalDivider />
          <View>
            <Text appearance="hint">System</Text>
            <Text appearance="hint">{system}</Text>
          </View>
        </View>
        <Button size="small">Install</Button>
        <Image
          source={{uri: image}}
          resizeMode="stretch"
          style={{width: '100%', height: 200, marginVertical: appStyles.s12}}
        />
        <View style={{paddingHorizontal: 10}}>
          <Text>About Game:</Text>
          <Text category="p1" appearance="hint">
            {details}
          </Text>
          <Text>{category}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
