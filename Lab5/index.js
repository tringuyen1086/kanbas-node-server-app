export default function Lab5(app) {     // accept app reference to express module
    app.get("/lab5/welcome", (req, res) => {
        res.send("Welcome to Lab 5");
    });
};
