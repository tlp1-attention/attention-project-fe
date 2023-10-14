import { Toaster as HotToaster } from 'react-hot-toast';

export const Toaster = () => <HotToaster
    toastOptions={{
        style: {
            padding: "1.3rem",
            fontSize: "1.3rem",
            backgroundColor: "var(--clr-secondary-200)",
        },
        position: 'bottom-right'
    }}
/>