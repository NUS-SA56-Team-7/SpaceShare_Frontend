import React from 'react';

import ButtonWishlist from './ButtonWishlist';

const CardFavorite = ({ title, propertyImgUrl, location }) => {
    return (
        <div className="block rounded-lg p-4 bg-gray-50 ring-1 ring-inset ring-gray-900/5">
            <div className="relative">
                <img
                    alt={title}
                    src={propertyImgUrl}
                    className="h-56 w-full rounded-md object-cover"
                />
                <div className="absolute top-0 right-0 inline-flex mt-3 mr-3 w-9">
                    <ButtonWishlist
                        status={1}
                    />
                </div>
            </div>
            <div className="mt-2">
                <dl>
                    <div>
                        <dt className="sr-only">Price</dt>
                        <dd className="text-sm text-gray-500">$10,50</dd>
                    </div>

                    <div>
                        <dt className="sr-only">Address</dt>
                        <dd className="font-medium">{location}</dd>
                    </div>
                </dl>

                <div className="mt-6 flex items-center justify-end">
                    <a href="#" className="text-sm font-semibold leading-6 txt-primary hover:txt-primary-hover">
                        View Detail <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CardFavorite;
