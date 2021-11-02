import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ComfortableFeed from './ComfortableFeed';
import CompactFeed from './CompactFeed';

const Feed = () => {
  const [view, setView] = useState('comfortable');
  const {width: WindowWidth} = useWindowDimensions();

  const translateX = useSharedValue(0);

  const feedContainerAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const switchView = v => {
    if (v) {
      translateX.value = withTiming(-WindowWidth);
      setView('compact');
    } else {
      translateX.value = withTiming(0);
      setView('comfortable');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.viewText}>Comfortable</Text>
        <Switch
          thumbColor={'#fff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={switchView}
          value={view === 'comfortable' ? false : true}
        />
        <Text style={styles.viewText}>Compact</Text>
      </View>
      <Animated.View
        style={[styles.feedsContainer, feedContainerAnimatedStyles]}>
        <View style={styles.feedContainer}>
          <ComfortableFeed />
        </View>
        <View style={styles.feedContainer}>
          <CompactFeed />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#099082',
  },
  viewText: {
    fontSize: 24,
    marginHorizontal: 8,
    color: 'white',
    fontWeight: '700',
  },
  feedsContainer: {width: '200%', flexDirection: 'row', flex: 1},
  feedContainer: {width: '50%', height: '100%'},
});

export default Feed;
