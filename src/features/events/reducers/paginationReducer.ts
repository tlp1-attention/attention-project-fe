
export const PAGE_ACTIONS = {
    SET_PAGE: 'SET_PAGE',
    SET_PAGE_SIZE: 'SET_PAGE_SIZE'
} as const;

type Action = {
    type: typeof PAGE_ACTIONS[keyof typeof PAGE_ACTIONS];
    payload: number;
}

type PageState = {
    page: number;
    pageSize: number;
}

export const init = (urlParams: URLSearchParams) => {
    const page = urlParams.get('page') || 1;
    const pageSize = urlParams.get('pageSize') || 10;

    return {
        page,
        pageSize
    } as PageState
}


export function paginationReducer(state: PageState, action: Action) {
    switch (action.type) {
        case PAGE_ACTIONS.SET_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case PAGE_ACTIONS.SET_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.payload
            }
        default:
            return state;
    }
}