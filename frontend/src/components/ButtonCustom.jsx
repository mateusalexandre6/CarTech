
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import propsTypes from 'prop-types';

const CustomButton = styled(Button)(() => ({
    padding: '10px 20px',
    borderRadius: '8px',
    textTransform: 'none',
   
}));

const ButtonCustom = ({ children, ...props }) => {
    return <CustomButton {...props}>{children}</CustomButton>;
};

export default ButtonCustom;

ButtonCustom.propTypes = {
    children: propsTypes.node.isRequired,
};