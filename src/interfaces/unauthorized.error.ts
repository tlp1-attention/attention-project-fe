export class UnauthorizedError extends Error {
    name = 'UnauthorizedError';

    message = 'Debe estar autenticado para acceder a esta ruta.';
}