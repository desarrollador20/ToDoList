import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import normalize from 'react-native-normalize';
import { Button, Icon, Input } from 'react-native-elements';
import { styles } from './CreateTask.style';
import { storageResult } from '../../utils';



export function CreateTask(props) {

    const { setDataTaskList, onClose } = props;
    const [inputNameTask, setInputNameTask] = useState('');

    const createTask = async () => {

        const fecha = new Date();
        const newTask = {
            id: Math.floor(Math.random() * 1000),
            title: inputNameTask,
            fecha: fecha.toDateString(),
            idUser: '',
            status: 'Pendiente'
        };


        const ListTask = await storageResult.getDataFormat("@SessionDataTaskList");
        if (ListTask === null || ListTask === undefined) {
            await storageResult.storeData("@SessionDataTaskList", [newTask]);
            const ListTaskNew = await storageResult.getDataFormat("@SessionDataTaskList");
            setDataTaskList([newTask]);
        } else {
            await storageResult.storeData("@SessionDataTaskList", [...ListTask, newTask]);
            setDataTaskList([newTask, ...ListTask]);
        }
        onClose();
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Nombre de la tarea"
                //containerStyle={styles.input}
                rightIcon={{
                    type: "ionicon",
                    name: "bookmarks-outline",
                    color: "#c2c2c2",
                }}
                onChangeText={value => setInputNameTask(value)}
            />
            <Button title="Crear Tarea" onPress={() => createTask()} />
        </View>
    )




}