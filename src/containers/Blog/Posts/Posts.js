import React, { Component } from 'react'
import Post from '../../../components/Post/Post'
import './Posts.css'
import axios from 'axios'

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        axios.get('/posts')
            .then(response => {
                 // as this backend is not very flexible, I'm taking all the posts but not storing all
                 // also adding a hard-coded author name after me for all of them
                const posts = response.data.slice(0, 4)
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Anderson C'
                    }
                })
                this.setState({posts: updatedPosts})
            })
            .catch(error => {
                console.log(error)
                // this.setState({error: true})
            })
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    render () {
        let posts = this.state.posts.map(post => {
                        return (
                            <Post
                                key={post.id}
                                title={post.title}
                                author={post.author}
                                clicked={() => this.postSelectedHandler(post.id)}/>
                        )
                    })

        if (this.state.error) {
            posts = <p style={{textAlign: 'center', color: 'red', fontWeight: 'bold'}}>Something went wrong!</p>
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts