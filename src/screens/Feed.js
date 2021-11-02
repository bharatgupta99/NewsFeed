import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import ComfortableFeed from './ComfortableFeed';
import CompactFeed from './CompactFeed';

const Feed = () => {
  const [view, setView] = useState('comfortable');

  const comfortableFeedOpacity = useSharedValue(1);
  const comfortableFeedZIndex = useSharedValue(1);
  const compactFeedOpacity = useSharedValue(0);
  const compactFeedZIndex = useSharedValue(0);

  const comfortableFeedAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: comfortableFeedOpacity.value,
      zIndex: comfortableFeedZIndex.value,
    };
  });
  const compactFeedAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: compactFeedOpacity.value,
      zIndex: compactFeedZIndex.value,
    };
  });

  const switchView = v => {
    if (v) {
      //compact
      comfortableFeedOpacity.value = withTiming(0);
      comfortableFeedZIndex.value = withTiming(0);
      compactFeedOpacity.value = withDelay(500, withTiming(1));
      compactFeedZIndex.value = withDelay(500, withTiming(1));
      setView('compact');
    } else {
      //comfortable
      compactFeedOpacity.value = withTiming(0);
      compactFeedZIndex.value = withTiming(0);
      comfortableFeedOpacity.value = withDelay(500, withTiming(1));
      comfortableFeedZIndex.value = withDelay(500, withTiming(1));
      setView('comfortable');
    }
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.feedsContainer}>
        <Animated.View
          style={[styles.feedContainer, comfortableFeedAnimatedStyles]}>
          <ComfortableFeed />
        </Animated.View>
        <Animated.View
          style={[styles.feedContainer, compactFeedAnimatedStyles]}>
          <CompactFeed />
        </Animated.View>
      </View>
    </View>
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
  feedsContainer: {
    flex: 1,
  },
  feedContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Feed;
