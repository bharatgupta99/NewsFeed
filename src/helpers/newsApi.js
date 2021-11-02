export const fetchNews = async (page, newsPerPage) => {
  const resp = await fetch(
    `https://api.smallcase.com/news/getNews?count=${newsPerPage}&offset=${
      page * newsPerPage
    }`,
  );
  const json = await resp.json();
  return json.data;
};
