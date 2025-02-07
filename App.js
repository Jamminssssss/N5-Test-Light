import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Platform, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import ReadingSection from './screens/ReadingSection';
import ListeningSection from './screens/ListeningSection';
import SplashScreen from 'react-native-splash-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true); // 모든 경고 메시지 숨김

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// Different ad unit IDs for top and bottom banners
const topBannerAdUnitId = Platform.select({
  ios: 'ca-app-pub-3940256099942544/2435281174', // Replace with your top banner ad unit ID
  android: 'ca-app-pub-3940256099942544/6300978111', // Replace with your top banner ad unit ID
});

const bottomBannerAdUnitId = Platform.select({
  ios: 'ca-app-pub-3940256099942544/2435281174', // Replace with your bottom banner ad unit ID
  android: 'ca-app-pub-3940256099942544/6300978111', // Replace with your bottom banner ad unit ID
});

const TopBanner = ({ adUnitId }) => (
  <View style={styles.topBannerContainer}>
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  </View>
);

const BottomBanner = ({ adUnitId }) => (
  <View style={styles.bottomBannerContainer}>
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  </View>
);

// 새로 추가된 컴포넌트: 터치 영역을 48dp 이상으로 보장하기 위한 커스텀 탭 버튼
const CustomTabButton = ({ children, onPress }) => (
  <Pressable
    onPress={onPress}
    style={styles.tabButton}
  >
    {children}
  </Pressable>
);

export default function App() {
  const [showTopBanner, setShowTopBanner] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {showTopBanner && <TopBanner adUnitId={topBannerAdUnitId} />}
      <View style={styles.mainContent}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Reading"
            screenOptions={{
              tabBarStyle: styles.tabBar,
              headerShown: false,
              tabBarHideOnKeyboard: true,
              // 커스텀 탭 버튼을 모든 탭에 적용
              tabBarButton: (props) => <CustomTabButton {...props} />,
            }}
          >
            <Tab.Screen
              name="Reading"
              component={ReadingSection}
              options={{
                tabBarIcon: ({ color }) => (
                  <View style={styles.iconContainer}>
                    {/* 아이콘 크기를 32로 줄여서 터치 영역 내에서 더 보기 좋게 조정 */}
                    <MaterialIcons name="menu-book" color={color} size={32} />
                  </View>
                ),
                tabBarLabel: () => null,
              }}
            />
            <Tab.Screen
              name="Listening"
              component={ListeningSection}
              options={{
                tabBarIcon: ({ color }) => (
                  <View style={styles.iconContainer}>
                    {/* 아이콘 크기를 32로 줄여서 터치 영역 내에서 더 보기 좋게 조정 */}
                    <MaterialIcons name="headset" color={color} size={32} />
                  </View>
                ),
                tabBarLabel: () => null,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
      <BottomBanner adUnitId={bottomBannerAdUnitId} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    flex: 1,
  },
  // 새로운 스타일: 터치 영역을 위한 탭 버튼 스타일
  tabButton: {
    flex: 1,
    minWidth: 48, // 최소 너비 48dp 보장
    minHeight: 48, // 최소 높이 48dp 보장
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  // 아이콘 컨테이너 스타일 수정
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  // 탭바 스타일 수정
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64, // 터치 영역 확보를 위해 높이 증가
    backgroundColor: 'white',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    paddingVertical: 0,
  },
  topBannerContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bottomBannerContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});