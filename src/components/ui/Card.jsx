import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';

/* Component Imports */
import ButtonFilled from 'components/ui/ButtonFilled';
import UserIconWithTag from './UserIconWithTag';
import Badge from './Badge';
import ButtonWishlist from './ButtonWishlist';

const Card = ({ title, propertyImgUrl, description, location, userDetail, onClick }) => {
    return (
        <div className="relative mx-auto w-full">
            <div className="block duration-300 ease-in-out transition-transform transform h-full">
                <div className="flex flex-col shadow p-4 rounded-lg bg-white h-full">
                    <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                        <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                            <img
                                src={propertyImgUrl}
                                alt="Property Image"
                                className="absolute inset-0 h-full"
                            />
                        </div>
                        <span className="absolute top-0 left-0 inline-flex mt-3 ml-3">
                            <Badge status="danger">
                                New
                            </Badge>
                        </span>
                        <div className="absolute top-0 right-0 inline-flex mt-3 mr-3 w-9">
                            <ButtonWishlist 
                                status={0}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2 className="font-bold text-base md:text-lg text-gray-800 line-clamp-1">
                            {title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-800 line-clamp-1">
                            {location}
                        </p>
                        <p className="mt-8">
                            {description}
                        </p>
                    </div>

                    <div className="flex flex-col justify-end mt-auto">
                        <UserIconWithTag
                            imgUrl={userDetail.imgUrl}
                            username={userDetail.userName}
                        />
                        <div>
                            <ButtonFilled onClick={onClick}>
                                View Details
                            </ButtonFilled>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Card;