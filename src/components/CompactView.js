import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const cardMargin = 24;
const cardSize = windowWidth / 2 - cardMargin;

const CompactView = ({item, index}) => {
  return (
    <View
      style={[
        styles.container,
        {marginLeft: index % 2 === 0 ? (cardMargin * 2) / 3 : cardMargin / 3},
        {marginRight: index % 2 === 0 ? cardMargin / 3 : (cardMargin * 2) / 3},
        {marginVertical: cardMargin / 4},
      ]}>
      <Image
        source={{uri: item.imageUrl}}
        style={styles.image}
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
    width: cardSize,
    height: cardSize,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: cardSize,
    height: cardSize,
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
