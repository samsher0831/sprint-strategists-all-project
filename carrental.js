// carrental.js

class CarRental {
    constructor() {
        this.fleet = []; // Array to store car details
        this.rentals = []; // Array to store rental records
    }

    // Method to add a new car to the fleet
    addCar(model, type, ratePerDay) {
        const car = {
            model,
            type,
            ratePerDay,
            isAvailable: true
        };
        this.fleet.push(car);
        console.log(`Car added: ${model}, Type: ${type}, Rate: ${ratePerDay}/day`);
    }

    // Method to rent a car to a customer
    rentCar(model, customerName, duration) {
        const car = this.fleet.find(car => car.model === model && car.isAvailable);
        if (car) {
            car.isAvailable = false;
            const rental = {
                model,
                customerName,
                duration,
                rentalDate: new Date()
            };
            this.rentals.push(rental);
            console.log(`Car rented: ${model}, Customer: ${customerName}, Duration: ${duration} days`);
        } else {
            console.log(`Car not available for rental: ${model}`);
        }
    }

    // Method to return a rented car to the fleet
    returnCar(model) {
        const rentalIndex = this.rentals.findIndex(rental => rental.model === model);
        if (rentalIndex !== -1) {
            const rental = this.rentals[rentalIndex];
            const car = this.fleet.find(car => car.model === model);
            if (car) {
                car.isAvailable = true;
                this.rentals.splice(rentalIndex, 1);
                console.log(`Car returned: ${model}, Customer: ${rental.customerName}`);
            }
        } else {
            console.log(`Rental record not found for car: ${model}`);
        }
    }

    // Method to calculate rental charges for a specific car
    calculateCharges(model) {
        const rental = this.rentals.find(rental => rental.model === model);
        if (rental) {
            const car = this.fleet.find(car => car.model === model);
            if (car) {
                const totalCharges = car.ratePerDay * rental.duration;
                console.log(`Total charges for ${model}: $${totalCharges}`);
                return totalCharges;
            }
        } else {
            console.log(`No rental record found for car: ${model}`);
        }
        return 0;
    }

    // Method to display all available cars for rent
    displayAvailableCars() {
        const availableCars = this.fleet.filter(car => car.isAvailable);
        console.log('Available cars for rent:');
        availableCars.forEach(car => {
            console.log(`Model: ${car.model}, Type: ${car.type}, Rate: ${car.ratePerDay}/day`);
        });
        return availableCars;
    }
}

// Hard-coded example data and operations

// Create an instance of CarRental
const carRentalSystem = new CarRental();

// Add some cars to the fleet
carRentalSystem.addCar('Toyota Corolla', 'Sedan', 30);
carRentalSystem.addCar('Ford Explorer', 'SUV', 50);
carRentalSystem.addCar('Honda Civic', 'Sedan', 25);

// Display available cars
carRentalSystem.displayAvailableCars();

// Rent a car
carRentalSystem.rentCar('Toyota Corolla', 'Alice Johnson', 3);

// Try to rent the same car again
carRentalSystem.rentCar('Toyota Corolla', 'Bob Smith', 2);

// Display available cars after renting
carRentalSystem.displayAvailableCars();

// Return the rented car
carRentalSystem.returnCar('Toyota Corolla');

// Calculate charges for the returned car
carRentalSystem.calculateCharges('Toyota Corolla');

// Display available cars after returning
carRentalSystem.displayAvailableCars();
