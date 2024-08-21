import React, { useState, useEffect } from 'react'
import "./SearchResult.css"
import Tags from '../Tags/Tags'
import threeDots from "../../assets/icons/threeDots.png"
import { differenceInMonths, differenceInYears, differenceInCalendarDays } from 'date-fns';

export default function SearchResult({thumbnail, title, channelTitle, description, publishTime, channelId, videoId}) {

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

    const currentTime = new Date();
    const otherTime = new Date(publishTime);
    const yearsDifference = differenceInYears(currentTime, otherTime);
    const monthsDifference = differenceInMonths(currentTime, otherTime);
    const daysDifference = differenceInCalendarDays(currentTime, otherTime);

    const [channelDetails, setChannelDetails] = useState({})

    const [viewCount, setViewCount] = useState("")
    const [duration, setDuration] = useState("")

    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

    useEffect(() => {
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                setChannelDetails(data.items[0].snippet.thumbnails.default.url)
            })
    }, [])

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

  return (
    <main>
        <Tags />

        <div className="Video-preview-results">
            <div className='thumbnail-search-results'>
                <img className="Thumbnail-picture-results" src={thumbnail} />
                <p className="video-time">
                    {duration}
                </p>
            </div>

            <div className="Video-info-results">
                <div className="Title-block">
                    <p className="Video-title-results">
                        <a href={`/video/${videoId}`}>{title}</a>
                    </p>
                </div>
                <div className="Video-stats-block">
                    <p className="Video-stats-results">
                        {viewCount} &#183; 

                        { 
                            monthsDifference == 0 ?
                            <p>{daysDifference} days ago</p> :
                            yearsDifference == 0 ?
                            <p>{monthsDifference} months ago</p> :
                            <p>{yearsDifference} year{ yearsDifference > 1 && "s" } ago</p>
                        }
                    </p>
                </div>
                <div className="Channel-info-block">
                    <div className="Channel-picture-block">
                        <a className="Channel-link" href="">
                            <img className="Profile-pictures" src={channelDetails} />
                        </a>   
                    </div>
                    <div className="Channel-name-bock">
                        <p className="Channel-name">
                            {channelTitle} <span className="Checkmark">✓</span>
                        </p>
                    </div>
                </div>
                <div className="Description-block">
                    <p className="video-description-search">
                        {description}
                    </p>
                </div>
                <div className="Status-block">
                    <p className="Status">
                        New
                    </p>
                </div>
            </div>
            <div>
                <button className="Video-options">
                    <img className="Options-icon" src={threeDots} />
                </button>
            </div>
        </div>
    </main>
  )
}
