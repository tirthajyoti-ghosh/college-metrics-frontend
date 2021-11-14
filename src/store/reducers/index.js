import { combineReducers } from 'redux';

import detailsSectionVisible from './detailsSectionVisible';
import selectedCollegeId from './selectedCollegeId';
import tableDataType from './tableDataType';

export default combineReducers({
    detailsSectionVisible,
    selectedCollegeId,
    tableDataType,
});
