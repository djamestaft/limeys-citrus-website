<?php
if (is_dir($folder_path)) {
    // Get all directories within the folder
    $dirs = array_filter(glob($folder_path . '*'), 'is_dir');

    // Loop through each folder
    foreach ($dirs as $dir) {
        $folder_name = basename($dir);
        echo '<div class="folder">';
        echo '<h3 class="collapsible category-accordian">' . ucfirst(str_replace('-', ' ', $folder_name)) . '</h3>';
        echo '<div class="content" style="display:none;">';

        // Get all images in the folder (jpg, jpeg, png)
        $images = array_merge(
            glob($dir . '/*.jpg'),
            glob($dir . '/*.jpeg'),
            glob($dir . '/*.png')
        );

        if ($images) {
            echo '<p class="help-text"><strong>To select or deselect items:</strong> Use the + and - buttons below each product to select your desired item and adjust the quantity.</p>';
            echo '<div class="image-grid">';
            foreach ($images as $image) {
                $image_name = basename($image, '.' . pathinfo($image, PATHINFO_EXTENSION));
                $formatted_name = ucfirst(str_replace('-', ' ', $image_name));
                echo '
                    <div class="image-item">
                        <img src="' . content_url('/uploads/art-department/' . $folder_name . '/' . basename($image)) . '" alt="' . $formatted_name . '" class="selectable-image previewable-image" data-full="' . content_url('/uploads/art-department/' . $folder_name . '/' . basename($image)) . '">
                        <p class="order-item-description">' . $formatted_name . '</p>
                        <div class="quantity-selector">
                            <button class="quantity-down">-</button>
                            <input type="number" value="0" class="quantity-input" min="0">
                            <button class="quantity-up">+</button>
                        </div>
                    </div>';
            }
            echo '</div>';
        }
        echo '</div></div>';
    }
} else {
    echo '<p>No folders found.</p>';
}

// At the end of the file, add the modal HTML
?>
<div id="image-preview-modal" class="image-preview-modal" style="display:none;">
    <span class="image-preview-close">&times;</span>
    <img class="image-preview-content" id="image-preview-content" src="" alt="Preview">
</div> 