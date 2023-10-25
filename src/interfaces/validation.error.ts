export class ValidationError extends Error {
    declare path?: string;
    declare value?: string;

    name = 'ValidationError';
}