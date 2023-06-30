import {
	View,
	Text,
	SafeAreaView,
	StatusBar,
	Image,
	TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { HeroImage } from "../assets";
import * as Animatable from "react-native-animatable";

const HomeScreen = () => {
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<SafeAreaView
			style={{ marginTop: StatusBar.currentHeight }}
			className="flex-1 relative"
		>
			<View className="flex flex-row px-6 mt-8 items-center space-x-1">
				<View className="w-16 h-16 bg-black rounded-full items-center justify-center">
					<Text className="text-[#00BCC9] text-2xl font-semibold">
						Trip
					</Text>
				</View>
				<Text className="text-[#2A2B4B] text-2xl font-semibold">
					Sage
				</Text>
			</View>

			<View className="px-6 mt-8 space-y-3">
				<Text className="text-[#3C6072] text-[37px]">
					Enjoy the trip with
				</Text>
				<Text className="text-[#00BCC9] text-[35px] font-bold">
					Good Moments
				</Text>
				<Text className="text-[#3C6072] text-base">
					Start your travel journey today and let us be your trusted
					travel companion.
				</Text>
			</View>

			<View className="w-[390px] h-[390px] bg-[#00BCC9] rounded-full absolute bottom-36 -right-36"></View>
			<View className="w-[390px] h-[390px] bg-[#E99265] rounded-full absolute -bottom-28 -left-36"></View>

			<View className="flex-1 relative items-center justify-center">
				<Animatable.Image
					animation="fadeIn"
					easing="ease-in-out"
					source={HeroImage}
					className="w-full h-full object-cover mt-20"
				/>

				<View className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center">
					<TouchableOpacity
						onPress={() => navigation.navigate("Discover")}
					>
						<View
							animation={"pulse"}
							easing="ease-in-out"
							iterationCount={"infinite"}
							className="w-20 h-20 items-center justify-center bg-[#00BCC9] rounded-full"
						>
							<Text className="text-gray-50 text-[36px] font-semibold">
								Go
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
