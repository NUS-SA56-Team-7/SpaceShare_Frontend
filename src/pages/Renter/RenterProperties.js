import React, { useContext, useEffect, useState } from 'react';

/* Component Imports */
import Layout from 'components/layout/Layout';
import Heading from 'components/ui/Heading';
import CardProperties from 'components/ui/CardProperties';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Context Imports */
import AuthContext from 'contexts/AuthContext';

/* MUI Imports */
import { CircularProgress } from '@mui/material';

function RenterProperties() {

    /* useState */
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    /* useContext */
    const { auth } = useContext(AuthContext);

    /* useEffect */
    useEffect(() => {
        Axios.get(`/api/renter/${auth?.id}/properties`)
            .then(res => {
                if (res.status === 200) {
                    setProperties(res.data);
                }
                setLoading(false);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setError(err.response.data);
                }
                else if (err.response.status === 500) {
                    setError(err.response.data);
                }
                setLoading(false);
            })
    }, [auth]);

    return (
        <Layout>
            <Heading title='My Properties' />
            <section className='py-10 border-b border-gray-200 mb-24'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full flex-grow">
                    {loading
                        ? (
                            <CircularProgress />
                        )
                        : (
                            properties.map((property, index) => (
                                <CardProperties
                                    key={index}
                                    title={property.title}
                                    propertyImgUrl={property.propertyImgUrl}
                                    description={property.description}
                                    location={property.location}
                                />
                            ))
                        )
                    }
                </div>
            </section>
        </Layout>
    );
}

export default RenterProperties;