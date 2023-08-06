export interface FicheDePaie {
  id: number;
  fileName: string;
  period: string;
  collaboratorId: number;
}

export interface FicheDePaiePostBody {
  startDate ?: string | null;
  endDate ?: string | null;
}
