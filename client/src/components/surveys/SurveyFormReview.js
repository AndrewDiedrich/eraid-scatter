//shows user inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
//withRouter so we can hook up history and navigate to dashboard after submitting survey
//withRouter is used to programmatic nav instead of with event handlers or buttons
//does not pass down router from SurveyNew so need to use with action creator after submitted survey
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

//props passed down from SurveyNew
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const renderList = _.map(formFields, ({name, label})=> { 
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    });
    
    
    //console.log(onCancel);
    return (
        <div>
            <h5>Please CONFIRM Your Survey Entries!</h5>
            {renderList}
            <button 
                className="yellow darken-3 btn-flat"
                onClick={onCancel}
            >
                Edit
            </button>
            <button //submitSurvey action creator passed in as a prop from connect function
                onClick={() => submitSurvey(formValues, history)} 
                className="green white-text btn-flat right">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

//name of form from SurveyForm comp and reduxForm component
function mapStateToProps(state) {
    //console.log(state); //formValues passed as props to functional component
    return { formValues: state.form.surveyForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));