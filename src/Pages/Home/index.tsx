import VideoView from '../../components/VideoView';
import videoList from '../../mock/videoList';
import './home.styles.scss';

function HomePgae() {
  return (
    <div className='home'>
        <div>
           {videoList.map((item) => (
            <div key={item._id} className='video-container'>
              <VideoView {...item} />
            </div>
           ))}
        </div>
    </div>
  )
}

export default HomePgae
