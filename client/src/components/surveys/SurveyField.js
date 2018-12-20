//SurveyField contains logic to render a single
//label and text input
import React from 'react';


export default ({ input, label, meta: { error, touched } }) => {
    //props from reduxForm Field tag passed in from SurveyForm
    //console.log(meta);
    return ( //...input brings in all event handlers
        <div> 
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px'}}/>
            <div className="red-text" style={{ marginBottom: '20px'}}>
                {touched && error}
            </div> 
        </div> //boolean statment if touched true then through error, starts false on input tag
    );
};