import React from 'react';

import Layout from 'components/layout/Layout';
import Heading from 'components/ui/Heading';
import CardFavorite from 'components/ui/CardFavorite';

function Favorites() {

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
        }
    ];

    return (
        <Layout>
            <Heading
                title="Favorites"
            />
            <section className='py-10 border-b border-gray-200 mb-24'>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full flex-grow">
                    {properties.map((property, index) => (
                        <CardFavorite
                            key={index}
                            title={property.title}
                            propertyImgUrl={property.propertyImgUrl}
                            description={property.description}
                            location={property.location}
                        />
                    ))}
                </div>
            </section>
        </Layout>
    );
}

export default Favorites;