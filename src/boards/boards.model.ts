export interface Board {
  id: number;
  title: string;
  description: string;
  status: BoardStatus;
}

export enum BoardStatus {
  PUBLUC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
