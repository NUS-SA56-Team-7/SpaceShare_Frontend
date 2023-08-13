import React, { useState } from 'react';
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
import CommentForm from 'components/ui/CommentForm';
import Comment from 'components/ui/Comment';
import Modal from 'components/modal/Modal';

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

    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlistClick = () => {
        setIsWishlisted(!isWishlisted);
    };

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
                                        <ButtonOutlined
                                            onClick={handleWishlistClick}
                                        >
                                            {isWishlisted ? (
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(220, 38, 38)" className="-ml-0.5 mr-1.5 h-5 w-5">
                                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                                    </svg>
                                                    <span className="text-red-600">
                                                        Wishlisted
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <HeartIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                                    Wishlist
                                                </div>
                                            )}
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

            <div className="my-8 pb-8 border-b border-gray-200">
                <Heading
                    title="Comments"
                />
                <div className='my-6'>
                    <CommentForm />
                    <Comment
                        imgUrl={userDetail[0].imgUrl}
                        username={userDetail[0].userName}
                        date="01/01/2000"
                        text="멈출 수 없는 이 떨림은 on and on and on
                        내 전부를 너란 세상에 다 던지고 싶어
                        Look at me, look at me now
                        이렇게 넌 날 애태우고 있잖아
                        끌 수 없어, 우리 사랑은 불장난
                        My love is on fire (ooh)
                        Now burn, baby, burn 불장난
                        My love is on fire (ooh)
                        So don't play with me, boy 불장난"
                    />
                    <Comment
                        imgUrl={userDetail[0].imgUrl}
                        username={userDetail[0].userName}
                        date="02/02/2000"
                        text="Oh my, oh my God 예상했어 나
                        I was really hoping that he will come through
                        Oh my, oh my God 단 너뿐이야
                        Asking all the time about what I should do
                        No, I can never let him go
                        너만 생각나 twenty-four
                        난 행운아야 정말로 I know, I know
                        널 알기 전까지는 나 의미 없었어 전부 다
                        내 맘이 끝이 없는 걸 I know, I know
                        I'm going crazy, right?"
                    />
                    <Comment
                        imgUrl={userDetail[0].imgUrl}
                        username={userDetail[0].userName}
                        date="03/03/2000"
                        text="Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et 
                        dolore magna aliqua. Ut enim ad minim veniam, 
                        quis nostrud exercitation ullamco laboris nisi ut 
                        aliquip ex ea commodo consequat. "
                    />
                </div>
            </div>
            <Modal />
        </Layout>
    );
}

export default Detail;