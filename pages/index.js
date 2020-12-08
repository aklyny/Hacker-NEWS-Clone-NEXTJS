import React,{Component} from 'react'
import Layout from '../components/layout'
import Head from 'next/head';
import fetch from 'isomorphic-fetch';
import Link from 'next/link'
class Index extends Component{
    state = {
        num:1
    }
    static async getInitialProps({req,res,query}){
        const request = await fetch('https://node-hnapi.herokuapp.com/news?page=1')
        const response = await request.json()
        let page = Number(query.page) || 1
        return{
         response,
         page
        }
    }
    render(){
        const news = this.props.response;
        const {page} = this.props;
        const renderNews =(newsData)=>(
            newsData.map((news)=>(
                <div key={news.id} className="news__component">
                    <Link href={`/story?id=${news.id}`}><h1 className="news__header">{news.title}</h1></Link>
                    <div className="news__sub">
                        <p className="comment">{news.points} points</p>
                        <p>{news.comments_count} Comments</p>
                    </div>
                </div>
            ))
        )
        return(
            <Layout page={page}>
            <Head>
                <title>Hacker NEWS : HOME</title>
            </Head>
                <Link href="/story"><p>Stories</p></Link>
                {renderNews(news)}

                <Link href={`/?page=${page+1}`}><p className="nav__link">Next Page</p></Link>
                <Link href={ page == 1 || page == 2  ? `/`: `/?page=${page-1}`}>{page > 1? <p className="nav__link" >Prev Page</p>:''}</Link>
                <style>
                    {`
                      .nav__link{
                          color:orange;
                          display:flex;
                      }  
                      .nav__link:hover{
                          color:black;
                          cursor:pointer;
                      }
                      .news__component{
                          backgroung:#fff;
                          margin-left:40px;
                          border-bottom:1px solid black;
                      }
                      .news__header{
                          font-weight:200;
                          color:#d6d6d6;
                          font-size:28px;
                      }
                      .news__header:hover{
                          cursor:pointer;
                          color:orange;
                      }
                      .news__sub{
                          display:flex;
                          color:blue;
                          margin:20px;
                      }
                      .news__sub p{
                          margin-left:12px;
                      }
                      .comment{
                          color:black;
                      }
                    `}
                </style>
            </Layout>
        )
    }
}


export default Index;