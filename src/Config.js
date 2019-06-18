const Config = {
    ENABLE_CORS_HEADER_URL: 'https://cors-anywhere.herokuapp.com/', //For local development only
    API_URL: 'https://api.deezer.com/search?q=track:',

    IMAGE: {
        search_btn: 'data:image/png;base64,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'
    },

    TEXT: {
        search_btn: 'Search Button',
        error_message: 'Server busy. Please try again later',
        search_input_placeholder: 'Relax and take a song',
        loading: 'Loading icon'
    }
};
export default Config;