import React from 'react';
import { useNavigate } from 'react-router';

/* Component Imports */
import ButtonFilled from 'components/ui/ButtonFilled';

function Login() {

    /* useNavigate */
    const navigate = useNavigate();

    return (

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-start-2 sm:col-span-1 md:col-span-5">
                    Child 1
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
                            <h3 className="text-base font-semibold leading-7 txt-primary">
                                Are you a...
                            </h3>
                            <ButtonFilled
                                onClick={() => navigate('/')}>
                                Property Finder
                            </ButtonFilled>
                            <ButtonFilled
                                onClick={() => navigate('/renter/login')}>
                                Property Renter
                            </ButtonFilled>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Not a member?{' '}
                                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Start a 14 day free trial
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Login;