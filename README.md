# D&M Imaging Order Counter

## Description

This project automates an order-counting process at D&M Imaging, making it easier and more efficient to bill certain orders for a very large customer. The system allows users to input packages ordered by each subject, calculates the total items ordered, and provides a summary of the orders.

## Features

- Allows users to input packages for each subject
- Calculates total orders and provides a summary
- Integrates with a backend server to process orders

## Installation

### Prerequisites

- Python 3.x
- Node.js
- npm

### Setup

1. Clone the repository.
2. Navigate to the project directory.
3. Install Node.js dependencies: `npm install`
4. If making changes to backend code, install Python dependencies: `pip install -r requirements.txt`

## Usage

1. Start the electron application: `cd UserInterface` then `npm start`.
2. Open your browser and navigate to `http://localhost:8080`.
3. Enter packages for each subject and click "Calculate Order" to view the summary.

## Roadmap

- [ ] Add total price calculation to backend and display in results.
- [ ] Add support for automatic label generation.
- [ ] Refactor app.js allow for greater readability and more modularization.
- [ ] Enhance error handling and validation.
- [ ] Add support for other customers/packages.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request.

## License

[MIT License](LICENSE)

## Credits

- Developed by Eric Burrell

## Contact

For inquiries or support, please contact ericburrell231@gmail.com.
