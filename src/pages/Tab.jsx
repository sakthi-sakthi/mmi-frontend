import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import ApiUrl from "../Api/Api";
import NoImage from "../assets/img/no-image-available.png";
import Badge from "react-bootstrap/Badge";
import { ReligioUrl } from "../components/API/Api";

const TabWrapper = styled.div`
  background-color: #f8f8f8;
`;

const StyledTabList = styled.div`
  display: flex;
  background-color: #e6e6e6;
  margin: 0;
  padding: 0;
`;

const StyledTab = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  background-color: ${(props) => (props.isSelected ? "#6b1d2f" : "#E6E6E6")};
  color: ${(props) => (props.isSelected ? "#f6c93f" : "#6b1d2f")};
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background-color 0.3s;
  &:hover {
    background-color: #6b1d2f;
    color: #f6c93f;
  }
`;

const StyledTabPanel = styled.div`
  max-height: 1000px;
  overflow-y: hidden;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  color: #333;
  margin-top: 10px;
  transition: overflow-y 0.3s;
  &:hover {
    overflow-y: auto;
  }

  /* Add the Bootstrap scrollbar class */
  &.overflow-auto {
    overflow: auto;
  }
`;

const MyTabComponent = () => {
  const badgeColors = ["success", "danger", "warning", "info"];
  const params = window.location.href;
  const url = new URL(params);
  const paramid = url.searchParams.get("params");
  const id = parseInt(atob(paramid));
  // const name = paramid;

  const [selectedTab, setSelectedTab] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [accordionData, setAccordionData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [specificCommunityData, setSpecificCommunityData] = useState([]);

  // Fetch Gallery Images

  useEffect(() => {
    axios
      .get(`${ApiUrl}/get/gallery_images`)
      .then((response) => {
        setGalleryImages(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching gallery images:", error);
      });
  }, [id]);

  // Fetch Institution Data

  useEffect(() => {
    axios
      .get(`${ReligioUrl}/institutions/house/${id}`)
      .then((response) => {
        setAccordionData(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching accordion data:", error);
      });
  }, [id]);

  // Fetch Member Data

  useEffect(() => {
    axios
      .get(`${ReligioUrl}/member/house/${id}`)
      .then((response) => {
        setMemberData(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching member data:", error);
      });
  }, [id]);

  // Fetch Profile Data

  useEffect(() => {
    axios
      .get(`${ReligioUrl}/houses/province/2`)
      .then((response) => {
        setTimeout(() => {
          setProfileData(response?.data?.data);
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (profileData) {
      const filteredData = profileData?.filter((item) => item.id === id);

      if (filteredData?.length > 0) {
        const foundItem = filteredData;
        setSpecificCommunityData(foundItem);
      }
    }
  }, [profileData, id]);

  const openImagePopup = (image) => {
    setSelectedImage(image);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  const tabContent = [
    {
      title:
        specificCommunityData?.length > 0
          ? specificCommunityData[0]?.name?.split("-")[0]
          : "Loading...",
      content: "This is the content for Profile tab.",
      apiData: profileData,
      render: () => (
        <>
          {loading ? (
            <div className="loader">
              <p>
                <b>Loading...</b>
              </p>
            </div>
          ) : specificCommunityData.length > 0 ? (
            <div className="row">
              {specificCommunityData.length > 0 ? (
                specificCommunityData?.map((profile) => (
                  <div className="col-md-9 pb-3">
                    <>
                      <h2 className="text-center" style={{ color: "#6b1d2f" }}>
                        <strong>
                          {profile?.name !== "" ? profile?.name : "No data"}
                        </strong>
                      </h2>
                      <br />
                      <section className="light">
                        <article className="postcard light yellow">
                          <img
                            className="postcard__img"
                            src={profile?.image_1920 || NoImage}
                            alt=""
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = NoImage;
                            }}
                          />
                          <div className="postcard__text t-dark">
                            <div className="additional-details">
                              <div className="row mb-2 mb-md-2">
                                <div className="col-12 col-md-4">
                                  <strong>Founder</strong>
                                </div>
                                <div className="col-12 col-md-8">
                                  {profile.founder}
                                </div>
                              </div>
                              <div className="row mb-2 mb-md-2">
                                <div className="col-12 col-md-4">
                                  <strong>Patron</strong>
                                </div>
                                <div className="col-12 col-md-8">
                                  {profile.patron_id}
                                </div>
                              </div>
                              <div className="row mb-2 mb-md-2">
                                <div className="col-12 col-md-4">
                                  <strong>Ministry</strong>
                                </div>
                                <div className="col-12 col-md-8">
                                  {profile?.ministry_ids
                                    ? profile.ministry_ids
                                        .split(",")
                                        .map((ministryId, index) => (
                                          <Badge
                                            key={index}
                                            bg={
                                              badgeColors[
                                                index % badgeColors.length
                                              ]
                                            }
                                            className="mr-2">
                                            {ministryId}
                                          </Badge>
                                        ))
                                    : "No Ministries Found"}
                                </div>
                              </div>
                              <div className="row mb-2 mb-md-2">
                                <div className="col-12 col-md-4">
                                  <strong>Est Year</strong>
                                </div>
                                <div className="col-12 col-md-8">
                                  {profile.establishment_year}
                                </div>
                              </div>
                              <div className="row mb-2 mb-md-2">
                                <div className="col-12 col-md-4">
                                  <strong>Diocese</strong>
                                </div>
                                <div className="col-12 col-md-8">
                                  {profile.diocese_id}
                                </div>
                              </div>
                              <div className="row mb-2 mb-md-2">
                                <div className="col-12 col-md-4">
                                  <strong>Parish</strong>
                                </div>
                                <div className="col-12 col-md-8">
                                  {profile.parish_id}
                                </div>
                              </div>
                              <div className="row mb-2 mb-md-2">
                                <div className="col-12 col-md-4">
                                  <strong>Address</strong>
                                </div>
                                <div className="col-12 col-md-8">
                                  {profile?.street.trim() &&
                                    `${profile.street}, `}
                                  {profile?.street2.trim() &&
                                    `${profile.street2}, `}
                                  {profile?.place.trim() &&
                                    `${profile.place}, `}
                                  {profile?.city.trim() && `${profile.city}, `}
                                  {profile?.district_id.trim() &&
                                    `${profile.district_id}, `}
                                  {profile?.state_id.trim() &&
                                    `${profile.state_id}, `}
                                  {profile?.country_id.trim() &&
                                    `${profile.country_id}, `}
                                  {profile?.zip.trim() && `${profile.zip}, `}
                                  <br />
                                  <br />
                                  <i className="fa fa-envelope mr-2"></i>
                                  <a href={`mailto:${profile.email}`}>
                                    {profile.email}
                                  </a>
                                  <br />
                                  <i className="fa fa-phone mr-2"></i>
                                  <a href={`tel:${profile.mobile}`}>
                                    {profile.mobile}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      </section>
                    </>
                  </div>
                ))
              ) : (
                <div className="col-lg-12">
                  <p>
                    <b>No data Available</b>
                  </p>
                </div>
              )}
              {specificCommunityData.length > 0 &&
                specificCommunityData?.map((profile) => (
                  <>
                    <div className="col-md-3 mx-auto mt-3">
                      <h2 className="text-center" style={{ color: "#6b1d2f" }}>
                        <strong>Superior</strong>
                      </h2>
                      <div className="container">
                        <div className="pt-2 m-auto">
                          <div className="card card-custom bg-white border-white border-0">
                            <div
                              className="card-custom-img"
                              style={{
                                backgroundImage:
                                  "url(images/all-img/CardBackgroudImage.jpg)",
                              }}
                            />
                            <div className="card-custom-avatar pb-4">
                              <img
                                className="img-fluid bg-white myimg"
                                src={
                                  profile?.superior_id?.image_1920 || NoImage
                                }
                                alt="Avatar"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = NoImage;
                                }}
                              />
                            </div>
                            <div className="card-body text-left pt-4 p-4">
                              <p className="card-title">
                                {profile?.superior_id.name}
                              </p>
                              <p className="card-title">
                                {profile?.superior_id.role_ids
                                  ? profile.superior_id.role_ids
                                      .split(",")
                                      .map((roleId, index) => (
                                        <Badge
                                          key={index}
                                          bg={
                                            badgeColors[
                                              index % badgeColors.length
                                            ]
                                          }
                                          className="mr-2">
                                          {roleId}
                                        </Badge>
                                      ))
                                  : "No Roles Found"}
                              </p>
                            </div>
                            <div
                              className="card-footer text-center"
                              style={{
                                background: "inherit",
                                borderColor: "inherit",
                              }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          ) : (
            <div className="col-lg-12">
              <p>
                <b>No Profile Data Available</b>
              </p>
            </div>
          )}
        </>
      ),
    },
    {
      title: "History",
      content: "This is the content for History tab.",
      render: () => (
        <>
          <h2>History</h2>
          {specificCommunityData[0]?.history ? (
            <div
              dangerouslySetInnerHTML={{
                __html: specificCommunityData[0].history,
              }}
            />
          ) : (
            <p>
              <b></b>No History Available
            </p>
          )}
        </>
      ),
    },
    {
      title: "Members",
      content: "This is the content for Members tab.",
      apiData: memberData,
      render: () => (
        <>
          <div className="row">
            {memberData && memberData.length > 0 ? (
              memberData?.map((member, index) => (
                <div key={index} className="col-md-3 pb-3">
                  <div className="container">
                    <div className="pt-2 m-auto">
                      <div className="card card-custom bg-white border-white border-0">
                        <div
                          className="card-custom-img"
                          style={{
                            backgroundImage:
                              "url(images/all-img/CardBackgroudImage.jpg)",
                          }}
                        />
                        <div className="card-custom-avatar pb-4">
                          <img
                            className="img-fluid bg-white "
                            src={member.image_1920 || NoImage}
                            alt="Avatar"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = NoImage;
                            }}
                          />
                        </div>
                        <div className="card-body text-center pt-4 p-0">
                          <p className="card-title"> {member.member_name}</p>
                        </div>
                        <div
                          className="card-footer text-center"
                          style={{
                            background: "inherit",
                            borderColor: "inherit",
                          }}>
                          <p className="card-text">
                            <b>
                              {member?.role_ids ? (
                                member.role_ids
                                  .split(",")
                                  .map((roleId, index) => (
                                    <Badge
                                      key={index}
                                      bg={
                                        badgeColors[index % badgeColors.length]
                                      }
                                      className="mr-2">
                                      {roleId}
                                    </Badge>
                                  ))
                              ) : (
                                <Badge bg="primary">No Roles Found</Badge>
                              )}
                            </b>
                          </p>
                          <p className="card-text">
                            {member.email && (
                              <div className="d-flex">
                                <i className="fa fa-envelope mr-2 mt-1"> </i>
                                <p>
                                  <a
                                    href={`mailto:${member.email}`}
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                    }}>
                                    {member.email}
                                  </a>
                                </p>
                              </div>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-lg-12">
                <p>
                  <b>No Members Available</b>
                </p>
              </div>
            )}
          </div>
        </>
      ),
    },
    {
      title: "Institution",
      content: "This is the content for Institution tab.",
      apiData: accordionData,
      render: () => (
        <>
          {accordionData && accordionData.length > 0 ? (
            <div className="accordion" id="accordionExample">
              {accordionData?.map((item, index) => (
                <div key={index} className="card mb-2">
                  <div className="accordion-header" id={`heading${index}`}>
                    <h2 className="mb-0">
                      <a
                        href="/"
                        style={{
                          display: "flex",
                          alignItems: "left",
                          borderRadius: "2px",
                          border: "1px #f6c93f",
                          backgroundColor: "#E6E6E6",
                          color: "#6b1d2f",
                          fontSize: "8px !important",
                          fontWeight: "bold",
                          textDecoration: "none",
                        }}
                        className="accordion-button"
                        type="button"
                        data-toggle="collapse"
                        data-target={`#collapse${index}`}
                        aria-expanded="true"
                        aria-controls={`collapse${index}`}>
                        {item.name}
                      </a>
                    </h2>
                  </div>
                  <div
                    id={`collapse${index}`}
                    className={`collapse ${index === 0 ? "show" : ""}`}
                    aria-labelledby={`heading${index}`}
                    data-parent="#accordionExample">
                    <div className="accordion-body">
                      <div className="row">
                        <div className="col-md-9 pb-3">
                          <>
                            <br />
                            <section className="light">
                              <article className="postcard light yellow">
                                <img
                                  className="postcard__img"
                                  src={item?.image_1920 || NoImage}
                                  alt=""
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = NoImage;
                                  }}
                                />
                                <div className="postcard__text t-dark">
                                  <div className="additional-details">
                                    <div className="row mb-2 mb-md-2">
                                      <div className="col-12 col-md-4">
                                        <strong>Name</strong>
                                      </div>
                                      <div className="col-12 col-md-8">
                                        {item.name}
                                      </div>
                                    </div>
                                    <div className="row mb-2 mb-md-2">
                                      <div className="col-12 col-md-4">
                                        <strong>Diocese</strong>
                                      </div>
                                      <div className="col-12 col-md-8">
                                        {item.diocese_id}
                                      </div>
                                    </div>
                                    <div className="row mb-2 mb-md-2">
                                      <div className="col-12 col-md-4">
                                        <strong>Ministry</strong>
                                      </div>
                                      <div className="col-12 col-md-8">
                                        {item?.ministry_ids
                                          ? item.ministry_ids
                                              .split(",")
                                              .map((ministryId, index) => (
                                                <Badge
                                                  key={index}
                                                  bg={
                                                    badgeColors[
                                                      index % badgeColors.length
                                                    ]
                                                  }
                                                  className="mr-2">
                                                  {ministryId}
                                                </Badge>
                                              ))
                                          : "No Ministries Found"}
                                      </div>
                                    </div>
                                    <div className="row mb-2 mb-md-2">
                                      <div className="col-12 col-md-4">
                                        <strong>Parish</strong>
                                      </div>
                                      <div className="col-12 col-md-8">
                                        {item.parish_id}
                                      </div>
                                    </div>
                                    <div className="row mb-2 mb-md-2">
                                      <div className="col-12 col-md-4">
                                        <strong>Website</strong>
                                      </div>
                                      <div className="col-12 col-md-8">
                                        <a
                                          href={item.website}
                                          target="_blank"
                                          rel="noreferrer">
                                          {item.website}
                                        </a>
                                      </div>
                                    </div>
                                    <div className="row mb-2 mb-md-2">
                                      <div className="col-12 col-md-4">
                                        <strong>Address</strong>
                                      </div>
                                      <div className="col-12 col-md-8">
                                        {item?.street.trim() &&
                                          `${item.street}, `}
                                        {item?.street2.trim() &&
                                          `${item.street2}, `}
                                        {item?.place.trim() &&
                                          `${item.place}, `}
                                        {item?.city.trim() && `${item.city}, `}
                                        {item?.district_id.trim() &&
                                          `${item.district_id}, `}
                                        {item?.state_id.trim() &&
                                          `${item.state_id}, `}
                                        {item?.country_id.trim() &&
                                          `${item.country_id}, `}
                                        {item?.zip.trim() && `${item.zip}, `}
                                        <br />
                                        <br />
                                        <i className="fa fa-envelope mr-2"></i>
                                        {item.email}
                                        <br />
                                        <i className="fa fa-phone mr-2"></i>
                                        {item.mobile}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            </section>
                          </>
                        </div>
                        <h3>History</h3>
                        {item?.history ? (
                          <p
                            dangerouslySetInnerHTML={{ __html: item.history }}
                          />
                        ) : (
                          <p>No data available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>
              <b>No Institution Available</b>
            </p>
          )}
        </>
      ),
    },
    {
      title: "Gallery",
      content: "This is the content for Gallery tab.",
      apiData: galleryImages,
      render: () => (
        <>
          <div className="row">
            {galleryImages && galleryImages.length > 0 ? (
              galleryImages?.map((image, index) => (
                <div key={index} className="col-lg-3 mb-3">
                  <img
                    src={image.image}
                    alt={""}
                    style={{ width: "100%", height: "190px" }}
                    onClick={() => openImagePopup(image.image)}
                  />
                </div>
              ))
            ) : (
              <div className="col-lg-12">
                <p>
                  <b>No Images Available</b>
                </p>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Header />
      <TabWrapper>
        {specificCommunityData?.map((profile) => (
          <div className="home-mother">
            <div className="container" style={{ padding: "30px" }}>
              <h3 className="entry-title motherhouse">
                <a href="/vocation-promotion">{profile?.name?.split("-")[0]}</a>
              </h3>
              <div className="brudcrums">
                <Link to={"/"}>Home &nbsp;»&nbsp; </Link>
                <span className="pagename">{profile?.name?.split("-")[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </TabWrapper>
      <TabWrapper>
        <br />
        <div className="container">
          <StyledTabList>
            {tabContent?.map((tab, index) => (
              <StyledTab
                key={index}
                isSelected={selectedTab === index}
                onClick={() => setSelectedTab(index)}>
                {tab.title}
              </StyledTab>
            ))}
          </StyledTabList>

          <StyledTabPanel
            className={
              selectedTab !== null && selectedTab === 2
                ? "bootstrap-scrollbar"
                : "bootstrap-scrollbar"
            }>
            {tabContent[selectedTab].render()}
          </StyledTabPanel>
        </div>
        {selectedImage && (
          <div className="image-popup-overlay">
            <span className="close-icon" onClick={closeImagePopup}>
              &times;
            </span>
            <div className="image-popup">
              <img src={selectedImage} alt="Popup" />
            </div>
          </div>
        )}
      </TabWrapper>
      <br />
      <Footer />
    </>
  );
};

export default MyTabComponent;
