import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import NoImage from "../assets/img/no-image-available.png";
import { ReligioUrl } from '../components/API/Api';

const TabWrapper = styled.div`
  background-color: #f8f8f8;
`;

const StyledTabList = styled.div`
  display: flex;
  background-color: #E6E6E6;
  margin: 0;
  padding: 0;
`;

const StyledTab = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  background-color: ${props => (props.isSelected ? '#6b1d2f' : '#E6E6E6')};
  color: ${props => (props.isSelected ? '#f6c93f' : '#6b1d2f')};
  font-weight:500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background-color 0.3s;
  &:hover {
    background-color: #6b1d2f;
    color:#f6c93f;
  }
`;

const StyledTabPanel = styled.div`
  max-height: 823px;
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
`;
const Newtab = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState([]);
    const [showDescriptionAsText] = useState(false);

    useEffect(() => {
        // Fetch description
        axios.get(`${ReligioUrl}/commission/province/2`)
            .then(response => {
                const desc = response?.data?.data?.find(item => item.name === 'COSAF')?.description;
                setDescription(desc);
            })
            .catch(error => {
                console.error('Error fetching description:', error);
            });

        // Fetch members
        axios.get(`${ReligioUrl}/commission/province/2`)
            .then(response => {
                const membersData = response?.data?.data?.find(item => item.name === 'COSAF')?.com_members;

                if (membersData) {
                    setMembers(membersData);
                }
            })
            .catch(error => {
                console.error('Error fetching members:', error);
            });
    }, []);

    // Map the members to testimonial cards with fixed dimensions
    const testimonialCards = members?.map((member, index) => (
        <div key={index} className="col-md-3 pb-3">
            <div className="container">
                <div className="pt-2 m-auto">
                    <div className="card card-custom bg-white border-white border-0">
                        <div
                            className="card-custom-img"
                            style={{
                                backgroundImage: "url(https://res.cloudinary.com/d3/image/upload/c_scale,q_auto:good,w_1110/trianglify-v1-cs85g_cc5d2i.jpg)"
                            }}
                        />

                        <div className="card-custom-avatar pb-4">
                            <img
                                className="img-fluid bg-white"
                                src={member.member_image}
                                alt="Avatar"
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop
                                    e.target.src = NoImage; // Use the path to custom image
                                }}
                            />
                        </div>
                        <div className="card-body text-center pt-4 p-0" style={{ overflowY: "auto" }}>
                            <h5 className="card-title"> {member.member}</h5>
                        </div>
                        <div
                            className="card-footer text-center"
                            style={{ background: "inherit", borderColor: "inherit" }}
                        >
                            <p className="card-text">
                                <b>Role :</b> {member.role}
                            </p>
                            {member.status === "Active" ? <span class="badge rounded-pill text-bg-success">{member.status}</span> : <span class="badge rounded-pill text-bg-danger">{member.status}</span>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    ));
    const tabContent = [
        {
            title: 'Description',
            content: showDescriptionAsText ? description : (
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
            ),
        },
        {
            title: 'Members',
            content: (

                <div className="row">
                    {testimonialCards}
                </div>

            ),
        },
        // {
        //     title: 'Gallery',
        //     content: 'Image 1 URL, Image 2 URL, Image 3 URL',
        // },
    ];

    return (
        <>
            <Header />
            <TabWrapper>
                <div className="home-mother">
                    <div className="container" style={{ padding: '30px' }}>
                        <h3 className="entry-title motherhouse">
                            <a href="/vocation-promotion">Vocation Promotion</a>
                        </h3>
                        <div className="brudcrums">
                            <Link to={'/'}>Home » </Link>
                            <span className="pagename">Vocation Promotion</span>
                        </div>
                    </div>
                </div>
            </TabWrapper>
            <TabWrapper>
                <br />
                <div className="container">
                    <StyledTabList>
                        {tabContent?.map((tab, index) => (
                            <StyledTab
                                key={index}
                                isSelected={selectedTab === index}
                                onClick={() => setSelectedTab(index)}
                            >
                                {tab.title}
                            </StyledTab>
                        ))}
                    </StyledTabList>

                    <StyledTabPanel>
                        {selectedTab === 1 ? (
                            <div className="row">
                                {testimonialCards}
                            </div>
                        ) : (
                            <>
                                <h2>{tabContent[selectedTab].title}</h2>
                                {tabContent[selectedTab].content}
                            </>
                        )}
                    </StyledTabPanel>
                </div>
            </TabWrapper>
            <br />
            <Footer />
        </>
    );
};

export default Newtab;
