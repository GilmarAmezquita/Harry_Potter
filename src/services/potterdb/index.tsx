import axios from "../../config/axios";

export const getCharacters = async (page: number, filter: string) => {
    try {
        if (!filter) {
            return (await axios.get(`/characters?page[size]=12&page[number]=${page}`)).data;
        }
        return (await axios.get(`/characters?page[size]=12&page[number]=${page}&filter[name_cont_any]=${filter}`)).data;
    } catch (error) {
        console.log(error);
    }
}

export const getCharacter = async (id: string) => {
    try {
        return (await axios.get(`/characters/${id}`)).data;
    } catch (error) {
        console.log(error);
    }
}

export const getMovies = async (page: number, filter: string) => {
    try {
        if (!filter) {
            return (await axios.get(`/movies?page[size]=6&page[number]=${page}`)).data;
        }
        return (await axios.get(`/movies?page[size]=6&page[number]=${page}&filter[title_cont_any]=${filter}`)).data;
    } catch (error) {
        console.log(error);
    }
}

export const getPotions = async (page: number, filter: string) => {
    try {
        if (!filter) {
            return (await axios.get(`/potions?page[size]=12&page[number]=${page}`)).data;
        }
        return (await axios.get(`/potions?page[size]=12&page[number]=${page}&filter[name_cont_any]=${filter}`)).data;
    } catch (error) {
        console.log(error);
    }
}