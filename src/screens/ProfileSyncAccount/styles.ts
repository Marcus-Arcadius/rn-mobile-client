import { StyleSheet } from 'react-native';
import { borderRadius, spacing } from '../../util/spacing';
import { colors } from '../../util/colors';

export default StyleSheet.create({
  qrCode: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  codeText: {
    backgroundColor: colors.primaryLightest,
    borderRadius: borderRadius,
    padding: spacing.lg,
    marginVertical: spacing.md,
    alignItems: 'center',
  },
});
