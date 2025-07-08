<form id="art-department-form">
    <div class="user-tip-message">
        <label for="user-tip"><strong>To select items, choose from categories below.</strong></label>
    </div>
    <div class="user-details">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="phone">Phone:</label>
       <input 
            type="text" 
            id="phone" 
            name="phone" 
            required 
            pattern="\d{9,}" 
            title="Please enter at least 9 digits"  
        >

        <div class="date-selection-container">
            <div class="date-container" id="hire-start-container">
                <label for="hire-start" class="date-label">Hire Start Date:</label>
                <input type="date" id="hire-start" name="hire_start" class="date-input" required>
            </div>

            <div class="date-container" id="hire-end-container">
                <label for="hire-end" class="date-label">Hire End Date:</label>
                <input type="date" id="hire-end" name="hire_end" class="date-input" required>
            </div>
        </div>

        <label for="notes">Notes/Comments/Questions:</label>
        <textarea id="notes" name="notes" rows="5" placeholder="Add your notes, comments, or questions here..."></textarea>
    </div>
    <input type="hidden" id="selected-images" name="selected_images">
    <button id="generate-email-link" type="submit" disabled>Send Email</button>
</form>

<div id="email-success-modal" class="modal">
    <div class="modal-content">
        <span class="close-btn">&times;</span>
        <p>Email successfully sent!</p>
    </div>
</div> 