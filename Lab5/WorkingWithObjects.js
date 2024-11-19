const assignment = {
    id: 1, 
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", 
    completed: false, 
    score: 0,
};

const module = {
    id: 100, 
    name: "NodeJS Module",
    description: "Create a NodeJS server with ExpressJS",
    course: "CS5610 - Web Development"
};


export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });
    app.get("/lab5/assignment/id", (req, res) => {
        res.json(assignment.id);
    });
    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });
    app.get("/lab5/assignment/description", (req, res) => {
        res.json(assignment.description);
    });
    app.get("/lab5/assignment/due", (req, res) => {
        res.json(assignment.due);
    });
    app.get("/lab5/assignment/completed", (req, res) => {
        res.json(assignment.completed);
    });
    app.get("/lab5/assignment/score", (req, res) => {
        res.json(assignment.score);
    });

    /* modify title (add %20 for spaces in between)
    http://localhost:4000/lab5/assignment/title/NodeJS%20Assignment%202024 
    {
        "id": 1,
        "title": "NodeJS Assignment 2024",
        "description": "Create a NodeJS server with ExpressJS",
        "due": "2021-10-10",
        "completed": false,
        "score": 0
    }
    */
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = newScore;
        res.json(assignment);
    });
    app.get("/lab5/assignment/completed/:newChecked", (req, res) => {
        const { newChecked } = req.params;
        assignment.completed = newChecked;
        res.json(assignment);
    });

    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });
    app.get("/lab5/module/id", (req, res) => {
        res.json(module.id);
    });
    app.get("/lab5/module/name", (req, res) => {
    res.json(module.name);
    });
    app.get("/lab5/module/description", (req, res) => {
    res.json(module.description);
    });
    app.get("/lab5/module/course", (req, res) => {
    res.json(module.course);
    });

    app.get("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
    });
    app.get("/lab5/module/description/:newDescription", (req, res) => {
    const { newDescription } = req.params;
    module.description = newDescription;
    res.json(module);
    }); 
};

