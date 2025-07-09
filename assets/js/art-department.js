// Selected Items Box Toggle

document.addEventListener("DOMContentLoaded", function() {
    console.log("Art Department JS loaded!");
    
    // --- Selected Items Box Toggle ---
    function setupSelectedItemsBoxToggle() {
        const toggleButton = document.getElementById("toggle-box");
        const selectedItemsBox = document.getElementById("selected-items-box");
        if (toggleButton && selectedItemsBox) {
            toggleButton.addEventListener("click", function() {
                if (selectedItemsBox.classList.contains("collapsed")) {
                    selectedItemsBox.classList.remove("collapsed");
                    toggleButton.textContent = "Collapse";
                } else {
                    selectedItemsBox.classList.add("collapsed");
                    toggleButton.textContent = "Expand";
                }
            });
        }
    }

    // --- Floating Box Sticky on Scroll ---
    function setupStickySelectedItemsBox() {
        const imageItems = document.querySelectorAll(".image-item");
        imageItems.forEach(item => {
            const img = item.querySelector("img");
        });

        const selectedItemsBox = document.getElementById("selected-items-box");
        if (selectedItemsBox) {
            const initialTop = selectedItemsBox.offsetTop;
            const initialLeft = selectedItemsBox.offsetLeft;
            window.addEventListener("scroll", function () {
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                if (scrollY > initialTop) {
                    selectedItemsBox.style.position = "fixed";
                    selectedItemsBox.style.top = "160px";
                    selectedItemsBox.style.right = "12px;";
                } else {
                    selectedItemsBox.style.position = "absolute";
                    selectedItemsBox.style.top = `${initialTop}px`;
                    selectedItemsBox.style.left = `${initialLeft}px`;
                }
            });
        }
    }

    // --- Date Picker Clicks ---
    function setupDatePickers() {
        const hireEndContainer = document.getElementById("hire-end-container");
        if (hireEndContainer) {
            hireEndContainer.addEventListener("click", function() {
                document.getElementById("hire-end").showPicker();
            });
        }
        const hireStartContainer = document.getElementById("hire-start-container");
        if (hireStartContainer) {
            hireStartContainer.addEventListener("click", function() {
                document.getElementById("hire-start").showPicker();
            });
        }
    }

    // --- Collapsible Categories ---
    function setupCollapsibleCategories() {
        const collapsibles = document.querySelectorAll(".collapsible");
        collapsibles.forEach(collapsible => {
            collapsible.addEventListener("click", function() {
                this.nextElementSibling.style.display = (this.nextElementSibling.style.display === "none") ? "block" : "none";
            });
        });
    }

    // --- Selection, Validation, and AJAX Form Submission ---
    function setupSelectionAndForm() {
        const selectedItemsList = document.getElementById("selected-items-list");
        const selectedImages = [];
        const clearButton = document.getElementById("clear-selection");
        const selectableImages = document.querySelectorAll(".selectable-image");

        selectableImages.forEach(image => {
            const imageItem = image.closest(".image-item");
            const quantityInput = imageItem.querySelector(".quantity-input");
            const quantityUp = imageItem.querySelector(".quantity-up");
            const quantityDown = imageItem.querySelector(".quantity-down");
            const imageName = image.nextElementSibling.textContent;

            function updateSelection() {
                const quantity = parseInt(quantityInput.value, 10);
                const imageDetail = `${imageName} (Quantity: ${quantity})`;
                const index = selectedImages.findIndex(detail => detail.startsWith(imageName));
                if (quantity > 0) {
                    if (index === -1) {
                        selectedImages.push(imageDetail);
                    } else {
                        selectedImages[index] = imageDetail;
                    }
                } else {
                    if (index !== -1) {
                        selectedImages.splice(index, 1);
                    }
                }
                document.getElementById("selected-images").value = selectedImages.join("\n");
                validateFields();
                const selectedItemsBox = document.getElementById("selected-items-box");
                if (selectedImages.length > 0) {
                    selectedItemsBox.style.display = "flex";
                } else {
                    selectedItemsBox.style.display = "none";
                }
                updateFloatingBox();
            }

            function updateFloatingBox() {
                selectedItemsList.innerHTML = "";
                selectedImages.forEach((item, index) => {
                    let li = document.createElement("li");
                    li.style.display = "flex";
                    li.style.alignItems = "center";
                    const imageName = item.split(" (")[0];
                    const quantity = item.match(/\(Quantity: (\d+)\)/)[1];
                    const imageItem = Array.from(selectableImages).find(image =>
                        image.nextElementSibling.textContent === imageName
                    );
                    if (imageItem) {
                        const thumbnail = document.createElement("img");
                        thumbnail.src = imageItem.src;
                        thumbnail.alt = imageName;
                        thumbnail.style.width = "40px";
                        thumbnail.style.height = "40px";
                        thumbnail.style.objectFit = "cover";
                        thumbnail.style.marginRight = "10px";
                        li.appendChild(thumbnail);
                    }
                    const textNode = document.createTextNode(item);
                    li.appendChild(textNode);
                    let removeButton = document.createElement("button");
                    removeButton.textContent = "X";
                    removeButton.style.marginLeft = "10px";
                    removeButton.style.color = "red";
                    removeButton.style.cursor = "pointer";
                    removeButton.style.border = "none";
                    removeButton.style.background = "none";
                    removeButton.style.fontSize = "14px";
                    removeButton.style.margin = "0";
                    removeButton.style.paddingRight = "0";
                    removeButton.addEventListener("click", function () {
                        selectedImages.splice(index, 1);
                        document.getElementById("selected-images").value = selectedImages.join("\n");
                        if (imageItem) {
                            const quantityInput = imageItem.closest(".image-item").querySelector(".quantity-input");
                            quantityInput.value = 0;
                        }
                        updateFloatingBox();
                        validateFields();
                    });
                    li.appendChild(removeButton);
                    selectedItemsList.appendChild(li);
                });
            }

            quantityUp.addEventListener("click", function() {
                quantityInput.value = parseInt(quantityInput.value, 10) + 1;
                updateSelection();
            });
            quantityDown.addEventListener("click", function() {
                if (parseInt(quantityInput.value, 10) > 0) {
                    quantityInput.value = parseInt(quantityInput.value, 10) - 1;
                    updateSelection();
                }
            });
            quantityInput.addEventListener("input", function() {
                if (quantityInput.value === "" || parseInt(quantityInput.value, 10) < 0) {
                    quantityInput.value = 0;
                }
                updateSelection();
            });
        });

        clearButton.addEventListener("click", function() {
            document.querySelectorAll(".quantity-input").forEach(input => {
                input.value = 0;
            });
            selectedImages.length = 0;
            selectedItemsList.innerHTML = "";
            if (selectedImages.length > 0) { updateFloatingBox(); } else {};
        });

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const hireStartInput = document.getElementById("hire-start");
        const hireEndInput = document.getElementById("hire-end");
        const generateButton = document.getElementById("generate-email-link");

        function validateFields() {
            if (
                nameInput.value &&
                emailInput.value &&
                phoneInput.value &&
                hireStartInput.value &&
                hireEndInput.value
            ) {
                generateButton.disabled = false;
            } else {
                generateButton.disabled = true;
            }
        }

        nameInput.addEventListener("input", validateFields);
        emailInput.addEventListener("input", validateFields);
        phoneInput.addEventListener("input", validateFields);
        hireStartInput.addEventListener("input", validateFields);
        hireEndInput.addEventListener("input", validateFields);

        document.getElementById("art-department-form").addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            formData.append("action", "art_department_email");
            fetch(artDepartmentAjax.ajaxurl, {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Email sent successfully!");
                    this.reset();
                    document.getElementById("selected-images").value = "";
                    validateFields();
                } else {
                    alert("Failed to send email. Please try again.");
                }
            })
            .catch(error => {
                console.error("An error occurred:", error);
            });
        });
    }

    // --- Make the DIV element draggable ---
    function setupDraggableSelectedItemsBox() {
        dragElement(document.getElementById("selected-items-box"));
        function dragElement(elmnt) {
            const header = document.getElementById(elmnt.id + "-header");
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (header) {
                header.onmousedown = dragMouseDown;
                header.ontouchstart = dragMouseDown;
            } else {
                elmnt.onmousedown = dragMouseDown;
                elmnt.ontouchstart = dragMouseDown;
            }
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                if (e.type === "touchstart") {
                    pos3 = e.touches[0].clientX;
                    pos4 = e.touches[0].clientY;
                } else {
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                }
                document.onmouseup = closeDragElement;
                document.ontouchend = closeDragElement;
                document.onmousemove = elementDrag;
                document.ontouchmove = elementDrag;
            }
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                let clientX, clientY;
                if (e.type === "touchmove") {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } else {
                    clientX = e.clientX;
                    clientY = e.clientY;
                }
                pos1 = pos3 - clientX;
                pos2 = pos4 - clientY;
                pos3 = clientX;
                pos4 = clientY;
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
            function closeDragElement() {
                document.onmouseup = null;
                document.ontouchend = null;
                document.onmousemove = null;
                document.ontouchmove = null;
            }
        }
    }

    // --- Image Preview Modal ---
    function setupImagePreviewModal() {
        // Create modal and append to body if it doesn't exist
        let modal = document.getElementById('image-preview-modal');
        if (!modal) {
                        // Create modal container
            modal = document.createElement('div');
            modal.id = 'image-preview-modal';
            modal.className = 'image-preview-modal';
            modal.style.display = 'none';

            // Create content wrapper
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'image-preview-wrapper';

            // Create close button
            const closeBtn = document.createElement('span');
            closeBtn.className = 'image-preview-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('title', 'Close');
            closeBtn.setAttribute('aria-label', 'Close modal');

            // Create image element
            const modalImg = document.createElement('img');
            modalImg.className = 'image-preview-content';
            modalImg.id = 'image-preview-content';
            modalImg.src = '';
            modalImg.alt = 'Preview';

            // Assemble modal
            contentWrapper.appendChild(closeBtn);
            contentWrapper.appendChild(modalImg);
            modal.appendChild(contentWrapper);

            // Append directly to body
            document.body.appendChild(modal);
        }

        const modalImg = document.getElementById('image-preview-content');
        const closeBtn = document.querySelector('.image-preview-close');
        const previewableImages = document.querySelectorAll('.previewable-image');

        console.log("Modal:", modal, "ModalImg:", modalImg, "CloseBtn:", closeBtn, "PreviewableImages count:", previewableImages.length);

        if (!modal || !modalImg || !closeBtn) {
            console.log("Missing modal elements - early return");
            return;
        }

        previewableImages.forEach(img => {
            img.addEventListener('click', function(e) {
                console.log("Previewable image clicked:", this);
                e.preventDefault();
                modal.classList.add('active');
                modal.style.display = 'flex';
                modalImg.src = this.getAttribute('data-full');
                modalImg.alt = this.alt || '';
            });
        });

        function closeModal() {
            console.log("Modal closed");
            modal.classList.remove('active');
            modal.style.display = 'none';
            modalImg.src = '';
        }

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
        });
    }

    // --- Initialize all features ---
    setupSelectedItemsBoxToggle();
    setupStickySelectedItemsBox();
    setupDatePickers();
    setupCollapsibleCategories();
    setupSelectionAndForm();
    setupDraggableSelectedItemsBox();
    setupImagePreviewModal();
}); 