import React, { useEffect, useState } from 'react'
import "./Main.css"
import Tags from '../Tags/Tags'
import Video from '../Video/Video'

export default function Main() {

    const [videos, setVideos] = useState([])

    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

    // Fetch youtube videos
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=&maxResults=50&type=video`)
                console.log(response);
                if (!response.ok) {
                    return alert("Network error occured!");
                }
                const data = await response.json()
    
                setVideos(data.items)
            } catch(e) {
                return alert(e)
            }
        }
        
        fetchVideos();
    }, [])
    
    return (
        <main id="main">
            <Tags />
            
            <section className='Video-grid'>
                {
                    videos && videos.map(video => (
                        <Video 
                            videoId = { video.id.videoId }
                            title = { video.snippet.title }
                            channelTitle = { video.snippet.channelTitle }
                            thumbnail = { video.snippet.thumbnails.medium.url }
                            publishTime = { video.snippet.publishTime }
                            channelId = { video.snippet.channelId }
                        />
                    ))
                }

            </section>
        </main>
    )
}
