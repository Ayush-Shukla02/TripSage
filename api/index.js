import axios from "axios";

export const getPlacesData = async () => {
	try {
		const {
			data: { data },
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`,
			{
				params: {
					bl_latitude: "26.73326935267078",
					tr_latitude: "26.9641146245606",
					bl_longitude: "80.83053595671666",
					tr_longitude: "81.0544895277965",
					limit: "30",
					currency: "USD",
					lunit: "km",
					lang: "en_US",
				},
				headers: {
					"X-RapidAPI-Key":
						"888700738dmsh4b7d5c2e5f99faap13043bjsn74323c6b3638",
					"X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
				},
			}
		);

		return data;
	} catch (err) {
		return null;
	}
};
