import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Image, Dimensions } from 'react-native';
import {

    useTheme,
} from '@ui-kitten/components';




export const GameView = ({ navigation, route }) => {

    const theme = useTheme();

    const {
        gameROMPath,
        corePath
    } = route.params;

    // useEffect(() => {
    //   // api call
    //   setSurveys(surveysData);
    //   //console.log(surveyData);
    // }, []);
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme['background-basic-color-4'] }}>

        </SafeAreaView>
    );
};