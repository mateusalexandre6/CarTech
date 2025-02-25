import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import propTypes from 'prop-types';
import { colorMap } from '../utils/colorMap';
const VehicleCard = ({ vehicle }) => {
    return (
        <Card sx={{ maxWidth: 345, 
        borderBottom: vehicle.cor ? `5px solid ${colorMap[vehicle.cor.toLowerCase()]}` : 'none',
        
         }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {vehicle.modelo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                       Ano: {vehicle.ano}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Placa: {vehicle.placa}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Cor: {vehicle.cor}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

VehicleCard.propTypes = {
    vehicle: propTypes.shape({
        modelo: propTypes.string.isRequired,
        ano: propTypes.number.isRequired,
        placa: propTypes.string.isRequired,
        cor: propTypes.string,
    }).isRequired,
};

export default VehicleCard;
