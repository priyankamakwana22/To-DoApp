import {Pressable, Text} from 'react-native';
import styles from './style';

const CustomButton = (props) => {
  return (
    <Pressable style={styles.btn} onPress={props.onPressFunction} >
      <Text style={styles.txt} >{props.title}</Text>
    </Pressable>
  );
};

export default CustomButton;
