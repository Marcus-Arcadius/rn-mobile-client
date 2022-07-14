import { StyleSheet } from 'react-native';
import { spacing } from '../../util/spacing';

export default StyleSheet.create({
  image: {
    width: 96,
    height: 96,
  },
  imageContainer: {
    marginTop: spacing.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
});
