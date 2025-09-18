<form id="art-department-form">
    <div class="user-tip-message">
        <label for="user-tip"><strong>To select items, choose from categories below.</strong></label>
        <button type="button" id="share-page-link" class="share-button" title="Share this page">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.6 20.92,19A2.84,2.84 0 0,0 18,16.08Z"/>
            </svg>
            Share
        </button>
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