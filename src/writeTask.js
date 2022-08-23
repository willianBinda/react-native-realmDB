import getRealm from "./realm"

let createdTask;
const writeTask = async (data) => {
  const realm = await getRealm();

  realm.write(() => {
    createdTask = realm.create("Task", data);
  });

  return createdTask;
};

export default writeTask;