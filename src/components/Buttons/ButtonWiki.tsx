import { Book } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"

interface ButtonWikiProps {
    wiki: string;
}

const ButtonWiki = ({wiki}:ButtonWikiProps) => {
    return (
        <IconButton
            size="large"
            edge="end"
            aria-label="wiki"
            href={wiki}
            target="_blank"
        >
            <Tooltip title="Wiki Harry Potter">
                <Book />
            </Tooltip>
        </IconButton>
    )
}

export default ButtonWiki;