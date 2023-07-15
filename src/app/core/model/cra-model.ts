export interface CraModel {
  id?: string;
  startDate: string;
  endDate: string;
  activities: {
    category: string;
    quantity: number;
    comment?: string;
  }[];
}
