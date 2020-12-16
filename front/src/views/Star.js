import React ,{useState} from 'react'
import StarRate from './StarRate'

function Star() {
    const [idx, setIdx] = useState(0);
    const [rating, setRating] = useState(0);
    const [cacheIdx, setCacheIdx] = useState(0);
    const [cacheRating, setCacheRating] = useState(0);
    const [rated, setRated] = useState(false);

    const _mouseOver = (e,i) => {
        if(!rated){
          e.persist()
          let offsetX = e.nativeEvent.offsetX; 
          let clientX = e.target.clientWidth;
      
          if(offsetX > clientX / 2){
            let value = 2;
            setIdx(i);
            setRating(value);
          }else{
            let value = 1;
            setIdx(i);
            setRating(value);
          }
        }
      }
    
    const handleChange = (i,v,b) => {
        if(b){
            setIdx(0);
            setRating(0);
            setCacheIdx(i);
            setCacheRating(v);
            setRated(true);
            console.log(`i : ${i}`);
            console.log(`v : ${v}`);
        }
      }

    return (
        <StarRate 
          _mouseOver={_mouseOver}
          onChange={handleChange} 
          idx={idx} 
          rating={rating}         
          cacheIdx={cacheIdx}         
          cacheRating={cacheRating} 
        />
    )
}


export default Star
