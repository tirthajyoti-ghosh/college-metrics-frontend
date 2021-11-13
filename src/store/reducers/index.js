import { combineReducers } from 'redux';

import selectedCollegeId from './selectedCollegeId';
import tableDataType from './tableDataType';

export default combineReducers({
    selectedCollegeId,
    tableDataType,
});
