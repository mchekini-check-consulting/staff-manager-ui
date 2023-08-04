export interface FicheDePaie {
  id: number;
  fileName: string;
  period: string;
  collaboratorId: number;
}

export interface FicheDePaiePostBody {
  startDate ?: Date;
  endDate ?: Date;
}
