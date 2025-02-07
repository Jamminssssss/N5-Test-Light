import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const { width } = Dimensions.get('window');

const Bannered = ({ adUnitId, position = 'bottom' }) => {
  return (
    <View style={[styles.banner, position === 'top' ? styles.top : styles.bottom]}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: width, // Match screen width
    alignItems: 'center',
    backgroundColor: 'white', // Optional: add a background for clarity
  },
  top: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 0, // Adjust for iOS Safe Area
    zIndex: 10, // Ensure it's above other UI elements
  },
  bottom: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 0, // Adjust for iOS Home Indicator
    zIndex: 10,
  },
});

export default Bannered;