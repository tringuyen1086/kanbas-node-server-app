import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
    const { enrollments, users, courses } = Database;

    // Check if the user exists
    const userExists = users.some((user) => user._id === userId);
    if (!userExists) {
        throw new Error(`User with ID ${userId} does not exist.`);
    }

    // Check if the course exists
    const courseExists = courses.some((course) => course._id === courseId);
    if (!courseExists) {
        throw new Error(`Course with ID ${courseId} does not exist.`);
    }

    // Check if the user is already enrolled in the course
    const alreadyEnrolled = enrollments.some(
        (enrollment) => enrollment.user === userId && enrollment.course === courseId
    );
    if (alreadyEnrolled) {
        throw new Error(`User with ID ${userId} is already enrolled in course ${courseId}.`);
    }

    // Add the enrollment
    enrollments.push({ _id: Date.now().toString(), user: userId, course: courseId });
}


export function unenrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;

    // Check if the enrollment exists
    const enrollmentExists = enrollments.some(
        (enrollment) => enrollment.user === userId && enrollment.course === courseId
    );
    if (!enrollmentExists) {
        throw new Error(`User with ID ${userId} is not enrolled in course ${courseId}.`);
    }

    // Remove the enrollment
    Database.enrollments = enrollments.filter(
        (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
    );
}
