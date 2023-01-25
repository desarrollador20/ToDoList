import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { ListTaskAssignedScreen } from "../screen/ListTaskAssignedScreen";
import { ListTaskScreen } from "../screen/ListTaskScreen";
import { screen } from "../utils";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00a680",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
      })}
    >
      <Tab.Screen
        name={screen.task.tab}
        component={ListTaskScreen}
        options={{ title: "Tareas" }}
      />
      <Tab.Screen
        name={screen.taskAssigned.tab}
        component={ListTaskAssignedScreen}
        options={{ title: "Tareas Asignadas" }}
      />

    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;

  if (route.name === screen.task.tab) {
    iconName = "book-outline";
  }

  if (route.name === screen.taskAssigned.tab) {
    iconName = "person-outline";
  }


  return (
    <Icon type="ionicon" name={iconName} color={color} size={size} />
  );
}
