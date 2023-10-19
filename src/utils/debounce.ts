export function debounce<A, T extends (...args: A[]) => void>(func: T, secs: number) {
    let stop = false;
    return () => {
        if (!stop) func();
        stop = true;
        setTimeout(() => {
            stop = false;
        }, secs);
    }
}