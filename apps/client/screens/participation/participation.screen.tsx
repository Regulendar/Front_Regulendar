import { Input } from '@/components';
import { supabaseAuth } from '@/libs';
import { useGetJoinedOrganizationsLazyQuery } from '@/libs/graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { memo, useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDidMount, useDidUpdate } from 'rooks';
import { Image, ScrollView, Stack, Text } from 'tamagui';

type IOrganizationCardComponent = {
  organizationId: string;
  organizationName: string;
  organizationDescription?: string | null;
  organizationMemberCount: number;
  organizationImageUrl: string;
  onPressOrganizationCard: () => void;
};

type IJoinedOrganization = {
  organizationId: string;
  organizationName: string;
  organizationDescription?: string | null;
  organizationMembers: {
    userId: string;
  }[];
};

export const ParticipationScreen = memo(() => {
  const OrganizationCardComponent = memo<IOrganizationCardComponent>(
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
          borderWidth="$size.x0_25"
          borderColor="$colors.lightGray"
          px="$size.x4"
          pressStyle={{ opacity: 0.6 }}
          style={{ borderRadius: 16 }}
          onPress={onPressOrganizationCard}>
          <Stack
            flex={1}
            height="$fluid"
            justify="space-between"
            py="$size.x4"
            gap="$size.x1_5"
            style={{ paddingRight: 8 }}>
            <Stack>
              <Text fontSize="$7" fontWeight="$800" numberOfLines={1} ellipsizeMode="tail">
                {organizationName}
              </Text>
              {organizationDescription && (
                <Text fontSize="$5" fontWeight="$500" color="$colors.mediumGray" numberOfLines={1} ellipsizeMode="tail">
                  {organizationDescription}
                </Text>
              )}
            </Stack>
            <Text fontSize="$4" color="$colors.darkGray">
              인원: {organizationMemberCount}
            </Text>
          </Stack>
          <Image src={organizationImageUrl} width={80} aspectRatio={1} borderRadius="$size.x2" />
        </Stack>
      );
    }
  );

  const route = useRouter();

  const [organizations, setOrganizations] = useState<IJoinedOrganization[]>([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState<IJoinedOrganization[]>([]);
  const [searchedOrganization, setSearchedOrganization] = useState<string>('');
  const [getJoinedOrganizationsQuery, { loading }] = useGetJoinedOrganizationsLazyQuery();

  const handleChangeSearchOrganization = useCallback((text: string) => {
    setSearchedOrganization(text);
  }, []);

  const handlePressOrganizationCard = useCallback(
    (organizationId: string) => async () => {
      route.navigate(`/organization/${organizationId}`);
      await AsyncStorage.setItem('lastOrganizationId', organizationId);
    },
    [route]
  );
  const getJoinedOrganizations = useCallback(async () => {
    const {
      data: { user },
    } = await supabaseAuth.getUser();
    if (!user) {
      return;
    }
    const { data } = await getJoinedOrganizationsQuery({
      variables: {
        input: {
          userId: user.id,
        },
      },
    });
    if (!data) {
      console.error('No data returned from getJoinedOrganizationsQuery');
      return;
      // TODO(@Milgam06): 데이터 부재 처리
    }
    console.log('Fetched joined organizations:', data?.getOrganizations.organizations);
    const fetchedOrganizations = data.getOrganizations.organizations;
    setOrganizations(fetchedOrganizations);
    setFilteredOrganizations(fetchedOrganizations);
  }, [getJoinedOrganizationsQuery]);

  useDidMount(async () => {
    await getJoinedOrganizations();
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
          {loading ? (
            <Stack flex={1} width="$fluid" justify="center" items="center" gap="$size.x3">
              <ActivityIndicator size="large" color="#3ABF67" />
              <Text fontSize="$6" fontWeight="$800">
                로딩 중...
              </Text>
            </Stack>
          ) : (
            <ScrollView flex={1} width="$fluid">
              <Stack flex={1} width="$fluid" gap="$size.x2">
                {filteredOrganizations.map(
                  ({ organizationId, organizationName, organizationDescription, organizationMembers }) => {
                    const memberCount = organizationMembers.length;
                    return (
                      <OrganizationCardComponent
                        key={organizationId}
                        organizationId={organizationId}
                        organizationName={organizationName}
                        organizationDescription={organizationDescription}
                        organizationMemberCount={memberCount}
                        organizationImageUrl="https://picsum.photos/200/300"
                        onPressOrganizationCard={handlePressOrganizationCard(organizationId)}
                      />
                    );
                  }
                )}
              </Stack>
            </ScrollView>
          )}
        </Stack>
      </Stack>
    </SafeAreaView>
  );
});
