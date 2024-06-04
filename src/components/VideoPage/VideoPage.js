import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import "./VideoPage.css"
import Comment from '../Comment'
import profile from "../../assets/profiles/user.jpg"
import sortIcon from "../../assets/icons/sortIcon.png"
import like from "../../assets/icons/like.png"
import dislike from "../../assets/icons/dislike.png"
import shareIcon from "../../assets/icons/shareIcon.png"
import threeDotsHorizontal from "../../assets/icons/threeDotsHorizontal.png"
import RecommendedVideo from '../RecommendedVideo/RecommendedVideo'
import { differenceInMonths, differenceInYears, differenceInDays } from 'date-fns';

export default function VideoPage() {

    const { id } = useParams()

    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

    const [videoDetails, setVideoDetails] = useState()
    const [channelDetails, setChannelDetails] = useState()
    const [channelId, setChannelId] = useState(null)
    const [commentThreads, setCommentThreads] = useState()
    const [recommendedVideos, setRecommendedVideos] = useState()

    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        const fetchVideoDetails = async () => {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,statistics&id=${id}`)
            const data = await response.json();
            setVideoDetails(data.items)
            setChannelId(data.items[0].snippet.channelId)
        }

        fetchVideoDetails();
    }, [id])

    useEffect(() => {
        const fetchChannelDetails = async () => {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`);
            const data = await response.json();
            setChannelDetails(data.items)
        }

        fetchChannelDetails();
    }, [channelId])


    // Get comment threads
    useEffect(() => {
        fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&part=snippet&videoId=${id}&maxResults=15`)
            .then(response => response.json())
            .then(data => setCommentThreads(data.items))
    }, [])

    // Get recommended videos
    useEffect(() => {
        fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,statistics,contentDetails&type=video&maxResults=15&chart=mostPopular`)
            .then(response => response.json())
            .then(data => setRecommendedVideos(data.items))
    }, [])

    const format = (number) => {
        if (number > 1000000) {
            return `${Math.round(number/1000000)}M`
        } else if (number > 1000) {
            return `${Math.round(number/1000)}K`
        } else {
            return number
        }
    }

    const switchShowMore = () => {
        setShowMore(!showMore)
    }

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
            return `${daysDifference} ${daysDifference > 1 ? "days" : "day"} ago`
        }
    }


    return (
        <main className='Video-play-page'>
            <div className="video-play-area">
                <div className="Video-block">
                    <iframe 
                        style={{ borderRadius: "25px" }}
                        className='video-frame'
                        src={`https://www.youtube.com/embed/${id}`} 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; 
                        autoplay; 
                        clipboard-write; 
                        encrypted-media; 
                        gyroscope; 
                        picture-in-picture; 
                        web-share" allowFullScreen>
                    </iframe>
                </div>
    
                <div>
                    <p className="Video-title-lrg">
                        { videoDetails && videoDetails[0].snippet.title }
                    </p>
                </div>

                <div className="Details-and-actions">
                    <div className="Video-details">
                        <div className='first-details'>
                            <div>
                                <img className="Channel-picture" src={ channelDetails && channelDetails[0].snippet.thumbnails.medium.url } />
                            </div>
                            <div>
                                <p className="Channel-name-lrg">
                                    { videoDetails && videoDetails[0].snippet.channelTitle } <span className="Checkmark-lrg">✓</span>
                                </p>
                                <p className="Stats">
                                    { channelDetails && format(channelDetails[0].statistics.subscriberCount) } subscribers
                                </p>
                            </div>
                        </div>
                        <div>
                            <button className="subscribe-button">
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="Actions">
                            <div className="Rating">
                                <div>
                                    <button className="Likes">
                                            <img className="like-icon" src={ like } />
                                            <p className="like-count">{ videoDetails && format(videoDetails[0].statistics.likeCount) }</p>
                                    </button>
                                </div>
                                <div>
                                    <button className="Dislikes">
                                        <img className="dislike-icon" src={ dislike } />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button className="Share">
                                    <img className="share-icon" src={ shareIcon } />
                                    <p className="share-text">Share</p>
                            </button>
                            </div>
                            <div className="Action-options">
                                <img className="options-icon" src={ threeDotsHorizontal } />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Video-description">
                    <div>
                        <p style={{ fontFamily: "Roboto", fontSize: "14px", fontWeight: "500"}}>
                            { videoDetails && (new Intl.NumberFormat("en-US").format(videoDetails[0].statistics.viewCount))} views 3 weeks ago <span style={{ color: "gray", fontSize: "14px", fontFamily: "Roboto", fontWeight: "bold" }}></span>
                        </p>
                    </div>
                    <div style={{ marginTop: "5px" }}>
                        <p style={{ color: "gray", fontSize: "14px", fontFamily: "Roboto" }}>
                            { videoDetails && videoDetails[0].snippet.description.slice(0, 50) } 
                            { showMore && videoDetails[0].snippet.description.slice(50) }
                            <button className='moreButton' onClick={ () => switchShowMore()}><span style={{ fontSize: "14px", fontFamily: "Roboto", fontWeight: "bold" }} className='more'>{ showMore ? "less" : "...more" }</span></button>
                        </p>
                    </div>
                </div>

                <div className="Comments-title">
                    <div>
                        <p style={{ fontFamily: "Roboto", fontSize: "20px", fontWeight: "bold" }}>
                            { commentThreads ? commentThreads.length : 0 } Comments
                        </p>
                    </div>
                    <div>
                        <button className="Sort-by-button">
                            <img className="sort-by-icon" src={sortIcon} />
                            <p className="sort-by-text">
                                Sort by
                            </p>
                        </button>
                    </div>
                </div>

                <div className="Personal-comment-field">
                    <div>
                        <img className="comment-profile-picture" src={ profile } />
                    </div>
                    <div>
                        <input className="personal-comment-space" type="text" placeholder="Add a comment..." />
                    </div>
                </div>

                { commentThreads && commentThreads.map(comment => (
                        <Comment 
                            profileImg = {comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                            displayName = { comment.snippet.topLevelComment.snippet.authorDisplayName }
                            likeCount = { comment.snippet.topLevelComment.snippet.likeCount }
                            textDisplay = { comment.snippet.topLevelComment.snippet.textDisplay }
                            replyCount = { comment.snippet.totalReplyCount }
                            publishedAt = { findTimeDifference(comment.snippet.topLevelComment.snippet.publishedAt) }
                        />
                ))}

                { !commentThreads && <p>No comments available</p> }
            </div>  

            <div className="video-recommendations">
                { recommendedVideos && recommendedVideos.map(video => (
                    <RecommendedVideo 
                        thumbnail = { video.snippet.thumbnails.medium.url }
                        channelTitle = { video.snippet.channelTitle }
                        title = { video.snippet.title }
                        publishedAt = { video.snippet.publishedAt }
                        channelId = { video.snippet.channelId }
                        duration = { video.contentDetails.duration }
                        videoId = { video.id }
                        viewCount = { video.statistics.viewCount }
                    />
                ))}
            </div>

        </main>
    )
}
