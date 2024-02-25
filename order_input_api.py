from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)


def parse_output_data(output):
    total_orders_index = output.find("Total Orders:")
    if total_orders_index == -1:
        return jsonify({'success': False, 'error': 'Total Orders not found'}), 500

    order_string = output[total_orders_index:]
    order_string_array = order_string.split('\n')[1:-1]
    order_data = {}
    for order_item_string in order_string_array:
        last_key_index = order_item_string.find(" .")
        first_value_index = order_item_string.find(". ") + 2
        key = order_item_string[2:last_key_index]
        value = int(order_item_string[(first_value_index):])
        order_data[key] = value

    return jsonify({'success': True, 'output': order_data}), 200


@app.route('/process_orders', methods=['POST'])
def process_orders():
    data = request.json
    packages_input = '\n'.join(data['packages']) + '\n' + 'done'
    process = subprocess.Popen(['python', 'order_counter.py'],
                               stdin=subprocess.PIPE,
                               stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE,
                               text=True)
    stdout, stderr = process.communicate(input=packages_input)

    if process.returncode == 0:
        return parse_output_data(stdout)
    else:
        return jsonify({'success': False, 'error': stderr}), 500


if __name__ == '__main__':
    app.run(debug=True)
