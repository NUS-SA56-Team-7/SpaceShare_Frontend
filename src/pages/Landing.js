import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

/* Component Imports */
import Card from 'components/ui/Card';
import Layout from 'components/layout/Layout';
import SearchForm from 'components/ui/SearchForm';
import Loader from 'components/Loader/Loader';

/* Context Imports */
import AuthContext from 'contexts/AuthContext';
import SearchContext from 'contexts/SearchContext';

/* Utility Imports */
import Axios from 'utils/Axios';

function Landing() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [rendered, setRendered] = useState(false);
    const [rentalProperties, setRentalProperties] = useState([]);
    const [roommateFindings, setRoommateFindings] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    /* useContext */
    const { auth } = useContext(AuthContext);
    const { searchKeyword, setSearchKeyword, setPostType } = useContext(SearchContext);

    /* Functions */
    const search = () => {
        navigate('/search');
    };

    /* useEffect */
    useEffect(() => {
        setRendered(true);
    }, []);

    useEffect(() => {
        if (!rendered) return;

        setLoading(true);
        Axios.get('/api/property/search?postType=ROOM_RENTAL')
            .then(res => {
                if (res.status === 200) {
                    setRentalProperties(res.data.content);
                }
                setLoading(false);
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    setError(err.response.data);
                }
                else if (err?.response?.status === 500) {
                    setError(err.response.data);
                }
                setLoading(false);
            })

        Axios.get('/api/property/search?postType=ROOMMATE_FINDING')
            .then(res => {
                if (res.status === 200) {
                    setRoommateFindings(res.data.content);
                }
                setLoading(false);
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    setError(err.response.data);
                }
                else if (err?.response?.status === 500) {
                    setError(err.response.data);
                }
                setLoading(false);
            })

        Axios.get(`/api/tenant/${auth?.id}/recommended`)
            .then(res => {
                if (res.status === 200) {
                    setRecommended(res.data);
                }
                setLoading(false);
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    setError(err.response.data);
                }
                else if (err?.response?.status === 500) {
                    setError(err.response.data);
                }
                setLoading(false);
            })
    }, [rendered, auth]);

    useEffect(() => {
        if (!rendered) return;

        if (auth) {
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
    }, [rendered, auth]);

    if (loading) {
        return <Loader />
    }
    else {
        return (
            <Layout>
                <SearchForm
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                    search={search} />

                <section className='pb-10 border-b border-gray-200 mt-12 mb-4'>
                    <div className='mx-auto lg:mx-0 pb-8 mb-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                            Latest Rental Properties
                        </h2>
                        <div
                            className="text-md font-semibold leading-6 txt-primary hover:txt-primary-hover hover:cursor-pointer"
                            onClick={() => {
                                setPostType('ROOM_RENTAL');
                                navigate('/search');
                            }}>
                            View All
                            <span aria-hidden="true"></span>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
                        {rentalProperties.map((property, index) => (
                            <Card
                                key={index}
                                data={property}
                                isFavorite={favorites.indexOf(property?.id) !== -1}
                                userType={auth?.userType}>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className='pb-10 border-b border-gray-200 mt-12 mb-4'>
                    <div className='mx-auto lg:mx-0 pb-8 mb-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                            Latest Roommate Findings
                        </h2>
                        <div
                            className="text-md font-semibold leading-6 txt-primary hover:txt-primary-hover hover:cursor-pointer"
                            onClick={() => {
                                setPostType('ROOMMATE_FINDING');
                                navigate('/search');
                            }}>
                            View All
                            <span aria-hidden="true"></span>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
                        {roommateFindings.map((property, index) => (
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
                    auth?.userType === 'tenant' &&
                    <section>
                        <div className='mx-auto lg:mx-0 pb-8 mb-4 border-b border-gray-200'>
                            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-2'>
                                Recommended For You
                            </h2>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
                            {recommended.map((property, index) => (
                                <Card
                                    key={index}
                                    data={property}
                                    isFavorite={favorites.indexOf(property?.id) !== -1}
                                    userType={auth?.userType}>
                                </Card>
                            ))}
                        </div>
                    </section>
                }
            </Layout>
        );
    }
}

export default Landing;