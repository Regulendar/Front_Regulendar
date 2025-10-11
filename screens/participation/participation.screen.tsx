import { Input } from '@/components';
import { DUMMY_ORGANIZATIONS } from '@/dummy';
import { IOrganizationType } from '@/types';
import { useRouter } from 'expo-router';
import { memo, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDidMount, useDidUpdate } from 'rooks';
import { Image, ScrollView, Stack, Text } from 'tamagui';

type IOrganizationCardComponentProps = {
  organizationId: string;
  organizationName: string;
  organizationDescription: string;
  organizationMemberCount: number;
  organizationImageUrl: string;
  onPressOrganizationCard: () => void;
};

export const ParticipationScreen = memo(() => {
  const OrganizationCardComponent = memo<IOrganizationCardComponentProps>(
    ({
      organizationId,
      organizationName,
      organizationDescription,
      organizationMemberCount,
      organizationImageUrl,
      onPressOrganizationCard,
    }) => {
      return (
        <Stack
          key={organizationId}
          width="$fluid"
          height="$size.x30"
          flexDirection="row"
          justify="space-between"
          items="center"
          borderWidth={1}
          borderColor="$colors.lightGray"
          px="$size.x4"
          pressStyle={{ opacity: 0.6 }}
          style={{ borderRadius: 16 }}
          onPress={onPressOrganizationCard}>
          <Stack flex={1} height="$fluid" justify="space-between" py="$size.x4" style={{ paddingRight: 8 }}>
            <Stack gap="$size.x1">
              <Text fontSize="$7" fontWeight="700" numberOfLines={1} ellipsizeMode="tail">
                {organizationName}
              </Text>
              <Text fontSize="$5" color="$colors.mediumGray">
                {organizationDescription}
              </Text>
            </Stack>
            <Stack>
              <Text fontSize="$4" color="$colors.darkGray">
                인원: {organizationMemberCount}
              </Text>
            </Stack>
          </Stack>
          <Image src={organizationImageUrl} width={80} aspectRatio={1} borderRadius="$size.x2" />
        </Stack>
      );
    }
  );

  const route = useRouter();

  const [organizations, setOrganizations] = useState<IOrganizationType[]>([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState<IOrganizationType[]>([]);
  const [searchedOrganization, setSearchedOrganization] = useState<string>('');

  const handleChangeSearchOrganization = useCallback((text: string) => {
    setSearchedOrganization(text);
  }, []);

  const handlePressOrganizationCard = useCallback(
    (organizationId: string) => () => {
      route.navigate(`/organization/${organizationId}`);
      //TODO(@Milgam06): mmkv로 organizationId 저장
    },
    [route]
  );

  useDidMount(() => {
    //TODO(@Milgam06): 조직 리스트 패칭
    setOrganizations(DUMMY_ORGANIZATIONS);
    setFilteredOrganizations(DUMMY_ORGANIZATIONS);
  });

  useDidUpdate(() => {
    //TODO(@Milgam06): 검색 시, 업데이트된 searchedOrganization 값으로, 패칭한 리스트 내에서 필터링
    const isSearchEmpty = searchedOrganization.trim() === '';
    if (isSearchEmpty) {
      setFilteredOrganizations(organizations);
      return;
    }
    const filteredOrganizations = organizations.filter(({ organizationName }) => {
      const isOrganizationNameMatch = organizationName.includes(searchedOrganization);
      return isOrganizationNameMatch;
    });
    setFilteredOrganizations(filteredOrganizations);
  }, [searchedOrganization]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack flex={1} px="$size.x5" py="$size.x5" gap="$size.x6">
        <Text fontSize="$9" fontWeight="800">
          내 조직
        </Text>
        <Stack flex={1} width="$fluid" gap="$size.x3">
          <Input
            value={searchedOrganization}
            onChangeText={handleChangeSearchOrganization}
            w="$fluid"
            height="$size.x12"
            placeholder="검색"
            px="$size.x3"
            borderColor="$colors.lightGray"
            fontSize="$5"
            fontWeight="500"
            focusStyle={{ borderColor: '$colors.componentGreen' }}
          />
          <ScrollView flex={1} width="$fluid">
            <Stack flex={1} width="$fluid" gap="$size.x2">
              {filteredOrganizations.map(({ id, organizationName, organizationDescription, members }) => {
                const memberCount = members.length;
                return (
                  <OrganizationCardComponent
                    key={id}
                    organizationId={id}
                    organizationName={organizationName}
                    organizationDescription={organizationDescription}
                    organizationMemberCount={memberCount}
                    organizationImageUrl="https://picsum.photos/200/300"
                    onPressOrganizationCard={handlePressOrganizationCard(id)}
                  />
                );
              })}
            </Stack>
          </ScrollView>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
});
