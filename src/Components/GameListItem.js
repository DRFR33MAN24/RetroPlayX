import React from 'react';
import {View, Image} from 'react-native';
import {Button, Card, Text} from '@ui-kitten/components';
import {appStyles} from '../Constants/style';
function GameListItem({data}) {
  const {name, image, platform} = data;
  return (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginVertical: appStyles.s12,
        }}>
        <Image
          source={{uri: image}}
          resizeMode="stretch"
          style={{
            width: 64,
            height: 64,
            borderRadius: appStyles.s12,
            marginHorizontal: appStyles.s6,
          }}
        />
        <View style={{width: '60%'}}>
          <Text category="h6" appearance="default">
            {name}
          </Text>
          <Text category="label" appearance="hint">
            {platform}
          </Text>
        </View>
        <Button size="small">Play</Button>
      </View>
    </Card>
  );
}

export default GameListItem;
