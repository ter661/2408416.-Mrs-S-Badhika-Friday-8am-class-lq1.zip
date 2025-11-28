/* Name: Terel Wallace, 
ID-No.: 2408416, 
Day/Time of Class: Mrs S Badhika Friday@ 8am class */


const LOCAL_STORAGE_KEY = '2408416'; 

// Create an array, to store all the products currently being processed.
let AllProducts = [];

// Helper function to update the UI list
const updateProductListUI = () => {
    const listContainer = document.getElementById('product-list-container');
    listContainer.innerHTML = ''; // Clear previous list

    // 48. When the page loads, retrieve and display any previously saved products, on the list.
    if (AllProducts.length === 0) {
        listContainer.innerHTML = '<p>No products added yet.</p>';
        return;
    }

    AllProducts.forEach(product => {
        // Ensure that product.pricePerUnit is a number before calculation
        const price = parseFloat(product.pricePerUnit); 
        const itemTotal = (product.quantity * price).toFixed(2);
        
        const productEntry = document.createElement('p');
        productEntry.textContent = `${product.name} - Quantity: ${product.quantity}, Price: $${price.toFixed(2)}, Total: $${itemTotal}`;
        listContainer.appendChild(productEntry);
    });
};

// Helper function to save the array to Local Storage
const saveProducts = () => {
    // 46. Save the array to local storage, so that it persists across page reloads.
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(AllProducts)); 
};

// When the page loads, retrieve and display any previously saved products, on the list.
const loadProducts = () => {
    const savedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedProducts) {
        // Parse the JSON string back into the AllProducts array
        AllProducts = JSON.parse(savedProducts); 
        updateProductListUI();
        // Set the grand total to $0.00 upon loading
        document.getElementById('grand-total-display').textContent = 'Total: $0.00';
    }
};

// When the user clicks "Add Product," use a function called AddProduct.
const AddProduct = () => {
    // Check that each product input (product name, quantity, price per unit) is filled; ie not empty.
    const nameInput = document.getElementById('item-name');
    const quantityInput = document.getElementById('quantity');
    const priceInput = document.getElementById('price-per-unit');

    let isValid = true;

    // Reset error messages
    document.getElementById('error-name').textContent = '';
    document.getElementById('error-quantity').textContent = '';
    document.getElementById('error-price').textContent = '';

    // Validation 
    if (!nameInput.value.trim()) {
        // 35. Display custom error messages if any required input is missing.
        document.getElementById('error-name').textContent = 'Item Name is required.'; 
        isValid = false;
    }
    
    // Check for empty or non-positive quantity
    if (!quantityInput.value || parseFloat(quantityInput.value) <= 0) { 
        document.getElementById('error-quantity').textContent = 'Quantity must be a positive number.'; 
        isValid = false;
    }
    
    // Check for empty or non-positive price
    if (!priceInput.value || parseFloat(priceInput.value) <= 0) {
        document.getElementById('error-price').textContent = 'Price Per Unit must be a positive number.'; 
        isValid = false;
    }
    
    if (!isValid) {
        return; // Stop if validation fails
    }

    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value);
    // Use the raw float value for storage/calculation to maintain precision
    const pricePerUnit = parseFloat(parseFloat(priceInput.value).toFixed(2)); 

    // Create an object for each product, called Product.
    const Product = {
        name: name,
        quantity: quantity,
        pricePerUnit: pricePerUnit, 
        // calculated total price for each product 
        totalPrice: quantity * pricePerUnit 
    };

    // Store each product as an object in the AllProducts array.
    AllProducts.push(Product);

    // Save array to local storage
    saveProducts();

    // add and display the product to the list.
    updateProductListUI();

    // Clear the form fields after adding
    nameInput.value = '';
    quantityInput.value = '';
    priceInput.value = '';

    // Reset grand total display to $0.00, as total hasn't been re-calculated yet 
    document.getElementById('grand-total-display').textContent = 'Total: $0.00'; 
};

// When the user clicks "Calculate Total," use a function called CalculatePrice.
const CalculatePrice = () => {
    let grandTotal = 0;

    // Calculate sum of all product totals
    AllProducts.forEach(product => {
        // Recalculating here for robustness, ensure pricePerUnit is treated as a number
        grandTotal += product.quantity * parseFloat(product.pricePerUnit); 
    });

    // calculate and display the grand total price all product(s) currently in the list.
    document.getElementById('grand-total-display').textContent = `Total: $${grandTotal.toFixed(2)}`; 
};

// When the user clicks ‘Clear List”, use a function called ClearList.
const ClearList = () => {
    // Clear the AllProducts array
    AllProducts = []; 
    // Clear local storage
    localStorage.removeItem(LOCAL_STORAGE_KEY); 

    // clear the UI of the list of products and the total.
    updateProductListUI(); 
    document.getElementById('grand-total-display').textContent = 'Total: $0.00'; 
};
