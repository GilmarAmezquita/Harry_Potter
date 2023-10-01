import { Dialog, DialogContent, Typography } from "@mui/material";
import { PotionProp } from "./PotionProp";

interface PotionModalProps {
    potion: PotionProp;
    openModal: boolean;
    onClose: () => void;
}

const PotionModal = ({ potion, openModal, onClose }: PotionModalProps) => {
    return (
        <Dialog 
            maxWidth="md"
            fullWidth
            open={openModal} 
            onClose={onClose}
        >
            <DialogContent>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <img src={potion.attributes.image} alt={potion.attributes.name} style={{maxWidth: "100%"}}/>
                        <Typography variant="h4">
                            {potion.attributes.name}
                        </Typography>
                        <Typography variant="overline">
                            {potion.attributes.effect}
                        </Typography>
                        <Typography variant="body2">
                            {potion.attributes.characteristics}
                        </Typography>
                        <p>Duration: {potion.attributes.time? potion.attributes.time : "N/A"}</p>
                    </div>         
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PotionModal;