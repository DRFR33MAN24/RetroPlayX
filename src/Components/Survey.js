import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Divider, Card, Text, useTheme} from '@ui-kitten/components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBlackboard,
  faClock,
  faS,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import {ThemeContext} from '../../theme-context';
import {glass, dollar} from '../Constants/images';
import {GoToSurveyModal} from './GoToSurveyModal';
import LinearGradient from 'react-native-linear-gradient';
import ImageColors from 'react-native-image-colors';
import {useNavigation} from '@react-navigation/native';
export const Survey = ({data}) => {
  const width = new Animated.Value(1);
  const height = new Animated.Value(1);

  const [surveyDetails, toggleSurveyDetails] = useState(false);
  const uiTheme = useTheme();
  let theme = useContext(ThemeContext).currentTheme;
  let rate = Math.round(data.amount / 100);
  if (rate > 5) {
    rate = 5;
  }
  useEffect(() => {
    if (data.animated) {
      Animated.loop(
        Animated.spring(width, {
          toValue: 1.2,
          duration: 10000,

          friction: 0.5,
          useNativeDriver: false,
        }),
      ).start();
    }
  }, []);
  return (
    <View
      style={{
        width: '50%',
        // height: 120,
        maxWidth: 200,
        // backgroundColor: 'pink',
        margin: 0,
        padding: 0,
      }}>
      {surveyDetails ? (
        <GoToSurveyModal data={data} closeModal={toggleSurveyDetails} />
      ) : null}

      <TouchableOpacity
        onPress={() => toggleSurveyDetails(true)}
        style={[
          styles.cardShadow,
          {
            borderRadius: 10,
            backgroundColor: uiTheme['background-basic-color-1'],
            margin: 4,
            minHeight: 220,
          },
        ]}>
        <View
          style={{
            // backgroundColor: 'yellow',

            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            padding: 0,

            height: 140,
            width: '100%',
          }}>
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 140,

              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              backgroundColor: 'grey',
              zIndex: -200,
              overflow: 'hidden',
            }}>
            <Animated.Image
              source={{uri: data.image}}
              style={{
                resizeMode: 'cover',
                // width: width,
                // height: height,
                width: '100%',
                height: '100%',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,

                transform: [{scale: width}],
              }}
            />
          </View>
          {/* <View style={styles.glassyBackground}>
          <Image
            source={glass}
            style={{
              resizeMode: 'stretch',
              height: '100%',
              width: '100%',
              borderRadius: 10,
              zIndex: -100,
            }}
          />
        </View> */}
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 300,
            }}>
            <View style={{flexDirection: 'row'}}>
              {[...Array(rate)].map((e, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  size={20}
                  style={styles.starIcon}
                />
              ))}
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              zIndex: 300,
              flexDirection: 'row',
            }}>
            <FontAwesomeIcon
              icon={faClock}
              size={20}
              style={{color: 'white'}}
            />
            <Text
              style={{
                color: 'white',
                paddingHorizontal: 4,
              }}>
              {data.timeToComplete}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              // justifyContent: 'flex-start',
              // alignItems: 'flex-start',
              width: '95%',
              height: 140,
              // backgroundColor: 'blue',
            }}>
            <View
              style={{
                // flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-start',
                // backgroundColor: 'red',
                padding: 5,
              }}>
              {/* <Text>{data.details}</Text> */}
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <Text>{data.title}</Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: uiTheme['background-basic-color-4'],
            borderRadius: 10,
            padding: 5,
          }}>
          <Image
            source={dollar}
            style={{
              width: 16,
              height: 16,
              opacity: 1,
              marginRight: 5,
              resizeMode: 'stretch',
              // marginHorizontal: 5,
            }}
          />
          <Text>{data.amount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export const WideSurvey = ({data}) => {
  const uiTheme = useTheme();
  if (!data) {
    return <View></View>;
  }
  const width = new Animated.Value(1);
  const height = new Animated.Value(1);

  const [surveyDetails, toggleSurveyDetails] = useState(false);

  let theme = useContext(ThemeContext).currentTheme;
  let rate = Math.round(data.amount / 100);
  if (rate > 5) {
    rate = 5;
  }
  useEffect(() => {
    if (data.animated) {
      Animated.loop(
        Animated.spring(width, {
          toValue: 1.2,
          duration: 10000,
          friction: 0.5,
          useNativeDriver: false,
        }),
      ).start();
    }
  }, []);

  return (
    <View
      style={{
        width: '100%',
        // height: 120,
        // maxWidth: 200,
        // width: 300,
        // backgroundColor: 'pink',
        paddingHorizontal: 10,
        margin: 0,
        padding: 0,
      }}>
      {surveyDetails ? (
        <GoToSurveyModal data={data} closeModal={toggleSurveyDetails} />
      ) : null}

      <TouchableOpacity
        onPress={() => toggleSurveyDetails(true)}
        style={[
          styles.cardShadow,
          {
            borderRadius: 10,
            backgroundColor: 'white',
            // margin: 4,
          },
        ]}>
        <View
          style={{
            // backgroundColor: 'yellow',

            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            padding: 0,

            height: 110,
            width: '100%',
          }}>
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 110,

              borderRadius: 10,
              backgroundColor: 'grey',
              zIndex: -200,
              overflow: 'hidden',
            }}>
            <Animated.Image
              source={{uri: data.image}}
              style={{
                resizeMode: 'cover',
                // width: width,
                // height: height,
                width: '100%',
                height: '100%',
                borderRadius: 10,

                transform: [{scale: width}],
              }}
            />
          </View>

          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 300,
            }}>
            <View style={{flexDirection: 'row'}}>
              {[...Array(rate)].map((e, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  size={20}
                  style={styles.starIcon}
                />
              ))}
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              zIndex: 300,
              flexDirection: 'row',
            }}>
            <FontAwesomeIcon
              icon={faClock}
              size={20}
              style={{color: 'white'}}
            />
            <Text
              style={{
                color: 'white',
                paddingHorizontal: 4,
              }}>
              {data.timeToComplete}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'center',
              bottom: 10,
              right: 10,
              backgroundColor: uiTheme['background-basic-color-4'],
              borderRadius: 10,
              padding: 5,
            }}>
            <Image
              source={dollar}
              style={{
                width: 16,
                height: 16,
                opacity: 1,
                resizeMode: 'stretch',
                marginHorizontal: 5,
              }}
            />
            <Text>{data.amount}</Text>
          </View>
          <View
            style={{
              position: 'absolute',
              // justifyContent: 'flex-start',
              // alignItems: 'flex-start',
              width: '100%',
              height: 100,
              // backgroundColor: 'blue',
              top: 0,
              left: 0,
              paddingHorizontal: 10,
            }}>
            <Text
              category="h5"
              style={{
                color: 'white',
                flexWrap: 'wrap',
                flexShrink: 1,
              }}>
              {data.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export const WideSurvey2 = ({data}) => {
  const uiTheme = useTheme();
  const navigaion = useNavigation();
  if (!data) {
    return <View></View>;
  }
  const width = new Animated.Value(1);
  const height = new Animated.Value(1);

  const [surveyDetails, toggleSurveyDetails] = useState(false);
  const [dominantColors, setDominantColors] = useState({
    vibrant: '#11111111',
    darkMuted: '#00000000',
    lightMuted: '#11111111',
    lightVibrant: '#11111111',
    darkVibrant: '#11111111',
    muted: '#11111111',
    average: '#11111111',
    dominant: '#11111111',
  });

  let theme = useContext(ThemeContext).currentTheme;
  let rate = Math.round(data.amount / 100);
  if (rate > 5) {
    rate = 5;
  }
  useEffect(() => {
    if (data.animated) {
      Animated.loop(
        Animated.spring(width, {
          toValue: 1.2,
          duration: 10000,
          friction: 0.5,
          useNativeDriver: false,
        }),
      ).start();
    }
    (async function () {
      const result = await ImageColors.getColors(data.image, {
        fallback: '#11111111',
        cache: true,
        key: 'unique_key',
      });

      setDominantColors(result);
    })();
  }, []);

  return (
    <View
      style={{
        width: '100%',
        // height: 120,
        // maxWidth: 200,
        // width: 300,
        //backgroundColor: 'pink',
        paddingHorizontal: 10,
        margin: 0,
        padding: 0,
      }}>
      {surveyDetails ? (
        <GoToSurveyModal data={data} closeModal={toggleSurveyDetails} />
      ) : null}

      <TouchableOpacity
        onPress={() => navigaion.navigate('Surveys', {...data})}
        style={[
          styles.cardShadow,
          {
            borderRadius: 10,
            backgroundColor: 'white',
            // margin: 4,
          },
        ]}>
        <View
          style={{
            //backgroundColor: 'yellow',

            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            padding: 0,

            height: 110,
            width: '100%',
          }}>
          <View
            style={{
              position: 'absolute',

              width: '100%',
              height: 110,

              //borderRadius: 10,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              // backgroundColor: 'transparent',
              zIndex: -200,
              overflow: 'hidden',
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              useAngle={true}
              angle={60}
              angleCenter={{x: 0.9, y: 0.5}}
              locations={[0.3, 0.38]}
              colors={[dominantColors.darkVibrant, 'transparent']}
              style={{
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  height: '100%',
                  width: '100%',
                  zIndex: -300,
                  backgroundColor: 'transparent',
                }}>
                <Animated.Image
                  source={{uri: data.image}}
                  style={{
                    resizeMode: 'cover',
                    // width: width,
                    // height: height,
                    width: 110,
                    height: '100%',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    transform: [{scale: width}],
                  }}
                />
              </View>
            </LinearGradient>
          </View>

          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 300,
            }}>
            <View style={{flexDirection: 'row'}}>
              {[...Array(rate)].map((e, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  size={20}
                  style={styles.starIcon}
                />
              ))}
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              zIndex: 300,
              flexDirection: 'row',
            }}>
            <FontAwesomeIcon
              icon={faClock}
              size={20}
              style={{color: dominantColors.lightMuted}}
            />
            <Text
              style={{
                color: dominantColors.lightVibrant,
                paddingHorizontal: 4,
              }}>
              {data.timeToComplete}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'center',
              bottom: 10,
              right: 10,
              backgroundColor: uiTheme['background-basic-color-4'],
              borderRadius: 10,
              padding: 5,
            }}>
            <Image
              source={dollar}
              style={{
                width: 16,
                height: 16,
                opacity: 1,
                resizeMode: 'stretch',
                marginHorizontal: 5,
              }}
            />
            <Text>{data.amount}</Text>
          </View>
          <View
            style={{
              position: 'absolute',
              // justifyContent: 'flex-start',
              // alignItems: 'flex-start',
              width: '100%',
              height: 100,
              // backgroundColor: 'blue',
              top: 0,
              left: 0,
              paddingHorizontal: 10,
            }}>
            <Text
              category="h5"
              style={{
                color: dominantColors.lightVibrant,
                flexWrap: 'wrap',
                flexShrink: 1,
              }}>
              {data.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  starIcon: {
    color: 'gold',

    shadowColor: 'gold',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  glassyBackground: {
    position: 'absolute',

    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#0E317A',
    width: '99%',
    height: 100,
    zIndex: -100,
    opacity: 0.5,
  },
  cardShadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.58,
    shadowRadius: 1.0,

    elevation: 4,
  },
});
