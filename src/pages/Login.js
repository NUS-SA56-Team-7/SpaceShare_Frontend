import React from 'react';
import { useNavigate } from 'react-router';

/* Component Imports */
import ButtonFilled from 'components/ui/ButtonFilled';
import Accordion from 'components/ui/Accordion';

function Login() {

    /* useNavigate */
    const navigate = useNavigate();

    const bgImgUrl = "https://images.unsplash.com/photo-1675449215007-def921b7c0ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80";

    return (
        <div className="relative min-h-screen">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${bgImgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            />
            <div
                className="absolute inset-0 bg-black opacity-60"
                style={{ mixBlendMode: 'multiply' }}
            />
            {/* MAIN CONTENT */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-start-2 sm:col-span-1 md:col-span-5 flex items-center max-h-96">
                        <img src="./spaceshare_logo.svg" alt="Logo" className="h-10 w-auto z-10" />
                    </div>

                    <div className="md:col-start-7 sm:col-span-1 md:col-span-5">
                        <div className="flex flex-col p-6 md:sticky md:top-6 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <div className="flex mt-10 items-center">
                                    <h2 className="text-3xl font-bold leading-9 tracking-tight text-gray-900">
                                        Sign in
                                    </h2>
                                </div>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <h3 className="font-semibold leading-7 txt-primary mb-5 text-lg">
                                    Are you a...
                                </h3>
                                <div>
                                    <ButtonFilled
                                        onClick={() => navigate('/')}>
                                        Property Finder
                                    </ButtonFilled>
                                    <Accordion
                                        title="What is a"
                                        additionalTitle="property finder?"
                                        content={
                                            <>
                                                <h2 className="mb-2 font-semibold text-gray-900">A property finder is:</h2>
                                                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                                                    <li>A user who wants to find a room</li>
                                                    <li>A user who is looking for roommates</li>
                                                </ul>
                                            </>
                                        }
                                    />
                                </div>

                                <div className="my-4 flex items-center gap-x-4">
                                    <div className="h-px flex-auto bg-gray-200" />
                                    <h4 className="flex-none text-sm font-semibold leading-6 txt-primary">Or</h4>
                                    <div className="h-px flex-auto bg-gray-200" />
                                </div>
                                <ButtonFilled
                                    onClick={() => navigate('/renter/login')}>
                                    Property Renter
                                </ButtonFilled>
                                <Accordion
                                    title="What is a"
                                    additionalTitle="property renter?"
                                    content={
                                        <>
                                            <h2 className="mb-2 font-semibold text-gray-900">A property renter is:</h2>
                                            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                                                <li>An owner or landlord of a certain property</li>
                                                <li>Interested in listing out property for rent</li>
                                            </ul>
                                        </>
                                    }
                                />

                                <p className="mt-5 pt-5 border-t border-gray-200 text-center text-sm text-gray-500">
                                    Developed by Team7
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className="absolute bottom-0 left-0 w-full p-2 text-white text-center">
                <span
                    className="text-xs">
                    Background image from
                    <a
                        href="https://unsplash.com/photos/iSmekgHuBN4"
                        target="_blank"
                        className="underline ml-1"
                        rel="noopener noreferrer"
                    >
                        Unsplash
                    </a>
                </span>

            </div>
        </div>
    );
}

export default Login;