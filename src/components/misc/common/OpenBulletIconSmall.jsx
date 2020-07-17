import React from 'react';
import PropTypes from 'prop-types';

const OpenBulletIconSmall = (props) => {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3" cy="3" r="2.5" stroke={props.color}/>
        </svg>
    );
};
OpenBulletIconSmall.propTypes = {
    color: PropTypes.string,
};
export default OpenBulletIconSmall;
