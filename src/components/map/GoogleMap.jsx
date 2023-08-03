import React from 'react';

const GoogleMap = ({ apiKey, latitude, longitude, zoom }) => {
    return (
        <div className="w-full h-96 rounded-lg my-8">
            {/* <iframe
        src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&q=${latitude},${longitude}&zoom=${zoom}`}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      ></iframe> */}
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.803684591845!2d103.77402507467171!3d1.2921869617591148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1a56784202d9%3A0xc3162c3946c3da12!2sNUS-ISS!5e0!3m2!1sen!2ssg!4v1690971434952!5m2!1sen!2ssg"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-lg"></iframe>
        </div>
    );
};

export default GoogleMap;
