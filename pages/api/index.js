export default async function handler(req, res) {
  try {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${req.query.location}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

	  const response = await fetch(url, options);
	  const result = await response.json();
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
 }
