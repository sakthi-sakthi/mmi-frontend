import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { ReligioUrl } from "../components/API/Api";

function NewsLetter() {
  const [pdfLinks, setPdfLinks] = useState([]);
  const [archivedPdfLinks, setArchivedPdfLinks] = useState([]);
  const [circulars, setCirculars] = useState([]);
  const [mainAccordionOpen, setMainAccordionOpen] = useState(true);
  const [subAccordionOpen, setSubAccordionOpen] = useState(1);

  const handleMainAccordionClick = () => {
    setMainAccordionOpen((prevState) => !prevState);
  };

  const handleSubAccordionClick = (index) => {
    if (index === subAccordionOpen) {
      setSubAccordionOpen(0);
    } else {
      setSubAccordionOpen(index);
    }
  };

  const handleMouseEnter = (event) => {
    event.currentTarget.style.overflowY = "scroll";
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.style.overflowY = "hidden";
  };

  function getMonthName(month) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[parseInt(month, 10) - 1]; // Subtracting 1 because months are zero-indexed in JavaScript Date object
  }


  useEffect(() => {
    axios
      .get(`${ReligioUrl}/newsletter/province/2`)
      .then((response) => {
        const allPdfLinks = response.data.data;
        const currentYearPdfLinks = [];
        const archivedPdfLinks = [];

        const currentDate = new Date();

        allPdfLinks.forEach((item) => {
          const year = new Date(item.year);

          if (year.getFullYear() === currentDate.getFullYear()) {
            currentYearPdfLinks.push(item);
          } else {
            archivedPdfLinks.push(item);
          }
        });

        setPdfLinks(currentYearPdfLinks);
        setArchivedPdfLinks(archivedPdfLinks);
      })
      .catch((error) => {
        console.error("Error fetching newsletter data:", error);
      });

    axios
      .get("https://epdata.stcharleschennai.com/api/circular/province/2")
      .then((response) => {
        setCirculars(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching circular data:", error);
      });
  }, []);

  if (pdfLinks.length > 0) {
    pdfLinks.sort((a, b) => new Date(b.year) - new Date(a.year));
  }

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Header />
      <div className="home-mother">
        <div className="container" style={{ padding: "30px" }}>
          <h3 className="entry-title motherhouse">
            <a href="/newsletter">Newsletter / Circular</a>
          </h3>
          <div className="brudcrums">
            <Link to={"/"}>Home &nbsp;»&nbsp; </Link>
            <span className="pagename">Newsletter / Circular</span>
          </div>
        </div>
      </div>
      <br />
      <div className="container subpage">
        <div className="row">
          <div className="col-lg-6">
            <div className="row">
              <div
                className="col-12 col-lg-12 custom-scrollbar"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <div className="accordion" id="newsletterAccordion">
                  <div className="accordion-item mb-4">
                    <h2 className="accordion-header" onClick={handleMainAccordionClick}>
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#allNewsletters"
                        aria-expanded="true"
                        aria-controls="allNewsletters"
                        style={{ fontWeight: "bold" }}>
                        NewsLetter - {new Date().getFullYear()}
                      </button>
                    </h2>
                    <div
                      id="allNewsletters"
                      className={`accordion-collapse collapse ${mainAccordionOpen ? "show" : ""}`}
                      aria-labelledby="allNewsletters"
                      data-parent="#newsletterAccordion">
                      <div className="accordion-body">
                        {pdfLinks.length > 0 ? (
                          pdfLinks
                            .reduce((acc, pdf) => {
                              const existingMonth = acc.find(
                                (item) => item.month === pdf.month
                              );
                              if (existingMonth) {
                                existingMonth.pdfs.push(pdf);
                              } else {
                                acc.push({ month: pdf.month, pdfs: [pdf] });
                              }
                              return acc;
                            }, [])
                            .map((monthGroup, index) => (
                              <div key={index}>
                                <div className="accordion-item">
                                  <h2
                                    className="accordion-header"
                                    onClick={() =>
                                      handleSubAccordionClick(index + 1)
                                    }>
                                    <button
                                      className="accordion-button"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={`#collapse${index}`}
                                      aria-expanded={index === 0 ? "true" : "false"}
                                      aria-controls={`collapse${index}`}
                                      onClick={(event) => {
                                        const clickedElement = event.target;
                                        const isSubAccordion = clickedElement.closest(
                                          ".accordion-collapse"
                                        );

                                        if (!isSubAccordion) {
                                          const mainAccordion = document.getElementById(
                                            "allNewsletters"
                                          );
                                          if (mainAccordion) mainAccordion.classList.remove("show");
                                        }
                                      }}
                                      style={{ fontWeight: "bold" }}>
                                      {currentYear}
                                    </button>
                                  </h2>
                                  <div
                                    id={`collapse${index}`}
                                    className={`accordion-collapse collapse ${subAccordionOpen === index + 1 ? "show" : ""
                                      }`}
                                    aria-labelledby={`heading${index}`}
                                    data-parent="#newsletterAccordion">
                                    <div className="accordion-body">
                                      {monthGroup.pdfs.map((pdf, pdfIndex) => (
                                        <div key={pdfIndex}>
                                          <p>
                                            <b>{pdf.name} </b>
                                          </p>
                                          <a
                                            href={pdf.upload}
                                            rel="noopener noreferrer"
                                            className="btn btn-sm"
                                            target="_blank"
                                            style={{
                                              backgroundColor: "#012c6d",
                                              color: "#e0ab08",
                                              textDecoration: "none",
                                            }}>
                                            <FontAwesomeIcon icon={faDownload} /> Download
                                          </a>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                        ) : (
                          <p className="text-center font-weight-bold" style={{ fontSize: "16px" }}>
                            No Newsletters Available
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Archived Newsletters */}
                  {archivedPdfLinks.length > 0 && (
                    <div className="accordion-item mb-4">
                      <h2 className="accordion-header" onClick={() => handleSubAccordionClick(0)}>
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#archiveNewsletters"
                          aria-expanded="false"
                          aria-controls="archiveNewsletters"
                          style={{ fontWeight: "bold" }}>
                          Archived NewsLetter - {new Date().getFullYear() - 1}
                        </button>
                      </h2>
                      <div
                        id="archiveNewsletters"
                        className={`accordion-collapse collapse ${subAccordionOpen === 0 ? "show" : ""}`}
                        aria-labelledby="archiveNewsletters"
                        data-parent="#newsletterAccordion">
                        <div className="accordion-body">
                          {archivedPdfLinks?.map((pdf, pdfIndex) => (
                            <div key={pdfIndex}>
                              <p>
                                <b>{pdf.name} </b>
                              </p>
                              <a
                                href={pdf.upload}
                                rel="noopener noreferrer"
                                className="btn btn-sm"
                                target="_blank"
                                style={{
                                  backgroundColor: "#012c6d",
                                  color: "#e0ab08",
                                  textDecoration: "none",
                                }}>
                                <FontAwesomeIcon icon={faDownload} /> Download
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Circulars Section */}
          <div className="col-lg-6">
            <div className="row">
              <div
                className="col-12 col-lg-12 custom-scrollbar"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <div className="accordion" id="circularAccordion">
                  <div className="accordion-item mb-4">
                    <h2 className="accordion-header" onClick={handleMainAccordionClick}>
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#allCirculars"
                        aria-expanded="true"
                        aria-controls="allCirculars"
                        style={{ fontWeight: "bold" }}>
                        Circulars
                      </button>
                    </h2>
                    <div
                      id="allCirculars"
                      className={`accordion-collapse collapse ${mainAccordionOpen ? "show" : ""}`}
                      aria-labelledby="allCirculars"
                      data-parent="#circularAccordion">
                      <div className="accordion-body">
                        {circulars.length > 0 ? (
                          circulars.map((circular, index) => (
                            <div key={index}>
                              <p>
                                <b>{circular.name}</b>
                              </p>
                              <p>
                                <b>{getMonthName(circular.month)}, {circular.year}</b>
                              </p>
                              <a
                                href={circular.upload}
                                rel="noopener noreferrer"
                                className="btn btn-sm"
                                target="_blank"
                                style={{
                                  backgroundColor: "#012c6d",
                                  color: "#e0ab08",
                                  textDecoration: "none",
                                }}
                              >
                                <FontAwesomeIcon icon={faDownload} /> Download
                              </a>
                            </div>

                          ))
                        ) : (
                          <p className="text-center font-weight-bold" style={{ fontSize: "16px" }}>
                            No Circulars Available
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default NewsLetter;
