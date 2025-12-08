export interface BatchCreationRequest {
  BatchName: string;
  Description?: string;
  UrlCount: number;
  ExpirationDate?: Date;
  UserId?: string;
}
