import React from 'react';
import { Card, Text } from '@ui-kitten/components';
import { View, Image } from 'react-native';
import { giftbox, glass } from '../Constants/images'

function GameItem({ data }) {
    const { id, title, image, downloads, system } = data;

    return (
        <View>
            <Card>
                <View style={{ alignItems: 'center', }}>

                    <Image source={giftbox} style={{ width: 64, height: 64 }} />
                </View>
                <Text>{title}</Text>
                <Text>{downloads}</Text>

            </Card>
        </View>
    );
}

export default GameItem;