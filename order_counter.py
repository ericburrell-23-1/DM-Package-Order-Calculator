# Define packages and their contents
PACKAGES = {
    'A': {'5 x 7': 1, '8 x 10': 2, 'Mem Mate Print': 1, 'Magazine Cover': 1, 'Button': 2, 'Magnet': 1},
    'B': {'8 x 10': 1, 'Mem Mate Print': 1, 'Button': 1},
    'C': {'8 x 10': 2},
    'D': {'8 x 10': 2, '5 x 7': 1, 'Mem Mate Folder - Large': 1},
    'E': {'5 x 7': 3, 'Mem Mate Folder - Small': 1},
    'F': {'5 x 7': 1},
    'G': {'8 x 10': 1},
    'H': {'8 x 10': 1},
    'I': {'8 x 10': 1},
    'J': {'8 x 10': 1},
    'K': {'Button': 1},
    'L': {'Magnet': 1},
    'M': {'Key Chain': 1},
    'N': {'Magazine Cover': 1},
    'O': {'Trader Cards': 1},
    'P': {'Mem Mate Print': 1},
    'Q': {'Tickets': 1},
    'R': {'Plaque': 1},
    'S': {'CD': 1},
    'T': {'16 x 20 Poster': 1},
    'U': {'11 x 14': 1},
    # Add more packages as needed
}

# Function to calculate order details for a given package


def calculate_order(package):
    order_details = {}
    for item, quantity in PACKAGES[package].items():
        if item in order_details:
            order_details[item] += quantity
        else:
            order_details[item] = quantity
    return order_details

# Function to process user input and calculate total order details and number of subjects


def process_orders():
    total_orders = {}
    num_subjects = 0
    while True:
        packages_input = input(
            "Enter packages for subject (separated by space), or type 'done' to finish: ")
        if packages_input.lower() == 'done':
            break

        num_subjects += 1
        packages = packages_input.split()

        for package in packages:
            package = package.upper()
            if package == 'TEAM':
                school_quantity = int(
                    input("Enter school quantity for the team: "))
                coach_quantity = int(
                    input("Enter coach quantity for the team: "))
                num_subjects += coach_quantity
                if 'Text Fee' in total_orders:
                    total_orders['Text Fee'] += 2
                else:
                    total_orders['Text Fee'] = 2
                if '8 x 10' in total_orders:
                    total_orders['8 x 10'] += school_quantity
                else:
                    total_orders['8 x 10'] = school_quantity
                if '5 x 7' in total_orders:
                    total_orders['5 x 7'] += coach_quantity
                else:
                    total_orders['5 x 7'] = coach_quantity
                continue

            if package not in PACKAGES:
                print(f"Invalid package '{package}'! Skipping...")
                continue
            order_details = calculate_order(package)
            for item, quantity in order_details.items():
                if item in total_orders:
                    total_orders[item] += quantity
                else:
                    total_orders[item] = quantity

    return total_orders, num_subjects

# Function to display order details


def display_orders(orders):
    print("Total Orders:")
    for item, quantity in orders.items():
        item_length = len(item)
        dots_count = 30 - item_length
        dots = "." * dots_count
        print(f"- {item} {dots} {quantity}")

# Main function


def main():
    orders, num_subjects = process_orders()
    display_orders(orders)
    print(f"- IB, PE, & DEF ................. {num_subjects}")


if __name__ == "__main__":
    main()
