let todos = [ 
    { id: 1, title: "Task 1", completed: false },  
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },  
    { id: 4, title: "Task 4", completed: true }, ];
export default function WorkingWithArrays(app) {
    /* CRUD */
    /* Create */
    app.get("/lab5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: `New Task ${todos.length + 1}`,
            completed: false,
            };
            todos.push(newTodo);
            res.json(todos);
    });

    /* Read */
    app.get("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        res.json(todo);
    });
    
    /* Update */
    app.get("/lab5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
    });

    /* Test Link: http://localhost:4000/lab5/todos/1/description/New%20Description */    
    app.get("/lab5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.description = description;
        res.json(todos);
    });

    /* Test Link: http://localhost:4000/lab5/todos/1/completed/true */
    app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.completed = completed;
        res.json(todos);
    });
    
    
    /* Delete */
    app.get("/lab5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        todos.splice(todoIndex, 1);
        res.json(todos);
    });
    

    app.get("/lab5/todos", (req, res) => {
        const { completed } = req.query;
        /* Retrieve an array of true of false completed
        http://localhost:4000/lab5/todos/?completed=true
        http://localhost:4000/lab5/todos/?completed=false 
        */
        if (completed !== undefined) {
            const completedBool = completed === "true";
            const completedTodos = todos.filter(
                (t) => t.completed === completedBool);
            res.json(completedTodos);
            return;
        }
        res.json(todos);
    });
    
};
