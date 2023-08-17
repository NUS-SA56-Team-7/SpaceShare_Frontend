import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

/* Component Imports */
import Card from 'components/ui/Card';
import Layout from 'components/layout/Layout';
import SearchForm from 'components/ui/SearchForm';
import Loader from 'components/Loader/Loader';

/* Context Imports */
import AuthContext from 'contexts/AuthContext';

/* Utility Imports */
import Axios from 'utils/Axios';

function Landing() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState([]);

    /* useContext */
    const { auth } = useContext(AuthContext);

    /* useEffect */
    useEffect(() => {
        setLoading(true);
        Axios.get('/api/property')
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
    }, []);

    useEffect(() => {
        if (auth?.id) {
            Axios.get(`/api/tenant/${auth?.id}/favourites/id`)
                .then(res => {
                    if (res.status === 200) {
                        setFavorites(res.data);
                    }
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        setError(err.response.data);
                    }
                    else if (err.response.status === 500) {
                        setError(err.response.data);
                    }
                })
        }
    }, [auth]);

    useEffect(() => {
        console.log(favorites.indexOf(1) !== -1);
    }, [favorites]);

    if (loading) {
        return <Loader />
    }
    else {
        return (
            <Layout>
                <SearchForm>

                </SearchForm>

                <section className='pb-10 border-b border-gray-200 mt-4 mb-4'>
                    <div className='mx-auto lg:mx-0 pb-8 mb-4 border-b border-gray-200'>
                        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                            Latest Rental Properties
                        </h2>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
                        {properties.map((property, index) => (
                            <Card
                                key={index}
                                data={property}
                                isFavorite={favorites.indexOf(property?.id) !== -1}
                                userType={auth?.userType}>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className='pb-10 border-b border-gray-200 mt-4 mb-4'>
                    <div className='mx-auto lg:mx-0 pb-8 mb-4 border-b border-gray-200'>
                        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                            Latest Roommate Findings
                        </h2>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
                        {properties.map((property, index) => (
                            <Card
                                key={index}
                                data={property}
                                isFavorite={favorites.indexOf(property?.id) !== -1}
                                userType={auth?.userType}>
                            </Card>
                        ))}
                    </div>
                </section>

                {
                    auth?.userType === 'TENANT' &&
                    <section>
                        <div className='mx-auto lg:mx-0 pb-8 mb-4 border-b border-gray-200'>
                            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-2'>
                                Recommended For You
                            </h2>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
                            <Card></Card>
                        </div>
                    </section>
                }
            </Layout>
        );
    }
}

export default Landing;