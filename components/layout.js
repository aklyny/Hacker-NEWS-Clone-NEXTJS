import Link from 'next/link';
import Router from 'next/router'

const Layout = ({children,backButton,page})=>{
    return(
        <div>
            <header className="head">{backButton &&  <span onClick={()=>Router.back()} className="back">&#x2b05;</span>}<Link href="/"><p>HACKER NEWS</p></Link></header>
                {children}
            <footer className="foot">&copy; {new Date().getFullYear()}</footer>    

            <style>
                {
                    `
                    .head{
                        background:orange;
                        padding:12px;
                        height:70px; 
                        text-align:center;  
                        color:white; 
                        font-weight:200;
                    }
                    header h1{
                        width:50%;
                    }
                    .back{
                        color:black;
                        float:left;
                        margin-left:20px;
                        font-size:30px;
                    }
                    .back:hover{
                        color:white;
                        cursor:pointer;
                    }
                    header a{
                        margin-bottom:18px;
                    }
                    header p{
                        color:white;
                        font-size:25px;
                        width:40%;
                        margin:0px auto;
                        margin-top:20px;
                    }
                    header p:hover{
                        cursor:pointer;
                        color:red;
                    }
                    .foot{
                        background:orange;
                        padding:12px;
                        height:20px; 
                        text-align:center;  
                        color:white;  
                    }
                    `
                }
            </style>
        </div>
    )
}

export default Layout;