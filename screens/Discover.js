import {
	View,
	Text,
	SafeAreaView,
	StatusBar,
	Image,
	ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, Restaurants } from "../assets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Config from "react-native-config";
import MenuContainer from "../components/MenuContainer";

const Discover = () => {
	const navigation = useNavigation();

	const [type, setType] = useState("restaurants");

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<SafeAreaView
			style={{ marginTop: StatusBar.currentHeight + 10 }}
			className="flex-1 relative"
		>
			<View className="flex-row items-center justify-between px-8">
				<View>
					<Text className="text-[36px] text-[#0B646B] font-bold">
						Discover
					</Text>
					<Text className="text-[#527283] text-[32px]">
						The beauty today
					</Text>
				</View>
				<View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center">
					<Image
						source={Avatar}
						className="w-full h-full rounded-md object-cover"
					/>
				</View>
			</View>

			<View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
				<GooglePlacesAutocomplete
					GooglePlacesDetailsQuery={{ fields: "geometry" }}
					placeholder="Search"
					fetchDetails={true}
					onPress={(data, details = null) => {
						// 'details' is provided when fetchDetails = true
						console.log(details?.geometry?.viewport);
					}}
					query={{
						key: "AIzaSyAEDnXkSs0nntwSGUFm5Jz4jQvdKGBWfo8",
						language: "en",
					}}
					onFail={(error) => console.error(error)}
				/>
			</View>

			<ScrollView>
				<View className="flex-row items-center justify-between px-8 mt-8">
					<MenuContainer
						key={"attractions"}
						title="Attractions"
						imageSrc={Attractions}
						type={type}
						setType={setType}
					/>
					<MenuContainer
						key={"hotel"}
						title="Hotels"
						imageSrc={Hotels}
						type={type}
						setType={setType}
					/>

					<MenuContainer
						key={"restaurants"}
						title="Restaurants"
						imageSrc={Restaurants}
						type={type}
						setType={setType}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Discover;
