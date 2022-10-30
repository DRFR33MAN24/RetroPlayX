import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View, Image, Dimensions} from 'react-native';
import {
  Divider,
  Card,
  Text,
  TopNavigation,
  useTheme,
} from '@ui-kitten/components';
import {Survey, WideSurvey} from '../Components/Survey';
import {BackIcon} from '../Components/NavigationComponents';

//import {surveysData} from '../fakeJsonData';
export const SurveysScreen = ({navigation, route}) => {
  // const navigateDetails = () => {
  //   navigation.navigate('Details');
  // };
  const theme = useTheme();
  const [surveys, setSurveys] = useState([]);
  const {
    image,
    description,
    link,
    timeToComplete,
    title,
    os,
    country,
    category,
    amount,
  } = route.params;

  // useEffect(() => {
  //   // api call
  //   setSurveys(surveysData);
  //   //console.log(surveyData);
  // }, []);
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme['background-basic-color-4']}}>
      <TopNavigation
        title={title}
        accessoryLeft={<BackIcon navigation={navigation} />}
      />
      <Divider />

      <ScrollView style={{flex: 1}}>
        <Image
          source={{uri: image}}
          resizeMode="stretch"
          style={{width: '100%', height: 200}}
        />
        <View style={{paddingHorizontal: 10}}>
          <Text category="h2">{title}</Text>
          <Text category="p1">{description}</Text>
          <Text>{category}</Text>
          <Text>{amount}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
