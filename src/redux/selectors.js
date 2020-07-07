export const profileSelector = (state) => {
    console.log('here');
    return state.profile;
};

export const loaderSelector = (store) => store.loader;
