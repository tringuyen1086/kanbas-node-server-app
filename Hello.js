export default function HelloRoutes(app) {        // function accepts app reference to express module
    // lambda function
    // app.get("/hello", (req, res) => {}); 
    app.get("/hello", (req, res) => {
        res.send("Hello World! Life is Good");
    });
    app.get("/", (req, res) => {
        res.send("Welcome to Web Development!");
    });
}