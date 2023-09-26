import { useState, useEffect } from "react";

export function useDebouncedValue(input, time = 500) {
    const [debouncedValue, setDebouncedValue] = useState(input);

    // every time input value has changed - set interval before it's actually committed
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(input);
        }, time);

        return () => {
            clearTimeout(timeout);
        };
    }, [input, time]);

    return debouncedValue;
}
