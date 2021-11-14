const detailsSectionVisible = (state = false, action) => {
    switch (action.type) {
    case 'UPDATE_DETAILS_SECTION_VISIBLE':
        return action.value;
    default:
        return state;
    }
};

export default detailsSectionVisible;
