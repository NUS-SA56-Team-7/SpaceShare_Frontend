import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { CalendarIcon, HeartIcon, PencilIcon, UserCircleIcon } from '@heroicons/react/24/outline';

/* Component Imports */
import Layout from 'components/layout/Layout';
import Heading from 'components/ui/Heading';
import Badge from 'components/ui/Badge';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import FormInputText from 'components/form/FormInputText';
import FormInputPassword from 'components/form/FormInputPassword';
import FormText from 'components/form/FormText';
import CardFavorite from 'components/ui/CardFavorite';
import CardAppointment from 'components/ui/CardAppointment';

function Profile() {

    /* useNavigate */
    const navigate = useNavigate();

    const userDetail = [
        {
            imgUrl: "https://image.tmdb.org/t/p/original/8qBylBsQf4llkGrWR3qAsOtOU8O.jpg",
            userName: "Winter Winter",
            status: 1
        },
    ];

    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('Winter');
    const [lastName, setLastName] = useState('Winter');
    const [email, setEmail] = useState("winter@email.com");
    const [phone, setPhone] = useState("0912345678");
    const [address, setAddress] = useState("101, West Coast Vale, 13-02, Parc Riviera, 126753");
    const [dob, setDob] = useState("06/08/2000");

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setFirstName('Winter');
        setLastName('Winter');
        setEmail("winter@email.com");
        setPhone("0912345678");
        setAddress("101, West Coast Vale, 13-02, Parc Riviera, 126753");
        setDob("06/08/2000");
        setIsEditing(false);
    };

    // Image Upload Testing
    const [userImgFile, setUserImgFile] = useState(null);
    const [userImgUrl, setUserImgUrl] = useState(userDetail[0].imgUrl);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserImgFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImgUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpdate = () => {
        if (userImgFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImgUrl(reader.result);
                setUserImgFile(null);
            };
            reader.readAsDataURL(userImgFile);
        }
    };

    const properties = [
        {
            title: 'Modern Condo in Pioneer',
            propertyImgUrl: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Beautiful 2-bedroom condo in the heart of Orchard Road. Fully furnished with modern amenities. Close to shopping malls and public transport.',
            location: 'Pioneer',
        },
        {
            title: 'Spacious HDB Flat in Clementi',
            propertyImgUrl: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Bright and airy 4-room HDB flat in Clementi. Well-maintained and conveniently located near MRT station and amenities.',
            location: 'Clementi',
        },
        {
            title: 'Cosy Studio Apartment in Boonlay',
            propertyImgUrl: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Charming studio apartment in Boonlay. Ideal for working professionals or students. Close to medical facilities and shopping malls.',
            location: 'Boonlay',
        }
    ];

    return (
        <Layout>
            <div className="mb-10">
                <Heading
                    title="My Profile"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 rounded-lg p-8 py-0 border border-gray-300">
                {/* 4 column section */}
                <div className="sm:col-span-1 md:col-span-4 md:pr-8 md:border-r border-gray-300">
                    <div className="mx-auto max-w-xs flow-root pt-8">
                        <ul role="list" className="-my-6 divide-y divide-none">
                            <li className="py-2">
                                <div className="relative inline-block w-full">
                                    <div className="relative aspect-square pt-[100%]">
                                        <img
                                            className="absolute inset-0 w-full h-full object-cover object-center rounded-full"
                                            src={userDetail[0].imgUrl}
                                            alt="profile-img"
                                        />
                                    </div>
                                </div>
                            </li>
                            <li className="py-2">
                                <p class="text-3xl font-normal text-gray-800 line-clamp-1">
                                    {firstName} {lastName}
                                </p>
                            </li>
                            <li className="py-2">
                                <div className="flex flex-col p-6 justify-between rounded-lg bg-white border border-gray-300">
                                    <div>
                                        <p className="text-sm font-semibold mb-1 text-gray-900">
                                            User Type:
                                            <span className="ml-4 text-sm font-medium leading-6 text-gray-600">
                                                Renter
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-1 text-gray-900">
                                            Joined On:
                                            <span className="ml-4 text-sm font-medium leading-6 text-gray-600">
                                                06/08/2000
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-sm font-semibold mb-1 text-gray-900 mr-4">
                                            Account Status:
                                        </p>
                                        {userDetail[0].status === 0 ? (
                                            <Badge status="success">
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge status="danger">
                                                Inactive
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* 8 column section */}
                <div className="sm:col-span-1 md:col-span-8 pt-8">
                    <section className="pb-5 border-b border-gray-200 mb-5">
                        <div className="flex items-center mb-4">
                            <UserCircleIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                            <p className="text-xl font-semibold">
                                User Detail
                            </p>
                        </div>
                        <div className="flex flex-col p-6 md:top-6 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                            <article>
                                {!isEditing ? (
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                                                <div className="flex flex-col gap-x-6 gap-y-8">
                                                    <div className="sm:col-span-4">
                                                        <FormInputText
                                                            label='First Name'
                                                            disabled
                                                            autoFocus
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="sm:col-span-4">
                                                        <FormInputText
                                                            label='Last Name'
                                                            disabled
                                                            autoFocus
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-4">
                                            <FormInputText
                                                label='Email'
                                                disabled
                                                autoFocus
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="sm:col-span-4">
                                            <FormInputText
                                                label='Phone'
                                                disabled
                                                autoFocus
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                        <div className="sm:col-span-4">
                                            <FormInputText
                                                label='Address'
                                                disabled
                                                autoFocus
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                        <div className="sm:col-span-4">
                                            <FormInputText
                                                label='Date of Birth'
                                                disabled
                                                autoFocus
                                                value={dob}
                                                onChange={(e) => setDob(e.target.value)}
                                            />
                                        </div>
                                        <div className="sm:col-span-3 flex gap-x-4">
                                            <ButtonOutlined
                                                onClick={isEditing ? handleCancelClick : handleEditClick}
                                            >
                                                <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Edit Profile
                                            </ButtonOutlined>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                                                <div className="flex flex-col gap-x-6 gap-y-8">
                                                    <div className="sm:col-span-4">
                                                        <FormInputText
                                                            label='First Name'
                                                            autoFocus
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="sm:col-span-4">
                                                        <FormInputText
                                                            label='Last Name'
                                                            autoFocus
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-4">
                                            <FormInputText
                                                label='Email'
                                                autoFocus
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="sm:col-span-4">
                                            <FormInputText
                                                label='Phone'
                                                autoFocus
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                        <div className="sm:col-span-4">
                                            <FormInputText
                                                label='Address'
                                                autoFocus
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                        <div className="sm:col-span-4">
                                            <FormInputText
                                                label='Date of Birth'
                                                autoFocus
                                                value={dob}
                                                onChange={(e) => setDob(e.target.value)}
                                            />
                                        </div>
                                        <div className="sm:col-span-3 flex gap-x-4">
                                            <ButtonOutlined
                                                onClick={handleCancelClick}
                                            >
                                                Cancel
                                            </ButtonOutlined>
                                            <ButtonFilled
                                                onClick={handleSaveClick}
                                            >
                                                Save Profile
                                            </ButtonFilled>
                                        </div>
                                    </div>
                                )
                                }
                            </article >
                        </div >
                    </section >
                    <section className="pb-5 border-b border-gray-200 mb-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center ">
                                <HeartIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                <p className="text-xl font-semibold">
                                    Favorites
                                </p>
                            </div>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/favorite');
                                }}
                                className="text-sm font-semibold leading-6 txt-primary hover:txt-primary-hover mr-6"
                            >
                                View All
                                <span aria-hidden="true">

                                </span>
                            </a>
                        </div>
                        <div className="flex flex-col py-6 md:top-6 max-h-96 overflow-y-auto rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full flex-grow">
                                {properties.map((property, index) => (
                                    <CardFavorite
                                        key={index}
                                        title={property.title}
                                        propertyImgUrl={property.propertyImgUrl}
                                        description={property.description}
                                        location={property.location}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="pb-5 mb-5">
                        <div className="flex items-center mb-4">
                            <CalendarIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                            <p className="text-xl font-semibold">
                                Appointments
                            </p>
                        </div>
                        <div className="flex flex-col py-6 md:top-6 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full flex-grow">
                                <CardAppointment
                                    title="House Meeting"
                                    status={0}
                                    date="12/08/2023"
                                >
                                </CardAppointment>
                                <CardAppointment
                                    title="Owner Meeting"
                                    status={2}
                                    date="08/08/2023"
                                >
                                </CardAppointment>
                                <CardAppointment
                                    title="Room Tour"
                                    status={1}
                                    date="06/08/2023"
                                >
                                </CardAppointment>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
