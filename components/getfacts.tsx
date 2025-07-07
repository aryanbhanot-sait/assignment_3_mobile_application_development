export const fetchDateFact = async (month: string, day: string) => {
  if (!month || !day) return null;

  const url = https://numbersapi.p.rapidapi.com/${month}/${day}/date?json=true;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '90128b16a7msh7f1312096cbb0bdp1864fajsn9ff81c9f8be1',
      'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com',
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return ${data.text} in ${data.year};
  } catch (err) {
    return 'Could not fetch fact.';
  }
};
