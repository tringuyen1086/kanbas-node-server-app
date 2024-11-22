import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
    // Create a new user
    const createUser = (req, res) => {
        try {
            const newUser = dao.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Delete a user
    const deleteUser = (req, res) => {
        try {
            const userId = req.params.userId;
            dao.deleteUser(userId);
            res.sendStatus(204);
        } catch (error) {
            res.status(404).json({ error: "User not found" });
        }
    };

    // Find all users
    const findAllUsers = (req, res) => {
        try {
            const users = dao.findAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Find user by ID
    const findUserById = (req, res) => {
        try {
            const userId = req.params.userId;
            const user = dao.findUserById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Update user details
    const updateUser = (req, res) => {
        try {
            const userId = req.params.userId;
            const userUpdates = req.body;
            dao.updateUser(userId, userUpdates);
            const updatedUser = dao.findUserById(userId);
            req.session["currentUser"] = updatedUser;
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // User signup
    const signup = (req, res) => {
        try {
            const user = dao.findUserByUsername(req.body.username);
            if (user) {
                return res.status(400).json({ error: "Username already in use" });
            }
            const newUser = dao.createUser(req.body);
            req.session["currentUser"] = newUser;
            res.json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // User signin
    const signin = (req, res) => {
        try {
            const { username, password } = req.body;
            const user = dao.findUserByCredentials(username, password);
            if (!user) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            req.session["currentUser"] = user;
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // User signout
    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    // Get current user's profile
    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        res.json(currentUser);
    };

    // Find courses for enrolled user
    const findCoursesForEnrolledUser = (req, res) => {
        try {
            let { userId } = req.params;
            if (userId === "current") {
                const currentUser = req.session["currentUser"];
                if (!currentUser) {
                    return res.status(401).json({ error: "Unauthorized" });
                }
                userId = currentUser._id;
            }
            const courses = courseDao.findCoursesForEnrolledUser(userId);
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Create a new course and enroll current user
    const createCourse = (req, res) => {
        try {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const newCourse = courseDao.createCourse(req.body);
            enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
            res.status(201).json(newCourse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Route Definitions
    app.post("/api/users/current/courses", createCourse);
    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.get("/api/users/profile", profile);
}