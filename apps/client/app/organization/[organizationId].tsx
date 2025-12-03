import { OrganizationScreen } from '@/screens';
import { useLocalSearchParams } from 'expo-router';

export default function Organization() {
  const { organizationId } = useLocalSearchParams<{ organizationId: string }>();

  return <OrganizationScreen organizationId={organizationId} />;
}
