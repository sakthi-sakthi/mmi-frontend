import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiUrl from "../../Api/Api";
import axios from "axios";

function Footer() {
  const [address, setAddress] = useState(null);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('addressData');
        if (cachedData) {
          setAddress(JSON.parse(cachedData));
        } else {
          const response = await axios.get(`${ApiUrl}/get/contactDetails`);
          setAddress(response?.data?.data);
          localStorage.setItem('HomeaddressData', JSON.stringify(response?.data?.data));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <footer className="site-footer">
        <div className="footer-widgets">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="section-heading">
                  <h2 className="entry-title mb-4">About Us</h2>
                </div>
                <div className="row">
                  <div className="col-4">
                    <img
                      src="images/all-img/embelem-footer.png"
                      alt=""
                      style={{
                        display: "block",
                        marginLeft: "0",
                        maxWidth: "103px",
                        marginRight: "auto",
                      }}
                    />
                  </div>
                  <div className="col-8">
                    <p
                      style={{
                        color: "white",
                        textAlign: "justify ",
                        fontSize: "14px",
                      }}
                    >
                      The church has always been apostolic, prophetic and missionary. God’s ways of calling more laborers to preach the Gospel are innumerable.
                    </p>
                  </div>
                  <p
                    style={{
                      color: "white",
                      textAlign: "justify",
                      fontSize: "14px",
                    }}
                  >
                    We are a clerical society of Apostolic Life of Missionaries Priests called by God our Father, to be a PROPHETIC, APOSTOLIC and MISSIONARIES.
                    <br />
                    <br />
                    <Link
                      to={"about-mmi"}
                      className="btn-sm"
                      style={{
                        backgroundColor: "#e0ab08",
                        color: "#fff",
                        textDecoration: "none",
                      }}
                    >
                      View More
                    </Link>
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="foot-contact">
                  <div className="section-heading">
                    <h2 className="entry-title mb-4">Contact Us</h2>
                  </div>
                  {address ? (
                    <ul>
                      <li>
                        <i className="fa fa-phone mr-2" />
                        <Link to={`tel:${address.mobile}`}>{address.mobile}</Link>
                      </li>
                      <li>
                        <i className="fa fa-envelope mr-2" />
                        <Link to={`mailto:${address.email}`}>
                          {address.email}
                        </Link>
                      </li>
                      <li>
                        <i className="fa fa-envelope mr-2" />
                        <Link to={"mailto:mmisecgen@gmail.com"}>
                          mmisecgen@gmail.com
                        </Link>
                      </li>
                      <li>
                        <i className="fa fa-map-marker mr-2" />
                        <span>
                          <p style={{ color: "#fff" }}>
                            MMI Generalate Plot No. 167-A,Housing board,<br /> Defence Enclave, Sardhana Road,<br /> Kankar Khera, Meerut. 250001. U. P.
                          </p>
                          <li>
                            <a
                              href="/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fab fa-twitter mr-2" />
                            </a>
                            &nbsp;
                            <a
                              href="/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fab fa-google-plus mr-2" />
                            </a>
                            &nbsp;
                            <a
                              href="/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fab fa-facebook mr-2" />
                            </a>
                            &nbsp;
                            <a
                              href="/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fab fa-linkedin" />
                            </a>
                          </li>
                        </span>
                      </li>
                    </ul>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="foot-contact">
                  <div className="section-heading">
                    <h2 className="entry-title mb-4">Location</h2>
                  </div>
                  <iframe
                    src={address?.googleMapsUrl}
                    width={300}
                    height={200}
                    title="MMI"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                </div>
              </div>
            </div>
            <div style={{ marginBottom: "-17px" }}>
              <p
                className="text-center"
                style={{ fontSize: "14px", color: "white" }}
              >
                Copyright © 2024 Missionaries of  Mary Immaculate (MMI), All
                rights reserved. Powered by
                <a
                  className="tech"
                  style={{ color: "#ffd700" }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.boscosofttech.com/"
                >
                  &nbsp;Boscosofttech
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
