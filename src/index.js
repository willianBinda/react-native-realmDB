import getRealm from "./realm"
import React, { useEffect, useState } from "react";
import { Button,View,StyleSheet,Text, TextInput,FlatList } from "react-native";
import writeTask from "./writeTask";
import Realm from "realm";
import { useMainContext } from "./realmContext";
import { v4 as uuid } from "uuid";
import "react-native-get-random-values"


const Home = ()=>{
    const [taskName, setTaskName] = useState("")
    const [data,setData] = useState([])
    const realm = useMainContext()

    useEffect(() => {
        if (realm) {
          const tasks = realm.objects("Task");
    
          setData(tasks);
    
          tasks.addListener((values) => {
            setData([...values]);
          });
        } else {
          // Handle realm undefined error
        }
      }, [realm]);

    const addTask = () =>{
        if (realm) {
            realm.write(() => {
              realm.create("Task", {
                _id: uuid(),
                _partition: "Willian Binda",
                task: taskName,
              });
            });
            setTaskName("");
          }
    }

    const getALLTask = async ()=>{
        const realm =await getRealm();
        try{
            const data = realm.objects("Task") ; //aqui ele mostra todos os documentos 
            console.log(data);
        }catch(e){
            console.log("Erro ao pegar todos");
        }
    }


    const deleteALL = ()=>{
        if(realm){
            realm.write(()=>{
              realm.deleteAll()
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
                <Text style={styles.itemText}>{item.task}</Text>
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



