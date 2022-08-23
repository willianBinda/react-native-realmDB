import Realm from "realm";
import TaskSchema from "./Tasck";

const getRealm = async ()=>{
    const app = new Realm.App({id:"application-0-ibsji"})
    const credentials = Realm.Credentials.anonymous()
    // Realm.credentials.   aqui ele mostra quais as credenciais que deseja usar ou seja (facebook,email/senha,google) "permissoes"
    const User = await app.logIn(credentials)

    return await Realm.open({
        path:"Task",    //aqui vai o nome do documento nao do schema do atlas
        schema:[TaskSchema],
        sync:{user:User,partitionValue:"Willian Binda",flexible:false}
    })
}    
export default getRealm
