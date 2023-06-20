import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const ItemCardContainer = ({ imageSrc, title, location }) => {
	return (
		<TouchableOpacity className="rounded-lg border-gray-300 space-y-2 px-2 py-2 shadow-md bg-white w-[182px] my-2">
			<Image
				source={{ uri: imageSrc }}
				className="w-full h-40 rounded-lg object-cover"
			/>

			{title ? (
				<>
					<Text className="text-[#428288] text-[16px] font-semibold">
						{title?.length > 14
							? `${title.slice(0, 14)}...`
							: title}
					</Text>

					<View className="flex-row items-center space-x-1">
						<FontAwesome
							name="map-marker"
							size={16}
							color="#8597A2"
						/>
						<Text className="text-[#8597A2] text-[14px] font-semibold">
							{location?.length > 18
								? `${location.slice(0, 14)}...`
								: location}
						</Text>
					</View>
				</>
			) : (
				<></>
			)}
		</TouchableOpacity>
	);
};

export default ItemCardContainer;
