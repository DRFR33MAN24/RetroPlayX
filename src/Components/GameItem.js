import React from 'react';
import {Card, Text} from '@ui-kitten/components';
import {View, Image, TouchableOpacity} from 'react-native';
import {apple, smb3} from '../Constants/images';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

function GameItem({data}) {
  const {id, title, image, downloads, system} = data;
  const navigaion = useNavigation();

  return (
    <TouchableOpacity
      style={{width: '100%'}}
      onPress={() => navigaion.navigate('GameDetails', {...data})}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={smb3}
          resizeMode="cover"
          style={{width: '100%', height: 64, borderRadius: 10}}
        />
      </View>
      <Text category="s1">{title}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <FontAwesomeIcon
            icon={faDownload}
            size={15}
            style={{marginHorizontal: 5}}
          />
          <Text category="label">{downloads}</Text>
        </View>
        <Text category="label">{system}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default GameItem;
