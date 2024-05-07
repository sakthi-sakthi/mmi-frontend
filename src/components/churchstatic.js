import React, { useState, useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
import axios from "axios";
import ApiUrl from "../Api/Api";

const imageStyles = {
  width: "180px",
  height: "200px",
  marginLeft: "20px"
};

const imageStyles1 = {
  height: "227px",
  marginLeft: "20px"
};

const boxStyles1 = {
  boxShadow: "0px 7px 16px 0px rgba(172 ,153 ,153, 0.5)",
  padding: "7px 25px 9px 22px",
  backgroundColor: "#fff",
  height: "430px",
  overflowY: "scroll",
};

const VerticalTabs2 = () => {
  const [activeTab1, setActiveTab1] = useState("Founder of MMI");
  const [activeTab2, setActiveTab2] = useState("Superior General");
  const [tabData, setTabData] = useState([]);
  const [tabData2, setTabData2] = useState([]);

  const handleTabSelect1 = (selectedTab) => {
    setActiveTab1(selectedTab);
  };

  function stripHtmlTags(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  useEffect(() => {
    axios
      .get(`${ApiUrl}/get/team/3`)
      .then((response) => {
        const filteredData = response?.data?.teams.filter(
          (item) => item.category_id === 3
        );
        const sanitizedData = filteredData?.map((item) => ({
          ...item,
          content: stripHtmlTags(item.content),
        }));
        setTabData(sanitizedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${ApiUrl}/get/team/4`)
      .then((response) => {
        const filteredData = response?.data?.teams.filter(
          (item) => item.category_id === 4
        );
        const sanitizedData = filteredData?.map((item) => ({
          ...item,
          content: stripHtmlTags(item.content),
        }));
        setTabData2(sanitizedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleTabSelect2 = (selectedTab) => {
    setActiveTab2(selectedTab);
  };

  useEffect(() => {
    setActiveTab1("Founder of MMI");
    setActiveTab2("Superior General");
  }, []);  

  return (
    <div
      className="container-fluid py-3"
      style={{ backgroundColor: "#172440" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-12">
            <div style={boxStyles1} id="style-1">
              <Tab.Container activeKey={activeTab1} onSelect={handleTabSelect1}>
                <div className="section-heading">
                  <h5 className="entry-titles">The Society of Missionaries of Mary Immaculate (MMI)</h5>
                </div>
                <br />
                <div className="entry-content">
                  <div className="row">
                    <div className="col-md-7 col-lg-6">
                      <Nav variant="pills" className="flex-column">
                        {tabData.map((item) => (
                          <Nav.Item key={item.title}>
                            <Nav.Link
                              eventKey={item.role}
                              className={`nav-link mb-3 p-3 shadow ${activeTab1 === item.role ? "active" : ""
                                }`}
                              style={{
                                fontFamily: "Arial, sans-serif",
                                fontSize: "15px",
                                fontWeight: "bold",
                                transition: "color 0.3s ease",
                              }}
                            >
                              {item.role}
                            </Nav.Link>
                          </Nav.Item>
                        ))}
                      </Nav>
                    </div>
                    <div className="col-md-5 col-lg-6">
                      <div className="tab-image">
                        <img
                          src={
                            tabData.find((item) => item.role === activeTab1)
                              ?.media_url
                          }
                          alt={activeTab1}
                          style={imageStyles}
                        />
                        <p
                          style={{
                            textAlign: "center",
                            marginTop: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          <br />
                          <span style={{ fontSize: "15px", color: "red" }}>
                            {activeTab1}
                          </span>
                          <br />
                          <span style={{ fontSize: "15px", color: "black" }}>
                            {
                              tabData?.find((item) => item.role === activeTab1)
                                ?.title
                            }
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Tab.Content>
                  {tabData.map((item) => (
                    <Tab.Pane
                      eventKey={item.title}
                      key={item.title}
                      className="tab-pane fade"
                      id={item.title}
                    >
                      {item.content}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
          {/* 2nd tab */}
          <div className="col-md-6 col-12">
            <div style={boxStyles1} id="style-1">
              <Tab.Container activeKey={activeTab2} onSelect={handleTabSelect2}>
                <div className="section-heading">
                  <h5 className="entry-titles">MMI General Administration</h5>
                </div>
                <br/>
                <div className="entry-content">
                  <div className="row">
                    <div className="col-md-7 col-lg-6">
                      <Nav variant="pills" className="flex-column">
                        {tabData2?.map((item) => (
                          <Nav.Item key={item.title}>
                            <Nav.Link
                              eventKey={item.role}
                              className={`nav-link mb-3 p-3 shadow ${activeTab2 === item.role ? "active" : ""
                                }`}
                              style={{
                                fontFamily: "Arial, sans-serif",
                                fontSize: "15px",
                                fontWeight: "bold",
                                transition: "color 0.3s ease",
                              }}
                            >
                              {item.role}
                            </Nav.Link>
                          </Nav.Item>
                        ))}
                      </Nav>
                    </div>
                    <div className="col-md-5 col-lg-6">
                      <div className="tab-image">
                        <img
                          src={
                            tabData2.find((item) => item.role === activeTab2)
                              ?.media_url
                          }
                          alt={activeTab2}
                          style={imageStyles1}
                        />
                        <p
                          style={{
                            textAlign: "center",
                            marginTop: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          <br />
                          <span style={{ fontSize: "15px", color: "red" }}>
                            {activeTab2}
                          </span>
                          <br />
                          <span style={{ fontSize: "15px", color: "black" }}>
                            {
                              tabData2.find((item) => item.role === activeTab2)
                                ?.title
                            }
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Tab.Content>
                  {tabData2.map((item) => (
                    <Tab.Pane
                      eventKey={item.title}
                      key={item.title}
                      className="tab-pane fade"
                      id={item.title}
                    >
                      {item.content}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTabs2;
