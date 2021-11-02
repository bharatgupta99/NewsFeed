import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';

const ComfortableView = ({item}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Pressable
      style={styles.container}
      onPress={() => setExpanded(previousValue => !previousValue)}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.imageUrl}} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headline} numberOfLines={expanded ? undefined : 2}>
          {item.headline}
        </Text>
        <Text style={styles.summary} numberOfLines={expanded ? undefined : 3}>
          {item.summary}
        </Text>
        {expanded && (
          <Text style={styles.createdAt}>
            {new Date(item.createdAt).toDateString()}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 8,
    elevation: 4,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  imageContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'grey',
    borderRadius: 8,
    marginTop: 8,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  textContainer: {
    marginHorizontal: 8,
    flexShrink: 1,
  },
  headline: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  summary: {
    color: '#000',
    fontSize: 14,
  },
  createdAt: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
  },
});

export default ComfortableView;
