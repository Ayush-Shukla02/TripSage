import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Discover from "./screens/Discover";
import ItemScreen from "./screens/ItemScreen";
import BookingScreen from "./screens/BookingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<TailwindProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Discover" component={Discover} />
					<Stack.Screen name="ItemScreen" component={ItemScreen} />
					<Stack.Screen name="Booking" component={BookingScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</TailwindProvider>
	);
}
