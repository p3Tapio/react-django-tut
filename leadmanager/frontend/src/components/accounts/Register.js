import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages'; 


export class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    }
    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }
    onSubmit = ev => {
        ev.preventDefault();
        if(this.state.password !== this.state.password2) {              // saman voi tehdä const {password, password2} = this.state --> nyt passwordissa/2:ssa on staten passwordien tiedot ja ne voisi verrata 
            this.props.createMessage({passwordsNotMatch: 'Passwords do not match'})
        } else {
            const newUser = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }
            this.props.register(newUser); 
        }
    }
    onChange = ev => this.setState({ [ev.target.name]: ev.target.value })
    render() {
        if(this.props.isAuthenticated) {
            return <Redirect to="/"/>;
        }
        const { username, email, password, password2 } = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" name="username" onChange={this.onChange} value={username} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" onChange={this.onChange} value={email} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" onChange={this.onChange} value={password} />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" name="password2" onChange={this.onChange} value={password2} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, createMessage })(Register); 