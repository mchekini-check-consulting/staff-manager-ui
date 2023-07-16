// export interface CraModel {
//   id?: string;
//   startDate: string;
//   endDate: string;
//   activities: {
//     category: string;
//     quantity: number;
//     comment?: string;
//   }[];
// }

export interface CraModel {
  id?: string;
  activities: {
    date: string;
    category: string;
    quantity: number;
    comment?: string;
  }[];
}
