export interface Link {
    id: string;
    originalUrl: string;
}
export type LinkWithoutId = Omit<Link, 'id'>;