import React, { Component } from 'react';
import { addEnergy, postEnergy } from '../actions'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Col, Row } from 'react-bootstrap';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const data01 = [{ key: '0', name: 'Group A', value: 5 }, { key: '1', name: 'Group B', value: 4 },
{ key: '2', name: 'Group C', value: 1 }, { key: '3', name: 'Group D', value: 1 }]

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            name: '',
        }
        this.selectEnergy = this.selectEnergy.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sumitEnergy = this.sumitEnergy.bind(this);
    }

    selectEnergy(name) {
        let value = this.state.value;
        if (name === 'ec') {
            value = this.props.Electricity.value
        }
        if (name === 'sl') {
            value = this.props.Solar.value
        }
        if (name === 'wn') {
            value = this.props.Wind.value
        }

        if (name === 'gs') {
            value = this.props.Gas.value
        }

        let calculateTotalEnergy = value + (this.props.TotalEnergy / 15796.1255);
        if (calculateTotalEnergy > 208.89) {
            alert('Total can not more than 208.89 kW')
        } else {
            if (name) {
                this.props.addEnergy(name, value)
            }
        }
        this.setState({ name });
    }
    handleChange(event) {
        this.setState({ value: parseInt(event.target.value) });
        let calculateTotalEnergy = parseInt(event.target.value) + (this.props.TotalEnergy / 15796.1255);
        if (this.state.name) {
            if (calculateTotalEnergy > 208.89) {
                alert('Total can not more than 208.89 kW')
            } else {
                this.props.addEnergy(this.state.name, parseInt(event.target.value))
            }
        } else {
            console.log('no name')
        }
    }
    sumitEnergy() {

        this.props.postEnergy(this.state.name, this.state.value)
    }
    render() {
        return (

            <Form>
                <Button onClick={() => { this.selectEnergy('ec') }} variant={this.props.InputEnergy.name == "ec" ? "danger" : "primary"} size="lg" block>Electric City</Button>
                <Button onClick={() => { this.selectEnergy('sl') }} variant={this.props.InputEnergy.name == "sl" ? "danger" : "primary"} size="lg" block>Solar</Button>
                <Button onClick={() => { this.selectEnergy('gs') }} variant={this.props.InputEnergy.name == "gs" ? "danger" : "primary"} size="lg" block>Gas</Button>
                <Button onClick={() => { this.selectEnergy('wn') }} variant={this.props.InputEnergy.name == "wn" ? "danger" : "primary"} size="lg" block>Wind</Button>
                <br />
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="number" placeholder="Energy Percentage" onChange={this.handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={() => { this.sumitEnergy() }}>
                    Submit
            </Button>
            </Form>
        );
    }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addEnergy,
        postEnergy
    }, dispatch)
);

const mapStateToProps = state => {
    return {

        Electricity: state.energyRc.electricity,
        Solar: state.energyRc.solar,
        Gas: state.energyRc.gas,
        Wind: state.energyRc.wind,
        InputEnergy: state.energyRc.inputEnergy,
        TotalEnergy: state.energyRc.totalEnergy,
    }

};

InputForm.propTypes = {
    //  InputEnergy: PropTypes.func.isRequired,
};

InputForm.defaultProps = {
    InputEnergy: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);