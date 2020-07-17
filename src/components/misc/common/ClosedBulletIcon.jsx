import React from 'react';
import PropTypes from 'prop-types';

const OpenBulletIcon = (props) => {
    return (
        <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4.496" cy="5.24991" r="4.27457" fill={props.color ? props.color : 'black'}/>
        </svg>
    );
};
OpenBulletIcon.propTypes = {
    color: PropTypes.string,
};
export default OpenBulletIcon;
