import { Button } from '@/components';
import { getScreenSize } from '@/utils';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Image } from 'expo-image';
import { memo, useCallback } from 'react';
import DashedLine from 'react-native-dashed-line';
import { ScrollView, Stack, Text } from 'tamagui';
import { useCountUp } from 'use-count-up';

type IParticipatedEventCardComponent = {
  eventId: string;
  eventTitle: string;
  eventDuration: number;
  eventDateYear: number;
  eventDateMonth: number;
  eventDateDay: number;
};

export const OrganizationMainSubScreen = memo(() => {
  const { windowWidth } = getScreenSize();

  const { value } = useCountUp({
    isCounting: true,
    end: 80,
  });

  const ParticipatedEventCardComponent = memo<IParticipatedEventCardComponent>(
    ({ eventId, eventTitle, eventDuration, eventDateYear, eventDateMonth, eventDateDay }) => {
      const handlePressDetails = useCallback(() => {
        // TODO(@Milgam06) Navigate to event details screen
        console.log('Details pressed for event:', eventId);
      }, [eventId]);
      return (
        <Stack width={windowWidth} px="$size.x3">
          <Stack
            width="$fluid"
            justify="space-between"
            py="$size.x3"
            bg="$colors.componentGreen"
            gap="$size.x4"
            style={{ borderRadius: 12 }}>
            <Stack flexDirection="row" justify="space-between" items="center" px="$size.x4">
              <Stack gap="$size.x1">
                <Text fontSize="$9" fontWeight="900" color="$colors.backgroundWhite">
                  {eventTitle}
                </Text>
                <Stack flexDirection="row" gap="$size.x1_5" items="center">
                  <FontAwesomeIcon icon={faClock} color="#f5f5f5" />
                  <Text fontSize="$6" fontWeight="900" color="$colors.backgroundWhite">
                    {eventDuration}
                  </Text>
                </Stack>
              </Stack>
              <Stack
                px="$size.x2"
                py="$size.x1"
                bg="$colors.backgroundWhite"
                justify="center"
                items="center"
                style={{ borderRadius: 8 }}>
                <Text fontSize="$8" fontWeight="900" color="$colors.componentGreen">
                  {eventDateDay}
                </Text>
                <Text fontSize="$8" fontWeight="900" color="$colors.componentGreen">
                  Wed
                </Text>
              </Stack>
            </Stack>
            <DashedLine key={eventId} dashThickness={1} dashGap={4} dashColor="#f5f5f5" />
            <Stack width="$fluid" px="$size.x4" items="flex-start">
              <Button
                isFullWidth={false}
                px="$size.x3"
                py="$size.x1_5"
                backgroundColor="$colors.backgroundWhite"
                onPressButton={handlePressDetails}>
                <FontAwesomeIcon size={20} icon={faInfoCircle} color="#3ABF67" />
                <Text fontSize="$6" fontWeight="700" color="$colors.componentGreen">
                  Details
                </Text>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      );
    }
  );

  return (
    <Stack flex={1} width="$fluid" py="$size.x2" gap="$size.x5">
      <Stack gap="$size.x2">
        <Stack px="$size.x5" flexDirection="row" gap="$size.x2" items="flex-end">
          <Text fontSize="$6" fontWeight="900">
            이번 달 참여 이벤트
          </Text>
          <Text fontSize="$5" fontWeight="900" color="$colors.mediumGray">
            0 / 2
          </Text>
        </Stack>
        <ScrollView width="$fluid" horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          <ParticipatedEventCardComponent
            eventDateDay={18}
            eventDateMonth={9}
            eventDateYear={2025}
            eventDuration={30}
            eventId="1"
            eventTitle="프로젝트 마감"
          />
        </ScrollView>
      </Stack>
      <Stack gap="$size.x2">
        <Stack px="$size.x5">
          <Text fontSize="$6" fontWeight="900">
            활동
          </Text>
        </Stack>
        <Stack width="$fluid" flexDirection="row" justify="space-between" px="$size.x3" gap="$size.x2">
          <Stack
            flex={1}
            aspectRatio={1}
            justify="center"
            items="center"
            py="$size.x3"
            bg="$colors.componentGreen"
            gap="$size.x0_5"
            style={{ borderRadius: 12 }}>
            <Text fontSize="$13" fontWeight="900" color="$colors.backgroundWhite">
              {value}%
            </Text>
            <Text fontSize="$6" fontWeight="900" color="$colors.backgroundWhite">
              이번 달 참여율
            </Text>
          </Stack>
          <Stack
            flex={1}
            aspectRatio={1}
            justify="center"
            items="center"
            py="$size.x3"
            bg="$colors.backgroundWhite"
            gap="$size.x1"
            borderWidth={1}
            borderColor="$colors.componentGreen"
            style={{ borderRadius: 12 }}>
            <Image
              source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Thinking%20Face.png"
              alt="Thinking Face"
              contentFit="contain"
              style={{ width: 100, aspectRatio: 1 }}
            />
            <Text fontSize="$5" fontWeight="900" color="$colors.componentGreen">
              아직 게시물이 없어요!
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
});
