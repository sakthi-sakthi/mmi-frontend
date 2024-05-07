import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { ReligioUrl } from '../components/API/Api';


function NewsEvents() {
    const [newsEvents, setNewsEvents] = useState([]);
    useEffect(() => {
        axios
            .get(`${ReligioUrl}/news/province/2`)
            .then((response) => {
                if (Array.isArray(response.data)) {
                }
                const data = response.data.data;
                data.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                });
                setNewsEvents(data.reverse());
            })
            .catch((error) => {
                console.error("Error fetching data from API:", error);
            });
    }, []);
    const [showDetails, setShowDetails] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 5;

    const toggleDetails = (index) => {
        setShowDetails({
            ...showDetails,
            [index]: !showDetails[index]
        });
    };
    const sanitizeDescription = (description) => {
        const sanitizedDescription = DOMPurify.sanitize(description);
        return { __html: sanitizedDescription };
    };

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(newsEvents.length / newsPerPage); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = newsEvents.slice(indexOfFirstNews, indexOfLastNews);
    return (
        <>
            <Header />
            <div className="home-mother">
                <div className="container" style={{ padding: "30px" }}>
                    <h3 className="entry-title motherhouse">
                        <a href="/news-events">News & Events</a>
                    </h3>
                    <div className="brudcrums">
                        <Link to={"/"}>Home &nbsp;»&nbsp;{" "}</Link>
                        <span className="pagename">News & Events</span>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="section-heading">
                    <h1 className="entry-title" style={{ fontSize: "33px" }}>News & Events</h1>
                </div>
                <br />
                {currentNews.map((event, index) => (
                    <Card key={index} className="mb-3">
                        <Card.Body>
                            <div className="scrollable-content" id="calendarbody">
                                <Card.Title id="mediumTitle">{event.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted"><b>{event.start_date}</b></Card.Subtitle>
                                <Card.Text>
                                    {showDetails[index]
                                        ? (
                                            <div
                                                dangerouslySetInnerHTML={sanitizeDescription(event.description)}
                                            />
                                        ) : (
                                            <div
                                                dangerouslySetInnerHTML={sanitizeDescription(event.description.slice(0, 100) + '...')}
                                            />
                                        )}
                                </Card.Text>
                                <Button onClick={() => toggleDetails(index)}>
                                    {showDetails[index] ? 'Show Less' : 'Read More'}
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
                <Pagination className="custom-pagination">
                    <Pagination.Prev
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    <Pagination.Next
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pageNumbers.length}
                    />
                </Pagination>
            </div>
            <Footer />
        </>
    );
}

export default NewsEvents;
