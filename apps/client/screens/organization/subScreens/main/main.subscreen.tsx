import { Button } from '@/components';
import { EventStatus, useGetMyScheduledEventsLazyQuery } from '@/libs';
import { getScreenSize } from '@/utils';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Image } from 'expo-image';
import { memo, useCallback, useState } from 'react';
import DashedLine from 'react-native-dashed-line';
import { useDidMount } from 'rooks';
import { ScrollView, Stack, Text } from 'tamagui';

type IOrganizationMainSubScreenProps = {
  organizationId: string;
};

type IScheduledEvent = {
  eventId: string;
  eventTitle: string;
  eventDuration: number;
  eventDateYear: number;
  eventDateMonth: number;
  eventDateDay: number;
  eventStatus: EventStatus;
};

type IParticipatedEventCardComponent = {
  eventId: string;
  eventTitle: string;
  eventDuration: number;
  eventDateYear: number;
  eventDateMonth: number;
  eventDateDay: number;
};

type IRecommendedEventCardComponent = {
  eventId: string;
  eventTitle: string;
  eventDuration: number;
  eventDateYear: number;
  eventDateMonth: number;
  eventDateDay: number;
  // TODO(@Milgam06): add Participations
};

export const OrganizationMainSubScreen = memo<IOrganizationMainSubScreenProps>(({ organizationId }) => {
  const { windowWidth } = getScreenSize();
  const [scheduledEvents, setScheduledEvents] = useState<IScheduledEvent[]>([]);
  const [getMyScheduledEventsQuery] = useGetMyScheduledEventsLazyQuery();

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
            bg="$colors.primaryGreen"
            gap="$size.x4"
            style={{ borderRadius: 12 }}>
            <Stack flexDirection="row" justify="space-between" items="center" px="$size.x4">
              <Stack gap="$size.x1">
                <Text fontSize="$9" fontWeight="900" color="$colors.backgroundWhite">
                  {eventTitle}
                </Text>
                <Stack flexDirection="row" gap="$size.x1_5" items="center">
                  <FontAwesomeIcon icon={faClock} color="#f5f5f5" />
                  <Text fontSize="$6" fontWeight="700" color="$colors.backgroundWhite">
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
                <Text fontSize="$8" fontWeight="700" color="$colors.primaryGreen">
                  {eventDateDay}
                </Text>
                <Text fontSize="$8" fontWeight="700" color="$colors.primaryGreen">
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
                bg="$colors.backgroundWhite"
                onPress={handlePressDetails}>
                <FontAwesomeIcon size={20} icon={faInfoCircle} color="#3ABF67" />
                <Text fontSize="$6" fontWeight="800" color="$colors.primaryGreen">
                  Details
                </Text>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      );
    }
  );

  const RecommendedEventCardComponent = memo<IRecommendedEventCardComponent>(
    ({ eventId, eventTitle, eventDuration, eventDateYear, eventDateMonth, eventDateDay }) => {
      const handlePressRecommendedEventCard = useCallback(() => {
        // TODO(@Milgam06) Navigate to recommended event details screen
        console.log('Recommended Event Card pressed for event:', eventId);
      }, [eventId]);
      return (
        <Stack
          key={eventId}
          width="$fluid"
          p="$size.x2"
          flexDirection="row"
          borderWidth="$size.x0_5"
          borderColor="$colors.primaryGreen"
          bg="$colors.backgroundWhite"
          gap="$size.x2"
          pressStyle={{ opacity: 0.8 }}
          onPress={handlePressRecommendedEventCard}
          style={{ borderRadius: 8 }}>
          <Stack
            px="$size.x2"
            py="$size.x1"
            bg="$colors.primaryGreen"
            justify="center"
            items="center"
            style={{ borderRadius: 4 }}>
            <Text fontSize="$8" fontWeight="700" color="$colors.backgroundWhite">
              {eventDateDay}
            </Text>
            <Text fontSize="$8" fontWeight="700" color="$colors.backgroundWhite">
              Wed
            </Text>
          </Stack>
          <Stack>
            <Text fontSize="$8" fontWeight="900" color="$colors.backgroundBlack">
              {eventTitle}
            </Text>
            <Text fontSize="$4" fontWeight="600" color="$colors.backgroundBlack">
              소요시간: {eventDuration}
            </Text>
          </Stack>
        </Stack>
      );
    }
  );

  const fetchMyScheduledEvents = useCallback(async () => {
    const { data: scheduledEventsData, error } = await getMyScheduledEventsQuery({
      variables: {
        input: {
          organizationId,
          eventStatus: EventStatus.Scheduled,
        },
      },
    });
    const hasScheduledEvents = scheduledEventsData && !error;
    if (!hasScheduledEvents) {
      console.log('No scheduled events found or error occurred:', error);
      return;
    }
    console.log('Fetched scheduled events:', scheduledEventsData.getEvents.events);
    setScheduledEvents(scheduledEventsData.getEvents.events);
  }, [getMyScheduledEventsQuery, organizationId]);

  useDidMount(async () => {
    await fetchMyScheduledEvents();
  });

  return (
    <ScrollView flex={1} width="$fluid">
      <Stack flex={1} width="$fluid" py="$size.x2" gap="$size.x5">
        <Stack gap="$size.x2">
          <Stack px="$size.x5" flexDirection="row" gap="$size.x2" items="flex-end">
            <Text fontSize="$6" fontWeight="900">
              이번 달 참여 이벤트
            </Text>
            {scheduledEvents.length > 0 && (
              <Text fontSize="$4" fontWeight="700" color="$colors.primaryGreen">
                {scheduledEvents.length}개 예정
              </Text>
            )}
          </Stack>
          {scheduledEvents.length > 0 ? (
            <ScrollView width="$fluid" horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
              {scheduledEvents.map((event) => (
                <ParticipatedEventCardComponent
                  key={event.eventId}
                  eventDateDay={event.eventDateDay}
                  eventDateMonth={event.eventDateMonth}
                  eventDateYear={event.eventDateYear}
                  eventDuration={event.eventDuration}
                  eventId={event.eventId}
                  eventTitle={event.eventTitle}
                />
              ))}
            </ScrollView>
          ) : (
            <ScrollView width="$fluid" horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
              <Stack width={windowWidth} px="$size.x3">
                <Stack
                  width="$fluid"
                  justify="space-between"
                  py="$size.x3"
                  borderWidth="$size.x0_5"
                  borderColor="$colors.primaryGreen"
                  gap="$size.x4"
                  style={{ borderRadius: 12 }}>
                  <Stack flexDirection="row" justify="space-between" items="center" px="$size.x4"></Stack>
                </Stack>
              </Stack>
            </ScrollView>
          )}
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
              bg="$colors.primaryGreen"
              gap="$size.x0_5"
              style={{ borderRadius: 12 }}>
              <Text fontSize="$13" fontWeight="700" color="$colors.backgroundWhite">
                80%
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
              gap="$size.x3"
              borderWidth={1}
              borderColor="$colors.primaryGreen"
              style={{ borderRadius: 12 }}>
              <Image
                source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Thinking%20Face.png"
                alt="Thinking Face"
                contentFit="contain"
                style={{ width: 100, aspectRatio: 1 }}
              />
              <Text fontSize="$5" fontWeight="900" color="$colors.primaryGreen">
                아직 게시물이 없어요!
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Stack gap="$size.x2">
          <Stack px="$size.x5">
            <Text fontSize="$6" fontWeight="900">
              이런 이벤트는 어때요?
            </Text>
          </Stack>

          <Stack px="$size.x3" gap="$size.x2">
            <RecommendedEventCardComponent
              eventDateDay={25}
              eventDateMonth={9}
              eventDateYear={2025}
              eventDuration={45}
              eventTitle="환경 보호 캠페인"
              eventId="101"
            />
          </Stack>
        </Stack>
      </Stack>
    </ScrollView>
  );
});
