import { Request, Response } from "express";
import { getRepository } from "typeorm";
import dotenv from "dotenv";
import { Posts } from "../../models/entity/Post";
import { Record } from "../../models/entity/Record";

dotenv.config();
module.exports = async (req: Request, res: Response) => {
  console.log("server readAllPost in !!");

  const allInfo = await getRepository(Posts).find({
    relations: ["users", "post_comments", "post_likes"],
    order: {
      id: "DESC",
    },
  });

  const findRank = await getRepository(Record).find({
    relations: ["ex_record", "users"],
  });
  function showtime(item) {
    let hour = Math.floor(item / 3600);
    let min = Math.floor(item / 60) - hour * 60;
    let sec = Math.floor(item % 60);
    let output: string =
      hour.toString().padStart(2, "0") +
      ":" +
      min.toString().padStart(2, "0") +
      ":" +
      sec.toString().padStart(2, "0");
    //console.log(output);
    if (output === "NaN:NaN:NaN") {
      return "운동기록이 존재 하지않습니다.";
    } else {
      return output;
    }
  }

  //console.log(findRank);
  const maxValue = findRank.map((el) => {
    let total_time: any = 0;
    let nickname = "";
    el.ex_record.forEach((item) => {
      total_time += item.time_record;
    });
    nickname = el.users.nickname;
    return { total_time: total_time, nickname: nickname };
  });
  let rankData = maxValue.sort((a, b) => {
    return b.total_time - a.total_time;
  });
  console.log(rankData.length);
  //console.log(rankData);
  if (rankData.length === 0) {
    res.status(200);
  } else if (rankData.length <= 3) {
    let Rank: any = [
      { total_time: null, nickname: null },
      { total_time: null, nickname: null },
      { total_time: null, nickname: null },
    ];
    for (let i = 0; i < rankData.length; i++) {
      Rank[i].total_time = showtime(rankData[i].total_time);
      Rank[i].nickname = rankData[i].nickname;
    }
    const createed = allInfo.map((item) => {
      const data = {
        user: {
          userId: item.users.id,
          nickname: item.users.nickname,
          image: item.users.image,
        },
        postId: item.id,
        postTitle: item.title,
        info: item.info,
        postImage: item.image,
        bodyPart: item.body_Part,
        difficult: item.difficult,
        totalTime: item.total_time,
        total_comments: item.post_comments.length,
        total_Likes: item.post_likes.length,
        created_At: item.created_At,
      };

      return data;
    });
    res.status(200).json({
      rankData: rankData,
      posts: createed,
    });
  } else if (rankData.length > 3) {
    let Rank: any = [
      { total_time: null, nickname: null },
      { total_time: null, nickname: null },
      { total_time: null, nickname: null },
    ];
    for (let i = 0; i < 3; i++) {
      Rank[i].total_time = showtime(rankData[i].total_time);
      Rank[i].nickname = rankData[i].nickname;
    }
    const createed = allInfo.map((item) => {
      const data = {
        user: {
          userId: item.users.id,
          nickname: item.users.nickname,
          image: item.users.image,
        },
        postId: item.id,
        postTitle: item.title,
        info: item.info,
        postImage: item.image,
        bodyPart: item.body_Part,
        difficult: item.difficult,
        totalTime: item.total_time,
        total_comments: item.post_comments.length,
        total_Likes: item.post_likes.length,
        created_At: item.created_At,
      };
      return data;
    });
    res.status(200).json({
      rankData: Rank,
      posts: createed,
    });
  }
};
