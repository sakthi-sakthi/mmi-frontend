import React from "react";
import {Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Header from "./partials/header";
import Footer from "./partials/footer";
import { ApiUrl } from "../components/API/Api";
const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const [Homedata, setHomedata] = useState(null);

  let location = useLocation();

  const url = location.pathname;

  const [pageTitle, setPageTitle] = useState("");
  
  useEffect(() => {
    const path = {
      "/about-mmi": "About MMI",
      "/history": "History",
      "/general-admin" :"MMI General Administration",
      "/province" : "Province",
      "/vice-province" : "Vice Province",
      "/delegations" : "Delegations",
      "/country-heads" : "Country Heads",
      "/sprituality" : "Sprituality",
      "/our-presence" : "Our Presence",
      "/african-province" : "Central African Province",
      "/rome" : "Rome",
      "/francis-province" : "Francis Xavier Province",
      "/malawi" : "Malawi",
      "/papuva-new-guinea" : "Papua New Guinea",
      "/tanzanian" : "Tanzanian",
      "/vocations" : "Vocations",
      "/formation" : "Formation",
      "/gallery" : "Gallery",
      "/privacy-policy" : "Privacy Policy & Terms of Use",
      "/contact-us" : "Contact Us",
      "/calendar" : "Calendar",
      "/founder-message" : "Founder Message",
      "/bishop-message" : "Patron Message",
      "/video-gallery" : "Video Gallery",
    };
    setPageTitle(path[url] ? path[url] : url);
  }, [url]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/homepagee/sections`);
        sessionStorage.setItem("HomeData", JSON.stringify(response?.data?.data));
        setHomedata(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#172440"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  return (
    <>
      <Header menudata={Homedata?.headermenudata} />
      <div style={{ minHeight: "66.5vh" }}>
        <div className="home-mother">
          <div className="container" style={{ padding: 30 }}>
            <h3 className="entry-title motherhouse">
              <a href={pageTitle}>{pageTitle}</a>
            </h3>
            <div className="brudcrums">
              <a href="/">Home &nbsp;»&nbsp; </a>
              <span className="pagename">{pageTitle}</span>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
