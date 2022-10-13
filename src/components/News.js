import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, settotalResults] = useState(0)

    

    

    const CapitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }

    const UpdateNews = async () =>{
        props.setProgress(10);
        // console.log("up")
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`
        // const url = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=6ac1f73fa1c6453ca5f61241e9178e9a&page=1&pagesize=5"
       
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parseddata = await data.json();
        props.setProgress(70);
        console.log(parseddata)

        setArticles(parseddata.articles)
        settotalResults(parseddata.totalResults)
        setLoading(false)
       
        props.setProgress(100);

    }

    useEffect(()=>{
        document.title=`NewsMonkey-${CapitalizeFirstLetter(props.category)}`;
        UpdateNews();
    },[])


    const handlePrevClick= async () =>{    
        
    }

    const handleNextClick= async () =>{
        
    }

   const fetchMoreData = async () => {
        console.log("fetchmoredata");
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`
        setPage(page+1)
        // setState({loading:false})
        let data = await fetch(url);
        let parseddata = await data.json();
        console.log(parseddata)
        setArticles(articles.concat(parseddata.articles))
        settotalResults(parseddata.totalResults)
        
      };

 
    console.log("render")
    return (
      <> 
       <h1 className='text-center' style={{margin:'35px 0px',marginTop:'90px'}}>NewsMonkey-Top {CapitalizeFirstLetter(props.category)} Headlines</h1>
       {loading && <Spinner/>}
       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
                <div className='container'>
                    <div className='row'>
                            {articles.map((element)=>{
                                return <div className='col-md-4' key={element.url}>
                                            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} 
                                            imageurl={element.urlToImage?element.urlToImage:"https://images.hindustantimes.com/tech/img/2022/07/09/1600x900/Nothing_Phone_1_1657348668922_1657348679844.jpg"} newsUrl={element.url}
                                            author={element.author?element.author:"NaN"} date={element.publishedAt} source={element.source.name}/>
                                        </div>

                            })}  
                    </div>  
                </div>
        </InfiniteScroll>   
        {/* <div className='container d-flex justify-content-between'>
        <button type="button" disabled={state.page<=1} className="btn btn-dark" onClick={handlePrevClick}>&larr;Previous</button>
        <button type="button" disabled ={state.page + 1 > Math.ceil(state.totalResults/state.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next&rarr;</button>
        </div> */}
      </>
    )
  
}

News.defaultProps = {
    country:'in',
    pageSize: 8,
    category:'general'
}

News.propTypes = {
    country:PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
