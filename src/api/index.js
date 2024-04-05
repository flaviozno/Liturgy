import "dotenv/config";

const BASE_URL_LITURGY = process.env.URL_LITURGIA;

export const getLiturgy = async (day, month) => {
  try {
    let response = null;

    const url =
      day && month
        ? `${BASE_URL_LITURGY}/?dia=${day}&mes=${month}`
        : BASE_URL_LITURGY;

    response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};
