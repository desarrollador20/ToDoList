import { FlatList, ActivityIndicator, } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./ListTaskScreen.styles";
import normalize from 'react-native-normalize';
import { ItemHome } from '../../components/home';
import { storageResult } from '../../utils';
import { useFocusEffect } from '@react-navigation/native';


export function ListTaskAssignedScreen() {

    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    const [dataTaskAssignedList, setDataTaskAssignedList] = useState([]);

    useFocusEffect(
        useCallback(() => {
            getListTask();
        }, [])
    );

    const getListTask = async () => {

        const ListTask = await storageResult.getDataFormat("@SessionDataTaskList");
        var newListTask = new Array();
        Object.entries(ListTask).forEach(([key, value]) => {

            if (value.idUser !== '') {
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
        setDataTaskAssignedList(newListTask);

    }


    const RenderItem = ({ item }) => {
        return (
            <ItemHome
                id={item.id}
                title={item.title}
                fecha={item.fecha}
                status={item.status}
                setDataTaskAssignedList={setDataTaskAssignedList}
                setRenderComponent={setRenderComponent}
                icon={'checkbox-outline'}
                userAssigned={item.idUser}
            />
        );
    };

    if (dataTaskAssignedList && Object.entries(dataTaskAssignedList).length === 0) {
        <ActivityIndicator size="large" color={'#00a680'} />
    }

    return (
        <SafeAreaView>
            <FlatList
                data={dataTaskAssignedList}
                contentContainerStyle={{
                    paddingVertical: normalize(30, "height"),
                    paddingHorizontal: normalize(15, 'height')
                }}
                renderItem={({ item }) => (
                    <RenderItem item={item} />
                )}
                keyExtractor={(item) => item.id}
            />

        </SafeAreaView>
    )
}