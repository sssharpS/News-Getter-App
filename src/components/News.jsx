import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import PropTypes from "react";
import Spinner from "./Spinner";

export default class News extends Component {
  //static properties
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  // static propTypes = {
  //   country: PropTypes.string,
  //   pageSize: PropTypes.number,
  //   category: PropTypes.string,
  // };

  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    this.setState({
      loading:true
     });
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79a2a512723d4331bf9f2aaeb7b85606&pageSize=${this.props.pageSize}`
    );
    let parseData = await data.json();
    // console.log(news);
    this.setState({
      article: parseData.articles,
      loading:false,
      totalArticles: parseData.totalResults,
    });
  }

  handlePrev = async () => {
     this.setState({
      loading:true
     });
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=79a2a512723d4331bf9f2aaeb7b85606&page=${
        this.state.page - 1
      }&pageSize=${this.props.pageSize}`
    );
    let parseData = await data.json();
    this.setState({
      article: parseData.articles,
      page: this.state.page - 1,
      loading:false
    });
  };

  handleNext = async () => {
    this.setState({
      loading:true
    });
    //check end points page and page size
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=79a2a512723d4331bf9f2aaeb7b85606&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`
    );
    let parseData = await data.json();
    // console.log(this.state.page);
    this.setState({
      article: parseData.articles,
      page: this.state.page + 1,
      loading:false
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsGetter-Top Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className="container">
          <div className="row">
            {this.state.article.map((element, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItem article={element} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between m-2">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrev}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalArticles / 20)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            Next&rarr;
          </button>
        </div>
      </>
    );
  }
}
