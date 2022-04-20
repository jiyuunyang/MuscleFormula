import { useEffect, useState } from "react";
import "../css/Main.css";
import Search from "../components/Search";
import PostThumbnail from "../components/PostThumbnail";
import TodayKing from "../components/TodayKing";
import { axios_Get_Posts } from "../axios";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import NoPost from "../components/NoPost";

export default function Main() {
  let shareRecordsId = useSelector(
    (state: RootState) => state.shareRecord.shareRecordId
  );
  const [posts, setPosts] = useState([]);
  const [showPosts, setshowPosts] = useState(posts);
  useEffect(() => {
    setshowPosts(posts);
  }, [posts]);
  const [rankData, setRankData] = useState<
    { total_time: string; nickname: string }[]
  >([]);

  useEffect(() => {
    axios_Get_Posts().then((res) => {
      setPosts(res.data.posts);
      setshowPosts(res.data.posts);
      setRankData(res.data.rankData);
    });
  }, [shareRecordsId]);

  const code = new URLSearchParams(window.location.search).get("code");
  return (
    <div id="main-container">
      <div id="todayking-container">
        <TodayKing rankData={rankData} />
      </div>
      <div id="search-container">
        <Search posts={posts} setshowPosts={setshowPosts} />
      </div>
      <div id="postthumb-container">
        {showPosts.length > 0 ? (
          showPosts.map((el, idx) => (
            <div className="post-thumbs" key={idx}>
              <PostThumbnail postThumb={el} key={idx} />
            </div>
          ))
        ) : posts.length > 0 ? (
          posts.map((el, idx) => (
            <div className="post-thumbs" key={idx}>
              <PostThumbnail postThumb={el} key={idx} />
            </div>
          ))
        ) : (
          <NoPost />
        )}
      </div>
    </div>
  );
}
