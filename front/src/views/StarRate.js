import React from 'react';
import Reset from '../images/reset.svg';
import '../styles/StarRate.css';

function StarRate(props) {
    const _resetRating = (e) => {
        if(e.type === "mouseleave" || e.type === "onTouchEnd"){        
            props.onChange(props.cacheIdx, props.cacheRating);
        }else if(e.type === "click"){
            props.onChange(0,0);
        }    
    }

    const _makeStars = () => {
        let stars = [];
        for(let i = 0; i < 10; i+=2){
            let starClass = "star__rate";
            
            if(props.rating !== 0){
                if (i <= props.idx) {               
                    if(props.idx === i && props.rating % 2 !== 0){
                        starClass += ' is-half-selected';
                    }else{
                        starClass += ' is-selected';
                    }
                }
            }else if(props.cacheRating !== 0){
                if (i <= props.cacheIdx) {            
                    if(props.cacheIdx === i && props.cacheRating % 2 !== 0){
                        starClass += ' is-half-selected';
                    }else{
                        starClass += ' is-selected';
                    }
                }
            }

            stars.push(
                <label key={i} 
                    className={starClass} 
                    onClick={()=>{props.onChange(props.idx,props.rating, true)}}
                    onMouseOver={(e)=>{props._mouseOver(e,i)}}
                    onMouseMove={(e)=>{props._mouseOver(e,i)}}
                    onMouseLeave={(e)=>{_resetRating(e)}}                    
                    onTouchMove={(e)=>{props._mouseOver(e,i)}}
                    onTouchStart={(e)=>{props._mouseOver(e,i)}}
                    onTouchEnd={(e)=>{_resetRating(e)}}
                >
                </label>
            )
        }
        return stars;
    }


    return (
        <div className="starRate__wrap">
            {_makeStars()}
                     
        </div>
    )
}

export default StarRate
