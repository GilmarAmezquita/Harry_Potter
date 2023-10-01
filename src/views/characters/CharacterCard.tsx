import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CharacterProp } from "./CharacterProp";

interface CharacterCardProps {
    character: CharacterProp;
}

const CharacterCard: React.FC<CharacterCardProps> = ({character}) => {
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        if (character.attributes.image === null) {
            if (character.attributes.gender === "Male") {
                setImage('/Wizard.png')
            } else {
                setImage('/Witch.png')
            }
        } else {
            setImage(character.attributes.image);
        }
    }, [character]);

    return (
        <Card className="card">
            <CardMedia
                className="card-media"
                component="img"
                image={image? image : '/Wizard.png'}
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