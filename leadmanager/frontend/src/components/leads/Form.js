
import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { postLead } from '../../actions/leads';

export class Form extends Component {
    state = {
        name: "",
        email: "",
        message: ""
    };
    static propTypes = {
        postLead: PropTypes.func.isRequired
    }
    onChange = (ev) => {
        this.setState({ ...this.state, [ev.target.name]: ev.target.value })  // suluilla ei näköjään merkitystä koska alla submit toimii myös
    }
    onSubmit = ev => {
        ev.preventDefault();
        const {name, email, message } = this.state; 
        const lead = {name, email, message}; 
        this.props.postLead(lead);
    }
    render() {
        const { name, email, message } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add lead</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" type="text" name="name" onChange={this.onChange} value={name} />
                        <label>Email</label>
                        <input className="form-control" type="email" name="email" onChange={this.onChange} value={email} />
                        <label>Message</label>
                        <input className="form-control" type="text" name="message" onChange={this.onChange} value={message} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, { postLead })(Form);