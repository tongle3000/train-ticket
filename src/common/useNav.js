import { useCallback } from 'react';

import { h0 } from './unitls';

export default function useNav(departDate, dispatch, prevDepartDate, nextDepartDate) {
    const isPrevDisabled = h0(departDate) <= h0();
    const isNextDisabled = h0(departDate) - h0() >  30 * 86400 * 1000;

    const prev = useCallback(() => {
        if(isPrevDisabled) {
            return;
        }
        dispatch(prevDepartDate());
    }, [isPrevDisabled, dispatch, prevDepartDate]);

    const next = useCallback(() => {
        if(isNextDisabled) {
            return;
        }
        dispatch(nextDepartDate());
    }, [isNextDisabled, dispatch, nextDepartDate]);

    return {
        isPrevDisabled,
        isNextDisabled,
        prev,
        next,
    }

}
