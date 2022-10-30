import React, {useContext, useState, useEffect} from 'react';
import {View, Image, Dimensions, ScrollView} from 'react-native';
import {Text, Button, Modal, Card} from '@ui-kitten/components';

export const GoToSurveyModal = ({data, closeModal}) => {
  return (
    <Modal
      visible={true}
      style={{
        height: '95%',
        width: '95%',
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
      }}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: data.image}}
            style={{
              resizeMode: 'stretch',

              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,

              width: '100%',
              height: 300,
            }}
          />
          <View style={{paddingHorizontal: 10, marginVertical: 10}}>
            <Text>{data.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{marginVertical: 10}}>
        <Button onPress={() => closeModal(false)}>DISMISS</Button>
      </View>
    </Modal>
  );
};
