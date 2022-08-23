const TaskSchema = {
  name: "Task",
  properties: {
    _id: "string",
    _partition: "string",
    task: "string",
  },
  primaryKey: "_id",
};

export default TaskSchema;