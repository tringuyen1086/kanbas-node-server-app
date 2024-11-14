export default function Hello(app) {        // function accepts app reference to express module
    app.get('/hello', (req, res) => {       // to create routes here. We could have used the new arrow function syntax instead
        res.send('Life is good!')
    })
    app.get('/', (req, res) => {
        res.send('Welcome to Full Stack Development!')
    })
}

