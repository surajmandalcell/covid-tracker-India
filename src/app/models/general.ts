export interface StateTable {
  loc: string;
  confirmedCasesIndian: number;
  discharged: number;
  deaths: number;
}

export interface news {
  title: string;
  imageUrl: string;
  date: any;
  url: string;
  discription: string;
}

export interface contacts {
  loc: string;
  number: string;
}

export interface Item {
  id?: string;
  title?: string;
  description?: string;
}

export interface countries {
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    country: string;
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  updated: number;
}
