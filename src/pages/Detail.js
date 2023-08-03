import React from 'react';
import { useNavigate } from 'react-router';
import { HeartIcon, CalendarIcon, CheckIcon } from '@heroicons/react/24/outline';

/* Component Imports */
import Layout from 'components/layout/Layout';
import Carousel from 'components/carousel/Carousel';
import DetailList from 'components/ui/DetailList';
import Heading from 'components/ui/Heading';
import DetailFeatures from 'components/ui/DetailFeatures';
import UserIconWithTag from 'components/ui/UserIconWithTag';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import ButtonFilled from 'components/ui/ButtonFilled';
import GoogleMap from 'components/map/GoogleMap';
import Badge from 'components/ui/Badge';

function Detail() {

    /* useNavigate */
    const navigate = useNavigate();

    /* CarouselItems */
    const carouselItems = [
        {
            imageSrc: 'https://thumb.viva.id/intipseleb/1265x711/2022/08/04/62eb741ca5cb6-winter-aespa.jpeg',
            altText: 'Winter of aespa',
        },
        {
            imageSrc: 'https://images.unsplash.com/photo-1565402170291-8491f14678db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2917&q=80', // Replace this with your image link
            altText: 'Slide 2 Alt Text',
        },
        {
            imageSrc: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80', // Replace this with your image link
            altText: 'Slide 3 Alt Text',
        },
        {
            imageSrc: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', // Replace this with your image link
            altText: 'Slide 4 Alt Text',
        },
        {
            imageSrc: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', // Replace this with your image link
            altText: 'Slide 5 Alt Text',
        },
        {
            imageSrc: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', // Replace this with your image link
            altText: 'Slide 6 Alt Text',
        },
    ];

    const userDetail = [
        { imgUrl: "https://i.pinimg.com/originals/50/28/ce/5028ce929cd06b95691bd55db694a37b.jpg", userName: "UserName" },
    ];

    const propertyAmenities = [
        'Shower',
        'Cloth-Hanger',
        'Wifi Access',
        'Air-conditioning',
    ]

    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const latitude = 40.7128;
    const longitude = -74.0060;
    const zoom = 15;

    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-gray-200">
                {/* 8-column section */}
                <div className="sm:col-span-1 md:col-span-8">
                    <Carousel items={carouselItems} />
                    <Heading
                        title={'Property Name'}
                        description="
                            Description --> Can Be Null
                            Trevose 12 is a freehold Strata bungalow development located at Trevose Crescent. The bungalows are designed by Mr Ernesto Bedman from B&S&T Architects who is renowned for his designs of pretigious homes.
                            It is also close to several good schools, such as Anglo-Chinese School, Singapore Chinese Girls' School and Saint Joseph’s Institution."
                    />

                    {/* Needs FIX */}
                    <DetailFeatures />

                    <div className='pt-8 mt-8 border-t border-gray-200'>
                        <DetailList
                            title={'Property Details'}
                        />
                    </div>
                </div>

                {/* 4-column section */}
                <div className="sm:col-span-1 md:col-span-4">
                    <div className="flex flex-col p-6 md:sticky md:top-6 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                <li className="py-6">
                                    <div className="mt-6 f flex items-center justify-between">
                                        <p className="lex items-baseline gap-x-2">
                                            <span className="text-5xl font-bold tracking-tight text-gray-900">$1050</span>
                                            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">SGD</span>
                                        </p>
                                        <Badge status="success">
                                            Verified Property
                                        </Badge>
                                    </div>
                                    <div>
                                        <div className="mt-10 flex items-center gap-x-4">
                                            <h4 className="flex-none text-sm font-semibold leading-6 txt-primary">Core facilities/ Amenities</h4>
                                            <div className="h-px flex-auto bg-gray-100" />
                                        </div>
                                        <ul
                                            role="list"
                                            className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                                        >
                                            {propertyAmenities.map((amenity) => (
                                                <li key={amenity} className="flex gap-x-3">
                                                    <CheckIcon className="h-6 w-5 flex-none txt-primary" aria-hidden="true" />
                                                    {amenity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>

                                <li className="flex flex-col md:flex-row py-6 justify-around">
                                    <span className="flex-1">
                                        <ButtonOutlined action="">
                                            <HeartIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            Wishlist
                                        </ButtonOutlined>
                                    </span>

                                    <span className="ml-0 mt-3 flex-1 md:ml-3 md:mt-0">
                                        <ButtonOutlined action="">
                                            <CalendarIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            Appointment
                                        </ButtonOutlined>
                                    </span>
                                </li>
                                <li className="flex flex-col pt-2 pb-6">
                                    <UserIconWithTag
                                        imgUrl={userDetail[0].imgUrl}
                                        username={userDetail[0].userName}
                                    />
                                    <ButtonFilled>
                                        Contact
                                    </ButtonFilled>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-8 pb-8 border-b border-gray-200">
                <Heading
                    title="Location"
                />
                {/* <GoogleMap apiKey={apiKey} latitude={latitude} longitude={longitude} zoom={zoom} /> */}
                {/* 
                        PLACEHOLDER 
                        PLACEHOLDER 
                    */}
                <GoogleMap></GoogleMap>
            </div>

            <div className="my-8">
                <Heading
                    title="Comments"
                />
            </div>
        </Layout>
    );
}

export default Detail;