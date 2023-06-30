import {
	View,
	Text,
	SafeAreaView,
	StatusBar,
	Image,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MenuContainer from "../components/MenuContainer";

import ItemCardContainer from "../components/ItemCardContainer";
import { getPlacesData } from "../api";
import { GOOGLE_MAPS_API_KEY } from "@env";

const Discover = () => {
	const navigation = useNavigation();

	const [type, setType] = useState("restaurants");
	const [loading, setLoading] = useState(false);
	const [mainData, setMainData] = useState([]);

	const [bl_lat, setBl_lat] = useState(null);
	const [bl_lng, setBl_lng] = useState(null);
	const [tr_lat, setTr_lat] = useState(null);
	const [tr_lng, setTr_lng] = useState(null);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	useEffect(() => {
		setLoading(true);
		getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
			setMainData(data);
			setInterval(() => {
				setLoading(false);
			}, 2000);
		});
	}, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

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
						setBl_lat(details?.geometry?.viewport?.southwest?.lat);
						setBl_lng(details?.geometry?.viewport?.southwest?.lng);
						setTr_lat(details?.geometry?.viewport?.northeast?.lat);
						setTr_lng(details?.geometry?.viewport?.northeast?.lng);
					}}
					query={{
						key: `${GOOGLE_MAPS_API_KEY}`,
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
							key={"hotels"}
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
					</View>
					<View className="px-2 mt-8 flex-row items-center justify-evenly flex-wrap">
						{mainData?.length > 0 ? (
							<>
								{mainData?.map(
									(data, i) =>
										data.name && (
											<ItemCardContainer
												key={i}
												imageSrc={
													data?.photo?.images?.medium
														?.url
														? data?.photo?.images
																?.medium?.url
														: "https://previews.123rf.com/images/vectoroksana/vectoroksana1910/vectoroksana191043155/133048485-color-line-map-pointer-with-mountain-icon-isolated-on-white-background-mountains-travel-icon.jpg"
												}
												title={data?.name}
												location={
													data?.location_string?.indexOf(
														","
													) > -1
														? data?.location_string
																.split(",")[0]
																.trim()
														: data?.location_string
												}
												data={data}
											/>
										)
								)}
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
