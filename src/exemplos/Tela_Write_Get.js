import getRealm from "../realm"
import React from "react";
import { Button,View,StyleSheet,Text } from "react-native";
import writeTask from "../writeTask";



const Home = ()=>{
    let firstTask

    const writeTasks = async()=>{
        firstTask = await writeTask({    
            _id:3,
            name:"Not recordeing",
            status:"Task closed",
        })
    };

    const getTask = async()=>{
        const realm = await getRealm();

        try{
            const data = realm.objects("Task") ; //aqui ele mostra todos os documentos 
            console.log(data);
        }catch(e){
            console.log(e);
        }
    }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{marginBottom:20}}>Say hello from home</Text>
            <Button title="Write Task" onPress={writeTasks}/>
            <Button title="Get Task" onPress={getTask}/>
        </View>
    )
}

export default Home

