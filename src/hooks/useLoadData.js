import { useEffect, useState } from 'react';

const useLoadData = (url) => {
    const [foods,setFoods] = useState([]);

    useEffect(()=>{
        fetch(url)
            .then(res => res.json())
            .then(data=>setFoods(data))
    },[url])
    return foods;
};

export default useLoadData;