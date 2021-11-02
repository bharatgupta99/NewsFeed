import React from 'react';
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';

const CompactView = ({item, index}) => {
  const {width: windowWidth} = useWindowDimensions();
  const cardMargin = 24;
  const cardSize = windowWidth / 2 - cardMargin;

  return (
    <View
      style={[
        styles.container,
        {marginLeft: index % 2 === 0 ? (cardMargin * 2) / 3 : cardMargin / 3},
        {marginRight: index % 2 === 0 ? cardMargin / 3 : (cardMargin * 2) / 3},
        {marginVertical: cardMargin / 4},
        {width: cardSize, height: cardSize},
      ]}>
      <Image
        source={{uri: item.imageUrl}}
        style={{width: cardSize, height: cardSize}}
        resizeMode="cover"
      />
      <View style={styles.createdAtContainer}>
        <Text style={styles.createdAt}>
          {new Date(item.createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 4,
  },
  createdAtContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    opacity: 0.7,
    bottom: 0,
    alignItems: 'center',
    paddingVertical: 8,
  },
  createdAt: {
    color: '#000',
    fontWeight: '900',
  },
});
export default CompactView;
