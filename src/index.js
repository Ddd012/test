"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
// 错误处理中间件
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
};
// 获取所有学生
app.get('/students', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield prisma.student.findMany();
    res.json(students);
}));
// 创建新学生
app.post('/students', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { student_name, grade, email, age } = req.body;
    const student = yield prisma.student.create({
        data: { student_name, grade, email, age },
    });
    res.json(student);
}));
// 更新学生
app.put('/students/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { student_name, grade, email, age } = req.body;
    const student = yield prisma.student.update({
        where: { student_id: Number(id) },
        data: { student_name, grade, email, age },
    });
    res.json(student);
}));
// 删除学生
app.delete('/students/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.student.delete({
        where: { student_id: Number(id) },
    });
    res.json({ message: 'Student deleted successfully' });
}));
// 获取所有课程
app.get('/courses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield prisma.course.findMany();
    res.json(courses);
}));
// 创建新课程
app.post('/courses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { course_name, teacher, credits, class_time } = req.body;
    const course = yield prisma.course.create({
        data: { course_name, teacher, credits, class_time },
    });
    res.json(course);
}));
// 更新课程
app.put('/courses/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { course_name, teacher, credits, class_time } = req.body;
    const course = yield prisma.course.update({
        where: { course_id: Number(id) },
        data: { course_name, teacher, credits, class_time },
    });
    res.json(course);
}));
// 删除课程
app.delete('/courses/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.course.delete({
        where: { course_id: Number(id) },
    });
    res.json({ message: 'Course deleted successfully' });
}));
// 获取所有选课记录
app.get('/enrollments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const enrollments = yield prisma.enrollment.findMany();
    res.json(enrollments);
}));
// 创建新选课记录
app.post('/enrollments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { student_id, course_id } = req.body;
    const enrollment = yield prisma.enrollment.create({
        data: { student_id, course_id },
    });
    res.json(enrollment);
}));
// 更新选课记录
app.put('/enrollments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { student_id, course_id } = req.body;
    const enrollment = yield prisma.enrollment.update({
        where: { enrollment_id: Number(id) },
        data: { student_id, course_id },
    });
    res.json(enrollment);
}));
// 删除选课记录
app.delete('/enrollments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.enrollment.delete({
        where: { enrollment_id: Number(id) },
    });
    res.json({ message: 'Enrollment deleted successfully' });
}));
// 使用错误处理中间件
app.use(errorHandler);
// 启动服务器
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
