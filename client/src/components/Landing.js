import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
    render() {
        return (
            <div style={{ textAlign: 'center'}}>
                <h1>
                    Eraid
                </h1>
                Collect feedback from your users!                                   
                {/* <Link className="btn teal btn-flat right white-text"
                        to={this.props.auth ? '/surveys' : '/'} 
                    ><i class="material-icons left">cloud</i>
                        Survey Dash Board
                </Link> */}
            </div>
        );
    }
};

function mapStateToProps({auth}) {
    return { auth };
}

export default connect(mapStateToProps)(Landing);