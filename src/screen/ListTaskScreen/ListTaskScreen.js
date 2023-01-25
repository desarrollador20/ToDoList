import { FlatList, ActivityIndicator, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./ListTaskScreen.styles";
import normalize from 'react-native-normalize';
import { ItemHome } from '../../components/home';
import { Modal } from '../../components/Modal';
import { storageResult } from '../../utils';
import { FAB } from 'react-native-elements';
import { CreateTask } from '../../components/createTask';

export function ListTaskScreen() {

    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    const [dataTaskList, setDataTaskList] = useState([]);

    useEffect(() => {
        getListTask();
    }, [setDataTaskList])

    const onCloseOpenModal = () => setShowModal((prevState) => !prevState);


    const getListTask = async () => {
        const fecha = new Date();
        const DATA = [
            {
                id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                title: 'Agregar tarjeta a jira',
                fecha: fecha.toDateString(),
                idUser: '',
                status: 'Pendiente'
            },
            {
                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                title: 'Hacer deploy en los modulos',
                fecha: fecha.toDateString(),
                idUser: '',
                status: 'Pendiente'
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                title: 'Formatear fechas',
                fecha: fecha.toDateString(),
                idUser: '',
                status: 'Pendiente'
            },
            {
                id: 'erf5674r-c1b1-46c2-aed5-3ad53abb28ba',
                title: 'Agregar recordatorio',
                fecha: fecha.toDateString(),
                idUser: '',
                status: 'Pendiente'
            },
            {
                id: 'fgty76yt-c605-48d3-a4f8-fbd91aa97f63',
                title: 'Reunirme con el cliente',
                fecha: fecha.toDateString(),
                idUser: '',
                status: 'Pendiente'
            },
            {
                id: 'dewser345-3da1-471f-bd96-145571e29d72',
                title: 'Formatear PC',
                fecha: fecha.toDateString(),
                idUser: '',
                status: 'Pendiente'
            },
            {
                id: 'rtv54ff-c605-48d3-a4f8-fbd91aa97f63',
                title: 'Llevar la tarea',
                fecha: fecha.toDateString(),
                idUser: '',
                status: 'Pendiente'
            },
            {
                id: 'dewser345-3da1-471f-bd96-wefrty6777',
                title: 'Subir las horas al jira',
                fecha: fecha.toDateString(),
                idUser: '',
                status: 'Pendiente'
            },
            {
                id: 'fgty76yt-4rt5-48d3-a4f8-fbd91aa97f63',
                title: 'LLevar el documento a la reunion',
                fecha: fecha.toDateString(),
                idUser: '',
                status: 'Pendiente'
            },
            {
                id: 'dewser345-3da1-471f-bd96-er4566',
                title: 'LLevar la cedula',
                fecha: fecha.toDateString(),
                idUser: '',
                status: 'Pendiente'
            },
        ];

        //await storageResult.removeItemValue("@SessionDataTaskList");
        const ListTask = await storageResult.getDataFormat("@SessionDataTaskList");
        if (ListTask === null || ListTask === undefined) {
            await storageResult.storeData("@SessionDataTaskList", DATA);
            const ListTaskNew = await storageResult.getDataFormat("@SessionDataTaskList");
            setDataTaskList(ListTaskNew);
        } else {
            const ListTask = await storageResult.getDataFormat("@SessionDataTaskList");
            setDataTaskList(ListTask);

        }

    }

    const actionTask = () => {

        setRenderComponent(
            <CreateTask onClose={onCloseOpenModal} setDataTaskList={setDataTaskList} />
        );
        onCloseOpenModal();
    };

    const RenderItem = ({ item }) => {
        return (
            <ItemHome
                id={item.id}
                title={item.title}
                fecha={item.fecha}
                status={item.status}
                setDataTaskList={setDataTaskList}
                setRenderComponent={setRenderComponent}
                onClose={onCloseOpenModal}
                icon={'trash-outline'}
                userAssigned={item.idUser}
            />
        );
    };

    if (dataTaskList && Object.entries(dataTaskList).length === 0) {
        <ActivityIndicator size="large" color={'#00a680'} />
    }

    return (
        <SafeAreaView>

            <FlatList
                data={dataTaskList}
                contentContainerStyle={{
                    paddingVertical: normalize(30, "height"),
                    paddingHorizontal: normalize(15, 'height')
                }}
                renderItem={({ item }) => (
                    <RenderItem item={item} />
                )}
                keyExtractor={(item) => item.id}

            />

            <FAB
                visible={true}
                icon={{ name: 'add', color: 'white' }}
                color="#00a680"
                placement="right"
                onPress={() => actionTask()}

            />

            <Modal show={showModal} close={onCloseOpenModal}>
                {renderComponent}
            </Modal>



        </SafeAreaView>
    )
}