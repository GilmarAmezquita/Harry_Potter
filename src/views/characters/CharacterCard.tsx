import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CharacterProp } from "./CharacterProp";
import { useNavigate } from "react-router-dom";

interface CharacterCardProps {
    character: CharacterProp;
}

const CharacterCard: React.FC<CharacterCardProps> = ({character}) => {
    const navigate = useNavigate();

    return (
        <Card className="card"
            onClick={() => navigate(`/characters/${character.id}`)}
        >
            <CardMedia
                className="card-media"
                component="img"
                image={character.attributes.image}
                alt={character.attributes.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {character.attributes.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {character.attributes.died? character.attributes.died : 'Vivo'}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CharacterCard;