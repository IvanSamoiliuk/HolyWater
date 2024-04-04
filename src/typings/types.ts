export type ContentType = 'CONTENT_ONE' | 'CONTENT_TWO';

export interface Part {
  id: string;
  [key: string]: any;
}

export interface RouteParams {
  itemId: string;
  ofset?: number;
}

