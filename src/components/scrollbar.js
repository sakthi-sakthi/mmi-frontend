import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReligioUrl } from "./API/Api";

function Scrollbar() {
  const [isScrollingAllowed, setIsScrollingAllowed] = useState(true);
  const [newsData, setNewsData] = useState([]);
  const [hasUpcomingEvents, setHasUpcomingEvents] = useState(true);

  const stopScroll = () => {
    setIsScrollingAllowed(false);
  };

  const allowScroll = () => {
    setIsScrollingAllowed(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ReligioUrl}/news/congregation/2`);
        const allNewsData = response?.data?.data;
        setNewsData(allNewsData);
        if (allNewsData?.some((newsItem) => isFutureEvent(newsItem.date))) {
          setHasUpcomingEvents(true);
        } else {
          setHasUpcomingEvents(false);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let interval;

    if (isScrollingAllowed && newsData.length > 0) {
      interval = setInterval(() => {}, 3000);
    }

    return () => clearInterval(interval);
  }, [isScrollingAllowed, newsData]);

  const isFutureEvent = (date) => {
    const currentDate = new Date();
    const parsedEventDate = new Date(date);
    return parsedEventDate > currentDate;
  };

  return (
    <>
      <div className="scrollbar">
        <div className="container">
          <div className="row flex-wrap justify-content-center justify-content-lg-between align-items-lg-center">
            <div className="col-4 col-lg-2 d-flex">
              <div className="label ripple">Flash News</div>
            </div>
            <div className="col-8 col-lg-10 d-md-flex flex-wrap justify-content-center justify-content-lg-start mb-3 mb-lg-0">
              <div className="marqueenews">
                <div className="marquee">
                  <p
                    onMouseEnter={stopScroll}
                    onMouseLeave={allowScroll}
                    onTouchStart={stopScroll}
                    onTouchEnd={allowScroll}
                    style={{ overflow: isScrollingAllowed ? "" : "" }}
                  >
                    {hasUpcomingEvents ? (
                      newsData
                        ?.filter((newsItem) => isFutureEvent(newsItem.date))
                        .map((newsItem, index) => (
                          <span key={index}>
                            <img
                              src="images/logos/output-onlinegiftools.gif"
                              style={{
                                maxWidth: "40px",
                              }}
                              alt=""
                            />
                            &nbsp;&nbsp;{newsItem.name}&nbsp;&nbsp;
                          </span>
                        ))
                    ) : (
                      <span>No upcoming news available</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scrollbar;
