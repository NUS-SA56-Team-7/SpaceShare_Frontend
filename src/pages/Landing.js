import React from 'react';
import { useNavigate } from 'react-router';

/* Component Imports */
import Card from 'components/ui/Card';
import Layout from 'components/layout/Layout';
import SearchForm from 'components/ui/SearchForm';

function Landing() {

    /* useNavigate */
    const navigate = useNavigate();

    const userDetail = [
        {
            userName: "UserName",
            imgUrl: "https://i.pinimg.com/originals/50/28/ce/5028ce929cd06b95691bd55db694a37b.jpg",
            status: "success"
        },
    ];

    const properties = [
        {
            title: 'Modern Condo in Pioneer',
            propertyImgUrl: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Beautiful 2-bedroom condo in the heart of Orchard Road. Fully furnished with modern amenities. Close to shopping malls and public transport.',
            location: 'Pioneer',
          },
          {
            title: 'Spacious HDB Flat in Clementi',
            propertyImgUrl: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Bright and airy 4-room HDB flat in Clementi. Well-maintained and conveniently located near MRT station and amenities.',
            location: 'Clementi',
          },
          {
            title: 'Cosy Studio Apartment in Boonlay',
            propertyImgUrl: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Charming studio apartment in Boonlay. Ideal for working professionals or students. Close to medical facilities and shopping malls.',
            location: 'Boonlay',
          },
          {
            title: 'Luxury Condo near Kent Ridge',
            propertyImgUrl: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Luxurious 3-bedroom condo with stunning views near Kent Ridge. High-end furnishings and top-notch facilities. Conveniently located in the city center.',
            location: 'Kent Ridge',
          },
    ];

    const cards = [];

    for (let i = 0; i < properties.length; i++) {
        const card = properties[i];
        cards.push(
            <Card
                key={i}
                title={card.title}
                propertyImgUrl={card.propertyImgUrl}
                description={card.description}
                location={card.location}
                userDetail={userDetail[0]}
                onClick={() => navigate('/detail')} />
        );
    }

    return (
        <Layout>
            <div className="mb-12">
            <SearchForm></SearchForm>
            </div>
            <section className='pb-10 border-b border-gray-200 mb-24'>
                <div className="mx-auto lg:mx-0 pb-8 mb-4 border-b border-gray-200 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Recent Properties
                    </h2>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full flex-grow">
                    {/* <Card
                        onClick={() => navigate('/detail')}
                    >
                    </Card> */}
                    {cards}
                </div>
            </section>
            <section className='pb-10 border-b border-gray-200 mb-24'>
                <div className="mx-auto lg:mx-0 pb-8 mb-4 border-b border-gray-200">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
                        Recent Roomate Findings
                    </h2>
                    {/* <p className="mt-2 text-lg leading-8 text-gray-600">
                        Section description...
                    </p> */}
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    {cards}
                </div>
            </section>
            <section>
                <div className="mx-auto lg:mx-0 pb-8 mb-4 border-b border-gray-200">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
                        Recommended Properties
                    </h2>
                    {/* <p className="mt-2 text-lg leading-8 text-gray-600">
                        Section description...
                    </p> */}
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    {cards}
                </div>
            </section>
        </Layout>
    );
}

export default Landing;