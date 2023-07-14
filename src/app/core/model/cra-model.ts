export interface CraModel {
  id?: string;
  activities: {
    date: string;
    category: string;
    quantity: number;
    comment?: string;
  }[];
}
