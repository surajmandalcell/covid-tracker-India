export interface stateTable {
  loc: string;
  confirmedCasesIndian: number;
  confirmedCasesForeign: number;
  discharged: number;
  deaths: number;
}

export interface newsTable{
  newsid: string;
  title: string;
  image: string;
  time: string;
  url: string;
}

export interface Item {
  id?:string;
  title?:string;
  description?: string;
}