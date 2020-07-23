import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const getMobile = () => window.matchMedia('only screen and (max-width: 959px)').matches;

const MobileBlock = (props) => {
    const [mobile, setMobile] = useState(getMobile());
    const resizeListener = () => {
        setMobile(getMobile());
    };
    useEffect(() => {
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    if (!mobile) {
        return props.children;
    } else {
        console.log('Get the mobile app!');
        return [];
    }
};
MobileBlock.propTypes = {
    children: PropTypes.node.isRequired,
};
export default MobileBlock;
