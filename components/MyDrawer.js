import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "./CustomDrawerContent";
import MainMenu from "../screens/MainMenu";
import About from "../screens/About";
import History from "../screens/History";
import Notifications from "../screens/Notifications";

const Drawer = createDrawerNavigator();
  
export default MyDrawer = (props) => {

    const setIt = (param) => {
        props.theme(param)
    }

    const jwt = props.jwtToken
    const uid = props.userId
    const reqURL = props.req
    const notURL = props.not

    return (
        <Drawer.Navigator
        screenOptions={{
            drawerStyle: {
                width: 200
            }
        }}
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} theme={setIt} />}
        >
        <Drawer.Screen name="Main Menu">
            {props => <MainMenu theme={setIt} bgImg={props.bgImg} mjwt={jwt} /> }
        </Drawer.Screen>

        <Drawer.Screen name="About" component={About} />

        <Drawer.Screen name="History">
            {props => <History jwtToken={jwt} userId={uid} req={reqURL} />}
            </Drawer.Screen>

        <Drawer.Screen name="Notifications">
        {props => <Notifications jwtToken={jwt} userId={uid} not={notURL} />}
        </Drawer.Screen>

        </Drawer.Navigator>
    );
}
