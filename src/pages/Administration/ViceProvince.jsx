import React, { useEffect, useState } from 'react';
import './Team.css';
import axios from 'axios';
import ApiUrl from '../../Api/Api';

const Priest = () => {
    const [delegation, Setdelegation] = useState([]);

    useEffect(() => {
        axios.get(`${ApiUrl}/get/team/8`).then((response) => {
            Setdelegation(response?.data?.teams);
        });
    }, []);

    return (
        <>
            <div className="team-area">
                <div className="col-md-12">
                    <div className="site-heading text-center">
                        <h2 className="mt-4 text-center" id='welcomecristo'>
                            Vice Provincial
                        </h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {delegation?.map((delegationItem, index) => (
                            <div className="col-md-4 col-sm-6 col-xs-12" key={index}>
                                <div className="single-team">
                                    <div className="img-area">
                                        <img
                                            src={delegationItem.media_url}
                                            className="img-responsive"
                                            alt=""
                                        />
                                    </div>
                                    <div className="img-text">
                                        <h4>{delegationItem.title}</h4>
                                        <h5>{delegationItem.role}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Priest;