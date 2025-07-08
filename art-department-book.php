<?php
/**
 * Plugin Name: Art Department Plugin
 * Description: Displays images from folders in a collapsible section with selectable items and email functionality.
 * Version: 1.5
 * Author: Nathan Courtney
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Handles the AJAX request for the Art Department booking form.
 *
 * Receives form data, sanitizes inputs, composes an email, and sends it to the main recipient and CCs.
 * Responds with JSON success or error for AJAX.
 */
function art_department_handle_form() {
    // Check if the correct AJAX action is set
    if (isset($_POST['action']) && $_POST['action'] === 'art_department_email') {
        // Sanitize and retrieve form fields
        $name = sanitize_text_field($_POST['name']);
        $email = sanitize_email($_POST['email']);
        $phone = sanitize_text_field($_POST['phone']);
        $hire_start = sanitize_text_field($_POST['hire_start']);
        $hire_start_formatted = date("j F Y", strtotime($hire_start)); 
        $hire_end = sanitize_text_field($_POST['hire_end']);
        $hire_end_formatted = date("j F Y", strtotime($hire_end));
        $notes = sanitize_textarea_field($_POST['notes']);
        $selectedImages = sanitize_textarea_field($_POST['selected_images']);

        // Convert selected images string to array
        $imageArray = preg_split('/[\r\n,]+/', $selectedImages);

        // Prepare email
        $to = 'rentals@stratosphere.co.za'; // Main recipient
        $subject = "Art Department Booking Request by {$name}";
        $body = "Name: {$name}\n";
        $body .= "Email: {$email}\n";
        $body .= "Phone: {$phone}\n";
        $body .= "Hire Dates: {$hire_start_formatted} to {$hire_end_formatted}\n";
        $body .= "Notes: {$notes}\n\n";
        $body .= "Selected Products:\n";
        foreach ($imageArray as $image) {
            $body .= "- " . trim($image) . "\n";
        }
        $body .= "\n";
        // Add the thank-you message and the signature
        $body .= "\n\nThank you for your request, we shall contact you shortly.\n\n";
        $body .= "Best regards,\n";
        $body .= "The Stratosphere Team\n";
        $body .= "Stratosphere Rentals\n";
        $body .= "info@stratosphere.co.za\n";
        $body .= "www.stratosphere.co.za"; // Add your website or contact details here

        // Set email headers
        $headers = [
            'From: Stratosphere Rentals <rentals@stratosphere.co.za>',  
            'CC: ' . $email,                   // Add user's email to CC
            'CC: rentals@stratosphere.co.za',      // Include additional CC
            'CC: jeff@stratosphere.co.za'      // Add Jeff's email to CC
        ];

        // Send the email and respond to AJAX
        if (wp_mail($to, $subject, $body, $headers)) {
            wp_send_json_success();
        } else {
            wp_send_json_error();
        }
    }
}
// Hook for handling AJAX request
add_action('wp_ajax_art_department_email', 'art_department_handle_form');
add_action('wp_ajax_nopriv_art_department_email', 'art_department_handle_form');

/**
 * Renders the Art Department booking form by including the template file.
 */
function art_department_render_form() {
    $template = plugin_dir_path(__FILE__) . 'templates/art-department-form.php';
    if (file_exists($template)) {
        ob_start();
        include $template;
        return ob_get_clean();
    }
    return '<!-- Art Department form template not found -->';
}

/**
 * Renders the Selected Items floating box by including the template file.
 */
function art_department_render_selected_items_box() {
    $template = plugin_dir_path(__FILE__) . 'templates/art-department-selected-items-box.php';
    if (file_exists($template)) {
        ob_start();
        include $template;
        return ob_get_clean();
    }
    return '<!-- Selected Items box template not found -->';
}

/**
 * Renders the image grid/category section by including the template file.
 *
 * @param string $folder_path The path to the art department images folder.
 * @return string The rendered HTML for the image grid.
 */
function art_department_render_image_grid($folder_path) {
    $template = plugin_dir_path(__FILE__) . 'templates/art-department-image-grid.php';
    if (file_exists($template)) {
        ob_start();
        include $template;
        return ob_get_clean();
    }
    return '<!-- Image grid template not found -->';
}

function art_department_shortcode($atts) {
    $output = '';

    

    // Define the folder path on the server where the images are stored.
    $folder_path = ABSPATH . 'wp-content/uploads/art-department/'; // Change this to your folder.

    // Add the form for name, email, and selected images
    $output .= art_department_render_selected_items_box();
    $output .= art_department_render_form();

    // Check if the folder exists
    if (is_dir($folder_path)) {
        // Get all directories within the folder
        $dirs = array_filter(glob($folder_path . '*'), 'is_dir');

        // Loop through each folder
        foreach ($dirs as $dir) {
            $folder_name = basename($dir);
            $output .= '<div class="folder">';
            $output .= '<h3 class="collapsible category-accordian">' . ucfirst(str_replace('-', ' ', $folder_name)) . '</h3>';
            $output .= '<div class="content" style="display:none;">';

            // Get all images in the folder (jpg, jpeg, png)
            $images = array_merge(
                glob($dir . '/*.jpg'),
                glob($dir . '/*.jpeg'),
                glob($dir . '/*.png')
            );

            if ($images) {
                $output .= '<p class="help-text"><strong>To select or deselect items:</strong> Use the + and - buttons below each product to select your desired item and adjust the quantity.</p>';
                $output .= '<div class="image-grid">';
                foreach ($images as $image) {
                    $image_name = basename($image, '.' . pathinfo($image, PATHINFO_EXTENSION));
                    $formatted_name = ucfirst(str_replace('-', ' ', $image_name));
                    $output .= '
                        <div class="image-item">
                            <img src="' . content_url('/uploads/art-department/' . $folder_name . '/' . basename($image)) . '" alt="' . $formatted_name . '" class="selectable-image">
                            <p class="order-item-description">' . $formatted_name . '</p>
                            <div class="quantity-selector">
                                <button class="quantity-down">-</button>
                                <input type="number" value="0" class="quantity-input" min="0">
                                <button class="quantity-up">+</button>
                            </div>
                        </div>';
                }
                $output .= '</div>';
            }
            $output .= '</div></div>';
        }
    } else {
        $output .= '<p>No folders found.</p>';
    }

    // Render the image grid/category section
    $output .= art_department_render_image_grid($folder_path);

    return $output;
}

add_shortcode('art_department', 'art_department_shortcode');

/**
 * Enqueue the Art Department plugin CSS and JS for the frontend.
 */
function art_department_enqueue_assets() {
    wp_enqueue_style(
        'art-department-plugin',
        plugin_dir_url(__FILE__) . 'assets/css/art-department.css',
        [],
        filemtime(plugin_dir_path(__FILE__) . 'assets/css/art-department.css')
    );
    wp_enqueue_script(
        'art-department-plugin',
        plugin_dir_url(__FILE__) . 'assets/js/art-department.js',
        ['jquery'],
        filemtime(plugin_dir_path(__FILE__) . 'assets/js/art-department.js'),
        true
    );
    wp_localize_script('art-department-plugin', 'artDepartmentAjax', [
        'ajaxurl' => admin_url('admin-ajax.php')
    ]);
}
add_action('wp_enqueue_scripts', 'art_department_enqueue_assets');