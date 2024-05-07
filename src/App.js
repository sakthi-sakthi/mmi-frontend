import Home from "./home";
import { Routes, Route } from "react-router-dom";
import AboutMMI from "./pages/About/AboutMMI";
import MainLayout from "./layout";
import Administration from "./pages/Administration/Administration";
import Priest from "./pages/Administration/Priest";
import ViceProvince from "./pages/Administration/ViceProvince";
import Delegations from "./pages/Administration/Delegations";
import CountryHead from "./pages/Administration/CountryHead";
import Spiritual from "./pages/Spiritual/Spiritual";
import OurPresence from "./pages/OurPresence/OurPresence";
import Vocations from "./pages/Vocations/Vocations";
import Formation from "./pages/Formation/Formation";
import Privacy from "./pages/PrivacyPolicy/Privacy";
import PhotoGallery from "./pages/Gallery/PhotoGallery";
import Contact from "./pages/ContactUs/contact";
import CalendarComponent from "./pages/Calendar/Calendar";
import FounderMessage from "./pages/Message/FounderMessage";
import PatronMessage from "./pages/Message/PatronMessage";
import VideoComponent from "./pages/Gallery/VideoGallery";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<MainLayout />}>
          <Route path="about-mmi" element={<AboutMMI />} />
          <Route path="history" element={<AboutMMI />} />
          {/* Adminstration Section Routing here */}
          <Route path="general-admin" element={<Administration />} />
          <Route path="province" element={<Priest />} />
          <Route path="vice-province" element={<ViceProvince />} />
          <Route path="delegations" element={<Delegations />} />
          <Route path="country-heads" element={<CountryHead />} />
          {/* Spirituality Section Routing here */}
          <Route path="sprituality" element={<Spiritual />} />
          {/* Our Presence Section Routing here */}
          <Route path="our-presence" element={<OurPresence />} />
          <Route path="african-province" element={<OurPresence />} />
          <Route path="rome" element={<OurPresence />} />
          <Route path="francis-province" element={<OurPresence />} />
          <Route path="malawi" element={<OurPresence />} />
          <Route path="papuva-new-guinea" element={<OurPresence />} />
          <Route path="tanzanian" element={<OurPresence />} />
          {/* Vocations Section Routing here */}
          <Route path="vocations" element={<Vocations />} />
          {/* Formation Section Routing here */}
          <Route path="formation" element={<Formation />} />
          {/* Gallery Section Routing here */}
          <Route path="gallery" element={<PhotoGallery />} />
          <Route path="video-gallery" element={<VideoComponent />} />
          {/* Privacy Policy Section Routing here */}
          <Route path="privacy-policy" element={<Privacy />} />
          {/* Contact Us Section Routing here */}
          <Route path="contact-us" element={<Contact />} />
          {/* Calendar Section Routing here */}
          <Route path="calendar" element={<CalendarComponent />} />
          {/* Messages Section Routing here */}
          <Route path="founder-message" element={<FounderMessage />} />
          <Route path="bishop-message" element={<PatronMessage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
