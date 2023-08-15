import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { HeartIcon } from '@heroicons/react/24/outline';

/* Component Imports */
import ButtonFilled from 'components/ui/ButtonFilled';
import UserIconWithTag from './UserIconWithTag';
import Badge from './Badge';
import ButtonFavorite from './ButtonFavorite';

/* Context Imports */
import AuthContext from 'contexts/AuthContext';

/* Utility Imports */
import Axios from 'utils/Axios';

function Card(props) {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [isFavorite, setIsFavorite] = useState(false);
    const [error, setError] = useState();

    /* useContext */
    const { auth } = useContext(AuthContext);

    /* Functions */
    const addToFavorite = (e) => {
        e.stopPropagation();
        if (!isFavorite) {
            Axios.post('api/favourite/create',
                {
                    tenantId: auth?.id,
                    propertyId: props.data?.id
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => {
                    if (res.status === 201) {
                        setIsFavorite(true);
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
        else {
            Axios.delete(`/api/favourite/delete?tenantId=${auth?.id}&propertyId=${props.data?.id}`)
                .then(res => {
                    if (res.status === 200) {
                        setIsFavorite(false);
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
    };

    /* useEffect */
    useEffect(() => {
        if (props?.isFavorite) {
            setIsFavorite(true);
        }
    }, []);

    return (
        <div className="relative mx-auto w-full">
            <div className='relative inline-block duration-300 ease-in-out transition-transform
                transform hover:-translate-y-2 w-full cursor-pointer'
                onClick={() => navigate(`/listing/${props.data?.id}`)}>
                <div className="flex flex-col shadow p-4 rounded-lg bg-white h-full">
                    <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                        <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full
                            d-flex align-items-center justify-content-center">
                            <img src={props.data?.propertyImages[0]?.imageUrl} alt={props.data?.title} />
                        </div>
                        <span className="absolute top-0 left-0 inline-flex mt-3 ml-3">
                            <Badge status="danger">
                                New
                            </Badge>
                        </span>
                        <div className="absolute top-0 right-0 inline-flex mt-3 mr-3 w-9">
                            <ButtonFavorite status={isFavorite} handleClick={addToFavorite} />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <h2 className='font-bold text-base md:text-lg text-gray-800 line-clamp-1'>
                            {props.data?.title}
                        </h2>
                        <p className='mt-2 text-sm text-gray-800 line-clamp-1'>
                            {props.data?.address}
                        </p>
                    </div>

                    <div className='grid grid-cols-2 grid-rows-2 gap-4 mt-8'>
                        <p>
                            Detail List
                        </p>
                    </div>
                    <UserIconWithTag
                        imgUrl={props.data?.renter?.photoUrl}
                        username={props.data?.renter?.firstName}>
                    </UserIconWithTag>
                </div>
            </div>
        </div>
    );
};

export default Card;