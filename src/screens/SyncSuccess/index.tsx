import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { fonts } from '../../util/fonts';
import { spacing } from '../../util/spacing';
import ScrollableContainer from '../../components/ScrollableContainer';
import styles from './styles';
import { Button } from '../../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SyncStackParams } from '../../navigators/Sync';
import { useAppDispatch } from '../../hooks';
import { accountLogout, loginFlow } from '../../store/account';

type SyncSuccessScreenProps = NativeStackScreenProps<
  SyncStackParams,
  'syncSuccess'
>;

export default ({ route }: SyncSuccessScreenProps) => {
  const { email, masterPassword } = route.params;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onPressContinue = async () => {
    try {
      setIsLoading(true);
      // we need to logout before we login again
      await dispatch(accountLogout());
      // navigate automatically to main screen
      await dispatch(loginFlow({ email, password: masterPassword })).unwrap();
    } catch (error) {
      Alert.alert('Error', 'Error on logging in.');
      setIsLoading(false);
    }
  };

  return (
    <ScrollableContainer>
      <Text style={fonts.title2}>Account Synced</Text>
      <Text style={[fonts.regular.regular, { marginTop: spacing.sm }]}>
        Success!
      </Text>
      <Text style={[fonts.regular.regular, { marginTop: spacing.md }]}>
        You can now log in with your synced account.
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/syncSuccess.png')}
          style={styles.image}
        />
      </View>
      <Button
        loading={isLoading}
        title="Continue"
        onPress={onPressContinue}
        style={styles.button}
      />
    </ScrollableContainer>
  );
};
