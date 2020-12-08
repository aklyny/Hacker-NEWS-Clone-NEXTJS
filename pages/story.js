import React,{Component} from 'react';
import Layout from '../components/layout'
import Head from 'next/head';
import fetch from 'isomorphic-fetch';
import renderHTML from 'react-render-html';
class Story extends Component{
    static async getInitialProps({req,res,query}){
        let story;

        try{
        const storyId = query.id;
        const data = await fetch(`https://node-hnapi.herokuapp.com/item/${storyId}`)
         story = await data.json()
        }
        catch(err){
            console.log(err)
        }
        return{
            story
        }
    }
    render(){
        const story = this.props.story;
        const comments = story.comments;
        const renderComments =(comments)=>(
            comments.map(data=>(
                <div key={data.id} className="story__com">
                    <h3><strong className="story__user"> {data.user}</strong></h3>
                    <strong className="story__time">{data.time_ago}</strong>
                    <br/>
                    <p>{renderHTML(data.content)}</p>
                </div>
                       
                    
            ))
        )
        return(
            <Layout backButton={true}>
                <Head>
                    <title>{story.title}</title>
                </Head>
                <h1 className="story__head">{story.title}</h1>
                    <div className="story__sub">
                        <strong><p>{story.points} points</p></strong>
                        <strong><p className="story__comment">{story.comments_count} comments</p></strong>
                        <strong><p>{story.time_ago}</p></strong>
                    </div>  
                <h1>Comments Section:{story.comments_count} comments</h1>
                        {renderComments(comments)}
                <style>
                    {
                        `
                        .story__head{
                            text-align:center;
                            color:red;
                        }
                        .story__sub{
                             display:flex;
                              
                        }
                        .story__sub {
                            text-align:center;
                            justify-content:center;
                            align-items:center; 
                            margin-bottom:40px; 
                            border-bottom:1px solid black;
                        }
                        .story__sub p{
                            margin-left:20px;
                            font-size:18px;
                        }
                        .story__comment{
                            color:blue;
                        }
                        strong{
                            margin-left:10px;
                         }
                        .story__time{
                            float:right;
                        }
                        .story__user{
                            color:green;
                            float:left;
                        }
                        .story__com{
                            border-bottom:1px solid #d2d2d2;
                            text-align:center;
                            width:70%;
                            margin: 0px auto;
                        }
                        `
                    }
                </style>
            </Layout>
        )
    }
}

export default Story;