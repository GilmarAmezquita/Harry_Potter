import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getCharacter } from "../../services/potterdb";
import { CharacterProp } from "./CharacterProp";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { uploadImage } from "../../services/firebase";



export default function CharacterDetail() {
    const [filePreview, setFilePreview] = useState<string | undefined>();
    const [file, setFile] = useState("");
    const [open, setOpen] = React.useState(false);
    const [character, setCharacter] = useState<CharacterProp>();


    const { id } = useParams();
    useEffect(() => {
        getCharacter(id || "").then((data) => {
            console.log(data.data);
            setCharacter(data.data);
        });
    }, [id]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        if(!file) return alert("Please select a file");
        await uploadImage(file, id);
        setOpen(false);
    }
    

    
    const handleUpload = (e: any) => {
        setFilePreview(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }


    const renderCharacter = () => {
        if (character) {
            return (
                <>
                    <div className="image" style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "30%",
                        height: "100%",

                        border: "1px solid black",
                    }}>
                        {character.attributes.name ? <h1>{character.attributes.name}</h1> : <h1>no data of name</h1>}
                        {character.attributes.image ? <img style={{ margin: 10 }} src={character.attributes.image} alt="character" /> : <h3>no image</h3>}
                        {character.attributes.wiki ? <a href={character.attributes.wiki} target="_blank" rel="noreferrer">Wiki</a> : <h3>no wiki</h3>}
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<AddIcon />}
                            style={{ margin: 10 }}
                            onClick={handleClickOpen}
                        >Add image</Button>
                    </div>
                    <div className="info"
                        style={{
                            display: "flex",
                            width: "70%",
                            height: "100%",
                            flexDirection: "column",
                            flexWrap: "wrap",
                            paddingLeft: "10px",
                            border: "1px solid black",
                        }}
                    >
                        {Object.keys(character.attributes).map((key, index) => {
                            if (key !== "image" && key !== "name" && key !== "family_members" && key !== "wiki") {
                                return (
                                    <div key={index}>
                                        <h3>{key}</h3>
                                        <p style={{ wordBreak: "break-all", whiteSpace: "normal" }}>{character.attributes[key] ? character.attributes[key] : "no data"}</p>
                                    </div>
                                )
                            } else if (key === "family_members") {
                                return (
                                    <div key={index}>
                                        <h3>{key}</h3>
                                        {character.attributes[key] !== null ?
                                            (character.attributes[key].map((family, index) => {
                                                return (
                                                    <p key={index}>{family}</p>
                                                )
                                            })) : <p>no data</p>}
                                    </div>
                                )
                            } else {
                                return null;
                            }
                        }
                        )}
                    </div>
                </>
            )
        } else {
            return (
                <div>
                    <h3>loading...</h3>
                </div>
            )

        }
    }

    return (
        <div
            style={{
                display: "flex",
                height: "90vh",
                width: "100vw",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "nowrap",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
        >
            {renderCharacter()}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new image</DialogTitle>
                <DialogContent>
                    <img src={filePreview} style={{maxHeight:'500px',maxWidth:'500px'}}/>
                </DialogContent>
                <Button variant="contained" component="label">
                    Upload File
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        hidden
                    />
                </Button>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}