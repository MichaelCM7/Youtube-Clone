import React, { useEffect, useState } from 'react'
import "./RecommendedVideo.css"
import { differenceInMonths, differenceInYears, differenceInDays } from 'date-fns';
import threeDots from "../../assets/icons/threeDots.png" 

export default function RecommendedVideo({ thumbnail, channelTitle, title, publishedAt, channelId, duration, videoId, viewCount }) {

    const [channelDetails, setChannelDetails] = useState()

    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

    const findTimeDifference = (publishedAt) => {
        const currentTime = new Date();
        const otherTime = new Date(publishedAt);
        const yearsDifference = differenceInYears(currentTime, otherTime);
        const monthsDifference = differenceInMonths(currentTime, otherTime);
        const daysDifference = differenceInDays(currentTime, otherTime)

        if (yearsDifference > 0) {
            return `${yearsDifference} years ago`
        } else if (monthsDifference > 0) {
            return `${monthsDifference} months ago`
        } else {
            return `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`
        }
    }

    // Fetch channel details for recommended video
    useEffect(() => {
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`)
            .then(response => response.json())
            .then(data => setChannelDetails(data.items))
    }, [])

    const format = (number) => {
        if (number > 1000000000) {
            return `${Math.round((number/1000000000), 2)}B`
        } else if (number > 1000000) {
            return `${Math.round(number/1000000)}M`
        } else if (number > 1000) {
            return `${Math.round(number/1000)}K`
        } else {
            return number
        }
    }

    const getDuration = (duration) => {

        const match = duration.match(/PT(\d+M)?(\d+S)?/);
        const minutes = match[1] ? parseInt(match[1], 10) : 0;
        const seconds = match[2] ? parseInt(match[2], 10) : 0;

        const zeroPad = (num, places) => String(num).padStart(places, '0')

        return `${minutes}:${zeroPad(seconds, 2)}`
    }

  return (
    <div className="Video-preview">
        <div className="Thumbnail">
            <img className="Thumbnail-picture" src={thumbnail} />
            <p className="Video-time">
                { getDuration(duration) }
            </p>
        </div>
        
        <div className="Video-info">
            <div className="Title-block">
                <a className="Video-title" href={`/video/${videoId}/`} style={{ textDecoration: "none", color: "black"}}>
                    { title }
                </a>
            </div>
            <div className="Video-stats-block">
                <p className="Video-stats">
                    { channelDetails && format(viewCount) } views &#46; { findTimeDifference(publishedAt) }
                </p>
            </div>
            <div className="Channel-info-block">
                <div className="Channel-picture-block">
                    <a className="Channel-link" href="">
                        <img className="Profile-pictures" src={channelDetails && channelDetails[0].snippet.thumbnails.default.url} />
                    </a>   
                </div>
                <div className="Channel-name-bock">
                    <p className="Channel-name">
                        { channelTitle } <span className="Checkmark">✓</span>
                    </p>
                </div>
            </div>
            <div className="Status-block">
                <p className="Status">
                    New
                </p>
            </div>
        </div>
        <div>
            <button className="Video-options">
                <img className="Options-icon" src={ threeDots } />
            </button>
        </div>
    </div>
  )
}
