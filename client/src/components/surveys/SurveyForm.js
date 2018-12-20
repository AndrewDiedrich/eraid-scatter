//shwos form for user input
import _ from 'lodash';
import React from 'react';
//redux form basically connect function to getState from redux store
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';



class SurveyForm extends React.Component {
     
    renderFields() { //itterate over list of fields and for every object, create Field 
         return _.map(formFields, ({ name, label}) => {
            return (
                <Field key={name} label={label} name={name} type="text" component={SurveyField} />
            )
        });
    }
        /***Old way */
//         return ( //component= in Field is what type of Html tag we want to render
//             <div>
// ,                <Field label="Survey Title", ,name="title" component={SurveyField}/>
//                 <Field label="Subject Body",, name="subject" component={SurveyField}/>
//                 <Field label="Email Body", name,="body" component={SurveyField}/>
//                 <Field label="Recipient List", name="emails" component={SurveyField}/>
//             </div>
        //)
    //}
    
    render() {  //dont want to call onSurveySubmit instantly and just passing prop from parent
        return ( //this.props.handleSubmit() is provided from reduxForm, button type submit so works to submit form
            <div> 
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel

                    </Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
//take emails entered and run through validateEmails function with the values or empty
    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if(!values[name]) {
            errors[name] = `You must provide a ${name}!`;
        }
    });

    
    return errors;
}

export default reduxForm({
    validate,   
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);