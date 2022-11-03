import {
  Text,
  Divider,
  Card,
  Button,
  TopNavigation,
  useTheme,
  ButtonGroup,
  Input,
} from '@ui-kitten/components';
import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCoins,
  faWallet,
  faCreditCard,
  faMoneyBillTransfer,
  faGamepad,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import GameListItem from '../Components/GameListItem';
import {ThemeContext} from '../../theme-context';

import {useDispatch, useSelector} from 'react-redux';
import {loadGames} from '../Reducers/myGamesSlice';
import {FlatList} from 'react-native-gesture-handler';
import {appStyles} from '../Constants/style';
export const gamepadIcon = ({style}) => (
  <FontAwesomeIcon
    icon={faGamepad}
    size={25}
    style={{color: style.tintColor}}
  />
);
export const MyGamesScreenTobBar = () => {
  let navigation = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: 4,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          paddingHorizontal: 2,
        }}>
        {/* <Text style={styles.badge}> 2 </Text> */}

        <FontAwesomeIcon icon={faCoins} size={25} style={{color: 'gold'}} />
        <Text> 100</Text>
      </View>
    </View>
  );
};

export const MyGamesScreenContainer = props => {
  const [searchValue, setSearchValue] = useState('');
  const renderSearchIcon = props => (
    <FontAwesomeIcon
      icon={faSearch}
      size={15}
      style={{color: props.style.tintColor}}
    />
  );
  return (
    <View
      style={{
        paddingHorizontal: 4,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Input
        style={{flex: 1, borderRadius: appStyles.s12}}
        placeholder="Search..."
        accessoryRight={renderSearchIcon}
        value={searchValue}
        onChangeText={nextValue => setSearchValue(nextValue)}
      />
    </View>
  );
};
export const MyGamesScreen = ({navigation}) => {
  // const navigateDetails = () => {
  //   navigation.navigate('Details');
  // };
  const uiTheme = useTheme();
  const theme = useContext(ThemeContext);
  const [chartParentWidth, setChartParentWidth] = useState(0);
  const {myGames} = useSelector(state => state.localStorage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGames());
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: uiTheme['background-basic-color-4']}}>
      <TopNavigation accessoryRight={MyGamesScreenContainer} />

      {/* <ScrollView style={{flex: 1, marginHorizontal: 10}}> */}
      <FlatList
        data={myGames}
        numColumns={1}
        initialNumToRender={4}
        keyExtractor={(item, index) => item.id}
        renderItem={({item, index}) => (
          <View style={{flex: 1}}>
            <GameListItem data={item} key={index} />
          </View>
        )}

        // ListHeaderComponent={HomeScreenHeaderComponent}
        // onEndReached={() => getOffers(offset)}
        // onEndReachedThreshold={0.1}
      />

      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bigBoldText: {
    fontSize: 40,
    fontFamily: 'normal',
  },

  buttonDarkGlow: {
    shadowColor: '#94CBFF',
    shadowRadius: 5.0,
    shadowOpacity: 10,

    elevation: 10,
  },
  buttonGroup: {
    paddingHorizontal: 30,
  },
});
