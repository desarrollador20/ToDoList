import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import normalize from 'react-native-normalize';
import { useNavigation } from "@react-navigation/native";
import { Icon } from 'react-native-elements';
import { styles } from './ItemHome.style';
import { storageResult } from '../../utils';
import { UpdateTask } from '../updateTask';




export function ItemHome(props) {

    const navigation = useNavigation();
    const { id, title, fecha, status, icon, userAssigned, setDataTaskList, setRenderComponent, onClose = '' } = props;

    const deleteTask = async (id) => {
        var newListTask = new Array();
        const ListTask = await storageResult.getDataFormat("@SessionDataTaskList");
        Object.entries(ListTask).forEach(([key, value]) => {
            if (value.id !== id) {
                const objData = {
                    id: value.id,
                    title: value.title,
                    fecha: value.fecha,
                    idUser: value.idUser,
                    status: value.status,
                };
                newListTask.push(objData);
            }
        });
        await storageResult.storeData("@SessionDataTaskList", newListTask);
        setDataTaskList(newListTask);
    }

    const updateTask = async (id, title, status, userAssigned) => {
        setRenderComponent(<UpdateTask id={id} title={title} status={status} userAssigned={userAssigned} setDataTaskList={setDataTaskList} onClose={onClose} />);
        onClose();
    }

    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => updateTask(id, title, status, userAssigned)}
            key={id}
        >

            <View style={styles.containerLabels}>
                <Text style={{ ...styles.lblTaskName }}>
                    {title}
                </Text>
                {icon == 'checkbox-outline' ?
                    (<Text style={styles.lblUserAssigned}>
                        {userAssigned}
                    </Text>)
                    :
                    (<Text style={styles.lblNumQuestions}>
                        {fecha} - <Text style={{ color: status == 'Pendiente' ? "#F38067" : "#00a680" }}>{status}</Text>
                    </Text>)
                }
            </View>
            <View style={styles.containerArrow}>
                <Icon type="ionicon" onPress={() => deleteTask(id)} name={icon} color={icon == 'checkbox-outline' ? "#00a680" : "#F38067"} size={normalize(30)} />
            </View>
        </TouchableOpacity>
    )




}