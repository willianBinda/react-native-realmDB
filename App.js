import React from "react";
import { View,Text } from "react-native";
import Home from "./src/index"
import RealmContextProvider from "./src/realmContext";
import Tela from "./src/exemplos/Tela_Write_Get"



export default App = ()=>{
    return(
        <RealmContextProvider>
            <Home/>
        </RealmContextProvider>
    )
}