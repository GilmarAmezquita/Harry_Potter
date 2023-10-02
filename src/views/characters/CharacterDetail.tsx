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
import { uploadImage, getImageByCharacterId, auth } from "../../services/firebase";

export default function CharacterDetail() {
    const user = auth.currentUser;
    const [filePreview, setFilePreview] = useState<string | undefined>();
    const [file, setFile] = useState<File>();
    const [open, setOpen] = React.useState(false);
    const [character, setCharacter] = useState<CharacterProp>();
    const [images, setImages] = useState<string[]>([]);
    const visibleAddImage = user ? true : false;

    const { id } = useParams();
    useEffect(() => {
        getCharacter(id || "").then((data) => {
            console.log(data.data);
            setCharacter(data.data);
            data.data.attributes.image ? setImages([...images, data.data.attributes.image]) : setImages([]);
        });
    }, [id]);


    useEffect(() => {
        const pushImage = (url: string) => {
            if (images.includes(url)) return;
            const aux = images.slice();
            console.log(aux);
            aux.push(url);
            setImages(aux);
        }
        getImageByCharacterId(id, pushImage);
    }, [id])


    const handleClickOpen = () => {
        console.log(images);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        if (!file) return alert("Please select a file");
        await uploadImage(file, id);
        setOpen(false);
    }

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilePreview(URL.createObjectURL(event.target.files![0]));
        setFile(event.target.files![0]);
    }


    const renderCharacter = () => {
        if (character) {
            return (
                <>
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
                        {character.attributes.name ? <h1>{character.attributes.name}</h1> : <h1>no data of name</h1>}
                        {character.attributes.wiki ? <a href={character.attributes.wiki} target="_blank" rel="noreferrer">Wiki</a> : <h3>no wiki</h3>}
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<AddIcon />}
                            style={{
                                margin: 10,
                                visibility: visibleAddImage ? 'visible' : 'hidden'
                            }}
                            onClick={handleClickOpen}
                        >Add image</Button>
                        {Object.keys(character.attributes).map((key, index) => {
                            if (key !== "image" && key !== "name" && key !== "family_member" && key !== "wiki") {
                                return (
                                    <div key={index}>
                                        <h3>{key}</h3>
                                        <p style={{ wordBreak: "break-all", whiteSpace: "normal" }}>{character.attributes[key as keyof CharacterProp['attributes']] ? character.attributes[key as keyof CharacterProp['attributes']] : "no data"}</p>
                                    </div>
                                )
                            } else if (key === "family_member") {
                                return (
                                    <div key={index}>
                                        <h3>{key}</h3>
                                        {character.attributes[key] !== null ?
                                            (character.attributes[key].map((family: string, index:number) => {
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

    const renderImage = () => {
        if (images) {
            return (
                <div>
                    {images.map((image, index) => {
                        return (
                            <img key={index} src={image} style={{ maxHeight: '100px', maxWidth: '100px', margin:"10px" }} />
                        )
                    })}
                </div>
            )
        } else {
            return (
                <h3>loading...</h3>
            )
        }

    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "nowrap",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    width: "30%",
                    height: "100%",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid black",
                }}
            >
                {renderImage()}
            </div>

            {renderCharacter()}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new image</DialogTitle>
                <DialogContent>
                    <img src={filePreview} style={{ maxHeight: '500px', maxWidth: '500px' }} />
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