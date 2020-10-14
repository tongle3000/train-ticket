import { useCallback } from 'react';


export default function useOnback() {
    const onBack = useCallback(() => {
        window.history.back();
    }, []);
    return { onBack };
}