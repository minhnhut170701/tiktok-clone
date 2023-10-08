import { VideoViewProps } from "../modules/videoList";
import { Follow1, Follow3 } from "../assets/follower";
import { TikTokURL, TikTokURL2 } from "../assets";

const videoList: VideoViewProps[] = [
    {
        _id: "1",
        name: "ghliuh",
        avatar: Follow1,
        subname: "G Hai Linh",
        isTicked: false,
        description: "Nghe và ngẫm #radio #anhduyradio #buon #tamtrang #cuocsong #tinhyeu #codon #tamtrangbuon #learnontiktok #trietlycuocsong",
        music: "This is a music",
        videoUrl: TikTokURL,
        like: 0,
        comment: 0,
        share: 0,
        save: 0,
        isFollow: false
    },
    {
        _id: "2",
        name: "hoaa.hanassii",
        avatar: Follow3,
        subname: "Đào Lê Phương Hoa",
        isTicked: true,
        description: "Nghe và ngẫm #radio #anhduyradio #buon #tamtrang #cuocsong #tinhyeu #codon #tamtrangbuon #learnontiktok #trietlycuocsong",
        music: "This is a music",
        videoUrl: TikTokURL2,
        like: 0,
        comment: 0,
        share: 0,
        save: 0,
        isFollow: false
    }
];

export default videoList;