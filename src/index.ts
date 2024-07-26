import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// 获取所有学生
app.get('/students', async (req, res) => {
  const students = await prisma.student.findMany();
  res.json(students);
});

// 创建新学生
app.post('/students', async (req, res) => {
  const { student_name, grade, email, age } = req.body;
  const student = await prisma.student.create({
    data: { student_name, grade, email, age },
  });
  res.json(student);
});

// 更新学生
app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { student_name, grade, email, age } = req.body;
  const student = await prisma.student.update({
    where: { student_id: Number(id) },
    data: { student_name, grade, email, age },
  });
  res.json(student);
});

// 删除学生
app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.student.delete({
    where: { student_id: Number(id) },
  });
  res.json({ message: 'Student deleted successfully' });
});

// 获取所有课程
app.get('/courses', async (req, res) => {
  const courses = await prisma.course.findMany();
  res.json(courses);
});

// 创建新课程
app.post('/courses', async (req, res) => {
  const { course_name, teacher, credits, class_time } = req.body;
  const course = await prisma.course.create({
    data: { course_name, teacher, credits, class_time },
  });
  res.json(course);
});

// 更新课程
app.put('/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { course_name, teacher, credits, class_time } = req.body;
  const course = await prisma.course.update({
    where: { course_id: Number(id) },
    data: { course_name, teacher, credits, class_time },
  });
  res.json(course);
});

// 删除课程
app.delete('/courses/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.course.delete({
    where: { course_id: Number(id) },
  });
  res.json({ message: 'Course deleted successfully' });
});

// 获取所有选课记录
app.get('/enrollments', async (req, res) => {
  const enrollments = await prisma.enrollment.findMany();
  res.json(enrollments);
});

// 创建新选课记录
app.post('/enrollments', async (req, res) => {
  const { student_id, course_id } = req.body;
  const enrollment = await prisma.enrollment.create({
    data: { student_id, course_id },
  });
  res.json(enrollment);
});

// 更新选课记录
app.put('/enrollments/:id', async (req, res) => {
  const { id } = req.params;
  const { student_id, course_id } = req.body;
  const enrollment = await prisma.enrollment.update({
    where: { enrollment_id: Number(id) },
    data: { student_id, course_id },
  });
  res.json(enrollment);
});

// 删除选课记录
app.delete('/enrollments/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.enrollment.delete({
    where: { enrollment_id: Number(id) },
  });
  res.json({ message: 'Enrollment deleted successfully' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

//restful