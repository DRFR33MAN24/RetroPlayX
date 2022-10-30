import {Text, Card, Button, useTheme} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

export const WalletTransaction = ({data}) => {
  const uiTheme = useTheme();

  const RenderState = ({state}) => {
    switch (data.status) {
      case 'rejected':
        return (
          <Text style={{color: uiTheme['color-danger-default']}}>REJECTED</Text>
        );

      case 'pending':
        return (
          <Text style={{color: uiTheme['color-warning-default']}}>PENDING</Text>
        );

      case 'approved':
        return (
          <TouchableOpacity>
            <Text style={{color: uiTheme['color-success-default']}}>OPEN</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };
  return (
    <Card disabled={true}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: data.amount > 0 ? 'green' : 'red'}}>
            {data.amount.toFixed(2)}
          </Text>
        </View>
        <View>
          <Text> {data.name}</Text>
        </View>
        <RenderState state={data.status} />
      </View>
      <Text style={styles.dateText}>{data.updatedAt}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  dateText: {
    fontSize: 10,
    fontFamily: 'normal',
  },
});
