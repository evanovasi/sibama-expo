import { createDrawerNavigator } from '@react-navigation/drawer';
import { MapScreen } from '../screens';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from '../components/DrawerContent';
const Drawer = createDrawerNavigator();
export default () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor='#7A73E7' barStyle='light-content' />
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerPosition: 'right',
                    drawerStyle: {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        width: 240,
                        borderTopLeftRadius: 15,
                        borderBottomLeftRadius: 15,
                    },
                }}
                drawerContent={(props) => <DrawerContent {...props} />}
            >
                <Drawer.Screen name='MapScreen' component={MapScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
