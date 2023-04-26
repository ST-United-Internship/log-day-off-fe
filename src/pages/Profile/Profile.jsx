import { Card } from "antd";
import { useGetAuthProfile } from "../../hooks/useGetAuthProfile";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const Profile = () => {
  const { data: profile, isLoading: isLoadingProfile } = useGetAuthProfile();

  return (
    <div>
      <LoadingComponent isLoading={isLoadingProfile}>
        <Card style={{ width: 300 }}>
          <p>{profile?.username}</p>
          <p>Email: {profile?.email}</p>
          <p>Gender: {profile?.gender}</p>
        </Card>
      </LoadingComponent>
    </div>
  );
};

export default Profile;
