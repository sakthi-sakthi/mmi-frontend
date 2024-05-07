import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ApiUrl } from "./API/Api";
const OurStatic = () => {
  const [foundermsg, setFoundermsg] = useState([]);
  const [patronmsg, setPatronmsg] = useState([]);

  useEffect(() => {
    axios
      .get(`${ApiUrl}/get/messages/5`)
      .then((response) => {
        const latestFounderMsg = response.data.data.slice(-1);
        setFoundermsg(latestFounderMsg);
      })
      .catch((error) => {
        console.log(error);
      });
  
    axios
      .get(`${ApiUrl}/get/messages/6`)
      .then((response) => {
        const latestPatronMsg = response.data.data.slice(-1);
        setPatronmsg(latestPatronMsg);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);  

  const imageStyles1 = {
    height: "258px",
  };

  const imageStyles = {
    height: "258px",
  };

  const boxStyles1 = {
    boxShadow: "0px 7px 16px 0px rgba(172 ,153 ,153, 0.5)",
    padding: "7px 25px 9px 22px",
    backgroundColor: "#fff",
    height: "370px",
    overflowY: "scroll",
  };

  const truncatedFounderMsg = foundermsg[0]?.content?.slice(0, 300) + (foundermsg[0]?.content?.length > 300 ? "..." : "");

  const trcuncatedpatronmsg = patronmsg[0]?.content?.slice(0, 300) + (patronmsg[0]?.content?.length > 300 ? "..." : "");

  return (
    <>
      <div
        className="container-fluid py-3"
        style={{ backgroundColor: "#f3f3f3" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
              <div style={boxStyles1} id="style-1">
                <div className="section-heading">
                  <h5 className="entry-titles">REV. FR. JESUADIMAI EMMANUEL ARUL RAJ <br />(FOUNDER)</h5>
                </div>
                <div className="entry-content">
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="tab-image entry-content mt-2">
                        <div dangerouslySetInnerHTML={{ __html: truncatedFounderMsg }}></div>
                        <Link to="/founder-message">
                          <button className="brown-button btn-sm">Read More</button>
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <img src="/images/all-img/MMI-Founder.jpg" alt="Founder" style={imageStyles1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 2nd tab */}
            <div className="col-md-6 col-12">
              <div style={boxStyles1} id="style-1">
                <div className="section-heading">
                  <h5 className="entry-titles">REV. FRANCIS KALIST DD <br />(PATRON BISHOP)</h5>
                </div>
                <div className="entry-content">
                  <div className="row">
                    <div className="col-lg-5">
                      <img src="/images/all-img/MMI-Patron-Bishop.jpg" alt="Founder" style={imageStyles} />
                    </div>
                    <div className="col-lg-7">
                      <div className="tab-image entry-content mt-2">
                        <div dangerouslySetInnerHTML={{ __html: trcuncatedpatronmsg }}></div>
                        <Link to="/bishop-message">
                          <button className="brown-button btn-sm">Read More</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStatic;
