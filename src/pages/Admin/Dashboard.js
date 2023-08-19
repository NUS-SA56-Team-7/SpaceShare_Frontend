import React, { useContext, useEffect, useState } from 'react';

import AdminLayout from 'components/Admin/AdminLayout';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';

/* Utility Imports */
import Axios from 'utils/Axios';

function Dashboard() {
    const session = {
        // Replace with your session data
        role: 'admin', // Example role
        userId: '123', // Example user ID
        username: 'John Doe', // Example username
    };

    // const [loading, setLoading] = useState(false);
    const [roomRentalByPropertyType, setRoomRentalByPropertyType] = useState(null);
    const [roomateFindingByPropertyType, setRoomateFindingByPropertyType] = useState(null);
    const [roomRentalByRoomType, setRoomRentalByRoomType] = useState(null);
    const [roommateFindingByRoomType, setRoommateFindingByRoomType] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        Axios.get('/api/property/room-rental/property-type/percentages')
            .then(res => {
                setRoomRentalByPropertyType(res.data);
                console.log(roomRentalByPropertyType);
                // setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                // setLoading(false);
            })

        Axios.get('/api/property/roommate-finding/property-type/percentages')
            .then(res => {
                setRoomateFindingByPropertyType(res.data);
                console.log(roomateFindingByPropertyType);
                // setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                // setLoading(false);
            })

        Axios.get('/api/property/room-rental/room-type/percentages')
            .then(res => {
                setRoomRentalByRoomType(res.data);
                console.log(roomRentalByRoomType);
                // setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                // setLoading(false);
            })

        Axios.get('/api/property/roommate-finding/room-type/percentages')
            .then(res => {
                setRoommateFindingByRoomType(res.data);
                console.log(roommateFindingByRoomType);
                // setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                // setLoading(false);
            })
    };

    return (
        <AdminLayout session={session}>
            <div className="mb-10">
                <Heading
                    title="Dashboard"
                />
            </div>
            <div className="grid grid-cols-12 gap-x-6 gap-y-12">
                <div className="col-span-4">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Room Rental
                            </h3>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <div className='flex items-center justify-evenly gap-x-4'>
                                    <div>
                                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                                            <span className='text-5xl font-semibold text-yellow-600'>
                                                5
                                            </span>
                                        </div>
                                        <span className='text-xl font-bold text-yellow-600'>
                                            Pending
                                        </span>
                                    </div>
                                    <div>
                                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                            <span className='text-5xl font-semibold text-green-600'>
                                                6
                                            </span>
                                        </div>
                                        <span className='text-xl font-bold text-green-600'>
                                            Approved
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Roommate Findings
                            </h3>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <div className='flex items-center justify-evenly gap-x-4'>
                                    <div>
                                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                                            <span className='text-5xl font-semibold text-yellow-600'>
                                                5
                                            </span>
                                        </div>
                                        <span className='text-xl font-bold text-yellow-600'>
                                            Pending
                                        </span>
                                    </div>
                                    <div>
                                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                            <span className='text-5xl font-semibold text-green-600'>
                                                6
                                            </span>
                                        </div>
                                        <span className='text-xl font-bold text-green-600'>
                                            Approved
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Scam Reports
                            </h3>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <div className='flex items-center justify-evenly gap-x-4'>
                                    <div>
                                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                                            <span className='text-5xl font-semibold text-yellow-600'>
                                                5
                                            </span>
                                        </div>
                                        <span className='text-xl font-bold text-yellow-600'>
                                            Pending
                                        </span>
                                    </div>
                                    <div>
                                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                            <span className='text-5xl font-semibold text-green-600'>
                                                6
                                            </span>
                                        </div>
                                        <span className='text-xl font-bold text-green-600'>
                                            Approved
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Average Room Rental By Property Type
                            </h3>
                            <span className="font-normal text-base text-gray-500">
                                Some more data Some more data
                            </span>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                {roomRentalByPropertyType ? (
                                    Object.keys(roomRentalByPropertyType).map(property => (
                                        <div key={property}>
                                            <div className="mb-1 text-sm font-medium">
                                                {property}
                                            </div>
                                            <div className="flex gap-x-2 items-center justify-between mb-4">
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${roomRentalByPropertyType[property]}%` }}></div>
                                                </div>
                                                <div>
                                                    <span className='text-sm font-semibold'>
                                                        {roomRentalByPropertyType[property].toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No rental data available.</p>
                                )}
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Average Roommate Findings By Property Type
                            </h3>
                            <span className="font-normal text-base text-gray-500">
                                Some more data Some more data
                            </span>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                {roomateFindingByPropertyType ? (
                                    Object.keys(roomateFindingByPropertyType).map(property => (
                                        <div key={property}>
                                            <div className="mb-1 text-sm font-medium">
                                                {property}
                                            </div>
                                            <div className="flex gap-x-2 items-center justify-between mb-4">
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${roomateFindingByPropertyType[property]}%` }}></div>
                                                </div>
                                                <div>
                                                    <span className='text-sm font-semibold'>
                                                        {roomateFindingByPropertyType[property].toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No rental data available.</p>
                                )}
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Average Room Rental By Room Type
                            </h3>
                            <span className="font-normal text-base text-gray-500">
                                Some more data Some more data
                            </span>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                {roomRentalByRoomType ? (
                                    Object.keys(roomRentalByRoomType).map(property => (
                                        <div key={property}>
                                            <div className="mb-1 text-sm font-medium">
                                                {property}
                                            </div>
                                            <div className="flex gap-x-2 items-center justify-between mb-4">
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${roomRentalByRoomType[property]}%` }}></div>
                                                </div>
                                                <div>
                                                    <span className='text-sm font-semibold'>
                                                        {roomRentalByRoomType[property].toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No rental data available.</p>
                                )}
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Average Roommate Findings By Room Type
                            </h3>
                            <span className="font-normal text-base text-gray-500">
                                Some more data Some more data
                            </span>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                {roommateFindingByRoomType ? (
                                    Object.keys(roommateFindingByRoomType).map(property => (
                                        <div key={property}>
                                            <div className="mb-1 text-sm font-medium">
                                                {property}
                                            </div>
                                            <div className="flex gap-x-2 items-center justify-between mb-4">
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${roommateFindingByRoomType[property]}%` }}></div>
                                                </div>
                                                <div>
                                                    <span className='text-sm font-semibold'>
                                                        {roommateFindingByRoomType[property].toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No rental data available.</p>
                                )}
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}

export default Dashboard;
