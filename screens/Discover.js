import { View, Text, SafeAreaView, StatusBar, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "../assets";

const Discover = () => {
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
		</SafeAreaView>
	);
};

export default Discover;
