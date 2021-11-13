const updateTableDataTypeReducer = (state = null, action) => {
    switch (action.type) {
    case 'UPDATE_TABLE_DATA_TYPE':
        return action.value;
    default:
        return state;
    }
};

export default updateTableDataTypeReducer;
