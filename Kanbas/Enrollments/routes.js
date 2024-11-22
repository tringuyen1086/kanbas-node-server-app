import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    app.post("/api/courses/:userId/:courseId/enroll", (req, res) => {
        const { userId, courseId } = req.params;

        try {
            dao.enrollUserInCourse(userId, courseId);
            res.status(200).send({ message: `User ${userId} enrolled in course ${courseId}.` });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    });

    app.delete("/api/courses/:userId/:courseId/unenroll", (req, res) => {
        const { userId, courseId } = req.params;

        try {
            dao.unenrollUserInCourse(userId, courseId);
            res.status(200).send({ message: `User ${userId} unenrolled from course ${courseId}.` });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    });
}