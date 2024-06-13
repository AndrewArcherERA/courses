const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/playground")
    .then(() => console.log("Connect to MongoDB..."))
    .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ["web", "mobile", "network"],
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: "A course should have at least one tag.",
        },
    },
    date: { type: Date, default: Date.now() },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
    },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
    const course = new Course({
        name: "Another Course",
        category: "-",
        author: "Mosh",
        tags: [],
        isPublished: true,
        price: 20,
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (ex) {
        for (field in ex.errors) console.log(ex.errors[field]);
    }
}

async function getCourses() {
    const courses = await Course.find({ author: "Mosh", isPublished: false });
    console.log(courses);
}

async function updateCourse(id) {
    const course = Course.findById(id);
    if (!course) return;

    course.set({
        isPublished: false,
        author: "Another Author Again Again",
    });

    const result = await course.updateMany();
    console.log(result);
}

createCourse();
