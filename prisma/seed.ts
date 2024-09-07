
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function createSongs() {
  try {
    // 删除数据已有的所有数据。
    // await prisma.song.deleteMany();

    const songsFilePath = "./messge/music.json";
    const songsData = JSON.parse(fs.readFileSync(songsFilePath, "utf-8"));
    console.log(Array.isArray(songsData), songsData); // Check if it's an array

    const createdSongs = await Promise.all(
      songsData.map(
        async (songData: { title: any; duration: any; type: any }) => {
          return await prisma.song.create({
            data: {
              title: songData.title,
              likeCount: Math.floor(Math.random() * (300 - 50 + 1)) + 50,
              listenerCount: Math.floor(Math.random() * (700 - 400 + 1)) + 400,
              duration: songData.duration,
              type: songData.type,
            },
          });
        }
      )
    );
    console.log("Created songs:", createdSongs);
  } catch (error) {
    console.error("Error creating songs:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// 调用函数来创建歌曲
createSongs();
