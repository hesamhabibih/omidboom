// pages/profile/[tenantId].js
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const { tenantId } = router.query;

  return (
    <div>
      <h1>Profile for Tenant: {tenantId}</h1>
    </div>
  );
};

export default Profile;