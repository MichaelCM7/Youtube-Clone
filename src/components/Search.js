import React, { useEffect, useState } from 'react'
import SearchResult from './SearchResult/SearchResult'
import { useParams } from 'react-router-dom'

export default function Search() {

    const [searchResults, setSearchResults] = useState([])

    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

    let { query } = useParams()

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${query}&maxResults=20&type=video`)
                if (!response.ok) {
                    return alert("Network error!");
                }
                const data = await response.json()

                setSearchResults(data.items)
            } catch(e) {

            }
        }

        fetchSearchResults();
    }, [query])

    return (
        <div>
            {
                searchResults && searchResults.map(result => (
                    <>
                        <SearchResult 
                            thumbnail = {result.snippet.thumbnails.medium.url}
                            title = {result.snippet.title}
                            channelTitle = {result.snippet.channelTitle}
                            description = {result.snippet.description}
                            publishTime= {result.snippet.publishTime}
                            channelId = {result.snippet.channelId}
                            videoId = {result.id.videoId}
                        />
                    </>
                ))
            }

        </div>
    )
}