import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import withReactContent, { ReactSweetAlert } from "sweetalert2-react-content";

export type IAlert = typeof Swal & ReactSweetAlert & {
    prompt: (params: SweetAlertOptions) => Promise<SweetAlertResult>
}

export const Alert = withReactContent(Swal) as IAlert;

Alert.prompt = (promptParams: SweetAlertOptions) => Alert.fire({
    ...promptParams,
    showCancelButton: true,
    confirmButtonColor: 'var(--clr-accent-800)',
    cancelButtonColor: 'var(--clr-red-600)',
    icon: 'question'
});