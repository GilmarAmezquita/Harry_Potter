interface attributes {
    box_office: string;
    budget: string;
    cinematographers: string[];
    directors: string[];
    distributors: string[];
    editors: string[];
    music_composers: string[];
    poster: string;
    producers: string[];
    rating: string;
    release_date: string;
    running_time: string;
    screenwriters: string[];
    slug: string;
    summary: string;
    title: string;
    trailer: string;
    wiki: string;
}

export interface MovieProp {
    attributes: attributes;
    id: string;
    type: string;
    links: string[];
}