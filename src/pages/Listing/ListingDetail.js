import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';

/* CSS Imports */
import 'styles/pages/Detail.css';

/* Component Imports */
import Layout from 'components/layout/Layout';
import Carousel from 'components/carousel/Carousel';
import DetailList from 'components/ui/DetailList';
import Heading from 'components/ui/Heading';
import DetailFeatures from 'components/ui/DetailFeatures';
import UserIconWithTag from 'components/ui/UserIconWithTag';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import ButtonFilled from 'components/ui/ButtonFilled';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import Badge from 'components/ui/Badge';
import Loader from 'components/Loader/Loader';
import CommentForm from 'components/ui/CommentForm';
import Comment from 'components/ui/Comment';

/* Context Imports */
import AuthContext from 'contexts/AuthContext';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Icon Imports */
import { HeartIcon, CalendarIcon, CheckIcon } from '@heroicons/react/24/outline';

function ListingDetail() {

    /* useState */
    const [data, setData] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    /* useNavigate */
    const navigate = useNavigate();

    /* useParams */
    const { id: propertyId } = useParams();

    /* useContext */
    const { auth } = useContext(AuthContext);

    /* Functions */
    const addToFavorite = (e) => {
        e.stopPropagation();
        if (!isFavorite) {
            Axios.post('api/favourite/create',
                {
                    tenantId: auth?.id,
                    propertyId: parseInt(propertyId)
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
            Axios.delete(`/api/favourite/delete?tenantId=${auth?.id}&propertyId=${parseInt(propertyId)}`)
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

    const submitComment = () => {
        console.log(newComment);
    };

    /* useEffect */
    useEffect(() => {
        setLoading(true);
        Axios.get(`/api/property/${propertyId}`)
            .then(res => {
                if (res.status === 200) {
                    setData(res.data);
                }
                setLoading(false);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setError(err.response.data);
                }
                else if (err.response.status === 500) {
                    setError(err.response.data);
                }
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        Axios.patch(`api/property/${propertyId}/views`)
            .then(res => {
                if (res.status === 200) {
                    // setData(res.data);
                    console.log(res.data);
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
    }, []);

    useEffect(() => {
        if (auth?.id) {
            Axios.get(`/api/tenant/${auth?.id}/favourites/id`)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.indexOf(parseInt(propertyId)) !== -1) setIsFavorite(true);
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
    }, [auth]);

    useEffect(() => {
        Axios.get(`api/property/${parseInt(propertyId)}/comments`)
            .then(res => {
                if (res.status === 200) {
                    setComments(res.data);
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
    }, []);

    const propertyAmenities = [
        'Shower',
        'Cloth-Hanger',
        'Wifi Access',
        'Air-conditioning',
    ]

    if (loading) {
        return <Loader />
    }
    else {
        return (
            <Layout>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-gray-200">

                    {/* 8-column section */}
                    <div className="sm:col-span-1 md:col-span-8">
                        <Carousel items={data['propertyImages'] ? data['propertyImages'] : []} />
                        <Heading
                            title={data['title'] && data['title']}
                            description={data['description'] && data['description']}
                        />

                        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                            {
                                [
                                    { name: 'Address', description: data['address'] },
                                    { name: 'Postal Code', description: data['postalCode'] },
                                    { name: 'Nearby Locations', description: data['nearbyLocations'] },
                                    { name: 'Furnishment', description: data['furnishment'] },
                                ].map((feature) => (
                                    <div key={feature.name} className="border-t border-gray-200 pt-4">
                                        <dt className="font-medium text-gray-900">{feature.name}</dt>
                                        <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                                    </div>
                                ))
                            }
                        </dl>

                        <div className='pt-8 mt-8 border-t border-gray-200'>
                            <DetailList title={'Property Details'} />
                        </div>
                    </div>

                    {/* 4-column section */}
                    <div className="sm:col-span-1 md:col-span-4">
                        <div className="flex flex-col p-6 md:sticky md:top-6 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    <li className="py-6">
                                        <div className="mt-6 f flex items-center justify-between">
                                            <p className="lex items-baseline gap-x-2">
                                                <span className="text-5xl font-bold tracking-tight text-gray-900">{data['rentalFees']}</span>
                                                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">SGD</span>
                                            </p>
                                            <Badge status="success">
                                                Verified Property
                                            </Badge>
                                        </div>
                                        <div>
                                            <div className="mt-10 flex items-center gap-x-4">
                                                <h4 className="flex-none text-sm font-semibold leading-6 txt-primary">Core facilities/ Amenities</h4>
                                                <div className="h-px flex-auto bg-gray-100" />
                                            </div>
                                            <ul
                                                role="list"
                                                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                                                {propertyAmenities.map((amenity) => (
                                                    <li key={amenity} className="flex gap-x-3">
                                                        <CheckIcon className="h-6 w-5 flex-none txt-primary" aria-hidden="true" />
                                                        {amenity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>

                                    <li className="flex flex-col md:flex-row py-6 justify-around">
                                        <span className="flex-1">
                                            <ButtonOutlined onClick={addToFavorite}>
                                                {isFavorite
                                                    ? (
                                                        <div className="flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(220, 38, 38)" className="-ml-0.5 mr-1.5 h-5 w-5">
                                                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                                            </svg>
                                                            <span className="text-red-600">
                                                                Favorite
                                                            </span>
                                                        </div>
                                                    )
                                                    : (
                                                        <div className="flex items-center">
                                                            <HeartIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                                            Add to Favorites
                                                        </div>
                                                    )}
                                            </ButtonOutlined>
                                        </span>

                                        <span className="ml-0 mt-3 flex-1 md:ml-3 md:mt-0">
                                            <ButtonOutlined action="">
                                                <CalendarIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Appointment
                                            </ButtonOutlined>
                                        </span>
                                    </li>
                                    <li className="flex flex-col pt-2 pb-6">
                                        <UserIconWithTag
                                            imgUrl={data?.renter?.photoUrl}
                                            username={`${data?.renter?.firstName} ${data?.renter?.lastName}`}
                                        />
                                        <ButtonFilled>
                                            Contact
                                        </ButtonFilled>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-8 pb-8 border-b border-gray-200">
                    <Heading title="Location" />
                    <GoogleMap
                        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                        query={`Singapore ${data['postalCode'] && data['postalCode']}`}
                        zoom={17} />
                </div>

                <div className="my-8 pb-8 border-b border-gray-200">
                    <Heading
                        title="Comments"
                    />
                    <div className='my-6'>
                        <CommentForm comment={newComment} setComment={setNewComment} handleSubmit={submitComment} />
                        {
                            (comments.length === 0)
                                ? <p>There are no comments yet</p>
                                : comments.map((comment, index) => (
                                    <Comment
                                        key={index}
                                        userPhotoUrl='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b2a0f028-f3a9-4fd5-92a2-f75d028c884e/d32mwam-ac62a6e4-de96-46a1-b4ec-15b1138b8937.jpg/v1/fill/w_1280,h_960,q_75,strp/tom_cruise_as_a_na_vi_by_scribblingangel_d32mwam-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTYwIiwicGF0aCI6IlwvZlwvYjJhMGYwMjgtZjNhOS00ZmQ1LTkyYTItZjc1ZDAyOGM4ODRlXC9kMzJtd2FtLWFjNjJhNmU0LWRlOTYtNDZhMS1iNGVjLTE1YjExMzhiODkzNy5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FO7FSE9cAxLV7i9AjryAmESe-tlQkH23L00p-VKP8Ww'
                                        username='Stephen Phyo'
                                        date="01/01/2000"
                                        text="Comment 01"
                                    />
                                ))
                        }
                    </div>
                </div>
            </Layout>
        );
    }
}

export default ListingDetail;