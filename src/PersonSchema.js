const PersonSchema = {
    name:"Person",
    properties:{
        name:"string",      //muitos dogs
        age:"int",
        dog:"Dog[]"
    },
    // primaryKey:"name"
}

export default PersonSchema


// const PersonSchema = {
//     name:"Person",
//     properties:{
//         name:"string",       //um dog
//         age:"int",
//         dog:"Dog?"
//     },
//     // primaryKey:"name"
// }

// export default PersonSchema