import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackParamList } from "../Types/NavigationTypes";
import Homepage from "../screens/Main-Screens/Homepage";
import LearningPath from "../screens/Main-Screens/LearningPath";
import AiBot from "../screens/Main-Screens/AiBot";
import Memorization from "../screens/Main-Screens/Memorization";
import QuranReading from "../screens/Main-Screens/QuranReading";
import Settings from "../screens/Main-Screens/Settings";
import Tafsir from "../screens/Main-Screens/Tafsir";

const Stack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Homepage" id={undefined}>
            <Stack.Screen name="Homepage" component={Homepage}/>
            <Stack.Screen name="LearningPath" component={LearningPath}/>
            <Stack.Screen name="AIBot" component={AiBot}/>
            <Stack.Screen name="Memorization" component={Memorization}/>
            <Stack.Screen name="QuranReading" component={QuranReading}/>
            <Stack.Screen name="Settings" component={Settings}/>
            <Stack.Screen name="Tafsir" component={Tafsir}/>
        </Stack.Navigator>
    )
}

export default MainNavigator;