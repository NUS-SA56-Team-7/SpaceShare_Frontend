import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

/* Component Imports */
import Card from 'components/ui/Card';
import Layout from 'components/layout/Layout';
import SearchForm from 'components/ui/SearchForm';

/* Utility Imports */
import Axios from 'utils/Axios';

function Landing() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

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

    return (
        <Layout>
            <SearchForm>

            </SearchForm>

            <section className='pb-10 border-b border-gray-200 mb-24'>
                <div className='mx-auto lg:mx-0 pb-8 mb-4 border-b border-gray-200'>
                    <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Section Title</h2>
                    <p className='mt-2 text-lg leading-8 text-gray-600'>
                        Latest Projects
                    </p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
                    {properties.map((property) => (
                        <Card
                            key={property.id}
                            data={property}
                            onClick={() => navigate('/detail')}>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
                <div className='mx-auto lg:mx-0 pb-8 mb-4 border-b border-gray-200'>
                    <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Section Title</h2>
                    <p className='mt-2 text-lg leading-8 text-gray-600'>
                        Recommended For You
                    </p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
                    <Card></Card>
                </div>
            </section>
        </Layout>
    );
}

export default Landing;