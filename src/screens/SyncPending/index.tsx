import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import { fonts } from '../../util/fonts';
import { spacing } from '../../util/spacing';
import ScrollableContainer from '../../components/ScrollableContainer';
import styles from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SyncStackParams } from '../../navigators/Sync';
import useAccountSync from '../../hooks/useAccountSync';

type SyncPendingScreenProps = NativeStackScreenProps<
  SyncStackParams,
  'syncPending'
>;

export default ({ navigation, route }: SyncPendingScreenProps) => {
  const { syncData, masterPassword } = route.params;
  const onSyncSuccess = () => {
    navigation.navigate('syncSuccess', {
      email: syncData.email,
      masterPassword,
    });
  };

  const onSyncError = () => {
    Alert.alert('Error', 'Error on syncing account.');
  };

  const { isLoading, initSync, filesSynced } = useAccountSync(
    onSyncSuccess,
    onSyncError,
  );

  const loadingComponent =
    filesSynced > 0 && filesSynced <= 100 ? (
      <Text style={styles.btnText}>{`${filesSynced}%`}</Text>
    ) : (
      <ActivityIndicator />
    );

  return (
    <ScrollableContainer>
      <Text style={fonts.title2}>Syncing</Text>
      <Text style={[fonts.regular.regular, { marginTop: spacing.sm }]}>
        Syncing account data. This may take a minute.
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/sync.png')}
          style={styles.image}
        />
      </View>
      <Pressable
        disabled={isLoading}
        style={[styles.button, { opacity: isLoading ? 0.5 : 1 }]}
        onPress={() => initSync(syncData, masterPassword)}>
        {isLoading ? (
          loadingComponent
        ) : (
          <Text style={styles.btnText}>Continue</Text>
        )}
      </Pressable>
    </ScrollableContainer>
  );
};
