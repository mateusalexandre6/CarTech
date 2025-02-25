
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import propTypes from 'prop-types';

const CardService = ({ image, description, price, time }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: '20px auto' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="service image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: ${price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Time to conclude: {time} hours
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardService;

CardService.propTypes = {
    image: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    time: propTypes.number.isRequired,
};