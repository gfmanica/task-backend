export class TaskDto {
  id: string;
  title: string;
  description: string;
  status: boolean;
  expirationDt: Date;
}

export interface FindAllParams {
  title: string;
  description: string;
  status: boolean;
  expirationDt: Date;
}
