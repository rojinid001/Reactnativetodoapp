import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { IconButton } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import Background from './Components/Background';

const TodoScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/task/alltasks');
      const allTasks = response.data;
      setTasks(allTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTaskTitle.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Task cannot be empty',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/task/addtask', {
        title: newTaskTitle,
      });
      const newTask = response.data;
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/task/deletetask/${taskId}`);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const openUpdateModal = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const updateTask = async () => {
    try {
      await axios.put(`http://localhost:8000/task/updatetask/${selectedTask.id}`, {
        title: newTaskTitle,
      });
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTask.id ? { ...task, title: newTaskTitle } : task
      );
      setTasks(updatedTasks);
      setNewTaskTitle('');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const rendertodos = ({ item, index }) => {
    return (
      <View style={{
        backgroundColor: 'green',
        borderRadius: 6,
        paddingVertical: 12,
        marginBottom: 5,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Text style={{ color: 'white', marginLeft: 10, fontSize: 20, fontWeight: '800', flex: 1 }}>
          {item.title}
        </Text>
        <IconButton icon='pencil' iconColor='orange' onPress={() => openUpdateModal(item)} />
        <IconButton icon='delete' iconColor='red' onPress={() => deleteTask(item.id)} />
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 16, marginVertical: 40 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: 'black',
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 6,
        }}
        placeholder='Add a task'
        value={newTaskTitle}
        onChangeText={(text) => setNewTaskTitle(text)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'purple',
          borderRadius: 6,
          paddingVertical: 8,
          marginTop: 14,
          marginBottom: 10, 
          alignItems: 'center',
        }}
        onPress={addTask}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Add</Text>
      </TouchableOpacity>
      <FlatList data={tasks} renderItem={rendertodos} />
  
      {tasks.length <= 0 && <Background />}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'black',
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 6,
                marginBottom: 10,
              }}
              placeholder='Update task'
              value={newTaskTitle}
              onChangeText={(text) => setNewTaskTitle(text)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'orange',
                borderRadius: 6,
                paddingVertical: 8,
                alignItems: 'center',
              }}
              onPress={updateTask}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Update Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                borderRadius: 6,
                paddingVertical: 8,
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => setIsModalVisible(false)}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
  
};

export default TodoScreen;

const styles = StyleSheet.create({});
