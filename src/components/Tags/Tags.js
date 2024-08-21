import React from 'react'
import "./Tags.css"

export default function Tags() {
  return (
    <section className="tags-block" id="tags-block">
        <div>
                <button className="tags" style={{ backgroundColor: "black", color: "white" }}>
                    All
                </button>
        </div>

        <div>
            <button className="tags">
                Gaming
            </button>
        </div>

        <div>
            <button className="tags">
                Music
            </button>
        </div>

        <div>
            <button className="tags">
                Sketch comedy
            </button>
        </div>

        
        <div>
            <button className="tags">
                Mixes
            </button>
        </div>

        
        <div>
            <button className="tags">
                Satire
            </button>
        </div>

        <div>
            <button className="tags">
                Computer programming
            </button>
        </div>

        
        <div>
            <button className="tags">
                Parodies
            </button>
        </div>

        
        <div>
            <button className="tags">
                Media theories
            </button>
        </div>

        <div>
            <button className="tags">
                Study skills
            </button>
        </div>

        <div>
            <button className="tags">
                Memes
            </button>
        </div>

        <div>
            <button className="tags">
                Graphic design
            </button>
        </div>

        <div>
            <button className="tags">
                Computer hardware
            </button>
        </div>

        
        <div>
            <button className="tags">
                Smartphones
            </button>
        </div>

        <div>
            <button className="tags">
                Recently uploaded
            </button>
        </div>

        <div>
            <button className="tags">
                Watched
            </button>
        </div>

        <div>
            <button className="tags">
                New to you
            </button>
        </div>

        {/* <div className="edge-btn">
            <button className="scroll-btn">
                >
            </button>
        </div> */}
    </section>
  )
}
