import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Switch} from 'react-native';
import ComfortableView from '../components/ComfortableView';
import CompactView from '../components/CompactView';
import {fetchNews} from '../helpers/newsApi';

const NEWS_PER_PAGE = 20;

const getStructuredData = data => {
  return data.map(item => {
    return {
      imageUrl: item.imageUrl,
      headline: item.headline,
      summary: item.summary,
      createdAt: item.createdAt,
    };
  });
};

const Feed = () => {
  //  0 - Comfortable
  //  1 - Compact
  const [view, setView] = useState(0);
  const [page, setPage] = useState(0);
  const [structuredData, setStructuredData] = useState([]);

  useEffect(() => {
    fetchNews(page, NEWS_PER_PAGE).then(data => {
      setStructuredData(currentData => [
        ...currentData,
        ...getStructuredData(data),
      ]);
    });
  }, [page]);

  const switchView = () => {
    setView(previousView => !previousView);
  };

  const renderItem = ({item, index}) => {
    if (view) {
      return <CompactView item={item} index={index} />;
    } else {
      return <ComfortableView item={item} index={index} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.viewText}>Comfortable</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={'#fff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={switchView}
          value={view}
        />
        <Text style={styles.viewText}>Compact</Text>
      </View>
      <FlatList
        key={view ? 2 : 1}
        data={structuredData}
        renderItem={renderItem}
        onEndReached={() => setPage(currentPage => currentPage + 1)}
        extraData={view}
        numColumns={view ? 2 : 1}
      />
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
});

export default Feed;
