import React, {useContext, useState, useEffect} from 'react';
import {View, Image, Dimensions, ScrollView} from 'react-native';
import {Text, Button, Modal, Card, Divider} from '@ui-kitten/components';
import {congratulation, dollar} from '../Constants/images';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBell,
  faCoins,
  faHome,
  faChevronLeft,
  faGift,
} from '@fortawesome/free-solid-svg-icons';
export const Congratulation = ({data, closeModal}) => {
  return (
    <Modal visible={true}>
      <Card>
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 50}}>
          <Image
            source={congratulation}
            style={{
              width: 150,
              height: 150,
              opacity: 1,
              resizeMode: 'center',
              marginRight: 5,
            }}
          />
          <Text category="h4">You've earned:</Text>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text category="h1">100 </Text>
            <Image
              source={dollar}
              style={{
                width: 32,
                height: 32,
                opacity: 1,
                resizeMode: 'stretch',
                marginRight: 5,
              }}
            />
          </View>
        </View>
      </Card>
    </Modal>
  );
};
