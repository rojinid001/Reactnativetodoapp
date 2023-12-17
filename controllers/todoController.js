const Task = require('../models/Todo');

const todoPage = async (req, res) => {
  try {
    res.send('Hello from todoPage');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const addTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = await Task.create({ title});
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllTask = async (req, res) => {
  try {
    const allTasks = await Task.findAll();
    res.status(200).json(allTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskToDelete = await Task.findByPk(taskId);

    if (!taskToDelete) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await taskToDelete.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title } = req.body;

    const taskToUpdate = await Task.findByPk(taskId);

    if (!taskToUpdate) {
      return res.status(404).json({ error: 'Task not found' });
    }
    taskToUpdate.title = title;
    await taskToUpdate.save();

    res.status(200).json(taskToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  todoPage,
  addTask,
  getAllTask,
  deleteTask,
  updateTask
};
