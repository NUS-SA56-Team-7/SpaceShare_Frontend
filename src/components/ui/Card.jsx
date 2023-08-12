import React from 'react';
import { useNavigate } from 'react-router';

/* Component Imports */
import ButtonFilled from 'components/ui/ButtonFilled';
import UserIconWithTag from './UserIconWithTag';

const userDetail = [
    { imgUrl: 'https://i.pinimg.com/originals/50/28/ce/5028ce929cd06b95691bd55db694a37b.jpg', userName: 'UserName' },
];

function Card(props) {

    /* useNavigate */
    const navigate = useNavigate();

    return (
        <div className='relative mx-auto w-full'>
            <div className='relative inline-block duration-300 ease-in-out transition-transform
                transform hover:-translate-y-2 w-full cursor-pointer'
                onClick={() => navigate(`/listing/${props.data?.id}`)}>
                <div className='shadow p-4 rounded-lg bg-white'>
                    <div className='flex justify-center relative rounded-lg overflow-hidden h-52'>
                        <div className='transition-transform d-flex align-items-center justify-content-center duration-500 transform ease-in-out hover:scale-110 w-full'>
                            <img src={props.data?.propertyImages[0]?.imageUrl} alt={props.data?.title} />
                            <div className='absolute inset-0 bg-black opacity-10'></div>
                        </div>
                        <span className='absolute top-0 left-0 inline-flex mt-3 ml-3 items-center
                            rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>
                            New
                        </span>
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
                    <div>
                        <ButtonFilled onClick={props.onClick}>
                            View Details
                        </ButtonFilled>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;