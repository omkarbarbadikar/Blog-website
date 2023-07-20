import React from 'react';
import { useState } from 'react';
import BlogContext from './blogContex';

 const BlogState=(props)=>{

    const [userInfo,setUserInfo]=useState({});
    
    return(
        <BlogContext.Provider value={{userInfo,setUserInfo}}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState;