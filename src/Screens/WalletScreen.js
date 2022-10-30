import {
  Text,
  Divider,
  Card,
  Button,
  TopNavigation,
  useTheme,
  ButtonGroup,
} from '@ui-kitten/components';
import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCoins,
  faWallet,
  faCreditCard,
  faMoneyBillTransfer,
  faGamepad
} from '@fortawesome/free-solid-svg-icons';

import { WalletTransaction } from '../Components/WalletTransaction';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { ThemeContext } from '../../theme-context';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../Reducers/walletSlice';
export const walletIcon = ({ style }) => (
  <FontAwesomeIcon icon={faGamepad} size={25} style={{ color: style.tintColor }} />
);
export const WalletScreenTopBar = () => {
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

        <FontAwesomeIcon icon={faCoins} size={25} style={{ color: 'gold' }} />
        <Text> 100</Text>
      </View>
    </View>
  );
};

export const WalletScreen = ({ navigation }) => {
  // const navigateDetails = () => {
  //   navigation.navigate('Details');
  // };
  const uiTheme = useTheme();
  const theme = useContext(ThemeContext);
  const [chartParentWidth, setChartParentWidth] = useState(0);
  const { transactions, offset } = useSelector(state => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions(0));
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: uiTheme['background-basic-color-4'] }}>
      <TopNavigation title="My Games" />

      <ScrollView style={{ flex: 1, marginHorizontal: 10 }}>
        <View>
          <View style={{ marginVertical: 20 }}>
            <Card>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text category="h6">Balance</Text>
                  <Text category="h1">$71.5</Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    height: '100%',
                    borderColor: uiTheme['text-basic-color'],
                  }}></View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text category="h6">Pending</Text>
                  <Text category="h1">$22.5</Text>
                </View>
              </View>
              <View
                style={{
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Withdraw')}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: uiTheme['color-primary-default'],
                        borderRadius: 25,
                      }}>
                      <FontAwesomeIcon
                        icon={faMoneyBillTransfer}
                        size={25}
                        style={{
                          color:
                            theme.currentTheme === 'light' ? 'black' : 'white',
                        }}
                      />
                    </View>
                    <Text>Withdraw</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: uiTheme['color-primary-default'],
                        borderRadius: 25,
                      }}>
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        size={25}
                        style={{
                          color:
                            theme.currentTheme === 'light' ? 'black' : 'white',
                        }}
                      />
                    </View>
                    <Text>Deposit</Text>
                  </View>
                </TouchableOpacity>
                {/* <Button
                onPress={() => navigation.navigate('Withdraw')}
                style={uiTheme === 'light' ? {} : styles.buttonDarkGlow}>
                Withdraw
              </Button> */}
              </View>
            </Card>
          </View>

          <Card
            onLayout={({ nativeEvent }) => {
              setChartParentWidth(nativeEvent.layout.width);
            }}>
            <Text>Performance</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 8,
              }}>
              <ButtonGroup size="small" style={{ borderRadius: 10 }}>
                <Button style={styles.buttonGroup}>Hour</Button>
                <Button style={styles.buttonGroup}>Day</Button>
                <Button style={styles.buttonGroup}>Week</Button>
              </ButtonGroup>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LineChart
                data={{
                  labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                      ],
                    },
                  ],
                }}
                width={chartParentWidth} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                withInnerLines={false}
                withOuterLines={false}
                withHorizontalLabels={false}
                withHorizontalLines={false}
                withVerticalLines={false}
                withVerticalLabels={false}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: uiTheme['background-basic-color-1'],
                  backgroundGradientFrom: uiTheme['background-basic-color-1'],
                  backgroundGradientTo: uiTheme['background-basic-color-1'],
                  decimalPlaces: 2, // optional, defaults to 2dp
                  // color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  // labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  color: (opacity = 1) => uiTheme['color-primary-300'],
                  labelColor: (opacity = 1) => uiTheme['color-primary-300'],

                  propsForDots: {
                    r: '4',
                    strokeWidth: '1',
                    stroke: uiTheme['color-primary-300'],
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  paddingTop: 20,
                  borderRadius: 0,
                  paddingRight: 0,
                }}
              />
            </View>
          </Card>
        </View>
        <View>
          <Card disabled={true}>
            <Text category="s1">Transaction history:</Text>
          </Card>
        </View>
        {transactions &&
          transactions.map((transaction, index) => (
            <WalletTransaction data={transaction} key={index} />
          ))}
      </ScrollView>
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
