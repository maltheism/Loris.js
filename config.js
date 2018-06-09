export default {
    app: {
        name: 'Loris',
        version: '0.0.1',
        info: 'Open Science Platform'
    },
    port: {
        server: 7777,
        socket: 6666
    },
    security : {
        log: {
            enabled: false,
            fileName: 'loris_log'
        },
        cookie: {
            secret: '63iVzNwvZu3AHwxAjAw2UD9CYyC22vGgbGK86mcAXUXvxWNj3C',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week cookie age.
        },
    },
    gcloud: {
        use: 'deployment',
        deployment: '/home/intralizee/Keys/intralizee.json',
        development: '/Users/intralizee/Development/Keys/intralizee.json'
    },
    database: {
        mysql: {
            use: 'development', // set to 'deployment' or 'development' to switch (development)
            deployment: '/home/intralizee/Keys/loris.json',
            development: '/Users/intralizee/Development/Keys/mysql/loris.json'
        },
        mongodb: {
            use: 'deployment', // set to 'deployment' or 'development' to switch (development)
            deployment: 'mongodb://alizee:gf338yZqLM7Cvsfp4EoX@ds153380.mlab.com:53380/loris',
            development: 'mongodb://127.0.0.1:27017/loris'
        }
    }
};