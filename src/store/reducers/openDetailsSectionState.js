const openDetailsSectionStateReducer = (state = false, action) => {
    switch (action.type) {
    case 'UPDATE_OPEN_DETAILS_SECTION_STATE':
        return action.value;
    default:
        return state;
    }
};

export default openDetailsSectionStateReducer;
