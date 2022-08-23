import getRealm from "./realm"
import React, { useEffect, useState } from "react";
import { Button,View,StyleSheet,Text, TextInput,FlatList } from "react-native";
import writeTask from "./writeTask";
import { useMainContext } from "./realmContext";



const Home = ()=>{
    const realm = useMainContext();
    const [taskName, setTaskName] = useState("")
    const [data,setData] = useState([])

    useEffect(()=>{
        if(realm){
            const tasks = realm.objects("Task");
            setData(tasks);
            tasks.addListener((values)=>{
                setData([...values])
            })
        }else{
            //acrescentar erro
        }
    },[realm]);
        // const cleanup = (async()=>{
        //     const realm = await getRealm();
        //     const tasks = realm.objects("Task");

        //     setData(tasks);

        //     return ()=>{
        //         tasks.removeAllListeners();
        //         realm.close();
        //     };
        // })();
        // return ()=>{
        //     cleanup.then((func) => func());
        // };

    const addTask  = async ()=>{
        if(realm){
            realm.write(()=>{
                realm.create("Task",{
                    _id: data.length + 1,
                    name: taskName,
                    status: "Create Now",
                });
            });
        }
    }

    const getALLTask = async ()=>{
        // const realm =await getRealm();
        try{
            const data = realm.objects("Task") ; //aqui ele mostra todos os documentos 
            console.log(data);
        }catch(e){
            console.log("ERRO MEU: "+e);
        }
        if(realm){
            realm.close();  
            //quando der isso vai dizer que os dados foram deletados ou invalidados
            // eles passam a ser invalidos
            //assim que foi colocados os itens na flet list eles agora foram invalidados
            //ver mais na aula[4]
        }
    }

    
    let firstTask
    const writeTasks = async()=>{
        firstTask = await writeTask({    
            _id:1,
            name:"Not recordeing",
            status:"Task closed",
        })
    };

    const deleteALL = async ()=>{
        // const realm = await getRealm();
        if(realm){
            realm.write(()=>{
                realm.deleteAll();
            })
        }
    };

    return(
        <View style={styles.container}>
        <Text style={styles.text}>Realm Listen</Text>
  
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={taskName}
            onChangeText={(value) => setTaskName(value)}
          />
          <Button title="Add" onPress={addTask} />
        </View>
  
        <Text style={styles.textInfo}>Stored data</Text>
  
        <FlatList
          data={data}
          style={styles.flatList}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            );
          }}
        />
        <View style={styles.buttonContainer}>
          <Button title="Get all" onPress={getALLTask} />
          <Button title="Delete all" onPress={deleteALL} />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginBottom: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  textInfo: {
    fontSize: 25,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },
  input: {
    width: "80%",
    borderWidth: 2,
    borderColor: "grey",
    fontSize: 20,
    padding: 5,
  },
  flatList: {
    flexGrow: 0,
    width: "90%",
    height: "50%",
    borderWidth: 2,
    borderColor: "grey",
  },
  itemContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  itemText: {
    fontSize: 20,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    margin: 10,
  },
});
export default Home

