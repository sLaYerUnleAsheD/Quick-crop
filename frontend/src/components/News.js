import NewsItem from "./NewsItem";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [results, setresults] = useState([]);
  // const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const updateNews = async () => {
    const url = `https://newsdata.io/api/1/news?apikey=pub_1134612a987b2f1837244594843581dc3a495&q=${props.keywords}&country=${props.country}&language=${props.language}&page=${page}`;
    // setloading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setresults(parsedData.results);
    // console.log(parsedData.results.pubDate);
    // setloading(false);
  };
  useEffect(() => {
    return () => {
      updateNews();
      //eslint-disable-next-line
    };
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsdata.io/api/1/news?apikey=pub_1134612a987b2f1837244594843581dc3a495&q=${
      props.keywords
    }&country=${props.country}&language=${props.language}&page=${page + 1}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setresults(results.concat(parsedData.results));
    setTotalResults(parsedData.totalResults);
  };
  return (
    <InfiniteScroll
      dataLength={results.length}
      next={fetchMoreData}
      hasMore={results.length !== totalResults}
      // loader={<Spinner />}
    >
      <h1 style={{marginTop: "3.6rem",textAlign:"center"}}>Top Headlines</h1>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4 ">
          {results.map((item) => {
            return (
              <div className="col" key={item.link}>
                <NewsItem
                  image_url={item.image_url}
                  title={item.title?item.title:""}
                  description={item.description?item.description:""}
                  link={item.link}
                  creator={item.creator}
                  source_id={item.source_id}
                  pubDate={item.pubDate}
                />
              </div>
            );
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
};
News.defaultProps = {
  country: "in",
  language: "en,hi",
  keywords: "farming OR farmers OR agriculture OR farmer OR farm OR crops OR Ministry of Agriculture OR fertilizers",
};
News.propTypes = {
  country: PropTypes.string,
};

export default News;
