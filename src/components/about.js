import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <div className="home-page-welcome">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12 order-2 order-lg-1">
              <div className="welcome-content">
                <header className="entry-header">
                  <h2 className="entry-title">
                    Welcome to Missionaries of Mary Immaculate (MMI)
                  </h2>
                </header>
                <div className="entry-content mt-2">
                  The church has always been apostolic, prophetic and missionary. God’s ways of calling more laborers to preach the Gospel are innumerable. The Society of the Missionaries of Mary Immaculate (MMI) also has its origin in the will of God. It was not my will to start a Society of priests as I know well that I am the least worthy person to do it. We are a clerical society of Apostolic Life of Missionaries Priests called by God our Father, to be a PROPHETIC, APOSTOLIC and MISSIONARIES.
                </div>
                <div className="containernewbox">
                  <h2 className="quotehead">OUR CHARISM</h2>
                  <p className="quote">“Loving God in Serving the Poor To be Fully Human and Fully Alive.”</p>
                </div>
                <center>
                  <Link to="/history">
                    <button className="brown-button btn-sm">Know More</button>
                  </Link>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
