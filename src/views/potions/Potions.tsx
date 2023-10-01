import { useEffect, useState } from "react";
import { getPotions } from "../../services/potterdb";
import { Box, Typography } from "@mui/material";
import FilterTextFieldTemplate from "../../components/FilterTextField";
import PaginationTemplate from "../../components/Pagination";
import PotionCard from "./PotionCard";
import { PotionProp } from "./PotionProp";

const Potions = () => {
    const [potions, setPotions] = useState<PotionProp[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        getPotions(1, '').then((data) => {
            setPotions(data.data);
            console.log(data);
            setTotalPages(data.meta.pagination.last);
        });
    }, []);

    useEffect(() => {
        getPotions(page, filter).then((data) => {
            setPotions(data.data);
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
            {potions.length === 0 && (
                <Box sx={{display:'flex', justifyContent:'center'}}>
                    <Typography variant='h3' color='primary'>loading...</Typography>
                </Box>
            )}
            {potions.length !== 0 && (
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
                        {potions.map((potion) => {
                            return <PotionCard potion={potion} key={potion.id}/>;
                        })}
                    </div>
                    <PaginationTemplate page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
                </div>
            )}
        </>
    )
}

export default Potions;