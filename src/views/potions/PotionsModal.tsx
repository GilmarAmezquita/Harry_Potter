import { Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { PotionProp } from "./PotionProp";
import ButtonWiki from "../../components/Buttons/ButtonWiki";
import ButtonClose from "../../components/Buttons/ButtonClose";

interface PotionModalProps {
    potion: PotionProp;
    openModal: boolean;
    onClose: () => void;
}

const PotionModal = ({ potion, openModal, onClose }: PotionModalProps) => {
    return (
        <Dialog 
            maxWidth="sm"
            fullWidth
            open={openModal} 
            onClose={onClose}
        >
            <DialogContent>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: "40%",
                    }}>
                        <img src={potion.attributes.image} alt={potion.attributes.name} style={{maxWidth: "100%"}}/>
                        <Typography variant="overline">
                            {potion.attributes.effect}
                        </Typography>
                        <Typography variant="body2">
                            {potion.attributes.characteristics}
                        </Typography>
                        <p>Duration: {potion.attributes.time? potion.attributes.time : "N/A"}</p>
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: "40%",
                    }}>
                        <Typography variant="h4" sx={{ marginBottom: '10px'}}>
                            {potion.attributes.name}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Difficulty:</strong> {potion.attributes.difficulty? potion.attributes.difficulty : "N/A"}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Inventors:</strong> {potion.attributes.inventors? potion.attributes.inventors : "N/A"}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Ingredients:</strong> {potion.attributes.ingredients? potion.attributes.ingredients : "N/A"}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Manufacturers:</strong> {potion.attributes.manufacturers? potion.attributes.manufacturers : "N/A"}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Side effects:</strong> {potion.attributes.side_effects? potion.attributes.side_effects : "N/A"}
                        </Typography>
                    </div>
                </div>
            </DialogContent>
            <DialogActions style={{justifyContent: "space-evenly" }}>
                <ButtonWiki wiki={potion.attributes.wiki} />
                <ButtonClose onClose={onClose} />
            </DialogActions>
        </Dialog>
    )
}

export default PotionModal;