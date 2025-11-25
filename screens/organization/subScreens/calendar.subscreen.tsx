import { Calendar, IRenderActions, Swipeable } from '@/components';
import { IEventType } from '@/types';
import { formatDate, getToday } from '@/utils';
import { memo, useCallback, useMemo, useState } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useDidUpdate } from 'rooks';
import { getTokenValue, ScrollView, Stack, Text } from 'tamagui';

const DUMMY_DUMMY_EVENTS: IEventType[] = [
  {
    id: '4',
    eventTitle: 'Project Deadline',
    eventStartAt: '2025-09-18T23:59:00',
    eventDateYear: 2025,
    eventDateMonth: 9,
    eventDateDay: 18,
    eventDuration: 0,
    participationId: ['0e47473c-924e-417e-918a-cc48d6b71fd2'],
    hostOrganization: {
      id: 'org-1',
      organizationName: 'Organization One',
      organizationDescription: 'Description for Organization One',
      members: [],
      events: [],
    },
  },
  {
    id: '5',
    eventTitle: 'Project Deadline',
    eventStartAt: '2025-09-18T23:59:00',
    eventDateYear: 2025,
    eventDateMonth: 9,
    eventDateDay: 18,
    eventDuration: 0,
    participationId: ['0e47473c-924e-417e-918a-cc48d6b71fd2'],
    hostOrganization: {
      id: 'org-1',
      organizationName: 'Organization One',
      organizationDescription: 'Description for Organization One',
      members: [],
      events: [],
    },
  },
  {
    id: '7',
    eventTitle: 'Project Deadline',
    eventStartAt: '2025-09-18T23:59:00',
    eventDateYear: 2025,
    eventDateMonth: 9,
    eventDateDay: 18,
    eventDuration: 0,
    participationId: ['0e47473c-924e-417e-918a-cc48d6b71fd2'],
    hostOrganization: {
      id: 'org-1',
      organizationName: 'Organization One',
      organizationDescription: 'Description for Organization One',
      members: [],
      events: [],
    },
  },
  {
    id: '1',
    eventTitle: 'Project Deadline',
    eventStartAt: '2025-09-18T23:59:00',
    eventDateYear: 2025,
    eventDateMonth: 9,
    eventDateDay: 18,
    eventDuration: 0,
    participationId: ['0e47473c-924e-417e-918a-cc48d6b71fd2'],
    hostOrganization: {
      id: 'org-1',
      organizationName: 'Organization One',
      organizationDescription: 'Description for Organization One',
      members: [],
      events: [],
    },
  },
  {
    id: '2',
    eventTitle: 'Project Deadline',
    eventStartAt: '2025-09-18T23:59:00',
    eventDateYear: 2025,
    eventDateMonth: 9,
    eventDateDay: 18,
    eventDuration: 0,
    participationId: ['0e47473c-924e-417e-918a-cc48d6b71fd2'],
    hostOrganization: {
      id: 'org-1',
      organizationName: 'Organization One',
      organizationDescription: 'Description for Organization One',
      members: [],
      events: [],
    },
  },
]; // For Testing SwipeableFunction #1

type IOrganizationHomeSubScreen = {
  userId: string;
};

type IEventSwipeableComponent = {
  event: IEventType;
} & IRenderActions;

