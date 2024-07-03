import { useEffect, useState } from "react";
import { ApiUrl } from "./components/API/Api";
import About from "./components/about";
import Churchstatic from "./components/churchstatic";
import Footer from "./layout/partials/footer";
import Header from "./layout/partials/header";
import Scrollbar from "./components/scrollbar";
import Slider from "./components/slider";
import Upcoming from "./components/upcoming";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import OurStatic from "./components/ourstatic";

function Home() {
  const [loading, setLoading] = useState(true);
  const [homedata, setHomedata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/homepagee/sections`);
        const data = response?.data?.data;
        setHomedata(data);
        sessionStorage.setItem('homedata', JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchpageData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/Pages`);
        const data = response?.data?.pages;
        setHomedata(data);
        sessionStorage.setItem('pagedata', JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const storedHomedata = sessionStorage.getItem('homedata');
    const storedPagedata = sessionStorage.getItem('pagedata');

    if (storedHomedata && storedPagedata) {
      setHomedata(JSON.parse(storedHomedata));
      setLoading(false);
    } else {
      fetchpageData();
      fetchData();
    }
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
          height="60"
          width="60"
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
    <div>
      <Header menudata={homedata?.headermenudata} />
      <Slider sliderdata={homedata?.SlidesData} />
      <Scrollbar />
      <About />
      <OurStatic />
      <Churchstatic />
      <Upcoming />
      <Footer footerdata={homedata?.footercontactdata} />
    </div>
  );
}

export default Home;
