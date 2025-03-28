import React from "react";
import { ViewStyle , TextStyle, Text} from "react-native";

interface CustomButtonProps{
    text : string;
    onPress : () => void;
    style?: ViewStyle | TextStyle;
}

const CustomButton : React.FC<CustomButtonProps> = ({ text , onPress , style }) => {
    return(
        <Text>
            This is a button!
        </Text>
    )
}

export default CustomButton