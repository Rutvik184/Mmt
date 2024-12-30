// redux/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    step1: {
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        companyWebsite: '',
        state: '',
        zipCode: '',
    },
    step2: {
        workingFields: [],
        employees: '',
        wfhPolicy: '',
    },
    step3: {
        startPlanDate: '',
        userCount: 1,
        finalPrice: 0,
        planPrice: 0
    },
    id: 0,
    submittedForms: [], // To store completed forms
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        saveStepData: (state, action) => {
            const { step, data, id } = action.payload;
            state[step] = { ...state[step], ...data };
            if (id) {
                state.id = id
            }
        },
        submitForm: (state) => {
            console.log(state.id)
            const completedForm = {
                ...state.step1,
                ...state.step2,
                ...state.step3,
                id: state.id > 0 ? state.id : state.submittedForms.length > 0 ? state.submittedForms[0].id + 1 : 1
            };
            if (state.submittedForms.length > 0) {
                let idx = state.submittedForms.findIndex(val => val.id == completedForm.id)
                if (idx >= 0) {
                    state.submittedForms.splice(idx, 1, completedForm)
                } else {
                    state.submittedForms.unshift(completedForm);
                }
            } else {
                state.submittedForms.unshift(completedForm);
            }
        },
        resetForm: (state) => {
            state.step1 = {
                firstName: '',
                lastName: '',
                email: '',
                companyName: '',
                companyWebsite: '',
                state: '',
                zipCode: '',
            };
            state.step2 = {
                workingFields: [],
                employees: '',
                wfhPolicy: '',
            };
            state.step3 = {
                startPlanDate: '',
                userCount: 1,
                finalPrice: 0,
                planPrice: 0
            };
            state.id = 0
        },
    },
});

export const { saveStepData, submitForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
