import React, { Component } from 'react'
import axios from 'axios'
import './FullPost.css'

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate () {
        if (this.props.id) {
            // to prevent infinite requests, we'll just make the request if we don't have any post, or if we do, 
            // the one we have doesn't have the same id as the one that's being passed
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                    .then(response => {
                        this.setState({loadedPost: response.data})
                    })
                    .catch(error => {
                        alert('Failed to get the selected post.\n' + error)
                    })
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
            .then(response => {
                console.log(response)
                alert('Successfully deleted the post.')
            })
            .catch(error => {
                alert('Failed to delete post.\n' + error)
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>

        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>...</p>
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            )
        }

        return post
    }
}

export default FullPost