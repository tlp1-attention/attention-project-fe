export function debounce<A, T extends (...args: A[]) => void>(func: T, secs: number) {
    let stop = false;
    return (...args: A[]) => {
        if (!stop) func(...args);
        stop = true;
        setTimeout(() => {
            stop = false;
        }, secs);
    }
}