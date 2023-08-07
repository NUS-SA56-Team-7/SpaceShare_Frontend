import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { HeartIcon, CalendarIcon, CheckIcon } from '@heroicons/react/24/outline';

/* CSS Imports */
import 'styles/pages/Detail.css';

/* Component Imports */
import Layout from 'components/layout/Layout';
import Carousel from 'components/carousel/Carousel';
import DetailList from 'components/ui/DetailList';
import Heading from 'components/ui/Heading';
import DetailFeatures from 'components/ui/DetailFeatures';
import UserIconWithTag from 'components/ui/UserIconWithTag';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import ButtonFilled from 'components/ui/ButtonFilled';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import Badge from 'components/ui/Badge';
import Loader from 'components/Loader/Loader';

/* Utility Imports */
import Axios from 'utils/Axios';

function ListingDetail() {

    /* useState */
    const [data, setData] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    /* useNavigate */
    const navigate = useNavigate();

    /* useParams */
    const { id: propertyId } = useParams();

    /* useEffect */
    useEffect(() => {
        setLoading(true);
        Axios.get(`/api/property/${propertyId}`)
            .then(res => {
                if (res.status === 200) {
                    setData(res.data);
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

    /* CarouselItems */
    const carouselItems = [
        {
            id: 'default',
            imageUrl: 'https://thumb.viva.id/intipseleb/1265x711/2022/08/04/62eb741ca5cb6-winter-aespa.jpeg',
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

    if (loading) {
        return <Loader />
    }
    else {
        return (
            <Layout>
                {console.log(data)}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-gray-200">
                    {/* 8-column section */}
                    <div className="sm:col-span-1 md:col-span-8">
                        <Carousel items={data['propertyImages'] ? data['propertyImages'] : []} />
                        <Heading
                            title={data['title'] && data['title']}
                            description={data['description'] && data['description']}
                        />

                        {/* Needs FIX */}
                        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                            {
                                [
                                    { name: 'Address', description: data['address'] },
                                    { name: 'Postal Code', description: data['postalCode'] },
                                    { name: 'Nearby Locations', description: data['nearbyLocations'] },
                                    { name: 'Furnishment', description: data['furnishment'] },
                                ].map((feature) => (
                                    <div key={feature.name} className="border-t border-gray-200 pt-4">
                                        <dt className="font-medium text-gray-900">{feature.name}</dt>
                                        <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                                    </div>
                                ))
                            }
                        </dl>

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
                                                <span className="text-5xl font-bold tracking-tight text-gray-900">{data['rentalFees']}</span>
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
                                                Save to Wishlist
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
                    <Heading title="Location" />
                    <GoogleMap
                        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                        query={`Singapore ${data['postalCode'] && data['postalCode']}`}
                        zoom={17} />
                </div>

                <div className="my-8">
                    <Heading title="Comments" />
                    {/* https://bbbootstrap.com/snippets/bootstrap-like-comment-share-section-comment-box-63008805 */}
                    <div className="container mt-5">
                        <div className="d-flex justify-content-center row">
                            <div className="col-md-8">
                                <div className="d-flex flex-column comment-section">
                                    <div className="bg-white p-2">
                                        <div className="d-flex flex-row user-info">
                                            <img className="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width="40" />
                                            <div className="d-flex flex-column justify-content-start ml-2">
                                                <span className="d-block font-weight-bold name">Marry Andrews</span>
                                                <span className="date text-black-50">Shared publicly - Jan 2020</span>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <p className="comment-text">Comment 1</p>
                                        </div>
                                    </div>
                                    <div className="bg-white">
                                        <div className="d-flex flex-row fs-12">
                                            <div className="like p-2 cursor"><i className="fa fa-thumbs-o-up"></i><span className="ml-1">Like</span></div>
                                            <div className="like p-2 cursor"><i className="fa fa-commenting-o"></i><span className="ml-1">Comment</span></div>
                                            <div className="like p-2 cursor"><i className="fa fa-share"></i><span className="ml-1">Share</span></div>
                                        </div>
                                    </div>
                                    <div className="bg-light p-2">
                                        <div className="d-flex flex-row align-items-start">
                                            <img className="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width="40" />
                                            <textarea className="form-control ml-1 shadow-none textarea"></textarea>
                                        </div>
                                        <div className="mt-2 text-right">
                                            <button className="btn btn-primary btn-sm shadow-none" type="button">
                                                Post comment
                                            </button>
                                            <button className="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default ListingDetail;