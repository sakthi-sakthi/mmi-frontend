import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ApiUrl } from '../../components/API/Api';

const Administration = () => {
  const location = useLocation();
  const url = location.pathname;
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const path = {
      '/general-admin': 3,
    };
    setId(path[url] ? path[url] : url);
  }, [url]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/Pages`);
        const newPages = response?.data?.pages;

        localStorage.setItem('Pages', JSON.stringify(newPages));

        setData(newPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-5">
        <b>No Data Available</b>
      </div>
    );
  }

  const filterdata = data.filter((item) => item.id === id);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {filterdata.map((item) => (
              <div key={item.id} className='mt-3'>
                <div
                  style={{ textAlign: 'justify' }}
                  dangerouslySetInnerHTML={{
                    __html: `<style>table { width: 100%; max-width: 100%; border-collapse: collapse; } table, th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } @media (max-width: 600px) { table, th, td { display: block; width: 100%; box-sizing: border-box; } } </style>${item.content}`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Administration;