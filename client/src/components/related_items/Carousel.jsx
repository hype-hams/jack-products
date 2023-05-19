import React, {useState, useEffect, Children, cloneElement} from 'react';


const Carousel = ({startIndex, setStartIndex, lastIndex, setLastIndex, maxIndex, children}) => {
    // const [index, setIndex] = useState(0);
    
    const handleLeftClick = (e) => {
        if(startIndex > 0){
            setStartIndex(startIndex - 1);
            setLastIndex(lastIndex-1)
        }
    }

    const handleRightClick = (e) => {
        if(lastIndex < maxIndex){
            setStartIndex(startIndex + 1);
            setLastIndex(lastIndex+1)
        }
    }

    const style = {
        transform : `translateX(-$500%)`
    }

    return (
        <div className='carousel'>
            {startIndex > 0 ? <button className='scroll-left' onClick={handleLeftClick}> {'<'} </button>: null}
            {lastIndex < maxIndex ? <button className='scroll-right' onClick={handleRightClick}> {'>'} </button>: null}
                <div className='inner-carousel' style={style}>
                    {/* {Children.map(children, (child,index)=>{
                        return cloneElement(child, {width: '100%'})
                    })}; */}
                    {children}
                </div>
           
        </div>
    ) 
}


export default Carousel;