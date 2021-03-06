import React from 'react'
import { useEffect,useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from 'react-router-dom';

function Albums({spotify}) {
    const [{albums,next,isMore},setAlbums] = useState({albums:[],next:0,isMore:true});
    




  const  fetchMoreData = () => {
       if(isMore){
        console.log("called")
        spotify.getMySavedAlbums({limit:30, offset:next}).then(
          function (newData) {
            console.log("new Data: ",newData);
            
            const newAlbums = [...albums,...newData.items]
            const newVal = {albums:newAlbums,next:next+30,isMore:(newAlbums.length !== newData.total)}
            console.log("new Val: ",newVal);
            setAlbums(newVal);
          },
          function (err) {
            console.error(err);
          }
        );
       }
    };

    useEffect(()=>{
      fetchMoreData()
    },[]);  


    return (
        <div>
          <InfiniteScroll
          dataLength={albums.length}
          next={fetchMoreData}
          hasMore={isMore}
          loader={<h4>Loading..</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="album py-5 bg-light">
    <div className="container">
      <div className="row">
          {albums.map((album,index)=>{
                return ( 

                <div  className="col-md-3" key={album.album.uri}>
                    <div className="card mb-4 shadow-sm">
                        <img   src={album.album.images[0].url}  className="img-fluid" alt={album.album.name}/>
                        <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                            <Link to={{  pathname: '/album/'+album.album.id }}><button type="button" className="btn btn-sm btn-outline-secondary">View</button></Link>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small className="text-muted">9 mins</small>
                        </div>
                        </div>
                    </div>
                    </div>

                 )
        })}
        </div>
        </div>
        </div>
        </InfiniteScroll>
          
           </div>

      
    )
}

export default Albums
