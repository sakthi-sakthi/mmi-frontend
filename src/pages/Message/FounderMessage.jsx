import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ApiUrl from '../../Api/Api';

const MessageContainer = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const MessageContent = styled.p`
  font-size: 17px;
  line-height: 1.6;
`;

const FounderMessage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/messages/5`);
                const sortedMessages = response?.data?.data?.sort((a, b) => b.id - a.id);
                setMessages(sortedMessages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const buttonStyle = {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
        padding: '10px 20px',
        color: '#fff',
        cursor: 'pointer',
        borderRadius: '5px',
        textDecoration: 'none',
        display: 'inline-block'
    };

    if (loading) return <div className='text-center mt-5' style={{ fontWeight: "bold", color: "black" }}>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const [latestMessage, ...olderMessages] = messages;

    return (
        <div className="container mt-3">
            <div className="section-title text-center">
                <h4 className="our-title mb-2">Founder Message</h4>
            </div>

            {latestMessage && (
                <MessageContainer>
                    <img src="images/all-img/MMI-Founder.jpg" alt="REV. FR. JESUADIMAI EMMANUEL ARUL RAJ" style={{ width: '100px', height: '100px', borderRadius: '50%', boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.1)" }} title='REV. FR. JESUADIMAI EMMANUEL ARUL RAJ' />
                    <MessageContent dangerouslySetInnerHTML={{ __html: latestMessage.content }} />
                     <div style={{ textAlign: 'right' }}>
                        <h5>REV. FR. JESUADIMAI EMMANUEL ARUL RAJ</h5>
                        <p><b>FOUNDER</b></p>
                    </div>
                </MessageContainer>
            )}

            {olderMessages.length > 0 && (
                <div className="accordion" id="olderMessagesAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="olderMessagesHeader">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#olderMessagesCollapse" aria-expanded="false" aria-controls="olderMessagesCollapse">
                                Old Founder Messages
                            </button>
                        </h2>
                        <div id="olderMessagesCollapse" className="accordion-collapse collapse" aria-labelledby="olderMessagesHeader" data-bs-parent="#olderMessagesAccordion">
                            <div className="accordion-body">
                                {olderMessages.map(message => (
                                    <MessageContainer key={message.id}>
                                        <MessageContent dangerouslySetInnerHTML={{ __html: message.content }} />
                                        <br />
                                        <div style={{ textAlign: 'right' }}>
                                            <h5>REV. FR. JESUADIMAI EMMANUEL ARUL RAJ</h5>
                                            <p><b>FOUNDER</b></p>
                                        </div>
                                        <img src="images/all-img/MMI-Founder.jpg" alt="REV. FR. JESUADIMAI EMMANUEL ARUL RAJ" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px',boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.1)" }} title='REV. FR. JESUADIMAI EMMANUEL ARUL RAJ' />
                                    </MessageContainer>
                                ))}
                            </div>
                        </div>
                    </div>
                    <center>
                        <button
                            style={buttonStyle}
                            onClick={() => window.history.back()}
                            className='mt-3'
                        >
                            Go Back
                        </button>
                    </center>
                </div>
            )}
        </div>
    );
};

export default FounderMessage;