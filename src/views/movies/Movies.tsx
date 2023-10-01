import { useEffect, useState } from "react";
import { getMovies } from "../../services/potterdb";
import FilterTextFieldTemplate from "../../components/FilterTextField";
import PaginationTemplate from "../../components/Pagination";
import { MovieProp } from "./MovieProp";
import MovieCard from "./MovieCard";
import { Box, Typography } from "@mui/material";

const Movies = () => {
    const [movies, setMovies] = useState<MovieProp[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        getMovies(1, '').then((data) => {
            setMovies(data.data);
            setTotalPages(data.meta.pagination.last);
        });
    }, []);

    useEffect(() => {
        getMovies(page, filter).then((data) => {
            setMovies(data.data);
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
            {movies.length === 0 && (
                <Box sx={{display:'flex', justifyContent:'center'}}>
                    <Typography variant='h3' color='primary'>loading...</Typography>
                </Box>
            )}
            {movies.length !== 0 && (
                <div style={{
                    backdropFilter: "blur(10px)"
                }}>
                    <FilterTextFieldTemplate label={"Titulo"} filter={filter} handleFilterChange={handleFilterChange} />
                    <PaginationTemplate page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap"
                    }}>
                        {movies.map((movie) => {
                            return <MovieCard movie={movie} key={movie.id}/>;
                        })}
                    </div>
                    <PaginationTemplate page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
                </div>
            )}
        </>
    );
}

export default Movies;