import { modalAssignmentNewHtml } from '../components/modalAssignmentNewHtml.js'
import { datePickerRangeRender } from '../views/datePicker.js'

/** assignment plan render */
export function assignmentNewRender() {
    const assignmentNew = document.getElementById('modal-open-assignment-new');
    assignmentNew.innerHTML = modalAssignmentNewHtml();

    datePickerRangeRender('assignment-new-date-range');
    //datePickerRender('assignment-new-date-end');
    
}