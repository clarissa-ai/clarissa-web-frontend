import React from 'react';
import PropTypes from 'prop-types'

const OpenBulletIcon = (props) => {
    return (
        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6.25327" cy="7.19907" r="4.84963" stroke={props.color ? props.color : 'black'} strokeWidth="2.80727"/>
        </svg>
    );
};
OpenBulletIcon.propTypes = {
    color: PropTypes.string,
};
export default OpenBulletIcon;
