import React from 'react';

import UserIconWithTag from './UserIconWithTag';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';

function Comment({ userPhotoUrl, username, date, text }) {

    return (
        <div>
            <article className="p-6 pt-4 mb-6 text-base bg-white rounded-lg border border-gray-200">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center w-full flex-wrap">
                        <div className="mr-3">
                            <UserIconWithTag
                                userPhotoUrl={userPhotoUrl}
                                username={username}
                            />
                        </div>
                        <p className="text-sm font-medium text-gray-700 xs:pb-6 sm:pl-3 sm:border-l border-gray-200">
                            Posted:
                            <span className="ml-2">
                                {date}
                            </span>
                        </p>
                    </div>
                </footer>
                <p className="text-gray-500">
                    {text}
                </p>
                <div className="flex items-center mt-4 space-x-4">
                    <button
                        type="button"
                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <ChatBubbleLeftEllipsisIcon className='mr-1 w-4 h-4' />
                        Reply
                    </button>
                </div>
            </article>
        </div>
    );
}

export default Comment;
