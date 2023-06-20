import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	Image,
	StatusBar,
	TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const ItemScreen = ({ route }) => {
	const navigation = useNavigation();

	const data = route?.params?.param;

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<SafeAreaView
			style={{ marginTop: StatusBar.currentHeight + 5 }}
			className="flex-1 relative"
		>
			<ScrollView className="flex-1 px-4 py-6">
				<View className="relative bg-white shadow-lg">
					<Image
						source={{
							uri: data?.photo?.images?.large?.url
								? data?.photo?.images?.large?.url
								: "https://logowik.com/content/uploads/images/restaurant9491.logowik.com.webp",
						}}
						className="w-full h-72 object-cover rounded-2xl"
					/>

					{/* <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
						<TouchableOpacity
							className="w-10 h-10 rounded-md items-center justify-center bg-white"
							onPress={() => navigation.navigate("Discover")}
						>
							<FontAwesome5
								name="chevron-left"
								size={24}
								color="#06B2BE"
							/>
						</TouchableOpacity>
						<TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-[#06B2BE]">
							<FontAwesome5
								name="heartbeat"
								size={24}
								color="white"
							/>
						</TouchableOpacity>
					</View> */}

					<View className="absolute w-full flex-row bottom-5 justify-end px-6">
						{/* <View className="flex-row space-x-2 items-center">
							<Text className="text-[12px] font-bold text-gray-100">
								{data?.price_level}
							</Text>
							<Text className="text-[32px] font-bold text-gray-100">
								{data?.price}
							</Text>
						</View> */}
						{data?.open_now_text && (
							<View className="px-2 py-1 rounded-md bg-teal-100">
								<Text>{data?.open_now_text}</Text>
							</View>
						)}
					</View>
				</View>

				<View className="mt-6">
					<Text className="text-[#428288] text-[24px] font-bold">
						{data?.name}
					</Text>
					<View className="flex-row items-center space-x-2 mt-2">
						<FontAwesome
							name="map-marker"
							size={20}
							color="#8C9EA6"
						/>
						<Text className="text-[#8C9EA6] text-[15px] font-bold">
							{data?.location_string?.indexOf(",") > -1
								? data?.location_string.split(",")[0]
								: data?.location_string}
						</Text>
					</View>
				</View>

				<View className="mt-4 flex-row items-center justify-around">
					{data?.rating && (
						<View className="flex-row items-center space-x-2">
							<View className="w-10 h-10 rounded-2xl bg-red-100 items-center justify-center shadow-md">
								<FontAwesome
									name="star"
									size={24}
									color="#D58574"
								/>
							</View>

							<View>
								<Text className="text-[#515151]">
									{data?.rating}
								</Text>
								<Text className="text-[#515151]">Ratings</Text>
							</View>
						</View>
					)}

					{data?.price_level && (
						<View className="flex-row items-center space-x-2">
							<View className="w-10 h-10 rounded-2xl bg-red-100 items-center justify-center shadow-md">
								<MaterialIcons
									name="attach-money"
									size={24}
									color="#D58574"
								/>
							</View>

							<View>
								<Text className="text-[#515151]">
									{data?.price_level}
								</Text>
								<Text className="text-[#515151]">
									Price Level
								</Text>
							</View>
						</View>
					)}
				</View>

				{data?.description && (
					<Text className="mt-4 tracking-wide text-[14px] font-semibold text-[#97A6AF]">
						{data?.description}
					</Text>
				)}

				{data?.cuisine && (
					<View className="flex-row gap-2 items-center justify-start flex-wrap mt-4">
						{data?.cuisine.map((item) => (
							<TouchableOpacity
								key={item.key}
								className="px-4 py-1 bg-emerald-100 rounded-md"
							>
								<Text>{item.name}</Text>
							</TouchableOpacity>
						))}
					</View>
				)}

				<View className="space-y-2 bg-gray-100 rounded-2xl px-4 py-2 mt-2">
					{data?.phone && (
						<View className="items-center flex-row space-x-6 mb-2">
							<FontAwesome
								name="phone"
								size={24}
								color="#428288"
							/>
							<Text className="text=lg">{data?.phone}</Text>
						</View>
					)}

					{data?.email && (
						<View className="items-center flex-row space-x-6 mb-2">
							<FontAwesome
								name="envelope"
								size={24}
								color="#428288"
							/>
							<Text className="text=lg">{data?.email}</Text>
						</View>
					)}

					{data?.address && (
						<View className="items-center flex-row space-x-6 mb-2">
							<FontAwesome
								name="map-pin"
								size={24}
								color="#428288"
							/>
							<Text className="text=lg">{data?.address}</Text>
						</View>
					)}
				</View>

				<TouchableOpacity
					onPress={() => navigation.navigate("Booking")}
					className="mt-4 px-4 py-4 rounded-lg bg-[#06B2BE] items-center justify-center mb-12"
				>
					<Text className="text-3xl font-semibold uppercase tracking-wider text-gray-100">
						Book Now
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ItemScreen;
