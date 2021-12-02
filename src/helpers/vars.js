export const PAGE_LIMIT = 10

export const BASE_URL = 'http://localhost'

// API URLS
export const PLATFORMS_URL = '/platform/index'
export const CREATE_APP_URL = '/app/store'
export const DELETE_APP_URL = '/app/:internal_id/delete'
export const VIEW_APP_URL = '/app/:internal_id/view'
export const CONFIGURE_APP_URL = '/app/:internal_id/configure'
export const SEGMENTS_URL = '/segment/index'
export const APPS_URL = '/app/index'
export const CREATE_SEGMENT_URL = '/segment/store'
export const VIEW_SEGMENT_URL = '/segment/view'
export const DELETE_SEGMENT_URL = '/segment/:id/delete'
export const COUNTRIES_URL = '/country/index'
export const LANGUAGES_URL = '/language/index'

// REGEX
export const REPLACE_REGEX = /:(\w+)/

export const FILTER_TYPES = {
    language: {
        title: 'Language',
        predicates: [
            {
                name: 'Is',
                value: 'is'
            },
            {
                name: 'Is Not',
                value: 'isNot'
            },
        ],
        option: true,
        key: false,
        data: (state) => {
            return state.languages.data
        }
    },
    country: {
       title: 'Country',
       predicates: [
           {
               name: 'Is',
               value: 'is'
           },
           {
               name: 'Is Not',
               value: 'isNot'
           }
       ],
        option: true,
        key: false,
        data: (state) => {
           return state.countries.data
        }
    },
    createdAt: {
        title: 'First Session',
        predicates: [
            {
                name: 'Less Than',
                value: 'after'
            },
            {
                name: 'Greater Than',
                value: 'before'
            }
        ],
        option: false,
        key: false,
        actionType: null
    },
    activeAt: {
        title: 'Last Session',
        predicates: [
            {
                name: 'Less Than',
                value: 'after'
            },
            {
                name: 'Greater Than',
                value: 'before'
            }
        ],
        option: false,
        key: false,
        data: null
    },
    sessionsCount: {
        title: 'Sessions Count',
        predicates: [
            {
                name: 'Less Than',
                value: 'after'
            },
            {
                name: 'Greater Than',
                value: 'before'
            },
            {
                name: 'Is',
                value: 'is'
            },
        ],
        option: false,
        key: false,
        data: null
    },
    tag: {
        title: 'Tag',
        predicates: [
            {
                name: 'Is',
                value: 'is'
            },
            {
                name: 'Is Not',
                value: 'isNot'
            },
        ],
        option: false,
        key: true,
        data: null
    },
    channel: {
        title: 'Platform',
        predicates: [
            {
                name: 'Is',
                value: 'is'
            },
            {
                name: 'Is Not',
                value: 'isNot'
            },
        ],
        option: true,
        key: false,
        data: (state) => {
            return state.platforms.data
        }
    }
}