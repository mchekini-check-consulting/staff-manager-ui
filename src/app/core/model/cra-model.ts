export interface CraModel {
  id?: string;
  activities: IActivity[];
}

export interface IActivity {
  date: string;
  category: string;
  quantity: number;
  comment?: string;
}
