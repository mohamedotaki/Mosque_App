import PrayerTimes from "./PrayerTimes";
import "./css/Home.css";
import React from "react";
import Card from "../Components/Card/Card";
import { Plus, Dash } from "react-bootstrap-icons";
import CardEdit from "../Components/Card/CardEdit";
import { getPosts } from "../db/dbFunctions";
import { useTranslation } from "react-i18next";

export default function Home(props) {
  const [posts, setPosts] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);
  const { t } = useTranslation();

  const updatePosts = () => {
    getPosts().then((data) => {
      setPosts(data);
    });

    setShowForm(false);
  };

  React.useEffect(() => {
    if (navigator.onLine) updatePosts();
  }, []);

  return (
    <div className="HomeView">
      <div className="PostsView">
        <h2 style={{ display: "inline-block" }}>{t("Latest News")}</h2>
        <button
          className="AddPostBT"
          variant="primary"
          style={{ display: props.user.userType === "Admin" ? "" : "none" }}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <Dash size={"25"} /> : <Plus size={"25"} />}
          Add New Post
        </button>
        <CardEdit trigger={showForm} updateView={updatePosts} />
        {posts !== null ? (
          posts.map((post) => (
            <Card
              Data={post}
              key={post.id}
              user={props.user}
              getPosts={updatePosts}
            />
          ))
        ) : (
          <h5>
            {navigator.onLine
              ? "No Posts"
              : "Offline. Please connect to internet to see latest news"}{" "}
          </h5>
        )}
      </div>

      <div className="PrayerTimes">
        <h2>Prayer Time</h2>
        <PrayerTimes user={props.user} />
      </div>
    </div>
  );
}
