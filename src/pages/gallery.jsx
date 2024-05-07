import Footer from "../components/footer";
import Header from "../components/header";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link } from "react-router-dom";
function Gallery() {
  const [slider, setslider] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const fetchslide = () => {
    fetch(`${ApiUrl}/get/slidebar`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setslider(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const fatchGallery = () => {
    fetch(`${ApiUrl}/get/gallery_images`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setGalleryData(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchslide();
    fatchGallery();
  }, []);
  const openImagePopup = (image) => {
    setSelectedImage(image);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };
  return (
    <>
      <Header />
      <div className="home-mother">
        <div className="container" style={{ padding: "30px" }}>
          <h3 className="entry-title motherhouse">
            <a href="/gallery">Gallery</a>
          </h3>
          <div className="brudcrums">
            <Link to={"/"}>Home &nbsp;»&nbsp; </Link>
            <span className="pagename">Gallery</span>
          </div>
        </div>
      </div>

      <div className="container subpage">
        <h3 className="heading">Gallery</h3>
        <div className="row">
          <div className="col-lg-9">
            <div>
              <div className=" mt-5">
                <img
                  src="images/subpage/event-00001.jpg"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="col-lg-3 sidebar">
            {slider?.map((item) => (
              <div className="slidedata" key={item.id}>
                <img src={item.image} alt="" />
                <strong>{item.title} </strong>
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                <br /> <br />
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="row">
            {galleryData?.map((item) => (
              <div key={item.id} className="col-lg-4">
                <div className="gallery-item">
                  <img
                    src={item.image}
                    style={{
                      width: "400px",
                      height: "250px",
                      cursor: "pointer",
                    }}
                    onClick={() => openImagePopup(item.image)}
                    alt={item.alt_tag || "Image"}
                  />
                  <div className="image-details">
                    <p>
                      <b>{item.title || "Image"}</b>
                    </p>
                    <p>
                      <b>{item.date}</b>
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Gallery;
