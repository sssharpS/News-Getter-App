import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    const { title, description, url, urlToImage,author,publishedAt} = this.props.article;
    const {name}=this.props.article.source;
    return (
      <>
       <div  className='my-3'>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}> {name   }
                        </span>
          <img
            src={
              !urlToImage
                ? "https://img.freepik.com/free-vector/realistic-news-studio-background_52683-103246.jpg?size=626&ext=jpg&ga=GA1.1.707039515.1707967257&semt=ais"
                : urlToImage
            }
            className="card-img-top"
            alt="text"
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            {/* <p className="card-text"><small>By {!author?'None':author} on {publishedAt}</small></p> */}
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(publishedAt).toGMTString()}</small></p>
            <a rel="noreferrer" href={url} target='_blank' className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
        </div>
      </>
    );
  }
}
