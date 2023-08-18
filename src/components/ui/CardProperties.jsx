import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* Icon Imports */
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';

/* Component Imports */
import Badge from 'components/ui/Badge';
import Carousel from 'components/carousel/Carousel';

/* Function Imports */
import formatPrettyDate from 'functions/formatPrettyDate';

const CardProperties = ({ data, deleteProperty }) => {

    /* useNavigate */
    const navigate = useNavigate();

    return (
        <div
            className="block shadow p-4 rounded-lg bg-white h-full border hover:border-primary hover:cursor-pointer"
            onClick={() => navigate(`/listing/${data?.id}`)}>
            <div className="flex flex-col">
                <div>
                    <Carousel items={data?.propertyImages ? data.propertyImages : []} />
                </div>
                <div>
                    <div className="flex justify-between">
                        <p className="text-3xl font-semibold">
                            {data?.title}
                        </p>
                        <div className="menu relative z-10 flex gap-x-2">
                            <div className="w-9">
                                <button
                                    type="button"
                                    className="w-full shadow p-2 rounded-md bg-white hover:cursor-pointer hover:txt-primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/renter/listing/update?id=${data?.id}`)
                                    }}>
                                    <PencilIcon />
                                </button>
                            </div>
                            <div className="w-9">
                                <button
                                    type="button"
                                    className="w-full shadow p-2 rounded-md bg-white hover:cursor-pointer hover:text-red-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteProperty(data?.id);
                                    }}>
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="mt-2 text-sm text-gray-800 line-clamp-2 leading-6">
                            {`${data?.address}, ${data?.postalCode}`}
                        </p>
                    </div>
                    <div>
                        <p className="my-4 text-2xl font-bold tracking-tight text-gray-900">
                            S$ <span>{data?.rentalFees}</span>
                        </p>
                    </div>
                    <div>
                        <p className="my-4 text-base tracking-tight text-gray-800">
                            Available On:
                            <span className="ml-2 font-semibold">
                                {data?.updatedAt && formatPrettyDate(data.updatedAt)}
                            </span>
                        </p>
                    </div>
                    <div className="flex gap-x-2">
                        <Badge status="success">
                            Condo
                        </Badge>
                        <Badge status="danger">
                            New
                        </Badge>
                    </div>
                    <div>
                        <p className="my-4 text-sm tracking-tight text-gray-800">
                            Created at:
                            <span className="ml-2 font-semibold">
                                {data?.updatedAt && formatPrettyDate(data.updatedAt)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProperties;
