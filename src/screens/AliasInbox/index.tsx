import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { aliasesMailListSelector } from '../../store/selectors/mail';
// @ts-ignore
import envApi from '../../../env_api.json';
import { getMessagesByAliasId } from '../../store/mail';
import { MailList, MailListItem } from '../../components/MailList';
import { MailListHeader } from '../../components/MailListHeader';
import { NavTitle } from '../../components/NavTitle';
import { ComposeNewEmailButton } from '../../components/ComposeNewEmailButton';
import { MainStackParams, RootStackParams } from '../../Navigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { aliasSelectors } from '../../store/adapters/aliases';
import { RootState } from '../../store';

export type AliasInboxScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParams, 'aliasInbox'>,
  NativeStackScreenProps<RootStackParams>
>;

export const AliasInboxScreen = ({
  navigation,
  route,
}: AliasInboxScreenProps) => {
  const aliasId = route.params.aliasId;
  const alias = useAppSelector((state: RootState) =>
    aliasSelectors.selectById(state.aliases, aliasId),
  );
  const mail = useAppSelector(state => state.mail);
  const dispatch = useAppDispatch();
  const inboxMailList = useAppSelector(state =>
    aliasesMailListSelector(state, aliasId),
  );

  const onRefresh = async () => {
    if (alias?.aliasId) {
      await dispatch(getMessagesByAliasId({ id: alias.aliasId }));
    }
  };

  const onNewEmail = () => {
    navigation.navigate('compose');
  };

  const onSelectEmail = (emailId: string) => {
    navigation.navigate('inbox', {
      screen: 'emailDetail',
      params: { emailId: emailId },
    });
  };

  const listData: MailListItem[] = inboxMailList.map(item => ({
    id: item.emailId,
    mail: item,
    onSelect: () => onSelectEmail(item.emailId),
  }));

  if (!alias) {
    return null;
  }

  const renderHeader = () => (
    <MailListHeader
      title={`# ${alias.name}`}
      subtitle={`${alias.aliasId}@${envApi.postfix}`}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <MailList
        navigation={navigation}
        renderNavigationTitle={() => <NavTitle>{`# ${alias.name}`}</NavTitle>}
        headerComponent={renderHeader}
        loading={mail.loadingGetMailMeta}
        onRefresh={onRefresh}
        items={listData}
      />
      <ComposeNewEmailButton onPress={onNewEmail} />
    </View>
  );
};
