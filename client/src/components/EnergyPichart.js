import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getEnergy } from '../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PieChart, Pie, Legend, Tooltip, Cell, Label } from 'recharts';
import { Button, ButtonGroup, Row, Col } from 'react-bootstrap';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


class EnergyPichart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDisplay: 0,
            energyName: '',
        }

    }
    async componentDidMount() {
        await fetch('http://localhost:4001/api/getall', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((resp) => {
                return resp.json();
            })
            .then((result) => {
                this.props.getEnergy(result)
                return result;
            })
    }
    setPercenDisplay(name, val) {


        this.setState({ currentDisplay: val, energyName: name })

    }
    render() {
        return (
            <div className="rowDiv">
                <PieChart width={400} height={400}>
                    <Pie
                        data={(this.props.EnergyList)}
                        dataKey="value"
                        cx={300}
                        cy={150}
                        innerRadius={60}
                        outerRadius={70}
                        fill={'#8884d8'}

                        paddingAngle={2}
                    >
                        <Label
                            value={this.state.currentDisplay + '%'} position="centerBottom" className='label-top' fontSize='27px'
                        />
                        <Label
                            value={this.state.energyName} position="centerTop" className='label'
                        />
                        {
                            this.props.EnergyList.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    <Tooltip />
                </PieChart>
                <div className="colDiv">
                    <h1>Total Engergy</h1>
                    <h4>{(this.props.TotalEnergy / 15796.1255 || 0).toFixed(4)} kW</h4>
                    <Row>
                        <Col onClick={() => { this.setPercenDisplay('Electricity', this.props.Electricity.value) }}>
                            <h2>Electricity</h2>
                            <h5>{(this.props.Electricity.energy || 0).toFixed(2)} kWh</h5>
                            <h5>{(this.props.Electricity.price || 0).toFixed(2)} THB</h5>
                        </Col>
                        <Col onClick={() => { this.setPercenDisplay('Solar', this.props.Solar.value) }}>
                            <h2>Solar</h2>
                            <h5>{(this.props.Solar.energy || 0).toFixed(2)} kWh</h5>
                            <h5>{(this.props.Solar.price || 0).toFixed(2)} THB</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col onClick={() => { this.setPercenDisplay('Gas', this.props.Gas.value) }}>
                            <h2>Gas</h2>
                            <h5>{(this.props.Gas.energy || 0).toFixed(2)} kWh</h5>
                            <h5>{(this.props.Gas.price || 0).toFixed(2)} THB</h5>
                        </Col>
                        <Col onClick={() => { this.setPercenDisplay('Wind', this.props.Wind.value) }}>
                            <h2>Wind</h2>
                            <h5>{(this.props.Wind.energy || 0).toFixed(2)} kWh</h5>
                            <h5>{(this.props.Wind.price || 0).toFixed(2)} THB</h5>
                        </Col>
                    </Row>
                </div>
            </div>






        );
    }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getEnergy
    }, dispatch)
);

const mapStateToProps = state => {
    return {
        EnergyList: state.energyRc.energyList,
        TotalEnergy: state.energyRc.totalEnergy,
        Electricity: state.energyRc.electricity,
        Solar: state.energyRc.solar,
        Gas: state.energyRc.gas,
        Wind: state.energyRc.wind,
    }

};

EnergyPichart.propTypes = {
};

EnergyPichart.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(EnergyPichart);