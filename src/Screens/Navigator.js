import React, {useState, useEffect} from 'react';
import {
  NavigationContainer,
  DarkTheme,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
//import { StockScreen } from './StockScreen';
import {StyleSheet} from 'react-native';
import {NotificationScreen} from './NotificationScreen';

import {HomeScreen, HomeScreenTopBar, homeIcon} from './HomeScreen';
import {MyGamesScreen, MyGamesScreenTobBar, gamepadIcon} from './MyGamesScreen';
import {ProfileScreen, profileIcon, ProfileScreenTopBar} from './ProfileScreen';
import {GameDetails} from './GameDetails';
import {GameView} from './GameView';
import {WithdrawScreen} from './WithdrawScreen';
import AuthScreen from './AuthScreen';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, reloadUser, setDeviceToken} from '../Reducers/authSlice';
import {Notifications} from 'react-native-notifications';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

const {Navigator, Screen} = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabBar = ({navigation, state}) => {

	return(
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Store" icon={homeIcon} />
    <BottomNavigationTab title="Play" icon={gamepadIcon} />
    <BottomNavigationTab title="Profile" icon={profileIcon} />
  </BottomNavigation>)
};

const StackNavigatorHome = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Store"
      component={gestureHandlerRootHOC(HomeScreen)}
      options={{
        headerShown: false,
        // headerRight: props => <HomeScreenTopBar {...props} />,
      }}
    />
    <Stack.Screen
      name="Notification"
      component={gestureHandlerRootHOC(NotificationScreen)}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="GameDetails"
      component={gestureHandlerRootHOC(GameDetails)}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
const StackNavigatorMyGames = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Play"
      component={gestureHandlerRootHOC(MyGamesScreen)}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="GameView"
      component={GameView}
      options={{headerShown: false, orientation: 'landscape'}}
    />
  </Stack.Navigator>
);
const TabNavigator = () => {
	const [tabBarShown,setTabBarShown]= useState(true);
	return(
  <Navigator tabBar={props => {
	  if(tabBarShown)
	 return( <BottomTabBar {...props} />)
	  }}>
    <Screen
      name="StoreTab"
      component={StackNavigatorHome}
      options={{
        headerShown: false,
	  
      }}
    />
    <Screen
      name="PlayTab"
      // options={{headerRight: props => <HomeScreenTopBar {...props} />}}
      component={StackNavigatorMyGames}
      options={({route}) => ({
        
        tabBarStyle: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          //console.log(routeName);
          if (routeName === 'GameView') {
		   setTabBarShown(false)
            return {display: 'none'};
          }
	   setTabBarShown(true)
          return;
        })(route),
        headerShown: false,

        headerRight: props => <MyGamesScreenTobBar {...props} />,
      })}
    />
    <Screen
      name="Profile"
      // options={{headerRight: props => <HomeScreenTopBar {...props} />}}
      component={gestureHandlerRootHOC(ProfileScreen)}
      options={{
        headerShown: false,
        headerRight: props => <ProfileScreenTopBar {...props} />,
      }}
    />
    {/* <Screen name="Settings" component={SettingsScreen} /> */}
  </Navigator>
)};

export const AppNavigator = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(loadUser());

    // Request permissions on iOS, refresh token on Android
    Notifications.registerRemoteNotifications();

    Notifications.events().registerRemoteNotificationsRegistered(event => {
      // TODO: Send the token to my server so it could send back push notifications...
      // sendTokenToServer(event.deviceToken);
      // console.log('Device Token Received', event.deviceToken);
      // dispatch(setDeviceToken(event.deviceToken));
      // dispatch(reloadUser(event.deviceToken));
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      event => {
        dispatch(setDeviceToken(''));
      },
    );

    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log(
          `Notification received in foreground: ${notification.title} : ${notification.body}`,
        );
        completion({alert: false, sound: false, badge: false});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        console.log(`Notification opened: ${notification.payload}`);
        completion();
      },
    );
  }, []);

  // if (auth.user === undefined) {
  //   return <></>;
  // }

  // if (auth.user?.id) {
  //   return (
  //     <NavigationContainer>
  //       <TabNavigator />
  //     </NavigationContainer>
  //   );
  // }
  if (true) {
    return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );
  }

  return <AuthScreen />;
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
