import React from 'react';
import {useSelector} from 'react-redux';

import {profileSelector} from 'redux/selectors';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';

const MainPage = (props) => {
    const profile = useSelector(profileSelector);
    return (
        profile.authenticated ? <div>
            {/* <ResponsiveDrawer /> */}
            {props.children}
        </div> :
            props.children
    );
};
export default MainPage;
