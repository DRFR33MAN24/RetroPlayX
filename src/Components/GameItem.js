import React from 'react';
import {Card, Text} from '@ui-kitten/components';
import {View, Image, TouchableOpacity} from 'react-native';
import {apple, smb3} from '../Constants/images';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

function GameItem({data}) {
  const {id, name, background_image} = data;
  const navigaion = useNavigation();

  return (
    <TouchableOpacity
      style={{width: '100%'}}
      onPress={() => navigaion.navigate('GameDetails', {id})}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={{uri: background_image}}
          resizeMode="stretch"
          style={{width: '100%', height: 128, borderRadius: 10}}
        />
      </View>
      <Text category="s1">{name}</Text>
    </TouchableOpacity>
  );
}

export default GameItem;
