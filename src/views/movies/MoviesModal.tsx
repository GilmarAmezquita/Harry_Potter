import { Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { MovieProp } from "./MovieProp";
import ButtonWiki from "../../components/Buttons/ButtonWiki";
import ButtonClose from "../../components/Buttons/ButtonClose";
import ButtonTrailer from "../../components/Buttons/ButtonTrailer";

interface MovieModalProps {
    movie: MovieProp;
    openModal: boolean;
    onClose: () => void;
}

const MovieModal = ({ movie, openModal, onClose }: MovieModalProps) => {
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
                        <img src={movie.attributes.poster} alt={movie.attributes.title} style={{ maxWidth: "100%" }} />
                        <Typography variant="overline">
                            <strong>Release Date:</strong> {movie.attributes.release_date}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Rating:</strong> {movie.attributes.rating}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Running time:</strong> {movie.attributes.running_time}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Budget:</strong> {movie.attributes.budget}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Box office:</strong> {movie.attributes.box_office}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Directors:</strong> {movie.attributes.directors.join(", ")}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Producers:</strong> {movie.attributes.producers.join(", ")}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Editors:</strong> {movie.attributes.editors.join(", ")}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Distributors:</strong> {movie.attributes.distributors.join(", ")}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Cinematographers:</strong> {movie.attributes.cinematographers.join(", ")}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Music composers:</strong> {movie.attributes.music_composers.join(", ")}
                        </Typography>
                        <Typography variant="overline">
                            <strong>Screen writers:</strong> {movie.attributes.screenwriters.join(", ")}
                        </Typography>
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: "40%",
                    }}>
                        <Typography variant="h4" sx={{ marginBottom: '10px'}}>
                            {movie.attributes.title}
                        </Typography>
                        <Typography align="justify">
                            {movie.attributes.summary}
                        </Typography>
                    </div>
                </div>
            </DialogContent>
            <DialogActions style={{justifyContent: "space-evenly" }}>
                <ButtonWiki wiki={movie.attributes.wiki} />
                <ButtonTrailer trailer={movie.attributes.trailer} />
                <ButtonClose onClose={onClose} />
            </DialogActions>
        </Dialog>
    )
}

export default MovieModal;

/*
    music_composers: string[];
    screenwriters: string[];
    */