import React, {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {ThemeContext} from '../../theme-context';

export const BackIcon = props => {
  let theme = useContext(ThemeContext).currentTheme;

  return (
    <View style={{paddingHorizontal: 8, marginHorizontal: 2}}>
      <TouchableOpacity onPress={() => props.navigation.pop()}>
        <FontAwesomeIcon
          {...props}
          icon={faChevronLeft}
          size={25}
          style={{color: theme === 'light' ? 'black' : 'white'}}
        />
      </TouchableOpacity>
    </View>
  );
};
