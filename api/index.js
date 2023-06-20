import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
	try {
		const {
			data: { data },
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
			{
				params: {
					bl_latitude: bl_lat ? bl_lat : "26.73326935267078",
					tr_latitude: tr_lat ? tr_lat : "26.9641146245606",
					bl_longitude: bl_lng ? bl_lng : "80.83053595671666",
					tr_longitude: tr_lng ? tr_lng : "81.0544895277965",
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
