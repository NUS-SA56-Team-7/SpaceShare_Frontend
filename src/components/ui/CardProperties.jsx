import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';

import Badge from './Badge';
import ButtonWishlist from './ButtonFavorite';
import Carousel from 'components/carousel/Carousel';

const CardProperties = () => {

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

    /* useNavitgate */
    const navigate = useNavigate();

    return (
        <div
            className="block shadow p-4 rounded-lg bg-white h-full border hover:border-primary hover:cursor-pointer"
            onClick={() => navigate('/detail')}
        >
            <div className="flex flex-col">
                <div>
                    <Carousel items={carouselItems} />
                </div>
                <div>
                    <div className="flex justify-between">
                        <p className="text-3xl font-semibold">
                            Residence Near Clementi
                        </p>
                        <div className="menu relative z-30 flex gap-x-2">
                            <div className="w-10">
                                <ButtonWishlist
                                    status={0}
                                    onClick={(event) => event.stopPropagation()}
                                />
                            </div>
                            <div className="w-10">
                                <button
                                    type="button"
                                    className="w-full shadow p-2 rounded-md bg-white hover:cursor-pointer hover:txt-primary"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <PencilIcon />
                                </button>
                            </div>
                            <div className="w-10">
                                <button
                                    type="button"
                                    className="w-full shadow p-2 rounded-md bg-white hover:cursor-pointer hover:text-red-600"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="mt-2 text-sm text-gray-800 line-clamp-1">
                            Clementi blk 528, West Coast Vale, 123456
                        </p>
                    </div>
                    <div>
                        <p className="my-4 text-2xl font-bold tracking-tight text-gray-900">
                            S$ <span>1050</span>
                        </p>
                    </div>
                    <div>
                        <p className="my-4 text-base tracking-tight text-gray-800">
                            Available On:
                            <span className="ml-2 font-semibold">
                                30 May 2023
                            </span>
                        </p>
                    </div>
                    <div className="flex gap-x-2">
                        <Badge
                            status="success"
                        >
                            Condo
                        </Badge>
                        <Badge
                            status="danger"
                        >
                            New
                        </Badge>
                    </div>
                    <div>
                        <p className="my-4 text-sm tracking-tight text-gray-800">
                            Created at:
                            <span className="ml-2 font-semibold">
                                18 May 2023
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProperties;
