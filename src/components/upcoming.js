import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import NoImage from "../assets/img/no-image-available.png";
import { ReligioUrl } from "./API/Api";

function Upcoming() {
  // birthday api start

  const [birthdayData, setBirthdayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${ReligioUrl}/member/congregation/birthday/this_month/2`)
      .then((response) => {
        if (response?.data?.data != null) {
          const extractedData = response?.data?.data.map((item) => ({
            membername: item.member_name,
            dob: item.dob,
            image: item.image,
          }));
          setBirthdayData(extractedData);
        }
        setIsLoading(false);
      });
  }, []);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
  });

  const upcomingBirthdays = birthdayData.filter((item) => {
    const dobParts = item.dob.split(" - ");
    const dobDay = parseInt(dobParts[0], 10);
    const dobMonth = dobParts[1].trim();
    if (dobMonth === currentMonth) {
      return dobDay >= currentDay;
    }
    return true;
  });

  // Show the first 5 upcoming birthdays
  const first5UpcomingBirthdays = upcomingBirthdays.slice(0, 5);
  // provincial program api start

  const [eventsData, setEventsData] = useState([]);
  useEffect(() => {
    axios
      .get(`${ReligioUrl}/upcoming/calendar/events/congregation/2`)
      .then((response) => {
        if (Array.isArray(response?.data?.data)) {
          const currentDate = new Date();
          const data = response.data.data.map((event) => {
            const eventDate = new Date(
              event.start_date.split("-").reverse().join("-")
            );
            return { ...event, eventDate };
          });
          const filteredData = data.filter(
            (event) =>
              event.eventDate >= currentDate ||
              event.eventDate.toDateString() === currentDate.toDateString()
          );

          const sortedData = filteredData.sort(
            (a, b) => a.eventDate - b.eventDate
          );

          setEventsData(sortedData);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
        setIsLoading(false);
      });
  }, []);

  // News and Events api start
  const [upcomeData, setUpcomeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${ReligioUrl}/news/congregation/2`)
      .then((response) => {
        if (Array.isArray(response?.data?.data)) {
          const currentDate = new Date();
          const data = response.data.data.map((event) => {
            const eventDate = new Date(
              event.date.split("-").reverse().join("-")
            );
            return { ...event, eventDate };
          });

          const filteredData = data.filter(
            (event) =>
              event.eventDate >= currentDate ||
              event.eventDate.toDateString() === currentDate.toDateString()
          );

          const sortedData = filteredData.sort(
            (a, b) => a.eventDate - b.eventDate
          );

          setUpcomeData(sortedData);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="home-page-events">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="upcoming-events">
                <div className="section-heading">
                  <h2 className="entry-title">News & Events</h2>
                </div>
                {loading ? (
                  <p>
                    <b>Loading...</b>
                  </p>
                ) : (
                  <div className="scrollable-content" id="provinceprog">
                    {upcomeData?.slice(0, 5).map((upcomeevent, index) => {
                      return (
                        <div
                          className="event-wrap d-flex flex-wrap justify-content-between"
                          key={index}
                        >
                          <img
                            src={
                              upcomeevent?.upload_image?.length > 0
                                ? upcomeevent.upload_image[0]
                                : NoImage
                            }
                            onError={(e) => {
                              e.target.onerror = null; // Prevent infinite loop
                              e.target.src = NoImage; // Use the path to custom image
                            }}
                            style={{
                              borderRadius: "50%",
                              width: "48px",
                              height: "48px",
                            }}
                            alt="Preview"
                          />
                          <div className="event-content-wrap" id="upcevent">
                            <header className="entry-header d-flex flex-wrap align-items-center">
                              <h3 className="entry-title w-100 m-0">
                                <a
                                  href="/calendar?Iscal"
                                  style={{
                                    fontSize: "13.5px"
                                  }}
                                >
                                  {upcomeevent.name}
                                </a>
                              </h3>
                              <div className="posted-date">
                                <a
                                  href="/calendar?Iscal"
                                  style={{ fontSize: "13.5px", color: "#172440" }}
                                >
                                  {upcomeevent.date}
                                </a>
                              </div>
                            </header>
                          </div>
                        </div>
                      );
                    })}
                    <br />
                    {upcomeData.length === 0 && (
                      <p style={{ color: "black", fontWeight: "bold" }}>
                        No News Available
                      </p>
                    )}

                    {upcomeData.length >= 5 && (
                      <div className="d-flex justify-content-center mt-4">
                        <Link
                          to={"/news-events"}
                          className="btn-sm"
                          style={{
                            backgroundColor: "#172440",
                            color: "#e0ab08",
                            textDecoration: "none",
                          }}
                        >
                          View More
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="upcoming-events">
                <div className="section-heading" id="province-section-heading">
                  <h2 className="entry-title">Provincial Program</h2>
                </div>
                {loading ? (
                  <p>
                    <b>Loading...</b>
                  </p>
                ) : (
                  <div className="scrollable-content" id="provincialprog">
                    {eventsData?.map((event, index) => (
                      <div
                        className="event-wrap d-flex flex-wrap justify-content-between"
                        key={index}
                      >
                        <img
                          src="/images/logos/no-image-available.png"
                          style={{
                            borderRadius: "50%",
                            width: "48px",
                            height: "48px",
                          }}
                          alt=""
                        />
                        <div className="event-content-wrap" id="upccevent">
                          <header className="entry-header d-flex flex-wrap align-items-center">
                            <h3 className="entry-title w-100 m-0">
                              <Link
                                to="/calendar?Isevent"
                                style={{ fontSize: "13.5px" }}
                              >
                                {event.name}
                              </Link>
                            </h3>
                            <div className="posted-date">
                              <Link
                                to="/calendar?Isevent"
                                style={{ fontSize: "13.5px", color: "#172440" }}
                              >
                                {event.start_date}
                              </Link>
                            </div>
                          </header>
                        </div>
                      </div>
                    ))}
                    <br />
                    {eventsData.length === 0 && (
                      <p style={{ color: "black", fontWeight: "bold" }}>
                        No Province Program Available
                      </p>
                    )}

                    {eventsData.length >= 5 && (
                      <div className="d-flex justify-content-center mt-4">
                        <Link
                          to={"/provincial-programs"}
                          className="btn-sm"
                          style={{
                            backgroundColor: "#172440",
                            color: "#e0ab08",
                            textDecoration: "none",
                          }}
                        >
                          View More
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="upcoming-events">
                <div id="birthday-section-heading" class="section-heading">
                  <h2 id="birthday-entry-title" class="entry-title">
                    Upcoming Birthday / Feast
                  </h2>
                </div>
                <div className="scrollable-content" id="birthfeast">
                  {isLoading ? (
                    <p>
                      <b>Loading...</b>
                    </p>
                  ) : first5UpcomingBirthdays.length > 0 ? (
                    first5UpcomingBirthdays.map((item, index) => {
                      const dobParts = item.dob.split(" - ");
                      const dobDay = parseInt(dobParts[0], 10);
                      const dobMonth = dobParts[1].trim();
                      const isBirthdayToday =
                        dobDay === currentDay && dobMonth === currentMonth;
                      const imageSrc = item.image
                        ? item.image
                        : "/images/logos/no-image-available.png";

                      return (
                        <div
                          className="event-wrap d-flex flex-wrap justify-content-flex-start"
                          key={index}
                        >
                          <figure className="m-0" id="upcome">
                            <img
                              style={{
                                borderRadius: "50%",
                                width: "48px",
                                height: "48px",
                              }}
                              src={imageSrc}
                              alt=""
                            />
                          </figure>
                          <div className="event-content-wrap" id="bfevent">
                            <header className="entry-header d-flex flex-wrap align-items-center">
                              <h3 className="entry-title w-100 m-0">
                                <Link
                                  to={"/calendar"}
                                  style={{
                                    fontSize: "13.5px",
                                  }}
                                >
                                  {item.membername}
                                </Link>
                              </h3>

                              <div className="posted-date">
                                <Link
                                  to={"/calendar"}
                                  style={{
                                    fontSize: "13.5px",
                                    color: "#172440",
                                  }}
                                >
                                  {item.dob}
                                </Link>
                              </div>
                              {isBirthdayToday && (
                                <img
                                  src="images/all-img/graphics-happy-birthday.gif"
                                  alt="Happy Birthday GIF"
                                  className="birthday-gif"
                                />
                              )}
                            </header>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p style={{ color: "black", fontWeight: "bold" }}>
                      <br />
                      No Birthday Wishes Available
                    </p>
                  )}
                  <br />
                  <div className="text-center">
                    {first5UpcomingBirthdays.length > 0 && (
                      <Link
                        to={"calendar"}
                        className="btn-sm"
                        style={{
                          backgroundColor: "#172440",
                          color: "#e0ab08",
                          textDecoration: "none",
                        }}
                      >
                        View More
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Upcoming;
