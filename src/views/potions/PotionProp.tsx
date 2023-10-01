interface attributes {
    characteristics: string;
    difficulty: string;
    effect: string;
    image: string;
    inventors: string;
    ingredients: string;
    manufacturers: string;
    name: string;
    side_effects: string;
    slug: string;
    time: string;
    wiki: string;
}

export interface PotionProp {
    attributes: attributes;
    id: string;
    type: string;
    links: string;
}