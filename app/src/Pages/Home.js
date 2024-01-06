import PrayerTimes from "./PrayerTimes";
import "./css/Home.css";
import React from "react";
import Card from "../Components/Card/Card";
import { Plus } from "react-bootstrap-icons";
import CardEdit from "../Components/Card/CardEdit";
import { apiLink } from "../db/dbFunctions";

export default function Home(props) {
  const [posts, setPosts] = React.useState("");
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    fetch(apiLink("getposts"))
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  return (
    <div className="HomeView">
      <div className="PostsView">
        <h2 style={{ display: "inline-block" }}>Latest News</h2>
        <button
          className="AddPostBT"
          variant="primary"
          style={{ display: props.user.userType === "Admin" ? "" : "none" }}
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={"25"} />
          Add New Post
        </button>
        <CardEdit trigger={showForm} restState={setShowForm} />
        {posts.length != 0 ? (
          posts.map((post) => (
            <Card Data={post} key={post.id} user={props.user} />
          ))
        ) : (
          <h5>No Posts</h5>
        )}
      </div>

      <div className="PrayerTimes">
        <h2>Prayer Time</h2>
        <PrayerTimes user={props.user} />
      </div>
    </div>
  );
}
