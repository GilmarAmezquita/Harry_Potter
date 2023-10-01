import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { PotionProp } from "./PotionProp";

interface PotionCardProps {
    potion: PotionProp;
}

const PotionCard: React.FC<PotionCardProps> = ({potion}) => {
    return (
        <Card className="card" sx={{ maxHeight: 450 }}>
            <CardMedia
                className="card-media"
                component="img"
                image={potion.attributes.image}
                alt={potion.attributes.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {potion.attributes.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {potion.attributes.effect}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Duration: {potion.attributes.time? potion.attributes.time : "N/A"}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default PotionCard;