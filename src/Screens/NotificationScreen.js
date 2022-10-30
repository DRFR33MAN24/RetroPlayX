import {
  Layout,
  Text,
  Button,
  Divider,
  TopNavigation,
  useTheme,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {BackIcon} from '../Components/NavigationComponents';

import {Notification} from '../Components/Notification';
import {useDispatch, useSelector} from 'react-redux';
export const NotificationScreen = ({navigation}) => {
  // const navigateDetails = () => {
  //   navigation.navigate('Details');
  // };
  const theme = useTheme();
  const dispatch = useDispatch();
  const {notifications, total_notifications, offset} = useSelector(
    state => state.notifications,
  );
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme['background-basic-color-4']}}>
      <TopNavigation
        title="Notification"
        accessoryLeft={<BackIcon navigation={navigation} />}
      />
      <View style={{marginHorizontal: 5}}>
        <Text category="h5">Today</Text>
      </View>
      {notifications.map((notification, index) => (
        <View>
          <Notification {...notification} key={index} />
          <Divider />
        </View>
      ))}
      <View style={{marginHorizontal: 5}}>
        <Text category="h5">Older</Text>
      </View>

      <ScrollView style={{flex: 1}}></ScrollView>
    </SafeAreaView>
  );
};
