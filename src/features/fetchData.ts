export function fetcher<ResponseData>(
    url: string,
    config: RequestInit = {}
  ): Promise<ResponseData> {
    return fetch(url, config)
      .then((response) => response.json())
      .then((data) => data as ResponseData);
  }

export async function getNamesAndFlags() {

    type IncomingCountry = {
        name: {
            common: string
        },
        flag: string,
        capital: string
    }

   const countries = await fetcher('https://restcountries.com/v3.1/all')
   .then((data: any)=>data.reduce((prev:IncomingCountry[], curr:IncomingCountry)=>[...prev, {name: curr.name.common, flag: curr.flag, capital:!!curr.capital ? curr.capital[0] : 'No capital'}], []))
   .catch(e=>console.error(e))

   return countries;
}

