import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import CompactView from '../components/CompactView';
import {fetchNews} from '../api/newsApi';
import {getStructuredData, NEWS_PER_PAGE} from '../helpers/helpers';
import Loading from '../components/Loading';

const CompactFeed = () => {
  const [page, setPage] = useState(0);
  const [structuredData, setStructuredData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchNews(page, NEWS_PER_PAGE).then(data => {
      setStructuredData(currentData => [
        ...currentData,
        ...getStructuredData(data),
      ]);
      setLoading(false);
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
      ListFooterComponent={() => (loading ? <Loading /> : null)}
    />
  );
};

export default CompactFeed;
