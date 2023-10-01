import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Dashboard = () => {
    //console.log(useSelector((state: RootState) => state.value));
    const [characters, setCharacters] = useState([{}]);
    useEffect(() => {
        fetch('https://api.potterdb.com/v1/characters', {
            'method': 'GET',
        }).then(response => response.json())
            .then(data => {
                console.log(data.data);
                setCharacters(data.data);
            }
            );
    }, []);

    const renderCharacters = () => {
        
        if(characters.length === 1) {
            return <div>loading...</div>
        }else{
            return characters.map((character: any) => {
                character.attributes.image === null ? character.attributes.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png" : character.attributes.image = character.attributes.image;
                return (
                    <Card sx={{ maxWidth: 345, minWidth: 345, margin: 2 ,maxHeight: 400, minHeight: 400}} key={character.id}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={character.attributes.image}
                            alt={character.attributes.name}
                            style={{objectFit: "contain"}}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {character.attributes.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {character.attributes.house}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                );
            });
        }
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            width: "100%",
            height: "93vh",
            backdropFilter: "blur(10px)",
            color: "white"
        }}>
            {renderCharacters()}
        </div>
    );
}



export default Dashboard;