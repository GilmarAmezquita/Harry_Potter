import { useEffect, useState } from "react";
import { getCharacters } from "../../services/potterdb";
import { CharacterProp } from "./CharacterProp";
import CharacterCard from "./CharacterCard";
import PaginationTemplate from "../../components/Pagination";
import FilterTextFieldTemplate from "../../components/FilterTextField";
import { Box, Typography } from "@mui/material";

const Characters = () => {
    const [characters, setCharacters] = useState<CharacterProp[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        getCharacters(1, '').then((data) => {
            setCharacters(data.data);
            setTotalPages(data.meta.pagination.last);
        });
    }, []);

    useEffect(() => {
        getCharacters(page, filter).then((data) => {
            setCharacters(data.data);
        });
    }, [page, filter]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event.preventDefault();
        setPage(value);
    }

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    }

    return (
        <>
            {characters.length === 0 && (
                <Box sx={{display:'flex', justifyContent:'center'}}>
                    <Typography variant='h3' color='primary'>loading...</Typography>
                </Box>
            )}
            {characters.length !== 0 && (
                <div style={{
                    backdropFilter: "blur(10px)"
                }}>
                    <FilterTextFieldTemplate label={"Nombre"} filter={filter} handleFilterChange={handleFilterChange} />
                    <PaginationTemplate page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}>
                        {characters.map((character) => {
                            if (character.attributes.image === null) {
                                if (character.attributes.gender === "male") {
                                    character.attributes.image = 'Wizard.png';
                                } else {
                                    character.attributes.image = 'Witch.png';
                                }
                            }
                            return <CharacterCard character={character} key={character.id}/>;
                        })}
                    </div>
                    <PaginationTemplate page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
                </div>
            )}
        </>
    );
}

export default Characters;