import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { MovieProp } from "./MovieProp";

interface MovieCardProps {
    movie: MovieProp;
}

const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
    return (
        <Card className="card" sx={{ maxHeight: 450 }}>
            <CardMedia
                className="card-media"
                component="img"
                image={movie.attributes.poster}
                alt={movie.attributes.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {movie.attributes.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {movie.attributes.release_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {movie.attributes.rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {movie.attributes.running_time}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MovieCard;