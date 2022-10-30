import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text, useTheme} from '@ui-kitten/components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle, faCircleCheck} from '@fortawesome/free-solid-svg-icons';
export const Notification = ({title, message, image, read}) => {
  const uiTheme = useTheme();
  return (
    <TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: uiTheme['background-basic-color-1'],
        }}>
        <View style={{marginHorizontal: 5}}>
          {read ? (
            <FontAwesomeIcon
              icon={faCircle}
              size={15}
              style={{color: uiTheme['color-danger-default']}}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleCheck}
              size={15}
              style={{color: uiTheme['color-info-default']}}
            />
          )}
        </View>
        <View style={{flex: 5}}>
          <Text category="h6" style={{flexShrink: 1, flexWrap: 'wrap'}}>
            {title}
          </Text>
          <Text category="c1" style={{flexShrink: 1, flexWrap: 'wrap'}}>
            {message}
          </Text>
        </View>
        <View>
          <Image
            source={{uri: image}}
            style={{
              width: 64,
              height: 64,
              resizeMode: 'stretch',
              borderRadius: 10,
              marginHorizontal: 5,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
