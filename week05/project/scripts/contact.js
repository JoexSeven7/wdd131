/* ============================================
   The Red Gold Hub (TRGH) - Contact Page JavaScript
   Nigeria's Palm Oil Industry Website
   ============================================ */

// ============================================
// DOM Elements Selection
// ============================================

const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");
const accordionHeaders = document.querySelectorAll(".accordion-header");

// ============================================
// Form Validation Functions
// ============================================

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid
 */
function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Validate phone number (Nigeria format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
function validatePhone(phone) {
	if (!phone) return true; // Phone is optional
	const phoneRegex = /^(\+234|0)?[789]\d{9}$/;
	return phoneRegex.test(phone.replace(/\s/g, ""));
}

/**
 * Validate form field
 * @param {HTMLInputElement} field - The input field to validate
 * @returns {Object} Validation result with isValid and message
 */
function validateField(field) {
	const value = field.value.trim();
	const fieldName = field.name;
	const errorElement = document.getElementById(`${field.id}-error`);

	let result = { isValid: true, message: "" };

	// Check required fields
	if (field.hasAttribute("required") && value === "") {
		result.isValid = false;
		result.message = `${getFieldLabel(fieldName)} is required`;
		return result;
	}

	// Email validation
	if (field.type === "email" && value !== "") {
		if (!validateEmail(value)) {
			result.isValid = false;
			result.message = "Please enter a valid email address";
		}
	}

	// Phone validation
	if (field.type === "tel" && value !== "") {
		if (!validatePhone(value)) {
			result.isValid = false;
			result.message = "Please enter a valid Nigerian phone number";
		}
	}

	// Minimum length validation
	if (field.minLength !== undefined && field.minLength !== null && field.minLength > 0 && value.length < field.minLength) {
		result.isValid = false;
		result.message = `${getFieldLabel(fieldName)} must be at least ${field.minLength} characters`;
	}

	// Maximum length validation
	if (field.maxLength !== undefined && field.maxLength !== null && field.maxLength > 0 && value.length > field.maxLength) {
		result.isValid = false;
		result.message = `${getFieldLabel(fieldName)} must not exceed ${field.maxLength} characters`;
	}

	// Display error message
	if (errorElement) {
		errorElement.textContent = result.message;
		errorElement.style.display = result.isValid ? "none" : "block";
		errorElement.style.color = "#dc3545";
	}

	// Set field validity visual state
	if (result.isValid) {
		field.style.borderColor = "var(--color-border)";
	} else {
		field.style.borderColor = "#dc3545";
	}

	return result;
}

/**
 * Get field label from field name
 * @param {string} fieldName - The field name
 * @returns {string} Human-readable label
 */
function getFieldLabel(fieldName) {
	const labels = {
		fullName: "Full name",
		email: "Email address",
		phone: "Phone number",
		organization: "Organization",
		inquiryType: "Inquiry type",
		subject: "Subject",
		message: "Message",
	};
	return labels[fieldName] || fieldName;
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} True if form is valid
 */
function validateForm(form) {
	const fields = form.querySelectorAll("input, select, textarea");
	let isValid = true;

	fields.forEach((field) => {
		if (field.type !== "checkbox" && field.type !== "submit") {
			const result = validateField(field);
			if (!result.isValid) {
				isValid = false;
			}
		}
	});

	return isValid;
}

/**
 * Clear form validation errors
 * @param {HTMLFormElement} form - The form to clear errors from
 */
function clearFormErrors(form) {
	const fields = form.querySelectorAll("input, select, textarea");
	fields.forEach((field) => {
		const errorElement = document.getElementById(`${field.id}-error`);
		if (errorElement) {
			errorElement.textContent = "";
			errorElement.style.display = "none";
		}
		field.style.borderColor = "var(--color-border)";
	});
}

// ============================================
// Form Submission Functions
// ============================================

/**
 * Collect form data
 * @param {HTMLFormElement} form - The form to collect data from
 * @returns {Object} Form data object
 */
function collectFormData(form) {
	const formData = new FormData(form);
	const data = {};

	formData.forEach((value, key) => {
		if (data[key]) {
			if (Array.isArray(data[key])) {
				data[key].push(value);
			} else {
				data[key] = [data[key], value];
			}
		} else {
			data[key] = value;
		}
	});

	return data;
}

/**
 * Handle form submission
 * @param {Event} event - Form submit event
 */
function handleFormSubmit(event) {
	event.preventDefault();

	// Validate form
	if (!validateForm(contactForm)) {
		return;
	}

	// Collect form data
	const formData = collectFormData(contactForm);

	// Save form data to localStorage
	window.TRGH.saveFormData("contactForm", formData);

	// Log form data (for demonstration)
	console.log("Form submitted successfully:", formData);

	// Show success message
	if (formSuccess) {
		formSuccess.style.display = "block";
	}

	// Reset form
	contactForm.reset();
	clearFormErrors(contactForm);

	// Scroll to success message
	formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ============================================
// Real-time Validation Functions
// ============================================

/**
 * Add real-time validation to form fields
 */
function addRealTimeValidation() {
	const fields = contactForm.querySelectorAll("input, select, textarea");

	fields.forEach((field) => {
		if (field.type !== "checkbox" && field.type !== "submit") {
			// Validate on blur
			field.addEventListener("blur", () => {
				validateField(field);
			});

			// Clear error on input
			field.addEventListener("input", () => {
				const errorElement = document.getElementById(`${field.id}-error`);
				if (errorElement && errorElement.textContent !== "") {
					errorElement.textContent = "";
					errorElement.style.display = "none";
					field.style.borderColor = "var(--color-border)";
				}
			});
		}
	});
}

// ============================================
// Accordion Functions
// ============================================

/**
 * Toggle accordion item
 * @param {HTMLElement} header - The accordion header
 */
function toggleAccordion(header) {
	const content = header.nextElementSibling;
	const icon = header.querySelector(".accordion-icon");
	const isExpanded = header.getAttribute("aria-expanded") === "true";

	// Close all other accordions
	accordionHeaders.forEach((otherHeader) => {
		if (otherHeader !== header) {
			const otherContent = otherHeader.nextElementSibling;
			const otherIcon = otherHeader.querySelector(".accordion-icon");
			otherContent.classList.remove("active");
			otherHeader.setAttribute("aria-expanded", "false");
			if (otherIcon) {
				otherIcon.textContent = "+";
			}
		}
	});

	// Toggle current accordion
	if (isExpanded) {
		content.classList.remove("active");
		header.setAttribute("aria-expanded", "false");
		if (icon) {
			icon.textContent = "+";
		}
	} else {
		content.classList.add("active");
		header.setAttribute("aria-expanded", "true");
		if (icon) {
			icon.textContent = "−";
		}
	}

	// Save accordion state to localStorage
	const accordionStates = {};
	accordionHeaders.forEach((h, index) => {
		accordionStates[index] = h.getAttribute("aria-expanded") === "true";
	});
	window.TRGH.saveToLocalStorage("accordionStates", accordionStates);
}

/**
 * Initialize accordion states from localStorage
 */
function initAccordionStates() {
	const savedStates = window.TRGH.getFromLocalStorage("accordionStates");
	if (savedStates) {
		accordionHeaders.forEach((header, index) => {
			if (savedStates[index]) {
				const content = header.nextElementSibling;
				const icon = header.querySelector(".accordion-icon");
				content.classList.add("active");
				header.setAttribute("aria-expanded", "true");
				if (icon) {
					icon.textContent = "−";
				}
			}
		});
	}
}

/**
 * Initialize accordion event listeners
 */
function initAccordionEventListeners() {
	accordionHeaders.forEach((header) => {
		// Click event
		header.addEventListener("click", () => {
			toggleAccordion(header);
		});

		// Keyboard navigation
		header.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				toggleAccordion(header);
			}
		});
	});
}

