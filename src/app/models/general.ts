export interface stateTable {
  loc: string;
  confirmedCasesIndian: number;
  confirmedCasesForeign: number;
  discharged: number;
  deaths: number;
}

export interface news{
  title: string;
  imageUrl: string;
  date: any;
  url: string;
  discription: string;
}

export interface Item {
  id?:string;
  title?:string;
  description?: string;
}