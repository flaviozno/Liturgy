# Liturgy to PowerPoint Converter

This Node.js project utilizes an API from [liturgiadiaria.site](https://liturgiadiaria.site/) to fetch the daily liturgy of the Catholic Church and transform it into a PowerPoint presentation (PPTX). The project is hosted on Render and can be accessed via the following endpoint: [https://liturgy.onrender.com](https://liturgy.onrender.com).

## Usage

### Endpoints

#### Get Today's Liturgy as PPTX
- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Fetches the liturgy for the current day and returns it as a PowerPoint presentation.

#### Get Liturgy for a Specific Day as PPTX
- **Endpoint:** `/`
- **Method:** `POST`
- **Description:** Fetches the liturgy for a specific day based on the provided day and month parameters in the request body, and returns it as a PowerPoint presentation.
- **Request Body:**
  ```json
  {
    "day": "string",
    "month": "string"
  }

## Running the Project Locally

To run the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your environment variables, including any necessary API keys.
4. Run the project using `npm start`.

## Testing with CURL

To test using CURL, follow these steps:

1. Ensure the project is running locally.
2. Use the following CURL command:

```bash
   curl -X POST http://localhost:3333 -H 'Content-Type: application/json' -d '{"day":"string","month":"string"}' -o file_name.pptx 
```
## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements or feature additions.

## License

This project is licensed under the [MIT License](LICENSE).