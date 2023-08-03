import React from 'react';

/* Component Imports */
import ButtonFilled from 'components/ui/ButtonFilled';
import UserIconWithTag from './UserIconWithTag';

const userDetail = [
    { imgUrl: "https://i.pinimg.com/originals/50/28/ce/5028ce929cd06b95691bd55db694a37b.jpg", userName: "UserName" },
];

function Card({ onClick }) {
    return (
        <div class="relative mx-auto w-full">
            <a href="#" class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                <div class="shadow p-4 rounded-lg bg-white">
                    <div class="flex justify-center relative rounded-lg overflow-hidden h-52">
                        <div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                            <div class="absolute inset-0 bg-black opacity-10"></div>
                        </div>
                        <span class="absolute top-0 left-0 inline-flex mt-3 ml-3 items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">New</span>
                    </div>

                    <div class="mt-4">
                        <h2 class="font-bold text-base md:text-lg text-gray-800 line-clamp-1">
                            Find Roomate Card Ttl
                        </h2>
                        <p class="mt-2 text-sm text-gray-800 line-clamp-1">
                            Clementi, 126753
                        </p>
                    </div>

                    <div class="grid grid-cols-2 grid-rows-2 gap-4 mt-8">
                        <p>
                            Detail List
                        </p>
                    </div>
                    <UserIconWithTag
                        imgUrl={userDetail[0].imgUrl}
                        username={userDetail[0].userName}
                    >
                    </UserIconWithTag>
                    <div>
                        <ButtonFilled onClick={onClick}>
                            View Details
                        </ButtonFilled>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default Card;