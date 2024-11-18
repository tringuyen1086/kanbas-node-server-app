const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
};
export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });
    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
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
    
};

