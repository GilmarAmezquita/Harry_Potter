import { useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { PotionProp } from "./PotionProp";
import PotionModal from "./PotionsModal";

interface PotionCardProps {
    potion: PotionProp;
}

const PotionCard: React.FC<PotionCardProps> = ({potion}) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Card className="card" sx={{ maxHeight: 450 }} onClick={handleOpen}>
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
            <PotionModal potion={potion} openModal={open} onClose={handleClose} />
        </>
    )
}

export default PotionCard;