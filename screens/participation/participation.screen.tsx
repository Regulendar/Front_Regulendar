import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, Stack, Text } from 'tamagui';

type IOrganizationCardComponentProps = {
  organizationId: string;
  organizationName: string;
  organizationDescription: string;
  organizationMemberCount: number;
  organizationImageUrl: string;
};

export const ParticipationScreen = memo(() => {
  const OrganizationCardComponent = memo<IOrganizationCardComponentProps>(
    ({ organizationId, organizationName, organizationDescription, organizationMemberCount, organizationImageUrl }) => {
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
          style={{ borderRadius: 16 }}>
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack flex={1} px="$size.x5" py="$size.x5" gap="$size.x8">
        <Text fontSize="$9" fontWeight="800">
          내 조직
        </Text>
        <ScrollView flex={1} width="$fluid">
          <Stack flex={1} width="$fluid" gap="$size.x2">
            <OrganizationCardComponent
              organizationId="1"
              organizationName="OrganizationTitle"
              organizationDescription="OrganizationDescription"
              organizationMemberCount={100}
              organizationImageUrl="https://picsum.photos/200/300"
            />
          </Stack>
        </ScrollView>
      </Stack>
    </SafeAreaView>
  );
});
