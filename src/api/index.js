import 'dotenv/config'

export const getLiturgy = async (day, mounth) => {
    try {
        let response = null
        if(day && mounth) response = await fetch(`${process.env.URL_LITURGIA}/?dia=${day}&mes=${mounth}`)
        else response = await fetch(process.env.URL_LITURGIA)
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