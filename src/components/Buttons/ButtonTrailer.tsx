import { LocalMovies } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

interface ButtonTrailerProps {
    trailer: string;
}

const ButtonTrailer = ({ trailer }: ButtonTrailerProps) => {
    return (
        <IconButton
            size="large"
            edge="end"
            aria-label="trailer"
            href={trailer}
            target="_blank"
            >
                <Tooltip title="Trailer">
                    <LocalMovies />
                </Tooltip>
        </IconButton>
    )
}

export default ButtonTrailer;