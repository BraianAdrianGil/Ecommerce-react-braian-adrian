import { useEffect } from "react";
import HistoryComponent from "../../components/common/HistoryComponent/HistoryComponent";
import { useLoggedUser } from "../../hooks/queries/useLoggedUser";
import "./Profile.css";

const Profile = () => {
  const { data, isLoading, isError, error } = useLoggedUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) return <p>{error.response.message}</p>;

  if (isLoading)
    return (
      <div className="loader__container">
        <span className="loader"></span>
      </div>
    );

  return (
    <section className="profile__general__container">
      <div className="history__component__profile__container">
        <HistoryComponent />
      </div>
      <div className="personal__data">
        <h3>
          <b>{`${data.firstName} ${data.lastName}`}</b>
        </h3>
        <ul>
          <li>
            <i className="bx bx-envelope"></i> <b>{data.email}</b>
          </li>
          <li>
            <i className="bx bx-phone"></i> <b>{data.phone}</b>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Profile;
