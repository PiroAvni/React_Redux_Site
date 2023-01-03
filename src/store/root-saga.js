import { all, call } from 'redux-saga/effects';

import {categoriesSaga} from './categories/categories.saga';

// Generator Functions - 
export function* rootSaga() {
    yield all([call(categoriesSaga)]);
}
