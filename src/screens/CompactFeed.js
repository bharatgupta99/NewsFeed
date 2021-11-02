import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import CompactView from '../components/CompactView';
import {fetchNews} from '../api/newsApi';
import {getStructuredData, NEWS_PER_PAGE} from '../helpers/helpers';

const CompactFeed = () => {
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
  const renderItem = ({item, index}) => {
    return <CompactView item={item} index={index} />;
  };

  return (
    <FlatList
      data={structuredData}
      renderItem={renderItem}
      onEndReached={() => setPage(currentPage => currentPage + 1)}
      numColumns={2}
    />
  );
};

export default CompactFeed;
