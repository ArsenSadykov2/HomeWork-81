export interface Link {
    id: string;
    link: string;
}

export type LinkWithoutId = Omit<Link, 'id'>;