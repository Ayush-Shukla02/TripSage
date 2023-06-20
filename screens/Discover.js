import {
	View,
	Text,
	SafeAreaView,
	StatusBar,
	Image,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MenuContainer from "../components/MenuContainer";
import { FontAwesome } from "@expo/vector-icons";
import ItemCardContainer from "../components/ItemCardContainer";
import { getPlacesData } from "../api";

const Discover = () => {
	const navigation = useNavigation();

	const [type, setType] = useState("restaurants");
	const [loading, setLoading] = useState(false);
	const [mainData, setMainData] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	useEffect(() => {
		setLoading(true);
		getPlacesData().then((data) => {
			setMainData(data);
			setInterval(() => {
				setLoading(false);
			}, 2000);
		});
	}, []);

	return (
		<SafeAreaView
			style={{ marginTop: StatusBar.currentHeight + 5 }}
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
				{/* <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center">
					<Image
						source={Avatar}
						className="w-full h-full rounded-md object-cover"
					/>
				</View> */}
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

			{loading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color="#0B646B" />
				</View>
			) : (
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
					<View className="flex-row items-center justify-between px-4 mt-5">
						<Text className="text-[#2C7379] text-[22px] font-bold capitalize">
							Top {type}
						</Text>
						<TouchableOpacity className="flex-row items-center justify-center space-x-2">
							<Text className="text-[#A0C4C7] text-[19px] font-bold">
								Explore
							</Text>
							<FontAwesome
								name="long-arrow-right"
								size={24}
								color="#A0C4C7"
							/>
						</TouchableOpacity>
					</View>
					<View className="px-2 mt-8 flex-row items-center justify-evenly flex-wrap">
						{mainData?.length > 0 ? (
							<>
								{mainData?.map((data, i) => (
									<ItemCardContainer
										key={i}
										imageSrc={
											data?.photo?.images?.medium?.url
												? data?.photo?.images?.medium
														?.url
												: "https://logowik.com/content/uploads/images/restaurant9491.logowik.com.webp"
										}
										title={data?.name}
										location={
											data?.location_string?.indexOf(
												","
											) > -1
												? data?.location_string.split(
														","
												  )[0]
												: data?.location_string
										}
										data={data}
									/>
								))}
							</>
						) : (
							<>
								<View className="w-full h-[400px] items-center justify-center space-y-8">
									<Image
										source={NotFound}
										className="w-32 h-32 object-cover"
									/>
									<Text className="text-xl text-[#428288] font-semibold">
										Oops... No Data Found
									</Text>
								</View>
							</>
						)}
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default Discover;