// ============================================
// Form Auto-fill Functions
// ============================================

/**
 * Auto-fill form from saved data
 */
function autoFillForm() {
	const savedData = window.TRGH.getFormData("contactForm");
	if (savedData) {
		Object.keys(savedData).forEach((key) => {
			const field = contactForm.querySelector(`[name="${key}"]`);
			if (field) {
				if (field.type === "checkbox") {
					field.checked = savedData[key] === "yes";
				} else {
					field.value = savedData[key];
				}
			}
		});
	}
}

// ============================================
// Event Listeners
// ============================================

/**
 * Initialize event listeners for contact page
 */
function initContactPageEventListeners() {
	// Form submission
	if (contactForm) {
		contactForm.addEventListener("submit", handleFormSubmit);
	}

	// Accordion event listeners
	initAccordionEventListeners();
}

// ============================================
// Initialization
// ============================================

/**
 * Initialize the contact page
 */
function initContactPage() {
	// Initialize event listeners
	initContactPageEventListeners();

	// Add real-time validation
	if (contactForm) {
		addRealTimeValidation();
	}

	// Initialize accordion states
	initAccordionStates();

	// Auto-fill form from saved data
	if (contactForm) {
		autoFillForm();
	}

	// Log initialization
	console.log("Contact page initialized successfully");
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initContactPage);
} else {
	initContactPage();
}
