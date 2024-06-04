import React, { useEffect, useState } from 'react'
import "./Video.css"
import { differenceInMonths, differenceInYears } from 'date-fns';

export default function Video({thumbnail, title, channelTitle, videoId, publishTime, channelId}) {

    const currentTime = new Date();
    const otherTime = new Date(publishTime);
    const yearsDifference = differenceInYears(currentTime, otherTime);
    const monthsDifference = differenceInMonths(currentTime, otherTime);

    const [viewCount, setViewCount] = useState("")
    const [duration, setDuration] = useState("")

    const [channelDetails, setChannelDetails] = useState("")
    const [channelSubscriberCount, setChannelSubscriberCount] = useState("")

    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

    // Fetch view count, video duration
    useEffect(() => {
        fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=contentDetails,statistics&id=${videoId}`)
            .then(response => response.json())
            .then(data => {
                const views = parseInt(data.items[0].statistics.viewCount)
                if (views > 1000000) {
                    setViewCount(`${Math.round(views/1000000, 1)}M views`)
                } else if (views > 1000) {
                    setViewCount(`${Math.round(views/1000)}K views`)
                } else {
                    setViewCount(`${views} views`)
                }

                const matchedDuration = data.items[0].contentDetails.duration

                const match = matchedDuration.match(/PT(\d+M)?(\d+S)?/);
                const minutes = match[1] ? parseInt(match[1], 10) : 0;
                const seconds = match[2] ? parseInt(match[2], 10) : 0;

                const zeroPad = (num, places) => String(num).padStart(places, '0')

                setDuration(`${minutes}:${zeroPad(seconds, 2)}`)
            })
    }, [])


    // Fetch channel info
    useEffect(() => {
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                setChannelDetails(data.items[0].snippet.thumbnails.default.url)
                const subscriberCount = data.items[0].statistics.subscriberCount;
                if (subscriberCount > 1000000) {
                    setChannelSubscriberCount(`${subscriberCount/1000000}M`)
                } else if (subscriberCount > 1000) {
                    setChannelSubscriberCount(`${subscriberCount/1000}K`)
                } else {
                    setChannelSubscriberCount(subscriberCount)
                }
                
            })
    }, [])

    

    return (
        <div className="video-preview">
                <div className="thumbnail-row">
                    <a href= {`/video/${videoId}`} >
                        <img className="thumbnail" src={thumbnail} />
                    </a>
                    <div className="video-time">
                        {duration}
                    </div>
                </div>

                <div className="Video-info-grid">
                    <div className="Channel-picture">
                        <img className="profile-picture" src={channelDetails} />
                        <div className="channel-profile-details">
                                <div className="tooltip-profile-img-blc">
                                    <img className="profile-picture" src={channelDetails} />
                                </div>
                                <div className="tooltip-profile-info">
                                    <div >
                                        <a className="tooltip-channel-title" href= { `https://www.youtube.com/@${channelTitle}` }>
                                            {channelTitle}
                                        </a>
                                    </div>
                                    <div>
                                        <p className="tooltip-channel-subcunt">
                                            {channelSubscriberCount} subscribers
                                        </p>
                                    </div>
                                </div>
                            </div>    
                    </div>

                    <div className="Video-info">
                        <a className="video-title" href={`/video/${videoId}`}>
                                {title}
                            </a>
                        <a className="video-author" href= { `https://www.youtube.com/@${channelTitle}` } >
                            {channelTitle}
                        </a>
                        <p className="video-stats">
                            {viewCount} &#183; 
                            { 
                                yearsDifference == 0 ?
                                <p>{monthsDifference} months ago</p> :
                                <p>{yearsDifference} year{ yearsDifference > 1 && "s" } ago</p>
                            }
                        </p>
                    </div>  
                </div>
            </div>
    )
}
