import { Close } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"

interface ButtonCloseProps {
    onClose: () => void;
}

const ButtonClose = ({onClose}:ButtonCloseProps) => {
    return (
        <IconButton
            size="large"
            edge="end"
            aria-label="close"
            onClick={onClose}
        >
            <Tooltip title="Cerrar">
                <Close />
            </Tooltip>
        </IconButton>
    )
}

export default ButtonClose;