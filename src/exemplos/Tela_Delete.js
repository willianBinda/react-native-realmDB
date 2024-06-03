import getRealm from "./realm"
import React from "react";
import { Button,View,StyleSheet,Text, Alert } from "react-native";
import writeTask from "./writeTask";



const Home = ()=>{
    let task
    let firstTask

    const writeTasks = async()=>{
        firstTask = await writeTask({    
            _id:2,
            name:"willian",
            status:"ok",
        })
    };

    const getTask = async()=>{
        const realm = await getRealm();

        try{
            task = realm.objects("Task").filtered("_id = 4") ; //aqui ele mostra todos os documentos 
            console.log(task);
        }catch(e){
            console.log("ERRO MEU: "+e);
        }
    }

    const getALLTask = async()=>{
        const realm =await getRealm();

        try{
            const data = realm.objects("Task") ; //aqui ele mostra todos os documentos 
            console.log(data);
        }catch(e){
            console.log("ERRO MEU: "+e);
        }
    }


    const updateTask = async()=>{
        const realm = await getRealm();
        const data = {
            _id:4,
            name:"Not recording",
            status:"Not finished"
        }

        realm.write(()=>{
            realm.create("Task", data, Realm.UpdateMode.Modified)
            //se colocar o all depois de updatemode ele atualiza todos os dados que esta sendo criado
            //nesse cado ele cria um novo dado e modifica o antigo desse index
        })
        // ou
        // realm.write(()=>{
        //     task[0].name = "willian";
        //     task[0].status = "inProgress";
        // })
    }

    const deleteTask = async ()=>{
        const realm = await getRealm()

        realm.write(()=>{   //é preciso desse write 
            try{
                realm.delete(realm.objects("Task").filtered("_id = 2"))
            }catch(e){

            }
            //depois ele filtra e deleta  
        })
    }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{marginBottom:20,fontSize:30}}>Say hello from home</Text>
            <Button title="get ALL task " onPress={getALLTask}/>
            <Button title="delete" onPress={deleteTask}/>
            <Button title="write" onPress={writeTasks}/>
        </View>
    )
}

export default Home

