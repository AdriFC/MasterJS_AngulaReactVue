import React, { Component } from "react";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import Global from "../Global";
import Sidebar from "./Sidebar";
import Moment from "react-moment";
import "moment/locale/es";
import imageDefault from "../assets/images/no-image.jpg";

class Article extends Component {
    url = Global.url;

    state = {
        article: false,
        status: null,
    };

    componentDidMount() {
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id;
        axios.get(this.url + "article/" + id).then((res) => {
            this.setState({
                article: res.data.article,
                status: "success",
            });
            
        }).catch(err => {
            this.setState({
                article: false,
                status: "success",
            });
        });
    };

    deleteArticle = (id) => {
        axios.delete(this.url + 'article/' + id)
            .then( res => {

                this.setState({
                    article: res.data.article,
                    status: 'deleted'
                });
            });
    }

    render() {

        if(this.state.status === 'deleted'){
            return <Redirect to="/blog" />
        }

        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    {
                    this.state.article && (
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                            {
                                article.image !== null ? (
                                    <img src={this.url + "get-image/" + article.image} alt={article.title}></img>
                                ) : (
                                    <img src={imageDefault} alt={article.title}></img>
                                )
                            }
                            </div>
                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>{article.date}</Moment>
                            </span>
                            <p>
                               {article.content}
                            </p>
                            
                            <button onClick={
                                () => {
                                    this.deleteArticle(article._id)
                                }
                            } 
                            className="btn btn-danger">Eliminar</button>
                            
                            <button className="btn btn-warning">Editar</button>

                            <div className="clearfix"></div>
                        </article>
                    )
                    }

                    {!this.state.article && this.state.status === "success" &&
                        <div id="article">
                            <h2 className="subheader">El artículo no existe</h2>
                            <p>Inténtalo de nuevo más tarde</p>
                        </div>
                    }

                    {!this.state.status == null &&
                        <div id="article">
                            <h2 className="subheader">Cargando...</h2>
                            <p>Espere unos segundos!</p>
                        </div>
                    }

                </section>
                <Sidebar />
            </div>
        );
    }
}

export default Article;
