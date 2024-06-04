import React from 'react'
import likeButton from "../assets/icons/like.png"
import dislikeButton from "../assets/icons/dislike.png"
import threeDots from "../assets/icons/threeDots.png"
import "./VideoPage/VideoPage.css"


export default function Comment({ profileImg, likeCount, displayName, textDisplay, replyCount, publishedAt }) {
  return (
    <div class="public-comments">
        <div>
            <img class="comment-profile-picture" src={ profileImg } />
        </div>
        <div class="public-info-stats">
            <div>
                <p style={{ fontFamily: "Roboto", fontSize: "13px", fontWeight: "500"}}>
                    <span style={{ fontWeight: "500" }}></span>{ displayName } <span style={{ fontSize: "12px", fontFamily: "Roboto", color: "grey", fontWeight: "400" }}>{ publishedAt }</span>
                </p>
            </div>
            <div style={{ marginTop: "10px" }}>
                <p style={{ fontFamily: "Roboto", fontSize: "14px" }}>
                    { textDisplay }
                </p>
            </div>
            <div class="comment-actions">
                <div>
                    <button class="comment-reaction-btn">
                        <img class="comment-reaction" src={ likeButton } />
                    </button>
                </div>
                <div>
                    <p style={{ fontSize: "12px", color: "rgba(26, 26, 26, 0.7)", marginRight: "5px" }}>
                        { likeCount }
                    </p>
                </div>
                <div>
                    <button class="comment-reaction-btn">
                        <img class="comment-reaction" src={ dislikeButton } />
                    </button>
                </div>
                <div>
                    <button class="reply-btn">
                        Reply
                    </button>
                </div>
            </div>
        </div>
        <div>
            <button class="comment-options">
                <img class="Options-icon" src={ threeDots } />
            </button>
        </div>
    </div>
  )
}
