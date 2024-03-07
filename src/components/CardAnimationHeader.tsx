import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SettingsSVG from '../assets/settings-01.svg';

const CardAnimationHeader = ({ navigation }: NativeStackHeaderProps) => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: top,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          padding: 18,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            width: 32,
            height: 32,
            borderRadius: 9999,
            backgroundColor: 'black',
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: '500', flex: 1 }}>
          Profil ve Üyelik
        </Text>
        <SettingsSVG />
      </View>
    </View>
  );
};

export default CardAnimationHeader;
