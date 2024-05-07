import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoComponent = () => {
    const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const storedData = localStorage.getItem('youtubeData');
                if (storedData) {
                    setVideoData(JSON.parse(storedData));
                    setLoading(false);
                } else {
                    const response = await axios.get('https://youtube.googleapis.com/youtube/v3/playlistItems', {
                        params: {
                            part: 'snippet',
                            playlistId: '',
                            maxResults: 12,
                            key: '',
                        },
                    });
                    
                    // Filter out duplicates based on videoId
                    const uniqueVideos = [];
                    response.data.items.forEach(item => {
                        if (!uniqueVideos.some(video => video.snippet.resourceId.videoId === item.snippet.resourceId.videoId)) {
                            uniqueVideos.push(item);
                        }
                    });
    
                    setVideoData(uniqueVideos);
                    setLoading(false);
                    localStorage.setItem('youtubeData', JSON.stringify(uniqueVideos));
                }
            } catch (error) {
                console.error('Error fetching video data:', error);
                setError('There was a problem fetching video data. Please try again later.');
                setLoading(false);
            }
        };
    
        fetchVideoData();
    }, []);
    

    const redirectToYouTube = () => {
        window.open("https://www.youtube.com", "_blank", "noreferrer noopener");
    };

    return (
        <div className="container mt-3">
            <h4 className='out-title text-center mb-2 mt-3'>Videos</h4>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div className="row">
                    {videoData?.map((item, index) => (
                        <div className="col-md-3" key={index}>
                            <div className="single-mission">
                                <div className="mission-img">
                                    <iframe
                                        title={`react youtube`}
                                        width="100%"
                                        height="220"
                                        src={`https://www.youtube.com/embed?listType=videos&list=UUb_oIWxckR_bC9Tyi4y9mtA&index=${index + 1}`}
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <h6 className='text-center mb-4'>{item.snippet.title}</h6>
                            </div>
                        </div>
                    ))}
                    <div className='text-center'>
                        <button onClick={redirectToYouTube} className='btn btn-primary'>View More</button>
                    </div>
                    <br/>
                    <br/>
                </div>
            )}
        </div>
    );
};

export default VideoComponent;
