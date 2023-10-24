export interface ContentFile {
    id: number;
    title: string;
    description: string;
    type: string;
    image: string;
    rating: string;
    genre: 'series' | 'movie';
    year: number;
    language: string;
}
