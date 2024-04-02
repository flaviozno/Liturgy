import 'dotenv/config'

export const getLiturgy = async () => {
    try {
        const response = await fetch(process.env.URL_LITURGIA)
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null
    }
}