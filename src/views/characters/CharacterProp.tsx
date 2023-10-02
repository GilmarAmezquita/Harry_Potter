export interface attributes {
    alias_name: string[];
    animagus: string;
    blood_status: string;
    boggart: string;
    born: string;
    died: string;
    eye_color: string;
    family_member: string[];
    gender: string;
    hair_color: string;
    height: string;
    house: string;
    image: string;
    jobs: string[];
    name: string;
    nationality: string;
    patronus: string;
    romances: string[];
    skin_color: string;
    slug: string;
    species: string;
    titles: string[];
    wand: string[];
    weight: string;
    wiki: string;
}

export interface CharacterProp {
    attributes: attributes;
    id: string;
    type: string;
    links: string[];
}