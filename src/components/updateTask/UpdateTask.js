import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Input, Switch } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { styles } from './UpdateTask.style';
import { storageResult } from '../../utils';
import normalize from 'react-native-normalize';



export function UpdateTask(props) {

    const { id, title, status, userAssigned, setDataTaskList, onClose } = props;
    const [inputNameTask, setInputNameTask] = useState(title);
    const [checked, setChecked] = useState(status == 'Pendiente' ? false : true);
    const [userResponsable, setUserResponsable] = useState(userAssigned);


    const dataListUser = [
        { label: 'Hipolito Patiño Beltran', value: 'Hipolito Patiño Beltran' },
        { label: 'Juan Camilo Patiño Ramos', value: 'Juan Camilo Patiño Ramos' },
        { label: 'Elvira Patiño Beltran', value: 'Elvira Patiño Beltran' },
    ];

    const pickerStyle = {
        inputIOS: {
            color: 'gray',
            height: normalize(40, "height"),
            padding: normalize(10),
        },
        placeholder: {
            color: 'gray',
        },
        inputAndroid: {
            color: 'gray',
            height: normalize(50, "height"),
            paddingLeft: normalize(10),
        },
    };

    const updateTask = async () => {

        var newListTask = new Array();
        const ListTask = await storageResult.getDataFormat("@SessionDataTaskList");
        Object.entries(ListTask).forEach(([key, value]) => {
            const objData = {
                id: value.id,
                title: (value.id === id) ? inputNameTask : value.title,
                fecha: value.fecha,
                idUser: (value.id === id) ? userResponsable : value.idUser,
                status: (value.id === id) ? (checked) ? 'Cumplida' : 'Pendiente' : value.status
            };
            newListTask.push(objData);
        });
        await storageResult.storeData("@SessionDataTaskList", newListTask);
        setDataTaskList(newListTask);
        onClose();
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Nombre de la tarea"
                //containerStyle={styles.input}
                rightIcon={{
                    type: "ionicon",
                    name: "create-outline",
                    color: "#c2c2c2",
                }}
                onChangeText={value => setInputNameTask(value)}
                value={inputNameTask}
            />
            <View style={styles.containerSwich}>
                <Switch
                    value={checked}
                    onValueChange={(value) => setChecked(value)}
                    style={styles.SwitchStyle}
                />
                <Text
                    style={{
                        ...styles.labelSwicht
                    }}
                >
                    Marcar como Cumplida
                </Text>
            </View>
            <RNPickerSelect
                onValueChange={(value) => setUserResponsable(value)}
                items={dataListUser}
                placeholder={{
                    label: 'Seleccione un responsable',
                    value: null,
                }}
                style={pickerStyle}
                value={userResponsable != '' && userResponsable}
            />

            <Button title="Modificar Tarea" onPress={() => updateTask()} />
        </View>
    )




}