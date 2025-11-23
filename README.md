
# PR-E-COMMERCE-JS

A modern, fully-featured e-commerce web application built with vanilla JavaScript that includes product management, shopping cart functionality, and persistent data storage.

![E-Commerce App Banner](https://img.shields.io/badge/E--Commerce-App-blue?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### Core Functionality
- **Product Management** - Complete CRUD operations (Create, Read, Update, Delete)
- **Shopping Cart System** - Add products, adjust quantities, view totals
- **Product Search** - Real-time search and filtering capabilities
- **Persistent Storage** - All data saved using localStorage
- **Order Summary** - Dynamic price calculation and item count
- **Edit Mode** - Seamlessly edit existing products
- **Responsive Design** - Mobile-first approach, works on all devices
- **Dynamic Rendering** - Efficient DOM manipulation without page reloads

### Technical Highlights
- **Local Storage Integration** - Complete data persistence across sessions
- **State Management** - Centralized product and cart state
- **Event Delegation** - Optimized event handling for dynamic elements
- **Modular Architecture** - Clean, maintainable code structure
- **Form Validation** - Ensures all product details are provided
- **Navigation System** - Smooth page transitions between sections

## 🚀 Demo

### User Flow
1. **Product Management** → Add new products with details (name, category, price, description, image)
2. **Browse Products** → View all products in a grid layout with search functionality
3. **Shopping Cart** → Add items, adjust quantities, view order summary
4. **Edit Products** → Update existing product information
5. **Persistence** → All data saved automatically and restored on page reload

## 📸 Screenshots

<p align="center">
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6519d69a-80df-4c02-ab9d-0e43ab48f42c" />
 <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a3f4170f-daa3-495e-a6c3-48d58b898b98" />
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0ee3cc26-eff4-44a5-a996-21b0f4c1a93b" />

</p>

## 🛠️ Tech Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with Tailwind CSS 4.0
- **JavaScript (ES6+)** - Vanilla JS, no frameworks required
- **LocalStorage API** - Client-side data persistence
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome** - Icon library

## 📦 Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML/CSS/JavaScript (for modifications)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/PR-E-COMMERCE-JS.git
cd PR-E-COMMERCE-JS
```

2. **Open in browser**
```bash
# Option 1: Direct file open
open index.html

# Option 2: Using a local server (recommended)
# Python 3
python -m http.server 8000

# Node.js with http-server
npx http-server

# VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

3. **Access the app**
```
http://localhost:8000
```

That's it! No build process or dependencies required. 🎉

## 📂 Project Structure

```
PR-E-COMMERCE-JS/
│
├── index.html          # Main product listing page
├── products.html       # Add/Edit product form page
├── add_to_cart.html    # Shopping cart page
├── JS/
│   └── script.js       # Application logic
├── img/                # Product images folder
├── README.md           # Documentation
└── .gitignore          # Git ignore rules
```

### File Overview

**index.html**
- Product grid display
- Search functionality
- Product cards with actions (Edit, Delete, Add to Cart)

**products.html**
- Product form (Add/Edit mode)
- Input fields for product details
- Form validation

**add_to_cart.html**
- Shopping cart table
- Quantity controls (+/-)
- Order summary
- Place order button

**script.js**
- Product and cart state management
- CRUD operations
- LocalStorage integration
- Event handlers
- Dynamic rendering functions

## 🎯 Usage

### For Users

1. **Add New Product**
   - Navigate to "Add Product" page
   - Fill in product details (Name, Category, Price, Description, Image URL)
   - Click "Add Product"

2. **Browse Products**
   - View all products on main page
   - Use search bar to filter products
   - Click on product cards to interact

3. **Edit Product**
   - Click "Edit" button on any product card
   - Modify product details in form
   - Click "Save Changes"

4. **Delete Product**
   - Click "Delete" button on product card
   - Product removed immediately

5. **Shopping Cart**
   - Click "Add to Cart" on any product
   - Navigate to cart page
   - Use +/- buttons to adjust quantities
   - View order summary with totals
   - Click "Place Order" (functionality coming soon)

6. **Search Products**
   - Type in search box on main page
   - Products filter in real-time

### For Developers

#### Adding Product Properties

Extend the `productDetails` object structure in `script.js`:

```javascript
productDetails = {
  id: 1234,
  pName: "Product Name",
  pCategory: "Category",
  pPrice: 999,
  pDescription: "Description",
  pUrl: "image-url.jpg",
  // Add new properties here
};
```

#### Modifying Product Card Design

Update the `renderProduct()` function in `script.js`:

```javascript
function renderProduct(data) {
  cardContent.innerHTML = `
    <!-- Customize HTML structure here -->
    <img src="${data.pUrl}" alt="${data.pName}" />
    <h3>${data.pName}</h3>
    <!-- Add more elements -->
  `;
}
```

#### Customizing Cart Layout

Modify the cart table structure in the `renderCart()` function:

```javascript
cartRow.innerHTML = `
  <td>${cProduct.pName}</td>
  <td>${cProduct.quantity}</td>
  <!-- Add more columns -->
`;
```

#### Clear All Data

To reset application state:

```javascript
localStorage.removeItem("products");
localStorage.removeItem("cartProducts");
location.reload();
```

## 🔧 Configuration

### LocalStorage Keys

- `products` - Array of all product objects
- `cartProducts` - Array of cart items with quantities
- `editProductID` - Temporary storage for product being edited

### Product Object Structure

```javascript
{
  id: 1234,              // Unique identifier
  pName: "Product Name", // Product name
  pCategory: "Electronics", // Product category
  pPrice: 999,           // Product price (number)
  pDescription: "...",   // Product description
  pUrl: "image.jpg"      // Product image URL
}
```

### Cart Item Structure

```javascript
{
  id: 1234,              // Product ID
  pName: "Product Name",
  pPrice: 999,
  pUrl: "image.jpg",
  quantity: 2            // Number of items in cart
}
```

## 🎨 Customization

### Color Scheme

Current theme colors:

```css
Background: #ffffff (white)
Cards: border-[#e6e9ee]
Buttons:
  - Blue: bg-blue-500, hover:bg-blue-600
  - Red: bg-red-500, hover:bg-red-600
  - Green: bg-green-500, hover:bg-green-600
  - Gray: bg-gray-200, hover:bg-gray-300
Text: 
  - Primary: text-gray-900
  - Secondary: text-gray-600
Price: text-blue-600
```

### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🐛 Known Issues

- Place Order button is placeholder (functionality pending)
- No backend integration for persistent storage
- Random ID generation may produce duplicates (low probability)
- No image upload functionality (uses URL input)
- No pagination for large product lists

## 🚀 Future Enhancements

- [ ] Backend API integration (Node.js/Express)
- [ ] User authentication and authorization
- [ ] Payment gateway integration
- [ ] Product categories filtering
- [ ] Image upload functionality
- [ ] Product reviews and ratings
- [ ] Order history tracking
- [ ] Email notifications
- [ ] Pagination for products
- [ ] Advanced search filters
- [ ] Wishlist feature
- [ ] Product recommendations
- [ ] Invoice generation
- [ ] Admin dashboard
- [ ] Analytics and reporting

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style and structure
- Add comments for complex logic
- Test on multiple browsers
- Update README for new features
- Use semantic commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [rudra2609-06]([https://github.com/yourusername](https://github.com/rudra2609-06))
- LinkedIn: [Rudra Thakkar](www.linkedin.com/in/rudranthakkar)
- Email: rudra22822@gmail.com

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Font Awesome](https://fontawesome.com/) - For the icon library
- [MDN Web Docs](https://developer.mozilla.org/) - For JavaScript documentation
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - For data persistence

## 📞 Support

If you have any questions or need help, feel free to:

- Open an issue on GitHub
- Send an email to your rudra22822@gmail.com
- Reach out on LinkedIn

---

<div align="center">

**Made with ❤️ and JavaScript**

⭐ Star this repo if you found it helpful!

</div>
