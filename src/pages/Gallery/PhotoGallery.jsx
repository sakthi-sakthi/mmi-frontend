import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';
import "../../components/css/LightboxGallery.css";
import ApiUrl from '../../Api/Api';

const StyledContainer = styled(Container)`
  margin-top: 20px;
  max-width: 1700px;
`;

const StyledTabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  flex-direction: row;
  width: 100%;
`;


const StyledTab = styled.div`
  padding: 10px 20px;
  margin: 5px;
  font-size: 16px;
  color: ${(props) => (props.active ? '#fff' : '#000')};
  background-color: ${(props) => (props.active ? '#172440' : '#f2f2f2')};
  border-radius: 10px;
  cursor: pointer;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? '#172440' : '#e9ecef')};
  }

  @media (max-width: 576px) { /* Adjust styles for screens smaller than 576px (typically mobile phones) */
  font-size: 13px;
  padding: 6px 3px;
  width: calc(100% / 4);
  white-space: normal;
  text-align: center;
  margin-left: 10px;
  }
`;


const StyledImage = styled.img`
  object-fit: cover;
  cursor: pointer;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
`;

const StyledMessage = styled.p`
  text-align: center;
`;

const PhotoGallery = () => {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);


    const storeImagesInLocalStorage = (images) => {
        localStorage.setItem('galleryImages', JSON.stringify(images));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/gallery_images`);
                const { data } = response.data;

                const cachedImages = localStorage.getItem('galleryImages');
                if (cachedImages && JSON.stringify(data) === cachedImages) {
                    setImages(JSON.parse(cachedImages));
                    setCategories([...new Set(JSON.parse(cachedImages)?.map((image) => image.categoryname))]);
                } else {
                    setImages(data);
                    setCategories([...new Set(data?.map((image) => image.categoryname))]);
                    storeImagesInLocalStorage(data);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const filteredImages = selectedCategory
        ? images.filter((image) => image.categoryname === selectedCategory)
        : images;

    const openLightbox = (image) => {
        setLightboxImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxImage(null);
        document.body.style.overflow = '';
    };

    return (
        <StyledContainer>
            <br />
            <StyledTabContainer>
                <StyledTab
                    active={!selectedCategory}
                    onClick={() => handleCategorySelect('')}
                >
                    All
                </StyledTab>
                {categories?.map((category, index) => (
                    <StyledTab
                        key={index}
                        active={selectedCategory === category}
                        onClick={() => handleCategorySelect(category)}
                    >
                        {category}
                    </StyledTab>
                ))}
            </StyledTabContainer>

            {loading ? (
                <StyledMessage style={{ color: "black" }}><b>Loading...</b></StyledMessage>
            ) : (
                <Row>
                    {filteredImages?.length === 0 ? (
                        <StyledMessage style={{ color: "black" }}><b>No images found.</b></StyledMessage>
                    ) : (
                        filteredImages?.map((image) => (
                            <Col sm={3} className="mb-3" key={image.id}>
                                <StyledImage
                                    src={image.image}
                                    alt={image.title}
                                    onClick={() => openLightbox(image)}
                                    className="img-fluid"
                                />
                            </Col>
                        ))
                    )}
                </Row>
            )}
            {lightboxImage && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="close-button" onClick={closeLightbox}>
                        &times;
                    </button>
                    <div className="lightbox-container">
                        <img
                            src={lightboxImage.image}
                            alt="nodata"
                            className="img-fluid rounded lightbox-image"
                        />
                    </div>
                </div>
            )}
        </StyledContainer>
    );
};

export default PhotoGallery;
