import sys
import os
import io
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from waitress import serve
from contextlib import redirect_stdout
from order_counter import main as order_counter

app = Flask(__name__, static_url_path='', static_folder='UserInterface')
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
    try:
        data = request.json
        packages_input = '\n'.join(data['packages']) + '\n' + 'done'
        input_stream = io.StringIO(packages_input)
        output_stream = io.StringIO()
        with redirect_stdout(output_stream):
            sys.stdin = input_stream
            order_counter()
            sys.stdin = sys.__stdin__
        return parse_output_data(output_stream.getvalue())
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/', methods=['GET'])
def serve_UI():
    try:
        # Render the index.html template
        return send_from_directory('UserInterface', 'index.html')
    except Exception as e:
        # Handle any errors and return an error response
        return str(e), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 4949))
    print("App running at port", port)
    serve(app, host='0.0.0.0', port=port)
