export function debounce<A>(func: (...args: A[]) => void, secs: number) {
    let stop = false;
    return (...args: A[]) => {
        if (!stop) func(...args);
        stop = true;
        setTimeout(() => {
            stop = false;
        }, secs);
    }
}