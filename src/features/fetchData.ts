import {IncomingCountry} from './interfaces'

export async function fetcher<ResponseData>(
    url: string,
    config: RequestInit = {}
  ): Promise<ResponseData> {
    const response = await fetch(url, config);
    const data = await response.json() as ResponseData;
    return data;
  }

export async function getNamesAndFlags() {
   const countries = await fetcher('https://restcountries.com/v3.1/all')
   .then((data: any)=>data.reduce((prev:IncomingCountry[], curr:IncomingCountry)=>[...prev, {name: curr.name.common, flag: curr.flag, capital:!!curr.capital ? curr.capital[0] : 'No capital'}], []))
   .catch(e=>console.error(e))

   return countries;
}

