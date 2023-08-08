import React from 'react';

/* Component Imports */
import ButtonFilled from 'components/ui/ButtonFilled';
import UserIconWithTag from './UserIconWithTag';

const Card = ({ title, propertyImgUrl, description, location, userDetail, onClick }) => {
    return (
        // <div className="relative mx-auto w-full">
        //     <a href="#" className="block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
        //         <div className="shadow p-4 rounded-lg bg-white">
        //             <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
        //                 <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
        //                     {/* <div className="absolute inset-0 bg-black opacity-10"></div> */}
        //                     <img
        //                         src={propertyImgUrl}
        //                         alt="Property Image"
        //                         className="absolute inset-0 h-full"
        //                     />
        //                 </div>
        //                 <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">New</span>
        //             </div>

        //             <div className="mt-4">
        //                 <h2 className="font-bold text-base md:text-lg text-gray-800 line-clamp-1">
        //                     {title}
        //                 </h2>
        //                 <p className="mt-2 text-sm text-gray-800 line-clamp-1">
        //                     {location}
        //                 </p>
        //                 <p className="mt-8">
        //                     {description}
        //                 </p>
        //             </div>
        //             <div className="flex flex-col justify-end mt-auto">
        //                 <UserIconWithTag
        //                     imgUrl={userDetail.imgUrl}
        //                     username={userDetail.userName}
        //                 />
        //                 <div>
        //                     <ButtonFilled onClick={onClick}>
        //                         View Details
        //                     </ButtonFilled>
        //                 </div>
        //             </div>
        //         </div>
        //     </a>
        // </div>
        <div className="relative mx-auto w-full">
            <div className="block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 h-full">
                <div className="flex flex-col shadow p-4 rounded-lg bg-white h-full">
                    <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                        <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                            <img
                                src={propertyImgUrl}
                                alt="Property Image"
                                className="absolute inset-0 h-full"
                            />
                        </div>
                        <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">New</span>
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