export const OrganizationCalendarSubScreen = memo<IOrganizationHomeSubScreen>(({ userId }) => {
  const { today } = getToday();
  const AnimatedStack = Animated.createAnimatedComponent(Stack);
  const swipeableContentWidth = getTokenValue('$size.x30');
  const swipeableContentMarginX = getTokenValue('$size.x2');
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [todayEvents, setTodayEvents] = useState<IEventType[]>([]);
  const [participatedEvents, setParticipatedEvents] = useState<IEventType[]>([]);
  const [notParticipatedEvents, setNotParticipatedEvents] = useState<IEventType[]>([]);

  const [dummydummyEvents, setDummydummyEvents] = useState<IEventType[]>(DUMMY_DUMMY_EVENTS); // For Testing SwipeableFunction #2

  const { hasTodayEvents, hasParticipatedEvents, hasNotParticipatedEvents } = useMemo(() => {
    const hasTodayEvents = todayEvents.length > 0;
    const hasParticipatedEvents = participatedEvents.length > 0;
    const hasNotParticipatedEvents = notParticipatedEvents.length > 0;
    return { hasTodayEvents, hasParticipatedEvents, hasNotParticipatedEvents };
  }, [todayEvents, participatedEvents, notParticipatedEvents]);

  // TODO(@Milgam06): Replace to Organization Events Fetching Logic
  const fetchEventsByDate = useCallback(() => {
    // For Testing SwipeableFunction #3
    const fetchedEvents = dummydummyEvents.filter(({ eventDateYear, eventDateMonth, eventDateDay }) => {
      const { dateString } = formatDate({
        year: eventDateYear,
        month: eventDateMonth,
        day: eventDateDay,
      });
      return dateString === selectedDate;
    });

    const initialEventAccumulator: { participated: IEventType[]; notParticipated: IEventType[] } = {
      participated: [],
      notParticipated: [],
    };
    const { participated, notParticipated } = fetchedEvents.reduce((eventAccumulator, event) => {
      const isUserParticipated = event.participationId.includes(userId);
      if (isUserParticipated) {
        return {
          participated: [...eventAccumulator.participated, event],
          notParticipated: eventAccumulator.notParticipated,
        };
      }
      return {
        participated: eventAccumulator.participated,
        notParticipated: [...eventAccumulator.notParticipated, event],
      };
    }, initialEventAccumulator);

    setTodayEvents(fetchedEvents);
    setParticipatedEvents(participated);
    setNotParticipatedEvents(notParticipated);
  }, [dummydummyEvents, selectedDate, userId]);

  useDidUpdate(() => {
    fetchEventsByDate();
  }, [selectedDate]);

  const RightEventSwipeableComponent = memo<IEventSwipeableComponent>(({ drag, onClose, event }) => {
    const swipeLength = swipeableContentWidth + swipeableContentMarginX;
    const styledAnimation = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.value + swipeLength }],
    }));
    const isParticipated = event.participationId.includes(userId);

    const handlePressRightAction = useCallback(() => {
      const updatedEvent: IEventType = isParticipated
        ? {
            ...event,
            participationId: event.participationId.filter((id) => id !== userId),
          }
        : {
            ...event,
            participationId: [...event.participationId, userId],
          };
      setDummydummyEvents((previousEvents) => {
        const filteredEvents = previousEvents.filter((e) => e.id !== event.id);
        return [...filteredEvents, updatedEvent];
      });
      if (isParticipated) {
        setParticipatedEvents((previousParticipatedEvents) => {
          const updatedParticipatedEvents = previousParticipatedEvents.filter(({ id }) => {
            return id !== event.id;
          });
          return updatedParticipatedEvents;
        });
        setNotParticipatedEvents((previousNotParticipatedEvents) => {
          return [...previousNotParticipatedEvents, updatedEvent];
        });

        return onClose;
      }
      setParticipatedEvents((previousParticipatedEvents) => {
        return [...previousParticipatedEvents, updatedEvent];
      });
      setNotParticipatedEvents((previousNotParticipatedEvents) => {
        const updatedNotParticipatedEvents = previousNotParticipatedEvents.filter(({ id }) => {
          return id !== event.id;
        });
        return updatedNotParticipatedEvents;
      });
      return onClose;
    }, [event, isParticipated, onClose]);

    return (
      <AnimatedStack
        style={[styledAnimation, { borderRadius: 8, marginRight: swipeableContentMarginX }]}
        width={swipeableContentWidth}
        borderWidth="$size.x0_5"
        justify="center"
        items="center"
        onPress={handlePressRightAction}>
        <Text>{isParticipated ? '이벤트 참가 취소' : '이벤트 참가하기'}</Text>
      </AnimatedStack>
    );
  });
  return (
    <Stack flex={1} width="$fluid" justify="space-between" items="center" gap="$size.x2">
      <ScrollView flex={1} width="$fluid">
        <Calendar value={selectedDate} onDayChange={setSelectedDate} />
        {!hasTodayEvents && (
          <Stack flex={1} width="$fluid" justify="center" items="center">
            <Text fontSize="$7" fontWeight="500" color="$colors.mediumGray">
              일정이 없습니다.
            </Text>
          </Stack>
        )}

        <Stack flex={1} width="$fluid" gap="$size.x4">
          {hasParticipatedEvents && (
            <Stack width="$fluid" gap="$size.x2">
              <Stack width="$fluid" px="$size.x3">
                <Text fontSize="$5" fontWeight="600" color="$colors.componentGreen">
                  내가 참여한 일정 {participatedEvents.length}개
                </Text>
              </Stack>
              {participatedEvents.map((event) => {
                const eventStartHour = event.eventStartAt.split('T')[1].split(':')[0];
                const eventStartMinute = event.eventStartAt.split('T')[1].split(':')[1];
                return (
                  <Swipeable
                    key={event.id}
                    hasOvershoot={false}
                    swipeDirections="right"
                    rightActionsWidth={swipeableContentWidth}
                    renderRightActions={({ drag, onClose }) => (
                      <RightEventSwipeableComponent drag={drag} onClose={onClose} event={event} />
                    )}
                    containerStyle={{ paddingHorizontal: swipeableContentMarginX }}>
                    <Stack
                      width="$fluid"
                      p="$size.x2"
                      flexDirection="row"
                      borderWidth="$size.x0_5"
                      borderColor="$colors.componentGreen"
                      bg="$colors.componentGreen"
                      gap="$size.x2"
                      style={{ borderRadius: 8 }}>
                      <Stack
                        px="$size.x2"
                        py="$size.x1"
                        bg="$colors.backgroundWhite"
                        justify="center"
                        items="center"
                        style={{ borderRadius: 4 }}>
                        <Text fontSize="$8" fontWeight="600" color="$colors.componentGreen">
                          {eventStartHour}
                        </Text>
                        <Text fontSize="$8" fontWeight="600" color="$colors.componentGreen">
                          {eventStartMinute}
                        </Text>
                      </Stack>
                      <Stack>
                        <Text fontSize="$8" fontWeight="600" color="$colors.backgroundWhite">
                          {event.eventTitle}
                        </Text>
                        <Text fontSize="$4" fontWeight="500" color="$colors.backgroundWhite">
                          소요시간: {event.eventDuration}
                        </Text>
                      </Stack>
                    </Stack>
                  </Swipeable>
                );
              })}
            </Stack>
          )}
          {hasNotParticipatedEvents && (
            <Stack width="$fluid" gap="$size.x2">
              <Stack width="$fluid" px="$size.x3">
                <Text fontSize="$5" fontWeight="600" color="$colors.darkGray">
                  참여하지 않은 일정 {notParticipatedEvents.length}개
                </Text>
              </Stack>
              <Stack width="$fluid" gap="$size.x1_5">
                {notParticipatedEvents.map((event) => {
                  const eventStartHour = event.eventStartAt.split('T')[1].split(':')[0];
                  const eventStartMinute = event.eventStartAt.split('T')[1].split(':')[1];
                  return (
                    <Swipeable
                      key={event.id}
                      hasOvershoot={false}
                      swipeDirections="right"
                      rightActionsWidth={swipeableContentWidth}
                      renderRightActions={({ drag, onClose }) => (
                        <RightEventSwipeableComponent drag={drag} onClose={onClose} event={event} />
                      )}
                      containerStyle={{ paddingHorizontal: swipeableContentMarginX }}>
                      <Stack
                        width="$fluid"
                        p="$size.x2"
                        flexDirection="row"
                        borderWidth="$size.x0_5"
                        borderColor="$colors.lightGray"
                        bg="$colors.backgroundWhite"
                        gap="$size.x2"
                        style={{ borderRadius: 8 }}>
                        <Stack
                          px="$size.x2"
                          py="$size.x1"
                          bg="$colors.lightGray"
                          justify="center"
                          items="center"
                          style={{ borderRadius: 4 }}>
                          <Text fontSize="$8" fontWeight="600" color="$colors.backgroundBlack">
                            {eventStartHour}
                          </Text>
                          <Text fontSize="$8" fontWeight="600" color="$colors.backgroundBlack">
                            {eventStartMinute}
                          </Text>
                        </Stack>
                        <Stack>
                          <Text fontSize="$8" fontWeight="600" color="$colors.backgroundBlack">
                            {event.eventTitle}
                          </Text>
                          <Text fontSize="$4" fontWeight="500" color="$colors.backgroundBlack">
                            소요시간: {event.eventDuration}
                          </Text>
                        </Stack>
                      </Stack>
                    </Swipeable>
                  );
                })}
              </Stack>
            </Stack>
          )}
        </Stack>
      </ScrollView>
    </Stack>
  );
});
