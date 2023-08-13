import React from 'react';
import ButtonFilled from 'components/ui/ButtonFilled';

function CommentForm() {
    return (
        <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                    placeholder="Write a comment..."
                    required
                ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="col-span-1 md:col-span-4 md:col-start-9">
                    <ButtonFilled>
                        Post Comment
                    </ButtonFilled>
                </div>
            </div>
        </form>
    );
}

export default CommentForm;
