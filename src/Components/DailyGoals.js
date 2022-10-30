import {Text, Card, useTheme} from '@ui-kitten/components';

import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

import * as Animatable from 'react-native-animatable';
import {giftbox} from '../Constants/images';
export const DailyGoals = props => {
  const theme = useTheme();
  return (
    <Card style={styles.goalsCard}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Progress.Circle
            progress={0.6}
            animated={false}
            size={60}
            showsText={true}
            textStyle={{fontSize: 12, fontFamily: 'Roboto-Bold'}}
            // width={200}
            // height={15}
            thickness={8}
            borderWidth={0}
            color={theme['color-primary-default']}
            unfilledColor={theme['background-basic-color-4']}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            flexShrink: 1,
            paddingHorizontal: 5,
          }}>
          <Text category="p1" style={[{textAlign: 'left'}]}>
            Complete 3 offers to reach your first gift card
          </Text>
        </View>

        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite">
          <Image source={giftbox} style={styles.acheivementImage} />
        </Animatable.View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  acheivementImage: {
    width: 32,
    height: 32,
    opacity: 0.2,
    resizeMode: 'stretch',
  },
  textWithShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  giftHalo: {
    shadowColor: 'gold',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5.0,

    elevation: 50,
  },
  goalsCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 2,

    borderRadius: 10,
  },
});
