export const NEWS_PER_PAGE = 20;

export const getStructuredData = data => {
  return data.map(item => {
    return {
      imageUrl: item.imageUrl,
      headline: item.headline,
      summary: item.summary,
      createdAt: item.createdAt,
    };
  });
};
