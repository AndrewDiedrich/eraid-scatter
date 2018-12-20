//survey new shows surveyForm and FormReview

import React from 'react';
import { reduxForm } from 'redux-form'
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    //inital state to false until errors handled and submitted for review
    state = {
        showFormReview: false
    };

    renderContent() { //if state is true
        if (this.state.showFormReview) {
            return (
                <SurveyFormReview onCancel={() => this.setState({showFormReview: false})} />
            );
        } //when onSurveySubmit callback is triggered flip state to true and render FormReview
        return (
            <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})} />
        );
    }
    
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
};


//component is tied to surveyForm, if component is unmounted then dump values out of form
//basically going to a different url, review component is on same url
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);